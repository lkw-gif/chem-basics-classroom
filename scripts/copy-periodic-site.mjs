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
const models = await readFile(resolve(output, 'models-3d.js'));
const lab = await readFile(resolve(output, 'acid-lab.js'));
const labCss = await readFile(resolve(output, 'acid-lab.css'));
const waterDemo = await readFile(resolve(output, 'alkali-demo.js'));
const phaseComparison = await readFile(resolve(output, 'phase-comparison.js'));
const versionedJs = js.toString()
  .replace("from './models-3d.js'", `from './models-3d.js?v=${version(models)}'`)
  .replace("from './acid-lab.js'", `from './acid-lab.js?v=${version(lab)}'`)
  .replace("from './alkali-demo.js'", `from './alkali-demo.js?v=${version(waterDemo)}'`)
  .replace("from './phase-comparison.js'", `from './phase-comparison.js?v=${version(phaseComparison)}'`);
await writeFile(resolve(output, 'site.js'), versionedJs);
const page = (await readFile(resolve(output, 'index.html'), 'utf8'))
  .replace('href="./styles.css"', `href="./styles.css?v=${version(css)}"`)
  .replace('href="./acid-lab.css"', `href="./acid-lab.css?v=${version(labCss)}"`)
  .replace('src="./site.js"', `src="./site.js?v=${version(versionedJs)}"`);
await writeFile(resolve(output, 'index.html'), page);

const nestedPage = page.replace('<head>', '<head>\n    <base href="../../" />');
const sessions = ['map', 'states', 'position', 'group1', 'group2', 'halogens', 'noble'];
for (const session of sessions) {
  const directory = resolve(output, 'sessions', session);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), nestedPage);
}
console.log('Copied standalone Periodic Table website and generated seven session pages in github-dist/periodic-table/sessions/.');
