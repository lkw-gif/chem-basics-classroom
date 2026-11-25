const metals = {
  Li: { name:['鋰','Lithium'], seconds:13, bubbles:7, motion:0.8,
    notes:[[25,'浮在水面，冒出氣泡，金屬塊緩慢移動。','Floats, fizzes and moves slowly on the water surface.']] },
  Na: { name:['鈉','Sodium'], seconds:10, bubbles:13, motion:1.5, melt:.34, flame:[.65,.84], ignitionAtRim:true, colour:'#ffb829', core:'#fff5af',
    notes:[[25,'浮在水面，冒出氣泡並迅速移動。','Floats, fizzes and moves quickly across the water surface.'],
      [45,'金屬熔成銀色小球。','The metal melts into a silvery ball.'],
      [76,'這次示範中，鈉燃起金黃色火焰，並冒出白煙。','In this demonstration, sodium burns with a golden yellow flame and gives off white fumes.']] },
  K: { name:['鉀','Potassium'], seconds:7, bubbles:19, motion:2.3, melt:.24, flame:[.38,.87], colour:'#be8aff', core:'#faeaff',
    notes:[[21,'劇烈冒出氣泡，在水面快速移動。','Fizzes vigorously and moves quickly over the water surface.'],
      [32,'金屬熔成銀色小球。','The metal melts into a silvery ball.'],
      [65,'鉀燃起淡紫色火焰，並冒出白煙。','Potassium burns with a lilac flame and gives off white fumes.']] },
};

const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const smooth = n => { const p = clamp(n); return p * p * (3 - 2 * p); };
const contact = .16;

function moment(metal, p) {
  if (p >= 1) return 'after';
  if (p < contact) return 'before';
  if (metal.flame && p >= metal.flame[0] && p <= metal.flame[1]) return 'flame';
  return metal.melt && p >= metal.melt ? 'ball' : 'fizz';
}

function paint(ctx, metal, p) {
  const time = p * metal.seconds;
  const dish = { x:360, y:207, rx:263, ry:73 };
  function ellipse(x, y, rx, ry, fill, stroke, width = 1) {
    ctx.beginPath();
    ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = width; ctx.stroke(); }
  }
  function gradient(x, top, bottom, stops) {
    const g = ctx.createLinearGradient(x, top, x, bottom);
    stops.forEach(([at,c]) => g.addColorStop(at,c));
    return g;
  }
  function glow(x,y,rx,ry,colour,alpha) {
    ctx.save(); ctx.translate(x,y); ctx.scale(rx,ry); ctx.globalAlpha = alpha;
    const g = ctx.createRadialGradient(0,0,0,0,0,1);
    g.addColorStop(0,colour); g.addColorStop(1,'transparent');
    ellipse(0,0,1,1,g);
    ctx.restore();
  }

  ctx.fillStyle = gradient(0,0,360,[[0,'#102736'],[.61,'#1b3949'],[1,'#0f2634']]);
  ctx.fillRect(0,0,720,360);
  glow(360,293,344,39,'#02121f',.9);
  const wall = gradient(0,140,305,[[0,'#d5f5ff'],[.32,'#6e9eae'],[.72,'#254960'],[1,'#7597a1']]);
  ctx.beginPath();
  ctx.ellipse(dish.x,dish.y,dish.rx,dish.ry,0,Math.PI,0);
  ctx.lineTo(dish.x+dish.rx,dish.y+23);
  ctx.ellipse(dish.x,dish.y+23,dish.rx,dish.ry,0,0,Math.PI);
  ctx.closePath(); ctx.fillStyle = wall; ctx.fill();
  ellipse(dish.x,dish.y,dish.rx,dish.ry,gradient(0,134,280,[[0,'#7394a0'],[.38,'#345c71'],[1,'#376177']]),'#bbdde3',3);
  ellipse(dish.x,dish.y+2,dish.rx-9,dish.ry-6,null,'#d8eef477');
  glow(240,175,146,22,'#bfebf9',.24);

  if (p >= 1) return;
  const elapsed = Math.max(0, time - contact * metal.seconds);
  // Several overlapping turns keep the piece on the water, with a short drift against the rim for sodium ignition.
  function track(t) {
    const speed = metal.motion;
    const x = 160 * Math.sin(t * speed * .92) + 42 * Math.sin(t * speed * 2.21);
    const y = 35 * Math.sin(t * speed * 1.49) + 9 * Math.sin(t * speed * 2.77);
    const wall = metal.ignitionAtRim ? smooth((t / metal.seconds - .35) * 6) * smooth((.91 - t / metal.seconds) * 6) : 0;
    return [360 + x * (1 - wall) + 180 * wall, 209 + y * (1 - wall) - 26 * wall];
  }
  const [x,y] = track(elapsed);
  const reaction = clamp((p - contact) / (1 - contact));
  const scale = 1 - .72 * smooth(reaction);
  const active = p >= contact;
  const floating = p < contact ? y - 82 * (1 - (p / contact) ** 2) : y;
  const state = moment(metal,p);
  if (active) {
    ctx.save();
    ctx.beginPath(); ctx.ellipse(dish.x,dish.y,dish.rx-6,dish.ry-5,0,0,Math.PI*2); ctx.clip();
    for (let i = 0; i < 4; i++) {
      const age = (elapsed * 1.55 + i / 4) % 1;
      const [rx,ry] = track(Math.max(0, elapsed - age * .67));
      ctx.globalAlpha = .35 * (1 - age);
      ellipse(rx,ry,7 + age * 47,3 + age * 14,null,'#b9e4ef',1.4);
    }
    for (let i=0; i<metal.bubbles; i++) {
      const age = (elapsed * (1.4 + metal.motion * .24) + i * .37) % 1;
      const [bx,by] = track(Math.max(0,elapsed - age * (.3 + i % 3 * .15)));
      const ang = i * 2.399;
      const radius = 1.4 + age * (i % 4 + .8);
      ctx.globalAlpha = (.9 - .58 * age) * (1 - reaction * .6);
      ellipse(bx + Math.cos(ang) * (8 + 19 * age), by + Math.sin(ang) * (5 + 11 * age),radius,radius *.83,'#d3edfa33','#d7eef9',1.1);
    }
    ctx.restore();
    glow(x,floating + 5,20 * scale,6 * scale,'#061624',.7);
  }

  ctx.save();
  ctx.translate(x,floating - 4);
  const r = 13 * scale;
  const silver = gradient(0,-r,r,[[0,'#fff'],[.3,'#d1dbe1'],[.64,'#63727f'],[1,'#262d34']]);
  if (metal.melt && p >= metal.melt) {
    const liquid = .58 + .42 * smooth((p - metal.melt) * 24);
    ellipse(0,0,r,r * liquid,silver,'#e9f2f7',.6);
    ellipse(-r * .25,-r * liquid * .43,r * .37,r * .16,'#ffffffdc');
  } else {
    ctx.rotate(.1 + Math.sin(elapsed * metal.motion) * .24);
    ctx.beginPath(); ctx.moveTo(-r,-r*.25); ctx.lineTo(-r*.5,-r*.85); ctx.lineTo(r*.55,-r*.62);
    ctx.lineTo(r*.9,0); ctx.lineTo(r*.62,r*.57); ctx.lineTo(-r*.67,r*.43); ctx.closePath();
    ctx.fillStyle = silver; ctx.fill(); ctx.strokeStyle = '#f0f4f7'; ctx.lineWidth = .7; ctx.stroke();
  }
  ctx.restore();

  if (metal.flame && p >= metal.flame[0]) {
    for (let i=0; i<8; i++) {
      const age = ((p - metal.flame[0]) * metal.seconds - i * .12) / 1.7;
      if (age < 0 || age > 1) continue;
      const [originX,originY] = track(Math.max(0,elapsed - age * 1.7));
      glow(originX - 37 * age + Math.sin(i*3.2 + age*5)*13,originY - 23 - age*84,
        11 + 34*age,14 + 26*age,'#f7faf9',.34 * Math.sin(Math.PI * age));
    }
  }
  if (state !== 'flame') return;
  const flameT = (p - metal.flame[0]) / (metal.flame[1] - metal.flame[0]);
  const strength = smooth(flameT * 8) * smooth((1 - flameT) * 7);
  const height = (60 + Math.sin(time * 8) * 9 + Math.sin(time * 13) * 6) * strength;
  const lean = 13 * Math.sin(time * 5.2);
  glow(x,y,68,18,metal.colour,strength * .55);
  glow(x + lean / 2,y - height / 2,41,48,metal.colour,strength * .33);
  if (height < 1) return;
  ctx.save(); ctx.translate(x, y - 5);
  const flame = gradient(0,-height,0,[[0,metal.colour+'40'],[.46,metal.colour],[1,metal.core]]);
  ctx.beginPath(); ctx.moveTo(-10,0);
  ctx.bezierCurveTo(-31,-height*.34,lean-12,-height*.68,lean,-height);
  ctx.bezierCurveTo(lean+7,-height*.76,20,-height*.63,18,-height*.37);
  ctx.bezierCurveTo(24,-height*.19,11,-height*.04,8,0);
  ctx.closePath(); ctx.fillStyle = flame; ctx.fill();
  glow(1,-height*.26,10,16,metal.core,.75);
  ctx.restore();
}

export function alkaliDemoMarkup(t) {
  return `<div class="alkali-demo" id="alkali-demo">
    <div class="alkali-picker" role="group" aria-label="${t('選擇鹼金屬','Choose an alkali metal')}">
      ${Object.entries(metals).map(([symbol, metal]) => `<button type="button" data-metal="${symbol}" aria-pressed="${symbol === 'Li'}"><b>${symbol}</b> ${t(...metal.name)}</button>`).join('')}
    </div>
    <div class="alkali-layout">
      <div class="alkali-player">
        <div class="alkali-stage">
          <canvas width="960" height="480" aria-hidden="true"></canvas>
          <span class="alkali-litmus-strip" aria-hidden="true" hidden></span>
        </div>
        <div class="alkali-controls">
          <button type="button" data-play-water></button>
          <button type="button" data-reset-water>${t('重設','Reset')}</button>
          <button type="button" data-test-litmus aria-describedby="litmus-feedback" disabled>${t('放入紅色石蕊試紙','Dip red litmus paper')}</button>
          <label>${t('反應進度','Reaction progress')} <input type="range" min="0" max="100" value="0"></label>
          <p id="litmus-feedback" role="status"></p>
        </div>
      </div>
      <div class="alkali-observe">
        <h3>${t('逐格觀察','Observe key moments')}</h3>
        <p data-water-phase role="status"></p>
        <div class="alkali-moments" data-water-moments></div>
        <p class="alkali-illustrative">${t('教學模擬。反應時間及播放時的嘶聲只作示意。鈉的火焰為有點燃時的例子。','Teaching simulation. Reaction timing and the playback hiss are illustrative. The sodium clip shows a case where it catches fire.')}</p>
      </div>
    </div>
  </div>`;
}

export function setupAlkaliDemo(t) {
  const root = document.querySelector('#alkali-demo');
  if (!root) return;
  const ctx = root.querySelector('canvas').getContext('2d');
  const play = root.querySelector('[data-play-water]');
  const litmusButton = root.querySelector('[data-test-litmus]');
  const litmusStrip = root.querySelector('.alkali-litmus-strip');
  const litmusFeedback = root.querySelector('#litmus-feedback');
  const range = root.querySelector('input');
  const status = root.querySelector('[data-water-phase]');
  const moments = root.querySelector('[data-water-moments]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const Audio = window.AudioContext || window.webkitAudioContext;
  let symbol = 'Li', p = 0, frame = 0, last = 0, playing = false;
  let testedLitmus = false;
  let audio, gain, hissLevel = 0;
  const phaseText = {
    before: ['留意金屬接觸水面後的變化。','Watch what happens when the metal reaches the water.'],
    fizz: ['金屬浮在水面，冒出氣泡並移動。','The metal floats, fizzes and moves on the water surface.'],
    ball: ['金屬熔成銀色小球。','The metal melts into a silvery ball.'],
    after: ['反應後，金屬消失並留下鹼性溶液。','The metal disappears, leaving an alkaline solution.'],
  };
  function draw() {
    const metal = metals[symbol];
    if (ctx) {
      ctx.setTransform(4 / 3,0,0,4 / 3,0,0);
      paint(ctx, metal, p);
    }
    const phase = moment(metal,p);
    root.dataset.phase = phase;
    if (phase !== 'after') testedLitmus = false;
    litmusButton.disabled = phase !== 'after' || testedLitmus;
    litmusStrip.hidden = !testedLitmus;
    const litmusText = testedLitmus
      ? t('紅色石蕊試紙接觸溶液的部分變藍，顯示溶液呈鹼性。','The wet part of the red litmus paper turns blue. The solution is alkaline.')
      : phase === 'after'
        ? t('放入紅色石蕊試紙，測試反應後留下的溶液。','Dip red litmus paper to test the solution left after the reaction.')
        : t('反應完成後，可以用紅色石蕊試紙測試溶液。','You can test the solution with red litmus paper after the reaction.');
    if (litmusFeedback.textContent !== litmusText) litmusFeedback.textContent = litmusText;
    range.value = Math.round(p * 100);
    const text = t(...(phase === 'flame' ? metal.notes.at(-1).slice(1) : phaseText[phase]));
    if (status.textContent !== text) status.textContent = text;
    const activeMoment = metal.notes.findLast(([n]) => n <= Math.round(p * 100))?.[0];
    moments.querySelectorAll('button').forEach(button => {
      if (Number(button.dataset.moment) === activeMoment && phase !== 'after') button.setAttribute('aria-current','step');
      else button.removeAttribute('aria-current');
    });
    const nextLevel = playing && p >= contact && p < .96 ? metal.motion * .016 : 0;
    if (gain && nextLevel !== hissLevel) {
      gain.gain.setTargetAtTime(nextLevel, audio.currentTime, .03);
      hissLevel = nextLevel;
    }
  }
  function refresh() {
    play.textContent = reduced.matches
      ? (p >= 1 ? t('從頭逐格觀看','Review from start') : t('下一個觀察','Next observation'))
      : playing ? t('暫停','Pause') : p >= 1 ? t('重播','Replay') : t('播放反應','Play reaction');
    draw();
  }
  function stop() {
    playing = false;
    cancelAnimationFrame(frame);
    last = 0;
  }
  function jump(value) {
    stop(); p = value; refresh();
  }
  function tick(now) {
    if (last) p = Math.min(1, p + Math.min(55,now-last) / (metals[symbol].seconds * 1000));
    last = now;
    if (p >= 1) { stop(); refresh(); return; }
    draw();
    frame = requestAnimationFrame(tick);
  }
  function select(next) {
    symbol = next;
    root.dataset.symbol = next;
    root.querySelectorAll('[data-metal]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.metal === next)));
    moments.innerHTML = metals[next].notes.map(([point, zh,en],index) =>
      `<button type="button" data-moment="${point}"><span>${index + 1}</span>${t(zh,en)}</button>`).join('');
    jump(0);
  }
  root.querySelectorAll('[data-metal]').forEach(button => button.addEventListener('click', () => select(button.dataset.metal)));
  moments.addEventListener('click', event => {
    const button = event.target.closest('[data-moment]');
    if (button) jump(Number(button.dataset.moment) / 100);
  });
  play.addEventListener('click', () => {
    if (reduced.matches) {
      jump(p >= 1 ? 0 : (metals[symbol].notes.find(([n]) => n > Math.round(p * 100))?.[0] ?? 100) / 100);
    } else if (playing) {
      stop();
      refresh();
    } else {
      if (p >= 1) p = 0;
      void prepareHiss();
      playing = true; refresh(); frame = requestAnimationFrame(tick);
    }
  });
  root.querySelector('[data-reset-water]').addEventListener('click', () => jump(0));
  litmusButton.addEventListener('click', () => {
    testedLitmus = true;
    draw();
  });
  range.addEventListener('input', () => jump(Number(range.value) / 100));
  document.addEventListener('visibilitychange', () => { if (document.hidden) { stop(); refresh(); } });
  reduced.addEventListener('change', () => { stop(); refresh(); });
  async function prepareHiss() {
    if (!Audio) return;
    try {
      if (!audio) {
        audio = new Audio();
        const noise = audio.createBuffer(1,audio.sampleRate * 2,audio.sampleRate);
        const data = noise.getChannelData(0);
        for (let i=0;i<data.length;i++) data[i] = (Math.random() * 2 - 1) * (.65 + .20 * Math.sin(i / 290));
        const source = audio.createBufferSource();
        source.buffer = noise; source.loop = true;
        const filter = audio.createBiquadFilter();
        filter.type = 'bandpass'; filter.frequency.value = 3800;
        gain = audio.createGain(); gain.gain.value = 0;
        source.connect(filter).connect(gain).connect(audio.destination);
        source.start();
      }
      if (audio.state === 'suspended') await audio.resume();
    } catch {
      // Keep the visual experiment usable if the browser cannot play audio.
    }
  }
  select('Li');
}
