'use client';
import {chapters} from './content';
import './unit1-home.css';

export const unitOneDirectoryLabel = {zh:'課題目錄',en:'All lessons'} as const;
export const unitOneAllUnitsLabel = {zh:'← 返回單元總覽',en:'← All units'} as const;

const previews = [
  ['先由身邊物質認識原子、分子和物質。', 'Begin with everyday materials, atoms and molecules.'],
  ['看看常見元素的符號、用途及週期表。', 'Explore familiar elements, symbols, uses and the periodic table.'],
  ['用粒子模型讀懂 H₂、O₂ 和 H₂O。', 'Use particle models to read H₂, O₂ and H₂O.'],
  ['分辨純物質與混合物。', 'Tell pure substances from mixtures.'],
  ['比較元素、化合物和混合物。', 'Compare elements, compounds and mixtures.'],
  ['透過例子認識物理及化學變化。', 'Use examples to explore physical and chemical changes.'],
  ['認識基本實驗、氣體測試和安全。', 'Learn basic experiments, gas tests and safety.'],
  ['用重點摘要和小測整理所學。', 'Review key ideas with a short quiz.'],
] as const;

export default function UnitOneHome({language, lessonHref}:{language:'zh'|'en';lessonHref:(id:string)=>string}) {
  const en=language==='en';
  return <div className="unit-one-home">
    <section className="unit-one-hero">
      <div><span className="unit-one-eyebrow">S3 CHEMISTRY · UNIT 01</span><h1>{en?'Basic chemistry,':'由小粒子，'}<br/><em>{en?'one idea at a time.':'開始學化學。'}</em></h1><p>{en?'Eight short lessons take you from atoms and formulae to different types of matter and changes.':'八個短課題，由原子、化學式，逐步認識物質種類與變化。'}</p><a className="unit-one-primary" href={lessonHref('start')}>{en?'Start lesson one':'由第一課開始'} <span aria-hidden="true">→</span></a></div>
      <div className="unit-one-hero-art" aria-hidden="true"><span className="u1-atom">H</span><span className="u1-plus">+</span><span className="u1-atom oxygen">O</span><span className="u1-arrow">→</span><span className="u1-molecule"><i>H</i><i>O</i><i>H</i></span><b>{en?'Atoms join in different ways':'原子以不同方式連在一起'}</b></div>
    </section>
    <div className="unit-one-catalog-heading"><div><span className="unit-one-eyebrow">UNIT 01 / 8 LESSONS</span><h2>{en?'Choose a lesson':'選一課開始'}</h2></div><span>08 / 08</span></div>
    <nav className="unit-one-catalog" aria-label={en?'Unit 1 lessons':'第一單元課題'}>{chapters.map(([id,zh,english],index)=><a className="unit-one-lesson" href={lessonHref(id)} key={id}><span className="unit-one-number">{String(index+1).padStart(2,'0')}</span><span className="unit-one-card-copy"><small>{`1.${index+1}`}</small><b>{en?english:zh}</b><span>{previews[index][en?1:0]}</span></span><span className="unit-one-card-arrow" aria-hidden="true">↗</span></a>)}</nav>
  </div>;
}
