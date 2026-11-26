import {outcomes,units,extensions,curriculumGroups} from './curriculum.js';
import {lessons} from './lessons.js';
import {questions,originalQuestions,supplementQuestions,categories} from './questions.js';
import {drawDiagram} from './diagrams.js';
import {notesRoute,tutoring} from './tutoring.js';
import {bindTitrationLab,titrationNavigation,titrationPage} from './titration-lab.js';

const root=new URL('./',document.baseURI), params=new URL(location.href).searchParams;
let language=params.get('lang')==='en'?'en':'zh';
let lessonId='',revision=false,lab=false,filter='all',query='';
const answers=new Map(),reveals=new Map(),pages=new Map();
const PAGE_SIZE=5,main=document.querySelector('#main'),sidebar=document.querySelector('#sidebar');
const h=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const t=(zh,en)=>language==='en'?en:zh;
const b=pair=>h(pair?.[language==='en'?1:0]??'');
const url=(path='',question)=>{const u=new URL(path,root);u.searchParams.set('lang',language);if(question){u.searchParams.set('question',question);u.hash=`question-${question}`;}return u.href;};
const lessonUrl=id=>url(`sessions/${id}/`);
const lesson=id=>lessons.find(l=>l.id===id);
const label=id=>b(lesson(id).title);
const category=id=>t(...categories.find(c=>c[0]===id).slice(1));
const nl=pair=>b(pair).replace(/\\n|\n/g,'<br>');
const anchor=id=>{const u=new URL(location.href);u.hash=id;return u.href;};
const pill=(text,extra='')=>`<span class="pill ${extra}">${text}</span>`;
const labView={h,t,b,url,anchor};
const labLabel=()=>t('滴定 Virtual Lab','Titration Virtual Lab');
const labUrl=()=>url('titration-lab/');
const saltMethods = ['precipitation','excess-solid','titration-salts'];
const saltExercise = questions.filter(q=>q.source?.pdfPage===77).map(q=>({...q,advanced:false}));
const notesNumber=id=>notesRoute.findIndex(([route])=>route===id)+1;
const practiceQuestions=id=>id==='salt-methods'?saltExercise:questions.filter(q=>q.lesson===id);

function locate(){
 const path=location.pathname.slice(root.pathname.length).split('/').filter(Boolean);
 lessonId=path[0]==='sessions'?path[1]:'';revision=path[0]==='revision';lab=path[0]==='titration-lab';
 if(lessonId&&!lesson(lessonId))lessonId='';
 const requested=new URL(location.href).searchParams.get('question');
 const available=practiceQuestions(lessonId),q=available.find(item=>item.id===requested);
 if(q){const group=q.advanced?'advanced':'core',list=available.filter(x=>Boolean(x.advanced)===Boolean(q.advanced));pages.set(`${lessonId}-${group}`,Math.floor(list.indexOf(q)/PAGE_SIZE));if(q.advanced)reveals.set(`${lessonId}-advanced`,true);}
}
function goals(list,full=false){return `<ol class="goals">${list.map(o=>`<li><span class="outcome-id">${h(o.id.toUpperCase())}</span><div>${b(o.text)}${full?`<div class="goal-links">${o.lessons.map(id=>`<a href="${lessonUrl(id)}">${label(id)} →</a>`).join('')}</div>`:''}<small class="curriculum-ref">${t('課程','Curriculum')} ${h(o.page)}</small></div></li>`).join('')}</ol>`;}
function renderSidebar(){
 sidebar.innerHTML=`<div class="side-heading"><span>DSE</span><b>${t('酸與鹼','Acids & bases')}</b></div><nav aria-label="${t('課節目錄','Lesson navigation')}"><a class="side-main ${!lessonId&&!revision&&!lab?'active':''}" href="${url()}" ${!lessonId&&!revision&&!lab?'aria-current="page"':''}>${t('課程目標與學習路線','Outcomes & learning route')}</a><a class="side-main ${lab?'active':''}" href="${labUrl()}" ${lab?'aria-current="page"':''}>${labLabel()}</a>${lab?titrationNavigation(labView):''}${units.map(u=>`<details class="side-unit" ${u.lessons.includes(lessonId)?'open':''}><summary><span>${u.id.padStart(2,'0')}</span>${b(u.title)}</summary>${u.lessons.map(id=>`<a class="${id===lessonId?'active':''}" href="${lessonUrl(id)}" ${id===lessonId?'aria-current="page"':''}>${label(id)}</a>`).join('')}</details>`).join('')}<details class="side-unit" ${extensions.includes(lessonId)?'open':''}><summary>${t('進階延伸','Further practice')}</summary>${extensions.map(id=>`<a href="${lessonUrl(id)}" ${id===lessonId?'aria-current="page" class="active"':''}>${label(id)}</a>`).join('')}</details><a class="side-main ${revision?'active':''}" href="${url('revision/')}" ${revision?'aria-current="page"':''}>${t('全課重點與練習索引','Revision & question index')}</a></nav><div class="side-foot">${t('閱讀 → 示範 → 試做 → 自評','Read → example → practise → compare')}<small>${t('答案逐層揭示 · 毋須登入','Reveal answers in stages · no login')}</small></div>`;
}
function home(){
 document.title=t('酸與鹼自學 · DSE CHEM','Acids & bases self-study · DSE CHEM');
 return `<div class="breadcrumb">DSE CHEMISTRY / ${t('課程總覽','Course overview')}</div><section class="hero"><div><span class="eyebrow">TOPIC IV · ACIDS AND BASES</span><h1>${t('DSE 酸與鹼答題講義','DSE Acids and Bases Workbook')}</h1><p>${t('同樣溶入 HCl，點解水嗰杯導電，甲苯嗰杯喺實驗中唔導電？由兩個燒杯開始，練習用粒子解釋現象。','Both beakers contain dissolved HCl. Why does the water sample conduct electricity while the methylbenzene sample does not? Start by linking the observations to particles.')}</p><div class="actions"><a class="primary" href="${h(anchor('curriculum'))}">${t('這個課題會學到甚麼','What you will learn')} ↓</a><a class="secondary" href="${lessonUrl('water')}">${t('開始第 1 課','Start lesson 1')}</a></div></div><div class="home-notes-figure">${notesFigure(tutoring.water.figure)}</div></section><div class="stats"><div><b>36</b><span>${t('DSE 學習成果','DSE learning outcomes')}</span></div><div><b>7</b><span>${t('循序漸進單元','Learning units')}</span></div><div><b>${originalQuestions.length} + ${supplementQuestions.length}</b><span>${t('原 Notes 題目 + 補充練習','Source questions + supplements')}</span></div></div><section id="curriculum" class="section"><div class="section-heading"><span class="eyebrow">CURRICULUM / I16–I17</span><h2>${t('這個課題會學到甚麼','What you will learn')}</h2><p>${t('按提供的 DSE curriculum 六個範疇整理。展開學習成果，再點擊相關 Notes；這是課程範圍，毋須勾選。','The six strands follow the supplied DSE curriculum. Expand the outcomes and follow the notes links. These describe the scope of study; no ticking is required.')}</p></div><div class="curriculum-grid">${curriculumGroups.map(([id,zh,en])=>`<details class="curriculum-card"><summary><span class="strand">${id.toUpperCase()}</span><div><b>${t(zh,en)}</b><small>${outcomes.filter(o=>o.group===id).length} ${t('項學習成果','learning outcomes')}</small></div><span class="chevron">+</span></summary>${goals(outcomes.filter(o=>o.group===id),true)}${language==='zh'?`<details class="english-source"><summary>英文課程原文</summary>${outcomes.filter(o=>o.group===id).map(o=>`<p><b>${o.id.toUpperCase()}</b> ${h(o.text[1])}</p>`).join('')}</details>`:''}</details>`).join('')}</div></section>${notesNavigation()}<section class="section" id="route"><div class="section-heading"><span class="eyebrow">LEARNING ROUTE / 07 UNITS</span><h2>${t('照次序學，每次一個小課節','Follow the route, one short lesson at a time')}</h2><p>${t('先濃度、後 pH 計算；先理解製鹽選擇，再深入滴定。','Study concentration before pH calculations, and salt-method selection before detailed titration.')}</p></div><div class="unit-grid">${units.map(u=>`<article class="unit-card"><span class="unit-number">${u.id.padStart(2,'0')}</span><h3>${b(u.title)}</h3><p>${b(u.lead)}</p><ol>${u.lessons.map(id=>`<li><a href="${lessonUrl(id)}">${label(id)} <span>→</span></a></li>`).join('')}</ol></article>`).join('')}</div></section><section class="card extension-card"><span class="eyebrow">FURTHER PRACTICE</span><h2>${t('保留原 Notes 的深入內容','Explore the extended source material')}</h2><p>${t('金屬離子測試、氨氣製備及氣體乾燥放在延伸課節；原題仍可作答。','Metal-ion tests, ammonia preparation and gas drying are in further lessons, with the original questions retained.')}</p><div class="actions">${extensions.map(id=>`<a class="secondary" href="${lessonUrl(id)}">${label(id)} →</a>`).join('')}</div></section><section class="card source-card"><h2>${t('怎樣使用這套教材','Using these materials')}</h2><p>${t('每課：目標 → 概念 → 老師示範 → 自己試做 → 失分位 → 重點。作答只保留在這次開啟的網頁中，不會上傳；重新載入會清除。','Each lesson: goals → concepts → worked example → your turn → common errors → recap. Answers remain only in this open page and are not uploaded; reloading clears them.')}</p><p>${t('來源：Chem_ELECLC_Notes_T4 Acid.pdf（79 PDF 頁）及 Supplementory_note_for_Chem_20180818_Eng.pdf 的 I16–I17。題目標示 PDF 頁、印刷頁及原題標籤。中文為教學翻譯；補充內容及答題關鍵詞為教學參考。','Sources: Chem_ELECLC_Notes_T4 Acid.pdf (79 PDF pages) and I16–I17 of Supplementory_note_for_Chem_20180818_Eng.pdf. Questions retain PDF pages, printed pages and original labels. Chinese text is a teaching translation; supplements and answer keywords are teaching references.')}</p><p>${t('原筆記個別概念及題目歧義已在講解或解答中註明。實驗圖用作理解與準備，不能代替在老師監督下實際操作。','Corrections and ambiguous source items are explained in the notes or answers. Experimental diagrams support understanding and preparation; they do not replace supervised practical work.')}</p><p><a href="https://www.edb.gov.hk/en/curriculum-development/kla/science-edu/curriculum-documents.html" target="_blank" rel="noopener">${t('教育局：高中化學課程文件','EDB: senior secondary chemistry curriculum documents')}</a></p><a href="${url('revision/')}">${t('考前查看全課重點與練習索引','Open the revision and practice index')} →</a></section>`;
}
function table(data){return `<div class="table-wrap" tabindex="0" role="region" aria-label="${t('比較表，可橫向捲動','Comparison table, horizontally scrollable')}"><table><thead><tr>${data.headers.map(x=>`<th scope="col">${b(x)}</th>`).join('')}</tr></thead><tbody>${data.rows.map(row=>`<tr>${row.map((x,i)=>`<${i?'td':'th scope="row"'}>${b(x)}</${i?'td':'th'}>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
function notesFigure(figure){
 const source=`${t('原 Notes','Source notes')} · PDF ${figure.page}`;
 const src=new URL(`notes-images/${figure.file}`,root).href;
 const labels=figure.file==='hcl-particles.webp'?`<div class="particle-labels"><span>${t('HCl 溶於水','HCl in water')}</span><span>${t('HCl 溶於甲苯','HCl in methylbenzene')}</span></div>`:'';
 return `<figure class="notes-figure">${labels}<a href="${h(src)}" target="_blank" rel="noopener" aria-label="${t('另開原圖','Open larger source diagram')} · ${source}"><img src="${h(src)}" width="${figure.width}" height="${figure.height}" alt="${b(figure.alt)}"></a><figcaption>${source} · ${t('按圖放大','Select image to enlarge')}</figcaption></figure>`;
}
function notesNavigation(){
 return `<section id="notes-route" class="section notes-route" aria-labelledby="notes-route-heading"><h2 id="notes-route-heading">${t('原 Notes 12 課','12 lessons from the notes')}</h2><ol>${notesRoute.map(([id,zh,en],i)=>`<li><a href="${lessonUrl(id)}"><span>${i+1}</span>${t(zh,en)}</a></li>`).join('')}</ol></section>`;
}
function workedExample(l){
 const example=tutoring[l.id];
 if(!example)return `<section id="demo" class="card demo"><h2>${t('老師示範','Worked example')}</h2><p class="question-prompt">${b(l.demo.prompt)}</p>${l.demo.steps.map((step,i)=>`<details data-reveal="${l.id}-demo-${i}" ${reveals.get(`${l.id}-demo-${i}`)?'open':''}><summary>${t('步驟','Step')} ${i+1}</summary><p>${b(step)}</p></details>`).join('')}</section>`;
 const isMethod=example.kind==='method';
 const disclosure=`${l.id}-answer-model`;
 return `<section id="demo" class="card tutoring-demo tutoring-${example.kind}" aria-labelledby="demo-heading">
   <h2 id="demo-heading">${isMethod?t('實驗步驟示範','Worked practical procedure'):t('概念題示範','Worked concept question')}</h2>
   <div class="${example.figure?'tutoring-split':''}"><div><p class="question-prompt">${b(example.prompt)}</p>${field(`demo-${l.id}`,'response',t('試寫你的答案','Draft your answer'),3)}</div>${example.figure?notesFigure(example.figure):''}</div>
   <details class="answer-model" data-reveal="${disclosure}" ${reveals.get(disclosure)?'open':''}>
    <summary>${t('看答題句式及要點','Reveal model wording and answer points')}</summary>
    <div class="answer-model-body"><p class="source-label">${t('DSE 答題句式｜教學整理','DSE-style wording · Teaching guidance')}</p>
    ${isMethod?'<ol>':'<ul>'}${example.points.map(point=>`<li>${b(point)}</li>`).join('')}${isMethod?'</ol>':'</ul>'}
    <p class="model-sentence">${b(example.answer)}</p></div>
   </details>
   ${l.id==='salt-methods'?endpointComparison():''}
 </section>`;
}
function endpointComparison(){
 const disclosure='salt-methods-colour-change';
 return `<details class="answer-model" data-reveal="${disclosure}" ${reveals.get(disclosure)?'open':''}>
  <summary>${t('先估再揭示：調轉滴定方向，顏色點變？','Predict then reveal: reverse the titration direction')}</summary>
  <div class="answer-model-body"><ul>
    <li>${t('酚酞：酸滴入鹼，由粉紅色變無色。','Phenolphthalein: acid into alkali, from pink to colourless.')}</li>
    <li>${t('酚酞：鹼滴入酸，由無色變成持續的淡粉紅色。','Phenolphthalein: alkali into acid, from colourless to a persistent pale pink.')}</li>
  </ul><p class="model-sentence">${t('終點是觀察到指示劑轉色的位置。當量點則由反應方程式的摩爾比例決定。','At the endpoint the indicator visibly changes colour. The equivalence point is determined by the stoichiometric ratio.')}</p></div>
 </details>`;
}
function saltMethodNavigation(){
 return `<nav class="salt-method-nav" aria-label="${t('三種製鹽方法','Three salt preparation methods')}">${saltMethods.map(id=>`<a class="secondary" href="${lessonUrl(id)}">${label(id)}</a>`).join('')}</nav>`;
}
function curriculumLinks(id){
 const linked = {
  water: ['everyday'],
  indicators: ['ph-measurement'],
  strength: ['compare-strength','molarity','concentration-units','ph-calculations'],
  'salt-methods': ['standard-solution','dilution','titration','titration-calculations','lab-report'],
 }[id];
 if(!linked)return '';
 return `<nav class="lesson-related" aria-label="${t('相關課程內容','Related curriculum lessons')}"><b>${t('相關課程內容','Related curriculum lessons')}</b><ul>${linked.map(link=>`<li><a href="${lessonUrl(link)}">${label(link)}</a></li>`).join('')}</ul></nav>`;
}
function lessonPage(){
 const l=lesson(lessonId),unit=units.find(u=>u.lessons.includes(l.id)),related=outcomes.filter(o=>o.lessons.includes(l.id));
 document.title=`${l.title[language==='en'?1:0]} · DSE CHEM`;
 const sequence=notesNumber(l.id)?notesRoute.map(([id])=>id):[...units.flatMap(u=>u.lessons),...extensions];
 const pos=sequence.indexOf(l.id);
 const labLink=['titration','titration-calculations'].includes(l.id)?`<div class="actions"><a class="primary" href="${labUrl()}">${t('開啟滴定 Virtual Lab','Open the titration virtual lab')}</a></div>`:'';
 return `<div class="breadcrumb"><a href="${url()}">${t('課程總覽','Course overview')}</a> / ${unit?`${t('單元','Unit')} ${unit.id}`:t('進階延伸','Further practice')}</div><header class="lesson-header"><span class="eyebrow">${notesNumber(l.id)?`${t('原 Notes 第','Notes lesson')} ${notesNumber(l.id)}${t(' 課','')}`:unit?`${t('課程單元','Curriculum unit')} ${unit.id}`:t('延伸練習','Further practice')}</span><h1>${b(l.title)}</h1><p>${b(l.lead)}</p><small class="source-label">${t('內容對照','Content reference')} · ${h(l.reference)}</small></header>${labLink}<nav class="lesson-toc" aria-label="${t('本課段落','Lesson sections')}">${[['goals',t('學習目標','Goals')],['concepts',t('概念講解','Concepts')],['demo',t('老師示範','Example')],['practice',t('自己試做','Practice')],['errors',t('失分位','Errors')],['recap',t('本課重點','Recap')]].map(([id,text])=>`<a href="${h(anchor(id))}">${text}</a>`).join('')}</nav><section id="goals" class="card"><span class="eyebrow">01 / LEARNING GOALS</span><h2>${t('本課會學到甚麼','What you will learn')}</h2>${related.length?goals(related):`<p>${t('此課保留原筆記的延伸內容：選擇試劑或裝置，解釋現象，練習推理及方程式。','This lesson retains extended source material: select reagents/apparatus, explain observations and practise reasoning and equations.')}</p>`}${related.some(o=>['c04','b05','f01','f03'].includes(o.id))?`<p class="notice">${t('本頁支援實驗理解與準備；「進行／示範」的學習成果仍需在實驗課實際操作。','This page supports practical understanding and preparation; performance/demonstration outcomes still require actual laboratory work.')}</p>`:''}</section><section id="concepts" class="section"><span class="eyebrow">02 / NOTES</span><h2>${t('概念講解','Build the concept')}</h2>${l.diagram?`<figure class="diagram" tabindex="0">${drawDiagram(l.diagram,language)}<figcaption>${t('示意圖，不按比例；小螢幕可左右捲動','Schematic, not to scale; scroll sideways on small screens')}</figcaption></figure>`:''}${l.sections.map((s,i)=>`<article class="card note-card"><h3><span class="section-number">${i+1}</span>${b(s.heading)}</h3>${s.paragraphs.map(p=>`<p>${b(p)}</p>`).join('')}${s.equations?.length?`<div class="equations">${s.equations.map(eq=>`<p>${h(eq)}</p>`).join('')}</div>`:''}${s.table?table(s.table):''}</article>`).join('')}</section>${l.id==='salt-methods'?saltMethodNavigation():''}${workedExample(l)}<section id="practice" class="section"><span class="eyebrow">04 / YOUR TURN</span><h2>${l.id==='salt-methods'?t('原 Notes 製鹽練習','Original salt preparation exercise'):t('自己試做，再對照答案','Try it, then compare your answer')}</h2><p>${t('作答沒有自動分數。提示、步驟及參考答案可獨立開啟；未作答也可查看。','There is no automatic score. Hints, steps and reference answers open independently, even before you enter an answer.')}</p>${l.id==='salt-methods'?`<p>${t('PDF 第 77 頁（印刷第 76 頁）Exercise 1，保留 (a) 至 (k)。先選方法，再寫製備反應。','PDF page 77 (printed page 76), Exercise 1, parts (a)–(k). Choose the method, then write a reaction.')}</p>`:''}${practiceGroup('core')}${practiceQuestions(l.id).some(q=>q.advanced)?`<details class="advanced-group" data-reveal="${l.id}-advanced" ${reveals.get(`${l.id}-advanced`)?'open':''}><summary>${t('進階練習：保留原 Notes 的延伸題目','Further practice: extended source questions')} (${practiceQuestions(l.id).filter(q=>q.advanced).length})</summary>${practiceGroup('advanced')}</details>`:''}<a class="index-link" href="${url('revision/')}">${t('查看全部題目索引','View every question in the index')} →</a></section><section id="errors" class="card errors"><span class="eyebrow">05 / COMMON ERRORS</span><h2>${t('常見失分位','Common pitfalls')}</h2><ul>${l.errors.map(p=>`<li>${b(p)}</li>`).join('')}</ul></section><section id="recap" class="card recap"><span class="eyebrow">06 / RECAP</span><h2>${t('本課重點','Take away these ideas')}</h2><ul>${l.takeaways.map(p=>`<li>${b(p)}</li>`).join('')}</ul></section>${curriculumLinks(l.id)}<nav class="lesson-pager" aria-label="${t('上一課及下一課','Previous and next lessons')}">${pos>0?`<a class="secondary" href="${lessonUrl(sequence[pos-1])}">← ${t('上一課','Previous')}<b>${label(sequence[pos-1])}</b></a>`:`<a class="secondary" href="${url()}">← ${t('課程總覽','Course overview')}</a>`}${pos<sequence.length-1?`<a class="primary" href="${lessonUrl(sequence[pos+1])}">${t('下一課','Next')} →<b>${label(sequence[pos+1])}</b></a>`:`<a class="primary" href="${url('revision/')}">${t('全課重點與練習索引','Revision & question index')} →</a>`}</nav>`;
}
function practiceGroup(group){
 const list=practiceQuestions(lessonId).filter(q=>Boolean(q.advanced)===(group==='advanced'));
 if(!list.length)return '';
 const key=`${lessonId}-${group}`,page=Math.min(pages.get(key)||0,Math.ceil(list.length/PAGE_SIZE)-1);pages.set(key,page);
 return `<div class="practice-group" data-group="${group}"><div class="practice-heading"><b>${group==='core'?t('課節練習','Lesson practice'):t('進階題目','Further questions')}</b><span role="status">${page*PAGE_SIZE+1}–${Math.min((page+1)*PAGE_SIZE,list.length)} / ${list.length}</span></div>${list.slice(page*PAGE_SIZE,(page+1)*PAGE_SIZE).map((q,i)=>questionCard(q,page*PAGE_SIZE+i+1)).join('')}${list.length>PAGE_SIZE?`<div class="question-pager"><button data-page="${page-1}" data-group="${group}" ${page===0?'disabled':''}>← ${t('上一組','Previous set')}</button><span>${t('第','Set')} ${page+1} / ${Math.ceil(list.length/PAGE_SIZE)} ${t('組','')}</span><button data-page="${page+1}" data-group="${group}" ${(page+1)*PAGE_SIZE>=list.length?'disabled':''}>${t('下一組','Next set')} →</button></div>`:''}</div>`;
}
function field(id,name,label,rows=4){const key=`${id}/${name}`;return `<label class="answer-field" for="${h(id)}-${name}">${label}<textarea id="${h(id)}-${name}" data-answer="${h(key)}" rows="${rows}" spellcheck="false" placeholder="${t('在這裡寫下你的答案…','Write your answer here…')}">${h(answers.get(key)||'')}</textarea></label>`;}
function questionCard(q,n){
 const source=q.source?`${t('原 Notes','Source notes')} · PDF ${q.source.pdfPage} · ${t('印刷頁','printed p.')} ${q.source.printedPage} · ${h(q.source.label)}`:`${t('補充練習','Supplementary practice')} · ${q.level==='foundation'?t('基礎題','Foundation'):t('應用題','Application')}`;
 return `<article class="question-card" id="question-${q.id}" tabindex="-1"><div class="question-meta">${pill(`${t('題','Q')} ${n}`)}${pill(category(q.category),'plain')}<small>${source}</small></div><h3 class="question-prompt">${nl(q.prompt)}</h3>${q.figure?notesFigure(q.figure):q.diagram?`<figure class="diagram source-diagram" tabindex="0">${q.diagram}<figcaption>${t('按原題重繪；小螢幕可左右捲動','Redrawn from the source; scroll sideways on small screens')}</figcaption></figure>`:''}${q.table?table(q.table):''}${q.choices?`<fieldset class="choices"><legend>${t('選擇你的答案','Select your answer')}</legend>${q.choices.map((p,i)=>`<label><input type="radio" name="${q.id}" data-answer="${q.id}/choice" value="${i}" ${answers.get(`${q.id}/choice`)===String(i)?'checked':''}><span>${b(p)}</span></label>`).join('')}</fieldset>`:''}${q.parts?.length?q.parts.map((p,i)=>`<div class="subpart"><p><b>(${h(p.label)})</b> ${nl(p.prompt)}</p>${field(q.id,`part${i}`,`${t('分題','Part')} (${h(p.label)}) ${t('作答','answer')}`)}</div>`).join(''):q.choices?field(q.id,'reason',t('理由／草稿（可選）','Reasoning / draft (optional)'),2):`${q.category==='calculation'?`<label class="answer-field" for="${q.id}-value">${q.numeric?b(q.numeric):t('數值答案及單位','Numerical answer and units')}<input id="${q.id}-value" type="text" data-answer="${q.id}/value" value="${h(answers.get(`${q.id}/value`)||'')}" spellcheck="false"></label>`:''}${field(q.id,'work',q.category==='calculation'?t('計算步驟及解釋','Calculation steps and explanation'):t('你的答案','Your answer'))}`}<div class="answer-reveals">${[['hint',t('提示','Hint'),`<p>${nl(q.hint)}</p>`],['steps',t('解題步驟','Solution steps'),`<ol>${q.steps.map(p=>`<li>${nl(p)}</li>`).join('')}</ol>`],['answer',t('參考答案 · 自評','Reference answer · self-assessment'),`<p class="reference-answer">${nl(q.answer)}</p>${q.keywords?.length?`<p><b>${t('答題關鍵詞（教學參考）','Answer keywords (teaching reference)')}</b></p><div class="keywords">${q.keywords.map(p=>pill(b(p),'plain')).join('')}</div>`:''}<p class="muted">${t('對照概念、必要步驟、方程式及單位，自行比較你的作答。','Compare your concepts, necessary steps, equations and units with this reference.')}</p>`]].map(([id,title,content],i)=>`<details class="reveal ${id}" data-reveal="${q.id}-${id}" ${reveals.get(`${q.id}-${id}`)?'open':''}><summary><span>${i+1}</span>${title}</summary><div>${content}</div></details>`).join('')}</div></article>`;
}
function revisionPage(){
 document.title=t('重點與練習索引 · DSE CHEM','Revision & question index · DSE CHEM');
 return `<div class="breadcrumb"><a href="${url()}">${t('課程總覽','Course overview')}</a> / ${t('考前溫習','Revision')}</div><header class="lesson-header"><span class="eyebrow">REVISION / FIND YOUR NEXT QUESTION</span><h1>${t('全課重點與練習索引','Revision & question index')}</h1><p>${t('按概念、方程式、實驗或計算尋找題目。點擊題目後會直接到相應作答位置。','Find questions by concepts, equations, experiments or calculations. Each link opens the relevant answer space.')}</p></header><section class="card revision-summary"><h2>${t('全課重點','Course recap')}</h2><div class="recap-grid">${units.map(u=>`<div><h3>${u.id.padStart(2,'0')} · ${b(u.title)}</h3><ul>${u.lessons.map(id=>`<li><a href="${lessonUrl(id)}">${label(id)}</a><small>${b(lesson(id).takeaways[0])}</small></li>`).join('')}</ul></div>`).join('')}</div></section><section class="section"><h2>${t('練習索引','Question index')}</h2><div class="filters"><div role="group" aria-label="${t('題目分類','Question categories')}">${[['all',t('全部','All')],...categories.map(([id,zh,en])=>[id,t(zh,en)])].map(([id,text])=>`<button data-filter="${id}" aria-pressed="${filter===id}">${text}</button>`).join('')}</div><label for="question-search">${t('搜尋題目、課節或頁碼','Search questions, lessons or page numbers')}<input type="search" id="question-search" value="${h(query)}" placeholder="${t('例如 pH、PDF 77、滴定','e.g. pH, PDF 77, titration')}"></label></div><div id="index-results">${indexResults()}</div></section>`;
}
function indexResults(){
 const list=questions.filter(q=>(filter==='all'||q.category===filter)&&(!query||`${q.prompt.join(' ')} ${lesson(q.lesson).title.join(' ')} ${q.source?`PDF ${q.source.pdfPage} ${q.source.label}`:'supplement 補充練習'} ${q.outcomes.join(' ')}`.toLowerCase().includes(query.toLowerCase())));
 return `<p class="muted" role="status">${list.length} ${t('項題目記錄（部分含分題）','question records (some contain subparts)')}</p>${list.length?`<ol class="question-index">${list.map(q=>`<li><a href="${url(`sessions/${q.lesson}/`,q.id)}"><span>${pill(category(q.category),'plain')}${q.advanced?pill(t('進階','Further'),'plain'):''}<b>${label(q.lesson)}</b><small>${q.source?`${t('原 Notes','Notes')} · PDF ${q.source.pdfPage} · ${h(q.source.label)}`:t('補充練習','Supplementary practice')}</small></span><p>${b(q.prompt)}</p><span class="index-arrow" aria-hidden="true">→</span></a></li>`).join('')}</ol>`:`<p>${t('沒有相符題目，試試其他關鍵詞。','No matching questions. Try another keyword.')}</p>`}`;
}
function render(){
 document.documentElement.lang=language==='en'?'en':'zh-Hant-HK';
 document.querySelector('#skip-link').textContent=t('跳到內容','Skip to content');document.querySelector('#skip-link').href=anchor('main');
 document.querySelector('#header-topic').textContent=lab?labLabel():t('酸與鹼','Acids & bases');
 document.querySelector('#brand').href=url();
 document.querySelector('#menu-button').setAttribute('aria-label',t('開啟課節目錄','Open lesson menu'));
 sidebar.setAttribute('aria-label',t('課節目錄','Lesson navigation'));
 document.querySelector('#backdrop').setAttribute('aria-label',t('關閉課節目錄','Close lesson menu'));
 document.querySelectorAll('[data-language]').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.language===language)));
 renderSidebar();syncSidebar();main.innerHTML=(lessonId?lessonPage():revision?revisionPage():lab?titrationPage(labView):home())+`<footer class="footer">DSE CHEMISTRY · ${t('酸與鹼自學教材','Acids & bases self-study')}<a href="${url()}">${t('課程總覽','Course overview')}</a></footer>`;
}
function syncSidebar(){sidebar.inert=window.matchMedia('(max-width:800px)').matches&&!document.body.classList.contains('menu-open');}
window.matchMedia('(max-width:800px)').addEventListener('change',()=>{closeMenu();syncSidebar();});
function closeMenu(restore=false){document.body.classList.remove('menu-open');document.querySelector('#menu-button').setAttribute('aria-expanded','false');document.querySelector('#backdrop').hidden=true;syncSidebar();if(restore)document.querySelector('#menu-button').focus();}
function followHash(){if(location.hash){const el=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(el){el.scrollIntoView({block:'start'});if(el.classList.contains('question-card'))el.focus({preventScroll:true});}}}
document.addEventListener('input',event=>{const el=event.target;if(el.dataset.answer)answers.set(el.dataset.answer,el.value);if(el.id==='question-search'){query=el.value;document.querySelector('#index-results').innerHTML=indexResults();}});
document.addEventListener('toggle',event=>{if(event.target.dataset.reveal)reveals.set(event.target.dataset.reveal,event.target.open);},true);
document.addEventListener('click',event=>{
 const lang=event.target.closest('[data-language]');if(lang){language=lang.dataset.language;const u=new URL(location.href);u.searchParams.set('lang',language);history.replaceState(null,'',u);render();closeMenu();return;}
 const page=event.target.closest('[data-page]');if(page){const group=page.dataset.group;pages.set(`${lessonId}-${group}`,Number(page.dataset.page));const container=document.querySelector(`.practice-group[data-group="${group}"]`);container.outerHTML=practiceGroup(group);const next=document.querySelector(`.practice-group[data-group="${group}"]`);next.scrollIntoView({block:'start'});next.querySelector('.question-card')?.focus({preventScroll:true});return;}
 const f=event.target.closest('[data-filter]');if(f){filter=f.dataset.filter;document.querySelectorAll('[data-filter]').forEach(el=>el.setAttribute('aria-pressed',String(el.dataset.filter===filter)));document.querySelector('#index-results').innerHTML=indexResults();return;}
 const a=event.target.closest('a');if(a&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey&&event.button===0){const dest=new URL(a.href);if(lab&&a.closest('#sidebar .lab-nav-list')){closeMenu();document.getElementById(dest.hash.slice(1))?.focus({preventScroll:true});}if(dest.origin===root.origin&&dest.pathname.startsWith(root.pathname)&&dest.pathname!==location.pathname){event.preventDefault();history.pushState(null,'',dest);locate();render();closeMenu();main.focus({preventScroll:true});window.scrollTo(0,0);followHash();}}
});
document.querySelector('#menu-button').addEventListener('click',()=>{const open=!document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',open);document.querySelector('#menu-button').setAttribute('aria-expanded',String(open));document.querySelector('#backdrop').hidden=!open;syncSidebar();if(open)sidebar.querySelector('a').focus();});
document.querySelector('#backdrop').addEventListener('click',()=>closeMenu(true));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('menu-open'))closeMenu(true);if(event.key==='Tab'&&document.body.classList.contains('menu-open')){const items=[document.querySelector('#menu-button'),...sidebar.querySelectorAll('a,summary')].filter(el=>el.getClientRects().length);const first=items[0],last=items.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
window.addEventListener('popstate',()=>{language=new URL(location.href).searchParams.get('lang')==='en'?'en':'zh';locate();render();closeMenu();followHash();});
bindTitrationLab(main,labView);
locate();render();followHash();
