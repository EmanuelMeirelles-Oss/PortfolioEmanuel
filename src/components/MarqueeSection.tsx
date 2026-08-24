import React, { useState, useEffect, useRef } from 'react';
import yamileImg from '../assets/projects/yamile.webp';
import idateImg from '../assets/projects/idate.webp';
import imeppiImg from '../assets/projects/imeppi.webp';
import confibanImg from '../assets/projects/confiban.webp';
import zonamistaImg from '../assets/projects/zonamista.webp';
import { ExternalLink } from 'lucide-react';

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

// Repeat real projects to create an infinite horizontal scroll loop
const rowItems = [...realProjects, ...realProjects, ...realProjects, ...realProjects];

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState(0);

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

  const rowX = scrollOffset - 100;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#0C0C0C] pt-16 sm:pt-24 pb-12 overflow-hidden border-y border-white/5 select-none"
    >
      <div className="max-w-6xl mx-auto px-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D7E2EA]/60">
            Trabalhos Reais
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
            Projetos Desenvolvidos Por Mim
          </h3>
        </div>
        <span className="text-xs text-[#D7E2EA]/50 font-light hidden sm:inline-block">
          Passe o mouse para ver em detalhes
        </span>
      </div>

      <div className="flex gap-6 w-max px-4" style={{ transform: `translateX(${rowX}px)`, willChange: 'transform' }}>
        {rowItems.map((project, idx) => (
          <a
            key={`real-marquee-${idx}`}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative w-[320px] sm:w-[400px] md:w-[460px] h-[200px] sm:h-[250px] md:h-[280px] shrink-0 rounded-2xl overflow-hidden bg-[#12141A] border border-white/10 shadow-2xl transition-all duration-300 hover:border-white/30 hover:scale-[1.02]"
          >
            {/* Browser Header Bar */}
            <div className="w-full bg-[#1A1D24] px-4 py-2 flex items-center justify-between border-b border-white/10 text-xs text-[#D7E2EA]/60">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="font-mono text-[10px] truncate max-w-[180px] sm:max-w-[240px] text-[#D7E2EA]/50">
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
