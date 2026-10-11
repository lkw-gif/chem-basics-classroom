import {earlyQuestions} from './questions-early.js';
import {lateQuestions} from './questions-late.js';
import {supplementQuestions} from './questions-supplement.js';
export const originalQuestions=[...earlyQuestions,...lateQuestions].map(q=>{
  const outcomes=[];
  if(q.lesson==='water')outcomes.push('a05','a06');
  if(q.lesson==='basicity')outcomes.push('a07');
  if(q.lesson==='ionic-equations'&&!q.advanced)outcomes.push('a04');
  if(q.lesson==='alkali-reactions')outcomes.push('a11','a12');
  if(q.id==='orig-p32-ammonia-weak-alkali')outcomes.push('c01','c02','c04');
  if(q.source.pdfPage===14&&/acid-exercise-(7|8|10|11|12|13)$/.test(q.id))outcomes.push('d01');
  if(['excess-solid','titration-salts'].includes(q.lesson)||q.source.pdfPage===77||q.source.pdfPage===69)outcomes.push('d04');
  return {...q,outcomes};
});
const reviewKeywords={
 concept:[['判斷與分類','Judgement and classification'],['支持理由','Supporting reasoning']],
 equation:[['原子及電荷守恆','Atom and charge conservation'],['配平及物態符號','Balancing and state symbols']],
 experiment:[['操作及原因','Procedure and purpose'],['現象及結論','Observations and conclusion']],
 calculation:[['正確算式','Correct calculation'],['單位換算','Unit conversion'],['結果及適當單位','Result and appropriate units']],
};
export const questions=[...originalQuestions,...supplementQuestions].map(q=>({...q,keywords:q.keywords||reviewKeywords[q.category]}));
export {supplementQuestions};
export const categories=[['concept','概念','Concepts'],['equation','方程式','Equations'],['experiment','實驗','Experiments'],['calculation','計算','Calculations']];
