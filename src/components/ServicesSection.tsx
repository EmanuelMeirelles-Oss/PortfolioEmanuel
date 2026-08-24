import React from 'react';
import { FadeIn } from './FadeIn';

const services = [
  {
    number: '01',
    title: 'Landing Pages de Alta Conversão',
    description:
      'Criação de páginas estratégicas e persuasivas com foco total em captura de leads, autoridade de marca e aceleração de vendas para o seu negócio.',
  },
  {
    number: '02',
    title: 'Sites Institucionais Sob Medida',
    description:
      'Desenvolvimento da presença digital completa da sua empresa com design moderno, elegante, 100% responsivo e otimizado para transmitir máxima confiança aos seus clientes.',
  },
  {
    number: '03',
    title: 'E-Commerce & Lojas Virtuais',
    description:
      'Lojas virtuais completas e de alta performance, com navegação ágil, catálogo de produtos otimizado e estrutura pronta para vender online 24 horas por dia.',
  },
  {
    number: '04',
    title: 'Sistemas & Aplicações Web',
    description:
      'Desenvolvimento de aplicações web customizadas, dashboards interativos, portais de clientes e sistemas em React e TypeScript para automatizar e escalar processos.',
  },
  {
    number: '05',
    title: 'Otimização SEO & Performance',
    description:
      'Otimização técnica para colocar o seu site nas primeiras posições do Google e garantir tempo de carregamento em frações de segundo no celular e computador.',
  },
];

interface ServicesSectionProps {
  onOpenContact?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 select-none z-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading matching exact template specs */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-[#0C0C0C] text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Serviços
          </h2>
        </FadeIn>

        {/* 5 Vertical Service Items with 1px border separator */}
        <div className="divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
          {services.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={30}>
              <div className="py-8 sm:py-10 md:py-12 flex flex-col md:flex-row md:items-start justify-between gap-4 md:gap-12 group transition-colors duration-300">
                {/* Number on the left */}
                <div
                  className="font-black text-[#0C0C0C] leading-none shrink-0"
                  style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Name + Description on the right */}
                <div className="flex flex-col justify-center space-y-3 md:pt-4 max-w-2xl">
                  <h3
                    className="font-medium uppercase text-[#0C0C0C] tracking-tight"
                    style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                  >
                    {service.title}
                  </h3>
                  <p
                    className="font-light leading-relaxed text-[#0C0C0C]/60"
                    style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                  >
                    {service.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
