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
const halogenColours = new Set();
for (const [symbol, state] of [['F', 'gas'], ['Cl', 'gas'], ['Br', 'liquid'], ['I', 'solid']]) {
  const scene = buildScene('halogen', symbol, 0, 5);
  const spheres = scene.shapes.filter(shape => shape.type === 'sphere');
  assert.equal(scene.state, state);
  assert.ok(scene.molecules > 1);
  assert.equal(spheres.length, scene.molecules * 2, 'Halogens must remain as diatomic molecules');
  const lines = scene.shapes.filter(shape => shape.type === 'line');
  assert.ok(lines.every(line => line.width <= 0.02), 'Only the thin container and grid lines should be drawn');
  for (let i = 0; i < spheres.length; i += 2) {
    const [a, b] = spheres.slice(i, i + 2);
    const distance = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
    assert.ok(distance > a.radius && distance <= a.radius + b.radius, 'Each pair should touch and show two separate spheres');
    halogenColours.add(a.colour);
    halogenColours.add(b.colour);
  }
}
assert.equal(halogenColours.size, 1, 'All four models should use the same colour');
assert.match([...halogenColours][0], /^#([\da-f]{2})\1\1$/i, 'The particle colour should be grey');
for (const symbol of ['He', 'Ne', 'Ar']) {
  const scene = buildScene('noble', symbol, 0, 5);
  assert.ok(scene.particles > 1);
  assert.equal(scene.molecules, 0, 'Noble gas atoms must not be joined into molecules');
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
