import React from 'react';
import { motion } from 'motion/react';
import { Database, CloudArrowUp, Lightning } from '@phosphor-icons/react';

export default function HeroCards() {
  return (
    <>
      {/* Container to position them relative to the side background */}
      <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between py-[12%] px-4 lg:px-[8%] xl:px-[12%] overflow-hidden">
        
        {/* Card 1: API GENERATED */}
        <div className="w-full flex justify-start z-10 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="w-[200px] lg:w-[240px] xl:w-64 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-4 lg:p-5 xl:p-6 border border-[#e0e0e0]"
            style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased", transform: "translateZ(0)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[9px] lg:text-[10px] text-[#525252] font-semibold tracking-[0.2em] font-plex uppercase">API Generated</div>
              <Lightning size={16} weight="regular" className="text-[#0f62fe]" />
            </div>
            <div className="text-[24px] lg:text-[28px] xl:text-[32px] font-medium text-[#161616] mb-5 leading-none font-plex">1,240+</div>
            <div className="flex gap-1.5 w-full">
              <div className="h-1 flex-1 bg-[#0f62fe]"></div>
              <div className="h-1 flex-1 bg-[#0f62fe] opacity-50"></div>
              <div className="h-1 flex-1 bg-[#0f62fe] opacity-20"></div>
              <div className="h-1 flex-1 bg-[#e0e0e0]"></div>
            </div>
          </motion.div>
        </div>

        {/* Card 2: DEPLOYMENT SUCCESS */}
        <div className="w-full flex justify-end z-20 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
            className="w-[220px] lg:w-[260px] xl:w-72 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-4 lg:p-5 xl:p-6 border border-[#e0e0e0]"
            style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased", transform: "translateZ(0)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[9px] lg:text-[10px] text-[#525252] font-semibold tracking-[0.2em] font-plex uppercase">Deployment Success</div>
              <CloudArrowUp size={16} weight="regular" className="text-[#24a148]" />
            </div>
            <div className="text-[28px] lg:text-[32px] xl:text-[40px] font-medium text-[#161616] mb-5 leading-none font-plex">99.99%</div>
            <div className="h-1.5 w-full bg-[#f4f4f4]"><div className="h-full bg-[#24a148] w-[99.99%]"></div></div>
          </motion.div>
        </div>

        {/* Card 3: SCHEMA STATUS */}
        <div className="w-full flex justify-start pl-2 lg:pl-[10%] xl:pl-[15%] z-30 pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: 50, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
            className="w-[180px] lg:w-[220px] xl:w-60 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] p-4 lg:p-5 xl:p-6 border border-[#e0e0e0]"
            style={{ backfaceVisibility: "hidden", WebkitFontSmoothing: "antialiased", transform: "translateZ(0)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-[9px] lg:text-[10px] text-[#525252] font-semibold tracking-[0.2em] font-plex uppercase">Schema Status</div>
              <Database size={16} weight="regular" className="text-[#8a3ffc]" />
            </div>
            <div className="text-[20px] lg:text-[24px] xl:text-[28px] font-medium text-[#161616] mb-4 leading-none font-plex">SYNCED</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full border border-[#8a3ffc] p-[2px] flex items-center justify-center">
                <div className="w-full h-full bg-[#8a3ffc] rounded-full"></div>
              </div>
              <div className="text-[9px] lg:text-[10px] text-[#525252] font-plex tracking-wider uppercase">Active Replicas : 3</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
