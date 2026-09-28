// A rotatable teaching model: the object, many atoms, and one atom.
export function copperAtoms(){
  const atoms=[];
  for(let x=-2;x<=2;x++)for(let y=-2;y<=2;y++)for(let z=-2;z<=2;z++){
    if((x+y+z)%2===0)atoms.push([x*.48,y*.48,z*.48]);
  }
  return atoms;
}

export function setupCopperModel(getLanguage){
  const root=document.querySelector('[data-copper-model]');
  const canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d');
  let step=0,yaw=.55,pitch=-.28,zoom=1,drag=null;
  const text=(zh,en)=>getLanguage()==='en'?en:zh;
  const names=[['一塊銅','A piece of copper'],['很多銅原子','Many copper atoms'],['一個銅原子','One copper atom']];
  const messages=[
    ['一塊銅由很多銅原子組成。','A piece of copper contains many copper atoms.'],
    ['放大看，每個小球都是同一種原子：Cu。','Zoom in: every sphere represents the same type of atom, Cu.'],
    ['一個小球代表一個銅原子。','One sphere represents one copper atom.'],
  ];
  function rotate([x,y,z]){
    const rx=x*Math.cos(yaw)+z*Math.sin(yaw),rz=-x*Math.sin(yaw)+z*Math.cos(yaw);
    return [rx,y*Math.cos(pitch)-rz*Math.sin(pitch),y*Math.sin(pitch)+rz*Math.cos(pitch)];
  }
  function draw(){
    const box=canvas.getBoundingClientRect();if(box.width===0||box.height===0)return;
    const dpr=Math.min(devicePixelRatio||1,2),w=box.width,h=box.height;
    if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);
    const scale=Math.min(w*.24,h*.24)*zoom;
    const project=p=>{const q=rotate(p),perspective=5/(5-q[2]);return {x:w/2+q[0]*scale*perspective,y:h/2-q[1]*scale*perspective,z:q[2],factor:perspective};};
    ctx.fillStyle='#93bfce18';for(let x=20;x<w;x+=28)for(let y=20;y<h;y+=28){ctx.beginPath();ctx.arc(x,y,1,0,Math.PI*2);ctx.fill();}
    if(step===0){
      const v=[[-1,-.72,-.65],[1,-.72,-.65],[1,.72,-.65],[-1,.72,-.65],[-1,-.72,.65],[1,-.72,.65],[1,.72,.65],[-1,.72,.65]].map(project);
      const faces=[{ids:[0,1,2,3],c:'#a95d37'},{ids:[4,5,6,7],c:'#d39468'},{ids:[0,4,7,3],c:'#b76d44'},{ids:[1,5,6,2],c:'#935337'},{ids:[3,2,6,7],c:'#edbd8d'},{ids:[0,1,5,4],c:'#ac6f4b'}];
      faces.sort((a,b)=>a.ids.reduce((s,i)=>s+v[i].z,0)-b.ids.reduce((s,i)=>s+v[i].z,0));
      for(const face of faces){ctx.beginPath();face.ids.forEach((id,i)=>i?ctx.lineTo(v[id].x,v[id].y):ctx.moveTo(v[id].x,v[id].y));ctx.closePath();ctx.fillStyle=face.c;ctx.fill();ctx.strokeStyle='#ffd6af77';ctx.lineWidth=1.2;ctx.stroke();}
      ctx.fillStyle='#fff8ee';ctx.font='700 38px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Cu',w/2,h/2);
    }else{
      const atoms=(step===1?copperAtoms():[[0,0,0]]).map(project).sort((a,b)=>a.z-b.z);
      for(const atom of atoms){
        const radius=scale*(step===1?.19:.68)*atom.factor;
        const fill=ctx.createRadialGradient(atom.x-radius*.35,atom.y-radius*.38,radius*.05,atom.x,atom.y,radius);
        fill.addColorStop(0,'#fff0da');fill.addColorStop(.4,'#e8b68c');fill.addColorStop(.76,'#bb754f');fill.addColorStop(1,'#74452f');
        ctx.beginPath();ctx.arc(atom.x,atom.y,radius,0,Math.PI*2);ctx.fillStyle=fill;ctx.fill();
        if(step===2){ctx.fillStyle='#422818';ctx.font=`700 ${Math.round(radius*.65)}px Arial`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('Cu',atom.x,atom.y);}
      }
    }
    root.dataset.yaw=yaw.toFixed(3);root.dataset.step=String(step);
  }
  function refresh(){
    root.querySelectorAll('[data-zoom]').forEach(button=>button.setAttribute('aria-pressed',String(Number(button.dataset.zoom)===step)));
    root.querySelector('[data-copper-title]').textContent=names[step][getLanguage()==='en'?1:0];
    root.querySelector('#copper-zoom-feedback').textContent=messages[step][getLanguage()==='en'?1:0];
    canvas.setAttribute('aria-label',names[step][getLanguage()==='en'?1:0]+text('。拖曳或用方向鍵旋轉。','; drag or use arrow keys to rotate.'));
    root.querySelector('[data-copper-drag]').textContent=text('拖曳旋轉 · 方向鍵也可以','Drag to rotate · or use arrow keys');
    const labels={out:['縮小模型','Zoom out'],in:['放大模型','Zoom in'],reset:['重設視角','Reset view']};
    root.querySelectorAll('[data-copper-action]').forEach(button=>button.setAttribute('aria-label',labels[button.dataset.copperAction][getLanguage()==='en'?1:0]));
    draw();
  }
  root.addEventListener('click',event=>{
    const pick=event.target.closest('[data-zoom]');if(pick){step=Number(pick.dataset.zoom);zoom=1;refresh();return;}
    const button=event.target.closest('[data-copper-action]');if(!button)return;
    const action=button.dataset.copperAction;if(action==='reset'){yaw=.55;pitch=-.28;zoom=1;}else zoom=Math.max(.6,Math.min(1.7,zoom+(action==='in'?.12:-.12)));draw();
  });
  canvas.addEventListener('pointerdown',event=>{drag={x:event.clientX,y:event.clientY};canvas.setPointerCapture(event.pointerId);});
  canvas.addEventListener('pointermove',event=>{if(!drag)return;yaw+=(event.clientX-drag.x)*.012;pitch=Math.max(-1.25,Math.min(1.25,pitch+(event.clientY-drag.y)*.012));drag={x:event.clientX,y:event.clientY};draw();});
  canvas.addEventListener('pointerup',()=>{drag=null;});canvas.addEventListener('pointercancel',()=>{drag=null;});
  canvas.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','Home'].includes(event.key))return;event.preventDefault();
    if(event.key==='ArrowLeft')yaw-=.15;if(event.key==='ArrowRight')yaw+=.15;
    if(event.key==='ArrowUp')pitch=Math.max(-1.25,pitch-.15);if(event.key==='ArrowDown')pitch=Math.min(1.25,pitch+.15);
    if(event.key==='+')zoom=Math.min(1.7,zoom+.12);if(event.key==='-')zoom=Math.max(.6,zoom-.12);
    if(event.key==='Home'){yaw=.55;pitch=-.28;zoom=1;}draw();
  });
  new ResizeObserver(draw).observe(canvas);refresh();return refresh;
}
