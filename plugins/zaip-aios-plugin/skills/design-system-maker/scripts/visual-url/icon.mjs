import { displayUrl, url, validateTarget } from "./policy.mjs";
import { hash, transport } from "./transport.mjs";

export function iconFormat(data) {
  if (!Buffer.isBuffer(data) || data.length < 24 || data.length > 262144)
    throw new Error("Favicon bounded raster bytes required");
  if (data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    if (
      data.toString("ascii", 12, 16) !== "IHDR" ||
      ![data.readUInt32BE(16), data.readUInt32BE(20)].every((n) => n > 0 && n <= 1024)
    )
      throw new Error("Favicon PNG dimensions invalid");
    return { name: "favicon.png", mime: "image/png" };
  }
  if (data.readUInt32LE(0) === 65536) {
    const count = data.readUInt16LE(4);
    if (count < 1 || count > 32 || data.length < 6 + count * 16)
      throw new Error("Favicon ICO directory invalid");
    for (let i = 0; i < count; i++) {
      const at = 6 + i * 16;
      const length = data.readUInt32LE(at + 8);
      const offset = data.readUInt32LE(at + 12);
      if (!length || offset < 6 + count * 16 || offset + length > data.length)
        throw new Error("Favicon ICO entry invalid");
    }
    return { name: "favicon.ico", mime: "image/x-icon" };
  }
  if (
    data[0] === 255 &&
    data[1] === 216 &&
    data[data.length - 2] === 255 &&
    data[data.length - 1] === 217
  ) {
    let at = 2;
    let dimension = false;
    while (at + 4 < data.length && data[at] === 255) {
      const marker = data[at + 1];
      at += 2;
      if (marker === 218) break;
      const length = data.readUInt16BE(at);
      if (length < 2 || at + length > data.length) throw new Error("Favicon JPEG segment invalid");
      if ([192, 193, 194].includes(marker)) {
        if (
          length < 8 ||
          ![data.readUInt16BE(at + 3), data.readUInt16BE(at + 5)].every((n) => n > 0 && n <= 1024)
        )
          throw new Error("Favicon JPEG dimensions invalid");
        dimension = true;
      }
      at += length;
    }
    if (!dimension) throw new Error("Favicon JPEG dimensions unavailable");
    return { name: "favicon.jpg", mime: "image/jpeg" };
  }
  throw new Error("Favicon is not validated PNG/JPEG/ICO; SVG/HTML forbidden");
}
export function iconCandidates(source, iconUrls) {
  const origin = url(source).origin;
  const candidates = [];
  for (const value of iconUrls) {
    try {
      const candidate = url(value);
      if (
        (candidate.origin === origin || candidate.protocol === "https:") &&
        !candidates.some((item) => item.url === candidate.href)
      )
        candidates.push({ url: candidate.href, discovery: "declared" });
    } catch {
      /* unavailable data */
    }
  }
  return [
    ...candidates.slice(0, 2),
    { url: new URL("/favicon.ico", source).href, discovery: "same-origin-fallback" },
  ];
}
export function iconMime(type) {
  return type === "image/vnd.microsoft.icon" ? "image/x-icon" : type;
}
export async function collectIcon(source, iconUrls, bounds, authorization) {
  const fetch = transport({
    bounds: { ...bounds, bytes: 262144, total_bytes: 786432, resources: 4 },
    authorization,
  });
  for (const candidate of iconCandidates(source, iconUrls)) {
    try {
      validateTarget(url(candidate.url), authorization);
      const resource = await fetch(candidate.url, "icon");
      const format = iconFormat(resource.data);
      if (format.mime !== iconMime(resource.type)) throw new Error("Favicon MIME/magic mismatch");
      return {
        data: resource.data,
        metadata: {
          status: "verified",
          path: format.name,
          mime: format.mime,
          bytes: resource.bytes,
          hash: hash(resource.data),
          url: displayUrl(resource.url),
          observed_at: resource.observed_at,
          method: resource.method,
          discovery: candidate.discovery,
        },
      };
    } catch {
      /* bounded absence; never replace with fabricated brand */
    }
  }
  return null;
}
