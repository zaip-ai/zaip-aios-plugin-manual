import { randomUUID } from "node:crypto";
import { lstat, mkdir, open, realpath, rename, unlink } from "node:fs/promises";
import { dirname, isAbsolute, relative, resolve } from "node:path";
import { evidenceLimits } from "./policy.mjs";
import { hash } from "./transport.mjs";

export function id(value) {
  if (
    typeof value !== "string" ||
    !/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(value) ||
    /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])$/i.test(value)
  )
    throw new Error("Invalid extraction ID");
  return value;
}
function local(value) {
  if (
    typeof value !== "string" ||
    !value ||
    value.length > 220 ||
    isAbsolute(value) ||
    /[\\:<>"|?*]/.test(value) ||
    [...value].some((char) => char.charCodeAt(0) < 32) ||
    value
      .split("/")
      .some(
        (part) =>
          !part ||
          part === "." ||
          part === ".." ||
          /[. ]$/.test(part) ||
          /^(?:con|prn|aux|nul|com[1-9]|lpt[1-9])(?:\.|$)/i.test(part),
      )
  )
    throw new Error("Unsafe local artifact path");
  return value;
}
export async function path(root, value, create = false) {
  let current = root;
  const parts = local(value).split("/");
  for (const [index, part] of parts.entries()) {
    current = resolve(current, part);
    let stat = await lstat(current).catch((error) => {
      if (error.code === "ENOENT") return null;
      throw error;
    });
    if (!stat && create && index < parts.length - 1) {
      await mkdir(current).catch((error) => {
        if (error.code !== "EEXIST") throw error;
      });
      stat = await lstat(current);
    }
    if (
      stat?.isSymbolicLink() ||
      (stat && index < parts.length - 1 && !stat.isDirectory()) ||
      (stat && index === parts.length - 1 && !stat.isFile())
    )
      throw new Error("Artifact path has symlink/reparse or wrong type");
  }
  return current;
}
export async function read(root, value, maximum = 1048576) {
  const file = await path(root, value);
  const handle = await open(file, "r");
  try {
    const stat = await handle.stat();
    const actual = await realpath(file);
    const offset = relative(root, actual);
    if (!stat.isFile() || stat.size > maximum || offset.startsWith("..") || isAbsolute(offset))
      throw new Error("Artifact read boundary/size violation");
    const bytes = await handle.readFile();
    if (bytes.length > maximum) throw new Error("Artifact size exceeded");
    return bytes;
  } finally {
    await handle.close();
  }
}
export async function write(root, value, bytes) {
  const file = await path(root, value, true);
  const handle = await open(file, "wx", 0o600);
  try {
    await handle.writeFile(bytes);
    await handle.sync();
  } finally {
    await handle.close();
  }
}
export async function publish(root, extractionId, files) {
  id(extractionId);
  // Reject the whole payload before creating output directories, files or receipts.
  for (const [name, content] of Object.entries(files))
    if (
      !Buffer.isBuffer(content) ||
      content.length >
        (name === "screenshot.png"
          ? evidenceLimits.screenshot_bytes
          : evidenceLimits.text_artifact_bytes)
    )
      throw new Error("Extraction artifact payload exceeds bounded capacity");
  const marker = await path(root, ".agents/private/state/visual-url/.gitignore", true);
  const handle = await open(marker, "wx", 0o600).catch((error) => {
    if (error.code === "EEXIST") return null;
    throw error;
  });
  if (handle) {
    try {
      await handle.writeFile("*\n!.gitignore\n");
    } finally {
      await handle.close();
    }
  }
  const destination = await path(
    root,
    `.agents/private/state/visual-url/${extractionId}/receipt.json`,
    true,
  );
  const directory = dirname(destination);
  const lock = await open(resolve(directory, "_publish.lock"), "wx", 0o600);
  try {
    const receiptPath = await path(
      root,
      `.agents/private/state/visual-url/${extractionId}/receipt.json`,
    );
    if (
      await lstat(receiptPath).catch((error) => {
        if (error.code === "ENOENT") return null;
        throw error;
      })
    )
      throw new Error("Extraction ID already committed; choose a new revision ID");
    const inventory = [];
    for (const [name, bytes] of Object.entries(files)) {
      const target = await path(root, `.agents/private/state/visual-url/${extractionId}/${name}`);
      if (
        await lstat(target).catch((error) => {
          if (error.code === "ENOENT") return null;
          throw error;
        })
      )
        throw new Error(
          "Uncommitted extraction material preserved; choose new ID or bounded repair",
        );
      const stage = `.agents/private/state/visual-url/${extractionId}/_stage-${randomUUID()}`;
      await write(root, stage, bytes);
      await rename(await path(root, stage), target);
      if (
        !(
          await read(
            root,
            `.agents/private/state/visual-url/${extractionId}/${name}`,
            name === "screenshot.png"
              ? evidenceLimits.screenshot_bytes
              : evidenceLimits.text_artifact_bytes,
          )
        ).equals(bytes)
      )
        throw new Error("Extraction write verification failed");
      inventory.push({ path: name, bytes: bytes.length, hash: hash(bytes) });
    }
    const receipt = {
      schema_version: 1,
      extraction_id: extractionId,
      committed_at: new Date().toISOString(),
      files: inventory,
    };
    await write(
      root,
      `.agents/private/state/visual-url/${extractionId}/receipt.json`,
      Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`),
    );
    return receipt;
  } finally {
    await lock.close();
    await unlink(resolve(directory, "_publish.lock"));
  }
}
