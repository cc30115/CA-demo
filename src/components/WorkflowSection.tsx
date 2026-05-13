import React from 'react';

const WorkflowVisual1 = () => (
   <div className="w-full h-[180px] bg-[#f8f9fa] border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
     <div className="absolute inset-0 grid-bg opacity-40"></div>
     <div className="relative w-[140px] h-[90px] border border-[#e0e0e0] bg-white flex flex-col p-3 shadow-sm group-hover:scale-105 transition-transform duration-500 z-10 -ml-12 group-hover:-translate-y-2">
         <div className="w-full h-[12px] bg-[#f4f4f4] mb-3"></div>
         <div className="flex gap-2 mb-2 items-center"><div className="w-[6px] h-[6px] rounded-full highlight-bg"></div><div className="w-1/2 h-[4px] bg-[#e0e0e0]"></div></div>
         <div className="flex gap-2 mb-2 items-center"><div className="w-[6px] h-[6px] rounded-full highlight-bg"></div><div className="w-3/4 h-[4px] bg-[#e0e0e0]"></div></div>
     </div>
     <div className="absolute w-[120px] h-[80px] border border-[#e0e0e0] bg-white flex flex-col p-3 shadow-sm group-hover:scale-105 transition-transform duration-500 z-20 ml-16 mt-12 group-hover:translate-x-2">
         <div className="w-full h-[12px] bg-[#f4f4f4] mb-3"></div>
         <div className="flex gap-2 mb-2 items-center"><div className="w-[6px] h-[6px] rounded-full bg-[#161616]"></div><div className="w-2/3 h-[4px] bg-[#e0e0e0]"></div></div>
     </div>
     <div className="absolute w-[40px] h-[2px] highlight-bg top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rotate-45 group-hover:rotate-[60deg] transition-transform duration-500 z-15"></div>
   </div>
);

const WorkflowVisual2 = () => (
   <div className="w-full h-[180px] bg-white border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
     <div className="absolute inset-0 grid-bg opacity-40"></div>
     <div className="relative w-[150px] h-[100px] border border-[#e0e0e0] bg-[#161616] flex flex-col shadow-sm group-hover:-translate-y-1 transition-transform duration-500 z-10">
         <div className="w-full h-[24px] border-b border-[#393939] flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#525252]"></div>
            <div className="w-2 h-2 rounded-full bg-[#525252]"></div>
            <div className="w-2 h-2 rounded-full bg-[#525252]"></div>
         </div>
         <div className="p-4 flex flex-col gap-3">
            <div className="w-3/4 h-[6px] bg-[#393939]"></div>
            <div className="w-1/2 h-[6px] border-l-2 highlight-border pl-2"><div className="w-full h-full highlight-bg opacity-50"></div></div>
            <div className="w-2/3 h-[6px] bg-[#393939]"></div>
         </div>
         <div className="absolute top-[15%] right-[-10px] px-3 py-1 highlight-bg text-white text-[10px] font-bold tracking-wider group-hover:-translate-y-2 transition-transform duration-500 delay-100 shadow-xl z-20">POST</div>
         <div className="absolute bottom-[15%] left-[-10px] px-3 py-1 bg-white border border-[#e0e0e0] text-[#161616] text-[10px] font-bold tracking-wider group-hover:translate-y-2 transition-transform duration-500 delay-100 shadow-xl z-20">GET</div>
     </div>
   </div>
);

const WorkflowVisual3 = () => (
   <div className="w-full h-[180px] bg-[#f8f9fa] border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
     <div className="absolute inset-0 grid-bg opacity-40"></div>
     <div className="relative w-[160px] h-[110px] border border-[#e0e0e0] bg-white flex flex-col shadow-sm group-hover:scale-105 transition-transform duration-500 z-10">
         <div className="w-full h-[20px] bg-[#f4f4f4] border-b border-[#e0e0e0] flex items-center px-3">
            <div className="w-1/2 h-[6px] bg-[#e0e0e0] rounded-full"></div>
         </div>
         <div className="p-4 flex gap-3">
            <div className="w-[36px] h-[36px] bg-[#f4f4f4] group-hover:bg-[#e0e0e0] transition-colors"></div>
            <div className="flex flex-col gap-2 flex-1 pt-1">
               <div className="w-3/4 h-[6px] bg-[#c6c6c6]"></div>
               <div className="w-1/2 h-[6px] bg-[#e0e0e0]"></div>
               <div className="w-[50%] h-[10px] highlight-bg mt-2 group-hover:w-[80%] transition-all duration-500"></div>
            </div>
         </div>
     </div>
   </div>
);

const WorkflowVisual4 = () => (
   <div className="w-full h-[180px] bg-white border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center transition-colors duration-300">
     <div className="absolute inset-0 grid-bg opacity-40"></div>
     
     <div className="relative w-[140px] h-[70px] border border-[#e0e0e0] bg-white rounded-full flex items-center justify-center shadow-sm z-10">
        <div className="flex gap-4 items-center">
           <div className="w-[24px] h-[24px] rounded-full bg-[#f4f4f4] border border-[#e0e0e0] group-hover:-translate-y-2 transition-transform duration-500"></div>
           <div className="w-[36px] h-[36px] rounded-full bg-[#e5eefd] border highlight-border group-hover:scale-110 transition-transform duration-500"></div>
           <div className="w-[24px] h-[24px] rounded-full bg-[#f4f4f4] border border-[#e0e0e0] group-hover:translate-y-2 transition-transform duration-500"></div>
        </div>
     </div>
     
     <div className="absolute left-[50%] top-[15%] -translate-x-1/2 flex flex-col items-center gap-1 group-hover:-translate-y-4 transition-transform duration-700">
        <div className="w-[2px] h-[8px] highlight-bg"></div>
        <div className="w-[2px] h-[8px] highlight-bg"></div>
        <div className="w-[2px] h-[8px] highlight-bg"></div>
     </div>
     
     <div className="absolute bottom-[10%] left-[50%] -translate-x-1/2 flex flex-col gap-1.5 items-center">
       <div className="w-[40px] h-[4px] bg-[#a8a8a8] group-hover:highlight-bg transition-colors duration-300"></div>
       <div className="w-[24px] h-[4px] bg-[#e0e0e0] group-hover:highlight-bg transition-colors duration-300 delay-75"></div>
       <div className="w-[12px] h-[4px] bg-[#e0e0e0] group-hover:highlight-bg transition-colors duration-300 delay-150"></div>
     </div>
   </div>
);

const steps = [
  {
    num: '01',
    subtext: '視覺化圖表建置',
    title: '定義資料結構',
    desc: '在視覺化介面中建立你的資料表與欄位關係，不需要寫 SQL、不需要設定資料庫。',
    visual: WorkflowVisual1
  },
  {
    num: '02',
    subtext: '無縫自動生成',
    title: '自動生成 API',
    desc: '儲存後系統自動產生完整的 CRUD API，包含驗證、權限、文件，開箱即用。',
    visual: WorkflowVisual2
  },
  {
    num: '03',
    subtext: '靈活前端整合',
    title: '串接前端',
    desc: '用生成的 API 文件直接對接前端，或使用 CGA 的設計服務一條龍完成。',
    visual: WorkflowVisual3
  },
  {
    num: '04',
    subtext: '無痛穩定發布',
    title: '一鍵部署上線',
    desc: 'Docker 容器化部署到 AWS，3.5 分鐘內你的產品就在線上運行。',
    visual: WorkflowVisual4
  }
];

export default function WorkflowSection() {
  return (
    <section className="py-[120px] bg-[#fdfdfd] w-full border-t border-[#e0e0e0] flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-[1584px] w-full px-4 md:px-8">
        
        {/* Header Section */}
        <div className="mb-[64px] max-w-[800px]">
          <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">運作流程</p>
          <h2 className="text-[42px] leading-[1.1] md:text-display-xl max-w-[800px] text-[#161616] mb-[24px]">從想法到上線，只需要四步</h2>
          <p className="text-[16px] md:text-body-lg text-[#525252] max-w-[600px] mb-6">
            準備好顛覆傳統的開發體驗了嗎？透過我們的低程式碼技術與自動化引擎，您可以即時建構與部署專案，大幅提升開發效率。
          </p>
          <p className="text-[16px] md:text-body-lg text-[#161616] font-medium leading-relaxed">
            沒有魔術，純粹是革命性的現代架構技術。
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Visual = step.visual;
            return (
            <div data-dither="card" key={index} className="bg-white carbon-border p-0 rounded-none w-full hover:shadow-xl transition-all duration-400 flex flex-col h-full cursor-pointer group relative overflow-hidden group-hover:-translate-y-1">
              <Visual />
              <div className="p-[24px] flex flex-col bg-white z-10 flex-grow relative">
                 <div className="absolute top-0 right-0 w-8 h-8 border-t-[3px] border-r-[3px] border-transparent group-hover:highlight-border transition-colors duration-300" />
                 <h3 className="text-card-title text-[#161616] mb-[12px] group-hover:highlight-text transition-colors duration-300 leading-tight">{step.title}</h3>
                 <div className="text-[12px] highlight-text font-bold tracking-wider mb-2 transition-colors duration-300">
                   STEP {step.num}. {step.subtext}
                 </div>
                 <p className="text-body-sm text-[#525252] mt-auto leading-relaxed">{step.desc}</p>
              </div>
            </div>
          )})}
        </div>
      </div>
    </section>
  );
}
