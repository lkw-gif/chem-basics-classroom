'use client';
import { useEffect, useRef, useState } from 'react';
import { RotateCcw, ZoomIn, ZoomOut, MoveHorizontal } from 'lucide-react';
type Ball={e:string;x:number;y:number;z:number;r?:number};
type Scene={balls:Ball[];bonds:[number,number][]};
export const COLORS:Record<string,string>={H:'#e6edf5',O:'#ed5d65',N:'#5689ed',C:'#566376',Cl:'#78c78a',I:'#b093db',Fe:'#8ca0b3',S:'#f5cf58',Na:'#b598dc',mud:'#b68858',fat:'#e9c36c',food:'#a8be78',other:'#aa8bd0'};
const names:Record<string,string>={H:'氫',O:'氧',N:'氮',C:'碳',Cl:'氯',I:'碘',Fe:'鐵',S:'硫',Na:'鈉',mud:'泥土顆粒',fat:'脂肪小滴',food:'食物成分',other:'其他成分'};
export function molecule(kind:string):Scene{
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
 if(type==='carbon'||type==='iron'||type==='sulphide'){
  if(type==='carbon'){
   for(let layer=0;layer<2;layer++)for(let ring=0;ring<1;ring++)for(let i=0;i<6;i++){let a=i*Math.PI/3; s.balls.push({e:'C',x:Math.cos(a)*.68+(ring)*1.18,y:Math.sin(a)*.68,z:(layer-.5)*.95,r:.2});}
   for(let a=0;a<s.balls.length;a++)for(let b=a+1;b<s.balls.length;b++){const p=s.balls[a],q=s.balls[b];if(p.z===q.z&&Math.abs(Math.hypot(p.x-q.x,p.y-q.y)-.68)<.03)s.bonds.push([a,b]);}
  }else for(let row=0;row<3;row++)for(let col=0;col<4;col++)for(let layer=0;layer<2;layer++){const e=type==='iron'?'Fe':(row+col+layer)%2?'Fe':'S';s.balls.push({e,x:(col-1.5)*.8,y:(row-1)*.85,z:(layer-.5)*.85,r:.23});}
  return s;
 }
 if(type==='reaction-water'){add('H2O',-1,0,0,.65);add('H2O',1,0,0,.65);return s;}
 if(type==='reaction-gases'){add('H2',-1.3,.65,0,.6);add('H2',1.3,.65,0,.6);add('O2',0,-.8,0,.6);return s;}
 const slots=[[-1.65,1.05,.1],[-.35,1,.65],[1.1,1.1,-.2],[1.9,.3,.5],[-1.6,-.2,-.4],[-.25,-.15,.2],[.9,-.25,.8],[-1.3,-1.2,.6],[.1,-1.1,-.5],[1.55,-1.05,.1]];
 slots.forEach(([x,y,z],i)=>{let k='H2O';if(type==='hydrogen')k='H2';if(type==='oxygen')k='O2';if(type==='air')k=i===8?'O2':i===9?'other':'N2';if(type==='elements')k=i%2?'O2':'H2';if(type==='compounds')k=i%2?'CO2':'H2O';if(type==='both')k=i%3?'H2O':'H2';if(type==='muddy')k=i%3===0?'mud':'H2O';if(type==='milk')k=i===1||i===7?'fat':i===5?'other':'H2O';if(type==='soup')k=i===1||i===7?'food':i===5?'fat':i===8?'other':'H2O';if(type==='ironsulfur')k=i%2?'Fe':'S';if(type==='ice'){x=(i%5-2)*.72;y=(Math.floor(i/5)-.5)*.85;z=0;}if(type==='steam'){x*=1.03;y*=1.02;z*=1.1;}const particleScale=type==='steam'?.25:type==='ice'?.32:.48;add(k,x,y,z,['mud','fat','food'].includes(k)?1.1:particleScale,type==='ice'?0:i*1.34);});return s;
}
export default function Model({kind,compact=false,label,angle:sharedAngle,onAngleChange}:{kind:string;compact?:boolean;label?:string;angle?:number;onAngleChange?:(n:number)=>void}){
 const ref=useRef<HTMLCanvasElement>(null),drag=useRef<{x:number;y:number}|null>(null),hit=useRef<{x:number;y:number;r:number;e:string}[]>([]);
 const [rotation,setRotation]=useState({x:-.15,y:.15}),[zoom,setZoom]=useState(1),[selected,setSelected]=useState('');const ry=sharedAngle??rotation.y;
 useEffect(()=>{setSelected('');setZoom(1);},[kind]);
 useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
 function draw(){if(!canvas||!ctx)return;const rect=canvas.getBoundingClientRect(),w=rect.width,h=rect.height;if(!w||!h)return;const dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);const scene=makeScene(kind),multi=kind.includes(':'),scale=Math.min(w/(multi?5.6:5.2),h/(multi?4.3:3.5))*zoom;
 const ps=scene.balls.map(a=>{const x=a.x*Math.cos(ry)+a.z*Math.sin(ry),z=-a.x*Math.sin(ry)+a.z*Math.cos(ry),y=a.y*Math.cos(rotation.x)-z*Math.sin(rotation.x),zz=a.y*Math.sin(rotation.x)+z*Math.cos(rotation.x),perspective=7/(7-zz);return {...a,px:w/2+x*scale*perspective,py:h/2-y*scale*perspective,pz:zz,pr:(a.r??(a.e==='H'?.39:.57))*scale*perspective};});ctx.lineCap='round';scene.bonds.forEach(([a,b])=>{ctx.beginPath();ctx.moveTo(ps[a].px,ps[a].py);ctx.lineTo(ps[b].px,ps[b].py);ctx.strokeStyle='#92a9bb';ctx.lineWidth=(multi?5:15)*zoom;ctx.stroke();});hit.current=[];
 [...ps].sort((a,b)=>a.pz-b.pz).forEach(a=>{const g=ctx.createRadialGradient(a.px-a.pr*.33,a.py-a.pr*.4,a.pr*.02,a.px,a.py,a.pr);g.addColorStop(0,'#fff');g.addColorStop(.25,COLORS[a.e]||'#9da7bd');g.addColorStop(1,a.e==='H'?'#8c9dad':'#263a55');ctx.beginPath();ctx.arc(a.px,a.py,a.pr,0,Math.PI*2);ctx.shadowColor='#08183140';ctx.shadowBlur=multi?5:18;ctx.shadowOffsetY=4;ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;ctx.shadowOffsetY=0;ctx.fillStyle=['H','S','fat'].includes(a.e)?'#243448':'#fff';const symbol=['mud','fat','food','other'].includes(a.e)?'':a.e;ctx.font=`700 ${Math.max(10,Math.min(30,a.pr*.8))}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(symbol,a.px,a.py+1);hit.current.push({x:a.px,y:a.py,r:a.pr,e:a.e});});}
 const observer=new ResizeObserver(draw);observer.observe(canvas);draw();return()=>observer.disconnect();},[kind,rotation.x,ry,zoom]);
 const rotate=(n:number)=>{if(onAngleChange)onAngleChange(ry+n);else setRotation(r=>({...r,y:r.y+n}));};
 return <div className={`molecule-view ${compact?'compact':''}`}><canvas ref={ref} tabIndex={0} role="img" aria-label={label||`${kind} 三維模型，可拖曳或用方向鍵旋轉`} onKeyDown={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();rotate(e.key==='ArrowRight'?.15:-.15);}if(e.key==='ArrowUp'||e.key==='ArrowDown'){e.preventDefault();setRotation(r=>({...r,x:r.x+(e.key==='ArrowUp'?.15:-.15)}));}}} onPointerDown={e=>{drag.current={x:e.clientX,y:e.clientY};e.currentTarget.setPointerCapture(e.pointerId);}} onPointerMove={e=>{if(!drag.current)return;const dx=(e.clientX-drag.current.x)*.009,dy=(e.clientY-drag.current.y)*.009;rotate(dx);setRotation(r=>({...r,x:r.x+dy}));drag.current={x:e.clientX,y:e.clientY};}} onPointerUp={e=>{drag.current=null;const r=e.currentTarget.getBoundingClientRect(),a=[...hit.current].reverse().find(a=>Math.hypot(a.x-(e.clientX-r.left),a.y-(e.clientY-r.top))<a.r);if(a)setSelected(`${a.e.length<3?a.e+' · ':''}${names[a.e]||a.e}`);}} onPointerCancel={()=>drag.current=null}>模型：{label||kind}。H 代表氫，O 代表氧，N 代表氮。</canvas><div className="model-tools"><span className="drag-hint"><MoveHorizontal size={14}/> 拖曳旋轉</span><div><button aria-label="縮小模型" onClick={()=>setZoom(v=>Math.max(.65,v-.15))}><ZoomOut size={17}/></button><button aria-label="放大模型" onClick={()=>setZoom(v=>Math.min(1.6,v+.15))}><ZoomIn size={17}/></button><button aria-label="重設模型" onClick={()=>{setRotation({x:-.15,y:.15});onAngleChange?.(.15);setZoom(1);setSelected('');}}><RotateCcw size={16}/></button></div></div>{selected&&<output className="atom-selected" aria-live="polite">{selected}</output>}</div>;
}

