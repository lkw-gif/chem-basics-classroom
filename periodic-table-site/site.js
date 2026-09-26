const lessons = [
  { id: 'map', ref: '3.1', zh: '讀懂週期表', en: 'Read the periodic table', leadZh: '每一格都有位置：原子序、族和週期。', leadEn: 'Every element has a place: atomic number, group and period.' },
  { id: 'states', ref: '3.2', zh: '元素的狀態', en: 'States of elements', leadZh: '在室溫下，有些元素是固體，有些是液體或氣體。', leadEn: 'At room temperature, elements can be solids, liquids or gases.' },
  { id: 'position', ref: '3.3', zh: '位置與電子排佈', en: 'Position and electrons', leadZh: '看看最外層電子，便能理解同族元素為何相似。', leadEn: 'Outer-shell electrons help explain why elements in one group are alike.' },
  { id: 'group1', ref: '3.4', zh: '第 I 族：鹼金屬', en: 'Group I: alkali metals', leadZh: '鋰、鈉、鉀有相似性質；向下走，反應愈來愈強。', leadEn: 'Lithium, sodium and potassium share properties; reactivity rises down the group.' },
  { id: 'group2', ref: '3.5', zh: '第 II 族：鹼土金屬', en: 'Group II: alkaline earth metals', leadZh: '用鎂、鈣與稀鹽酸的觀察，找出同族線索。', leadEn: 'Compare magnesium and calcium with dilute acid to spot a group pattern.' },
  { id: 'halogens', ref: '3.6', zh: '第 VII 族：鹵素', en: 'Group VII: halogens', leadZh: '同一族，顏色、狀態和活潑性卻會逐漸改變。', leadEn: 'One group shows a clear change in colour, state and reactivity.' },
  { id: 'noble', ref: '3.7', zh: '第 0 族：貴氣體', en: 'Group 0: noble gases', leadZh: '最外層電子已排滿，所以這些氣體很不活潑。', leadEn: 'Their outer shells are full, so these gases are very unreactive.' },
];

/** @type {[string, string, string, number[], number][]} */
const shellExamples = [
  ['H', '氫', 'Hydrogen', [1], 1], ['He', '氦', 'Helium', [2], 2],
  ['Li', '鋰', 'Lithium', [2, 1], 3], ['Be', '鈹', 'Beryllium', [2, 2], 4],
  ['B', '硼', 'Boron', [2, 3], 5], ['C', '碳', 'Carbon', [2, 4], 6],
  ['N', '氮', 'Nitrogen', [2, 5], 7], ['O', '氧', 'Oxygen', [2, 6], 8],
  ['F', '氟', 'Fluorine', [2, 7], 9], ['Ne', '氖', 'Neon', [2, 8], 10],
  ['Na', '鈉', 'Sodium', [2, 8, 1], 11], ['Mg', '鎂', 'Magnesium', [2, 8, 2], 12],
  ['Al', '鋁', 'Aluminium', [2, 8, 3], 13], ['Si', '矽', 'Silicon', [2, 8, 4], 14],
  ['P', '磷', 'Phosphorus', [2, 8, 5], 15], ['S', '硫', 'Sulphur', [2, 8, 6], 16],
  ['Cl', '氯', 'Chlorine', [2, 8, 7], 17], ['Ar', '氬', 'Argon', [2, 8, 8], 18],
  ['K', '鉀', 'Potassium', [2, 8, 8, 1], 19], ['Ca', '鈣', 'Calcium', [2, 8, 8, 2], 20],
];

const groupOne = {
  Li: { zh: '鋰', en: 'Lithium', bubbles: 6, noteZh: '在水面緩慢移動，冒出氣泡。', noteEn: 'Moves slowly on water and releases bubbles.', trend: '01' },
  Na: { zh: '鈉', en: 'Sodium', bubbles: 12, noteZh: '在水面快速移動，反應比鋰強。', noteEn: 'Moves faster on water and reacts more strongly than lithium.', trend: '02' },
  K: { zh: '鉀', en: 'Potassium', bubbles: 19, noteZh: '反應更猛烈，有時會燃起淡紫色火焰。', noteEn: 'Reacts more vigorously and may burn with a lilac flame.', trend: '03' },
};

const groupTwo = {
  Mg: { zh: '鎂', en: 'Magnesium', bubbles: 7, noteZh: '出現氣泡；產生氫氣，試管可能變暖。', noteEn: 'Bubbles of hydrogen form; the tube may warm up.' },
  Ca: { zh: '鈣', en: 'Calcium', bubbles: 16, noteZh: '氣泡較多、反應較快；也產生氫氣。', noteEn: 'More bubbles appear more quickly; hydrogen also forms.' },
  C: { zh: '碳', en: 'Carbon', bubbles: 0, noteZh: '在這個比較中，沒有明顯氣泡。碳不屬於第 II 族。', noteEn: 'No obvious bubbles in this comparison. Carbon is not in Group II.' },
};

const halogenData = {
  F: { zh: '氟', en: 'Fluorine', stateZh: '氣體', stateEn: 'Gas', colourZh: '淡黃色', colourEn: 'Pale yellow', tone: 'fluorine', number: 9, melt: '−220', boil: '−190' },
  Cl: { zh: '氯', en: 'Chlorine', stateZh: '氣體', stateEn: 'Gas', colourZh: '黃綠色', colourEn: 'Greenish yellow', tone: 'chlorine', number: 17, melt: '−101', boil: '−34' },
  Br: { zh: '溴', en: 'Bromine', stateZh: '液體', stateEn: 'Liquid', colourZh: '紅棕色', colourEn: 'Reddish brown', tone: 'bromine', number: 35, melt: '−7', boil: '58' },
  I: { zh: '碘', en: 'Iodine', stateZh: '固體', stateEn: 'Solid', colourZh: '深灰黑色', colourEn: 'Dark grey-black', tone: 'iodine', number: 53, melt: '113', boil: '184' },
};

const quizBank = {
  map: [
    { zh: '週期表按甚麼次序排列元素？', en: 'How are elements ordered in the periodic table?', optionsZh: ['原子序遞增', '名稱字母順序', '熔點遞增'], optionsEn: ['Increasing atomic number', 'Alphabetical order', 'Increasing melting point'], answer: 0, whyZh: '原子序等於質子數；週期表按原子序遞增排列。', whyEn: 'Atomic number is the number of protons; it increases across the table.' },
    { zh: '週期表中的直行叫甚麼？', en: 'What is a vertical column called?', optionsZh: ['族', '週期', '原子核'], optionsEn: ['Group', 'Period', 'Nucleus'], answer: 0, whyZh: '直行是族；橫行才是週期。', whyEn: 'A vertical column is a group; a horizontal row is a period.' },
    { zh: '矽（Si）位於金屬與非金屬之間，屬哪一類？', en: 'Silicon (Si) lies between metals and non-metals. Which type is it?', optionsZh: ['類金屬', '貴氣體', '鹼金屬'], optionsEn: ['Metalloid', 'Noble gas', 'Alkali metal'], answer: 0, whyZh: '矽是類金屬，有些性質像金屬，有些像非金屬。', whyEn: 'Silicon is a metalloid, with properties of both metals and non-metals.' },
  ],
  states: [
    { zh: '約 25 °C 時，哪一種元素是液體？', en: 'Which element is liquid at about 25 °C?', optionsZh: ['溴', '碘', '氯'], optionsEn: ['Bromine', 'Iodine', 'Chlorine'], answer: 0, whyZh: '溴在室溫下是液體；碘是固體，氯是氣體。', whyEn: 'Bromine is liquid; iodine is solid and chlorine is gas.' },
    { zh: '元素 X 的熔點 −110 °C，沸點 −40 °C。在 −70 °C 它是甚麼？', en: 'X melts at −110 °C and boils at −40 °C. What is its state at −70 °C?', optionsZh: ['液體', '固體', '氣體'], optionsEn: ['Liquid', 'Solid', 'Gas'], answer: 0, whyZh: '−70 °C 在熔點與沸點之間，所以是液體。', whyEn: '−70 °C is between the melting and boiling points, so X is liquid.' },
    { zh: '哪一組都是室溫下的氣體元素？', en: 'Which pair are both gaseous elements at room temperature?', optionsZh: ['氧、氖', '溴、氧', '汞、氖'], optionsEn: ['Oxygen and neon', 'Bromine and oxygen', 'Mercury and neon'], answer: 0, whyZh: '氧和氖都是氣體；溴和汞是液體。', whyEn: 'Oxygen and neon are gases; bromine and mercury are liquids.' },
  ],
  position: [
    { zh: '鈉的電子排佈是 2、8、1。它有多少粒最外層電子？', en: 'Sodium has arrangement 2, 8, 1. How many outer-shell electrons?', optionsZh: ['1', '2', '8'], optionsEn: ['1', '2', '8'], answer: 0, whyZh: '最後一個數字 1，就是最外層電子數。', whyEn: 'The last number, 1, is the number in the outer shell.' },
    { zh: '鈉有 3 個已佔用電子層，位於第幾週期？', en: 'Sodium has three occupied shells. Which period is it in?', optionsZh: ['第 3 週期', '第 1 週期', '第 8 週期'], optionsEn: ['Period 3', 'Period 1', 'Period 8'], answer: 0, whyZh: '已佔用電子層數等於週期數。', whyEn: 'The number of occupied shells gives the period.' },
    { zh: '鈉與鉀化學性質相似，主要因為甚麼？', en: 'Why do sodium and potassium have similar chemical properties?', optionsZh: ['最外層各有 1 粒電子', '原子序相同', '電子層數相同'], optionsEn: ['Both have one outer electron', 'Same atomic number', 'Same number of shells'], answer: 0, whyZh: '同族元素的最外層電子數相同。', whyEn: 'Elements in the same group have the same number of outer-shell electrons.' },
  ],
  group1: [
    { zh: '鋰、鈉、鉀都要存放在哪裏，減少與空氣反應？', en: 'Where are lithium, sodium and potassium stored to limit reaction with air?', optionsZh: ['油中', '水中', '開口碟中'], optionsEn: ['Under oil', 'In water', 'In an open dish'], answer: 0, whyZh: '鹼金屬活潑，常存放在油中。', whyEn: 'Alkali metals are reactive and are commonly stored under oil.' },
    { zh: '鹼金屬與水反應會產生哪種氣體？', en: 'Which gas is released when an alkali metal reacts with water?', optionsZh: ['氫氣', '氧氣', '氯氣'], optionsEn: ['Hydrogen', 'Oxygen', 'Chlorine'], answer: 0, whyZh: '反應產生氫氣和鹼性溶液。', whyEn: 'The reaction produces hydrogen and an alkaline solution.' },
    { zh: '鋰、鈉、鉀之中，哪個與水反應最強？', en: 'Which reacts most strongly with water: lithium, sodium or potassium?', optionsZh: ['鉀', '鈉', '鋰'], optionsEn: ['Potassium', 'Sodium', 'Lithium'], answer: 0, whyZh: '第 I 族向下，活潑性增加：鋰 < 鈉 < 鉀。', whyEn: 'Reactivity rises down Group I: lithium < sodium < potassium.' },
  ],
  group2: [
    { zh: '鎂和鈣與稀鹽酸反應，會產生甚麼氣體？', en: 'Which gas forms when magnesium and calcium react with dilute hydrochloric acid?', optionsZh: ['氫氣', '氧氣', '氮氣'], optionsEn: ['Hydrogen', 'Oxygen', 'Nitrogen'], answer: 0, whyZh: '兩種金屬都產生氫氣；這是同族性質相似的例子。', whyEn: 'Both metals produce hydrogen, showing a similar group property.' },
    { zh: '鎂的電子排佈是 2、8、2。最外層有多少粒電子？', en: 'Magnesium has arrangement 2, 8, 2. How many outer electrons?', optionsZh: ['2', '8', '12'], optionsEn: ['2', '8', '12'], answer: 0, whyZh: '最後一層有 2 粒電子，對應第 II 族。', whyEn: 'Two electrons are in the outer shell, matching Group II.' },
    { zh: '鎂與鈣之間，哪一種通常較活潑？', en: 'Which is generally more reactive: magnesium or calcium?', optionsZh: ['鈣', '鎂', '一樣'], optionsEn: ['Calcium', 'Magnesium', 'The same'], answer: 0, whyZh: '第 II 族向下，活潑性增加。', whyEn: 'Reactivity increases down Group II.' },
  ],
  halogens: [
    { zh: '室溫下，哪一種鹵素是液體？', en: 'Which halogen is liquid at room temperature?', optionsZh: ['溴', '氯', '碘'], optionsEn: ['Bromine', 'Chlorine', 'Iodine'], answer: 0, whyZh: '溴是紅棕色液體；氯是氣體，碘是固體。', whyEn: 'Bromine is a reddish-brown liquid; chlorine is gas and iodine is solid.' },
    { zh: '第 VII 族由氟往碘走，活潑性怎樣改變？', en: 'How does reactivity change from fluorine down to iodine?', optionsZh: ['降低', '增加', '不變'], optionsEn: ['Decreases', 'Increases', 'Stays the same'], answer: 0, whyZh: '鹵素向下，活潑性逐漸降低。', whyEn: 'Halogen reactivity decreases down the group.' },
    { zh: '碘在第 5 週期；它下面的砈（At）在第幾週期？', en: 'Iodine is in Period 5. Astatine (At) is below it. Which period is At in?', optionsZh: ['第 6 週期', '第 5 週期', '第 4 週期'], optionsEn: ['Period 6', 'Period 5', 'Period 4'], answer: 0, whyZh: '砈位於碘的下一個橫行，即第 6 週期。', whyEn: 'Astatine is in the next row below iodine: Period 6.' },
  ],
  noble: [
    { zh: '氦的第一個電子層有多少粒電子便排滿？', en: 'How many electrons fill helium’s first shell?', optionsZh: ['2', '8', '18'], optionsEn: ['2', '8', '18'], answer: 0, whyZh: '第一層最多容納 2 粒電子，氦剛好有 2 粒。', whyEn: 'The first shell holds at most two electrons, and helium has two.' },
    { zh: '哪種氣體常用於廣告霓虹燈？', en: 'Which gas is used in neon advertising signs?', optionsZh: ['氖', '氦', '氬'], optionsEn: ['Neon', 'Helium', 'Argon'], answer: 0, whyZh: '氖通電時發出橙紅色光。', whyEn: 'Neon gives an orange-red glow when electricity passes through it.' },
    { zh: '氬可用來填充燈泡，主要因為甚麼？', en: 'Why can argon be used to fill light bulbs?', optionsZh: ['不易與熱燈絲反應', '容易燃燒', '密度最低'], optionsEn: ['It hardly reacts with a hot filament', 'It burns easily', 'It has the lowest density'], answer: 0, whyZh: '氬很不活潑，不易與燈絲反應。', whyEn: 'Argon is very unreactive and hardly reacts with the filament.' },
  ],
};

const queryLanguage = new URL(location.href).searchParams.get('lang');
const language = queryLanguage === 'en' || queryLanguage === 'zh'
  ? queryLanguage : localStorage.getItem('periodic-table-language') === 'en' ? 'en' : 'zh';
const en = language === 'en';
const t = (zh, english) => en ? english : zh;
const lessonId = location.pathname.match(/\/sessions\/([a-z0-9]+)\/?$/)?.[1];
const activeLesson = lessons.find((lesson) => lesson.id === lessonId);
const lessonUrl = (id) => `./sessions/${id}/?lang=${language}`;
const homeUrl = `./?lang=${language}`;

function atomDiagram(symbol, arrangement) {
  const center = 145;
  const radii = [42, 77, 110, 135];
  const circles = arrangement.map((count, shell) => {
    const radius = radii[shell];
    const dots = Array.from({ length: count }, (_, index) => {
      const angle = (-90 + index * 360 / count) * Math.PI / 180;
      return `<circle class="electron-dot" cx="${(center + Math.cos(angle) * radius).toFixed(1)}" cy="${(center + Math.sin(angle) * radius).toFixed(1)}" r="5" />`;
    }).join('');
    return `<circle class="electron-shell" cx="${center}" cy="${center}" r="${radius}"/>${dots}`;
  }).join('');
  return `<svg class="atom-diagram" viewBox="0 0 290 290" role="img" aria-label="${t(`${symbol} 原子電子層示意圖：${arrangement.join('、')}`, `${symbol} atom shell diagram: ${arrangement.join(', ')}`)}"><circle class="atom-core" cx="145" cy="145" r="25"/><text class="atom-core-label" x="145" y="151" text-anchor="middle">${symbol}</text>${circles}</svg>`;
}

function quizMarkup(id) {
  return `<section class="quiz panel" aria-labelledby="quiz-title"><div class="quiz-header"><span class="eyebrow">CHECKPOINT</span><h2 id="quiz-title">${t('小測一下', 'Quick check')}</h2><span class="quiz-count">${id.toUpperCase()} / 03</span></div>${quizBank[id].map((item, index) => {
    const choices = (en ? item.optionsEn : item.optionsZh).map((option, original) => ({ option, original }));
    const rotated = choices.map((_, display) => choices[(display + index) % choices.length]);
    return `<div class="quiz-item"><h3><span>${String(index + 1).padStart(2, '0')}</span>${t(item.zh, item.en)}</h3><div class="quiz-choices" role="group" aria-label="${t(item.zh, item.en)}">${rotated.map(({ option, original }, display) => `<button type="button" data-question="${index}" data-choice="${original}" aria-pressed="false"><small>${'ABC'[display]}</small>${option}</button>`).join('')}</div><p class="quiz-feedback" id="feedback-${index}" aria-live="polite"></p></div>`;
  }).join('')}</section>`;
}

function picture(src, alt, caption) {
  return `<figure class="photo-card"><img src="${src}" alt="${alt}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
}

function renderHome() {
  return `<div class="home-hero"><div><span class="eyebrow">S3 CHEMISTRY · UNIT 03</span><h1>${t('元素週期表，<br><em>一張有規律的地圖。</em>', 'The periodic table:<br><em>a map with a pattern.</em>')}</h1><p>${t('由元素的位置出發，看懂電子排佈和四個重要的族。七個短課題，每課都有三道題。', 'Start with an element’s position, then connect electron shells to four important groups. Seven short lessons, each with three questions.')}</p><a class="primary-link" href="${lessonUrl('map')}">${t('由第一課開始', 'Start lesson one')} <span aria-hidden="true">→</span></a></div><div class="hero-tiles" aria-hidden="true"><span class="tile-one">Li<small>3</small></span><span class="tile-two">Na<small>11</small></span><span class="tile-three">K<small>19</small></span><span class="hero-arrow">↓</span><b>${t('同族，相似性質', 'Same group, similar properties')}</b></div></div><div class="catalog-heading"><div><span class="eyebrow">UNIT 03 / 7 LESSONS</span><h2>${t('選一課開始', 'Choose a lesson')}</h2></div><span>07 / 07</span></div><div class="catalog-grid">${lessons.map((lesson, index) => `<a class="catalog-card" href="${lessonUrl(lesson.id)}"><span class="catalog-number">${String(index + 1).padStart(2, '0')}</span><div><small>${lesson.ref}</small><b>${en ? lesson.en : lesson.zh}</b><p>${en ? lesson.leadEn : lesson.leadZh}</p></div><span class="catalog-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><p class="home-source">${t('依據 2022–23 Unit 3 學生筆記整理；模型與反應圖為教學示意。', 'Adapted from the 2022–23 Unit 3 student notes; models and reaction diagrams are simplified for teaching.')}</p>`;
}

function renderMap() {
  return `<div class="concept-grid"><article class="mini-concept panel"><span>01</span><h3>${t('原子序', 'Atomic number')}</h3><p>${t('格子中的數字＝原子的質子數；由左至右逐漸增加。', 'The number in each box equals the number of protons. It rises across the table.')}</p></article><article class="mini-concept panel"><span>02</span><h3>${t('族：直行', 'Group: column')}</h3><p>${t('同一族的元素通常有相似化學性質。', 'Elements in the same group usually have similar chemical properties.')}</p></article><article class="mini-concept panel"><span>03</span><h3>${t('週期：橫行', 'Period: row')}</h3><p>${t('同一週期的原子有相同數目的已佔用電子層。', 'Atoms in one period have the same number of occupied electron shells.')}</p></article></div><section class="panel table-panel"><div class="panel-heading"><h2>${t('首 36 種元素', 'The first 36 elements')}</h2><span>${t('選一格，看看它的族和週期', 'Select a box to see its group and period')}</span></div><div class="periodic-scroll" role="region" tabindex="0" aria-label="${t('首 36 種元素週期表', 'Periodic table of the first 36 elements')}"><div class="periodic-grid" id="periodic-grid"><p>${t('正在載入週期表…', 'Loading periodic table…')}</p></div></div><div class="map-legend"><span><i class="metal"></i>${t('金屬', 'Metal')}</span><span><i class="metalloid"></i>${t('類金屬', 'Metalloid')}</span><span><i class="nonmetal"></i>${t('非金屬', 'Non-metal')}</span></div><div class="periodic-detail" id="periodic-detail" aria-live="polite"></div></section><div class="group-map"><div><strong>I / 1</strong><span>${t('鹼金屬', 'Alkali metals')}</span></div><div><strong>II / 2</strong><span>${t('鹼土金屬', 'Alkaline earth metals')}</span></div><div><strong>VII / 17</strong><span>${t('鹵素', 'Halogens')}</span></div><div><strong>0 / 18</strong><span>${t('貴氣體', 'Noble gases')}</span></div></div><p class="teaching-note">${t('本課沿用 notes 的 I、II、VII、0 族名稱；現代週期表也會寫作第 1、2、17、18 族。中間區域有過渡金屬，金屬與非金屬邊界有類金屬。', 'These notes use Groups I, II, VII and 0. Modern numbering calls them Groups 1, 2, 17 and 18. Transition metals occupy the middle; metalloids lie near the metal/non-metal boundary.')}</p>`;
}

function phaseBadge(state) {
  const labels = { solid: ['固體', 'Solid'], liquid: ['液體', 'Liquid'], gas: ['氣體', 'Gas'] };
  return `<span class="state-badge ${state}">${t(...labels[state])}</span>`;
}

function renderStates() {
  const rows = [
    ['W', '−189', '−186', 'gas', 'gas'], ['X', '−110', '−40', 'gas', 'liquid'],
    ['Y', '−7', '58', 'liquid', 'solid'], ['Z', '650', '1120', 'solid', 'solid'],
  ];
  return `<div class="two-photo-grid">${picture('../images/mercury-example.png', 'Shiny drops of liquid mercury', `<b>Hg · ${t('汞', 'Mercury')}</b><span>${t('室溫下的液體金屬', 'A liquid metal at room temperature')}</span>`)}${picture('../images/bromine-example.png', 'Reddish-brown liquid bromine in a glass ampoule', `<b>Br · ${t('溴', 'Bromine')}</b><span>${t('室溫下的液體非金屬', 'A liquid non-metal at room temperature')}</span>`)}</div><div class="panel simple-panel"><h2>${t('室溫約 25 °C', 'About 25 °C')}</h2><div class="state-summary"><div>${phaseBadge('liquid')}<p>${t('兩種液體元素：汞、溴。', 'Two liquid elements: mercury and bromine.')}</p></div><div>${phaseBadge('gas')}<p>${t('五種氣體元素：氫、氮、氧、氟、氯；再加六種貴氣體。', 'Five gaseous elements: hydrogen, nitrogen, oxygen, fluorine and chlorine; plus six noble gases.')}</p></div><div>${phaseBadge('solid')}<p>${t('其餘天然元素一般是固體。', 'The other naturally occurring elements are generally solids.')}</p></div></div></div><section class="panel table-panel"><div class="panel-heading"><h2>${t('比較溫度與熔點、沸點', 'Compare temperature with melting and boiling points')}</h2><span>${t('notes 第 3 頁的 W、X、Y、Z 例子', 'W, X, Y and Z from notes page 3')}</span></div><div class="phase-rule"><span>${t('低於熔點', 'Below melting')}</span><b>${t('固體', 'Solid')}</b><i>→</i><span>${t('兩點之間', 'Between points')}</span><b>${t('液體', 'Liquid')}</b><i>→</i><span>${t('高於沸點', 'Above boiling')}</span><b>${t('氣體', 'Gas')}</b></div><div class="table-scroll"><table class="data-table"><thead><tr><th scope="col">${t('元素', 'Element')}</th><th scope="col">${t('熔點 °C', 'Melting °C')}</th><th scope="col">${t('沸點 °C', 'Boiling °C')}</th><th scope="col">25 °C</th><th scope="col">−70 °C</th></tr></thead><tbody>${rows.map(([name, melt, boil, room, cold]) => `<tr><th scope="row">${name}</th><td>${melt}</td><td>${boil}</td><td>${phaseBadge(room)}</td><td>${phaseBadge(cold)}</td></tr>`).join('')}</tbody></table></div><p class="worked-example"><b>X</b>${t('−110 °C ＜ −70 °C ＜ −40 °C，所以 X 在 −70 °C 是液體。', '−110 °C < −70 °C < −40 °C, so X is liquid at −70 °C.')}</p></section><p class="teaching-note">${t('判斷前先看溫度。恰好在熔點或沸點時，兩種狀態可以同時存在；以上比較假設氣壓不變。', 'Check the temperature first. At the exact melting or boiling point, two states can coexist; this comparison assumes constant pressure.')}</p>`;
}

function groupNumber(element) {
  if (element[0] === 'He' || element[0] === 'Ne' || element[0] === 'Ar') return '0 / 18';
  const outer = element[3].at(-1);
  return `${['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', '0'][outer]} / ${outer <= 2 ? outer : outer + 10}`;
}

function renderPosition() {
  return `<div class="concept-grid"><article class="mini-concept panel"><span>GROUP</span><h3>${t('直行 → 最外層電子', 'Column → outer electrons')}</h3><p>${t('主族元素的舊式族數 I–VII，對應最外層電子數。第 0 族較特別。', 'For main-group elements, old group numbers I–VII match outer-electron counts. Group 0 is special.')}</p></article><article class="mini-concept panel"><span>PERIOD</span><h3>${t('橫行 → 電子層數', 'Row → number of shells')}</h3><p>${t('一個原子有幾層已佔用電子層，就在第幾週期。', 'The number of occupied shells gives the period.')}</p></article><article class="mini-concept panel"><span>PATTERN</span><h3>${t('同族 → 性質相似', 'Same group → similar')}</h3><p>${t('最外層電子數相同，是同族元素性質相似的重要原因。', 'The same outer-electron count helps explain similar chemical properties.')}</p></article></div><section class="panel explorer-panel"><div class="panel-heading"><h2>${t('選一種元素，觀察電子層', 'Choose an element and inspect its shells')}</h2><span>${t('首 20 種元素 · 簡化模型', 'First 20 elements · simplified model')}</span></div><div class="explorer-grid"><div class="element-picker" id="element-picker" role="group" aria-label="${t('選擇元素', 'Choose an element')}">${shellExamples.map(([symbol, nameZh, nameEn]) => `<button type="button" data-atom="${symbol}" aria-pressed="${symbol === 'Na' ? 'true' : 'false'}"><strong>${symbol}</strong><small>${t(nameZh, nameEn)}</small></button>`).join('')}</div><div class="shell-display" id="shell-display" aria-live="polite"></div></div></section><div class="compare-strip"><div><strong>Na</strong><span>2, 8, 1</span></div><div><strong>K</strong><span>2, 8, 8, 1</span></div><p>${t('鈉與鉀最外層都有 1 粒電子，所以同屬第 I 族；電子層數不同，所以在不同週期。', 'Sodium and potassium each have one outer electron, so both are in Group I. Different shell counts place them in different periods.')}</p></div>`;
}

function reactionBubbles(count) {
  return Array.from({ length: count }, (_, index) => `<i class="reaction-bubble" style="--x:${8 + (index * 37) % 83}%;--delay:${(index % 7) * -0.42}s;--size:${5 + index % 4}px" aria-hidden="true"></i>`).join('');
}

function renderGroupOne() {
  return `<div class="group-intro-grid"><div class="panel simple-panel"><span class="eyebrow">Li · Na · K</span><h2>${t('它們有甚麼相同？', 'What do they share?')}</h2><div class="fact-list"><p>${t('最外層各有 1 粒電子。', 'One electron in the outer shell.')}</p><p>${t('質地較軟；剛切開時有銀色光澤。', 'Soft metals with a silvery shine when freshly cut.')}</p><p>${t('鋰、鈉、鉀密度低，可浮在水面。', 'Lithium, sodium and potassium are low-density and float on water.')}</p><p>${t('活潑，通常存放在油中。', 'Reactive, so usually stored under oil.')}</p></div></div><div class="panel trend-card"><span class="eyebrow">GROUP I</span><h2>${t('向下，活潑性增加', 'More reactive down the group')}</h2><div class="trend-stack"><span>Li <small>${t('鋰', 'Lithium')}</small></span><i>↓</i><span>Na <small>${t('鈉', 'Sodium')}</small></span><i>↓</i><span>K <small>${t('鉀', 'Potassium')}</small></span></div></div></div><section class="panel reaction-panel"><div class="panel-heading"><h2>${t('觀察與水反應的示意圖', 'Compare reactions with water')}</h2><span>${t('按元素比較現象', 'Select an element to compare')}</span></div><div class="selector-row" role="group" aria-label="${t('選擇鹼金屬', 'Choose an alkali metal')}">${Object.entries(groupOne).map(([symbol, item]) => `<button type="button" data-alkali="${symbol}" aria-pressed="${symbol === 'Li'}"><strong>${symbol}</strong><small>${t(item.zh, item.en)}</small></button>`).join('')}</div><div class="reaction-layout"><div class="water-stage" id="water-stage" role="img" aria-label="${t('金屬與水反應示意圖', 'Simplified metal and water reaction model')}"><div class="water-surface"></div><div class="metal-piece" id="water-metal">Li</div><div id="water-bubbles"></div></div><div class="reaction-copy" id="water-copy" aria-live="polite"></div></div><div class="reaction-equation">${t('鹼金屬 ＋ 水 → 氫氣 ＋ 鹼性溶液', 'Alkali metal + water → hydrogen + alkaline solution')}</div></section><p class="teaching-note">${t('這是教學示意，並非可在家進行的實驗；鹼金屬與水的反應須由教師在合適設施示範。', 'This is a teaching model. Reactions of alkali metals with water require a properly equipped teacher demonstration.')}</p>`;
}

function renderGroupTwo() {
  return `<div class="group-intro-grid"><div class="panel simple-panel"><span class="eyebrow">Mg · Ca</span><h2>${t('同族的兩個例子', 'Two members of one group')}</h2><p>${t('鎂和鈣都在第 II 族，最外層各有 2 粒電子。它們與稀鹽酸反應，會產生氫氣。', 'Magnesium and calcium are in Group II, with two outer electrons each. Both release hydrogen when reacting with dilute hydrochloric acid.')}</p><div class="number-cards"><div><b>Mg</b><span>2, 8, 2</span></div><div><b>Ca</b><span>2, 8, 8, 2</span></div></div></div><div class="panel trend-card"><span class="eyebrow">GROUP II</span><h2>${t('向下，活潑性增加', 'More reactive down the group')}</h2><div class="trend-stack"><span>Be <small>${t('鈹', 'Beryllium')}</small></span><i>↓</i><span>Mg <small>${t('鎂', 'Magnesium')}</small></span><i>↓</i><span>Ca <small>${t('鈣', 'Calcium')}</small></span></div><p>${t('在這個基礎比較中，第 II 族一般不及第 I 族活潑。', 'In this basic comparison, Group II is generally less reactive than Group I.')}</p></div></div><section class="panel reaction-panel"><div class="panel-heading"><h2>${t('三支試管：找出同族線索', 'Three tubes: find the group pattern')}</h2><span>${t('稀鹽酸相同，改變加入的元素', 'Same dilute acid, different elements')}</span></div><div class="selector-row" role="group" aria-label="${t('選擇試管中的元素', 'Choose the element in the tube')}">${Object.entries(groupTwo).map(([symbol, item]) => `<button type="button" data-acid="${symbol}" aria-pressed="${symbol === 'Mg'}"><strong>${symbol}</strong><small>${t(item.zh, item.en)}</small></button>`).join('')}</div><div class="reaction-layout"><div class="tube-stage" id="tube-stage" role="img" aria-label="${t('試管觀察示意圖', 'Simplified test tube observation')}"><div class="test-tube"><div class="acid-liquid"></div><div class="sample-pieces" id="sample-pieces"></div><div id="acid-bubbles"></div></div><span class="tube-label">${t('稀鹽酸', 'Dilute HCl')}</span></div><div class="reaction-copy" id="acid-copy" aria-live="polite"></div></div><div class="reaction-equation">${t('鎂／鈣 ＋ 稀鹽酸 → 氫氣 ＋ 新物質', 'Magnesium/calcium + dilute hydrochloric acid → hydrogen + a new substance')}</div></section><p class="teaching-note">${t('這是根據 notes 的實驗設計而成的觀察示意；酸與金屬操作須由教師指導。碳作對照，不代表所有非金屬都沒有反應。', 'This is a simplified model of the notes experiment. Acid and metal work needs teacher supervision. Carbon is a comparison here; it does not represent every non-metal.')}</p>`;
}

function renderHalogens() {
  return `<div class="halogen-intro"><div class="panel simple-panel"><span class="eyebrow">GROUP VII / 17</span><h2>${t('四種常見鹵素', 'Four familiar halogens')}</h2><p>${t('它們都是非金屬，最外層有 7 粒電子。由上而下，顏色加深，室溫狀態由氣體轉成液體、再到固體。', 'They are non-metals with seven outer electrons. Down the group, colour deepens and room-temperature state changes from gas to liquid to solid.')}</p></div><div class="panel trend-card"><span class="eyebrow">REACTIVITY</span><h2>${t('向下，活潑性降低', 'Less reactive down the group')}</h2><div class="trend-stack"><span>F <small>${t('氟', 'Fluorine')}</small></span><i>↓</i><span>Cl <small>${t('氯', 'Chlorine')}</small></span><i>↓</i><span>Br <small>${t('溴', 'Bromine')}</small></span><i>↓</i><span>I <small>${t('碘', 'Iodine')}</small></span></div></div></div><section class="panel halogen-panel"><div class="panel-heading"><h2>${t('選一種鹵素，比較外觀', 'Choose a halogen and compare')}</h2><span>${t('顏色塊是簡化示意', 'Colour blocks are simplified illustrations')}</span></div><div class="selector-row" role="group" aria-label="${t('選擇鹵素', 'Choose a halogen')}">${Object.entries(halogenData).map(([symbol, item]) => `<button type="button" data-halo="${symbol}" aria-pressed="${symbol === 'Cl'}"><strong>${symbol}</strong><small>${t(item.zh, item.en)}</small></button>`).join('')}</div><div class="halogen-detail" id="halogen-detail" aria-live="polite"></div><div class="table-scroll"><table class="data-table"><thead><tr><th>${t('元素', 'Element')}</th><th>${t('室溫狀態', 'State at room temp.')}</th><th>${t('熔點 °C', 'Melting °C')}</th><th>${t('沸點 °C', 'Boiling °C')}</th></tr></thead><tbody>${Object.entries(halogenData).map(([symbol, item]) => `<tr><th scope="row">${symbol} · ${t(item.zh, item.en)}</th><td>${t(item.stateZh, item.stateEn)}</td><td>${item.melt}</td><td>${item.boil}</td></tr>`).join('')}</tbody></table></div></section><div class="panel prediction-card"><span class="eyebrow">LOOK AHEAD</span><h2>${t('推測砈（At）', 'Predict astatine (At)')}</h2><p>${t('砈在碘的下一行，同屬第 VII 族。因此可以肯定它位於第 6 週期、最外層有 7 粒電子；其反應強弱可按同族趨勢作推測。', 'Astatine is below iodine in Group VII. Its position tells us it is in Period 6 with seven outer electrons; its reactivity can be predicted from the group trend.')}</p></div>`;
}

function renderNoble() {
  return `<div class="panel simple-panel noble-intro"><span class="eyebrow">GROUP 0 / 18</span><h2>${t('外層已排滿', 'A full outer shell')}</h2><p>${t('氦的第一層有 2 粒電子，已排滿。氖和氬的最外層有 8 粒電子，也已排滿，所以它們很不活潑。這與 notes 提到的「八隅體規則」有關。', 'Helium’s first shell is full with two electrons. Neon and argon have eight electrons in their full outer shells, making them very unreactive. This connects to the “octet rule” in the notes.')}</p></div><section class="panel explorer-panel"><div class="panel-heading"><h2>${t('比較三種貴氣體', 'Compare three noble gases')}</h2><span>${t('選擇元素查看電子排佈', 'Select an element to see its shells')}</span></div><div class="selector-row" role="group" aria-label="${t('選擇貴氣體', 'Choose a noble gas')}">${['He', 'Ne', 'Ar'].map((symbol) => `<button type="button" data-noble="${symbol}" aria-pressed="${symbol === 'Ne'}"><strong>${symbol}</strong><small>${t(shellExamples.find((item) => item[0] === symbol)[1], shellExamples.find((item) => item[0] === symbol)[2])}</small></button>`).join('')}</div><div class="noble-display" id="noble-display" aria-live="polite"></div></section><div class="use-grid"><article class="panel use-card"><div class="use-art balloon-art" aria-hidden="true"><i></i><i></i><i></i></div><h3>He · ${t('氦', 'Helium')}</h3><p>${t('密度低，又不活潑，可用來填充氣球。', 'Low density and low reactivity make it useful in balloons.')}</p></article><article class="panel use-card"><div class="use-art neon-art" aria-hidden="true">NEON</div><h3>Ne · ${t('氖', 'Neon')}</h3><p>${t('通電時可發出橙紅色光，適合招牌。', 'An electric current makes it glow orange-red in signs.')}</p></article><article class="panel use-card"><div class="use-art bulb-art" aria-hidden="true"><i></i></div><h3>Ar · ${t('氬', 'Argon')}</h3><p>${t('不易和燈泡的熱燈絲反應。', 'It hardly reacts with a hot light-bulb filament.')}</p></article></div><p class="teaching-note">${t('第 0 族還包括氪（Kr）、氙（Xe）和氡（Rn）；它們在室溫下都是氣體。', 'Group 0 also includes krypton (Kr), xenon (Xe) and radon (Rn); all are gases at room temperature.')}</p>`;
}

const pages = { map: renderMap, states: renderStates, position: renderPosition, group1: renderGroupOne, group2: renderGroupTwo, halogens: renderHalogens, noble: renderNoble };

function lessonMarkup(lesson) {
  const index = lessons.indexOf(lesson);
  const previous = index > 0 ? lessons[index - 1] : null;
  const next = lessons[index + 1];
  return `<div class="breadcrumb"><a href="${homeUrl}">${t('中三化學', 'Form 3 Chemistry')}</a><span>/</span><b>${en ? lesson.en : lesson.zh}</b><span class="breadcrumb-count">${String(index + 1).padStart(2, '0')} / 07</span></div><div class="lesson-heading"><span class="eyebrow">${String(index + 1).padStart(2, '0')} / ${lesson.ref.toUpperCase()}</span><h1>${en ? lesson.en : lesson.zh}</h1><p>${en ? lesson.leadEn : lesson.leadZh}</p></div>${pages[lesson.id]()}${quizMarkup(lesson.id)}<div class="lesson-pager">${previous ? `<a href="${lessonUrl(previous.id)}">← ${t('上一課', 'Previous lesson')}</a>` : `<a href="${homeUrl}">← ${t('課程首頁', 'Lesson home')}</a>`}${next ? `<a class="next-link" href="${lessonUrl(next.id)}">${t('下一課', 'Next lesson')} →</a>` : `<a class="next-link" href="${homeUrl}">${t('完成 · 返回目錄', 'Finish · all lessons')} ✓</a>`}</div><footer class="site-footer">${t('根據 2022–23 Unit 3《元素週期表》學生筆記整理。圖示為簡化教學模型。', 'Based on the 2022–23 Unit 3 Periodic Table student notes. Diagrams are simplified teaching models.')} <a href="https://iupac.org/what-we-do/periodic-table-of-elements/" target="_blank" rel="noreferrer">IUPAC ↗</a></footer>`;
}

function renderShell() {
  document.documentElement.lang = en ? 'en' : 'zh-Hant-HK';
  document.title = activeLesson ? `${en ? activeLesson.en : activeLesson.zh} · ${t('元素週期表', 'Periodic Table')}` : `${t('元素週期表', 'Periodic Table')} · CHEM Explore`;
  localStorage.setItem('periodic-table-language', language);
  document.querySelector('#skip-link').textContent = t('跳到課堂內容', 'Skip to lesson');
  document.querySelector('#skip-link').href = `${location.pathname}${location.search}#main`;
  document.querySelector('#course-label').textContent = t('S3 · 元素週期表', 'S3 · PERIODIC TABLE');
  document.querySelector('#side-heading').innerHTML = `<span>UNIT 03</span><b>${t('元素週期表', 'Periodic Table')}</b><small>07</small>`;
  document.querySelector('#brand-link').href = homeUrl;
  document.querySelector('#previous-unit-link').href = `../atomic-structure/?lang=${language}`;
  document.querySelector('#previous-unit-link').textContent = t('← 返回原子結構', '← Back to Atomic Structure');
  document.querySelector('#lesson-nav').innerHTML = lessons.map((lesson, index) => `<a href="${lessonUrl(lesson.id)}" ${activeLesson?.id === lesson.id ? 'aria-current="page"' : ''}><span>${String(index + 1).padStart(2, '0')}</span><b>${en ? lesson.en : lesson.zh}</b><i>${lesson.ref}</i></a>`).join('');
  document.querySelectorAll('[data-language]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  document.querySelector('#main').innerHTML = activeLesson ? lessonMarkup(activeLesson) : renderHome();
  const viewed = new Set(JSON.parse(localStorage.getItem('periodic-table-viewed') || '[]'));
  if (activeLesson) viewed.add(activeLesson.id);
  localStorage.setItem('periodic-table-viewed', JSON.stringify([...viewed]));
  document.querySelector('#progress-label').textContent = t('已瀏覽', 'Topics viewed');
  document.querySelector('#progress-count').textContent = `${viewed.size} / 7`;
  document.querySelector('#progress-fill').style.width = `${viewed.size / lessons.length * 100}%`;
  document.querySelectorAll('#lesson-nav a').forEach((link) => {
    const id = link.href.match(/\/sessions\/([a-z0-9]+)\//)?.[1];
    if (viewed.has(id) && id !== activeLesson?.id) link.classList.add('viewed');
  });
}

function setupQuiz() {
  if (!activeLesson) return;
  document.querySelectorAll('[data-question]').forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.question);
    const choice = Number(button.dataset.choice);
    const item = quizBank[activeLesson.id][index];
    const group = button.parentElement;
    group.querySelectorAll('button').forEach((candidate) => {
      candidate.setAttribute('aria-pressed', String(candidate === button));
      candidate.classList.toggle('correct', Number(candidate.dataset.choice) === item.answer && candidate === button);
      candidate.classList.toggle('incorrect', candidate === button && choice !== item.answer);
    });
    const feedback = document.querySelector(`#feedback-${index}`);
    feedback.className = `quiz-feedback ${choice === item.answer ? 'right' : 'try-again'}`;
    feedback.textContent = `${choice === item.answer ? t('答對了。', 'Correct. ') : t('再想想。', 'Try again. ')} ${t(item.whyZh, item.whyEn)}`;
  }));
}

async function setupMap() {
  const grid = document.querySelector('#periodic-grid');
  if (!grid) return;
  try {
    const response = await fetch('./periodic-elements.json');
    if (!response.ok) throw new Error('Periodic element data unavailable');
    const elements = (await response.json()).filter((element) => element.atomicNumber <= 36);
    grid.innerHTML = elements.map((element) => `<button type="button" class="element-cell ${element.category === 'metalloid' ? 'cat-metalloid' : element.category === 'metal' ? 'cat-metal' : 'cat-nonmetal'}" style="grid-column:${element.column};grid-row:${element.period}" data-element="${element.atomicNumber}" aria-pressed="false" aria-label="${element.atomicNumber} ${element.symbol} ${en ? element.nameEn : `${element.nameZh} ${element.nameEn}`}"><small>${element.atomicNumber}</small><strong>${element.symbol}</strong><span>${en ? element.nameEn : element.nameZh}</span></button>`).join('');
    const show = (number) => {
      const element = elements.find((item) => item.atomicNumber === number);
      if (!element) return;
      grid.querySelectorAll('button').forEach((button) => {
        const item = elements.find((candidate) => candidate.atomicNumber === Number(button.dataset.element));
        button.setAttribute('aria-pressed', String(item === element));
        button.classList.toggle('same-group', item.column === element.column && item !== element);
        button.classList.toggle('same-period', item.period === element.period && item !== element);
      });
      const oldGroup = element.column === 18 ? '0' : element.column <= 2 ? ['', 'I', 'II'][element.column] : element.column >= 13 ? ['III', 'IV', 'V', 'VI', 'VII'][element.column - 13] : '';
      const groupText = oldGroup ? `${oldGroup} / ${element.column}` : `${element.column}`;
      document.querySelector('#periodic-detail').innerHTML = `<div class="detail-symbol"><small>${element.atomicNumber}</small><strong>${element.symbol}</strong></div><div><h3>${en ? element.nameEn : `${element.nameZh} · ${element.nameEn}`}</h3><p>${t('原子序', 'Atomic number')} <b>${element.atomicNumber}</b> · ${t('第', 'Period')} <b>${element.period}</b> ${t('週期', '')} · ${t('族', 'Group')} <b>${groupText}</b></p><small>${t('同色直行＝同族；同色橫行＝同週期。', 'Highlighted column = same group; highlighted row = same period.')}</small></div>`;
    };
    grid.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => show(Number(button.dataset.element))));
    show(11);
  } catch {
    grid.innerHTML = `<p class="load-error">${t('週期表暫時未能載入。', 'The periodic table could not be loaded.')}</p>`;
  }
}

function showShell(symbol, target) {
  const item = shellExamples.find((element) => element[0] === symbol);
  const [short, nameZh, nameEn, shells, number] = item;
  target.innerHTML = `${atomDiagram(short, shells)}<div class="shell-facts"><div class="selected-element"><b>${short}</b><span>${t(nameZh, nameEn)}</span></div><p>${t('電子排佈', 'Electron arrangement')} <strong>${shells.join(', ')}</strong></p><p>${t('最外層電子', 'Outer electrons')} <strong>${shells.at(-1)}</strong></p><p>${t('週期', 'Period')} <strong>${shells.length}</strong></p><p>${t('族', 'Group')} <strong>${groupNumber(item)}</strong></p><small>${t('原子序', 'Atomic number')} ${number} · ${t('示意圖並非按比例', 'Diagram not to scale')}</small></div>`;
}

function setupPosition() {
  const picker = document.querySelector('#element-picker');
  if (!picker) return;
  const select = (symbol) => {
    picker.querySelectorAll('button').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.atom === symbol)));
    showShell(symbol, document.querySelector('#shell-display'));
  };
  picker.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => select(button.dataset.atom)));
  select('Na');
}

function setupGroupOne() {
  const stage = document.querySelector('#water-stage');
  if (!stage) return;
  const select = (symbol) => {
    const item = groupOne[symbol];
    document.querySelectorAll('[data-alkali]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.alkali === symbol)));
    stage.dataset.intensity = item.trend;
    document.querySelector('#water-metal').textContent = symbol;
    document.querySelector('#water-bubbles').innerHTML = reactionBubbles(item.bubbles);
    document.querySelector('#water-copy').innerHTML = `<span class="eyebrow">${symbol} · ${t(item.zh, item.en)}</span><h3>${t('看見甚麼？', 'What would we observe?')}</h3><p>${t(item.noteZh, item.noteEn)}</p><p>${t('反應會放出氫氣；留下鹼性溶液。', 'Hydrogen is released and an alkaline solution remains.')}</p>`;
  };
  document.querySelectorAll('[data-alkali]').forEach((button) => button.addEventListener('click', () => select(button.dataset.alkali)));
  select('Li');
}

function setupGroupTwo() {
  const stage = document.querySelector('#tube-stage');
  if (!stage) return;
  const select = (symbol) => {
    const item = groupTwo[symbol];
    document.querySelectorAll('[data-acid]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.acid === symbol)));
    document.querySelector('#sample-pieces').textContent = symbol;
    document.querySelector('#acid-bubbles').innerHTML = reactionBubbles(item.bubbles);
    document.querySelector('#acid-copy').innerHTML = `<span class="eyebrow">${symbol} · ${t(item.zh, item.en)}</span><h3>${t('觀察結果', 'Observation')}</h3><p>${t(item.noteZh, item.noteEn)}</p><p>${symbol === 'C' ? t('比較：碳不是第 II 族金屬。', 'Comparison: carbon is not a Group II metal.') : t('同族線索：鎂和鈣都產生氫氣。', 'Group pattern: both Mg and Ca produce hydrogen.')}</p>`;
  };
  document.querySelectorAll('[data-acid]').forEach((button) => button.addEventListener('click', () => select(button.dataset.acid)));
  select('Mg');
}

function setupHalogens() {
  const detail = document.querySelector('#halogen-detail');
  if (!detail) return;
  const select = (symbol) => {
    const item = halogenData[symbol];
    document.querySelectorAll('[data-halo]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.halo === symbol)));
    detail.innerHTML = `<div class="halogen-sample ${item.tone}" role="img" aria-label="${t(`${item.zh}的${item.colourZh}示意色塊`, `Simplified ${item.colourEn.toLowerCase()} colour for ${item.en}`)}"><strong>${symbol}</strong></div><div><span class="eyebrow">${t('原子序', 'ATOMIC NUMBER')} ${item.number}</span><h3>${t(item.zh, item.en)} <small>${en ? symbol : item.en}</small></h3><p>${t('室溫狀態：', 'State at room temperature: ')}<b>${t(item.stateZh, item.stateEn)}</b></p><p>${t('顏色：', 'Colour: ')}<b>${t(item.colourZh, item.colourEn)}</b></p>${symbol === 'I' ? `<p>${t('碘固體受熱昇華時，可形成紫色蒸氣。', 'Heated iodine solid can sublime to purple vapour.')}</p>` : ''}</div>`;
  };
  document.querySelectorAll('[data-halo]').forEach((button) => button.addEventListener('click', () => select(button.dataset.halo)));
  select('Cl');
}

function setupNoble() {
  const display = document.querySelector('#noble-display');
  if (!display) return;
  const select = (symbol) => {
    document.querySelectorAll('[data-noble]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.noble === symbol)));
    const item = shellExamples.find((element) => element[0] === symbol);
    display.innerHTML = `${atomDiagram(symbol, item[3])}<div class="shell-facts"><div class="selected-element"><b>${symbol}</b><span>${t(item[1], item[2])}</span></div><p>${t('電子排佈', 'Electron arrangement')} <strong>${item[3].join(', ')}</strong></p><p>${t('最外層', 'Outer shell')} <strong>${item[3].at(-1)} / ${symbol === 'He' ? 2 : 8}</strong></p><p>${t('狀態', 'State')} <strong>${t('已排滿', 'Full')}</strong></p><small>${t('示意圖並非按比例', 'Diagram not to scale')}</small></div>`;
  };
  document.querySelectorAll('[data-noble]').forEach((button) => button.addEventListener('click', () => select(button.dataset.noble)));
  select('Ne');
}

function setupNavigation() {
  const menu = document.querySelector('#menu-button');
  const backdrop = document.querySelector('#nav-backdrop');
  const close = () => {
    document.body.classList.remove('menu-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', t('開啟課堂目錄', 'Open lesson contents'));
    backdrop.hidden = true;
  };
  menu.setAttribute('aria-label', t('開啟課堂目錄', 'Open lesson contents'));
  backdrop.setAttribute('aria-label', t('關閉課堂目錄', 'Close lesson contents'));
  menu.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? t('關閉課堂目錄', 'Close lesson contents') : t('開啟課堂目錄', 'Open lesson contents'));
    backdrop.hidden = !open;
  });
  backdrop.addEventListener('click', close);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
    const url = new URL(location.href);
    url.searchParams.set('lang', button.dataset.language);
    location.href = url.href;
  }));
}

renderShell();
setupNavigation();
setupQuiz();
void setupMap();
setupPosition();
setupGroupOne();
setupGroupTwo();
setupHalogens();
setupNoble();
