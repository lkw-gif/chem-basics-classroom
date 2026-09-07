import fs from 'node:fs';
import assert from 'node:assert/strict';
import ts from 'typescript';
const code=ts.transpileModule(fs.readFileSync('app/molecules.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
const {makeScene,molecule}=await import('data:text/javascript;base64,'+Buffer.from(code).toString('base64'));
const count=s=>s.balls.reduce((a,b)=>(a[b.e]=(a[b.e]||0)+1,a),{});
assert.deepEqual(count(molecule('H2O')),{O:1,H:2});assert.deepEqual(count(molecule('CO2')),{O:2,C:1});
for(const k of ['H2','N2','O2','Cl2','I2'])assert.equal(molecule(k).balls.length,2);
assert.deepEqual(count(makeScene('sample:reaction-water')),count(makeScene('sample:reaction-gases')));
for(const k of ['ice','water','steam'])assert.deepEqual(count(makeScene('sample:'+k)),{O:10,H:20});
for(const e of ['H','O']){const sizes=['ice','water','steam'].map(k=>makeScene('sample:'+k).balls.find(b=>b.e===e).r);assert.ok(sizes.every(v=>v===sizes[0]),'Atoms do not change size when water changes state');}
assert.ok(makeScene('sample:sulphide').bonds.length>0);
const graphite=makeScene('sample:carbon');assert.deepEqual(Object.keys(count(graphite)),['C']);const degree=graphite.balls.map((_,i)=>graphite.bonds.filter(p=>p.includes(i)).length);assert.ok(degree.some(n=>n===3),'Graphite contains joined rings');assert.ok(degree.every(n=>n<=3));
const elements=JSON.parse(fs.readFileSync('app/periodic-elements.json','utf8').replace(/^\uFEFF/,''));assert.equal(elements.length,118);assert.equal(new Set(elements.map(e=>e.symbol)).size,118);assert.equal(new Set(elements.map(e=>`${e.row},${e.column}`)).size,118);assert.equal(elements.filter(e=>e.inNotes).length,20);
for(const [i,e]of elements.entries()){assert.equal(e.atomicNumber,i+1);assert.ok(e.infoEn);assert.ok(!/[\u3400-\u9fff]/.test(e.infoEn));if(e.use)assert.ok(e.useEn);}
const translations=JSON.parse(fs.readFileSync('app/english.json','utf8'));
let missing=[];for(const file of ['app/content.ts','app/page.tsx','app/lessons.tsx','app/model.tsx']){const source=fs.readFileSync(file,'utf8');const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);function visit(n){if(ts.isJsxText(n)||ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n)||ts.isTemplateHead(n)||ts.isTemplateMiddle(n)||ts.isTemplateTail(n)){const t=n.text.trim();const normalized=t.replace(/\s+/g,' ');if(!['繁中','Language / 語言'].includes(t)&&/[\u3400-\u9fff]/.test(t)&&!translations[t]&&!translations[normalized]&&!Object.keys(translations).some(k=>k.trim()===t||k.trim()===normalized))missing.push({file,text:normalized});}ts.forEachChild(n,visit);}visit(sf);}
assert.deepEqual(missing,[],'All original Chinese lesson fragments have English translations');
console.log('PASS: 7 formula models, atom conservation, states, graphite structure, FeS cue, 118 bilingual elements, 20 notes elements, complete lesson translation map.');
