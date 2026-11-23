import { access, readFile } from "node:fs/promises";
import { join } from "node:path";
import { setTimeout as sleep } from "node:timers/promises";

export const humanWaitMs = 120000;
export async function browserExecutable() {
  const paths = [process.env.ZAIP_MAKER_BROWSER];
  if (process.platform === "win32") {
    for (const root of [
      process.env.ProgramFiles,
      process.env["ProgramFiles(x86)"],
      process.env.LOCALAPPDATA,
    ])
      if (root)
        for (const suffix of [
          "Microsoft/Edge/Application/msedge.exe",
          "Google/Chrome/Application/chrome.exe",
        ])
          paths.push(join(root, suffix));
  } else {
    paths.push(
      "/usr/bin/google-chrome",
      "/usr/bin/chromium",
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    );
  }
  for (const path of paths.filter(Boolean)) {
    try {
      await access(path);
      return path;
    } catch {
      /* observed absent */
    }
  }
  return null;
}
export async function browserCapability() {
  const available = typeof WebSocket === "function" && (await browserExecutable()) !== null;
  return {
    available,
    reason: available
      ? null
      : "Navegador Chromium local ou WebSocket do Node indisponível; nenhuma instalação automática",
    method: "local-isolated-cdp",
    human_wait_ms: humanWaitMs,
  };
}
export async function devToolsEndpoint(profile, child, signal, readPort = readFile) {
  for (let attempt = 0; attempt < 100; attempt++) {
    signal?.throwIfAborted();
    if (child.exitCode !== null || child.signalCode !== null)
      throw new Error("Own browser exited before CDP readiness");
    try {
      const text = await readPort(join(profile, "DevToolsActivePort"), "utf8");
      const [port, path] = text.trim().split(/\r?\n/);
      if (
        !/^\d{1,5}$/.test(port) ||
        Number(port) < 1 ||
        Number(port) > 65535 ||
        !/^\/devtools\/browser\/[a-zA-Z0-9-]+$/.test(path)
      )
        throw new Error("Invalid own browser CDP endpoint");
      return `ws://127.0.0.1:${port}${path}`;
    } catch (error) {
      // Chromium briefly owns this file while publishing its port on Windows.
      // Retry only that read within the existing deadline, never launch a second browser.
      if (!["ENOENT", "EBUSY"].includes(error.code)) throw error;
    }
    await sleep(100, undefined, { signal });
  }
  throw new Error("Own browser CDP readiness timed out");
}
export async function cdpConnect(endpoint, signal) {
  const socket = new WebSocket(endpoint);
  const pending = new Map();
  const listeners = new Set();
  let sequence = 0;
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      socket.close();
      reject(new Error("Own CDP connect timeout"));
    }, 5000);
    socket.addEventListener(
      "open",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
    socket.addEventListener(
      "error",
      () => {
        clearTimeout(timer);
        reject(new Error("Own CDP connection failed"));
      },
      { once: true },
    );
  });
  function close() {
    socket.close();
    for (const item of pending.values()) {
      clearTimeout(item.timer);
      item.reject(new Error("Own CDP closed"));
    }
    pending.clear();
  }
  signal?.addEventListener("abort", close, { once: true });
  socket.addEventListener("close", close, { once: true });
  socket.addEventListener("message", (event) => {
    if (typeof event.data !== "string" || Buffer.byteLength(event.data) > 12582912) {
      close();
      return;
    }
    let value;
    try {
      value = JSON.parse(event.data);
    } catch {
      close();
      return;
    }
    const item = pending.get(value.id);
    if (item) {
      pending.delete(value.id);
      clearTimeout(item.timer);
      if (value.error) item.reject(new Error(`Own CDP command unavailable: ${item.method}`));
      else item.resolve(value.result);
    } else for (const listener of listeners) listener(value);
  });
  return {
    on(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    send(method, params = {}, sessionId, navigationDeadline = null) {
      if (typeof method !== "string" || !/^[A-Za-z]{1,32}\.[A-Za-z]{1,48}$/.test(method))
        return Promise.reject(new Error("Invalid static CDP method"));
      signal?.throwIfAborted();
      if (
        navigationDeadline !== null &&
        (method !== "Page.navigate" ||
          !Number.isSafeInteger(navigationDeadline) ||
          navigationDeadline <= Date.now() ||
          navigationDeadline > Date.now() + humanWaitMs)
      )
        return Promise.reject(new Error("Invalid bounded CDP navigation deadline"));
      if (socket.readyState !== WebSocket.OPEN || pending.size >= 64)
        return Promise.reject(new Error("Own CDP unavailable/bounded"));
      return new Promise((resolve, reject) => {
        const id = ++sequence;
        const timer = setTimeout(
          () => {
            pending.delete(id);
            reject(new Error(`Own CDP command timeout: ${method}`));
          },
          navigationDeadline === null ? 5000 : Math.max(1, navigationDeadline - Date.now()),
        );
        pending.set(id, { resolve, reject, timer, method });
        socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
      });
    },
    close() {
      signal?.removeEventListener("abort", close);
      close();
    },
  };
}
