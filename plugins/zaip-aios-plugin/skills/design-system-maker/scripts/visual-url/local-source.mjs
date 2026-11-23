import { safeText, timestamp } from "./policy.mjs";

export const localSourceTypes = ["repository", "design-markdown", "composition"];
export const localMethods = [
  "repository-css",
  "repository-json",
  "repository-markup",
  "markdown-declaration",
  "design-composition",
  "local-source-capability",
];
export const localDeclarationMethods = [
  "repository-css",
  "repository-json",
  "markdown-declaration",
  "design-composition",
];
export function localLocator(value) {
  return (
    typeof value === "string" &&
    value.length > 0 &&
    value.length <= 512 &&
    safeText(value, 512) === value &&
    !/^[\\/]|^[a-z]:|[\\<>]/i.test(value) &&
    !value.split("/").some((part) => part === ".." || part === ".")
  );
}
export function validateLocalSource(source) {
  if (
    !source ||
    !localSourceTypes.includes(source.type) ||
    source.url !== null ||
    !localLocator(source.locator) ||
    !/^[a-f\d]{64}$/.test(source.source_hash) ||
    source.source_preserved !== false ||
    !Array.isArray(source.files) ||
    source.files.length > 64 ||
    !Array.isArray(source.references) ||
    source.references.length > 8
  )
    throw new Error("Invalid bounded local source");
  timestamp(source.observed_at);
  for (const file of source.files)
    if (
      !file ||
      !localLocator(file.path) ||
      !/^[a-f\d]{64}$/.test(file.hash) ||
      !Number.isSafeInteger(file.bytes) ||
      file.bytes < 0 ||
      file.bytes > 262144
    )
      throw new Error("Invalid local source file inventory");
  for (const ref of source.references)
    if (
      !ref ||
      !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(ref.id) ||
      !Number.isSafeInteger(ref.revision) ||
      ref.revision < 1 ||
      !/^[a-f\d]{64}$/.test(ref.design_hash)
    )
      throw new Error("Invalid exact design reference");
  return source;
}
