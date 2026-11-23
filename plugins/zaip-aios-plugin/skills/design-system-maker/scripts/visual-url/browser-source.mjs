import { spawn } from "node:child_process";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { browserExecutable, cdpConnect, devToolsEndpoint, humanWaitMs } from "./browser-cdp.mjs";
import {
  browserLaunchArguments,
  pageTraffic,
  snapshotExpression,
} from "./browser-page-evidence.mjs";
import { publicBrowserProxy } from "./browser-proxy.mjs";
import { httpFailure } from "./failure.mjs";
import { evidenceLimits, url, validateTarget } from "./policy.mjs";
import { hash } from "./transport.mjs";

export function challengePage(value, status = null, mitigated = false) {
  return (
    mitigated ||
    status === 403 ||
    status === 429 ||
    /^(?:just a moment|attention required|verify you are human|checking your browser)/i.test(
      value.title?.trim() ?? "",
    ) ||
    /<form\b[^>]*\bid=["']challenge-form["']/i.test(value.html?.slice(0, 1048576) ?? "")
  );
}
export function memoryResource(text, source, kind, bounds, at) {
  const bytes = Buffer.from(text);
  if (bytes.length > bounds.bytes) throw new Error("Browser captured resource byte bound exceeded");
  return {
    text,
    url: url(source).href,
    hash: hash(bytes),
    bytes: bytes.length,
    method: kind === "html" ? "browser-DOM" : "browser-CSS",
    observed_at: at,
    source_preserved: false,
  };
}
export function mainDocumentResponse(event, mainFrame) {
  return (
    event.method === "Network.responseReceived" &&
    event.params.type === "Document" &&
    event.params.frameId === mainFrame
  );
}
export function browserErrorPage(value) {
  return (
    /^(?:chrome-error:|edge-error:|(?:chrome|edge):\/\/network-error)/i.test(value.url ?? "") ||
    (/(?:id=["']main-frame-error["']|class=["'][^"']*\bneterror\b)/i.test(
      value.html?.slice(0, 1048576) ?? "",
    ) &&
      /\bERR_[A-Z_]{3,64}\b/.test(value.html?.slice(0, 1048576) ?? ""))
  );
}
export function browserScreenshotRequest(snapshot) {
  const { width, height } = snapshot.viewport;
  const ratio = snapshot.pixel_ratio;
  if (
    ![width, height].every((n) => Number.isInteger(n) && n > 0 && n <= 10000) ||
    !Number.isFinite(ratio) ||
    ratio < 0.25 ||
    ratio > 8 ||
    ![snapshot.page_x, snapshot.page_y].every((n) => Number.isFinite(n) && n >= 0 && n <= 10000000)
  )
    throw new Error("Invalid observed browser CSS viewport/DPI");
  return {
    format: "png",
    captureBeyondViewport: false,
    clip: { x: snapshot.page_x, y: snapshot.page_y, width, height, scale: 1 / ratio },
  };
}
// Media bytes do not contribute to DOM/CSS/font inference. Normal page scripts and
// human challenge interaction remain enabled; this is not an access bypass.
export function browserMediaRequest(value, type) {
  if (["Document", "Script", "Stylesheet", "Font"].includes(type)) return false;
  return (
    type === "Media" ||
    /\.(?:mp4|webm|m4v|mov|mp3|m4a|wav|ogg|ogv|m3u8|ts)$/i.test(url(value).pathname)
  );
}

// A finite resource/layout wait complements DOM readiness; missing resources remain gaps.
export function browserReadiness(snapshot, previousSignature, elapsedMs) {
  const readiness = snapshot.coverage?.readiness;
  const layoutStable = Boolean(
    snapshot.layout_signature && snapshot.layout_signature === previousSignature,
  );
  const resourcesReady =
    snapshot.ready === "complete" &&
    readiness?.fonts === "loaded" &&
    readiness.images_pending === 0;
  if (readiness) readiness.layout_stable = layoutStable;
  return { ready: resourcesReady && layoutStable, exhausted: elapsedMs >= 6000 };
}

// This expression is our fixed bounded reader, never instructions received from a page.

export async function browserSource(target, bounds, onProgress, signal) {
  validateTarget(url(target), null); // No fixture/private origin is granted by browser mode.
  const executable = await browserExecutable();
  if (!executable || typeof WebSocket !== "function")
    throw new Error("Navegador local indisponível; nenhuma instalação automática");
  signal?.throwIfAborted();
  const profile = await mkdtemp(join(tmpdir(), "zaip-maker-browser-"));
  let proxy;
  let child;
  let cdp;
  let session;
  let mainFrame;
  let fatal = null;
  const sheets = new Map();
  let documentStatus = null;
  let mitigated = false;
  let documentNavigations = 0;
  const traffic = pageTraffic(url(target).hostname);
  let lastPhase = "browser-open";
  let lastState = "opening";
  const deadline = Date.now() + humanWaitMs;
  const phase = (name, state) => {
    lastPhase = name;
    lastState = state;
    return onProgress({
      phase: name,
      status: "running",
      browser: {
        state,
        deadline_at: new Date(deadline).toISOString(),
        action: "Complete o desafio na janela própria, se exibido",
        traffic: {
          proxy: proxy?.stats() ?? { wire_bytes: 0, connections: 0, hosts: [] },
          page: traffic.snapshot(),
        },
      },
    });
  };
  try {
    proxy = await publicBrowserProxy(signal, url(target).hostname);
    await phase("browser-open", "opening");
    child = spawn(executable, browserLaunchArguments(profile, proxy.origin), {
      stdio: "ignore",
      windowsHide: false,
    });
    child.on("error", () => {
      fatal = new Error("Não foi possível abrir o navegador próprio");
    });
    cdp = await cdpConnect(await devToolsEndpoint(profile, child, signal));
    const { targetInfos } = await cdp.send("Target.getTargets");
    const page = targetInfos.find((item) => item.type === "page" && item.url === "about:blank");
    if (!page) throw new Error("Own browser page unavailable");
    ({ sessionId: session } = await cdp.send("Target.attachToTarget", {
      targetId: page.targetId,
      flatten: true,
    }));
    cdp.on((event) => {
      if (event.sessionId !== session) return;
      if (event.method === "Network.requestWillBeSent") {
        try {
          traffic.request(event.params.requestId, event.params.request.url, event.params.type);
        } catch {
          /* private/unsupported URLs not retained */
        }
      }
      if (event.method === "Network.dataReceived")
        traffic.data(event.params.requestId, event.params.encodedDataLength);
      if (["Network.loadingFinished", "Network.loadingFailed"].includes(event.method))
        traffic.end(event.params.requestId);
      if (event.method === "CSS.styleSheetAdded") {
        const item = event.params.header;
        if (sheets.size < 64) sheets.set(item.styleSheetId, item);
      }
      if (mainDocumentResponse(event, mainFrame)) {
        documentStatus = event.params.response.status;
        mitigated = Object.entries(event.params.response.headers).some(
          ([key, value]) => key.toLowerCase() === "cf-mitigated" && value === "challenge",
        );
      }
      if (event.method === "Fetch.requestPaused") {
        const item = event.params;
        try {
          const parsed = url(item.request.url);
          validateTarget(parsed, null);
          if (!["", "80", "443"].includes(parsed.port)) throw new Error("Port forbidden");
          if (browserMediaRequest(parsed.href, item.resourceType)) {
            traffic.request(null, parsed.href, item.resourceType, true);
            throw new Error("Media omitted from design capture");
          }
          if (item.resourceType === "Document" && ++documentNavigations > 16)
            throw new Error("Browser navigation bound exceeded");
          proxy.allowPageRequest(parsed.href);
          cdp.send("Fetch.continueRequest", { requestId: item.requestId }, session).catch(() => {});
        } catch {
          cdp
            .send(
              "Fetch.failRequest",
              { requestId: item.requestId, errorReason: "BlockedByClient" },
              session,
            )
            .catch(() => {});
        }
      }
    });
    for (const method of [
      "Page.enable",
      "Runtime.enable",
      "DOM.enable",
      "CSS.enable",
      "Network.enable",
    ])
      await cdp.send(method, {}, session);
    const tree = await cdp.send("Page.getFrameTree", {}, session);
    mainFrame = tree.frameTree.frame.id;
    await cdp.send(
      "Fetch.enable",
      { patterns: [{ urlPattern: "*", requestStage: "Request" }] },
      session,
    );
    await cdp.send("Network.setBypassServiceWorker", { bypass: true }, session);
    // Navigation may wait for the first HTTP response; it shares the existing
    // human deadline rather than preventing the visible wait phase after 5s.
    const navigation = cdp.send("Page.navigate", { url: target }, session, deadline);
    navigation.then(
      (result) => {
        if (result.errorText) fatal = new Error("Own browser navigation response failed");
      },
      (error) => {
        fatal = error;
      },
    );
    await phase("browser-wait", "waiting-human");
    let snapshot;
    let stable = 0;
    let observedChallenge = false;
    let initialReadyAt = null;
    let previousSignature = null;
    while (Date.now() < deadline) {
      signal?.throwIfAborted();
      proxy.check();
      if (fatal) throw fatal;
      const result = await cdp.send(
        "Runtime.evaluate",
        { expression: snapshotExpression, returnByValue: true },
        session,
      );
      snapshot = result.result?.value;
      if (!snapshot || snapshot.oversized)
        throw new Error("Browser DOM unavailable/byte bound exceeded");
      if (snapshot.url === "about:blank") {
        await sleep(750, undefined, { signal });
        continue;
      }
      if (browserErrorPage(snapshot))
        throw new Error("Browser displayed local navigation error; no source content captured");
      const current = url(snapshot.url);
      validateTarget(current, null);
      const blocked = challengePage(snapshot, documentStatus, mitigated);
      observedChallenge = blocked;
      const domReady =
        !blocked &&
        ["interactive", "complete"].includes(snapshot.ready) &&
        documentStatus >= 200 &&
        documentStatus < 300 &&
        sheets.size > 0;
      if (domReady) initialReadyAt ??= Date.now();
      else initialReadyAt = null;
      const readiness = browserReadiness(
        snapshot,
        previousSignature,
        initialReadyAt === null ? 0 : Date.now() - initialReadyAt,
      );
      stable = domReady && (readiness.ready || readiness.exhausted) ? stable + 1 : 0;
      previousSignature = snapshot.layout_signature ?? null;
      if (stable >= 2) break;
      await sleep(750, undefined, { signal });
    }
    if (stable < 2) {
      if (fatal) throw fatal;
      if (observedChallenge && documentStatus !== null)
        throw httpFailure(documentStatus, target, true);
      throw new Error(
        `Own browser readiness deadline exceeded; HTTP ${documentStatus ?? "unavailable"}; DOM ${snapshot?.ready ?? "unavailable"}`,
      );
    }
    await phase("browser-capture", "capturing");
    const at = new Date().toISOString();
    const source = memoryResource(snapshot.html, snapshot.url, "html", bounds, at);
    let total = source.bytes;
    const css = [];
    const gaps = [
      "Mídia audiovisual não coletada; requests Media e arquivos de mídia são bloqueados para preservar o orçamento DOM/CSS/fontes",
      ...(snapshot.coverage?.readiness?.fonts !== "loaded"
        ? ["Fontes ainda não prontas ou indisponíveis no limite da captura"]
        : []),
      ...(snapshot.coverage?.readiness?.images_pending
        ? [
            `${snapshot.coverage.readiness.images_pending} imagens não lazy pendentes no limite da captura`,
          ]
        : []),
      ...(snapshot.coverage?.readiness?.images_failed
        ? [
            `${snapshot.coverage.readiness.images_failed} imagens com falha; screenshot pode ter recursos ausentes`,
          ]
        : []),
      ...(!snapshot.coverage?.readiness?.layout_stable
        ? ["Layout sem estabilidade comprovada no limite da captura"]
        : []),
      "Prontidão não comprova imagens de fundo CSS, mídia lazy fora do viewport ou recursos futuros",
      ...(snapshot.ready !== "complete"
        ? [
            "Captura após DOMContentLoaded e estabilização curta; recursos tardios podem não estar representados",
          ]
        : []),
    ];
    for (const [styleSheetId, header] of sheets) {
      signal?.throwIfAborted();
      proxy.check();
      if (css.length >= bounds.resources - 1) {
        gaps.push("Browser CSS resource limit reached");
        break;
      }
      try {
        const sourceUrl = header.sourceURL || snapshot.url;
        validateTarget(url(sourceUrl), null);
        const { text } = await cdp.send("CSS.getStyleSheetText", { styleSheetId }, session);
        if (!text) continue;
        const item = memoryResource(text, sourceUrl, "css", bounds, at);
        if (total + item.bytes > bounds.total_bytes) {
          gaps.push("Browser CSS total byte limit reached");
          break;
        }
        total += item.bytes;
        css.push(item);
      } catch {
        gaps.push("Browser stylesheet unavailable; no second HTTP request performed");
      }
    }
    const png = await cdp.send(
      "Page.captureScreenshot",
      browserScreenshotRequest(snapshot),
      session,
    );
    const screenshotBytes = Buffer.from(png.data, "base64");
    if (
      screenshotBytes.length > evidenceLimits.screenshot_bytes ||
      screenshotBytes.length < 24 ||
      !screenshotBytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])) ||
      screenshotBytes.readUInt32BE(16) !== snapshot.viewport.width ||
      screenshotBytes.readUInt32BE(20) !== snapshot.viewport.height
    )
      throw new Error("Browser screenshot byte/viewport mismatch");
    signal?.throwIfAborted();
    proxy.check();
    return {
      source,
      css,
      gaps,
      styles: snapshot.styles,
      coverage: snapshot.coverage,
      icons: snapshot.icons,
      viewport: snapshot.viewport,
      screenshotBytes,
      observed_at: at,
    };
  } catch (error) {
    // Keep diagnostics factual, even when a wire budget fails before HTTP status.
    await phase(lastPhase, lastState);
    throw error;
  } finally {
    if (cdp) {
      try {
        await cdp.send("Browser.close");
      } catch {
        /* own process fallback below */
      }
      cdp.close();
    }
    if (child && child.exitCode === null && child.signalCode === null) {
      await Promise.race([new Promise((resolve) => child.once("exit", resolve)), sleep(3000)]);
      if (child.exitCode === null && child.signalCode === null) child.kill(); // Only exact child spawned above.
      await Promise.race([new Promise((resolve) => child.once("exit", resolve)), sleep(1000)]);
    }
    await proxy?.close();
    // Temporary isolated profile is ours; never traverse/delete an external browser profile.
    if (
      profile.startsWith(join(tmpdir(), "zaip-maker-browser-")) &&
      (!child || child.exitCode !== null || child.signalCode !== null)
    )
      await rm(profile, { recursive: true, force: true }).catch(() => {});
  }
}

export {
  browserLaunchArguments,
  browserObservations,
  pageTraffic,
  snapshotExpression,
} from "./browser-page-evidence.mjs";
