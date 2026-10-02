import { renderProcessDemo, renderRustComparison } from './lesson-demos.js';
const tr=(en,zh,english)=>en?english:zh;
const head=(en,n,zh,english,subZh,subEn)=>`<div class="panel-heading"><h2><span class="section-number">${n}</span>${tr(en,zh,english)}</h2><span>${tr(en,subZh,subEn)}</span></div>`;
export function renderSimplePage(en) {
  const t=(zh,english)=>tr(en,zh,english);
  return `<section class="panel lesson-demo-panel">${head(en,'01','淘金：分開，沒有反應','Panning: separate without reacting','金已是游離元素','GOLD IS ALREADY AN ELEMENT')}${renderProcessDemo('panning',en)}<div class="demo-bottom-line"><span>${t('記住','REMEMBER')}</span><b>${t('密度差 → 物理分離 → 沒有新物質','Density difference → physical separation → no new substance')}</b></div></section>
  <section class="panel lesson-demo-panel">${head(en,'02','加熱：化合物變成新物質','Heating: a compound breaks down','銀氧化物的例子','THE SILVER OXIDE EXAMPLE')}${renderProcessDemo('heating',en)}<div class="word-equation-banner"><span>${t('文字方程式 · 加熱','WORD EQUATION · HEAT')}</span><p>${t('銀氧化物','silver oxide')} <b>→</b> <strong>${t('銀 + 氧氣','silver + oxygen')}</strong></p></div></section>
  <div class="contrast-notes"><article><b>${t('物理方法','PHYSICAL METHOD')}</b><p>${t('淘金：金只是與沙分開。','Panning: gold is separated from sand.')}</p></article><article><b>${t('化學方法','CHEMICAL METHOD')}</b><p>${t('加熱銀氧化物：產生銀和氧氣。','Heating silver oxide: silver and oxygen form.')}</p></article></div>`;
}
export function renderCarbonPage(en) {
  return `<section class="panel lesson-demo-panel">${head(en,'02','把方程式連結到觀察','Connect the equation to the observation','黑色 → 紅棕色','BLACK → REDDISH BROWN')}${renderProcessDemo('carbon',en)}<div class="demo-bottom-line"><span>${tr(en,'核心字眼','KEY WORD')}</span><b>${tr(en,'還原 = 氧化物失去氧','Reduction = removal of oxygen from the oxide')}</b></div></section>`;
}
export function renderElectrolysisPage(en) {
  const t=(zh,english)=>tr(en,zh,english);
  return `<div class="decision-note"><b>${t('為何不用碳？','Why not carbon?')}</b><p>${t('鋁比碳活潑，碳不能輕易還原氧化鋁。用電能讓鋁離子變成鋁。','Aluminium is more reactive than carbon. Carbon cannot readily reduce aluminium oxide, so electrical energy is used.')}</p></div><section class="panel lesson-demo-panel">${head(en,'01','從氧化鋁取得鋁','From aluminium oxide to aluminium','原料 → 電流 → 產物','FEEDSTOCK → CURRENT → PRODUCT')}${renderProcessDemo('electrolysis',en)}<div class="electrode-pair"><div><span>−</span><p><b>${t('負極','CATHODE')}</b>${t('Al³⁺ 得到電子 → 鋁','Al³⁺ gains electrons → aluminium')}</p></div><div><span>+</span><p><b>${t('碳正極','CARBON ANODE')}</b>${t('氧與碳反應 → 二氧化碳','Oxygen reacts with carbon → carbon dioxide')}</p></div></div></section>`;
}
export function renderRustPage(en) {
  const t=(zh,english)=>tr(en,zh,english);
  return `<section class="panel lesson-demo-panel">${head(en,'01','三支試管，一個結論','Three tubes. One conclusion.','先預測，再揭曉','PREDICT → REVEAL')}${renderRustComparison(en)}</section><div class="rust-rule"><span>${t('缺一不可','BOTH ARE NEEDED')}</span><p>${t('鐵','Iron')} + <strong class="key-highlight blue">${t('水','water')}</strong> + <strong class="key-highlight orange">${t('氧氣','oxygen')}</strong> → <b>${t('鐵鏽','rust')}</b></p><small>${t('條件示意；並非配平的化學方程式。','A summary of the conditions, not a balanced chemical equation.')}</small></div><div class="contrast-notes"><article><b>${t('試管 A：乾燥劑','TUBE A: DRYING AGENT')}</b><p>${t('無水氯化鈣吸走水分；密封試管阻止濕氣進入。','Anhydrous calcium chloride absorbs water. A stopper keeps moist air out.')}</p></article><article><b>${t('試管 B：煮沸 + 油層','TUBE B: BOILING + OIL')}</b><p>${t('煮沸除去溶解的氧氣，油層防止氧氣重新溶入水中。','Boiling removes dissolved oxygen. The oil layer stops oxygen dissolving back into the water.')}</p></article></div>`;
}
