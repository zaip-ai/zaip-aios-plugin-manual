import { read } from "./files.mjs";
import { displayUrl, safeText, timestamp, url } from "./policy.mjs";
import { hash } from "./transport.mjs";

export async function capture(workspace, configuration, sourceUrl) {
  if (configuration === null || configuration === undefined) return null;
  if (
    !configuration ||
    Object.keys(configuration).sort().join() !== "authorized,path,reference" ||
    configuration.authorized !== true ||
    !safeText(configuration.reference).trim() ||
    !configuration.path.startsWith(".local/") ||
    !configuration.path.endsWith(".json")
  )
    throw new Error("Host capture needs explicit authorized local adapter input");
  const bytes = await read(workspace, configuration.path);
  let value;
  try {
    value = JSON.parse(bytes.toString("utf8"));
  } catch {
    throw new Error("Corrupt host capture JSON");
  }
  const keys = [
    "schema_version",
    "source_url",
    "observed_at",
    "method",
    "viewport",
    "styles",
    "screenshot",
  ];
  if (
    !value ||
    Object.keys(value).sort().join() !== keys.sort().join() ||
    value.schema_version !== 1 ||
    value.method !== "host-browser-capture" ||
    url(value.source_url).href !== url(sourceUrl).href ||
    !Number.isFinite(Date.parse(value.observed_at))
  )
    throw new Error("Host capture schema/origin/provenance mismatch");
  value.observed_at = timestamp(value.observed_at);
  if (
    !value.viewport ||
    Object.keys(value.viewport).sort().join() !== "height,width" ||
    ![value.viewport.width, value.viewport.height].every(
      (size) => Number.isInteger(size) && size > 0 && size <= 10000,
    )
  )
    throw new Error("Host capture viewport missing/invalid");
  if (!Array.isArray(value.styles) || value.styles.length > 400)
    throw new Error("Host style count invalid");
  const observations = value.styles.map((style, index) => {
    if (
      !style ||
      Object.keys(style).sort().join() !== "property,selector,value" ||
      !/^[a-z-]+$/.test(style.property)
    )
      throw new Error("Invalid normalized host style");
    const sanitized = safeText(style.value, 2048);
    return {
      id: `host-${index}`,
      kind: "observed",
      subject: `Host-supplied computed ${safeText(style.property, 128)}`,
      value: sanitized,
      reason:
        sanitized !== style.value
          ? "Sensitive substrings or URL query redacted; stored host value is incomplete"
          : null,
      provenance: {
        url: displayUrl(value.source_url),
        selector: safeText(style.selector, 512),
        viewport: value.viewport,
        observed_at: value.observed_at,
        method: "host-browser-computed-style",
        source_hash: hash(bytes),
      },
    };
  });
  let screenshot = null;
  let screenshotBytes = null;
  if (value.screenshot !== null) {
    const item = value.screenshot;
    if (
      !item ||
      Object.keys(item).sort().join() !== "hash,path" ||
      !item.path.startsWith(".local/") ||
      !item.path.endsWith(".png") ||
      !/^[a-f0-9]{64}$/.test(item.hash)
    )
      throw new Error("Screenshot metadata invalid");
    screenshotBytes = await read(workspace, item.path, 8388608);
    if (
      hash(screenshotBytes) !== item.hash ||
      !screenshotBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
      screenshotBytes.length < 24 ||
      screenshotBytes.readUInt32BE(16) !== value.viewport.width ||
      screenshotBytes.readUInt32BE(20) !== value.viewport.height
    )
      throw new Error("Screenshot bytes/hash/viewport mismatch");
    screenshot = {
      path: "screenshot.png",
      hash: item.hash,
      bytes: screenshotBytes.length,
      viewport: value.viewport,
      method: "host-supplied-capture",
      observed_at: value.observed_at,
      rendering_verified_by_runtime: false,
    };
  }
  return {
    observations,
    screenshot,
    screenshotBytes,
    viewport: value.viewport,
    observed_at: value.observed_at,
    source_hash: hash(bytes),
    reference: safeText(configuration.reference),
  };
}
