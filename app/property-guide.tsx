'use client';
import {useState} from 'react';
import {Palette,Wind,Diamond,Thermometer,Zap,Flame,Scale,StretchHorizontal,Layers,Droplets,Box} from 'lucide-react';
import {useLanguage} from './i18n';
import './property-guide.css';

const properties=[
 {icon:Palette,zh:'顏色',en:'Colour',meaning:['物質看起來的顏色。','The colour a substance appears.']},
 {icon:Box,zh:'狀態',en:'State',meaning:['在指定溫度下，是固體、液體還是氣體。','Whether a substance is solid, liquid or gas at a given temperature.']},
 {icon:Wind,zh:'氣味',en:'Smell',meaning:['物質有沒有氣味，以及氣味怎樣。','Whether a substance has a smell, and what it smells like.']},
 {icon:Diamond,zh:'硬度',en:'Hardness',meaning:['表面是否容易被刮花。','How difficult it is to scratch a surface.']},
 {icon:Thermometer,zh:'熔點',en:'Melting point',meaning:['固體熔化成液體的溫度。','The temperature at which a solid melts.']},
 {icon:Thermometer,zh:'沸點',en:'Boiling point',meaning:['液體沸騰的溫度。','The temperature at which a liquid boils.']},
 {icon:Droplets,zh:'溶解度',en:'Solubility',meaning:['在指定溫度和水量下，最多能溶解多少物質。','How much of a substance can dissolve in a given amount of water at a given temperature.']},
 {icon:Zap,zh:'導電性',en:'Electrical conductivity',meaning:['是否容易讓電流通過。','How easily electric current passes through it.']},
 {icon:Flame,zh:'導熱性',en:'Thermal conductivity',meaning:['是否容易傳熱。','How easily heat passes through it.']},
 {icon:Scale,zh:'密度',en:'Density',meaning:['相同體積下，物質的質量有多大。','How much mass a substance has in a given volume.']},
 {icon:Layers,zh:'展性',en:'Malleability',meaning:['能否壓成薄片而不碎裂。','Whether it can be pressed into sheets without breaking.']},
 {icon:StretchHorizontal,zh:'延性',en:'Ductility',meaning:['能否拉成細線而不斷裂。','Whether it can be drawn into wire without breaking.']},
];

function Reaction({magnesium=false}:{magnesium?:boolean}){
 const {language}=useLanguage(),en=language==='en';const [after,setAfter]=useState(false);
 const atom=(x:number,y:number,s:string,key:string)=> <g key={key}><circle cx={x} cy={y} r={20} fill={s==='O'?'#d94d60':s==='Mg'?'#6283ab':'#364b60'} stroke="white" strokeWidth="2"/><text x={x} y={y+6} textAnchor="middle" fill="white" fontSize="17" fontWeight="bold">{s}</text></g>;
 return <article className="reaction-card"><h3>{magnesium?(en?'Magnesium burns in oxygen':'鎂在氧氣中燃燒'):(en?'Carbon burns in oxygen':'碳在氧氣中燃燒')}</h3><p>{magnesium?(en?'Magnesium can react with oxygen to form white magnesium oxide.':'鎂能與氧氣反應，形成白色氧化鎂。'):(en?'Carbon can react with enough oxygen to form carbon dioxide.':'碳能與足夠氧氣反應，形成二氧化碳。')}</p>
 <div className="reaction-picture" aria-live="polite"><b>{after?(en?'After heating':'加熱後'):(en?'Before heating':'加熱前')}</b><svg viewBox="0 0 360 160" role="img" aria-label={magnesium?(after?'MgO: magnesium and oxygen in a repeating solid structure':'2 magnesium atoms and 1 oxygen molecule'):(after?'1 carbon dioxide molecule':'1 carbon atom and 1 oxygen molecule')}>
 {magnesium?(after?<><path d="M130 45 H230 V115 H130 Z" fill="none" stroke="#8ba1b3" strokeWidth="8"/>{[0,1].map(row=>[0,1].map(col=>atom(130+col*100,45+row*70,(row+col)%2?'O':'Mg',`${row}${col}`)))}</>:<>{atom(60,55,'Mg','m1')}{atom(60,110,'Mg','m2')}<text x="130" y="90" fontSize="28">+</text><path d="M220 80 H265" stroke="#8ba1b3" strokeWidth="8"/>{atom(220,80,'O','o1')}{atom(265,80,'O','o2')}</>):after?<><path d="M130 80 H230" stroke="#8ba1b3" strokeWidth="8"/>{atom(130,80,'O','o1')}{atom(180,80,'C','c')}{atom(230,80,'O','o2')}</>:<>{atom(75,80,'C','c')}<text x="130" y="90" fontSize="28">+</text><path d="M220 80 H265" stroke="#8ba1b3" strokeWidth="8"/>{atom(220,80,'O','o1')}{atom(265,80,'O','o2')}</>}
 </svg>{magnesium&&after&&<strong className="type-tag">{en?'New substance formed':'已形成新物質'}</strong>}<span>{magnesium?(after?(en?'Magnesium oxide · white solid':'氧化鎂 · 白色固體'):(en?'Magnesium + oxygen':'鎂＋氧氣')):after?(en?'Carbon dioxide · colourless gas':'二氧化碳 · 無色氣體'):(en?'Carbon + oxygen':'碳＋氧氣')}</span></div>
 <button className="primary-btn" onClick={()=>setAfter(!after)}>{after?(en?'See before heating':'看加熱前'):(en?'See after heating':'看加熱後')}</button>
 <p className="reaction-equation">{magnesium?'2Mg + O₂ → 2MgO':'C + O₂ → CO₂'}</p><small>{magnesium?(en?'Lines show that magnesium and oxygen have chemically combined. This is part of a solid structure, not separate MgO molecules.':'連線表示鎂和氧已化學結合。圖中是固體結構的一部分，並非獨立的 MgO 分子。'):(en?'One carbon atom and two oxygen atoms form one CO₂ molecule.':'一個碳原子和兩個氧原子組成一個 CO₂ 分子。')}</small></article>;
}
export default function PropertyGuide(){const {language}=useLanguage(),en=language==='en';return <section className="property-guide" data-keep-language><div className="section-label"><h2>{en?'Physical properties':'物理性質'}</h2></div><p>{en?'Observe or measure a property without forming a new substance.':'觀察或量度這些性質，不需要形成新物質。'}</p><div className="property-cards">{properties.map(p=><article className="card" key={p.en}><p.icon size={30} aria-hidden="true"/><h3>{en?p.en:p.zh}</h3><p>{p.meaning[en?1:0]}</p></article>)}</div><div className="section-label"><h2>{en?'Chemical properties':'化學性質'}</h2></div><p>{en?'A chemical property describes how a substance can react to form a new substance. Burning is one example.':'化學性質描述物質能怎樣反應，形成新物質。燃燒就是一個例子。'}</p><div className="reaction-grid"><Reaction magnesium/><Reaction/></div><p className="quiet-note">{en?'Colours identify the atoms in these simplified diagrams. Heating demonstrations are performed by the teacher.':'圖中顏色用來識別原子。加熱示範由老師進行。'}</p></section>}
