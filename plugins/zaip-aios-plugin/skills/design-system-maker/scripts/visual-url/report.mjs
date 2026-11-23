import { normalizeColor, resolveVariables } from "./colors.mjs";
import { localDeclarationMethods } from "./local-source.mjs";
import { safeText } from "./policy.mjs";
import { visualModel } from "./visual-model.mjs";

export const reportMethod = "css-evidence-v1";
const rounded = (value) => Math.round(value * 10000) / 10000;
export function buildReport(proposal) {
  const declarations = proposal.observations
    .filter((item) =>
      ["static-css-declaration", "browser-CSS", ...localDeclarationMethods].includes(
        item.provenance.method,
      ),
    )
    .map((item) => {
      const split = item.value.indexOf(":");
      return {
        property: item.value.slice(0, split).trim(),
        value: item.value.slice(split + 1).trim(),
        id: item.id,
        selector: item.provenance.selector,
        provenance: item.provenance,
        redacted: item.reason !== null,
      };
    });
  const defaults = new Map(),
    contexts = new Map();
  for (const item of declarations) {
    if (!item.property.startsWith("--") || item.redacted) continue;
    if (!contexts.has(item.selector)) contexts.set(item.selector, new Map());
    contexts.get(item.selector).set(item.property, item.value);
    if (/^(?::root|html)$/.test(item.selector)) defaults.set(item.property, item.value);
  }
  const colors = [],
    typography = [],
    spacing = [],
    radii = [];
  let colorTotal = 0,
    colorResolved = 0;
  const values = [];
  function add(list, item, normalized, category) {
    values.push(`${category}:${normalized}`);
    const existing = list.find(
      (row) => row.value === normalized && (category === "color" || row.property === item.property),
    );
    if (existing) {
      existing.occurrences++;
      if (existing.evidence.length < 16) existing.evidence.push(item.id);
    } else if (list.length < 64)
      list.push({
        value: normalized,
        declared_value: safeText(item.value.slice(0, 512)),
        property: item.property,
        kind: "inferred",
        method: "bounded-static-declaration-resolution",
        occurrences: 1,
        evidence: [item.id],
        provenance: item.provenance,
      });
  }
  for (const item of declarations) {
    const lookup = (key) => contexts.get(item.selector)?.get(key) ?? defaults.get(key);
    const resolved = item.redacted ? null : resolveVariables(item.value, lookup);
    if (
      /color|background|fill|stroke|(?:^|-)primary|accent|foreground|muted/.test(item.property) ||
      /^(?:#|rgba?\(|hsla?\()/i.test(item.value)
    ) {
      colorTotal++;
      const normalized = resolved === null ? null : normalizeColor(resolved);
      if (normalized) {
        colorResolved++;
        add(colors, item, normalized, "color");
      }
    }
    if (resolved === null) continue;
    if (/(?:^|-)font(?:-|$)|typography|line-height|letter-spacing/.test(item.property))
      add(typography, item, safeText(resolved.slice(0, 512)), "type");
    if (/padding|margin|gap|spacing/.test(item.property))
      add(spacing, item, safeText(resolved.slice(0, 512)), "spacing");
    if (/radius/.test(item.property)) add(radii, item, safeText(resolved.slice(0, 512)), "radius");
  }
  const samplingRows = proposal.css_sampling ?? [];
  const total =
    samplingRows.length || proposal.source.type === "url"
      ? samplingRows.reduce((sum, row) => sum + row.total, 0)
      : declarations.length;
  const sampling = {
    total,
    sampled: declarations.length,
    truncated: Math.max(0, total - declarations.length),
    method: "root-theme-font-component-priority-v1",
    sources: samplingRows,
  };
  const components = [];
  const componentTags =
    /^(?:button|input|select|textarea|form|nav|dialog|header|footer|main|section|article|aside|h[1-6]|table|label|a)$/;
  for (const [index, item] of proposal.dom.entries()) {
    if (
      !componentTags.test(item.tag) &&
      !item.role &&
      !/card|badge|modal|menu|button|hero|accordion|tab/i.test(item.selector)
    )
      continue;
    const existing = components.find(
      (row) => row.selector === item.selector && row.tag === item.tag && row.role === item.role,
    );
    if (existing) {
      existing.occurrences++;
      if (existing.evidence.length < 16) existing.evidence.push(`dom-${index}`);
    } else if (components.length < 200)
      components.push({
        ...item,
        occurrences: 1,
        kind: "static-interface-candidate",
        evidence: [`dom-${index}`],
        provenance: proposal.observations[index].provenance,
      });
  }
  const groups = [colors, typography, spacing, radii, components, proposal.resources];
  const frequencies = new Map();
  for (const value of values) frequencies.set(value, (frequencies.get(value) ?? 0) + 1);
  const reused = values.filter((value) => frequencies.get(value) > 1).length;
  const metric = (id, numerator, denominator, weight, explanation) => ({
    id,
    numerator,
    denominator,
    ratio: denominator ? rounded(numerator / denominator) : 0,
    weight,
    explanation,
  });
  const metrics = [
    metric(
      "category-coverage",
      groups.filter((group) => group.length).length,
      groups.length,
      35,
      "Presence of declared colors/type/spacing/radii, static components and received resources; not visual quality",
    ),
    metric(
      "declaration-sampling",
      declarations.length,
      total,
      25,
      "Retained declaration fraction of the bounded scanned resources; not stylesheet/browser completeness",
    ),
    metric(
      "color-resolution",
      colorResolved,
      colorTotal,
      20,
      "Single color declarations resolvable within the retained selector/root sample; cascade/active theme not computed",
    ),
    metric(
      "declared-token-reuse",
      reused,
      values.length,
      20,
      "Occurrences sharing a normalized category/value in the retained sample; not rendered consistency",
    ),
  ];
  const gaps = [...proposal.limitations];
  if (sampling.truncated)
    gaps.push(
      `${sampling.truncated} scanned declarations omitted from the bounded prioritized sample`,
    );
  if (colorResolved < colorTotal)
    gaps.push(
      `${colorTotal - colorResolved} color-like declarations unresolved or not a single supported color`,
    );
  for (const item of metrics)
    if (!item.denominator)
      gaps.push(`${item.id}: zero denominator; metric ratio0, evidence unavailable`);
  const report = {
    schema_version: 1,
    method_version: reportMethod,
    status: "measured-evidence",
    extraction_id: proposal.extraction_id,
    source: proposal.source,
    score: Math.round(metrics.reduce((sum, item) => sum + item.weight * item.ratio, 0)),
    score_kind: "extraction-evidence-coverage",
    metrics,
    sampling,
    colors,
    typography,
    spacing,
    radii,
    element_count: proposal.dom.length,
    components,
    resources: proposal.resources,
    gaps: gaps.slice(0, 128),
    themes: [
      ...new Set(
        declarations
          .map(
            (item) =>
              /(?:data-theme\s*=\s*["']?|\.)(dark|light|[\w-]*theme[\w-]*)/i.exec(
                item.selector,
              )?.[1],
          )
          .filter(Boolean),
      ),
    ].slice(0, 32),
    limitations: [
      proposal.capabilities.runtime_rendered
        ? "Inventário declarado/inferido e amostra de estilos computados no viewport observado; tema ativo global, qualidade visual, LLM, acessibilidade e promoção central não avaliados"
        : "Declared/inferred static design inventory; no browser cascade, active theme, visual-quality/LLM/accessibility score or global token promotion",
      ...(proposal.capabilities.runtime_rendered
        ? [
            "Navegador local executou esta captura; screenshot e estilos computados do viewport observado foram preservados; outras interações e qualidade visual permanecem não avaliadas",
          ]
        : [
            "Raw remote assets remain unpreserved unless an existing verified host screenshot is supplied",
          ]),
    ],
  };
  report.visual_model = visualModel(proposal, report);
  if (report.visual_model.coverage?.status !== "sampled" && proposal.capabilities.runtime_rendered)
    report.gaps.push(
      "Cobertura renderizada incompleta ou legada; consultar prontidão e candidatos no modelo visual",
    );
  return report;
}
export function reportMarkdown(report) {
  const text = (value) =>
    String(value)
      .replaceAll("|", "\\|")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll("\n", " ");
  const lines = [
    "# Relatório de evidências da extração",
    "",
    `Método: ${report.method_version}. Cobertura da extração: ${report.score}/100 (${report.score_kind}).`,
    "",
    "Esta nota descreve evidências extraídas; não representa qualidade visual, fidelidade renderizada, avaliação LLM ou certificação de acessibilidade.",
    "",
    `Declarações CSS: ${report.sampling.sampled} retidas / ${report.sampling.total} lidas; ${report.sampling.truncated} omitidas.`,
    "",
    "## Métricas explicáveis",
    "",
    "Métrica | Numerador / denominador | Peso | Razão",
    "--- | --- | --- | ---",
  ];
  for (const item of report.metrics)
    lines.push(
      `${item.id} | ${item.numerator}/${item.denominator} | ${item.weight} | ${item.ratio}`,
    );
  const visual = report.visual_model;
  if (visual?.color_candidates) {
    lines.push(
      "",
      "## Candidatos de cor e cobertura renderizada",
      "",
      `Cobertura: ${text(visual.coverage?.status ?? "legacy-unknown")}; ${visual.coverage?.sampled ?? "?"} amostras. Papéis primário/destaque são inferidos separadamente.`,
      "",
      "Cor | Origem | Contexto | Evidências",
      "--- | --- | --- | ---",
    );
    for (const row of visual.color_candidates)
      lines.push(
        `${row.value} | ${row.source} | ${text(row.provenance.selector)} (${text(row.role_hint ?? "papel desconhecido")}) | ${row.evidence.join(", ")}`,
      );
    for (const gap of visual.coverage?.limitations ?? []) lines.push(`- ${text(gap)}`);
    if (visual.coverage?.readiness)
      lines.push(`- Prontidão: ${text(JSON.stringify(visual.coverage.readiness))}`);
  }
  for (const [name, items] of [
    ["Cores", report.colors],
    ["Tipografia declarada", report.typography],
    ["Espaçamentos", report.spacing],
    ["Raios", report.radii],
  ]) {
    lines.push(
      "",
      `## ${name}`,
      "",
      "Propriedade / valor | Ocorrências | Evidências | Fonte/seletor",
      "--- | --- | --- | ---",
    );
    for (const item of items)
      lines.push(
        `${text(item.property)}: ${text(item.value)} | ${item.occurrences} | ${item.evidence.join(", ")} | ${text(item.provenance.url ?? item.provenance.locator)} — ${text(item.provenance.selector)}`,
      );
    if (!items.length) lines.push("Indisponível nas declarações retidas.");
  }
  lines.push(
    "",
    "## Candidatos de interface estática",
    "",
    `${report.element_count} elementos HTML lidos; ${report.components.length} grupos candidatos de interface. Não são componentes prontos ou reusáveis comprovados.`,
    "",
  );
  for (const item of report.components)
    lines.push(
      `- ${text(item.tag)} ${text(item.selector)}: ${text(item.text)} [${item.evidence.join(", ")}]`,
    );
  lines.push("", "## Recursos", "");
  for (const item of report.resources)
    lines.push(
      `- ${item.kind}: ${text(item.url)}; ${item.bytes} bytes; SHA256 ${item.hash}; raw source preserved:false`,
    );
  lines.push("", "## Lacunas e limites", "");
  for (const gap of [...report.gaps, ...report.limitations]) lines.push(`- ${text(gap)}`);
  return `${lines.join("\n")}\n`;
}
