import { isIP } from "node:net";

export const defaults = Object.freeze({
  bytes: 4194304,
  total_bytes: 8388608,
  timeout_ms: 10000,
  total_ms: 30000,
  redirects: 4,
  resources: 32,
  css_depth: 2,
  dom_depth: 64,
  nodes: 500,
  declarations: 2048,
  assets: 40,
});
export const evidenceLimits = Object.freeze({
  observations: defaults.nodes + defaults.declarations + 400 + 1,
  text_artifact_bytes: 4194304,
  screenshot_bytes: 8388608,
});
export function limits(input = {}) {
  if (!input || typeof input !== "object" || Array.isArray(input))
    throw new Error("Invalid limits");
  const value = { ...defaults };
  for (const [key, count] of Object.entries(input)) {
    if (
      !Object.hasOwn(defaults, key) ||
      !Number.isInteger(count) ||
      count < 1 ||
      count > defaults[key]
    )
      throw new Error("Limit must narrow a supported bound");
    value[key] = count;
  }
  return value;
}
export function timestamp(value) {
  const match =
    typeof value === "string" &&
    /^(\d{4})-(\d\d)-(\d\d)T(\d\d):(\d\d):(\d\d)(?:\.\d{1,3})?(?:Z|[+-]\d\d:\d\d)$/.exec(value);
  if (
    !match ||
    !Number.isFinite(Date.parse(value)) ||
    Number(match[2]) < 1 ||
    Number(match[2]) > 12 ||
    Number(match[3]) < 1 ||
    Number(match[3]) > new Date(Date.UTC(Number(match[1]), Number(match[2]), 0)).getUTCDate() ||
    Number(match[4]) > 23 ||
    Number(match[5]) > 59 ||
    Number(match[6]) > 59
  )
    throw new Error("Observed timestamp must be valid ISO with offset");
  return new Date(value).toISOString();
}
export function safeText(value, maximum = 4096) {
  if (typeof value !== "string" || value.length > maximum) throw new Error("Invalid bounded text");
  return value
    .replace(/https?:\/\/[^\s"'<>)]{1,2048}/gi, (match) => {
      try {
        const parsed = new URL(match);
        parsed.username = "";
        parsed.password = "";
        parsed.search = "";
        parsed.hash = "";
        return parsed.href;
      } catch {
        return "[url-redacted]";
      }
    })
    .replace(
      /(?:Bearer\s+)[\w.~-]+|(?:access_token|api_key|password|secret|token|cookie|authorization)\s*[=:]\s*[^\s;"'<>]+/gi,
      "[redacted]",
    )
    .replace(/\b[A-Z]:\\[^\s"'<>]+|\/(?:Users|home)\/[^\s"'<>]+/g, "[local-path-redacted]")
    .split("")
    .filter(
      (character) => character.charCodeAt(0) >= 32 || [9, 10, 13].includes(character.charCodeAt(0)),
    )
    .join("");
}
function ipv4Public(address) {
  const parts = address.split(".").map(Number);
  const [a, b, c] = parts;
  return !(
    a === 0 ||
    a === 10 ||
    a === 127 ||
    a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && (b === 168 || b === 0 || (b === 88 && c === 99))) ||
    (a === 198 && (b === 18 || b === 19 || (b === 51 && c === 100))) ||
    (a === 203 && b === 0 && c === 113)
  );
}
export function publicAddress(address) {
  const family = isIP(address);
  if (family === 4) return ipv4Public(address);
  if (family !== 6 || address.includes("%")) return false;
  const normalized = new URL(`http://[${address}]/`).hostname.slice(1, -1).toLowerCase();
  // Accept only global unicast; mapped, transition, local and reserved IPv6 fail closed.
  const [prefix, second] = normalized.split(":");
  if (
    !/^[23]/.test(normalized) ||
    prefix === "2002" ||
    prefix === "3fff" ||
    (prefix === "2001" && (Number.parseInt(second || "0", 16) <= 511 || second === "db8"))
  )
    return false;
  return true;
}
export function url(value) {
  if (typeof value !== "string" || value.length > 2048)
    throw new Error("Expected bounded HTTP URL");
  let parsed;
  try {
    parsed = new URL(value);
  } catch {
    throw new Error("Invalid HTTP URL");
  }
  if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password)
    throw new Error("Scheme or URL credentials forbidden");
  if (
    [...parsed.searchParams.keys()].some((key) =>
      /^(?:access[_-]?token|api[_-]?key|password|secret|token|authorization|session|cookie|signature|sig)$/i.test(
        key,
      ),
    )
  )
    throw new Error("Secret-bearing URL query forbidden");
  if (!parsed.hostname || parsed.hostname.endsWith("."))
    throw new Error("Ambiguous hostname forbidden");
  parsed.hash = "";
  return parsed;
}

export function normalizeUrlInput(value) {
  if (typeof value !== "string" || value.length > 2048)
    throw new Error("Expected bounded HTTP URL");
  const text = value.trim();
  return url(/^[a-z][a-z0-9+.-]*:\/\//i.test(text) ? text : `https://${text}`).href;
}

export function replayableUrl(value) {
  const parsed = url(value);
  let decoded;
  try {
    decoded = decodeURIComponent(parsed.pathname);
  } catch {
    throw new Error("Safe replay URL requires valid path encoding");
  }
  if (
    safeText(decoded) !== decoded ||
    [...parsed.searchParams.values()].some((item) => safeText(item, 2048) !== item)
  )
    throw new Error(
      "Secret-bearing or redacted URL cannot be saved for replay; provide a safe URL",
    );
  return parsed.href;
}
export function displayUrl(value) {
  const parsed = url(value);
  parsed.search = "";
  return safeText(parsed.href, 2048);
}
export function fixtureAuthorization(input) {
  if (input === null || input === undefined) return null;
  if (
    typeof input !== "object" ||
    Array.isArray(input) ||
    Object.keys(input).sort().join() !== "origin,reference"
  )
    throw new Error("Explicit fixture origin/reference required");
  const origin = url(input.origin);
  if (
    origin.protocol !== "http:" ||
    !["127.0.0.1", "[::1]"].includes(origin.hostname) ||
    !origin.port ||
    origin.pathname !== "/" ||
    origin.search ||
    input.origin !== origin.origin
  )
    throw new Error(
      "Fixture authorization requires exact literal loopback origin with explicit port",
    );
  if (!safeText(input.reference).trim())
    throw new Error("Observed fixture authorization reference required");
  return { origin: origin.origin, reference: safeText(input.reference) };
}
export function validateTarget(target, authorization) {
  const host = target.hostname.replace(/^\[|\]$/g, "");
  if (authorization?.origin === target.origin) return { host, local: true };
  if (isIP(host) && !publicAddress(host)) throw new Error("Private/reserved target forbidden");
  if (
    !isIP(host) &&
    (!host.includes(".") || /(?:^|\.)(?:localhost|local|internal|home\.arpa)$/i.test(host))
  )
    throw new Error("Local hostname forbidden");
  return { host, local: false };
}
