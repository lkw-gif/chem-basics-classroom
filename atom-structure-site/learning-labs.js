// Short, bilingual practice activities for the eight independent lessons.
export function setupLearningLabs({ getLanguage, firstTwenty }) {
  const wording = (zh, en) => getLanguage() === 'en' ? en : zh;

  const zoomRoot = document.querySelector('[data-copper-zoom]');
  let zoomStep = 0;
  const zoomMessages = [
    ['一塊銅含有非常多銅原子。', 'A piece of copper contains many copper atoms.'],
    ['放大看，仍然是同一種銅原子。', 'Zoom in: these are still the same type of copper atom.'],
    ['一個 Cu 是一粒銅原子，不是一整塊銅。', 'One Cu is one copper atom, not a whole piece of copper.'],
  ];
  function renderCopperZoom() {
    const stages = zoomRoot.previousElementSibling.querySelectorAll('.copper-block, .copper-grains, .single-atom');
    stages.forEach((stage, index) => {
      stage.classList.toggle('zoom-active', index === zoomStep);
      stage.classList.toggle('zoom-dim', index !== zoomStep);
    });
    zoomRoot.querySelectorAll('[data-zoom]').forEach((button) => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.zoom) === zoomStep));
    });
    zoomRoot.querySelector('#copper-zoom-feedback').textContent =
      zoomMessages[zoomStep][getLanguage() === 'en' ? 1 : 0];
  }
  zoomRoot.addEventListener('click', (event) => {
    const button = event.target.closest('[data-zoom]');
    if (!button) return;
    zoomStep = Number(button.dataset.zoom);
    renderCopperZoom();
  });

  const classifyRoot = document.querySelector('[data-classify-practice]');
  const classifyExamples = [
    { symbol: 'Cu', answer: 'metal',
      clue: ['銅有光澤，能拉成電線，也善於導電。', 'Copper is shiny, can be drawn into wire and conducts electricity.'],
      why: ['銅具備常見金屬性質。', 'Copper has common metal properties.'] },
    { symbol: 'O', answer: 'nonmetal',
      clue: ['氧在室溫下是氣體，不善於導電。', 'Oxygen is a gas at room temperature and does not conduct electricity well.'],
      why: ['氧是非金屬；非金屬亦可以是氣體。', 'Oxygen is a non-metal; some non-metals are gases.'] },
    { symbol: 'Si', answer: 'metalloid',
      clue: ['矽可用於電腦晶片；它有些性質像金屬，有些像非金屬。', 'Silicon is used in computer chips and has properties of both metals and non-metals.'],
      why: ['矽是類金屬。', 'Silicon is a metalloid.'] },
  ];
  let classifyIndex = 0;
  let classifyChoice = null;
  function renderClassifyPractice() {
    const example = classifyExamples[classifyIndex];
    classifyRoot.querySelector('#classify-clue').innerHTML = '<b>' + example.symbol + '</b> · ' +
      example.clue[getLanguage() === 'en' ? 1 : 0];
    classifyRoot.querySelectorAll('[data-class]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.class === classifyChoice));
      button.classList.toggle('is-correct', classifyChoice !== null && button.dataset.class === example.answer);
      button.classList.toggle('is-incorrect', classifyChoice === button.dataset.class && classifyChoice !== example.answer);
    });
    classifyRoot.querySelector('#classify-feedback').textContent = classifyChoice === null ? '' :
      wording(classifyChoice === example.answer ? '答對了！' : '再看看線索。', classifyChoice === example.answer ? 'Correct!' : 'Look at the clues again.') +
      ' ' + example.why[getLanguage() === 'en' ? 1 : 0];
  }
  classifyRoot.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-class]');
    if (choice) {
      classifyChoice = choice.dataset.class;
      renderClassifyPractice();
    }
  });
  classifyRoot.querySelector('#classify-next').addEventListener('click', () => {
    classifyIndex = (classifyIndex + 1) % classifyExamples.length;
    classifyChoice = null;
    renderClassifyPractice();
  });

  const numberRoot = document.querySelector('[data-number-practice]');
  const numberExamples = {
    Na: { symbol: 'Na', atomic: 11, mass: 23 },
    O: { symbol: 'O', atomic: 8, mass: 16 },
    Cl: { symbol: 'Cl', atomic: 17, mass: 37 },
    Ca: { symbol: 'Ca', atomic: 20, mass: 40 },
  };
  let numberFeedback = null;
  function renderNumberPractice() {
    const example = numberExamples[numberRoot.querySelector('#number-practice-example').value];
    numberRoot.querySelector('#number-practice-notation').innerHTML =
      '<span class="nuclide-left"><sup>' + example.mass + '</sup><sub>' + example.atomic + '</sub></span><b>' + example.symbol + '</b>';
    const feedback = numberRoot.querySelector('#number-practice-feedback');
    feedback.classList.toggle('is-correct', numberFeedback?.kind === 'correct');
    if (!numberFeedback) feedback.textContent = '';
    else if (numberFeedback.kind === 'missing') feedback.textContent =
      wording('先填寫三種粒子的數目。', 'Enter all three particle counts first.');
    else if (numberFeedback.kind === 'protons') feedback.textContent =
      wording('先看左下角：原子序就是質子數。', 'Start at the lower left: atomic number equals proton count.');
    else if (numberFeedback.kind === 'neutrons') feedback.textContent =
      wording('再算中子：質量數 − 質子數。', 'Now find neutrons: mass number minus protons.');
    else if (numberFeedback.kind === 'electrons') feedback.textContent =
      wording('題目說的是中性原子，所以電子數＝質子數。', 'This is a neutral atom, so electrons equal protons.');
    else feedback.textContent = wording('答對了！', 'Correct!') + ' ' +
      example.symbol + '-' + example.mass + ': ' +
      wording('質子 ' + example.atomic + '、中子 ' + (example.mass - example.atomic) + '、電子 ' + example.atomic + '。',
        example.atomic + ' protons, ' + (example.mass - example.atomic) + ' neutrons and ' + example.atomic + ' electrons.');
  }
  numberRoot.querySelector('#number-practice-example').addEventListener('change', () => {
    numberRoot.querySelector('#number-practice-form').reset();
    numberFeedback = null;
    renderNumberPractice();
  });
  numberRoot.querySelector('#number-practice-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const example = numberExamples[numberRoot.querySelector('#number-practice-example').value];
    if ([form.elements.protons.value, form.elements.neutrons.value, form.elements.electrons.value].some((value) => value === '')) {
      numberFeedback = { kind: 'missing' };
    } else if (Number(form.elements.protons.value) !== example.atomic) {
      numberFeedback = { kind: 'protons' };
    } else if (Number(form.elements.neutrons.value) !== example.mass - example.atomic) {
      numberFeedback = { kind: 'neutrons' };
    } else if (Number(form.elements.electrons.value) !== example.atomic) {
      numberFeedback = { kind: 'electrons' };
    } else {
      numberFeedback = { kind: 'correct' };
    }
    renderNumberPractice();
  });

  const isotopeRoot = document.querySelector('[data-isotope-lab]');
  let isotopeNeutrons = 18;
  function renderIsotopeLab() {
    const particles = [];
    for (let index = 0; index < isotopeNeutrons; index += 1) {
      if (index < 17) particles.push('p');
      particles.push('n');
    }
    const nucleus = isotopeRoot.querySelector('#isotope-lab-nucleus');
    nucleus.innerHTML = particles.map((particle) => '<i class="' + particle + '" aria-hidden="true"></i>').join('');
    nucleus.setAttribute('aria-label', wording(
      '氯原子核：17 粒質子、' + isotopeNeutrons + ' 粒中子',
      'Chlorine nucleus with 17 protons and ' + isotopeNeutrons + ' neutrons'
    ));
    isotopeRoot.querySelector('#isotope-lab-neutrons').textContent = isotopeNeutrons;
    isotopeRoot.querySelector('#isotope-lab-mass').textContent = 17 + isotopeNeutrons;
    isotopeRoot.querySelectorAll('[data-isotope-neutrons]').forEach((button) => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.isotopeNeutrons) === isotopeNeutrons));
    });
    isotopeRoot.querySelector('#isotope-lab-feedback').textContent =
      wording('質子仍然有 17 粒，所以仍是氯；中子改變，質量數變成 ' + (17 + isotopeNeutrons) + '。',
        'It is still chlorine because it has 17 protons. Changing neutrons gives mass number ' + (17 + isotopeNeutrons) + '.');
  }
  isotopeRoot.addEventListener('click', (event) => {
    const button = event.target.closest('[data-isotope-neutrons]');
    if (!button) return;
    isotopeNeutrons = Number(button.dataset.isotopeNeutrons);
    renderIsotopeLab();
  });

  const averageRoot = document.querySelector('[data-average-lab]');
  let percent35 = 75;
  let averageGuess = null;
  let averageRevealed = false;
  function renderAverageLab() {
    const percent37 = 100 - percent35;
    averageRoot.querySelector('#average-abundance').value = percent35;
    averageRoot.querySelector('#average-abundance-value').textContent = percent35 + '%';
    averageRoot.querySelector('#average-35-value').textContent = percent35 + '%';
    averageRoot.querySelector('#average-37-value').textContent = percent37 + '%';
    const count35 = percent35 / 5;
    const sample = averageRoot.querySelector('#average-atom-sample');
    sample.innerHTML = Array.from({ length: 20 }, (_, index) =>
      '<span class="' + (index < count35 ? 'atom-35' : 'atom-37') + '">' + (index < count35 ? '35' : '37') + '</span>').join('');
    sample.setAttribute('aria-label', wording(
      '20 粒氯原子模型：' + count35 + ' 粒氯-35，' + (20 - count35) + ' 粒氯-37。',
      'Model of 20 chlorine atoms: ' + count35 + ' chlorine-35 and ' + (20 - count35) + ' chlorine-37.'
    ));
    const correctGuess = percent35 > 50 ? 35 : percent35 < 50 ? 37 : 36;
    averageRoot.querySelectorAll('[data-average-guess]').forEach((button) => {
      button.setAttribute('aria-pressed', String(Number(button.dataset.averageGuess) === averageGuess));
      button.classList.toggle('is-correct', averageGuess !== null && Number(button.dataset.averageGuess) === correctGuess);
      button.classList.toggle('is-incorrect', Number(button.dataset.averageGuess) === averageGuess && averageGuess !== correctGuess);
    });
    averageRoot.querySelector('#average-prediction-feedback').textContent = averageGuess === null ? '' :
      wording(averageGuess === correctGuess ? '估對了！' : '再看看哪種原子較多。', averageGuess === correctGuess ? 'Good prediction!' : 'Look at which isotope is more common.') +
      ' ' + wording('比例較多的一種會令平均值靠近它。', 'The more common isotope pulls the average towards its mass.');
    const calculation = averageRoot.querySelector('#average-calculation');
    calculation.hidden = !averageRevealed;
    calculation.textContent = averageRevealed ?
      '(' + '35 × ' + percent35 + ' + 37 × ' + percent37 + ') ÷ 100 = ' +
      ((35 * percent35 + 37 * percent37) / 100).toFixed(1) : '';
  }
  averageRoot.querySelector('#average-abundance').addEventListener('input', (event) => {
    percent35 = Number(event.currentTarget.value);
    averageGuess = null;
    averageRevealed = false;
    renderAverageLab();
  });
  averageRoot.addEventListener('click', (event) => {
    const guess = event.target.closest('[data-average-guess]');
    if (!guess) return;
    averageGuess = Number(guess.dataset.averageGuess);
    renderAverageLab();
  });
  averageRoot.querySelector('#average-reveal').addEventListener('click', () => {
    averageRevealed = true;
    renderAverageLab();
  });

  const shellRoot = document.querySelector('[data-shell-practice]');
  let shellTarget = 'O';
  let shellCounts = [0, 0, 0, 0];
  let shellFeedback = null;
  const shellCapacities = [2, 8, 8, 2];
  function renderShellPractice() {
    const element = firstTwenty.find((item) => item.s === shellTarget);
    const selected = shellRoot.querySelector('#shell-practice-target');
    selected.value = shellTarget;
    [...selected.options].forEach((option) => {
      const item = firstTwenty.find((candidate) => candidate.s === option.value);
      option.textContent = item.s + ' · ' + wording(item.zh, item.en);
    });
    shellRoot.querySelector('#shell-practice-instruction').textContent = wording(
      element.zh + '的原子序是 ' + element.n + '。請從內層開始放 ' + element.n + ' 粒電子。',
      element.en + ' has atomic number ' + element.n + '. Place ' + element.n + ' electrons, starting from the inner shell.'
    );
    shellRoot.querySelector('#shell-practice-controls').innerHTML =
      element.shells.map((_, index) =>
        '<div class="shell-practice-row"><span>' + wording('第 ' + (index + 1) + ' 層', 'Shell ' + (index + 1)) +
        '</span><div><button type="button" data-shell-index="' + index + '" data-shell-change="-1" aria-label="' +
        wording('從第 ' + (index + 1) + ' 層減一粒電子', 'Remove one electron from shell ' + (index + 1)) +
        '" ' + (shellCounts[index] === 0 ? 'disabled' : '') + '>−</button><b>' + shellCounts[index] +
        '</b><button type="button" data-shell-index="' + index + '" data-shell-change="1" aria-label="' +
        wording('在第 ' + (index + 1) + ' 層加一粒電子', 'Add one electron to shell ' + (index + 1)) +
        '" ' + (shellCounts[index] >= shellCapacities[index] ? 'disabled' : '') + '>＋</button></div></div>'
      ).join('');
    const center = 130;
    const radii = [29, 54, 79, 105];
    const rings = element.shells.map((_, shellIndex) => {
      const radius = radii[shellIndex];
      const count = shellCounts[shellIndex];
      const marks = Array.from({ length: count }, (_, index) => {
        const slot = shellIndex === 0 && count === 2 ? index * 2 : index % 4;
        const angle = -Math.PI / 2 + Math.PI * 2 * slot / 4;
        const tangent = index >= 4 ? 7 : 0;
        const x = (center + radius * Math.cos(angle) - Math.sin(angle) * tangent).toFixed(1);
        const y = (center + radius * Math.sin(angle) + Math.cos(angle) * tangent).toFixed(1);
        return '<text class="dot-cross-mark" x="' + x + '" y="' + y + '">×</text>';
      }).join('');
      return '<circle class="dot-cross-ring" cx="' + center + '" cy="' + center + '" r="' + radius + '"/>' + marks;
    }).join('');
    const diagram = shellRoot.querySelector('#shell-practice-diagram');
    diagram.innerHTML = '<svg viewBox="0 0 260 260" aria-hidden="true">' + rings +
      '<circle class="dot-cross-nucleus" cx="130" cy="130" r="19"/>' +
      '<text class="dot-cross-symbol" x="130" y="130">' + element.s + '</text></svg>';
    diagram.setAttribute('aria-label', wording(
      element.zh + '電子圖：各層已放 ' + shellCounts.slice(0, element.shells.length).join('、') + ' 粒電子。',
      element.en + ' electron diagram: shell counts ' + shellCounts.slice(0, element.shells.length).join(', ') + '.'
    ));
    const feedback = shellRoot.querySelector('#shell-practice-feedback');
    feedback.classList.toggle('is-correct', shellFeedback?.kind === 'correct');
    if (!shellFeedback) feedback.textContent = '';
    else if (shellFeedback.kind === 'shown') feedback.textContent =
      wording('示範：', 'Example: ') + element.s + ' → ' + element.shells.join(', ');
    else if (shellFeedback.kind === 'count') feedback.textContent =
      wording('這個中性原子應有 ' + element.n + ' 粒電子；你放了 ' + shellFeedback.total + ' 粒。',
        'This neutral atom needs ' + element.n + ' electrons; you placed ' + shellFeedback.total + '.');
    else if (shellFeedback.kind === 'order') feedback.textContent =
      wording('電子數對了，再檢查是否由最內層開始排列。', 'The total is right. Check that the inner shells fill first.');
    else feedback.textContent = wording('答對了！電子排佈：', 'Correct! Arrangement: ') + element.shells.join(', ');
  }
  shellRoot.querySelector('#shell-practice-target').addEventListener('change', (event) => {
    shellTarget = event.currentTarget.value;
    shellCounts = [0, 0, 0, 0];
    shellFeedback = null;
    renderShellPractice();
  });
  shellRoot.querySelector('#shell-practice-controls').addEventListener('click', (event) => {
    const button = event.target.closest('[data-shell-change]');
    if (!button) return;
    const index = Number(button.dataset.shellIndex);
    const change = Number(button.dataset.shellChange);
    shellCounts[index] = Math.max(0, Math.min(shellCapacities[index], shellCounts[index] + change));
    shellFeedback = null;
    renderShellPractice();
    shellRoot.querySelector('[data-shell-index="' + index + '"][data-shell-change="' + change + '"]')?.focus();
  });
  shellRoot.querySelector('#shell-practice-check').addEventListener('click', () => {
    const element = firstTwenty.find((item) => item.s === shellTarget);
    const total = shellCounts.reduce((sum, count) => sum + count, 0);
    shellFeedback = total !== element.n ? { kind: 'count', total } :
      element.shells.some((count, index) => shellCounts[index] !== count) ? { kind: 'order' } : { kind: 'correct' };
    renderShellPractice();
  });
  shellRoot.querySelector('#shell-practice-show').addEventListener('click', () => {
    const element = firstTwenty.find((item) => item.s === shellTarget);
    shellCounts = [...element.shells, ...Array(4 - element.shells.length).fill(0)];
    shellFeedback = { kind: 'shown' };
    renderShellPractice();
  });

  function refreshAll() {
    renderCopperZoom();
    renderClassifyPractice();
    renderNumberPractice();
    renderIsotopeLab();
    renderAverageLab();
    renderShellPractice();
  }
  refreshAll();
  return refreshAll;
}
