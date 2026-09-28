import {readFile,readdir,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';
const dist=fileURLToPath(new URL('../github-dist/',import.meta.url));
const hash=createHash('sha256').update(await readFile(resolve(dist,'classroom.css'))).digest('hex').slice(0,12);
async function visit(directory){
  for(const entry of await readdir(directory,{withFileTypes:true})){
    const path=resolve(directory,entry.name);
    if(entry.isDirectory())await visit(path);
    else if(entry.name.endsWith('.html')){
      const html=await readFile(path,'utf8');
      const next=html.replace(/href="(\.\.?\/classroom\.css)"/g,`href="$1?v=${hash}"`);
      if(next!==html)await writeFile(path,next);
    }
  }
}
await visit(dist);
console.log('Applied the shared classroom theme version to every static lesson.');
