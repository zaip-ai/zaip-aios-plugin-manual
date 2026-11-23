import { displayUrl, safeText, timestamp } from "./policy.mjs";

export function httpFailure(status, source, challenge = false) {
  const message = challenge
    ? "Coleta bloqueada por desafio de acesso; o coletor não contorna essa proteção"
    : `Fonte respondeu HTTP ${status}; coleta não concluída`;
  return Object.assign(new Error(message), {
    failure: {
      kind: challenge ? "access-challenge" : "http-error",
      http_status: status,
      source_url: displayUrl(source),
      observed_at: new Date().toISOString(),
      stage: "fetch-html",
      retry: "explicit",
      message,
    },
  });
}
export function failureRecord(error, source, stage = "fetch-html") {
  if (error?.failure) return validateFailure({ ...error.failure, stage });
  const code =
    typeof error?.code === "string" && /^[A-Z_0-9]{1,32}$/.test(error.code) ? error.code : null;
  return validateFailure({
    kind: error?.name === "AbortError" ? "cancelled" : "extraction-error",
    http_status: null,
    source_url: displayUrl(source),
    observed_at: new Date().toISOString(),
    stage,
    retry: "explicit",
    message: safeText(
      code ? `I/O ${code}` : String(error?.message ?? "Falha de coleta").slice(0, 512),
      512,
    ),
  });
}
export function validateFailure(value) {
  const keys = ["kind", "http_status", "source_url", "observed_at", "stage", "retry", "message"];
  if (
    !value ||
    Object.keys(value).sort().join() !== keys.sort().join() ||
    !["access-challenge", "http-error", "extraction-error", "interrupted", "cancelled"].includes(
      value.kind,
    ) ||
    (value.http_status !== null &&
      (!Number.isInteger(value.http_status) ||
        value.http_status < 100 ||
        value.http_status > 599)) ||
    value.source_url !== displayUrl(value.source_url) ||
    value.retry !== "explicit" ||
    !/^[a-z-]{1,32}$/.test(value.stage) ||
    safeText(value.message, 512) !== value.message
  )
    throw new Error("Invalid structured extraction failure");
  timestamp(value.observed_at);
  return value;
}
