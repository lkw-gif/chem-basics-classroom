import { cp, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(root, 'atom-structure-site');
const output = resolve(root, 'github-dist', 'atomic-structure');

await rm(output, { recursive: true, force: true });
await cp(source, output, { recursive: true });
console.log('Copied standalone Atomic Structure website to github-dist/atomic-structure/.');
