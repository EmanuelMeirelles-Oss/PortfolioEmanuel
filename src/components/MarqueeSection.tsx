import React, { useState, useEffect, useRef } from 'react';
import yamileImg from '../assets/projects/yamile.webp';
import idateImg from '../assets/projects/idate.webp';
import imeppiImg from '../assets/projects/imeppi.webp';
import confibanImg from '../assets/projects/confiban.webp';
import zonamistaImg from '../assets/projects/zonamista.webp';
import { ExternalLink, ChevronLeft, ChevronRight, MoveRight } from 'lucide-react';

const realProjects = [
  {
    title: 'Dra. Yamile Yunes — Psicologia',
    category: 'Saúde & Psicologia',
    image: yamileImg,
    url: 'https://site-yamile.vercel.app/index.html',
  },
  {
    title: 'IDATE — Água, Terra & Energia',
    category: 'Plataforma Institucional',
    image: idateImg,
    url: 'https://idate-novo.vercel.app/',
  },
  {
    title: 'IMEPPI — Propriedade Intelectual',
    category: 'Segurança Jurídica',
    image: imeppiImg,
    url: 'https://imeppi.org/',
  },
  {
    title: 'CONFIBAN — Proteção Bancária',
    category: 'Fintech & Proteção',
    image: confibanImg,
    url: 'https://www.confiban.com.br/',
  },
  {
    title: 'Zona Mista — Portal Esportivo',
    category: 'Web App & Entretenimento',
    image: zonamistaImg,
    url: 'https://aplicativo-noticias-futebol.vercel.app/',
  },
];

// Repeat real projects to create an infinite horizontal scroll loop for desktop
const rowItems = [...realProjects, ...realProjects, ...realProjects, ...realProjects];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  // Desktop scroll parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.25;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track mobile scroll index
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.firstElementChild?.clientWidth || 280;
    const gap = 16;
    const newIndex = Math.round(scrollLeft / (itemWidth + gap));
    setActiveMobileIdx(Math.min(Math.max(0, newIndex), realProjects.length - 1));
  };

  const scrollMobileTo = (index: number) => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const itemWidth = container.firstElementChild?.clientWidth || 280;
    const gap = 16;
    container.scrollTo({
      left: index * (itemWidth + gap),
      behavior: 'smooth',
    });
  };

  const rowX = scrollOffset - 100;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0C0C0C] pt-16 sm:pt-24 pb-12 overflow-hidden border-y border-white/5"
    >
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 select-none">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/60">
            Trabalhos Reais
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
            Projetos Desenvolvidos Por Mim
          </h3>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="flex md:hidden items-center gap-2 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
          <span>Arraste para o lado</span>
          <MoveRight className="w-3.5 h-3.5 animate-pulse" />
        </div>

        {/* Desktop Hint */}
        <span className="text-xs text-[#D7E2EA]/50 font-light hidden md:inline-block">
          Passe o mouse para ver em detalhes
        </span>
      </div>

      {/* ======================================================== */}
      {/* MOBILE SLIDER (visible on screens < 768px)                */}
      {/* ======================================================== */}
      <div className="block md:hidden w-full">
        <div
          ref={mobileScrollRef}
          onScroll={handleMobileScroll}
          className="flex gap-4 px-6 overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-x pb-4 text-left"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {realProjects.map((project, idx) => (
            <a
              key={`mobile-proj-${idx}`}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="snap-center shrink-0 w-[84vw] max-w-[340px] h-[250px] rounded-2xl overflow-hidden bg-[#12141A] border border-white/20 shadow-2xl flex flex-col relative group active:scale-95 transition-transform"
            >
              {/* Browser Header Bar */}
              <div className="w-full bg-[#1A1D24] px-3.5 py-2 flex items-center justify-between border-b border-white/10 text-xs text-[#D7E2EA]/70">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="font-mono text-[11px] truncate max-w-[170px] text-[#D7E2EA]/70 font-medium">
                  {project.url.replace('https://', '')}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>

              {/* Project Screenshot & Info Overlay */}
              <div className="relative w-full flex-1 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  width={1200}
                  height={750}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90" />

                {/* Card Footer Content */}
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-end justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                      {project.category}
                    </span>
                    <h4 className="text-sm font-extrabold text-white tracking-wide truncate mt-0.5">
                      {project.title}
                    </h4>
                  </div>

                  <span className="shrink-0 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded-md flex items-center gap-1">
                    Ver site ↗
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Mobile Navigation Controls & Indicator Dots */}
        <div className="flex items-center justify-center gap-3 mt-3 px-6">
          <button
            onClick={() => scrollMobileTo(Math.max(0, activeMobileIdx - 1))}
            disabled={activeMobileIdx === 0}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            aria-label="Projeto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5">
            {realProjects.map((_, dotIdx) => (
              <button
                key={`dot-${dotIdx}`}
                onClick={() => scrollMobileTo(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeMobileIdx === dotIdx
                    ? 'w-6 bg-emerald-400'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Ir para projeto ${dotIdx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => scrollMobileTo(Math.min(realProjects.length - 1, activeMobileIdx + 1))}
            disabled={activeMobileIdx === realProjects.length - 1}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-white disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
            aria-label="Próximo projeto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP MARQUEE (visible on screens >= 768px)             */}
      {/* ======================================================== */}
      <div className="hidden md:flex gap-6 w-max px-4 select-none" style={{ transform: `translateX(${rowX}px)`, willChange: 'transform' }}>
        {rowItems.map((project, idx) => (
          <a
            key={`real-marquee-${idx}`}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-[400px] lg:w-[460px] h-[250px] lg:h-[280px] shrink-0 rounded-2xl overflow-hidden bg-[#12141A] border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/30 hover:scale-[1.02]"
          >
            {/* Browser Header Bar */}
            <div className="w-full bg-[#1A1D24] px-4 py-2 flex items-center justify-between border-b border-white/10 text-xs text-[#D7E2EA]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[10px] truncate max-w-[240px] text-[#D7E2EA]/50">
                {project.url.replace('https://', '')}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-[#D7E2EA]/40 group-hover:text-white transition-colors" />
            </div>

            {/* Project Real Screenshot */}
            <div className="relative w-full h-[calc(100%-32px)] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                width={1200}
                height={750}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

              {/* Title Overlay */}
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#B600A8]">
                    {project.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
                    {project.title}
                  </h4>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

