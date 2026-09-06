import {renderToStaticMarkup} from 'react-dom/server';
import {LanguageContext} from '../app/i18n';
import {Classroom} from '../app/page';
import {Elements,Formulae,Classification,Comparison,Changes,Laboratory,Review,Credits} from '../app/lessons';
import fs from 'node:fs';
const components={start:<Classroom/>,elements:<Elements/>,formulae:<Formulae/>,classification:<Classification teacher={false}/>,comparison:<Comparison/>,changes:<Changes/>,laboratory:<Laboratory/>,review:<Review teacher={false}/>,credits:<Credits/>};
const results:Record<string,string>={};
for(const [name,component]of Object.entries(components))for(const language of ['zh','en'] as const){results[`${name}-${language}`]=renderToStaticMarkup(<LanguageContext.Provider value={{language,setLanguage:()=>{}}}>{component}</LanguageContext.Provider>);}
fs.writeFileSync('work/rendered-lessons.json',JSON.stringify(results));
console.log('Rendered all 8 units and credits in both languages.');
