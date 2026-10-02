const copy = (en, zh, english) => en ? english : zh;

export function renderReactivityGuide(en) {
  const t = (zh, english) => copy(en, zh, english);
  return `<section class="panel reactivity-guide" aria-labelledby="reactivity-title">
    <div class="panel-heading"><h2 id="reactivity-title">${t('先看活潑程度，再選提取方法','Reactivity predicts the extraction method')}</h2><span>${t('由較難到較易','HARDER → EASIER')}</span></div>
    <p class="reactivity-intro">${t('金屬越活潑，通常與氧結合得越牢，氧化物越難還原。先比較金屬和碳的活潑程度。','More reactive metal → oxide is usually harder to reduce. Compare the metal with carbon to choose a method.')}</p>
    <div class="reactivity-track" role="list">
      <div role="listitem" class="reactivity-step strong"><b>K · Na · Ca · Mg · Al</b><span>${t('高活潑度 · 碳不能提取','Highly reactive · carbon cannot extract')}</span><strong>${t('電解或其他熔融鹽方法','Electrolysis or another molten-salt process')}</strong></div>
      <div role="listitem" class="reactivity-step carbon"><b>C ${t('（分界）','(reference)')} → Zn · Fe · Pb · Cu</b><span>${t('金屬比碳較不活潑','Metals less reactive than carbon')}</span><strong>${t('用碳／一氧化碳還原氧化物','Reduce the oxide with carbon / carbon monoxide')}</strong></div>
      <div role="listitem" class="reactivity-step low"><b>Hg · Ag · Pd · Au</b><span>${t('低活潑度 · 方法視乎礦石','Low reactivity · method depends on the ore')}</span><strong>${t('部分氧化物加熱分解；游離金屬可物理分離','Some oxides decompose on heating; native metal can be separated')}</strong></div>
    </div>
    <p class="reactivity-caveat">${t('這是氧化物的課堂比較；實際礦石也可能是硫化物，工業步驟未必等同這個簡化模型。','This is a classroom comparison of oxides. Real ores may be sulphides, so industrial processes can have additional steps.')}</p>
  </section>`;
}

const wordEquations = [
  {
    id: 'copper', symbol: 'CuO', metalZh: '銅', metalEn: 'Copper',
    reactantsZh: '氧化銅(II) + 碳', reactantsEn: 'copper(II) oxide + carbon',
    productsZh: '銅 + 二氧化碳', productsEn: 'copper + carbon dioxide',
    formula: '2CuO + C → 2Cu + CO₂',
    noteZh: '黑色氧化銅失去氧，形成紅棕色銅。', noteEn: 'Black copper(II) oxide loses oxygen; reddish-brown copper forms.'
  },
  {
    id: 'lead', symbol: 'PbO', metalZh: '鉛', metalEn: 'Lead',
    reactantsZh: '氧化鉛(II) + 碳', reactantsEn: 'lead(II) oxide + carbon',
    productsZh: '鉛 + 一氧化碳', productsEn: 'lead + carbon monoxide',
    formula: 'PbO + C → Pb + CO',
    noteZh: '先把方鉛礦等硫化物轉化成氧化物，才可用碳還原。', noteEn: 'Sulphide ore such as galena is converted to oxide before carbon reduction.'
  },
  {
    id: 'zinc', symbol: 'ZnO', metalZh: '鋅', metalEn: 'Zinc',
    reactantsZh: '氧化鋅 + 碳', reactantsEn: 'zinc oxide + carbon',
    productsZh: '鋅 + 一氧化碳', productsEn: 'zinc + carbon monoxide',
    formula: 'ZnO + C → Zn + CO',
    noteZh: '鋅比銅活潑，需要較高溫才容易還原。', noteEn: 'Zinc is more reactive than copper, so reduction needs a higher temperature.'
  },
  {
    id: 'iron', symbol: 'Fe₂O₃', metalZh: '鐵', metalEn: 'Iron',
    reactantsZh: '氧化鐵(III) + 一氧化碳', reactantsEn: 'iron(III) oxide + carbon monoxide',
    productsZh: '鐵 + 二氧化碳', productsEn: 'iron + carbon dioxide',
    formula: 'Fe₂O₃ + 3CO → 2Fe + 3CO₂',
    noteZh: '高爐中，碳先產生一氧化碳，再由一氧化碳還原氧化鐵。', noteEn: 'In a blast furnace, carbon produces carbon monoxide, which reduces iron oxide.'
  }
];

export function renderEquationExplorer(en) {
  const t = (zh, english) => copy(en, zh, english);
  return `<section class="panel equation-explorer" aria-labelledby="equations-title">
    <div class="panel-heading"><h2 id="equations-title"><span class="section-number">01</span>${t('重點：寫出文字方程式','Focus: write the word equation')}</h2><span>${t('選金屬 → 預測 → 揭曉','CHOOSE → PREDICT → REVEAL')}</span></div>
    <div class="equation-picker" role="group" aria-label="${t('選擇金屬氧化物','Choose a metal oxide')}">${wordEquations.map((item) => `<button type="button" data-equation="${item.id}" aria-pressed="false"><b>${item.symbol}</b><span>${en ? item.metalEn : item.metalZh}</span></button>`).join('')}</div>
    <div class="equation-workspace"><p class="equation-question">${t('如果氧被碳或一氧化碳帶走，會產生甚麼金屬和含碳產物？','If carbon or carbon monoxide takes the oxygen, what metal and carbon-containing product form?')}</p><p class="equation-reactants" id="equation-reactants"></p><button type="button" class="equation-reveal" id="equation-reveal" aria-expanded="false">${t('顯示產物','Reveal products')}</button><div id="equation-answer" class="equation-answer" aria-live="polite" hidden></div></div>
    <p class="equation-footnote">${t('產生 CO 還是 CO₂ 取決於反應條件；鐵的高爐例子主要用 CO。','Whether CO or CO₂ forms depends on conditions. The blast-furnace iron example mainly uses CO.')}</p>
  </section>`;
}

export function setupEquationExplorer(en) {
  const root = document.querySelector('.equation-explorer');
  if (!root) return;
  const t = (zh, english) => copy(en, zh, english);
  let selected = wordEquations[0];
  const answer = root.querySelector('#equation-answer');
  const reveal = root.querySelector('#equation-reveal');
  function show(id) {
    selected = wordEquations.find((item) => item.id === id) || wordEquations[0];
    root.querySelectorAll('[data-equation]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.equation === selected.id)));
    root.querySelector('#equation-reactants').textContent = en ? selected.reactantsEn : selected.reactantsZh;
    answer.hidden = true;
    reveal.setAttribute('aria-expanded', 'false');
    reveal.textContent = t('顯示產物', 'Reveal products');
  }
  root.querySelectorAll('[data-equation]').forEach((button) => button.addEventListener('click', () => show(button.dataset.equation)));
  reveal.addEventListener('click', () => {
    const visible = answer.hidden;
    answer.hidden = !visible;
    reveal.setAttribute('aria-expanded', String(visible));
    reveal.textContent = visible ? t('收起答案', 'Hide answer') : t('顯示產物', 'Reveal products');
    if (visible) answer.innerHTML = `<p><b>${en ? selected.reactantsEn : selected.reactantsZh}</b><span aria-hidden="true"> → </span><strong>${en ? selected.productsEn : selected.productsZh}</strong></p><details><summary>${t("符號方程式（延伸）", "Symbol equation (extension)")}</summary><code>${selected.formula}</code></details><small>${en ? selected.noteEn : selected.noteZh}</small>`;
  });
  show(selected.id);
}

const metalAtlas = [
  ['K','K₂O','鉀','Potassium','工業上以鈉還原熔融 KCl；碳不能還原 K₂O','Industrial potassium is obtained by reducing molten KCl with sodium; carbon cannot reduce K₂O','special'],
  ['Na','Na₂O','鈉','Sodium','電解熔融 NaCl；Na₂O 不是原料','Electrolyse molten NaCl; Na₂O is not the feedstock','electrolysis'],
  ['Ca','CaO','鈣','Calcium','高活潑度：電解熔融氯化物是課堂路線','Highly reactive: molten chloride electrolysis is a class route','electrolysis'],
  ['Mg','MgO','鎂','Magnesium','電解熔融 MgCl₂ 是可行路線','Electrolysis of molten MgCl₂ is a valid route','electrolysis'],
  ['Al','Al₂O₃','鋁','Aluminium','鋁土礦先提煉成 Al₂O₃，再溶於熔融冰晶石中電解','Refine bauxite to Al₂O₃, then electrolyse it dissolved in molten cryolite','electrolysis'],
  ['Zn','ZnO','鋅','Zinc','高溫下用碳／一氧化碳還原','Reduce with carbon / carbon monoxide at high temperature','carbon'],
  ['Fe','Fe₂O₃','鐵','Iron','高爐中主要由一氧化碳還原','Mainly reduced by carbon monoxide in a blast furnace','carbon'],
  ['Pb','PbO','鉛','Lead','硫化物礦石先焙燒，再用碳／一氧化碳還原氧化物','Roast sulphide ore first, then reduce the oxide with carbon / carbon monoxide','carbon'],
  ['Cu','CuO','銅','Copper','碳還原 CuO 是課堂模型；常見硫化物礦石需另行冶煉','Carbon reduction of CuO is a class model; common sulphide ores need other smelting steps','carbon'],
  ['Hg','HgO','汞','Mercury','HgO 可熱分解；實際朱砂 HgS 要焙燒，汞蒸氣有毒','HgO decomposes on heating; actual cinnabar HgS is roasted and mercury vapour is toxic','heat'],
  ['Ag','Ag₂O','銀','Silver','Ag₂O 可熱分解；不是常見銀礦原料','Ag₂O decomposes on heating; it is not a usual silver ore feedstock','heat'],
  ['Pd','PdO','鈀','Palladium','PdO 不是常見礦石；多從鎳／銅礦副產物分離精煉','PdO is not a usual ore; mainly separated and refined as a Ni/Cu by-product','native'],
  ['Au','Au₂O₃*','金','Gold','氧化物不是常見礦石；游離金粒可物理分離，再精煉','Oxide is not a usual ore; native gold grains can be separated, then refined','native']
];
const filterNames = {all:['全部','All'], electrolysis:['電解','Electrolysis'], special:['熔融鹽反應','Molten-salt reaction'], carbon:['碳／CO','Carbon / CO'], heat:['加熱','Heating'], native:['分離／精煉','Separation / refining']};

const orePhotos = [
  ['ore-bauxite.jpg','鋁土礦','Bauxite','保留岩層紋理的鋁土礦標本','Bauxite specimen with preserved layering','鋁土礦 → 氧化鋁 Al₂O₃（提煉後）','Bauxite → alumina Al₂O₃ (after refining)','Werner Schellmann / Wikimedia Commons / CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Bauxite_specimen_with_relict_stratification._006.jpg'],
  ['ore-chalcopyrite.jpg','黃銅礦','Chalcopyrite (copper pyrite)','黃銅礦標本','Chalcopyrite specimen','CuFeS₂ · 硫化物','CuFeS₂ · sulphide','Lloyd.james0615 / Wikimedia Commons / CC BY-SA 3.0','https://commons.wikimedia.org/wiki/File:Chalcopyrite_1.jpg'],
  ['ore-haematite.jpg','赤鐵礦','Haematite','深色有光澤的赤鐵礦標本','Dark, shiny haematite specimen','Fe₂O₃ · 氧化鐵(III)','Fe₂O₃ · iron(III) oxide','Chiselwit / Wikimedia Commons / CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Hematite_or_haematite.JPG'],
  ['ore-galena.jpg','方鉛礦','Galena','德國 Schneeberg 的方鉛礦標本','Galena specimen from Schneeberg, Germany','PbS · 硫化鉛(II)','PbS · lead(II) sulphide','© Raimond Spekking / Wikimedia Commons / CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Galena._Schneeberg,_Saxony,_Germany-9002.jpg']
];

export function renderOreGallery(en) {
  const t = (zh, english) => copy(en, zh, english);
  return `<section class="panel ore-examples"><div class="panel-heading"><h2>${t('真實礦石例子','Real ore photographs')}</h2><span>${t('由外觀連結到化學成分','APPEARANCE → COMPOSITION')}</span></div><div class="ore-grid">${orePhotos.map((ore) => `<div><img src="./images/${ore[0]}" alt="${t(ore[3],ore[4])}" loading="lazy"><b>${t(ore[1],ore[2])}</b><small>${t(ore[5],ore[6])}</small><a href="${ore[8]}" target="_blank" rel="noreferrer">${ore[7]}</a></div>`).join('')}</div><p>${t('礦石是混合物，照片中的標本不代表純化合物；鋁土礦需先提煉出氧化鋁。','Ores are mixtures, not pure compounds. Bauxite must be refined to alumina first.')}</p></section>`;
}

export function renderMetalAtlas(en) {
  const t = (zh, english) => copy(en, zh, english);
  return `<section class="panel metal-atlas" aria-labelledby="metal-atlas-title">
    <div class="panel-heading"><h2 id="metal-atlas-title">${t('13 種金屬：氧化物例子與提取路線','13 metals: example oxides and extraction routes')}</h2><span>${t('按方法篩選','FILTER BY METHOD')}</span></div>
    <p class="atlas-intro">${t('化學式是氧化物例子，未必是實際原料。按活潑程度選一般路線，再點選金屬查看真正使用的礦石或熔融鹽。','Each formula is an example oxide, not necessarily the feedstock. Choose a route from reactivity, then select a metal to see its actual ore or molten salt.')}</p>
    <div class="atlas-filters" role="group" aria-label="${t('篩選提取方法','Filter extraction methods')}">${Object.entries(filterNames).map(([id,name]) => `<button type="button" data-atlas-filter="${id}" aria-pressed="${id==='all'}">${t(...name)}</button>`).join('')}</div>
    <div class="atlas-grid" id="atlas-grid">${metalAtlas.map((metal) => `<button type="button" class="atlas-metal" data-method="${metal[6]}" data-metal="${metal[0]}" aria-expanded="false"><b>${metal[0]}</b><span>${en ? metal[3] : metal[2]}</span><small class="atlas-oxide-label">${t('氧化物例子','Example oxide')}</small><code>${metal[1]}</code><small class="atlas-route-label">${t('路線','Route')}: ${t(...filterNames[metal[6]])}</small></button>`).join('')}</div>
    <div class="atlas-detail" id="atlas-detail" aria-live="polite"></div>
    <p class="atlas-caveat">${t('＊ Au₂O₃ 只用作氧化物例子，並非金礦原料。表中的氧化物不一定是實際工業原料。','* Au₂O₃ is shown only as an oxide example, not as a gold ore. Listed oxides are not always industrial feedstocks.')}</p>
  </section>`;
}

export function setupMetalAtlas(en) {
  const root = document.querySelector('.metal-atlas');
  if (!root) return;
  const t = (zh, english) => copy(en, zh, english);
  let active = null;
  const detail = root.querySelector('#atlas-detail');
  const renderDetail = (symbol) => {
    const item = metalAtlas.find((row) => row[0] === symbol);
    active = item?.[0] || null;
    root.querySelectorAll('[data-metal]').forEach((button) => button.setAttribute('aria-expanded', String(button.dataset.metal === active)));
    detail.innerHTML = item ? `<strong>${item[0]} · ${en ? item[3] : item[2]}</strong><p>${en ? item[5] : item[4]}</p>` : `<p>${t('選擇一種金屬，查看適合的提取路線。','Select a metal to see its extraction route.')}</p>`;
  };
  root.querySelectorAll('[data-metal]').forEach((button) => button.addEventListener('click', () => renderDetail(button.dataset.metal)));
  root.querySelectorAll('[data-atlas-filter]').forEach((button) => button.addEventListener('click', () => {
    const filter = button.dataset.atlasFilter;
    root.querySelectorAll('[data-atlas-filter]').forEach((chip) => chip.setAttribute('aria-pressed', String(chip === button)));
    root.querySelectorAll('[data-metal]').forEach((tile) => { tile.hidden = filter !== 'all' && tile.dataset.method !== filter; });
    if (active && filter !== 'all' && metalAtlas.find((item) => item[0] === active)?.[6] !== filter) renderDetail(null);
  }));
  renderDetail(null);
}
