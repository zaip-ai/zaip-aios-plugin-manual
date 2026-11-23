import { timestamp } from "./policy.mjs";
import { validate } from "./proposal.mjs";

// URL proposal V1 is a richer contract; this explicit projection is the shared
// visual-source/observation handoff, not a claim of direct schema compatibility.
export function handoff(proposal) {
  validate(proposal);
  const source = {
    type: "url",
    locator: proposal.source.url,
    available_bytes: false,
    hash: null,
    bytes: null,
    path: null,
    format: null,
    dimensions: null,
    unavailable_reason:
      "Remote HTML/CSS bytes were received and hashed but not preserved as a source asset",
  };
  const observations = proposal.observations.map((item) => ({
    id: item.id,
    kind: item.kind,
    subject: item.subject,
    value: item.value,
    reason: item.reason,
    provenance: {
      origin: ["static-html-tokenization", "browser-DOM"].includes(item.provenance.method)
        ? "dom"
        : item.provenance.method === "static-reader-capability"
          ? "analysis"
          : "css",
      locator: `.agents/private/state/visual-url/${proposal.extraction_id}/proposal.json#observation=${item.id}`,
      observed_at: timestamp(item.provenance.observed_at),
      viewport: item.provenance.viewport
        ? `${item.provenance.viewport.width}x${item.provenance.viewport.height}`
        : null,
      method: item.provenance.method,
    },
  }));
  const screenshot = proposal.screenshot
    ? {
        type: "url",
        locator: `.agents/private/state/visual-url/${proposal.extraction_id}/screenshot.png`,
        available_bytes: true,
        hash: proposal.screenshot.hash,
        bytes: proposal.screenshot.bytes,
        path: `.agents/private/state/visual-url/${proposal.extraction_id}/screenshot.png`,
        format: "png",
        dimensions: proposal.screenshot.viewport,
        unavailable_reason: null,
      }
    : null;
  return {
    schema_version: 1,
    extraction_id: proposal.extraction_id,
    source,
    screenshot,
    observations,
    http_provenance: proposal.resources,
    url_observation_provenance: proposal.observations.map((item) => ({
      id: item.id,
      ...item.provenance,
    })),
    capabilities: proposal.capabilities,
    proposal_only: true,
    modes: {
      "report-only": {
        output: "evidence-linked analysis",
        product_permission: false,
        limits: proposal.limitations,
      },
      faithful: {
        output: "implementation handoff only after destination authorization",
        central_promotion: false,
        fidelity:
          "unverified; requires comparable source/destination rendering and real asset availability",
      },
      standardized: {
        output: "proposal to adapt using the existing central design contract",
        central_promotion: false,
        approval: "central promotion requires separate authorized designer output",
      },
    },
  };
}
