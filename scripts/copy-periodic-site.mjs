import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'periodic-table-site');
const output = resolve(root, 'github-dist', 'periodic-table');

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });
await cp(resolve(root, 'app', 'periodic-elements.json'), resolve(output, 'periodic-elements.json'));

const version = (bytes) => createHash('sha256').update(bytes).digest('hex').slice(0, 12);
const css = await readFile(resolve(output, 'styles.css'));
const js = await readFile(resolve(output, 'site.js'));
const page = (await readFile(resolve(output, 'index.html'), 'utf8'))
  .replace('href="./styles.css"', `href="./styles.css?v=${version(css)}"`)
  .replace('src="./site.js"', `src="./site.js?v=${version(js)}"`);
await writeFile(resolve(output, 'index.html'), page);

const nestedPage = page.replace('<head>', '<head>\n    <base href="../../" />');
const sessions = ['map', 'states', 'position', 'group1', 'group2', 'halogens', 'noble'];
for (const session of sessions) {
  const directory = resolve(output, 'sessions', session);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), nestedPage);
}
console.log('Copied standalone Periodic Table website and generated seven session pages in github-dist/periodic-table/sessions/.');
