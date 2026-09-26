import assert from 'node:assert/strict';
import { shellElectronPositions, buildScene, reactionSeconds } from '../periodic-table-site/models-3d.js';

// Count every electron, keep it on its shell, and ensure pairs are legible.
for (let count = 1; count <= 8; count++) {
  const dots = shellElectronPositions(count, 77, 0);
  assert.equal(dots.length, count);
  for (const dot of dots) assert.ok(Math.abs(Math.hypot(dot.x, dot.y) - 77) < 0.001);
  let pairs = 0;
  for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
    const distance = Math.hypot(dots[i].x - dots[j].x, dots[i].y - dots[j].y);
    assert.ok(distance > 10, 'Electron dots must not overlap');
    if (distance < 15) pairs++;
  }
  assert.equal(pairs, Math.max(0, count - 4));
}
assert.ok(reactionSeconds.Li > reactionSeconds.Na && reactionSeconds.Na > reactionSeconds.K);
assert.ok(reactionSeconds.Mg > reactionSeconds.Ca);
for (const [kind, symbols] of [['water', ['Li', 'Na', 'K']], ['acid', ['Mg', 'Ca']]]) {
  for (const symbol of symbols) {
    assert.equal(buildScene(kind, symbol, 0).metalPresent, true);
    assert.equal(buildScene(kind, symbol, 0.5).state, 'reacting');
    assert.ok(buildScene(kind, symbol, 0.5).shapes.some(shape => shape.bubble));
    const finished = buildScene(kind, symbol, 1);
    assert.equal(finished.metalPresent, false);
    assert.equal(finished.shapes.filter(shape => shape.bubble).length, 0);
  }
}
const carbon = buildScene('acid', 'C', 1);
assert.equal(carbon.metalPresent, true, 'The carbon comparison must remain visible');
assert.equal(carbon.state, 'unchanged');
assert.equal(carbon.shapes.filter(shape => shape.bubble).length, 0);
for (const [symbol, state] of [['F', 'gas'], ['Cl', 'gas'], ['Br', 'liquid'], ['I', 'solid']]) {
  const scene = buildScene('halogen', symbol, 0, 5);
  assert.equal(scene.state, state);
  assert.ok(scene.bonds > 1);
  assert.equal(scene.shapes.filter(shape => shape.type === 'sphere').length, scene.bonds * 2, 'Halogens must remain as diatomic molecules');
}
for (const symbol of ['He', 'Ne', 'Ar']) {
  const scene = buildScene('noble', symbol, 0, 5);
  assert.ok(scene.particles > 1);
  assert.equal(scene.bonds, 0, 'Noble gas atoms must not be joined into molecules');
}
// Catch invalid geometry at animation boundaries and throughout both reactions.
for (const [kind, symbols] of [['water', ['Li', 'Na', 'K']], ['acid', ['Mg', 'Ca', 'C']], ['halogen', ['F', 'Cl', 'Br', 'I']], ['noble', ['He', 'Ne', 'Ar']]]) {
  for (const symbol of symbols) for (const progress of [0, 0.1, 0.18, 0.5, 0.99, 1]) {
    for (const shape of buildScene(kind, symbol, progress, progress * 10).shapes) {
      for (const p of shape.points || [shape]) for (const axis of ['x', 'y', 'z']) assert.ok(Number.isFinite(p[axis]), `${String(kind)}/${symbol}: invalid ${axis}`);
    }
  }
}
console.log('PASS: paired shell counts, reaction outcomes and trends, diatomic halogens, separate noble gas atoms, and finite 3D geometry.');
