import { generatedTokens, generatedTokensMarkdown } from "./generated-tokens.mjs";
import { safeText } from "./policy.mjs";
import { buildReport } from "./report.mjs";

function escapeText(value) {
  return safeText(String(value))
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replace(/([\\`*_[\]()])/g, "\\$1")
    .replaceAll("\n", " ");
}
export function renderDesign(value) {
  const lines = [
    "# DESIGN proposal — extracted reference",
    "",
    `Source (${escapeText(value.source.type)}): ${escapeText(value.source.url ?? value.source.locator)}`,
    `Status: ${value.status}. Tokens below are inferred from the collected sample.`,
    "",
    "This is an independent local proposal. It does not replace central DESIGN.md or promote tokens.",
    "",
  ];
  const report = buildReport(value);
  lines.push(...generatedTokensMarkdown(generatedTokens(value, report.visual_model)));
  lines.push(
    "",
    "## Usage and limitations",
    "",
    "- Validate responsive behavior, active styles and accessibility before implementation.",
    "- Missing values are not inferred as defaults. The complete limitations are retained in proposal.json.",
    "- Full observations, selectors, timestamps and per-token evidence: proposal.json. Coverage and source metrics: report.json / REPORT.md when available.",
    "",
    "## Source trace",
    "",
    `Extraction: ${value.extraction_id}; revision ${value.revision}.`,
    `Received source SHA-256: ${value.source.source_hash}. Raw HTML/CSS not retained.`,
  );
  return `${lines.join("\n")}\n`;
}
