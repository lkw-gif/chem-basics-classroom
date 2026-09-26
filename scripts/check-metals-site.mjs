import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const source = await readFile(resolve(root, 'metals-site', 'site.js'), 'utf8');
const data = runInNewContext(`${source.split('const requestedLanguage')[0]}\n({ lessons, quizBank })`);

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
assert.match(source, /Carbon takes oxygen from copper oxide/, 'Carbon-reduction explanation needs to be present');
console.log('Metals site: eight bilingual lessons, 24 checkpoints and core chemistry statements checked.');
