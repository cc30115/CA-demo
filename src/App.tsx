/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import {
  List, X, ArrowRight, ArrowUpRight, Globe, MagnifyingGlass, User, Check,
  TreeStructure, ShieldCheck, Lightning, Database, Cpu, Stack,
  Timer, ChartLineUp, CheckCircle, Code, Palette, Devices
} from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Dither from './components/Dither';
import SchemaInteractiveSection from './components/SchemaInteractiveSection';
import { PortfolioGallery } from './components/ui/portfolio-gallery';
import FAQSection from './components/FAQSection';
import WorkflowSection from './components/WorkflowSection';
import IntegrationsSection from './components/IntegrationsSection';
import HeroCards from './components/HeroCards';
import CountUp from './components/CountUp';
import BlogPage from './components/BlogPage';
import ContactPage from './components/ContactPage';
import TeamPage from './components/TeamPage';
import { CTASection } from './components/ui/hero-dithering-card';
import { CursorDitherTrail } from './components/ui/cursor-dither-trail';

// IBM Carbon Design System Typographic Tokens (Injected via style)
const CarbonStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600&display=swap');

    .font-plex { font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }

    .grid-bg { background-image: linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px); background-size: 32px 32px; }
    .carbon-border { border: 1px solid #e0e0e0; }

    /* Display Typography */
    .text-display-xl { font-size: 56px; font-weight: 300; line-height: 1.1; letter-spacing: -0.02em; }
    .text-display-lg { font-size: 60px; font-weight: 300; line-height: 1.17; letter-spacing: -0.4px; }
    .text-display-md { font-size: 42px; font-weight: 300; line-height: 1.20; letter-spacing: 0; }

    /* Headline & Structural */
    .text-headline { font-size: 32px; font-weight: 400; line-height: 1.25; letter-spacing: 0; }
    .text-card-title { font-size: 24px; font-weight: 400; line-height: 1.33; letter-spacing: 0; }
    .text-subhead { font-size: 20px; font-weight: 400; line-height: 1.40; letter-spacing: 0; }

    /* Body Typography (with Carbon's signature 0.16px tracking) */
    .text-body-lg { font-size: 18px; font-weight: 400; line-height: 1.50; letter-spacing: 0; }
    .text-body { font-size: 16px; font-weight: 400; line-height: 1.50; letter-spacing: 0.16px; }
    .text-body-sm { font-size: 14px; font-weight: 400; line-height: 1.29; letter-spacing: 0.16px; }
    .text-body-emp { font-size: 14px; font-weight: 600; line-height: 1.29; letter-spacing: 0.16px; }

    /* Utility */
    .text-caption { font-size: 12px; font-weight: 400; line-height: 1.33; letter-spacing: 0.32px; }
    .text-button { font-size: 14px; font-weight: 400; line-height: 1.29; letter-spacing: 0.16px; }
    .text-eyebrow { font-size: 14px; font-weight: 400; line-height: 1.29; letter-spacing: 0.16px; }

    /* Responsive Scaling */
    @media (max-width: 1056px) {
      .text-display-xl { font-size: 60px; }
      .text-display-lg { font-size: 42px; }
    }
    @media (max-width: 672px) {
      .text-display-xl { font-size: 42px; letter-spacing: 0; }
      .text-display-lg { font-size: 32px; font-weight: 400; }
      .text-display-md { font-size: 28px; font-weight: 400; }
      .text-headline { font-size: 24px; }
    }

    /* Dynamic highlighting for personas */
    :root { --theme-highlight: #0f62fe; }
    .theme-designer { --theme-highlight: #08bdba; }
    .theme-engineer { --theme-highlight: #0f62fe; }

    .highlight-bg { background-color: var(--theme-highlight); }
    .group:hover .group-hover\:highlight-bg { background-color: var(--theme-highlight); }
    
    .highlight-border { border-color: var(--theme-highlight); }
    .group:hover .group-hover\:highlight-border { border-color: var(--theme-highlight); border-right-color: var(--theme-highlight); border-top-color: var(--theme-highlight); }

    .highlight-text { color: var(--theme-highlight); }
    .group:hover .group-hover\:highlight-text { color: var(--theme-highlight); }

    /* Auto layout scrollbar hiding */
    .hide-scrollbar::-webkit-scrollbar { display: none; }
    .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `}} />
);

// --- Component Library ---

const PrimaryButton = ({ children, className = "", onClick }: any) => (
  <button onClick={onClick} data-dither="btn" className={`bg-[#0f62fe] text-white text-button py-[12px] px-[16px] rounded-none border border-transparent hover:bg-[#0353e9] transition-colors flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

const SecondaryButton = ({ children, className = "", onClick }: any) => (
  <button data-dither="btn" onClick={onClick} className={`bg-[#161616] text-white text-button py-[12px] px-[16px] rounded-none border border-transparent hover:bg-[#393939] transition-colors flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

const TertiaryButton = ({ children, className = "", onClick }: any) => (
  <button data-dither="btn" onClick={onClick} className={`bg-white text-[#0f62fe] text-button py-[12px] px-[16px] rounded-none border border-[#0f62fe] hover:bg-[#0f62fe] hover:text-white transition-colors flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

const GhostButton = ({ children, className = "", onClick }: any) => (
  <button data-dither="btn" onClick={onClick} className={`bg-transparent text-[#0f62fe] text-button py-[12px] px-[16px] rounded-none border border-transparent hover:bg-[#e5eefd] transition-colors flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

// --- Feature Visual Assets ---
const Visual1 = () => (
  <div className="w-full h-[180px] bg-[#f8f9fa] border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center p-6 transition-colors duration-300">
    <div className="absolute inset-0 grid-bg opacity-60"></div>
    <div className="relative w-full h-[100px] border border-[#e0e0e0] bg-white/90 flex flex-col justify-center p-4 shadow-sm group-hover:highlight-border transition-colors duration-300 z-10">
        <div className="text-[10px] text-[#525252] tracking-widest font-semibold mb-2">MODULE LOAD</div>
        <div className="w-3/4 h-[4px] bg-[#f4f4f4] mb-2"><div className="h-full highlight-bg w-[40%] group-hover:w-[100%] transition-all duration-700 ease-out"></div></div>
        <div className="w-1/2 h-[4px] bg-[#f4f4f4]"><div className="h-full highlight-bg w-[60%] group-hover:w-[100%] transition-all duration-700 ease-out delay-75"></div></div>
        <div className="absolute -right-3 -top-3 w-6 h-6 border border-[#e0e0e0] bg-white flex items-center justify-center rotate-45 group-hover:rotate-90 group-hover:highlight-border transition-all duration-500"></div>
    </div>
  </div>
);

const Visual2 = () => (
  <div className="w-full h-[180px] bg-white border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
    <div className="absolute inset-0 grid-bg opacity-60"></div>
    <div className="absolute w-[180px] h-[180px] border border-dashed border-[#e0e0e0] rounded-full group-hover:scale-110 transition-transform duration-700"></div>
    <div className="w-16 h-16 highlight-border border bg-white z-10 flex items-center justify-center group-hover:rotate-45 transition-transform duration-500 shadow-sm">
       <div className="text-[10px] font-bold text-[#161616] group-hover:-rotate-45 transition-transform duration-500">API</div>
    </div>
    <div className="absolute left-[15%] top-[25%] w-16 h-[2px] bg-[#161616] origin-left group-hover:scale-x-125 transition-transform"></div>
    <div className="absolute right-[15%] bottom-[25%] w-16 h-[2px] bg-[#161616] origin-right group-hover:scale-x-125 transition-transform"></div>
    <div className="absolute top-[15%] right-[25%] w-2 h-2 highlight-bg rounded-full group-hover:scale-150 transition-transform"></div>
  </div>
);

const Visual3 = () => (
  <div className="w-full h-[180px] bg-white border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
    <div className="absolute inset-0 grid-bg opacity-60"></div>
    <div className="relative z-10 w-[120px] h-[100px]">
       <div className="absolute top-0 left-0 w-full h-[40px] border border-dashed border-[#a8a8a8] bg-white/50 backdrop-blur-sm -translate-y-2 group-hover:-translate-y-4 transition-transform duration-500 flex items-center px-4"><div className="w-2 h-2 rounded-full bg-[#e0e0e0]"></div></div>
       <div className="absolute top-[30px] left-0 w-full h-[40px] border border-[#e0e0e0] bg-white/80 backdrop-blur-sm group-hover:highlight-border transition-colors duration-300 flex items-center px-4"><div className="w-2 h-2 rounded-full bg-[#161616]"></div></div>
       <div className="absolute top-[60px] left-0 w-full h-[40px] border-2 highlight-border bg-white shadow-md translate-y-2 group-hover:translate-y-4 transition-transform duration-500 flex items-center px-4 justify-between">
          <div className="w-2 h-2 rounded-full highlight-bg"></div>
          <div className="text-[10px] font-bold text-[#161616] tracking-widest">ACTIVE</div>
       </div>
    </div>
  </div>
);

const Visual4 = () => (
  <div className="w-full h-[180px] bg-white border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
    <div className="absolute inset-0 grid-bg opacity-60"></div>
    <div className="relative w-28 h-28 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
       <div className="absolute w-20 h-20 border border-[#e0e0e0] rotate-45 group-hover:highlight-border transition-colors duration-500"></div>
       <div className="absolute inset-0 border border-dashed border-[#161616] rounded-full"></div>
       <div className="absolute inset-1 border-[3px] highlight-border rounded-full border-b-transparent border-l-transparent group-hover:rotate-[270deg] transition-transform duration-1000 ease-in-out"></div>
       <div className="absolute w-full h-[1px] bg-[#161616] mix-blend-difference"></div>
       <div className="absolute h-full w-[1px] bg-[#161616] mix-blend-difference"></div>
       <div className="w-6 h-6 bg-white border border-[#161616] z-10 flex items-center justify-center group-hover:bg-[#161616] transition-colors">
          <div className="w-1.5 h-1.5 highlight-bg"></div>
       </div>
    </div>
  </div>
);

const Visual5 = () => (
  <div className="w-full h-[180px] bg-white border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
    <div className="absolute inset-0 grid-bg opacity-40"></div>
    {/* Animated Table Data Form UI */}
    <div className="relative w-[140px] border border-[#e0e0e0] bg-white shadow-sm flex flex-col z-10 group-hover:-translate-y-2 transition-transform duration-500 py-2">
       <div className="flex border-b border-[#e0e0e0] pb-2 px-3 mb-2 items-center gap-2">
         <div className="flex flex-col gap-1">
           <div className="w-12 h-1 bg-[#161616]"></div>
           <div className="w-6 h-1 bg-[#a8a8a8]"></div>
         </div>
         <div className="ml-auto w-4 h-4 border border-[#e0e0e0] flex items-center justify-center group-hover:highlight-border transition-colors duration-300">
           <div className="w-1.5 h-1.5 highlight-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
         </div>
       </div>
       
       <div className="flex flex-col px-3 gap-2">
         <div className="flex gap-2 items-center">
           <div className="w-4 h-4 border border-[#e0e0e0] group-hover:highlight-border bg-[#f4f4f4] transition-colors duration-300 flex items-center justify-center">
             <div className="w-2 h-2 highlight-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           </div>
           <div className="flex-1 h-4 border border-[#e0e0e0] flex items-center px-1 overflow-hidden relative bg-[#f8f8f8]">
              <div className="absolute left-0 top-0 bottom-0 highlight-bg w-0 group-hover:w-full transition-all duration-700 ease-in-out opacity-10"></div>
              <div className="h-[2px] bg-[#161616] w-0 group-hover:w-[80%] transition-all duration-700 ease-out z-10"></div>
           </div>
         </div>
         <div className="flex gap-2 items-center">
           <div className="w-4 h-4 border border-[#e0e0e0]"></div>
           <div className="flex-1 h-4 border border-[#e0e0e0] flex items-center px-1 overflow-hidden relative">
              <div className="h-[2px] bg-[#a8a8a8] w-0 group-hover:w-[50%] transition-all duration-700 ease-out delay-[150ms] z-10"></div>
           </div>
         </div>
         <div className="flex gap-2 items-center">
           <div className="w-4 h-4 border border-[#e0e0e0]"></div>
           <div className="flex-1 h-4 border border-[#e0e0e0] flex items-center px-1 overflow-hidden relative">
              <div className="h-[2px] bg-[#a8a8a8] w-0 group-hover:w-[70%] transition-all duration-700 ease-out delay-[300ms] z-10"></div>
           </div>
         </div>
       </div>
    </div>
  </div>
);

const Visual6 = () => (
  <div className="w-full h-[180px] bg-[#f8f9fa] border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
    <div className="absolute inset-0 grid-bg opacity-60"></div>
    <div className="relative w-32 h-32 flex items-center justify-center">
      <div className="absolute left-0 w-8 h-8 border-[2px] border-[#161616] bg-white z-10 group-hover:translate-x-4 transition-transform duration-500 shadow-sm"></div>
      <div className="absolute right-0 w-8 h-8 border border-[#e0e0e0] bg-white z-10 group-hover:-translate-x-4 transition-all duration-500 flex items-center justify-center shadow-sm group-hover:highlight-border">
         <div className="w-2 h-2 highlight-bg opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200"></div>
      </div>
      <div className="absolute w-12 h-12 highlight-border border-2 bg-white z-20 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700">
         <div className="w-4 h-4 border border-[#161616]"></div>
      </div>
      <div className="absolute w-full h-[2px] border-b-2 border-dotted border-[#a8a8a8] z-0"></div>
    </div>
  </div>
);

const FeatureCard = ({ title, desc, visual: VisualComponent }) => (
  <div data-dither="card" className="bg-white carbon-border p-0 rounded-none w-full hover:shadow-xl transition-all duration-400 flex flex-col h-full cursor-pointer group relative overflow-hidden group-hover:-translate-y-1">
    <VisualComponent />
    <div className="p-[24px] flex flex-col bg-white z-10 flex-grow relative">
       <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-transparent group-hover:highlight-border transition-colors duration-300" />
       <h3 className="text-card-title text-[#161616] mb-[12px] group-hover:highlight-text transition-colors duration-300 leading-tight">{title}</h3>
       <p className="text-body-sm text-[#525252] mt-auto leading-relaxed">{desc}</p>
       <div className="mt-8 flex items-center text-xs font-semibold tracking-widest uppercase highlight-text opacity-0 -translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
         Explore Feature <ArrowRight size={14} className="ml-2"/>
       </div>
    </div>
  </div>
);

const BentoCard = ({ className = '', title, desc, tag, dark = false, icon: Icon }) => {
  const textColor = dark ? 'text-white' : 'text-[#161616]';
  const descColor = dark ? 'text-[#a8a8a8]' : 'text-[#525252]';
  const tagBg = dark ? 'bg-white text-[#161616]' : 'bg-[#0f62fe] text-white';
  const arrowColor = dark ? 'text-white' : 'text-[#0f62fe]';

  return (
    <div className={`p-8 lg:p-12 flex flex-col relative group overflow-hidden ${className}`}>
      <div className="relative z-10 flex flex-col h-full">
         {Icon && <Icon size={36} weight="light" className={`${arrowColor} mb-[24px]`} />}
         <h3 className={`text-headline mb-[16px] leading-[1.25] w-full ${textColor}`}>{title}</h3>
         {desc && <p className={`text-body w-full max-w-sm ${descColor}`}>{desc}</p>}
         
         <div className="mt-auto flex justify-between items-end pt-12">
            {tag && (
              <div className={`${tagBg} text-[10px] md:text-xs font-bold px-3 py-1.5 uppercase tracking-widest`}>
                {tag}
              </div>
            )}
            <ArrowUpRight weight="light" className={`${arrowColor} ml-auto w-8 h-8 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`} />
         </div>
      </div>
    </div>
  );
};

const mainBlogCard = {
  tag: "新聞",
  title: "查看 CGA 2026 年度所有產品發布",
  image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
};

const allTestimonials = [
  { brand: 'GEOTAB', metric: '45 mins', desc: '平均每份合約審閱時間節省 45 分鐘，整體效率提升 75%。', quote: '我們在不增加後端人力的情況下，三個月內完成了四個專案的部署，完全顛覆了我們對開發效率的認知。', name: 'David Torchetti', role: 'CTO at Geotab', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80' },
  { brand: 'Quora', metric: '60%', desc: '開發成本顯著下降，能將資源集中在核心業務邏輯的優化。', quote: 'CGA 提供的底層架構不僅穩定，更讓我們能即時應對市場變化，API 的拓展從未如此輕鬆。', name: 'Adrie Christiansen', role: 'Legal Operations Lead', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { brand: 'TechFlow', metric: '0 down time', desc: '即便在流量高峰期，CGA 的基礎架構依舊提供高度穩定的支援。', quote: '原本需要耗費一個月的資料庫與 API 串接，現在只要幾分鐘就能直接在儀表板完成設定。', name: 'Sarah Jenkins', role: 'Engineering Director', image: 'https://images.unsplash.com/photo-1508214751196-bfdce2355152?auto=format&fit=crop&w=400&q=80' },
  { brand: 'Innovate Inc.', metric: '10x', desc: '服務上線速度提升近 10 倍，這對於新創產品來說是極大的競爭優勢。', quote: '強大的權限控管與自動化部署，讓我們在處理高敏感客戶資料時更具信心，安全性無庸置疑。', name: 'Michael Chang', role: 'Lead Architect', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80' },
];

const TestimonialCard = ({ item }) => {
  return (
    <div data-dither="card" className="w-[600px] md:w-[760px] h-[240px] md:h-[280px] bg-[#f4f4f4] border border-[#e0e0e0] flex flex-row cursor-pointer hover:border-[#161616] transition-colors flex-shrink-0 group">
       <div className="w-[210px] md:w-[250px] relative overflow-hidden flex-shrink-0 ml-[15px] my-[15px] bg-[#e0e0e0]">
           <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover grayscale brightness-[65%] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
              <div className="text-[12px] md:text-[14px] text-white font-semibold">{item.name}</div>
              <div className="text-[10px] md:text-[12px] text-white/80">{item.role}</div>
           </div>
       </div>
       <div className="p-4 md:p-6 flex flex-col justify-between flex-grow min-w-0">
           <div className="flex flex-col gap-3 flex-grow min-h-0 justify-center">
               <div className="flex flex-col">
                 <h3 className="text-[28px] md:text-[32px] font-light text-[#161616] mb-1 leading-none">{item.metric}</h3>
                 <p className="text-[12px] md:text-[14px] text-[#525252] leading-relaxed line-clamp-2">{item.desc}</p>
               </div>
               <div className="w-6 h-[1px] bg-[#a8a8a8]/50 my-1"></div>
               <div className="flex flex-col">
                  <p className="text-[14px] md:text-[16px] text-[#161616] leading-relaxed line-clamp-3">"{item.quote}"</p>
               </div>
           </div>
           
           <div className="flex justify-between items-center mt-auto pt-4 border-t border-[#e0e0e0]/50">
             <div className="text-[14px] md:text-[16px] font-bold text-[#161616]">{item.brand}</div>
             <ArrowRight size={16} className="text-[#161616] group-hover:translate-x-1 transition-transform" />
           </div>
       </div>
    </div>
  );
};

const blogCards = [
  {
    tag: "產品發布",
    title: "認識您的 SDLC 夥伴 CGA Copilot：從 AI 輔助編程到 AI 輔助交付的躍進",
    image: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?auto=format&fit=crop&w=800&q=80"
  },
  {
    tag: "產品發布",
    title: "PostgreSQL 的 CGA Data Gate：將巨量資料轉化為即時可操作的 API",
    image: "https://images.unsplash.com/photo-1614064641938-eceb72b136dc?auto=format&fit=crop&w=800&q=80"
  },
  {
    tag: "產品發布",
    title: "推出 CGA 控制中心：消弭架構設計與實際部署之間的落差",
    image: "https://images.unsplash.com/photo-1620825937374-87fc7d6aaf8ea?auto=format&fit=crop&w=800&q=80"
  },
  {
    tag: "產品發布",
    title: "企業級安全核心：我們如何建立與維運 AI 就緒的主權環境",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
  }
];

const TintedImage = ({ src, className = "" }: { src: string, className?: string }) => (
  <>
    <img src={src} alt="" className={`grayscale brightness-[65%] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 object-cover ${className}`} />
  </>
);

const updateCards = [
  {
    tag: "產品更新",
    title: "API 文件現在支援一鍵匯出 Postman Collection",
    desc: "你的 API 測試流程剛剛少了三個步驟。",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
  },
  {
    tag: "使用案例",
    title: "一位設計師如何在 48 小時內讓 SaaS 產品上線",
    desc: "沒有工程師、沒有外包，只有 CGA 和一個週末。",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=800&q=80"
  },
  {
    tag: "教學指南",
    title: "5 分鐘設定 AI 向量搜尋，不需要懂演算法",
    desc: "從零開始的逐步操作，截圖 + 影片雙版本。",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80"
  },
  {
    tag: "活動",
    title: "CGA Demo Day — 5 月報名開放中",
    desc: "看看其他人用 CGA 做出了什麼，或者，帶著你的作品來。",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80"
  }
];

const UpdateCard = ({ tag, title, desc, image }) => (
  <div className="border border-[#e0e0e0] bg-white group hover:border-[#161616] transition-colors duration-300 flex flex-row p-[16px] h-full min-h-[140px] cursor-pointer">
    <div className="w-[100px] h-[100px] md:w-[110px] md:h-[110px] bg-[#f4f4f4] relative overflow-hidden flex-shrink-0">
      <TintedImage src={image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    </div>
    <div className="ml-[16px] flex flex-col flex-grow relative justify-between min-w-0">
       <div className="flex flex-col">
         <span className="text-[12px] text-[#525252] mb-[4px]">{tag}</span>
         {/* Merge title and desc to mimic the reference which has a continuous paragraph */}
         <h4 className="text-[14px] leading-snug font-normal text-[#161616] line-clamp-3">{title}：{desc}</h4>
       </div>
       <div className="flex justify-end mt-[8px]">
          <ArrowRight size={18} className="text-[#0f62fe] group-hover:translate-x-1 transition-transform" />
       </div>
    </div>
  </div>
);

// --- Main Application ---


const designerCards = [
  { visual: Visual1, title: "你設計，後端自己長出來", desc: "用低程式碼建立資料結構，系統自動生成對應 API。你不用寫一行後端，就能讓設計稿裡的功能真實運作。" },
  { visual: Visual2, title: "API 文件？已經幫你生好了", desc: "每次改結構，API 文件自動同步更新。你可以直接把連結丟給對接方，不需要等工程師整理文件。" },
  { visual: Visual3, title: "前端部署不再卡在別人時程", desc: "整合 GitHub/GitLab CD 流程，設計稿改完就能自動上線，不用排隊等後端發版。" },
  { visual: Visual4, title: "搜尋功能也能懂人話", desc: "內建 AI 向量檢索，使用者輸入模糊關鍵字也能找到對的內容——不需要演算法背景，你也能開啟這個功能。" },
  { visual: Visual5, title: "資料操作，像填表格一樣直覺", desc: "不需要寫 SQL，直接在介面上操作資料、設條件、看結果。從原型到真實資料，無縫切換。" },
  { visual: Visual6, title: "模組化擴充，想加功能直接插上去", desc: "需要金流、通知、權限？模組系統讓你像積木一樣組合功能，不用改底層、不怕壞掉別的東西。" }
];

const engineerCards = [
  { visual: Visual1, title: "80% CRUD 自動生成，架構不妥協", desc: "自動產生 Repository / Service 分層結構與測試腳本，符合主流後端慣例。你接手時看得懂，離職時也交得出去。" },
  { visual: Visual2, title: "穩定的 API Contract，終結前後端撕逼", desc: "欄位異動時 API Contract 同步更新，前端不會因後端改一個欄位壞一整片——平行開發真的做得到。" },
  { visual: Visual5, title: "屬性級權限控管，企業級安全開箱即用", desc: "整合 Oso 引擎，支援單筆記錄層級的存取驗證，自動過濾非法請求，不需要自己實作 Policy 層。" },
  { visual: Visual4, title: "N+1 查詢問題，架構層已解決", desc: "內建 Dataloader 與關聯預載，大量查詢轉化為常數級請求，效能瓶頸不用等上線後才發現。" },
  { visual: Visual3, title: "Redis 快取邏輯，不用自己維護失效策略", desc: "高頻讀取自動快取、寫入後自動失效，快取一致性由系統處理。你只需要標記哪些資料要快取。" },
  { visual: Visual6, title: "Docker + AWS，每個租戶獨立環境，99.9% SLA", desc: "容器化部署在 AWS 之上，資源隔離、可橫向擴展。業務量暴增時不用半夜爬起來手動擴容。" }
];

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'designer' | 'engineer'>('designer');
  const [currentPage, setCurrentPage] = useState<'home' | 'pricing' | 'blog' | 'contact' | 'team'>('home');
  const [footerHeight, setFooterHeight] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!footerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      setFooterHeight(entries[0].borderBoxSize[0]?.blockSize || entries[0].contentRect.height);
    });
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const momentumID = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const lastMouseX = useRef<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    cancelAnimationFrame(momentumID.current);
    lastTime.current = performance.now();
    lastMouseX.current = e.pageX;
  };

  const handleMouseLeave = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    startMomentum();
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    startMomentum();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    
    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 1) {
       const dx = e.pageX - lastMouseX.current;
       velocity.current = (velocity.current * 0.5) + ((dx / dt) * 0.5);
    }
    lastTime.current = now;
    lastMouseX.current = e.pageX;
    
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const startMomentum = () => {
    let v = velocity.current;
    if (Math.abs(v) < 0.05) {
        return;
    }

    const step = () => {
       if (Math.abs(v) < 0.05 || isDragging.current || !sliderRef.current) {
           return;
       }
       sliderRef.current.scrollLeft -= v * 20; 
       v *= 0.92;
       momentumID.current = requestAnimationFrame(step);
    };
    momentumID.current = requestAnimationFrame(step);
  };

  const currentCards = activeTab === 'designer' ? designerCards : engineerCards;

  return (
    <>
      <div className="min-h-screen font-plex text-[#161616] flex flex-col w-full overflow-x-hidden relative">
      <CarbonStyles />
      <CursorDitherTrail />

      <main className="bg-white flex flex-col w-full relative z-10 shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex-grow" style={{ marginBottom: footerHeight }}>
      {/* Utility Bar */}
      <div className="hidden md:flex items-center justify-end h-[32px] bg-[#f4f4f4] w-full border-b border-[#e0e0e0]">
         <div className="flex gap-6 text-caption text-[#525252] max-w-[1584px] w-full px-4 md:px-8 justify-end">
            <span className="flex items-center gap-1 cursor-pointer hover:text-[#161616]">
              <Globe size={16} weight="light" /> Taiwan - English
            </span>
            <span className="cursor-pointer hover:text-[#161616]">聯絡 CGA 專家</span>
            <span className="cursor-pointer hover:text-[#161616]">支援與常見問題</span>
         </div>
      </div>

      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-white carbon-border border-t-0 border-l-0 border-r-0 h-[48px] flex items-center justify-center">
        <div className="flex items-center justify-between px-4 md:px-8 max-w-[1584px] w-full h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer font-bold tracking-tight" onClick={() => setCurrentPage('home')}>
            <div className="w-5 h-5 bg-[#0f62fe]"></div>
            <span className="text-[18px] text-[#161616]">CodeGenApps</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden md:flex h-full items-center">
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} className={`h-full px-4 flex items-center text-body-sm text-[#161616] border-b-2 ${currentPage === 'home' ? 'border-[#161616]' : 'border-transparent'} hover:border-[#161616] hover:bg-[#f4f4f4] transition-colors`}>服務項目</a>
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('pricing'); }} className={`h-full px-4 flex items-center text-body-sm text-[#161616] border-b-2 ${currentPage === 'pricing' ? 'border-[#161616]' : 'border-transparent'} hover:border-[#161616] hover:bg-[#f4f4f4] transition-colors`}>價格方案</a>
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('blog'); }} className={`h-full px-4 flex items-center text-body-sm text-[#161616] border-b-2 ${currentPage === 'blog' ? 'border-[#161616]' : 'border-transparent'} hover:border-[#161616] hover:bg-[#f4f4f4] transition-colors`}>部落格與新聞</a>
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('team'); }} className={`h-full px-4 flex items-center text-body-sm text-[#161616] border-b-2 ${currentPage === 'team' ? 'border-[#161616]' : 'border-transparent'} hover:border-[#161616] hover:bg-[#f4f4f4] transition-colors`}>關於團隊</a>
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); }} className={`h-full px-4 flex items-center text-body-sm text-[#161616] border-b-2 ${currentPage === 'contact' ? 'border-[#161616]' : 'border-transparent'} hover:border-[#161616] hover:bg-[#f4f4f4] transition-colors`}>聯絡我們</a>
          </nav>

          {/* Icons / Sign in */}
          <div className="flex items-center h-full">
            <button data-dither="btn" className="h-full px-3 flex items-center hover:bg-[#f4f4f4] transition-colors"><MagnifyingGlass size={20} weight="light" className="text-[#161616]"/></button>
            <button data-dither="btn" className="h-full px-3 flex items-center hover:bg-[#f4f4f4] transition-colors"><User size={20} weight="light" className="text-[#161616]"/></button>
            <button data-dither="btn" className="md:hidden h-full px-3 flex items-center hover:bg-[#f4f4f4] transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} weight="light" className="text-[#161616]"/> : <List size={20} weight="light" className="text-[#161616]"/>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-white z-40 p-4 border-t border-[#e0e0e0]">
          <div className="flex flex-col">
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); setIsMenuOpen(false); }} className={`text-body-lg text-[#161616] py-4 border-b border-[#e0e0e0] ${currentPage === 'home' ? 'font-bold' : ''}`}>服務項目</a>
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('pricing'); setIsMenuOpen(false); }} className={`text-body-lg text-[#161616] py-4 border-b border-[#e0e0e0] ${currentPage === 'pricing' ? 'font-bold' : ''}`}>價格方案</a>
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('blog'); setIsMenuOpen(false); }} className={`text-body-lg text-[#161616] py-4 border-b border-[#e0e0e0] ${currentPage === 'blog' ? 'font-bold' : ''}`}>部落格與新聞</a>
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('team'); setIsMenuOpen(false); }} className={`text-body-lg text-[#161616] py-4 border-b border-[#e0e0e0] ${currentPage === 'team' ? 'font-bold' : ''}`}>關於團隊</a>
             <a href="#" data-dither="btn" onClick={(e) => { e.preventDefault(); setCurrentPage('contact'); setIsMenuOpen(false); }} className={`text-body-lg text-[#161616] py-4 border-b border-[#e0e0e0] ${currentPage === 'contact' ? 'font-bold' : ''}`}>聯絡我們</a>
          </div>
        </div>
      )}

      {currentPage === 'home' && (
        <>
          {/* Hero */}
      <section className="pt-[48px] pb-[96px] md:pt-[120px] pb-[120px] bg-white w-full flex justify-center relative overflow-hidden">
        {/* Visual Geometric Side Background */}
        <div className="hidden md:block absolute top-0 right-0 w-5/12 h-full border-l border-[#e0e0e0] z-0 overflow-hidden">
          <div className="absolute inset-0">
             <Dither
                waveColor={[8/255, 189/255, 186/255]}
                waveSpeed={0.03}
                waveFrequency={1.6}
                waveAmplitude={0.25}
                colorNum={5}
                pixelSize={2}
             />
          </div>
          {/* Overlay Grid */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none"></div>

          <HeroCards />
        </div>

        <div className="max-w-[1584px] w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-[32px] relative z-10">
           <div className="md:col-span-7 flex flex-col items-start pr-0 md:pr-12">
              <span className="text-eyebrow text-[#525252] mb-[16px]">NO-CODE 開發與 LOW-CODE 後端自動化</span>
              <h1 className="text-display-xl text-[#161616] mb-[32px]">為卓越開發而生</h1>
              <p className="text-body-lg text-[#525252] mb-[48px] max-w-[700px]">
                快速、直覺、低成本的開發體驗。釋放創造力，自動生成 80% 的 CRUD 代碼，並內建標準的分層架構。讓開發者從繁瑣的標準代碼中解脫，將寶貴時間投入在解決複雜的業務挑戰上。
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                 <PrimaryButton className="w-full sm:w-auto">一鍵啟動 <ArrowRight size={16} weight="light" /></PrimaryButton>
                 <SecondaryButton className="w-full sm:w-auto">預約顧問諮詢</SecondaryButton>
              </div>
           </div>
        </div>
      </section>

      {/* Stats Ribbon - Surface Lift */}
      <section className="bg-white carbon-border border-t-0 border-l-0 border-r-0 border-b-0 w-full flex justify-center z-10 relative">
        <div className="max-w-[1584px] w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
           {/* Stat 1: 200+ */}
           <div className="px-8 py-[40px] md:border-r border-b md:border-b-0 border-[#e0e0e0] flex flex-col gap-2 bg-white/80 backdrop-blur-sm group hover:bg-[#0f62fe] transition-colors duration-300">
             <div className="flex items-center justify-between">
               <h2 className="text-display-md text-[#161616] group-hover:text-white transition-colors duration-300">
                 <CountUp to={200} duration={2.5} suffix="+" />
               </h2>
               <Code size={36} weight="light" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </div>
             <p className="text-body-sm text-[#525252] group-hover:text-white/80 transition-colors duration-300">已建立的 API 專案數</p>
           </div>
           
           {/* Stat 2: 45 min */}
           <div className="px-8 py-[40px] md:border-r border-b md:border-b-0 border-[#e0e0e0] flex flex-col gap-2 bg-white/80 backdrop-blur-sm group hover:bg-[#0f62fe] transition-colors duration-300">
             <div className="flex items-center justify-between">
               <h2 className="text-display-md text-[#161616] group-hover:text-white transition-colors duration-300">
                 <CountUp to={45} duration={2} suffix=" Min" />
               </h2>
               <Timer size={36} weight="light" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </div>
             <p className="text-body-sm text-[#525252] group-hover:text-white/80 transition-colors duration-300">平均從零到 MVP 上線</p>
           </div>
           
           {/* Stat 3: 99.9% */}
           <div className="px-8 py-[40px] md:border-r border-b md:border-b-0 sm:border-b-0 border-[#e0e0e0] flex flex-col gap-2 bg-white/80 backdrop-blur-sm group hover:bg-[#0f62fe] transition-colors duration-300">
             <div className="flex items-center justify-between">
               <h2 className="text-display-md text-[#161616] group-hover:text-white transition-colors duration-300">
                 <CountUp to={99.9} decimals={1} duration={2.5} suffix="%" />
               </h2>
               <CheckCircle size={36} weight="light" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </div>
             <p className="text-body-sm text-[#525252] group-hover:text-white/80 transition-colors duration-300">系統穩定運行率</p>
           </div>

           {/* Stat 4: 10x */}
           <div className="px-8 py-[40px] flex flex-col gap-2 bg-white/80 backdrop-blur-sm group hover:bg-[#0f62fe] transition-colors duration-300">
             <div className="flex items-center justify-between">
               <h2 className="text-display-md text-[#161616] group-hover:text-white transition-colors duration-300">
                 <CountUp to={10} duration={3} suffix="x" />
               </h2>
               <ChartLineUp size={36} weight="light" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
             </div>
             <p className="text-body-sm text-[#525252] group-hover:text-white/80 transition-colors duration-300">平均開發效率提升</p>
           </div>
        </div>
      </section>

      {/* Partners Marquee */}
      <section className="h-[80px] bg-[#161616] w-full flex items-center overflow-hidden relative cursor-grab active:cursor-grabbing">
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 100 }}
          className="flex w-fit items-center"
          drag="x"
          dragConstraints={{ left: -1000, right: 0 }}
        >
          {/* Content repeated twice for seamless loop */}
          <div className="flex gap-[64px] items-center text-xs font-semibold tracking-widest whitespace-nowrap pl-[64px]">
             <span className="text-[#a8a8a8]">TRUSTED BY</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">NEXT.JS</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">REACT</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">TAILWIND</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">TYPESCRIPT</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">DOCKER</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">POSTGRESQL</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">VERCEL</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">AWS</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">REDIS</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">GITHUB</span>
             <span className="text-[#f4f4f4] opacity-20">|</span>
          </div>
          <div className="flex gap-[64px] items-center text-xs font-semibold tracking-widest whitespace-nowrap pl-[64px]">
             <span className="text-[#a8a8a8]">TRUSTED BY</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">NEXT.JS</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">REACT</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">TAILWIND</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">TYPESCRIPT</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">DOCKER</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">POSTGRESQL</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">VERCEL</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">AWS</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">REDIS</span>
             <span className="text-white opacity-40 hover:opacity-100 transition-opacity">GITHUB</span>
             <span className="text-[#f4f4f4] opacity-20">|</span>
          </div>
        </motion.div>
      </section>

      {/* Latest Updates */}
      <section className="py-[48px] bg-white w-full flex flex-col relative overflow-hidden border-b border-[#e0e0e0]">
        <div className="max-w-[1584px] w-full px-4 md:px-8 mx-auto relative z-10">
          <div className="mb-[48px] max-w-[800px]">
            <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">最新消息</p>
          </div>

          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-[24px] lg:gap-[16px] overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 w-full">
             {updateCards.map((card, i) => (
               <div key={i} className="snap-start flex-shrink-0 w-[85vw] md:w-auto h-full">
                  <UpdateCard {...card} />
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className={`py-[96px] bg-white w-full flex flex-col relative overflow-hidden transition-colors duration-500 ${activeTab === 'designer' ? 'theme-designer' : 'theme-engineer'}`}>
        <div className="absolute bottom-1/4 right-[10%] w-32 h-32 border-[16px] border-[#f4f4f4] rounded-full z-0 pointer-events-none"></div>
        <div className="absolute top-[10%] left-[5%] w-16 h-16 border border-[#e0e0e0] rotate-45 z-0 pointer-events-none"></div>

        <div className="max-w-[1584px] w-full px-4 md:px-8 mx-auto relative z-10">
          <div className="mb-[48px] max-w-[800px]">
            <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">核心技術</p>
            <h2 className="text-display-xl mb-[24px] max-w-[800px] text-[#161616]">核心技術特性</h2>
            <p className="text-body-lg text-[#525252] max-w-[600px]">
              與大多數 NO CODE 後端不同，我們提供了一個完全託管的基礎架構，確保您的系統在業務擴展時，依然穩如磐石、值得依賴。
            </p>
          </div>

          <div className="flex flex-col sm:flex-row border-b border-[#e0e0e0] mb-[48px] gap-2 md:gap-8 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('designer')}
              className={`px-4 md:px-8 py-4 font-semibold tracking-widest text-[16px] md:text-[18px] transition-all duration-300 border-b-[3px] -mb-[1px] whitespace-nowrap flex gap-2 items-center ${
                activeTab === 'designer' ? 'highlight-border highlight-text' : 'border-transparent text-[#a8a8a8] hover:text-[#161616]'
              }`}
            >
              給設計師
            </button>
            <button
              onClick={() => setActiveTab('engineer')}
              className={`px-4 md:px-8 py-4 font-semibold tracking-widest text-[16px] md:text-[18px] transition-all duration-300 border-b-[3px] -mb-[1px] whitespace-nowrap flex gap-2 items-center ${
                activeTab === 'engineer' ? 'highlight-border highlight-text' : 'border-transparent text-[#a8a8a8] hover:text-[#161616]'
              }`}
            >
              給工程團隊
            </button>
          </div>
        </div>

        <div className="w-full relative z-10 mx-auto max-w-[1584px] pl-4 md:pl-8">
          <div 
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex items-stretch gap-[24px] overflow-x-auto pb-[48px] pt-4 hide-scrollbar pr-8 select-none cursor-grab active:cursor-grabbing"
          >
            {currentCards.map((c, i) => (
              <div key={i} className="w-[85vw] sm:w-[320px] lg:w-[380px] flex-shrink-0 h-auto flex">
                <FeatureCard visual={c.visual} title={c.title} desc={c.desc} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <WorkflowSection />

      {/* Schema Interactive Section */}
      <SchemaInteractiveSection />

      {/* Enterprise Capabilities - Bento Grid */}
      <section className="py-[96px] bg-[#f8f9fa] w-full border-t border-[#e0e0e0]">
        <div className="max-w-[1584px] w-full px-4 md:px-8 mx-auto relative z-10">
          <div className="mb-[64px] max-w-[800px]">
            <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">應用與擴展</p>
            <h2 className="text-display-xl mb-[24px] max-w-[800px] text-[#161616]">應用場景與強大拓展功能</h2>
            <p className="text-body-lg text-[#525252] max-w-[600px]">
              提供工程團隊高度可控的客製化環境，滿足從初期敏捷驗證到企業級深度整合的各種挑戰。
            </p>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#e0e0e0] border border-[#e0e0e0]">
            {/* Row 1 */}
            {/* Image Cell */}
            <div className="bg-white col-span-1 aspect-square relative overflow-hidden group">
               <TintedImage src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            
            {/* 1. 結構即程式碼 */}
            <BentoCard 
              className="bg-[#f4f4f4] lg:col-span-1 aspect-square"
              title="結構即程式碼"
              desc="改結構自動同步 API，單一事實來源"
              tag="ARCHITECTURE"
              icon={TreeStructure}
            />

             {/* 2. 屬性級權限控管 */}
            <BentoCard 
              className="bg-white lg:col-span-2 aspect-square lg:aspect-[2/1]"
              title="屬性級權限控管"
              desc="記錄層級存取驗證，企業級安全"
              tag="SECURITY"
              icon={ShieldCheck}
            />
            
            {/* Row 2 */}
            {/* 3. N+1 查詢優化 */}
            <BentoCard 
              className="bg-white lg:col-span-2 aspect-square lg:aspect-[2/1]"
              title="N+1 查詢優化"
              desc="內建 Dataloader，效能問題在架構層解決"
              tag="PERFORMANCE"
              icon={Lightning}
            />

            {/* Image Cell */}
            <div className="bg-white col-span-1 aspect-square relative overflow-hidden group">
               <TintedImage src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>

             {/* 4. 動態 SQL 端點 */}
            <BentoCard 
              className="bg-[#f4f4f4] lg:col-span-1 aspect-square"
              title="動態 SQL 端點"
              desc="不改程式碼就能擴充報表查詢"
              tag="DATABASE"
              icon={Database}
            />

            {/* Row 3 */}
            {/* 5. 智慧快取機制 */}
            <BentoCard 
              className="bg-[#f4f4f4] lg:col-span-1 aspect-square"
              title="智慧快取機制"
              desc="Redis 自動處理快取失效，效能與一致性兼顧"
              tag="INFRASTRUCTURE"
              icon={Cpu}
            />

            {/* 6. 分層開發架構 */}
            <BentoCard 
              className="bg-white lg:col-span-2 aspect-square lg:aspect-[2/1]"
              title="分層開發架構"
              desc="自動生成 Repository/Service 層，內建測試腳本"
              tag="DEVELOPMENT"
              icon={Stack}
            />

            {/* Image Cell */}
            <div className="bg-[#161616] col-span-1 aspect-square relative overflow-hidden group">
               <TintedImage src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
            </div>

          </div>
        </div>
      </section>

      <IntegrationsSection />

      {/* Blog & News */}
      <section className="py-[96px] bg-white w-full border-t border-[#e0e0e0] flex justify-center">
        <div className="max-w-[1584px] w-full px-4 md:px-8">
          <div className="mb-[64px] max-w-[800px]">
            <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">最新動態</p>
            <h2 className="text-display-xl mb-[24px] max-w-[800px] text-[#161616]">部落格與新聞</h2>
            <p className="text-body-lg text-[#525252] max-w-[600px]">
              探索最新產品發布、技術分享與開發者成功故事，隨時掌握我們在創新上的最新進展。
            </p>
          </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[#e0e0e0] border border-[#e0e0e0]">
              {/* Big Card - spans 2 cols, 2 rows */}
              <div className="col-span-1 md:col-span-2 lg:col-span-2 row-span-2 bg-white flex flex-col relative group cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden">
                  <div className="flex-grow min-h-[400px] lg:min-h-[500px] relative bg-[#f4f4f4] overflow-hidden">
                      <TintedImage src={mainBlogCard.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="absolute bottom-0 left-0 bg-[#f4f4f4] w-[90%] md:w-[70%] p-6 md:p-8 flex flex-col group-hover:bg-[#e0e0e0] transition-colors">
                      <span className="text-[14px] text-[#525252] mb-2">{mainBlogCard.tag}</span>
                      <h3 className="text-[20px] md:text-[24px] text-[#161616] mb-8 leading-snug font-normal">{mainBlogCard.title}</h3>
                      <ArrowRight size={24} weight="light" className="text-[#0f62fe] group-hover:translate-x-1 transition-transform" />
                  </div>
              </div>
              
              {/* Small Cards */}
              {blogCards.map((card, i) => (
                  <div key={i} className="bg-white p-4 md:p-6 flex flex-col cursor-pointer group hover:bg-[#f8f9fa] transition-colors col-span-1 border border-transparent hover:border-[#e0e0e0]">
                      <div className="mb-4 w-full aspect-video overflow-hidden relative bg-[#f4f4f4]">
                          <TintedImage src={card.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      </div>
                      <span className="text-[12px] uppercase tracking-widest text-[#525252] mb-3 font-semibold">{card.tag}</span>
                      <h4 className="text-[18px] md:text-[20px] text-[#161616] mb-4 line-clamp-3 leading-snug font-normal">{card.title}</h4>
                      <div className="mt-auto pt-4 border-t border-[#f4f4f4] flex justify-between items-center text-[#525252]">
                          <span className="text-[12px]">閱讀更多</span>
                          <ArrowRight size={20} weight="light" className="text-[#0f62fe] group-hover:translate-x-1 transition-transform" />
                      </div>
                  </div>
              ))}
           </div>
        </div>
      </section>

      {/* Design Service */}
      <section className="py-[120px] bg-white w-full border-t border-[#e0e0e0] overflow-hidden">
        <div className="max-w-[1584px] mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            
            {/* Left Column: Context */}
            <div className="lg:col-span-5 flex flex-col justify-center">
                 <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">設計服務</p>
                 <h2 className="text-[32px] md:text-[42px] leading-[1.2] text-[#161616] mb-6">
                   不只給你後端，<br className="hidden lg:block"/>連前端也幫你搞定
                 </h2>
                 <p className="text-[16px] text-[#525252] mb-8 leading-relaxed max-w-[500px]">
                   有了 API，但畫面還沒著落？CGA 設計團隊可以從品牌風格、UI 設計到前端切版一條龍完成。你專注在商業邏輯，我們負責讓產品好看又好用。
                 </p>
                 <div className="flex w-fit">
                   <GhostButton className="px-0 flex items-center gap-2 group text-[#0f62fe] hover:bg-transparent">
                     了解設計服務 <ArrowRight size={16} weight="light" className="group-hover:translate-x-1 transition-transform" />
                   </GhostButton>
                 </div>
            </div>

            {/* Right Column: Services List */}
            <div className="lg:col-span-1 hidden lg:flex justify-center">
              <div className="w-[1px] h-full bg-[#e0e0e0]"></div>
            </div>
            <div className="lg:col-span-6 flex flex-col justify-center">
              {[
                { title: "品牌視覺與 UI 設計", desc: "重塑品牌形象與體驗，打造現代化、直覺的數位介面設計。", icon: Palette },
                { title: "RWD 響應式前端開發", desc: "兼顧體驗與跨裝置相容性，完美還原設計稿的高品質切版。", icon: Devices },
                { title: "設計系統建立與元件化", desc: "構建可擴展的共用架構與開發者友善的 React 元件庫。", icon: Stack }
              ].map((service, idx) => (
                <div key={idx} className="flex gap-6 py-8 border-b border-[#e0e0e0] last:border-0 group cursor-pointer">
                  <div className="w-8 h-8 flex-shrink-0 text-[#161616] group-hover:text-[#0f62fe] transition-colors mt-1">
                    <service.icon size={24} weight="light" />
                  </div>
                  <div>
                    <h3 className="text-[20px] text-[#161616] font-medium mb-2 group-hover:text-[#0f62fe] transition-colors">{service.title}</h3>
                    <p className="text-[14px] text-[#525252] leading-relaxed max-w-[480px]">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
        </div>

        {/* Portfolio Carousel */}
        <div className="w-full overflow-hidden flex items-center py-[24px]">
          <motion.div 
            drag="x"
            dragConstraints={{ left: -3000, right: 0 }}
            className="flex w-fit cursor-grab active:cursor-grabbing pl-4 md:pl-8 lg:pl-[max(2rem,calc((100vw-1584px)/2+2rem))]"
          >
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 80 }}
              className="flex w-fit items-center gap-[1px] pr-[1px] pointer-events-none bg-[#e0e0e0] border border-[#e0e0e0]"
            >
              {[
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&q=80",
                "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=600&fit=crop&q=80"
              ].map((img, i) => (
                 <div key={i} className="w-[280px] md:w-[320px] lg:w-[420px] aspect-[16/10] bg-[#f4f4f4] flex-shrink-0 group pointer-events-auto relative overflow-hidden">
                   <div className="absolute inset-0 bg-[#0f62fe]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-multiply pointer-events-none"></div>
                   <img src={img} className="w-full h-full object-cover object-left-top grayscale-[80%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 pointer-events-none" />
                 </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-[96px] bg-[#f8f9fa] w-full flex justify-center border-t border-[#e0e0e0] overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 120s linear infinite;
            display: flex;
            width: max-content;
          }
          .animate-marquee-reverse {
            animation: marquee 120s linear infinite reverse;
            display: flex;
            width: max-content;
          }
          .marquee-container:hover .animate-marquee,
          .marquee-container:hover .animate-marquee-reverse {
            animation-play-state: paused;
          }
        `}} />
        <div className="w-full relative flex flex-col">
          <div className="max-w-[1584px] w-full px-4 md:px-8 mx-auto mb-[64px] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-[800px]">
              <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">成功案例</p>
              <h2 className="text-display-xl mb-[24px] max-w-[800px] text-[#161616]">客戶回饋</h2>
              <p className="text-body-lg text-[#525252] max-w-[600px]">
                查看領先企業如何利用 CGA 的卓越基礎架構改變開發方式，顯著提升營運效率與業務創新。
              </p>
            </div>
            <SecondaryButton className="bg-transparent border border-[#161616] text-[#161616] hover:bg-[#161616] hover:text-white w-full sm:w-auto mb-[24px] md:mb-[16px]">
              全部成功案例 <ArrowRight size={16} />
            </SecondaryButton>
          </div>

          <div className="flex flex-col gap-[24px] marquee-container relative w-full overflow-hidden">
            {/* Row 1 */}
            <div className="w-full overflow-hidden">
              <div className="animate-marquee gap-[24px]">
                 {/* Duplicate arrays for seamless marquee loop */}
                 {[...allTestimonials, ...allTestimonials, ...allTestimonials].map((item, i) => (
                    <TestimonialCard key={`row1-${i}`} item={item} />
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection onContactClick={() => setCurrentPage('contact')} />

      <CTASection />
        </>
      )}

      {currentPage === 'pricing' && (
      <>
        {/* Pricing */}
        <section className="py-[96px] bg-[#f8f9fa] w-full flex-grow flex justify-center">
          <div className="max-w-[1584px] w-full px-4 md:px-8">
          <div className="mb-[64px] text-center md:text-left max-w-[800px]">
            <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">定價方案</p>
            <h2 className="text-display-xl mb-[24px] max-w-[800px] text-[#161616]">選擇適合您的方案</h2>
            <p className="text-body-lg text-[#525252] max-w-[600px] mx-auto md:mx-0">
              從免費開始，隨著您的需求成長而升級。無論您是個人開發者還是大型企業團隊。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-[24px] lg:gap-[32px]">
             {/* Starter */}
             <div className="bg-white border border-[#e0e0e0] p-[32px] rounded-none flex flex-col h-full hover:border-[#0f62fe] transition-colors cursor-pointer group shadow-sm hover:shadow-md">
               <h3 className="text-card-title text-[#161616] mb-[8px]">Starter</h3>
               <div className="text-display-md text-[#161616] mb-[8px]">$0</div>
               <p className="text-caption text-[#525252] mb-[24px] pb-[24px] border-b border-[#e0e0e0]">適合個人試用與原型開發</p>
               <ul className="text-body-sm text-[#161616] flex flex-col gap-[16px] mb-[48px] flex-grow">
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>最多 1 個專案 (本地環境)</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>10 資料表 / 2 工作流</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>1GB 儲存 / 10 RPS</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>每月 10,000 次 API 限額</span></li>
               </ul>
               <GhostButton className="w-full justify-between mt-auto border border-[#0f62fe] group-hover:bg-[#e5eefd]">即刻使用 <ArrowRight size={16} weight="light"/></GhostButton>
             </div>

             {/* Recommended / Professional */}
             <div className="bg-white border border-[#e0e0e0] border-t-4 border-t-[#0f62fe] p-[32px] rounded-none flex flex-col h-full relative cursor-pointer shadow-md transform md:-translate-y-4">
               <span className="absolute top-0 right-0 bg-[#0f62fe] text-white text-caption px-[12px] py-[6px] tracking-widest font-semibold uppercase -translate-y-full translate-x-[4px] md:-translate-y-[calc(100%+4px)] md:translate-x-0">Recommended</span>
               <h3 className="text-card-title text-[#161616] mb-[8px]">Professional</h3>
               <div className="text-display-md text-[#161616] mb-[8px]">$6,000<span className="text-body-sm text-[#525252] font-normal">/月</span></div>
               <p className="text-caption text-[#525252] mb-[24px] pb-[24px] border-b border-[#e0e0e0]">效能與完整功能的首選</p>
               <ul className="text-body-sm text-[#161616] flex flex-col gap-[16px] mb-[48px] flex-grow">
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>5 專案 / 獨立線上環境</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>20 資料表 / 10 工作流</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>10GB 儲存 / 50 RPS</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>每月 2,000,000 次 API</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#0f62fe] flex-shrink-0"/> <span>自定義 Domain / 團隊邀請</span></li>
               </ul>
               <PrimaryButton className="w-full justify-between mt-auto shadow-sm">開始升級 <ArrowRight size={16} weight="light"/></PrimaryButton>
             </div>

             {/* Enterprise */}
             <div className="bg-white border border-[#e0e0e0] p-[32px] rounded-none flex flex-col h-full hover:border-[#161616] transition-colors cursor-pointer shadow-sm hover:shadow-md">
               <h3 className="text-card-title text-[#161616] mb-[8px]">Enterprise</h3>
               <div className="text-display-md text-[#161616] mb-[8px]">$30,000<span className="text-body-sm text-[#525252] font-normal">/月</span></div>
               <p className="text-caption text-[#525252] mb-[24px] pb-[24px] border-b border-[#e0e0e0]">高規服務與企業安全性</p>
               <ul className="text-body-sm text-[#161616] flex flex-col gap-[16px] mb-[48px] flex-grow">
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#161616] flex-shrink-0"/> <span>專案不限 / 環境自動擴展</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#161616] flex-shrink-0"/> <span>所有規格均無限制</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#161616] flex-shrink-0"/> <span>每月 20,000,000 次 API</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#161616] flex-shrink-0"/> <span>定期備份 / API Log 查詢</span></li>
                 <li className="flex gap-[12px]"><Check size={20} weight="light" className="text-[#161616] flex-shrink-0"/> <span>專屬 1 對 1 技術支援</span></li>
               </ul>
               <SecondaryButton className="w-full justify-between mt-auto" onClick={() => setCurrentPage('contact')}>聯絡我們 <ArrowRight size={16} weight="light"/></SecondaryButton>
             </div>
          </div>
        </div>
      </section>
      </>
      )}

      {currentPage === 'blog' && (
        <BlogPage />
      )}

      {currentPage === 'team' && (
        <TeamPage onContactClick={() => setCurrentPage('contact')} />
      )}

      {currentPage === 'contact' && (
        <ContactPage />
      )}

      </main>

      {/* Footer sticky reveal wrapper */}
      <div className="fixed bottom-0 left-0 w-full z-0 h-auto">
        <footer ref={footerRef} className="bg-[#161616] pt-[80px] pb-[40px] w-full flex flex-col items-center">
          <div className="max-w-[1584px] w-full px-4 md:px-8 flex flex-col">
             {/* Top section */}
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-[64px]">
             <div className="font-plex text-[24px] font-semibold text-white mb-6 md:mb-0 tracking-wide">CodeGenApps</div>
             <div className="flex flex-col sm:flex-row items-center gap-4">
               <span className="text-white text-[16px]">Ready to get started?</span>
               <button data-dither="btn" className="bg-white text-[#161616] text-[14px] font-semibold px-6 py-3 hover:bg-[#e0e0e0] transition-colors whitespace-nowrap">Get started</button>
             </div>
           </div>

           {/* Divider */}
           <div className="w-full h-[1px] bg-[#393939] mb-[64px]"></div>

           {/* Bottom section */}
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-[64px] lg:gap-8 mb-[64px]">
             {/* Newsletter */}
             <div className="lg:col-span-4 flex flex-col pt-2">
               <h4 className="text-white text-[16px] mb-6 font-medium">Subscribe to our newsletter</h4>
               <div className="flex max-w-[320px]">
                 <input type="email" placeholder="Email address" className="flex-1 bg-transparent border border-[#393939] border-r-0 px-4 py-3 text-white text-[14px] focus:outline-none focus:border-white transition-colors" />
                 <button data-dither="btn" className="bg-white text-[#161616] px-4 py-3 hover:bg-[#e0e0e0] transition-colors flex items-center justify-center border border-white">
                   <ArrowRight size={16} weight="bold" />
                 </button>
               </div>
             </div>

             {/* Links */}
             <div className="lg:col-span-8 flex flex-wrap sm:grid sm:grid-cols-4 gap-[32px] lg:pl-[48px]">
               <div className="flex flex-col w-1/2 sm:w-auto">
                 <h5 className="text-white text-[14px] mb-6 font-medium">Services</h5>
                 <ul className="flex flex-col gap-4 text-[#a8a8a8] text-[14px]">
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">API Generation</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Database Setup</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">UI Design</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Cloud Hosting</a></li>
                 </ul>
               </div>
               <div className="flex flex-col w-1/2 sm:w-auto">
                 <h5 className="text-white text-[14px] mb-6 font-medium">About</h5>
                 <ul className="flex flex-col gap-4 text-[#a8a8a8] text-[14px]">
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Our Story</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Benefits</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Team</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Careers</a></li>
                 </ul>
               </div>
               <div className="flex flex-col w-1/2 sm:w-auto">
                 <h5 className="text-white text-[14px] mb-6 font-medium">Navigation</h5>
                 <ul className="flex flex-col gap-4 text-[#a8a8a8] text-[14px]">
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Features</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">How it works</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Pricing</a></li>
                 </ul>
               </div>
               <div className="flex flex-col w-1/2 sm:w-auto">
                 <h5 className="text-white text-[14px] mb-6 font-medium">Help</h5>
                 <ul className="flex flex-col gap-4 text-[#a8a8a8] text-[14px]">
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">FAQs</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Contact Us</a></li>
                   <li><a href="#" data-dither="btn" className="hover:text-white transition-colors">Privacy Policy</a></li>
                 </ul>
               </div>
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row justify-between text-[#878d96] text-[12px] pt-4 items-center sm:items-start gap-2">
             <p>© 2026 CodeGenApps. All rights reserved.</p>
             <p>PATENTED. 第 I795009 號</p>
           </div>
        </div>
      </footer>
      </div>
    </div>
    </>
  );
}
