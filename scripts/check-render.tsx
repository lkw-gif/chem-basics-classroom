import {renderToStaticMarkup} from 'react-dom/server';
import {LanguageContext} from '../app/i18n';
import {Classroom} from '../app/page';
import {Elements,Formulae,Classification,Comparison,Changes,Laboratory,Review,Credits} from '../app/lessons';
import fs from 'node:fs';
const components={start:<Classroom/>,elements:<Elements/>,formulae:<Formulae teacher={false}/>,formulaeTeacher:<Formulae teacher={true}/>,classification:<Classification teacher={false}/>,comparison:<Comparison/>,changes:<Changes/>,laboratory:<Laboratory/>,review:<Review teacher={false}/>,credits:<Credits/>};
const results:Record<string,string>={};
for(const [name,component]of Object.entries(components))for(const language of ['zh','en'] as const){results[`${name}-${language}`]=renderToStaticMarkup(<LanguageContext.Provider value={{language,setLanguage:()=>{}}}>{component}</LanguageContext.Provider>);}
fs.writeFileSync('work/rendered-lessons.json',JSON.stringify(results));
for(const language of ['zh','en'] as const){
 const html=results[`formulaeTeacher-${language}`];
 for(const formula of ['H₂','N₂','O₂','H₂O','CO₂','Cl₂','I₂'])if(html.includes(formula))throw new Error(`Teacher formulae view leaked ${formula} (${language})`);
}
console.log('Rendered all lesson units, credits, and teacher formulae view in both languages.');
