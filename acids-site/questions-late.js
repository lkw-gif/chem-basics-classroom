// Original question prompts from PDF pages 40–79; solution-only pages are not repeated.
const pair = (zh, en) => [zh, en];
const make = (page, label, lesson, category, prompt, answer, extra = {}) => ({
  id: 'orig-p' + page + '-' + label.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  lesson, source: { pdfPage: page, printedPage: page - 1, label }, category, advanced: false,
  prompt, hint: pair('先找出關鍵粒子、溶解性或反應類型，再作判斷。', 'Identify the key particles, solubility or reaction type before deciding.'),
  steps: [pair('將答案與相關概念或配平的方程式連繫。', 'Link your answer to the relevant concept or balanced equation.')],
  answer, ...extra
});
const combinations = [
  pair('A. 只有 (1) 及 (2)', 'A. (1) and (2) only'),
  pair('B. 只有 (1) 及 (3)', 'B. (1) and (3) only'),
  pair('C. 只有 (2) 及 (3)', 'C. (2) and (3) only'),
  pair('D. (1)、(2) 及 (3)', 'D. (1), (2) and (3)')
];
const diagram = (title, body, height = 270) => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 ' + height + '" role="img" aria-label="' + title + '"><title>' + title + '</title><rect width="720" height="' + height + '" fill="#f8fafb"/><g fill="none" stroke="#17324d" stroke-width="3">' + body + '</g></svg>';
const ammoniaDiagram = diagram('Ammonia generation and collection options',
  '<path d="M35 75L190 118Q212 124 218 108L222 95L57 48Q28 42 25 56Q22 68 35 75Z"/><path d="M207 98L248 110M80 110L90 83L100 110"/><path d="M300 190L300 90M345 90L345 190M294 190L350 190M275 65L324 65L324 172"/><path d="M420 180L420 80L465 80L465 180M414 80L471 80M390 202L442 202L442 95"/><path d="M535 155L535 215L690 215L690 155M582 177L582 70L623 70L623 177M514 100L563 185L605 185"/><path d="M535 161L690 161" stroke="#60a5fa"/><g stroke="none" fill="#17324d" font-family="sans-serif" font-size="16"><text x="22" y="28">NH4Cl(s) + CaO(s)</text><text x="70" y="135">heat</text><text x="280" y="28">Collection options</text><text x="318" y="232">I</text><text x="438" y="232">II</text><text x="575" y="244">III: water trough</text></g>'
);
const sulphurDiagram = diagram('Three sulphur dioxide drying setups',
  '<rect x="52" y="84" width="142" height="53" rx="7"/><path d="M20 110L88 110M155 110L225 110"/><g fill="#d5dfe4"><circle cx="105" cy="100" r="8"/><circle cx="123" cy="116" r="8"/><circle cx="142" cy="101" r="8"/></g><path d="M285 65L285 155Q285 185 323 185Q361 185 361 155L361 65M299 65L299 155Q299 170 323 170Q347 170 347 155L347 65M259 49L292 49L292 90M354 90L354 49L390 49"/><path d="M505 90L473 190Q532 210 591 190L560 90M511 90L511 55L475 55M550 90L550 55L592 55M511 90L511 176"/><path d="M487 154L577 154" stroke="#60a5fa"/><g stroke="none" fill="#17324d" font-family="sans-serif" font-size="16"><text x="48" y="35">(1) Anhydrous CaCl2</text><text x="282" y="35">(2) CaO</text><text x="485" y="35">(3) Conc. H2SO4</text><text x="45" y="240">Gas flows left to right in every setup.</text></g>'
);
const hclDiagram = diagram('Four hydrogen chloride drying setups',
  '<rect x="36" y="93" width="106" height="113" rx="10"/><path d="M39 154L140 154" stroke="#60a5fa"/><path d="M15 54L67 54L67 132M113 185L113 54L153 54"/><path d="M201 84L201 161Q201 200 241 200Q281 200 281 161L281 84M215 84L215 161Q215 185 241 185Q267 185 267 161L267 84M182 61L208 61L208 108M274 108L274 61L299 61"/><path d="M359 84L359 161Q359 200 399 200Q439 200 439 161L439 84M373 84L373 161Q373 185 399 185Q425 185 425 161L425 84M341 61L366 61L366 108M432 108L432 61L457 61"/><rect x="509" y="105" width="163" height="43" rx="8"/><path d="M480 126L530 126M650 126L705 126"/><g stroke="none" fill="#c8d8e5"><circle cx="232" cy="168" r="7"/><circle cx="246" cy="179" r="7"/><circle cx="255" cy="161" r="7"/><circle cx="388" cy="168" r="7"/><circle cx="404" cy="179" r="7"/><circle cx="413" cy="161" r="7"/><circle cx="564" cy="120" r="7"/><circle cx="580" cy="134" r="7"/><circle cx="600" cy="118" r="7"/></g><g stroke="none" fill="#17324d" font-family="sans-serif" font-size="15"><text x="32" y="32">A: Conc. H2SO4</text><text x="191" y="32">B: CaO</text><text x="350" y="32">C: CaCO3</text><text x="490" y="32">D: Anhydrous CaCl2</text><text x="25" y="237">A: HCl enters short tube.</text><text x="347" y="237">Gas flows left to right.</text></g>'
);
const coreQuestions = [
  make(41, 'Example', 'gas-lab', 'experiment',
    pair('加熱固體氯化銨和氧化鈣製取氨氣，裝置及收集選項如下。回答 (a)–(c)。', 'Ammonia is prepared by heating solid ammonium chloride and calcium oxide in the apparatus shown. Answer (a)–(c).'),
    pair('(a) 2NH₄Cl(s) + CaO(s) → CaCl₂(s) + H₂O(g) + 2NH₃(g)（加熱）。(b) 水蒸氣在較冷的管口凝結；管口朝下可避免冷水流回熱試管，使試管因溫差而破裂。(c) 選 II：氨氣比空氣輕，使用倒置集氣瓶；它極易溶於水，不能用排水集氣法。', '(a) 2NH₄Cl(s) + CaO(s) → CaCl₂(s) + H₂O(g) + 2NH₃(g), on heating. (b) Water vapour condenses near the cooler mouth; pointing the mouth down prevents cold condensate flowing onto the hot test tube and cracking it. (c) II: ammonia is less dense than air and is collected in an inverted gas jar. Its high water solubility rules out collection over water.'),
    { advanced: true, diagram: ammoniaDiagram, parts: [
      { label: 'a', prompt: pair('反應也生成氯化鈣。寫出化學方程式。', 'Calcium chloride is also produced. Write the chemical equation.') },
      { label: 'b', prompt: pair('為甚麼要夾持試管至管口向下？', 'Why must the test tube be clamped with its mouth pointing downwards?') },
      { label: 'c', prompt: pair('選出收集氨氣的裝置 I、II 或 III，並解釋。', 'Choose I, II or III for collecting ammonia and explain.') }
    ], hint: pair('考慮生成的水蒸氣、氨氣的密度及水溶性。', 'Consider the water vapour produced, ammonia density and its water solubility.'),
      steps: [pair('先配平方程式，再判斷冷凝水流向，最後比較集氣方式。', 'Balance the equation, consider condensate flow, then compare collection methods.')] }
  ),
  make(43, 'Exam-type Q1', 'gas-lab', 'experiment',
    pair('哪些裝置可以乾燥潮濕的二氧化硫氣體？(1) 無水氯化鈣乾燥管；(2) 氧化鈣 U 形管；(3) 氣體從長管進入濃硫酸洗氣瓶。', 'Which setups dry moist sulphur dioxide? (1) anhydrous calcium chloride drying tube; (2) calcium oxide U-tube; (3) concentrated sulphuric acid with gas entering through the long tube.'),
    pair('B，只有 (1) 及 (3)。乾燥劑要吸水而不與氣體反應；鹼性氧化物 CaO 與 SO₂ 反應：CaO(s) + SO₂(g) → CaSO₃(s)。', 'B: (1) and (3) only. The agent must remove water without reacting with the gas. Basic CaO reacts with SO₂: CaO(s) + SO₂(g) → CaSO₃(s).'),
    { advanced: true, choices: combinations, diagram: sulphurDiagram, hint: pair('SO₂ 是酸性氣體。', 'SO₂ is an acidic gas.') }
  ),
  make(44, 'Exam-type Q2', 'gas-lab', 'experiment',
    pair('哪個裝置可以乾燥氯化氫氣體？留意 A 的入氣管未浸入液體。', 'Which setup dries hydrogen chloride gas? Note that the inlet in A does not dip into the liquid.'),
    pair('D。氣體接觸無水 CaCl₂。A 的入氣短管未浸入濃硫酸，不能使氣體鼓泡通過液體；B 和 C 與 HCl 反應。', 'D. Gas passes through anhydrous CaCl₂. In A the short inlet does not dip into sulphuric acid, so gas does not bubble through it. B and C react with HCl.'),
    { advanced: true, choices: [pair('A. 濃硫酸，短管入氣', 'A. Concentrated sulphuric acid, short inlet'), pair('B. 氧化鈣 U 形管', 'B. Calcium oxide U-tube'), pair('C. 碳酸鈣 U 形管', 'C. Calcium carbonate U-tube'), pair('D. 無水氯化鈣乾燥管', 'D. Anhydrous calcium chloride drying tube')], diagram: hclDiagram,
      hint: pair('乾燥劑不能消耗 HCl；液體乾燥劑的入氣管須浸入液面下。', 'The agent must not consume HCl; the inlet must dip below a liquid drying agent.') }
  ),
  make(46, 'Exam-type Q1', 'alkali-reactions', 'concept',
    pair('下列關於氫氧化鉀溶液的敘述，哪項不正確？', 'Which statement about potassium hydroxide solution is incorrect?'),
    pair('A。Fe³⁺ 形成棕色 Fe(OH)₃，污綠色的是 Fe(OH)₂。B：NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l)（加熱）。C 的 H⁺ 是水電離形成的微量離子，鹼性溶液亦有 H⁺。', 'A. Fe³⁺ forms brown Fe(OH)₃; dirty green is Fe(OH)₂. B: NH₄⁺(aq) + OH⁻(aq) → NH₃(g) + H₂O(l), on heating. The small amount of H⁺ in C arises from water ionisation; alkaline solutions still contain H⁺.'),
    { choices: [pair('A. 加到硫酸鐵(III)溶液時形成污綠色沉澱。', 'A. A dirty green precipitate forms when added to iron(III) sulphate solution.'), pair('B. 與氯化銨溶液加熱時放出氨氣。', 'B. Ammonia is liberated when heated with ammonium chloride solution.'), pair('C. 稀溶液含 K⁺(aq)、H⁺(aq) 及 OH⁻(aq)。', 'C. Dilute solution contains K⁺(aq), H⁺(aq) and OH⁻(aq).'), pair('D. 濃溶液有腐蝕性。', 'D. Concentrated solution is corrosive.')],
      hint: pair('分清鐵(II)及鐵(III)氫氧化物顏色。', 'Distinguish the colours of iron(II) and iron(III) hydroxides.') }
  ),
  make(46, 'Exam-type Q2', 'alkali-reactions', 'concept',
    pair('哪種混合物會產生鹼性溶液？', 'Which reaction mixture produces an alkaline solution?'),
    pair('B。CaO 中和 HCl 後，過量 CaO 與水反應形成 Ca(OH)₂，供應 OH⁻。CuO 不會在水中形成鹼性溶液；CaCO₃ 與 H₂SO₄ 反應可能受 CaSO₄ 塗層妨礙；NaCl 水溶液在本課模型中是中性。', 'B. After neutralising HCl, excess CaO reacts with water to form Ca(OH)₂ and supplies OH⁻. CuO does not produce an alkaline solution in water; CaSO₄ coating may impede the CaCO₃/H₂SO₄ reaction; NaCl solution is neutral in the curriculum model.'),
    { choices: [pair('A. 過量 CuO 加入稀鹽酸。', 'A. Excess copper(II) oxide added to dilute hydrochloric acid.'), pair('B. 過量 CaO 加入稀鹽酸。', 'B. Excess calcium oxide added to dilute hydrochloric acid.'), pair('C. 過量 CaCO₃ 加入稀硫酸。', 'C. Excess calcium carbonate added to dilute sulphuric acid.'), pair('D. 過量 NaCl 加入蒸餾水。', 'D. Excess sodium chloride added to distilled water.')] }
  ),
  make(47, 'Exam-type Q3', 'alkali-reactions', 'equation',
    pair('裝有石灰水的瓶口周圍有白色固體，最可能是甚麼？', 'A white solid is found around the mouth of a reagent bottle containing limewater. What is it most likely to be?'),
    pair('C，碳酸鈣。Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l)，CO₂ 來自空氣。', 'C, calcium carbonate. Ca(OH)₂(aq) + CO₂(g) → CaCO₃(s) + H₂O(l); the CO₂ comes from air.'),
    { choices: [pair('A. 氧化鈣', 'A. Calcium oxide'), pair('B. 硫酸鈣', 'B. Calcium sulphate'), pair('C. 碳酸鈣', 'C. Calcium carbonate'), pair('D. 碳酸氫鈣', 'D. Calcium hydrogencarbonate')] }
  ),
  make(47, 'Exam-type Q4', 'ion-tests', 'concept',
    pair('哪些固體會溶於 NaOH 溶液？(1) 草酸；(2) Al(OH)₃；(3) Fe(OH)₃；(4) Pb(OH)₂。', 'Which solids dissolve in NaOH solution? (1) oxalic acid; (2) aluminium hydroxide; (3) iron(III) hydroxide; (4) lead(II) hydroxide.'),
    pair('C，(1)、(2) 及 (4)。草酸與 OH⁻ 中和；Al(OH)₃ 及 Pb(OH)₂ 是兩性氫氧化物，溶於過量 NaOH 形成可溶配離子。Fe(OH)₃ 不溶。', 'C: (1), (2) and (4). Oxalic acid neutralises OH⁻; amphoteric Al(OH)₃ and Pb(OH)₂ dissolve in excess NaOH to form soluble complex ions. Fe(OH)₃ does not.'),
    { advanced: true, choices: [pair('A. 只有 (1) 及 (2)', 'A. (1) and (2) only'), pair('B. 只有 (3) 及 (4)', 'B. (3) and (4) only'), pair('C. 只有 (1)、(2) 及 (4)', 'C. (1), (2) and (4) only'), pair('D. 只有 (2)、(3) 及 (4)', 'D. (2), (3) and (4) only')] }
  ),
  make(47, 'Exam-type Q5', 'alkali-reactions', 'concept',
    pair('哪些過程放出無色氣體？(1) 鎂加入稀硫酸；(2) 氯化銨與氫氧化鈣加熱；(3) 水加入檸檬酸與碳酸氫鈉固體混合物。', 'Which processes evolve a colourless gas? (1) magnesium added to dilute sulphuric acid; (2) ammonium chloride heated with calcium hydroxide; (3) water added to a solid mixture of citric acid and sodium hydrogencarbonate.'),
    pair('D。分別生成 H₂、NH₃ 及 CO₂。(1) Mg(s) + H₂SO₄(aq) → MgSO₄(aq) + H₂(g)；(2) 2NH₄Cl(s) + Ca(OH)₂(s) → CaCl₂(s) + 2H₂O(g) + 2NH₃(g)；(3) H⁺(aq) + HCO₃⁻(aq) → CO₂(g) + H₂O(l)。', 'D. H₂, NH₃ and CO₂ form respectively. (1) Mg(s) + H₂SO₄(aq) → MgSO₄(aq) + H₂(g); (2) 2NH₄Cl(s) + Ca(OH)₂(s) → CaCl₂(s) + 2H₂O(g) + 2NH₃(g); (3) H⁺(aq) + HCO₃⁻(aq) → CO₂(g) + H₂O(l).'),
    { choices: combinations }
  ),
  make(48, 'Exam-type Q6', 'ion-tests', 'concept',
    pair('哪對水溶液混合後形成沉澱？', 'Which pair of aqueous solutions gives a precipitate when mixed?'),
    pair('A。氨水提供 OH⁻，生成白色 Pb(OH)₂：Pb²⁺(aq) + 2OH⁻(aq) → Pb(OH)₂(s)。其餘沒有不溶產物。', 'A. Aqueous ammonia provides OH⁻, giving white Pb(OH)₂: Pb²⁺(aq) + 2OH⁻(aq) → Pb(OH)₂(s). The other mixtures give no insoluble product.'),
    { advanced: true, choices: [pair('A. 硝酸鉛(II)及氨水', 'A. Lead(II) nitrate and ammonia'), pair('B. 硫酸銅(II)及硝酸鈉', 'B. Copper(II) sulphate and sodium nitrate'), pair('C. 氯化鈣及硝酸鈉', 'C. Calcium chloride and sodium nitrate'), pair('D. 硫酸鐵(II)及酸化氯化鉀', 'D. Iron(II) sulphate and acidified potassium chloride')] }
  ),
  make(48, 'Exam-type Q7', 'ion-tests', 'concept',
    pair('金屬 X 與稀硝酸形成無色溶液，加入 NaOH 形成白色沉澱，沉澱溶於過量 NaOH。X 最可能是甚麼？', 'Metal X reacts with dilute nitric acid to give a colourless solution. Adding NaOH forms a white precipitate soluble in excess NaOH. What is X probably?'),
    pair('C，鉛。Pb²⁺ 形成兩性的白色 Pb(OH)₂。銅、鐵離子生成有色沉澱；白色 Mg(OH)₂ 不溶於過量 NaOH。', 'C, lead. Pb²⁺ forms white amphoteric Pb(OH)₂. Copper and iron ions give coloured precipitates; white Mg(OH)₂ is insoluble in excess NaOH.'),
    { advanced: true, choices: [pair('A. 銅', 'A. Copper'), pair('B. 鐵', 'B. Iron'), pair('C. 鉛', 'C. Lead'), pair('D. 鎂', 'D. Magnesium')] }
  ),
  make(48, 'Exam-type Q8', 'ion-tests', 'experiment',
    pair('哪些方法區分 ZnCl₂(aq) 及 CaBr₂(aq)？(1) 加 NH₃(aq)；(2) 焰色試驗；(3) 蒸乾。', 'Which methods distinguish ZnCl₂(aq) and CaBr₂(aq)? (1) adding NH₃(aq); (2) flame test; (3) evaporating to dryness.'),
    pair('A。Zn²⁺ 與氨水形成白色沉澱，溶於過量氨水；Ca²⁺ 在一般條件下沒有沉澱。鈣呈磚紅／橙紅焰色，鋅沒有特徵焰色。兩者蒸乾均留下白色鹽。', 'A. Zn²⁺ gives a white precipitate soluble in excess ammonia; Ca²⁺ gives no precipitate under usual conditions. Calcium gives a brick-red/orange-red flame, zinc no characteristic flame colour. Both leave white salts on evaporation.'),
    { advanced: true, choices: combinations }
  ),
  make(49, 'Exam-type Q9', 'ion-tests', 'concept',
    pair('哪些過程顯示藍色？(1) 石蕊加入 NaOH(aq)；(2) CuSO₄(s) 與 NH₃(aq) 混合；(3) K₃Fe(CN)₆(aq) 與 FeCl₂(aq) 混合。', 'Which processes show a blue colour? (1) adding litmus to NaOH(aq); (2) mixing CuSO₄(s) and NH₃(aq); (3) mixing K₃Fe(CN)₆(aq) and FeCl₂(aq).'),
    pair('D。(1) 石蕊在鹼中呈藍色；(2) 可生成淺藍 Cu(OH)₂，過量氨水形成深藍配離子；(3) 鐵(II)與鐵氰化物生成藍色沉澱，是延伸測試。', 'D. (1) Litmus is blue in alkali. (2) Pale blue Cu(OH)₂ may form; excess ammonia gives a deep blue complex. (3) Iron(II) and ferricyanide produce a blue precipitate, an extension test.'),
    { advanced: true, choices: combinations }
  ),
  make(49, 'Exam-type Q10', 'ion-tests', 'concept',
    pair('Y 可溶於冷水。Y 溶液分別與 NaOH 和酸化硝酸銀形成白色沉澱。Y 可能是甚麼？', 'Y is soluble in cold water. Its solution gives white precipitates with NaOH and with acidified silver nitrate. What might Y be?'),
    pair('D，MgCl₂。Mg²⁺(aq) + 2OH⁻(aq) → Mg(OH)₂(s)；Ag⁺(aq) + Cl⁻(aq) → AgCl(s)。ZnCO₃ 不溶；PbCl₂ 在冷水中微溶，不屬本課「可溶」分類。', 'D, MgCl₂. Mg²⁺(aq) + 2OH⁻(aq) → Mg(OH)₂(s); Ag⁺(aq) + Cl⁻(aq) → AgCl(s). ZnCO₃ is insoluble; PbCl₂ is sparingly soluble in cold water and is not classified as soluble here.'),
    { advanced: true, choices: [pair('A. 碳酸銨', 'A. Ammonium carbonate'), pair('B. 碳酸鋅', 'B. Zinc carbonate'), pair('C. 氯化鉛(II)', 'C. Lead(II) chloride'), pair('D. 氯化鎂', 'D. Magnesium chloride')] }
  ),
  make(49, 'Exam-type Q11', 'precipitation', 'concept',
    pair('少量粉末可溶於水形成澄清溶液；加入 K₂CO₃(aq) 生成白色沉澱。粉末可為甚麼？（原題條件不足，請解釋可行答案。）', 'A small amount of powder dissolves in water to form a clear solution; adding K₂CO₃(aq) gives a white precipitate. What can the powder be? (The original conditions do not give a unique answer; explain possible answers.)'),
    pair('B 或 D 都可行：CaSO₄ 及 Ca(OH)₂ 均微溶；少量在足夠水中能溶解，供應 Ca²⁺，與足量 CO₃²⁻ 形成白色 CaCO₃：Ca²⁺(aq) + CO₃²⁻(aq) → CaCO₃(s)。A、C 沒有可形成此沉澱的金屬離子。微溶不等於完全不溶，原題不能唯一選 D。', 'Both B and D can fit: CaSO₄ and Ca(OH)₂ are sparingly soluble; a small amount in sufficient water supplies Ca²⁺, which forms white CaCO₃ with enough CO₃²⁻: Ca²⁺(aq) + CO₃²⁻(aq) → CaCO₃(s). A and C lack a precipitating metal ion. Sparingly soluble is not completely insoluble; D is not uniquely supported.'),
    { choices: [pair('A. 硫酸鈉', 'A. Sodium sulphate'), pair('B. 硫酸鈣', 'B. Calcium sulphate'), pair('C. 氫氧化鈉', 'C. Sodium hydroxide'), pair('D. 氫氧化鈣', 'D. Calcium hydroxide')], hint: pair('「少量可溶」不等於「易溶」；找能供應 Ca²⁺ 的粉末。', 'A small amount dissolving does not mean highly soluble. Find powders that can supply Ca²⁺.') }
  ),
  make(55, 'Exam-type Q1', 'strength', 'concept',
    pair('溶液 pH 為 3，哪項結論不能據此得出？', 'A solution has pH 3. Which conclusion cannot be drawn?'),
    pair('C。pH 反映 H⁺ 濃度，強弱反映電離程度；稀強酸和弱酸都可 pH = 3。B 是原題對酸的一般描述，切勿品嚐實驗室溶液。', 'C. pH reflects H⁺ concentration, while strength concerns degree of ionisation. Dilute strong acids and weak acids can both have pH 3. B is the original general description; never taste laboratory solutions.'),
    { choices: [pair('A. 加到碳酸鈉溶液時釋出 CO₂。', 'A. It liberates CO₂ when added to sodium carbonate solution.'), pair('B. 有酸味。', 'B. It tastes sour.'), pair('C. 是弱酸。', 'C. It is a weak acid.'), pair('D. 能導電。', 'D. It conducts electricity.')], hint: pair('H⁺ 濃度是否告訴你酸的電離比例？', 'Does the H⁺ concentration tell you the fraction of acid ionised?') }
  ),
  make(55, 'Exam-type Q2', 'strength', 'concept',
    pair('氨水具有強烈氣味的原因是甚麼？', 'Why does ammonia solution have a strong smell?'),
    pair('B。NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq)。氨只部分反應，剩餘 NH₃ 分子可逸出成氣體，引致刺激性氣味；離子不是來源。', 'B. NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq). Ammonia reacts only partly; remaining NH₃ molecules can escape into the gas phase and give the pungent smell. Ions are not its source.'),
    { choices: [pair('A. 含氫氧根離子。', 'A. It contains hydroxide ions.'), pair('B. 含已溶解的氨分子。', 'B. It contains dissolved ammonia molecules.'), pair('C. 含銨離子。', 'C. It contains ammonium ions.'), pair('D. 含氫離子。', 'D. It contains hydrogen ions.')] }
  ),
  make(58, 'Framed safety scenario', 'neutralisation', 'concept',
    pair('主要含濃 NaOH 的通渠劑濺到手上，有學生建議用醋中和。解釋為甚麼不恰當及提出正確處理。這是安全情境分析。', 'Drain cleaner containing mainly concentrated NaOH spills onto a hand. A student suggests neutralising it with vinegar. Explain why this is inappropriate and suggest proper action. This is a safety scenario.'),
    pair('立即用大量流動清水沖洗，通知老師／實驗室負責人，按學校急救程序尋求協助。不要先加醋：H⁺(aq) + OH⁻(aq) → H₂O(l) 放熱，可加重灼傷；不要只加少量水。', 'Immediately flush with plenty of running water, alert the teacher/laboratory supervisor and follow school first-aid procedures. Do not first add vinegar: H⁺(aq) + OH⁻(aq) → H₂O(l) releases heat and can worsen burns. Do not use only a little water.'),
    { hint: pair('即時處理：立即大量流動清水沖洗並通知老師；再解釋中和放熱。', 'Immediate action: flush with plenty of running water and alert the teacher; then explain the heat released.'),
      steps: [pair('皮膚上的腐蝕性化學品應立即沖洗，不在皮膚上中和。', 'Immediately rinse corrosive material off skin; do not neutralise it on the skin.'), pair('以中和放熱解釋加醋會增加灼傷風險。', 'Explain why heat from neutralisation increases burn risk.')] }
  ),
  make(69, 'Framed preparation question', 'excess-solid', 'experiment',
    pair('能否混合 Mg(NO₃)₂(aq) 及 NaCl(aq) 製取純 MgCl₂(s)？解釋。', 'Can pure MgCl₂(s) be prepared by mixing Mg(NO₃)₂(aq) and NaCl(aq)? Explain.'),
    pair('不能用這種混合分離法：所有離子留在溶液，沒有沉澱，蒸發會得到混合鹽。用過量 MgCO₃（或 MgO）與稀 HCl 反應，過濾、濃縮及結晶：MgCO₃(s) + 2HCl(aq) → MgCl₂(aq) + CO₂(g) + H₂O(l)。', 'Not by this mixing-and-separation method: all ions remain dissolved, no precipitate forms and evaporation gives mixed salts. React excess MgCO₃ (or MgO) with dilute HCl, filter, concentrate and crystallise: MgCO₃(s) + 2HCl(aq) → MgCl₂(aq) + CO₂(g) + H₂O(l).'),
    { hint: pair('MgCl₂ 不會沉澱，怎樣除去 Na⁺ 及 NO₃⁻？', 'MgCl₂ does not precipitate; how could Na⁺ and NO₃⁻ be removed?') }
  ),
  make(71, 'Framed copper question', 'excess-solid', 'concept',
    pair('為甚麼不用銅金屬與鹽酸製備 CuCl₂？', 'Why is copper metal not used with hydrochloric acid to prepare CuCl₂?'),
    pair('銅比氫活性低，不能從稀鹽酸置換氫。可改用 CuO：CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)。', 'Copper is below hydrogen in the reactivity series and cannot displace hydrogen from dilute HCl. Use CuO: CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l).'),
    { hint: pair('比較銅和氫的活性。', 'Compare the reactivity of copper and hydrogen.') }
  ),
  make(71, 'Framed acid replacement question', 'excess-solid', 'concept',
    pair('上述製備 MgCl₂、ZnSO₄ 及 CuCl₂ 的例子，可用 NaCl／Na₂SO₄ 取代 HCl／H₂SO₄ 嗎？', 'In the preceding preparations of MgCl₂, ZnSO₄ and CuCl₂, can NaCl/Na₂SO₄ replace HCl/H₂SO₄?'),
    pair('不能按原方法取代。酸提供 H⁺ 使金屬、氧化物、氫氧化物或碳酸鹽反應；NaCl 及 Na₂SO₄ 不提供所需 H⁺，只供應陰離子不足以驅動反應。例：MgO(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂O(l)。', 'Not in the stated methods. The acid supplies H⁺ to react with the metal, oxide, hydroxide or carbonate. NaCl and Na₂SO₄ lack the required H⁺; supplying only the anion does not drive the reaction. Example: MgO(s) + 2H⁺(aq) → Mg²⁺(aq) + H₂O(l).')
  ),
  make(72, 'Framed sodium salt question', 'titration-salts', 'experiment',
    pair('將過量 Na(s)、NaOH(s)、Na₂O(s) 或 Na₂CO₃(s) 加到 HCl(aq) 再過濾，可得純 NaCl 溶液嗎？這是方法判斷題，不應以鈉金屬實作。', 'Can pure NaCl solution be obtained by adding excess Na(s), NaOH(s), Na₂O(s) or Na₂CO₃(s) to HCl(aq), followed by filtration? This is a method-selection question, not a sodium-metal procedure to perform.'),
    pair('不適合。NaOH、Na₂O 的水反應產物及 Na₂CO₃ 可溶，過量成分／產物不能過濾去除。鈉金屬與水猛烈反應，不適用。應滴定找出恰好中和體積，再不用指示劑重做及結晶：HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l)。', 'No. NaOH, the product of Na₂O reacting with water, and Na₂CO₃ are soluble; excess material/products cannot be filtered off. Sodium metal reacts violently with water and is unsuitable. Titrate to determine exact volumes, repeat without indicator and crystallise: HCl(aq) + NaOH(aq) → NaCl(aq) + H₂O(l).'),
    { hint: pair('過濾只除去不溶固體，不能去除已溶試劑。', 'Filtration removes insoluble solids, not dissolved reagents.') }
  )
];
const saltCases = [
  ['a', 'PbCl₂(s)', 'precipitation', 1, [
    'Pb(NO₃)₂(aq) + 2NaCl(aq) → PbCl₂(s) + 2NaNO₃(aq)',
    'Pb(NO₃)₂(aq) + CaCl₂(aq) → PbCl₂(s) + Ca(NO₃)₂(aq)',
    'Pb(NO₃)₂(aq) + 2HCl(aq) → PbCl₂(s) + 2HNO₃(aq)'
  ]],
  ['b', 'KNO₃(s)', 'titration-salts', 3, ['HNO₃(aq) + KOH(aq) → KNO₃(aq) + H₂O(l)']],
  ['c', 'CaSO₄(s)', 'precipitation', 1, [
    'CaCl₂(aq) + H₂SO₄(aq) → CaSO₄(s) + 2HCl(aq)',
    'Ca(NO₃)₂(aq) + Na₂SO₄(aq) → CaSO₄(s) + 2NaNO₃(aq)',
    'CaCl₂(aq) + MgSO₄(aq) → CaSO₄(s) + MgCl₂(aq)'
  ]],
  ['d', 'ZnCl₂(s)', 'excess-solid', 2, [
    'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)',
    'ZnO(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l)',
    'Zn(OH)₂(s) + 2HCl(aq) → ZnCl₂(aq) + 2H₂O(l)',
    'ZnCO₃(s) + 2HCl(aq) → ZnCl₂(aq) + H₂O(l) + CO₂(g)'
  ]],
  ['e', 'CuCO₃(s)', 'precipitation', 1, [
    'Cu(NO₃)₂(aq) + Na₂CO₃(aq) → CuCO₃(s) + 2NaNO₃(aq)',
    'CuCl₂(aq) + K₂CO₃(aq) → CuCO₃(s) + 2KCl(aq)',
    'CuSO₄(aq) + K₂CO₃(aq) → CuCO₃(s) + K₂SO₄(aq)'
  ]],
  ['f', 'FeCl₂(s)', 'excess-solid', 2, [
    'Fe(s) + 2HCl(aq) → FeCl₂(aq) + H₂(g)',
    'FeO(s) + 2HCl(aq) → FeCl₂(aq) + H₂O(l)',
    'Fe(OH)₂(s) + 2HCl(aq) → FeCl₂(aq) + 2H₂O(l)',
    'FeCO₃(s) + 2HCl(aq) → FeCl₂(aq) + H₂O(l) + CO₂(g)'
  ]],
  ['g', 'NH₄NO₃(s)', 'titration-salts', 3, ['HNO₃(aq) + NH₃(aq) → NH₄NO₃(aq)']],
  ['h', 'CuCl₂(s)', 'excess-solid', 2, [
    'CuO(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l)',
    'Cu(OH)₂(s) + 2HCl(aq) → CuCl₂(aq) + 2H₂O(l)',
    'CuCO₃(s) + 2HCl(aq) → CuCl₂(aq) + H₂O(l) + CO₂(g)'
  ]],
  ['i', 'Na₃PO₄(s)', 'titration-salts', 3, ['H₃PO₄(aq) + 3NaOH(aq) → Na₃PO₄(aq) + 3H₂O(l)']],
  ['j', 'KH₂PO₄(s)', 'titration-salts', 3, ['H₃PO₄(aq) + KOH(aq) → KH₂PO₄(aq) + H₂O(l)']],
  ['k', 'PbSO₄(s)', 'precipitation', 1, [
    'Pb(NO₃)₂(aq) + K₂SO₄(aq) → PbSO₄(s) + 2KNO₃(aq)',
    'Pb(NO₃)₂(aq) + H₂SO₄(aq) → PbSO₄(s) + 2HNO₃(aq)'
  ]]
];
const methodNames = {
  1: pair('類型 1：沉澱法。混合可溶試劑的水溶液，過濾、洗滌及乾燥沉澱。', 'Type 1: precipitation. Mix aqueous soluble reagents, then filter, wash and dry the precipitate.'),
  2: pair('類型 2：過量固體法。反應後濾去剩餘固體，濃縮濾液、冷卻結晶，少量冷水洗滌及乾燥。', 'Type 2: excess-solid method. Filter off excess solid, concentrate the filtrate, cool to crystallise, wash with a little cold water and dry.'),
  3: pair('類型 3：酸鹼精確中和。用所需摩爾比或滴定決定體積，不加指示劑重做，濃縮、冷卻結晶及乾燥。', 'Type 3: exact acid–base neutralisation. Use the required mole ratio or determine volumes by titration, repeat without indicator, concentrate, cool to crystallise and dry.')
};
const saltQuestions = saltCases.map(([letter, salt, lesson, type, equations]) => {
  const method = methodNames[type];
  const correction = letter === 'e' ? pair('課程以 CuCO₃ 表示沉澱；實際水溶液製備常形成鹼式碳酸銅，這是簡化模型。', 'The curriculum represents the precipitate as CuCO₃; aqueous preparation commonly gives basic copper carbonate, so this is a simplified model.') : pair('', '');
  return make(77, 'Exercise 1 (' + letter + ')', lesson, 'equation',
    pair('將 ' + salt + ' 分類為類型 1、2 或 3，並提出製備反應。類型 1 = 沉澱法；2 = 過量固體法；3 = 酸鹼精確中和。', 'Classify ' + salt + ' as type 1, 2 or 3 and suggest a preparation reaction. Type 1 = precipitation; 2 = excess solid; 3 = exact acid–base neutralisation.'),
    pair(method[0] + '\n可接受的反應例子：\n' + equations.join('\n') + (correction[0] ? '\n' + correction[0] : ''), method[1] + '\nAcceptable example reactions:\n' + equations.join('\n') + (correction[1] ? '\n' + correction[1] : '')),
    { hint: pair('先判斷產物溶解性，再檢查陽離子是否 Na⁺、K⁺ 或 NH₄⁺。', 'Check product solubility, then whether its cation is Na⁺, K⁺ or NH₄⁺.'),
      steps: [pair('用溶解性選方法，再選供應所需陰、陽離子的試劑。', 'Choose the method from solubility, then select reagents supplying the required ions.'), method, pair('核對方程式原子數及狀態符號。', 'Check atom balance and state symbols.')],
      advanced: letter === 'i' || letter === 'j'
    });
});
export const lateQuestions = [...coreQuestions, ...saltQuestions];
