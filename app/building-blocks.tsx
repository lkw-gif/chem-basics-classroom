'use client';
import {Lightbulb} from 'lucide-react';
import {useLanguage} from './i18n';
import Model from './model';
export default function BuildingBlocks(){
 const {language}=useLanguage(),en=language==='en';
 const examples=[{kind:'Cu',name:en?'Pure copper':'純銅',parts:en?'Copper atoms only':'只有銅原子',symbols:'Cu'},{kind:'H2O',name:en?'Water':'水',parts:en?'Hydrogen and oxygen atoms':'氫原子和氧原子',symbols:'H + O'},{kind:'CO2',name:en?'Carbon dioxide':'二氧化碳',parts:en?'Carbon and oxygen atoms':'碳原子和氧原子',symbols:'C + O'}];
 return <section className="building-blocks"><div className="section-label"><h2>{en?'Everyday objects are made of atoms.':'身邊的物體，都由原子組成。'}</h2><span>{en?'Object → atoms → symbols':'物體 → 原子 → 元素符號'}</span></div><p className="blocks-intro">{en?'Different materials contain different types of atoms.':'不同物質，可以含有不同種類的原子。'}</p><div className="three-grid atom-examples">{examples.map(e=><article className="card" key={e.kind}><h3>{e.name}</h3><Model kind={e.kind} compact label={`${e.name}: ${e.parts}`}/><div className="example-composition"><span>{e.parts}</span><b>{e.symbols}</b></div></article>)}</div><div className="note"><Lightbulb size={20}/><p>{en?'Water and carbon dioxide both contain oxygen atoms.':'水和二氧化碳，都含有氧原子。'}</p></div></section>;
}
