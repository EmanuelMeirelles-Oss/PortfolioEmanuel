import React from 'react';
import { FadeIn } from './FadeIn';
import { ArrowUp, Mail, MessageCircle, Heart } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
}

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onOpenContact }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = '554888722967';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Olá Emanuel! Vi seu portfólio e gostaria de solicitar um orçamento.'
  )}`;

  return (
    <footer className="relative w-full bg-[#080808] text-[#D7E2EA] pt-20 pb-10 border-t border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <FadeIn delay={0} y={20}>
              <h3 className="hero-heading font-black text-3xl sm:text-4xl uppercase tracking-wider">
                Emanuel Meirelles
              </h3>
              <p className="text-[#D7E2EA]/70 text-sm sm:text-base font-light max-w-sm leading-relaxed mt-2">
                Desenvolvedor Web focado em criar experiências digitais marcantes, sites institucionais e landing pages de alta performance.
              </p>
            </FadeIn>

            <FadeIn delay={0.1} y={20}>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://www.linkedin.com/in/emanuel-yunes-de-meirelles-83779b281/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-purple-400 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="mailto:Emanuelymei99@gmail.com"
                  className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-purple-400 transition-all duration-300"
                  aria-label="E-mail"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 hover:border-emerald-400 text-emerald-400 transition-all duration-300 flex items-center gap-2 text-xs font-semibold"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>(48) 8872-2967</span>
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <FadeIn delay={0.2} y={20}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#B600A8]">
                Navegação
              </h4>
              <ul className="space-y-2 text-sm mt-3 font-medium">
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    Sobre Mim
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors">
                    Serviços & Soluções
                  </a>
                </li>
                <li>
                  <a href="#projects" className="hover:text-white transition-colors">
                    Projetos em Destaque
                  </a>
                </li>
                <li>
                  <button onClick={onOpenContact} className="hover:text-white transition-colors text-left bg-transparent border-none text-inherit font-inherit cursor-pointer">
                    Fazer Orçamento
                  </button>
                </li>
              </ul>
            </FadeIn>
          </div>

          {/* Location & Status */}
          <div className="md:col-span-4 space-y-4">
            <FadeIn delay={0.3} y={20}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#B600A8]">
                Status & Localização
              </h4>
              <div className="p-4 rounded-2xl bg-[#12141A] border border-white/10 mt-3 space-y-2 text-xs sm:text-sm text-[#D7E2EA]/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-semibold text-white">Disponível para novos projetos</span>
                </div>
                <p className="text-xs text-[#D7E2EA]/60 pt-1">
                  Atendimento presencial em Florianópolis, SC e remoto para todo o Brasil.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#D7E2EA]/50 font-light">
          <p className="flex items-center gap-1">
            © {new Date().getFullYear()} Emanuel Meirelles. Desenvolvido com{' '}
            <Heart className="w-3.5 h-3.5 text-purple-500 fill-purple-500 inline" /> e React 19.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
          >
            <span>Voltar ao topo</span>
            <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
              <ArrowUp className="w-4 h-4" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};
