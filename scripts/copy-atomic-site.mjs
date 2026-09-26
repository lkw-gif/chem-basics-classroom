import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'atom-structure-site');
const output = resolve(root, 'github-dist', 'atomic-structure');

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });

const css = await readFile(resolve(output, 'styles.css'));
const js = await readFile(resolve(output, 'site.js'));
const labCss = await readFile(resolve(output, 'learning-labs.css'));
const labJs = await readFile(resolve(output, 'learning-labs.js'));
await cp(resolve(root, 'app', 'periodic-elements.json'), resolve(output, 'periodic-elements.json'));
const version = (asset) => createHash('sha256').update(asset).digest('hex').slice(0, 12);
const versionedJs = js.toString().replace(
  "from './learning-labs.js'",
  "from './learning-labs.js?v=" + version(labJs) + "'",
);
await writeFile(resolve(output, 'site.js'), versionedJs);
const page = (await readFile(resolve(output, 'index.html'), 'utf8'))
  .replace('href="./styles.css"', `href="./styles.css?v=${version(css)}"`)
  .replace('href="./learning-labs.css"', `href="./learning-labs.css?v=${version(labCss)}"`)
  .replace('src="./site.js"', `src="./site.js?v=${version(versionedJs)}"`);
await writeFile(resolve(output, 'index.html'), page);
const nestedPage = page.replace('<head>', '<head>\n    <base href="../../" />');
const sessions = ['earth', 'atom', 'types', 'structure', 'numbers', 'isotopes', 'average', 'shells'];
for (const session of sessions) {
  const directory = resolve(output, 'sessions', session);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), nestedPage);
}
console.log('Copied standalone Atomic Structure website and generated eight session pages in github-dist/atomic-structure/sessions/.');
