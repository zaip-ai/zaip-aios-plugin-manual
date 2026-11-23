import { lstat, realpath } from "node:fs/promises";
import { browserObservations, browserSource } from "./browser-source.mjs";
import { capture } from "./capture.mjs";
import { selectDeclarations } from "./css-sample.mjs";
import { id, publish } from "./files.mjs";
import { handoff } from "./handoff.mjs";
import { collectIcon } from "./icon.mjs";
import { css, html } from "./parser.mjs";
import {
  displayUrl,
  fixtureAuthorization,
  limits,
  normalizeUrlInput,
  replayableUrl,
  safeText,
  url,
} from "./policy.mjs";
import { build, design, validate } from "./proposal.mjs";
import { buildReport, reportMarkdown } from "./report.mjs";
import { hash, transport } from "./transport.mjs";

export async function extract({ workspace, input, onProgress = async () => {}, signal }) {
  const root = await realpath(workspace);
  if (!(await lstat(root)).isDirectory()) throw new Error("Explicit workspace directory required");
  const required = ["schema_version", "id", "url", "output_authorized"];
  const optional = ["limits", "fixture_authorization", "capture", "mode"];
  if (
    !input ||
    required.some((key) => !Object.hasOwn(input, key)) ||
    Object.keys(input).some((key) => ![...required, ...optional].includes(key)) ||
    input.schema_version !== 1 ||
    input.output_authorized !== true
  )
    throw new Error("Extraction requires versioned explicit authorized output request");
  id(input.id);
  if (!["http", "browser"].includes(input.mode ?? "http"))
    throw new Error("Unknown extraction mode");
  const target = url(replayableUrl(normalizeUrlInput(input.url)));
  const bounds = limits(input.limits);
  const authorization = fixtureAuthorization(input.fixture_authorization);
  const fetchSource = transport({ bounds, authorization });
  const browser =
    input.mode === "browser" ? await browserSource(target.href, bounds, onProgress, signal) : null;
  if (!browser) await onProgress({ phase: "fetch-html", resources_received: 0 });
  const source = browser?.source ?? (await fetchSource(target.href));
  const parsed = html(source, bounds);
  const resources = [];
  let declarations = [];
  const sampling = [];
  const gaps = [...(browser?.gaps ?? [])];
  const record = (value, kind) =>
    resources.push({
      url: displayUrl(value.url),
      kind,
      hash: value.hash,
      bytes: value.bytes,
      observed_at: value.observed_at,
      method: value.method,
      source_preserved: false,
    });
  record(source, "html");
  await onProgress({ phase: "parse-css", resources_received: resources.length });
  const append = (value, resource = source) => {
    declarations = selectDeclarations(
      [...declarations, ...value.declarations],
      bounds.declarations,
    );
    sampling.push({ ...value.sampling, url: displayUrl(resource.url), source_hash: resource.hash });
    for (const item of value.assets)
      if (parsed.assets.length < bounds.assets) parsed.assets.push(item);
  };
  const queue = parsed.links.map((link) => ({ link, depth: 0 }));
  const seen = new Set();
  for (const style of browser ? [] : parsed.styles) {
    const value = css(style, bounds, source.url, source.hash, source.observed_at);
    append(value);
    queue.push(...value.imports.map((link) => ({ link, depth: 1 })));
  }
  for (const style of parsed.inline)
    append(css(style.text, bounds, source.url, source.hash, source.observed_at, style.selector));
  for (const stylesheet of browser?.css ?? []) {
    record(stylesheet, "css");
    append(
      css(stylesheet.text, bounds, stylesheet.url, stylesheet.hash, stylesheet.observed_at),
      stylesheet,
    );
  }
  for (let index = 0; !browser && index < queue.length; index++) {
    const entry = queue[index];
    if (seen.has(entry.link)) continue;
    seen.add(entry.link);
    if (
      entry.depth > bounds.css_depth ||
      resources.length >= bounds.resources ||
      index >= bounds.resources * 2
    ) {
      gaps.push("Additional stylesheet references omitted by depth/resource policy");
      break;
    }
    try {
      const stylesheet = await fetchSource(entry.link, "css");
      record(stylesheet, "css");
      await onProgress({ phase: "fetch-css", resources_received: resources.length });
      const value = css(
        stylesheet.text,
        bounds,
        stylesheet.url,
        stylesheet.hash,
        stylesheet.observed_at,
      );
      append(value, stylesheet);
      queue.push(...value.imports.map((link) => ({ link, depth: entry.depth + 1 })));
    } catch (error) {
      gaps.push(
        `Stylesheet unavailable: ${safeText(error.code ? `I/O ${error.code}` : error.message, 512)}`,
      );
    }
  }
  const proposal = build(input.id, source, parsed, resources, declarations, gaps);
  proposal.source.request_url = replayableUrl(target.href);
  proposal.source.final_url = replayableUrl(source.url);
  proposal.css_sampling = sampling;
  proposal.fixture_authorization = authorization;
  const artifacts = {};
  if (browser) {
    proposal.capabilities.adapter_configured = true;
    proposal.capabilities.browser_resolved = true;
    proposal.capabilities.screenshot_verified = true;
    proposal.capabilities.runtime_rendered = true;
    proposal.observations = proposal.observations.filter((item) => item.id !== "unknown-render");
    for (const item of proposal.observations) {
      if (item.provenance.method === "static-html-tokenization")
        item.provenance.method = "browser-DOM";
      if (item.provenance.method === "static-css-declaration")
        item.provenance.method = "browser-CSS";
    }
    proposal.observations.push(...browserObservations(browser));
    proposal.screenshot = {
      path: "screenshot.png",
      hash: hash(browser.screenshotBytes),
      bytes: browser.screenshotBytes.length,
      viewport: browser.viewport,
      method: "local-isolated-cdp",
      observed_at: browser.observed_at,
      rendering_verified_by_runtime: true,
    };
    artifacts["screenshot.png"] = browser.screenshotBytes;
    proposal.limitations.push(
      "Navegador local isolado; captura limitada ao viewport e às folhas CSS retidas; não comprova todos estados, fontes completas ou qualidade visual",
    );
    if (!gaps.length) proposal.status = "ready";
  } else if (input.capture !== undefined && input.capture !== null) {
    proposal.capabilities.adapter_configured = true;
    try {
      const host = await capture(root, input.capture, source.url);
      proposal.capabilities.host_capture_supplied = true;
      proposal.capabilities.browser_resolved = host.observations.length > 0;
      proposal.capabilities.screenshot_verified = host.screenshot !== null;
      proposal.observations.push(...host.observations);
      proposal.screenshot = host.screenshot;
      proposal.host_capture = {
        reference: host.reference,
        source_hash: host.source_hash,
        observed_at: host.observed_at,
        viewport: host.viewport,
        proof: "host-supplied; runtime verified normalized data and available bytes, not rendering",
      };
      if (host.screenshotBytes) artifacts["screenshot.png"] = host.screenshotBytes;
      if (host.observations.length && host.screenshot && !gaps.length) proposal.status = "ready";
      proposal.limitations.push(
        "Host capture is supplied evidence; authentication, browser execution and full cascade were not performed by this runtime",
      );
    } catch (error) {
      proposal.limitations.push(
        `Configured adapter unavailable: ${safeText(error.code ? `I/O ${error.code}` : error.message, 512)}`,
      );
    }
  } else
    proposal.limitations.push(
      "No host capture adapter configured; use authorized browser capture or supplied screenshots for rendered evidence",
    );
  const iconUrls =
    browser?.icons ??
    [...source.text.matchAll(/<link\b[^>]*>/gi)]
      .filter((match) => /\brel\s*=\s*["'][^"']*\bicon\b/i.test(match[0]))
      .map((match) => /\bhref\s*=\s*["']([^"']+)["']/i.exec(match[0])?.[1])
      .filter(Boolean)
      .slice(0, 8)
      .flatMap((value) => {
        try {
          return [new URL(value, source.url).href];
        } catch {
          return [];
        }
      });
  const icon = await collectIcon(source.url, iconUrls, bounds, authorization);
  if (icon) {
    proposal.favicon = icon.metadata;
    artifacts[icon.metadata.path] = icon.data;
  }
  signal?.throwIfAborted();
  validate(proposal);
  await onProgress({ phase: "build-report", resources_received: resources.length });
  const report = buildReport(proposal);
  artifacts["proposal.json"] = Buffer.from(`${JSON.stringify(proposal, null, 2)}\n`);
  artifacts["handoff.json"] = Buffer.from(`${JSON.stringify(handoff(proposal), null, 2)}\n`);
  artifacts["DESIGN.md"] = Buffer.from(design(proposal));
  artifacts["report.json"] = Buffer.from(`${JSON.stringify(report, null, 2)}\n`);
  artifacts["REPORT.md"] = Buffer.from(reportMarkdown(report));
  await onProgress({ phase: "verify-artifacts", resources_received: resources.length });
  const receipt = await publish(root, input.id, artifacts);
  return {
    proposal,
    receipt,
    output: `.agents/private/state/visual-url/${input.id}`,
    product_writes: false,
  };
}
