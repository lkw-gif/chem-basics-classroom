import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {outcomes,units,extensions} from '../acids-site/curriculum.js';
import {lessons} from '../acids-site/lessons.js';
import {questions,originalQuestions,supplementQuestions} from '../acids-site/questions.js';
import {drawDiagram} from '../acids-site/diagrams.js';
assert.equal(outcomes.length,36);assert.equal(new Set(outcomes.map(o=>o.id)).size,36);
assert.equal(lessons.length,25);assert.equal(originalQuestions.length,96);assert.equal(supplementQuestions.length,50);
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
const ids=new Set(lessons.map(l=>l.id)),bilingual=p=>assert(p?.length===2&&p.every(v=>typeof v==='string'&&v.trim()),'Missing bilingual text');
for(const o of outcomes){bilingual(o.text);o.lessons.forEach(id=>assert(ids.has(id)));assert(questions.some(q=>q.outcomes.includes(o.id)),`No practice for ${o.id}`);if(!originalQuestions.some(q=>q.outcomes.includes(o.id))){assert(supplementQuestions.some(q=>q.outcomes.includes(o.id)&&q.level==='foundation'));assert(supplementQuestions.some(q=>q.outcomes.includes(o.id)&&q.level==='application'));}}
assert.deepEqual(new Set([...units.flatMap(u=>u.lessons),...extensions]),ids);
for(const l of lessons){bilingual(l.title);bilingual(l.lead);assert(l.sections.length);l.sections.forEach(s=>{bilingual(s.heading);s.paragraphs.forEach(bilingual);if(s.table){s.table.headers.forEach(bilingual);s.table.rows.forEach(row=>{assert.equal(row.length,s.table.headers.length);row.forEach(bilingual);});}});bilingual(l.demo.prompt);l.demo.steps.forEach(bilingual);l.errors.forEach(bilingual);l.takeaways.forEach(bilingual);assert(questions.some(q=>q.lesson===l.id),`Empty practice: ${l.id}`);if(l.diagram)for(const lang of ['zh','en'])assert(drawDiagram(l.diagram,lang).includes('<svg'),`Missing diagram ${l.diagram}`);}
for(const q of questions){assert(ids.has(q.lesson));[q.prompt,q.hint,q.answer].forEach(bilingual);assert(q.steps.length);q.steps.forEach(bilingual);q.choices?.forEach(bilingual);q.parts?.forEach(p=>bilingual(p.prompt));if(q.source){assert(q.source.pdfPage>=1&&q.source.pdfPage<=79);assert.equal(q.source.printedPage,q.source.pdfPage-1);assert(q.source.label);}q.outcomes.forEach(id=>assert(outcomes.some(o=>o.id===id)));}
// A page-level source inventory prevents silent loss when reorganising lessons.
const expected={9:4,10:3,13:6,14:7,15:6,24:10,25:3,26:3,28:2,31:1,32:1,33:4,34:14,41:1,43:1,44:1,46:2,47:3,48:3,49:3,55:2,58:1,69:1,71:2,72:1,77:11};
const actual={};for(const q of originalQuestions)actual[q.source.pdfPage]=(actual[q.source.pdfPage]||0)+1;assert.deepEqual(actual,expected);
assert.equal(0.1*0.02005*2/0.025,0.1604);assert(Math.abs(-Math.log10(0.02)-1.6989700043360187)<1e-12);
const strength=lessons.find(l=>l.id==='strength');assert(JSON.stringify(strength).includes('dissolved portion'));
const renderer=await readFile(new URL('../acids-site/site.js',import.meta.url),'utf8');assert(!/type="checkbox"|localStorage|fetch\(|data-score|correct-answer/i.test(renderer));
if(process.argv.includes('--built')){const root=new URL('../github-dist/acids-and-bases/',import.meta.url);await access(new URL('index.html',root));await access(new URL('revision/index.html',root));for(const l of lessons){const html=await readFile(new URL(`sessions/${l.id}/index.html`,root),'utf8');assert(html.includes('<base href="../../"/>'));}assert((await readFile(new URL('site.js',root),'utf8')).includes('.js?v='));}
console.log(`DSE acids verified: ${outcomes.length} outcomes, ${lessons.length} lessons, ${originalQuestions.length} traced originals, ${supplementQuestions.length} supplements; bilingual content and practice coverage complete.`);
