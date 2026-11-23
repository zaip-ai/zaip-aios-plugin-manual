import {
  localLocator,
  localMethods,
  localSourceTypes,
  validateLocalSource,
} from "./local-source.mjs";
import {
  defaults,
  displayUrl,
  evidenceLimits,
  replayableUrl,
  safeText,
  timestamp,
} from "./policy.mjs";
import { renderDesign } from "./proposal-markdown.mjs";
import { validateVisualModel } from "./visual-model.mjs";

export function provenance(source, selector, method = source.method, viewport = null) {
  return {
    url: source.url === null ? null : displayUrl(source.url),
    ...(source.locator ? { locator: source.locator } : {}),
    selector: safeText(selector, 512),
    viewport,
    observed_at: source.observed_at,
    method,
    source_hash: source.hash,
  };
}
export function validate(value) {
  if (
    value?.schema_version !== 1 ||
    !["url", ...localSourceTypes].includes(value.source?.type) ||
    !["partial", "ready"].includes(value.status)
  )
    throw new Error("Invalid proposal schema/status");
  const required = [
    "schema_version",
    "extraction_id",
    "revision",
    "status",
    "central_promotion",
    "source",
    "capabilities",
    "resources",
    "dom",
    "observations",
    "token_candidates",
    "assets",
    "screenshot",
    "limitations",
  ];
  if (
    required.some((key) => !Object.hasOwn(value, key)) ||
    Object.keys(value).some(
      (key) =>
        ![
          ...required,
          "fixture_authorization",
          "host_capture",
          "css_sampling",
          "favicon",
          "local_visual_model",
          "composition",
        ].includes(key),
    ) ||
    !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(value.extraction_id) ||
    value.revision !== 1
  )
    throw new Error("Invalid proposal fields/identity/revision");
  const capabilityKeys = [
    "static_reader",
    "adapter_configured",
    "host_capture_supplied",
    "browser_resolved",
    "screenshot_verified",
    "runtime_rendered",
  ];
  if (
    !value.capabilities ||
    Object.keys(value.capabilities).sort().join() !== capabilityKeys.sort().join() ||
    capabilityKeys.some((key) => typeof value.capabilities[key] !== "boolean") ||
    value.capabilities.static_reader !== true
  )
    throw new Error("Invalid proposal capabilities");
  if (
    value.central_promotion !== false ||
    (value.capabilities.runtime_rendered &&
      (!value.capabilities.browser_resolved ||
        value.screenshot?.method !== "local-isolated-cdp" ||
        value.screenshot?.rendering_verified_by_runtime !== true))
  )
    throw new Error(
      "Proposal render requires actual isolated browser evidence; no central promotion",
    );
  if (!/^[a-f0-9]{64}$/.test(value.source.source_hash) || value.source.source_preserved !== false)
    throw new Error("Measured source hash/non-preservation required");
  if (
    value.source.type === "url" &&
    (typeof value.source.url !== "string" || value.source.url !== displayUrl(value.source.url))
  )
    throw new Error("URL source requires an actual safe HTTP/HTTPS URL");
  if (localSourceTypes.includes(value.source.type)) {
    validateLocalSource(value.source);
    if (
      Object.entries(value.capabilities).some(([key, flag]) => key !== "static_reader" && flag) ||
      value.screenshot !== null
    )
      throw new Error("Local source cannot claim rendered/browser capture");
    if (value.local_visual_model !== undefined) validateVisualModel(value.local_visual_model);
  } else if (value.local_visual_model !== undefined || value.composition !== undefined)
    throw new Error("Local model requires a local source");
  for (const key of ["request_url", "final_url"])
    if (value.source[key] !== undefined && replayableUrl(value.source[key]) !== value.source[key])
      throw new Error("Exact safe source URL invalid");
  if (value.css_sampling !== undefined) {
    if (!Array.isArray(value.css_sampling) || value.css_sampling.length > 1024)
      throw new Error("CSS sampling inventory invalid");
    for (const item of value.css_sampling)
      if (
        !item ||
        item.url !== displayUrl(item.url) ||
        !/^[a-f0-9]{64}$/.test(item.source_hash) ||
        ![item.total, item.sampled, item.truncated, item.oversized].every(
          (count) => Number.isSafeInteger(count) && count >= 0,
        ) ||
        item.sampled > defaults.declarations ||
        item.sampled + item.truncated !== item.total ||
        item.oversized > item.total
      )
        throw new Error("CSS sampling counts/provenance invalid");
  }
  if (
    !Array.isArray(value.observations) ||
    !Array.isArray(value.token_candidates) ||
    !Array.isArray(value.limitations)
  )
    throw new Error("Proposal evidence inventory missing");
  if (
    (value.source.url !== null && value.source.url !== displayUrl(value.source.url)) ||
    !Number.isFinite(Date.parse(value.source.observed_at)) ||
    value.observations.length > evidenceLimits.observations ||
    value.token_candidates.length > defaults.declarations
  )
    throw new Error("Proposal source/evidence bounds invalid");
  if (
    !Array.isArray(value.resources) ||
    value.resources.length > defaults.resources ||
    !Array.isArray(value.dom) ||
    value.dom.length > defaults.nodes ||
    !Array.isArray(value.assets) ||
    value.assets.length > defaults.assets
  )
    throw new Error("Proposal resource/DOM/asset bounds invalid");
  for (const item of value.resources)
    if (
      !item ||
      !["html", "css"].includes(item.kind) ||
      item.url !== displayUrl(item.url) ||
      !["static-http-pinned", "browser-DOM", "browser-CSS"].includes(item.method) ||
      (item.method.startsWith("browser-") && !value.capabilities.runtime_rendered) ||
      !/^[a-f0-9]{64}$/.test(item.hash) ||
      !Number.isInteger(item.bytes) ||
      item.bytes < 0 ||
      item.bytes > defaults.bytes ||
      item.source_preserved !== false ||
      !Number.isFinite(Date.parse(item.observed_at))
    )
      throw new Error("Invalid resource provenance");
  for (const item of value.dom) {
    if (!item || !/^dom-\d+$/.test(item.id)) throw new Error("Invalid DOM evidence");
    safeText(item.selector, 512);
    safeText(item.text);
    safeText(item.tag, 128);
  }
  for (const item of value.assets)
    if (item?.fetched !== false || (item.url !== null && item.url !== displayUrl(item.url)))
      throw new Error("Invalid unfetched asset reference");
  for (const item of value.limitations) safeText(item);
  const ids = new Set();
  for (const item of value.observations) {
    if (
      !item ||
      typeof item.id !== "string" ||
      !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,95}$/.test(item.id) ||
      ids.has(item.id) ||
      !["observed", "inferred", "unknown"].includes(item.kind)
    )
      throw new Error("Invalid observation identity/classification");
    ids.add(item.id);
    safeText(item.subject);
    if (item.value !== null) safeText(item.value);
    if (
      (item.kind === "unknown" && (item.value !== null || !item.reason)) ||
      (item.kind !== "unknown" && !item.value) ||
      (item.kind === "inferred" && !item.reason)
    )
      throw new Error("Observation evidence/reason invalid");
    const p = item.provenance;
    if (p) timestamp(p.observed_at);
    if (
      !p ||
      (p.url === null
        ? !localSourceTypes.includes(value.source.type) || !localLocator(p.locator)
        : p.url !== displayUrl(p.url)) ||
      typeof p.selector !== "string" ||
      !Number.isFinite(Date.parse(p.observed_at)) ||
      !/^[a-f0-9]{64}$/.test(p.source_hash)
    )
      throw new Error("Invalid observation provenance");
    if (p.method === "static-css-declaration" && p.viewport !== null)
      throw new Error("Static declaration cannot claim rendered viewport");
    if (
      ![
        "static-html-tokenization",
        "static-css-declaration",
        "static-reader-capability",
        "host-browser-computed-style",
        "browser-DOM",
        "browser-CSS",
        "browser-computed-style",
        ...localMethods,
      ].includes(p.method) ||
      (p.viewport !== null &&
        (!p.viewport ||
          ![p.viewport.width, p.viewport.height].every(
            (size) => Number.isInteger(size) && size > 0 && size <= 10000,
          )))
    )
      throw new Error("Invalid observation method/viewport");
    if (p.method.startsWith("browser-") && !value.capabilities.runtime_rendered)
      throw new Error("Browser observation requires actual runtime capture");
    if (
      localMethods.includes(p.method) &&
      (!localSourceTypes.includes(value.source.type) || p.url !== null || p.viewport !== null)
    )
      throw new Error("Local observation method requires local source and no rendered viewport");
    if (
      p.method === "host-browser-computed-style" &&
      (!value.capabilities.host_capture_supplied ||
        !value.capabilities.browser_resolved ||
        !p.viewport)
    )
      throw new Error("Host computed style capability/provenance missing");
  }
  for (const item of value.token_candidates)
    if (
      item.kind !== "inferred" ||
      !item.reason ||
      !Array.isArray(item.evidence) ||
      !item.evidence.length ||
      item.evidence.some((id) => !ids.has(id))
    )
      throw new Error("Global token candidate lacks inferred rationale/evidence");
  if (
    value.capabilities.screenshot_verified &&
    (!value.screenshot || !/^[a-f0-9]{64}$/.test(value.screenshot.hash))
  )
    throw new Error("Verified screenshot metadata missing");
  if (
    (value.capabilities.browser_resolved &&
      !value.capabilities.host_capture_supplied &&
      !value.capabilities.runtime_rendered) ||
    (value.capabilities.screenshot_verified &&
      !value.capabilities.host_capture_supplied &&
      !value.capabilities.runtime_rendered) ||
    (value.status === "ready" &&
      (!value.capabilities.browser_resolved || !value.capabilities.screenshot_verified))
  )
    throw new Error("Unsupported ready/capture capability claim");
  if (value.favicon !== undefined) {
    const icon = value.favicon;
    if (
      !icon ||
      icon.status !== "verified" ||
      !["favicon.png", "favicon.jpg", "favicon.ico"].includes(icon.path) ||
      !["image/png", "image/jpeg", "image/x-icon"].includes(icon.mime) ||
      !Number.isInteger(icon.bytes) ||
      icon.bytes < 24 ||
      icon.bytes > 262144 ||
      !/^[a-f0-9]{64}$/.test(icon.hash) ||
      icon.url !== displayUrl(icon.url) ||
      !["declared", "same-origin-fallback"].includes(icon.discovery) ||
      (icon.discovery === "same-origin-fallback" &&
        new URL(icon.url).origin !== new URL(value.source.url).origin) ||
      icon.method !== "static-http-pinned"
    )
      throw new Error("Invalid same-origin verified favicon provenance");
    timestamp(icon.observed_at);
  }
  return value;
}
export function build(extractionId, source, parsed, resources, declarations, gaps) {
  const observations = parsed.nodes.map((node, index) => ({
    id: `dom-${index}`,
    kind: "observed",
    subject: "Static markup component",
    value: safeText(
      `${node.tag}${node.role ? ` role=${node.role}` : ""}${node.text ? `: ${node.text}` : ""}`.slice(
        0,
        4096,
      ),
    ),
    reason: null,
    provenance: provenance(source, node.selector, "static-html-tokenization"),
  }));
  const token_candidates = [];
  for (const declaration of declarations) {
    const id = `css-${observations.length}`;
    observations.push({
      id,
      kind: "observed",
      subject: "Declared CSS value; not computed style",
      value: safeText(`${declaration.property}: ${declaration.value}`),
      reason: declaration.redacted
        ? "Sensitive substrings or URL query redacted; stored declaration is incomplete"
        : null,
      provenance: {
        url: declaration.source_url,
        selector: declaration.selector,
        viewport: null,
        observed_at: declaration.observed_at,
        method: declaration.method,
        source_hash: declaration.source_hash,
      },
    });
    if (
      /^(?:--|color|background|font|border|padding|margin|gap|width|height)/.test(
        declaration.property,
      )
    )
      token_candidates.push({
        property: declaration.property,
        value: declaration.value,
        kind: "inferred",
        reason:
          "Declared property is a candidate only; it does not establish effective rendered style or a global design token",
        evidence: [id],
      });
  }
  observations.push({
    id: "unknown-render",
    kind: "unknown",
    subject: "Rendered styles, viewport, interactions and exact fonts",
    value: null,
    reason: "Static reader does not execute browser scripts or compute CSS cascade/layout",
    provenance: provenance(source, "document", "static-reader-capability"),
  });
  return {
    schema_version: 1,
    extraction_id: extractionId,
    revision: 1,
    status: "partial",
    central_promotion: false,
    source: {
      type: "url",
      url: displayUrl(source.url),
      observed_at: source.observed_at,
      source_hash: source.hash,
      source_preserved: false,
    },
    capabilities: {
      static_reader: true,
      adapter_configured: false,
      host_capture_supplied: false,
      browser_resolved: false,
      screenshot_verified: false,
      runtime_rendered: false,
    },
    resources,
    dom: parsed.nodes,
    observations,
    token_candidates,
    assets: parsed.assets,
    screenshot: null,
    limitations: [
      ...parsed.limitations,
      ...gaps,
      "Assets referenced only; no image/font copies fetched",
      "Sensitive text, local paths, credentials and URL queries are redacted; stored values may be incomplete",
      "Raw HTML/CSS not saved; hashes identify received bytes, sanitized normalized evidence is retained",
      "Global tokens and faithful fidelity require separately authorized verification; no central promotion",
    ],
  };
}
export function design(value) {
  validate(value);
  return renderDesign(value);
}
