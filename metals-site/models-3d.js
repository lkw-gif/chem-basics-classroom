// Interactive, dependency-free teaching models for Unit 4.
// Shapes and particle paths are simplified illustrations, not scale diagrams.

const SCENES = {
  panning: {
    title: ['淘金：按密度分開', 'Panning: separating by density'],
    description: ['轉動淘金盤，觀察金粒留在盤底、較輕的沙被水帶走。', 'Rotate the pan: dense gold grains stay while lighter sand washes away.'],
    captions: [
      ['金粒與沙粒混在一起。', 'Gold grains and sand begin together.'],
      ['水帶走較輕的沙粒；金粒較易留在盤底。', 'Water washes lighter sand away; denser gold stays near the bottom.'],
      ['淘金是物理分離：金本身沒有變成另一種物質。', 'Panning is physical separation: the gold does not become a new substance.'],
    ],
  },
  heating: {
    title: ['加熱銀氧化物', 'Heating silver oxide'],
    description: ['觀察銀氧化物受熱後，形成銀和氧氣。', 'Watch silver oxide decompose into silver and oxygen when heated.'],
    captions: [
      ['試管內是銀氧化物。', 'The tube contains silver oxide.'],
      ['加熱使銀氧化物分解，銀粒出現，氧氣逸出。', 'Heating decomposes silver oxide: silver appears and oxygen escapes.'],
      ['銀氧化物 → 銀 ＋ 氧氣。這個方法只適用於少數較不活潑金屬的化合物。', 'Silver oxide → silver + oxygen. Direct heating works for only a few less reactive metal compounds.'],
    ],
  },
  carbon: {
    title: ['碳還原氧化銅', 'Carbon reduces copper oxide'],
    description: ['追蹤氧由氧化銅轉移到碳，留下銅。', 'Track oxygen moving from copper oxide to carbon, leaving copper.'],
    captions: [
      ['黑色氧化銅與碳一起加熱。', 'Black copper(II) oxide and carbon are heated together.'],
      ['碳拿走氧化銅中的氧；紅棕色銅逐漸形成。', 'Carbon removes oxygen from copper(II) oxide; reddish-brown copper forms.'],
      ['氧化銅 ＋ 碳 → 銅 ＋ 二氧化碳（簡化示意）。', 'Copper(II) oxide + carbon → copper + carbon dioxide (simplified model).'],
    ],
  },
  electrolysis: {
    title: ['熔融氧化鋁的電解', 'Electrolysis of molten aluminium oxide'],
    description: ['Al³⁺ 移向負極；O²⁻ 移向碳正極。', 'Al³⁺ moves to the negative cathode; O²⁻ moves to the positive carbon anode.'],
    captions: [
      ['熔融物內的 Al³⁺ 和 O²⁻ 可以移動。', 'Al³⁺ and O²⁻ can move through the molten mixture.'],
      ['Al³⁺ 移向負極得到電子；O²⁻ 移向碳正極失去電子。', 'Al³⁺ moves to the cathode and gains electrons; O²⁻ moves to the carbon anode and loses electrons.'],
      ['鋁在負極形成；正極釋出的氧與碳反應，主要形成 CO₂。', 'Aluminium forms at the cathode; oxygen released at the carbon anode reacts with it, mainly forming CO₂.'],
    ],
  },
  rust: {
    title: ['鐵釘生銹的條件', 'Conditions for rusting'],
    description: ['比較乾燥空氣、隔絕氧氣的水，以及水與氧氣同時存在。', 'Compare dry air, water without oxygen, and water with oxygen.'],
    captions: [
      ['乾燥空氣缺少水，鐵不會明顯生銹。', 'Dry air lacks water, so the iron does not appreciably rust.'],
      ['水已煮沸並以油層隔絕空氣：缺少氧氣，不會明顯生銹。', 'Boiled water under oil excludes oxygen, so the iron does not appreciably rust.'],
      ['水和氧氣同時存在，鐵釘表面逐漸出現紅棕色鐵鏽。', 'With both water and oxygen present, reddish-brown rust gradually appears.'],
    ],
  },
};

const instances = new Map();
const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
const label = (pair, language) => pair[language === 'en' ? 1 : 0];

export function modelMarkup(kind, language = 'zh') {
  const scene = SCENES[kind];
  if (!scene) throw new Error(`Unknown extraction model: ${kind}`);
  const en = language === 'en';
  return `<section class="extraction-model" data-extraction-model="${kind}" data-kind="${kind}" aria-label="${label(scene.title, language)}">
    <div class="extraction-model-stage">
      <canvas width="800" height="420" tabindex="0" role="img" aria-label="${label(scene.description, language)}" data-model-canvas></canvas>
      <span class="extraction-model-badge">${en ? '3D CLASSROOM MODEL' : '3D 課堂模型'}</span>
    </div>
    <p class="extraction-model-caption" data-model-caption role="status">${label(scene.captions[0], language)}</p>
    ${kind === 'electrolysis' ? `<div class="extraction-model-legend"><span>Al³⁺ → ${en ? 'negative cathode (−)' : '負極（陰極 −）'}</span><span>O²⁻ → ${en ? 'carbon anode (+)' : '碳正極（陽極 +）'}</span></div>` : ''}
    ${kind === 'electrolysis' ? `<p class="extraction-model-note">${en ? 'At the carbon anode, oxygen from oxide ions reacts with carbon; carbon dioxide is formed and the anode is gradually used up.' : '在碳正極，氧化物離子釋出的氧會與碳反應，形成二氧化碳；碳電極會逐漸消耗。'}</p>` : ''}
    ${kind === 'rust' ? `<div class="extraction-rust-picker" role="group" aria-label="${en ? 'Choose rusting condition' : '選擇生銹條件'}">
      <button type="button" data-rust-condition="dry" aria-pressed="false">${en ? 'Dry air' : '乾燥空氣'}</button>
      <button type="button" data-rust-condition="water" aria-pressed="false">${en ? 'Water, no O₂' : '有水、無氧'}</button>
      <button type="button" data-rust-condition="both" aria-pressed="true">${en ? 'Water + O₂' : '水＋氧氣'}</button>
    </div>` : ''}
    <div class="extraction-model-controls" role="group" aria-label="${en ? 'Animation controls' : '動畫控制'}">
      <button type="button" data-model-action="play" aria-label="${en ? 'Pause animation' : '暫停動畫'}">${en ? 'Pause' : '暫停'}</button>
      <button type="button" data-model-action="restart">${en ? 'Restart' : '重新播放'}</button>
      <label class="extraction-model-timeline">${en ? 'Progress' : '進度'} <input type="range" min="0" max="100" value="0" step="1" data-model-scrub aria-label="${en ? 'Animation progress' : '動畫進度'}"><output data-model-percent>0%</output></label>
      <button type="button" data-model-action="rotate-left" aria-label="${en ? 'Rotate view left' : '向左旋轉視角'}">↶</button>
      <button type="button" data-model-action="rotate-right" aria-label="${en ? 'Rotate view right' : '向右旋轉視角'}">↷</button>
      <button type="button" data-model-action="zoom-out" aria-label="${en ? 'Zoom out' : '縮小'}">−</button>
      <button type="button" data-model-action="zoom-in" aria-label="${en ? 'Zoom in' : '放大'}">＋</button>
    </div>
    <small class="extraction-model-help">${en ? 'Drag the model to rotate. Use the slider or focus the model and press ←/→ to move in time, ↑/↓ to rotate, +/− to zoom, and Space to play or pause.' : '拖動畫面可轉動視角；亦可拖動進度條。聚焦模型後，用 ←/→ 調整時間、↑/↓ 轉動視角、＋/− 縮放、空白鍵播放或暫停。'}</small>
  </section>`;
}

function rounded(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function pill(ctx, x, y, text, fill = '#ffffffd9', ink = '#25465b') {
  ctx.font = '700 14px Arial, sans-serif';
  const width = Math.max(43, ctx.measureText(text).width + 20);
  rounded(ctx, x - width / 2, y - 12, width, 24, 9);
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.fillStyle = ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);
}

function sphere(ctx, x, y, radius, colour, shine = '#ffffffd9') {
  const gradient = ctx.createRadialGradient(x - radius * .38, y - radius * .45, radius * .08, x + radius * .15, y + radius * .15, radius * 1.15);
  gradient.addColorStop(0, shine);
  gradient.addColorStop(.28, colour);
  gradient.addColorStop(1, '#263c49');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#ffffff80';
  ctx.lineWidth = 1;
  ctx.stroke();
}

function shadow(ctx, x, y, rx, ry, opacity = .13) {
  ctx.fillStyle = `rgba(29,56,69,${opacity})`;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

function stage(ctx, width, height, yaw) {
  const background = ctx.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, '#eaf5f3');
  background.addColorStop(.6, '#f6faf8');
  background.addColorStop(1, '#e5f0f5');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, width, height);
  const horizon = height * .76;
  ctx.strokeStyle = '#9fbfbd66';
  ctx.lineWidth = 1;
  const drift = Math.sin(yaw) * 22;
  for (let i = -3; i <= 3; i++) {
    ctx.beginPath();
    ctx.moveTo(width * .5 + i * width * .1 + drift, horizon);
    ctx.lineTo(width * .5 + i * width * .22 + drift, height);
    ctx.stroke();
  }
  for (let i = 0; i < 4; i++) {
    const y = horizon + (i / 3) ** 1.7 * (height - horizon);
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
  }
}

function drawPanning(ctx, w, h, progress, yaw) {
  const cx = w * .5 + Math.sin(yaw) * w * .035;
  const cy = h * .55;
  const rx = Math.min(w * .31, 230);
  const ry = Math.min(h * .24, 100) * (.91 + .09 * Math.cos(yaw));
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(Math.sin(yaw / 2) * .55);
  ctx.translate(-cx, -cy);
  shadow(ctx, cx, cy + ry * 1.25, rx * .95, ry * .46, .22);
  ctx.fillStyle = '#54737c';
  ctx.beginPath(); ctx.ellipse(cx, cy + 18, rx + 15, ry + 24, Math.sin(yaw) * .1, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#2f5662';
  ctx.beginPath(); ctx.ellipse(cx, cy, rx + 11, ry + 10, Math.sin(yaw) * .1, 0, Math.PI * 2); ctx.fill();
  const water = ctx.createRadialGradient(cx - rx * .3, cy - ry * .4, 10, cx, cy, rx);
  water.addColorStop(0, '#b6e2df'); water.addColorStop(1, '#5ba4af');
  ctx.fillStyle = water;
  ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, Math.sin(yaw) * .1, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = '#d8f3efad'; ctx.lineWidth = 3;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.ellipse(cx + Math.sin(progress * 7 + i) * 10, cy + (i - 1) * 9, rx * (.45 + i * .16), ry * (.34 + i * .12), 0, -.25, 2.2);
    ctx.stroke();
  }
  for (let i = 0; i < 21; i++) {
    const angle = i * 2.399;
    const spread = .25 + ((i * 37) % 11) / 14;
    const x = cx + Math.cos(angle) * rx * spread + progress * (i % 3 === 0 ? rx * 1.9 : rx * 1.3);
    const y = cy + Math.sin(angle) * ry * spread - progress * (i % 3 === 0 ? 25 : 45);
    if (x > cx + rx * .94 || y < cy - ry * .94) continue;
    sphere(ctx, x, y, 4 + i % 4, '#987d66');
  }
  for (let i = 0; i < 8; i++) {
    const angle = i * 2.1;
    const settle = progress * .58;
    const x = cx - rx * .29 + Math.cos(angle) * rx * .16 + settle * rx * .03;
    const y = cy + ry * (.14 + settle) + Math.sin(angle) * ry * .13;
    sphere(ctx, x, y, 6 + i % 3, '#e1af2c', '#fff4ba');
  }
  pill(ctx, cx - rx * .43, cy + ry * .89, 'Au', '#fff3c8', '#855d0f');
  ctx.restore();
}

function drawFlame(ctx, x, y, height, time) {
  ctx.save();
  ctx.shadowBlur = 20; ctx.shadowColor = '#ec8b3b';
  const gradient = ctx.createLinearGradient(x, y, x, y - height);
  gradient.addColorStop(0, '#e65435'); gradient.addColorStop(.55, '#ffb45b'); gradient.addColorStop(1, '#fff0b3');
  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.moveTo(x - 27, y);
  ctx.bezierCurveTo(x - 35, y - height * .35, x - 8, y - height * .6, x + Math.sin(time * 13) * 9, y - height);
  ctx.bezierCurveTo(x + 28, y - height * .57, x + 35, y - height * .3, x + 27, y);
  ctx.closePath(); ctx.fill();
  ctx.restore();
}

function drawHeating(ctx, w, h, progress, yaw) {
  const cx = w * .5 + Math.sin(yaw) * w * .035;
  const top = h * .13, bottom = h * .7;
  const tubeWidth = Math.min(w * .31, 190);
  const left = cx - tubeWidth / 2;
  shadow(ctx, cx, h * .79, tubeWidth * .75, 18, .16);
  ctx.fillStyle = '#9ab9c05c';
  rounded(ctx, left, top, tubeWidth, bottom - top, 28); ctx.fill();
  ctx.strokeStyle = '#789dac'; ctx.lineWidth = 8; ctx.stroke();
  ctx.fillStyle = '#f9ffffb5';
  rounded(ctx, left + 9, top + 10, tubeWidth - 18, bottom - top - 24, 19); ctx.fill();
  ctx.fillStyle = '#41535a';
  ctx.beginPath(); ctx.ellipse(cx, bottom - 30, tubeWidth * .39, 18, 0, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 15; i++) {
    const x = cx + Math.cos(i * 2.4) * tubeWidth * (.13 + (i % 3) * .075);
    const y = bottom - 36 + Math.sin(i * 2.4) * 12;
    sphere(ctx, x, y, 5 + i % 3, i / 15 < progress ? '#b8c5c8' : '#393a3f');
  }
  if (progress > .22) {
    for (let i = 0; i < 7; i++) {
      const visible = clamp((progress - .2) * 1.3 - i * .11, 0, 1);
      if (!visible) continue;
      const x = cx + Math.sin(i * 1.8 + yaw) * tubeWidth * .24;
      const y = bottom - 53 - visible * (bottom - top - 75);
      sphere(ctx, x, y, 6 + i % 2, '#9bcbd6', '#f4ffff');
    }
    pill(ctx, cx + tubeWidth * .55, top + 42, 'O₂', '#e8f5fc', '#296785');
  }
  drawFlame(ctx, cx, h * .93, h * (.15 + .02 * Math.sin(progress * 10)), progress);
  pill(ctx, cx - tubeWidth * .55, bottom - 12, progress < .5 ? 'Ag₂O' : 'Ag', '#ffffffec');
}

function drawCarbon(ctx, w, h, progress, yaw) {
  const cx = w * .5 + Math.sin(yaw) * w * .025;
  const base = h * .72;
  shadow(ctx, cx, base + 27, Math.min(w * .34, 250), 20, .18);
  const trayWidth = Math.min(w * .62, 450);
  ctx.fillStyle = '#617780';
  rounded(ctx, cx - trayWidth / 2, base - 12, trayWidth, 45, 16); ctx.fill();
  ctx.fillStyle = '#a8bac0';
  ctx.beginPath(); ctx.ellipse(cx, base - 10, trayWidth / 2, 26, 0, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 2; i++) {
    const x = cx - trayWidth * .3 + i * trayWidth * .19;
    const y = base - 37 - (i % 2) * 10;
    sphere(ctx, x, y, 19, progress > .55 ? '#b86e4e' : '#313e44');
    if (progress < .8) {
      const travel = clamp((progress - .2) / .6, 0, 1);
      sphere(ctx, x + 27 + travel * (cx + trayWidth * .2 - x - 27), y - 24 - travel * (38 + i * 3), 12, '#cf6760', '#ffd2c9');
    }
  }
  ctx.save();
  ctx.globalAlpha = 1 - clamp((progress - .62) / .38, 0, 1);
  sphere(ctx, cx + trayWidth * .3, base - 39, 22, '#3f4b50');
  ctx.restore();
  if (progress > .62) {
    const rise = (progress - .62) / .38;
    const px = cx + trayWidth * .28;
    const py = base - 80 - rise * h * .31;
    sphere(ctx, px, py, 11, '#455b65');
    sphere(ctx, px - 22, py + 1, 9, '#c95b5d', '#ffd4ce');
    sphere(ctx, px + 22, py + 1, 9, '#c95b5d', '#ffd4ce');
    pill(ctx, px, py - 30, 'CO₂', '#fff', '#315267');
  }
  drawFlame(ctx, cx, h * .95, h * .13, progress);
  pill(ctx, cx - trayWidth * .31, base - 77, progress < .65 ? 'CuO' : 'Cu', '#fff');
  if (progress < .75) pill(ctx, cx + trayWidth * .33, base - 81, 'C', '#fff');
}

function drawElectrolysis(ctx, w, h, progress, yaw) {
  const cx = w * .5 + Math.sin(yaw) * w * .018;
  const compact = w < 430 || h < 300;
  const vesselWidth = Math.min(w * .65, 480);
  const left = cx - vesselWidth / 2, right = cx + vesselWidth / 2;
  const top = h * (compact ? .35 : .29), bottom = h * .83;
  const liquidDepth = bottom - top;
  const electrodeTop = top - (compact ? 42 : 67);
  const wireY = compact ? Math.max(20, top - 70) : top - 115;
  shadow(ctx, cx, bottom + 18, vesselWidth * .48, 17, .18);
  const liquid = ctx.createLinearGradient(0, top, 0, bottom);
  liquid.addColorStop(0, '#d6e9e2'); liquid.addColorStop(1, '#82c2bd');
  ctx.fillStyle = liquid;
  rounded(ctx, left, top, vesselWidth, bottom - top, 25); ctx.fill();
  ctx.strokeStyle = '#829fa8'; ctx.lineWidth = 10; ctx.stroke();
  ctx.strokeStyle = '#e8f7f2'; ctx.lineWidth = 3;
  ctx.beginPath(); ctx.moveTo(left + 15, top + 17); ctx.lineTo(right - 15, top + 17); ctx.stroke();
  const cathodeX = left + vesselWidth * .19;
  const anodeX = right - vesselWidth * .19;
  for (const [x, sign] of [[cathodeX, '−'], [anodeX, '+']]) {
    ctx.fillStyle = '#3b4a51';
    rounded(ctx, x - (compact ? 13 : 17), electrodeTop, compact ? 26 : 34, bottom - electrodeTop - 20, 6); ctx.fill();
    pill(ctx, x, compact ? electrodeTop - 14 : top - 85, sign, sign === '−' ? '#e2f1ff' : '#fff1e6', sign === '−' ? '#24558e' : '#97501e');
  }
  ctx.strokeStyle = '#557380'; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(cathodeX, electrodeTop); ctx.lineTo(cathodeX, wireY); ctx.lineTo(anodeX, wireY); ctx.lineTo(anodeX, electrodeTop); ctx.stroke();
  pill(ctx, cx, wireY, 'DC', '#fff', '#325463');
  const ionCount = compact ? 3 : 5;
  for (let i = 0; i < ionCount; i++) {
    const f = clamp(progress * 1.08 - i * .055, 0, 1);
    const x = cx - 15 + i * 12 + (cathodeX + 28 - cx - i * 12) * f;
    const y = top + liquidDepth * (.28 + (i % 2) * .12);
    ctx.save(); ctx.globalAlpha = 1 - clamp((progress - .78) / .22, 0, .8);
    sphere(ctx, x, y, compact ? 10 : 14, '#879ee1', '#eff4ff'); ctx.restore();
  }
  pill(ctx, cx - vesselWidth * .16, top + liquidDepth * (compact ? .1 : .2), 'Al³⁺', '#f3f6ff', '#305384');
  for (let i = 0; i < ionCount; i++) {
    const f = clamp(progress * 1.08 - i * .055, 0, 1);
    const x = cx + 25 - i * 12 + (anodeX - 29 - cx - 25 + i * 12) * f;
    const y = top + liquidDepth * (.55 + (i % 2) * .11);
    ctx.save(); ctx.globalAlpha = 1 - clamp((progress - .78) / .22, 0, .8);
    sphere(ctx, x, y, compact ? 10 : 13, '#c87769', '#ffe0d4'); ctx.restore();
  }
  pill(ctx, cx + vesselWidth * .16, top + liquidDepth * .81, 'O²⁻', '#fff2ee', '#8b443a');
  if (progress > .56) {
    ctx.fillStyle = '#b8cad1';
    ctx.beginPath(); ctx.ellipse(cathodeX + 43, bottom - 22, 25 + progress * 39, 12, -.05, 0, Math.PI * 2); ctx.fill();
    pill(ctx, cathodeX + 45, bottom - 54, 'Al', '#fff', '#315b70');
  }
  if (progress > .7) {
    const y = top + 78 - (progress - .7) / .3 * 91;
    sphere(ctx, anodeX - 8, y, 12, '#879ea7', '#e5f7fa');
    pill(ctx, anodeX + 28, y - 19, 'CO₂', '#fff', '#315267');
  }
}

function drawRust(ctx, w, h, progress, yaw, condition, language) {
  const cx = w * .5 + Math.sin(yaw) * w * .02;
  const top = h * .14, bottom = h * .83;
  const tubeWidth = Math.min(w * .34, 200);
  const left = cx - tubeWidth / 2;
  shadow(ctx, cx, bottom + 13, tubeWidth * .7, 17, .17);
  ctx.fillStyle = '#f7fcfcbb'; rounded(ctx, left, top, tubeWidth, bottom - top, 25); ctx.fill();
  ctx.strokeStyle = '#8cb3bf'; ctx.lineWidth = 8; ctx.stroke();
  ctx.fillStyle = '#e8f6f2';
  ctx.beginPath(); ctx.ellipse(cx, top + 5, tubeWidth * .47, 11, 0, 0, Math.PI * 2); ctx.fill();
  if (condition !== 'dry') {
    ctx.fillStyle = '#91c8d6a3';
    rounded(ctx, left + 8, top + (bottom - top) * .48, tubeWidth - 16, (bottom - top) * .49, 16); ctx.fill();
    ctx.strokeStyle = '#5b9bb2'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(left + 11, top + (bottom - top) * .48); ctx.lineTo(left + tubeWidth - 11, top + (bottom - top) * .48); ctx.stroke();
  }
  if (condition === 'water') {
    ctx.fillStyle = '#c5ad76a8';
    ctx.fillRect(left + 12, top + (bottom - top) * .44, tubeWidth - 24, 12);
    pill(ctx, cx + tubeWidth * .42, top + (bottom - top) * .45, language === 'en' ? 'oil' : '油層', '#fff5d6', '#705631');
  }
  if (condition === 'dry') {
    for (let i = 0; i < 6; i++) sphere(ctx, left + 21 + i * (tubeWidth - 42) / 5, bottom - 24 + (i % 2) * 5, 7, '#d1b47c');
    pill(ctx, cx, bottom - 55, language === 'en' ? 'drying agent' : '乾燥劑', '#fff4da', '#735729');
  }
  if (condition !== 'water') {
    for (let i = 0; i < 5; i++) {
      const x = left + 25 + (i * 47) % (tubeWidth - 50);
      const y = top + 38 + (i * 31) % Math.max(40, (bottom - top) * .36);
      sphere(ctx, x, y, 5, '#77adbe', '#e7faff');
    }
    pill(ctx, cx + tubeWidth * .48, top + 27, 'O₂', '#e5f7fc', '#2b657a');
  }
  ctx.save();
  ctx.translate(cx, top + (bottom - top) * .53);
  ctx.rotate(-.24 + Math.sin(yaw) * .13);
  const metal = ctx.createLinearGradient(-11, 0, 11, 0);
  metal.addColorStop(0, '#607985'); metal.addColorStop(.38, '#d8e5e6'); metal.addColorStop(1, '#5d7983');
  ctx.fillStyle = metal; rounded(ctx, -11, -(bottom - top) * .32, 22, (bottom - top) * .64, 5); ctx.fill();
  rounded(ctx, -21, -(bottom - top) * .33, 42, 10, 3); ctx.fill();
  if (condition === 'both') {
    const amount = clamp((progress - .25) / .65, 0, 1);
    ctx.globalAlpha = amount;
    for (let i = 0; i < 9; i++) {
      const yy = -(bottom - top) * .13 + i * (bottom - top) * .052;
      ctx.fillStyle = i % 2 ? '#ae5b37' : '#cf814b';
      rounded(ctx, -12 + (i % 3) * 2, yy, 19 - (i % 3) * 2, 11, 4); ctx.fill();
    }
  }
  ctx.restore();
  if (condition === 'both' && progress > .6) pill(ctx, cx + tubeWidth * .58, bottom - 44, language === 'en' ? 'rust' : '鐵鏽', '#fff0e2', '#9a4f2d');
}

function draw(canvas, kind, progress, yaw, zoom, condition, language) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const w = canvas.clientWidth || 800, h = canvas.clientHeight || 420;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const pixelWidth = Math.round(w * dpr), pixelHeight = Math.round(h * dpr);
  if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
    canvas.width = pixelWidth; canvas.height = pixelHeight;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  stage(ctx, w, h, yaw);
  ctx.save();
  ctx.translate(w / 2, h / 2);
  ctx.scale(zoom, zoom);
  ctx.translate(-w / 2, -h / 2);
  if (kind === 'panning') drawPanning(ctx, w, h, progress, yaw);
  else if (kind === 'heating') drawHeating(ctx, w, h, progress, yaw);
  else if (kind === 'carbon') drawCarbon(ctx, w, h, progress, yaw);
  else if (kind === 'electrolysis') drawElectrolysis(ctx, w, h, progress, yaw);
  else drawRust(ctx, w, h, progress, yaw, condition, language);
  ctx.restore();
}

function mount(root, language) {
  const kind = root.dataset.extractionModel;
  const scene = SCENES[kind];
  if (!scene) return null;
  const canvas = root.querySelector('[data-model-canvas]');
  const caption = root.querySelector('[data-model-caption]');
  const slider = root.querySelector('[data-model-scrub]');
  const percent = root.querySelector('[data-model-percent]');
  const playButton = root.querySelector('[data-model-action="play"]');
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
  const abort = new AbortController();
  const signal = abort.signal;
  let progress = 0, yaw = -.12, zoom = 1, condition = root.dataset.rustCondition || 'both';
  let playing = !reducedMotion, visible = true, frameId = 0, lastTime = 0;

  function refresh() {
    draw(canvas, kind, progress, yaw, zoom, condition, language);
    slider.value = String(Math.round(progress * 100));
    percent.textContent = `${Math.round(progress * 100)}%`;
    const captionIndex = kind === 'rust' ? ({ dry: 0, water: 1, both: 2 })[condition] : progress < .3 ? 0 : progress < .83 ? 1 : 2;
    const nextCaption = label(scene.captions[captionIndex], language);
    if (caption.textContent !== nextCaption) caption.textContent = nextCaption;
    playButton.textContent = label(playing ? ['暫停', 'Pause'] : ['播放', 'Play'], language);
    playButton.setAttribute('aria-label', label(playing ? ['暫停動畫', 'Pause animation'] : ['播放動畫', 'Play animation'], language));
    root.querySelectorAll('[data-rust-condition]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.rustCondition === condition));
    });
  }

  function stopFrame() { if (frameId) cancelAnimationFrame(frameId); frameId = 0; lastTime = 0; }
  function frame(time) {
    frameId = 0;
    if (!root.isConnected || !playing || !visible || document.hidden) { lastTime = 0; return; }
    if (lastTime) progress = clamp(progress + (time - lastTime) / 9000, 0, 1);
    lastTime = time;
    if (progress >= 1) playing = false;
    refresh();
    if (playing) frameId = requestAnimationFrame(frame);
  }
  function schedule() { if (playing && visible && !document.hidden && !frameId) frameId = requestAnimationFrame(frame); }
  function setPlaying(value) {
    playing = value;
    if (playing && progress >= 1) progress = 0;
    stopFrame(); refresh(); schedule();
  }
  function setCondition(value) {
    if (kind !== 'rust' || !['dry', 'water', 'both'].includes(value)) return;
    condition = value;
    root.dataset.rustCondition = value;
    progress = 0;
    stopFrame(); refresh(); schedule();
  }
  function action(name) {
    if (name === 'play') setPlaying(!playing);
    else if (name === 'restart') { progress = 0; setPlaying(true); }
    else if (name === 'rotate-left') yaw -= .28;
    else if (name === 'rotate-right') yaw += .28;
    else if (name === 'zoom-in') zoom = clamp(zoom + .12, .72, 1.55);
    else if (name === 'zoom-out') zoom = clamp(zoom - .12, .72, 1.55);
    refresh();
  }

  root.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !root.contains(button)) return;
    if (button.dataset.rustCondition) setCondition(button.dataset.rustCondition);
    else if (button.dataset.modelAction) action(button.dataset.modelAction);
  }, { signal });
  slider.addEventListener('input', () => { playing = false; stopFrame(); progress = Number(slider.value) / 100; refresh(); }, { signal });
  canvas.addEventListener('keydown', event => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '=', '-', '_', ' ', 'Home', 'End'].includes(event.key)) event.preventDefault();
    if (event.key === 'ArrowLeft') { progress = clamp(progress - .05, 0, 1); setPlaying(false); }
    else if (event.key === 'ArrowRight') { progress = clamp(progress + .05, 0, 1); setPlaying(false); }
    else if (event.key === 'ArrowUp') action('rotate-left');
    else if (event.key === 'ArrowDown') action('rotate-right');
    else if (event.key === '+' || event.key === '=') action('zoom-in');
    else if (event.key === '-' || event.key === '_') action('zoom-out');
    else if (event.key === ' ') action('play');
    else if (event.key === 'Home') { progress = 0; setPlaying(false); }
    else if (event.key === 'End') { progress = 1; setPlaying(false); }
  }, { signal });
  let dragPointer = null, dragX = 0;
  canvas.addEventListener('pointerdown', event => {
    dragPointer = event.pointerId;
    dragX = event.clientX;
    canvas.setPointerCapture(event.pointerId);
    canvas.classList.add('is-dragging');
    canvas.focus({ preventScroll: true });
  }, { signal });
  canvas.addEventListener('pointermove', event => {
    if (event.pointerId !== dragPointer) return;
    yaw += (event.clientX - dragX) * .009;
    dragX = event.clientX;
    refresh();
  }, { signal });
  const endDrag = event => {
    if (event.pointerId !== dragPointer) return;
    dragPointer = null;
    canvas.classList.remove('is-dragging');
    if (canvas.hasPointerCapture(event.pointerId)) canvas.releasePointerCapture(event.pointerId);
  };
  canvas.addEventListener('pointerup', endDrag, { signal });
  canvas.addEventListener('pointercancel', endDrag, { signal });
  document.addEventListener('visibilitychange', () => { if (document.hidden) stopFrame(); else schedule(); }, { signal });
  const resize = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(refresh) : null;
  resize?.observe(canvas);
  if (!resize) window.addEventListener('resize', refresh, { signal });
  const intersection = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(entries => {
    visible = entries[0]?.isIntersecting ?? true;
    if (!visible) stopFrame(); else schedule();
  }, { threshold: .05 }) : null;
  intersection?.observe(root);
  refresh(); schedule();
  return {
    kind,
    setRustCondition: setCondition,
    destroy() { stopFrame(); resize?.disconnect(); intersection?.disconnect(); abort.abort(); instances.delete(root); },
  };
}

export function setRustCondition(condition) {
  for (const [root, controller] of instances) {
    if (!root.isConnected) { controller.destroy(); continue; }
    if (controller.kind === 'rust') controller.setRustCondition(condition);
  }
}

export function createExtractionModels(language = 'zh') {
  for (const [root, controller] of instances) if (!root.isConnected) controller.destroy();
  for (const root of document.querySelectorAll('[data-extraction-model]')) {
    if (!instances.has(root)) {
      const controller = mount(root, language);
      if (controller) instances.set(root, controller);
    }
  }
  return {
    setRustCondition,
    destroy() { for (const controller of [...instances.values()]) controller.destroy(); },
  };
}
