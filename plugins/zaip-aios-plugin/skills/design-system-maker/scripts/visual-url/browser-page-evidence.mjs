import { renderedSample } from "./browser-rendered-sample.mjs";
import { displayUrl, safeText, url, validateTarget } from "./policy.mjs";

export function pageTraffic(targetHost) {
  const entries = new Map();
  const requests = new Map();
  return {
    request(id, value, type, blocked = false) {
      const parsed = url(value);
      validateTarget(parsed, null);
      if (parsed.hostname.length > 253) throw new Error("Hostname count bound exceeded");
      const kind = [
        "Document",
        "Stylesheet",
        "Script",
        "Font",
        "Image",
        "Media",
        "XHR",
        "Fetch",
        "WebSocket",
        "Other",
      ].includes(type)
        ? type
        : "Other";
      const key = `${parsed.hostname}:${kind}`;
      if (!entries.has(key) && entries.size < 64)
        entries.set(key, {
          host: parsed.hostname,
          type: kind,
          scope: parsed.hostname === targetHost ? "target" : "other-public",
          requests: 0,
          blocked: 0,
          received_bytes: 0,
        });
      const entry = entries.get(key);
      if (entry) {
        if (blocked) entry.blocked++;
        else entry.requests++;
      }
      if (id && entry && requests.size < 256) requests.set(id, entry);
    },
    data(id, bytes) {
      const entry = requests.get(id);
      if (entry && Number.isSafeInteger(bytes) && bytes >= 0) entry.received_bytes += bytes;
    },
    end(id) {
      requests.delete(id);
    },
    snapshot() {
      return [...entries.values()].map((entry) => ({ ...entry }));
    },
  };
}

export const snapshotExpression = `(${renderedSample.toString()})()`;

export function browserLaunchArguments(profile, proxyOrigin) {
  return [
    "--remote-debugging-port=0",
    "--remote-debugging-address=127.0.0.1",
    `--user-data-dir=${profile}`,
    `--proxy-server=${proxyOrigin}`,
    "--proxy-bypass-list=<-loopback>",
    "--disable-quic",
    "--force-webrtc-ip-handling-policy=disable_non_proxied_udp",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-sync",
    "--new-window",
    "about:blank",
  ];
}

export function browserObservations(captured) {
  const styles = captured.styles.slice(0, captured.coverage ? 399 : 400).map((style, index) => ({
    id: `browser-${index}`,
    kind: "observed",
    subject: `Browser computed ${safeText(style.property, 128)}`,
    value: safeText(style.value, 2048),
    reason: null,
    provenance: {
      url: displayUrl(captured.source.url),
      selector: safeText(style.selector, 512),
      viewport: captured.viewport,
      observed_at: captured.observed_at,
      method: "browser-computed-style",
      source_hash: captured.source.hash,
    },
  }));
  if (captured.coverage)
    styles.push({
      id: "browser-coverage",
      kind: "observed",
      subject: "Browser capture coverage",
      value: safeText(JSON.stringify(captured.coverage), 2048),
      reason: null,
      provenance: {
        url: displayUrl(captured.source.url),
        selector: "html",
        viewport: captured.viewport,
        observed_at: captured.observed_at,
        method: "browser-computed-style",
        source_hash: captured.source.hash,
      },
    });
  return styles;
}
