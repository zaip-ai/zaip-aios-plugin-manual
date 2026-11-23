import { declarationSampler } from "./css-sample.mjs";
import { displayUrl, safeText, url } from "./policy.mjs";

function attributes(tag) {
  const output = {};
  for (const match of tag.matchAll(
    /([\w:-]{1,128})\s{0,128}=\s{0,128}(?:"([^"<>]{0,2048})"|'([^'<>]{0,2048})'|([^\s<>`]{1,2048}))/g,
  )) {
    if (Object.keys(output).length >= 32) throw new Error("Attribute limit exceeded");
    const key = match[1].toLowerCase();
    if (["id", "class", "href", "rel", "src", "style", "alt", "role"].includes(key)) {
      const value = match[2] ?? match[3] ?? match[4];
      output[key] = ["href", "src", "style"].includes(key) ? value : safeText(value, 2048);
    }
  }
  return output;
}
function reference(value, base) {
  try {
    return displayUrl(url(new URL(value, base).href).href);
  } catch {
    return null;
  }
}
export function html(source, bounds) {
  const styles = [];
  const nodes = [];
  const links = [];
  const assets = [];
  const inline = [];
  const stack = [];
  let omitted = 0;
  let skippedDepth = 0;
  const lower = source.text.toLowerCase();
  let offset = 0;
  while (offset < source.text.length) {
    if (source.text[offset] !== "<") {
      const end = source.text.indexOf("<", offset);
      const stop = end < 0 ? source.text.length : end;
      const current = stack.at(-1)?.node;
      const text = source.text.slice(offset, stop).replace(/\s+/g, " ").trim();
      if (current && text && !skippedDepth)
        current.text = safeText(`${current.text} ${text}`.trim().slice(0, 4096), 4096);
      offset = stop;
      continue;
    }
    if (source.text.startsWith("<!--", offset)) {
      const end = source.text.indexOf("-->", offset + 4);
      if (end < 0) break;
      offset = end + 3;
      continue;
    }
    let end = offset + 1;
    let quote = null;
    for (; end < source.text.length; end++) {
      const character = source.text[end];
      if (quote) {
        if (character === quote) quote = null;
      } else if (character === "'" || character === '"') quote = character;
      else if (character === ">") break;
    }
    if (end === source.text.length) break;
    if (end - offset > 8192) {
      omitted++;
      offset = end + 1;
      continue;
    }
    const value = source.text.slice(offset, end + 1);
    offset = end + 1;
    if (/^<\//.test(value)) {
      if (skippedDepth) {
        skippedDepth--;
        continue;
      }
      const tag = /^<\/([a-z][a-z0-9-]*)/i.exec(value)?.[1]?.toLowerCase();
      const index = stack.findLastIndex((entry) => entry.tag === tag);
      if (index !== -1) stack.length = index;
      continue;
    }
    const tag = /^<([a-z][a-z0-9-]*)\b/i.exec(value)?.[1]?.toLowerCase();
    if (!tag) continue;
    if (["script", "style", "template"].includes(tag)) {
      const close = lower.indexOf(`</${tag}`, offset);
      if (close < 0) break;
      if (tag === "style") {
        if (styles.length < bounds.resources * 2) styles.push(source.text.slice(offset, close));
        else omitted++;
      }
      const final = lower.indexOf(">", close);
      if (final < 0) break;
      offset = final + 1;
      continue;
    }
    const voidTag =
      [
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ].includes(tag) || /\/\s*>$/.test(value);
    if (skippedDepth || stack.length >= bounds.dom_depth) {
      omitted++;
      if (!voidTag) skippedDepth++;
      continue;
    }
    const attr = attributes(value);
    const selector = safeText(
      `${tag}${attr.id ? `#${attr.id}` : attr.class ? `.${attr.class.split(/\s+/).slice(0, 4).join(".")}` : ""}`,
      512,
    );
    const node = { id: `dom-${nodes.length}`, tag, selector, text: "", role: attr.role ?? null };
    const retained = nodes.length < bounds.nodes;
    if (retained) nodes.push(node);
    else omitted++;
    if (attr.style && inline.length < bounds.nodes) inline.push({ selector, text: attr.style });
    if (tag === "link" && /(?:^|\s)stylesheet(?:\s|$)/i.test(attr.rel ?? "") && attr.href)
      if (links.length < bounds.resources * 2) {
        try {
          links.push(new URL(attr.href, source.url).href);
        } catch {
          omitted++;
        }
      }
    if (
      ["img", "source", "video", "audio"].includes(tag) &&
      attr.src &&
      assets.length < bounds.assets
    )
      assets.push({
        url: reference(attr.src, source.url),
        source_selector: selector,
        fetched: false,
      });
    if (
      ![
        "area",
        "base",
        "br",
        "col",
        "embed",
        "hr",
        "img",
        "input",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr",
      ].includes(tag) &&
      !/\/\s*>$/.test(value)
    )
      stack.push({ tag, node: retained ? node : null });
  }
  return {
    nodes,
    links,
    styles,
    inline,
    assets,
    limitations: [
      ...(omitted
        ? [
            `DOM sampled: ${nodes.length} nodes retained; ${omitted} oversized, deep or additional elements omitted`,
          ]
        : []),
      "Bounded static tokenization is not a browser DOM/layout engine; scripts/templates are never executed",
      "HTML entities and malformed markup may remain approximate; no resolved style or viewport inferred",
    ],
  };
}
function stripComments(text) {
  const chunks = [];
  let offset = 0;
  while (offset < text.length) {
    const start = text.indexOf("/*", offset);
    if (start < 0) {
      chunks.push(text.slice(offset));
      break;
    }
    chunks.push(text.slice(offset, start));
    const end = text.indexOf("*/", start + 2);
    if (end < 0) break;
    offset = end + 2;
  }
  return chunks.join("");
}
export function css(text, bounds, base, sourceHash, observedAt, initialSelector = null) {
  const sampler = declarationSampler(bounds.declarations);
  const imports = [];
  const assets = [];
  const clean = stripComments(text);
  const lower = clean.toLowerCase();
  for (let offset = 0; offset < clean.length; ) {
    const start = lower.indexOf("@import", offset);
    if (start < 0) break;
    const end = clean.indexOf(";", start + 7);
    if (end < 0) break;
    offset = end + 1;
    if (end - start > 2048) continue;
    const match = /^@import\s+(?:url\(\s*)?["']([^"')\s]{1,2048})["']\s*\)?/i.exec(
      clean.slice(start, end),
    );
    if (match)
      try {
        if (imports.length < bounds.resources * 2) imports.push(new URL(match[1], base).href);
      } catch {}
  }
  for (let offset = 0; offset < clean.length && assets.length < bounds.assets; ) {
    const start = lower.indexOf("url(", offset);
    if (start < 0) break;
    const end = clean.indexOf(")", start + 4);
    if (end < 0) break;
    offset = end + 1;
    if (end - start > 2048) continue;
    const value = clean
      .slice(start + 4, end)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (value)
      assets.push({ url: reference(value, base), source_selector: "css:url", fetched: false });
  }
  const blocks = [];
  const stack = [];
  let start = 0;
  let quote = null;
  if (initialSelector) blocks.push({ selector: initialSelector, body: clean });
  else
    for (let index = 0; index < clean.length; index++) {
      const character = clean[index];
      if (quote) {
        if (character === quote && clean[index - 1] !== "\\") quote = null;
        continue;
      }
      if (character === "'" || character === '"') {
        quote = character;
        continue;
      }
      if (character === "{") {
        if (stack.length >= bounds.dom_depth) throw new Error("CSS nesting depth exceeded");
        if (stack.length) stack.at(-1).nested = true;
        stack.push({ selector: clean.slice(start, index).trim(), start: index + 1, nested: false });
        start = index + 1;
      } else if (character === "}") {
        const block = stack.pop();
        if (block && !block.nested)
          blocks.push({ selector: block.selector, body: clean.slice(block.start, index) });
        start = index + 1;
      }
    }
  for (const block of blocks) {
    if (!block.selector) continue;
    for (const declaration of block.body.split(";")) {
      const split = declaration.indexOf(":");
      if (split <= 0) continue;
      const property = declaration.slice(0, split).trim().toLowerCase();
      const value = declaration.slice(split + 1).trim();
      if (!/^(?:--[\w-]+|[a-z][a-z-]*)$/.test(property) || !value) continue;
      if (value.length > 2048) {
        sampler.add(null);
        continue;
      }
      const sanitized = safeText(value, 2048);
      sampler.add({
        selector: safeText(block.selector.slice(0, 512), 512),
        property,
        value: sanitized,
        redacted: sanitized !== value || block.selector.length > 512,
        source_url: base === null ? null : displayUrl(base),
        source_hash: sourceHash,
        observed_at: observedAt,
        method: "static-css-declaration",
        viewport: null,
      });
    }
  }
  return { ...sampler.finish(), imports, assets };
}
