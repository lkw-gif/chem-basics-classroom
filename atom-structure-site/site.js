import { setupLearningLabs } from './learning-labs.js';

const bi = (zh, en) => `<span class="zh">${zh}</span><span class="en">${en}</span>`;
const quizzes = {
  earth: {
    questions: [
      { q: ['地殼中含量最多的元素是甚麼？', 'Which element is most abundant in Earth’s crust?'], choices: [['氧', 'Oxygen'], ['矽', 'Silicon'], ['鋁', 'Aluminium']], answer: 0, why: ['氧約佔地殼質量的 49.9%。', 'Oxygen makes up about 49.9% of the crust by mass.'] },
      { q: ['地殼中含量最高的金屬元素是甚麼？', 'Which metal is most abundant in Earth’s crust?'], choices: [['鐵', 'Iron'], ['鋁', 'Aluminium'], ['鈣', 'Calcium']], answer: 1, why: ['氧最多；鋁是含量最高的金屬。', 'Oxygen is the most abundant element; aluminium is the most abundant metal.'] },
      { q: ['以下哪一種元素是天然存在的？', 'Which of these elements occurs naturally?'], choices: [['氧', 'Oxygen'], ['鋦', 'Curium'], ['鉲', 'Californium']], answer: 0, why: ['氧天然存在於空氣、水和岩石中。', 'Oxygen occurs naturally in air, water and rocks.'] },
    ],
  },
  atom: {
    questions: [
      { q: ['一種元素由甚麼組成？', 'What is an element made of?'], choices: [['同一種原子', 'One type of atom'], ['不同原子化學結合', 'Different atoms chemically joined'], ['兩種物質混在一起', 'Two substances mixed together']], answer: 0, why: ['元素只含一種原子。', 'An element contains just one type of atom.'] },
      { q: ['所有物質都是由甚麼組成？', 'What is all matter made of?'], choices: [['原子', 'Atoms'], ['水滴', 'Water drops'], ['金屬', 'Metals']], answer: 0, why: ['原子是組成物質的基本粒子。', 'Atoms are the basic particles that make up matter.'] },
      { q: ['把銅不斷分成更小的部分，會到達甚麼基本粒子？', 'If copper is divided into smaller and smaller pieces, what basic particle do we reach?'], choices: [['銅原子', 'A copper atom'], ['氧原子', 'An oxygen atom'], ['水分子', 'A water molecule']], answer: 0, why: ['一種元素再細分，基本粒子是該元素的原子。', 'The basic particle of an element is an atom of that element.'] },
    ],
  },
  types: {
    questions: [
      { q: ['哪一種元素是類金屬？', 'Which element is a metalloid?'], choices: [['矽', 'Silicon'], ['鈉', 'Sodium'], ['氧', 'Oxygen']], answer: 0, why: ['矽有些性質像金屬，有些像非金屬。', 'Silicon has some properties of metals and some of non-metals.'] },
      { q: ['哪一種物質通常善於導電？', 'Which type of substance usually conducts electricity well?'], choices: [['金屬', 'Metals'], ['非金屬', 'Non-metals'], ['氣體', 'Gases']], answer: 0, why: ['金屬通常善於導電；石墨是例外的非金屬。', 'Metals usually conduct electricity well; graphite is a non-metal exception.'] },
      { q: ['在 −70 °C，元素 Y（熔點 −110 °C，沸點 −40 °C）是甚麼狀態？', 'At −70 °C, what state is element Y in (melting point −110 °C; boiling point −40 °C)?'], choices: [['固體', 'Solid'], ['液體', 'Liquid'], ['氣體', 'Gas']], answer: 1, why: ['−70 °C 高於熔點、低於沸點，所以 Y 是液體。', '−70 °C is above the melting point and below the boiling point, so Y is a liquid.'] },
    ],
  },
  structure: {
    questions: [
      { q: ['中性原子的質子數和電子數有甚麼關係？', 'In a neutral atom, how do the numbers of protons and electrons compare?'], choices: [['相同', 'They are equal'], ['電子數多一倍', 'There are twice as many electrons'], ['沒有固定關係', 'There is no fixed relationship']], answer: 0, why: ['相同數目的正電和負電會互相抵銷。', 'Equal amounts of positive and negative charge cancel out.'] },
      { q: ['哪一種原子粒子帶 −1 電荷？', 'Which atomic particle has a charge of −1?'], choices: [['質子', 'Proton'], ['中子', 'Neutron'], ['電子', 'Electron']], answer: 2, why: ['電子帶 −1 電荷；質子帶 +1，中子不帶電。', 'An electron has a −1 charge; a proton is +1 and a neutron has no charge.'] },
      { q: ['質子和中子位於原子的哪裏？', 'Where are protons and neutrons found in an atom?'], choices: [['原子核內', 'In the nucleus'], ['原子核外', 'Outside the nucleus'], ['電子層內', 'In the electron shells']], answer: 0, why: ['原子核由質子和中子組成；電子在核外。', 'The nucleus contains protons and neutrons; electrons are outside it.'] },
    ],
  },
  numbers: {
    questions: [
      { q: ['鈉-23 的原子序是 11。它有多少粒中子？', 'Sodium-23 has atomic number 11. How many neutrons does it have?'], choices: [['11', '11'], ['12', '12'], ['23', '23']], answer: 1, why: ['中子數＝質量數 − 原子序＝23 − 11＝12。', 'Neutrons = mass number − atomic number = 23 − 11 = 12.'] },
      { q: ['原子序代表甚麼？', 'What does the atomic number tell us?'], choices: [['質子數', 'Number of protons'], ['中子數', 'Number of neutrons'], ['質子和中子的總數', 'Total number of protons and neutrons']], answer: 0, why: ['原子序就是原子核內的質子數。', 'The atomic number is the number of protons in the nucleus.'] },
      { q: ['中性的鈉原子有 11 粒質子。它有多少粒電子？', 'A neutral sodium atom has 11 protons. How many electrons does it have?'], choices: [['10', '10'], ['11', '11'], ['12', '12']], answer: 1, why: ['中性原子的質子數和電子數相同。', 'A neutral atom has the same number of protons and electrons.'] },
    ],
  },
  isotopes: {
    questions: [
      { q: ['氯-35 和氯-37 有甚麼相同之處？', 'What is the same in chlorine-35 and chlorine-37?'], choices: [['質子數', 'Number of protons'], ['中子數', 'Number of neutrons'], ['質量數', 'Mass number']], answer: 0, why: ['兩者都是氯，原子序都是 17，所以各有 17 粒質子。', 'Both are chlorine with atomic number 17, so each has 17 protons.'] },
      { q: ['氯-37 有 17 粒質子。它有多少粒中子？', 'Chlorine-37 has 17 protons. How many neutrons does it have?'], choices: [['17', '17'], ['20', '20'], ['37', '37']], answer: 1, why: ['中子數＝質量數 − 質子數＝37 − 17＝20。', 'Neutrons = mass number − protons = 37 − 17 = 20.'] },
      { q: ['同一元素的同位素通常有甚麼相同？', 'What is usually the same for isotopes of one element?'], choices: [['化學性質', 'Chemical properties'], ['中子數', 'Number of neutrons'], ['質量數', 'Mass number']], answer: 0, why: ['同位素有相同質子數和電子排佈，因此化學性質相近。', 'Isotopes have the same number of protons and electron arrangement, so their chemical properties are similar.'] },
    ],
  },
  average: {
    questions: [
      { q: ['氯-35 佔 75%，氯-37 佔 25%。相對原子質量是多少？', 'Chlorine-35 is 75% and chlorine-37 is 25%. What is the relative atomic mass?'], choices: [['35', '35'], ['35.5', '35.5'], ['36.5', '36.5']], answer: 1, why: ['(35 × 75 + 37 × 25) ÷ 100＝35.5。', '(35 × 75 + 37 × 25) ÷ 100 = 35.5.'] },
      { q: ['哪個氯同位素在自然界中較多？', 'Which chlorine isotope is more abundant in nature?'], choices: [['氯-35', 'Chlorine-35'], ['氯-37', 'Chlorine-37'], ['兩者一樣多', 'They are equally abundant']], answer: 0, why: ['氯-35 約佔 75%，所以天然氯的平均質量較接近 35。', 'Chlorine-35 makes up about 75%, so the average mass is closer to 35.'] },
      { q: ['同位素的天然比例會影響甚麼？', 'What is affected by the natural abundances of isotopes?'], choices: [['相對原子質量', 'Relative atomic mass'], ['原子序', 'Atomic number'], ['質子電荷', 'Proton charge']], answer: 0, why: ['相對原子質量是按天然比例計算出的平均值。', 'Relative atomic mass is an average calculated using natural abundances.'] },
    ],
  },
  shells: {
    questions: [
      { q: ['氯原子的電子排佈是哪一個？', 'Which is the electron arrangement of chlorine?'], choices: [['2, 8, 7', '2, 8, 7'], ['2, 7, 8', '2, 7, 8'], ['2, 8, 8', '2, 8, 8']], answer: 0, why: ['氯有 17 粒電子，排佈是 2、8、7。', 'Chlorine has 17 electrons, arranged 2, 8, 7.'] },
      { q: ['第一電子層最多可有多少粒電子？', 'What is the maximum number of electrons in the first shell?'], choices: [['2', '2'], ['8', '8'], ['18', '18']], answer: 0, why: ['第一層最多容納 2 粒電子。', 'The first shell can hold up to 2 electrons.'] },
      { q: ['鉀原子的電子排佈是哪一個？', 'Which is the electron arrangement of potassium?'], choices: [['2, 8, 1', '2, 8, 1'], ['2, 8, 8, 1', '2, 8, 8, 1'], ['2, 8, 8, 2', '2, 8, 8, 2']], answer: 1, why: ['鉀有 19 粒電子；首二十種元素的簡化排佈是 2、8、8、1。', 'Potassium has 19 electrons; its simplified arrangement is 2, 8, 8, 1.'] },
    ],
  },
};

const firstTwenty = [
  { n: 1, s: 'H', zh: '氫', en: 'Hydrogen', mass: 1, shells: [1] },
  { n: 2, s: 'He', zh: '氦', en: 'Helium', mass: 4, shells: [2] },
  { n: 3, s: 'Li', zh: '鋰', en: 'Lithium', mass: 7, shells: [2, 1] },
  { n: 4, s: 'Be', zh: '鈹', en: 'Beryllium', mass: 9, shells: [2, 2] },
  { n: 5, s: 'B', zh: '硼', en: 'Boron', mass: 11, shells: [2, 3] },
  { n: 6, s: 'C', zh: '碳', en: 'Carbon', mass: 12, shells: [2, 4] },
  { n: 7, s: 'N', zh: '氮', en: 'Nitrogen', mass: 14, shells: [2, 5] },
  { n: 8, s: 'O', zh: '氧', en: 'Oxygen', mass: 16, shells: [2, 6] },
  { n: 9, s: 'F', zh: '氟', en: 'Fluorine', mass: 19, shells: [2, 7] },
  { n: 10, s: 'Ne', zh: '氖', en: 'Neon', mass: 20, shells: [2, 8] },
  { n: 11, s: 'Na', zh: '鈉', en: 'Sodium', mass: 23, shells: [2, 8, 1] },
  { n: 12, s: 'Mg', zh: '鎂', en: 'Magnesium', mass: 24, shells: [2, 8, 2] },
  { n: 13, s: 'Al', zh: '鋁', en: 'Aluminium', mass: 27, shells: [2, 8, 3] },
  { n: 14, s: 'Si', zh: '矽', en: 'Silicon', mass: 28, shells: [2, 8, 4] },
  { n: 15, s: 'P', zh: '磷', en: 'Phosphorus', mass: 31, shells: [2, 8, 5] },
  { n: 16, s: 'S', zh: '硫', en: 'Sulphur', mass: 32, shells: [2, 8, 6] },
  { n: 17, s: 'Cl', zh: '氯', en: 'Chlorine', mass: 35, shells: [2, 8, 7] },
  { n: 18, s: 'Ar', zh: '氬', en: 'Argon', mass: 40, shells: [2, 8, 8] },
  { n: 19, s: 'K', zh: '鉀', en: 'Potassium', mass: 39, shells: [2, 8, 8, 1] },
  { n: 20, s: 'Ca', zh: '鈣', en: 'Calcium', mass: 40, shells: [2, 8, 8, 2] },
];

let periodicElements = [];
let builderAtomicNumber = 1;
let builderNeutrons = 0;
let builderElectrons = 1;
let builderRenderedAtomicNumber = 0;
let builderLastChange = 'preset';
let refreshLearningLabs = () => {};
let selectedStateMaterial = 'water';
let selectedTemperature = 20;
let stateMotion = null;

const stateMaterials = {
  water: { zh: '水', en: 'Water', melting: 0, boiling: 100, min: -50, max: 150 },
  oxygen: { zh: '氧', en: 'Oxygen', melting: -219, boiling: -183, min: -260, max: -160 },
  bromine: { zh: '溴', en: 'Bromine', melting: -7, boiling: 59, min: -80, max: 120 },
  mercury: { zh: '汞', en: 'Mercury', melting: -39, boiling: 357, min: -100, max: 500 },
  iron: { zh: '鐵', en: 'Iron', melting: 1538, boiling: 2862, min: 1400, max: 3000 },
};

const sessionIds = ['earth', 'atom', 'types', 'structure', 'numbers', 'isotopes', 'average', 'shells'];
const sessionUrl = (id, language = getLanguage()) => `./sessions/${id}/?lang=${language}`;

function setupPage() {
  const match = location.pathname.match(/\/sessions\/([a-z]+)\/?$/);
  const current = match?.[1] && sessionIds.includes(match[1]) ? match[1] : null;
  const isLesson = Boolean(current);
  document.body.dataset.page = isLesson ? 'lesson' : 'home';
  document.body.dataset.activeSession = current || '';
  const activeSection = current ? document.querySelector(`#${current}`) : null;

  if (!isLesson) return;

  activeSection.classList.add('active');
  const title = activeSection.querySelector(`.section-head h2 .${getLanguage()}`).textContent.trim().replace(/\s+/g, ' ');
  document.title = `${title} · ${getLanguage() === 'en' ? 'Atomic Structure' : '原子結構'}`;
  document.querySelector('#session-pager-top').innerHTML = createPager(current, true);
  document.querySelector('#session-pager-top').hidden = false;
  const bottomPager = document.createElement('div');
  bottomPager.className = 'session-pager session-pager-bottom';
  bottomPager.innerHTML = createPager(current, false);
  activeSection.after(bottomPager);
}

function createPager(current, isTop) {
  const index = sessionIds.indexOf(current);
  const previous = index > 0 ? sessionIds[index - 1] : null;
  const next = index < sessionIds.length - 1 ? sessionIds[index + 1] : null;
  const section = document.querySelector(`#${current}`);
  const title = section.querySelector('.section-head h2').innerHTML;
  const previousLink = previous
    ? `<a class="pager-button pager-previous" data-session-link="${previous}" href="${sessionUrl(previous)}"><span aria-hidden="true">←</span><span>${bi('上一課', 'Previous')}</span></a>`
    : '<span class="pager-button pager-disabled" aria-disabled="true">←</span>';
  const nextLink = next
    ? `<a class="pager-button pager-next" data-session-link="${next}" href="${sessionUrl(next)}"><span>${bi('下一課', 'Next lesson')}</span><span aria-hidden="true">→</span></a>`
    : `<a class="pager-button pager-next" data-home-link href="./?lang=${getLanguage()}#sessions"><span>${bi('完成 · 回課程目錄', 'Finish · all lessons')}</span><span aria-hidden="true">✓</span></a>`;
  if (isTop) {
    return `<div class="lesson-breadcrumb"><a data-home-link href="./?lang=${getLanguage()}#sessions">${bi('中三化學', 'Form 3 Chemistry')}</a><span aria-hidden="true">/</span><b>${title}</b><span class="breadcrumb-count">${String(index + 1).padStart(2, '0')} / 08</span></div>`;
  }
  return `<div class="pager-current"><small>${bi(`第 ${String(index + 1).padStart(2, '0')} 課`, `SESSION ${String(index + 1).padStart(2, '0')} / 08`)}</small></div>
    <div class="pager-actions">${previousLink}${nextLink}</div>`;
}

function getLanguage() {
  const query = new URL(location.href).searchParams.get('lang');
  if (query === 'en' || query === 'zh') return query;
  return localStorage.getItem('atomic-structure-language') === 'en' ? 'en' : 'zh';
}

function setLanguage(language, updateUrl = true) {
  document.documentElement.classList.toggle('lang-en', language === 'en');
  document.documentElement.classList.toggle('lang-zh', language !== 'en');
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-Hant-HK';
  document.querySelector('.skip-link').href = `${location.pathname}?lang=${language}#main`;
  if (document.body.dataset.activeSession) {
    const activeTitle = document.querySelector(`#${document.body.dataset.activeSession} .section-head h2 .${language}`).textContent.trim().replace(/\s+/g, ' ');
    document.title = `${activeTitle} · ${language === 'en' ? 'Atomic Structure' : '原子結構'}`;
  }
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  localStorage.setItem('atomic-structure-language', language);
  document.querySelector('.back-link').href = `../?lang=${language}#start`;
  document.querySelector('.brand').href = `./?lang=${language}#top`;
  document.querySelector('.mobile-menu').setAttribute('aria-label', language === 'en' ? 'Open lesson contents' : '開啟課堂目錄');
  document.querySelector('.nav-backdrop').setAttribute('aria-label', language === 'en' ? 'Close lesson contents' : '關閉課堂目錄');
  const selected = firstTwenty.find((element) => element.n === Number(document.querySelector('#shell-atomic').textContent));
  if (selected) document.querySelector('#shell-diagram').setAttribute('aria-label', language === 'en' ? `Electron shell diagram for ${selected.en}` : `${selected.zh}原子的電子層示意圖`);
  document.querySelectorAll('[data-session], [data-session-card], [data-session-link]').forEach((link) => {
    link.href = sessionUrl(link.dataset.session || link.dataset.sessionCard || link.dataset.sessionLink, language);
  });
  document.querySelectorAll('[data-home-link]').forEach((link) => {
    link.href = `./?lang=${language}#sessions`;
  });
  document.querySelectorAll('[data-quiz]').forEach((root) => {
    root.querySelectorAll('.checkpoint-options').forEach((group, index) => {
      group.setAttribute('aria-label', quizzes[root.dataset.quiz].questions[index].q[language === 'en' ? 1 : 0]);
    });
  });
  document.querySelectorAll('#state-substance option').forEach((option) => {
    option.textContent = option.dataset[language];
  });
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  }
  renderPeriodicTable(language);
  renderStateLab();
  renderProtonBuilder();
  refreshLearningLabs();
}

function renderQuiz(id, data) {
  const root = document.querySelector(`[data-quiz="${id}"]`);
  if (!root) return;
  root.innerHTML = `
    <div class="checkpoint-head"><span class="checkpoint-badge">CHECKPOINT</span><b>${bi('小測一下', 'Quick check')}</b><span class="checkpoint-count">${id.toUpperCase()} / ${String(data.questions.length).padStart(2, '0')}</span></div>
    <div class="checkpoint-list">${data.questions.map((question, questionIndex) => `
      <article class="checkpoint-item">
        <p class="checkpoint-question"><span class="question-number">${String(questionIndex + 1).padStart(2, '0')}</span>${bi(question.q[0], question.q[1])}</p>
        <div class="checkpoint-options" role="group" aria-label="${question.q[getLanguage() === 'en' ? 1 : 0]}">
          ${question.choices.map((choice, index) => `<button type="button" data-question="${questionIndex}" data-choice="${index}" aria-pressed="false"><i class="choice-letter">${String.fromCharCode(65 + index)}</i>${bi(choice[0], choice[1])}</button>`).join('')}
        </div>
        <p class="checkpoint-feedback" aria-live="polite" hidden></p>
        <button type="button" class="checkpoint-reset">${bi('重新作答', 'Try again')}</button>
      </article>`).join('')}
    </div>`;

  root.querySelectorAll('.checkpoint-item').forEach((item) => {
    const questionIndex = Number(item.querySelector('[data-question]').dataset.question);
    const question = data.questions[questionIndex];
    const feedback = item.querySelector('.checkpoint-feedback');
    item.querySelectorAll('[data-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        const choice = Number(button.dataset.choice);
        item.classList.add('answered');
        item.querySelectorAll('[data-choice]').forEach((option) => {
          const index = Number(option.dataset.choice);
          option.classList.toggle('selected', index === choice);
          option.classList.toggle('correct', index === question.answer);
          option.classList.toggle('incorrect', index === choice && choice !== question.answer);
          option.setAttribute('aria-pressed', String(index === choice));
        });
        feedback.hidden = false;
        feedback.classList.toggle('try-again', choice !== question.answer);
        feedback.innerHTML = choice === question.answer
          ? `${bi('答對了！', 'Correct!')} ${bi(question.why[0], question.why[1])}`
          : `${bi('再想一想。', 'Try again.')} ${bi(question.why[0], question.why[1])}`;
      });
    });
    item.querySelector('.checkpoint-reset').addEventListener('click', () => {
      item.classList.remove('answered');
      feedback.hidden = true;
      feedback.classList.remove('try-again');
      feedback.replaceChildren();
      item.querySelectorAll('[data-choice]').forEach((option) => {
        option.classList.remove('selected', 'correct', 'incorrect');
        option.setAttribute('aria-pressed', 'false');
      });
    });
  });
}

function renderFirstTwenty() {
  document.querySelector('#first-twenty').innerHTML = firstTwenty.map((element) =>
    `<div><b>${element.n}</b><strong>${element.s}</strong><span>${bi(element.zh, element.en)}</span></div>`,
  ).join('');
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function elementCategory(element, language) {
  if (element.categoryProvisional) return language === 'en' ? 'Still being studied' : '性質仍在研究';
  const labels = language === 'en'
    ? { metal: 'Metal', nonmetal: 'Non-metal', metalloid: 'Metalloid' }
    : { metal: '金屬', nonmetal: '非金屬', metalloid: '類金屬' };
  return labels[element.category] || (language === 'en' ? 'Element' : '元素');
}

function renderPeriodicTable(language = getLanguage()) {
  const grid = document.querySelector('#atomic-periodic-grid');
  const detail = document.querySelector('#atomic-periodic-detail');
  if (!grid || !detail || !periodicElements.length) return;
  document.querySelector('.atomic-periodic .periodic-scroll')?.setAttribute('aria-label', language === 'en' ? 'Periodic table; scroll sideways on smaller screens' : '元素週期表；小螢幕可左右滑動');
  const selectedNumber = Number(grid.dataset.selected || 29);
  const selected = periodicElements.find((element) => element.atomicNumber === selectedNumber) || periodicElements[28];
  const category = (element) => element.categoryProvisional ? 'research' : element.category;
  const languageKey = language === 'en' ? 'en' : 'zh';
  const label = (element) => languageKey === 'en' ? element.nameEn : element.nameZh;
  grid.innerHTML = Array.from({ length: 18 }, (_, index) => `<span class="table-axis" style="grid-column:${index + 2};grid-row:1">${index + 1}</span>`).join('')
    + Array.from({ length: 7 }, (_, index) => `<span class="table-axis period-axis" style="grid-column:1;grid-row:${index + 2}">${index + 1}</span>`).join('')
    + periodicElements.map((element) => {
      const inFirstTwenty = element.atomicNumber <= 20;
      const elementLabel = `${element.atomicNumber}, ${element.symbol}, ${label(element)}${element.inNotes ? (language === 'en' ? ', in this lesson' : '，本課常用') : ''}`;
      return `<button type="button" aria-pressed="${element.atomicNumber === selectedNumber}" aria-label="${escapeHTML(elementLabel)}" title="${escapeHTML(`${element.atomicNumber} · ${element.symbol} · ${label(element)}`)}" class="element-cell ${category(element)}${inFirstTwenty ? ' first-twenty' : ''}${element.inNotes ? ' in-notes' : ''}" style="grid-column:${element.column + 1};grid-row:${element.row >= 8 ? element.row + 2 : element.row + 1}" data-atomic-number="${element.atomicNumber}"><span class="atomic-number">${element.atomicNumber}</span><strong>${escapeHTML(element.symbol)}</strong><span class="cell-name">${escapeHTML(label(element))}</span>${element.inNotes ? '<i aria-hidden="true"></i>' : ''}</button>`;
    }).join('')
    + '<span class="series-placeholder" style="grid-column:4;grid-row:7">57–71<br />↓</span><span class="series-placeholder" style="grid-column:4;grid-row:8">89–103<br />↓</span><span class="series-label" style="grid-column:1 / 4;grid-row:10">57–71</span><span class="series-label" style="grid-column:1 / 4;grid-row:11">89–103</span>';
  grid.dataset.selected = String(selected.atomicNumber);
  grid.classList.toggle('highlight-first20', document.querySelector('#highlight-first20')?.checked !== false);
  grid.querySelectorAll('[data-atomic-number]').forEach((button) => button.addEventListener('click', () => {
    grid.dataset.selected = button.dataset.atomicNumber;
    renderPeriodicTable(getLanguage());
  }));
  const info = language === 'en' ? (selected.infoEn || `${selected.nameEn} has the symbol ${selected.symbol} and atomic number ${selected.atomicNumber}.`) : selected.info;
  const use = language === 'en' ? selected.useEn : selected.use;
  const categoryText = elementCategory(selected, language);
  detail.innerHTML = `<div class="large-element ${category(selected)}"><small>${selected.atomicNumber}</small><strong>${escapeHTML(selected.symbol)}</strong><span>${escapeHTML(label(selected))}</span></div><div class="periodic-description"><div><span class="type-tag">${escapeHTML(categoryText)}</span>${selected.inNotes ? `<span class="notes-element-tag">${language === 'en' ? 'In this lesson' : '本課常用'}</span>` : ''}</div><h4>${escapeHTML(label(selected))}<small>${escapeHTML(language === 'en' ? selected.symbol : selected.nameEn)}</small></h4><p>${escapeHTML(info || '')}</p>${use ? `<p><b>${language === 'en' ? 'A use: ' : '生活用途：'}</b>${escapeHTML(use)}</p>` : ''}</div>`;
}

function setupPeriodicTable() {
  const root = document.querySelector('#atomic-periodic-grid');
  if (!root) return;
  document.querySelector('#highlight-first20')?.addEventListener('change', () => renderPeriodicTable());
  fetch('./periodic-elements.json')
    .then((response) => {
      if (!response.ok) throw new Error(`Periodic table data returned ${response.status}`);
      return response.json();
    })
    .then((elements) => {
      periodicElements = elements;
      renderPeriodicTable();
    })
    .catch((error) => {
      console.error(error);
      root.innerHTML = `<p class="periodic-load-error">${bi('週期表暫時未能載入。', 'The periodic table could not be loaded.')}</p>`;
    });
}

function stateOf(material, temperature) {
  if (temperature < material.melting) return 'solid';
  if (temperature === material.melting) return 'melting';
  if (temperature < material.boiling) return 'liquid';
  if (temperature === material.boiling) return 'boiling';
  return 'gas';
}

function renderStateLab() {
  const lab = document.querySelector('[data-state-lab]');
  if (!lab) return;
  const language = getLanguage();
  const material = stateMaterials[selectedStateMaterial];
  lab.setAttribute('aria-label', language === 'en' ? 'Try different temperatures' : '試試不同溫度');
  lab.querySelector('.phase-shortcuts').setAttribute('aria-label',
    language === 'en' ? 'Choose a temperature near a phase change' : '選擇不同狀態的溫度');
  const range = lab.querySelector('#state-temperature');
  const number = lab.querySelector('#state-temperature-number');
  const particleBox = lab.querySelector('#state-particles');
  const phase = stateOf(material, selectedTemperature);
  const stateLabels = {
    solid: ['固體', 'Solid'],
    melting: ['正在熔化', 'Melting'],
    liquid: ['液體', 'Liquid'],
    boiling: ['正在沸騰', 'Boiling'],
    gas: ['氣體', 'Gas'],
  }[phase];
  const low = material.melting;
  const high = material.boiling;
  let explanation;
  if (phase === 'solid') explanation = language === 'en' ? `At ${selectedTemperature} °C, the temperature is below the melting point (${low} °C).` : `在 ${selectedTemperature} °C，溫度低於熔點（${low} °C）。`;
  else if (phase === 'melting') explanation = language === 'en' ? `At the melting point (${low} °C), solid and liquid are both present.` : `到達熔點（${low} °C）時，固體和液體會同時出現。`;
  else if (phase === 'liquid') explanation = language === 'en' ? `At ${selectedTemperature} °C, the temperature is between the melting point (${low} °C) and boiling point (${high} °C).` : `在 ${selectedTemperature} °C，溫度介乎熔點（${low} °C）和沸點（${high} °C）之間。`;
  else if (phase === 'boiling') explanation = language === 'en' ? `At the boiling point (${high} °C), liquid and gas are both present.` : `到達沸點（${high} °C）時，液體和氣體會同時出現。`;
  else explanation = language === 'en' ? `At ${selectedTemperature} °C, the temperature is above the boiling point (${high} °C).` : `在 ${selectedTemperature} °C，溫度高於沸點（${high} °C）。`;
  range.min = material.min;
  range.max = material.max;
  range.value = selectedTemperature;
  range.setAttribute('aria-label', language === 'en' ? 'Temperature in degrees Celsius' : '攝氏溫度');
  number.min = material.min;
  number.max = material.max;
  if (document.activeElement !== number) number.value = selectedTemperature;
  number.setAttribute('aria-label', language === 'en' ? 'Temperature in degrees Celsius' : '攝氏溫度');
  lab.querySelector('#state-melting-point').textContent = `${material.melting} °C`;
  lab.querySelector('#state-boiling-point').textContent = `${material.boiling} °C`;
  lab.querySelector('#state-badge').textContent = stateLabels[language === 'en' ? 1 : 0];
  lab.querySelector('#state-name').innerHTML = bi(material.zh, material.en);
  lab.querySelector('#state-explanation').textContent = explanation;
  particleBox.dataset.state = phase;
  particleBox.setAttribute('aria-label', language === 'en' ? `${material.en} particle model: ${stateLabels[1]}` : `${material.zh}粒子示意圖：${stateLabels[0]}`);
  const motionDescriptions = {
    solid: ['粒子留在固定位置，輕微振動。', 'Particles vibrate gently in fixed positions.'],
    melting: ['有些粒子仍在原位振動，有些開始滑動。', 'Some particles still vibrate in place; others begin to slide.'],
    liquid: ['粒子靠近，但可以互相滑動。', 'Particles stay close but slide past one another.'],
    boiling: ['有些粒子仍然靠近，有些已經散開。', 'Some particles remain close; others spread apart.'],
    gas: ['粒子分散，向不同方向移動。', 'Particles spread out and move in different directions.'],
  };
  lab.querySelector('#state-motion-description').textContent =
    motionDescriptions[phase][language === 'en' ? 1 : 0];
  lab.querySelectorAll('[data-phase]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.phase === phase));
  });
  const heatButton = lab.querySelector('#state-auto-heat');
  heatButton.innerHTML = heatButton.getAttribute('aria-pressed') === 'true'
    ? bi('⏸ 暫停加熱', '⏸ Pause heating')
    : bi('▶ 從低溫播放加熱', '▶ Play heating from cold');
  stateMotion?.setPhase(phase, selectedStateMaterial, selectedTemperature);
}

function createStateMotion(canvas) {
  const context = canvas.getContext('2d');
  if (!context) return { setPhase() {} };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const palette = {
    water: ['#47a8bb', '#247c94'],
    oxygen: ['#e47b85', '#b6495c'],
    bromine: ['#c27a53', '#915039'],
    mercury: ['#b4c1c8', '#667e8b'],
    iron: ['#9eafb9', '#5f7887'],
  };
  const particles = Array.from({ length: 24 }, (_, index) => ({
    x: 0.2 + (index % 6) * 0.12,
    y: 0.56 + Math.floor(index / 6) * 0.1,
    vx: Math.cos(index * 2.4) || 0.6,
    vy: Math.sin(index * 2.4) || 0.5,
    seed: index * 1.71,
  }));
  let width = 0;
  let height = 0;
  let phase = 'liquid';
  let material = 'water';
  let temperature = 20;
  let firstPhase = true;
  let visible = false;
  let frameId = 0;
  let lastTime = 0;

  const modeOf = (index) => {
    if (phase === 'melting') return index < 12 ? 'solid' : 'liquid';
    if (phase === 'boiling') return index < 12 ? 'liquid' : 'gas';
    return phase;
  };
  const targetOf = (index, mode) => {
    const column = index % 6;
    const row = Math.floor(index / 6);
    if (mode === 'solid') {
      return phase === 'melting'
        ? [0.12 + column * 0.06, 0.7 + row * 0.12]
        : [0.2 + column * 0.12, 0.56 + row * 0.1];
    }
    if (mode === 'liquid') {
      const staggerX = Math.sin(index * 2.35) * 0.027;
      const staggerY = Math.cos(index * 3.1) * 0.022;
      if (phase === 'melting') {
        return [0.58 + column * 0.06 + staggerX * 0.4,
          0.7 + (row - 2) * 0.12 + staggerY];
      }
      return [0.2 + column * 0.12 + staggerX,
        (phase === 'boiling' ? 0.7 + row * 0.12 : 0.58 + row * 0.1) + staggerY];
    }
    if (phase === 'boiling') return [0.12 + column * 0.15, 0.16 + (row - 2) * 0.22];
    return [0.12 + column * 0.15, 0.14 + row * 0.22];
  };
  function draw() {
    if (!width || !height) return;
    context.clearRect(0, 0, width, height);
    const [light, dark] = palette[material];
    particles.forEach((particle) => {
      const x = particle.x * width;
      const y = particle.y * height;
      const radius = Math.max(5, Math.min(7.5, width / 35));
      const gradient = context.createRadialGradient(x - radius * 0.35, y - radius * 0.4, 1, x, y, radius);
      gradient.addColorStop(0, '#ffffff');
      gradient.addColorStop(0.35, light);
      gradient.addColorStop(1, dark);
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();
      context.strokeStyle = '#ffffffb8';
      context.lineWidth = 1;
      context.stroke();
    });
  }
  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;
    height = bounds.height;
    if (!width || !height) return;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    draw();
  }
  function tick(now) {
    const elapsed = Math.min((now - (lastTime || now)) / 1000, 0.05);
    lastTime = now;
    const solidHeat = Math.max(0, Math.min(1,
      (temperature - stateMaterials[material].min) /
      (stateMaterials[material].melting - stateMaterials[material].min)));
    const gasHeat = Math.max(0, Math.min(1,
      (temperature - stateMaterials[material].boiling) /
      (stateMaterials[material].max - stateMaterials[material].boiling)));
    particles.forEach((particle, index) => {
      const mode = modeOf(index);
      if (mode === 'gas') {
        const speed = 0.15 + gasHeat * 0.13;
        particle.x += particle.vx * speed * elapsed;
        particle.y += particle.vy * speed * elapsed;
        if (phase === 'boiling') {
          const [targetX, targetY] = targetOf(index, mode);
          particle.x += (targetX - particle.x) * Math.min(1, elapsed * 0.8);
          particle.y += (targetY - particle.y) * Math.min(1, elapsed * 0.8);
        }
        if (particle.x < 0.05 || particle.x > 0.95) particle.vx *= -1;
        if (particle.y < 0.06 || particle.y > 0.94) particle.vy *= -1;
        particle.x = Math.max(0.05, Math.min(0.95, particle.x));
        particle.y = Math.max(0.06, Math.min(0.94, particle.y));
        return;
      }
      const [baseX, baseY] = targetOf(index, mode);
      const wave = now / 1000 * (mode === 'solid' ? 2 + solidHeat * 4 : 1.5 + solidHeat * 1.5);
      const amplitude = mode === 'solid' ? 0.003 + solidHeat * 0.012 : 0.035;
      const x = baseX + Math.sin(wave + particle.seed) * amplitude;
      const y = baseY + Math.cos(wave * 0.9 + particle.seed * 1.4) * amplitude * 0.6;
      const ease = Math.min(1, elapsed * (mode === 'solid' ? 5 : 2.5));
      particle.x += (x - particle.x) * ease;
      particle.y += (y - particle.y) * ease;
    });
    draw();
    frameId = requestAnimationFrame(tick);
  }
  function stop() {
    cancelAnimationFrame(frameId);
    frameId = 0;
    lastTime = 0;
  }
  function start() {
    if (!visible || document.hidden || reducedMotion.matches || frameId) return;
    frameId = requestAnimationFrame(tick);
  }
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) { resize(); start(); }
    else stop();
  }, { threshold: 0.05 }).observe(canvas);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) stop();
    else start();
    draw();
  });
  return {
    reset() {
      particles.forEach((particle, index) => {
        [particle.x, particle.y] = targetOf(index, modeOf(index));
      });
      draw();
    },
    setPhase(nextPhase, nextMaterial, nextTemperature) {
      phase = nextPhase;
      material = nextMaterial;
      temperature = nextTemperature;
      if (firstPhase || reducedMotion.matches) {
        particles.forEach((particle, index) => {
          [particle.x, particle.y] = targetOf(index, modeOf(index));
        });
        firstPhase = false;
      }
      draw();
      start();
    },
  };
}

function setupStateLab() {
  const lab = document.querySelector('[data-state-lab]');
  if (!lab) return;
  stateMotion = createStateMotion(lab.querySelector('#state-particle-canvas'));
  let heatingTimer = null;
  let heatingValue = selectedTemperature;
  let holdTicks = 0;
  const heatButton = lab.querySelector('#state-auto-heat');
  function stopHeating() {
    if (heatingTimer) clearInterval(heatingTimer);
    heatingTimer = null;
    heatButton.setAttribute('aria-pressed', 'false');
  }
  lab.querySelector('#state-substance').addEventListener('change', (event) => {
    stopHeating();
    selectedStateMaterial = event.target.value;
    const material = stateMaterials[selectedStateMaterial];
    selectedTemperature = Math.round((material.melting + material.boiling) / 2);
    renderStateLab();
  });
  const updateTemperature = (event) => {
    stopHeating();
    const rawValue = event.target.value;
    if (rawValue === '' || rawValue === '-') return;
    const value = Number(rawValue);
    if (!Number.isFinite(value)) return;
    selectedTemperature = Math.max(Number(event.target.min), Math.min(Number(event.target.max), value));
    renderStateLab();
  };
  lab.querySelector('#state-temperature').addEventListener('input', updateTemperature);
  lab.querySelector('#state-temperature-number').addEventListener('input', updateTemperature);
  lab.querySelector('#state-temperature-number').addEventListener('change', updateTemperature);
  lab.querySelector('#state-temperature-number').addEventListener('blur', () => {
    lab.querySelector('#state-temperature-number').value = selectedTemperature;
  });
  lab.querySelectorAll('[data-phase]').forEach((button) => {
    button.addEventListener('click', () => {
      stopHeating();
      const material = stateMaterials[selectedStateMaterial];
      const values = {
        solid: Math.round((material.min + material.melting) / 2),
        melting: material.melting,
        liquid: Math.round((material.melting + material.boiling) / 2),
        boiling: material.boiling,
        gas: Math.round((material.boiling + material.max) / 2),
      };
      selectedTemperature = values[button.dataset.phase];
      renderStateLab();
    });
  });
  heatButton.addEventListener('click', () => {
    if (heatingTimer) {
      stopHeating();
      renderStateLab();
      return;
    }
    const material = stateMaterials[selectedStateMaterial];
    heatingValue = material.min;
    holdTicks = 0;
    selectedTemperature = material.min;
    heatButton.setAttribute('aria-pressed', 'true');
    renderStateLab();
    stateMotion.reset();
    const step = (material.max - material.min) / 180;
    heatingTimer = setInterval(() => {
      if (holdTicks > 0) {
        holdTicks -= 1;
        return;
      }
      let next = Math.min(material.max, heatingValue + step);
      for (const point of [material.melting, material.boiling]) {
        if (heatingValue < point && next >= point) {
          next = point;
          holdTicks = 12;
          break;
        }
      }
      heatingValue = next;
      selectedTemperature = Math.round(next);
      if (heatingValue >= material.max) stopHeating();
      renderStateLab();
    }, 75);
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && heatingTimer) {
      stopHeating();
      renderStateLab();
    }
  });
  renderStateLab();
}

function renderBaseProtonBuilder() {
  const root = document.querySelector('[data-proton-builder]');
  if (!root) return;
  const element = firstTwenty.find((item) => item.n === builderAtomicNumber);
  const neutrons = element.mass - element.n;
  const language = getLanguage();
  const arrangement = element.shells.join(', ');
  root.querySelector('#builder-proton-count').textContent = element.n;
  root.querySelector('#builder-atomic-number').textContent = element.n;
  root.querySelector('#builder-mass-number').textContent = element.mass;
  root.querySelector('#builder-neutron-count').textContent = neutrons;
  root.querySelector('#builder-electron-count').textContent = element.n;
  root.querySelector('#builder-card-number').textContent = element.n;
  root.querySelector('#builder-card-symbol').textContent = element.s;
  root.querySelector('#builder-element-name').innerHTML = `<b>${bi(element.zh, element.en)}</b><small>${language === 'en' ? `Example atom: ${element.s}-${element.mass}` : `原子例子：${element.s}-${element.mass}`}</small>`;
  root.querySelector('#builder-summary-text').innerHTML = language === 'en'
    ? `${element.n === 1 ? 'One proton makes' : `${element.n} protons make`} this element <b>${element.en}</b>. Its electron arrangement is <b>${arrangement}</b>.`
    : `${element.n} 粒質子決定這是<b>${element.zh}</b>。電子排佈是 <b>${arrangement}</b>。`;
  const particles = [];
  for (let index = 0; index < Math.max(element.n, neutrons); index += 1) {
    if (index < element.n) particles.push('p');
    if (index < neutrons) particles.push('n');
  }
  root.querySelector('#builder-nucleus-particles').innerHTML = particles.map((particle) => `<i class="${particle}" aria-hidden="true"></i>`).join('');
  root.querySelector('#builder-model-stage').setAttribute('aria-label', language === 'en'
    ? `${element.en} atom model: ${element.n} protons, ${neutrons} neutrons and ${element.n} electrons in shells ${arrangement}. Not to scale.`
    : `${element.zh}原子模型：${element.n}粒質子、${neutrons}粒中子和${element.n}粒電子，電子排佈為${arrangement}。示意圖並非按比例繪畫。`);
  const shellRadii = [78, 108, 137, 160];
  const shellMarkup = element.shells.map((count, shellIndex) => {
    const radius = shellRadii[shellIndex];
    const electrons = Array.from({ length: count }, (_, index) => {
      const angle = (-90 + (360 / count) * index) * Math.PI / 180;
      const x = 200 + radius * Math.cos(angle);
      const y = 170 + radius * Math.sin(angle);
      return `<g class="builder-electron"><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9"/><text x="${x.toFixed(1)}" y="${(y + 2.6).toFixed(1)}">e⁻</text></g>`;
    }).join('');
    return `<circle class="builder-orbit" cx="200" cy="170" r="${radius}"/><g class="builder-shell-electrons" style="--orbit-time:${12 + shellIndex * 3}s">${electrons}</g>`;
  }).join('');
  root.querySelector('#builder-shell-diagram').innerHTML = shellMarkup;
  root.querySelector('#builder-proton-slider').value = element.n;
  root.querySelector('#builder-proton-slider').setAttribute('aria-valuetext', language === 'en' ? `${element.n} protons, ${element.en}` : `${element.n}粒質子，${element.zh}`);
  root.querySelector('#remove-proton').disabled = element.n <= 1;
  root.querySelector('#add-proton').disabled = element.n >= firstTwenty.length;
  root.querySelector('#builder-proton-slider').setAttribute('aria-label', language === 'en' ? 'Choose an element by proton number' : '用質子數選擇元素');
  const picker = root.querySelector('#builder-element-picker');
  picker.setAttribute('aria-label', language === 'en' ? 'Choose one of the first 20 elements' : '選擇首 20 種元素之一');
  if (!picker.children.length) {
    picker.innerHTML = firstTwenty.map((item) => `<button type="button" class="builder-element-choice" data-atomic-number="${item.n}" title="${item.en} · ${item.zh}"><small>${item.n}</small><b>${item.s}</b></button>`).join('');
  }
  picker.querySelectorAll('[data-atomic-number]').forEach((choice) => {
    const item = firstTwenty[Number(choice.dataset.atomicNumber) - 1];
    choice.setAttribute('aria-pressed', String(item.n === element.n));
    choice.setAttribute('aria-label', `${item.n} ${item.en}${language === 'zh' ? `，${item.zh}` : ''}`);
  });
  root.querySelector('#add-proton').setAttribute('aria-label', language === 'en' ? 'Add one proton' : '加一粒質子');
  root.querySelector('#remove-proton').setAttribute('aria-label', language === 'en' ? 'Remove one proton' : '減一粒質子');
}

function practiceText(zh, en) {
  return getLanguage() === 'en' ? en : zh;
}

function simpleElectronShells(total) {
  let remaining = total;
  const counts = [];
  for (const capacity of [2, 8, 8, 2]) {
    if (remaining <= 0) break;
    const count = Math.min(remaining, capacity);
    counts.push(count);
    remaining -= count;
  }
  return counts;
}

function renderProtonBuilder() {
  const root = document.querySelector('[data-proton-builder]');
  if (!root) return;
  const element = firstTwenty[builderAtomicNumber - 1];
  if (builderRenderedAtomicNumber !== builderAtomicNumber) {
    builderNeutrons = element.mass - element.n;
    builderElectrons = element.n;
    builderRenderedAtomicNumber = builderAtomicNumber;
    builderLastChange = 'proton';
  }
  renderBaseProtonBuilder();
  const arrangement = simpleElectronShells(builderElectrons);
  const neutral = builderElectrons === element.n;
  const mass = element.n + builderNeutrons;
  const charge = element.n - builderElectrons;
  const language = getLanguage();
  root.querySelector('#builder-proton-summary').textContent = element.n;
  root.querySelector('#builder-proton-unit').textContent = element.n === 1 ? 'proton' : 'protons';
  root.querySelector('#builder-neutron-count').textContent = builderNeutrons;
  root.querySelector('#builder-electron-count').textContent = builderElectrons;
  root.querySelector('#builder-neutron-control-count').textContent = builderNeutrons;
  root.querySelector('#builder-electron-control-count').textContent = builderElectrons;
  root.querySelector('#builder-mass-number').textContent = mass;
  root.querySelector('#builder-charge-count').textContent = charge === 0 ? '0' : (charge > 0 ? '+' : '−') + Math.abs(charge);
  root.querySelector('#builder-shell-count').textContent = arrangement.length ? arrangement.join(', ') : '0';
  root.querySelector('#builder-element-name').innerHTML = '<b>' + bi(element.zh, element.en) + '</b><small>' +
    practiceText('元素：' + element.s + '；質量數：' + mass, 'Element: ' + element.s + '; mass number: ' + mass) + '</small>';
  root.querySelector('#builder-summary-text').textContent = neutral
    ? practiceText(element.n + ' 粒質子決定這是' + element.zh + '。質子和電子數相同，所以是中性原子。',
      'This is ' + element.en.toLowerCase() + ' because it has ' + element.n +
      (element.n === 1 ? ' proton. ' : ' protons. ') +
      'Equal numbers of protons and electrons make a neutral atom.')
    : practiceText('仍然是' + element.zh + '元素，但質子和電子數不同，因此這粒子帶電。',
      'It is still the element ' + element.en + ', but unequal proton and electron counts make this particle charged.');
  const particles = [];
  for (let index = 0; index < Math.max(element.n, builderNeutrons); index += 1) {
    if (index < element.n) particles.push('p');
    if (index < builderNeutrons) particles.push('n');
  }
  root.querySelector('#builder-nucleus-particles').innerHTML = particles.map((particle) =>
    '<i class="' + particle + '" aria-hidden="true"></i>').join('');
  root.querySelector('.builder-nucleus-model').classList.toggle('dense', particles.length > 35);
  const radii = [76, 105, 133, 158];
  const diagram = arrangement.map((count, shellIndex) => {
    const radius = radii[shellIndex];
    const electrons = Array.from({ length: count }, (_, index) => {
      const paired = count > 4;
      const slot = count <= 2 ? index * 2 : index % 4;
      const angle = -Math.PI / 2 + Math.PI * 2 * slot / 4;
      const tangent = paired && index >= 4 ? 8 : 0;
      const x = (200 + radius * Math.cos(angle) - Math.sin(angle) * tangent).toFixed(1);
      const y = (170 + radius * Math.sin(angle) + Math.cos(angle) * tangent).toFixed(1);
      return '<g class="builder-electron"><circle cx="' + x + '" cy="' + y +
        '" r="8"/><text x="' + x + '" y="' + (Number(y) + 2.5).toFixed(1) + '">e⁻</text></g>';
    }).join('');
    return '<circle class="builder-orbit" cx="200" cy="170" r="' + radius + '"/>' + electrons;
  }).join('');
  root.querySelector('#builder-shell-diagram').innerHTML = diagram;
  root.querySelector('#builder-model-stage').setAttribute('aria-label', practiceText(
    element.zh + '粒子示意圖：' + element.n + '粒質子、' + builderNeutrons + '粒中子、' + builderElectrons + '粒電子。並非按比例。',
    element.en + ' particle model: ' + element.n + (element.n === 1 ? ' proton, ' : ' protons, ') +
    builderNeutrons + (builderNeutrons === 1 ? ' neutron and ' : ' neutrons and ') +
    builderElectrons + (builderElectrons === 1 ? ' electron. ' : ' electrons. ') + 'Not to scale.'
  ));
  root.querySelector('#builder-neutron-slider').value = builderNeutrons;
  root.querySelector('#builder-electron-slider').value = builderElectrons;
  root.querySelector('#builder-neutron-slider').setAttribute('aria-valuetext',
    practiceText(builderNeutrons + '粒中子', builderNeutrons + ' neutrons'));
  root.querySelector('#builder-electron-slider').setAttribute('aria-valuetext',
    practiceText(builderElectrons + '粒電子', builderElectrons + ' electrons'));
  root.querySelector('#remove-neutron').disabled = builderNeutrons <= 0;
  root.querySelector('#add-neutron').disabled = builderNeutrons >= 30;
  root.querySelector('#remove-electron').disabled = builderElectrons <= 0;
  root.querySelector('#add-electron').disabled = builderElectrons >= 20;
  root.querySelector('#reset-neutral-atom').disabled =
    neutral && builderNeutrons === element.mass - element.n;
  const messages = {
    proton: ['質子數決定元素。選另一種元素時，模型先載入一種常見的中性原子。',
      'Proton number determines the element. Choosing another element loads one common neutral atom.'],
    neutron: ['中子數改變質量數，但元素仍是' + element.zh + '。',
      'Changing neutrons changes the mass number, but the element stays ' + element.en + '.'],
    electron: [neutral ? '質子數和電子數相同，粒子不帶電。' : '電子數改變電荷，但元素仍由質子數決定。',
      neutral ? 'Equal protons and electrons give no charge.' : 'Electron count changes charge; proton number still determines the element.'],
    preset: ['選一種元素，再調整粒子數來比較。', 'Choose an element, then change particle counts to compare.'],
  };
  root.querySelector('#builder-change-explanation').textContent =
    messages[builderLastChange][language === 'en' ? 1 : 0];
  root.querySelector('#remove-neutron').setAttribute('aria-label', practiceText('減一粒中子', 'Remove one neutron'));
  root.querySelector('#add-neutron').setAttribute('aria-label', practiceText('加一粒中子', 'Add one neutron'));
  root.querySelector('#remove-electron').setAttribute('aria-label', practiceText('減一粒電子', 'Remove one electron'));
  root.querySelector('#add-electron').setAttribute('aria-label', practiceText('加一粒電子', 'Add one electron'));
  root.querySelector('#builder-neutron-slider').setAttribute('aria-label', practiceText('中子數', 'Number of neutrons'));
  root.querySelector('#builder-electron-slider').setAttribute('aria-label', practiceText('電子數', 'Number of electrons'));
}

function setupProtonBuilder() {
  const root = document.querySelector('[data-proton-builder]');
  if (!root) return;
  root.querySelector('#add-proton').addEventListener('click', () => {
    builderAtomicNumber = Math.min(firstTwenty.length, builderAtomicNumber + 1);
    renderProtonBuilder();
  });
  root.querySelector('#remove-proton').addEventListener('click', () => {
    builderAtomicNumber = Math.max(1, builderAtomicNumber - 1);
    renderProtonBuilder();
  });
  root.querySelector('#builder-proton-slider').addEventListener('input', (event) => {
    builderAtomicNumber = Number(event.currentTarget.value);
    renderProtonBuilder();
  });
  root.querySelector('#builder-element-picker').addEventListener('click', (event) => {
    const choice = event.target.closest('[data-atomic-number]');
    if (!choice) return;
    builderAtomicNumber = Number(choice.dataset.atomicNumber);
    const element = firstTwenty[builderAtomicNumber - 1];
    builderNeutrons = element.mass - element.n;
    builderElectrons = element.n;
    builderLastChange = 'preset';
    renderProtonBuilder();
  });
  root.querySelector('#builder-neutron-slider').addEventListener('input', (event) => {
    builderNeutrons = Number(event.currentTarget.value);
    builderLastChange = 'neutron';
    renderProtonBuilder();
  });
  root.querySelector('#builder-electron-slider').addEventListener('input', (event) => {
    builderElectrons = Number(event.currentTarget.value);
    builderLastChange = 'electron';
    renderProtonBuilder();
  });
  for (const [buttonId, particle, amount, limit] of [
    ['remove-neutron', 'neutron', -1, 30], ['add-neutron', 'neutron', 1, 30],
    ['remove-electron', 'electron', -1, 20], ['add-electron', 'electron', 1, 20],
  ]) {
    root.querySelector('#' + buttonId).addEventListener('click', () => {
      if (particle === 'neutron') builderNeutrons = Math.max(0, Math.min(limit, builderNeutrons + amount));
      else builderElectrons = Math.max(0, Math.min(limit, builderElectrons + amount));
      builderLastChange = particle;
      renderProtonBuilder();
    });
  }
  root.querySelector('#reset-neutral-atom').addEventListener('click', () => {
    const element = firstTwenty[builderAtomicNumber - 1];
    builderNeutrons = element.mass - element.n;
    builderElectrons = element.n;
    builderLastChange = 'preset';
    renderProtonBuilder();
  });
  renderProtonBuilder();
}

function renderIsotopeModels() {
  document.querySelectorAll('.isotope-nucleus[data-protons]').forEach((nucleus) => {
    const protons = Number(nucleus.dataset.protons);
    const neutrons = Number(nucleus.dataset.neutrons);
    nucleus.innerHTML = [...Array(protons).fill('p'), ...Array(neutrons).fill('n')]
      .map((particle) => `<i class="${particle}" aria-hidden="true"></i>`)
      .join('');
  });
}

function renderShells(element) {
  const center = 160;
  const radii = [46, 78, 110, 142];
  const rings = element.shells.map((count, shellIndex) => {
    const radius = radii[shellIndex];
    const electrons = Array.from({ length: count }, (_, index) => {
      const paired = count > 4;
      const slot = paired ? index % 4 : index;
      const angle = -Math.PI / 2 + (Math.PI * 2 * slot) / (paired ? 4 : count);
      const pairSide = paired && index >= 4 ? 1 : 0;
      const tangent = pairSide ? 7.5 : 0;
      const x = (center + Math.cos(angle) * radius - Math.sin(angle) * tangent).toFixed(2);
      const y = (center + Math.sin(angle) * radius + Math.cos(angle) * tangent).toFixed(2);
      return `<circle class="shell-electron${pairSide ? ' is-paired' : ''}" cx="${x}" cy="${y}" r="6.4"/>`;
    }).join('');
    return `<circle class="shell-ring" cx="${center}" cy="${center}" r="${radius}"/>${electrons}`;
  }).join('');
  document.querySelector('#shell-diagram').innerHTML = `<svg viewBox="0 0 320 320" aria-hidden="true">${rings}<circle class="shell-nucleus" cx="${center}" cy="${center}" r="24"/><text class="shell-nucleus-label" x="${center}" y="${center}">${element.s}</text></svg>`;
  document.querySelector('#shell-diagram').setAttribute('aria-label', getLanguage() === 'en' ? `Electron shell diagram for ${element.en}` : `${element.zh}原子的電子層示意圖`);
  document.querySelector('#shell-atomic').textContent = element.n;
  document.querySelector('#shell-name').innerHTML = bi(`${element.zh}&nbsp;${element.s}`, `${element.en}&nbsp;${element.s}`);
  document.querySelector('#shell-formula').textContent = element.shells.join(', ');
  document.querySelector('#shell-explain').innerHTML = bi(
    `${element.zh} 的原子序是 ${element.n}，中性原子有 ${element.n} 粒電子。`,
    `${element.en} has atomic number ${element.n}, so a neutral atom has ${element.n} electrons.`,
  );
  document.querySelectorAll('.shell-picker button').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.element === element.s));
  });
}

function renderChlorineDiagram() {
  const center = 110;
  const radii = [27, 54, 81];
  const contents = [2, 8, 7].map((count, shellIndex) => {
    const radius = radii[shellIndex];
    const paired = count > 4;
    const marks = Array.from({ length: count }, (_, index) => {
      const slot = paired ? index % 4 : index;
      const angle = -Math.PI / 2 + (Math.PI * 2 * slot) / (paired ? 4 : count);
      const pairSide = paired && index >= 4 ? 1 : 0;
      const tangent = pairSide ? 7 : 0;
      const x = (center + Math.cos(angle) * radius - Math.sin(angle) * tangent).toFixed(2);
      const y = (center + Math.sin(angle) * radius + Math.cos(angle) * tangent).toFixed(2);
      return `<text class="dot-cross-mark" x="${x}" y="${y}">×</text>`;
    }).join('');
    return `<circle class="dot-cross-ring" cx="${center}" cy="${center}" r="${radius}"/>${marks}`;
  }).join('');
  document.querySelector('#chlorine-dot-cross').innerHTML = `<svg viewBox="0 0 220 220" aria-hidden="true">${contents}<circle class="dot-cross-nucleus" cx="${center}" cy="${center}" r="19"/><text class="dot-cross-symbol" x="${center}" y="${center}">Cl</text></svg>`;
}

function setupShellPicker() {
  const picker = document.querySelector('#shell-picker');
  picker.innerHTML = firstTwenty.map((element) => `<button type="button" data-element="${element.s}" aria-pressed="false" title="${element.en}">${element.s}</button>`).join('');
  picker.addEventListener('click', (event) => {
    const button = event.target.closest('[data-element]');
    if (!button) return;
    const element = firstTwenty.find((item) => item.s === button.dataset.element);
    if (element) renderShells(element);
  });
  renderShells(firstTwenty.find((element) => element.s === 'Na'));
}

function setupProgress() {
  const topics = [...document.querySelectorAll('[data-topic]')];
  const stored = JSON.parse(localStorage.getItem('atomic-structure-viewed') || '[]');
  const viewed = new Set(stored.filter((id) => sessionIds.includes(id)));
  const active = document.body.dataset.activeSession;
  if (active) {
    viewed.add(active);
    localStorage.setItem('atomic-structure-viewed', JSON.stringify([...viewed]));
  }
  const fill = () => {
    const count = viewed.size;
    document.querySelector('#progress-count').textContent = `${count} / 8`;
    document.querySelector('#progress-fill').style.width = `${count / 8 * 100}%`;
    document.querySelectorAll('.lesson-nav a[data-session]').forEach((link) => {
      link.classList.toggle('done', viewed.has(link.dataset.session));
      link.classList.toggle('current', link.dataset.session === active);
    });
    document.querySelectorAll('[data-session-card]').forEach((card) => card.classList.toggle('done', viewed.has(card.dataset.sessionCard)));
  };
  fill();
  topics.forEach((topic) => topic.classList.toggle('active', topic.id === active));
}

setupPage();
const menuButton = document.querySelector('.mobile-menu');
const navBackdrop = document.querySelector('.nav-backdrop');
const closeLessonMenu = () => {
  document.body.classList.remove('menu-open');
  menuButton.setAttribute('aria-expanded', 'false');
  navBackdrop.hidden = true;
};
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  document.body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  navBackdrop.hidden = !open;
});
navBackdrop.addEventListener('click', closeLessonMenu);
document.querySelectorAll('.lesson-nav a').forEach((link) => link.addEventListener('click', closeLessonMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLessonMenu();
});
document.querySelectorAll('[data-language]').forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});
setLanguage(getLanguage(), false);
Object.entries(quizzes).forEach(([id, data]) => renderQuiz(id, data));
renderFirstTwenty();
renderIsotopeModels();
setupShellPicker();
renderChlorineDiagram();
setupPeriodicTable();
setupStateLab();
setupProtonBuilder();
setupProgress();
refreshLearningLabs = setupLearningLabs({ getLanguage, firstTwenty });
