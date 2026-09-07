'use client';
import {useState} from 'react';
import {useLanguage} from './i18n';
import Model from './model';
import {Tabs,TabsList,TabsTrigger} from '@/components/ui/tabs';

const groups=[
 {zh:'元素',en:'Element',ruleZh:'只有一種原子',ruleEn:'Only one type of atom',items:[
  ['He','氦','Helium','pure-He','每個粒子是一個氦原子，全部都是 He。','Each particle is one helium atom. Every atom is He.'],
  ['N₂','氮氣','Nitrogen','pure-N2','每個分子有兩個氮原子，全部都是 N，所以仍是元素。','Each molecule has two nitrogen atoms. Every atom is N, so it is an element.'],
  ['O₃','臭氧','Ozone','pure-O3','每個分子有三個氧原子，全部都是 O，所以仍是元素。','Each molecule has three oxygen atoms. Every atom is O, so it is an element.'],
  ['H₂','氫氣','Hydrogen','hydrogen','每個分子有兩個氫原子，全部都是 H。','Each molecule has two hydrogen atoms. Every atom is H.'] ]},
 {zh:'化合物',en:'Compound',ruleZh:'不同種類的原子已連在一起',ruleEn:'Different types of atoms joined together',items:[
  ['H₂O','水','Water','water','每個水分子有兩個氫原子和一個氧原子。','Each water molecule has two hydrogen atoms and one oxygen atom.'],
  ['CO₂','二氧化碳','Carbon dioxide','pure-CO2','每個二氧化碳分子有一個碳原子和兩個氧原子。','Each carbon dioxide molecule has one carbon atom and two oxygen atoms.'] ]},
 {zh:'混合物',en:'Mixture',ruleZh:'兩種或以上物質一起存在',ruleEn:'Two or more substances together',items:[
  ['H₂ + O₂','元素＋元素','Element + element','elements','氫氣和氧氣各自存在，沒有變成水。','Hydrogen and oxygen remain separate substances. They have not formed water.'],
  ['H₂O + CO₂','化合物＋化合物','Compound + compound','compounds','水和二氧化碳是兩種不同的物質。','Water and carbon dioxide are two different substances.'],
  ['H₂ + H₂O','元素＋化合物','Element + compound','both','氫氣和水一起存在，是混合物。','Hydrogen and water together form a mixture.'] ]}
];

export default function CompareExamples(){
 const {language}=useLanguage();const en=language==='en';
 const [choices,setChoices]=useState([0,0,0]);const [angle,setAngle]=useState(.15);
 return <>
  <header className="lesson-heading"><span className="eyebrow">04 / ELEMENT · COMPOUND · MIXTURE</span><h1>{en?'See how the three types of matter differ.':'看清楚，三種物質的分別。'}</h1><p>{en?'Compare the atoms and how they join.':'比較原子種類和連接方式。'}</p></header>
  <div className="compare-grid">{groups.map((group,i)=>{const item=group.items[choices[i]];return <article className={`comparison-card c${i}`} key={group.en}>
   <div className="comparison-head"><span>0{i+1}</span><h2>{en?group.en:group.zh}</h2><span className="type-tag">{i<2?(en?'Pure substance':'純物質'):(en?'Several substances':'多種物質')}</span></div>
   <div style={{gridColumn:'1 / -1',padding:'12px 14px'}}><Tabs value={String(choices[i])} onValueChange={v=>setChoices(old=>old.map((n,j)=>i===j?Number(v):n))}><TabsList className="pill-list" aria-label={en?group.en+' examples':group.zh+'例子'}>{group.items.map((option,j)=><TabsTrigger value={String(j)} key={option[0]}>{option[0]}</TabsTrigger>)}</TabsList></Tabs></div>
   <Model kind={'sample:'+item[3]} compact angle={angle} onAngleChange={setAngle} label={en?item[5]:item[4]}/>
   <div className="comparison-body"><b className="compare-formula">{item[0]}</b><h3>{en?item[2]:item[1]}</h3><p><strong>{en?group.ruleEn:group.ruleZh}</strong></p><p>{en?item[5]:item[4]}</p></div>
  </article>})}</div>
  <div className="note"><p>{en?'One atom type → element. Different atom types joined → compound.':'一種原子 → 元素；不同種類的原子連在一起 → 化合物。'}</p></div>
  <div className="table-wrap comparison-table"><table><thead><tr>{(en?['Compare','Element','Compound','Mixture']:['比較','元素','化合物','混合物']).map(t=><th key={t}>{t}</th>)}</tr></thead><tbody>{(en?[
   ['Composition','One type of atom','Different elements chemically joined','Different substances mixed together'],
   ['Properties','Properties of that element','Usually different from the original elements','Each substance keeps its own properties'],
   ['Separation','Cannot be chemically broken into simpler substances','Chemical methods, such as electrolysis','Physical methods, such as filtration or distillation']
  ]:[['組成','一種原子','不同元素已化學結合','不同物質混合'],['性質','該元素的性質','通常與原來的元素不同','各成分保留自己的性質'],['怎樣分開','不能用化學方法分成更簡單的物質','化學方法，例如電解','物理方法，例如過濾或蒸餾']]).map(row=><tr key={row[0]}>{row.map(t=><td key={t}>{t}</td>)}</tr>)}</tbody></table></div>

 </>;
}
