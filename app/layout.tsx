import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'CHEM 初探｜中三化學教室',description:'由一滴水認識化學。用圖片與可旋轉的 3D 模型，學習元素、化學式、純物質與混合物。'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-Hant-HK"><body>{children}</body></html>}
