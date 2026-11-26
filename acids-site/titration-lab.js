import {titrationCases, titrationTrials} from './titration-data.js';

const drafts = new Map();
const reviewed = new Set();
let trial = 0;
let reading = 0;
let curveSample = 0;
const phSamples = [
  [0,3.02], [4,3.55], [8,4.24], [12,4.77], [15,5.43], [16.3,6.06],
  [16.65,6.72], [16.75,7.27], [16.80,7.90], [16.85,8.52], [16.95,8.97],
  [17.3,9.43], [18,9.81], [20,10.18], [24,10.47],
];

export function titrationNavigation({t,b,anchor}) {
  return `<ol class="lab-nav-list">${titrationCases.map((item,i)=>`<li><a href="${anchor('lab-'+item.year)}"><span>${i+1}</span> ${item.year} ${b(item.stage)}</a></li>`).join('')}</ol>`;
}

function burette({t}) {
  const value = titrationTrials[trial][reading];
  const start = Math.max(0, Math.floor(value)-0.5);
  const bottom = (value-start)*50;
  return `<div class="lab-view" aria-hidden="true">
    <div class="lab-glass">
      <div class="lab-liquid" style="--meniscus:${bottom}%"></div>
      ${Array.from({length:21},(_,i)=>`<i class="lab-tick ${i%5===0?'lab-tick-major':''}" style="--tick:${i*5}%">${i%5===0?`<span>${(start+i/10).toFixed(1)}</span>`:''}</i>`).join('')}
    </div>
    <span class="lab-view-unit">cm³</span>
    <span class="lab-view-label">${t('滴定管刻度向下增加','Burette readings increase downwards')}</span>
  </div>`;
}

function bench(view) {
  const {t} = view;
  return `<section class="lab-bench" aria-labelledby="lab-bench-title">
    <div>
      <h3 id="lab-bench-title">${t('讀一次滴定管','Read the burette')}</h3>
      <p>${t('平視凹液面，讀取最低點。每次記下初讀數同終讀數，再比較真正流出嘅體積。','Read the bottom of the meniscus at eye level. Record both readings for each run, then compare the volumes actually delivered.')}</p>
      <label class="lab-select-label" for="lab-trial">${t('選擇試驗','Choose a trial')}</label>
      <select id="lab-trial">${titrationTrials.map((_,i)=>`<option value="${i}" ${trial===i?'selected':''}>${t(`第 ${i+1} 次`,`Trial ${i+1}`)}</option>`).join('')}</select>
      <div class="lab-reading-controls" role="group" aria-label="${t('讀數位置','Reading position')}">
        <button type="button" data-lab-reading="0" aria-pressed="${reading===0}">${t('初讀數','Initial')}</button>
        <button type="button" data-lab-reading="1" aria-pressed="${reading===1}">${t('終讀數','Final')}</button>
      </div>
      <output id="lab-reading-text" aria-live="polite">${readingText(t)}</output>
    </div>
    <figure id="lab-burette" aria-label="${t('滴定管放大示意','Magnified burette diagram')}">${burette(view)}</figure>
  </section><details class="lab-data">
    <summary>${t('查閱五次滴定讀數表','View the table of all five trials')}</summary>
    <table>
      <caption>${t('滴定管讀數（cm³）','Burette readings (cm³)')}</caption>
      <thead><tr><th scope="col">${t('試驗','Trial')}</th><th scope="col">${t('初讀數','Initial')}</th><th scope="col">${t('終讀數','Final')}</th></tr></thead>
      <tbody>${titrationTrials.map(([initial,final],i)=>`<tr><th scope="row">${i+1}</th><td>${initial.toFixed(2)}</td><td>${final.toFixed(2)}</td></tr>`).join('')}</tbody>
    </table>
  </details>`;
}

function readingText(t) {
  return t(reading===0?`第 ${trial+1} 次初讀數已顯示`:`第 ${trial+1} 次終讀數已顯示`,
    `Showing the ${reading===0?'initial':'final'} reading for trial ${trial+1}`);
}

function curveText(t) {
  const [volume,ph] = phSamples[curveSample];
  return t(`加入 NaOH ${volume.toFixed(2)} cm³，pH ${ph.toFixed(2)}`, `NaOH added: ${volume.toFixed(2)} cm³. pH: ${ph.toFixed(2)}.`);
}

function curve({t}) {
  const points = phSamples.map(([volume,ph])=>[42+volume*12,145-ph*11].join(',')).join(' ');
  const [volume,ph] = phSamples[curveSample];
  return `<div class="lab-curve">
    <h4>${t('用 pH 探頭找終點','Find the end point with a pH probe')}</h4>
    <p>${t('移動游標，檢視各點嘅讀數。找出少量 NaOH 令 pH 變化最大嘅區段。以下係模擬數據。','Move the cursor through the sample readings. Look for the largest pH change over a small addition of NaOH. The data are simulated.')}</p>
    <svg viewBox="0 0 360 166" aria-hidden="true">
      <path d="M42 10V145H336" fill="none" stroke="#526676"/>
      <path d="M42 57H336M42 101H336" fill="none" stroke="#dce5eb"/>
      <g fill="#526676" font-size="11"><text x="19" y="20">pH</text><text x="27" y="61">8</text><text x="27" y="105">4</text><text x="42" y="160">0</text><text x="216" y="160">NaOH / cm³</text><text x="320" y="160">24</text></g>
      <polyline points="${points}" fill="none" stroke="#06745c" stroke-width="2.5"/>
      <circle id="lab-ph-point" cx="${42+volume*12}" cy="${145-ph*11}" r="5" fill="#98384e" stroke="white" stroke-width="1.5"/>
    </svg>
    <label for="lab-ph-sample">${t('依次查看模擬讀數','Step through the simulated readings')}</label>
    <input id="lab-ph-sample" type="range" min="0" max="${phSamples.length-1}" value="${curveSample}" aria-valuetext="${curveText(t)}">
    <output for="lab-ph-sample" id="lab-ph-reading">${curveText(t)}</output>
  </div>`;
}

function solution(item,view) {
  const {t,b,url,anchor} = view;
  const next = titrationCases[titrationCases.indexOf(item)+1];
  return `<h3 id="lab-solution-${item.year}" tabindex="-1">${t('解題步驟同 DSE 答題字眼','Worked solution and DSE answer wording')}</h3>
    <p class="lab-note">${t('以下係教學參考答案及得分點，用嚟對照你嘅作答。','Compare your response with these teaching models and suggested answer points.')}</p>
    ${item.parts.map(part=>`<section class="lab-solution-part"><h4>${part.label} ${b(part.type)}</h4>
      <ol>${part.steps.map(step=>`<li>${b(step)}</li>`).join('')}</ol>
      ${item.year===2025&&part.id==='biii'?curve(view):''}
      <div class="lab-wording">
        <strong>${t('DSE 答題字眼','DSE answer wording')}</strong>
        <p>${b(part.wording)}</p>
        ${t(`<p lang="en">${view.h(part.wording[1])}</p>`,'')}
      </div>
    </section>`).join('')}
    <div class="actions">
      ${next?`<a class="primary" href="${anchor('lab-'+next.year)}">${t(`去做 ${next.year} 年題`,`Try the ${next.year} question`)}</a>`:
        `<a class="secondary" href="${url('sessions/titration/')}">${t('返回滴定 Notes','Return to titration notes')}</a>`}
    </div>`;
}

function station(item,view) {
  const {t,b,h} = view;
  const {year,paper,question} = item;
  return `<section class="lab-station" id="lab-${year}" tabindex="-1" aria-labelledby="lab-title-${year}">
    <header class="lab-station-header">
      <p class="lab-stage">${b(item.stage)}</p>
      <p class="lab-reference">${year} HKDSE Chemistry · ${paper} · ${question}</p>
      <h2 id="lab-title-${year}" tabindex="-1">${b(item.title)}</h2>
      <p>${b(item.skill)}</p>
      <p class="lab-source"><a href="${item.source}" target="_blank" rel="noopener">${t('原題出處｜考評局考生表現示例','Original question｜HKEAA sample performance')}</a>
      <span>${t('試卷印頁','Printed paper pages')} ${item.pages}</span>
      ${item.briefing?`<a href="${item.briefing}" target="_blank" rel="noopener">${t('考評局簡介會 Q7','HKEAA briefing on Q7')}</a>`:''}</p>
    </header>
    <div class="lab-body">
      <p class="lab-setup">${b(item.setup)}</p>
      ${year===2021?bench(view):''}
      <form class="lab-form" data-lab-year="${year}">
        ${item.parts.map(part=>{
          const id=`lab-answer-${year}-${part.id}`;
          const marks = part.marks ? ` <small>(${part.marks} ${t('分',part.marks===1?'mark':'marks')})</small>` : '';
          return `<section class="lab-part">
            <h3><span>${part.label}</span> ${b(part.type)}${marks}</h3>
            <label for="${id}">${b(part.prompt)}</label>
            ${part.hint?`<details class="lab-hint"><summary>${t('睇提示','Show a hint')}</summary><p>${b(part.hint)}</p></details>`:''}
            <textarea id="${id}" name="${part.id}" rows="${part.marks===1||part.id==='cii'?2:3}" required aria-invalid="false" spellcheck="false">${h(drafts.get(id)||'')}</textarea>
            <p class="lab-field-error" id="${id}-error" hidden>${t('請先寫低你對呢小題嘅答案。','Enter your attempt for this part first.')}</p>
          </section>`;
        }).join('')}
        <div class="lab-submit">
          <button class="primary" type="submit">${reviewed.has(year)?t('返回解題步驟','Return to the worked solution'):t('完成作答，揭示解題','Finish and reveal the solution')}</button>
          ${reviewed.has(year)?'':`<small>${t('填好所有小題即可對照答案。','Attempt every part to reveal the solution.')}</small>`}
        </div>
      </form>
      <div class="lab-solution" data-lab-solution="${year}" ${reviewed.has(year)?'':'hidden'}>${reviewed.has(year)?solution(item,view):''}</div>
    </div>
  </section>`;
}

export function titrationPage(view) {
  const {t,url,anchor} = view;
  document.title = t('滴定 Virtual Lab · DSE CHEM','Titration Virtual Lab · DSE CHEM');
  return `<article class="titration-lab">
    <div class="breadcrumb"><a href="${url()}">${t('酸與鹼','Acids & bases')}</a> / Virtual Lab</div>
    <header class="lab-intro">
      <h1>${t('滴定 Virtual Lab','Titration Virtual Lab')}</h1>
      <p>${t('由五次滴定讀數，揀出一個合理平均。跟住用同一套方法做胃藥、酒石酸同蛋殼題。','Start with five burette readings and decide which belong in the average. Apply the same reasoning to antacid, tartaric acid and eggshell questions.')}</p>
      <div class="actions"><a class="primary" href="${anchor('lab-2021')}">${t('開始 2021 帶做','Start the 2021 walkthrough')}</a><a class="secondary" href="${url('sessions/titration/')}">${t('重溫滴定 Notes','Review titration notes')}</a></div>
    </header>
    <nav id="lab-route" class="lab-route" aria-label="${t('四題練習導覽','Navigate the four questions')}">${titrationNavigation(view)}</nav>
    <p class="lab-note">${t('題意按考評局原題改寫，原題出處見各題。作答供即場自評，重新載入會清除。','Prompts are adapted from the linked HKEAA originals. Answers are for self-review and clear when you reload.')}</p>
    ${titrationCases.map(item=>station(item,view)).join('')}
  </article>`;
}

export function bindTitrationLab(main,view) {
  const redrawBurette = () => {
    main.querySelector('#lab-burette').innerHTML = burette(view);
    main.querySelector('#lab-reading-text').textContent = readingText(view.t);
    main.querySelectorAll('[data-lab-reading]').forEach(button=>{
      button.setAttribute('aria-pressed',String(Number(button.dataset.labReading)===reading));
    });
  };
  const showError = (field,visible) => {
    field.setAttribute('aria-invalid',String(visible));
    const error = document.getElementById(`${field.id}-error`);
    error.hidden = !visible;
    if (visible) field.setAttribute('aria-describedby',error.id);
    else field.removeAttribute('aria-describedby');
  };

  main.addEventListener('click',event=>{
    const button = event.target.closest('[data-lab-reading]');
    if (!button) return;
    reading = Number(button.dataset.labReading);
    redrawBurette();
  });
  main.addEventListener('change',event=>{
    if (event.target.id!=='lab-trial') return;
    trial = Number(event.target.value);
    redrawBurette();
  });
  main.addEventListener('invalid',event=>{
    if (event.target.closest('[data-lab-year]')) showError(event.target,true);
  },true);
  main.addEventListener('focusout',event=>{
    const field = event.target;
    if (field.matches('[data-lab-year] textarea')&&CSS.supports('selector(:user-invalid)')&&field.matches(':user-invalid')) showError(field,true);
  });
  main.addEventListener('input',event=>{
    const field = event.target;
    if (field.matches('[data-lab-year] textarea')) {
      drafts.set(field.id,field.value);
      field.setCustomValidity(field.value&&!field.value.trim()?view.t('請寫低你嘅答案。','Enter your attempt.'):'');
      if (field.validity.valid) showError(field,false);
    }
    if (field.id==='lab-ph-sample') {
      curveSample = Number(field.value);
      const [volume,ph] = phSamples[curveSample];
      const point = main.querySelector('#lab-ph-point');
      point.setAttribute('cx',42+volume*12);
      point.setAttribute('cy',145-ph*11);
      field.setAttribute('aria-valuetext',curveText(view.t));
      main.querySelector('#lab-ph-reading').textContent = curveText(view.t);
    }
  });
  main.addEventListener('submit',event=>{
    const form = event.target.closest('[data-lab-year]');
    if (!form) return;
    event.preventDefault();
    const blank = Array.from(form.elements).find(field=>field.tagName==='TEXTAREA'&&!field.value.trim());
    if (blank) {
      blank.setCustomValidity(view.t('請寫低你嘅答案。','Enter your attempt.'));
      blank.reportValidity();
      return;
    }
    const year = Number(form.dataset.labYear);
    const panel = main.querySelector(`[data-lab-solution="${year}"]`);
    if (!reviewed.has(year)) {
      reviewed.add(year);
      panel.innerHTML = solution(titrationCases.find(item=>item.year===year),view);
      panel.hidden = false;
      form.querySelector('button').textContent = view.t('返回解題步驟','Return to the worked solution');
      form.querySelector('.lab-submit small').remove();
    }
    panel.querySelector('h3').focus();
  });
}
