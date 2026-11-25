const samples = [
  { name:'W', melting:-189, boiling:-186 },
  { name:'X', melting:-110, boiling:-40 },
  { name:'Y', melting:-7, boiling:58 },
  { name:'Z', melting:650, boiling:1120 },
];

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
      <p>${t('選一個元素，再比較溫度是低於熔點、介乎兩點之間，還是高於沸點。','Choose an element. Compare its temperature with the melting and boiling points.')}</p>
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
        <span>${t('拖動以改變溫度','Drag to change the temperature')} <output id="phase-temperature" for="phase-temperature-range">−70 °C</output></span>
        <input id="phase-temperature-range" type="range" step="1" min="-200" max="100" value="-70" aria-valuetext="−70 °C">
      </label>
      <div class="phase-scale">
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
      <p class="phase-reading" data-phase-reading role="status" aria-atomic="true"></p>
    </div>
    <div class="phase-comparison-data">
      <table>
        <caption>${t('四個元素的狀態比較（氣壓不變）','Compare all four elements at constant pressure')}</caption>
        <thead><tr><th scope="col">${t('元素','Element')}</th><th scope="col">${t('熔點','Melting point')}</th><th scope="col">${t('沸點','Boiling point')}</th><th scope="col" data-phase-column></th></tr></thead>
        <tbody>${samples.map(sample => `<tr data-phase-row="${sample.name}"><th scope="row">${sample.name}</th><td>${degrees(sample.melting)}</td><td>${degrees(sample.boiling)}</td><td data-phase-result></td></tr>`).join('')}</tbody>
      </table>
      <p>${t('點一下固體、液體或氣體試一個例子。點熔點或沸點，看看剛好達到該溫度時的結果。','Tap Solid, Liquid or Gas to try an example. Tap either transition point to test that exact temperature.')}</p>
    </div>
  </section>`;
}

export function setupPhaseComparison(t) {
  const root = document.querySelector('#phase-comparison');
  if (!root) return;
  const range = root.querySelector('input[type="range"]');
  const output = root.querySelector('#phase-temperature');
  const reading = root.querySelector('[data-phase-reading]');
  const sampleButtons = [...root.querySelectorAll('[data-phase-sample]')];
  const presetButtons = [...root.querySelectorAll('[data-phase-preset]')];
  const rows = [...root.querySelectorAll('[data-phase-row]')];
  const bands = [...root.querySelectorAll('[data-phase-band], [data-phase-edge]')];
  let selected = samples[1];
  let temperature = -70;

  function setRange() {
    range.min = Math.min(-70, temperature, selected.melting - 12);
    range.max = Math.max(25, temperature, selected.boiling + 12);
  }

  function render() {
    const state = stateAt(selected, temperature);
    const point = degrees(temperature);
    range.value = String(temperature);
    range.setAttribute('aria-valuetext', point);
    output.textContent = point;
    root.querySelector('[data-melting-value]').textContent = degrees(selected.melting);
    root.querySelector('[data-boiling-value]').textContent = degrees(selected.boiling);
    root.querySelector('[data-phase-column]').textContent = t(`${point} 的狀態`, `State at ${point}`);
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
      row.classList.toggle('is-selected', sample === selected);
      result.dataset.state = stateAt(sample, temperature);
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
      temperature = Number(button.dataset.phasePreset);
    } else if (button.dataset.phaseEdge) {
      temperature = selected[button.dataset.phaseEdge];
    } else if (button.dataset.phaseBand) {
      const examples = {
        solid: selected.melting - 5,
        liquid: Math.floor((selected.melting + selected.boiling) / 2),
        gas: selected.boiling + 5,
      };
      temperature = examples[button.dataset.phaseBand];
    } else {
      return;
    }
    setRange();
    render();
  });
  range.addEventListener('input', () => {
    temperature = Number(range.value);
    render();
  });
  setRange();
  render();
}
