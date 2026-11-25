const samples = [
  { name:'W', melting:-189, boiling:-186 },
  { name:'X', melting:-110, boiling:-40 },
  { name:'Y', melting:-7, boiling:58 },
  { name:'Z', melting:650, boiling:1120 },
];
const initialTemperature = -70;

const labels = {
  solid:['固體','Solid'], liquid:['液體','Liquid'], gas:['氣體','Gas'],
  melting:['固體與液體可共存','Solid and liquid can coexist'],
  boiling:['液體與氣體可共存','Liquid and gas can coexist'],
};

const formatTemperature = value => String(value).replace('-', '−');
const degrees = value => `${formatTemperature(value)} °C`;

function stateAt(sample, temperature) {
  if (temperature < sample.melting) return 'solid';
  if (temperature === sample.melting) return 'melting';
  if (temperature < sample.boiling) return 'liquid';
  return temperature === sample.boiling ? 'boiling' : 'gas';
}

export function phaseComparisonMarkup(t) {
  return `<section class="panel phase-comparison" id="phase-comparison" aria-labelledby="phase-comparison-title">
    <div class="phase-comparison-head">
      <h2 id="phase-comparison-title">${t('從熔點和沸點判斷狀態','Use melting and boiling points to predict state')}</h2>
      <p>${t('選一個元素，調校它的溫度，再跟熔點和沸點比較。每個元素各自記住上次設定的溫度。','Choose an element and compare its temperature with its melting and boiling points. Each element keeps its own temperature.')}</p>
    </div>
    <div class="phase-workspace">
      <div class="phase-controls">
        <div class="phase-choice-group" role="group" aria-label="${t('選擇元素','Choose an element')}">
          <span>${t('元素','Element')}</span>
          ${samples.map(sample => `<button type="button" data-phase-sample="${sample.name}" aria-pressed="${sample.name === 'X'}">${sample.name}</button>`).join('')}
        </div>
        <div class="phase-choice-group" role="group" aria-label="${t('選擇例子溫度','Choose an example temperature')}">
          <span>${t('試一試','Try')}</span>
          <button type="button" data-phase-preset="-70">−70 °C</button>
          <button type="button" data-phase-preset="25">25 °C</button>
        </div>
      </div>
      <label class="phase-slider">
        <span><b id="phase-temperature-label"></b> <output id="phase-temperature" for="phase-temperature-range" aria-hidden="true"></output></span>
        <input id="phase-temperature-range" type="range" step="1" min="-200" max="100" value="${initialTemperature}" aria-labelledby="phase-temperature-label">
      </label>
      <p class="phase-reading" data-phase-reading role="status" aria-atomic="true"></p>
    </div>
    <div class="phase-comparison-data">
      <table>
        <caption>${t('各元素的溫度和狀態（氣壓不變）','Temperature and state of each element (constant pressure)')}</caption>
        <thead><tr><th scope="col">${t('元素','Element')}</th><th scope="col">${t('熔點','Melting point')}</th><th scope="col">${t('沸點','Boiling point')}</th><th scope="col">${t('溫度與狀態','Temperature and state')}</th></tr></thead>
        <tbody>${samples.map(sample => `<tr data-phase-row="${sample.name}"><th scope="row">${sample.name}</th><td>${degrees(sample.melting)}</td><td>${degrees(sample.boiling)}</td><td><div class="phase-table-reading"><span data-phase-row-temperature></span><strong data-phase-result></strong></div></td></tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="phase-examples" role="group" aria-labelledby="phase-examples-title">
      <h3 id="phase-examples-title"></h3>
      <p>${t('點一下固體、液體或氣體試一個例子。點熔點或沸點，看看剛好達到該溫度時的結果。','Tap Solid, Liquid or Gas to try an example. Tap either transition point to test that exact temperature.')}</p>
      <div class="phase-example-buttons">
        <button type="button" data-phase-band="solid"><b>${t('固體','Solid')}</b><small>${t('低於熔點','Below melting point')}</small></button>
        <button type="button" data-phase-edge="melting">
          <span>${t('熔點','Melting point')}</span><strong data-melting-value></strong>
        </button>
        <button type="button" data-phase-band="liquid"><b>${t('液體','Liquid')}</b><small>${t('介乎熔點與沸點','Between melting and boiling points')}</small></button>
        <button type="button" data-phase-edge="boiling">
          <span>${t('沸點','Boiling point')}</span><strong data-boiling-value></strong>
        </button>
        <button type="button" data-phase-band="gas"><b>${t('氣體','Gas')}</b><small>${t('高於沸點','Above boiling point')}</small></button>
      </div>
    </div>
  </section>`;
}

export function setupPhaseComparison(t) {
  const root = document.querySelector('#phase-comparison');
  if (!root) return;
  const range = root.querySelector('input[type="range"]');
  const rangeLabel = root.querySelector('#phase-temperature-label');
  const exampleTitle = root.querySelector('#phase-examples-title');
  const output = root.querySelector('#phase-temperature');
  const reading = root.querySelector('[data-phase-reading]');
  const sampleButtons = [...root.querySelectorAll('[data-phase-sample]')];
  const presetButtons = [...root.querySelectorAll('[data-phase-preset]')];
  const rows = [...root.querySelectorAll('[data-phase-row]')];
  const bands = [...root.querySelectorAll('[data-phase-band], [data-phase-edge]')];
  let selected = samples[1];
  const temperatures = new Map(samples.map(sample => [sample, initialTemperature]));

  function setRange() {
    const temperature = temperatures.get(selected);
    range.min = Math.min(initialTemperature, temperature, selected.melting - 12);
    range.max = Math.max(25, temperature, selected.boiling + 12);
  }

  function render() {
    const temperature = temperatures.get(selected);
    const state = stateAt(selected, temperature);
    const point = degrees(temperature);
    range.value = String(temperature);
    range.setAttribute('aria-valuetext', point);
    rangeLabel.textContent = t(`元素 ${selected.name} 的溫度`, `Temperature of element ${selected.name}`);
    exampleTitle.textContent = t(`試一試元素 ${selected.name} 的不同溫度`, `Try different temperatures for element ${selected.name}`);
    output.textContent = point;
    root.querySelector('[data-melting-value]').textContent = degrees(selected.melting);
    root.querySelector('[data-boiling-value]').textContent = degrees(selected.boiling);
    sampleButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.phaseSample === selected.name)));
    presetButtons.forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.phasePreset) === temperature)));
    bands.forEach(band => {
      const active = (band.dataset.phaseBand || band.dataset.phaseEdge) === state;
      band.classList.toggle('is-current', active);
      band.setAttribute('aria-pressed', String(active));
    });
    for (const [index, sample] of samples.entries()) {
      const row = rows[index];
      const result = row.querySelector('[data-phase-result]');
      const sampleTemperature = temperatures.get(sample);
      row.classList.toggle('is-selected', sample === selected);
      row.querySelector('[data-phase-row-temperature]').textContent = degrees(sampleTemperature);
      result.dataset.state = stateAt(sample, sampleTemperature);
      result.textContent = t(...labels[result.dataset.state]);
    }
    const melt = degrees(selected.melting), boil = degrees(selected.boiling);
    const inequalities = {
      solid: `${point} < ${melt}`,
      melting: `${point} = ${t('熔點','melting point')}`,
      liquid: `${melt} < ${point} < ${boil}`,
      boiling: `${point} = ${t('沸點','boiling point')}`,
      gas: `${point} > ${boil}`,
    };
    reading.innerHTML = `<strong>${selected.name} · ${t(...labels[state])}</strong><span>${inequalities[state]}</span>`;
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.phaseSample) {
      selected = samples.find(sample => sample.name === button.dataset.phaseSample);
    } else if (button.hasAttribute('data-phase-preset')) {
      temperatures.set(selected, Number(button.dataset.phasePreset));
    } else if (button.dataset.phaseEdge) {
      temperatures.set(selected, selected[button.dataset.phaseEdge]);
    } else if (button.dataset.phaseBand) {
      const examples = {
        solid: selected.melting - 5,
        liquid: Math.floor((selected.melting + selected.boiling) / 2),
        gas: selected.boiling + 5,
      };
      temperatures.set(selected, examples[button.dataset.phaseBand]);
    } else {
      return;
    }
    setRange();
    render();
  });
  range.addEventListener('input', () => {
    temperatures.set(selected, Number(range.value));
    render();
  });
  setRange();
  render();
}
