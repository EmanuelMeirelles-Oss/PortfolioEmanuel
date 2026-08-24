import React from 'react';
import { FadeIn } from './FadeIn';
import { Magnet } from './Magnet';
import { ContactButton } from './ContactButton';
import { Code2, Sparkles } from 'lucide-react';
import emanuelAvatar from '../assets/emanuel_no_bg.png';
import WarpText from './WarpText';

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
    <section className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0C0C0C] select-none pt-4 pb-8 md:pb-12">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full z-30 relative">
        <nav className="w-full flex items-center justify-between px-6 md:px-12 pt-4 md:pt-6 text-[#D7E2EA] font-semibold uppercase tracking-wider text-xs sm:text-sm md:text-base lg:text-lg">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-extrabold text-white tracking-widest text-sm md:text-xl">
              EMANUEL MEIRELLES
            </span>
          </div>

          <div className="flex items-center gap-4 sm:gap-8 font-medium">
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

      {/* Interactive WarpText Headline: EU CRIO SITES */}
      <div className="w-full overflow-hidden mt-4 sm:mt-6 z-10 px-2 text-center">
        <FadeIn delay={0.15} y={30}>
          <WarpText
            text="EU CRIO SITES"
            color="#f8f5ff"
            warpStrength={0.045}
            warpScale={1.2}
            speed={0.32}
            pointerInfluence={0.3}
            pointerStrength={0.25}
            refraction={0.008}
            ripple
            fontSize={110}
            fontWeight={800}
            style={{ height: '180px' }}
            fontFamily="'Kanit', sans-serif"
            letterSpacing={-0.06}
            lineHeight={0.9}
          />
        </FadeIn>
      </div>

      {/* Character Avatar */}
      <div className="relative z-20 my-auto py-4 sm:py-6 flex justify-center items-center pointer-events-auto">
        <FadeIn delay={0.3} y={20}>
          <Magnet
            padding={160}
            strength={3.5}
            activeTransition="transform 0.25s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
            className="relative flex justify-center items-center"
          >
            <div className="relative group max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px]">
              <img
                src={emanuelAvatar}
                alt="Emanuel Meirelles - Desenvolvedor Web"
                className="w-full h-auto object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)] transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute top-[15%] -left-6 sm:-left-10 bg-[#12141A]/95 border border-white/10 backdrop-blur-md px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white tracking-wide">
                <Code2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Sites Sob Medida</span>
              </div>

              <div className="absolute bottom-[20%] -right-6 sm:-right-10 bg-[#12141A]/95 border border-white/10 backdrop-blur-md px-3.5 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-white tracking-wide">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Alta Conversão</span>
              </div>
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
