import { createHash } from "node:crypto";
import { semanticContrast } from "./contrast.mjs";
import { safeVisualValue } from "./visual-model.mjs";

export const generatedTokensMethod = "generated-tokens-v1";
const groups = ["colors", "typography", "spacing", "radii", "borders", "shadows"];
const required = [
  "colors.background",
  "colors.foreground",
  "colors.primary",
  "colors.primary_foreground",
  "typography.body_family",
  "typography.heading_family",
  "spacing",
  "radii",
  "borders",
  "shadows",
];
const percent = (n, d) => (d ? Math.round((100 * n) / d) : null);
const cellText = (value) => String(value ?? "").replace(/[\r\n|`<>]/g, " ");

// Names describe the local proposal, never assert that the origin used these names.
export function generatedTokens(proposal, model) {
  const observations = new Map((proposal?.observations ?? []).map((row) => [row.id, row]));
  const primitives = new Map(),
    semantics = [],
    components = [];
  const add = (group, name, token, target) => {
    if (!token) return;
    if (group === "components")
      group = /color|background|foreground/.test(token.property)
        ? "colors"
        : /font|line-height|letter-spacing/.test(token.property)
          ? "typography"
          : /radius/.test(token.property)
            ? "radii"
            : /shadow/.test(token.property)
              ? "shadows"
              : /padding|margin|gap/.test(token.property)
                ? "spacing"
                : "borders";
    let value = safeVisualValue(token.property ?? "", token.value);
    if (value != null && /padding|margin|gap|radius|border-width/.test(token.property))
      value = value.replace(/(^|\s)-?0(?:\.0+)?(?:px|rem|em)(?=\s|$)/g, (_, space) => `${space}0`);
    const context = JSON.stringify([
      token.provenance?.url,
      token.provenance?.selector,
      token.provenance?.method,
      model?.theme?.active ?? null,
      ...(token.provenance?.locator ? [token.provenance.locator] : []),
    ]);
    // Equal values in different scopes/themes are intentionally not collapsed.
    const type = group === "colors" ? "color" : token.property;
    const key = JSON.stringify([group, type, value ?? token.value, context]);
    const id = `${group}.${createHash("sha256").update(key).digest("hex").slice(0, 12)}`;
    const evidence = token.evidence ?? [];
    if (!primitives.has(id))
      primitives.set(id, {
        id,
        group,
        property: token.property,
        value: value ?? token.value,
        valid: value != null,
        evidence: [],
        provenance: token.provenance,
        classification: token.kind ?? "inferred",
        declarations: [],
      });
    const primitive = primitives.get(id);
    primitive.evidence = [...new Set([...primitive.evidence, ...evidence])].sort();
    primitive.declarations = [
      ...new Set(
        primitive.evidence
          .map((ref) => observations.get(ref)?.value)
          .filter((text) => typeof text === "string" && /var\(\s*--/.test(text)),
      ),
    ];
    target.push({ name, reference: id, classification: "inferred" });
  };
  for (const group of groups)
    for (const [name, token] of Object.entries(model?.tokens?.[group] ?? {}))
      add(
        group,
        `${group}.${Array.isArray(model.tokens[group]) ? `step-${Number(name) + 1}` : name}`,
        token,
        semantics,
      );
  for (const [index, component] of (model?.components ?? []).entries()) {
    const mapping = {
      name: `component-${index + 1}`,
      selector: component.selector ?? component.tag ?? component.name ?? "",
      tokens: [],
    };
    for (const [role, token] of Object.entries(component.tokens ?? {}))
      add("components", role, token, mapping.tokens);
    components.push(mapping);
  }
  // Preserve a bounded supplementary inventory without treating anonymous values as semantic coverage.
  let omittedCandidates = 0;
  const inventory = [],
    candidateKeys = new Set();
  for (const candidate of proposal?.token_candidates ?? []) {
    if (candidate.property.startsWith("--")) continue;
    const value = safeVisualValue(candidate.property, candidate.value);
    const source = observations.get(candidate.evidence?.[0]);
    if (!source || source.reason != null) continue;
    if (
      value == null ||
      [...primitives.values()].some(
        (row) =>
          row.value === value &&
          row.property === candidate.property &&
          row.provenance?.selector === source.provenance?.selector &&
          row.provenance?.url === source.provenance?.url,
      )
    )
      continue;
    const key = JSON.stringify([
      candidate.property,
      value,
      source.provenance?.selector,
      source.provenance?.url,
    ]);
    if (candidateKeys.has(key)) continue;
    candidateKeys.add(key);
    if (inventory.length >= 64) {
      omittedCandidates++;
      continue;
    }
    inventory.push({
      property: candidate.property,
      value,
      evidence: candidate.evidence,
      selector: source.provenance?.selector,
    });
  }
  const items = [...primitives.values()].sort((a, b) => a.id.localeCompare(b.id));
  const bindings = [...semantics, ...components.flatMap((item) => item.tokens)];
  const supported = (binding) => {
    const item = primitives.get(binding.reference);
    return (
      item?.valid &&
      item.evidence.length &&
      item.provenance?.method &&
      item.evidence.every((id) => observations.has(id) && observations.get(id).reason == null)
    );
  };
  const covered = required.filter((role) =>
    semantics.some(
      (row) => (row.name === role || row.name.startsWith(`${role}.`)) && supported(row),
    ),
  );
  const metric = (id, label, passed, total, weight) => ({
    id,
    label,
    passed,
    total,
    weight,
    score: percent(passed, total),
  });
  const metrics = [
    metric("coverage", "Papéis e escalas com suporte", covered.length, required.length, 40),
    metric(
      "integrity",
      "Valores e referências válidos",
      bindings.filter((row) => primitives.get(row.reference)?.valid).length,
      bindings.length,
      20,
    ),
    metric(
      "evidence",
      "Vínculos com evidência e proveniência",
      bindings.filter(supported).length,
      bindings.length,
      20,
    ),
    metric(
      "components",
      "Componentes candidatos com mapeamento",
      components.filter((row) => row.tokens.some(supported)).length,
      components.length,
      20,
    ),
  ];
  const measured = metrics.filter((row) => row.score != null);
  const score = items.length
    ? Math.round(
        measured.reduce((n, row) => n + row.score * row.weight, 0) /
          measured.reduce((n, row) => n + row.weight, 0),
      )
    : null;
  const missing = required.filter((role) => !covered.includes(role));
  return {
    method: generatedTokensMethod,
    theme: model?.theme ?? null,
    primitives: items,
    semantics,
    components,
    contrast: semanticContrast(model),
    inventory,
    color_candidates: model?.color_candidates ?? [],
    coverage: model?.coverage ?? null,
    omittedCandidates,
    quality: {
      method: generatedTokensMethod,
      score,
      status: score == null ? "unavailable" : "evaluated",
      metrics,
      missing,
      formula:
        "40% cobertura de 10 papéis/escalas; 20% integridade; 20% rastreabilidade; 20% componentes candidatos mapeados. Métricas sem denominador são excluídas e os pesos restantes renormalizados. Sem tokens: não avaliado.",
      scope:
        "Qualidade estrutural do DESIGN.md gerado a partir do modelo disponível. Não mede a tokenização da origem, fidelidade visual ou cobertura de todo o site. Não entra na média do Design Score.",
    },
    limitations: [
      ...new Set([
        ...(model?.limitations ?? []),
        "Nomes e papéis são propostas inferidas; valores têm evidências próprias. Não promovem o design central.",
        "Escalas são amostras, não uma escala global comprovada. Estados e temas alternativos exigem validação.",
        "Aliases CSS originais permanecem nas declarações e em proposal.json; não são reescritos como tokens globais.",
      ]),
    ],
  };
}

export function generatedTokensMarkdown(tokens) {
  const lines = [
    "## Design tokens",
    "",
    `Method: ${tokens.method}. Theme: ${cellText(tokens.theme?.active ?? "not established")}.`,
    "",
    "Primitive values are normalized within the same source context. Semantic names and component roles are inferred proposals, not original token names.",
    "",
    "### Primitives",
    "",
    "| Token | Value | Evidence |",
    "| --- | --- | --- |",
  ];
  for (const row of tokens.primitives)
    lines.push(`| ${row.id} | ${cellText(row.value)} | ${cellText(row.evidence.join(", "))} |`);
  lines.push(
    "",
    "### Semantic roles and scales",
    "",
    "| Role | Primitive reference |",
    "| --- | --- |",
  );
  for (const row of tokens.semantics) lines.push(`| ${row.name} | ${row.reference} |`);
  lines.push(
    "",
    "### Color candidates and capture coverage",
    "",
    "Observed computed values and CSS declarations retain separate provenance. Roles remain inferred; low contrast does not remove a color candidate.",
    "",
    `Coverage: ${cellText(tokens.coverage?.status ?? "legacy-unknown")}; method: ${cellText(tokens.coverage?.method ?? "unavailable")}; scanned: ${tokens.coverage?.scanned ?? "unknown"}; sampled: ${tokens.coverage?.sampled ?? "unknown"}; omitted elements: ${tokens.coverage?.omitted ?? "unknown"}.`,
    "",
  );
  if (tokens.coverage?.readiness)
    lines.push(`Readiness: ${cellText(JSON.stringify(tokens.coverage.readiness))}.`, "");
  lines.push(
    "| Value | Source | Role hint | Selector | Evidence |",
    "| --- | --- | --- | --- | --- |",
  );
  for (const row of tokens.color_candidates ?? [])
    lines.push(
      `| ${row.value} | ${row.source} | ${cellText(row.role_hint ?? "unknown")} | ${cellText(row.provenance?.selector)} | ${cellText(row.evidence.join(", "))} |`,
    );
  for (const limitation of tokens.coverage?.limitations ?? [])
    lines.push(`- ${cellText(limitation)}`);
  if (tokens.coverage?.candidates_omitted)
    lines.push(
      `- ${tokens.coverage.candidates_omitted} candidate contexts omitted by model budget; full observations remain in proposal.json.`,
    );
  lines.push(
    "",
    "### Component mappings",
    "",
    "Use only the properties mapped below; missing states and properties require validation.",
    "",
  );
  for (const row of tokens.components.filter((item) => item.tokens.length)) {
    lines.push(
      `- ${row.name} (${cellText(row.selector)}): ${row.tokens.map((item) => `${item.name} → ${item.reference}`).join("; ")}.`,
    );
  }
  lines.push(
    "",
    "### Contrast checks",
    "",
    "Only supported opaque text/background pairs are evaluated for normal text (AA ≥4.5:1). This is not a complete accessibility audit.",
    "",
  );
  if (tokens.contrast?.length) {
    lines.push(
      "| Pair | Text | Background | Ratio | Result | Evidence |",
      "| --- | --- | --- | --- | --- | --- |",
    );
    for (const pair of tokens.contrast)
      lines.push(
        `| ${pair.label} | ${pair.foreground} | ${pair.background} | ${pair.ratio.toFixed(2)}:1 | ${pair.grade} | ${cellText(pair.evidence.join(", "))} |`,
      );
    lines.push(
      "",
      "Failing pairs require design review; do not silently replace observed colors to improve the score.",
    );
  } else
    lines.push(
      "No supported opaque pairs available. Capture computed browser styles; unknown backgrounds, gradients and images require separate validation.",
    );
  const aliases = tokens.primitives.filter((row) => row.declarations.length);
  if (aliases.length) {
    lines.push(
      "",
      "### Original CSS alias uses",
      "",
      "These scoped declarations are evidence, not executable instructions or global definitions.",
      "",
    );
    for (const row of aliases)
      lines.push(`- ${row.id}: ${row.declarations.map(cellText).join("; ")}.`);
  }
  if (tokens.inventory.length) {
    lines.push(
      "",
      "### Additional declared candidates",
      "",
      "Inventory only: no semantic role inferred, excluded from generated token quality.",
      "",
      "| Property | Value | Scope | Evidence |",
      "| --- | --- | --- | --- |",
    );
    for (const row of tokens.inventory)
      lines.push(
        `| ${cellText(row.property)} | ${cellText(row.value)} | ${cellText(row.selector)} | ${cellText(row.evidence.join(", "))} |`,
      );
    if (tokens.omittedCandidates)
      lines.push(
        `\n${tokens.omittedCandidates} additional candidates retained in proposal.json (inventory limit: 64).`,
      );
  }
  lines.push(
    "",
    "### Generated token quality",
    "",
    "Source tokenization measures CSS var() adoption in the collected site. It is separate from the structural quality below; generating aliases here does not change that source score.",
    "",
    `${tokens.quality.score == null ? "Not evaluated" : `${tokens.quality.score}/100`}. ${tokens.quality.scope}`,
    "",
    tokens.quality.formula,
    "",
  );
  for (const row of tokens.quality.metrics)
    lines.push(
      `- ${row.label}: ${row.passed}/${row.total}${row.score == null ? " (not evaluated)" : ` (${row.score}/100)`}.`,
    );
  if (tokens.quality.missing.length)
    lines.push(`- Missing support: ${tokens.quality.missing.join(", ")}.`);
  lines.push(
    "",
    "### Usage",
    "",
    "- Use colors.background/foreground for the page, colors.primary/primary_foreground for primary actions when both are supported.",
    "- Use typography roles and the recorded spacing/radius samples; do not invent missing scales or merge different themes.",
    "- Component mappings apply only to the sampled selector. Validate hover, focus, disabled and responsive states separately.",
    "",
  );
  for (const limitation of tokens.limitations) lines.push(`- ${cellText(limitation)}`);
  return lines;
}
