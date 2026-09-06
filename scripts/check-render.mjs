import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
await build({configFile:false,logLevel:'error',resolve:{alias:{'@':fileURLToPath(new URL('..',import.meta.url))}},plugins:[react()],build:{ssr:'scripts/check-render.tsx',outDir:'work/render-check',emptyOutDir:true}});
await import('../work/render-check/check-render.js');
