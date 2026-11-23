import { captureCoverage, chroma, gradientColors, mergeCandidates } from "./color-candidates.mjs";
// Project verified browser observations into local demonstration roles. Semantic
// assignment is inferred; the referenced scalar/viewport remain observed evidence.
export function applyCapturedVisual(model, proposal, normalize) {
  if (!proposal.capabilities?.browser_resolved || !proposal.capabilities?.runtime_rendered)
    return model;
  const nodes = [];
  let node;
  for (const item of proposal.observations) {
    if (
      item.kind !== "observed" ||
      item.reason !== null ||
      item.provenance.method !== "browser-computed-style" ||
      !item.provenance.viewport
    )
      continue;
    const property = /^Browser computed ([a-z-]+)$/.exec(item.subject)?.[1];
    if (!property) continue;
    const selector = item.provenance.selector;
    node = nodes.findLast((row) => row.selector === selector && !row.values[property]);
    if (!node) {
      node = { selector, values: {}, raw: {}, context: null };
      nodes.push(node);
    }
    node.raw[property] = item;
    if (property === "sample-context") {
      try {
        const value = JSON.parse(item.value);
        if (
          ["action", "heading", "surface"].includes(value.role) &&
          /^(?:[a-z]{1,16})$/.test(value.tag) &&
          /^(body|header|footer|nav|main|section|article|aside)$/.test(value.region)
        )
          node.context = {
            role: value.role,
            tag: value.tag,
            region: value.region,
            element_id: /^rendered-\d{1,4}$/.test(value.element_id) ? value.element_id : null,
            action_selector:
              typeof value.action_selector === "string" && value.action_selector.length <= 500
                ? value.action_selector
                : null,
            source_type: value.source_type === "pseudo" ? "pseudo" : "element",
            in_viewport: value.in_viewport === true,
          };
      } catch {
        /* Invalid context cannot affect semantic roles. */
      }
    }
    const value = normalize(property, item.value);
    // Even an unsupported property delimits duplicate same-selector nodes.
    node.values[property] =
      value === null
        ? { unavailable: true }
        : {
            value,
            property,
            kind: "inferred",
            evidence: [item.id],
            provenance: item.provenance,
            reason: "Papel de demonstração inferido de estilo calculado no viewport capturado",
          };
  }
  if (!nodes.length) return model;
  const tag = (n) =>
    n.selector
      .split(" > ")
      .at(-1)
      .match(/^[a-z][a-z0-9]*/)?.[0];
  model.status = "inferred";
  const scalar = (node, key) => (node?.values[key]?.value ? node.values[key] : null);
  const opaque = (token) => token && /^#[a-f\d]{6}(?:ff)?$/i.test(token.value);
  const body = nodes.find((n) => /^body(?:#|$)/.test(n.selector));
  const root = nodes.find((n) => /^html(?:#|$)/.test(n.selector));
  const colors = model.tokens.colors;
  const background = [scalar(body, "background-color"), scalar(root, "background-color")].find(
    opaque,
  );
  const foreground = scalar(body, "color");
  if (background) colors.background = background;
  if (foreground) colors.foreground = foreground;
  // Existing declarations can belong to an inactive theme. Keep unknown roles
  // neutral/derived in the renderer instead of mixing them into the captured one.
  for (const key of [
    "card",
    "card_foreground",
    "secondary",
    "muted",
    "border",
    "accent",
    "primary",
    "primary_foreground",
  ])
    colors[key] = null;
  if (background) colors.card = background;
  if (foreground) colors.card_foreground = foreground;
  const luminance = (hex) => {
    const c = [1, 3, 5]
      .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  };
  const canvas = colors.background?.value;
  const paint = [];
  for (const n of nodes) {
    const action =
      n.context?.role === "action" || ["button", "a", "input", "select"].includes(tag(n));
    const clipped = n.raw["background-clip"]?.value === "text";
    for (const property of ["background-color", "background-image", "color", "fill", "stroke"]) {
      const item = n.raw[property];
      if (!item) continue;
      const values =
        property === "background-image"
          ? gradientColors(item.value)
          : [scalar(n, property)?.value].filter(Boolean);
      for (const value of values) {
        if (!/^#[a-f\d]{6}$/i.test(value)) continue;
        const role_hint =
          action && property === "background-color"
            ? "action"
            : property === "background-image" && clipped
              ? "gradient-text"
              : n.context?.source_type === "pseudo"
                ? "pseudo"
                : ["fill", "stroke"].includes(property)
                  ? "svg-paint"
                  : n.context?.region === "footer"
                    ? "footer"
                    : property === "background-color" || property === "background-image"
                      ? "surface"
                      : "text";
        const token = {
          value,
          property: property === "background-image" ? "color" : property,
          kind: "inferred",
          evidence: [item.id],
          provenance: item.provenance,
          reason:
            "Papel proposto a partir de cor computada; contraste não determina presença da cor",
        };
        const actionPaint =
          action && ["background-color", "background-image"].includes(property) && value !== canvas;
        // Ordinary text is an inventory value, never evidence of an action/highlight role.
        const highlightPaint =
          value !== canvas &&
          !["html", "body"].includes(tag(n)) &&
          ["background-color", "background-image", "fill", "stroke"].includes(property) &&
          chroma(value) >= 0.08;
        const rank =
          (role_hint === "action"
            ? 100
            : role_hint === "gradient-text"
              ? 70
              : role_hint === "surface"
                ? 50
                : 20) +
          chroma(value) * 10;
        paint.push({
          n,
          token,
          actionPaint,
          highlightPaint,
          rank,
          candidate: {
            value,
            property,
            source: "observed",
            kind: "inferred",
            evidence: [item.id],
            provenance: item.provenance,
            role_hint,
            element_id: n.context?.element_id ?? null,
            in_viewport: n.context?.in_viewport ?? null,
            ...(n.context?.action_selector ? { action_selector: n.context.action_selector } : {}),
            reason:
              "Valor computado observado; papel semântico inferido, sem descartar baixo contraste",
          },
        });
      }
    }
  }
  // Equal semantic/chroma evidence follows the stable element path, not sampling order.
  paint.sort(
    (a, b) => b.rank - a.rank || a.n.selector.localeCompare(b.n.selector, "en", { numeric: true }),
  );
  const primaryPaint = paint.find((row) => row.actionPaint);
  const primary = primaryPaint?.n;
  if (primaryPaint) {
    colors.primary = primaryPaint.token;
    // A text/gradient/SVG color is not evidence of a filled control/text pair.
    const textSource = primary.context?.action_selector
      ? nodes.find((row) => row.selector === primary.context.action_selector)
      : primary;
    colors.primary_foreground =
      primaryPaint.candidate.property === "background-color" ? scalar(textSource, "color") : null;
  }
  const accent = paint.find(
    (row) => row.highlightPaint && row.token.value !== colors.primary?.value,
  );
  if (accent) colors.accent = accent.token;
  const inventory = mergeCandidates(
    paint.map((row) => row.candidate),
    model.color_candidates ?? [],
  );
  model.color_candidates = inventory.rows;
  model.coverage = { ...captureCoverage(proposal), candidates_omitted: inventory.omitted };
  const heading = nodes.find((n) => /^h[1-3]$/.test(tag(n)));
  const typography = model.tokens.typography;
  for (const [role, property] of Object.entries({
    body_family: "font-family",
    size: "font-size",
    weight: "font-weight",
    line_height: "line-height",
    letter_spacing: "letter-spacing",
  })) {
    const value = scalar(body, property);
    if (value) typography[role] = value;
  }
  typography.heading_family = scalar(heading, "font-family") ?? typography.body_family;
  // Repeated selectors (e.g. many buttons) do not identify a unique node. Never
  // apply the first matching node's colors to all demo controls.
  if (body)
    model.components = model.components.map(({ tokens, ...item }) => ({ ...item, tokens: {} }));
  if (primary)
    model.components = [
      {
        tag: "button",
        selector: "button-primary",
        role: "button",
        text: "Primário",
        evidence: colors.primary.evidence,
        provenance: colors.primary.provenance,
        tokens: {
          background: colors.primary,
          foreground: colors.primary_foreground,
          radius: scalar(primary, "border-radius"),
          font_family: scalar(primary, "font-family"),
          font_weight: scalar(primary, "font-weight"),
          border: scalar(primary, "border-color"),
          shadow: scalar(primary, "box-shadow"),
        },
      },
      ...model.components,
    ].slice(0, 12);
  // Only uniquely addressed captured elements can receive their own mappings.
  // Repeated legacy selectors must never spread one button's style to all buttons.
  const captured = nodes
    .filter(
      (n) =>
        ["button", "a", "input", "select", "nav"].includes(tag(n)) &&
        nodes.filter((other) => other.selector === n.selector).length === 1,
    )
    .slice(0, 10)
    .map((n) => ({
      tag: tag(n),
      selector: n.selector,
      role: tag(n),
      text: "",
      evidence: scalar(n, "color")?.evidence ?? [],
      provenance: scalar(n, "color")?.provenance,
      tokens: Object.fromEntries(
        Object.entries({
          foreground: "color",
          background: "background-color",
          radius: "border-radius",
          border: "border-color",
          padding: "padding",
          font_family: "font-family",
          font_size: "font-size",
          font_weight: "font-weight",
          shadow: "box-shadow",
        }).map(([role, property]) => [role, scalar(n, property)]),
      ),
    }));
  model.components = [
    ...model.components.filter((c) => c.selector === "button-primary"),
    ...captured,
    ...model.components.filter(
      (c) => c.selector !== "button-primary" && !captured.some((n) => n.selector === c.selector),
    ),
  ].slice(0, 12);
  model.unknown = model.unknown.filter(
    (key) => !key.startsWith("colors.") && !key.startsWith("typography."),
  );
  for (const group of ["colors", "typography"])
    for (const [key, value] of Object.entries(model.tokens[group]))
      if (!value) model.unknown.push(`${group}.${key}`);
  model.theme = {
    ...model.theme,
    status: background ? "observed" : "unknown",
    active: background ? (luminance(background.value) < 0.25 ? "dark" : "light") : null,
    basis: "browser-computed-style",
    viewport: body?.values.color?.provenance?.viewport ?? null,
  };
  model.limitations = [
    "Estilos calculados da captura priorizados; papéis semânticos de demonstração são inferidos.",
    "A captura cobre um viewport e momento; CSS declarado pode incluir cores de outros temas, estados e elementos fora da captura.",
    "Valores ausentes usam alternativas neutras locais; fontes dependem dos arquivos disponíveis no dispositivo.",
  ];
  return model;
}
