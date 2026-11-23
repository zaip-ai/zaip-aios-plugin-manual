import { cp, mkdir, readdir, realpath } from 'node:fs/promises';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const template = fileURLToPath(new URL('../assets/template/', import.meta.url));
const [destination, ...extra] = process.argv.slice(2);

async function create() {
  if (!destination || extra.length) throw new Error('Uso: node criar.mjs <pasta-nova>');
  const requested = resolve(destination);
  const target = join(await realpath(dirname(requested)), basename(requested));
  const fromTemplate = relative(await realpath(template), target);
  if (!isAbsolute(fromTemplate) && fromTemplate !== '..' && !fromTemplate.startsWith('..' + sep)) {
    throw new Error('Escolha uma pasta fora do template.');
  }
  const entries = await readdir(template);
  await mkdir(target);
  for (const entry of entries) {
    await cp(resolve(template, entry), resolve(target, entry), {
      recursive: true, force: false, errorOnExist: true,
    });
  }
  console.log('LP criada em ' + target);
}

create().catch(error => {
  console.error(error.code === 'EEXIST' ? 'O destino já existe. Os arquivos existentes foram preservados.' : error.message);
  process.exitCode = 1;
});
