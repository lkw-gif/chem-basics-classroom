import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'atom-structure-site');
const output = resolve(root, 'github-dist', 'atomic-structure');

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });

const page = await readFile(resolve(output, 'index.html'), 'utf8');
const nestedPage = page.replace('<head>', '<head>\n    <base href="../../" />');
const sessions = ['earth', 'atom', 'types', 'structure', 'numbers', 'isotopes', 'average', 'shells'];
for (const session of sessions) {
  const directory = resolve(output, 'sessions', session);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), nestedPage);
}
console.log('Copied standalone Atomic Structure website and generated eight session pages in github-dist/atomic-structure/sessions/.');
