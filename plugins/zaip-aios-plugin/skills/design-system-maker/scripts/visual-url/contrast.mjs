import { normalizeColor } from "./colors.mjs";

export function contrastRatio(first, second) {
  const luminance = (value) => {
    const color = typeof value === "string" ? normalizeColor(value) : null;
    if (!/^#[\da-f]{6}(?:ff)?$/i.test(color ?? "")) return null;
    const channels = [1, 3, 5].map((index) => {
      const channel = Number.parseInt(color.slice(index, index + 2), 16) / 255;
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
    });
    return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
  };
  const a = luminance(first),
    b = luminance(second);
  return a == null || b == null ? null : (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

export function semanticContrast(model) {
  const pairs = [];
  for (const [foreground, background, label] of [
    ["foreground", "background", "Texto / fundo"],
    ["primary_foreground", "primary", "Texto / botão primário"],
    ["card_foreground", "card", "Texto / superfície"],
    ["muted", "background", "Texto secundário / fundo"],
  ]) {
    const text = model?.tokens?.colors?.[foreground],
      surface = model?.tokens?.colors?.[background];
    const ratio = contrastRatio(text?.value, surface?.value);
    if (ratio != null)
      pairs.push({
        label,
        foreground: text.value,
        background: surface.value,
        ratio,
        grade: ratio >= 7 ? "AAA" : ratio >= 4.5 ? "AA" : "Fail",
        evidence: [...new Set([...(text.evidence ?? []), ...(surface.evidence ?? [])])],
      });
  }
  return pairs;
}
