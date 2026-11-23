import { normalizeColor } from "./colors.mjs";

export function gradientColors(value) {
  if (
    typeof value !== "string" ||
    value.length > 2048 ||
    /url\(|var\(|[;{}<>\\]/i.test(value) ||
    !/^(?:repeating-)?(?:linear|radial|conic)-gradient\(.+\)$/i.test(value)
  )
    return [];
  const colors = [];
  const remaining = value
    .replace(
      /(?:rgba?|hsla?)\([^()]{1,128}\)|#[a-f\d]{3,8}\b|\b(?:transparent|black|white|red|blue|green|gray|grey|yellow|orange|purple|pink|cyan|magenta|navy|teal)\b/gi,
      (match) => {
        const color = normalizeColor(match);
        if (color && color.length === 7) colors.push(color);
        return "0";
      },
    )
    .replace(/(?:repeating-)?(?:linear|radial|conic)-gradient\(/gi, "(");
  // Only scalar stops and standard geometry survive. No arbitrary CSS is emitted.
  if (/[a-z-]+\s*\(/i.test(remaining) || /[^\w\s.,()%+\-]/.test(remaining)) return [];
  return [...new Set(colors)].slice(0, 8);
}

export function chroma(value) {
  const rgb = [1, 3, 5].map((i) => parseInt(value.slice(i, i + 2), 16));
  return (Math.max(...rgb) - Math.min(...rgb)) / 255;
}

export function captureCoverage(proposal) {
  const observation = proposal.observations.find(
    (item) =>
      item.subject === "Browser capture coverage" &&
      item.kind === "observed" &&
      item.reason === null &&
      item.provenance?.method === "browser-computed-style" &&
      item.provenance.viewport,
  );
  let data;
  try {
    data = JSON.parse(observation?.value ?? "null");
  } catch {
    /* legacy or invalid metadata */
  }
  const count = (value) => Number.isSafeInteger(value) && value >= 0 && value <= 10000000;
  const valid =
    data?.method === "region-paint-balanced-v1" &&
    [data.scanned, data.sampled, data.omitted, data.scan_omitted].every(count) &&
    data.sampled <= 48 &&
    data.scanned <= 2000;
  const ready = data?.readiness;
  const readiness =
    ready &&
    ["loaded", "loading", "unavailable"].includes(ready.fonts) &&
    [ready.images_pending, ready.images_failed, ready.images_omitted].every(count) &&
    typeof ready.layout_stable === "boolean"
      ? {
          fonts: ready.fonts,
          images_pending: ready.images_pending,
          images_failed: ready.images_failed,
          images_omitted: ready.images_omitted,
          layout_stable: ready.layout_stable,
        }
      : null;
  return valid
    ? {
        method: data.method,
        status:
          !readiness ||
          readiness.fonts !== "loaded" ||
          readiness.images_pending ||
          readiness.images_failed ||
          readiness.images_omitted ||
          !readiness.layout_stable ||
          data.scan_omitted
            ? "incomplete"
            : "sampled",
        scanned: data.scanned,
        sampled: data.sampled,
        omitted: data.omitted,
        scan_omitted: data.scan_omitted,
        readiness,
        limitations: [
          "Amostra limitada de elementos renderizados no documento; não mede pixels ou cobertura de todos os estados.",
          "Elementos fora do viewport não são comprovados pelo screenshot; imagens de fundo e recursos tardios podem permanecer ausentes.",
        ],
      }
    : {
        status: "legacy-unknown",
        method: null,
        scanned: null,
        sampled: null,
        omitted: null,
        readiness: null,
        limitations: [
          "Captura salva sem inventário de amostragem/prontidão; cobertura não estabelecida.",
        ],
      };
}

export function declaredCandidates(declarations, resolve) {
  const result = [],
    seen = new Set();
  for (const item of declarations) {
    if (!/color|background|fill|stroke|primary|accent|foreground|muted|^--/.test(item.property))
      continue;
    const raw = resolve(item);
    if (!raw) continue;
    const colors = [normalizeColor(raw), ...gradientColors(raw)].filter(Boolean);
    for (const value of colors) {
      if (value.length !== 7 || seen.has(value)) continue;
      seen.add(value);
      result.push({
        value,
        source: "declared",
        kind: "inferred",
        property: item.property,
        evidence: [item.id],
        provenance: item.provenance,
        role_hint: null,
        reason: "Declaração CSS; elemento, estado e tema ativo não comprovados",
      });
    }
  }
  return result;
}

export function mergeCandidates(observed, declared) {
  const rows = [],
    seen = new Set();
  for (const item of [...observed, ...declared]) {
    const key = `${item.source}:${item.value}:${item.property}:${item.provenance?.selector}`;
    if (seen.has(key)) continue;
    seen.add(key);
    rows.push(item);
  }
  const representative = new Set();
  const measuredRows = rows.filter((row) => row.source === "observed");
  const measured = [
    ...measuredRows.filter((row) => {
      if (representative.has(row.value)) return false;
      representative.add(row.value);
      return true;
    }),
    ...measuredRows.filter(
      (row) => measuredRows.find((other) => other.value === row.value) !== row,
    ),
  ];
  const css = rows.filter((row) => row.source === "declared");
  const selected = [
    ...measured.slice(0, 24),
    ...css.slice(0, Math.max(8, 32 - Math.min(measured.length, 24))),
  ];
  for (const row of [...measured.slice(24), ...css.slice(8)]) {
    if (selected.length >= 32) break;
    if (!selected.includes(row)) selected.push(row);
  }
  return { rows: selected.slice(0, 32), omitted: Math.max(0, rows.length - selected.length) };
}
