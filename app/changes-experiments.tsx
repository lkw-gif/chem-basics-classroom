'use client';

import {useState} from 'react';
import {ArrowRight, FlaskConical, Lightbulb, RotateCcw, ShieldCheck} from 'lucide-react';
import {useLanguage} from './i18n';
import Model from './model';
import './changes-experiments.css';

const tests = [
  {id:'oxygen', formula:'O₂', zh:'氧氣', en:'Oxygen', methodZh:'把帶餘燼的木條放入氣體。', methodEn:'Place a glowing splint in the gas.', resultZh:'木條復燃。', resultEn:'The splint relights.'},
  {id:'hydrogen', formula:'H₂', zh:'氫氣', en:'Hydrogen', methodZh:'把燃着的木條靠近少量氣體的試管口。', methodEn:'Hold a lighted splint near the mouth of a test tube containing a small amount of gas.', resultZh:'聽到「pop」聲。', resultEn:'A squeaky “pop” is heard.'},
  {id:'co2', formula:'CO₂', zh:'二氧化碳', en:'Carbon dioxide', methodZh:'把氣體通入石灰水。', methodEn:'Bubble the gas through limewater.', resultZh:'石灰水變乳白色。', resultEn:'The limewater turns milky.'},
  {id:'waterpaper', formula:'H₂O', zh:'水：試紙', en:'Water: test paper', methodZh:'讓樣本接觸乾燥的藍色氯化鈷(II)試紙。', methodEn:'Touch the sample with dry blue cobalt(II) chloride paper.', resultZh:'試紙由藍色變成粉紅色。', resultEn:'The paper turns from blue to pink.'},
  {id:'watersolid', formula:'H₂O', zh:'水：固體', en:'Water: solid test', methodZh:'讓樣本接觸白色無水硫酸銅(II)。', methodEn:'Touch the sample with white anhydrous copper(II) sulphate.', resultZh:'固體由白色變成藍色。', resultEn:'The solid turns from white to blue.'},
] as const;

export default function ChangesExperiments(){
  const {language}=useLanguage();
  const en=language==='en';
  const [reaction,setReaction]=useState(false);
  const [iron,setIron]=useState(false);

  return <div className="changes-experiments" data-keep-language>
    <div className="section-label"><h2>{en?'See chemical changes in 3D':'用 3D 模型觀察化學變化'}</h2></div>
    <div className="safety-banner"><ShieldCheck size={23}/><p>{en?'These are classroom models. Your teacher must supervise heating, gases and chemical tests; do not try them at home.':'以下是課堂模型。加熱、氣體和化學品測試須由老師指導，不要在家自行嘗試。'}</p></div>

    <section className="experiment">
      <div className="section-label"><h2><span className="step-number">1</span> {en?'Can water be decomposed?':'水可以分解嗎？'}</h2><span>{en?'Electrolysis of water':'電解水'}</span></div>
      <p>{en?'Passing electricity through water causes a chemical change, forming hydrogen and oxygen. A little dilute sulphuric acid helps the liquid conduct electricity.':'通電可使水發生化學變化，形成氫氣和氧氣。加入少量稀硫酸，可讓液體較容易導電。'}</p>
      <div className="experiment-stage">
        <div className="intro-model"><div className="model-heading"><span>{reaction?(en?'After electrolysis':'通電後'):(en?'Before electrolysis':'通電前')}</span><span>{reaction?'H₂ + O₂':'H₂O'}</span></div><Model kind={reaction?'sample:reaction-gases':'sample:reaction-water'} label={reaction?(en?'Two hydrogen molecules and one oxygen molecule':'兩個氫分子和一個氧分子'):(en?'Two water molecules':'兩個水分子')}/></div>
        <article><span className="eyebrow">{reaction?(en?'OBSERVATION':'觀察結果'):(en?'PREDICT':'先想一想')}</span><h2>{reaction?(en?'New substances have formed.':'形成了新物質。'):(en?'What will water become?':'水會變成甚麼？')}</h2><p>{reaction?(en?'Atoms in water molecules rearrange into H₂ and O₂. No atoms disappear.':'水分子中的原子重新組合成 H₂ 和 O₂；沒有原子消失。'):(en?'The model starts with two water molecules. Select the button to see how their atoms rearrange.':'模型開始時有兩個水分子。按下按鈕，看看通電後原子如何重新組合。')}</p><button className="primary-btn" onClick={()=>setReaction(!reaction)}>{reaction?<RotateCcw size={17}/>:<FlaskConical size={17}/>} {reaction?(en?'See before':'回到通電前'):(en?'See after electrolysis':'觀察通電後')}</button>{reaction&&<div className="reaction-result"><b>{en?'Water → hydrogen + oxygen':'水 → 氫氣 ＋ 氧氣'}</b><p>{en?'At the same temperature and pressure, the gas volumes are about 2:1.':'在相同溫度和壓力下，兩種氣體的體積約為 2:1。'}</p><div className="volume-bars"><span>{en?'Hydrogen':'氫氣'}</span><i style={{width:'100%'}}/><b>2</b><span>{en?'Oxygen':'氧氣'}</span><i style={{width:'50%'}}/><b>1</b></div></div>}</article>
      </div>
      <div className="note"><Lightbulb size={20}/><p>{en?'Water is a compound: chemical methods can split it into simpler substances. Boiling water is different because the molecules remain H₂O.':'水是化合物，可用化學方法分解成更簡單的物質。水沸騰則不同：水分子仍然是 H₂O。'}</p></div>
    </section>

    <section className="experiment">
      <div className="section-label"><h2><span className="step-number">2</span> {en?'Iron and sulphur: mixture or reaction?':'鐵和硫：混合，還是反應？'}</h2><span>Fe + S → FeS</span></div>
      <div className="experiment-stage">
        <div className="intro-model"><div className="model-heading"><span>{iron?(en?'After reaction: iron sulphide':'反應後：硫化鐵'):(en?'Before reaction: iron and sulphur':'反應前：鐵與硫混合')}</span><span>{iron?'FeS':'Fe + S'}</span></div><Model kind={iron?'sample:sulphide':'sample:ironsulfur'} label={iron?(en?'Iron sulphide: iron and sulphur chemically combined':'硫化鐵：鐵和硫已化學結合'):(en?'A mixture of iron and sulphur':'鐵與硫的混合物')}/><div className="legend"><span>Fe · {en?'iron':'鐵'}</span><span>S · {en?'sulphur':'硫'}</span></div></div>
        <article><span className="type-tag">{iron?(en?'COMPOUND':'化合物'):(en?'MIXTURE':'混合物')}</span><h2>{iron?(en?'A new substance forms.':'形成一種新物質。'):(en?'The substances remain separate.':'鐵和硫仍各自存在。')}</h2><p>{iron?(en?'Heating them together produces black iron sulphide. Its properties differ from iron and sulphur; a magnet can no longer separate the iron.':'加熱使兩者反應，形成黑色硫化鐵。它的性質與鐵、硫不同，不能再用磁鐵把鐵分出來。'):(en?'Iron is grey and sulphur is yellow. After mixing, each keeps its properties and a magnet can remove the iron.':'鐵呈灰色，硫呈黃色。混合後仍保留各自性質，可用磁鐵把鐵吸出來。')}</p><button className="primary-btn" onClick={()=>setIron(!iron)}>{iron?(en?'Compare before reaction':'比較反應前'):(en?'See after heating':'觀察加熱反應後')} <ArrowRight size={17}/></button></article>
      </div><p className="quiet-note">{en?'The 3D model simplifies the structure of iron and sulphur.':'3D 模型簡化顯示鐵與硫的組成。'}</p>
    </section>

    <section className="experiment">
      <div className="section-label"><h2>{en?'Simple tests for gases and water':'幾種氣體和水的簡單測試'}</h2><span>{en?'Method → observation':'方法 → 觀察'}</span></div>
      <div className="substance-test-grid">{tests.map(test=><article className="card substance-test" key={test.id}><span className="test-formula">{test.formula}</span><h3>{en?test.en:test.zh}</h3><p><b>{en?'Test: ':'方法：'}</b>{en?test.methodEn:test.methodZh}</p><p className="test-result"><b>{en?'Result: ':'結果：'}</b>{en?test.resultEn:test.resultZh}</p></article>)}</div>
      <p className="quiet-note">{en?'Nitrogen has no simple characteristic test in this course. A negative result in the other tests does not prove a gas is nitrogen.':'本課沒有測試氮氣的簡單特徵方法。其他測試沒有反應，並不能證明氣體是氮氣。'}</p>
    </section>
  </div>;
}
