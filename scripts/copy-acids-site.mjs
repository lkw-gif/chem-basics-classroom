import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {dirname,resolve,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
import {lessons} from '../acids-site/lessons.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const base=resolve(root,process.argv.includes('--public')?'public':'github-dist');
const destination=resolve(base,'acids-and-bases');
if(!destination.startsWith(base+sep))throw new Error('Acid output escaped its target directory');
await mkdir(destination,{recursive:true});
await cp(resolve(root,'acids-site'),destination,{recursive:true});
const files=['curriculum.js','lessons.js','diagrams.js','questions-early.js','questions-late.js','questions-supplement.js','questions.js','site.js','site.css'];
// One content version covers the complete module graph, including indirect imports.
const hash=createHash('sha256');for(const name of files)hash.update(await readFile(resolve(destination,name)));
const version=hash.digest('hex').slice(0,12);
for(const name of files.filter(x=>x.endsWith('.js'))){
 const path=resolve(destination,name),text=await readFile(path,'utf8');
 await writeFile(path,text.replace(/from '(\.\/[^']+\.js)'/g,`from '$1?v=${version}'`));
}
const template=(await readFile(resolve(root,'acids-site/index.html'),'utf8')).replace('href="./site.css"',`href="./site.css?v=${version}"`).replace('src="./site.js"',`src="./site.js?v=${version}"`);
await writeFile(resolve(destination,'index.html'),template);
for(const l of lessons){const dir=resolve(destination,'sessions',l.id);await mkdir(dir,{recursive:true});await writeFile(resolve(dir,'index.html'),template.replace('<head>','<head><base href="../../"/>').replace('<title>酸與鹼 · DSE CHEM</title>',`<title>${l.title[0]} · DSE CHEM</title>`));}
const revision=resolve(destination,'revision');await mkdir(revision,{recursive:true});await writeFile(resolve(revision,'index.html'),template.replace('<head>','<head><base href="../"/>').replace('<title>酸與鹼 · DSE CHEM</title>','<title>全課重點與練習索引 · DSE CHEM</title>'));
console.log(`Created DSE acids: 25 lesson routes, curriculum home and revision index in ${base}.`);
