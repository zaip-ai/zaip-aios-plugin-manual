import { applyCapturedVisual } from "./captured-visual.mjs";
import { declaredCandidates } from "./color-candidates.mjs";
import { resolveVariables } from "./colors.mjs";
import { safeVisualValue } from "./safe-visual-value.mjs";

export { safeVisualValue } from "./safe-visual-value.mjs";

import { localDeclarationMethods } from "./local-source.mjs";

export const visualModelBytes = 65536;

export function boundedVisualModel(value) {
  if (value === null || value === undefined) return value;
  const model = structuredClone(value);
  const size = () => Buffer.byteLength(JSON.stringify(model), "utf8");
  if (size() <= visualModelBytes) return validateVisualModel(model);
  // Preserve representative palette and semantic globals before repeated component detail.
  let components = 0,
    tokens = 0;
  const omitted =
    "Modelo visual amostrado para64KiB; relatório e proveniência originais permanecem integrais";
  model.limitations.push(omitted);
  if (!model.unknown.includes("visual_model.budget_omissions"))
    model.unknown.push("visual_model.budget_omissions");
  const overflow = () => size() > visualModelBytes - 128;
  while (overflow() && model.components.length) {
    const removed = model.components.pop();
    components++;
    tokens += Object.values(removed.tokens ?? {}).filter(Boolean).length;
  }
  for (const key of ["borders", "shadows", "radii", "spacing"])
    while (overflow() && model.tokens[key].length) {
      model.tokens[key].pop();
      tokens++;
    }
  while (overflow() && model.variants.length) model.variants.pop();
  const omitCandidate = (index) => {
    model.color_candidates.splice(index, 1);
    if (model.coverage)
      model.coverage.candidates_omitted = (model.coverage.candidates_omitted ?? 0) + 1;
  };
  // Retain one full provenance context per source/value before any repeated contexts.
  for (let index = (model.color_candidates?.length ?? 0) - 1; index >= 0 && overflow(); index--) {
    const row = model.color_candidates[index];
    if (
      model.color_candidates
        .slice(0, index)
        .some((other) => other.source === row.source && other.value === row.value)
    )
      omitCandidate(index);
  }
  for (const [group, keys] of [
    [
      "typography",
      ["letter_spacing", "line_height", "weight", "size", "heading_family", "body_family"],
    ],
    [
      "colors",
      [
        "card_foreground",
        "card",
        "border",
        "muted",
        "secondary",
        "accent",
        "primary_foreground",
        "foreground",
        "background",
        "primary",
      ],
    ],
  ])
    for (const key of keys)
      if (overflow() && model.tokens[group][key] !== null) {
        model.tokens[group][key] = null;
        model.unknown.push(`${group}.${key}`);
        tokens++;
      }
  while (overflow() && model.color_candidates?.length)
    omitCandidate(model.color_candidates.length - 1);
  model.limitations.push(
    `${components} componentes e ${tokens} tokens omitidos do modelo de demonstração`,
  );
  return validateVisualModel(model);
}

const colorNames = {
  background: ["background", "bg", "bg-base", "surface", "canvas"],
  foreground: ["foreground", "text-primary", "text", "fg"],
  primary: ["primary", "color-brand", "brand", "accent"],
  primary_foreground: ["primary-foreground", "on-primary"],
  secondary: ["secondary"],
  muted: ["muted"],
  accent: ["accent"],
  border: ["border"],
  card: ["card", "surface-alt", "surface"],
  card_foreground: ["card-foreground"],
};

export function validateVisualModel(value) {
  if (value === null || value === undefined) return value;
  if (
    value.schema_version !== 1 ||
    value.method !== "declared-semantic-v1" ||
    !["inferred", "unavailable"].includes(value.status) ||
    !value.tokens?.colors ||
    !value.tokens?.typography ||
    !Array.isArray(value.components) ||
    value.components.length > 12 ||
    !Array.isArray(value.variants) ||
    value.variants.length > 8 ||
    Buffer.byteLength(JSON.stringify(value), "utf8") > visualModelBytes
  )
    throw new Error("Invalid bounded visual model");
  if (value.color_candidates !== undefined) {
    if (!Array.isArray(value.color_candidates) || value.color_candidates.length > 32)
      throw new Error("Invalid visual color candidates");
    for (const row of value.color_candidates)
      if (
        !/^#[a-f\d]{6}$/.test(row.value) ||
        !["observed", "declared"].includes(row.source) ||
        row.kind !== "inferred" ||
        typeof row.property !== "string" ||
        !/^(?:--)?[a-zA-Z][\w-]{0,127}$/.test(row.property) ||
        !Array.isArray(row.evidence) ||
        !row.evidence.length ||
        row.evidence.length > 16 ||
        !row.provenance ||
        typeof row.reason !== "string" ||
        row.reason.length > 512 ||
        ![
          null,
          "action",
          "gradient-text",
          "pseudo",
          "svg-paint",
          "footer",
          "surface",
          "text",
        ].includes(row.role_hint)
      )
        throw new Error("Unsafe visual color candidate");
  }
  if (
    value.coverage !== undefined &&
    (!value.coverage ||
      !["sampled", "incomplete", "legacy-unknown"].includes(value.coverage.status) ||
      !Array.isArray(value.coverage.limitations) ||
      value.coverage.limitations.length > 8)
  )
    throw new Error("Invalid visual capture coverage");
  const tokens = [
    ...Object.values(value.tokens.colors),
    ...Object.values(value.tokens.typography),
    ...["spacing", "radii", "shadows", "borders"].flatMap((key) => {
      if (!Array.isArray(value.tokens[key]) || value.tokens[key].length > 12)
        throw new Error("Invalid visual token scale");
      return value.tokens[key];
    }),
    ...value.components.flatMap((item) => Object.values(item.tokens ?? {})),
  ];
  for (const token of tokens)
    if (
      token !== null &&
      (token.kind !== "inferred" ||
        safeVisualValue(token.property, token.value) !== token.value ||
        !Array.isArray(token.evidence) ||
        !token.evidence.length ||
        token.evidence.length > 16 ||
        !token.provenance)
    )
      throw new Error("Unsafe visual model token");
  return value;
}

export function visualModel(proposal, report) {
  if (proposal.local_visual_model) return boundedVisualModel(proposal.local_visual_model);
  const declarations = proposal.observations
    .filter(
      (item) =>
        ["static-css-declaration", "browser-CSS", ...localDeclarationMethods].includes(
          item.provenance.method,
        ) && item.reason === null,
    )
    .map((item) => {
      const split = item.value.indexOf(":");
      return {
        ...item,
        property: item.value.slice(0, split).trim(),
        declared: item.value.slice(split + 1).trim(),
      };
    });
  const variables = new Map(),
    scopes = new Map();
  for (const item of declarations.filter((item) => item.property.startsWith("--"))) {
    if (!scopes.has(item.provenance.selector)) scopes.set(item.provenance.selector, new Map());
    scopes.get(item.provenance.selector).set(item.property, item.declared);
    if (/^(?::root|html)$/.test(item.provenance.selector))
      variables.set(item.property, item.declared);
  }
  const resolve = (item) =>
    resolveVariables(
      item.declared,
      (key) => scopes.get(item.provenance.selector)?.get(key) ?? variables.get(key),
    );
  const token = (item, property = item?.property) => {
    if (!item) return null;
    const value = resolve(item);
    const safe = value === null ? null : safeVisualValue(property, value);
    return safe === null
      ? null
      : {
          value: safe,
          property,
          kind: "inferred",
          evidence: [item.id],
          provenance: item.provenance,
          reason: "Declaração estática normalizada; cascata e estado ativo não calculados",
        };
  };
  const exactRoot = (item) => /^(?::root|html|body)$/.test(item.provenance.selector);
  const simpleMatch = (selector, node) =>
    selector.split(",").some((group) => {
      const name = group.trim();
      return (
        name === node.tag ||
        name === node.selector ||
        (/^\.[\w-]+$/.test(name) && node.selector.split(/[.#\s]/).includes(name.slice(1)))
      );
    });
  const colors = {};
  for (const [role, names] of Object.entries(colorNames)) {
    const named = declarations.filter(
      (item) =>
        item.property.startsWith("--") &&
        names.some((name) => item.property === `--${name}` || item.property.endsWith(`-${name}`)),
    );
    named.sort((a, b) => Number(exactRoot(b)) - Number(exactRoot(a)));
    const base = named.filter(exactRoot);
    colors[role] = base.map((item) => token(item, role)).find(Boolean) ?? null;
    if (!colors[role]) {
      const properties =
        role === "background"
          ? ["background", "background-color"]
          : role === "foreground"
            ? ["color"]
            : [];
      colors[role] =
        declarations
          .filter((item) => exactRoot(item) && properties.includes(item.property))
          .map((item) => token(item))
          .find(Boolean) ?? null;
    }
  }
  const font = (heading) => {
    const nodes = proposal.dom.filter((node) =>
      heading ? /^h[1-6]$/.test(node.tag) : node.tag === "body",
    );
    const rank = (item) =>
      nodes.some((node) => simpleMatch(item.provenance.selector, node))
        ? 3
        : exactRoot(item) && item.property.startsWith("--")
          ? 2
          : exactRoot(item) && !heading
            ? 1
            : 0;
    const items = declarations
      .filter(
        (item) =>
          item.property === "font-family" ||
          (item.property.startsWith("--") &&
            (heading
              ? /-(?:font-heading|heading-font)$/.test(item.property)
              : /-(?:font-sans|font-body|body-font)$/.test(item.property))),
      )
      .filter((item) => rank(item) > 0);
    items.sort((a, b) => rank(b) - rank(a));
    return items.map((item) => token(item, "font-family")).find(Boolean) ?? null;
  };
  const one = (property) =>
    declarations
      .filter((item) => item.property === property)
      .sort((a, b) => Number(exactRoot(b)) - Number(exactRoot(a)))
      .map((item) => token(item))
      .find(Boolean) ?? null;
  const rows = (expression) => {
    const seen = new Set(),
      result = [];
    for (const item of declarations.filter((item) => expression.test(item.property))) {
      const value = token(item);
      if (value && !seen.has(`${value.property}:${value.value}`)) {
        seen.add(`${value.property}:${value.value}`);
        result.push(value);
      }
      if (result.length === 12) break;
    }
    return result;
  };
  const tokens = {
    colors,
    typography: {
      body_family: font(false),
      heading_family: font(true),
      size: one("font-size"),
      weight: one("font-weight"),
      line_height: one("line-height"),
      letter_spacing: one("letter-spacing"),
    },
    spacing: rows(/^(?:padding|margin|gap|row-gap|column-gap)$/),
    radii: rows(/radius$/),
    shadows: rows(/shadow$/),
    borders: rows(/^border-(?:width|color|style)$/),
  };
  const componentProperties = {
    background: "background-color",
    foreground: "color",
    border: "border-color",
    radius: "border-radius",
    padding: "padding",
    font_family: "font-family",
    font_size: "font-size",
    font_weight: "font-weight",
    shadow: "box-shadow",
  };
  const components = report.components.slice(0, 12).map((item) => {
    const local = declarations.filter((declaration) =>
      simpleMatch(declaration.provenance.selector, item),
    );
    return {
      ...item,
      tokens: Object.fromEntries(
        Object.entries(componentProperties).map(([role, property]) => [
          role,
          local
            .filter((row) => row.property === property)
            .map((row) => token(row))
            .find(Boolean) ?? null,
        ]),
      ),
    };
  });
  return boundedVisualModel(
    applyCapturedVisual(
      {
        schema_version: 1,
        method: "declared-semantic-v1",
        status: declarations.length ? "inferred" : "unavailable",
        tokens,
        color_candidates: declaredCandidates(declarations, resolve).slice(0, 32),
        coverage: {
          status: "incomplete",
          method: "static-declarations",
          scanned: null,
          sampled: null,
          omitted: null,
          readiness: null,
          limitations: [
            "CSS declarado não comprova elementos renderizados, tema ativo ou prontidão de recursos.",
          ],
        },
        components,
        theme: { status: "unknown", active: null, declared: report.themes },
        variants: [...scopes.keys()]
          .filter((selector) => /theme|dark|light/i.test(selector))
          .slice(0, 8)
          .map((selector) => ({
            selector,
            status: "inferred",
            reason: "Escopo declarado; não representa tema ativo",
          })),
        unknown: [
          ...Object.entries(colors)
            .filter(([, value]) => value === null)
            .map(([key]) => `colors.${key}`),
          ...Object.entries(tokens.typography)
            .filter(([, value]) => value === null)
            .map(([key]) => `typography.${key}`),
          "font_faces.actual_bytes",
          "motion.executed_behavior",
          "stack.runtime",
          "contrast.computed_cascade",
        ],
        limitations: [
          "Demonstração com tokens inferidos; não reprodução da página ou cascata observada",
          "Valores ausentes exigem fallback local explícito; nenhum CSS/HTML externo aplicado",
          "Componentes locais usam apenas seletor/tag exatos; seletores compostos e pseudoestados não resolvidos",
        ],
      },
      proposal,
      safeVisualValue,
    ),
  );
}
