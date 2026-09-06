'use client';
import {createContext,useCallback,useContext,useEffect,useState,cloneElement,isValidElement,type ReactNode,type ReactElement} from 'react';
import translations from './english.json';
export type Language='zh'|'en';
export const LanguageContext=createContext<{language:Language;setLanguage:(l:Language)=>void}>({language:'zh',setLanguage:()=>{}});
const english:Record<string,string>=translations;
const han=/[\u3400-\u9fff]/;
const fragmentKeys=Object.keys(english).filter(k=>han.test(k)).sort((a,b)=>b.length-a.length);
export function translateText(text:string,language:Language):string {
 if(language==='zh')return text;
 const punctuation=(v:string)=>v.replace(/。/g,'. ').replace(/，/g,', ').replace(/：/g,': ');
 if(!han.test(text))return punctuation(text);
 if(english[text]!==undefined)return punctuation(english[text]);
 const trimmed=text.trim();if(english[trimmed]!==undefined)return punctuation(text.replace(trimmed,english[trimmed]));
 // Dynamic labels combine translated content with counts, symbols and punctuation.
 let result=text;for(const k of fragmentKeys){if(result.includes(k))result=result.split(k).join(english[k]);if(!han.test(result))break;}return punctuation(result);
}
export function I18nProvider({children}:{children:ReactNode}){
 const [language,setLanguage]=useState<Language>('zh');
 useEffect(()=>{try{const requested=new URLSearchParams(location.search).get('lang'),saved=localStorage.getItem('chem-language');if(requested==='en'||requested==='zh')setLanguage(requested);else if(saved==='en'||saved==='zh')setLanguage(saved);}catch{}},[]);
 const selectLanguage=useCallback((lang:Language)=>{setLanguage(lang);try{localStorage.setItem('chem-language',lang);const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url);}catch{}},[]);
 useEffect(()=>{document.documentElement.lang=language==='zh'?'zh-Hant-HK':'en';document.title=language==='zh'?'CHEM 初探｜中三化學教室':'CHEM Basics | Form 3 Chemistry';},[language]);
 return <LanguageContext.Provider value={{language,setLanguage:selectLanguage}}>{children}</LanguageContext.Provider>;
}
export function useLanguage(){return useContext(LanguageContext);}
export function useTranslateTree(){const {language}=useLanguage();return useCallback(function translate(node:ReactNode):ReactNode{
 if(typeof node==='string')return translateText(node,language);
 if(Array.isArray(node))return node.map(translate);
 if(!isValidElement(node))return node;
 const element=node as ReactElement<Record<string,unknown>>;
 if(element.props['data-keep-language'])return element;
 const props:Record<string,unknown>={};
 for(const [key,value]of Object.entries(element.props)){
  if(key==='children')props.children=translate(value as ReactNode);
  else if(['title','alt','aria-label','label','desc','placeholder'].includes(key)&&typeof value==='string')props[key]=translateText(value,language);
 }
 return cloneElement(element,props);
},[language]);}
export function asset(path:string){const base=(import.meta as ImportMeta & {env?:{BASE_URL?:string}}).env?.BASE_URL||'/';return `${base}${path.replace(/^\//,'')}`;}
