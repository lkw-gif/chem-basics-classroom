import { phaseComparisonMarkup, setupPhaseComparison } from './phase-comparison.js';
import { alkaliDemoMarkup, setupAlkaliDemo } from './alkali-demo.js';
import { acidLabMarkup, setupAcidLab } from './acid-lab.js';
import { shellElectronPositions, modelMarkup, createClassroomModel } from './models-3d.js';

const lessons = [
  { id: 'map', ref: '3.1', zh: '讀懂週期表', en: 'Read the periodic table', leadZh: '每一格都有位置：原子序、族和週期。', leadEn: 'Every element has a place: atomic number, group and period.' },
  { id: 'states', ref: '3.2', zh: '元素的狀態', en: 'States of elements', leadZh: '在室溫下，有些元素是固體，有些是液體或氣體。', leadEn: 'At room temperature, elements can be solids, liquids or gases.' },
  { id: 'position', ref: '3.3', zh: '位置與電子排佈', en: 'Position and electrons', leadZh: '看看最外層電子，便能理解同族元素為何相似。', leadEn: 'Outermost shell electrons help explain why elements in the same group have similar chemical properties.' },
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
    { zh: '鋰、鈉、鉀都要存放在哪裏，減少與空氣反應？', en: 'Where are lithium, sodium and potassium stored to limit reaction with air?', optionsZh: ['石蠟油中', '水中', '開口碟中'], optionsEn: ['In paraffin oil', 'In water', 'In an open dish'], answer: 0, whyZh: '石蠟油隔絕空氣，防止鹼金屬與空氣反應。', whyEn: 'Paraffin oil keeps air away from the reactive metals.' },
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
const highlight = (zh, english, colour = 'green') => `<strong class="keyword keyword-${colour}">${t(zh, english)}</strong>`;
const lessonId = location.pathname.match(/\/sessions\/([a-z0-9]+)\/?$/)?.[1];
const activeLesson = lessons.find((lesson) => lesson.id === lessonId);
const lessonUrl = (id) => `./sessions/${id}/?lang=${language}`;
const homeUrl = `./?lang=${language}`;

function atomDiagram(symbol, arrangement) {
  const center = 145;
  const radii = [42, 77, 110, 135];
  const circles = arrangement.map((count, shell) => {
    const radius = radii[shell];
    const dots = shellElectronPositions(count, radius, center).map(({ x, y }) =>
      `<circle class="electron-dot" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" />`
    ).join('');
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
  return `<div class="concept-grid"><article class="mini-concept panel"><span>01</span><h3>${t('原子序', 'Atomic number')}</h3><p>${highlight('原子序＝質子數', 'Atomic number = number of protons')}${t('；由左至右逐漸增加。', '. It rises across the table.')}</p></article><article class="mini-concept panel"><span>02</span><h3>${t('族：直行', 'Group: column')}</h3><p>${highlight('同族元素', 'Elements in the same group', 'blue')}${t('通常有', ' usually have ')}${highlight('相似化學性質', 'similar chemical properties')}${t('。', '.')}</p>
    <p>${t('在第 I–VII 族，同族元素的', 'In Groups I–VII, they have the ')}${highlight('最外層電子數相同', 'same number of outermost shell electrons', 'blue')}${t('。', '.')}</p></article><article class="mini-concept panel"><span>03</span><h3>${t('週期：橫行', 'Period: row')}</h3><p>${highlight('同一週期', 'Same period', 'blue')}${t('的原子有', ' means the same number of ')}${highlight('相同數目的已佔用電子層', 'occupied electron shells', 'blue')}${t('。', '.')}</p></article></div><section class="panel table-panel"><div class="panel-heading"><h2>${t('首 36 種元素', 'The first 36 elements')}</h2><span>${t('選一格，看看它的族和週期', 'Select a box to see its group and period')}</span></div><div class="periodic-scroll" role="region" tabindex="0" aria-label="${t('首 36 種元素週期表', 'Periodic table of the first 36 elements')}"><div class="periodic-grid" id="periodic-grid"><p>${t('正在載入週期表…', 'Loading periodic table…')}</p></div></div><div class="map-legend"><span><i class="metal"></i>${t('金屬', 'Metal')}</span><span><i class="metalloid"></i>${t('類金屬', 'Metalloid')}</span><span><i class="nonmetal"></i>${t('非金屬', 'Non-metal')}</span></div><div class="periodic-detail" id="periodic-detail" aria-live="polite"></div></section><div class="group-map"><div><strong>GROUP I</strong><span>${t('\u9e7c\u91d1\u5c6c', 'Alkali metals')}</span></div><div><strong>GROUP II</strong><span>${t('\u9e7c\u571f\u91d1\u5c6c', 'Alkaline earth metals')}</span></div><div><strong>GROUP IV</strong><span>${t('\u78b3\u65cf\u5143\u7d20', 'Carbon family')}</span></div><div><strong>GROUP 0</strong><span>${t('\u8cb4\u6c23\u9ad4', 'Noble gases')}</span></div></div><p class="teaching-note">${t('\u4e2d\u9593\u5340\u57df\u6709\u904e\u6e21\u91d1\u5c6c\uff1b\u91d1\u5c6c\u8207\u975e\u91d1\u5c6c\u7684\u4ea4\u754c\u9644\u8fd1\u6709\u985e\u91d1\u5c6c\u3002', 'Transition metals occupy the middle; metalloids lie near the boundary between metals and non-metals.')}</p>`;
}

function phaseBadge(state) {
  const labels = { solid: ['固體', 'Solid'], liquid: ['液體', 'Liquid'], gas: ['氣體', 'Gas'] };
  return `<span class="state-badge ${state}">${t(...labels[state])}</span>`;
}

function renderStates() {
  return `<div class="two-photo-grid">${picture('../images/mercury-example.png', 'Shiny drops of liquid mercury', `<b>Hg · ${t('汞', 'Mercury')}</b><span>${t('室溫下的液體金屬', 'A liquid metal at room temperature')}</span>`)}${picture('../images/bromine-example.png', 'Reddish-brown liquid bromine in a glass ampoule', `<b>Br · ${t('溴', 'Bromine')}</b><span>${t('室溫下的液體非金屬', 'A liquid non-metal at room temperature')}</span>`)}</div><div class="panel simple-panel"><h2>${t('室溫約 25 °C', 'About 25 °C')}</h2><div class="state-summary"><div>${phaseBadge('liquid')}<p>${t('兩種', 'Two ')}${highlight('液體', 'liquid')}${t('元素：', ' elements: ')}${highlight('汞、溴', 'mercury and bromine', 'orange')}${t('。', '.')}</p></div><div>${phaseBadge('gas')}<p>${t('五種氣體元素：', 'Five gaseous elements: ')}${highlight('氫、氮、氧、氟、氯', 'hydrogen, nitrogen, oxygen, fluorine and chlorine', 'blue')}${t('，另有', ', plus ')}${highlight('六種貴氣體', 'six noble gases', 'blue')}${t('。', '.')}</p></div><div>${phaseBadge('solid')}<p>${t('其餘天然元素一般是', 'The other naturally occurring elements are generally ')}${highlight('固體', 'solids')}${t('。', '.')}</p></div></div></div>${renderRoomStateTable()}${phaseComparisonMarkup(t)}`;
}

function renderRoomStateTable() {
  return `<section class="panel table-panel state-periodic-panel"><div class="panel-heading"><h2>${t('室溫元素週期表', 'Periodic table at room temperature')}</h2><span>${t('橙色框標示液體或氣體；選一格查看狀態', 'Orange outlines mark liquids or gases. Select an element to see its state.')}</span></div><div class="periodic-scroll state-periodic-scroll" role="region" tabindex="0" aria-label="${t('室溫下的元素週期表', 'Periodic table of elements at room temperature')}"><div class="periodic-grid state-periodic-grid" id="state-periodic-grid"><p>${t('正在載入週期表…', 'Loading periodic table…')}</p></div><div class="state-series-grid" id="state-series-grid" aria-label="${t('鑭系與錒系元素', 'Lanthanides and actinides')}"></div></div><div class="map-legend state-table-legend"><span><i class="metal"></i>${t('金屬', 'Metal')}</span><span><i class="metalloid"></i>${t('類金屬', 'Metalloid')}</span><span><i class="nonmetal"></i>${t('非金屬', 'Non-metal')}</span><span><i class="state-outline-swatch"></i>${t('橙色框：室溫下為液體或氣體', 'Orange outline: liquid or gas at room temperature')}</span><span><b class="state-key-mark">L</b>${t('液體', 'Liquid')}</span><span><b class="state-key-mark">G</b>${t('氣體', 'Gas')}</span></div><div class="periodic-detail state-periodic-detail" id="state-periodic-detail" aria-live="polite"></div></section><p class="teaching-note">${t('其餘天然元素一般為固體；超重元素的室溫狀態尚未能直接測定。', 'Most other naturally occurring elements are solids; the room-temperature states of superheavy elements have not been directly measured.')}</p>`;
}

function groupNumber(element) {
  if (element[0] === 'He' || element[0] === 'Ne' || element[0] === 'Ar') return '0 / 18';
  const outer = element[3].at(-1);
  return `${['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', '0'][outer]} / ${outer <= 2 ? outer : outer + 10}`;
}

function renderPosition() {
  return `<div class="concept-grid"><article class="mini-concept panel"><span>GROUP</span><h3>${t('直行 → 最外層電子', 'Column → outermost shell electrons')}</h3><p>${t('主族元素：', 'Main-group elements: ')}${highlight('第 I–VII 族：族數＝最外層電子數', 'Group number = number of outermost shell electrons (Groups I–VII)', 'blue')}${t('。第 0 族的最外層已填滿。', '. Group 0 elements have a full outermost shell.')}</p></article><article class="mini-concept panel"><span>PERIOD</span><h3>${t('橫行 → 電子層數', 'Row → number of shells')}</h3><p>${highlight('已佔用電子層數＝週期數', 'Number of occupied electron shells = period number', 'blue')}${t('。', '.')}</p></article><article class="mini-concept panel"><span>PATTERN</span><h3>${t('同族 → 化學性質相似', 'Same group → similar chemical properties')}</h3><p>${t('第 I–VII 族的同族元素','Elements in the same group (I–VII) have ')}${highlight('最外層電子數相同', 'the same number of outermost shell electrons', 'blue')}${t('，所以化學性質', ', so they have ')}${highlight('相似', 'similar')}${t('。', ' chemical properties.')}
    <strong class="concept-correction">${t('並不相同', 'NOT the same')}</strong></p></article></div><section class="panel explorer-panel"><div class="panel-heading"><h2>${t('選一種元素，觀察電子層', 'Choose an element and inspect its shells')}</h2><span>${t('首 20 種元素 · 簡化模型', 'First 20 elements · simplified model')}</span></div><div class="explorer-grid"><div class="element-picker" id="element-picker" role="group" aria-label="${t('選擇元素', 'Choose an element')}">${shellExamples.map(([symbol, nameZh, nameEn]) => `<button type="button" data-atom="${symbol}" aria-pressed="${symbol === 'Na' ? 'true' : 'false'}"><strong>${symbol}</strong><small>${t(nameZh, nameEn)}</small></button>`).join('')}</div><div class="shell-display" id="shell-display" aria-live="polite"></div></div></section><p class="teaching-note">${t('首四粒電子分開畫，第五粒起配對；電子點只顯示數量，並非固定位置。', 'Draw the first four separately, then pair up from the fifth. The dots show electron counts, not fixed positions.')}</p><div class="compare-strip"><div><strong>Na</strong><span>2, 8, 1</span></div><div><strong>K</strong><span>2, 8, 8, 1</span></div><p>${t('鈉與鉀最外層都有 1 粒電子，所以同屬第 I 族；電子層數不同，所以在不同週期。', 'Sodium and potassium each have one outermost shell electron, so both are in Group I. Different shell counts place them in different periods.')}</p></div>`;
}

const groupTrendData = {
  group1: { roman: 'I', column: 1, trend: 'increase', elements: [[3, 'Li', '鋰', 'Lithium', 2], [11, 'Na', '鈉', 'Sodium', 3], [19, 'K', '鉀', 'Potassium', 4]] },
  group2: { roman: 'II', column: 2, trend: 'increase', elements: [[4, 'Be', '鈹', 'Beryllium', 2], [12, 'Mg', '鎂', 'Magnesium', 3], [20, 'Ca', '鈣', 'Calcium', 4]] },
  halogens: { roman: 'VII', column: 17, trend: 'decrease', elements: [[9, 'F', '氟', 'Fluorine', 2], [17, 'Cl', '氯', 'Chlorine', 3], [35, 'Br', '溴', 'Bromine', 4], [53, 'I', '碘', 'Iodine', 5]] },
  noble: { roman: '0', column: 18, trend: 'stable', elements: [[2, 'He', '氦', 'Helium', 1], [10, 'Ne', '氖', 'Neon', 2], [18, 'Ar', '氬', 'Argon', 3]] },
};

function renderGroupLocator(id) {
  const data = groupTrendData[id];
  return `<figure class="group-locator"><div class="group-locator-grid" data-group-locator="${id}" aria-hidden="true"></div><figcaption>${t('綠色直欄：第', 'Highlighted column: Group')} ${data.roman}${t(' 族', '')}</figcaption></figure>`;
}

function renderGroupTrend(id) {
  const data = groupTrendData[id];
  const stable = data.trend === 'stable';
  const increasing = data.trend === 'increase';
  const trendText = stable ? t('最外層已填滿，反應性很低', 'Full outer shells; very low reactivity') : increasing ? t('沿族向下，反應性增加', 'Reactivity increases down the group') : t('沿族向下，反應性減少', 'Reactivity decreases down the group');
  const topLabel = increasing ? t('較不活潑', 'Less reactive') : t('較活潑', 'More reactive');
  const bottomLabel = increasing ? t('較活潑', 'More reactive') : t('較不活潑', 'Less reactive');
  return `<aside class="panel group-periodic-card" data-trend="${data.trend}">
    <span class="eyebrow">GROUP ${data.roman}</span>
    <h2>${t('沿族向下觀察', 'Read down the group')}</h2>

    <p class="group-column-caption">${t('課堂例子：由上至下排列', 'Lesson examples, from top to bottom')}</p>
    <div class="group-column-layout">
      <ol class="group-periodic-column" aria-label="${t('第', 'Group')} ${data.roman}${t(' 族的課堂例子', ' lesson examples')}">${data.elements.map(([z, symbol, zh, name, period]) => `<li><span class="group-period-label">${t('週期', 'Period')} <b>${period}</b></span><div class="group-periodic-element"><small>${z}</small><strong>${symbol}</strong><span>${t(zh, name)}</span></div></li>`).join('')}</ol>
      <div class="group-direction">${stable ? `<div class="group-stability-line" aria-hidden="true"></div><strong>${t('很不活潑', 'Very unreactive')}</strong><p>${t('He：2 粒外層電子；Ne、Ar：8 粒。', 'He: 2 outer electrons; Ne and Ar: 8.')}</p>` : `<span>${topLabel}</span><div class="group-down-arrow" aria-hidden="true"></div><strong>${bottomLabel}</strong>`}</div>
    </div>
    <p class="group-trend-message"><strong>${trendText}</strong></p>
    ${id === 'group1' ? `<p class="group-column-note">${t('氫不屬於鹼金屬。', 'Hydrogen is not an alkali metal.')}</p>` : ''}
  </aside>`;
}

async function setupGroupLocators() {
  const locators = document.querySelectorAll('[data-group-locator]');
  if (!locators.length) return;
  try {
    const response = await fetch('./periodic-elements.json');
    if (!response.ok) throw new Error('Periodic element data unavailable');
    const elements = (await response.json()).filter((item) => !(item.atomicNumber >= 57 && item.atomicNumber <= 71) && !(item.atomicNumber >= 89 && item.atomicNumber <= 103));
    locators.forEach((locator) => {
      const data = groupTrendData[locator.dataset.groupLocator];
      locator.innerHTML = elements.map((item) => `<i class="${item.column === data.column && item.symbol !== 'H' ? 'group-locator-active' : ''}" style="grid-column:${item.symbol === 'H' ? 10 : item.column};grid-row:${item.period}"></i>`).join('');
    });
  } catch {
    locators.forEach((locator) => { locator.parentElement.hidden = true; });
  }
}

function renderGroupOne() {
  return `<div class="group-intro-grid"><div class="panel simple-panel"><span class="eyebrow">Li · Na · K</span><h2>${t('它們有甚麼相同？', 'What do they share?')}</h2><div class="fact-list"><p>${highlight('最外層各有 1 粒電子', 'One electron in the outer shell', 'blue')}${t('。', '.')}</p><p>${highlight('軟金屬','soft metals')}${t('可以用刀切開。新切面有銀色光澤，在空氣中很快失去光澤。', ' can be cut with a knife. A freshly cut surface has a silver lustre but tarnishes rapidly in air.')}</p><p>${t('鋰、鈉和鉀的','Lithium, sodium and potassium have ')}${highlight('密度低','low densities')}${t('，會浮在水面。',' and float on water.')}</p><p>${t('它們很活潑，存放在','They are highly reactive and stored in ')}${highlight('石蠟油','paraffin oil')}${t('中，以防與空氣反應。',' to prevent reaction with air.')}</p><p>${t('它們與水劇烈反應，生成','They react vigorously with water to give ')}${highlight('氫氣和鹼性溶液','hydrogen gas and an alkaline solution')}${t('。','.')}</p><p>${t('與某些非金屬反應會生成','They react with certain non-metals to form a ')}${highlight('鹽','salt')}${t('，例如鈉與氯生成',' such as ')}${highlight('氯化鈉','sodium chloride')}${t('。',' when sodium reacts with chlorine.')}</p></div>${renderGroupLocator('group1')}</div>${renderGroupTrend('group1')}</div><section class="panel reaction-panel" id="alkali-water"><div class="panel-heading"><h2>${t('觀察：鋰、鈉、鉀與水的反應', 'Observe lithium, sodium and potassium reacting with water')}</h2></div>${alkaliDemoMarkup(t)}<div class="reaction-equation">${t('鹼金屬 ＋ 水 → 氫氣 ＋ 鹼性溶液', 'Alkali metal + water → hydrogen + alkaline solution')}</div></section><p class="teaching-note">${t('這是教學示意。鹼金屬與水的反應由教師示範。', 'This is a teaching model for a teacher demonstration.')}</p>${alkaliAnswerMarkup()}`;
}

function alkaliAnswerMarkup() {
  return `<section class="panel alkali-answer" aria-labelledby="alkali-answer-title">
    <h2 id="alkali-answer-title">${t('觀察題答法','How to describe the observations')}</h2>
    <ul>
      <li>${t('金屬','The metal ')}${highlight('浮在水面','floats on the water surface')}${t('，',' and ')}${highlight('冒出氣泡','fizzes')}${t('。','.')}</li>
      <li>${t('鈉和鉀在水面','Sodium and potassium ')}${highlight('快速移動','move quickly')}${t('。',' on the water surface.')}</li>
      <li>${t('鈉和鉀可','Sodium and potassium can ')}${highlight('熔成銀色小球','melt to form a silvery ball')}${t('。','.')}</li>
      <li>${t('有時可聽到','A ')}${highlight('嘶嘶聲','hissing sound')}${t('。',' may be heard.')}</li>
      <li>${t('較劇烈的反應可見','')}${highlight('白煙','White fumes')}${t('。',' may be seen during a more vigorous reaction.')}</li>
      <li>${t('鈉若著火，會燃起','If sodium catches fire, it burns with a ')}<span class="flame-yellow">${t('金黃色火焰','golden yellow flame')}</span>${t('。','.')}</li>
      <li>${t('鉀燃燒時呈','Potassium burns with a ')}<span class="flame-lilac">${t('淡紫色火焰','lilac flame')}</span>${t('。','.')}</li>
    </ul>
    <p>${t('答題只寫實際看到或聽到的現象。','Write only what you actually saw or heard.')}</p>
    <details>
      <summary>${t('教師示範的安全措施','Safety precautions for the teacher demonstration')}</summary>
      <ul>
        <li>${t('戴上安全護目鏡。','Wear safety goggles.')}</li>
        <li>${t('戴上防護手套。','Wear protective gloves.')}</li>
        <li>${t('用鑷子拿取金屬。','Use forceps to handle the metal.')}</li>
        <li>${t('用防護屏隔開觀察者。','Place a protective screen between the demonstration and the observers.')}</li>
        <li>${t('只用一小塊金屬。','Use only a small piece of metal.')}</li>
      </ul>
    </details>
    <p class="teaching-note">${t('答題字眼參考教師版第 6 頁。','Answer wording adapted from the teacher notes, p. 6.')} <a href="https://edu.rsc.org/experiments/reactivity-trends-of-the-alkali-metals/731.article">${t('RSC 反應觀察','RSC demonstration observations')}</a></p>
  </section>`;
}

function renderGroupTwo() {
  return `<a class="acid-lab-jump" href="${location.pathname}${location.search}#acid-lab">${t('直接開始虛擬實驗','Start the virtual lab')}</a>
    <div class="group-intro-grid">
      <div class="panel simple-panel"><h2>${t('同族的兩個例子','Two members of one group')}</h2>
        <p>${t('鎂和鈣都在第 II 族，','Magnesium and calcium are in Group II, with ')}${highlight('最外層各有 2 粒電子','two outer electrons each','blue')}${t('。','.')}</p>
        <div class="number-cards"><div><b>Mg</b><span>2, 8, 2</span></div><div><b>Ca</b><span>2, 8, 8, 2</span></div></div>
        ${renderGroupLocator('group2')}
      </div>
      ${renderGroupTrend('group2')}
    </div>
    ${acidLabMarkup(t)}
    <p class="teaching-note">${t('這是學生筆記第 5–6 頁的教學模擬。碳是本實驗的對照。','This simulation follows student notes pp. 5–6 and uses carbon for comparison.')} <a href="https://edu.rsc.org/experiments/the-reactivity-of-the-group-2-metals/409.article">${t('RSC 第 II 族參考','RSC Group II reference')}</a></p>`;
}

function renderHalogens() {
  return `<div class="halogen-intro"><div class="panel simple-panel"><span class="eyebrow">GROUP VII</span><h2>${t('四種常見鹵素', 'Four familiar halogens')}</h2><p>${t('它們都是非金屬，', 'They are non-metals with ')}${highlight('最外層有 7 粒電子', 'seven outer electrons', 'blue')}${t('。由上而下，顏色加深，室溫狀態由', '. Down the group, colour deepens and room-temperature state changes from ')}${highlight('氣體轉成液體、再到固體', 'gas to liquid to solid', 'orange')}${t('。', '.')}</p>${renderGroupLocator('halogens')}</div>${renderGroupTrend('halogens')}</div>
<section class="panel halogen-panel" id="halogen-views" data-mode="sample">
  <div class="panel-heading"><h2>${t('從鹵素樣本看分子', 'Halogens up close')}</h2><span>${t('比較室溫下的樣本', 'Compare samples at room temperature')}</span></div>
  <div class="selector-row" role="group" aria-label="${t('選擇鹵素', 'Choose a halogen')}">${Object.entries(halogenData).map(([symbol, item]) => `<button type="button" class="halogen-choice" data-halo="${symbol}" data-tone="${item.tone}" aria-pressed="${symbol === 'Cl'}"><strong>${symbol}</strong><small>${t(item.zh, item.en)}</small><span class="halogen-choice-meta"><i aria-hidden="true"></i>${t(item.colourZh, item.colourEn)} · ${t(item.stateZh, item.stateEn)}</span></button>`).join('')}</div>
  <div class="halogen-view-switch" role="group" aria-label="${t('觀察視角', 'Observation view')}">
    <button type="button" data-halogen-view="sample" aria-pressed="true" aria-controls="halogen-sample-view">${t('觀察樣本', 'Sample view')}</button>
    <button type="button" data-halogen-view="particles" aria-pressed="false" aria-controls="halogen-particle-view">${t('放大看粒子', 'Zoom in to particles')}</button>
  </div>
  <div class="group-model-layout" id="halogen-sample-view">
    <div class="halogen-sample-stage">
      <div class="halogen-vial" role="img"><div class="halogen-vial-cap" aria-hidden="true"></div><div class="halogen-vial-glass" aria-hidden="true"><span class="halogen-vial-material"></span><span class="halogen-crystals"><i></i><i></i><i></i></span></div></div>
    </div>
    <div class="halogen-detail" id="halogen-sample-detail" aria-live="polite"></div>
  </div>
  <div class="group-model-layout" id="halogen-particle-view" hidden>
    ${modelMarkup('halogen-model', 'halogen', en)}
    <div class="halogen-detail" id="halogen-particle-detail" aria-live="polite"></div>
  </div>
  <div class="table-scroll"><table class="data-table"><thead><tr><th>${t('元素', 'Element')}</th><th>${t('室溫狀態', 'State at room temp.')}</th><th>${t('熔點 °C', 'Melting °C')}</th><th>${t('沸點 °C', 'Boiling °C')}</th></tr></thead><tbody>${Object.entries(halogenData).map(([symbol, item]) => `<tr><th scope="row">${symbol} · ${t(item.zh, item.en)}</th><td>${t(item.stateZh, item.stateEn)}</td><td>${item.melt}</td><td>${item.boil}</td></tr>`).join('')}</tbody></table></div></section><div class="panel prediction-card"><span class="eyebrow">LOOK AHEAD</span><h2>${t('推測砈（At）', 'Predict astatine (At)')}</h2><p>${t('砈在碘的下一行，同屬第 VII 族。因此可以肯定它位於第 6 週期、最外層有 7 粒電子；其反應強弱可按同族趨勢作推測。', 'Astatine is below iodine in Group VII. Its position tells us it is in Period 6 with seven outer electrons; its reactivity can be predicted from the group trend.')}</p></div>`;
}

function renderNoble() {
  return `<div class="group-intro-grid"><div class="panel simple-panel noble-intro"><span class="eyebrow">GROUP 0</span><h2>${t('外層已排滿', 'A full outer shell')}</h2><p>${t('氦的第一層有 2 粒電子；氖和氬的最外層有 8 粒電子。', 'Helium has two electrons in its first shell; neon and argon have eight in their outer shells. ')}${highlight('最外層已排滿', 'Their outer shells are full', 'blue')}${t('，', ', ')}${highlight('所以反應性很低', 'so they are very unreactive')}${t('。', '. ')}${t('這與 notes 提到的「八隅體規則」有關。', 'This connects to the “octet rule” in the notes.')}</p>${renderGroupLocator('noble')}</div>${renderGroupTrend('noble')}</div><section class="panel explorer-panel"><div class="panel-heading"><h2>${t('3D 粒子模型：', '3D particles: ')}${highlight('獨立的原子', 'separate atoms')}</h2><span>${t('原子不連成分子；右方比較電子層', 'Separate atoms; compare their electron shells alongside')}</span></div><div class="selector-row" role="group" aria-label="${t('選擇貴氣體', 'Choose a noble gas')}">${['He', 'Ne', 'Ar'].map((symbol) => `<button type="button" data-noble="${symbol}" aria-pressed="${symbol === 'Ne'}"><strong>${symbol}</strong><small>${t(shellExamples.find((item) => item[0] === symbol)[1], shellExamples.find((item) => item[0] === symbol)[2])}</small></button>`).join('')}</div><div class="noble-model-layout">${modelMarkup('noble-model', 'noble', en)}<div class="noble-display" id="noble-display" aria-live="polite"></div></div></section><div class="use-grid"><article class="panel use-card"><div class="use-art balloon-art"><img src="../images/helium-balloons.png" alt="Colourful party balloons · 彩色派對氣球" loading="lazy" /></div><h3>He · ${t('氦', 'Helium')}</h3><p>${t('密度低，又不活潑，可用來填充氣球。', 'Low density and low reactivity make it useful in balloons.')}</p></article><article class="panel use-card"><div class="use-art neon-art"><img src="../images/neon-signs.png" alt="Colourful neon-style signs · 彩色霓虹燈造型" loading="lazy" /></div><h3>Ne · ${t('氖', 'Neon')}</h3><p>${t('通電時可發出橙紅色光，適合招牌。', 'An electric current makes it glow orange-red in signs.')}</p></article><article class="panel use-card"><div class="use-art bulb-art"><img src="../images/incandescent-bulb.png" alt="An incandescent bulb with a glowing filament · 燈絲正在發光的白熾燈泡" loading="lazy" /></div><h3>Ar · ${t('氬', 'Argon')}</h3><p>${t('不易和燈泡的熱燈絲反應。', 'It hardly reacts with a hot light-bulb filament.')}</p></article></div><p class="teaching-note">${t('第 0 族還包括氪（Kr）、氙（Xe）和氡（Rn）；它們在室溫下都是氣體。', 'Group 0 also includes krypton (Kr), xenon (Xe) and radon (Rn); all are gases at room temperature.')}</p>`;
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
  document.title = activeLesson ? `${en ? activeLesson.en : activeLesson.zh} · ${t('元素週期表', 'Periodic Table')}` : `${t('元素週期表', 'Periodic Table')} · F.3 CHEM`;
  localStorage.setItem('periodic-table-language', language);
  document.querySelector('#skip-link').textContent = t('跳到課堂內容', 'Skip to lesson');
  document.querySelector('#skip-link').href = `${location.pathname}${location.search}#main`;
  document.querySelector('#course-label').textContent = t('S3 · 元素週期表', 'S3 · PERIODIC TABLE');
  document.querySelector('#side-heading').innerHTML = `<span>UNIT 03</span><b>${t('元素週期表', 'Periodic Table')}</b><small>07</small>`;
  document.querySelector('#brand-link').href = homeUrl;
  document.querySelector('#previous-unit-link').href = `../?lang=${language}`;
  document.querySelector('#previous-unit-link').textContent = t('← 返回單元總覽', '← All units');
  document.querySelector('#lesson-nav').innerHTML = `<a class="classroom-home-link" href="./?lang=${language}" ${!activeLesson?'aria-current="page"':''}><svg aria-hidden="true"><use href="../classroom-icons.svg#home"/></svg><b>${t('課題目錄','All lessons')}</b></a>` + lessons.map((lesson, index) => `<a href="${lessonUrl(lesson.id)}" ${activeLesson?.id === lesson.id ? 'aria-current="page"' : ''}><span>${String(index + 1).padStart(2, '0')}</span><b>${en ? lesson.en : lesson.zh}</b><i>${lesson.ref}</i></a>`).join('');
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
    const groupHeading = (roman, column) => '<div class="table-axis-group" style="grid-column:' + column + ';grid-row:1" aria-hidden="true"><span>' + t('\u65cf', 'Group') + '</span><b>' + roman + '</b></div>';
    const groupHeadings = [
      groupHeading('I', 2), groupHeading('II', 3),
      '<div class="table-axis-transition" style="grid-column:4 / span 10;grid-row:4" aria-hidden="true">' + t('\u904e\u6e21\u91d1\u5c6c', 'Transition metals') + '</div>',
      groupHeading('III', 14), groupHeading('IV', 15), groupHeading('V', 16),
      groupHeading('VI', 17), groupHeading('VII', 18), groupHeading('0', 19),
    ];
    const periodHeadings = Array.from({ length: 4 }, (_, index) => {
      const period = index + 1;
      return '<div class="table-axis-period" style="grid-column:1;grid-row:' + (period + 1) + '" aria-hidden="true"><span>' + t('\u9031\u671f', 'Period') + '</span><b>' + period + '</b></div>';
    });
    const elementCells = elements.map((element) => {
      const column = element.symbol === 'H' ? 10 : element.column + 1;
      return '<button type="button" class="element-cell ' + (element.symbol === 'H' ? 'element-hydrogen ' : '') + (element.category === 'metalloid' ? 'cat-metalloid' : element.category === 'metal' ? 'cat-metal' : 'cat-nonmetal') + '" style="grid-column:' + column + ';grid-row:' + (element.period + 1) + '" data-element="' + element.atomicNumber + '" aria-pressed="false" aria-label="' + element.atomicNumber + ' ' + element.symbol + ' ' + (en ? element.nameEn : element.nameZh + ' ' + element.nameEn) + '"><small>' + element.atomicNumber + '</small><strong>' + element.symbol + '</strong><span>' + (en ? element.nameEn : element.nameZh) + '</span></button>';
    });
    grid.innerHTML = [...groupHeadings, ...periodHeadings, ...elementCells].join('');
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
      const groupText = oldGroup || element.column;
      document.querySelector('#periodic-detail').innerHTML = `<div class="detail-symbol"><small>${element.atomicNumber}</small><strong>${element.symbol}</strong></div><div><h3>${en ? element.nameEn : `${element.nameZh} · ${element.nameEn}`}</h3><p>${t('原子序', 'Atomic number')} <b>${element.atomicNumber}</b> · ${t('第', 'Period')} <b>${element.period}</b> ${t('週期', '')} · ${t('族', 'Group')} <b>${groupText}</b></p><small>${t('同色直行＝同族；同色橫行＝同週期。', 'Highlighted column = same group; highlighted row = same period.')}</small></div>`;
    };
    grid.querySelectorAll('button').forEach((button) => button.addEventListener('click', () => show(Number(button.dataset.element))));
    show(11);
  } catch {
    grid.innerHTML = `<p class="load-error">${t('週期表暫時未能載入。', 'The periodic table could not be loaded.')}</p>`;
  }
}

async function setupStateTable() {
  const grid = document.querySelector('#state-periodic-grid');
  if (!grid) return;
  const seriesGrid = document.querySelector('#state-series-grid');
  const detail = document.querySelector('#state-periodic-detail');
  const liquidElements = new Set(['Br', 'Hg']);
  const gasElements = new Set(['H', 'He', 'N', 'O', 'F', 'Ne', 'Cl', 'Ar', 'Kr', 'Xe', 'Rn']);
  const stateFor = (element) => liquidElements.has(element.symbol) ? 'liquid' : gasElements.has(element.symbol) ? 'gas' : element.atomicNumber >= 104 ? 'unknown' : 'solid';
  const stateLabels = { solid: ['固體', 'Solid'], liquid: ['液體', 'Liquid'], gas: ['氣體', 'Gas'], unknown: ['尚未確定', 'Not confirmed'] };
  const categoryLabels = { metal: ['金屬', 'Metal'], metalloid: ['類金屬', 'Metalloid'], nonmetal: ['非金屬', 'Non-metal'] };
  const seriesFor = (element) => element.atomicNumber >= 57 && element.atomicNumber <= 71 ? 'lanthanide' : element.atomicNumber >= 89 && element.atomicNumber <= 103 ? 'actinide' : '';
  try {
    const response = await fetch('./periodic-elements.json');
    if (!response.ok) throw new Error('Periodic element data unavailable');
    const elements = await response.json();
    const groupHeading = (roman, column) => '<div class="table-axis-group" style="grid-column:' + column + ';grid-row:1" aria-hidden="true"><span>' + t('\u65cf', 'Group') + '</span><b>' + roman + '</b></div>';
    const groupHeadings = [groupHeading('I', 2), groupHeading('II', 3), '<div class="table-axis-transition" style="grid-column:4 / span 10;grid-row:1" aria-hidden="true">' + t('\u904e\u6e21\u91d1\u5c6c', 'Transition metals') + '</div>', groupHeading('III', 14), groupHeading('IV', 15), groupHeading('V', 16), groupHeading('VI', 17), groupHeading('VII', 18), groupHeading('0', 19)];
    const periodHeadings = Array.from({ length: 7 }, (_, index) => {
      const period = index + 1;
      return '<div class="table-axis-period" style="grid-column:1;grid-row:' + (period + 1) + '" aria-hidden="true"><span>' + t('\u9031\u671f', 'Period') + '</span><b>' + period + '</b></div>';
    });
    const buttonMarkup = (element, column, row) => {
      const state = stateFor(element);
      const stateClass = state === 'liquid' || state === 'gas' ? ' state-outline state-' + state : '';
      const mark = state === 'liquid' ? (en ? 'L' : '液') : state === 'gas' ? (en ? 'G' : '氣') : '';
      const accessibleState = t(...stateLabels[state]);
      const accessibleName = en ? element.nameEn : element.nameZh + ' ' + element.nameEn;
      const accessibleTemperature = en ? accessibleState + ' at about 25 degrees Celsius' : '室溫約 25 °C 時為' + accessibleState;
      return '<button type="button" class="element-cell state-element-cell ' + (element.symbol === 'H' ? 'element-hydrogen ' : '') + (element.category === 'metalloid' ? 'cat-metalloid' : element.category === 'metal' ? 'cat-metal' : 'cat-nonmetal') + stateClass + '" style="grid-column:' + column + ';grid-row:' + row + '" data-element="' + element.atomicNumber + '" aria-pressed="false" aria-label="' + element.atomicNumber + ' ' + element.symbol + ' ' + accessibleName + ', ' + accessibleTemperature + '"><small>' + element.atomicNumber + '</small>' + (mark ? '<small class="state-cell-marker">' + mark + '</small>' : '') + '<strong>' + element.symbol + '</strong><span>' + (en ? element.nameEn : element.nameZh) + '</span></button>';
    };
    const inFBlock = (element) => Boolean(seriesFor(element));
    const mainElements = elements.filter((element) => !inFBlock(element));
    const mainCells = mainElements.map((element) => buttonMarkup(element, element.symbol === 'H' ? 10 : element.column + 1, element.period + 1));
    const placeholders = [
      '<div class="periodic-series-placeholder" style="grid-column:4;grid-row:7" aria-hidden="true"><b>57–71</b><span>' + t('\u946d\u7cfb', 'Lanthanides') + '</span></div>',
      '<div class="periodic-series-placeholder" style="grid-column:4;grid-row:8" aria-hidden="true"><b>89–103</b><span>' + t('\u9312\u7cfb', 'Actinides') + '</span></div>',
    ];
    grid.innerHTML = [...groupHeadings, ...periodHeadings, ...placeholders, ...mainCells].join('');
    const seriesLabels = [
      '<div class="state-series-label" style="grid-column:1 / span 3;grid-row:1"><b>' + t('\u946d\u7cfb', 'Lanthanides') + '</b><span>57–71</span></div>',
      '<div class="state-series-label" style="grid-column:1 / span 3;grid-row:2"><b>' + t('\u9312\u7cfb', 'Actinides') + '</b><span>89–103</span></div>',
    ];
    const seriesCells = elements.filter(inFBlock).map((element) => buttonMarkup(element, seriesFor(element) === 'lanthanide' ? element.atomicNumber - 53 : element.atomicNumber - 85, seriesFor(element) === 'lanthanide' ? 1 : 2));
    seriesGrid.innerHTML = [...seriesLabels, ...seriesCells].join('');
    const allButtons = [...grid.querySelectorAll('button'), ...seriesGrid.querySelectorAll('button')];
    const show = (number) => {
      const element = elements.find((item) => item.atomicNumber === number);
      if (!element) return;
      const series = seriesFor(element);
      allButtons.forEach((button) => {
        button.setAttribute('aria-pressed', String(Number(button.dataset.element) === number));
      });
      const oldGroup = element.group === 18 ? '0' : element.group === 1 ? 'I' : element.group === 2 ? 'II' : element.group === 13 ? 'III' : element.group === 14 ? 'IV' : element.group === 15 ? 'V' : element.group === 16 ? 'VI' : element.group === 17 ? 'VII' : '';
      const groupText = element.group ? (oldGroup ? oldGroup + ' / ' + element.group : String(element.group)) : t(series === 'lanthanide' ? '\u946d\u7cfb' : '\u9312\u7cfb', series === 'lanthanide' ? 'Lanthanide series' : 'Actinide series');
      const state = stateFor(element);
      const stateLabel = t(...stateLabels[state]);
      const categoryLabel = t(...categoryLabels[element.category]);
      detail.innerHTML = '<div class="detail-symbol ' + (state === 'liquid' || state === 'gas' ? 'state-detail-symbol' : '') + '"><small>' + element.atomicNumber + '</small><strong>' + element.symbol + '</strong></div><div class="state-element-facts"><h3>' + (en ? element.nameEn : element.nameZh + ' · ' + element.nameEn) + '</h3><p>' + t('原子序', 'Atomic number') + ' <b>' + element.atomicNumber + '</b> · ' + t('第', 'Period') + ' <b>' + element.period + '</b> ' + t('週期', '') + ' · ' + t('族', 'Group') + ' <b>' + groupText + '</b></p><div class="state-detail-tags"><span class="state-badge ' + (state === 'unknown' ? 'solid' : state) + '">' + stateLabel + '</span><span class="state-category-label">' + categoryLabel + '</span></div></div>';
    };
    allButtons.forEach((button) => button.addEventListener('click', () => show(Number(button.dataset.element))));
    detail.innerHTML = '<p class="state-detail-empty">' + t('點選一種元素，查看它在室溫下的狀態。', 'Select an element to see its state at room temperature.') + '</p>';
  } catch {
    grid.innerHTML = '<p class="load-error">' + t('\u9031\u671f\u8868\u66ab\u6642\u672a\u80fd\u8f09\u5165\u3002', 'The periodic table could not be loaded.') + '</p>';
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

function setupHalogens() {
  const root = document.querySelector('#halogen-views');
  if (!root) return;
  const sampleView = root.querySelector('#halogen-sample-view');
  const particleView = root.querySelector('#halogen-particle-view');
  const sampleDetail = root.querySelector('#halogen-sample-detail');
  const particleDetail = root.querySelector('#halogen-particle-detail');
  const vial = sampleView.querySelector('.halogen-vial');
  const modelRoot = root.querySelector('#halogen-model');
  const model = createClassroomModel(modelRoot, 'Cl', en);
  modelRoot.querySelector('canvas').setAttribute('aria-describedby', particleDetail.id);
  const elements = root.querySelectorAll('[data-halo]');
  const views = root.querySelectorAll('[data-halogen-view]');
  const motion = {
    Gas: t('分子相隔較遠，向不同方向移動。', 'Molecules are far apart and move in different directions.'),
    Liquid: t('分子靠得很近，可以互相滑過。', 'Molecules stay close and slide past one another.'),
    Solid: t('分子排列整齊，在原位振動。', 'Molecules form an ordered arrangement and vibrate in place.'),
  };

  function select(symbol) {
    const item = halogenData[symbol];
    const name = t(item.zh, item.en);
    const state = t(item.stateZh, item.stateEn);
    const colour = t(item.colourZh, item.colourEn);
    elements.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.halo === symbol)));
    vial.dataset.tone = item.tone;
    vial.dataset.state = item.stateEn.toLowerCase();
    vial.setAttribute('aria-label', t(`${name}樣本示意圖，室溫下呈${colour}${state}。`, `Illustration of a ${name.toLowerCase()} sample at room temperature: ${colour.toLowerCase()} ${state.toLowerCase()}.`));
    sampleDetail.dataset.tone = item.tone;
    sampleDetail.innerHTML = `<div><span class="eyebrow">${t('室溫樣本示意圖', 'Room-temperature sample illustration')}</span><h3>${name} <small>${symbol}₂</small></h3>
      <div class="halogen-highlights">
        <p class="halogen-highlight"><span>${t('室溫狀態', 'State at room temperature')}</span><b>${state}</b></p>
        <p class="halogen-highlight"><span>${t('樣本顏色', 'Sample colour')}</span><b><i aria-hidden="true"></i>${colour}</b></p>
      </div>
      ${symbol === 'I' ? `<p>${t('碘受熱昇華，可形成紫色蒸氣。', 'Iodine can sublime on heating to form purple vapour.')}</p>` : ''}</div>`;
    particleDetail.innerHTML = `<div><span class="eyebrow">${symbol}₂ · ${highlight('雙原子分子', 'Diatomic molecules', 'blue')}</span><h3>${name} <small>· ${state}</small></h3>
      <div class="model-takeaway">
        <div class="halogen-pair-key"><span aria-hidden="true"><i></i><i></i></span><b>${t('每個分子含兩個原子', 'Two atoms per molecule')}</b></div>
        <p>${motion[item.stateEn]}</p>
      </div><p>${t('四種粒子模型都用灰白色球代表原子。樣本顏色可在「觀察樣本」查看。', 'Grey spheres represent atoms in all four models. Switch to Sample view to see the sample colour.')}</p></div>`;
    model.setElement(symbol);
  }

  elements.forEach(button => button.addEventListener('click', () => select(button.dataset.halo)));
  views.forEach(button => button.addEventListener('click', () => {
    const mode = button.dataset.halogenView;
    root.dataset.mode = mode;
    sampleView.hidden = mode !== 'sample';
    particleView.hidden = mode !== 'particles';
    views.forEach(view => view.setAttribute('aria-pressed', String(view === button)));
  }));
  select('Cl');
}

function setupNoble() {
  const display = document.querySelector('#noble-display');
  if (!display) return;
  const model = createClassroomModel(document.querySelector('#noble-model'), 'Ne', en);
  const select = (symbol) => {
    model.setElement(symbol);
    document.querySelectorAll('[data-noble]').forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.noble === symbol)));
    const item = shellExamples.find((element) => element[0] === symbol);
    display.innerHTML = `${atomDiagram(symbol, item[3])}<div class="shell-facts"><div class="selected-element"><b>${symbol}</b><span>${t(item[1], item[2])}</span></div><p>${t('電子排佈', 'Electron arrangement')} <strong>${item[3].join(', ')}</strong></p><p>${t('最外層', 'Outer shell')} <strong>${item[3].at(-1)} / ${symbol === 'He' ? 2 : 8}</strong></p><p>${t('狀態', 'State')} <strong>${t('已排滿', 'Full')}</strong></p><small>${t('示意圖並非按比例', 'Diagram not to scale')}</small></div>`;
  };
  document.querySelectorAll('[data-noble]').forEach((button) => button.addEventListener('click', () => select(button.dataset.noble)));
  select('Ne');
}

function setupTableView() {
  const grid = document.querySelector('#periodic-grid, #state-periodic-grid');
  if (!grid || typeof HTMLDialogElement === 'undefined') return;
  document.body.classList.add('lab-table-page');
  const panel = grid.closest('.table-panel');
  const heading = panel.querySelector('.panel-heading');
  const scroll = grid.closest('.periodic-scroll');
  const content = document.createElement('div');
  content.className = 'lab-table-body';
  const hint = document.createElement('p');
  hint.className = 'lab-table-hint';
  hint.textContent = t('向左或向右捲動看其他族，或展開週期表。', 'Scroll sideways for more groups, or expand the table.');
  scroll.before(content);
  content.append(hint);
  while (content.nextElementSibling) content.append(content.nextElementSibling);

  const trigger = document.createElement('button');
  trigger.type = 'button';
  trigger.className = 'lab-table-expand';
  trigger.setAttribute('aria-haspopup', 'dialog');
  trigger.textContent = t('展開全表', 'Expand table');
  heading.append(trigger);

  const dialog = document.createElement('dialog');
  dialog.className = 'lab-table-dialog';
  dialog.setAttribute('aria-labelledby', 'lab-table-title');
  dialog.innerHTML = `<div class="lab-table-dialog-head">
    <h2 id="lab-table-title">${heading.querySelector('h2').textContent}</h2>
    <form method="dialog"><button class="lab-table-close" autofocus>${t('關閉全表', 'Close table')}</button></form>
  </div>
  <p class="lab-table-hint lab-table-expanded-hint">${t('點選元素查看資料，或左右捲動看其他族。', 'Select an element for details. Scroll sideways if needed.')}</p>`;
  panel.after(dialog);

  const resize = () => {
    hint.hidden = dialog.open || scroll.scrollWidth <= scroll.clientWidth + 1;
  };
  new ResizeObserver(resize).observe(scroll);
  trigger.addEventListener('click', () => {
    const offset = scroll.scrollLeft;
    // Safari does not focus a button on pointer click. Set the return target
    // before opening so the dialog can restore focus on close.
    trigger.focus({ preventScroll: true });
    dialog.append(content);
    dialog.showModal();
    scroll.scrollLeft = 0;
    dialog.scrollTop = 0;
    resize();
    dialog.addEventListener('close', () => {
      panel.append(content);
      scroll.scrollLeft = offset;
      resize();
    }, { once: true });
  });
}

function setupNavigation() {
  const menu = document.querySelector('#menu-button');
  const backdrop = document.querySelector('#nav-backdrop');
  const sidebar = document.querySelector('.sidebar');
  const narrow = matchMedia(document.body.matches('.lab-table-page, .lab-experiment-page')
    ? '(max-width: 760px), (max-width: 1100px) and (orientation: portrait)'
    : '(max-width: 760px)');
  const syncSidebar = () => {
    sidebar.inert = narrow.matches && !document.body.classList.contains('menu-open');
  };
  const close = (restoreFocus = false) => {
    const wasOpen = document.body.classList.contains('menu-open');
    document.body.classList.remove('menu-open');
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', t('開啟課堂目錄', 'Open lesson contents'));
    backdrop.hidden = true;
    syncSidebar();
    if (restoreFocus && wasOpen) menu.focus();
  };
  menu.setAttribute('aria-label', t('開啟課堂目錄', 'Open lesson contents'));
  backdrop.setAttribute('aria-label', t('關閉課堂目錄', 'Close lesson contents'));
  menu.addEventListener('click', () => {
    const open = !document.body.classList.contains('menu-open');
    document.body.classList.toggle('menu-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? t('關閉課堂目錄', 'Close lesson contents') : t('開啟課堂目錄', 'Open lesson contents'));
    backdrop.hidden = !open;
    syncSidebar();
  });
  backdrop.addEventListener('click', () => close(true));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(true); });
  narrow.addEventListener('change', () => close());
  syncSidebar();
  document.querySelectorAll('[data-language]').forEach((button) => button.addEventListener('click', () => {
    const url = new URL(location.href);
    url.searchParams.set('lang', button.dataset.language);
    location.href = url.href;
  }));
}

renderShell();
setupTableView();
document.body.classList.toggle('lab-experiment-page', ['group1', 'group2'].includes(activeLesson?.id));
setupNavigation();
setupQuiz();
void setupMap();
void setupStateTable();
setupPhaseComparison(t);
void setupGroupLocators();
setupPosition();
setupAlkaliDemo(t);
setupAcidLab(t);
setupHalogens();
setupNoble();
