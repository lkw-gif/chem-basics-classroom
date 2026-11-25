const samples = [
  { tube:'A', symbol:'Ca', name:['鈣','Calcium'], product:['氯化鈣','calcium chloride'], reacts:true, bubbles:14 },
  { tube:'B', symbol:'Mg', name:['鎂','Magnesium'], product:['氯化鎂','magnesium chloride'], reacts:true, bubbles:8 },
  { tube:'C', symbol:'C', name:['碳','Carbon'], reacts:false, bubbles:0 },
];

const discussion = [
  [['哪些元素與稀鹽酸反應？','Which elements react with dilute hydrochloric acid?'], ['鈣和鎂。碳沒有可見反應。','Calcium and magnesium. Carbon shows no visible reaction.']],
  [['鈣和鎂分別與稀鹽酸反應時，會產生相同的氣體嗎？','When calcium and magnesium each react with dilute hydrochloric acid, do they produce the same gas?'], ['是。鈣和鎂各自與稀鹽酸反應，均產生氫氣。用燃燒的木條測試，會聽到短促的「噗」聲。','Yes. Calcium and magnesium each react with dilute hydrochloric acid to produce hydrogen gas. A burning splint gives a squeaky pop.']],
  [['除了無色氣泡，還觀察到甚麼？','Apart from colourless bubbles, what else do you observe?'], ['金屬顆粒逐漸變細。','The metal granules decrease in size.']],
  [['鈣和鎂屬於同一族嗎？是哪一族？','Are calcium and magnesium in the same group? Which group?'], ['是。查閱週期表可見，兩者均屬第 II 族。','Yes. The periodic table places both in Group II.']],
  [['寫出兩者的電子排佈。它們有甚麼共同點？','Write both electronic arrangements. What do they share?'], ['Ca：2, 8, 8, 2；Mg：2, 8, 2。最外層均有兩粒電子。','Ca: 2, 8, 8, 2. Mg: 2, 8, 2. Both have two electrons in their outermost shell.']],
];

function tubeMarkup(sample, t) {
  const bubbles = Array.from({ length:sample.bubbles }, (_, index) =>
    `<i style="--x:${12 + (index * 29) % 76}%;--lag:${(index * 113) % 850}ms;--size:${4 + index % 5}px"></i>`).join('');
  return `<div class="acid-station" data-tube="${sample.tube}" data-stage="ready" data-reactive="${sample.reacts}">
    <button type="button" class="acid-tube" data-select="${sample.tube}" aria-pressed="${sample.tube === 'A'}" aria-label="${t(`試管 ${sample.tube}，${sample.name[0]}`, `Tube ${sample.tube}, ${sample.name[1]}`)}">
      <span class="acid-tube-id"><b>${sample.tube}</b><strong>${sample.symbol}</strong></span>
      <span class="acid-apparatus" aria-hidden="true">
        <span class="acid-splint"></span>
        ${sample.reacts ? `<span class="acid-pop-label">${t('噗！','Pop!')}</span>` : ''}
        <span class="acid-glass"><span class="acid-fluid"></span><span class="acid-solid"></span><span class="acid-bubbles">${bubbles}</span></span>
        <span class="acid-rack"></span>
      </span>
      <span class="acid-name">${t(...sample.name)}</span>
      <small data-tube-progress></small>
    </button>
  </div>`;
}

export function acidLabMarkup(t) {
  return `<section id="acid-lab" class="panel acid-lab" aria-labelledby="acid-lab-title">
    <div class="acid-lab-heading">
      <span>${t('虛擬實驗 · 學生筆記第 5–6 頁','Virtual lab · Student notes pp. 5–6')}</span>
      <h2 id="acid-lab-title">${t('同族元素與稀鹽酸的反應相似嗎？','Do elements in the same group react similarly with dilute hydrochloric acid?')}</h2>
      <p>${t('三支試管裝有等量稀鹽酸。選試管、加入元素、測試氣體，再把觀察記入結果表。','All three tubes contain the same volume of dilute hydrochloric acid. Choose a tube, add its sample, test for gas, then record your observations.')}</p>
    </div>
    <div class="acid-lab-bench">
      <div class="acid-run">
        <button type="button" data-acid-run></button>
        <span>${t('由頭依次示範 A、B、C，並自動記錄結果。','Start a fresh run of A, B and C and record the results automatically.')}</span>
      </div>
      <div class="acid-stations" role="group" aria-label="${t('選擇試管','Choose a test tube')}">${samples.map(sample => tubeMarkup(sample,t)).join('')}</div>
      <div class="acid-controls">
        <h3 data-acid-title></h3>
        <div class="acid-actions">
          <button type="button" data-acid-add></button>
          <button type="button" data-acid-test>${t('用燃燒的木條測試','Test with a burning splint')}</button>
          <button type="button" data-acid-record>${t('記錄結果','Record result')}</button>
          <button type="button" data-acid-reset>${t('重設實驗','Reset lab')}</button>
        </div>
        <p class="acid-feedback" role="status" aria-atomic="true" data-acid-feedback></p>
      </div>
      <p class="acid-caption">${t('氣泡、反應時間和「噗」聲均為教學模擬。','The bubbles, reaction timings and pop sound are simulated.')}</p>
    </div>
    <div class="acid-results">
      <div class="acid-results-heading"><h3>${t('實驗結果','Results')}</h3><span data-acid-progress></span></div>
      <table>
        <thead><tr>${[['元素','Element'],['氣泡','Bubbles'],['放熱','Heat released'],['氣體','Gas']].map(label => `<th scope="col">${t(...label)}</th>`).join('')}</tr></thead>
        <tbody>${samples.map(sample => `<tr data-result="${sample.tube}"><th scope="row">${sample.symbol}<small>${t(...sample.name)}</small></th><td>—</td><td>—</td><td>—</td></tr>`).join('')}</tbody>
      </table>
      <div class="acid-equations" data-acid-equations hidden>
        <h3>${t('文字方程式','Word equations')}</h3>
        ${samples.filter(sample => sample.reacts).map(sample => `<p data-equation="${sample.tube}" hidden>${t(...sample.name)} + ${t('稀鹽酸','dilute hydrochloric acid')} → ${t(...sample.product)} + ${t('氫氣','hydrogen')}</p>`).join('')}
      </div>
    </div>
    <div class="acid-discussion" data-acid-discussion hidden>
      <h3>${t('討論與結論','Discussion and conclusion')}</h3>
      ${discussion.map(([q,a]) => `<details><summary>${t(...q)}</summary><p>${t(...a)}</p></details>`).join('')}
      <p class="acid-conclusion"><strong>${t('同族元素的化學性質相似。','Elements in the same group have similar chemical properties.')}</strong> ${t('例如鈣和鎂同屬第 II 族，均與稀鹽酸反應產生氫氣。','Calcium and magnesium are both in Group II and react with dilute hydrochloric acid to produce hydrogen.')}</p>
    </div>
  </section>`;
}

export function setupAcidLab(t) {
  const lab = document.querySelector('#acid-lab');
  if (!lab) return;
  const stages = samples.map(() => 'ready');
  const recorded = new Set();
  const add = lab.querySelector('[data-acid-add]');
  const test = lab.querySelector('[data-acid-test]');
  const record = lab.querySelector('[data-acid-record]');
  const run = lab.querySelector('[data-acid-run]');
  const selectors = [...lab.querySelectorAll('[data-select]')];
  const pop = new Audio(new URL('./splint-pop.wav', import.meta.url));
  const runAudio = new Audio(new URL('./all-tubes-pop.wav', import.meta.url));
  // The two pops in runAudio start 390 ms after each of the first two splint tests.
  const splintAt = 2300;
  const recordAt = 3100;
  pop.preload = 'auto';
  runAudio.preload = 'auto';
  let selected = 0;
  let running = false;
  let timer;

  function render() {
    const sample = samples[selected];
    const stage = stages[selected];
    lab.querySelector('[data-acid-title]').textContent = t(`試管 ${sample.tube} · ${sample.name[0]}`, `Tube ${sample.tube} · ${sample.name[1]}`);
    add.textContent = t(`加入${sample.name[0]}`, `Add ${sample.name[1].toLowerCase()}`);
    run.textContent = running ? t('停止自動實驗','Stop automatic run') : t('一次完成三支試管','Run all three tubes');
    add.disabled = running || stage !== 'ready';
    test.disabled = running || stage !== 'observed';
    record.disabled = running || stage !== 'tested' || recorded.has(sample.tube);

    let message = t('加入所選元素，留意有沒有氣泡和溫度變化。','Add the selected element and look for bubbles and a temperature change.');
    if (stage === 'observed' || stage === 'tested') {
      message = sample.reacts
        ? t('有無色氣泡冒出，金屬顆粒逐漸變細。','Colourless bubbles appear and the metal granules decrease in size.')
        : t('碳粉仍然可見。沒有氣泡，沒有明顯升溫。','Carbon powder remains visible. There are no bubbles or noticeable warming.');
    }
    if (stage === 'tested') message += sample.reacts
      ? t(' 燃燒的木條發出「噗」聲，氣體是氫氣。',' The gas burns with a squeaky pop, identifying it as hydrogen.')
      : t(' 木條沒有發出「噗」聲，沒有氣體產生。',' There is no pop. No gas was produced.');
    if (recorded.has(sample.tube)) message += t(' 已記錄結果。',' Result recorded.');
    if (running) message = t(`試管 ${sample.tube}：`, `Tube ${sample.tube}: `) + message;
    lab.querySelector('[data-acid-feedback]').textContent = message;

    samples.forEach((item,index) => {
      const current = stages[index];
      const tube = lab.querySelector(`[data-tube="${item.tube}"]`);
      tube.dataset.stage = current;
      selectors[index].disabled = running;
      selectors[index].setAttribute('aria-pressed', String(index === selected));
      const saved = recorded.has(item.tube);
      tube.querySelector('[data-tube-progress]').textContent = saved ? t('已記錄','Recorded')
        : current === 'tested' ? t('待記錄','Ready to record')
        : current === 'observed' ? t('待測試','Ready to test') : t('未開始','Ready');
      const cells = lab.querySelectorAll(`[data-result="${item.tube}"] td`);
      const mark = !saved ? '—' : item.reacts ? t('有','Yes') : t('沒有','No');
      cells[0].textContent = mark;
      cells[1].textContent = mark;
      cells[2].textContent = !saved ? '—' : item.reacts ? t('氫氣 (H₂)','Hydrogen (H₂)') : t('沒有','None');
      const equation = lab.querySelector(`[data-equation="${item.tube}"]`);
      if (equation) equation.hidden = !saved;
    });
    lab.querySelector('[data-acid-progress]').textContent = t(`已記錄 ${recorded.size} / 3`, `${recorded.size} / 3 recorded`);
    lab.querySelector('[data-acid-equations]').hidden = !recorded.has('A') && !recorded.has('B');
    lab.querySelector('[data-acid-discussion]').hidden = recorded.size !== samples.length;
  }

  selectors.forEach((button,index) => button.addEventListener('click', () => {
    selected = index;
    render();
  }));
  add.addEventListener('click', () => {
    stages[selected] = 'observed';
    render();
    test.focus({ preventScroll:true });
  });
  test.addEventListener('click', () => {
    stages[selected] = 'tested';
    render();
    if (samples[selected].reacts) {
      pop.currentTime = 0;
      // Start on the test gesture so touch browsers allow sound.
      void pop.play().catch(() => {});
    }
    record.focus({ preventScroll:true });
  });
  record.addEventListener('click', () => {
    recorded.add(samples[selected].tube);
    render();
    selectors[selected].focus({ preventScroll:true });
  });

  function stopAutomaticRun() {
    clearTimeout(timer);
    runAudio.pause();
    running = false;
  }
  function clearResults() {
    stopAutomaticRun();
    pop.pause();
    selected = 0;
    stages.fill('ready');
    recorded.clear();
    lab.querySelectorAll('details[open]').forEach(detail => { detail.open = false; });
  }
  function runTube(index) {
    selected = index;
    stages[index] = 'observed';
    render();
    timer = setTimeout(() => {
      stages[index] = 'tested';
      render();
      timer = setTimeout(() => {
        recorded.add(samples[index].tube);
        if (index + 1 < samples.length) runTube(index + 1);
        else {
          stopAutomaticRun();
          render();
          lab.querySelector('[data-acid-feedback]').textContent = t('三支試管的結果已記錄。','All three results have been recorded.');
        }
      }, recordAt - splintAt);
    }, splintAt);
  }
  run.addEventListener('click', () => {
    if (running) {
      stopAutomaticRun();
      render();
      return;
    }
    clearResults();
    running = true;
    runAudio.currentTime = 0;
    // Use a single audio track started by the click, including the two timed cues.
    void runAudio.play().catch(() => {});
    runTube(0);
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden || !running) return;
    stopAutomaticRun();
    render();
  });
  lab.querySelector('[data-acid-reset]').addEventListener('click', () => {
    clearResults();
    render();
  });
  render();
}
