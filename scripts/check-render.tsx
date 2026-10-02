import {renderToStaticMarkup} from 'react-dom/server';
import {LanguageContext} from '../app/i18n';
import {Classroom} from '../app/page';
import {Elements,Classification,Comparison,Changes,Review,Credits} from '../app/lessons';
import {FormulaGallery} from '../app/formula-gallery';
import fs from 'node:fs';
const components={start:<Classroom/>,elements:<Elements/>,formulae:<FormulaGallery teacher={false}/>,formulaeTeacher:<FormulaGallery teacher={true}/>,classification:<Classification teacher={false}/>,comparison:<Comparison/>,changes:<Changes/>,review:<Review teacher={false}/>,credits:<Credits/>};
const results:Record<string,string>={};
for(const [name,component]of Object.entries(components))for(const language of ['zh','en'] as const){results[`${name}-${language}`]=renderToStaticMarkup(<LanguageContext.Provider value={{language,setLanguage:()=>{}}}>{component}</LanguageContext.Provider>);}
fs.writeFileSync('work/rendered-lessons.json',JSON.stringify(results));
for(const language of ['zh','en'] as const){
 const html=results[`formulaeTeacher-${language}`];
 for(const formula of ['H₂','N₂','O₂','H₂O','CO₂','Cl₂','I₂'])if(html.includes(formula))throw new Error(`Teacher formulae view leaked ${formula} (${language})`);
 if((html.match(/formula-gallery-card/g)||[]).length!==7)throw new Error(`Teacher formulae view did not render seven models (${language})`);
 const changes=results[`changes-${language}`];
 if((changes.match(/class="card substance-test"/g)||[]).length!==5)throw new Error(`Lesson 06 must show five substance tests (${language})`);
 if(!changes.includes('sample:reaction-water')&&!changes.includes('Two water molecules')&&!changes.includes('兩個水分子'))throw new Error(`Lesson 06 is missing water electrolysis (${language})`);
 if(!changes.includes('sample:ironsulfur')&&!changes.includes('A mixture of iron and sulphur')&&!changes.includes('鐵與硫的混合物'))throw new Error(`Lesson 06 is missing iron and sulphur (${language})`);
 if(changes.includes('property-diagram'))throw new Error(`Physical property diagrams remain in lesson 06 (${language})`);
 const review=results[`review-${language}`];
 if(review.includes('review-summary')||review.includes('glossary-grid')||review.includes('details-card'))throw new Error(`Removed review sections remain (${language})`);
}
console.log('Rendered all lesson units, credits, and teacher formulae view in both languages.');
