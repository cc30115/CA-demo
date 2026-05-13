import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react';
import { blogPosts, BlogPost } from '../data/blogPosts';

const FILTERS = ["全部", "產品更新", "使用案例", "教學指南", "活動"];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("全部");

  const filteredPosts = blogPosts.filter(post => 
    activeFilter === "全部" || post.tag === activeFilter
  );

  const pinnedPost = filteredPosts.find(post => post.pinned);
  const regularPosts = filteredPosts.filter(post => !post.pinned);
  
  const displayFeatured = pinnedPost || regularPosts[0];
  const displayRecent = pinnedPost ? regularPosts.slice(0, 4) : regularPosts.slice(1, 5);
  const displayPast = pinnedPost ? regularPosts.slice(4) : regularPosts.slice(5);

  return (
    <div className="w-full flex flex-col items-center bg-[#f8f9fa] min-h-screen">
        {/* New Hero Layout (Ref 2 + Ref 1 style) */}
        <div className="w-full flex justify-center py-[60px] lg:py-[100px] border-b border-[#e0e0e0] bg-white">
          <div className="max-w-[1584px] mx-auto w-full px-4 md:px-8">
            <div className="flex flex-col mb-12">
              <div className="flex items-center gap-2 text-[14px] text-[#525252] mb-[24px]">
                <span className="hover:text-[#0f62fe] cursor-pointer transition-colors">首頁</span>
                <span>/</span>
                <span className="text-[#161616]">部落格與新聞</span>
              </div>
              <h1 className="text-display-xl max-w-[800px] text-[#161616]">部落格與新聞</h1>
            </div>
            
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                
                {/* Featured Post (Left, span 7) */}
                {displayFeatured && (
                  <div data-dither="card" className="lg:col-span-7 group cursor-pointer flex flex-col bg-white hover:bg-[#f8f9fa] transition-colors duration-500 rounded-none border border-[#e0e0e0] hover:border-[#161616] pt-8 px-6 pb-6 lg:pt-12 lg:px-10 lg:pb-10 relative overflow-hidden">
                    
                    <div className="flex flex-col w-full h-full relative z-20">
                      {/* Image on Top */}
                      <div className="w-full aspect-video overflow-hidden mb-8 lg:mb-10 bg-white border border-[#e0e0e0]/50 relative">
                         <img src={displayFeatured.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      
                      {/* Text Below */}
                      <div className="flex flex-col flex-1">
                         <span className="inline-block border border-[#161616] rounded-[30px] px-4 py-[6px] text-[12px] font-medium tracking-wide mb-6 text-[#161616] group-hover:bg-[#161616] group-hover:text-white transition-colors w-fit">
                           {displayFeatured.tag}
                         </span>
                         <h2 className="text-[26px] sm:text-[32px] lg:text-[40px] xl:text-[44px] font-medium leading-[1.05] mb-6 text-[#161616] transition-colors tracking-tight">
                           {displayFeatured.title}
                         </h2>
                         <p className="text-[16px] md:text-[18px] text-[#525252] leading-relaxed mb-6 transition-colors line-clamp-3 md:line-clamp-2 max-w-[90%] lg:max-w-[80%]">
                           {displayFeatured.summary}
                         </p>
                         
                         <div className="mt-auto flex justify-between items-end pt-4">
                           <span className="text-[12px] text-[#8d8d8d] uppercase font-medium tracking-widest transition-colors mb-2">BY CODEGENAPPS</span>
                         </div>
                      </div>
                    </div>

                    <div className="absolute bottom-6 right-6 lg:bottom-10 lg:right-10 z-20">
                      <ArrowUpRight size={48} className="text-[#161616] opacity-0 group-hover:opacity-100 transition-opacity" weight="light" />
                    </div>
                  </div>
                )}

                {/* Recent Stories (Right, span 5) */}
                <div className="lg:col-span-5 flex flex-col">
                  <h3 className="text-[20px] font-medium text-[#161616] mb-6">近期文章</h3>
                  <div className="flex flex-col border-t border-[#e0e0e0]">
                    {displayRecent.map((post) => (
                       <div data-dither="card" key={post.id} className="group cursor-pointer flex py-6 border-b border-[#e0e0e0] hover:bg-[#f8f9fa] transition-colors -mx-4 px-4 sm:mx-0 sm:px-0 sm:hover:bg-transparent">
                          <div className="w-[120px] sm:w-[140px] xl:w-[160px] aspect-[4/3] bg-[#f4f4f4] overflow-hidden flex-shrink-0 border border-[#e0e0e0]/50">
                            <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="flex flex-col ml-4 flex-1 justify-center">
                            <span className="text-[11px] font-semibold tracking-widest uppercase mb-2 text-[#0f62fe]">{post.tag}</span>
                            <h4 className="text-[15px] sm:text-[16px] font-medium text-[#161616] leading-snug group-hover:text-[#0f62fe] transition-colors mb-2 line-clamp-3">{post.title}</h4>
                            <span className="text-[11px] text-[#8d8d8d] uppercase tracking-wider mt-auto line-clamp-1">BY CODEGENAPPS</span>
                          </div>
                       </div>
                    ))}
                  </div>
                </div>

              </div>
            ) : (
              <div className="py-20 text-center text-[#525252]">
                目前沒有相關分類的文章。
              </div>
            )}
          </div>
        </div>

        {/* Past Posts Section */}
        <div className="w-full flex justify-center py-[60px] lg:py-[100px] border-b border-[#e0e0e0] bg-[#f8f9fa] flex-1">
          <div className="max-w-[1584px] w-full px-4 md:px-8 flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[#e0e0e0] mb-[48px] gap-6 sm:gap-0">
               <h2 className="text-display-xl max-w-[800px] text-[#161616]">歷史文章</h2>
               <div className="flex flex-wrap items-center gap-2">
                 {FILTERS.map(filter => (
                   <button
                     key={filter}
                     onClick={() => setActiveFilter(filter)}
                     className={`py-[8px] sm:py-[12px] px-[12px] sm:px-[16px] text-[13px] sm:text-[14px] font-medium transition-colors border-b-2 -mb-[1px] ${
                       activeFilter === filter 
                         ? 'text-[#161616] border-[#161616]' 
                         : 'text-[#525252] border-transparent hover:text-[#161616]'
                     }`}
                   >
                     {filter}
                   </button>
                 ))}
               </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col"
              >
                {/* Grid Posts */}
                {displayPast.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 gap-y-10">
                    {displayPast.map((post) => (
                      <div data-dither="card" key={post.id} className="bg-white flex flex-col cursor-pointer group border border-[#e0e0e0] hover:border-[#0f62fe] transition-colors relative h-full">
                        <div className="w-full aspect-video overflow-hidden relative border-b border-[#e0e0e0] bg-[#f4f4f4]">
                          <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                        <div className="flex flex-col flex-1 p-6">
                          <div className="mb-3">
                             <span className="inline-flex items-center text-[11px] tracking-widest text-[#525252] font-semibold uppercase">
                               <span className="w-1.5 h-1.5 rounded-full bg-[#0f62fe] mr-2"></span>
                               {post.tag}
                             </span>
                          </div>
                          <h3 className="text-[20px] text-[#161616] mb-3 line-clamp-2 leading-snug font-medium group-hover:text-[#0f62fe] transition-colors">{post.title}</h3>
                          <p className="text-[14px] text-[#525252] line-clamp-2 mb-6 leading-relaxed flex-1">
                            {post.summary}
                          </p>
                          <div className="mt-auto pt-4 border-t border-[#e0e0e0] flex justify-between items-center text-[#525252] group-hover:text-[#0f62fe] transition-colors">
                            <span className="text-[12px] font-medium">{post.date}</span>
                            <ArrowRight size={16} weight="bold" className="group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center text-[#525252]">
                    此分類目前沒有更早之前的歷史文章。
                  </div>
                )}
                
                {/* Load More Button */}
                {displayPast.length > 0 && (
                  <div className="flex justify-center mt-16">
                    <button data-dither="btn" className="bg-transparent text-[#161616] text-[15px] font-medium py-[12px] px-[24px] rounded-none border border-[#161616] hover:bg-[#161616] hover:text-white transition-colors flex items-center justify-center">
                      載入更多歷史文章
                    </button>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
    </div>
  );
}
