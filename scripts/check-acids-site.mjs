import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {outcomes,units,extensions} from '../acids-site/curriculum.js';
import {lessons} from '../acids-site/lessons.js';
import {questions,originalQuestions,supplementQuestions} from '../acids-site/questions.js';
import {drawDiagram} from '../acids-site/diagrams.js';
import {notesRoute,tutoring} from '../acids-site/tutoring.js';
import {titrationCases,titrationTrials} from '../acids-site/titration-data.js';
assert.equal(outcomes.length,36);assert.equal(new Set(outcomes.map(o=>o.id)).size,36);
assert.equal(lessons.length,26);assert.equal(originalQuestions.length,96);assert.equal(supplementQuestions.length,50);
assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);
const ids=new Set(lessons.map(l=>l.id)),bilingual=p=>assert(p?.length===2&&p.every(v=>typeof v==='string'&&v.trim()),'Missing bilingual text');
for(const o of outcomes){bilingual(o.text);o.lessons.forEach(id=>assert(ids.has(id)));assert(questions.some(q=>q.outcomes.includes(o.id)),`No practice for ${o.id}`);if(!originalQuestions.some(q=>q.outcomes.includes(o.id))){assert(supplementQuestions.some(q=>q.outcomes.includes(o.id)&&q.level==='foundation'));assert(supplementQuestions.some(q=>q.outcomes.includes(o.id)&&q.level==='application'));}}
assert.deepEqual(new Set([...units.flatMap(u=>u.lessons),...extensions]),ids);
for(const l of lessons){bilingual(l.title);bilingual(l.lead);assert(l.sections.length);l.sections.forEach(s=>{bilingual(s.heading);s.paragraphs.forEach(bilingual);if(s.table){s.table.headers.forEach(bilingual);s.table.rows.forEach(row=>{assert.equal(row.length,s.table.headers.length);row.forEach(bilingual);});}});bilingual(l.demo.prompt);l.demo.steps.forEach(bilingual);l.errors.forEach(bilingual);l.takeaways.forEach(bilingual);assert(questions.some(q=>q.lesson===l.id)||(l.id==='salt-methods'&&originalQuestions.some(q=>q.source.pdfPage===77)),`Empty practice: ${l.id}`);if(l.diagram)for(const lang of ['zh','en'])assert(drawDiagram(l.diagram,lang).includes('<svg'),`Missing diagram ${l.diagram}`);}
assert.equal(new Set(notesRoute.map(([id])=>id)).size,12);
assert.equal(notesRoute.at(0)[0],'water');assert.equal(notesRoute.at(-1)[0],'salt-methods');
for(const [id] of notesRoute)assert(ids.has(id)&&tutoring[id],`Missing worked example for ${id}`);
for(const example of Object.values(tutoring)){
  [example.prompt,example.answer,...example.points].forEach(bilingual);
  if(example.figure) await access(new URL(`../acids-site/notes-images/${example.figure.file}`,import.meta.url));
}
for(const q of questions){assert(ids.has(q.lesson));[q.prompt,q.hint,q.answer].forEach(bilingual);assert(q.steps.length);q.steps.forEach(bilingual);q.choices?.forEach(bilingual);q.parts?.forEach(p=>bilingual(p.prompt));if(q.source){assert(q.source.pdfPage>=1&&q.source.pdfPage<=79);assert.equal(q.source.printedPage,q.source.pdfPage-1);assert(q.source.label);}q.outcomes.forEach(id=>assert(outcomes.some(o=>o.id===id)));}
// A page-level source inventory prevents silent loss when reorganising lessons.
const expected={9:4,10:3,13:6,14:7,15:6,24:10,25:3,26:3,28:2,31:1,32:1,33:4,34:14,41:1,43:1,44:1,46:2,47:3,48:3,49:3,55:2,58:1,69:1,71:2,72:1,77:11};
const actual={};for(const q of originalQuestions)actual[q.source.pdfPage]=(actual[q.source.pdfPage]||0)+1;assert.deepEqual(actual,expected);
assert.equal(0.1*0.02005*2/0.025,0.1604);assert(Math.abs(-Math.log10(0.02)-1.6989700043360187)<1e-12);
const strength=lessons.find(l=>l.id==='strength');assert(JSON.stringify(strength).includes('dissolved portion'));
assert.deepEqual(titrationCases.map(({year,paper,question,parts})=>[year,paper,question,parts.length]),[
  [2021,'Paper 1B','Q7(a)–(d)',4],[2022,'Paper 1B','Q3(a)–(c)',4],
  [2025,'Paper 1B','Q5(a), (b)(i)–(iii)',4],[2020,'Paper 1B','Q4(d)–(e)',2],
]);
assert.deepEqual(titrationTrials.map(([initial,final])=>(final-initial).toFixed(2)),['28.85','27.25','27.30','28.35','27.25']);
for(const item of titrationCases){
  assert.equal(new URL(item.source).hostname,'www.hkeaa.edu.hk');
  assert.equal(new Set(item.parts.map(part=>part.id)).size,item.parts.length);
  [item.stage,item.title,item.skill,item.setup,...item.parts.flatMap(part=>[part.type,part.prompt,part.wording,...part.steps])].forEach(bilingual);
}
const renderer=await readFile(new URL('../acids-site/site.js',import.meta.url),'utf8');assert(!/type="checkbox"|localStorage|fetch\(|data-score|correct-answer/i.test(renderer));
if(process.argv.includes('--built')){const root=new URL('../github-dist/acids-and-bases/',import.meta.url);await access(new URL('index.html',root));await access(new URL('revision/index.html',root));for(const l of lessons){const html=await readFile(new URL(`sessions/${l.id}/index.html`,root),'utf8');assert(html.includes('<base href="../../"/>'));}assert((await readFile(new URL('site.js',root),'utf8')).includes('.js?v='));}
console.log(`DSE acids verified: ${outcomes.length} outcomes, ${lessons.length} lessons, ${originalQuestions.length} traced originals, ${supplementQuestions.length} supplements; bilingual content and practice coverage complete.`);
if(process.argv.includes('--built')){
  const root=new URL('../github-dist/acids-and-bases/',import.meta.url);
  const page=await readFile(new URL('titration-lab/index.html',root),'utf8');
  const shell=await readFile(new URL('site.js',root),'utf8');
  const lab=await readFile(new URL('titration-lab.js',root),'utf8');
  const version=page.match(/\.\/site\.js\?v=([\da-f]{12})/)?.[1];
  assert(version && page.includes('<base href="../"/>') && page.includes(`titration-lab.css?v=${version}`));
  assert(shell.includes(`./titration-lab.js?v=${version}`));
  assert(lab.includes(`./titration-data.js?v=${version}`));
}
