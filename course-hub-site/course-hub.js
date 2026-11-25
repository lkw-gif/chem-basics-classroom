const units = [
  { id:'introducing-chemistry', zh:'基礎化學', en:'Basic chemistry', leadZh:'分辨元素、化合物和混合物。', leadEn:'Tell elements, compounds and mixtures apart.', mark:'H₂O' },
  { id:'atomic-structure', zh:'原子結構', en:'Atomic structure', leadZh:'數算粒子，讀懂原子序和電子排佈。', leadEn:'Count particles and read atomic numbers and electron arrangements.', mark:'e⁻' },
  { id:'periodic-table', zh:'元素週期表', en:'Periodic table', leadZh:'從族和週期找出元素的規律。', leadEn:'Find patterns in groups and periods.', mark:'Na' },
  { id:'metals', zh:'金屬', en:'Metals', leadZh:'比較金屬的用途、提取方法和防鏽方法。', leadEn:'Compare metal uses, extraction and rust prevention.', mark:'Fe' },
  { id:'ionic-bonds', zh:'離子鍵', en:'Ionic bonds', leadZh:'追蹤電子轉移，用電荷寫化學式。', leadEn:'Follow electron transfer and use charges to write formulae.', mark:'Na⁺' },
  { id:'covalent-bonds', zh:'共價鍵', en:'Covalent bonds', leadZh:'畫出共享電子對，讀懂分子結構。', leadEn:'Draw shared electron pairs to explain molecular structure.', mark:'H₂' },
];

const requested = new URL(location.href).searchParams.get('lang');
let language = requested === 'zh' || requested === 'en' ? requested : (localStorage.getItem('chem-hub-language') === 'en' ? 'en' : 'zh');
const oldLesson = location.hash.slice(1);
if (['start','elements','formula','classify','compare','changes','lab','review'].includes(oldLesson)) {
  location.replace(`./introducing-chemistry/sessions/${oldLesson === 'lab' ? 'changes' : oldLesson}/?lang=${language}`);
} else {
  render();
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => {
    language = button.dataset.language;
    const url = new URL(location.href);
    url.searchParams.set('lang', language);
    history.replaceState(null, '', url);
    render();
  }));
}

function t(zh, en) { return language === 'en' ? en : zh; }
function unitUrl(id) { return `./${id}/?lang=${language}`; }
function render() {
  document.documentElement.lang = t('zh-Hant-HK', 'en');
  document.title = t('中三互動化學實驗簿 · F.3 CHEM', 'Form 3 interactive chemistry lab book · F.3 CHEM');
  localStorage.setItem('chem-hub-language', language);
  document.querySelector('#skip-link').textContent = t('跳到課程內容', 'Skip to course content');
  document.querySelector('#brand-link').href = `./?lang=${language}`;
  document.querySelector('#main').innerHTML = `
    <section class="lab-intro" aria-labelledby="lab-title">
      <div>
        <h1 id="lab-title">${t('中三互動化學實驗簿', 'Form 3 chemistry lab book')}</h1>
        <p>${t('由粒子模型到化學鍵，從圖解學概念，再動手做練習。', 'Explore particle models, the periodic table and chemical bonds. Try a diagram or activity, then check your understanding.')}</p>
        <a class="lab-primary" href="#units">${t('選擇單元', 'Choose a unit')}</a>
      </div>
      <div class="lab-specimen" role="img" aria-label="${t('鈉-23：左上 23 是質量數，左下 11 是原子序。', 'Sodium-23. The upper-left 23 is the mass number. The lower-left 11 is the atomic number.')}">
        <div class="specimen-content" aria-hidden="true">
          <span class="specimen-mass">${t('質量數', 'Mass number')}</span><b>23</b>
          <span class="specimen-atomic">${t('原子序', 'Atomic number')}</span><b>11</b>
          <strong>Na</strong>
        </div>
      </div>
    </section>
    <section id="units" class="lab-units" aria-labelledby="unit-title" tabindex="-1">
      <h2 id="unit-title">${t('中三化學單元', 'Form 3 units')}</h2>
      <ol class="lab-unit-grid">${units.map((unit, index) => `
        <li><a href="${unitUrl(unit.id)}" class="lab-unit">
          <span class="lab-unit-number">${String(index + 1).padStart(2, '0')}</span>
          <span class="lab-unit-copy"><b>${t(unit.zh, unit.en)}</b><span>${t(unit.leadZh, unit.leadEn)}</span></span>
          <span class="lab-unit-mark" aria-hidden="true">${unit.mark}</span>
        </a></li>`).join('')}</ol>
    </section>
    <section class="lab-paths" aria-label="${t('常用練習及高中化學', 'Quick practice and senior secondary chemistry')}">
      <div>
        <h2>${t('直接做練習', 'Go straight to practice')}</h2>
        <a href="./atomic-structure/sessions/elementquiz/?lang=${language}">${t('首 20 種元素小測', 'First 20 elements quiz')}</a>
        <a href="./periodic-table/sessions/map/?lang=${language}">${t('探索元素週期表', 'Explore the periodic table')}</a>
      </div>
      <div class="lab-dse">
        <h2>${t('DSE 化學', 'DSE chemistry')}</h2>
        <a href="${unitUrl('acids-and-bases')}">${t('酸與鹼自學', 'Acids and bases self-study')}</a>
        <a href="./acids-and-bases/revision/?lang=${language}">${t('酸與鹼練習索引', 'Acids and bases question index')}</a>
      </div>
    </section>
    <footer class="lab-footer">F.3 CHEM</footer>`;
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
}
