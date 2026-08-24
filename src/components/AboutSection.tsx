import React from 'react';
import { FadeIn } from './FadeIn';
import { AnimatedText } from './AnimatedText';
import { ContactButton } from './ContactButton';

interface AboutSectionProps {
  onOpenContact: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenContact }) => {
  const aboutBioText =
    "Com foco total em desenvolvimento web de alta performance, eu construo sites institucionais, landing pages e sistemas sob medida para empresas que buscam autoridade e vendas online. Cada projeto começa com uma estratégia clara para posicionar seu negócio e gerar resultados de verdade. Vamos criar um site que transmite total confiança aos seus clientes!";

  return (
    <section
      id="about"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden"
    >
      {/* Decorative 3D images in 4 corners */}
      {/* Top-left: Moon icon */}
      <div className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
            alt="Moon 3D icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain filter drop-shadow-2xl opacity-90"
          />
        </FadeIn>
      </div>

      {/* Bottom-left: 3D object */}
      <div className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
            alt="3D object"
            className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain filter drop-shadow-2xl opacity-90"
          />
        </FadeIn>
      </div>

      {/* Top-right: Lego icon */}
      <div className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] z-10 pointer-events-none">
        <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
            alt="Lego 3D icon"
            className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain filter drop-shadow-2xl opacity-90"
          />
        </FadeIn>
      </div>

      {/* Bottom-right: 3D group */}
      <div className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] z-10 pointer-events-none">
        <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
          <img
            src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
            alt="3D Group"
            className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain filter drop-shadow-2xl opacity-90"
          />
        </FadeIn>
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Heading */}
        <FadeIn delay={0} y={40} className="mb-10 sm:mb-14 md:mb-16">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            sobre mim
          </h2>
        </FadeIn>

        {/* Animated Paragraph */}
        <div className="max-w-[560px] mx-auto text-[#D7E2EA] font-medium text-center leading-relaxed mb-16 sm:mb-20 md:mb-24">
          <AnimatedText
            text={aboutBioText}
            className="justify-center text-center font-medium"
          />
        </div>

        {/* Contact Button */}
        <FadeIn delay={0.2} y={20}>
          <ContactButton label="Iniciar Projeto" onClick={onOpenContact} />
        </FadeIn>
      </div>
    </section>
  );
};
