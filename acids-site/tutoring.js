const bilingual = (zh, en) => [zh, en];

export const notesRoute = [
  ['water', '酸性從何而來？', 'Where does acidity come from?'],
  ['alkali-reactions', 'Base 與 alkali', 'Bases and alkalis'],
  ['indicators', '指示劑與 pH', 'Indicators and pH'],
  ['strength', '強弱與濃度', 'Strength and concentration'],
  ['basicity', '酸的鹽基度', 'Basicity of acids'],
  ['acid-reactions', '酸鹼反應地圖', 'Acid and alkali reaction map'],
  ['ionic-equations', '離子方程式攻略', 'Writing ionic equations'],
  ['ion-tests', '沉澱與離子辨認', 'Precipitates and ion identification'],
  ['gas-lab', '氣體實驗', 'Gas experiments'],
  ['neutralisation', '中和與放熱', 'Neutralisation and heat'],
  ['salts', '認識鹽', 'Understanding salts'],
  ['salt-methods', '製鹽方法', 'Preparing salts'],
];

const concept = (prompt, points, answer, figure) => ({ kind: 'concept', prompt, points, answer, figure });
const method = (prompt, points, answer, figure) => ({ kind: 'method', prompt, points, answer, figure });

export const tutoring = {
  water: concept(
    bilingual('同樣溶入 HCl，為甚麼水溶液導電，而甲苯溶液在這個實驗中不導電？', 'Both solvents contain dissolved HCl. Why does the aqueous solution conduct electricity while the solution in methylbenzene does not in this experiment?'),
    [bilingual('水中粒子：HCl 電離，形成 H⁺(aq) 和 Cl⁻(aq)。', 'In water: HCl ionises to form H⁺(aq) and Cl⁻(aq).'), bilingual('導電原因：可移動離子傳送電荷。', 'Conduction: mobile ions carry charge.'), bilingual('甲苯中粒子：HCl 主要以分子存在，沒有足以導電的可移動離子。', 'In methylbenzene: HCl remains largely molecular, with no appreciable concentration of mobile ions.')],
    bilingual('HCl 在水中電離，形成可移動的 H⁺(aq) 和 Cl⁻(aq)，這些離子可傳送電荷。HCl 在甲苯中主要以分子存在，在本實驗下沒有可觀察的導電性。若題目問酸性，則指出水中的 H⁺(aq) 使藍色石蕊變紅。', 'HCl ionises in water to form mobile H⁺(aq) and Cl⁻(aq) ions that carry charge. In methylbenzene HCl remains largely molecular and does not conduct detectably. If asked about acidity, identify H⁺(aq) as the cause of blue litmus turning red.'),
    { file: 'hcl-particles.webp', page: 22, width: 511, height: 278, alt: bilingual('原筆記粒子圖：一杯有分開的 H⁺ 和 Cl⁻，另一杯有 HCl 分子。', 'Source particle diagram showing separate H⁺ and Cl⁻ in one beaker and HCl molecules in the other.') },
  ),
  'alkali-reactions': concept(
    bilingual('CuO 能和酸反應。為甚麼可把它分類為 base？它在水中又有甚麼限制？', 'CuO reacts with acid. Why is it a base, and what limits its behaviour in water?'),
    [bilingual('化學作用：CuO 與酸中和，生成鹽和水。', 'Acid reaction: CuO neutralises acid to form a salt and water.'), bilingual('分類條件：alkali 是能溶於水並在水中產生 OH⁻ 的 base。', 'Classification: an alkali is a water-soluble base that produces OH⁻ in water.')],
    bilingual('CuO 與酸中和，生成鹽和水，所以是 base。CuO 不溶於水，因此不是 alkali。', 'CuO neutralises acid to form a salt and water, so it is a base. It is insoluble in water, so it is not an alkali.'),
  ),
  indicators: concept(
    bilingual('在 pH 2 的無色溶液中加入甲基橙，寫出所得顏色。只見黃色時可作甚麼推論？', 'State the colour of methyl orange in a colourless solution at pH 2. What can you infer if the indicator is yellow?'),
    [bilingual('指出指示劑及條件：甲基橙在 pH 2 呈紅色。', 'Name the indicator and condition: methyl orange is red at pH 2.'), bilingual('按變色範圍判斷：黃色可出現在弱酸性、中性或鹼性溶液。', 'Use its transition range: yellow is possible in mildly acidic, neutral and alkaline solutions.')],
    bilingual('甲基橙在 pH 2 呈紅色。黃色只表示 pH 在甲基橙變色範圍以上，例如 pH 5 時亦呈黃色。', 'Methyl orange is red at pH 2. Yellow indicates a pH above its transition range. A solution at pH 5 is also yellow.'),
  ),
  strength: concept(
    bilingual('在相同溫度和摩爾濃度下，鹽酸和乙酸哪個 pH 較低？用粒子解釋。', 'At equal temperature and molar concentration, which has the lower pH, hydrochloric acid or ethanoic acid? Explain using particles.'),
    [bilingual('控制條件：相同摩爾濃度和溫度。', 'Control: same molar concentration and temperature.'), bilingual('化學原因：HCl 近乎完全電離，CH₃COOH 只部分電離。', 'Reason: HCl ionises essentially completely and CH₃COOH ionises partially.'), bilingual('可測結果：鹽酸的 H⁺(aq) 濃度較高，pH 較低。', 'Measurable result: hydrochloric acid has higher [H⁺(aq)] and lower pH.')],
    bilingual('在相同摩爾濃度和溫度下，HCl 近乎完全電離，CH₃COOH 只部分電離。鹽酸的 H⁺(aq) 濃度較高，因此 pH 較低。', 'At the same molar concentration and temperature, HCl ionises essentially completely while CH₃COOH ionises partially. Hydrochloric acid has the higher H⁺(aq) concentration and therefore the lower pH.'),
  ),
  basicity: concept(
    bilingual('CH₃COOH 有四個氫原子。為甚麼它是單元酸？', 'CH₃COOH contains four hydrogen atoms. Why is it a monobasic acid?'),
    [bilingual('在結構上指出 –COOH 的 H。', 'Identify the hydrogen in the –COOH group.'), bilingual('每個分子只有一個可電離的 H。', 'Only one hydrogen per molecule is ionisable.')],
    bilingual('CH₃COOH 中只有羧基 –COOH 上的氫可電離。每個分子在完全中和時可提供一個 H⁺，所以鹽基度為 1。', 'Only the hydrogen in the –COOH group is ionisable. Each molecule can supply one H⁺ on complete neutralisation, so its basicity is 1.'),
  ),
  'acid-reactions': concept(
    bilingual('將稀鹽酸加入大理石碎粒。描述現象，並說明如何鑑定氣體。', 'Add dilute hydrochloric acid to marble chips. Describe the observation and explain how to identify the gas.'),
    [bilingual('先寫可見現象：冒氣泡，固體逐漸溶解。', 'State the observations: effervescence and the solid gradually dissolves.'), bilingual('再寫測試及結果：把氣體通入石灰水，石灰水變奶白色。', 'Give the test and result: bubble the gas through limewater, which turns milky.')],
    bilingual('有無色氣泡產生，固體逐漸溶解。把氣體通入石灰水，石灰水變奶白色，支持該氣體是 CO₂。', 'A colourless gas is evolved and the solid gradually dissolves. The gas turns limewater milky, supporting its identification as CO₂.'),
  ),
  'ionic-equations': concept(
    bilingual('寫出稀鹽酸與 NaOH(aq) 反應的離子方程式。哪些離子可消去？', 'Write the ionic equation for dilute hydrochloric acid reacting with NaOH(aq). Which ions can be cancelled?'),
    [bilingual('拆開水溶液中的強電解質，保留 H₂O(l)。', 'Split the aqueous strong electrolytes. Keep H₂O(l) intact.'), bilingual('消去反應前後相同的 Na⁺(aq) 和 Cl⁻(aq)。', 'Cancel Na⁺(aq) and Cl⁻(aq), which are unchanged.'), bilingual('核對兩邊的原子數和總電荷。', 'Check atom counts and total charge on both sides.')],
    bilingual('Na⁺(aq) 和 Cl⁻(aq) 是旁觀離子。H⁺(aq) + OH⁻(aq) → H₂O(l)。', 'Na⁺(aq) and Cl⁻(aq) are spectator ions. H⁺(aq) + OH⁻(aq) → H₂O(l).'),
  ),
  'ion-tests': method(
    bilingual('用氨水測試 Cu²⁺(aq)。按加少量及加至過量的次序，寫出操作與現象。', 'Test Cu²⁺(aq) with aqueous ammonia. Give the steps and observations for a little reagent followed by excess.'),
    [bilingual('少量氨水 → 形成藍色沉澱。', 'A little aqueous ammonia → a blue precipitate forms.'), bilingual('過量氨水 → 沉澱溶解，形成深藍色溶液。', 'Excess aqueous ammonia → the precipitate dissolves to give a deep blue solution.')],
    bilingual('先加入少量氨水，觀察到藍色沉澱。再加入過量氨水，沉澱溶解，形成深藍色溶液。', 'Add a little aqueous ammonia. A blue precipitate forms. Add excess aqueous ammonia. The precipitate dissolves to give a deep blue solution.'),
  ),
  'gas-lab': method(
    bilingual('選一種收集氨氣的方法，並以氣體性質解釋。', 'Choose a collection method for ammonia and explain it using the properties of the gas.'),
    [bilingual('裝置：倒置集氣瓶，讓氨氣把空氣向下排出。', 'Apparatus: an inverted gas jar, so ammonia displaces air downwards.'), bilingual('原因：NH₃ 比空氣密度低，而且極易溶於水。', 'Reasons: NH₃ is less dense than air and highly soluble in water.')],
    bilingual('用倒置集氣瓶，以向下排空氣法收集。NH₃ 比空氣密度低，並會大量溶於水，因此排水集氣不合適。', 'Collect ammonia in an inverted gas jar by downward displacement of air. It is less dense than air and highly soluble in water, so collection over water is unsuitable.'),
  ),
  neutralisation: concept(
    bilingual('兩次強酸強鹼中和放出相同熱量。假設熱損失及比熱容相同，哪次混合液的溫升較大？', 'Two strong-acid/strong-alkali reactions release equal amounts of heat. Assuming the same heat loss and specific heat capacity, which mixture has the greater temperature rise?'),
    [bilingual('用 q = mcΔT 連結放熱與溫升。', 'Relate heat and temperature rise using q = mcΔT.'), bilingual('相同吸收熱量下，質量較小的混合液溫升較大。', 'For equal absorbed heat, the mixture with the smaller mass heats up more.')],
    bilingual('若吸收熱量和比熱容相同，ΔT = q/(mc)。混合液質量較小的一次有較大的溫升。', 'If absorbed heat and specific heat capacity are equal, ΔT = q/(mc). The mixture with the smaller mass has the greater temperature rise.'),
  ),
  salts: concept(
    bilingual('NaHCO₃ 是甚麼類型的鹽？它的水溶液呈甚麼酸鹼性？', 'What type of salt is NaHCO₃ and what is the acid–base character of its aqueous solution?'),
    [bilingual('分類看 HCO₃⁻ 所保留的可電離氫。', 'Classify using the ionisable hydrogen retained in HCO₃⁻.'), bilingual('另行指出其水溶液呈弱鹼性。', 'Separately state that its solution is mildly alkaline.')],
    bilingual('NaHCO₃ 是酸式鹽，HCO₃⁻ 仍有可電離的氫。NaHCO₃ 的水溶液呈弱鹼性。', 'NaHCO₃ is an acid salt because HCO₃⁻ retains an ionisable hydrogen. Its aqueous solution is mildly alkaline.'),
  ),
  'salt-methods': method(
    bilingual('用 HCl(aq) 及 KOH(aq) 製備純淨 KCl 晶體。如何避免指示劑或過量試劑留在產物？', 'Prepare pure KCl crystals from HCl(aq) and KOH(aq). How do you keep indicator and excess reagent out of the product?'),
    [bilingual('先滴定至終點並記錄兩種試劑的體積 → 找出剛好反應的用量。', 'Find and record the reacting volumes by titrating to the endpoint.'), bilingual('用相同體積重新混合，省去指示劑 → 避免它污染晶體。', 'Repeat with the same volumes without indicator → prevent contamination.'), bilingual('加熱蒸去部分水，再冷卻 → 讓晶體析出。', 'Evaporate some water, then cool → form crystals.'), bilingual('過濾、用少量冷蒸餾水洗並乾燥 → 收集晶體，減少產物溶失。', 'Filter, wash with a little cold distilled water and dry → collect the crystals and limit product loss.')],
    bilingual('以移液管量取 KOH(aq) 至錐形瓶，加入酚酞。用滴定管加入 HCl(aq)，至粉紅色剛消失，記錄所需體積。另取相同體積的兩種試劑，不加指示劑混合。加熱蒸去部分水，冷卻結晶。過濾，以少量冷蒸餾水洗滌並乾燥。', 'Pipette KOH(aq) into a conical flask and add phenolphthalein. Add HCl(aq) from a burette until the pink colour just disappears and record the volume used. Mix fresh portions of the same volumes without indicator. Evaporate some water, cool to crystallise, filter, wash with a little cold distilled water and dry.'),
    { file: 'kcl-titration.webp', page: 75, width: 465, height: 385, alt: bilingual('原筆記裝置圖：滴定管盛載 HCl，錐形瓶盛載 KOH。', 'Source apparatus diagram showing HCl in the burette and KOH in the conical flask.') },
  ),
  precipitation: method(
    bilingual('用 AgNO₃(aq) 與 NaCl(aq) 製備純淨 AgCl。指出過濾後要保留哪一部分。', 'Prepare pure AgCl from AgNO₃(aq) and NaCl(aq). State which part to keep after filtration.'),
    [bilingual('兩種可溶試劑提供 Ag⁺ 和 Cl⁻。', 'Two soluble reagents supply Ag⁺ and Cl⁻.'), bilingual('過濾收集留在濾紙上的沉澱。', 'Filter and retain the precipitate on the filter paper.'), bilingual('用蒸餾水洗去可溶雜質，再乾燥沉澱。', 'Wash with distilled water to remove soluble impurities and dry the precipitate.')],
    bilingual('混合兩種溶液，過濾收集 AgCl 沉澱。用蒸餾水洗去可溶雜質，包括殘留的 NaNO₃，再適當乾燥。', 'Mix the solutions and filter to collect the AgCl precipitate. Wash it with distilled water to remove soluble impurities, including residual NaNO₃, then dry it appropriately.'),
  ),
  'excess-solid': method(
    bilingual('從 CuO 和稀硫酸製備 CuSO₄ 晶體。解釋第一次過濾的目的。', 'Prepare CuSO₄ crystals from CuO and dilute sulphuric acid. Explain the purpose of the first filtration.'),
    [bilingual('加入過量的 CuO，確保酸全部反應。', 'Add excess CuO to ensure all the acid reacts.'), bilingual('濾走未反應的 CuO，保留含目標鹽的濾液。', 'Filter off unreacted CuO and retain the filtrate containing the desired salt.'), bilingual('蒸發部分水，冷卻，過濾收集晶體。', 'Evaporate some water, cool and filter to collect crystals.')],
    bilingual('向稀硫酸加入過量 CuO，讓酸完全反應。過濾除去未反應的固體，保留含 CuSO₄ 的濾液。把濾液濃縮，冷卻結晶，再過濾、洗滌和乾燥。', 'Add excess CuO to dilute sulphuric acid so that all the acid reacts. Filter off the unreacted solid and retain the CuSO₄ filtrate. Concentrate the filtrate, cool to crystallise, then filter, wash and dry the crystals.'),
  ),
  'titration-salts': method(
    bilingual('滴定已找出酸和鹼的用量。寫出之後製取純淨晶體的步驟。', 'Titration has established the acid and alkali volumes. Describe the remaining steps to obtain pure crystals.'),
    [bilingual('使用相同體積重新反應，避開可溶指示劑。', 'Repeat with the same volumes without indicator.'), bilingual('蒸發部分水，再冷卻使晶體析出。', 'Evaporate some water, then cool to crystallise.'), bilingual('過濾、用少量冷蒸餾水洗並乾燥。', 'Filter, wash with a little cold distilled water and dry.')],
    bilingual('用相同體積的酸和鹼重新反應，省去指示劑。加熱蒸去部分水，冷卻結晶，過濾收集晶體，再用少量冷蒸餾水洗滌及乾燥。', 'React fresh portions of the same acid and alkali volumes without indicator. Evaporate some water, cool to crystallise, filter, wash with a little cold distilled water and dry.'),
  ),
};
