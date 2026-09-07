'use client';
import {useState} from 'react';
import {ArrowLeftRight,ExternalLink} from 'lucide-react';
import {Switch} from '@/components/ui/switch';
import {useLanguage} from './i18n';
import elementData from './periodic-elements.json';
type ElementEntry=(typeof elementData)[number]&{infoEn?:string;useEn?:string|null};
export default function PeriodicTable(){
 const {language}=useLanguage(),en=language==='en';
 const [selected,setSelected]=useState(29),[highlight,setHighlight]=useState(true);
 const elements=elementData as ElementEntry[],element=elements.find(e=>e.atomicNumber===selected)!;
 const categories={metal:en?'Metal':'金屬',nonmetal:en?'Non-metal':'非金屬',metalloid:en?'Some metal-like properties':'有部分金屬特點'};
 return <section className="periodic-section"><div className="section-label"><div><span className="eyebrow">PERIODIC TABLE</span><h2>{en?'A map of all the elements':'元素週期表：元素的地圖'}</h2></div><span>{en?'118 elements · focus on 20':'118 個元素 · 先認識 20 個'}</span></div><p className="periodic-intro">{en?'One box, one element. Select it to explore.':'一格一種元素，點選查看。'}</p><div className="periodic-toolbar"><label><Switch checked={highlight} onCheckedChange={setHighlight} aria-label={en?'Highlight the 20 elements in the notes':'突出 notes 的 20 個常用元素'}/><span>{en?'Highlight the 20 notes elements':'突出 notes 的 20 個常用元素'}</span></label><div className="periodic-legend">{Object.entries(categories).map(([id,label])=><span key={id}><i className={id}/>{label}</span>)}</div></div><div className="periodic-scroll" tabIndex={0} role="region" aria-label={en?'Periodic table, scroll sideways on smaller screens':'元素週期表，小螢幕可左右捲動'}><div className={`periodic-grid ${highlight?'highlight-notes':''}`}>
 {Array.from({length:18},(_,i)=><span className="table-axis" key={`col${i}`} style={{gridColumn:i+2,gridRow:1}}>{i+1}</span>)}
 {Array.from({length:7},(_,i)=><span className="table-axis period-axis" key={`row${i}`} style={{gridColumn:1,gridRow:i+2}}>{i+1}</span>)}

 {elements.map(e=><button key={e.atomicNumber} aria-pressed={e.atomicNumber===selected} aria-label={`${e.atomicNumber}, ${e.symbol}, ${en?e.nameEn:e.nameZh}${e.inNotes?(en?', in your notes':'，本課常用'):''}`} className={`element-cell ${e.categoryProvisional?'research':e.category} ${e.inNotes?'in-notes':''}`} style={{gridColumn:e.column+1,gridRow:e.row>=8?e.row+2:e.row+1}} onClick={()=>setSelected(e.atomicNumber)}><span className="atomic-number">{e.atomicNumber}</span><strong>{e.symbol}</strong><span className="cell-name">{en?e.nameEn:e.nameZh}</span>{e.inNotes&&<i aria-hidden="true"/>}</button>)}
 <span className="series-placeholder" style={{gridColumn:4,gridRow:7}}>57–71<br/>↓</span><span className="series-placeholder" style={{gridColumn:4,gridRow:8}}>89–103<br/>↓</span><span className="series-label" style={{gridColumn:'1 / 4',gridRow:10}}>57–71</span><span className="series-label" style={{gridColumn:'1 / 4',gridRow:11}}>89–103</span>
 </div></div><div className="scroll-hint"><ArrowLeftRight size={15}/>{en?'Swipe to see more':'左右滑動'}</div><div className="periodic-detail" aria-live="polite"><div className={`large-element ${element.categoryProvisional?'research':element.category}`}><small>{element.atomicNumber}</small><strong>{element.symbol}</strong><span data-keep-language>{en?element.nameEn:element.nameZh}</span></div><div className="periodic-description"><div><span className="type-tag">{element.categoryProvisional?(en?'Made in laboratories · still being studied':'人工合成 · 性質仍在研究'):categories[element.category as keyof typeof categories]}</span>{element.inNotes&&<span className="notes-element-tag">{en?'In your notes':'本課常用'}</span>}</div><h3>{en?element.nameEn:element.nameZh}<small data-keep-language>{en?element.symbol:element.nameEn}</small></h3><p>{en?(element.infoEn||`${element.nameEn} has the symbol ${element.symbol} and atomic number ${element.atomicNumber}.`):element.info}</p>{element.use&&<p><b>{en?'A use: ':'生活用途：'}</b>{en?element.useEn:element.use}</p>}</div></div><p className="quiet-note">{en?'':''} <a href="https://iupac.org/what-we-do/periodic-table-of-elements/" target="_blank" rel="noreferrer">IUPAC <ExternalLink size={12}/></a></p></section>;
}

