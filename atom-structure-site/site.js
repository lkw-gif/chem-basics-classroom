const bi = (zh, en) => `<span class="zh">${zh}</span><span class="en">${en}</span>`;
const quizzes = {
  earth: {
    q: ['地殼中含量最多的元素是甚麼？', 'Which element is most abundant in Earth’s crust?'],
    choices: [['氧', 'Oxygen'], ['矽', 'Silicon'], ['鋁', 'Aluminium']],
    answer: 0,
    why: ['氧佔地殼質量約 49.9%；鋁是含量最高的金屬。', 'Oxygen makes up about 49.9% of the crust by mass. Aluminium is the most abundant metal.'],
  },
  atom: {
    q: ['一種元素由甚麼組成？', 'What is one element made of?'],
    choices: [['同一種原子', 'One type of atom'], ['不同原子化學結合', 'Different atoms chemically joined'], ['兩種物質混在一起', 'Two substances mixed together']],
    answer: 0,
    why: ['元素只含一種原子。', 'An element contains just one type of atom.'],
  },
  types: {
    q: ['哪一種是類金屬？', 'Which of these is a metalloid?'],
    choices: [['矽', 'Silicon'], ['鈉', 'Sodium'], ['氧', 'Oxygen']],
    answer: 0,
    why: ['矽有些性質像金屬、有些像非金屬，也是常見的半導體材料。', 'Silicon has some metallic and some non-metallic properties. It is also a common semiconductor material.'],
  },
  structure: {
    q: ['中性原子的質子數和電子數有甚麼關係？', 'In a neutral atom, how do the numbers of protons and electrons compare?'],
    choices: [['相同', 'They are equal'], ['電子數多一倍', 'There are twice as many electrons'], ['沒有固定關係', 'There is no fixed relationship']],
    answer: 0,
    why: ['正電和負電數目相同，會互相抵銷。', 'Equal positive and negative charges cancel out.'],
  },
  numbers: {
    q: ['鈉-23 的原子序是 11。它有多少粒中子？', 'Sodium-23 has atomic number 11. How many neutrons does it have?'],
    choices: [['11', '11'], ['12', '12'], ['23', '23']],
    answer: 1,
    why: ['中子數＝質量數 − 原子序＝23 − 11＝12。', 'Neutrons = mass number − atomic number = 23 − 11 = 12.'],
  },
  isotopes: {
    q: ['氯-35 和氯-37 有甚麼相同之處？', 'What is the same in chlorine-35 and chlorine-37?'],
    choices: [['質子數', 'Number of protons'], ['中子數', 'Number of neutrons'], ['質量數', 'Mass number']],
    answer: 0,
    why: ['兩者都是氯，原子序都是 17，所以各有 17 粒質子；中子數不同。', 'Both are chlorine with atomic number 17, so each has 17 protons. Their neutron numbers differ.'],
  },
  average: {
    q: ['氯-35 佔 75%，氯-37 佔 25%。相對原子質量是多少？', 'Chlorine-35 is 75% and chlorine-37 is 25%. What is the relative atomic mass?'],
    choices: [['35', '35'], ['35.5', '35.5'], ['36.5', '36.5']],
    answer: 1,
    why: ['(35 × 75 + 37 × 25) ÷ 100＝35.5。', '(35 × 75 + 37 × 25) ÷ 100 = 35.5.'],
  },
  shells: {
    q: ['氯原子的電子排佈是哪一個？', 'Which is the electron arrangement of chlorine?'],
    choices: [['2, 8, 7', '2, 8, 7'], ['2, 7, 8', '2, 7, 8'], ['2, 8, 8', '2, 8, 8']],
    answer: 0,
    why: ['氯的原子序是 17，因此中性氯原子有 17 粒電子：2、8、7。', 'Chlorine has atomic number 17, so a neutral atom has 17 electrons: 2, 8, 7.'],
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

function getLanguage() {
  const query = new URL(location.href).searchParams.get('lang');
  if (query === 'en' || query === 'zh') return query;
  return localStorage.getItem('atomic-structure-language') === 'en' ? 'en' : 'zh';
}

function setLanguage(language, updateUrl = true) {
  document.documentElement.classList.toggle('lang-en', language === 'en');
  document.documentElement.classList.toggle('lang-zh', language !== 'en');
  document.documentElement.lang = language === 'en' ? 'en' : 'zh-Hant-HK';
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  localStorage.setItem('atomic-structure-language', language);
  document.querySelector('.back-link').href = `../?lang=${language}#start`;
  if (updateUrl) {
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
  }
}

function renderQuiz(id, data) {
  const root = document.querySelector(`[data-quiz="${id}"]`);
  if (!root) return;
  const options = data.choices;
  root.innerHTML = `
    <div class="checkpoint-head"><span class="checkpoint-badge">CHECKPOINT</span><b>${bi('小測一下', 'Quick check')}</b><span class="checkpoint-count">${id.toUpperCase()} / 01</span></div>
    <p class="checkpoint-question">${bi(data.q[0], data.q[1])}</p>
    <div class="checkpoint-options" role="group" aria-label="${data.q[1]}">
      ${options.map((choice, index) => `<button type="button" data-choice="${index}" aria-pressed="false"><i class="choice-letter">${String.fromCharCode(65 + index)}</i>${bi(choice[0], choice[1])}</button>`).join('')}
    </div>
    <p class="checkpoint-feedback" aria-live="polite" hidden></p>
    <button type="button" class="checkpoint-reset">${bi('重新作答', 'Try again')}</button>`;

  const feedback = root.querySelector('.checkpoint-feedback');
  root.querySelectorAll('[data-choice]').forEach((button) => {
    button.addEventListener('click', () => {
      const choice = Number(button.dataset.choice);
      root.classList.add('answered');
      root.querySelectorAll('[data-choice]').forEach((option) => {
        const index = Number(option.dataset.choice);
        option.classList.toggle('selected', index === choice);
        option.classList.toggle('correct', index === data.answer);
        option.classList.toggle('incorrect', index === choice && choice !== data.answer);
        option.setAttribute('aria-pressed', String(index === choice));
      });
      feedback.hidden = false;
      feedback.classList.toggle('try-again', choice !== data.answer);
      feedback.innerHTML = choice === data.answer
        ? `${bi('答對了！', 'Correct!')} ${bi(data.why[0], data.why[1])}`
        : `${bi('再想一想。', 'Try again.')} ${bi(data.why[0], data.why[1])}`;
    });
  });
  root.querySelector('.checkpoint-reset').addEventListener('click', () => {
    root.classList.remove('answered');
    feedback.hidden = true;
    feedback.classList.remove('try-again');
    feedback.replaceChildren();
    root.querySelectorAll('[data-choice]').forEach((option) => {
      option.classList.remove('selected', 'correct', 'incorrect');
      option.setAttribute('aria-pressed', 'false');
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
  const radii = [42, 68, 94, 120];
  const rings = element.shells.map((count, shellIndex) => {
    const radius = radii[shellIndex];
    const electrons = Array.from({ length: count }, (_, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
      const x = (center + Math.cos(angle) * radius).toFixed(2);
      const y = (center + Math.sin(angle) * radius).toFixed(2);
      return `<circle class="shell-electron" cx="${x}" cy="${y}" r="5.3"/>`;
    }).join('');
    return `<circle class="shell-ring" cx="${center}" cy="${center}" r="${radius}"/>${electrons}`;
  }).join('');
  document.querySelector('#shell-diagram').innerHTML = `<svg viewBox="0 0 320 320" aria-hidden="true">${rings}<circle class="shell-nucleus" cx="${center}" cy="${center}" r="24"/><text class="shell-nucleus-label" x="${center}" y="${center}">${element.s}</text></svg>`;
  document.querySelector('#shell-diagram').setAttribute('aria-label', `Shell diagram for ${element.en}`);
  document.querySelector('#shell-atomic').textContent = element.n;
  document.querySelector('#shell-name').innerHTML = bi(`${element.zh}　${element.s}`, `${element.en}　${element.s}`);
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
    const marks = Array.from({ length: count }, (_, index) => {
      const angle = -Math.PI / 2 + (Math.PI * 2 * index) / count;
      const x = (center + Math.cos(angle) * radius).toFixed(2);
      const y = (center + Math.sin(angle) * radius).toFixed(2);
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
  const viewed = new Set(JSON.parse(localStorage.getItem('atomic-structure-viewed') || '[]'));
  const fill = () => {
    const count = viewed.size;
    document.querySelector('#progress-count').textContent = `${count} / 8`;
    document.querySelector('#progress-fill').style.width = `${count / 8 * 100}%`;
    document.querySelectorAll('.lesson-nav a').forEach((link) => {
      link.classList.toggle('done', viewed.has(link.hash.slice(1)));
    });
  };
  fill();
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        viewed.add(entry.target.id);
        localStorage.setItem('atomic-structure-viewed', JSON.stringify([...viewed]));
        document.querySelectorAll('.lesson-nav a').forEach((link) => link.classList.toggle('current', link.hash.slice(1) === entry.target.id));
        fill();
      }
    }
  }, { rootMargin: '-25% 0px -60% 0px' });
  topics.forEach((topic) => observer.observe(topic));
}

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
