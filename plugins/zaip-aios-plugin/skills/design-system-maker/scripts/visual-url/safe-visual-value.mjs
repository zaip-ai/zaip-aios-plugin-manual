import { normalizeColor } from "./colors.mjs";

export function safeVisualValue(property, value) {
  if (typeof value !== "string" || value.length > 256 || /[;{}<>]|url\(|https?:|[\\]/i.test(value))
    return null;
  if (
    /color|background|foreground|primary|secondary|accent|muted|card|border-color|fill|stroke|^border$/.test(
      property,
    )
  )
    return normalizeColor(value);
  if (/font-family/.test(property)) {
    const names = value.split(",").map((item) => item.trim().replace(/^["']|["']$/g, ""));
    return names.length <= 12 && names.every((item) => /^-?[a-z][a-z0-9 -]{0,63}$/i.test(item))
      ? names.join(", ")
      : null;
  }
  if (/font-weight/.test(property)) return /^(?:[1-9]00|normal|bold)$/.test(value) ? value : null;
  if (
    property === "font-size" &&
    (!/^(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em)$/.test(value) || Number.parseFloat(value) <= 0)
  )
    return null;
  if (property === "line-height" && /^(?:[0-3](?:\.\d+)?|4)$/.test(value)) return value;
  if (/shadow/.test(property)) {
    const normalized = value.replace(
      /(?:rgba?|hsla?)\([^()]{1,128}\)/gi,
      (match) => normalizeColor(match) ?? "invalid",
    );
    const parts = normalized.split(",");
    return parts.length <= 3 &&
      parts.every((part) =>
        /^(?:inset\s+)?(?:-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em)?\s+){2,4}#[a-f0-9]{6}(?:[a-f0-9]{2})?$/i.test(
          part.trim(),
        ),
      )
      ? normalized
      : value === "none"
        ? value
        : null;
  }
  if (/border-style/.test(property))
    return /^(?:solid|dashed|dotted|none)$/.test(value) ? value : null;
  return /^(?:normal|0|-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|%))(?:\s+(?:0|-?(?:\d+(?:\.\d+)?|\.\d+)(?:px|rem|em|%))){0,3}$/.test(
    value,
  )
    ? value
    : null;
}
