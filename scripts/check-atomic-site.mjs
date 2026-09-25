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
assert.equal((html.match(/data-session-card="(earth|atom|types|structure|numbers|isotopes|average|shells)"/g) || []).length, 8, 'The home page must link to all eight standalone sessions.');
assert.equal((script.match(/^  (earth|atom|types|structure|numbers|isotopes|average|shells): \{/gm) || []).length, 8, 'Every lesson topic must have a checkpoint.');
assert.equal((script.match(/^      \{ q:/gm) || []).length, 24, 'Every session must contain three multiple-choice questions.');
assert.equal((html.match(/<div class="checkpoint" data-quiz=/g) || []).length, 8, 'Each lesson topic must have its own checkpoint container.');
assert.match(script, /function setupPage\(\)/, 'Session routes should display one topic per page.');
assert.match(script, /function createPager\(current, isTop\)/, 'Lesson pages should have previous and next navigation.');
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
assert.match(html, /id="atomic-periodic-grid"/);
assert.match(html, /id="highlight-first20" checked/);
assert.equal((html.match(/<figure(?: class="gallery-feature")?>/g) || []).length, 9, 'Metals, non-metals and metalloids should each show three examples.');
assert.equal((html.match(/class="liquid-art (?:mercury|bromine)-art"/g) || []).length, 2, 'Mercury and bromine should each have a visual example.');
assert.match(html, /室溫約 20–25 °C[\s\S]*只有汞（Hg）和溴（Br）/);
assert.match(html, /id="state-temperature"/);
assert.match(html, /id="state-temperature-number"/);
assert.match(html, /id="add-proton"/);
assert.match(html, /id="builder-neutron-count"/);
assert.match(html, /id="builder-proton-slider"/);
assert.match(html, /id="builder-element-picker"/);
assert.match(html, /id="builder-shell-diagram"/);
assert.match(html, /id="builder-mass-number"/);
assert.match(html, /class="builder-nucleus-model"/);
assert.match(script, /function renderPeriodicTable\(/);
assert.match(script, /function renderStateLab\(/);
assert.match(script, /function renderProtonBuilder\(/);
assert.match(script, /melting: -219, boiling: -183/);
assert.match(script, /melting: 1538, boiling: 2862/);

const periodicElements = JSON.parse(await readFile(resolve(root, 'app', 'periodic-elements.json'), 'utf8'));
assert.equal(periodicElements.length, 118, 'The inserted periodic table should use all 118 elements.');
assert.ok(periodicElements.filter((element) => element.atomicNumber <= 20).length === 20);

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
console.log('PASS: standalone bilingual site covers notes 2.1–2.8, with session quizzes, the 118-element table, nine visual examples, temperature simulation, proton builder, isotope counts and a balanced crust chart.');
