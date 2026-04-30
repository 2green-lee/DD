/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Globe, 
  Zap, 
  ShieldCheck, 
  Instagram, 
  Linkedin, 
  Twitter, 
  ArrowUpRight 
} from 'lucide-react';

// --- Translations ---
const translations = {
  en: {
    nav: {
      reel: "OUR REEL",
      home: "HOME",
    },
    hero: {
      title: "Export Studio",
      subtitle: "Based in Seoul • Serving Globally • Based in Seoul",
      projects: "OUR PROJECTS •",
      services: "VIEW SERVICES",
    },
    services: {
      label: "/SERVICES",
      title: "We help you",
      italic: "start your brand.",
      items: [
        { title: "Global Distribution", desc: "Seamless supply chain management across international borders and markets." },
        { title: "OEM/ODM Service", desc: "Strategic manufacturing from conceptual design to final product delivery." },
        { title: "Quality Assurance", desc: "Rigorous Korean-standard inspection ensuring premium excellence." }
      ]
    },
    portfolio: {
      label: "/PORTFOLIO",
      collection: "Our Portfolio • Collection 2026",
      items: [
        { label: "MARKETING", title: "Minimalist Linen Series" },
        { label: "DISTRIBUTION", title: "Global Outerwear Logistics" },
        { label: "BRANDING", title: "Seoul Street Collective" }
      ],
      viewProject: "VIEW PROJECT"
    },
    testimonial: {
      label: "/REVIEWS",
      quote: "Working with DD gave us the logistical power to reach EU markets and the Korean craftsmanship to sustain our luxury reputation.",
      role: "Creative Director, Walt Disney"
    },
    team: {
      label: "/OUR CORE",
      title: "Meet the Team",
      members: [
        { name: "S. Kang", role: "CEO" },
        { name: "M. Park", role: "Design Head" },
        { name: "J. Kim", role: "Operations" }
      ]
    },
    news: {
      label: "/RECENT UPDATES",
      items: [
        { date: "07.20.2024", title: "Expansion into Milan Logistics Hub" },
        { date: "06.12.2024", title: "Sustainable Fabric Sourcing Partnership" },
        { date: "05.28.2024", title: "New Q4 Manufacturing Trends Report" },
        { date: "04.15.2024", title: "Winner of Global Export Excellence" }
      ]
    },
    footer: {
      label: "/LET'S TALK",
      cta: "Ready to build",
      ctaItalic: "your vision?",
      button: "Schedule a Strategy Call",
      navLabel: "Nav",
      servicesLabel: "Services",
      addressLabel: "Address",
      rights: "© 2026 DD Studio. Produced in Seoul.",
      privacy: "Privacy",
      terms: "Terms"
    }
  },
  ko: {
    nav: {
      reel: "브랜드 필름",
      home: "홈",
    },
    hero: {
      title: "수출 스튜디오",
      subtitle: "서울 기반 • 글로벌 서비스 • 서울 기반",
      projects: "포트폴리오 •",
      services: "서비스 보기",
    },
    services: {
      label: "/서비스",
      title: "당신의 브랜드 시작을",
      italic: "우리가 함께합니다.",
      items: [
        { title: "글로벌 유통", desc: "국경과 시장을 넘나드는 완벽한 공급망 관리 서비스를 제공합니다." },
        { title: "OEM/ODM 서비스", desc: "디자인 기획부터 최종 제품 납품까지 전략적 제조를 지원합니다." },
        { title: "품질 보증", desc: "한국 표준의 엄격한 검수를 통해 최상의 퀄리티를 보장합니다." }
      ]
    },
    portfolio: {
      label: "/포트폴리오",
      collection: "포트폴리오 • 2026 컬렉션",
      items: [
        { label: "마케팅", title: "미니멀리스트 린넨 시리즈" },
        { label: "유통", title: "글로벌 아우터웨어 물류" },
        { label: "브랜딩", title: "서울 스트리트 콜렉티브" }
      ],
      viewProject: "프로젝트 보기"
    },
    testimonial: {
      label: "/고객 후기",
      quote: "DD와 협업하며 유럽 시장 진출을 위한 물류 기반과 럭셔리 품질을 유지할 수 있는 한국의 정교한 기술력을 모두 확보할 수 있었습니다.",
      role: "크리에이티브 디렉터, 월트 디즈니"
    },
    team: {
      label: "/핵심 가치",
      title: "팀 소개",
      members: [
        { name: "S. Kang", role: "대표이사" },
        { name: "M. Park", role: "디자인 총괄" },
        { name: "J. Kim", role: "운영 총괄" }
      ]
    },
    news: {
      label: "/최신 소식",
      items: [
        { date: "07.20.2024", title: "밀라노 물류 허브 확장 뉴스" },
        { date: "06.12.2024", title: "지속 가능한 원단 소싱 파트너십 체결" },
        { date: "05.28.2024", title: "신규 Q4 제조 트렌드 보고서 발표" },
        { date: "04.15.2024", title: "글로벌 수출 우수 기업상 수상" }
      ]
    },
    footer: {
      label: "/문의하기",
      cta: "당신의 비전을",
      ctaItalic: "구현할 준비가 되셨나요?",
      button: "전략 상담 예약하기",
      navLabel: "메뉴",
      servicesLabel: "서비스",
      addressLabel: "주소",
      rights: "© 2026 DD Studio. Produced in Seoul.",
      privacy: "개인정보처리방침",
      terms: "이용약관"
    }
  }
};

type Language = 'en' | 'ko';

// --- Navbar ---
const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const t = translations[lang].nav;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-8 bg-gradient-to-b from-brand-black/50 to-transparent">
      <button className="text-[10px] uppercase tracking-[0.3em] font-bold flex items-center gap-2 group">
        <span className="w-1.5 h-1.5 bg-brand-cream rounded-full animate-pulse" />
        {t.reel}
      </button>
      
      <a href="/" className="text-xl font-bold tracking-[0.2em] uppercase flex items-center gap-2">
        DD <span className="text-brand-gold opacity-60">: 大得</span>
      </a>

      <div className="flex items-center gap-6 md:gap-8">
        <div className="flex items-center gap-2 text-[10px] font-bold tracking-widest border border-white/10 rounded-full px-4 py-1.5 bg-brand-black/20 backdrop-blur-sm">
          <button 
            onClick={() => setLang('ko')} 
            className={`transition-colors ${lang === 'ko' ? 'text-brand-gold' : 'opacity-40 hover:opacity-100'}`}
          >
            KR
          </button>
          <span className="opacity-20">|</span>
          <button 
            onClick={() => setLang('en')} 
            className={`transition-colors ${lang === 'en' ? 'text-brand-gold' : 'opacity-40 hover:opacity-100'}`}
          >
            EN
          </button>
        </div>
        <a href="#" className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-brand-gold transition-colors hidden md:block">{t.home}</a>
        <button className="flex flex-col gap-1.5 group">
          <span className="w-6 h-0.5 bg-brand-cream group-hover:bg-brand-gold transition-all" />
          <span className="w-4 h-0.5 bg-brand-cream group-hover:w-6 group-hover:bg-brand-gold transition-all" />
        </button>
      </div>
    </nav>
  );
};

// --- Hero ---
const Hero = ({ lang }: { lang: Language }) => {
  const t = translations[lang].hero;
  
  // Create arrays to repeat the text for a seamless loop
  const marqueeTitleText = Array(4).fill(t.title);
  const marqueeSubtitleText = Array(4).fill(t.subtitle);

  return (
    <section className="relative min-h-[120vh] flex flex-col justify-center items-center px-6 overflow-hidden pt-32">
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-3 h-full w-full gap-4 opacity-40">
           <img src="https://images.unsplash.com/photo-1595191151601-ed92caf7330c?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="" />
           <img src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="" />
           <img src="https://images.unsplash.com/photo-1539109132335-62521b4010a3?auto=format&fit=crop&q=80&w=600" className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute inset-0 bg-brand-black/30" />
      </div>

      <div className="relative z-10 w-full overflow-hidden py-10 flex flex-col gap-0">
        {/* First Marquee: Right to Left (Title) */}
        <motion.div 
          key={lang + "-marquee-1"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex whitespace-nowrap"
        >
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
            className="flex pr-4"
          >
            {[...marqueeTitleText, ...marqueeTitleText].map((text, i) => (
              <h1 
                key={i}
                className="text-[8vw] md:text-[6.7vw] font-display font-normal italic leading-none uppercase tracking-tight px-[5vw]"
              >
                {text}
              </h1>
            ))}
          </motion.div>
        </motion.div>

        {/* Second Marquee: Left to Right (Subtitle - Outline) */}
        <motion.div 
          key={lang + "-marquee-2"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex whitespace-nowrap mt-8 md:mt-12"
        >
          <motion.div
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 80,
                ease: "linear",
              },
            }}
            className="flex pr-4"
          >
            {[...marqueeSubtitleText, ...marqueeSubtitleText].map((text, i) => (
              <h1 
                key={i}
                className="text-[8vw] md:text-[6.7vw] font-display font-normal italic leading-none uppercase tracking-tight px-[5vw] outline-text"
              >
                {text}
              </h1>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-24 w-full px-12 flex justify-between items-end">
        <div className="flex gap-8 text-[10px] font-bold tracking-[0.2em]">
          <a href="#" className="hover:text-brand-gold">{t.projects}</a>
          <a href="#" className="hover:text-brand-gold italic opacity-60">{t.services}</a>
        </div>
        <div className="w-px h-24 bg-brand-cream/20 relative">
          <motion.div 
            animate={{ top: ['0%', '100%'] }} 
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-brand-cream/0 to-brand-cream"
          />
        </div>
      </div>
    </section>
  );
};

// --- Services ---
const Services = ({ lang }: { lang: Language }) => {
  const t = translations[lang].services;
  const icons = [Globe, Zap, ShieldCheck];

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-near-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-24">
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-4 md:mb-0">{t.label}</p>
          <h2 className="text-4xl md:text-6xl font-medium max-w-2xl leading-tight">
            {t.title} <br />
            <span className="opacity-40 italic">{t.italic}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {t.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <div key={i} className="group p-10 border border-white/5 hover:border-white/20 transition-all duration-500 hover:bg-white/[0.02]">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-brand-cream group-hover:text-brand-black transition-all">
                  <Icon size={16} />
                </div>
                <h3 className="text-xl font-bold mb-4 uppercase tracking-wider">{item.title}</h3>
                <p className="text-brand-cream/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Portfolio ---
const PortfolioItem = ({ label, title, image, alignRight = false, cta }: any) => (
  <div className={`flex flex-col ${alignRight ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 mb-40 group`}>
    <div className="flex-1 overflow-hidden relative aspect-[4/3] md:aspect-auto h-[500px]">
      <motion.img 
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 1.2 }}
        src={image} 
        className="w-full h-full object-cover"
        alt={title}
      />
    </div>
    <div className={`md:w-1/3 flex flex-col justify-end pb-8 ${alignRight ? 'items-end text-right' : ''}`}>
      <span className="text-[10px] uppercase tracking-[0.4em] opacity-40 font-bold mb-6">/{label}</span>
      <h3 className="text-3xl font-bold mb-4 uppercase tracking-tighter w-2/3">{title}</h3>
      <a href="#" className="flex items-center gap-2 text-[10px] font-bold tracking-widest hover:text-brand-gold transition-all">
        {cta} <ArrowRight size={14} />
      </a>
    </div>
  </div>
);

const Portfolio = ({ lang }: { lang: Language }) => {
  const t = translations[lang].portfolio;
  const images = [
    "https://images.unsplash.com/photo-1595191151601-ed92caf7330c?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200",
    "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1200"
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-brand-black relative">
       <div className="absolute top-0 right-12 mt-12 hidden md:block">
         <span className="vertical-text text-[10px] tracking-[0.5em] opacity-20 font-bold uppercase">{t.collection}</span>
       </div>
       
       <div className="max-w-7xl mx-auto">
         {t.items.map((item, i) => (
           <PortfolioItem 
             key={i}
             label={item.label} 
             title={item.title} 
             image={images[i]} 
             alignRight={i % 2 !== 0}
             cta={t.viewProject}
           />
         ))}
       </div>
    </section>
  );
};

// --- Testimonial ---
const Testimonial = ({ lang }: { lang: Language }) => {
  const t = translations[lang].testimonial;

  return (
    <section className="py-40 bg-brand-near-black flex flex-col items-center px-6 text-center border-y border-white/5">
      <p className="text-[10px] tracking-[0.4em] opacity-40 font-bold uppercase mb-12">{t.label}</p>
      <div className="max-w-4xl">
        <h3 className="text-3xl md:text-5xl font-serif leading-tight italic decoration-brand-gold underline underline-offset-8">
          "{t.quote}"
        </h3>
        <div className="mt-12 flex flex-col items-center gap-4">
           <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" className="w-16 h-16 rounded-full object-cover border-2 border-brand-gold grayscale" alt="" />
           <div>
             <p className="font-bold tracking-widest text-sm uppercase">Kelsey Baine</p>
             <p className="text-[10px] opacity-40 uppercase tracking-widest mt-1">{t.role}</p>
           </div>
        </div>
      </div>
    </section>
  );
};

// --- Team ---
const Team = ({ lang }: { lang: Language }) => {
  const t = translations[lang].team;
  const images = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600"
  ];

  return (
    <section className="py-40 px-6 md:px-12 bg-brand-black overflow-hidden">
      <div className="text-center mb-32">
        <p className="text-[10px] opacity-40 tracking-[0.4em] font-bold mb-6">{t.label}</p>
        <h2 className="text-6xl font-bold uppercase tracking-tighter">{t.title}</h2>
      </div>

      <div className="flex flex-wrap md:flex-nowrap justify-center gap-12 max-w-7xl mx-auto">
        {t.members.map((m, i) => (
          <div key={i} className="flex-1 min-w-[280px] relative group">
            <div className="aspect-[4/5] rounded-t-full overflow-hidden border border-white/10 group-hover:border-brand-gold transition-all duration-700">
               <img src={images[i]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="" />
               <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center">
                 <div className="flex gap-4">
                   <Instagram size={18} className="hover:text-brand-gold cursor-pointer" />
                   <Linkedin size={18} className="hover:text-brand-gold cursor-pointer" />
                 </div>
               </div>
            </div>
            <div className="mt-8 text-center">
               <h4 className="text-xl font-bold uppercase tracking-widest">{m.name}</h4>
               <p className="text-[10px] opacity-40 uppercase tracking-[0.2em] mt-2 font-bold">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// --- News/List ---
const NewsList = ({ lang }: { lang: Language }) => {
  const t = translations[lang].news;

  return (
    <section className="py-40 px-6 md:px-12 bg-brand-near-black border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <p className="text-[10px] opacity-40 tracking-[0.4em] font-bold mb-16">{t.label}</p>
        <div className="space-y-0">
          {t.items.map((item, i) => (
            <div key={i} className="group border-b border-white/10 py-10 flex flex-col md:flex-row md:items-center justify-between hover:bg-white/[0.02] px-4 transition-all duration-500">
              <span className="text-xl md:text-2xl font-bold tracking-tighter opacity-40 mb-4 md:mb-0 group-hover:opacity-100 transition-all">{item.date}</span>
              <h4 className="text-2xl md:text-4xl font-medium tracking-tight group-hover:text-brand-gold transition-all">{item.title}</h4>
              <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-all hidden md:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Footer ---
const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;

  return (
    <footer className="pt-40 pb-20 px-6 md:px-12 bg-brand-black border-t border-white/5">
      <div className="max-w-7xl mx-auto text-center">
         <p className="text-[10px] opacity-40 tracking-[0.4em] font-bold mb-12">{t.label}</p>
         <h2 className="text-5xl md:text-8xl font-bold mb-16 uppercase tracking-tight">
           {t.cta} <br />
           <span className="italic font-normal opacity-60 decoration-brand-gold underline underline-offset-[16px]">{t.ctaItalic}</span>
         </h2>
         
         <button className="border border-white/20 px-12 py-5 rounded-full uppercase text-[10px] font-bold tracking-[0.3em] hover:bg-brand-cream hover:text-brand-black transition-all duration-500">
           {t.button}
         </button>

         <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-12 text-left border-t border-white/5 pt-20">
           <div className="col-span-2 md:col-span-1">
             <a href="/" className="text-xl font-bold uppercase tracking-widest block mb-8">DD : 大得</a>
             <div className="flex gap-6 opacity-40">
               <Instagram size={18} className="hover:text-brand-cream cursor-pointer" />
               <Linkedin size={18} className="hover:text-brand-cream cursor-pointer" />
               <Twitter size={18} className="hover:text-brand-cream cursor-pointer" />
             </div>
           </div>
           
           <div>
             <h5 className="text-[10px] opacity-20 font-bold uppercase tracking-widest mb-6 underline">{t.navLabel}</h5>
             <ul className="text-xs space-y-4 font-bold tracking-widest uppercase">
                <li><a href="#" className="hover:text-brand-gold transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Projects</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Contact</a></li>
             </ul>
           </div>
           <div>
             <h5 className="text-[10px] opacity-20 font-bold uppercase tracking-widest mb-6 underline">{t.servicesLabel}</h5>
             <ul className="text-xs space-y-4 font-bold tracking-widest uppercase">
                <li><a href="#" className="hover:text-brand-gold transition-colors">OEM</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">Logistics</a></li>
                <li><a href="#" className="hover:text-brand-gold transition-colors">QA</a></li>
             </ul>
           </div>
           <div className="hidden md:block">
             <h5 className="text-[10px] opacity-20 font-bold uppercase tracking-widest mb-6 underline">{t.addressLabel}</h5>
             <p className="text-xs font-bold leading-relaxed opacity-60">
               Jungang-daero 286, <br />
               Busan, South Korea <br />
               48730
             </p>
           </div>
         </div>
         
         <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-6 opacity-20 text-[10px] font-bold tracking-[0.2em] uppercase">
            <p>{t.rights}</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-brand-cream">{t.privacy}</a>
              <a href="#" className="hover:text-brand-cream">{t.terms}</a>
            </div>
         </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [lang, setLang] = useState<Language>('en');

  return (
    <div className="font-sans bg-brand-black text-brand-cream selection:bg-brand-gold selection:text-brand-black">
      <Navbar lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <Services lang={lang} />
      <Portfolio lang={lang} />
      <Testimonial lang={lang} />
      <Team lang={lang} />
      <NewsList lang={lang} />
      <Footer lang={lang} />
    </div>
  );
}
