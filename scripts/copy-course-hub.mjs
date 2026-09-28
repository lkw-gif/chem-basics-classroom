import {cp, mkdir, readFile, rm, writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {dirname, resolve, sep} from 'node:path';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const dist=resolve(root,'github-dist');
const unitOne=resolve(dist,'introducing-chemistry');
if(!unitOne.startsWith(dist+sep))throw new Error('Unit 1 output must stay inside github-dist');

// Vite's root page contains the original Unit 1 React app. Give that app
// direct lesson URLs, then put the four-unit course hub at the root.
const builtUnitOne=await readFile(resolve(dist,'index.html'),'utf8');
await rm(unitOne,{recursive:true,force:true});
await mkdir(unitOne,{recursive:true});
await writeFile(resolve(unitOne,'index.html'),builtUnitOne.replace('<head>','<head><base href="../" />'));
const lessons=['start','elements','formula','classify','compare','changes','lab','review'];
for(const lesson of lessons){
  const directory=resolve(unitOne,'sessions',lesson);
  await mkdir(directory,{recursive:true});
  await writeFile(resolve(directory,'index.html'),builtUnitOne.replace('<head>','<head><base href="../../../" />'));
}

const source=resolve(root,'course-hub-site');
await cp(resolve(source,'course-hub.css'),resolve(dist,'course-hub.css'));
await cp(resolve(source,'course-hub.js'),resolve(dist,'course-hub.js'));
const version=bytes=>createHash('sha256').update(bytes).digest('hex').slice(0,12);
const css=await readFile(resolve(dist,'course-hub.css'));
const js=await readFile(resolve(dist,'course-hub.js'));
const hub=(await readFile(resolve(source,'index.html'),'utf8'))
  .replace('href="./course-hub.css"',`href="./course-hub.css?v=${version(css)}"`)
  .replace('src="./course-hub.js"',`src="./course-hub.js?v=${version(js)}"`);
await writeFile(resolve(dist,'index.html'),hub);
console.log('Created the four-unit course hub and eight direct Unit 1 lesson pages.');
