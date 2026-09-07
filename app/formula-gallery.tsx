'use client';

import { ArrowRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import './formula-gallery.css';
import { formulae } from './content';
import { asset, translateText, useLanguage, useTranslateTree } from './i18n';
import Model from './model';

export function FormulaGallery({ teacher }: { teacher: boolean }) {
  const tr = useTranslateTree();
  const { language } = useLanguage();
  const [formulaVisible, setFormulaVisible] = useState(!teacher);
  const showFormula = !teacher || formulaVisible;

  const atomDescription = (name: string, count: number) =>
    language === 'en'
      ? `${count} ${translateText(name, 'en').toLowerCase()} atom${count > 1 ? 's' : ''}`
      : `${count} 個${name}原子`;

  return tr(
    <>
      <header className="lesson-heading">
        <span className="eyebrow">
          02 / CHEMICAL FORMULAE <span className="notes-ref">NOTES 4, 6</span>
        </span>
        <h1>看懂化學式</h1>
        <p>字母表示原子種類；右下角數字表示數目。</p>
      </header>

      {teacher && !formulaVisible && (
        <div className="teacher-formula-prompt">
          <p>比較原子種類和數目。</p>
          <button className="primary-btn" onClick={() => setFormulaVisible(true)}>
            顯示化學式 <ArrowRight size={17} />
          </button>
        </div>
      )}

      <section className="formula-gallery" aria-label="七個分子的 3D 模型">
        {formulae.map((item) => {
          const name = language === 'en' ? item.en : item.zh;
          const type = language === 'en' ? (item.element ? 'Element' : 'Compound') : item.element ? '元素' : '化合物';
          return (
            <article className="formula-gallery-card" key={item.id}>
              <header>
                <span className="type-tag">{type}</span>
                <h2>
                  {showFormula ? item.formula : name}
                  {showFormula && <small>{name}</small>}
                </h2>
              </header>
              <Model kind={item.id} compact label={item.sentence} />
              <div className="formula-gallery-atoms">
                {item.parts.map(([symbol, atomName, count]) => (
                  <span key={String(symbol)}>
                    <b>{atomDescription(String(atomName), Number(count))}</b>
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </section>

      {showFormula && (
        <>
          <div className="two-grid">
            <article className="card">
              <h3>右下角的 ₂ 只跟前面的符號</h3>
              <p>H₂O 的 ₂ 跟着 H，所以有 2 個 H。O 後面沒有數字，代表 1 個 O。</p>
            </article>
            <article className="card">
              <h3>原子多，不一定是化合物</h3>
              <p>H₂ 有 2 個原子，但全部都是氫，所以仍然是元素。H₂O 有氫和氧兩種元素，才是化合物。</p>
            </article>
          </div>

          <div className="section-label">
            <h2>由一個分子，看到一整杯水</h2>
            <span>同一種分子，很多很多個。</span>
          </div>
          <div className="zoom-story">
            <figure>
              <img src={asset('images/water.jpg')} alt="一杯水的示意照片" loading="lazy" decoding="async" width={960} height={720} />
              <figcaption>一杯水</figcaption>
            </figure>
            <ArrowRight className="zoom-arrow" />
            <div>
              <Model kind="sample:water" compact label="很多個相同的水分子" />
              <p>放大看：很多個 H₂O</p>
            </div>
            <ArrowRight className="zoom-arrow" />
            <div>
              <Model kind="H2O" compact />
              <p>再看一個：2 H ＋ 1 O</p>
            </div>
          </div>

          <details className="details-card">
            <summary>
              notes 還有這些化學式 <ChevronDown size={18} />
            </summary>
            <p>有些物質不是由一個個獨立小分子組成。現在只需認得它們包含哪些元素。</p>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>物質</th><th>化學式</th><th>包含的元素</th></tr>
                </thead>
                <tbody>
                  {[
                    ['食鹽', 'NaCl', '鈉、氯'],
                    ['葡萄糖', 'C₆H₁₂O₆', '碳、氫、氧'],
                    ['石英', 'SiO₂', '矽、氧'],
                    ['碳酸鈣（白堊的主要成分）', 'CaCO₃', '鈣、碳、氧'],
                  ].map((row) => (
                    <tr key={row[1]}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p>例如 NaCl：鈉和氯的數目比例是 1：1；不是一個獨立的「NaCl 小分子」。</p>
          </details>
        </>
      )}

    </>,
  );
}
