import fs from 'node:fs';
import ts from 'typescript';
// Wrap each component's returned React tree. Translates text and accessibility
// labels at render time without changing IDs, state, event handlers or the DOM.
for(const file of ['app/page.tsx','app/lessons.tsx','app/model.tsx']){
 let source=fs.readFileSync(file,'utf8');
 const sf=ts.createSourceFile(file,source,ts.ScriptTarget.Latest,true,ts.ScriptKind.TSX);
 const edits=[];
 function visit(n){
  if(ts.isFunctionDeclaration(n)&&n.name&&/^[A-Z]/.test(n.name.text)&&n.body){
   const returns=[];
   function scan(child){if(child!==n&&ts.isFunctionLike(child))return;if(ts.isReturnStatement(child)&&child.expression&&(ts.isJsxElement(child.expression)||ts.isJsxSelfClosingElement(child.expression)||ts.isJsxFragment(child.expression)))returns.push(child.expression);ts.forEachChild(child,scan);}
   ts.forEachChild(n.body,scan);
   if(returns.length){edits.push([n.body.getStart(sf)+1,n.body.getStart(sf)+1,'\n const tr=useTranslateTree();\n']);for(const e of returns){edits.push([e.getStart(sf),e.getStart(sf),'tr('],[e.end,e.end,')']);}}
  }
  ts.forEachChild(n,visit);
 }
 visit(sf);
 for(const [start,end,value]of edits.sort((a,b)=>b[0]-a[0]))source=source.slice(0,start)+value+source.slice(end);
 source=source.replace(/('use client';)/,"$1\nimport {useTranslateTree,asset} from './i18n';");
 fs.writeFileSync(file,source);
}
