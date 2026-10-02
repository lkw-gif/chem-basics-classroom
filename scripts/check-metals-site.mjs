import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
import { renderMetalAtlas, renderOreGallery } from '../metals-site/extraction-content.js';
import { processLessons, renderProcessDemo, renderProcessScene, renderRustTubes } from '../metals-site/lesson-demos.js';
import { renderExamNote } from '../metals-site/lesson-notes.js';

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
assert.match(renderProcessDemo('carbon', true), /oxygen is still combined with copper/i, 'The initial state should explain why mixing alone does not extract copper');
assert.doesNotMatch(source, /metal-hero|createExtractionModels/, 'The old hero and distracting 3D controls must be removed');
for (const en of [false, true]) {
  for (const [kind, lesson] of Object.entries(processLessons)) {
    assert.equal(lesson.steps.length, 3, `${kind} needs three clear steps`);
    const scenes = lesson.steps.map((_, step) => renderProcessScene(kind, step, en));
    assert.equal(new Set(scenes).size, 3, `${kind} must show a different observation at every step`);
    for (const scene of scenes) assert.doesNotMatch(scene, /undefined|NaN/, `${kind} needs complete bilingual labels`);
    assert.match(renderProcessDemo(kind, en), /aria-pressed="true"/, 'One step should be selected initially');
  }
  for (const lesson of data.lessons) assert.doesNotMatch(renderExamNote(lesson.id, en), /undefined/, 'Every lesson needs a bilingual short-answer prompt');
  assert.equal((renderRustTubes(en, true).match(/rust-positive/g) || []).length, 1, 'Only the tube with water and oxygen should rust');
  assert.equal((renderRustTubes(en, false).match(/rust-positive/g) || []).length, 0, 'All nails must be clean at the start');
}
assert.match(extraction, /Bauxite → alumina/, 'Ore explanation must distinguish bauxite from alumina');
assert.match(extraction, /actual cinnabar HgS/, 'Mercury oxide comparison needs the real-ore caveat');
const atlas = renderMetalAtlas(true);
for (const symbol of ['Ca', 'Na', 'K', 'Mg', 'Al', 'Zn', 'Fe', 'Pb', 'Cu', 'Hg', 'Ag', 'Pd', 'Au']) {
  assert.ok(atlas.includes(`data-metal="${symbol}"`), `Extraction atlas is missing ${symbol}`);
}
assert.equal((renderOreGallery(true).match(/<img /g) || []).length, 4, 'Ore gallery needs four real photographs');
console.log('Metals site: eight bilingual lessons, 24 checkpoints and core chemistry statements checked.');
