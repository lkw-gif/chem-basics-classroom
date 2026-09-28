import assert from 'node:assert/strict';
import {chapters} from '../bonding-site/content.js';
import {elements,shells,simpleIons,ionicPairs,ratio,ionicFormula,parseFormula,massOf,molecules,valence,pairTotal,loneTotal,molecularTasks} from '../bonding-site/chemistry.js';
for(const e of elements){assert.equal(shells(e.z).reduce((n,x)=>n+x,0),e.z);assert(shells(e.z).every((n,i)=>n<=[2,8,8,2][i]));}
for(const e of simpleIons){const arr=shells(e.z-e.charge);assert((e.symbol==='H'&&e.charge===1&&arr.length===0)||[2,8].includes(arr.at(-1)));}
for(const [a,b] of ionicPairs){const [na,nb]=ratio(a,b);assert.equal(na*a.charge+nb*b.charge,0);assert(na>=1&&nb>=1);assert.doesNotThrow(()=>parseFormula(ionicFormula(a,b)));}
for(const m of molecules){
 const total=m.atoms.reduce((n,a)=>n+valence[a.s],0);
 assert.equal((pairTotal(m)+loneTotal(m))*2,total,`${m.id} must conserve valence electrons`);
 m.atoms.forEach((a,i)=>{const bonds=m.bonds.reduce((n,b)=>n+((b[0]===i||b[1]===i)?b[2]:0),0);assert.equal((bonds+a.lone)*2,a.s==='H'?2:8,`${m.id} ${a.s} outer shell`);});
}
for(const [formula,a,na,b,nb] of molecularTasks)assert.deepEqual(parseFormula(formula),{[a]:na,[b]:nb});
assert.deepEqual(parseFormula('(NH4)2SO4'),{N:2,H:8,S:1,O:4});
assert.deepEqual(parseFormula('Ca(NO3)2'),{Ca:1,N:2,O:6});
assert.equal(massOf('H2O'),18);assert(Math.abs(massOf('Ca(NO3)2')-164.1)<1e-9);assert(Math.abs(massOf('Al(NO3)3')-213)<1e-9);
for(const chapter of Object.values(chapters)){
 assert.equal(new Set(chapter.lessons.map(l=>l.id)).size,chapter.lessons.length);
 for(const l of chapter.lessons){for(const pair of [l.title,l.lead,l.key,...l.extra])assert(pair.length===2&&pair.every(x=>typeof x==='string'&&x.length>0));assert.equal(l.quiz.length,3);for(const q of l.quiz){assert(q.choices.length===3);assert(q.answer>=0&&q.answer<q.choices.length);assert(q.why.every(Boolean));}}
}
console.log('Bonding data verified: electron conservation, full shells, neutral ratios, molecular counts, bracketed masses and 42 bilingual checkpoints.');
