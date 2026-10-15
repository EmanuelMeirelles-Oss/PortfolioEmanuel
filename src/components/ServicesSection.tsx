import React from 'react';
import { FadeIn } from './FadeIn';

const services = [
  {
    number: '01',
    title: 'Landing pages',
    description:
      'Uma página feita para um objetivo só: trazer contatos, vender um serviço ou divulgar um lançamento. Tudo nela leva o visitante até o botão do WhatsApp.',
  },
  {
    number: '02',
    title: 'Sites institucionais',
    description:
      'O site da sua empresa: quem vocês são, o que fazem, onde ficam e como falar com vocês. Abre bem no celular e no computador.',
  },
  {
    number: '03',
    title: 'Lojas virtuais',
    description:
      'Loja online com catálogo, carrinho e páginas de produto que carregam rápido. Dá para começar com poucos produtos e aumentar o catálogo depois.',
  },
  {
    number: '04',
    title: 'Sistemas web',
    description:
      'Painéis, áreas de cliente e sistemas sob medida para tirar da planilha e do papel as tarefas que se repetem todo dia.',
  },
  {
    number: '05',
    title: 'Google e velocidade',
    description:
      'Ajustes técnicos para o Google encontrar e entender o seu site, e para as páginas abrirem rápido no celular.',
  },
];

interface ServicesSectionProps {
  onOpenContact?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = () => {
  return (
    <section
      id="services"
      className="relative w-full bg-[#FFFFFF] text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-24 md:pb-32 select-none z-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Heading matching exact template specs */}
        <FadeIn delay={0} y={40}>
          <h2
            className="font-black uppercase text-[#0C0C0C] text-center leading-none tracking-tight mb-8 sm:mb-12 md:mb-20"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Serviços
          </h2>
        </FadeIn>

        {/* 5 Vertical Service Items with 1px border separator */}
        <div className="divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
          {services.map((service, index) => (
            <FadeIn key={service.number} delay={index * 0.1} y={30}>
              <div className="py-5 sm:py-8 md:py-12 flex flex-row items-start gap-4 sm:gap-8 md:gap-12 group transition-colors duration-300">
                {/* Number on the left */}
                <div
                  className="font-black text-[#0C0C0C] leading-none shrink-0"
                  style={{ fontSize: 'clamp(2.25rem, 10vw, 140px)' }}
                >
                  {service.number}
                </div>

                {/* Name + Description on the right */}
                <div className="flex flex-col justify-center space-y-1.5 md:space-y-3 pt-0.5 md:pt-4 max-w-2xl">
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
