import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CaretDown, ArrowRight } from '@phosphor-icons/react';

const faqs = [
  {
    question: "CGA 跟 Firebase / Supabase 有什麼不同？",
    answer: "CGA 不只是資料庫即服務，而是從資料結構到 API 到部署的完整自動化平台。你不需要自己寫 API 邏輯、不需要管理伺服器，結構定義完就能上線。"
  },
  {
    question: "我沒有工程背景，真的能用嗎？",
    answer: "可以。CGA 的設計目標就是讓非工程師也能建立完整的後端系統。如果你需要前端，也可以搭配我們的設計服務。"
  },
  {
    question: "資料安全嗎？",
    answer: "每個用戶的環境獨立隔離，部署在 AWS 之上，支援屬性級權限控管，符合企業級安全需求。"
  },
  {
    question: "可以自訂 API 邏輯嗎？還是只能用自動生成的？",
    answer: "兩者都可以。自動生成的 CRUD API 開箱即用，你也可以透過 No Code 構建器或低程式碼方式自訂端點。"
  },
  {
    question: "如果之後想搬走，資料會被綁死嗎？",
    answer: "不會。CGA 生成的是標準的分層架構程式碼，你可以隨時匯出，不存在 vendor lock-in。"
  },
  {
    question: "支援多人協作嗎？",
    answer: "支援。團隊成員可以共享專案，並透過權限設定控制不同角色的存取範圍。"
  }
];

export default function FAQSection({ onContactClick }: { onContactClick?: () => void }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-[96px] bg-[#f8f9fa] w-full border-t border-[#e0e0e0] flex justify-center">
      <div className="max-w-[1584px] w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-[48px] lg:gap-[64px]">
        {/* Left Column Text */}
        <div className="lg:col-span-4 flex flex-col">
          <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">FAQ</p>
          <h2 className="text-display-xl mb-[24px] text-[#161616]">還有疑問？</h2>
          <p className="text-body-lg text-[#525252] mb-[32px]">
            找不到答案的話，隨時聯絡我們。
          </p>
          
          <div className="flex">
            <button data-dither="btn" onClick={(e) => { e.preventDefault(); onContactClick?.(); }} className="inline-flex items-center gap-[8px] text-body-lg font-bold text-[#0f62fe] hover:text-[#0043ce] transition-colors group">
              聯絡我們 <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column Accordion */}
        <div className="lg:col-span-8 flex flex-col border-t border-[#e0e0e0]">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div data-dither="card" key={index} className="border-b border-[#e0e0e0]">
                <button
                  type="button"
                  className="w-full py-[24px] flex items-center justify-between text-left group gap-4"
                  onClick={() => toggleFAQ(index)}
                >
                  <h3 className="text-subhead text-[#161616] group-hover:text-[#0f62fe] transition-colors pr-8">
                    {faq.question}
                  </h3>
                  <div className={`flex-shrink-0 text-[#161616] group-hover:text-[#0f62fe] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <CaretDown size={24} weight="regular" />
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-[24px] text-body-lg text-[#525252] max-w-[800px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
