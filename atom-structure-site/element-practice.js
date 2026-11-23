const bilingual = (zh, en) => `<span class="zh">${zh}</span><span class="en">${en}</span>`;
const marks = { good: '✓', bad: '✗' };
const inputAttrs = 'type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"';

export function setupElementPractice(root, elements, getLanguage) {
  const t = (zh, en) => getLanguage() === 'zh' ? zh : en;
  const action = (id, zh, en, primary = false) =>
    `<button type="button" data-action="${id}" class="element-action${primary ? ' primary' : ''}">${bilingual(zh, en)}</button>`;
  const modes = [
    ['order', '排原子序', 'Atomic number order'],
    ['symbol', '名稱 → 符號', 'Name → symbol'],
    ['name', '符號 → 名稱', 'Symbol → name'],
    ['list', '填寫全表', 'Complete the list'],
  ];
  const shuffled = () => {
    const pool = [...elements];
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool;
  };
  const nameMatches = (element, value) => [
    element.en,
    ...(element.s === 'Al' ? ['Aluminum'] : []),
    ...(element.s === 'S' ? ['Sulfur'] : []),
  ].includes(value);
  const listField = (element, type, zh, en) => `<label class="element-list-field">
    <span class="element-sr-only">${bilingual(`第 ${element.n} 格：${zh}`, `No. ${element.n}: ${en}`)}</span>
    <input ${inputAttrs} data-answer="${type}" aria-describedby="element-result-${element.n}-${type}">
    <span class="element-mark" id="element-result-${element.n}-${type}"></span>
  </label>`;

  root.innerHTML = `
    <div class="element-modes" role="group" aria-label="練習模式">
      ${modes.map(([id, zh, en], i) => `<button type="button" data-mode="${id}" aria-pressed="${i === 0}">${bilingual(zh, en)}</button>`).join('')}
    </div>
    <div class="element-work">
      <div data-view="order">
        <p class="element-instruction">${bilingual('先點元素，再點原子序格。未選元素時，點已填的格可把元素移回元素區。', 'Tap an element, then its atomic number. Tap a filled slot with nothing selected to return the element to the bank.')}</p>
        <div class="element-boards">
          <div><h3>${bilingual('元素區', 'Element bank')}</h3><div class="element-tiles" data-bank></div></div>
          <div><h3>${bilingual('原子序 1–20', 'Atomic numbers 1–20')}</h3><div class="element-tiles" data-slots>
            ${elements.map(({n}) => `<button type="button" data-slot="${n}"><small>${n}</small><b></b><span class="element-slot-mark" aria-hidden="true"></span></button>`).join('')}
          </div></div>
        </div>
        <div class="element-actions">${action('check-order', '核對排序', 'Check order', true)}${action('reset-order', '重新排序', 'Reset order')}</div>
        <p class="element-status" data-order-status role="status"></p>
      </div>
      ${['symbol', 'name'].map((type) => `<form class="element-recall" data-view="${type}" hidden>
        <div class="element-prompt"><span>${bilingual(type === 'symbol' ? '英文名稱' : '元素符號', type === 'symbol' ? 'English name' : 'Element symbol')}</span><strong data-prompt></strong></div>
        <label for="element-answer-${type}">${bilingual(type === 'symbol' ? '輸入元素符號' : '輸入英文名稱', type === 'symbol' ? 'Enter the element symbol' : 'Enter the English name')}</label>
        <p class="element-instruction" id="element-hint-${type}">${bilingual(type === 'symbol' ? '注意大小寫，例如 He。' : '首字母用大寫，例如 Helium。', type === 'symbol' ? 'Capitalisation matters. Example: He.' : 'Start with a capital letter. Example: Helium.')}</p>
        <input ${inputAttrs} id="element-answer-${type}" aria-describedby="element-hint-${type} element-feedback-${type}" enterkeyhint="go">
        <p class="element-status" id="element-feedback-${type}" role="status"></p>
        <div class="element-actions"><button type="submit" class="element-action primary">${bilingual('核對', 'Check answer')}</button>${action('next-' + type, '下一題', 'Next question')}</div>
      </form>`).join('')}
      <form data-view="list" aria-describedby="element-list-hint" hidden>
        <p class="element-instruction" id="element-list-hint">${bilingual('按原子序填寫英文名稱及符號，留意大小寫。', 'Enter the English name and symbol for each atomic number. Mind the capitalisation.')}</p>
        <div class="element-list-row element-list-head" aria-hidden="true"><b>${bilingual('序號', 'No.')}</b><b>${bilingual('英文名稱', 'English name')}</b><b>${bilingual('符號', 'Symbol')}</b></div>
        ${elements.map((element) => `<div class="element-list-row" data-row="${element.n}"><strong>${element.n}</strong>${listField(element, 'name', '英文名稱', 'English name')}${listField(element, 'symbol', '元素符號', 'Element symbol')}</div>`).join('')}
        <div class="element-actions"><button type="submit" class="element-action primary">${bilingual('核對全表', 'Check the list')}</button><button type="reset" class="element-action">${bilingual('清空全表', 'Clear the list')}</button></div>
        <p class="element-status" data-list-status role="status"></p>
      </form>
    </div>`;

  const byNumber = (number) => elements[number - 1];
  const bank = root.querySelector('[data-bank]');
  const slotButtons = [...root.querySelectorAll('[data-slot]')];
  const slots = elements.map(() => null);
  const orderStatus = root.querySelector('[data-order-status]');
  let selected = null;
  let orderChecked = false;
  let listScore = null;

  function updateOrder() {
    bank.querySelectorAll('button').forEach((button) => {
      const number = Number(button.dataset.element);
      button.setAttribute('aria-pressed', String(number === selected));
      button.classList.toggle('is-placed', slots.includes(number));
    });
    slotButtons.forEach((button, index) => {
      const element = byNumber(slots[index]);
      const state = orderChecked ? (element?.n === index + 1 ? 'good' : 'bad') : '';
      button.dataset.mark = state;
      button.querySelector('b').textContent = element?.s || '';
      button.querySelector('.element-slot-mark').textContent = marks[state] || '';
      button.setAttribute('aria-label', [
        t(`原子序 ${index + 1}`, `Atomic number ${index + 1}`),
        element?.s || t('空格', 'empty'),
        state && (state === 'good' ? t('正確', 'correct') : t('請再試', 'try again')),
      ].filter(Boolean).join(', '));
    });
    const count = slots.filter((number, index) => number === index + 1).length;
    orderStatus.textContent = orderChecked
      ? t(`答對 ${count} / 20 格。`, `${count} of 20 slots correct.`)
      : selected ? t(`已選 ${byNumber(selected).s}，請點一個原子序格。`, `${byNumber(selected).s} selected. Tap an atomic number.`) : '';
  }

  function resetOrder() {
    selected = null;
    slots.fill(null);
    orderChecked = false;
    bank.innerHTML = shuffled().map(({n, s}) => `<button type="button" data-element="${n}"><b>${s}</b></button>`).join('');
    updateOrder();
  }

  const recall = Object.fromEntries(['symbol', 'name'].map((type) => {
    const form = root.querySelector(`[data-view="${type}"]`);
    return [type, { form, input: form.querySelector('input'), prompt: form.querySelector('[data-prompt]'), status: form.querySelector('[role="status"]'), element: null, mark: '' }];
  }));
  const listForm = root.querySelector('[data-view="list"]');
  const listInputs = [...listForm.querySelectorAll('input')];
  const listStatus = root.querySelector('[data-list-status]');

  function markInput(input, state) {
    input.dataset.mark = state;
    if (state === 'bad') input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    const marker = input.parentElement.querySelector('.element-mark');
    if (marker) marker.innerHTML = state
      ? `${marks[state]}<span class="element-sr-only">${bilingual(state === 'good' ? '正確' : '請再試', state === 'good' ? 'Correct' : 'Try again')}</span>`
      : '';
  }

  function recallFeedback(type) {
    const { input, status, mark, element } = recall[type];
    markInput(input, mark);
    const answer = type === 'symbol' ? element.s : element.en;
    status.textContent = mark === 'good' ? t('✓ 正確！', '✓ Correct!')
      : mark === 'bad' ? t(`✗ 正確答案是 ${answer}。`, `✗ The answer is ${answer}.`)
      : mark === 'empty' ? t('請先輸入答案。', 'Enter an answer first.') : '';
  }

  function nextRecall(type) {
    const game = recall[type];
    const choices = elements.filter((element) => element !== game.element);
    game.element = choices[Math.floor(Math.random() * choices.length)];
    game.prompt.textContent = type === 'symbol' ? game.element.en : game.element.s;
    game.input.value = '';
    game.mark = '';
    recallFeedback(type);
  }

  function updateListStatus() {
    listStatus.textContent = listScore === null ? ''
      : t(`答對 ${listScore} / 40 項。`, `${listScore} of 40 entries correct.`);
  }

  root.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    const { mode, action, element, slot } = button.dataset;
    if (mode) {
      root.querySelectorAll('[data-mode]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      root.querySelectorAll('[data-view]').forEach((view) => { view.hidden = view.dataset.view !== mode; });
    } else if (element) {
      selected = selected === Number(element) ? null : Number(element);
      updateOrder();
    } else if (slot) {
      const index = Number(slot) - 1;
      const previous = slots.indexOf(selected);
      if (selected && previous !== -1) slots[previous] = null;
      slots[index] = selected;
      selected = null;
      orderChecked = false;
      updateOrder();
    } else if (action === 'check-order') {
      orderChecked = true;
      updateOrder();
    } else if (action === 'reset-order') {
      resetOrder();
    } else if (action === 'next-name' || action === 'next-symbol') {
      nextRecall(action.slice(5));
    }
  });

  for (const [type, game] of Object.entries(recall)) {
    nextRecall(type);
    game.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const value = game.input.value.trim();
      const correct = type === 'symbol' ? value === game.element.s : nameMatches(game.element, value);
      game.mark = !value ? 'empty' : correct ? 'good' : 'bad';
      recallFeedback(type);
    });
    game.input.addEventListener('input', () => {
      game.mark = '';
      recallFeedback(type);
    });
  }
  listForm.addEventListener('submit', (event) => {
    event.preventDefault();
    listScore = 0;
    listInputs.forEach((input) => {
      const element = byNumber(Number(input.closest('[data-row]').dataset.row));
      const value = input.value.trim();
      const correct = input.dataset.answer === 'symbol' ? value === element.s : nameMatches(element, value);
      if (correct) listScore++;
      markInput(input, correct ? 'good' : 'bad');
    });
    updateListStatus();
  });
  listForm.addEventListener('input', (event) => {
    markInput(event.target, '');
    listScore = null;
    updateListStatus();
  });
  listForm.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.isComposing) return;
    const index = listInputs.indexOf(event.target);
    if (index < 0 || index === listInputs.length - 1) return;
    event.preventDefault();
    listInputs[index + 1].focus();
  });
  listForm.addEventListener('reset', () => {
    listInputs.forEach((input) => markInput(input, ''));
    listScore = null;
    updateListStatus();
  });
  resetOrder();

  return () => {
    root.querySelector('.element-modes').setAttribute('aria-label', t('練習模式', 'Practice mode'));
    updateOrder();
    Object.keys(recall).forEach(recallFeedback);
    updateListStatus();
  };
}
