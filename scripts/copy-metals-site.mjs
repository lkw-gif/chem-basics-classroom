import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'metals-site');
const output = resolve(root, 'github-dist', 'metals');

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });

const version = (bytes) => createHash('sha256').update(bytes).digest('hex').slice(0, 12);
const css = await readFile(resolve(output, 'styles.css'));
const metalCss = await readFile(resolve(output, 'metals.css'));
const extractionCss = await readFile(resolve(output, 'extraction-content.css'));
const lessonCss = await readFile(resolve(output, 'lesson-design.css'));
const extractionJs = await readFile(resolve(output, 'extraction-content.js'));
const demoJs = await readFile(resolve(output, 'lesson-demos.js'));
const notesJs = await readFile(resolve(output, 'lesson-notes.js'));
const interactiveJs = (await readFile(resolve(output, 'interactive-pages.js'), 'utf8'))
  .replace("from './lesson-demos.js'", `from './lesson-demos.js?v=${version(demoJs)}'`);
await writeFile(resolve(output, 'interactive-pages.js'), interactiveJs);
const js = (await readFile(resolve(output, 'site.js'), 'utf8'))
  .replace("from './extraction-content.js'", `from './extraction-content.js?v=${version(extractionJs)}'`)
  .replace("from './interactive-pages.js'", `from './interactive-pages.js?v=${version(interactiveJs)}'`)
  .replace("from './lesson-demos.js'", `from './lesson-demos.js?v=${version(demoJs)}'`)
  .replace("from './lesson-notes.js'", `from './lesson-notes.js?v=${version(notesJs)}'`);
await writeFile(resolve(output, 'site.js'), js);
const page = (await readFile(resolve(output, 'index.html'), 'utf8'))
  .replace('href="./styles.css"', `href="./styles.css?v=${version(css)}"`)
  .replace('href="./metals.css"', `href="./metals.css?v=${version(metalCss)}"`)
  .replace('href="./extraction-content.css"', `href="./extraction-content.css?v=${version(extractionCss)}"`)
  .replace('href="./lesson-design.css"', `href="./lesson-design.css?v=${version(lessonCss)}"`)
  .replace('src="./site.js"', `src="./site.js?v=${version(js)}"`);
await writeFile(resolve(output, 'index.html'), page);

const nestedPage = page.replace('<head>', '<head>\n    <base href="../../" />');
const sessions = ['properties', 'history', 'sources', 'simple', 'carbon', 'electrolysis', 'rust', 'protect'];
for (const session of sessions) {
  const directory = resolve(output, 'sessions', session);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), nestedPage);
}
console.log('Copied standalone Metals website and generated eight session pages in github-dist/metals/sessions/.');
