import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve,sep} from 'node:path';
import {chapters} from '../bonding-site/content.js';
const root=fileURLToPath(new URL('../',import.meta.url)),dist=resolve(root,'github-dist');
const version=b=>createHash('sha256').update(b).digest('hex').slice(0,12);
const source=resolve(root,'bonding-site');
for(const [unit,chapter] of Object.entries(chapters)){
 const out=resolve(dist,chapter.slug);if(!out.startsWith(dist+sep))throw new Error('Output must stay in github-dist');
 await mkdir(out,{recursive:true});await cp(source,out,{recursive:true});await cp(resolve(root,'metals-site/styles.css'),resolve(out,'styles.css'));
 // Version leaf modules before their dependants, so all changed imports refresh.
 const versions={};
 for(const name of ['chemistry.js','content.js','diagrams.js','widgets.js','site.js']){
  let code=await readFile(resolve(out,name),'utf8');
  code=code.replace(/from '\.\/([\w-]+\.js)'/g,(match,file)=>versions[file]?`from './${file}?v=${versions[file]}'`:match);
  versions[name]=version(code);await writeFile(resolve(out,name),code);
 }
 let html=(await readFile(resolve(out,'index.html'),'utf8')).replace('data-unit="5"',`data-unit="${unit}"`).replace('Chemical bonding · CHEM Explore',`${chapter.title[0]} · CHEM Explore`);
 for(const name of ['styles.css','bonding.css','site.js'])html=html.replace(`./${name}"`,`./${name}?v=${version(await readFile(resolve(out,name)))}"`);
 await writeFile(resolve(out,'index.html'),html);
 for(const lesson of chapter.lessons){const folder=resolve(out,'sessions',lesson.id);await mkdir(folder,{recursive:true});await writeFile(resolve(folder,'index.html'),html.replace('<head>','<head>\n<base href="../../"/>'));}
 console.log(`Generated Unit ${unit}: ${chapter.lessons.length} independent lesson pages in ${chapter.slug}.`);
}
