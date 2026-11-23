import { safeVisualValue } from "./visual-model.mjs";

export const designLintMethod = "visual-token-lint-v1";
const rules = [
  { id: "token-value", description: "Valores compatíveis com o contrato de tokens do Maker." },
  {
    id: "token-evidence",
    description: "Tokens ligados a observações existentes, sem falha registrada.",
  },
  { id: "token-provenance", description: "Proveniência registrada para cada token." },
  {
    id: "semantic-colors",
    description: "Fundo, texto, cor primária e texto primário disponíveis.",
  },
  { id: "body-family", description: "Família tipográfica principal disponível." },
  { id: "scales", description: "Escalas de espaçamento e raio disponíveis." },
];

// Lint the extracted design contract, not the remote site's source or Google DESIGN.md syntax.
export function lintDesign(proposal, model) {
  const rows = [];
  for (const group of ["colors", "typography", "spacing", "radii", "borders", "shadows"])
    for (const [key, token] of Object.entries(model?.tokens?.[group] ?? {}))
      if (token != null) rows.push({ path: `tokens.${group}.${key}`, token });
  for (const [index, component] of (model?.components ?? []).entries())
    for (const [key, token] of Object.entries(component.tokens ?? {}))
      if (token != null) rows.push({ path: `components.${index}.${key}`, token });
  if (!rows.length) return null;
  const observations = new Map((proposal?.observations ?? []).map((item) => [item.id, item]));
  const findings = [];
  const add = (rule, severity, path, message) => findings.push({ rule, severity, path, message });
  for (const { path, token } of rows) {
    if (typeof token.property !== "string" || safeVisualValue(token.property, token.value) == null)
      add("token-value", "error", path, "Valor inválido ou não suportado pelo contrato visual.");
    if (
      !Array.isArray(token.evidence) ||
      !token.evidence.length ||
      token.evidence.some((id) => !observations.has(id) || observations.get(id).reason != null)
    )
      add(
        "token-evidence",
        "error",
        path,
        "Token sem vínculo válido com as observações da extração.",
      );
    if (!token.provenance || typeof token.provenance !== "object" || !token.provenance.method)
      add("token-provenance", "error", path, "Token sem método de proveniência registrado.");
  }
  for (const role of ["background", "foreground", "primary", "primary_foreground"])
    if (!model.tokens.colors?.[role])
      add(
        "semantic-colors",
        "warning",
        `tokens.colors.${role}`,
        "Papel semântico ausente; o preview depende de fallback.",
      );
  if (!model.tokens.typography?.body_family)
    add(
      "body-family",
      "warning",
      "tokens.typography.body_family",
      "Família principal ausente; o preview depende de fallback.",
    );
  for (const scale of ["spacing", "radii"])
    if (!model.tokens[scale]?.length)
      add("scales", "warning", `tokens.${scale}`, "Escala não disponível no modelo extraído.");
  const errors = findings.filter((item) => item.severity === "error").length;
  const warnings = findings.filter((item) => item.severity === "warning").length;
  return {
    method: designLintMethod,
    status: "evaluated",
    scope:
      "Lint local do modelo de design extraído. Não executa o lint do site nem o @google/design.md.",
    checked_tokens: rows.length,
    errors,
    warnings,
    score: Math.max(0, 100 - errors * 20 - warnings * 5),
    formula: "100 − 20 por erro − 5 por aviso, com mínimo 0.",
    rules,
    findings: findings.slice(0, 100),
    omitted_findings: Math.max(0, findings.length - 100),
  };
}
