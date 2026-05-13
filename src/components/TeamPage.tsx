import React from 'react';
import { motion } from 'motion/react';
import { 
  LinkedinLogo, 
  GithubLogo, 
  EnvelopeSimple, 
  ArrowRight
} from '@phosphor-icons/react';
import { teamMembers } from '../data/teamMembers';
import Dither from './Dither';

const PrimaryButton = ({ children, className = "", onClick }: any) => (
  <button onClick={onClick} className={`bg-[#0f62fe] text-white text-[14px] font-normal py-[12px] px-[16px] rounded-none border border-transparent hover:bg-[#0353e9] transition-colors flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

// --- Value Visual Components ---
const VisualEfficiency = () => (
  <div className="w-full h-[200px] border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center p-6 transition-colors duration-300">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
    <div className="relative w-[140px] h-[140px] flex items-center justify-center z-10">
      <div className="absolute inset-0 border-[2px] border-[#e0e0e0] rounded-full group-hover:border-[#161616] transition-colors duration-500"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#f4f4f4] rounded-full group-hover:scale-110 transition-transform duration-500 flex items-center justify-center overflow-hidden">
         <div className="w-full h-[2px] bg-[#161616] absolute top-1/2 -translate-y-1/2 group-hover:rotate-180 transition-transform duration-1000 ease-in-out origin-center"></div>
         <div className="w-[2px] h-full bg-[#161616] absolute left-1/2 -translate-x-1/2 group-hover:rotate-180 transition-transform duration-1000 ease-in-out origin-center delay-75"></div>
      </div>
      <div className="absolute bg-[#0f62fe] w-8 h-8 flex items-center justify-center shadow-md group-hover:rotate-45 transition-transform duration-500">
          <div className="w-2 h-2 bg-white"></div>
      </div>
    </div>
  </div>
);

const VisualTransp = () => (
  <div className="w-full h-[200px] border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center p-6 transition-colors duration-300">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
    <div className="relative w-[160px] h-[100px] flex items-center justify-center z-10">
      {/* Back Layer */}
      <div className="absolute left-[30%] top-[40%] w-[100px] h-[70px] bg-[#f4f4f4] border border-[#a8a8a8] flex flex-col gap-1 p-2 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-transform duration-700">
        <div className="w-[60%] h-[2px] bg-[#c6c6c6]"></div>
        <div className="w-[80%] h-[2px] bg-[#c6c6c6]"></div>
        <div className="w-[40%] h-[2px] bg-[#c6c6c6]"></div>
      </div>
      {/* Front Layer */}
      <div className="absolute left-[20%] top-[20%] w-[100px] h-[70px] bg-white border border-[#161616] shadow-sm flex flex-col gap-1.5 p-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-700">
        <div className="w-[30%] h-[3px] bg-[#0f62fe]"></div>
        <div className="w-[70%] h-[2px] bg-[#161616] mt-2"></div>
         <div className="w-[50%] h-[2px] bg-[#161616]"></div>
      </div>
    </div>
  </div>
);

const VisualDesign = () => (
  <div className="w-full h-[200px] border-b border-[#e0e0e0] relative overflow-hidden flex items-center justify-center p-6 transition-colors duration-300">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
    <div className="relative w-[140px] h-[120px] flex items-center justify-center z-10">
       <div className="absolute top-0 left-1/4 w-[60px] h-[60px] bg-[#161616] rounded-full group-hover:translate-x-4 group-hover:scale-110 transition-all duration-700 opacity-90 mix-blend-multiply"></div>
       <div className="absolute bottom-0 right-1/4 w-[60px] h-[60px] border-[2px] border-[#0f62fe] rounded-full group-hover:-translate-x-4 group-hover:scale-110 transition-all duration-700 opacity-90 mix-blend-multiply"></div>
       <div className="absolute top-1/4 right-1/4 w-[20px] h-[20px] bg-[#0f62fe] group-hover:-translate-y-4 transition-transform duration-700"></div>
    </div>
  </div>
);

const VisualEvo = () => (
  <div className="w-full h-[200px] border-b border-[#e0e0e0] relative overflow-hidden flex items-end justify-center pb-8 p-6 transition-colors duration-300">
    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#e0e0e0 1px, transparent 1px), linear-gradient(90deg, #e0e0e0 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
    <div className="relative w-[140px] h-[100px] flex items-end gap-2 z-10 overflow-hidden">
       <div className="w-8 bg-[#e0e0e0] h-[30%] group-hover:h-[40%] transition-all duration-500 ease-out origin-bottom"></div>
       <div className="w-8 bg-[#a8a8a8] h-[50%] group-hover:h-[65%] transition-all duration-700 ease-out origin-bottom"></div>
       <div className="w-8 bg-[#161616] h-[70%] group-hover:h-[85%] transition-all duration-1000 ease-out origin-bottom relative overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-0 bg-[#0f62fe] group-hover:h-full transition-all duration-1000 delay-100"></div>
       </div>
    </div>
  </div>
);

const VALUES_DATA = [
  {
    visual: VisualEfficiency,
    title: "效率優先",
    description: "能自動化的事不該手動做，能省下的時間該花在更有價值的地方。"
  },
  {
    visual: VisualTransp,
    title: "透明可控",
    description: "生成的程式碼你看得懂、帶得走，不綁定、不黑箱。"
  },
  {
    visual: VisualDesign,
    title: "設計即溝通",
    description: "好的產品不只是功能齊全，而是讓使用者不需要說明書。"
  },
  {
    visual: VisualEvo,
    title: "持續進化",
    description: "每一次客戶與社群的回饋，都是下一版本更完美的起點。"
  }
];

export default function TeamPage({ onContactClick }: { onContactClick?: () => void }) {
  return (
    <div className="w-full flex justify-center bg-white min-h-screen">
      <div className="w-full flex flex-col items-center">
        
        {/* Combined Hero Section */}
        <section className="w-full flex justify-center bg-[#f8f9fa] border-b border-[#e0e0e0] min-h-screen items-center relative overflow-hidden py-[24px] md:py-[50px] px-[24px] md:px-[50px]">
           {/* Background dots full screen */}
           <div className="absolute inset-0 opacity-[0.25]" style={{ backgroundImage: 'radial-gradient(#0f62fe 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>

           <div className="w-full h-full max-w-[1600px] bg-white border border-[#e0e0e0] shadow-sm z-10 relative flex flex-col justify-center p-8 md:p-12 lg:p-[80px] xl:p-[100px] gap-12 sm:gap-[64px] min-h-[calc(100vh-48px)] md:min-h-[calc(100vh-100px)]">
             
             <div className="w-full flex flex-col">
                 <div className="flex items-center gap-2 text-[14px] text-[#525252] mb-[24px]">
                   <span className="hover:text-[#0f62fe] cursor-pointer transition-colors">首頁</span>
                   <span>/</span>
                   <span className="text-[#161616]">關於團隊</span>
                 </div>
                 
                 <h1 className="text-[20px] md:text-[24px] text-[#525252] mb-6 md:mb-10 font-medium">打造這一切的人</h1>

                 <h2 className="text-[32px] sm:text-[42px] md:text-[56px] lg:text-[72px] xl:text-[80px] leading-[1.1] md:leading-[1.05] font-light text-[#161616] tracking-tight max-w-[1100px]">
                   Extracting complexity into <span className="text-[#0f62fe] font-medium">modular logic</span>.<br className="hidden md:block"/> Empowering the next generation to build <span className="text-[#0f62fe] font-medium">anything</span> without lock-in.
                 </h2>
             </div>
             
             <div className="flex flex-col md:flex-row md:items-end w-full gap-8 md:gap-12 justify-between mt-auto md:mt-16">
                 {/* Small decorative logo/icon */}
                 <div className="w-[40px] md:w-[48px] h-[40px] md:h-[48px] grid grid-cols-2 gap-1.5 md:gap-2 opacity-90 hidden sm:grid flex-shrink-0">
                    <div className="bg-[#161616] rounded-full"></div>
                    <div className="bg-[#161616] rounded-full"></div>
                    <div className="bg-[#161616] rounded-full"></div>
                    <div className="bg-[#0f62fe] rounded-full"></div>
                 </div>

                 <div className="flex flex-col max-w-[560px]">
                     <p className="text-[14px] md:text-[15px] text-[#525252] tracking-wider leading-relaxed text-left md:text-justify mb-6">
                       歷經十年於各產業進行後端開發與優化，我們察覺跨系統間唯一的實質差異，僅是商業邏輯不同。因此，我們決心消滅重複造輪子的困境，將厚重的程式邏輯抽離成靈活的積木模組。讓開發者能以拼圖之姿快速搭建 MVP，並保有無窮擴展空間與完全的技術自主權，拒絕黑箱與被綁定。
                     </p>
                     <div className="flex flex-wrap items-center gap-2">
                       <div className="w-2 h-2 bg-[#0f62fe] flex-shrink-0"></div>
                       <p className="text-[12px] text-[#161616] font-bold tracking-[0.2em] uppercase">
                         Code <span className="text-[#a8a8a8] font-normal mx-1">(代碼)</span> 
                         Gen <span className="text-[#a8a8a8] font-normal mx-1">(新世代)</span>
                         Apps <span className="text-[#a8a8a8] font-normal mx-1">(適用任意產業)</span>
                       </p>
                     </div>
                 </div>
             </div>

           </div>
        </section>

        {/* Core Members Section */}
        <section className="w-full max-w-[1584px] mx-auto px-4 md:px-8 py-[96px]">
          <div className="mb-[48px] max-w-[800px]">
            <h2 className="text-display-xl mb-[24px] text-[#161616]">核心團隊</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
            {teamMembers.map((member, index) => (
              <motion.div 
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col group"
              >
                <div className="w-full aspect-[4/5] overflow-hidden bg-[#e0e0e0] mb-6 rounded-none border border-[#e0e0e0]">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-105"
                  />
                </div>
                
                <div className="flex gap-4 items-start">
                  <div className="w-3.5 h-3.5 bg-[#0f62fe] mt-1 shrink-0"></div>
                  <div className="flex flex-col">
                    <h3 className="text-[18px] font-bold text-[#161616] mb-0.5">{member.name}</h3>
                    <span className="text-[15px] text-[#8d8d8d] font-normal">{member.title}</span>
                  </div>
                </div>
                
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Values Section */}
        <section className="w-full bg-[#f4f4f4] border-t border-[#e0e0e0] overflow-hidden">
          <div className="max-w-[1584px] mx-auto px-4 md:px-8 py-[96px] md:py-[120px]">
            <div className="mb-[64px] max-w-[800px]">
              <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">我們的價值觀</p>
              <h2 className="text-display-xl mb-[24px] text-[#161616]">核心理念</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-[#e0e0e0]">
              {VALUES_DATA.map((val, index) => {
                const Visual = val.visual;
                return (
                 <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col bg-white border-r border-[#e0e0e0] border-b hover:bg-[#f8f9fa] transition-colors h-full group pb-6"
                  >
                    <Visual />
                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-[20px] font-semibold text-[#161616] mb-4 group-hover:text-[#0f62fe] transition-colors">{val.title}</h3>
                      <p className="text-[14px] text-[#525252] leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Open Roles Section */}
        <section className="w-full bg-[#f8f9fa] border-t border-[#e0e0e0]">
          <div className="max-w-[1584px] mx-auto px-4 md:px-8 py-[96px] md:py-[120px]">
            <div className="flex flex-col lg:flex-row justify-between mb-16 gap-8">
              <div className="flex flex-col max-w-[800px]">
                <h2 className="text-display-xl mb-[24px] text-[#161616]">Open Roles / 職缺</h2>
                <p className="text-body-lg text-[#525252] max-w-[600px] leading-relaxed">
                  我們持續在找厲害的人。如果你對 No-code 後端、開發工具或產品設計有熱情，就算目前沒有列出適合的職缺，也歡迎隨時跟我們聊聊。
                </p>
              </div>
              <div className="flex items-start">
                <PrimaryButton onClick={onContactClick} className="w-full sm:w-auto h-auto py-4 px-8 min-w-[160px] text-[16px]">
                  主動應徵 <ArrowRight size={16} />
                </PrimaryButton>
              </div>
            </div>

            <div className="flex flex-col border-t border-[#e0e0e0]">
              {[
                { title: "Senior Front-End Engineer", type: "Full-time", location: "Taipei / Remote", desc: "React, TypeScript, UI/UX" },
                { title: "Product Designer", type: "Full-time", location: "Taipei / Remote", desc: "Figma, Design Systems, UX Research" },
                { title: "Backend Engineer (Go/Node.js)", type: "Full-time", location: "Taipei", desc: "System Architecture, Automation" }
              ].map((role, idx) => (
                <div key={idx} className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-[#e0e0e0] hover:bg-white transition-colors cursor-pointer px-4 -mx-4 md:mx-0 md:px-6">
                  <div className="flex flex-col mb-4 md:mb-0">
                    <h3 className="text-[20px] md:text-[24px] font-medium text-[#161616] mb-2 group-hover:text-[#0f62fe] transition-colors">{role.title}</h3>
                    <div className="flex items-center gap-4 text-[#525252] text-[14px]">
                      <span>{role.type}</span>
                      <span className="w-1 h-1 bg-[#d1d1d1] rounded-full"></span>
                      <span>{role.location}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between md:justify-end gap-6">
                    <span className="text-[15px] text-[#525252] hidden md:block">{role.desc}</span>
                    <div className="w-10 h-10 border border-[#e0e0e0] rounded-full flex items-center justify-center text-[#161616] group-hover:bg-[#0f62fe] group-hover:text-white group-hover:border-[#0f62fe] transition-all shrink-0">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
