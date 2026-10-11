// Original question inventory, visually checked against PDF pages 1–39.
const pair = (zh, en) => [zh, en];
const source = (pdfPage, label) => ({pdfPage, printedPage:pdfPage - 1, label});
const equationQuestion = (page, label, suffix, zh, en, full, ionic, options = {}) => ({
  id:`orig-p${String(page).padStart(2,'0')}-${suffix}`, lesson:options.lesson || 'ionic-equations',
  source:source(page,label),category:'equation',advanced:options.advanced || false,
  prompt:pair(`${zh} ${options.ionicOnly ? `已知完整方程式：${full}。寫出此反應的離子方程式。` : '寫出此反應的完整化學方程式及離子方程式。'}`,`${en} ${options.ionicOnly ? `Given the full equation: ${full}. Write down the ionic equation for this reaction.` : 'Write both the full chemical equation and ionic equation for this reaction.'}`),
  hint:pair('先判斷產物和溶解性；固體、液體、氣體及弱電解質不可直接拆成離子。','Identify the products and solubility first. Do not split solids, liquids, gases or weak electrolytes into ions.'),
  steps:[pair('配平完整方程式，並標示物態。','Balance the full equation and add state symbols.'),pair('把水溶液中的強電解質拆成離子，刪去兩邊相同的旁觀離子。','Separate aqueous strong electrolytes into ions and cancel spectator ions.'),pair('檢查原子數及總電荷；用最簡整數比例。','Check atoms and total charge; use the simplest whole-number ratio.')],
  answer:pair(`${options.ionicOnly ? '' : '完整方程式：'+full+'\n'}離子方程式：${ionic}`,`${options.ionicOnly ? '' : 'Full equation: '+full+'\n'}Ionic equation: ${ionic}`),
});

const carbonateExamples = [
  equationQuestion(9,'Examples / Carbonate 1','carbonate-1','Na₂CO₃(aq) 與 HCl(aq) 反應。','Na₂CO₃(aq) reacts with HCl(aq).','Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + CO₂(g)','CO₃²⁻(aq) + 2H⁺(aq) → H₂O(l) + CO₂(g)',{ionicOnly:true}),
  equationQuestion(9,'Examples / Carbonate 2','carbonate-2','(NH₄)₂CO₃(aq) 與 HNO₃(aq) 反應。','(NH₄)₂CO₃(aq) reacts with HNO₃(aq).','(NH₄)₂CO₃(aq) + 2HNO₃(aq) → 2NH₄NO₃(aq) + H₂O(l) + CO₂(g)','CO₃²⁻(aq) + 2H⁺(aq) → H₂O(l) + CO₂(g)',{ionicOnly:true}),
  equationQuestion(9,'Examples / Carbonate 3','carbonate-3','CaCO₃(s) 與 HCl(aq) 反應。','CaCO₃(s) reacts with HCl(aq).','CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + H₂O(l) + CO₂(g)','CaCO₃(s) + 2H⁺(aq) → Ca²⁺(aq) + H₂O(l) + CO₂(g)',{ionicOnly:true}),
  equationQuestion(9,'Examples / Carbonate 4','carbonate-4','BaCO₃(s) 與 H₂SO₄(aq) 反應。','BaCO₃(s) reacts with H₂SO₄(aq).','BaCO₃(s) + H₂SO₄(aq) → BaSO₄(s) + H₂O(l) + CO₂(g)','BaCO₃(s) + 2H⁺(aq) + SO₄²⁻(aq) → BaSO₄(s) + H₂O(l) + CO₂(g)',{ionicOnly:true}),
  equationQuestion(10,'Examples / Hydrogencarbonate 1','hydrogencarbonate-1','NaHCO₃(aq) 與 HCl(aq) 反應。','NaHCO₃(aq) reacts with HCl(aq).','NaHCO₃(aq) + HCl(aq) → NaCl(aq) + H₂O(l) + CO₂(g)','HCO₃⁻(aq) + H⁺(aq) → H₂O(l) + CO₂(g)',{ionicOnly:true}),
  equationQuestion(10,'Examples / Hydrogencarbonate 2','hydrogencarbonate-2','Ca(HCO₃)₂(aq) 與 HNO₃(aq) 反應。','Ca(HCO₃)₂(aq) reacts with HNO₃(aq).','Ca(HCO₃)₂(aq) + 2HNO₃(aq) → Ca(NO₃)₂(aq) + 2H₂O(l) + 2CO₂(g)','HCO₃⁻(aq) + H⁺(aq) → H₂O(l) + CO₂(g)',{ionicOnly:true}),
];
const acidExerciseRows = [
  [13,1,'硫酸鎂溶液與氫氧化鈉溶液混合。','A solution of magnesium sulphate is mixed with a solution of sodium hydroxide.','MgSO₄(aq) + 2NaOH(aq) → Mg(OH)₂(s) + Na₂SO₄(aq)','Mg²⁺(aq) + 2OH⁻(aq) → Mg(OH)₂(s)'],
  [13,2,'氯化鈣溶液與硫酸鉀溶液混合。','A solution of calcium chloride is mixed with a solution of potassium sulphate.','CaCl₂(aq) + K₂SO₄(aq) → CaSO₄(s) + 2KCl(aq)','Ca²⁺(aq) + SO₄²⁻(aq) → CaSO₄(s)'],
  [13,3,'硝酸鈣溶液與磷酸鈉溶液混合。','A solution of calcium nitrate is mixed with a solution of sodium phosphate.','3Ca(NO₃)₂(aq) + 2Na₃PO₄(aq) → Ca₃(PO₄)₂(s) + 6NaNO₃(aq)','3Ca²⁺(aq) + 2PO₄³⁻(aq) → Ca₃(PO₄)₂(s)'],
  [13,4,'把一塊鋅放進氯化銅(II)溶液。','A piece of zinc is put into a solution of copper(II) chloride.','Zn(s) + CuCl₂(aq) → ZnCl₂(aq) + Cu(s)','Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s)'],
  [13,5,'把一塊鋅放進盛有鹽酸的燒杯。','A piece of zinc is put into a beaker of hydrochloric acid.','Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)','Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g)'],
  [13,6,'在空氣中加熱一塊銅。','A piece of copper is heated in air.','2Cu(s) + O₂(g) → 2CuO(s)','沒有水溶液中的離子參與；完整方程式已描述反應。 / No aqueous ions are involved; the full equation describes the reaction.'],
  [14,7,'氫氧化鈉溶液與硫酸混合。','A solution of sodium hydroxide is mixed with sulphuric acid.','2NaOH(aq) + H₂SO₄(aq) → Na₂SO₄(aq) + 2H₂O(l)','H⁺(aq) + OH⁻(aq) → H₂O(l)'],
  [14,8,'氫氧化鈣溶液與鹽酸混合。','A solution of calcium hydroxide is mixed with hydrochloric acid.','Ca(OH)₂(aq) + 2HCl(aq) → CaCl₂(aq) + 2H₂O(l)','H⁺(aq) + OH⁻(aq) → H₂O(l)'],
  [14,9,'把固體碳酸鉛(II)加入硫酸。','Solid lead(II) carbonate is added to sulphuric acid.','PbCO₃(s) + H₂SO₄(aq) → PbSO₄(s) + CO₂(g) + H₂O(l)','PbCO₃(s) + 2H⁺(aq) + SO₄²⁻(aq) → PbSO₄(s) + CO₂(g) + H₂O(l)'],
  [14,10,'氫氧化鈉溶液與乙酸混合。','A solution of sodium hydroxide is mixed with ethanoic acid.','NaOH(aq) + CH₃COOH(aq) → CH₃COONa(aq) + H₂O(l)','OH⁻(aq) + CH₃COOH(aq) → CH₃COO⁻(aq) + H₂O(l)'],
  [14,11,'氨溶液與鹽酸混合。','A solution of ammonia is mixed with hydrochloric acid.','NH₃(aq) + HCl(aq) → NH₄Cl(aq)','NH₃(aq) + H⁺(aq) → NH₄⁺(aq)'],
  [14,12,'氨溶液與硫酸混合。','A solution of ammonia is mixed with sulphuric acid.','2NH₃(aq) + H₂SO₄(aq) → (NH₄)₂SO₄(aq)','NH₃(aq) + H⁺(aq) → NH₄⁺(aq)'],
  [14,13,'氨溶液與乙酸混合。','A solution of ammonia is mixed with ethanoic acid.','NH₃(aq) + CH₃COOH(aq) → CH₃COONH₄(aq)','NH₃(aq) + CH₃COOH(aq) ⇌ NH₄⁺(aq) + CH₃COO⁻(aq)'],
  [15,14,'碳酸鈉溶液與鹽酸混合。','A solution of sodium carbonate is mixed with hydrochloric acid.','Na₂CO₃(aq) + 2HCl(aq) → 2NaCl(aq) + CO₂(g) + H₂O(l)','CO₃²⁻(aq) + 2H⁺(aq) → CO₂(g) + H₂O(l)'],
  [15,15,'把固體碳酸鈉加入鹽酸。','Solid sodium carbonate is added to hydrochloric acid.','Na₂CO₃(s) + 2HCl(aq) → 2NaCl(aq) + CO₂(g) + H₂O(l)','Na₂CO₃(s) + 2H⁺(aq) → 2Na⁺(aq) + CO₂(g) + H₂O(l)'],
  [15,16,'把固體碳酸鈣加入鹽酸。','Solid calcium carbonate is added to hydrochloric acid.','CaCO₃(s) + 2HCl(aq) → CaCl₂(aq) + CO₂(g) + H₂O(l)','CaCO₃(s) + 2H⁺(aq) → Ca²⁺(aq) + CO₂(g) + H₂O(l)'],
  [15,17,'把固體碳酸鋇放進硫酸溶液。','Solid barium carbonate is put into a solution of sulphuric acid.','BaCO₃(s) + H₂SO₄(aq) → BaSO₄(s) + CO₂(g) + H₂O(l)','BaCO₃(s) + 2H⁺(aq) + SO₄²⁻(aq) → BaSO₄(s) + CO₂(g) + H₂O(l)'],
  [15,18,'亞硫酸鈉溶液與鹽酸混合。','A solution of sodium sulphite is mixed with hydrochloric acid.','Na₂SO₃(aq) + 2HCl(aq) → 2NaCl(aq) + SO₂(g) + H₂O(l)','SO₃²⁻(aq) + 2H⁺(aq) → SO₂(g) + H₂O(l)'],
  [15,19,'把固體亞硫酸鈣加入鹽酸。','Solid calcium sulphite is added to hydrochloric acid.','CaSO₃(s) + 2HCl(aq) → CaCl₂(aq) + SO₂(g) + H₂O(l)','CaSO₃(s) + 2H⁺(aq) → Ca²⁺(aq) + SO₂(g) + H₂O(l)'],
];
const acidExercises = acidExerciseRows.map(([page,n,zh,en,full,ionic])=>equationQuestion(page,`Exercise (ionic equations) / Q${n}`,`acid-exercise-${n}`,zh,en,full,ionic,{advanced:n===6 || n>=18}));

const basicityRows = [
  ['HClO₃',1,'只有一個可電離的氫。','There is one ionisable hydrogen.'],
  ['HClO₄',1,'只有一個可電離的氫。','There is one ionisable hydrogen.'],
  ['H₂C₂O₄',2,'乙二酸有兩個 –COOH 基。','Ethanedioic acid has two –COOH groups.'],
  ['HBr',1,'只有一個可電離的氫。','There is one ionisable hydrogen.'],
  ['(COOH)₂',2,'有兩個 –COOH 基；與第 3 題是同一種酸。','There are two –COOH groups; this is the same acid as Q3.'],
  ['CH₃CH₂OH',0,'乙醇不是本課水溶液定義下的酸；酒精基的氫不計作可電離酸性氫。','Ethanol is not an acid under the aqueous definition used here; its alcohol hydrogen is not counted as an ionisable acidic hydrogen.'],
  ['CH₃CH₂COOH',1,'一個 –COOH 基；C–H 的氫不計算。','There is one –COOH group; C–H hydrogens are not counted.'],
  ['HOOC–CH₂CH₂–COOH',2,'有兩個 –COOH 基。','There are two –COOH groups.'],
  ['HOOC–CH₂CH₂–OH',1,'只有一個 –COOH 基；末端酒精基 –OH 不增加鹽基度。','There is one –COOH group; the terminal alcohol –OH does not add to basicity.'],
  ['HOOC–CH₂–C(OH)(COOH)–CH₂–COOH',3,'檸檬酸有三個 –COOH 基；中央酒精基 –OH 不增加鹽基度。','Citric acid has three –COOH groups; the central alcohol –OH does not add to basicity.'],
];
const citricDiagram='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 220" role="img" aria-label="Citric acid structural formula"><g fill="none" stroke="currentColor" stroke-width="2"><path d="M170 57V91M170 123V161M192 45H259M190 107H259M192 179H259M103 107H148"/></g><g fill="currentColor" font-family="sans-serif" font-size="22"><text x="147" y="52">CH₂</text><text x="161" y="115">C</text><text x="147" y="187">CH₂</text><text x="266" y="52">COOH</text><text x="266" y="115">COOH</text><text x="266" y="187">COOH</text><text x="58" y="115">HO</text></g></svg>';
const basicityQuestions = basicityRows.map(([formula,n,zh,en],index)=>({
  id:`orig-p24-basicity-${index+1}`,lesson:'basicity',source:source(24,`Basicity / Q${index+1}`),category:'concept',advanced:false,
  prompt:pair(`以下物質的鹽基度是多少？${formula}`,`What is the basicity of the following substance? ${formula}`),
  ...(index===9 ? {diagram:citricDiagram} : {}),
  hint:pair('數可電離的酸性氫，不要把分子內所有氫都算進去。','Count ionisable acidic hydrogens, not all hydrogens in the molecule.'),
  steps:[pair('辨認 –COOH 基或其他可電離的氫。','Identify –COOH groups or other ionisable hydrogens.'),pair(zh,en)],
  answer:pair(`${n===0 ? '不屬於本課的酸，鹽基度按此題記作 0。' : `鹽基度 = ${n}。`} ${zh}`,`${n===0 ? 'Not an acid in this course context; record basicity as 0 for this question.' : `Basicity = ${n}.`} ${en}`),
}));

const mc = (page,n,lesson,zh,en,choices,answerZh,answerEn,hintZh,hintEn,advanced=false)=>({
  id:`orig-p${page}-exam-${n}`,lesson,source:source(page,`Exam-type questions / Q${n}`),category:lesson==='water' ? 'concept' : 'experiment',advanced,
  prompt:pair(zh,en),choices,hint:pair(hintZh,hintEn),steps:[pair(hintZh,hintEn),pair('逐一比較選項的條件和產物。','Compare the conditions and products in each option.')],answer:pair(answerZh,answerEn),
});
const examQuestions=[
  mc(25,1,'water','固體檸檬酸不會把乾燥藍色石蕊試紙變紅，原因是甚麼？','Citric acid solid does not turn dry blue litmus paper red because',[
    pair('A. 檸檬酸是共價化合物。','A. Citric acid is a covalent compound.'),pair('B. 檸檬酸是弱酸。','B. Citric acid is a weak acid.'),pair('C. 沒有水時，不會形成氫離子。','C. Hydrogen ions are not formed when there is no water.'),pair('D. 沒有水時，不會形成氫原子。','D. Hydrogen atoms are not formed when there is no water.')
  ],'C。酸需要在水中電離產生 H⁺(aq)，才會在這個測試中顯示酸性。','C. An acid needs to ionise in water to form H⁺(aq) to show acidity in this test.','石蕊測試的關鍵是水溶液中的 H⁺，不是氫原子。','The key is H⁺ in aqueous solution, not hydrogen atoms.'),
  mc(25,2,'water','圖示把水滴到鋅粉與可溶於水的乙二酸粉末混合物中，產生無色氣體。以下哪個敘述正確？','In the experimental set-up, water is dropped onto a mixture of zinc powder and water-soluble oxalic acid powder. A colourless gas is given out. Which statement is correct?',[
    pair('A. 乙二酸在水中電離，產生氫離子。','A. Oxalic acid ionises in water to give hydrogen ions.'),pair('B. 鋅在水中電離，產生鋅離子。','B. Zinc ionises in water to give zinc ions.'),pair('C. 水與乙二酸反應，產生該無色氣體。','C. Water reacts with oxalic acid to give the colourless gas.'),pair('D. 水與鋅反應，產生該無色氣體。','D. Water reacts with zinc to give the colourless gas.')
  ],'A。水讓乙二酸電離；H⁺ 與鋅反應產生 H₂。離子反應：Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g)。','A. Water allows oxalic acid to ionise; H⁺ reacts with zinc to form H₂. Ionic reaction: Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g).','先辨認無色氣體及水的作用。','Identify the colourless gas and the role of water.'),
  mc(25,3,'water','以下哪種氧化物加入水後會形成酸性溶液？','Which oxide would form an acidic solution when added to water?',[
    pair('A. 二氧化碳','A. carbon dioxide'),pair('B. 二氧化矽','B. silicon dioxide'),pair('C. 氧化鋁','C. aluminium oxide'),pair('D. 氧化鋰','D. lithium oxide')
  ],'A。CO₂ 與水形成碳酸，產生 H⁺；SiO₂ 不與水形成酸性溶液，Al₂O₃ 不溶於水，Li₂O 與水形成 LiOH 鹼性溶液。','A. CO₂ forms carbonic acid in water and produces H⁺. SiO₂ does not form an acidic solution with water; Al₂O₃ is insoluble in water; Li₂O forms an alkaline LiOH solution.','酸性氧化物不一定能溶於水或與水反應。','An acidic oxide does not necessarily dissolve or react with water.'),
  mc(26,4,'neutralisation','考慮以下反應：(1) CO₂(g) + CaO(s) → CaCO₃(s)；(2) NH₃(g) + HBr(g) → NH₄Br(s)；(3) HF(aq) + NaOH(aq) → NaF(aq) + H₂O(l)；(4) NaHCO₃(aq) + HCl(aq) → NaCl(aq) + CO₂(g) + H₂O(l)。哪個是典型的中和反應？','Consider the reactions: (1) CO₂(g) + CaO(s) → CaCO₃(s); (2) NH₃(g) + HBr(g) → NH₄Br(s); (3) HF(aq) + NaOH(aq) → NaF(aq) + H₂O(l); (4) NaHCO₃(aq) + HCl(aq) → NaCl(aq) + CO₂(g) + H₂O(l). Which represents a typical neutralization reaction?',[
    pair('A. 反應 (1)','A. reaction (1)'),pair('B. 反應 (2)','B. reaction (2)'),pair('C. 反應 (3)','C. reaction (3)'),pair('D. 反應 (4)','D. reaction (4)')
  ],'C。反應 (3) 是水溶液中的酸與鹼生成鹽和水。HF 是弱酸，所以離子方程式為 HF(aq) + OH⁻(aq) → F⁻(aq) + H₂O(l)。','C. Reaction (3) is an aqueous acid–alkali reaction producing salt and water. HF is weak, so its ionic equation is HF(aq) + OH⁻(aq) → F⁻(aq) + H₂O(l).','留意「典型」水溶液中和反應及產物。','Look for a typical aqueous neutralisation and its products.'),
  mc(26,5,'acid-reactions','以下哪些方法可以區分石灰石粉末與食鹽？(1) 加水；(2) 進行焰色試驗；(3) 加稀鹽酸。','Which methods can distinguish limestone powder from table salt? (1) adding water; (2) performing a flame test; (3) adding dilute hydrochloric acid.',[
    pair('A. 只有 (1) 和 (2)','A. (1) and (2) only'),pair('B. 只有 (1) 和 (3)','B. (1) and (3) only'),pair('C. 只有 (2) 和 (3)','C. (2) and (3) only'),pair('D. (1)、(2) 和 (3)','D. (1), (2) and (3)')
  ],'D。NaCl 溶於水，CaCO₃ 不溶；鈉的焰色為金黃色，鈣為磚紅色；稀鹽酸使 CaCO₃ 產生 CO₂ 氣泡，但 NaCl 沒有這種反應。','D. NaCl dissolves in water but CaCO₃ does not. Sodium gives a golden-yellow flame; calcium gives brick red. Dilute HCl produces CO₂ bubbles with CaCO₃ but not NaCl.','比較溶解性、金屬焰色及碳酸鹽與酸的反應。','Compare solubility, metal flame colours and carbonate–acid reactions.',true),
  mc(26,6,'acid-reactions','以下關於石灰石的敘述哪些正確？(1) 焰色試驗中產生金黃色火焰；(2) 強烈加熱時產生無色氣體；(3) 在稀硫酸中溶解，形成澄清溶液。','Which statements about limestone are correct? (1) It gives a golden-yellow flame in a flame test. (2) It gives a colourless gas when heated strongly. (3) It dissolves in dilute sulphuric acid to give a clear solution.',[
    pair('A. 只有 (1)','A. (1) only'),pair('B. 只有 (2)','B. (2) only'),pair('C. 只有 (1) 和 (3)','C. (1) and (3) only'),pair('D. 只有 (2) 和 (3)','D. (2) and (3) only')
  ],'B。CaCO₃(s) → CaO(s) + CO₂(g)（強熱）。鈣的焰色是磚紅色；稀硫酸會形成微溶的 CaSO₄ 固體表層，不能讓石灰石完全溶解成澄清溶液。','B. CaCO₃(s) → CaO(s) + CO₂(g) on strong heating. Calcium gives a brick-red flame. Dilute sulphuric acid forms a sparingly soluble CaSO₄ coating, preventing complete dissolution to a clear solution.','硫酸鈣的溶解性會影響反應能否持續。','The solubility of calcium sulphate affects whether reaction continues.',true),
];
examQuestions[1].diagram='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 620 230" role="img" aria-label="Water dropped onto zinc and oxalic acid powder"><g stroke="currentColor" fill="none" stroke-width="2"><path d="M290 32V95Q290 104 300 104Q310 104 310 95V32Z"/><path d="M300 104V142"/><path d="M200 184Q300 224 400 184"/><path d="M317 52H420M210 176L110 116"/></g><g fill="currentColor"><path d="M300 149Q285 166 300 173Q315 166 300 149"/><circle cx="261" cy="191" r="4"/><circle cx="280" cy="196" r="4"/><circle cx="296" cy="192" r="4"/><circle cx="318" cy="198" r="4"/><circle cx="338" cy="191" r="4"/><g font-family="sans-serif" font-size="16"><text x="430" y="57">water</text><text x="12" y="88">zinc powder +</text><text x="12" y="110">water-soluble oxalic acid powder</text></g></g></svg>';

const trueFalseQuestions = [
  {id:'orig-p28-true-false-1',lesson:'everyday',source:source(28,'True / False / Q1'),category:'concept',advanced:false,prompt:pair('「鹽基一定含有金屬離子。」正確還是錯誤？','A base must contain a metal ion. True or false?'),choices:[pair('正確','True'),pair('錯誤','False')],hint:pair('想一想氨是否含有金屬。','Does ammonia contain a metal?'),steps:[pair('氨能與酸反應，是鹽基；但不含金屬離子。','Ammonia reacts with acids and is a base, but contains no metal ions.')],answer:pair('錯誤。NH₃ 是不含金屬離子的鹽基。','False. NH₃ is a base containing no metal ions.')},
  {id:'orig-p28-true-false-2',lesson:'everyday',source:source(28,'True / False / Q2'),category:'concept',advanced:false,prompt:pair('「Fe₂O₃ 是鹽基，但不是可溶性鹼。」正確還是錯誤？','Fe₂O₃ is a base but not an alkali. True or false?'),choices:[pair('正確','True'),pair('錯誤','False')],hint:pair('分開判斷與酸的反應及在水中的溶解性。','Separate reaction with acid from solubility in water.'),steps:[pair('Fe₂O₃ 與酸生成鹽和水，但不溶於水。','Fe₂O₃ reacts with acids to form salt and water, but is insoluble in water.')],answer:pair('正確。Fe₂O₃ 是不溶性鹽基，所以不是可溶性鹼。','True. Fe₂O₃ is an insoluble base, so it is not an alkali.')},
];

const alkaliExamples = [
  equationQuestion(33,'Examples / Hydroxide 1','hydroxide-1','MgCl₂(aq) 與 NaOH(aq) 反應。','MgCl₂(aq) reacts with NaOH(aq).','MgCl₂(aq) + 2NaOH(aq) → Mg(OH)₂(s) + 2NaCl(aq)','Mg²⁺(aq) + 2OH⁻(aq) → Mg(OH)₂(s)',{ionicOnly:true,lesson:'alkali-reactions'}),
  equationQuestion(33,'Examples / Hydroxide 2','hydroxide-2','Fe₂(SO₄)₃(aq) 與 KOH(aq) 反應。','Fe₂(SO₄)₃(aq) reacts with KOH(aq).','Fe₂(SO₄)₃(aq) + 6KOH(aq) → 2Fe(OH)₃(s) + 3K₂SO₄(aq)','Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s)',{ionicOnly:true,lesson:'alkali-reactions'}),
  equationQuestion(33,'Examples / Hydroxide 3','hydroxide-3','Cu(NO₃)₂(aq) 與 NaOH(aq) 反應。','Cu(NO₃)₂(aq) reacts with NaOH(aq).','Cu(NO₃)₂(aq) + 2NaOH(aq) → Cu(OH)₂(s) + 2NaNO₃(aq)','Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s)',{ionicOnly:true,lesson:'alkali-reactions'}),
  equationQuestion(33,'Examples / Hydroxide 4','hydroxide-4','AgNO₃(aq) 與 NaOH(aq) 反應。','AgNO₃(aq) reacts with NaOH(aq).','2AgNO₃(aq) + 2NaOH(aq) → Ag₂O(s) + 2NaNO₃(aq) + H₂O(l)','2Ag⁺(aq) + 2OH⁻(aq) → Ag₂O(s) + H₂O(l)',{ionicOnly:true,lesson:'alkali-reactions',advanced:true}),
  equationQuestion(34,'Exercise 1 / Q1','alkali-exercise-1','氯化鐵(II)溶液與氫氧化鈉溶液反應。','Iron(II) chloride solution reacts with sodium hydroxide solution.','FeCl₂(aq) + 2NaOH(aq) → Fe(OH)₂(s) + 2NaCl(aq)','Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s)',{lesson:'alkali-reactions'}),
  equationQuestion(34,'Exercise 1 / Q2','alkali-exercise-2','氯化鐵(II)溶液與氨溶液反應。','Iron(II) chloride solution reacts with ammonia solution.','FeCl₂(aq) + 2NH₃(aq) + 2H₂O(l) → Fe(OH)₂(s) + 2NH₄Cl(aq)','Fe²⁺(aq) + 2NH₃(aq) + 2H₂O(l) → Fe(OH)₂(s) + 2NH₄⁺(aq)',{lesson:'alkali-reactions'}),
];
const precipitationRows=[
 ['KCl(aq) + NaNO₃(aq)',null,'所有離子都留在溶液中。','All ions remain in solution.'],
 ['PbCO₃(s) + Ca(NO₃)₂(aq)',null,'PbCO₃ 本身是不溶固體；不會因此產生新的沉澱。','PbCO₃ is already an insoluble solid; no new precipitate is formed.'],
 ['NaCl(aq) + AgNO₃(aq)','AgCl(s)','Ag⁺ 與 Cl⁻ 形成不溶的氯化銀。','Ag⁺ and Cl⁻ form insoluble silver chloride.'],
 ['HCl(aq) + AgNO₃(aq)','AgCl(s)','鹽酸提供 Cl⁻，與 Ag⁺ 形成氯化銀。','Hydrochloric acid supplies Cl⁻, which forms silver chloride with Ag⁺.'],
 ['KOH(aq) + CuCl₂(aq)','Cu(OH)₂(s)','Cu²⁺ 與 OH⁻ 形成藍色沉澱。','Cu²⁺ and OH⁻ form a blue precipitate.'],
 ['NaOH(aq) + MgSO₄(aq)','Mg(OH)₂(s)','Mg²⁺ 與 OH⁻ 形成白色沉澱。','Mg²⁺ and OH⁻ form a white precipitate.'],
 ['NaOH(aq) + FeCl₃(aq)','Fe(OH)₃(s)','Fe³⁺ 與 OH⁻ 形成棕色沉澱。','Fe³⁺ and OH⁻ form a brown precipitate.'],
 ['NH₃(aq) + FeCl₃(aq)','Fe(OH)₃(s)','氨與水反應提供 OH⁻；形成棕色氫氧化鐵(III)。','Ammonia reacts with water to provide OH⁻; brown iron(III) hydroxide forms.'],
 ['NaOH(aq) + AgNO₃(aq)','Ag₂O(s)','AgOH 不穩定，產物為棕色氧化銀及水。','AgOH is unstable; the products are brown silver oxide and water.'],
 ['KOH(aq) + NaCl(aq)',null,'沒有不溶的產物；所有離子留在溶液。','There is no insoluble product; all ions remain in solution.'],
 ['K₂CO₃(aq) + CaCl₂(aq)','CaCO₃(s)','Ca²⁺ 與 CO₃²⁻ 形成白色沉澱。','Ca²⁺ and CO₃²⁻ form a white precipitate.'],
 ['Na₂CO₃(aq) + AgNO₃(aq)','Ag₂CO₃(s)','Ag⁺ 與 CO₃²⁻ 形成碳酸銀沉澱。','Ag⁺ and CO₃²⁻ form a silver carbonate precipitate.'],
];
const precipitationQuestions=precipitationRows.map(([reactants,product,zh,en],index)=>({
 id:`orig-p34-precipitation-${index+1}`,lesson:'precipitation',source:source(34,`Exercise 2 / Q${index+1}`),category:'concept',advanced:[1,8,11].includes(index),
 prompt:pair(`預測以下混合會否形成新的沉澱；若有，寫出沉澱的化學式。${reactants}`,`Predict whether a precipitate will be formed in the following case. If yes, write the chemical formula of the precipitate. ${reactants}`),
 hint:pair('使用溶解性表；留意題目原有的固體不算新生成的沉澱。','Use the solubility table; a solid initially present is not a newly formed precipitate.'),steps:[pair('辨認溶液中提供的離子及可能產物。','Identify ions supplied by the solutions and possible products.'),pair(zh,en)],
 answer:pair(`${product ? `有，${product}。` : '沒有新的沉澱。'} ${zh}`,`${product ? `Yes: ${product}.` : 'No new precipitate.'} ${en}`),
}));

export const earlyQuestions = [
 ...carbonateExamples,
 {id:'orig-p10-heating-bicarbonate',lesson:'acid-reactions',source:source(10,'Heating NaHCO₃ / Short question'),category:'equation',advanced:true,prompt:pair('加熱一份 NaHCO₃(s) 樣本時會形成甚麼？','What will be formed if you heat up a sample of NaHCO₃(s)?'),hint:pair('這是熱分解，不是與酸反應。','This is thermal decomposition, not reaction with an acid.'),steps:[pair('碳酸氫鈉分解為碳酸鈉、二氧化碳及水蒸氣。','Sodium hydrogencarbonate decomposes into sodium carbonate, carbon dioxide and water vapour.'),pair('配平 Na、H、C 及 O 原子。','Balance Na, H, C and O atoms.')],answer:pair('2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g) + H₂O(g)（加熱）。','2NaHCO₃(s) → Na₂CO₃(s) + CO₂(g) + H₂O(g) on heating.')},
 ...acidExercises,...basicityQuestions,...examQuestions,...trueFalseQuestions,
 {id:'orig-p31-magnesium-hydroxide-ph',lesson:'strength',source:source(31,'Mg(OH)₂ pH / Multiple choice'),category:'concept',advanced:false,prompt:pair('把一份 Mg(OH)₂(s) 樣本溶於水。已知 Mg(OH)₂(s) 極微溶於水，以下哪個 pH 值是原題預期的結果？','A sample of Mg(OH)₂(s) is dissolved in water. Given that Mg(OH)₂(s) is very slightly soluble in water, which of the following pH values would you expect for the resulting solution?'),choices:[pair('A. 4','A. 4'),pair('B. 7','B. 7'),pair('C. 8','C. 8'),pair('D. 13','D. 13')],hint:pair('溶解的部分提供 OH⁻，溶液是鹼性；但「微溶」不能單獨決定確切 pH。','The dissolved portion supplies OH⁻, making the solution alkaline; slight solubility alone cannot determine an exact pH.'),steps:[pair('排除酸性及中性的選項。','Exclude acidic and neutral choices.'),pair('要計算確切 pH，還需要溶解量、體積或溶度積等資料。','An exact pH requires the dissolved amount and volume, or solubility-product data.')],answer:pair('原題的定性預期答案是 C（8），表示弱鹼性。但資料不足以證明 pH 恰為 8；「極微溶」不等於弱鹼。Mg(OH)₂ 的溶解部分提供 Mg²⁺ 和 OH⁻。飽和溶液的 pH 也不必是 8，應按實際溶解平衡計算。','The intended qualitative answer is C (8), meaning mildly alkaline. However, the information does not justify an exact pH of 8. Very slight solubility does not mean a weak base: the dissolved portion provides Mg²⁺ and OH⁻. A saturated solution need not have pH 8; use the actual dissolution equilibrium to calculate it.')},
 {id:'orig-p32-ammonia-weak-alkali',lesson:'compare-strength',source:source(32,'Example / Weak ammonia'),category:'experiment',advanced:false,prompt:pair('用化學方程式輔助說明，為甚麼 NH₃(aq) 被視為弱鹼。建議一項實驗，顯示 NH₃(aq) 是比 NaOH(aq) 弱的鹼。','Explain, with the aid of a chemical equation, why NH₃(aq) is regarded as a weak alkali. Suggest how you would show that NH₃(aq) is a weaker alkali than NaOH(aq) through an experiment.'),hint:pair('比較相同濃度、相同溫度的溶液；選擇 pH 或導電性測量。','Compare solutions at the same concentration and temperature; choose pH or conductivity measurement.'),steps:[pair('寫出可逆電離方程式，指出氨僅部分電離。','Write the reversible ionisation equation and state that ammonia ionises only partially.'),pair('用 pH 計測量相同濃度、相同溫度的 NH₃(aq) 和 NaOH(aq)。','Use a pH meter to measure NH₃(aq) and NaOH(aq) at equal concentration and temperature.'),pair('氨溶液的 OH⁻ 濃度及 pH 較低。','The ammonia solution has lower OH⁻ concentration and pH.')],answer:pair('NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq)。氨在水中只部分電離。用已校準的 pH 計比較相同摩爾濃度、相同溫度的兩種溶液，NH₃(aq) 的 pH 較低。亦可用同一電導裝置及相同溫度、濃度比較；氨溶液導電性較低。若比較中和溫升，要控制酸、鹼的體積、濃度、初溫及保溫條件；氨的溫升較小。','NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq). Ammonia ionises only partially in water. Compare equal molar concentrations at the same temperature using a calibrated pH meter: NH₃(aq) has lower pH. Alternatively, use the same conductivity apparatus at equal concentration and temperature: ammonia has lower conductivity. For neutralisation temperature rises, control acid/base volumes, concentrations, initial temperatures and insulation; ammonia gives a smaller rise.'),keywords:[pair('部分電離','partial ionisation'),pair('相同濃度','same concentration'),pair('較低 pH','lower pH')]},
 ...alkaliExamples,...precipitationQuestions,
];
