import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const [html, script, oldSiteContent] = await Promise.all([
  readFile(resolve(root, 'atom-structure-site', 'index.html'), 'utf8'),
  readFile(resolve(root, 'atom-structure-site', 'site.js'), 'utf8'),
  readFile(resolve(root, 'app', 'content.ts'), 'utf8'),
]);

assert.equal((html.match(/data-topic="\d"/g) || []).length, 8, 'The standalone lesson must cover all eight note topics.');
assert.equal((script.match(/^  (earth|atom|types|structure|numbers|isotopes|average|shells): \{/gm) || []).length, 8, 'Every lesson topic must have a checkpoint.');
assert.match(html, /2\.1[\s\S]*2\.2[\s\S]*2\.3[\s\S]*2\.4[\s\S]*2\.5[\s\S]*2\.6[\s\S]*2\.7[\s\S]*2\.8/);
assert.match(html, /lang="zh-Hant-HK"/);
assert.match(html, /data-language="en"/);
assert.match(html, /data-language="zh"/);
assert.doesNotMatch(oldSiteContent, /\['atom',/,'Atomic Structure should be a separate website, not an original-site chapter.');
assert.match(html, /data-protons="17" data-neutrons="18"/);
assert.match(html, /data-protons="17" data-neutrons="20"/);
assert.match(html, /id="chlorine-dot-cross"/);
assert.match(script, /function renderChlorineDiagram\(\)/);
assert.match(script, /const firstTwenty = \[/);
assert.match(script, /renderIsotopeModels\(\);/);

const elementData = script.match(/const firstTwenty = \[([\s\S]*?)\n\];/);
assert.ok(elementData, 'First-twenty element data is present.');
const elements = [...elementData[1].matchAll(/\{ n: (\d+), s: '([^']+)', zh: '([^']+)', en: '([^']+)', mass: (\d+), shells: \[([\d, ]+)\] \}/g)];
assert.equal(elements.length, 20, 'Exactly the first 20 elements should be interactive.');
elements.forEach(([, number, symbol, , , mass, shellsText], index) => {
  const z = Number(number);
  const shells = shellsText.split(',').map((value) => Number(value.trim()));
  assert.equal(z, index + 1);
  assert.ok(symbol);
  assert.ok(Number(mass) >= z);
  assert.equal(shells.reduce((sum, count) => sum + count, 0), z, `${symbol} must show all ${z} electrons.`);
});

const crustShares = [...html.matchAll(/style="--value:([\d.]+)%"/g)].map(([, value]) => Number(value));
assert.ok(Math.abs(crustShares.reduce((sum, value) => sum + value, 0) - 100) < 1e-9, 'Crust-composition chart should add to 100%.');
console.log('PASS: standalone bilingual site covers notes 2.1–2.8, has 8 checkpoints, complete shell diagrams for the first 20 elements, isotope counts and a balanced crust chart.');
