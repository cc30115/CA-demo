import React from 'react';

const integrations = [
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
  { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'GitLab', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg' },
  { name: 'Cloudflare', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cloudflare/cloudflare-original.svg' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg' },
  { name: 'Stripe', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/stripe/stripe-original.svg' },
  { name: 'Slack', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/slack/slack-original.svg' },
];

export default function IntegrationsSection() {
  return (
    <section className="py-[120px] bg-white w-full border-t border-[#e0e0e0] flex flex-col justify-center items-center overflow-hidden">
      <div className="max-w-[1584px] w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Left Column */}
        <div className="lg:col-span-4 flex flex-col pt-4 lg:pt-12">
          <p className="text-[14px] text-[#525252] mb-[16px] tracking-wide font-normal uppercase">生態系整合</p>
          <h2 className="text-[42px] leading-[1.1] md:text-display-xl text-[#161616] mb-8">
            與你熟悉的<br className="hidden lg:block"/>工具無縫整合
          </h2>
          <p className="text-[16px] text-[#525252] leading-relaxed mb-6">
            不需要拋棄現有的工作流程，CGA 直接融入你的各種技術棧。
          </p>
        </div>

        {/* Right Column Grid */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[1px] bg-[#e0e0e0] border border-[#e0e0e0]">
            {integrations.map((item, index) => (
               <div data-dither="card" key={index} className="bg-white h-[160px] md:h-[180px] p-5 flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300">
                 {/* Hover Background Effect */}
                 <div className="absolute inset-0 bg-[#0f62fe] scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-in-out z-0"></div>
                 
                 <div className="relative z-10 flex-grow flex items-center justify-center">
                    <img src={item.icon} alt={item.name} className={`${['AWS', 'Vercel', 'Next.js', 'Stripe'].includes(item.name) ? 'w-[64px]' : 'w-[48px] h-[48px]'} opacity-60 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-0 group-hover:invert`} />
                 </div>
                 
                 <div className="relative z-10 w-full pt-4 border-t border-[#f4f4f4] group-hover:border-white/20 transition-colors">
                   <span className="text-[12px] font-semibold tracking-widest uppercase text-[#525252] group-hover:text-white transition-colors">{item.name}</span>
                 </div>
               </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
