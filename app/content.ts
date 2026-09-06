export const chapters=[['start','由這裏開始','Start here'],['elements','身邊的元素','Elements'],['formula','看懂化學式','Chemical formulae'],['classify','物質點樣分？','Classification'],['compare','三種物質比較','Compare matter'],['changes','性質與變化','Properties & changes'],['lab','實驗與安全','In the laboratory'],['review','重點溫習','Review']] as const;
export const formulae=[
 {id:'H2',formula:'H₂',zh:'氫氣',en:'Hydrogen',parts:[['H','氫',2]],atoms:2,element:true,sentence:'兩個氫原子連在一起，形成一個氫分子。'},
 {id:'N2',formula:'N₂',zh:'氮氣',en:'Nitrogen',parts:[['N','氮',2]],atoms:2,element:true,sentence:'兩個氮原子連在一起。空氣中最多的氣體是氮氣。'},
 {id:'O2',formula:'O₂',zh:'氧氣',en:'Oxygen',parts:[['O','氧',2]],atoms:2,element:true,sentence:'兩個氧原子連在一起，形成一個氧分子。'},
 {id:'H2O',formula:'H₂O',zh:'水',en:'Water',parts:[['H','氫',2],['O','氧',1]],atoms:3,element:false,sentence:'兩個氫原子與一個氧原子連在一起，形成一個水分子。'},
 {id:'CO2',formula:'CO₂',zh:'二氧化碳',en:'Carbon dioxide',parts:[['C','碳',1],['O','氧',2]],atoms:3,element:false,sentence:'一個碳原子與兩個氧原子連在一起，形成一個二氧化碳分子。'},
 {id:'Cl2',formula:'Cl₂',zh:'氯',en:'Chlorine',parts:[['Cl','氯',2]],atoms:2,element:true,sentence:'Cl 是一個元素符號。兩個氯原子連在一起，形成一個氯分子。'},
 {id:'I2',formula:'I₂',zh:'碘',en:'Iodine',parts:[['I','碘',2]],atoms:2,element:true,sentence:'兩個碘原子連在一起，形成一個碘分子。'}
];
export const elements=[
 {symbol:'Fe',name:'鐵',en:'Iron',metal:true,image:'steel-nails',use:'鐵用來製造鋼，鋼可做釘子、工具和建築材料。',caption:'鋼釘：鋼以鐵為主，也混有其他成分。'},
 {symbol:'Cu',name:'銅',en:'Copper',metal:true,image:'copper-wire',use:'銅容易讓電流通過，所以常用來做電線的金屬芯。',caption:'看露出來的銅線；外面的膠皮是另一種材料。'},
 {symbol:'Al',name:'鋁',en:'Aluminium',metal:true,image:'aluminium-foil',use:'鋁較輕，也可以壓成薄片，用來製作鋁箔和飲品罐。',caption:'鋁箔是生活中常見的鋁製品。'},
 {symbol:'Au',name:'金',en:'Gold',metal:true,image:'gold-ring',use:'金有光澤，不容易與很多物質反應，常用於首飾和電子接點。',caption:'金戒指：首飾也可能加入其他金屬。'},
 {symbol:'C',name:'碳',en:'Carbon',metal:false,image:'graphite-pencil',use:'石墨和鑽石都由碳組成。石墨可以用來製作鉛筆芯。',caption:'鉛筆芯含有石墨，也混有黏土等成分。'},
 {symbol:'O',name:'氧',en:'Oxygen',metal:false,image:'air-sky',use:'氧氣是空氣的一部分，供人和很多生物呼吸。',caption:'氧氣本身無色；天空圖片只用來聯想空氣。'}
];
export const allElements=[['H','Hydrogen','氫'],['He','Helium','氦'],['C','Carbon','碳'],['N','Nitrogen','氮'],['O','Oxygen','氧'],['Na','Sodium','鈉'],['Mg','Magnesium','鎂'],['Al','Aluminium','鋁'],['S','Sulphur','硫'],['Cl','Chlorine','氯'],['K','Potassium','鉀'],['Ca','Calcium','鈣'],['Fe','Iron','鐵'],['Cu','Copper','銅'],['Zn','Zinc','鋅'],['Pb','Lead','鉛'],['Ag','Silver','銀'],['Sn','Tin','錫'],['Au','Gold','金'],['Hg','Mercury','汞']];
export const samples=[
 {id:'soup',zh:'蘑菇湯',en:'Mushroom soup',image:'mushroom-soup',pure:false,why:'湯裏有水、蘑菇和其他食材，含有多種物質。',see:'水分子＋不同食物成分',legend:['H','O','food','fat','other']},
 {id:'muddy',zh:'泥水',en:'Muddy water',image:'muddy-water',pure:false,why:'水中混有泥土顆粒，並不是只有水。',see:'水分子＋泥土顆粒',legend:['H','O','mud']},
 {id:'milk',zh:'牛奶',en:'Milk',image:'milk',pure:false,why:'牛奶雖然看起來均勻，但含有水、脂肪、糖等多種物質。',see:'水分子＋脂肪小滴＋其他成分',legend:['H','O','fat','other']},
 {id:'water',zh:'蒸餾水',en:'Distilled water',image:'water',pure:true,why:'這題把蒸餾水看作純水：只有水這一種物質，全部都是 H₂O。',see:'全部都是水分子 H₂O',legend:['H','O']},
 {id:'air',zh:'空氣',en:'Air',image:'air-sky',pure:false,why:'空氣含有氮氣、氧氣和少量其他氣體。看不到，也可以是混合物。',see:'主要有 N₂、O₂，也有其他氣體',legend:['N','O','other']},
 {id:'hydrogen',zh:'氫氣',en:'Hydrogen',image:'',pure:true,why:'這題指純氫氣：只有氫氣這一種物質，全部都是 H₂。',see:'全部都是氫分子 H₂',legend:['H']},
 {id:'carbon',zh:'碳',en:'Carbon',image:'',pure:true,why:'這裏以純石墨為例：只有碳這一種元素，結構中全部都是 C 原子。',see:'全部都是碳原子 C',legend:['C']}
];
export const questions=[
 {q:'H₂ 有兩個原子，所以它是……',choices:['元素','化合物','混合物'],answer:0,why:'兩個原子都是氫。只有一種元素，所以氫氣是元素。'},
 {q:'一個 H₂O 分子總共有多少個原子？',choices:['1 個','2 個','3 個'],answer:2,why:'2 個 H ＋ 1 個 O ＝ 3 個原子。O 後面沒有小數字，代表 1。'},
 {q:'哪個是混合物？',choices:['純氫氣','牛奶','蒸餾水（純水）'],answer:1,why:'牛奶含有水、脂肪、糖等。看起來均勻，也可以是混合物。'},
 {q:'水沸騰變成水蒸氣後，分子是……',choices:['H₂ 和 O₂','H₂O','只有 O₂'],answer:1,why:'沸騰只是狀態改變，沒有形成新物質，水分子仍然是 H₂O。'},
 {q:'哪句描述化學性質？',choices:['銅可以導電','氧氣沒有顏色','鐵會生鏽'],answer:2,why:'鐵生鏽會形成新物質；導電性和顏色是物理性質。'},
 {q:'氧氣可以使哪種木條復燃？',choices:['帶餘燼的木條','濕木條','完全冷卻的木條'],answer:0,why:'帶餘燼的木條在氧氣中重新燃燒，是氧氣的測試。'},
 {q:'H₂ 和 O₂ 混在一起，就是水嗎？',choices:['是，因為有氫和氧','不是，還要發生化學反應'],answer:1,why:'混在一起時仍然是 H₂ 和 O₂。水裏的原子則組成 H₂O。'},
 {q:'哪一個元素符號寫法正確？',choices:['NA','na','Na'],answer:2,why:'第一個字母大寫，第二個字母（如有）小寫。Na 是鈉。'}
];
export const glossary=[['Chemistry','化學'],['Atom','原子'],['Molecule','分子'],['Chemical symbol','元素符號'],['Chemical formula','化學式'],['Matter','物質'],['Pure substance','純物質'],['Mixture','混合物'],['Element','元素'],['Compound','化合物'],['Physical property','物理性質'],['Chemical property','化學性質'],['Melting point','熔點'],['Boiling point','沸點'],['Hardness','硬度'],['Density','密度'],['Solubility','溶解度'],['Ductility','延性'],['Malleability','展性'],['Electrical conductivity','導電性'],['Heat conductivity','導熱性'],['Physical change','物理變化'],['Chemical change','化學變化'],['Gas','氣體'],['Solid','固體'],['Liquid','液體'],['Sublimation','昇華'],['Condensation','凝結'],['Freezing','凝固'],['Melting','熔化'],['Boiling','沸騰'],['Laboratory safety','實驗室安全'],['Hazard warning label','危險警告標籤'],['Harmful','有害'],['Irritant','刺激性'],['Corrosive','腐蝕性'],['Explosive','爆炸性'],['Flammable','易燃'],['Oxidizing','氧化性'],['Carcinogenic','致癌'],['Toxic','有毒'],['Glowing splint','帶餘燼的木條'],['Limewater','石灰水'],['Cobalt(II) chloride paper','氯化鈷(II)試紙'],['Copper(II) sulphate','硫酸銅(II)']];
