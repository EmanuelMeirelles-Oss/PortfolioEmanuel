import React from 'react';
import { FadeIn } from './FadeIn';
import { ContactButton } from './ContactButton';
import { CalendarCheck } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Primeira versão em 1 dia',
    description:
      'Monto uma primeira versão do seu site em até 1 dia. Sites mais complexos podem levar um pouco mais.',
  },
  {
    number: '02',
    title: 'Reunião com você',
    description:
      'Você vê o site e me diz o que quer mudar e como enxerga o seu negócio. Aqui você me passa suas fotos, logo e textos.',
  },
  {
    number: '03',
    title: 'Site pronto em 5 dias',
    description:
      'Ajusto tudo o que combinamos e ligo o que o seu negócio precisar, como pagamento online e outros sistemas.',
  },
  {
    number: '04',
    title: 'No ar e atualizado',
    description:
      'Depois que o site está no ar, faço as atualizações que você precisar. É só me chamar no WhatsApp.',
  },
];

interface ProcessSectionProps {
  onOpenContact: () => void;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="process"
      className="relative w-full bg-[#0C0C0C] pt-4 sm:pt-8 pb-14 sm:pb-24 px-4 sm:px-8 md:px-12 z-30"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <FadeIn delay={0} y={30}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D7E2EA] mb-3">
              <CalendarCheck className="w-4 h-4 text-emerald-400" /> Processo
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none text-center"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              Como funciona
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <p className="mt-3 text-[#D7E2EA]/70 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed text-balance">
              Você vê o seu site antes da nossa reunião, e ele fica pronto uns 5 dias depois dela.
            </p>
          </FadeIn>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {steps.map((step, index) => (
            <FadeIn key={step.number} delay={index * 0.1} y={30} className="h-full">
              <div className="h-full flex sm:flex-col gap-4 sm:gap-3 bg-[#12141A]/90 border border-white/10 rounded-2xl p-4 sm:p-6 hover:border-white/25 transition-colors duration-300">
                <span className="font-black text-emerald-400 leading-none text-2xl sm:text-4xl shrink-0">
                  {step.number}
                </span>
                <div>
                  <h3 className="text-base sm:text-xl font-extrabold text-white tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[#D7E2EA]/70 text-sm leading-relaxed mt-1.5 font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Bottom Banner */}
        <FadeIn delay={0.3} y={30} className="mt-10 sm:mt-16 lg:mt-20 text-center">
          <div className="p-6 sm:p-12 rounded-2xl sm:rounded-3xl bg-[#12141A] border border-white/10 shadow-2xl relative overflow-hidden">
            <h3 className="text-xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Quer um site assim para o seu negócio?
            </h3>
            <p className="text-[#D7E2EA]/70 max-w-xl mx-auto mt-3 text-sm sm:text-base font-light text-balance">
              Me chama no WhatsApp, conta o que você faz e a gente vê o que faz sentido para o seu caso.
            </p>
            <div className="mt-6 sm:mt-8 flex justify-center">
              <ContactButton label="Quero meu site" onClick={onOpenContact} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
