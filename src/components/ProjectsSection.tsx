import React from 'react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ContactButton } from './ContactButton';
import { ExternalLink, Layers, CheckCircle } from 'lucide-react';

import yamileImg from '../assets/projects/yamile.png';
import idateImg from '../assets/projects/idate.png';
import imeppiImg from '../assets/projects/imeppi.png';
import confibanImg from '../assets/projects/confiban.png';
import zonamistaImg from '../assets/projects/zonamista.png';

interface ProjectsSectionProps {
  onOpenContact: () => void;
}

interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: 'Dra. Yamile Yunes — Psicologia Infantil',
    category: 'Site Institucional & Saúde',
    description:
      'Site profissional de alta conversão para atendimento psicológico infantil e juvenil em Florianópolis. Desenvolvido com agendamento direto via WhatsApp, estrutura bilíngue (Português/Espanhol), seção de dúvidas frequentes para os pais e integração com Google Maps.',
    image: yamileImg,
    tags: ['React', 'Agendamento WhatsApp', 'SEO Bilíngue (PT/ES)', 'Design Acolhedor'],
    liveUrl: 'https://site-yamile.vercel.app/index.html',
    highlights: ['Agendamento Direto em 1 Clique', 'Estrutura Bilíngue (PT/ES)', '100% Responsivo e Otimizado'],
  },
  {
    title: 'IDATE — Direitos da Água, Terra & Energia',
    category: 'Plataforma Institucional & Regulação',
    description:
      'Plataforma institucional para associação civil sem fins econômicos dedicada a pesquisas de regulamentação técnica. Inclui radar de evidências ao vivo, 8 observatórios temáticos e central de denúncias.',
    image: idateImg,
    tags: ['Next.js', 'Tailwind CSS', 'Radar de Evidências', 'Design Corporativo'],
    liveUrl: 'https://idate-novo.vercel.app/',
    highlights: ['8 Observatórios Temáticos', 'Radar de Evidências em Tempo Real', 'Alta Densidade Informacional'],
  },
  {
    title: 'IMEPPI — Proteção de Propriedade Intelectual',
    category: 'Segurança Jurídica & Portal Institucional',
    description:
      'Portal institucional criado para o Instituto Meirelles, focado no combate à pirataria digital, defesa de marcas registradas, proteção de direitos autorais e monitoramento contínuo de concorrência desleal.',
    image: imeppiImg,
    tags: ['React', 'Tailwind CSS', 'Segurança Digital', 'Framer Motion'],
    liveUrl: 'https://imeppi.org/',
    highlights: ['Defesa de Marcas & Direitos Autorais', 'Combate à Pirataria Digital', 'Posicionamento Institucional de Autoridade'],
  },
  {
    title: 'CONFIBAN — Proteção do Sistema Bancário',
    category: 'Fintech & Proteção Financeira',
    description:
      'Portal de orientação técnica para vítimas de fraudes financeiras e proteção do consumidor bancário. Desenvolvido para atuar como ponte de confiança entre os cidadãos e as instituições financeiras.',
    image: confibanImg,
    tags: ['React', 'Design Bancário', 'Segurança Financeira', 'TypeScript'],
    liveUrl: 'https://www.confiban.com.br/',
    highlights: ['Orientação Gratuita contra Fraudes', 'Interface de Alta Credibilidade', 'Atendimento Direto'],
  },
  {
    title: 'Zona Mista — Portal de Notícias Esportivas',
    category: 'Web App & Entretenimento Esportivo',
    description:
      'Portal de notícias e curadoria esportiva sem ruído. Inclui minigame interativo de "Chute a Gol" (pênaltis), ticker de placares mundiais ao vivo e seletor de temas visuais (Verde Neon, Ciber Roxo e Retrô).',
    image: zonamistaImg,
    tags: ['JavaScript ES6+', 'Minigame Interativo', 'API de Placares', 'Dark Mode Customizável'],
    liveUrl: 'https://aplicativo-noticias-futebol.vercel.app/',
    highlights: ['Jogo Interativo de Pênaltis', 'Ticker de Placares em Tempo Real', 'Temas Customizáveis (Neon/Cyber)'],
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenContact }) => {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 py-24 sm:py-32 px-5 sm:px-8 md:px-12 flex flex-col justify-center items-center overflow-hidden z-30"
    >
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <FadeIn delay={0} y={30}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D7E2EA] mb-4">
              <Layers className="w-4 h-4 text-emerald-400" /> Portfólio Real
            </span>
          </FadeIn>

          <FadeIn delay={0.1} y={30}>
            <h2
              className="hero-heading font-black uppercase tracking-tight leading-none text-center"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
            >
              Projetos
            </h2>
          </FadeIn>

          <FadeIn delay={0.2} y={30}>
            <p className="mt-4 text-[#D7E2EA]/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Confira os sites e plataformas reais desenvolvidos por Emanuel Meirelles.
            </p>
          </FadeIn>
        </div>

        {/* Projects List */}
        <div className="space-y-16 sm:space-y-24">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <FadeIn key={project.title} delay={0.15} y={40}>
                <div
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-8 sm:gap-12 items-center bg-[#12141A]/90 border border-white/10 p-6 sm:p-10 rounded-3xl shadow-2xl hover:border-white/25 transition-all duration-300`}
                >
                  {/* Browser Mockup Window */}
                  <div className="w-full lg:w-1/2 group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
                    {/* Browser Toolbar */}
                    <div className="w-full bg-[#181B22] px-4 py-2.5 flex items-center justify-between border-b border-white/10 text-xs text-[#D7E2EA]/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-red-500/80" />
                        <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-xs truncate max-w-[240px] text-[#D7E2EA]/50">
                        {project.liveUrl.replace('https://', '')}
                      </span>
                      <ExternalLink className="w-4 h-4 text-[#D7E2EA]/40 group-hover:text-white transition-colors" />
                    </div>

                    <div className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] overflow-hidden bg-black">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-4 right-4 p-3 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 hover:scale-110 transition-transform shadow-xl"
                        title="Abrir Projeto no Ar"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md">
                        {project.category}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-[#D7E2EA]/70 text-sm sm:text-base leading-relaxed mt-3 font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {project.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-2 text-xs sm:text-sm text-[#D7E2EA]">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-[#D7E2EA]/80 font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Action Button */}
                    <div className="pt-4 flex items-center gap-4">
                      <LiveProjectButton url={project.liveUrl} label="Acessar Site no Ar" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <FadeIn delay={0.3} y={30} className="mt-20 sm:mt-28 text-center">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#12141A] border border-white/10 shadow-2xl relative overflow-hidden">
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
              Quer um site de alto nível como esses?
            </h3>
            <p className="text-[#D7E2EA]/70 max-w-xl mx-auto mt-3 text-sm sm:text-base font-light">
              Sua empresa também pode ter uma presença digital extraordinária que transmite autoridade e converte visitantes em clientes.
            </p>
            <div className="mt-8 flex justify-center">
              <ContactButton label="Construir Meu Site" onClick={onOpenContact} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
