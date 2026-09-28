import {access, readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const dist=resolve(root,'github-dist');
const read=path=>readFile(resolve(dist,path),'utf8');
const hub=await read('index.html');
const hubScript=await read('course-hub.js');
if(!hub.includes('course-hub.js')||!hub.includes('course-hub.css'))throw new Error('Course hub assets are missing');
for(const unit of ['introducing-chemistry','atomic-structure','periodic-table','metals']){
  await access(resolve(dist,unit,'index.html'));
  if(!hubScript.includes(`id:'${unit}'`))throw new Error(`Course hub is missing ${unit}`);
}
const home=await read('introducing-chemistry/index.html');
if(!home.includes('<base href="../" />'))throw new Error('Unit 1 home has the wrong asset base');
for(const lesson of ['start','elements','formula','classify','compare','changes','lab','review']){
  const page=await read(`introducing-chemistry/sessions/${lesson}/index.html`);
  if(!page.includes('<base href="../../../" />'))throw new Error(`Unit 1 ${lesson} has the wrong asset base`);
  if(!hubScript.includes(`'${lesson}'`))throw new Error(`Legacy ${lesson} link cannot redirect`);
}
console.log('Course hub, four unit links, eight Unit 1 lesson routes and legacy links verified.');
