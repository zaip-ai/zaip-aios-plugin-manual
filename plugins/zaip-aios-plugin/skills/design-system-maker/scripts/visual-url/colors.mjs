const named = {
  transparent: "#00000000",
  black: "#000000",
  white: "#ffffff",
  red: "#ff0000",
  blue: "#0000ff",
  green: "#008000",
  gray: "#808080",
  grey: "#808080",
  yellow: "#ffff00",
  orange: "#ffa500",
  purple: "#800080",
  pink: "#ffc0cb",
  cyan: "#00ffff",
  magenta: "#ff00ff",
  navy: "#000080",
  teal: "#008080",
};
const clamp = (value, maximum) => Math.max(0, Math.min(maximum, value));
function number(value, maximum) {
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)%?$/.test(value)) return null;
  const result = Number.parseFloat(value) * (value.endsWith("%") ? maximum / 100 : 1);
  return Number.isFinite(result) ? clamp(result, maximum) : null;
}
function hex(channels) {
  const rgb = channels
    .slice(0, 3)
    .map((value) => Math.round(value).toString(16).padStart(2, "0"))
    .join("");
  const alpha = Math.round(channels[3] * 255);
  return `#${rgb}${alpha === 255 ? "" : alpha.toString(16).padStart(2, "0")}`;
}
export function normalizeColor(value) {
  const text = value.trim().toLowerCase();
  if (Object.hasOwn(named, text)) return named[text];
  if (/^#[a-f0-9]{3,4}$/.test(text))
    return normalizeColor(
      `#${text
        .slice(1)
        .split("")
        .map((char) => char + char)
        .join("")}`,
    );
  if (/^#[a-f0-9]{6}(?:[a-f0-9]{2})?$/.test(text))
    return text.endsWith("ff") && text.length === 9 ? text.slice(0, 7) : text;
  const match = /^(rgba?|hsla?)\(([^()]{1,256})\)$/.exec(text);
  if (!match) return null;
  const values = match[2].trim().split(/[\s,/]+/);
  if (values.length < 3 || values.length > 4) return null;
  const alpha = values.length === 4 ? number(values[3], 1) : 1;
  if (alpha === null) return null;
  if (match[1].startsWith("rgb")) {
    const channels = values.slice(0, 3).map((value) => number(value, 255));
    return channels.includes(null) ? null : hex([...channels, alpha]);
  }
  const hue = /^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(deg|turn|rad)?$/.exec(values[0]);
  if (!hue || !values[1].endsWith("%") || !values[2].endsWith("%")) return null;
  const h =
    ((((Number(hue[1]) * (hue[2] === "turn" ? 360 : hue[2] === "rad" ? 180 / Math.PI : 1)) % 360) +
      360) %
      360) /
    30;
  const s = number(values[1], 1),
    l = number(values[2], 1);
  if (![h, s, l].every((value) => value !== null && Number.isFinite(value))) return null;
  const a = s * Math.min(l, 1 - l);
  const channel = (n) => {
    const k = (n + h) % 12;
    return 255 * (l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)));
  };
  return hex([channel(0), channel(8), channel(4), alpha]);
}
export function resolveVariables(value, lookup, seen = new Set(), depth = 0) {
  if (depth > 8 || value.length > 2048) return null;
  let output = value;
  for (let replacements = 0; replacements < 32; replacements++) {
    const start = output.indexOf("var(");
    if (start < 0) return output;
    let nesting = 1,
      end = start + 4,
      comma = -1;
    for (; end < output.length && nesting; end++) {
      if (output[end] === "(") nesting++;
      else if (output[end] === ")") nesting--;
      else if (output[end] === "," && nesting === 1 && comma < 0) comma = end;
    }
    if (nesting) return null;
    const name = output.slice(start + 4, comma < 0 ? end - 1 : comma).trim();
    if (!/^--[\w-]+$/.test(name) || seen.has(name)) return null;
    const candidate = lookup(name) ?? (comma < 0 ? null : output.slice(comma + 1, end - 1).trim());
    if (candidate === null || candidate === undefined) return null;
    const resolved = resolveVariables(candidate, lookup, new Set([...seen, name]), depth + 1);
    if (resolved === null) return null;
    output = output.slice(0, start) + resolved + output.slice(end);
    if (output.length > 2048) return null;
  }
  return null;
}
