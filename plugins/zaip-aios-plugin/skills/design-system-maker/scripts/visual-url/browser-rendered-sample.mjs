// Fixed reader serialized into the isolated browser. It never applies page CSS or runs source text.
export function renderedSample() {
  const root = document.documentElement;
  const html = root?.outerHTML ?? "";
  if (html.length > 4194304) return { oversized: true };
  const all = document.querySelectorAll("*");
  const scanned = [];
  const inspection = new Set();
  const spread = (nodes, index, count) =>
    nodes[count <= 1 ? 0 : Math.floor((index * (nodes.length - 1)) / (count - 1))];
  for (const node of [
    root,
    document.body,
    ...document.querySelectorAll("header,footer,nav,main"),
  ].slice(0, 32))
    if (node) inspection.add(node);
  const wrappedActions = Array.from(
    document.querySelectorAll("button,a,input,select,[role=button],[role=link]"),
  ).filter((node) => ["DIV", "SPAN"].includes(node.parentElement?.tagName));
  for (let i = 0, count = Math.min(wrappedActions.length, 40); i < count; i++) {
    let parent = spread(wrappedActions, i, count);
    for (let depth = 0; parent && depth <= 3; depth++, parent = parent.parentElement)
      inspection.add(parent);
  }
  // Reserve salient nodes and their ancestors before the generic spread. Separate
  // categories prevent thousands of FAQ buttons from hiding a lone heading/link.
  for (const query of ["h1,h2,h3", "[role=button],[role=link]", "button", "a", "input,select"]) {
    const seeds = document.querySelectorAll(query);
    const count = Math.min(seeds.length, 40);
    for (let i = 0; i < count && inspection.size < 1000; i++) {
      let parent = spread(seeds, i, count);
      for (
        let depth = 0;
        parent && depth <= 3 && inspection.size < 1000;
        depth++, parent = parent.parentElement
      )
        inspection.add(parent);
    }
  }
  // Spread inspection across the document; early DOM order cannot consume the whole budget.
  const slots = 2000 - inspection.size;
  for (let i = 0, count = Math.min(all.length, slots); i < count; i++)
    inspection.add(spread(all, i, count));
  let elementId = 0;
  for (const node of inspection) {
    const style = getComputedStyle(node),
      rect = node.getBoundingClientRect();
    if (
      style.display === "none" ||
      style.visibility === "hidden" ||
      Number(style.opacity) === 0 ||
      rect.width <= 0 ||
      rect.height <= 0
    )
      continue;
    const tag = node.tagName.toLowerCase();
    const role = node.getAttribute("role") ?? "";
    const landmark = node.closest("footer,header,nav,main,section,article,aside");
    const region = landmark?.tagName.toLowerCase() ?? "body";
    const action =
      /^(button|a|input|select)$/.test(tag) ||
      /^(button|link)$/.test(role) ||
      style.cursor === "pointer";
    const gradient = /gradient\(/.test(style.backgroundImage);
    const background = style.backgroundColor;
    const paint = gradient || !/^(transparent|rgba\(0, 0, 0, 0\))$/.test(background);
    const context = {
      element_id: "rendered-" + elementId++,
      tag,
      role: action ? "action" : /^h[1-6]$/.test(tag) ? "heading" : "surface",
      region,
      area: Math.round(Math.min(rect.width * rect.height, 100000000)),
      in_viewport:
        rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth,
    };
    scanned.push({ node, style, context, gradient, paint, action, tag, y: rect.top + scrollY });
  }
  const selected = [],
    seen = new Set();
  const add = (item, pseudo = null, style = item?.style) => {
    if (!item || selected.length >= (pseudo ? 48 : 40)) return;
    const key = item.node;
    if (!pseudo && seen.has(key)) return;
    if (!pseudo) seen.add(key);
    selected.push({ ...item, style, pseudo });
  };
  for (const node of [root, document.body]) add(scanned.find((item) => item.node === node));
  const choose = (items, count) => {
    const colors = new Set();
    const ranked = [...items].sort(
      (a, b) =>
        Number(b.gradient) - Number(a.gradient) ||
        Number(b.context.in_viewport) - Number(a.context.in_viewport) ||
        b.context.area - a.context.area ||
        a.y - b.y,
    );
    let added = 0;
    for (const item of ranked) {
      let wrapperPaint = "";
      if (item.action && !item.paint) {
        let parent = item.node.parentElement;
        for (let depth = 0; parent && depth < 3; depth++, parent = parent.parentElement) {
          const ancestor = scanned.find((row) => row.node === parent);
          if (ancestor?.paint) {
            if (["div", "span"].includes(ancestor.tag))
              wrapperPaint = ancestor.style.backgroundColor + ancestor.style.backgroundImage;
            break;
          }
        }
      }
      const key = [
        item.tag,
        item.context.region,
        item.style.backgroundColor,
        item.style.backgroundImage,
        item.style.color,
        item.style.fill,
        item.style.stroke,
        wrapperPaint,
      ].join("|");
      if (seen.has(item.node) || colors.has(key)) continue;
      add(item);
      colors.add(key);
      if (++added >= count) return;
    }
  };
  choose(
    scanned.filter((item) => item.action),
    8,
  );
  choose(
    scanned.filter((item) => /^h[1-6]$/.test(item.tag)),
    4,
  );
  // Transparent text often inherits a gradient from a wrapping DIV.
  let ancestors = 0;
  for (const item of selected.slice()) {
    if (item.context.role !== "heading" && !item.action) continue;
    let parent = item.node.parentElement;
    for (let depth = 0; parent && depth < 3; depth++, parent = parent.parentElement) {
      const ancestor = scanned.find((row) => row.node === parent);
      if (ancestor?.paint) {
        const actionAncestor =
          item.action &&
          !item.paint &&
          ["div", "span"].includes(ancestor.tag) &&
          parent.querySelectorAll("button,a,input,select,[role=button],[role=link]").length === 1;
        if (!seen.has(parent) && ancestors < 6) {
          add(
            actionAncestor
              ? {
                  ...ancestor,
                  action_node: item.node,
                  context: { ...ancestor.context, role: "action" },
                }
              : ancestor,
          );
          ancestors++;
        }
        // Associate only the nearest painted wrapper of this one action.
        if (item.action) break;
      }
    }
  }
  for (const region of ["footer", "header", "nav", "main", "section", "aside"])
    choose(
      scanned.filter(
        (item) => item.tag === region || (item.context.region === region && item.paint),
      ),
      2,
    );
  choose(
    scanned.filter((item) =>
      ["svg", "path", "circle", "rect", "polygon", "line"].includes(item.tag),
    ),
    4,
  );
  choose(
    scanned.filter((item) => item.paint && /^(div|span|article|section)$/.test(item.tag)),
    6,
  );
  // Pseudo paint is evidence of its own; transparent/absent pseudos are not sampled.
  for (const item of scanned) {
    if (selected.length >= 48) break;
    for (const pseudo of ["::before", "::after"]) {
      const style = getComputedStyle(item.node, pseudo);
      if (
        !style.content ||
        ["none", "normal"].includes(style.content) ||
        style.display === "none" ||
        style.visibility === "hidden" ||
        Number(style.opacity) === 0
      )
        continue;
      if (
        /gradient\(/.test(style.backgroundImage) ||
        !/^(transparent|rgba\(0, 0, 0, 0\))$/.test(style.backgroundColor)
      )
        add(item, pseudo, style);
    }
  }
  const path = (node) => {
    if (node === root) return "html";
    if (node === document.body) return "body";
    const parts = [];
    for (let p = node; p && p !== document.body && parts.length < 32; p = p.parentElement) {
      const tag = p.tagName.toLowerCase();
      const siblings = Array.from(p.parentElement?.children ?? []).filter(
        (s) => s.tagName === p.tagName,
      );
      parts.unshift(tag + ":nth-of-type(" + (siblings.indexOf(p) + 1) + ")");
    }
    return "body > " + parts.join(" > ");
  };
  const styles = [];
  const push = (selector, property, value) => {
    if (styles.length < 399)
      styles.push({ selector, property, value: String(value).slice(0, 2048) });
  };
  let sampled = 0;
  for (const item of selected) {
    const selector = path(item.node);
    if (selector.length > 500 || document.querySelector(selector) !== item.node) continue;
    const locator = selector + (item.pseudo ?? "");
    sampled++;
    push(
      locator,
      "sample-context",
      JSON.stringify({
        ...item.context,
        source_type: item.pseudo ? "pseudo" : "element",
        ...(item.action_node ? { action_selector: path(item.action_node) } : {}),
      }),
    );
    for (const property of [
      "color",
      "background-color",
      "background-image",
      "background-clip",
      "fill",
      "stroke",
    ])
      push(locator, property, item.style.getPropertyValue(property));
  }
  for (const item of selected
    .filter(
      (item) =>
        !item.pseudo &&
        (item.node === document.body ||
          item.node === root ||
          item.context.role === "heading" ||
          item.action),
    )
    .slice(0, 6)) {
    const selector = path(item.node);
    if (selector.length > 500 || document.querySelector(selector) !== item.node) continue;
    for (const property of [
      "font-family",
      "font-size",
      "font-weight",
      "line-height",
      "letter-spacing",
      "border-radius",
      "padding",
      "gap",
      "border-color",
      "box-shadow",
    ])
      push(selector, property, item.style.getPropertyValue(property));
  }
  const images = Array.from(document.images).slice(0, 200);
  const readiness = {
    fonts: document.fonts?.status ?? "unavailable",
    images_pending: images.filter((n) => !n.complete && n.loading !== "lazy").length,
    images_failed: images.filter(
      (n) => n.complete && !n.naturalWidth && Boolean(n.currentSrc || n.src),
    ).length,
    images_omitted: Math.max(0, document.images.length - images.length),
    layout_stable: false,
  };
  const coverage = {
    method: "region-paint-balanced-v1",
    scanned: inspection.size,
    sampled,
    omitted: Math.max(0, all.length - sampled),
    scan_omitted: Math.max(0, all.length - 2000),
    readiness,
  };
  return {
    html,
    url: location.href,
    title: document.title,
    ready: document.readyState,
    viewport: { width: innerWidth, height: innerHeight },
    pixel_ratio: devicePixelRatio,
    page_x: scrollX,
    page_y: scrollY,
    styles,
    coverage,
    layout_signature: [
      root?.scrollWidth,
      root?.scrollHeight,
      ...selected.slice(0, 8).flatMap((item) => {
        const r = item.node.getBoundingClientRect();
        return [Math.round(r.x), Math.round(r.y), Math.round(r.width), Math.round(r.height)];
      }),
    ].join(","),
    icons: Array.from(document.querySelectorAll('link[rel~="icon"]'))
      .slice(0, 8)
      .map((n) => n.href),
  };
}
