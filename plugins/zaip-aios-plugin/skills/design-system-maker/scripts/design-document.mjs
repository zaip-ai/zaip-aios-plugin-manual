const scalarDimension = /^-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|em|rem)$/;
const dimension = (value) =>
  value === "0" ? "0px" : scalarDimension.test(value ?? "") ? value : undefined;
const color = (value) => /^#[a-f\d]{6}(?:[a-f\d]{2})?$/i.test(value ?? "");
const opaque = (value) => color(value) && (value.length === 7 || value.slice(-2).toLowerCase() === "ff");
const length = (value) => Number.parseFloat(value);
const keyFor = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const sourceRef = (path) => `{${path}}`;

function yamlLines(value, indent = "") {
  return Object.entries(value).flatMap(([key, entry]) => {
    if (Array.isArray(entry)) return [`${indent}${key}: ${JSON.stringify(entry)}`];
    if (typeof entry === "object") return [`${indent}${key}:`, ...yamlLines(entry, indent + "  ")];
    return [`${indent}${key}: ${JSON.stringify(entry)}`];
  });
}

function exportTypography(values) {
  const output = {};
  if (values.family) output.fontFamily = values.family;
  if (dimension(values.size) && length(values.size) > 0) output.fontSize = values.size;
  const weight = { normal: 400, bold: 700 }[values.weight] ?? Number(values.weight);
  if (Number.isInteger(weight) && weight >= 1 && weight <= 1000) output.fontWeight = weight;
  if (dimension(values.lineHeight) && length(values.lineHeight) > 0) {
    output.lineHeight = values.lineHeight;
  } else if (/^\d+(?:\.\d+)?$/.test(values.lineHeight ?? "") && Number(values.lineHeight) > 0) {
    output.lineHeight = Number(values.lineHeight);
  }
  if (dimension(values.letterSpacing)) output.letterSpacing = dimension(values.letterSpacing);
  return output;
}

export function designDocument(proposal, model) {
  const host = new URL(proposal.source.url).hostname;
  const groups = { colors: {}, typography: {}, rounded: {}, spacing: {}, components: {} };
  const evidence = {};
  const known = new Set(proposal.observations.filter((row) => row.reason == null).map((row) => row.id));
  const supported = (token) => token?.evidence?.length && token.evidence.every((id) => known.has(id));
  const value = (token) => supported(token) ? token.value : undefined;
  const put = (group, key, entry, tokens) => {
    groups[group][key] = entry;
    evidence[`${group}.${key}`] = [...new Set(tokens.filter(supported).flatMap((token) => token.evidence))];
    return sourceRef(`${group}.${key}`);
  };
  const palette = { ...model.tokens.colors };
  const control = /(?:^|[>\s])(?:button|a|input|select)(?:[:.#\[][^ >]*)?$/i;
  const primaryControl = control.test(palette.primary?.provenance?.selector ?? "");
  if (!primaryControl && palette.primary?.provenance?.method === "browser-computed-style") {
    // A colored descendant of a control can be an icon or decoration. Keep it in the inventory.
    palette.primary = palette.accent;
    delete palette.primary_foreground;
    delete palette.accent;
  }
  for (const [role, token] of Object.entries(palette)) {
    if (color(value(token))) put("colors", keyFor(role), token.value, [token]);
  }

  const type = model.tokens.typography ?? {};
  // Only combine typography properties observed on the same selector and in the same source context.
  const context = (token) => JSON.stringify([
    token?.provenance?.url, token?.provenance?.selector, token?.provenance?.method,
  ]);
  const matching = (base, token) => supported(base) && supported(token) && context(base) === context(token);
  const typeFields = { size: type.size, weight: type.weight, lineHeight: type.line_height, letterSpacing: type.letter_spacing };
  for (const [role, family] of [["body", type.body_family], ["heading", type.heading_family]]) {
    if (!supported(family)) continue;
    if (role === "heading" && context(family) === context(type.body_family)) continue;
    const fields = Object.entries(typeFields).filter(([, token]) => matching(family, token));
    const entry = exportTypography({ family: family.value, ...Object.fromEntries(fields.map(([key, token]) => [key, token.value])) });
    put("typography", role, entry, [family, ...fields.map(([, token]) => token)]);
  }

  const scale = (group, tokens) => {
    const values = new Set();
    for (const token of tokens ?? []) {
      const v = (value(token) ?? "").split(/\s+/).map(dimension);
      for (const part of v) {
        if (!part || length(part) < 0 || values.has(part)) continue;
        values.add(part);
        put(group, `step-${values.size}`, part, [token]);
      }
    }
  };
  scale("rounded", model.tokens.radii);
  scale("spacing", model.tokens.spacing);

  for (const [index, candidate] of (model.components ?? []).entries()) {
    const t = candidate.tokens ?? {};
    if (candidate.selector === "button-primary" && !primaryControl) continue;
    const base = keyFor(candidate.tag ?? "element") || "element";
    const name = candidate.selector === "button-primary" ? "button-primary" : `${base}-${index + 1}`;
    const properties = {};
    const used = [];
    const bind = (field, group, suffix, token, entry) => {
      if (!entry) return;
      properties[field] = put(group, `${name}-${suffix}`, entry, [token]);
      used.push(token);
    };
    for (const [field, suffix, token] of [
      ["backgroundColor", "background", t.background], ["textColor", "text", t.foreground],
    ]) {
      // A translucent or gradient surface does not establish a usable solid background.
      if ((field === "backgroundColor" ? opaque : color)(value(token))) {
        bind(field, "colors", suffix, token, token.value);
      }
    }
    bind("rounded", "rounded", "radius", t.radius, dimension(value(t.radius)));
    bind("padding", "spacing", "padding", t.padding, dimension(value(t.padding)));
    const fields = [["family", t.font_family], ["size", t.font_size], ["weight", t.font_weight]];
    const baseFont = fields.find(([, token]) => supported(token))?.[1];
    const sampled = fields.filter(([, token]) => matching(baseFont, token));
    const style = exportTypography(Object.fromEntries(sampled.map(([key, token]) => [key, token.value])));
    if (Object.keys(style).length) {
      const tokens = sampled.map(([, token]) => token);
      properties.typography = put("typography", name, style, tokens);
      used.push(...tokens);
    }
    if (used.length) put("components", name, properties, used);
  }

  const available = Object.entries(groups).filter(([, group]) => Object.keys(group).length);
  if (!available.length) throw new Error("A captura não forneceu tokens exportáveis para DESIGN.md.");
  const omitted = Object.keys(groups).filter((key) => !Object.keys(groups[key]).length);
  const frontmatter = {
    version: "alpha",
    name: host,
    description: "Referência visual extraída de uma página em navegador.",
    omitted,
    ...Object.fromEntries(available),
  };
  for (const binding of Object.values(groups.components).flatMap(Object.values)) {
    const [group, token] = binding.slice(1, -1).split(".");
    if (!Object.hasOwn(groups[group], token)) throw new Error("Referência de token sem destino.");
  }

  const screenshot = proposal.screenshot;
  const sections = [
    ["Overview", `Proposta para ${host}, baseada no viewport ${screenshot.viewport.width} × ${screenshot.viewport.height} e no estado registrados em ` + "`@evidencias.json`. Use o PDF para consultar as lacunas e a metodologia."],
    ["Colors", Object.keys(groups.colors).length && "Use os papéis de cor registrados para reproduzir as superfícies e os controles da amostra. Consulte os pares de contraste do diagnóstico antes de reutilizar uma combinação. Controles com fundo translúcido ou gradiente podem exigir a receita de pintura da origem."],
    ["Typography", Object.keys(groups.typography).length && "Aplique as propriedades registradas por papel ou componente. Confirme a disponibilidade das famílias de fonte no destino."],
    ["Layout", Object.keys(groups.spacing).length && "As medidas numeradas registram valores da amostra. Verifique margens, alinhamento e comportamento em outros tamanhos de tela."],
    ["Shapes", Object.keys(groups.rounded).length && "Use os raios registrados nas superfícies e nos controles com evidência correspondente."],
    ["Components", Object.keys(groups.components).length && "As referências no YAML apontam para tokens do próprio arquivo. Cada componente representa uma amostra. Confirme estados de foco, interação e desabilitado separadamente."],
    ["Do's and Don'ts", "Confira a evidência antes de aplicar um token ao projeto. Preserve lacunas da captura e valide outros estados e páginas separadamente."],
  ];
  return {
    markdown: ["---", ...yamlLines(frontmatter), "---", "", `# Design system de ${host}`, "",
      ...sections.filter(([, body]) => body).flatMap(([title, body]) => [`## ${title}`, "", body, ""]),
    ].join("\n"),
    evidence,
    frontmatter,
  };
}
