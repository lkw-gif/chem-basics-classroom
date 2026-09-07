'use client';
import {useTranslateTree,I18nProvider,useLanguage} from './i18n';
import {useState,useEffect} from 'react';
import {Atom,ArrowRight,ArrowLeft,BookOpen,Check,FlaskConical,GraduationCap,Layers3,Lightbulb,Menu,Sparkles,X} from 'lucide-react';
import {Tabs,TabsContent,TabsList,TabsTrigger} from '@/components/ui/tabs';
import {Switch} from '@/components/ui/switch';
import Model from './model';
import BuildingBlocks from './building-blocks';
import {chapters} from './content';
import {Elements,Classification,Changes,Laboratory,Review,Credits} from './lessons';
import Comparison from './compare-examples';
import {FormulaGallery} from './formula-gallery';
const icons=[Sparkles,Atom,FlaskConical,Layers3,Layers3,Lightbulb,FlaskConical,BookOpen];
export function Classroom(){
 const tr=useTranslateTree();

 const [chapter,setChapter]=useState('start'),[teacher,setTeacher]=useState(false),[menu,setMenu]=useState(false),[visited,setVisited]=useState<string[]>(['start']);
 const {language,setLanguage}=useLanguage();
 useEffect(()=>{const read=()=>{const id=location.hash.slice(1);if(chapters.some(c=>c[0]===id)){setChapter(id);setVisited(v=>v.includes(id)?v:[...v,id]);}};read();window.addEventListener('hashchange',read);return()=>window.removeEventListener('hashchange',read);},[]);
 useEffect(()=>{if(!menu)return;const close=(e:KeyboardEvent)=>{if(e.key==='Escape')setMenu(false);};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[menu]);
 const index=chapters.findIndex(c=>c[0]===chapter);
 function go(id:string){setChapter(id);setMenu(false);history.replaceState(null,'',`${location.pathname}${location.search}#${id}`);setVisited(v=>v.includes(id)?v:[...v,id]);window.scrollTo({top:0,behavior:'instant'});}
 return tr(<div className={`app lang-${language} ${teacher?'teacher':''}`}><a className="skip-link" href="#lesson-main">跳到課堂內容</a><header className="topbar"><button className="mobile-menu icon-btn" onClick={()=>setMenu(!menu)} aria-label={menu?'關閉課程目錄':'開啟課程目錄'} aria-expanded={menu}>{menu?<X/>:<Menu/>}</button><button className="brand" onClick={()=>go('start')}><span className="brand-icon"><Atom/></span><b>CHEM <span>初探</span></b></button><span className="course-label">S3 · INTRODUCING CHEMISTRY</span><div className="header-controls"><div className="language-switch" role="group" aria-label="Language / 語言" data-keep-language><button aria-pressed={language==='zh'} onClick={()=>setLanguage('zh')}>繁中</button><button aria-pressed={language==='en'} onClick={()=>setLanguage('en')}>EN</button></div><label className="teacher-toggle"><GraduationCap size={18}/><span>教學模式</span><Switch checked={teacher} onCheckedChange={setTeacher} aria-label="教學模式：放大文字並隱藏練習答案"/></label></div></header>{menu&&<button className="nav-backdrop" aria-label={language==='en'?'Close lesson menu':'關閉課程目錄'} onClick={()=>setMenu(false)}/> }
 <Tabs value={chapter} onValueChange={v=>go(String(v))} orientation="vertical" className="course-shell"><aside className={`course-nav ${menu?'nav-open':''}`}><div className="nav-heading">UNIT 01 <span>基礎化學</span></div><TabsList className="chapter-list" aria-label="課程單元">{chapters.map(([id,zh,en],i)=>{const Icon=icons[i];return <TabsTrigger key={id} value={id} className="chapter-item"><span className="chapter-icon"><Icon size={19}/></span><span><b>{zh}</b><small>{en}</small></span>{visited.includes(id)&&id!==chapter?<Check size={13} className="visited"/>:<span className="chapter-num">{String(i).padStart(2,'0')}</span>}</TabsTrigger>})}</TabsList><div className="nav-note"><BookOpen size={19}/><p>由實物到小粒子<br/><b>一步一步，睇明化學。</b></p></div><div className="progress-note">已瀏覽 {visited.length} / {chapters.length} 個單元<div className="reading-progress"><span style={{width:`${visited.length/chapters.length*100}%`}}/></div></div></aside>
 <main tabIndex={-1} id="lesson-main" className="lesson-main"><div className="breadcrumb"><span>中三化學</span><span>/</span><b>{chapters[index][1]}</b><span className="unit-count">{String(index).padStart(2,'0')} / 07</span></div>
 <TabsContent value="start"><section className="intro"><div><span className="eyebrow">小粒子，大世界</span><h1>由一滴水，<br/>認識<span>化學。</span></h1><p className="lead">水、空氣、身邊的金屬……<br/>一起放大來看，認識組成物質的小粒子。</p><div className="note"><Sparkles size={20}/><p>化學幫助我們了解：物質由甚麼組成、有甚麼特點，以及怎樣改變。</p></div><button className="primary-btn" onClick={()=>go('elements')}>先認識身邊的元素 <ArrowRight size={18}/></button></div><div className="intro-model"><div className="model-heading"><span>放大看 · 一個水分子</span><span>H₂O</span></div><Model kind="H2O" label="一個水分子：兩個氫原子連着一個氧原子"/><div className="model-caption"><span className="mini-atom hydrogen">H</span> 2 個氫原子 <span className="plus">＋</span><span className="mini-atom oxygen">O</span> 1 個氧原子</div></div></section>
 <BuildingBlocks/><div className="section-label"><h2>先認識三個簡單概念</h2><span>不用背，先看懂。</span></div><section className="three-grid concept-grid">{[['01 / ATOM','原子','組成物質的極細小粒子。模型中，一個小球代表一個原子。','H'],['02 / MOLECULE','分子','有些原子會連在一起，形成一組，叫作分子。水就是一個例子。','H2O'],['03 / MATTER','物質','有質量、佔有空間的東西。水、鐵，甚至看不到的空氣，都是物質。','sample:water']].map(([en,zh,txt,k])=><article className="card concept" key={zh}><span className="eyebrow">{en}</span><h2>{zh}</h2><p>{txt}</p><Model kind={k} compact label={`${zh}的例子`}/></article>)}</section></TabsContent>
 <TabsContent value="elements"><Elements/></TabsContent><TabsContent value="formula"><FormulaGallery key={teacher?'teacher':'student'} teacher={teacher}/></TabsContent><TabsContent value="classify"><Classification teacher={teacher}/></TabsContent><TabsContent value="compare"><Comparison/></TabsContent><TabsContent value="changes"><Changes/></TabsContent><TabsContent value="lab"><Laboratory/></TabsContent><TabsContent value="review"><Review teacher={teacher}/></TabsContent>
 <footer className="lesson-footer"><button className="text-btn" onClick={()=>go(chapters[Math.max(index-1,0)][0])} disabled={index===0}><ArrowLeft size={17}/> 上一單元</button>{index<chapters.length-1?<button className="primary-btn" onClick={()=>go(chapters[index+1][0])}>下一步：{chapters[index+1][1]} <ArrowRight size={17}/></button>:<button className="primary-btn" onClick={()=>go('start')}>返回課程開始 <ArrowRight size={17}/></button>}</footer><Credits/></main></Tabs></div>)
}

export default function Home(){return <I18nProvider><Classroom/></I18nProvider>}
