import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import emanuelAvatar from '../assets/emanuel_no_bg.webp';
import ShimmerText from '@/components/ui/shimmer-text';
import { getLeadName } from '../lib/contact';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const leadName = getLeadName();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative md:min-h-screen md:min-h-dvh w-full flex flex-col justify-between overflow-hidden bg-[#0C0C0C] select-none pt-2 md:pt-4 pb-8 md:pb-12">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30 relative">
        <nav className="w-full flex items-center justify-between gap-2 px-4 sm:px-6 md:px-12 pt-4 md:pt-6 text-[#D7E2EA] font-semibold uppercase tracking-normal sm:tracking-wider text-[10px] sm:text-sm md:text-base lg:text-lg">
          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 shrink-0 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-white tracking-tight sm:tracking-widest text-[11px] sm:text-sm md:text-xl whitespace-nowrap">
              EMANUEL MEIRELLES
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-8 font-medium shrink-0">
            <button
              onClick={() => scrollToSection('about')}
              className="hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit font-inherit"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit font-inherit"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit font-inherit"
            >
              Projetos
            </button>
            <button
              onClick={onOpenContact}
              className="hidden sm:inline-block hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none text-inherit font-inherit"
            >
              Contato
            </button>
          </div>
        </nav>
      </FadeIn>

      {/* Saudação do link personalizado (?para=Nome) */}
      {leadName && (
        <FadeIn delay={0.1} y={10} className="w-full flex justify-center mt-5 sm:mt-6 px-4 z-30 relative">
          <span className="inline-flex items-center gap-2 max-w-full px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs sm:text-sm text-[#D7E2EA]">
            <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-emerald-400" />
            <span className="truncate">Olá, {leadName}</span>
          </span>
        </FadeIn>
      )}

      {/* Interactive Shimmer Headline: EU CRIO SITES */}
      <div className={`w-full ${leadName ? 'mt-3 sm:mt-4' : 'mt-5 sm:mt-6'} z-30 relative px-2 text-center flex justify-center items-center pointer-events-none`}>
        <FadeIn delay={0.15} y={30} className="w-full">
          <ShimmerText
            interactive
            className="font-extrabold uppercase tracking-tight text-center leading-none whitespace-nowrap block w-full"
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 11vw, 118px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              width: '100%',
            }}
          >
            EU CRIO SITES
          </ShimmerText>
        </FadeIn>
      </div>

      {/* Character Avatar */}
      <div className="relative z-10 md:my-auto pt-3 sm:pt-6 pb-4 sm:pb-2 flex justify-center items-center pointer-events-auto">
        <FadeIn delay={0.3} y={20}>
          <Magnet
            padding={200}
            strength={3.2}
            activeTransition="transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)"
            inactiveTransition="transform 0.5s ease-out"
            className="relative flex justify-center items-center"
          >
            <div className="relative group max-w-[240px] sm:max-w-[290px] md:max-w-[360px] lg:max-w-[420px]">
              <img
                src={emanuelAvatar}
                alt="Emanuel Meirelles - Desenvolvedor Web"
                width={832}
                height={960}
                fetchPriority="high"
                decoding="async"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Magnet>
        </FadeIn>
      </div>

      {/* Subtitle & CTA */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end gap-5 px-6 md:px-12 z-30">
        <FadeIn delay={0.45} y={20} className="max-w-md text-center sm:text-left">
          <p className="text-[#D7E2EA]/90 font-light uppercase tracking-wider text-xs sm:text-sm md:text-base leading-relaxed">
            Sites institucionais e landing pages para negócios que querem receber mais clientes pela internet
          </p>
        </FadeIn>

        <FadeIn delay={0.55} y={20} className="shrink-0">
          <ContactButton label="Falar Comigo" onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
