export const samplingMethod = "root-theme-font-component-priority-v1";

export function declarationPriority(item) {
  if (
    /@font-face/i.test(item.selector) ||
    /(?:^|-)font(?:-|$)|typography|line-height|letter-spacing/.test(item.property)
  )
    return 3;
  if (/(?:^|[\s,])(?::root|html)(?:$|[\s,[.:#])|theme|\bdark\b|\blight\b/i.test(item.selector))
    return 4;
  if (/^--/.test(item.property)) return 4;
  if (
    /button|card|input|select|textarea|nav|dialog|modal|badge|heading|\bh[1-6]\b/i.test(
      item.selector,
    )
  )
    return 2;
  if (
    /color|background|padding|margin|gap|radius|border|shadow|display|width|height|align|justify/.test(
      item.property,
    )
  )
    return 1;
  return 0;
}

export function declarationSampler(maximum) {
  const buckets = Array.from({ length: 5 }, () => new Map());
  const counts = Array(5).fill(0);
  let total = 0;
  let oversized = 0;
  return {
    add(item) {
      total++;
      if (!item) {
        oversized++;
        return;
      }
      const priority = declarationPriority(item);
      const bucket = buckets[priority];
      const key = `${item.source_hash}:${item.selector}`;
      if (!bucket.has(key)) {
        if (bucket.size >= maximum) {
          const removed = bucket.keys().next().value;
          counts[priority] -= bucket.get(removed).length;
          bucket.delete(removed);
        }
        bucket.set(key, []);
      }
      const group = bucket.get(key);
      if (group.length >= maximum) return;
      group.push({ item, sequence: total });
      counts[priority]++;
      if (counts[priority] > maximum * 4) {
        const largest = [...bucket.values()].reduce((a, b) => (a.length >= b.length ? a : b));
        largest.pop();
        counts[priority]--;
      }
    },
    finish() {
      // Reserve bounded representation across categories; root floods cannot erase fonts/components.
      const quotas = [5, 10, 15, 20, 50].map((weight) => Math.floor((maximum * weight) / 100));
      const ordered = buckets.map((bucket) => {
        const sources = new Map();
        for (const rows of bucket.values()) {
          const key = rows[0]?.item.source_hash;
          if (!sources.has(key)) sources.set(key, []);
          sources.get(key).push([...rows]);
        }
        const result = [];
        while (
          result.length < maximum &&
          [...sources.values()].some((groups) => groups.some((rows) => rows.length))
        ) {
          for (const groups of sources.values()) {
            const rows = groups.shift();
            if (rows?.length) result.push(rows.shift());
            if (rows?.length) groups.push(rows);
            if (result.length === maximum) break;
          }
        }
        return result;
      });
      const selected = ordered.flatMap((bucket, index) => bucket.slice(0, quotas[index]));
      for (let index = ordered.length - 1; index >= 0 && selected.length < maximum; index--) {
        selected.push(
          ...ordered[index].slice(quotas[index], quotas[index] + maximum - selected.length),
        );
      }
      selected.sort((a, b) => a.sequence - b.sequence);
      return {
        declarations: selected.map((row) => row.item),
        sampling: {
          method: samplingMethod,
          total,
          sampled: selected.length,
          truncated: total - selected.length,
          oversized,
        },
      };
    },
  };
}

export function selectDeclarations(values, maximum) {
  const sampler = declarationSampler(maximum);
  for (const item of values) sampler.add(item);
  return sampler.finish().declarations;
}
