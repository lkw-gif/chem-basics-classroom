import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { renderMetalAtlas, renderOreGallery } from '../metals-site/extraction-content.js';

const root = resolve(import.meta.dirname, '..');
const source = await readFile(resolve(root, 'metals-site', 'site.js'), 'utf8');
const extraction = await readFile(resolve(root, 'metals-site', 'extraction-content.js'), 'utf8');
const interactive = await readFile(resolve(root, 'metals-site', 'interactive-pages.js'), 'utf8');
const lessonData = source.split('const requestedLanguage')[0].replace(/^import .*;\r?\n/gm, '');
const data = runInNewContext(`${lessonData}\n({ lessons, quizBank })`);

assert.equal(data.lessons.length, 8, 'Unit 4 should have eight separate lessons');
assert.equal(new Set(data.lessons.map(lesson => lesson.id)).size, 8, 'Lesson IDs should be unique');
for (const lesson of data.lessons) {
  assert.ok(lesson.zh && lesson.en && lesson.leadZh && lesson.leadEn, `${lesson.id} needs bilingual teaching copy`);
  const questions = data.quizBank[lesson.id];
  assert.equal(questions?.length, 3, `${lesson.id} needs three checkpoints`);
  for (const [index, q] of questions.entries()) {
    assert.equal(q.length, 7, `${lesson.id} checkpoint ${index + 1} needs bilingual feedback`);
    assert.equal(q[2].length, 3, `${lesson.id} checkpoint ${index + 1} needs three Chinese choices`);
    assert.equal(q[3].length, 3, `${lesson.id} checkpoint ${index + 1} needs three English choices`);
    assert.ok(q[4] >= 0 && q[4] < 3, `${lesson.id} checkpoint ${index + 1} needs a valid answer`);
  }
}
assert.match(source, /水和氧氣要同時存在/, 'Rusting conditions need to be stated correctly');
assert.match(source, /鋁是地殼中含量最高的金屬元素/, 'Crust abundance distinction needs to be explicit');
assert.match(source, /width:45%/, 'Crust chart should follow the Unit 4 notes: oxygen 45%');
assert.match(source, /width:8%/, 'Crust chart should follow the Unit 4 notes: aluminium 8%');
assert.match(interactive, /Carbon removes oxygen from copper oxide/, 'Carbon-reduction explanation needs to be present');
assert.match(extraction, /Bauxite → alumina/, 'Ore explanation must distinguish bauxite from alumina');
assert.match(extraction, /actual cinnabar HgS/, 'Mercury oxide comparison needs the real-ore caveat');
const atlas = renderMetalAtlas(true);
for (const symbol of ['Ca', 'Na', 'K', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'Cu', 'Hg', 'Ag', 'Pd', 'Au']) {
  assert.ok(atlas.includes(`data-metal="${symbol}"`), `Extraction atlas is missing ${symbol}`);
}
assert.equal((renderOreGallery(true).match(/<img /g) || []).length, 4, 'Ore gallery needs four real photographs');
console.log('Metals site: eight bilingual lessons, 24 checkpoints and core chemistry statements checked.');
