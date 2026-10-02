import { modelMarkup } from './models-3d.js';

const choose = (en, zh, english) => en ? english : zh;
const heading = (en, zh, english, sideZh = '', sideEn = '') => `<div class="panel-heading"><h2>${choose(en, zh, english)}</h2><span>${choose(en, sideZh, sideEn)}</span></div>`;
const highlight = (text, tone = '') => `<span class="key-highlight ${tone}">${text}</span>`;

export function renderSimplePage(en) {
  const t = (zh, english) => choose(en, zh, english);
  const language = en ? 'en' : 'zh';
  return `<div class="method-duo interactive-method-duo">
    <article class="panel method-card">${heading(en, '方法 1 · 物理分離', 'Method 1 · Physical separation', '拖動模型並控制進度', 'ROTATE AND SCRUB')}${modelMarkup('panning', language)}<div class="method-copy"><h3>${t('淘金','Gold panning')}</h3><p>${t('密度較高的金粒留在盤底；沙粒被水帶走。','Denser gold grains stay in the pan; water carries sand away.')}</p><span class="method-equation">${t('金沒有變成新物質','Gold remains the same substance')}</span></div></article>
    <article class="panel method-card">${heading(en, '方法 2 · 直接加熱', 'Method 2 · Heat alone', '觀察氧氣離開', 'WATCH OXYGEN ESCAPE')}${modelMarkup('heating', language)}<div class="method-copy"><h3>${t('銀氧化物分解','Silver oxide decomposes')}</h3><p>${t('少數不穩定的金屬氧化物加熱便會分解。','A few less stable metal oxides decompose on heating.')}</p><span class="method-equation">${t('銀氧化物 → 銀 + 氧氣','Silver oxide → silver + oxygen')}</span></div></article>
  </div><p class="teaching-note">${t('3D 模型表示過程，並非真實原子大小或反應速度。汞及其蒸氣有毒，這裏不示範加熱朱砂。','The 3D models show the process, not actual atomic sizes or reaction speed. Mercury vapour is toxic, so cinnabar heating is not demonstrated here.')}</p>`;
}

export function renderCarbonPage(en) {
  const t = (zh, english) => choose(en, zh, english);
  const language = en ? 'en' : 'zh';
  return `<section class="panel interactive-carbon">${heading(en, '看氧轉移到哪裏', 'Track where the oxygen goes', '以氧化銅為 3D 例子', 'CuO AS A 3D EXAMPLE')}
    <div class="interactive-carbon-layout">${modelMarkup('carbon', language)}<div class="interactive-carbon-copy"><span class="eyebrow">${t('還原','REDUCTION')}</span><h3>${t('氧化物失去氧 → 金屬','Oxide loses oxygen → metal')}</h3><p>${t('碳把氧從氧化銅拿走。選上面的金屬氧化物，先試寫文字方程式，再揭曉產物。','Carbon removes oxygen from copper oxide. Choose an oxide above, predict the word equation, then reveal the products.')}</p><div class="model-takeaway"><b>${t('注意產物','Check the product')}</b><p>${t('不同溫度及條件下，碳可能形成一氧化碳或二氧化碳。','Depending on temperature and conditions, carbon may form carbon monoxide or carbon dioxide.')}</p></div></div></div>
  </section><p class="experiment-safety">${t('加熱實驗只應由教師示範或監督；器材冷卻前仍然很燙。','Heating experiments need teacher demonstration or supervision; apparatus remains hot while cooling.')}</p>`;
}

export function renderElectrolysisPage(en) {
  const t = (zh, english) => choose(en, zh, english);
  const language = en ? 'en' : 'zh';
  return `<section class="panel interactive-electrolysis">${heading(en, '3D 電解：鋁離子移去哪裏？', '3D electrolysis: where do aluminium ions go?', '選進度，追蹤離子', 'SCRUB TO FOLLOW THE IONS')}
    <div class="interactive-electrolysis-layout">${modelMarkup('electrolysis', language)}<div class="interactive-electrolysis-copy"><span class="eyebrow">${t('氧化鋁','ALUMINIUM OXIDE')}</span><h3>${t('碳不能輕易提取鋁','Carbon cannot readily extract aluminium')}</h3><p>${t('先把鋁土礦提煉成氧化鋁，再把氧化鋁溶於熔融冰晶石中通電。帶正電的鋁離子移向負極，得到電子形成鋁。','Bauxite is refined to alumina, which is dissolved in molten cryolite and electrolysed. Positive aluminium ions move to the cathode and gain electrons to form aluminium.')}</p><div class="model-takeaway"><b>${t('看正極','At the anode')}</b><p>${t('氧離子移向碳正極；釋出的氧與碳反應，主要形成二氧化碳。','Oxide ions move to the carbon anode; released oxygen reacts with carbon, mainly forming carbon dioxide.')}</p></div></div></div>
  </section>`;
}

export function renderRustPage(en) {
  const t = (zh, english) => choose(en, zh, english);
  const language = en ? 'en' : 'zh';
  return `<section class="panel interactive-rust">${heading(en, '比較三支試管，找出生銹條件', 'Compare three tubes to find the conditions for rusting', '3D 鐵釘模型', '3D IRON NAIL MODEL')}
    <div class="rust-question">${t('選 A、B 或 C，再拖動進度條，觀察鐵釘有甚麼變化。','Choose A, B or C, then scrub the timeline to see what happens to the nail.')}</div>
    ${modelMarkup('rust', language)}
    <div class="rust-conditions"><div><b>A</b><strong>${t('乾燥空氣','Dry air')}</strong><span>${t('有氧氣，沒有水','Oxygen present; no water')}</span></div><div><b>B</b><strong>${t('煮沸的水 + 油層','Boiled water + oil')}</strong><span>${t('有水，沒有氧氣','Water present; no oxygen')}</span></div><div><b>C</b><strong>${t('水 + 空氣','Water + air')}</strong><span>${t('有水，也有氧氣','Water and oxygen present')}</span></div></div>
  </section><div class="rust-equation"><span>Fe</span><b>+</b><span>H₂O</span><b>+</b><span>O₂</span><b>→</b><strong>${t('鐵鏽','Rust')}</strong></div><p class="teaching-note">${t(`鐵要同時接觸 ${highlight('水','blue')} 和 ${highlight('氧氣','orange')} 才會生銹。鐵鏽是紅棕色的水合氧化鐵(III)，容易剝落。上式並非配平的化學方程式。`,`Iron needs both ${highlight('water','blue')} and ${highlight('oxygen','orange')} to rust. Rust is flaky, reddish-brown hydrated iron(III) oxide. The line above is not a balanced equation.`)}</p>`;
}
