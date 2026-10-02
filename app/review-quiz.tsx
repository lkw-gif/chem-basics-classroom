'use client';

import {useState} from 'react';
import {RotateCcw, Sparkles} from 'lucide-react';
import {RadioGroup,RadioGroupItem} from '@/components/ui/radio-group';
import {questions,type ReviewQuestion} from './content';
import {translateText,useLanguage} from './i18n';
import Model from './model';
import './review-quiz.css';

type GroupId='core'|NonNullable<ReviewQuestion['group']>;
const groups:{id:GroupId;zh:string;en:string}[]=[
  {id:'core',zh:'基礎概念',en:'Core ideas'},
  {id:'model',zh:'看 3D 模型分類',en:'Classify the 3D models'},
  {id:'matter',zh:'元素、化合物與混合物的性質',en:'Properties of elements, compounds and mixtures'},
  {id:'property',zh:'物理性質還是化學性質？',en:'Physical or chemical property?'}
];

export default function ReviewQuiz({teacher}:{teacher:boolean}){
  const {language}=useLanguage();
  const en=language==='en';
  const [answers,setAnswers]=useState<Record<number,number>>({});
  const [reveal,setReveal]=useState(false);
  const [wrongOnly,setWrongOnly]=useState(false);
  const total=questions.length;
  const answered=Object.keys(answers).length;
  const correct=questions.filter((question,index)=>answers[index]===question.answer).length;
  const showFeedback=!teacher||reveal;
  const visible=questions.map((question,index)=>({question,index})).filter(({question,index})=>!wrongOnly||answers[index]!==question.answer);

  return <div className="review-page" data-keep-language>
    <header className="lesson-heading"><span className="eyebrow">07 / REVIEW <span className="notes-ref">NOTES {en?'All lessons':'全課'}</span></span><h1>{en?'Review':'重點溫習'}</h1><p>{en?`Use the 3D models and examples to answer ${total} questions.`:`看 3D 模型和例子，試答 ${total} 條題目。`}</p></header>
    <div className="section-label review-progress"><h2>{en?`Try it · ${total} questions`:`試試看 · ${total} 條題目`}</h2><span aria-live="polite">{answered} / {total} {en?'answered':'已作答'}{showFeedback&&answered===total?` · ${correct} ${en?'correct':'題正確'}`:''}</span></div>
    {groups.map(group=>{
      const items=visible.filter(({question})=>(question.group??'core')===group.id);
      if(!items.length)return null;
      return <section className="review-question-group" key={group.id} aria-label={en?group.en:group.zh}>
        <div className="section-label"><h2>{en?group.en:group.zh}</h2><span>{items.length} {en?'questions':'題'}</span></div>
        {group.id==='model'&&<p className="review-group-intro">{en?'Rotate each model and look at which atoms are joined before you answer.':'先旋轉模型，看看哪些原子連在一起，再作答。'}</p>}
        <div className="quiz-list">{items.map(({question,index})=><article className="question card" key={index}>
          <h3><span>{String(index+1).padStart(2,'0')}</span>{translateText(question.q,language)}</h3>
          {question.model&&<div className="intro-model review-model"><div className="model-heading"><span>{en?'PARTICLE MODEL':'粒子模型'}</span><span>{question.modelFormula}</span></div><Model kind={question.model} compact label={en?`Particle model showing ${question.modelFormula}`:`顯示 ${question.modelFormula} 的粒子模型`}/></div>}
          <RadioGroup className="answer-options" aria-label={translateText(question.q,language)} value={answers[index]===undefined?null:String(answers[index])} onValueChange={value=>setAnswers(current=>({...current,[index]:Number(value)}))}>
            {question.choices.map((choice,choiceIndex)=><label key={choice} className={answers[index]===choiceIndex?'option-label chosen':'option-label'}><RadioGroupItem value={String(choiceIndex)} aria-label={translateText(choice,language)}/><span>{String.fromCharCode(65+choiceIndex)}. {translateText(choice,language)}</span></label>)}
          </RadioGroup>
          {answers[index]!==undefined&&showFeedback&&<div aria-live="polite" className={`answer-feedback ${answers[index]===question.answer?'correct':'try-again'}`}><b>{answers[index]===question.answer?(en?'Correct.':'答對了。'):(en?'Think again.':'再想一想。')}</b> {translateText(question.why,language)}</div>}
        </article>)}</div>
      </section>;
    })}
    <div className="quiz-actions">{teacher&&<button className="primary-btn" onClick={()=>setReveal(!reveal)}>{reveal?(en?'Hide explanations':'隱藏解說'):(en?'Show explanations':'顯示解說')}</button>}<button className="text-btn" onClick={()=>{setAnswers({});setWrongOnly(false);setReveal(false);}}>{en?'Try again':'重新作答'} <RotateCcw size={16}/></button>{answered===total&&correct<total&&showFeedback&&<button className="text-btn" onClick={()=>setWrongOnly(!wrongOnly)}>{wrongOnly?(en?'Show all questions':'顯示全部題目'):(en?'Show questions to practise again':'只看需要再練習的題目')}</button>}</div>
    {answered===total&&correct===total&&showFeedback&&<div className="note"><Sparkles size={20}/><p>{en?'All correct! Can you explain why N₂ is an element, H₂O is a compound, and H₂ mixed with O₂ is a mixture?':'全部答對！你能解釋為甚麼 N₂ 是元素、H₂O 是化合物，而 H₂ 與 O₂ 放在一起是混合物嗎？'}</p></div>}
  </div>;
}
