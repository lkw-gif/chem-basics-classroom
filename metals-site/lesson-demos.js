const tr = (en, zh, english) => en ? english : zh;
const ink = '#234453';
const line = (x1, y1, x2, y2, color = '#78939e', width = 2) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${width}"/>`;
const label = (x, y, text, anchor = 'middle', color = ink, size = 17) => `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}" font-size="${size}" font-family="Arial,Microsoft JhengHei,sans-serif">${text}</text>`;
const arrow = (x1, y1, x2, y2, id, color = '#08765c') => `<path d="M${x1} ${y1} L${x2} ${y2}" fill="none" stroke="${color}" stroke-width="3" marker-end="url(#${id}-arrow)"/>`;
const svg = (id, title, content, height = 340) => `<svg viewBox="0 0 620 ${height}" role="img" aria-labelledby="${id}-title"><title id="${id}-title">${title}</title><defs><marker id="${id}-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M1 1 L9 5 L1 9" fill="none" stroke="#08765c" stroke-width="1.5" stroke-linejoin="round"/></marker></defs>${content}</svg>`;

export const processLessons = {
  panning: {
    title: ['淘金：把金與沙分開', 'Panning: separate gold from sand'],
    steps: [
      { name: ['混合物', 'Mixture'], see: ['盤內有金粒、水和沙。', 'The pan contains gold grains, water and sand.'], why: ['金已經是游離元素，不必用化學反應製造金。', 'The gold is already a free element. No reaction is needed to make it.'] },
      { name: ['用水沖洗', 'Wash'], see: ['輕輕晃動和傾斜，讓水帶走較輕的沙。', 'Swirl and tilt the pan gently. Water washes lighter sand away.'], why: ['相近大小的粒子中，密度較高的金粒較容易沉在底部。', 'For similar-sized grains, denser gold settles more readily at the bottom.'] },
      { name: ['留下金粒', 'Collect'], see: ['沙減少，金粒留在盤底。', 'Less sand remains; gold grains stay at the bottom.'], why: ['只分開混合物，沒有新物質形成，所以是物理方法。', 'The mixture is separated. No new substance forms, so this is a physical method.'] },
    ],
  },
  heating: {
    title: ['銀氧化物：加熱前後', 'Silver oxide: before and after heating'],
    steps: [
      { name: ['加熱前', 'Before'], see: ['試管內是深色銀氧化物。', 'The test tube contains dark silver oxide.'], why: ['銀氧化物是化合物；銀和氧仍然結合在一起。', 'Silver oxide is a compound: silver and oxygen are chemically combined.'] },
      { name: ['加熱', 'Heat'], see: ['加熱時放出氧氣。', 'Oxygen gas is released during heating.'], why: ['銀氧化物受熱分解，形成銀和氧氣。', 'Heat decomposes silver oxide into silver and oxygen.'] },
      { name: ['加熱後', 'After'], see: ['試管留下銀色／灰色的銀。', 'A silvery-grey solid, silver, remains.'], why: ['產生了新物質：這是化學變化，叫熱分解。', 'New substances form. This chemical change is called thermal decomposition.'] },
    ],
  },
  carbon: {
    title: ['氧化銅與碳：黑色變成紅棕色', 'Copper oxide and carbon: black to reddish brown'],
    steps: [
      { name: ['混合', 'Mix'], see: ['黑色氧化銅(II)與碳粉混合。', 'Black copper(II) oxide is mixed with carbon powder.'], why: ['氧仍然與銅結合；單靠混合未能提取銅。', 'Oxygen is still combined with copper. Mixing alone does not extract copper.'] },
      { name: ['加熱', 'Heat'], see: ['加熱時，開始出現紅棕色的固體。', 'On heating, a reddish-brown solid starts to appear.'], why: ['碳比銅活潑，從氧化銅拿走氧；此例產生銅和二氧化碳。', 'Carbon is more reactive than copper. It removes oxygen, forming copper and carbon dioxide in this example.'] },
      { name: ['觀察產物', 'Observe'], see: ['出現紅棕色的銅；可能仍有未反應的碳。', 'Reddish-brown copper appears; some unreacted carbon may remain.'], why: ['氧化銅失去氧，稱為還原。', 'Copper oxide loses oxygen. This is reduction.'] },
    ],
  },
  electrolysis: {
    title: ['鋁的電解槽：看清兩極和產物', 'An aluminium cell: electrodes and products'],
    steps: [
      { name: ['準備原料', 'Prepare'], see: ['氧化鋁溶在熔融冰晶石中。', 'Aluminium oxide is dissolved in molten cryolite.'], why: ['熔融混合物中的離子可以移動。', 'Ions can move through the molten mixture.'] },
      { name: ['接通電流', 'Switch on'], see: ['Al³⁺ 移向負極；O²⁻ 移向正極。', 'Al³⁺ moves to the negative cathode; O²⁻ moves to the positive anode.'], why: ['鋁離子在負極得到電子，形成鋁。', 'Aluminium ions gain electrons at the cathode and form aluminium.'] },
      { name: ['取得鋁', 'Collect'], see: ['液態鋁積聚在底部；正極放出二氧化碳。', 'Molten aluminium collects at the bottom; carbon dioxide leaves the anodes.'], why: ['氧與碳正極反應，因此碳正極會逐漸消耗。', 'Oxygen reacts with the carbon anodes, so the anodes are gradually used up.'] },
    ],
  },
};

function panDiagram(step, en) {
  const id = 'pan';
  const dots = Array.from({length: step === 2 ? 5 : 28}, (_, i) => `<circle cx="${170 + (i * 43 % 266)}" cy="${170 + (i * 19 % 35)}" r="${4 + i % 3}" fill="#a9a293"/>`).join('');
  return svg(id, tr(en, ...processLessons.panning.steps[step].see), `
    ${label(310, 38, tr(en, '用密度差分離', 'Separate by density'))}
    <path d="M92 121 Q310 69 528 121 L457 239 Q310 282 163 239 Z" fill="#e6edf0" stroke="#526c79" stroke-width="3"/>
    <path d="M111 133 Q310 172 509 133 L460 213 Q310 250 160 213 Z" fill="#d5edf3" stroke="#7fb9c9" stroke-width="2"/>
    <ellipse cx="310" cy="121" rx="218" ry="37" fill="#edf5f7" stroke="#526c79" stroke-width="3"/>
    <path d="M139 139 Q310 171 483 139" fill="none" stroke="#7fb9c9" stroke-width="2"/>
    ${dots}
    ${[230,266,307,344,382].map((x,i) => `<path d="M${x} ${224+i%2*7} l8 -4 7 7 -8 6 -8 -3Z" fill="#d7a126" stroke="#896518" stroke-width="1.5"/>`).join('')}
    ${step === 1 ? `${arrow(489,170,559,224,id)}${label(523,263,tr(en,'水 + 沙','Water + sand'),'middle','#436d83',16)}` : ''}
    ${line(305,246,305,281)}${label(305,308,tr(en,'金粒留在較低位置','Gold settles at the bottom'),'middle','#8a6318')}
  `);
}

function heatingDiagram(kind, step, en) {
  const carbon = kind === 'carbon', id = `${kind}-apparatus`;
  const powder = step === 2 ? (carbon ? '#b56740' : '#adb6ba') : '#30393d';
  const tube = `<g transform="rotate(-9 285 142)"><path d="M449 102 H180 Q125 102 125 143 Q125 184 180 184 H449" fill="#f0f7fa" fill-opacity=".7" stroke="#728d99" stroke-width="3"/><path d="M155 163 Q184 144 236 157 L278 175 H175 Q159 175 155 163Z" fill="${powder}"/>${carbon && step===1?'<path d="M161 164 l12 -6 13 4 3 9 -19 0Z" fill="#b56740"/>':''}${carbon && step===2?'<circle cx="196" cy="163" r="3" fill="#30393d"/><circle cx="217" cy="168" r="3" fill="#30393d"/>':''}<path d="M446 100 v87" stroke="#728d99" stroke-width="2"/></g>`;
  return svg(id, tr(en, ...processLessons[kind].steps[step].see), `
    ${label(286,32,step===2?tr(en,'冷卻後觀察','Observe after cooling'):tr(en,'加熱試管底部','Heat the closed end of the tube'))}
    ${tube}
    ${line(338,125,365,125,'#617e8d',5)}${line(365,74,365,287,'#617e8d',5)}${line(330,289,408,289,'#617e8d',6)}
    <rect x="192" y="245" width="24" height="45" rx="3" fill="#698c9e"/><rect x="169" y="289" width="72" height="9" rx="4" fill="#547384"/>
    ${step===1?'<path d="M204 242 C172 227 197 204 204 187 C212 207 235 227 204 242Z" fill="#69b6db"/><path d="M204 241 C194 230 203 218 204 216 C209 226 214 232 204 241Z" fill="#c2e8f7"/>':''}
    ${step===1?`${arrow(442,91,497,73,id)}${label(506,64,carbon?'CO₂':'O₂','middle','#08765c',23)}`:''}
    ${line(170,165,110,208)}${label(110,235,step===2?(carbon?tr(en,'紅棕色銅','Reddish-brown Cu'):tr(en,'銀色的銀','Silvery-grey Ag')):tr(en,'深色粉末','Dark powder'),'middle',step===2&&carbon?'#995233':ink,16)}
    ${label(310,328,tr(en,'器材示意 · 不按比例','Apparatus diagram · not to scale'),'middle','#748795',14)}
  `);
}

function cellDiagram(step, en) {
  const id='cell';
  return svg(id,tr(en,...processLessons.electrolysis.steps[step].see),`
    <path d="M129 114 V269 Q129 291 152 291 H472 Q495 291 495 269 V114" fill="#334f5c" stroke="#233d49" stroke-width="3"/>
    <path d="M143 149 H481 V250 H143Z" fill="#f4d8a0"/>
    <path d="M143 250 H481 V272 Q481 277 465 277 H159 Q143 277 143 272Z" fill="${step===2?'#9fbcc9':'#f4d8a0'}"/>
    <rect x="235" y="86" width="33" height="91" fill="#526670"/><rect x="352" y="86" width="33" height="91" fill="#526670"/>
    <path d="M250 86 V63 H369 V86" fill="none" stroke="#607e8b" stroke-width="3"/>
    <path d="M310 63 V45" fill="none" stroke="#607e8b" stroke-width="3"/>
    ${label(310,27,tr(en,'碳正極 (+)','Carbon anodes (+)'),'middle','#945c20',17)}
    ${line(495,265,550,265)}${label(554,248,tr(en,'負極 (−)','Cathode (−)'),'middle',ink,15)}
    ${step===1?`${arrow(203,192,203,244,id)}${label(191,178,'Al³⁺','middle','#08765c',21)}${arrow(314,224,351,183,id)}${label(310,246,'O²⁻','middle','#08765c',21)}`:label(310,215,tr(en,'熔融電解質','Molten electrolyte'))}
    ${step===2?`${arrow(396,127,442,82,id)}${label(464,70,'CO₂','middle','#08765c',22)}`:''}
    ${label(310,323,step===2?tr(en,'底部：液態鋁','Bottom layer: molten aluminium'):tr(en,'氧化鋁溶於熔融冰晶石','Alumina dissolved in molten cryolite'),'middle','#496c7c',17)}
  `);
}

export function renderProcessScene(kind, step, en) {
  if (kind === 'panning') return panDiagram(step,en);
  if (kind === 'electrolysis') return cellDiagram(step,en);
  return heatingDiagram(kind,step,en);
}

export function renderProcessDemo(kind, en) {
  const data = processLessons[kind], t=(zh,english)=>tr(en,zh,english);
  return `<div class="process-demo" data-process="${kind}"><div class="process-steps" role="group" aria-label="${t('選擇示範步驟','Choose a demonstration step')}">${data.steps.map((s,i)=>`<button type="button" data-step="${i}" aria-pressed="${i===0}"><span>${i+1}</span>${t(...s.name)}</button>`).join('')}</div><div class="process-body"><div class="process-scene">${renderProcessScene(kind,0,en)}</div><div class="process-reading" aria-live="polite"><div class="observation"><span>${t('睇到甚麼','OBSERVE')}</span><p data-observation>${t(...data.steps[0].see)}</p></div><div class="explanation"><span>${t('點解會咁','EXPLAIN')}</span><p data-explanation>${t(...data.steps[0].why)}</p></div></div></div><div class="process-bottom"><span>${t('按步驟比較變化','Tap each step to compare the change')}</span><button type="button" data-next-step>${t('下一步 →','Next step →')}</button></div></div>`;
}

function rustTube(type, after, en) {
  const t=(zh,english)=>tr(en,zh,english), rusty=after&&type==='both';
  const water=type!=='dry';
  return `<svg viewBox="0 0 220 250" role="img" aria-label="${type==='dry'?t('密封試管：乾燥空氣和乾燥劑','Sealed tube: dry air and drying agent'):type==='water'?t('鐵釘浸在煮沸的水中，上方有油層','Nail submerged in boiled water under an oil layer'):t('鐵釘接觸空氣和水','Nail in contact with air and water')}"><path d="M61 37 V197 Q61 226 90 226 H130 Q159 226 159 197 V37" fill="#f4f9fa" stroke="#7897a6" stroke-width="3"/>${water?`<path d="M64 ${type==='water'?83:157} H156 V197 Q156 223 130 223 H90 Q64 223 64 197Z" fill="#bbdfe9"/>`:''}${type==='water'?'<rect x="64" y="73" width="92" height="11" fill="#d8bc67"/>':''}${type==='dry'?'<rect x="57" y="29" width="106" height="18" rx="4" fill="#94a79e"/><path d="M65 205 l13 -9 13 10 13 -9 15 11 13 -11 21 9 v8 H66Z" fill="#d6ded8"/>':''}<g transform="rotate(12 110 154)"><path d="M103 103 h14 v88 l-7 14 -7 -14Z" fill="${rusty?'#af643d':'#90a6b0'}" stroke="#607e8e"/><rect x="94" y="97" width="32" height="8" rx="2" fill="${rusty?'#af643d':'#90a6b0'}"/>${rusty?'<circle cx="108" cy="136" r="5" fill="#d48950"/><circle cx="113" cy="166" r="6" fill="#894529"/><circle cx="109" cy="188" r="4" fill="#d48950"/>':''}</g>${type==='dry'?`${label(110,78,t('乾燥空氣','Dry air'),'middle',ink,15)}${label(110,247,t('乾燥劑（吸水）','Drying agent'),'middle','#587685',13)}`:type==='water'?`${label(185,81,t('油','Oil'),'middle','#946d24',14)}${line(159,77,173,77)}${label(110,247,t('煮沸後冷卻的水','Boiled, cooled water'),'middle','#587685',13)}`:`${label(110,75,t('空氣','Air'),'middle',ink,15)}${label(185,174,t('水','Water'),'middle','#476f86',14)}${line(159,169,171,169)}`}</svg>`;
}

const rustCases=[['dry','A','乾燥空氣','Dry air','有氧氣，無水','Oxygen; no water'],['water','B','煮沸的水 + 油','Boiled water + oil','有水，隔絕氧氣','Water; oxygen excluded'],['both','C','水 + 空氣','Water + air','水和氧氣都有','Both water and oxygen']];
export function renderRustTubes(en, after=false) {
  const t=(zh,english)=>tr(en,zh,english);
  return rustCases.map(([id,letter,zh,english,cz,ce])=>`<article class="rust-tube-card ${after&&id==='both'?'rust-positive':''}"><div class="rust-tube-heading"><b>${letter}</b><h3>${t(zh,english)}</h3></div>${rustTube(id,after,en)}<p>${t(cz,ce)}</p><strong class="rust-outcome">${after?(id==='both'?t('生銹 ✓','Rust forms ✓'):t('不生銹','No rust')):t('開始：乾淨鐵釘','Start: clean nail')}</strong></article>`).join('');
}
export function renderRustComparison(en) {
  const t=(zh,english)=>tr(en,zh,english);
  return `<div class="rust-comparison"><div class="rust-predict"><div><span class="eyebrow">${t('先估一估','PREDICT FIRST')}</span><p>${t('幾天後，哪支試管的鐵釘會生銹？','After several days, which nail will rust?')}</p></div><div role="group" aria-label="${t('選擇試管','Choose a test tube')}">${['A','B','C'].map(x=>`<button type="button" data-rust-guess="${x}" aria-pressed="false">${x}</button>`).join('')}</div></div><div class="rust-tubes">${renderRustTubes(en)}</div><div class="rust-result-bar"><p data-rust-feedback aria-live="polite">${t('每支試管都使用乾淨、相同的鐵釘。','Use identical, clean iron nails in every tube.')}</p><button type="button" data-rust-reveal aria-pressed="false">${t('看幾天後的結果 →','See the result after several days →')}</button></div></div>`;
}

export function setupLessonDemos(en) {
  const t=(zh,english)=>tr(en,zh,english);
  document.querySelectorAll('[data-process]').forEach(root=>{
    const kind=root.dataset.process, data=processLessons[kind]; let step=0;
    const show=i=>{
      step=i;
      root.querySelectorAll('[data-step]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.step)===step)));
      root.querySelector('.process-scene').innerHTML=renderProcessScene(kind,step,en);
      root.querySelector('[data-observation]').textContent=t(...data.steps[step].see);
      root.querySelector('[data-explanation]').textContent=t(...data.steps[step].why);
      root.querySelector('[data-next-step]').textContent=step===2?t('重新比較 ↺','Compare again ↺'):t('下一步 →','Next step →');
    };
    root.querySelectorAll('[data-step]').forEach(button=>button.addEventListener('click',()=>show(Number(button.dataset.step))));
    root.querySelector('[data-next-step]').addEventListener('click',()=>show((step+1)%3));
  });
  const root=document.querySelector('.rust-comparison'); if(!root)return;
  let guess=null, after=false;
  const feedback=()=>{
    root.querySelector('[data-rust-feedback]').textContent=after?`${guess?(guess==='C'?t('答對了！','Correct! '):t('再比較三個條件。','Compare the conditions again. ')):''}${t('只有 C 同時有水和氧氣，所以會生銹。','Only C has both water and oxygen, so only C rusts.')}`:t('每支試管都使用乾淨、相同的鐵釘。','Use identical, clean iron nails in every tube.');
  };
  root.querySelectorAll('[data-rust-guess]').forEach(button=>button.addEventListener('click',()=>{
    guess=button.dataset.rustGuess;
    root.querySelectorAll('[data-rust-guess]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    feedback();
  }));
  root.querySelector('[data-rust-reveal]').addEventListener('click',event=>{
    after=!after; root.querySelector('.rust-tubes').innerHTML=renderRustTubes(en,after);
    event.currentTarget.setAttribute('aria-pressed',String(after));
    event.currentTarget.textContent=after?t('返回開始 ↺','Back to the start ↺'):t('看幾天後的結果 →','See the result after several days →');
    feedback();
  });
}
