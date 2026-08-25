import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import emanuelAvatar from '../assets/emanuel_no_bg.webp';
import ShimmerText from '@/components/ui/shimmer-text';

interface HeroSectionProps {
  onOpenContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen min-h-dvh w-full flex flex-col justify-between overflow-hidden bg-[#0C0C0C] select-none pt-4 pb-8 md:pb-12">
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

      {/* Interactive Shimmer Headline: EU CRIO SITES */}
      <div className="w-full overflow-hidden mt-4 sm:mt-6 z-10 px-2 text-center flex justify-center items-center">
        <FadeIn delay={0.15} y={30}>
          <ShimmerText
            interactive
            duration={1.5}
            className="font-extrabold uppercase tracking-tight text-center leading-none"
            style={{
              fontFamily: "'Kanit', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.75rem, 11vw, 105px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
            }}
          >
            EU CRIO SITES
          </ShimmerText>
        </FadeIn>
      </div>

      {/* Character Avatar */}
      <div className="relative z-20 my-auto pt-2 pb-6 sm:pt-4 sm:pb-8 flex justify-center items-center pointer-events-auto">
        <FadeIn delay={0.3} y={20}>
          <Magnet
            padding={450}
            strength={1.6}
            activeTransition="transform 0.22s cubic-bezier(0.16, 1, 0.3, 1)"
            inactiveTransition="transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
            className="relative flex justify-center items-center"
          >
            <div className="relative group max-w-[240px] sm:max-w-[310px] md:max-w-[370px] lg:max-w-[420px]">
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
      <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 px-6 md:px-12 z-30">
        <FadeIn delay={0.45} y={20} className="max-w-md text-center sm:text-left">
          <p className="text-[#D7E2EA]/90 font-light uppercase tracking-wider text-xs sm:text-sm md:text-base leading-relaxed">
            desenvolvedor web criando sites institucionais e landing pages de alta conversão para o seu negócio
          </p>
        </FadeIn>

        <FadeIn delay={0.55} y={20} className="shrink-0">
          <ContactButton label="Falar Comigo" onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
