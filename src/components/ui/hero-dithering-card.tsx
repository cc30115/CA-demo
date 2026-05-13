import { ArrowRight } from "lucide-react"
import { useState, Suspense, lazy } from "react"

const Dithering = lazy(() => 
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering }))
)

export function CTASection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="py-[96px] bg-white w-full flex justify-center items-center px-4 md:px-8">
      <div 
        className="w-full max-w-[1200px] relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden rounded-none border border-[#e0e0e0] bg-transparent py-[96px] px-4 md:px-[64px] flex flex-col items-center text-center duration-500 min-h-[400px] group">
          <Suspense fallback={<div className="absolute inset-0 bg-[#f4f4f4]/20" />}>
            <div className="absolute inset-0 z-0 pointer-events-none opacity-15 mix-blend-multiply">
              <Dithering
                colorBack="#ffffff00" // Transparent
                colorFront="#0f62fe"  // Brand Blue
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.6 : 0.2}
                className="w-full h-full"
                minPixelRatio={1}
              />
            </div>
          </Suspense>

          <div className="relative z-10 w-full max-w-[800px] mx-auto flex flex-col items-center">
            
            <h2 className="text-[32px] md:text-[42px] font-medium text-[#161616] mb-4 tracking-tight">
              立即開始 7 天免費試用
            </h2>
            
            <p className="text-[16px] text-[#525252] max-w-[500px] mb-10 leading-relaxed">
              親自體驗無與倫比的開發速度與靈活性，我們提供一週的時間讓您確認這是否符合您的團隊需求。
            </p>

            <div className="flex flex-col sm:flex-row w-full max-w-[560px] shadow-sm mb-6 border border-[#e0e0e0] group-hover:border-[#0f62fe] transition-colors focus-within:border-[#0f62fe]">
              <input data-dither="card" type="email" placeholder="您的工作電子郵件 (Your business email address)" className="flex-1 bg-white border-none outline-none px-6 py-4 text-[14px] text-[#161616] focus:ring-0" />
              <button data-dither="btn" className="bg-[#0f62fe] hover:bg-[#0353e9] text-white transition-colors duration-300 w-full sm:w-auto h-auto py-4 px-8 min-w-[140px] flex items-center justify-center gap-2 text-[16px] font-medium">
                開始試用
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
            
            <div className="flex items-center gap-3 text-[12px] text-[#525252]">
              <input type="checkbox" id="terms" className="accent-[#161616] w-4 h-4 cursor-pointer" />
              <label htmlFor="terms" className="cursor-pointer">註冊即表示您同意我們的 <a href="#" data-dither="btn" className="underline font-semibold text-[#161616] hover:text-[#0f62fe] transition-colors">服務條款 (Terms & Conditions)</a></label>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  )
}
