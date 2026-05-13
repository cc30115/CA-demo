import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CaretDown, CheckCircle } from '@phosphor-icons/react';
import Dither from './Dither';
import FAQSection from './FAQSection';

const PrimaryButton = ({ children, className = "", onClick, type = "button", disabled = false }: any) => (
  <button type={type} disabled={disabled} onClick={onClick} className={`bg-[#0f62fe] text-white text-button py-[12px] px-[16px] rounded-none border border-transparent hover:bg-[#0353e9] transition-colors flex items-center justify-center gap-2 ${className}`}>
    {children}
  </button>
);

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    teamSize: '',
    requestType: '產品諮詢',
    startTime: '',
    howDidYouHear: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Form Data Submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Optionally reset form after some time
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          company: '',
          teamSize: '',
          requestType: '產品諮詢',
          startTime: '',
          howDidYouHear: '',
          message: ''
        });
      }, 5000);
    }, 1500);
  };

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen">
      {/* Header HERO Section */}
      <div className="w-full bg-[#f4f4f4] py-[80px] lg:py-[120px] mb-[64px] border-b border-[#e0e0e0]">
        <div className="max-w-[1584px] mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-[14px] text-[#525252] mb-[32px]">
              <span className="hover:text-[#0f62fe] cursor-pointer transition-colors">首頁</span>
              <span>/</span>
              <span className="text-[#161616]">聯絡我們</span>
            </div>
            
            <h1 className="text-display-xl text-[#161616] mb-[32px]">與我們聯繫</h1>
            <p className="text-body-lg text-[#525252] max-w-[600px]">
              無論是產品諮詢、技術合作或設計服務需求，我們都樂意聽你說。
            </p>
          </div>

          {/* Right Abstract Graphic */}
          <div className="hidden lg:block relative h-full min-h-[360px] w-full ml-auto overflow-hidden">
             <Dither 
                 waveColor={[22/255, 22/255, 22/255]}
                 waveSpeed={0.06}
                 waveFrequency={4}
                 waveAmplitude={0.15}
                 colorNum={3}
             />
          </div>
        </div>
      </div>

      {/* Main Content - Form and Contact Info */}
      <div className="max-w-[1584px] mx-auto w-full px-4 md:px-8 mb-[96px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[48px] lg:gap-[64px]">
          
          {/* Left Column - Contact Form */}
          <div className="lg:col-span-7">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#e5eefd] p-8 border-l-4 border-[#0f62fe] flex flex-col items-start h-full justify-center min-h-[400px]"
              >
                <CheckCircle size={48} weight="fill" className="text-[#0f62fe] mb-4" />
                <h3 className="text-[24px] font-semibold text-[#161616] mb-2">我們已收到您的訊息！</h3>
                <p className="text-[16px] text-[#525252]">感謝您的聯繫，我們的專業團隊會盡快與您接洽。</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[14px] font-medium text-[#161616]">姓名 <span className="text-[#da1e28]">*</span></label>
                    <input 
                      data-dither="card"
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border border-[#e0e0e0] focus:border-[#0f62fe] focus:outline-none px-4 py-3 bg-[#f4f4f4] focus:bg-white transition-colors text-[16px]"
                      placeholder="您的姓名"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[14px] font-medium text-[#161616]">Email <span className="text-[#da1e28]">*</span></label>
                    <input 
                      data-dither="card"
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border border-[#e0e0e0] focus:border-[#0f62fe] focus:outline-none px-4 py-3 bg-[#f4f4f4] focus:bg-white transition-colors text-[16px]"
                      placeholder="您的電子信箱"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="company" className="text-[14px] font-medium text-[#161616]">公司名稱 (選填)</label>
                    <input 
                      data-dither="card"
                      type="text" 
                      id="company" 
                      name="company" 
                      value={formData.company}
                      onChange={handleChange}
                      className="border border-[#e0e0e0] focus:border-[#0f62fe] focus:outline-none px-4 py-3 bg-[#f4f4f4] focus:bg-white transition-colors text-[16px]"
                      placeholder="您的公司或組織名稱"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="teamSize" className="text-[14px] font-medium text-[#161616]">團隊規模 (選填)</label>
                    <div className="relative">
                      <select 
                        data-dither="card"
                        id="teamSize" 
                        name="teamSize" 
                        value={formData.teamSize}
                        onChange={handleChange}
                        className="w-full border border-[#e0e0e0] focus:border-[#0f62fe] focus:outline-none px-4 py-3 bg-[#f4f4f4] focus:bg-white transition-colors text-[16px] appearance-none"
                      >
                        <option value="">請選擇</option>
                        <option value="1-10 人">1-10 人</option>
                        <option value="11-50 人">11-50 人</option>
                        <option value="51-200 人">51-200 人</option>
                        <option value="200 人以上">200 人以上</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#525252]">
                        <CaretDown size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label htmlFor="requestType" className="text-[14px] font-medium text-[#161616]">需求類型 <span className="text-[#da1e28]">*</span></label>
                    <div className="relative">
                      <select 
                        data-dither="card"
                        id="requestType" 
                        name="requestType" 
                        value={formData.requestType}
                        onChange={handleChange}
                        className="w-full border border-[#e0e0e0] focus:border-[#0f62fe] focus:outline-none px-4 py-3 bg-[#f4f4f4] focus:bg-white transition-colors text-[16px] appearance-none"
                      >
                        <option value="產品諮詢">產品諮詢</option>
                        <option value="技術合作">技術合作</option>
                        <option value="設計服務">設計服務</option>
                        <option value="企業方案">企業方案</option>
                        <option value="其他">其他</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#525252]">
                        <CaretDown size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="startTime" className="text-[14px] font-medium text-[#161616]">預計啟動時間 (選填)</label>
                    <div className="relative">
                      <select 
                        data-dither="card"
                        id="startTime" 
                        name="startTime" 
                        value={formData.startTime}
                        onChange={handleChange}
                        className="w-full border border-[#e0e0e0] focus:border-[#0f62fe] focus:outline-none px-4 py-3 bg-[#f4f4f4] focus:bg-white transition-colors text-[16px] appearance-none"
                      >
                        <option value="">請選擇</option>
                        <option value="1 個月內">1 個月內</option>
                        <option value="1-3 個月">1-3 個月</option>
                        <option value="3 個月以上">3 個月以上</option>
                        <option value="尚未確定">尚未確定</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#525252]">
                        <CaretDown size={16} />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="howDidYouHear" className="text-[14px] font-medium text-[#161616]">如何得知我們 (選填)</label>
                    <div className="relative">
                      <select 
                        data-dither="card"
                        id="howDidYouHear" 
                        name="howDidYouHear" 
                        value={formData.howDidYouHear}
                        onChange={handleChange}
                        className="w-full border border-[#e0e0e0] focus:border-[#0f62fe] focus:outline-none px-4 py-3 bg-[#f4f4f4] focus:bg-white transition-colors text-[16px] appearance-none"
                      >
                        <option value="">請選擇</option>
                        <option value="Google 搜尋">Google 搜尋</option>
                        <option value="社群媒體 (FB/LinkedIn/IG)">社群媒體 (FB/LinkedIn/IG)</option>
                        <option value="朋友或同事推薦">朋友或同事推薦</option>
                        <option value="線上社群/論壇">線上社群/論壇</option>
                        <option value="其他">其他</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#525252]">
                        <CaretDown size={16} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[14px] font-medium text-[#161616]">訊息內容 <span className="text-[#da1e28]">*</span></label>
                  <textarea 
                    data-dither="card"
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border border-[#e0e0e0] focus:border-[#0f62fe] focus:outline-none px-4 py-3 bg-[#f4f4f4] focus:bg-white transition-colors text-[16px] resize-y"
                    placeholder="請告訴我們您的專案或需求細節"
                  />
                </div>

                <div className="mt-4 flex">
                  <PrimaryButton className="w-full sm:w-auto h-[48px] px-8" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? '送出中...' : '送出訊息'} <ArrowRight size={16} />
                  </PrimaryButton>
                </div>
              </form>
            )}
          </div>

          {/* Right Column - Contact Info */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="bg-[#161616] p-8 md:p-12 text-white h-full flex flex-col">
              <h3 className="text-[24px] font-medium mb-8">聯絡資訊</h3>
              
              <div className="flex flex-col gap-8 flex-1">
                <div className="flex flex-col gap-2">
                  <span className="text-[#a8a8a8] text-[14px] uppercase tracking-wider font-semibold">公司名稱</span>
                  <span className="text-[18px]">鉑利華資訊有限公司</span>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-[#a8a8a8] text-[14px] uppercase tracking-wider font-semibold">Email</span>
                  <a href="mailto:service@codegenapps.com" data-dither="btn" className="text-[18px] text-white hover:text-[#0f62fe] transition-colors inline-block w-fit">
                    service@codegenapps.com
                  </a>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-[#a8a8a8] text-[14px] uppercase tracking-wider font-semibold">地址</span>
                  <span className="text-[18px] leading-relaxed">台中市北區<br/>德化街 573 號 1F</span>
                </div>
                
                <div className="flex flex-col gap-2 mt-auto pt-8 border-t border-[#393939]">
                  <span className="text-[#a8a8a8] text-[14px] uppercase tracking-wider font-semibold">營業時間</span>
                  <span className="text-[18px]">週一至週五 09:00 – 18:00</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Map Embed Area */}
      <div className="w-full h-[400px] md:h-[500px] bg-[#f4f4f4] relative">
         <iframe 
           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3640.2319202518456!2d120.6723048!3d24.1636127!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34693d623b036575%3A0xe7f525fd801f9bb9!2zNDA05Y-w5Lit5biC5YyX5Y2A5b635YyW6KGXNTcz6JmfMUY!5e0!3m2!1szh-TW!2stw!4v1715409549887!5m2!1szh-TW!2stw" 
           width="100%" 
           height="100%" 
           style={{ border: 0 }} 
           allowFullScreen={true} 
           loading="lazy" 
           referrerPolicy="no-referrer-when-downgrade"
           className="absolute inset-0 grayscale contrast-125 opacity-80"
           title="Office Location Map"
         ></iframe>
         {/* Map overlay to adjust color grading to fit the site */}
         <div className="absolute inset-0 bg-[#0f62fe]/10 pointer-events-none mix-blend-color"></div>
      </div>

      {/* Quick FAQs */}
      <FAQSection />
    </div>
  );
}
