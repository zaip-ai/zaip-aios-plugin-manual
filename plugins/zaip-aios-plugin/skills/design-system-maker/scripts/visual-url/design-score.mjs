import { semanticContrast } from "./contrast.mjs";

export { contrastRatio } from "./contrast.mjs";

import { lintDesign } from "./design-lint.mjs";
import { generatedTokens } from "./generated-tokens.mjs";

export const designScoreMethod = "design-score-v3";
export function designGrade(score) {
  return !Number.isFinite(score)
    ? null
    : score >= 90
      ? "A"
      : score >= 80
        ? "B"
        : score >= 70
          ? "C"
          : score >= 60
            ? "D"
            : "F";
}
const unique = (values) => [...new Set(values)];
const dimension = (value) => /^(?:0|(?:\d*\.)?\d+(?:px|rem|em|%))$/.test(value);
function category(id, label, score, value, ideal, explanation, evidence = []) {
  const rounded = Number.isFinite(score) ? Math.round(score) : null;
  return {
    id,
    label,
    score: rounded,
    grade: designGrade(rounded),
    status: rounded == null ? "unavailable" : "evaluated",
    value,
    ideal,
    explanation,
    evidence: unique(evidence).slice(0, 16),
  };
}

// A presentation projection: never replaces the immutable extraction coverage report.
export function designScore(proposal, report, model) {
  if (!proposal || report?.status !== "measured-evidence" || proposal.status === "failed")
    return null;
  const declarations = (proposal.observations ?? [])
    .filter(
      (item) =>
        item.reason == null &&
        ["static-css-declaration", "browser-CSS"].includes(item.provenance?.method),
    )
    .map((item) => {
      const separator = String(item.value).indexOf(":");
      return {
        id: item.id,
        property: String(item.value).slice(0, separator).trim().toLowerCase(),
        value: String(item.value)
          .slice(separator + 1)
          .trim(),
      };
    });
  const evidence = (rows) => rows.flatMap((row) => row.evidence ?? [row.id]).filter(Boolean);
  const colors = unique((report.colors ?? []).map((row) => row.value));
  const typography = report.typography ?? [];
  const families = unique(
    typography
      .filter(
        (row) =>
          /font-family$/.test(row.property) && !/^(inherit|initial|unset|var\()/i.test(row.value),
      )
      .map((row) => row.value.split(",")[0].trim().replace(/["']/g, "").toLowerCase()),
  );
  const sizes = unique(
    typography
      .filter((row) => /font-size$/.test(row.property) && dimension(row.value))
      .map((row) => row.value),
  );
  const levels = (rows) => unique(rows.flatMap((row) => row.value.split(/\s+/)).filter(dimension));
  const spacing = levels(report.spacing ?? []),
    radii = levels(report.radii ?? []);
  const styled = declarations.filter(
    (row) =>
      !row.property.startsWith("--") &&
      /^(?:color|background(?:-color)?|border(?:-.+)?|font(?:-.+)?|line-height|letter-spacing|padding(?:-.+)?|margin(?:-.+)?|gap|(?:row|column)-gap|box-shadow|fill|stroke)$/.test(
        row.property,
      ),
  );
  const references = styled.filter((row) => /var\(\s*--[\w-]+/.test(row.value));
  const tokenPercent = styled.length ? (100 * references.length) / styled.length : null;
  const colorScore = !colors.length
    ? null
    : colors.length > 80
      ? 50
      : colors.length > 60
        ? 70
        : colors.length > 40
          ? 85
          : colors.length > 25
            ? 95
            : 100;
  let typeScore = !families.length
    ? null
    : families.length > 6
      ? 50
      : families.length > 4
        ? 75
        : families.length === 1
          ? 85
          : 100;
  if (typeScore != null && sizes.length < 4) typeScore = Math.min(typeScore, 70);
  const scaleScore = (count, min, max) =>
    count === 0 ? null : count > max ? 75 : count >= min ? 100 : count >= min - 1 ? 80 : 60;
  const pairs = semanticContrast(model);
  const passing = pairs.filter((pair) => pair.ratio >= 4.5).length;
  const lint = lintDesign(proposal, model);
  const categories = [
    category(
      "color_discipline",
      "Color Discipline",
      colorScore,
      `${colors.length} cores`,
      "Até 40 cores",
      "Paleta CSS disponível: até 25 = 100; 26–40 = 95; 41–60 = 85; 61–80 = 70; acima = 50. Pode incluir temas e estados não visíveis na captura.",
      evidence(report.colors ?? []),
    ),
    category(
      "typography",
      "Typography",
      typeScore,
      `${families.length} famílias · ${sizes.length} tamanhos`,
      "2–4 famílias; ≥4 tamanhos",
      "Primeira família de cada declaração, sem contar fallbacks: 1 = 85; 2–4 = 100; 5–6 = 75; acima = 50. Menos de 4 tamanhos limita a 70.",
      evidence(typography),
    ),
    category(
      "spacing_system",
      "Spacing System",
      scaleScore(spacing.length, 4, 8),
      `${spacing.length} medidas`,
      "4–8 medidas",
      "Valores escalares únicos de margem, padding e gap. 4–8 = 100; 3 = 80; 1–2 = 60; acima de 8 = 75. Expressões não resolvidas são excluídas.",
      evidence(report.spacing ?? []),
    ),
    category(
      "border_radii",
      "Border Radii",
      scaleScore(radii.length, 3, 6),
      `${radii.length} níveis`,
      "3–6 níveis",
      "Raios escalares únicos: 3–6 = 100; 2 = 80; 1 = 60; acima de 6 = 75.",
      evidence(report.radii ?? []),
    ),
    category(
      "tokenization",
      "Tokenização da origem",
      tokenPercent,
      `${references.length}/${styled.length} declarações usam var()`,
      "≥80%",
      "100 × declarações visuais com var() / declarações visuais coletadas. Exclui definições --token e estilos computados; mantém valores literais e constantes no denominador para não elevar a nota por exclusão seletiva. CSS compilado e amostragem limitam a interpretação. Não mede a qualidade do DESIGN.md gerado.",
      evidence(references),
    ),
    category(
      "lint_compliance",
      "Lint Compliance",
      lint?.score ?? null,
      lint
        ? `${lint.errors} erros · ${lint.warnings} avisos · ${lint.checked_tokens} tokens verificados`
        : "Modelo visual indisponível",
      "0 erros · 0 avisos",
      lint
        ? `${lint.scope} ${lint.formula}`
        : "Sem tokens para executar o lint; categoria excluída da média.",
    ),
    category(
      "accessibility",
      "Accessibility",
      pairs.length ? (passing / pairs.length) * 100 : null,
      pairs.length
        ? `${passing}/${pairs.length} pares ≥4,5:1`
        : "Sem pares de texto/fundo com suporte",
      "100% dos pares ≥4,5:1",
      pairs.length
        ? "Contraste dos pares semânticos disponíveis, para texto normal. Não é auditoria completa de acessibilidade nem avaliação de todos os elementos da página."
        : "Nenhum par opaco de texto/fundo foi estabelecido nesta coleta. Reprocesse com navegador para obter estilos calculados; gradientes, imagens e transparências sem fundo conhecido permanecem não avaliados. Ausência de evidência não recebe nota.",
      evidence(pairs),
    ),
  ];
  const evaluated = categories.filter((item) => item.score != null);
  const overall = evaluated.length
    ? Math.round(evaluated.reduce((sum, item) => sum + item.score, 0) / evaluated.length)
    : null;
  return {
    method: designScoreMethod,
    overall,
    grade: designGrade(overall),
    categories,
    generated_token_quality: generatedTokens(proposal, model).quality,
    lint,
    contrast_pairs: pairs,
    evaluated_categories: evaluated.length,
    total_categories: categories.length,
    formula:
      "Média aritmética das categorias avaliadas, com pesos iguais. A ≥90; B ≥80; C ≥70; D ≥60; F <60. Não avaliadas ficam fora da média.",
    scope:
      "Heurística do sistema visual extraído; não representa avaliação estética ou certificação de acessibilidade.",
    limitations: [
      ...(report.sampling?.truncated > 0
        ? ["CSS amostrado: o resultado pode mudar com uma coleta mais ampla."]
        : []),
      ...([report.colors, typography, report.spacing, report.radii].some(
        (rows) => rows?.length >= 64,
      )
        ? [
            "Uma ou mais listas atingiram o limite de 64 valores do relatório; contagens são limitadas ao conjunto disponível.",
          ]
        : []),
      "Medidas em unidades diferentes são contadas separadamente. Lint avalia o contrato visual local; notas não são diretamente comparáveis ao método antigo.",
    ],
  };
}
