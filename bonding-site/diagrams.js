import {chargeText} from './chemistry.js';
const text=(x,y,value,cls='')=>`<text x="${x}" y="${y}" class="${cls}" text-anchor="middle" dominant-baseline="middle">${value}</text>`;
const electron=(x,y,cross=false)=>cross?`<path class="electron-cross" d="M${x-3} ${y-3}l6 6m-6 0l6-6"/>`:`<circle class="electron-dot" cx="${x}" cy="${y}" r="4"/>`;
export function shellSVG(symbol,counts,charge=0){
 let marks='';counts.forEach((count,s)=>{
  const r=42+s*28;marks+=`<circle class="shell-ring" cx="170" cy="170" r="${r}"/>`;
  for(let i=0;i<count;i++){
   // First shell: opposite poles. Later shells: one per side, then pair.
   const slot=s===0?i*2:i%4;const angle=slot*Math.PI/2-Math.PI/2+(s>0&&count>slot+4?(i<4?-.085:.085):0);
   marks+=electron(170+Math.cos(angle)*r,170+Math.sin(angle)*r);
  }
 });
 return `<svg class="shell-diagram" viewBox="0 0 340 340" role="img" aria-label="${symbol}: ${counts.join(', ')}; ${chargeText(charge)}"><circle cx="170" cy="170" r="26" class="nucleus"/>${text(170,170,symbol,'atom-label')}${marks}${charge?`<path class="ion-bracket" d="M30 25H20V315H30M310 25H320V315H310"/>${text(300,22,chargeText(charge),'charge-label')}`:''}</svg>`;
}
export function ionDiagram(symbol,native,received,charge){
 let dots='';const positions=[[-8,-39],[39,-8],[-8,39],[-39,-8],[8,-39],[39,8],[8,39],[-39,8]];
 for(let i=0;i<native+received;i++){const [dx,dy]=positions[i];dots+=electron(65+dx,65+dy,i>=native);}
 return `<svg viewBox="0 0 150 130" class="ion-diagram" role="img" aria-label="${symbol} ${chargeText(charge)}"><path class="ion-bracket" d="M17 17H9V113H17M112 17H120V113H112"/>${text(65,65,symbol,'atom-label')}${dots}${text(134,18,chargeText(charge),'charge-label')}</svg>`;
}
export function moleculeSVG(m,bondCounts=m.bonds.map(b=>b[2]),loneCounts=m.atoms.map(a=>a.lone),structural=false){
 let lines='';
 m.bonds.forEach(([a,b],i)=>{
  const A=m.atoms[a],B=m.atoms[b],dx=B.x-A.x,dy=B.y-A.y,length=Math.hypot(dx,dy),nx=-dy/length,ny=dx/length;
  for(let k=0;k<bondCounts[i];k++){
   const off=(k-(bondCounts[i]-1)/2)*14;
   if(structural)lines+=`<line class="bond-line" x1="${A.x+dx*.24+nx*off}" y1="${A.y+dy*.24+ny*off}" x2="${B.x-dx*.24+nx*off}" y2="${B.y-dy*.24+ny*off}"/>`;
   else{const x=(A.x+B.x)/2+nx*off,y=(A.y+B.y)/2+ny*off;lines+=electron(x-dx/length*6,y-dy/length*6)+electron(x+dx/length*6,y+dy/length*6,true);}
  }
 });
 m.atoms.forEach((a,i)=>{
  lines+=`<circle cx="${a.x}" cy="${a.y}" r="22" class="molecule-nucleus"/>${text(a.x,a.y,a.s,'atom-label')}`;
  if(structural)return;
  const neighbours=m.bonds.filter(b=>b[0]===i||b[1]===i).map(b=>m.atoms[b[0]===i?b[1]:b[0]]);
  const angles=[-Math.PI/2,0,Math.PI/2,Math.PI];
  // Prefer spaces furthest from existing bonds; a water oxygen leaves two top slots.
  const scored=angles.map(angle=>({angle,score:Math.min(...neighbours.map(b=>Math.acos(Math.cos(angle-Math.atan2(b.y-a.y,b.x-a.x)))))})).sort((a,b)=>b.score-a.score);
  for(let k=0;k<loneCounts[i];k++){const theta=scored[k%4].angle,r=39+Math.floor(k/4)*14,x=a.x+Math.cos(theta)*r,y=a.y+Math.sin(theta)*r;
   lines+=electron(x-Math.sin(theta)*6,y+Math.cos(theta)*6,i>0)+electron(x+Math.sin(theta)*6,y-Math.cos(theta)*6,i>0);
  }
 });
 return `<svg class="molecule-diagram" viewBox="0 0 420 340" role="img" aria-label="${m.id}: ${bondCounts.join(', ')} shared pairs; ${loneCounts.join(', ')} lone pairs">${lines}</svg>`;
}
export function latticeSVG(){let atoms='';for(let y=0;y<4;y++)for(let x=0;x<6;x++){const positive=(x+y)%2===0;atoms+=`<circle cx="${42+x*53}" cy="${40+y*51}" r="21" fill="${positive?'#e2ad7c':'#739fb2'}"/>${text(42+x*53,40+y*51,positive?'+':'−','lattice-sign')}`;}return `<svg viewBox="0 0 350 235" role="img" aria-label="Alternating positive and negative ions in a repeating lattice">${atoms}</svg>`;}
