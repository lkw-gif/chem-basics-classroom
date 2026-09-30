const units = [
  { id:'introducing-chemistry', zh:'基礎化學', en:'Basic chemistry', leadZh:'由原子、元素和化學式，開始認識物質。', leadEn:'Begin with atoms, elements, formulae and matter.', lessons:8, symbols:['H','O','H₂O'] },
  { id:'atomic-structure', zh:'原子結構', en:'Atomic structure', leadZh:'看看質子、中子和電子如何組成原子。', leadEn:'See how protons, neutrons and electrons make an atom.', lessons:8, symbols:['p⁺','n⁰','e⁻'] },
  { id:'periodic-table', zh:'元素週期表', en:'Periodic table', leadZh:'用元素的位置和電子，找出週期表的規律。', leadEn:'Find patterns in element positions and electrons.', lessons:7, symbols:['Li','Na','K'] },
  { id:'metals', zh:'金屬', en:'Metals', leadZh:'從金屬的用途，學到提取與防鏽。', leadEn:'Explore metal uses, extraction and rust prevention.', lessons:8, symbols:['Cu','Fe','Al'] },
  { id:'ionic-bonds', zh:'離子鍵', en:'Ionic bonds', leadZh:'移動電子、形成離子，配平電荷和化學式。', leadEn:'Transfer electrons, form ions and balance charges and formulae.', lessons:8, symbols:['Na⁺','Cl⁻','Mg²⁺'] },
  { id:'covalent-bonds', zh:'共價鍵', en:'Covalent bonds', leadZh:'親手畫共享電子，建立分子與計算相對質量。', leadEn:'Build shared-electron diagrams, molecules and relative masses.', lessons:6, symbols:['H₂','O₂','H₂O'] },
];

const requested = new URL(location.href).searchParams.get('lang');
let language = requested==='zh'||requested==='en' ? requested : (localStorage.getItem('chem-hub-language')==='en'?'en':'zh');
const oldLesson = location.hash.slice(1);
if (['start','elements','formula','classify','compare','changes','lab','review'].includes(oldLesson)) {
  location.replace(`./introducing-chemistry/sessions/${oldLesson}/?lang=${language}`);
} else {
  render();
  setupNavigation();
}

function t(zh,en){ return language==='en' ? en : zh; }
function unitUrl(id){ return `./${id}/?lang=${language}`; }
function render(){
  document.documentElement.lang=language==='en'?'en':'zh-Hant-HK';
  document.title=t('中三化學 · F.3 CHEM','Form 3 Chemistry · F.3 CHEM');
  localStorage.setItem('chem-hub-language',language);
  document.querySelector('#skip-link').textContent=t('跳到課程內容','Skip to course content');
  document.querySelector('#course-label').textContent=t('S3 · 中三化學','S3 · CHEMISTRY');
  document.querySelector('#brand-link').href=`./?lang=${language}`;
  document.querySelector('#side-heading').innerHTML=`<span>S3</span><b>${t('化學課程','Chemistry')}</b><small>06</small>`;
  document.querySelector('#unit-nav').innerHTML=units.map((unit,index)=>`<a href="${unitUrl(unit.id)}"><span>${String(index+1).padStart(2,'0')}</span><b>${t(unit.zh,unit.en)}</b><i>${String(unit.lessons).padStart(2,'0')}</i></a>`).join('');
  document.querySelector('#sidebar-bottom').innerHTML=`<p>${t('六個單元 · 由淺入深','Six units · step by step')}</p><div class="sidebar-progress"><span></span></div><small>${t('選擇單元，開始學習','Choose a unit to begin')}</small>`;
  document.querySelector('#main').innerHTML=`<div class="breadcrumb"><span>${t('中三化學','Form 3 Chemistry')}</span><span>/</span><b>${t('單元總覽','Course units')}</b><span class="breadcrumb-count">06 / 06</span></div><section class="home-hero"><div><span class="eyebrow">S3 CHEMISTRY · 6 UNITS</span><h1>${t('由小粒子出發，<br><em>一步步學化學。</em>','Start small.<br><em>Explore chemistry step by step.</em>')}</h1><p>${t('選擇一個單元。每個課題都有圖像、例子和檢查理解的小測。','Choose a unit. Each lesson has visuals, examples and a short check of understanding.')}</p><a class="primary-link" href="${unitUrl('introducing-chemistry')}">${t('由 Unit 1 開始','Start with Unit 1')} <span aria-hidden="true">→</span></a></div><div class="hero-art" aria-hidden="true"><span>H</span><span>O</span><span>Na</span><span>Fe</span><b>${t('從元素到身邊的材料','From elements to everyday materials')}</b></div></section><div class="catalog-heading"><div><span class="eyebrow">COURSE MAP / 06 UNITS</span><h2>${t('選一個單元','Choose a unit')}</h2></div><span>06 / 06</span></div><nav class="catalog-grid" aria-label="${t('中三化學單元','Form 3 chemistry units')}">${units.map((unit,index)=>`<a class="catalog-card" href="${unitUrl(unit.id)}"><span class="catalog-number">${String(index+1).padStart(2,'0')}</span><span class="catalog-copy"><small>UNIT ${String(index+1).padStart(2,'0')} · ${unit.lessons} ${t('課題','LESSONS')}</small><b>${t(unit.zh,unit.en)}</b><span>${t(unit.leadZh,unit.leadEn)}</span><span class="symbol-row" aria-hidden="true">${unit.symbols.map(s=>`<i>${s}</i>`).join('')}</span></span><span class="catalog-arrow" aria-hidden="true">↗</span></a>`).join('')}</nav><footer class="site-footer">F.3 CHEM · ${t('中三化學互動教材','Interactive Form 3 chemistry lessons')}</footer>`;
  document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===language)));
}
function setupNavigation(){
  const menu=document.querySelector('#menu-button'),backdrop=document.querySelector('#nav-backdrop');
  const close=()=>{document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',t('開啟單元目錄','Open unit menu'));backdrop.hidden=true;};
  menu.setAttribute('aria-label',t('開啟單元目錄','Open unit menu'));
  backdrop.setAttribute('aria-label',t('關閉單元目錄','Close unit menu'));
  menu.addEventListener('click',()=>{const open=!document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?t('關閉單元目錄','Close unit menu'):t('開啟單元目錄','Open unit menu'));backdrop.hidden=!open;});
  backdrop.addEventListener('click',close);
  document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{language=button.dataset.language;const url=new URL(location.href);url.searchParams.set('lang',language);history.replaceState(null,'',url);render();close();}));
}
