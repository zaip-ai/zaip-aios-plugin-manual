import { createHash } from "node:crypto";
import { lookup } from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import { isIP } from "node:net";
import { httpFailure } from "./failure.mjs";
import { publicAddress, url, validateTarget } from "./policy.mjs";

export const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
export function transport({
  bounds,
  authorization = null,
  resolve = lookup,
  request = (target, options, callback) =>
    (target.protocol === "https:" ? https : http).request(options, callback),
}) {
  const started = Date.now();
  let consumed = 0;
  let requests = 0;
  async function once(target) {
    const { host, local } = validateTarget(target, authorization);
    if (++requests > bounds.resources || Date.now() - started >= bounds.total_ms)
      throw new Error("Resource/time budget exhausted");
    let addresses;
    if (isIP(host)) addresses = [{ address: host, family: isIP(host) }];
    else {
      let timer;
      try {
        addresses = await Promise.race([
          resolve(host, { all: true, verbatim: true }),
          new Promise((_, reject) => {
            timer = setTimeout(
              () => reject(new Error("DNS timeout")),
              Math.min(bounds.timeout_ms, bounds.total_ms - (Date.now() - started)),
            );
          }),
        ]);
      } finally {
        clearTimeout(timer);
      }
    }
    if (
      !Array.isArray(addresses) ||
      !addresses.length ||
      addresses.length > 32 ||
      addresses.some(
        (entry) =>
          ![4, 6].includes(entry.family) ||
          isIP(entry.address) !== entry.family ||
          (!local && !publicAddress(entry.address)),
      )
    )
      throw new Error("DNS includes private/reserved or invalid address");
    const selected = addresses[0];
    const timeout = Math.min(bounds.timeout_ms, bounds.total_ms - (Date.now() - started));
    if (timeout < 1) throw new Error("Total time budget exhausted");
    return new Promise((resolve_, reject) => {
      const options = {
        protocol: target.protocol,
        hostname: host,
        port: target.port || undefined,
        path: `${target.pathname}${target.search}`,
        method: "GET",
        agent: false,
        autoSelectFamily: false,
        family: selected.family,
        servername: isIP(host) ? undefined : host,
        headers: {
          Host: target.host,
          Accept: "text/html,text/css;q=0.9",
          "Accept-Encoding": "identity",
          "User-Agent": "ZAIP-Visual-URL/1",
        },
        lookup: (_hostname, lookupOptions, callback) =>
          lookupOptions.all
            ? callback(null, [selected])
            : callback(null, selected.address, selected.family),
      };
      let completed = false;
      const fail = (error) => {
        if (!completed) {
          completed = true;
          clearTimeout(timer);
          reject(error);
        }
      };
      const req = request(target, options, (response) => {
        const chunks = [];
        let size = 0;
        response.on("error", fail);
        response.on("aborted", () => fail(new Error("Response aborted")));
        if (
          response.headers["content-encoding"] &&
          response.headers["content-encoding"] !== "identity"
        ) {
          req.destroy();
          fail(new Error("Compressed response unsupported"));
          return;
        }
        response.on("data", (chunk) => {
          size += chunk.length;
          consumed += chunk.length;
          if (size > bounds.bytes || consumed > bounds.total_bytes) {
            req.destroy();
            fail(new Error("Response byte budget exceeded"));
          } else chunks.push(chunk);
        });
        response.on("end", () => {
          if (completed) return;
          completed = true;
          clearTimeout(timer);
          resolve_({
            status: response.statusCode,
            location: response.headers.location,
            type: response.headers["content-type"] ?? "",
            bytes: Buffer.concat(chunks),
            address: selected.address,
            requested_url: target.href,
            challenge:
              response.statusCode === 403 && response.headers["cf-mitigated"] === "challenge",
          });
        });
      });
      const timer = setTimeout(() => {
        req.destroy();
        fail(new Error("Request/total timeout"));
      }, timeout);
      req.on("error", fail);
      req.end();
    });
  }
  return async (input, kind = "html") => {
    let target = url(input);
    for (let redirects = 0; redirects <= bounds.redirects; redirects++) {
      const response = await once(target);
      if ([301, 302, 303, 307, 308].includes(response.status)) {
        if (!response.location || redirects === bounds.redirects)
          throw new Error("Redirect limit or missing location");
        target = url(new URL(response.location, target).href);
        if (kind === "icon" && target.origin !== url(input).origin)
          throw new Error("Favicon redirect must preserve exact source origin");
        continue;
      }
      if (response.status !== 200)
        throw httpFailure(response.status, target.href, response.challenge);
      if (kind === "icon") {
        if (
          response.bytes.length > 262144 ||
          !/^(?:image\/png|image\/jpeg|image\/x-icon|image\/vnd\.microsoft\.icon)(?:;|$)/i.test(
            response.type,
          )
        )
          throw new Error("Favicon MIME/byte bound invalid");
        return {
          data: response.bytes,
          type: response.type.split(";")[0].toLowerCase(),
          hash: hash(response.bytes),
          bytes: response.bytes.length,
          url: target.href,
          method: "static-http-pinned",
          observed_at: new Date().toISOString(),
        };
      }
      if (
        !(kind === "html" ? /^text\/html(?:;|$)/i : /^text\/css(?:;|$)/i).test(response.type) ||
        /charset\s*=\s*(?!["']?utf-8["']?(?:;|$))/i.test(response.type)
      )
        throw new Error("Unsupported content type/charset");
      let text;
      try {
        text = new TextDecoder("utf-8", { fatal: true }).decode(response.bytes);
      } catch {
        throw new Error("Invalid UTF-8 response");
      }
      return {
        text,
        hash: hash(response.bytes),
        bytes: response.bytes.length,
        url: target.href,
        method: "static-http-pinned",
        observed_at: new Date().toISOString(),
        source_preserved: false,
      };
    }
    throw new Error("Redirect limit exceeded");
  };
}
