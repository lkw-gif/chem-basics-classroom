const P = { navy: '#172c40', green: '#06745c', blue: '#247ab1', orange: '#b75b17', pale: '#f5f8fb', line: '#9bb0bc' };
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[c]);
const text = (x, y, value, size = 18, color = P.navy, anchor = 'middle') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" text-anchor="${anchor}">${esc(value)}</text>`;
const lines = (x, y, values, size = 18, color = P.navy) => values.map((v, i) => text(x, y + i * (size + 9), v, size, color)).join('');
const box = (x, y, w, h, fill = 'white', stroke = P.line) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${stroke}" stroke-width="1.5"/>`;
const arrow = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${P.green}" stroke-width="3" fill="none" marker-end="url(#chem-arrow)"/>`;
const dot = (x, y, label, color = P.blue, r = 19) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${color}"/>${text(x, y + 6, label, label.length > 3 ? 13 : 17, 'white')}`;
const beaker = (x, y, w = 140, h = 140, level = .72, liquid = '#e5f3fa') => `<path d="M${x + 4} ${y} V${y + h - 12} Q${x + 4} ${y + h} ${x + 16} ${y + h} H${x + w - 16} Q${x + w - 4} ${y + h} ${x + w - 4} ${y + h - 12} V${y}" stroke="${P.navy}" stroke-width="3" fill="none"/><path d="M${x + 7} ${y + h * (1 - level)} H${x + w - 7} V${y + h - 13} Q${x + w - 7} ${y + h - 4} ${x + w - 16} ${y + h - 4} H${x + 16} Q${x + 7} ${y + h - 4} ${x + 7} ${y + h - 13}Z" fill="${liquid}"/>`;
const flask = (x, y, w = 105, h = 140, volumetric = false) => {
  const cx = x + w / 2;
  const shape = volumetric ? `M${cx - 12} ${y} V${y + h * .48} C${x - 5} ${y + h * .62} ${x - 5} ${y + h} ${cx} ${y + h} C${x + w + 5} ${y + h} ${x + w + 5} ${y + h * .62} ${cx + 12} ${y + h * .48} V${y}` : `M${cx - 12} ${y} V${y + h * .3} L${x + 5} ${y + h - 10} Q${x} ${y + h} ${x + 15} ${y + h} H${x + w - 15} Q${x + w} ${y + h} ${x + w - 5} ${y + h - 10} L${cx + 12} ${y + h * .3} V${y}`;
  return `<path d="${shape}" fill="#e5f3fa" stroke="${P.navy}" stroke-width="3"/>${volumetric ? `<path d="M${cx - 19} ${y + 26}H${cx + 19}" stroke="${P.orange}" stroke-width="3"/>` : ''}`;
};
const filter = (x, y) => `<path d="M${x} ${y}H${x + 90}L${x + 49} ${y + 60}V${y + 84}H${x + 41}V${y + 60}Z" fill="#fff" stroke="${P.navy}" stroke-width="2.5"/><path d="M${x + 15} ${y + 9}H${x + 75}L${x + 45} ${y + 50}Z" fill="#e8ecef" stroke="${P.line}"/>${flask(x + 1, y + 95, 88, 100)}`;
const plate = (x, y, w = 130) => `<ellipse cx="${x + w / 2}" cy="${y}" rx="${w / 2}" ry="15" fill="#fff" stroke="${P.navy}" stroke-width="2.5"/><path d="M${x} ${y}Q${x + w / 2} ${y + 68} ${x + w} ${y}" fill="#eef6fa" stroke="${P.navy}" stroke-width="2.5"/>`;

/** Original teaching diagrams; the particle counts are qualitative, never to scale. */
export function drawDiagram(kind, language = 'zh') {
  const en = language === 'en';
  const tr = (zh, english) => en ? english : zh;
  let title, body = '', height = 400;
  const bilingualTitles = {
    water: ['水與酸的電離', 'Water and acid ionisation'], basicity: ['可電離的氫與酸的鹽基度', 'Ionisable hydrogen and acid basicity'],
    'acid-reactions': ['酸與金屬、碳酸鹽的反應', 'Acid reactions with metals and carbonates'], 'ionic-equations': ['中和反應與旁觀離子', 'Neutralisation and spectator ions'],
    indicators: ['指示劑與顏色', 'Indicators and colours'], strength: ['強弱與濃稀的粒子模型', 'Strength and concentration particle models'],
    molarity: ['摩爾濃度與溶液體積', 'Molarity and solution volume'], neutralisation: ['中和反應釋放能量', 'Neutralisation releases energy'],
    precipitation: ['沉澱法製備氯化銀', 'Preparing silver chloride by precipitation'], 'excess-solid': ['過量固體法製備硫酸銅', 'Preparing copper sulfate using excess solid'],
    'standard-solution': ['由固體配製標準溶液', 'Preparing a standard solution from a solid'], dilution: ['由稀釋配製溶液', 'Preparing a solution by dilution'],
    titration: ['酸鹼滴定裝置', 'Acid–base titration apparatus']
  };
  if (!bilingualTitles[kind]) return '';
  title = bilingualTitles[kind][en ? 1 : 0];
  if (kind === 'water') {
    body = box(25, 65, 360, 285) + box(415, 65, 360, 285);
    body += text(205, 100, tr('非水溶劑中的 HCl', 'HCl in a non-aqueous solvent'), 20) + text(595, 100, tr('水中的 HCl', 'HCl in water'), 20);
    body += beaker(120, 130, 170, 155) + beaker(510, 130, 170, 155);
    for (const [x, y] of [[155, 205], [233, 208], [188, 259]]) body += dot(x, y, 'HCl', P.orange, 22);
    for (const [x, y, s] of [[545, 203, 'H⁺'], [621, 200, 'Cl⁻'], [575, 256, 'Cl⁻'], [648, 256, 'H⁺']]) body += dot(x, y, s, s === 'H⁺' ? P.orange : P.blue, 21);
    body += lines(205, 316, [tr('主要以分子存在', 'Mainly molecules')]);
    body += lines(595, 316, [tr('產生流動離子：可導電', 'Mobile ions: conducts electricity')], 17);
    body += text(400, 384, 'HCl(aq) → H⁺(aq) + Cl⁻(aq)', 20, P.green);
  } else if (kind === 'basicity') {
    body = box(45, 80, 710, 245);
    body += text(400, 128, tr('乙酸：CH₃COOH', 'Ethanoic acid: CH₃COOH'), 24);
    body += text(340, 206, 'CH₃ — C', 36) + text(398, 163, 'O', 28) + `<path d="M390 174V187M397 174V187" stroke="${P.navy}" stroke-width="2"/>`;
    body += text(485, 206, '— O —', 34) + `<circle cx="573" cy="194" r="31" fill="#fff1e3" stroke="${P.orange}" stroke-width="3"/>` + text(573, 205, 'H', 32, P.orange);
    body += lines(400, 271, [tr('只有 —COOH 的 H 可在水中電離', 'Only the —COOH hydrogen ionises in water'), tr('CH₃ 的三個 H 不計算在鹽基度內', 'The three CH₃ hydrogens do not count')], 19);
    body += text(400, 370, tr('鹽基度 = 1；並非按化學式中所有 H 計算', 'Basicity = 1; do not count every H in the formula'), 20, P.green);
  } else if (kind === 'acid-reactions') {
    body = box(20, 65, 370, 300) + box(410, 65, 370, 300);
    [70, 460].forEach(x => {
      body += flask(x, 160, 105, 115);
      body += `<path d="M${x + 40} 156H${x + 65}" stroke="${P.navy}" stroke-width="9"/><path d="M${x + 53} 156V132H${x + 145}V245" stroke="${P.navy}" stroke-width="3" fill="none"/>`;
      body += beaker(x + 115, 210, 125, 65, .7);
    });
    body += lines(205, 99, [tr('酸 + 活潑金屬', 'Acid + reactive metal'), 'Zn + 2H⁺ → Zn²⁺ + H₂'], 19);
    body += lines(595, 99, [tr('酸 + 碳酸鹽', 'Acid + carbonate'), 'CO₃²⁻ + 2H⁺ → CO₂ + H₂O'], 18);
    body += lines(205, 294, [tr('鋅 + 稀酸', 'Zinc + dilute acid'), tr('H₂：另取少量測試', 'H₂: test a small sample'), tr('點燃有「卜」聲', 'A lighted splint gives a pop')], 17);
    body += lines(595, 294, [tr('碳酸鈣 + 稀酸', 'CaCO₃ + dilute acid'), tr('CO₂ 通入石灰水', 'CO₂ into limewater'), tr('石灰水變乳白', 'Limewater turns milky')], 17);
    body += text(400, 393, tr('裝置示意；氣體測試在老師指導下進行', 'Schematic; perform gas tests under teacher supervision'), 16, P.green);
  } else if (kind === 'ionic-equations') {
    body = text(400, 90, 'HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)', 23);
    body += box(30, 125, 340, 155) + box(430, 125, 340, 155);
    [['H⁺', P.orange], ['Cl⁻', P.blue], ['Na⁺', P.green], ['OH⁻', P.orange]].forEach(([s, c], i) => body += dot(85 + i * 77, 203, s, c, 28));
    body += dot(490, 203, 'Na⁺', P.green, 28) + dot(565, 203, 'Cl⁻', P.blue, 28) + dot(685, 203, 'H₂O', P.orange, 34);
    body += arrow(381, 203, 418, 203);
    body += text(200, 320, tr('Na⁺、Cl⁻：反應前後不變', 'Na⁺ and Cl⁻ are unchanged'), 20, P.blue);
    body += text(600, 320, tr('旁觀離子可從兩邊消去', 'Cancel the spectator ions'), 20, P.blue);
    body += text(400, 373, 'H⁺(aq) + OH⁻(aq) → H₂O(l)', 27, P.green);
  } else if (kind === 'indicators') {
    const xs = [220, 390, 560], headings = [tr('酸性', 'Acidic'), tr('中性', 'Neutral'), tr('鹼性', 'Alkaline')];
    headings.forEach((h, i) => body += text(xs[i], 92, h, 20));
    const rows = [[tr('石蕊', 'Litmus'), ['#ce4050', '#8755a6', '#4475c6'], [tr('紅', 'Red'), tr('紫', 'Purple'), tr('藍', 'Blue')]], [tr('甲基橙', 'Methyl orange'), ['#d53540', '#ffd958', '#ffd958'], [tr('紅*', 'Red*'), tr('黃', 'Yellow'), tr('黃', 'Yellow')]], [tr('酚酞', 'Phenolphthalein'), ['#ffffff', '#ffffff', '#ed69ac'], [tr('無色', 'Colourless'), tr('無色', 'Colourless'), tr('粉紅*', 'Pink*')]]];
    rows.forEach(([label, colors, labels], ri) => { const y = 122 + ri * 64; body += text(22, y + 31, label, 17, P.navy, 'start'); colors.forEach((c, i) => { body += box(xs[i] - 67, y, 134, 46, c, P.line) + text(xs[i], y + 29, labels[i], 17, ri === 0 ? 'white' : P.navy); }); });
    body += lines(400, 348, [tr('* 甲基橙：pH < 3.1 紅；3.1–4.4 橙；> 4.4 黃', '* Methyl orange: red below pH 3.1; orange 3.1–4.4; yellow above 4.4'), tr('* 酚酞：pH < 8.2 無色；8.2–10 逐漸變粉紅', '* Phenolphthalein: colourless below pH 8.2; develops pink at 8.2–10')], 16);
  } else if (kind === 'strength') {
    height = 430;
    const labels = [[tr('強酸 · 稀', 'Strong · dilute'), true, false], [tr('強酸 · 濃', 'Strong · concentrated'), true, true], [tr('弱酸 · 稀', 'Weak · dilute'), false, false], [tr('弱酸 · 濃', 'Weak · concentrated'), false, true]];
    labels.forEach(([label, strong, concentrated], i) => { const x = 23 + i * 196; body += text(x + 82, 102, label, en ? 17 : 20); body += beaker(x + 10, 127, 145, 170, .82); const coords = concentrated ? [[40, 180], [105, 180], [40, 224], [105, 224], [40, 267], [105, 267]] : [[40, 208], [105, 254]]; coords.forEach(([px, py], j) => body += dot(x + px, py, strong ? (j % 2 ? 'A⁻' : 'H⁺') : j === 0 && concentrated ? 'H⁺' : j === 1 && concentrated ? 'A⁻' : 'HA', strong || j < 2 && concentrated ? P.blue : P.orange, 19)); });
    body += lines(400, 343, [tr('強弱：電離程度；濃稀：每單位體積的溶質量', 'Strength: extent of ionisation · Concentration: solute per unit volume'), tr('弱酸以 HA 為主，仍有少量 H⁺、A⁻（稀溶液圖省略）', 'Weak acids are mainly HA, with some H⁺ and A⁻ (omitted in dilute sketch)'), tr('粒子數目只作定性示意，並非實際比例', 'Particle counts are qualitative, not actual proportions')], 17);
  } else if (kind === 'molarity') {
    body = box(30, 75, 330, 260) + box(440, 75, 330, 260);
    body += beaker(112, 125, 165, 145, .75) + beaker(523, 155, 165, 115, .7);
    body += lines(195, 108, [tr('1.0 mol 溶質', '1.0 mol solute')], 22) + lines(605, 108, [tr('0.50 mol 溶質', '0.50 mol solute')], 22);
    body += lines(195, 304, [tr('溶液體積 = 1.0 dm³', 'Solution volume = 1.0 dm³')], 18) + lines(605, 304, [tr('溶液體積 = 500 cm³', 'Solution volume = 500 cm³')], 18);
    body += text(400, 365, 'c = n / V = 1.0 mol dm⁻³', 26, P.green);
    body += text(400, 393, tr('V 是整份溶液的體積，不是加入的水量', 'V is the total solution volume, not the water added'), 17);
  } else if (kind === 'neutralisation') {
    body = beaker(65, 143, 145, 140, .65) + text(137, 113, tr('酸 + 鹼', 'Acid + alkali'), 22);
    body += `<path d="M187 114V253" stroke="${P.orange}" stroke-width="8"/><circle cx="187" cy="257" r="12" fill="${P.orange}"/>` + arrow(237, 212, 315, 212);
    body += box(345, 95, 415, 240) + lines(552, 137, ['H⁺(aq) + OH⁻(aq)', '↓', 'H₂O(l)'], 25, P.green);
    body += lines(552, 257, [tr('能量由反應傳至溶液及周圍', 'Energy transfers to solution and surroundings'), tr('通常可量度到溫度上升', 'A temperature rise is usually observed')], 18);
    body += text(400, 380, tr('ΔT 也受溶液質量、比熱容量與熱量流失影響', 'ΔT also depends on mass, heat capacity and heat loss'), 18);
  } else if (kind === 'precipitation') {
    height = 430;
    body = text(400, 82, 'AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)', 21, P.green);
    body += beaker(40, 145, 130, 130, .7) + text(105, 124, tr('1 混合溶液', '1 Mix solutions'), 20) + text(105, 301, tr('白色 AgCl 沉澱', 'White AgCl precipitate'), 17);
    body += `<path d="M53 264H157" stroke="#fff" stroke-width="9"/>` + arrow(187, 207, 260, 207) + filter(300, 137);
    body += text(345, 124, tr('2 過濾', '2 Filter'), 20) + text(345, 373, tr('濾液：可溶性離子', 'Filtrate: soluble ions'), 17);
    body += arrow(406, 207, 500, 207) + plate(560, 218, 165) + lines(642, 124, [tr('3 蒸餾水洗滌', '3 Wash with distilled water'), tr('然後乾燥', 'Then dry')], 18);
    body += lines(642, 301, [tr('保留濾紙上的 AgCl', 'Retain AgCl on filter paper'), tr('洗去附著的可溶性鹽', 'Wash off soluble salts')], 17);
    body += text(400, 410, 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)', 22, P.green);
  } else if (kind === 'excess-solid') {
    height = 435;
    const labels = [[tr('1 加入過量 CuO', '1 Add excess CuO'), tr('稀 H₂SO₄，溫熱', 'Warm dilute H₂SO₄')], [tr('2 過濾', '2 Filter'), tr('除去剩餘 CuO', 'Remove excess CuO')], [tr('3 部分蒸發', '3 Partly evaporate'), tr('使溶液濃縮', 'Concentrate solution')], [tr('4 冷卻結晶', '4 Cool to crystallise'), tr('取晶體、乾燥', 'Collect and dry crystals')]];
    labels.forEach((ls, i) => body += lines(105 + 196 * i, 94, ls, 17));
    body += beaker(37, 176, 135, 137, .7, '#b7dcec');
    [[65, 286], [95, 294], [143, 286]].forEach(([x, y]) => body += dot(x, y, '', '#202a30', 7));
    body += filter(257, 172) + plate(431, 233, 133) + plate(637, 233, 133);
    body += `<path d="M489 296Q474 282 490 263Q507 282 501 296Z" fill="${P.orange}"/><path d="M459 227Q450 205 463 190M496 221Q485 198 498 180M529 223Q522 205 533 190" fill="none" stroke="${P.line}" stroke-width="2"/>`;
    [[678, 253], [707, 257], [734, 247]].forEach(([x, y]) => body += `<path d="M${x} ${y - 9}l10 8 -5 13 -14 -4Z" fill="${P.blue}"/>`);
    [180, 375, 580].forEach(x => body += arrow(x, 232, x + 38, 232));
    body += text(400, 363, 'CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)', 21, P.green);
    body += text(400, 409, tr('不要蒸乾；蒸發後冷卻，讓水合晶體析出', 'Do not evaporate to dryness; cool the concentrated solution'), 18);
  } else if (kind === 'standard-solution') {
    height = 475;
    const steps = [[tr('1 準確稱量', '1 Weigh accurately'), tr('已知質量的溶質', 'Known mass of solute')], [tr('2 溶解', '2 Dissolve'), tr('少量蒸餾水', 'A little distilled water')], [tr('3 定量轉移', '3 Transfer quantitatively'), tr('洗滌並加入洗液', 'Include all rinsings')], [tr('4 加水至刻度', '4 Make up to the mark'), tr('視線與凹液面底齊平', 'Eye level with meniscus')]];
    steps.forEach((ls, i) => body += lines(100 + i * 200, 87, ls, 17));
    body += box(25, 227, 150, 55) + text(100, 262, 'm = 5.30 g', 19, P.green) + plate(49, 203, 101);
    body += beaker(244, 155, 112, 132, .65) + `<path d="M321 148L292 266" stroke="${P.navy}" stroke-width="4"/>`;
    body += flask(447, 165, 106, 155, true) + `<path d="M468 140H532L502 165Z" fill="white" stroke="${P.navy}" stroke-width="2"/>`;
    body += flask(647, 165, 106, 155, true) + `<path d="M688 193Q700 202 712 193" stroke="${P.blue}" stroke-width="3" fill="none"/>` + `<path d="M744 191L725 191" stroke="${P.orange}" stroke-width="2" stroke-dasharray="3 3"/>` + text(766, 197, tr('眼', 'Eye'), 15);
    [182, 382, 582].forEach(x => body += arrow(x, 250, x + 36, 250));
    body += box(85, 357, 630, 76, '#eaf5ef', P.green) + lines(400, 386, [tr('5 加塞，反覆倒轉混合均勻', '5 Stopper and invert repeatedly to mix'), tr('最後體積由容量瓶刻度決定', 'The flask mark defines the final solution volume')], 19, P.green);
  } else if (kind === 'dilution') {
    height = 430;
    body += beaker(53, 162, 138, 140, .7, '#b6d5eb') + lines(122, 99, [tr('1 用移液管量取', '1 Pipette a measured'), tr('指定體積的原液', 'volume of stock solution')], 18);
    body += `<path d="M124 139V210Q106 219 124 229V263M130 139V210Q148 219 130 229V263" fill="white" stroke="${P.navy}" stroke-width="2"/>`;
    body += arrow(217, 225, 276, 225) + flask(317, 151, 113, 163, true) + lines(373, 99, [tr('2 轉移到容量瓶', '2 Transfer to a'), tr('加蒸餾水至刻度', 'flask; dilute to the mark')], 18);
    body += arrow(458, 225, 512, 225) + flask(579, 151, 113, 163, true) + lines(635, 99, [tr('3 加塞倒轉混合', '3 Stopper and invert'), tr('濃度降低，物質量不變', 'Less concentrated; same moles')], 18);
    body += text(400, 367, 'c₁V₁ = c₂V₂', 28, P.green) + text(400, 402, tr('溶質物質量守恆；兩個體積使用相同單位', 'Solute moles are conserved; use the same volume units'), 18);
  } else if (kind === 'titration') {
    height = 465;
    body += `<path d="M49 379V93M30 379H280M49 126H232" stroke="${P.navy}" stroke-width="6" fill="none"/><rect x="216" y="78" width="28" height="202" fill="#e5f3fa" stroke="${P.navy}" stroke-width="2.5"/><path d="M220 111Q230 119 240 111" stroke="${P.blue}" stroke-width="2.5" fill="none"/><path d="M230 280V305L225 318H235L230 305M208 283H252" stroke="${P.navy}" stroke-width="3" fill="none"/>`;
    for (let y = 92; y < 271; y += 15) body += `<path d="M217 ${y}H226" stroke="${P.navy}" stroke-width="1.5"/>`;
    body += flask(173, 325, 113, 89) + `<rect x="157" y="417" width="146" height="11" fill="white" stroke="${P.line}"/>`;
    body += lines(421, 91, [tr('滴定管：酸溶液', 'Burette: acid solution'), tr('讀凹液面底', 'Read the bottom of the meniscus'), tr('視線與液面齊平', 'Keep your eye at the same level')], 17);
    body += `<path d="M250 114H282" stroke="${P.orange}" stroke-width="2" stroke-dasharray="5 4"/>` + arrow(358, 248, 241, 303) + text(430, 243, tr('管尖充滿溶液，無氣泡', 'Filled jet; no air bubble'), 18);
    body += arrow(389, 353, 288, 377) + lines(474, 347, [tr('錐形瓶：已量取的鹼 + 指示劑', 'Flask: measured alkali + indicator'), tr('滴加時搖動；近終點逐滴加', 'Swirl; add dropwise near endpoint')], 17);
    body += text(230, 453, tr('白色瓷磚', 'White tile'), 18);
    body += box(600, 155, 175, 160) + `<path d="M685 171V201Q666 220 685 239V282M692 171V201Q711 220 692 239V282" fill="#d5eaf5" stroke="${P.navy}" stroke-width="2"/>` + lines(687, 299, [tr('容量移液管', 'Volumetric pipette')], 16);
    body += lines(687, 98, [tr('先量取鹼溶液', 'Measure alkali first'), tr('使用吸球', 'Use a pipette filler')], 17);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 ${height}" width="800" style="display:block;width:100%;height:auto;max-width:900px;margin:auto" role="img" aria-label="${esc(bilingualTitles[kind].join(' / '))}"><title>${esc(title)}</title><defs><marker id="chem-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="${P.green}"/></marker></defs><rect width="800" height="${height}" rx="14" fill="${P.pale}"/><g font-family="system-ui,-apple-system,Segoe UI,Arial,sans-serif">${text(400, 38, title, 24, P.navy)}${body}</g></svg>`;
}
