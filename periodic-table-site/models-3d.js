// Small, dependency-free 3D scenes, projected onto canvas like Chapter 1's models.
// Coordinates are teaching illustrations, not atomic sizes or measured reaction rates.
export function shellElectronPositions(count, radius, center = 145) {
  return Array.from({ length: count }, (_, index) => {
    const paired = count > 4;
    const slot = paired ? index % 4 : index;
    const angle = -Math.PI / 2 + 2 * Math.PI * slot / (paired ? 4 : count);
    const hasPartner = paired && (index >= 4 || slot < count - 4);
    const offset = hasPartner ? (index < 4 ? -0.075 : 0.075) : 0;
    return { x: center + radius * Math.cos(angle + offset), y: center + radius * Math.sin(angle + offset) };
  });
}

export const reactionSeconds = { Li: 16, Na: 11, K: 7, Mg: 14, Ca: 8, C: 8 };
const halo = {
  F: { state: 'gas', colour: '#dae681' }, Cl: { state: 'gas', colour: '#99cd66' },
  Br: { state: 'liquid', colour: '#b96142' }, I: { state: 'solid', colour: '#9582bb' },
};
const nobleColours = { He: '#e6b965', Ne: '#ee916a', Ar: '#70c7d9' };
const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
const mix = (a, b, n) => a + (b - a) * n;
const reflect = (value, limit) => limit - Math.abs(((value + limit) % (4 * limit) + 4 * limit) % (4 * limit) - 2 * limit);
const point = (x, y, z) => ({ x, y, z });
const circle = (radius, y, count = 40) => Array.from({ length: count }, (_, i) => point(radius * Math.cos(i * Math.PI * 2 / count), y, radius * Math.sin(i * Math.PI * 2 / count)));

export function reactionPhase(progress, symbol) {
  if (progress === 0) return 'before';
  if (progress < 0.18) return 'adding';
  if (symbol === 'C') return 'unchanged';
  return progress >= 1 ? 'after' : 'reacting';
}

export function buildScene(kind, symbol, progress = 0, time = 0) {
  const scene = { shapes: [], state: '', particles: 0, bonds: 0, metalPresent: false };
  const polygon = (points, colour, opacity = 1, stroke = '') => scene.shapes.push({ type: 'polygon', points, colour, opacity, stroke });
  const line = (a, b, colour, width = 0.02, opacity = 1) => scene.shapes.push({ type: 'line', points: [a, b], colour, width, opacity });
  const ball = (position, radius, colour, label = '', opacity = 1, bubble = false) => scene.shapes.push({ type: 'sphere', ...position, radius, colour, label, opacity, bubble });
  const ring = (radius, y, colour, opacity = 1) => {
    const points = circle(radius, y);
    points.forEach((p, i) => line(p, points[(i + 1) % points.length], colour, 0.018, opacity));
  };
  const vessel = (radius, bottom, top, water) => {
    const low = circle(radius, bottom, 24), high = circle(radius, top, 24);
    for (let i = 0; i < 24; i++) {
      const next = (i + 1) % 24;
      polygon([low[i], low[next], high[next], high[i]], '#a3d9ea', 0.065);
      const wet = [low[i], low[next], point(low[next].x, water, low[next].z), point(low[i].x, water, low[i].z)];
      polygon(wet, '#6fd0e5', 0.08);
    }
    polygon(circle(radius * 0.98, water), '#63c4e0', 0.22, '#8cdbef');
    polygon(low, '#b1d7df', 0.06);
    ring(radius, bottom, '#a4d1dc', 0.8);
    ring(radius, top, '#d0eff6', 0.9);
    line(point(-radius, bottom, 0), point(-radius, top, 0), '#b3d9e2', 0.018, 0.55);
    line(point(radius, bottom, 0), point(radius, top, 0), '#b3d9e2', 0.018, 0.55);
  };
  const box = (x, y, z, size, colour) => {
    const points = [-1, 1].flatMap(a => [-1, 1].flatMap(b => [-1, 1].map(c => point(x + a * size, y + b * size * 0.65, z + c * size))));
    for (const face of [[0, 1, 3, 2], [4, 6, 7, 5], [0, 4, 5, 1], [2, 3, 7, 6], [0, 2, 6, 4], [1, 5, 7, 3]]) polygon(face.map(i => points[i]), colour, 1, '#e1edf0');
  };
  // Floor lines give depth without hiding particles behind an opaque surface.
  for (let i = -3; i <= 3; i++) {
    line(point(i * 0.55, -1.52, -1.7), point(i * 0.55, -1.52, 1.7), '#4d7a8c', 0.008, 0.4);
    line(point(-1.7, -1.52, i * 0.55), point(1.7, -1.52, i * 0.55), '#4d7a8c', 0.008, 0.4);
  }
  if (kind === 'water' || kind === 'acid') {
    const water = kind === 'water';
    const p = clamp(progress, 0, 1);
    const reacted = clamp((p - 0.18) / 0.82, 0, 1);
    const unchanged = symbol === 'C';
    const speed = water ? ({ Li: 0.8, Na: 1.9, K: 2.8 }[symbol] || 1) : 0;
    vessel(water ? 1.42 : 0.64, -1.4, 1.25, water ? 0.03 : 0.3);
    const active = p >= 0.18 && p < 0.98 && !unchanged;
    const travel = Math.max(0, p - 0.18) * reactionSeconds[symbol];
    const x = water && p > 0.18 ? Math.sin(travel * speed) * 0.65 : 0;
    const z = water && p > 0.18 ? Math.sin(travel * speed * 0.7) * 0.45 : 0;
    const restingY = water ? 0.18 : -1.12;
    const y = mix(1.85, restingY, clamp(p / 0.18, 0, 1));
    const size = unchanged ? 0.23 : 0.27 * Math.cbrt(1 - reacted);
    scene.metalPresent = size > 0.015;
    if (scene.metalPresent) {
      const metalColour = unchanged ? '#555e6b' : '#bac8d5';
      if (water && symbol !== 'Li' && reacted > 0.12) ball(point(x, y, z), size, metalColour, symbol);
      else {
        box(x, y, z, size, metalColour);
        scene.shapes.push({ type: 'label', ...point(x, y + size + 0.14, z), label: symbol });
      }
    }
    if (active) {
      const count = { Li: 8, Na: 15, K: 23, Mg: 9, Ca: 18 }[symbol] || 0;
      for (let i = 0; i < count; i++) {
        const age = (travel * (water ? 0.55 : 0.8) + i / count) % 1;
        const angle = i * 2.399;
        const spread = water ? 0.2 + age * 0.6 : 0.12 + age * 0.2;
        ball(point(x + Math.cos(angle) * spread, restingY + 0.12 + age * (water ? 1.55 : 2.1), z + Math.sin(angle) * spread), 0.045 + age * 0.045, '#bdefff', '', 1 - age * 0.7, true);
      }
      if (symbol === 'K' && reacted > 0.12 && reacted < 0.85) {
        for (let i = 0; i < 5; i++) ball(point(x + Math.sin(time * 7 + i) * 0.08, y + 0.19 + i * 0.1, z), (0.16 - i * 0.022), '#ceadff', '', 0.55);
      }
    }
    scene.state = reactionPhase(p, symbol);
    return scene;
  }
  const isHalogen = kind === 'halogen';
  const state = isHalogen ? halo[symbol].state : 'gas';
  const colour = isHalogen ? halo[symbol].colour : nobleColours[symbol];
  const count = state === 'gas' ? 8 : 12;
  const gasSeeds = [[-1, 0.85, -0.65], [0.9, 1.05, 0.6], [-1, -0.85, 0.7], [0.85, -0.9, -0.8], [-0.05, 0.18, -1.05], [0.2, -0.2, 1.05], [-1.12, 0.1, -0.1], [1.05, 0.08, 0.1]];
  const extent = 1.55;
  for (const y of [-1.4, 1.4]) {
    const corners = [point(-extent, y, -extent), point(extent, y, -extent), point(extent, y, extent), point(-extent, y, extent)];
    corners.forEach((p, i) => line(p, corners[(i + 1) % 4], '#6ea0b2', 0.015, 0.5));
  }
  for (const x of [-extent, extent]) for (const z of [-extent, extent]) line(point(x, -1.4, z), point(x, 1.4, z), '#6ea0b2', 0.015, 0.5);
  for (let i = 0; i < count; i++) {
    let x, y, z;
    if (state === 'gas') {
      x = reflect(gasSeeds[i][0] + time * (i % 2 ? 0.32 : -0.29), 1.15);
      y = reflect(gasSeeds[i][1] + time * (i % 3 ? -0.26 : 0.35), 1.12);
      z = reflect(gasSeeds[i][2] + time * (i % 2 ? -0.24 : 0.31), 1.15);
    } else {
      const motion = state === 'liquid' ? 0.12 : 0.017;
      x = (i % 3 - 1) * 0.87 + Math.sin(time * 1.4 + i) * motion;
      y = (Math.floor(i / 3) % 2) * 0.64 - 0.95 + Math.cos(time * 1.9 + i * 2) * motion;
      z = (Math.floor(i / 6) - 0.5) * 1.2 + Math.sin(time * 1.5 + i * 3) * motion;
    }
    if (isHalogen) {
      const angle = state === 'solid' ? 0 : time * 0.2 + i * 1.8;
      const a = point(x - Math.cos(angle) * 0.19, y - Math.sin(angle) * 0.19, z);
      const b = point(x + Math.cos(angle) * 0.19, y + Math.sin(angle) * 0.19, z);
      line(a, b, '#d9e7ed', 0.09);
      ball(a, 0.215, colour, symbol);
      ball(b, 0.215, colour, symbol);
      scene.bonds++;
    } else ball(point(x, y, z), 0.20, colour, symbol);
  }
  scene.state = state;
  scene.particles = count * (isHalogen ? 2 : 1);
  return scene;
}

export function modelMarkup(id, kind, en) {
  const t = (zh, english) => en ? english : zh;
  const reaction = kind === 'water' || kind === 'acid';
  return `<div class="classroom-3d" id="${id}" data-kind="${kind}">
    <div class="scene-heading"><b>3D ${t('模型', 'MODEL')}</b><span data-scene-phase aria-live="polite"></span></div>
    <canvas class="scene-canvas" tabindex="0" role="img" aria-label="${t('可旋轉三維模型。拖曳或用方向鍵旋轉，使用下方按鈕縮放。', 'Rotatable 3D model. Drag or use arrow keys to rotate; zoom with the controls below.')}">${t('三維教學模型；文字觀察列在模型旁。', '3D teaching model; the observation is also described beside the model.')}</canvas>
    <div class="scene-toolbar"><span>${t('拖曳旋轉', 'Drag to rotate')}</span><div>
      <button type="button" data-view="left" aria-label="${t('向左旋轉模型', 'Rotate model left')}">↶</button>
      <button type="button" data-view="right" aria-label="${t('向右旋轉模型', 'Rotate model right')}">↷</button>
      <button type="button" data-view="out" aria-label="${t('縮小模型', 'Zoom out')}">−</button>
      <button type="button" data-view="in" aria-label="${t('放大模型', 'Zoom in')}">＋</button>
      <button type="button" data-view="reset" aria-label="${t('重設視角', 'Reset view')}">⟲</button>
    </div></div>
    <div class="scene-playback"><button type="button" class="scene-play" data-play></button>${reaction ? `<button type="button" data-restart>${t('重新開始', 'Restart')}</button><label class="scene-timeline"><span>${t('反應進度', 'Reaction progress')}</span><input type="range" min="0" max="100" value="0" step="1" data-progress /></label>` : `<span class="particle-caption">${t('一個球代表一個原子', 'One sphere represents one atom')}</span>`}</div>
    <p class="scene-note">${reaction ? t('簡化觀察模型；顏色與速度只作示意。', 'Simplified observation model; colours and speeds are illustrative.') : t('粒子的顏色、大小和距離只作示意。', 'Particle colours, sizes and distances are illustrative.')}</p>
  </div>`;
}

export function createClassroomModel(root, initialSymbol, en) {
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const t = (zh, english) => en ? english : zh;
  if (!ctx) { root.querySelector('[data-scene-phase]').textContent = t('此瀏覽器未能顯示模型，請參考文字觀察。', 'Model unavailable in this browser; use the written observation.'); return { setElement() {} }; }
  const kind = root.dataset.kind;
  const reaction = kind === 'water' || kind === 'acid';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const playButton = root.querySelector('[data-play]');
  const slider = root.querySelector('[data-progress]');
  const phaseLabel = root.querySelector('[data-scene-phase]');
  let symbol = initialSymbol, progress = 0, time = 0, running = !reaction && !reduced.matches;
  let yaw = 0.38, pitch = 0.22, zoom = 1, last = 0, frame = 0, visible = true, drag = null;
  const phaseNames = { before: ['加入前', 'Before adding'], adding: ['加入中', 'Adding'], reacting: ['反應中 · 氫氣氣泡', 'Reacting · hydrogen bubbles'], after: [kind === 'water' ? '反應後 · 鹼性溶液' : '反應後 · 金屬已溶解', kind === 'water' ? 'After · alkaline solution' : 'After · metal dissolved'], unchanged: ['沒有明顯反應', 'No visible reaction'], gas: ['氣體', 'Gas'], liquid: ['液體', 'Liquid'], solid: ['固體', 'Solid'] };
  function syncControls() {
    playButton.textContent = running ? t('暫停', 'Pause') : reaction ? (progress >= 1 ? t('重播反應', 'Replay reaction') : t('播放反應', 'Play reaction')) : t('播放', 'Play');
    playButton.setAttribute('aria-pressed', String(running));
    if (slider) slider.value = String(Math.round(progress * 100));
    root.dataset.symbol = symbol;
    canvas.setAttribute('aria-label', `${symbol} · ${t('三維模型。拖曳或用方向鍵旋轉；下方按鈕可縮放和播放。', '3D model. Drag or use arrow keys to rotate; controls below zoom and play.')}`);
  }
  function draw() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const w = rect.width, h = rect.height, dpr = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) { canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    const scale = Math.min(w / 4.9, h / 4.8) * zoom;
    const project = (p) => {
      const x = p.x * Math.cos(yaw) + p.z * Math.sin(yaw);
      const z = -p.x * Math.sin(yaw) + p.z * Math.cos(yaw);
      const y = p.y * Math.cos(pitch) - z * Math.sin(pitch);
      const depth = p.y * Math.sin(pitch) + z * Math.cos(pitch);
      const factor = 9 / (9 - depth);
      return { x: w / 2 + x * scale * factor, y: h * 0.51 - y * scale * factor, depth, factor };
    };
    const scene = buildScene(kind, symbol, progress, time);
    const phaseText = t(...phaseNames[scene.state]);
    if (phaseLabel.textContent !== phaseText) phaseLabel.textContent = phaseText;
    root.dataset.phase = scene.state;
    root.dataset.progress = String(Math.round(progress * 100));
    const projected = scene.shapes.map(shape => {
      if (shape.points) { const points = shape.points.map(project); return { ...shape, projected: points, depth: points.reduce((sum, p) => sum + p.depth, 0) / points.length }; }
      const p = project(shape); return { ...shape, projected: p, depth: p.depth };
    }).sort((a, b) => a.depth - b.depth);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (const shape of projected) {
      ctx.globalAlpha = shape.opacity ?? 1;
      const p = shape.projected;
      if (shape.type === 'line' || shape.type === 'polygon') {
        ctx.beginPath(); ctx.moveTo(p[0].x, p[0].y);
        for (const vertex of p.slice(1)) ctx.lineTo(vertex.x, vertex.y);
        if (shape.type === 'polygon') { ctx.closePath(); ctx.fillStyle = shape.colour; ctx.fill(); if (shape.stroke) { ctx.strokeStyle = shape.stroke; ctx.lineWidth = 0.8; ctx.stroke(); } }
        else { ctx.strokeStyle = shape.colour; ctx.lineWidth = Math.max(0.65, shape.width * scale); ctx.stroke(); }
      } else if (shape.type === 'sphere') {
        const radius = shape.radius * scale * p.factor;
        const gradient = ctx.createRadialGradient(p.x - radius * 0.32, p.y - radius * 0.4, radius * 0.02, p.x, p.y, radius);
        gradient.addColorStop(0, shape.bubble ? '#ffffffbb' : '#f7ffff');
        gradient.addColorStop(0.28, shape.bubble ? '#bdefff40' : shape.colour);
        gradient.addColorStop(1, shape.bubble ? '#a6dbe57a' : '#23374b');
        ctx.beginPath(); ctx.arc(p.x, p.y, radius, 0, Math.PI * 2); ctx.fillStyle = gradient; ctx.fill();
        if (shape.bubble) { ctx.strokeStyle = '#d8f8ff'; ctx.lineWidth = 0.75; ctx.stroke(); }
        if (shape.label && radius > 9) { ctx.fillStyle = '#ffffff'; ctx.font = `700 ${Math.max(10, radius * 0.8)}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(shape.label, p.x, p.y); }
      } else { ctx.fillStyle = '#fff'; ctx.font = '700 16px Arial'; ctx.textAlign = 'center'; ctx.fillText(shape.label, p.x, p.y); }
    }
    ctx.globalAlpha = 1;
  }
  function schedule() {
    if (!frame && running && visible && !document.hidden) frame = requestAnimationFrame(tick);
  }
  function tick(now) {
    frame = 0;
    const dt = last ? Math.min((now - last) / 1000, 0.05) : 0;
    last = now;
    if (running && visible && !document.hidden) {
      time += dt;
      if (reaction) {
        progress = Math.min(1, progress + dt / reactionSeconds[symbol]);
        if (slider) slider.value = String(Math.round(progress * 100));
        if (progress === 1) { running = false; syncControls(); }
      }
      draw(); schedule();
    }
  }
  function refresh() { last = 0; syncControls(); draw(); schedule(); }
  playButton.addEventListener('click', () => { if (reaction && progress >= 1) { progress = 0; time = 0; } running = !running; refresh(); });
  root.querySelector('[data-restart]')?.addEventListener('click', () => { progress = 0; time = 0; running = false; refresh(); });
  slider?.addEventListener('input', () => { progress = Number(slider.value) / 100; time = progress * reactionSeconds[symbol]; running = false; refresh(); });
  root.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => {
    const action = button.dataset.view;
    if (action === 'left') yaw -= 0.25;
    if (action === 'right') yaw += 0.25;
    if (action === 'in') zoom = Math.min(1.6, zoom + 0.15);
    if (action === 'out') zoom = Math.max(0.65, zoom - 0.15);
    if (action === 'reset') { yaw = 0.38; pitch = 0.22; zoom = 1; }
    draw();
  }));
  canvas.addEventListener('pointerdown', event => { drag = { x: event.clientX, y: event.clientY }; canvas.setPointerCapture(event.pointerId); });
  canvas.addEventListener('pointermove', event => { if (!drag) return; yaw += (event.clientX - drag.x) * 0.009; pitch = clamp(pitch + (event.clientY - drag.y) * 0.009, -0.8, 0.8); drag = { x: event.clientX, y: event.clientY }; draw(); });
  for (const eventName of ['pointerup', 'pointercancel', 'lostpointercapture']) canvas.addEventListener(eventName, () => { drag = null; });
  canvas.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') yaw -= 0.15;
    if (event.key === 'ArrowRight') yaw += 0.15;
    if (event.key === 'ArrowUp') pitch = clamp(pitch + 0.12, -0.8, 0.8);
    if (event.key === 'ArrowDown') pitch = clamp(pitch - 0.12, -0.8, 0.8);
    draw();
  });
  const observer = new ResizeObserver(draw); observer.observe(canvas);
  const visibility = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; last = 0; if (visible) { draw(); schedule(); } }); visibility.observe(root);
  document.addEventListener('visibilitychange', () => { last = 0; if (!document.hidden) schedule(); });
  reduced.addEventListener('change', () => { if (reduced.matches) { running = false; refresh(); } });
  refresh();
  return { setElement(next) { symbol = next; progress = 0; time = 0; if (reaction) running = false; refresh(); } };
}
