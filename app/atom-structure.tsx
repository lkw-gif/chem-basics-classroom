'use client';
import {useState,type CSSProperties} from 'react';
import {Check,Lightbulb} from 'lucide-react';
import {useLanguage,useTranslateTree} from './i18n';

type CheckpointProps={id:string;question:string;choices:string[];answer:number;why:string;teacher:boolean};

function Checkpoint({id,question,choices,answer,why,teacher}:CheckpointProps){
 const tr=useTranslateTree();
 const [selected,setSelected]=useState<number|null>(null);
 const [revealed,setRevealed]=useState(false);
 const showAnswer=!teacher||revealed;
 return tr(<section className="atom-checkpoint" aria-labelledby={`${id}-title`}>
  <div className="atom-checkpoint-heading"><span>CHECKPOINT</span><b>小測一下</b></div>
  <h3 id={`${id}-title`}>{question}</h3>
  <fieldset className="atom-choices"><legend className="sr-only">{question}</legend>{choices.map((choice,index)=><button key={choice} type="button" className={`atom-choice${selected===index?showAnswer?index===answer?' is-correct':' is-wrong':' is-selected':''}`} aria-pressed={selected===index} onClick={()=>{setSelected(index);setRevealed(false);}}><span>{String.fromCharCode(65+index)}</span>{choice}{selected===index&&index===answer&&showAnswer&&<Check size={17}/>}</button>)}</fieldset>
  {teacher&&selected!==null&&<button className="atom-reveal" type="button" onClick={()=>setRevealed(v=>!v)}>{revealed?'隱藏答案':'顯示答案'}</button>}
  {selected!==null&&showAnswer&&<p className={`atom-feedback ${selected===answer?'correct':'retry'}`} aria-live="polite"><b>{selected===answer?'答對了！':'再想一想。'}</b> {why}</p>}
  {teacher&&selected!==null&&!revealed&&<p className="atom-teacher-hint">答案解說暫時隱藏。</p>}
 </section>);
}

const shellExamples=[
 {symbol:'H',name:'氫',en:'Hydrogen',arrangement:[1]},
 {symbol:'He',name:'氦',en:'Helium',arrangement:[2]},
 {symbol:'O',name:'氧',en:'Oxygen',arrangement:[2,6]},
 {symbol:'Na',name:'鈉',en:'Sodium',arrangement:[2,8,1]},
 {symbol:'Cl',name:'氯',en:'Chlorine',arrangement:[2,8,7]},
 {symbol:'Ca',name:'鈣',en:'Calcium',arrangement:[2,8,8,2]},
];

function ShellDiagram({symbol,arrangement}:{symbol:string;arrangement:number[]}){
 const tr=useTranslateTree();
 const center=110,radii=[27,46,65,84];
 return tr(<svg className="shell-diagram" viewBox="0 0 220 220" aria-hidden="true">
  {arrangement.map((count,shell)=>{const radius=radii[shell];return <g key={shell}><circle cx={center} cy={center} r={radius} className="shell-ring"/>{Array.from({length:count},(_,index)=>{const angle=(-Math.PI/2)+(2*Math.PI*index/count);const x=center+Math.cos(angle)*radius;const y=center+Math.sin(angle)*radius;return <g key={`${shell}-${index}`}><circle cx={x} cy={y} r="7" className="electron-dot"/><text x={x} y={y+3} className="electron-mark">−</text></g>})}</g>})}
  <circle cx={center} cy={center} r="19" className="nucleus-dot"/><text x={center} y={center+4} className="nucleus-mark">{symbol}</text>
 </svg>);
}

export function AtomStructure({teacher}:{teacher:boolean}){
 const tr=useTranslateTree();
 const {language}=useLanguage();
 const [shellSymbol,setShellSymbol]=useState('Na');
 const selectedShell=shellExamples.find(item=>item.symbol===shellSymbol)!;
 return tr(<>
  <header className="lesson-heading"><span className="eyebrow">UNIT 02 / ATOMIC STRUCTURE <span className="notes-ref">NOTES 2.1–2.8</span></span><h1>原子結構</h1><p>由原子內的粒子，認識原子序、同位素和電子排列。</p></header>

  <section className="atom-topic" aria-labelledby="atom-particles-title">
   <div className="atom-topic-title"><span>01</span><div><h2 id="atom-particles-title">原子由甚麼組成？</h2><p>原子的中心是原子核。原子核內有質子和中子；電子在原子核外。</p></div></div>
   <div className="particle-layout"><div className="particle-visual"><svg viewBox="0 0 360 240" aria-hidden="true"><circle cx="180" cy="120" r="87" className="atom-outline"/><circle cx="180" cy="120" r="47" className="atom-nucleus"/><circle cx="162" cy="105" r="15" className="particle-proton"/><circle cx="194" cy="104" r="15" className="particle-neutron"/><circle cx="165" cy="137" r="15" className="particle-neutron"/><circle cx="198" cy="136" r="15" className="particle-proton"/><text x="162" y="110" className="particle-letter">p⁺</text><text x="194" y="109" className="particle-letter">n⁰</text><text x="165" y="142" className="particle-letter">n⁰</text><text x="198" y="141" className="particle-letter">p⁺</text><circle cx="180" cy="32" r="12" className="particle-electron"/><text x="180" y="37" className="particle-letter">e⁻</text><circle cx="267" cy="120" r="12" className="particle-electron"/><text x="267" y="125" className="particle-letter">e⁻</text></svg><p>原子示意圖｜並非按真實大小繪畫</p></div><div className="particle-facts">{[['質子','Proton','p⁺','+1','約 1','原子核內'],['中子','Neutron','n⁰','0','約 1','原子核內'],['電子','Electron','e⁻','−1','非常輕','原子核外']].map(([zh,en,symbol,charge,mass,place])=><article key={symbol}><b className={`particle-symbol ${symbol==='e⁻'?'electron':''}`}>{symbol}</b><div><h3>{language==='en'?en:zh}{language==='zh'&&<small>{en}</small>}</h3><p>電荷 {charge}　相對質量 {mass}</p><small>{place}</small></div></article>)}</div></div>
   <p className="atom-key-idea"><Lightbulb size={18}/>中性原子內，質子數目等於電子數目。</p>
   <Checkpoint id="atom-check-1" teacher={teacher} question="一個中性原子內，哪兩種粒子的數目相同？" choices={['質子和電子','質子和中子','中子和電子']} answer={0} why="質子帶正電，電子帶負電；數目相同時，正負電荷互相抵銷。"/>
  </section>

  <section className="atom-topic" aria-labelledby="atom-number-title">
   <div className="atom-topic-title"><span>02</span><div><h2 id="atom-number-title">原子序和質量數</h2><p>兩個數字就能告訴我們原子裏有多少粒子。</p></div></div>
   <div className="number-layout"><div className="isotope-notation" aria-label="鈉二十三：質量數二十三，原子序十一"><span className="notation-left"><sup>23</sup><sub>11</sub></span><b>Na</b></div><div className="number-definitions"><p><b>原子序 11</b>＝質子數目</p><p><b>質量數 23</b>＝質子數目＋中子數目</p><p>中性鈉原子有 11 粒電子。</p></div></div>
   <p className="atom-key-idea"><Lightbulb size={18}/>中子數目 ＝ 質量數 − 原子序。</p>
   <Checkpoint id="atom-check-2" teacher={teacher} question="鈉原子的質量數是 23，原子序是 11。它有多少粒中子？" choices={['11','12','23']} answer={1} why="中子數目＝23 − 11＝12。原子序給出質子數，質量數是質子和中子的總數。"/>
  </section>

  <section className="atom-topic" aria-labelledby="isotopes-title">
   <div className="atom-topic-title"><span>03</span><div><h2 id="isotopes-title">甚麼是同位素？</h2><p>同一種元素的原子，質子數相同，中子數可以不同。</p></div></div>
   <div className="isotope-pair">{[{mass:'35',protons:17,neutrons:18,label:'氯-35',en:'Chlorine-35'},{mass:'37',protons:17,neutrons:20,label:'氯-37',en:'Chlorine-37'}].map(item=><article key={item.mass} className="isotope-card"><div className="isotope-notation"><span className="notation-left"><sup>{item.mass}</sup><sub>17</sub></span><b>Cl</b></div><h3>{language==='en'?item.en:item.label}{language==='zh'&&<small>{item.en}</small>}</h3><p>{language==='en'?'Protons':'質子'} <b>{item.protons}</b><span>{language==='en'?'Neutrons':'中子'}</span><b>{item.neutrons}</b></p></article>)}</div>
   <p className="atom-key-idea"><Lightbulb size={18}/>氯-35 和氯-37 都有 17 粒質子，因此都是氯；它們的中子數不同。</p>
   <Checkpoint id="atom-check-3" teacher={teacher} question="氯-35 和氯-37 為甚麼是同位素？" choices={['質子數相同，中子數不同','質子數不同，中子數相同','質子和中子數都相同']} answer={0} why="同位素屬於同一種元素，所以質子數相同；質量數不同，表示中子數不同。"/>
  </section>

  <section className="atom-topic" aria-labelledby="relative-mass-title">
   <div className="atom-topic-title"><span>04</span><div><h2 id="relative-mass-title">相對原子質量怎樣計算？</h2><p>天然元素可含有不同同位素；較常見的同位素，對平均值影響較大。</p></div></div>
   <div className="abundance-example"><div className="abundance-bars"><div><span>氯-35 <b>75%</b></span><i style={{'--abundance':'75%'} as CSSProperties}/></div><div><span>氯-37 <b>25%</b></span><i style={{'--abundance':'25%'} as CSSProperties}/></div></div><div className="average-work"><span>加權平均</span><b>(35 × 75 + 37 × 25) ÷ 100</b><strong>= 35.5</strong></div></div>
   <p className="atom-key-idea"><Lightbulb size={18}/>兩種同位素的比例是 75：25，所以平均值更接近 35。</p>
   <Checkpoint id="atom-check-4" teacher={teacher} question="氯-35 佔 75%，氯-37 佔 25%。相對原子質量約是多少？" choices={['35','35.5','37']} answer={1} why="(35 × 75 + 37 × 25) ÷ 100＝35.5。先乘上各自的比例，再求平均。"/>
  </section>

  <section className="atom-topic" aria-labelledby="electron-arrangement-title">
   <div className="atom-topic-title"><span>05</span><div><h2 id="electron-arrangement-title">電子怎樣排列？</h2><p>在簡化模型中，電子按由內至外的電子層排列。</p></div></div>
   <div className="shell-layout"><fieldset className="shell-controls"><legend className="sr-only">選擇原子例子</legend>{shellExamples.map(item=><button type="button" key={item.symbol} aria-pressed={shellSymbol===item.symbol} onClick={()=>setShellSymbol(item.symbol)}>{item.symbol}</button>)}</fieldset><div className="shell-result"><ShellDiagram symbol={selectedShell.symbol} arrangement={selectedShell.arrangement}/><div><h3>{language==='en'?selectedShell.en:selectedShell.name}{language==='zh'&&<small>{selectedShell.en}</small>}</h3><p className="shell-arrangement">{selectedShell.arrangement.join(language==='en'?', ':'、')}</p><p>電子排列：每層的數字代表該層的電子數目。</p></div></div></div>
   <div className="shell-notes"><p>第一層最多 2 粒，第二層最多 8 粒。</p><p>以首 20 種元素作簡化排列時，第三層最多先放 8 粒，再開始第四層。</p><p>氦的第一層有 2 粒電子；很多其他元素的最外層有 8 粒電子。</p></div>
   <Checkpoint id="atom-check-5" teacher={teacher} question="氯原子的電子排列是哪一個？" choices={['2、8、7','2、7、8','2、8、8']} answer={0} why="氯的原子序是 17，所以有 17 粒電子：第一層 2 粒、第二層 8 粒、第三層 7 粒。"/>
  </section>
  <p className="quiet-note">電子層圖是幫助理解的簡化模型，並非電子實際移動的路徑。</p>
 </>);
}
