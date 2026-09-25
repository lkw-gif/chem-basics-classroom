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
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  }
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
setupProgress();
