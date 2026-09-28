// Teaching data and pure chemistry helpers shared by Units 5 and 6.
export const elements = [
  ['H','氫','Hydrogen',1],['He','氦','Helium',2],['Li','鋰','Lithium',3],['Be','鈹','Beryllium',4],['B','硼','Boron',5],['C','碳','Carbon',6],['N','氮','Nitrogen',7],['O','氧','Oxygen',8],['F','氟','Fluorine',9],['Ne','氖','Neon',10],['Na','鈉','Sodium',11],['Mg','鎂','Magnesium',12],['Al','鋁','Aluminium',13],['Si','矽','Silicon',14],['P','磷','Phosphorus',15],['S','硫','Sulphur',16],['Cl','氯','Chlorine',17],['Ar','氬','Argon',18],['K','鉀','Potassium',19],['Ca','鈣','Calcium',20],
].map(([symbol,zh,en,z])=>({symbol,name:[zh,en],z}));
export function shells(electrons){const result=[];for(const capacity of [2,8,8,2]){if(!electrons)break;const n=Math.min(electrons,capacity);result.push(n);electrons-=n;}return result;}
export const simpleIons = [['Li',1],['Na',1],['K',1],['Be',2],['Mg',2],['Ca',2],['Al',3],['F',-1],['Cl',-1],['O',-2],['S',-2],['N',-3],['P',-3],['H',-1],['H',1]].map(([symbol,charge])=>({...elements.find(e=>e.symbol===symbol),charge}));
export const ions = [
 ['Li',1,'鋰','lithium'],['Na',1,'鈉','sodium'],['K',1,'鉀','potassium'],['Ag',1,'銀','silver'],['H',1,'氫','hydrogen'],['NH4',1,'銨','ammonium'],['Cu',1,'銅(I)','copper(I)'],
 ['Be',2,'鈹','beryllium'],['Mg',2,'鎂','magnesium'],['Ca',2,'鈣','calcium'],['Ba',2,'鋇','barium'],['Zn',2,'鋅','zinc'],['Fe',2,'鐵(II)','iron(II)'],['Cu',2,'銅(II)','copper(II)'],['Pb',2,'鉛(II)','lead(II)'],['Co',2,'鈷(II)','cobalt(II)'],['Ni',2,'鎳(II)','nickel(II)'],['Mn',2,'錳(II)','manganese(II)'],['Hg2',2,'汞(I)','mercury(I)'],['Hg',2,'汞(II)','mercury(II)'],
 ['Al',3,'鋁','aluminium'],['Fe',3,'鐵(III)','iron(III)'],['Cr',3,'鉻(III)','chromium(III)'],
 ['H',-1,'氫化','hydride'],['F',-1,'氟','fluoride'],['Cl',-1,'氯','chloride'],['Br',-1,'溴','bromide'],['I',-1,'碘','iodide'],['OH',-1,'氫氧根','hydroxide'],['NO3',-1,'硝酸根','nitrate'],['NO2',-1,'亞硝酸根','nitrite'],['HCO3',-1,'碳酸氫根','hydrogencarbonate'],['HSO4',-1,'硫酸氫根','hydrogensulphate'],['CN',-1,'氰根','cyanide'],['MnO4',-1,'高錳酸根','permanganate'],['ClO3',-1,'氯酸根','chlorate'],['ClO',-1,'次氯酸根','hypochlorite'],
 ['O',-2,'氧','oxide'],['S',-2,'硫','sulphide'],['SO4',-2,'硫酸根','sulphate'],['SO3',-2,'亞硫酸根','sulphite'],['SiO3',-2,'矽酸根','silicate'],['CO3',-2,'碳酸根','carbonate'],['CrO4',-2,'鉻酸根','chromate'],['Cr2O7',-2,'重鉻酸根','dichromate'],['N',-3,'氮','nitride'],['P',-3,'磷','phosphide'],['PO4',-3,'磷酸根','phosphate'],
].map(([symbol,charge,zh,en])=>({symbol,charge,name:[zh+'離子',en+' ion'],stem:[zh,en],poly:/\d|[A-Z].*[A-Z]/.test(symbol)}));
export const findIon=(symbol,charge)=>ions.find(i=>i.symbol===symbol&&i.charge===charge);
export const chargeText=q=>q===0?'0':`${Math.abs(q)===1?'':Math.abs(q)}${q>0?'+':'−'}`;
export const formulaHTML=s=>s.replace(/(\d+)/g,'<sub>$1</sub>');
export const ionHTML=i=>`${formulaHTML(i.symbol)}<sup>${chargeText(i.charge)}</sup>`;
export function gcd(a,b){return b?gcd(b,a%b):a;}
export function ratio(cation,anion){const divisor=gcd(cation.charge,-anion.charge);return [-anion.charge/divisor,cation.charge/divisor];}
export function ionicFormula(cation,anion){const ns=ratio(cation,anion);return [cation,anion].map((ion,i)=>(ion.poly&&ns[i]>1?`(${ion.symbol})`:ion.symbol)+(ns[i]>1?ns[i]:'')).join('');}
export const ionicPairs=[
 ['Na',1,'Cl',-1],['Li',1,'Cl',-1],['Mg',2,'Cl',-1],['Na',1,'O',-2],['Mg',2,'O',-2],['Al',3,'O',-2],['Ca',2,'S',-2],['Li',1,'S',-2],['Al',3,'S',-2],['K',1,'N',-3],['Ca',2,'N',-3],['Al',3,'N',-3],['Na',1,'P',-3],['Mg',2,'P',-3],['Al',3,'P',-3],['Mg',2,'I',-1],['Ca',2,'Br',-1],['Li',1,'P',-3],['K',1,'Br',-1],['Ca',2,'F',-1],['Fe',2,'O',-2],['Fe',3,'O',-2],['Cu',1,'O',-2],['Cu',2,'O',-2],['NH4',1,'SO4',-2],['Ca',2,'NO3',-1],['Al',3,'OH',-1],['Pb',2,'Br',-1],['Zn',2,'P',-3],['Li',1,'H',-1],['Ag',1,'N',-3],
].map(([a,q,b,r])=>[findIon(a,q),findIon(b,r)]);
export const valence={H:1,C:4,N:5,O:6,F:7,P:5,S:6,Cl:7,Si:4,I:7};
// Coordinates make an electron diagram, not a claim about 3D bond angles.
const atom=(s,x,y,lone)=>({s,x,y,lone});
export const molecules=[
 {id:'H2',name:['氫','Hydrogen'],atoms:[atom('H',145,170,0),atom('H',275,170,0)],bonds:[[0,1,1]]},
 {id:'Cl2',name:['氯','Chlorine'],atoms:[atom('Cl',145,170,3),atom('Cl',275,170,3)],bonds:[[0,1,1]]},
 {id:'O2',name:['氧','Oxygen'],atoms:[atom('O',145,170,2),atom('O',275,170,2)],bonds:[[0,1,2]]},
 {id:'N2',name:['氮','Nitrogen'],atoms:[atom('N',145,170,1),atom('N',275,170,1)],bonds:[[0,1,3]]},
 {id:'F2',name:['氟','Fluorine'],atoms:[atom('F',145,170,3),atom('F',275,170,3)],bonds:[[0,1,1]]},
 {id:'HCl',name:['氯化氫','Hydrogen chloride'],atoms:[atom('H',145,170,0),atom('Cl',275,170,3)],bonds:[[0,1,1]]},
 {id:'H2O',name:['水','Water'],atoms:[atom('O',210,155,2),atom('H',95,235,0),atom('H',325,235,0)],bonds:[[0,1,1],[0,2,1]]},
 {id:'NH3',name:['氨','Ammonia'],atoms:[atom('N',210,160,1),atom('H',90,160,0),atom('H',330,160,0),atom('H',210,275,0)],bonds:[[0,1,1],[0,2,1],[0,3,1]]},
 {id:'CH4',name:['甲烷','Methane'],atoms:[atom('C',210,170,0),atom('H',90,170,0),atom('H',330,170,0),atom('H',210,55,0),atom('H',210,285,0)],bonds:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]]},
 {id:'CO2',name:['二氧化碳','Carbon dioxide'],atoms:[atom('C',210,170,0),atom('O',85,170,2),atom('O',335,170,2)],bonds:[[0,1,2],[0,2,2]]},
 {id:'CCl4',name:['四氯甲烷','Tetrachloromethane'],atoms:[atom('C',210,170,0),atom('Cl',85,170,3),atom('Cl',335,170,3),atom('Cl',210,55,3),atom('Cl',210,285,3)],bonds:[[0,1,1],[0,2,1],[0,3,1],[0,4,1]]},
 {id:'PCl3',name:['三氯化磷','Phosphorus trichloride'],atoms:[atom('P',210,155,1),atom('Cl',80,155,3),atom('Cl',340,155,3),atom('Cl',210,285,3)],bonds:[[0,1,1],[0,2,1],[0,3,1]]},
];
export const pairTotal=m=>m.bonds.reduce((n,b)=>n+b[2],0);
export const loneTotal=m=>m.atoms.reduce((n,a)=>n+a.lone,0);
export const relativeMass={H:1,He:4,Li:6.9,Be:9,B:10.8,C:12,N:14,O:16,F:19,Na:23,Mg:24.3,Al:27,Si:28.1,P:31,S:32.1,Cl:35.5,K:39.1,Ca:40.1,Cu:63.5,Pb:207.2,Mn:54.9,Cr:52,I:126.9};
export function parseFormula(formula){
 const tokens=formula.match(/[A-Z][a-z]?|\d+|[()]/g);if(!tokens||tokens.join('')!==formula)throw new Error('Invalid formula');
 const stack=[{}];
 for(let i=0;i<tokens.length;i++){
  const token=tokens[i];
  if(token==='('){stack.push({});continue;}
  if(token===')'){
   if(stack.length===1)throw new Error('Unbalanced formula');const group=stack.pop();const n=/^\d+$/.test(tokens[i+1]||'')?Number(tokens[++i]):1;
   for(const [e,c]of Object.entries(group))stack.at(-1)[e]=(stack.at(-1)[e]||0)+c*n;
  }else if(/^[A-Z]/.test(token)){
   const n=/^\d+$/.test(tokens[i+1]||'')?Number(tokens[++i]):1;stack.at(-1)[token]=(stack.at(-1)[token]||0)+n;
  }else throw new Error('Unexpected number');
 }
 if(stack.length!==1)throw new Error('Unbalanced formula');return stack[0];
}
export const massOf=formula=>Object.entries(parseFormula(formula)).reduce((sum,[e,n])=>sum+relativeMass[e]*n,0);
export const massExamples=['H2O','N2','CO2','CH4','KCl','Na2CO3','Ca(NO3)2','NaClO','CaCO3','Cu(OH)2','KNO3','PbCl2','KMnO4','Na2Cr2O7','(NH4)2SO4','Al(NO3)3','C6H12O6'];
export const molecularTasks=[['H2S','H',2,'S',1],['SiCl4','Si',1,'Cl',4],['NF3','N',1,'F',3],['H2O','H',2,'O',1],['CO2','C',1,'O',2],['HF','H',1,'F',1],['CI4','C',1,'I',4],['CS2','C',1,'S',2],['OF2','O',1,'F',2],['PCl3','P',1,'Cl',3]];
