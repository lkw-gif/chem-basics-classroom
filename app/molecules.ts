type Ball={e:string;x:number;y:number;z:number;r?:number};
type Scene={balls:Ball[];bonds:[number,number][]};
export const COLORS:Record<string,string>={H:'#e6edf5',O:'#ed5d65',N:'#5689ed',C:'#566376',Cl:'#78c78a',I:'#b093db',Fe:'#8ca0b3',S:'#f5cf58',Na:'#b598dc',mud:'#b68858',fat:'#e9c36c',food:'#a8be78',other:'#aa8bd0'};
export const names:Record<string,string>={H:'氫',O:'氧',N:'氮',C:'碳',Cl:'氯',I:'碘',Fe:'鐵',S:'硫',Na:'鈉',mud:'泥土顆粒',fat:'脂肪小滴',food:'食物成分',other:'其他成分'};
COLORS.He='#e4af59';
names.He='氦';
export function molecule(kind:string):Scene{
 if(kind==='O3')return {balls:[{e:'O',x:0,y:.38,z:0},{e:'O',x:-1.12,y:-.38,z:0},{e:'O',x:1.12,y:-.38,z:0}],bonds:[[0,1],[0,2]]};
 if(kind==='H2O')return {balls:[{e:'O',x:0,y:.15,z:0},{e:'H',x:-1.02,y:-.64,z:0},{e:'H',x:1.02,y:-.64,z:0}],bonds:[[0,1],[0,2]]};
 if(kind==='CO2')return {balls:[{e:'O',x:-1.42,y:0,z:0},{e:'C',x:0,y:0,z:0},{e:'O',x:1.42,y:0,z:0}],bonds:[[0,1],[1,2]]};
 if(['H2','N2','O2','Cl2','I2'].includes(kind)){const e=kind.replace('2','');return {balls:[{e,x:-.66,y:0,z:0},{e,x:.66,y:0,z:0}],bonds:[[0,1]]};}
 return {balls:[{e:kind,x:0,y:0,z:0}],bonds:[]};
}
export function makeScene(kind:string):Scene{
 if(!kind.includes(':'))return molecule(kind);
 const s:Scene={balls:[],bonds:[]};
 function add(k:string,x:number,y:number,z:number,scale=.42,angle=0){const m=molecule(k),offset=s.balls.length;m.balls.forEach(a=>s.balls.push({...a,x:x+scale*(a.x*Math.cos(angle)-a.y*Math.sin(angle)),y:y+scale*(a.x*Math.sin(angle)+a.y*Math.cos(angle)),z:z+a.z*scale,r:(a.e==='H'?.36:.5)*scale}));m.bonds.forEach(([a,b])=>s.bonds.push([a+offset,b+offset]));}
 const type=kind.split(':')[1];
 if(type.startsWith('pure-')){const k=type.slice(5);for(let i=0;i<8;i++)add(k,(i%4-1.5)*1.25,(Math.floor(i/4)-.5)*1.6,(i%3-1)*.3,.38,i*.8);return s;}
 if(type==='carbon'||type==='iron'||type==='sulphide'){
  if(type==='carbon'){
   const seen=new Map<string,number>();
   for(let layer=0;layer<2;layer++)for(const [cx,cy] of [[0,0],[1.02,.589],[1.02,-.589],[-1.02,.589],[-1.02,-.589]])for(let i=0;i<6;i++){
    const a=i*Math.PI/3,x=cx+Math.cos(a)*.68,y=cy+Math.sin(a)*.68,z=(layer-.5)*.95,key=`${Math.round(x*100)},${Math.round(y*100)},${z}`;
    if(!seen.has(key)){seen.set(key,s.balls.length);s.balls.push({e:'C',x,y,z,r:.16});}
   }
   for(let a=0;a<s.balls.length;a++)for(let b=a+1;b<s.balls.length;b++){const p=s.balls[a],q=s.balls[b];if(p.z===q.z&&Math.abs(Math.hypot(p.x-q.x,p.y-q.y)-.68)<.015)s.bonds.push([a,b]);}
  }else for(let row=0;row<3;row++)for(let col=0;col<4;col++)for(let layer=0;layer<2;layer++){const e=type==='iron'?'Fe':(row+col+layer)%2?'Fe':'S';s.balls.push({e,x:(col-1.5)*.8,y:(row-1)*.85,z:(layer-.5)*.85,r:.23});}
  if(type==='sulphide')for(let a=0;a<s.balls.length;a++)for(let b=a+1;b<s.balls.length;b++){const p=s.balls[a],q=s.balls[b];if(p.e!==q.e&&Math.hypot(p.x-q.x,p.y-q.y,p.z-q.z)<.87)s.bonds.push([a,b]);}
  return s;
 }
 if(type==='reaction-water'){add('H2O',-1,0,0,.65);add('H2O',1,0,0,.65);return s;}
 if(type==='reaction-gases'){add('H2',-1.3,.65,0,.6);add('H2',1.3,.65,0,.6);add('O2',0,-.8,0,.6);return s;}
 const slots=[[-1.65,1.05,.1],[-.35,1,.65],[1.1,1.1,-.2],[1.9,.3,.5],[-1.6,-.2,-.4],[-.25,-.15,.2],[.9,-.25,.8],[-1.3,-1.2,.6],[.1,-1.1,-.5],[1.55,-1.05,.1]];
 slots.forEach(([x,y,z],i)=>{let k='H2O';if(type==='hydrogen')k='H2';if(type==='oxygen')k='O2';if(type==='air')k=i===8?'O2':i===9?'other':'N2';if(type==='elements')k=i%2?'O2':'H2';if(type==='compounds')k=i%2?'CO2':'H2O';if(type==='both')k=i%3?'H2O':'H2';if(type==='muddy')k=i%3===0?'mud':'H2O';if(type==='milk')k=i===1||i===7?'fat':i===5?'other':'H2O';if(type==='soup')k=i===1||i===7?'food':i===5?'fat':i===8?'other':'H2O';if(type==='ironsulfur')k=i%2?'Fe':'S';if(type==='ice'){x=(i%5-2)*.9;y=(Math.floor(i/5)-.5)*1.6;z=(i%2?1:-1)*.3;}if(type==='water'){x*=.8;y*=.8;z*=.6;}if(type==='steam'){x*=1.1;y*=1.1;z*=1.1;}const particleScale=['water','ice','steam'].includes(type)?.38:.48;add(k,x,y,z,['mud','fat','food'].includes(k)?1.1:particleScale,type==='ice'?0:i*1.34);});return s;
}
