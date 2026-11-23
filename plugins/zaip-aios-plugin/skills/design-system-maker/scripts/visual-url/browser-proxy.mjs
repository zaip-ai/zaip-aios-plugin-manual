import { lookup } from "node:dns/promises";
import { createServer, request } from "node:http";
import { connect, isIP } from "node:net";
import { publicAddress, url, validateTarget } from "./policy.mjs";

// Every browser TCP destination is resolved here, checked in full, then pinned.
// CONNECT leaves TLS/SNI and certificate verification in the browser unchanged.
export async function browserAddress(value, resolve = lookup) {
  const target = url(value);
  const { host } = validateTarget(target, null);
  const port = Number(target.port || (target.protocol === "https:" ? 443 : 80));
  if (![80, 443].includes(port)) throw new Error("Browser destination port forbidden");
  const addresses = isIP(host)
    ? [{ address: host, family: isIP(host) }]
    : await Promise.race([
        resolve(host, { all: true, verbatim: true }),
        new Promise((_, reject) => {
          const timer = setTimeout(() => reject(new Error("Browser DNS timeout")), 3000);
          timer.unref();
        }),
      ]);
  if (
    !Array.isArray(addresses) ||
    !addresses.length ||
    addresses.length > 32 ||
    addresses.some(
      (a) =>
        ![4, 6].includes(a.family) || isIP(a.address) !== a.family || !publicAddress(a.address),
    )
  )
    throw new Error("Browser destination DNS not exclusively public");
  return { target, port, ...addresses[0] };
}
export async function publicBrowserProxy(signal, targetHost = null) {
  const pageHosts = new Set(targetHost ? [targetHost] : []);
  const requirePageHost = (target) => {
    if (!pageHosts.has(target.hostname)) throw new Error("Browser background destination omitted");
  };
  const sockets = new Set();
  const attributed = new WeakMap();
  const hosts = new Map();
  const bucket = (host, kind) => {
    const key = `${host}:${kind}`;
    if (!hosts.has(key) && hosts.size < 32)
      hosts.set(key, {
        host,
        type: kind,
        scope: host === targetHost ? "target" : "other-public",
        connections: 0,
        wire_bytes: 0,
      });
    return hosts.get(key) ?? null;
  };
  let transferred = 0;
  let connections = 0;
  let error = null;
  let closing = false;
  const stop = () => {
    for (const socket of sockets) socket.destroy();
  };
  const count = (socket, chunk) => {
    transferred += chunk.length;
    const host = attributed.get(socket);
    if (host) host.wire_bytes += chunk.length;
    if (transferred > 33554432) {
      error = new Error("Browser network byte bound exceeded");
      stop();
    }
  };
  const track = (socket) => {
    sockets.add(socket);
    socket.once("close", () => sockets.delete(socket));
    socket.on("error", () => {});
    socket.setTimeout(15000, () => socket.destroy());
    socket.on("data", (chunk) => count(socket, chunk));
    return socket;
  };
  const server = createServer({ maxHeaderSize: 8192 }, async (incoming, outgoing) => {
    try {
      if (++connections > 128 || error || signal?.aborted)
        throw new Error("Browser proxy closed/bounded");
      requirePageHost(url(incoming.url));
      const pin = await browserAddress(incoming.url);
      if (closing || signal?.aborted || incoming.destroyed) throw new Error("Browser proxy closed");
      if (
        pin.target.protocol !== "http:" ||
        !["GET", "HEAD", "POST", "OPTIONS"].includes(incoming.method)
      )
        throw new Error("Browser HTTP proxy request forbidden");
      const host = bucket(pin.target.hostname, "HTTP");
      if (host) {
        host.connections++;
        attributed.set(incoming.socket, host);
      }
      const headers = { ...incoming.headers, host: pin.target.host };
      delete headers["proxy-authorization"];
      delete headers["proxy-connection"];
      const upstream = request(
        {
          hostname: pin.address,
          family: pin.family,
          port: pin.port,
          path: `${pin.target.pathname}${pin.target.search}`,
          method: incoming.method,
          headers,
          agent: false,
          timeout: 15000,
        },
        (response) => {
          outgoing.writeHead(response.statusCode, response.headers);
          response.pipe(outgoing);
        },
      );
      upstream.on("socket", (socket) => {
        if (host) attributed.set(socket, host);
        track(socket);
      });
      upstream.on("timeout", () => upstream.destroy());
      upstream.on("error", () => outgoing.destroy());
      incoming.pipe(upstream);
    } catch {
      outgoing.writeHead(403);
      outgoing.end();
    }
  });
  server.on("connect", async (incoming, client, head) => {
    try {
      if (++connections > 128 || error || signal?.aborted)
        throw new Error("Browser proxy closed/bounded");
      if (!/^[a-zA-Z0-9.[\]:-]+:\d+$/.test(incoming.url))
        throw new Error("Invalid CONNECT authority");
      requirePageHost(url(`https://${incoming.url}/`));
      const pin = await browserAddress(`https://${incoming.url}/`);
      if (closing || signal?.aborted || client.destroyed) throw new Error("Browser proxy closed");
      if (pin.port !== 443) throw new Error("Only public TLS CONNECT supported");
      const host = bucket(pin.target.hostname, "TLS");
      if (host) {
        host.connections++;
        attributed.set(client, host);
      }
      const upstream = track(connect({ host: pin.address, port: pin.port, family: pin.family }));
      if (host) attributed.set(upstream, host);
      upstream.once("connect", () => {
        client.write("HTTP/1.1 200 Connection Established\r\n\r\n");
        if (head.length) upstream.write(head);
        client.pipe(upstream);
        upstream.pipe(client);
      });
      client.once("close", () => upstream.destroy());
      upstream.once("close", () => client.destroy());
    } catch {
      client.end("HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n");
    }
  });
  server.on("connection", (socket) => {
    if (sockets.size >= 32) socket.destroy();
    else track(socket);
  });
  server.maxConnections = 32;
  server.headersTimeout = 3000;
  server.requestTimeout = 15000;
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  signal?.addEventListener("abort", stop, { once: true });
  return {
    allowPageRequest(value) {
      const target = url(value);
      validateTarget(target, null);
      if (!pageHosts.has(target.hostname) && pageHosts.size >= 128)
        throw new Error("Browser page host bound exceeded");
      pageHosts.add(target.hostname);
    },
    origin: `http://127.0.0.1:${server.address().port}`,
    stats() {
      return {
        wire_bytes: transferred,
        connections,
        hosts: [...hosts.values()].map((item) => ({ ...item })),
      };
    },
    check() {
      if (error) throw error;
      signal?.throwIfAborted();
    },
    async close() {
      closing = true;
      signal?.removeEventListener("abort", stop);
      stop();
      await new Promise((resolve) => server.close(resolve));
    },
  };
}
