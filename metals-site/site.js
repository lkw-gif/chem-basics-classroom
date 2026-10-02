import { renderReactivityGuide, renderEquationExplorer, setupEquationExplorer, renderMetalAtlas, setupMetalAtlas, renderOreGallery } from './extraction-content.js';
import { renderSimplePage, renderCarbonPage, renderElectrolysisPage, renderRustPage } from './interactive-pages.js';
import { createExtractionModels } from './models-3d.js';

const lessons = [
  { id: 'properties', ref: '4.1', zh: '金屬的性質與用途', en: 'Properties and uses', leadZh: '由電線、鋁箔和首飾，找出金屬為何適合不同用途。', leadEn: 'Use wires, foil and jewellery to connect properties with uses.' },
  { id: 'history', ref: '4.2', zh: '人類怎樣開始用金屬', en: 'A short history of metals', leadZh: '由石器到鐵器：人們學懂提取更多金屬。', leadEn: 'From stone tools to iron: people learned to obtain more metals.' },
  { id: 'sources', ref: '4.3', zh: '金屬從哪裏來', en: 'Where metals come from', leadZh: '地殼、礦物和礦石之間有甚麼關係？', leadEn: 'How are the Earth’s crust, minerals and ores connected?' },
  { id: 'simple', ref: '4.4a', zh: '淘金與直接加熱', en: 'Panning and heating', leadZh: '少數金屬可用物理方法或直接加熱取得。', leadEn: 'A few metals can be obtained by physical separation or heating.' },
  { id: 'carbon', ref: '4.4b', zh: '用碳提取金屬', en: 'Extraction with carbon', leadZh: '看碳怎樣從金屬氧化物拿走氧。', leadEn: 'See how carbon takes oxygen away from a metal oxide.' },
  { id: 'electrolysis', ref: '4.4c', zh: '用電提取金屬', en: 'Extraction with electricity', leadZh: '很活潑的金屬，需要另一種方法。', leadEn: 'Very reactive metals need a different method.' },
  { id: 'rust', ref: '4.5a', zh: '鐵何時會生銹', en: 'When iron rusts', leadZh: '比較三支試管，找出生銹的兩個條件。', leadEn: 'Compare three test tubes to find the two conditions for rusting.' },
  { id: 'protect', ref: '4.5b', zh: '怎樣防止生銹', en: 'Preventing rust', leadZh: '用塗層、鍍金屬和合金保護鐵。', leadEn: 'Protect iron with coatings, metal plating and alloys.' },
];

const quizBank = {
  properties: [
    ['為何銅適合製作電線？', 'Why is copper used for electrical wires?', ['導電良好','容易生銹','密度很高'], ['It conducts electricity well','It rusts easily','It is very dense'], 0, '銅導電良好，而且可拉成細線。', 'Copper conducts well and can be drawn into wires.'],
    ['鋁箔展示金屬哪種性質？', 'Which property does aluminium foil show?', ['可延展成薄片','可拉成細線','可以燃燒'], ['Can be pressed into thin sheets','Can be drawn into wires','Can burn'], 0, '能壓成薄片稱為展性。', 'Being pressed into thin sheets is malleability.'],
    ['為何鎢曾用於傳統燈泡的燈絲？', 'Why was tungsten used for traditional lamp filaments?', ['熔點很高','顏色是金色','容易溶於水'], ['Very high melting point','Golden colour','Dissolves in water'], 0, '鎢在高溫發光時不易熔化。', 'Tungsten does not readily melt when it glows hot.'],
  ],
  history: [
    ['哪個時代在鐵器時代之前？', 'Which age came before the Iron Age?', ['青銅器時代','塑膠時代','鋁器時代'], ['Bronze Age','Plastic Age','Aluminium Age'], 0, '一般次序是石器、銅器、青銅器、鐵器。', 'The broad order is Stone, Copper, Bronze, then Iron.'],
    ['為何銅比鐵更早被廣泛使用？', 'Why was copper used widely before iron?', ['較容易提取','完全不會腐蝕','地殼中最多'], ['Easier to extract','Never corrodes','Most abundant in the crust'], 0, '銅比鐵容易從礦石中提取。', 'Copper is easier to extract from its ores than iron.'],
    ['青銅主要是哪類材料？', 'What kind of material is bronze?', ['銅和錫的合金','純鐵','一種岩石'], ['An alloy of copper and tin','Pure iron','A rock'], 0, '青銅是銅和錫組成的合金。', 'Bronze is an alloy made mainly of copper and tin.'],
  ],
  sources: [
    ['地殼中含量最高的金屬元素是甚麼？', 'Which is the most abundant metal in the Earth’s crust?', ['鋁','金','鐵'], ['Aluminium','Gold','Iron'], 0, '地殼中鋁最多；氧和矽更多，但不是金屬。', 'Aluminium is the most abundant metal; oxygen and silicon are more abundant but are not metals.'],
    ['金在大自然中有時以甚麼形式存在？', 'How can gold sometimes occur in nature?', ['游離元素','只以氧化物','只以液體'], ['As a free element','Only as an oxide','Only as a liquid'], 0, '金較不活潑，可作為游離元素存在。', 'Gold is less reactive and can occur as a free element.'],
    ['甚麼是礦石？', 'What is an ore?', ['可用來提取金屬的岩石','任何石頭','純金屬粉末'], ['Rock from which metal can be obtained','Any stone','Pure metal powder'], 0, '礦石是能從中取得金屬的岩石。', 'An ore is rock from which a metal can be obtained.'],
  ],
  simple: [
    ['淘金主要依靠金與沙粒哪種差別？', 'What difference does gold panning mainly use?', ['密度','顏色','熔點'], ['Density','Colour','Melting point'], 0, '較重的金粒容易留在淘金盤底。', 'Denser gold grains tend to stay in the pan.'],
    ['銀氧化物加熱可產生甚麼？', 'What forms when silver oxide is heated?', ['銀和氧氣','銀和氫氣','金和氧氣'], ['Silver and oxygen','Silver and hydrogen','Gold and oxygen'], 0, '加熱時銀氧化物分解，得到銀和氧氣。', 'Heating decomposes silver oxide into silver and oxygen.'],
    ['在礦石中以游離元素存在的金，適合先試哪種方法？', 'Which method suits gold occurring as a free element in ore?', ['物理分離','電解水','加入食鹽'], ['Physical separation','Electrolysing water','Adding salt'], 0, '游離金已是金屬，可把它與沙石分開。', 'Free gold is already metal; it can be separated from sand and rock.'],
  ],
  carbon: [
    ['碳與氧化銅加熱時，碳拿走甚麼？', 'When carbon and copper oxide are heated, what does carbon remove?', ['氧','銅','熱'], ['Oxygen','Copper','Heat'], 0, '碳從氧化銅拿走氧，留下銅。', 'Carbon removes oxygen from copper oxide, leaving copper.'],
    ['氧化銅粉末和新產生的銅，顏色通常是？', 'What are the usual colours of copper oxide and the copper formed?', ['黑色；紅棕色','白色；藍色','紅棕色；黑色'], ['Black; reddish brown','White; blue','Reddish brown; black'], 0, '氧化銅是黑色，銅呈紅棕色。', 'Copper oxide is black; copper is reddish brown.'],
    ['用碳提取金屬屬於哪類方法？', 'Which kind of method is extraction with carbon?', ['化學方法','只靠篩選的物理方法','冷卻方法'], ['Chemical method','Physical sieving alone','Cooling method'], 0, '物質發生反應，形成新物質，因此是化學方法。', 'A reaction makes new substances, so it is a chemical method.'],
  ],
  electrolysis: [
    ['非常活潑的金屬通常要用甚麼方法提取？', 'How are very reactive metals generally extracted?', ['電解熔融化合物','淘金','只加熱'], ['Electrolysis of a molten compound','Panning','Heating alone'], 0, '碳不能容易地從這些金屬化合物取出金屬，要用電解。', 'Carbon cannot easily obtain these metals from their compounds; electrolysis is used.'],
    ['為何電解前要把含金屬化合物熔融？', 'Why must the metal-containing compound be molten for electrolysis?', ['帶電粒子才可移動','讓它變成沙粒','讓金屬變輕'], ['Charged particles can move','To make sand','To make the metal lighter'], 0, '熔融時帶電粒子可移動，電流才能通過。', 'Charged particles can move when molten, allowing current to pass.'],
    ['哪一種金屬通常要用電解提取？', 'Which metal is usually extracted by electrolysis?', ['鋁','金','銀'], ['Aluminium','Gold','Silver'], 0, '鋁較活潑，工業上用電解方法提取。', 'Aluminium is reactive and is extracted industrially by electrolysis.'],
  ],
  rust: [
    ['鐵生銹需要甚麼？', 'What does iron need to rust?', ['水和氧氣','只有水','只有氧氣'], ['Water and oxygen','Water only','Oxygen only'], 0, '水和氧氣要同時存在，鐵才會生銹。', 'Iron rusts when both water and oxygen are present.'],
    ['乾燥空氣中的鐵釘會怎樣？', 'What happens to an iron nail in dry air?', ['不會生銹','很快生銹','變成銅'], ['It does not rust','It rusts quickly','It becomes copper'], 0, '沒有水，便欠缺生銹條件。', 'Without water, one necessary condition is missing.'],
    ['鐵鏽是怎樣的固體？', 'What sort of solid is rust?', ['紅棕色、容易剝落','銀白色、非常堅固','透明、可溶於水'], ['Reddish brown and flaky','Silvery and very strong','Clear and water-soluble'], 0, '鐵鏽容易剝落，新的鐵表面便再暴露。', 'Rust flakes away, exposing fresh iron underneath.'],
  ],
  protect: [
    ['油漆怎樣幫助防銹？', 'How does paint help prevent rust?', ['阻隔水和氧氣','增加鐵的重量','令鐵變成金'], ['Blocks water and oxygen','Adds weight','Turns iron into gold'], 0, '完整的油漆層把鐵與水和氧氣分隔。', 'An intact paint layer keeps water and oxygen away from iron.'],
    ['鍍鋅鐵的表面是甚麼金屬？', 'Which metal coats galvanized iron?', ['鋅','錫','銀'], ['Zinc','Tin','Silver'], 0, '鍍鋅鐵是表面有鋅塗層的鐵。', 'Galvanized iron has a zinc coating.'],
    ['不銹鋼是甚麼？', 'What is stainless steel?', ['含鐵、鉻等的合金','純鐵','表面塗油的木材'], ['An alloy containing iron and chromium','Pure iron','Oiled wood'], 0, '不銹鋼是含鐵、鉻，通常還有鎳的合金。', 'Stainless steel is an alloy of iron and chromium, often with nickel.'],
  ],
};

const requestedLanguage = new URL(location.href).searchParams.get('lang');
const language = requestedLanguage === 'zh' || requestedLanguage === 'en' ? requestedLanguage : (localStorage.getItem('metals-language') || 'zh');
const en = language === 'en';
const t = (zh, english) => en ? english : zh;
const key = (zh, english, tone = '') => `<span class="key-highlight ${tone}">${t(zh, english)}</span>`;
const lessonLeads = {
  properties: () => t(`由電線、鋁箔和首飾，找出金屬的${key('性質','properties')}如何配合${key('用途','uses','blue')}。`,`Connect metal ${key('properties','properties')} with everyday ${key('uses','uses','blue')}: wires, foil and jewellery.`),
  history: () => t(`從石器到鐵器：學懂${key('提取金屬','extracting metals')}，人類才用上更多材料。`,`From stone tools to iron: learning to ${key('extract metals','extract metals')} changed which materials people could use.`),
  sources: () => t(`${key('礦石','Ore')}是可用來取得金屬的岩石；多數金屬以${key('化合物','compounds','blue')}形式存在。`,`${key('Ore','Ore')} is rock used to obtain metal; most metals occur in ${key('compounds','compounds','blue')}.`),
  simple: () => t(`游離金屬可${key('物理分離','physically separated')}；部分容易分解的氧化物可${key('直接加熱','heated alone','orange')}。`,`Native metal can be ${key('physically separated','physically separated')}; some unstable oxides can be ${key('heated alone','heated alone','orange')}.`),
  carbon: () => t(`${key('碳或一氧化碳','Carbon or carbon monoxide')}帶走金屬氧化物的${key('氧','oxygen','orange')}，留下金屬。`,`${key('Carbon or carbon monoxide','Carbon or carbon monoxide')} takes ${key('oxygen','oxygen','orange')} from a metal oxide, leaving the metal.`),
  electrolysis: () => t(`很活潑的金屬，其氧化物較難還原；要用${key('電解','electrolysis')}等方法。`,`Highly reactive metals form oxides that resist reduction; ${key('electrolysis','electrolysis')} is a key route.`),
  rust: () => t(`鐵同時接觸${key('水','water','blue')}和${key('氧氣','oxygen','orange')}才會生銹。`,`Iron rusts when both ${key('water','water','blue')} and ${key('oxygen','oxygen','orange')} are present.`),
  protect: () => t(`用${key('塗層','coatings')}隔絕水和氧氣，或用${key('合金','alloys','blue')}改善抗腐蝕能力。`,`Use ${key('coatings','coatings')} to block water and oxygen, or ${key('alloys','alloys','blue')} to improve corrosion resistance.`),
};
const lessonId = location.pathname.match(/\/sessions\/([a-z]+)\/?$/)?.[1];
const activeLesson = lessons.find((lesson) => lesson.id === lessonId);
const lessonUrl = (id) => `./sessions/${id}/?lang=${language}`;
const homeUrl = `./?lang=${language}`;

function photo(file, labelZh, labelEn, credit, source) {
  return `<figure class="photo-card"><img src="./images/${file}" alt="${t(labelZh, labelEn)}" loading="lazy"><figcaption><b>${t(labelZh, labelEn)}</b><a href="${source}" target="_blank" rel="noreferrer">${credit}</a></figcaption></figure>`;
}
function tag(zh, english) { return `<span class="eyebrow">${t(zh, english)}</span>`; }
function panelTitle(zh, english, sideZh = '', sideEn = '') { return `<div class="panel-heading"><h2>${t(zh, english)}</h2><span>${t(sideZh, sideEn)}</span></div>`; }
function quizMarkup(id) {
  const rows = quizBank[id];
  return `<section class="quiz panel" aria-labelledby="quiz-title"><div class="quiz-header"><span class="eyebrow">CHECKPOINT</span><h2 id="quiz-title">${t('小測一下','Quick check')}</h2><span class="quiz-count">03 ${t('題','QUESTIONS')}</span></div>${rows.map((q,i) => {
    const order = [0,1,2].map((_,j) => (j+i)%3);
    return `<div class="quiz-item"><h3><span>${String(i+1).padStart(2,'0')}</span>${t(q[0],q[1])}</h3><div class="quiz-choices" role="group" aria-label="${t(q[0],q[1])}">${order.map((j,k) => `<button type="button" data-question="${i}" data-choice="${j}" aria-pressed="false"><small>${'ABC'[k]}</small>${t(q[2][j],q[3][j])}</button>`).join('')}</div><p class="quiz-feedback" id="feedback-${i}" aria-live="polite"></p></div>`;
  }).join('')}</section>`;
}

function renderHome() {
  return `<div class="home-hero"><div>${tag('中三化學 · 第四課','S3 CHEMISTRY · UNIT 04')}<h1>${t('金屬：<br><em>從礦石到生活。</em>','Metals:<br><em>from ore to everyday life.</em>')}</h1><p>${t('看真實礦石、轉動 3D 模型、選擇提取方法，再用短題檢查所學。','Explore real ores, rotate 3D process models and choose extraction routes, then check your understanding.')}</p><a class="primary-link" href="${lessonUrl('properties')}">${t('開始第一課','Start lesson one')} <span aria-hidden="true">→</span></a></div><div class="metal-hero" aria-hidden="true"><div class="ore-shape">Fe<span>O</span></div><i>→</i><div class="metal-block">Fe</div><i>→</i><div class="bridge-shape">▰<br>╱╲</div><b>${t('礦石　→　金屬　→　用途','Ore → metal → use')}</b></div></div><div class="catalog-heading"><div>${tag('第 4 課 / 8 個課題','UNIT 04 / 8 LESSONS')}<h2>${t('選一課開始','Choose a lesson')}</h2></div><span>08 / 08</span></div><div class="catalog-grid">${lessons.map((lesson,i) => `<a class="catalog-card" href="${lessonUrl(lesson.id)}"><span class="catalog-number">${String(i+1).padStart(2,'0')}</span><div><small>${lesson.ref}</small><b>${en ? lesson.en : lesson.zh}</b><p>${en ? lesson.leadEn : lesson.leadZh}</p></div><span class="catalog-arrow" aria-hidden="true">↗</span></a>`).join('')}</div><p class="home-source">${t('依據 2023–24 Unit 4 Metals 學生筆記整理；圖像及動畫是簡化的教學示意。','Adapted from the 2023–24 Unit 4 Metals student notes; diagrams and animations are simplified teaching models.')}</p>`;
}

const uses = [
  ['wire','電線','Electrical wire','銅','Copper','導電良好；可拉成線','Conducts electricity; can be drawn into wire','copper-wire.jpg','Petar Milošević / Wikimedia Commons / CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Electric_guide_3%C3%972.5_mm.jpg'],
  ['foil','鋁箔','Aluminium foil','鋁','Aluminium','容易壓成薄片','Can be pressed into thin sheets','aluminium-foil.jpg','images-of-elements.com / Wikimedia Commons / CC BY 3.0','https://commons.wikimedia.org/wiki/File:Aluminium_foil_closeup.jpg'],
  ['ring','首飾','Jewellery','金','Gold','有光澤；不易腐蝕；首飾也可能加入其他金屬','Shiny and corrosion-resistant; jewellery may also contain other metals','gold-ring.jpg','The Met / Wikimedia Commons / CC0','https://commons.wikimedia.org/wiki/File:Gold_ring_MET_DP143815.jpg'],
  ['nails','鋼釘','Steel nails','鐵','Iron','鋼以鐵為主，堅固而且價格相對低','Steel is mainly iron; it is strong and relatively inexpensive','steel-nails.jpg','Gausanchennai / Wikimedia Commons / CC BY-SA 4.0','https://commons.wikimedia.org/wiki/File:Steel_nails.jpg'],
];
function renderProperties() {
  return `<section class="panel use-explorer">${panelTitle('選一件物品，看看選材原因','Choose an object to see why its metal was selected','生活中的例子','EVERYDAY EXAMPLES')}<div class="use-layout"><div class="use-picker" id="use-picker">${uses.map(u => `<button type="button" data-use="${u[0]}" aria-pressed="false">${t(u[1],u[2])}</button>`).join('')}</div><div id="use-display" aria-live="polite"></div></div></section><div class="property-grid"><article class="panel property-card"><span class="property-art wire-art" aria-hidden="true">〰</span><h3>${t('延性','Ductility')}</h3><p>${t('可拉成細線，例如銅線。','Can be drawn into thin wires, like copper wire.')}</p></article><article class="panel property-card"><span class="property-art foil-art" aria-hidden="true">▱</span><h3>${t('展性','Malleability')}</h3><p>${t('可壓成薄片，例如鋁箔。','Can be pressed into sheets, like aluminium foil.')}</p></article><article class="panel property-card"><span class="property-art heat-art" aria-hidden="true">♨</span><h3>${t('導熱','Heat conduction')}</h3><p>${t('熱容易通過，適合製作部分炊具。','Heat passes through easily, useful for some cookware.')}</p></article><article class="panel property-card"><span class="property-art strength-art" aria-hidden="true">▥</span><h3>${t('強度','Strength')}</h3><p>${t('能承受較大的力，適合建築結構。','Can withstand large forces, useful in structures.')}</p></article></div><p class="teaching-note">${t('金屬的性質各有差異；選材時也要考慮重量、價格和抗腐蝕能力。','Properties vary between metals. Weight, cost and corrosion resistance matter too.')}</p>`;
}
const ages = [
  ['stone','石器','Stone','石頭可直接打磨成工具。','Stone could be shaped directly into tools.'],
  ['copper','銅器','Copper','銅較容易從礦石中取得，也可打造成形。','Copper was comparatively easy to obtain and shape.'],
  ['bronze','青銅器','Bronze','把銅與錫混合，得到更適合製作工具的合金。','Copper and tin were combined into an alloy useful for tools.'],
  ['iron','鐵器','Iron','提取較困難；後來因資源較多、用途廣而普及。','Harder to extract; later became widespread because iron is plentiful and useful.'],
];
function renderHistory() {
  return `<section class="panel history-panel">${panelTitle('材料演變','Materials through time','點選一個時代','SELECT AN AGE')}<div class="age-track" id="age-track">${ages.map((a,i)=>`<button type="button" data-age="${a[0]}" aria-pressed="false"><span>${String(i+1).padStart(2,'0')}</span><b>${t(a[1],a[2])}</b></button>`).join('')}</div><div class="age-detail" id="age-detail" aria-live="polite"></div></section><div class="history-takeaway panel"><div class="history-symbols" aria-hidden="true"><span>Cu</span><i>→</i><span>Cu + Sn</span><i>→</i><span>Fe</span></div><div><h2>${t('為何不是先用鐵？','Why not iron first?')}</h2><p>${t('銅比鐵較容易提取；青銅是銅和錫的合金。當人們掌握更高溫的工藝，鐵才變得常用。','Copper was easier to extract than iron. Bronze is a copper–tin alloy. Iron became common after people developed methods to work it.')}</p></div></div><p class="teaching-note">${t('「石器、銅器、青銅器、鐵器」是概括次序；不同地區開始使用的時間並不完全相同。','These ages show a broad sequence; exact dates differed by region.')}</p>`;
}
function renderSources() {
  return `<div class="sources-grid"><section class="panel crust-panel">${panelTitle('地殼中的元素','Elements in the Earth’s crust','按質量百分比 · 約數','APPROX. % BY MASS')}<div class="crust-bars"><div><b>${t('氧','Oxygen')}</b><span><i style="width:45%"></i></span><strong>45.0%</strong></div><div><b>${t('矽','Silicon')}</b><span><i style="width:27%"></i></span><strong>27.0%</strong></div><div class="highlight"><b>${t('鋁','Aluminium')}</b><span><i style="width:8%"></i></span><strong>8.0%</strong></div><div><b>${t('鐵','Iron')}</b><span><i style="width:6%"></i></span><strong>6.0%</strong></div><div><b>${t('鈣','Calcium')}</b><span><i style="width:5%"></i></span><strong>5.0%</strong></div></div><div class="worked-example"><b>Al</b>${t('鋁是地殼中含量最高的金屬元素。','Aluminium is the most abundant metal in the crust.')}</div></section><section class="panel source-chain">${panelTitle('從岩石到金屬','From rock to metal')}<div class="source-steps"><div><span class="source-illustration rock" aria-hidden="true">◆</span><b>${t('岩石','Rock')}</b><p>${t('地殼由不同物質組成。','The crust contains different substances.')}</p></div><i>↓</i><div><span class="source-illustration ore" aria-hidden="true">◈</span><b>${t('礦物／礦石','Mineral / ore')}</b><p>${t('礦物是岩石中的物質；可用來提取金屬的岩石叫礦石。','Minerals make up rocks; rock used to obtain metal is ore.')}</p></div><i>↓</i><div><span class="source-illustration metal" aria-hidden="true">Fe</span><b>${t('金屬','Metal')}</b><p>${t('大多數金屬要從化合物中提取。','Most metals must be extracted from compounds.')}</p></div></div></section></div><div class="occurrence-strip"><div><b>Au · Ag · Pt</b><span>${t('少數較不活潑的金屬，可在自然界中以游離元素存在。','A few less reactive metals can occur as free elements.')}</span></div><div><b>Al · Fe · Cu</b><span>${t('多數金屬與其他元素結合，存在於化合物中。','Most metals are combined with other elements in compounds.')}</span></div></div>`;
}
const protections = [
  ['paint','油漆','Paint','完整塗層阻隔水和氧氣；刮破後要補漆。','An intact layer blocks water and oxygen; scratches need repair.','門、欄杆','Doors and railings'],
  ['oil','油／潤滑脂','Oil / grease','覆蓋表面，適合會活動的機件；需要定期補塗。','Covers moving parts; needs regular reapplication.','機器活動部分','Moving machine parts'],
  ['plastic','塑膠包覆','Plastic coating','把鐵與水和氧氣分隔。','Separates iron from water and oxygen.','衣架','Coat hangers'],
  ['tin','鍍錫','Tin plating','薄錫層保護鋼；常見於食品罐。','A thin tin layer protects steel; common on food cans.','食品罐','Food cans'],
  ['zinc','鍍鋅','Zinc coating','表面鋅層保護鐵，叫鍍鋅鐵。','A zinc layer protects the iron; this is galvanized iron.','戶外鐵件','Outdoor ironwork'],
  ['alloy','不銹鋼','Stainless steel','把鐵與鉻等元素製成合金，不易腐蝕。','An alloy of iron with chromium and others resists corrosion.','餐具','Cutlery'],
];
function renderProtect() {
  return `<section class="panel protection-panel">${panelTitle('選一種保護方法','Choose a protection method','為何有效？','HOW DOES IT WORK?')}<div class="protection-layout"><div class="protection-picker" id="protection-picker">${protections.map(p=>`<button type="button" data-protection="${p[0]}" aria-pressed="false">${t(p[1],p[2])}</button>`).join('')}</div><div id="protection-detail" aria-live="polite"></div></div></section><div class="protection-summary"><article class="panel"><b>${t('表面屏障','Surface barrier')}</b><p>${t('油漆、油脂、塑膠、鍍錫和鍍鋅：讓水和氧氣難以接觸鐵。','Paint, grease, plastic, tin and zinc make it hard for water and oxygen to reach iron.')}</p></article><article class="panel"><b>${t('改變材料','Change the material')}</b><p>${t('不銹鋼是合金；加入鉻等元素後，更不易腐蝕。','Stainless steel is an alloy; chromium and other elements help it resist corrosion.')}</p></article></div>`;
}

function renderPropertyExtras() {
  return `<section class="panel extra-panel">${panelTitle('其餘四種常見性質','Four more useful properties')}<div class="extra-grid"><div><b>${t('有光澤','Shiny')}</b><p>${t('金與銀常用於裝飾。','Gold and silver are used in decoration.')}</p></div><div><b>${t('導電','Electrical conduction')}</b><p>${t('銅適合製作電線。','Copper is useful for electrical wires.')}</p></div><div><b>${t('熔點高','High melting point')}</b><p>${t('鎢可在高溫下作傳統燈絲。','Tungsten was used in hot traditional lamp filaments.')}</p></div><div><b>${t('密度高','High density')}</b><p>${t('較重的金屬可用於壓重物；仍要考慮安全和成本。','Dense metals may be used for weights; safety and cost also matter.')}</p></div></div></section><div class="application-strip"><div><strong>Ti</strong><span>${t('鈦：輕、強、耐腐蝕，可用於人工關節。','Titanium: light, strong and corrosion-resistant; used in artificial joints.')}</span></div><div><strong>Al</strong><span>${t('鋁：輕且易成形，適合製作飲品罐。','Aluminium: light and easily shaped, useful for drink cans.')}</span></div></div>`;
}
function renderHistoryDates() {
  return `<section class="panel discovery-panel">${panelTitle('發現年份：提取難度也重要','Discovery dates: extraction difficulty matters','筆記中的約略年份','APPROXIMATE DATES IN THE NOTES')}<div class="discovery-grid"><div><b>Ag</b><span>${t('銀','Silver')}</span><strong>${t('公元前 5000 年','5000 BC')}</strong></div><div><b>Cu</b><span>${t('銅','Copper')}</span><strong>${t('公元前 4000 年','4000 BC')}</strong></div><div><b>Fe</b><span>${t('鐵','Iron')}</span><strong>${t('公元前 1500 年','1500 BC')}</strong></div><div><b>Al</b><span>${t('鋁','Aluminium')}</span><strong>1827</strong></div></div><p>${t('鋁雖然在地殼中很多，卻很難提取，因此較晚才被發現和廣泛使用。','Aluminium is abundant in the crust but hard to extract, so its discovery and widespread use came much later.')}</p></section>`;
}
function renderSourceExtras() {
  return `<div class="application-strip"><div><strong>Ag</strong><span>${t('銀不易大量用於建築和電線，其中一個原因是價格較高。','Silver is not widely used for structures or wires partly because it costs more.')}</span></div><div><strong>Al</strong><span>${t('鋁雖然豐富，但提取較困難，所以比銅和鐵更晚被大量使用。','Aluminium is abundant but difficult to extract, so widespread use came later than copper and iron.')}</span></div></div>`;
}
function renderRustIndicator() {
  return `<section class="panel indicator-panel">${panelTitle('怎樣較快看出生銹開始？','How can we spot the start of rusting?')}<div class="indicator-layout"><div class="indicator-art" aria-hidden="true"><span class="indicator-nail"></span><i></i><i></i><i></i></div><div><h3>${t('生銹指示劑','Rust indicator')}</h3><p>${t('把鐵釘放進含有指示劑的凝膠。生銹開始的位置會變成藍色，通常一至兩天便可觀察。','Place an iron nail in a gel with rust indicator. Areas where rusting begins turn blue, often within one to two days.')}</p></div></div></section>`;
}
function renderProtectionExtras() {
  return `<section class="panel extra-panel">${panelTitle('鍍金屬是怎樣做的？','How is metal plating done?')}<div class="extra-grid plating-grid"><div><b>${t('電鍍','Electroplating')}</b><p>${t('利用電流，在鐵表面覆上一層薄金屬。','Electric current deposits a thin metal layer on iron.')}</p></div><div><b>${t('鍍錫 · 食品罐','Tin · food cans')}</b><p>${t('錫層可阻隔水和氧氣。','Tin coating blocks water and oxygen.')}</p></div><div><b>${t('鍍鋅 · 戶外鐵件','Zinc · outdoors')}</b><p>${t('鋅層保護鐵；不適合依這份筆記用作食品罐塗層。','Zinc protects iron; the notes do not recommend it as a food-can coating.')}</p></div><div><b>${t('鍍鉻 · 光亮表面','Chromium · shiny finish')}</b><p>${t('表面光亮、較耐磨，但成本較高。','A shiny, hard-wearing finish, but more costly.')}</p></div></div></section>`;
}
const renderers = {
  properties: () => renderProperties() + renderPropertyExtras(),
  history: () => renderHistory() + renderHistoryDates(),
  sources: () => renderSources() + renderOreGallery(en) + renderSourceExtras(),
  simple: () => renderReactivityGuide(en) + renderSimplePage(en),
  carbon: () => renderEquationExplorer(en) + renderCarbonPage(en),
  electrolysis: () => renderElectrolysisPage(en) + renderMetalAtlas(en),
  rust: () => renderRustPage(en) + renderRustIndicator(),
  protect: () => renderProtect() + renderProtectionExtras(),
};
function lessonMarkup(lesson) {
  const index = lessons.indexOf(lesson);
  return `<div class="breadcrumb"><a href="${homeUrl}">${t('中三化學','Form 3 Chemistry')}</a><span>/</span><b>${en ? lesson.en : lesson.zh}</b><span class="breadcrumb-count">${String(index+1).padStart(2,'0')} / 08</span></div><div class="lesson-heading">${tag(lesson.ref + ' · 金屬',lesson.ref + ' · METALS')}<h1>${en ? lesson.en : lesson.zh}</h1><p>${lessonLeads[lesson.id]()}</p></div>${renderers[lesson.id]()}${quizMarkup(lesson.id)}<nav class="lesson-pager" aria-label="${t('課題導覽','Lesson navigation')}">${index===0?`<a href="${homeUrl}">← ${t('所有課題','All lessons')}</a>`:`<a href="${lessonUrl(lessons[index-1].id)}">← ${t('上一課','Previous')}</a>`}${index===lessons.length-1?`<a class="next-link" href="${homeUrl}">${t('所有課題','All lessons')} →</a>`:`<a class="next-link" href="${lessonUrl(lessons[index+1].id)}">${t('下一課','Next')} →</a>`}</nav><footer class="site-footer"><span>${t('根據 Unit 4 Metals 學生筆記整理','Based on the Unit 4 Metals student notes')}</span><a href="${homeUrl}">F.3 CHEM</a></footer>`;
}

function renderShell() {
  document.documentElement.lang = en ? 'en' : 'zh-Hant-HK';
  document.title = activeLesson ? `${en ? activeLesson.en : activeLesson.zh} · ${t('金屬','Metals')}` : `${t('金屬','Metals')} · F.3 CHEM`;
  localStorage.setItem('metals-language',language);
  document.querySelector('#skip-link').textContent = t('跳到課堂內容','Skip to lesson');
  document.querySelector('#skip-link').href = `${location.pathname}${location.search}#main`;
  document.querySelector('#course-label').textContent = t('S3 · 金屬','S3 · METALS');
  document.querySelector('#side-heading').innerHTML = `<span>UNIT 04</span><b>${t('金屬','Metals')}</b><small>08</small>`;
  document.querySelector('#brand-link').href = homeUrl;
  document.querySelector('#previous-unit-link').href = `../?lang=${language}`;
  document.querySelector('#previous-unit-link').textContent = t('← 返回單元總覽','← All units');
  document.querySelector('#lesson-nav').innerHTML = `<a class="classroom-home-link" href="./?lang=${language}" ${!activeLesson?'aria-current="page"':''}><svg aria-hidden="true"><use href="../classroom-icons.svg#home"/></svg><b>${t('課題目錄','All lessons')}</b></a>` + lessons.map((lesson,i)=>`<a href="${lessonUrl(lesson.id)}" ${activeLesson?.id===lesson.id?'aria-current="page"':''}><span>${String(i+1).padStart(2,'0')}</span><b>${en?lesson.en:lesson.zh}</b><i>${lesson.ref}</i></a>`).join('');
  document.querySelectorAll('[data-language]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.language===language)));
  document.querySelector('#main').innerHTML = activeLesson ? lessonMarkup(activeLesson) : renderHome();
  let viewed=[]; try { viewed=JSON.parse(localStorage.getItem('metals-viewed')||'[]'); } catch { viewed=[]; }
  const seen=new Set(viewed.filter(id=>lessons.some(lesson=>lesson.id===id)));
  if(activeLesson) seen.add(activeLesson.id);
  localStorage.setItem('metals-viewed',JSON.stringify([...seen]));
  document.querySelector('#progress-label').textContent=t('已瀏覽','Topics viewed');
  document.querySelector('#progress-count').textContent=`${seen.size} / 8`;
  document.querySelector('#progress-fill').style.width=`${seen.size/lessons.length*100}%`;
  document.querySelectorAll('#lesson-nav a').forEach(link=>{ const id=link.href.match(/\/sessions\/([a-z]+)\//)?.[1]; if(seen.has(id)&&id!==activeLesson?.id) link.classList.add('viewed'); });
}

function setupQuiz(){
  if(!activeLesson) return;
  document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>{
    const i=Number(button.dataset.question), choice=Number(button.dataset.choice), q=quizBank[activeLesson.id][i];
    button.parentElement.querySelectorAll('button').forEach(b=>{ b.setAttribute('aria-pressed',String(b===button)); b.classList.toggle('correct',b===button&&choice===q[4]); b.classList.toggle('incorrect',b===button&&choice!==q[4]); });
    const feedback=document.querySelector(`#feedback-${i}`);
    feedback.className=`quiz-feedback ${choice===q[4]?'right':'try-again'}`;
    feedback.textContent=`${choice===q[4]?t('答對了。','Correct.'):t('再想想。','Try again.')} ${t(q[5],q[6])}`;
  }));
}
function setupProperties(){
  const root=document.querySelector('#use-picker'); if(!root) return;
  const show=id=>{ const u=uses.find(x=>x[0]===id); root.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.use===id)));
    document.querySelector('#use-display').innerHTML=`${photo(u[7],u[1],u[2],u[8],u[9])}<div class="use-reason"><span class="eyebrow">${t(u[3],u[4])}</span><h3>${t(u[1],u[2])}</h3><p>${t(u[5],u[6])}</p></div>`; };
  root.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.use))); show('wire');
}
function setupHistory(){
  const root=document.querySelector('#age-track'); if(!root) return;
  const show=id=>{ const a=ages.find(x=>x[0]===id); root.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.age===id)));
    document.querySelector('#age-detail').innerHTML=`<div class="age-art ${id}" aria-hidden="true">${{stone:'◆',copper:'Cu',bronze:'Cu + Sn',iron:'Fe'}[id]}</div><div><span class="eyebrow">${t('人類使用材料的歷史','HISTORY OF MATERIALS')}</span><h3>${t(a[1],a[2])}</h3><p>${t(a[3],a[4])}</p></div>`; };
  root.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.age))); show('copper');
}
function setupProtection(){
  const root=document.querySelector('#protection-picker'); if(!root) return;
  const show=id=>{const p=protections.find(x=>x[0]===id);root.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.protection===id)));const label=id==='alloy'?'Fe + Cr':t(p[1],p[2]);document.querySelector('#protection-detail').innerHTML=`<div class="protected-iron ${id}" aria-label="${t('鐵表面保護層示意圖','Diagram of a protected iron surface')}"><span class="iron-core">Fe</span><span class="outer-layer" data-label="${label}"></span><i class="drop water-drop">H₂O</i><i class="drop oxygen-drop">O₂</i></div><div class="protection-copy"><span class="eyebrow">${t(p[5],p[6])}</span><h3>${t(p[1],p[2])}</h3><p>${t(p[3],p[4])}</p></div>`;};
  root.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.protection)));show('paint');
}
function setupNavigation(){
  const menu=document.querySelector('#menu-button'),backdrop=document.querySelector('#nav-backdrop');
  const close=()=>{document.body.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label',t('開啟課堂目錄','Open lesson contents'));backdrop.hidden=true;};
  menu.setAttribute('aria-label',t('開啟課堂目錄','Open lesson contents'));backdrop.setAttribute('aria-label',t('關閉課堂目錄','Close lesson contents'));
  menu.addEventListener('click',()=>{const open=!document.body.classList.contains('menu-open');document.body.classList.toggle('menu-open',open);menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?t('關閉課堂目錄','Close lesson contents'):t('開啟課堂目錄','Open lesson contents'));backdrop.hidden=!open;});backdrop.addEventListener('click',close);document.addEventListener('keydown',event=>{if(event.key==='Escape')close();});
  document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>{const url=new URL(location.href);url.searchParams.set('lang',button.dataset.language);location.href=url.href;}));
}

renderShell();setupNavigation();setupQuiz();setupProperties();setupHistory();setupProtection();setupEquationExplorer(en);setupMetalAtlas(en);createExtractionModels(language);
