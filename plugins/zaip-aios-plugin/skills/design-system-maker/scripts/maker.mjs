import { execFile } from "node:child_process";
import { mkdtemp, readFile, realpath, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { designDocument } from "./design-document.mjs";
import { diagnosticHtml } from "./diagnostic.mjs";
import { browserCapability, browserExecutable } from "./visual-url/browser-cdp.mjs";
import { designScore } from "./visual-url/design-score.mjs";
import { path, read, write } from "./visual-url/files.mjs";
import { evidenceLimits, normalizeUrlInput, safeText, url } from "./visual-url/policy.mjs";
import { extract } from "./visual-url/runtime.mjs";
import { hash } from "./visual-url/transport.mjs";

const run = promisify(execFile);
const json = (value) => Buffer.from(`${JSON.stringify(value, null, 2)}\n`);
const progress = (phase) => process.stderr.write(`[Design System Maker] ${phase}\n`);

async function renderPdf(temp, browser, html) {
  const source = join(temp, "relatorio.html");
  const destination = join(temp, "diagnostico.pdf");
  await writeFile(source, html, { flag: "wx" });
  try {
    await run(browser, [
      "--headless", "--disable-background-networking", "--disable-component-update", "--disable-sync",
      "--no-first-run", "--no-default-browser-check", "--no-pdf-header-footer",
      `--user-data-dir=${join(temp, "print-profile")}`, `--print-to-pdf=${destination}`,
      pathToFileURL(source).href,
    ], { windowsHide: true, timeout: 60000, maxBuffer: 524288 });
    const bytes = await readFile(destination);
    if (!bytes.subarray(0, 5).equals(Buffer.from("%PDF-")) || !bytes.subarray(-24).includes("%%EOF"))
      throw new Error("PDF inválido ou incompleto.");
    return bytes;
  } catch (error) {
    throw new Error(`A exportação do PDF falhou (${error.code ?? "renderização"}).`);
  }
}

function argumentsFrom(args) {
  const values = {};
  for (let index = 0; index < args.length; index += 2) {
    const [key, value] = args.slice(index, index + 2);
    if (!["--workspace", "--url"].includes(key) || Object.hasOwn(values, key) || !value || value.startsWith("--"))
      throw new Error("Use --workspace <projeto> --url <URL pública>.");
    values[key] = value;
  }
  if (!values["--workspace"] || !values["--url"])
    throw new Error("Use --workspace <projeto> --url <URL pública>.");
  return values;
}

async function make({ "--workspace": project, "--url": supplied }) {
  const target = url(normalizeUrlInput(supplied));
  const workspace = await realpath(project);
  const capability = await browserCapability();
  if (!capability.available) throw new Error(capability.reason);
  const browser = await browserExecutable();
  const temp = await mkdtemp(join(await realpath(tmpdir()), "zaip-maker-"));
  try {
    const result = await extract({
      workspace: temp,
      input: { schema_version: 1, id: "capture", url: target.href, output_authorized: true, mode: "browser" },
      onProgress: ({ phase }) => progress(phase),
    });
    const verified = async (name) => {
      const expected = result.receipt.files.find((row) => row.path === name);
      const maximum = name === "screenshot.png" ? evidenceLimits.screenshot_bytes : evidenceLimits.text_artifact_bytes;
      const bytes = await read(temp, `${result.output}/${name}`, maximum);
      if (!expected || bytes.length !== expected.bytes || hash(bytes) !== expected.hash)
        throw new Error(`A evidência ${name} não corresponde à captura.`);
      return bytes;
    };
    const [proposalBytes, reportBytes, screenshot] = await Promise.all(
      ["proposal.json", "report.json", "screenshot.png"].map(verified),
    );
    const proposal = JSON.parse(proposalBytes);
    const report = JSON.parse(reportBytes);
    if (!proposal.capabilities.runtime_rendered || !proposal.screenshot?.rendering_verified_by_runtime)
      throw new Error("Não há captura verificada de navegador.");
    const parserNotes = {
      "Bounded static tokenization is not a browser DOM/layout engine; scripts/templates are never executed":
        "O analisador de inventário HTML faz leituras limitadas. Os estilos computados e a imagem vêm de uma captura separada no navegador.",
      "HTML entities and malformed markup may remain approximate; no resolved style or viewport inferred":
        "Entidades HTML e marcação malformada podem afetar a contagem do inventário.",
      "Assets referenced only; no image/font copies fetched":
        "As referências de ativos aparecem no inventário. Arquivos de imagem e fonte não são exportados.",
    };
    report.gaps = report.gaps.map((note) => parserNotes[note] ?? note);
    const score = designScore(proposal, report, report.visual_model);
    if (!score) throw new Error("Não foi possível calcular as métricas do Maker.");
    const document = designDocument(proposal, report.visual_model);
    const design = Buffer.from(document.markdown);
    progress("exportando PDF");
    const pdf = await renderPdf(temp, browser, diagnosticHtml({
      proposal, report, score, screenshot, document, designHash: hash(design),
    }));
    const evidence = json({ proposal, report, design_score: score, design_token_evidence: document.evidence });
    const stamp = new Date().toISOString().replace(/[:.]/g, "-");
    const host = new URL(proposal.source.url).hostname.replace(/[^a-z0-9.-]/gi, "-").slice(0, 50);
    const parent = dirname(await path(workspace, "design/diagnosticos/_new", true));
    const directory = await mkdtemp(join(parent, `${host}-${stamp}-`));
    const folder = `design/diagnosticos/${basename(directory)}`;
    const artifacts = { "DESIGN.md": design, "diagnostico.pdf": pdf, "evidencias.json": evidence, "captura.png": screenshot };
    const files = {};
    for (const [name, bytes] of Object.entries(artifacts)) {
      const locator = `${folder}/${name}`;
      await write(workspace, locator, bytes);
      const persisted = await read(workspace, locator, bytes.length);
      if (!persisted.equals(bytes)) throw new Error(`Falha ao validar ${name} após gravar.`);
      files[name] = { path: join(directory, name), sha256: hash(persisted), bytes: persisted.length };
    }
    return {
      ok: true, status: proposal.status, source: proposal.source.url, viewport: proposal.screenshot.viewport, files,
      score: { overall: score.overall, grade: score.grade, evaluated: score.evaluated_categories, total: score.total_categories },
      gaps: report.gaps,
    };
  } finally {
    await rm(temp, { recursive: true, force: true, maxRetries: 4, retryDelay: 250 })
      .catch(() => progress("o perfil temporário ainda está em uso"));
  }
}

try {
  const version = process.versions.node.split(".").map(Number);
  if (version[0] < 22 || (version[0] === 22 && version[1] < 16))
    throw new Error("O Design System Maker requer Node 22.16 ou posterior.");
  const result = await make(argumentsFrom(process.argv.slice(2)));
  process.stdout.write(json(result));
} catch (error) {
  process.stdout.write(json({
    ok: false,
    error: error.code ? `Falha local (${error.code}).` : safeText(String(error.message).slice(0, 512), 512),
    failure: error.failure ?? null,
  }));
  process.exitCode = 1;
}
