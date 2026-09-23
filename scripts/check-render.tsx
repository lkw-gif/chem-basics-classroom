import {renderToStaticMarkup} from 'react-dom/server';
import {LanguageContext} from '../app/i18n';
import {Classroom} from '../app/page';
import {Elements,Classification,Comparison,Changes,Laboratory,Review,Credits} from '../app/lessons';
import {FormulaGallery} from '../app/formula-gallery';
import {AtomStructure} from '../app/atom-structure';
import fs from 'node:fs';
const components={start:<Classroom/>,elements:<Elements/>,atomicStructure:<AtomStructure teacher={false}/>,atomicStructureTeacher:<AtomStructure teacher={true}/>,formulae:<FormulaGallery teacher={false}/>,formulaeTeacher:<FormulaGallery teacher={true}/>,classification:<Classification teacher={false}/>,comparison:<Comparison/>,changes:<Changes/>,laboratory:<Laboratory/>,review:<Review teacher={false}/>,credits:<Credits/>};
const results:Record<string,string>={};
for(const [name,component]of Object.entries(components))for(const language of ['zh','en'] as const){results[`${name}-${language}`]=renderToStaticMarkup(<LanguageContext.Provider value={{language,setLanguage:()=>{}}}>{component}</LanguageContext.Provider>);}
fs.writeFileSync('work/rendered-lessons.json',JSON.stringify(results));
for(const language of ['zh','en'] as const){
 const atomHtml=results[`atomicStructure-${language}`];
 if((atomHtml.match(/atom-checkpoint-heading/g)||[]).length!==5)throw new Error(`Atomic structure chapter did not render five checkpoints (${language})`);
 if(!atomHtml.includes(language==='en'?'Atomic structure':'原子結構'))throw new Error(`Atomic structure chapter did not render in ${language}`);
 if((results[`atomicStructureTeacher-${language}`].match(/atom-checkpoint-heading/g)||[]).length!==5)throw new Error(`Teacher atomic structure view did not render five checkpoints (${language})`);
 const html=results[`formulaeTeacher-${language}`];
 for(const formula of ['H₂','N₂','O₂','H₂O','CO₂','Cl₂','I₂'])if(html.includes(formula))throw new Error(`Teacher formulae view leaked ${formula} (${language})`);
 if((html.match(/formula-gallery-card/g)||[]).length!==7)throw new Error(`Teacher formulae view did not render seven models (${language})`);
}
console.log('Rendered all lesson units, credits, and teacher formulae view in both languages.');
