import React from 'react';
import { FadeIn } from './FadeIn';
import { LiveProjectButton } from './LiveProjectButton';
import { ExternalLink, Layers, CheckCircle, Quote } from 'lucide-react';

import yamileImg from '../assets/projects/yamile.webp';
import idateImg from '../assets/projects/idate.webp';
import imeppiImg from '../assets/projects/imeppi.webp';
import confibanImg from '../assets/projects/confiban.webp';
import zonamistaImg from '../assets/projects/zonamista.webp';
import flokiImg from '../assets/projects/floki.webp';

interface ProjectsSectionProps {
  onOpenContact?: () => void;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface Project {
  title: string;
  category: string;
  // 'cliente' = site entregue a um cliente; os outros tipos levam selo
  kind: 'cliente' | 'lancamento' | 'modelo' | 'autoral';
  description: string;
  image: string;
  liveUrl: string;
  highlights: string[];
  testimonial?: Testimonial;
}

const kindBadge: Record<Project['kind'], string | null> = {
  cliente: null,
  lancamento: 'Em lançamento',
  modelo: 'Projeto modelo',
  autoral: 'Projeto próprio',
};

const projects: Project[] = [
  {
    title: 'Dra. Yamile Yunes',
    category: 'Psicologia infantil',
    kind: 'cliente',
    description:
      'Site de uma psicóloga infantil e juvenil em Florianópolis. Os pais marcam a consulta pelo WhatsApp com um clique, leem as respostas para as dúvidas mais comuns e acham o consultório no mapa. Tem versão em português e em espanhol.',
    image: yamileImg,
    liveUrl: 'https://site-yamile.vercel.app/index.html',
    highlights: ['Agendamento pelo WhatsApp em 1 clique', 'Site em português e espanhol', 'Dúvidas dos pais respondidas no site'],
    testimonial: {
      quote:
        'O site foi a porta de entrada para eu começar a receber pacientes. Hoje muitos dos pais que me procuram chegaram por ele.',
      author: 'Dra. Yamile Yunes',
      role: 'Psicóloga infantil em Florianópolis',
    },
  },
  {
    title: 'IMEPPI',
    category: 'Propriedade intelectual',
    kind: 'cliente',
    description:
      'Site do Instituto Meirelles, que combate a pirataria digital e defende marcas registradas, direitos autorais e empresas prejudicadas por concorrência desleal.',
    image: imeppiImg,
    liveUrl: 'https://imeppi.org/',
    highlights: ['Defesa de marcas e direitos autorais', 'Combate à pirataria digital', 'Visual sóbrio de instituição'],
  },
  {
    title: 'IDATE',
    category: 'Água, terra e energia',
    kind: 'cliente',
    description:
      'Plataforma de uma associação sem fins econômicos que pesquisa a regulação técnica de água, terra e energia. Reúne 8 observatórios temáticos, um radar que mostra as evidências conforme chegam e um canal de denúncias.',
    image: idateImg,
    liveUrl: 'https://idate-novo.vercel.app/',
    highlights: ['8 observatórios temáticos', 'Radar de evidências ao vivo', 'Canal de denúncias'],
  },
  {
    title: 'Confiban',
    category: 'Proteção bancária',
    kind: 'lancamento',
    description:
      'Site de um projeto que vai orientar de graça vítimas de fraude financeira e consumidores com problemas no banco. O visual foi pensado para passar credibilidade a quem chega desconfiado.',
    image: confibanImg,
    liveUrl: 'https://www.confiban.com.br/',
    highlights: ['Orientação gratuita contra fraudes', 'Visual que passa credibilidade', 'Site no ar com domínio próprio'],
  },
  {
    title: 'Floki Petshop',
    category: 'Loja virtual',
    kind: 'modelo',
    description:
      'Modelo que criei para pet shops que vendem online: catálogo separado para cães e gatos, carrinho, ofertas e um clube de fidelidade. Serve de base para outras lojas e para serviços como banho e tosa.',
    image: flokiImg,
    liveUrl: 'https://floki-petshop.vercel.app/',
    highlights: ['Catálogo de cães e gatos', 'Carrinho e clube de fidelidade', 'Base adaptável a outros negócios'],
  },
  {
    title: 'Zona Mista',
    category: 'Portal de futebol',
    kind: 'autoral',
    description:
      'Portal de notícias de futebol que fiz por conta própria. Tem placares do mundo todo atualizados ao vivo, um minigame de pênaltis e três temas visuais para escolher.',
    image: zonamistaImg,
    liveUrl: 'https://aplicativo-noticias-futebol.vercel.app/',
    highlights: ['Placares ao vivo', 'Minigame de pênaltis', 'Três temas visuais'],
  },
];

export const ProjectsSection: React.FC<ProjectsSectionProps> = () => {
  return (
    <section
      id="projects"
      className="relative w-full bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 pt-14 pb-10 sm:pt-24 sm:pb-16 px-4 sm:px-8 md:px-12 flex flex-col items-center overflow-hidden z-30"
    >
      <div className="relative z-10 max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-14">
          <FadeIn delay={0} y={30}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-semibold uppercase tracking-widest text-[#D7E2EA] mb-3">
              <Layers className="w-4 h-4 text-emerald-400" /> Portfólio
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
            <p className="mt-3 text-[#D7E2EA]/70 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Sites que fiz para clientes e modelos que criei para mostrar o que dá para fazer.
            </p>
          </FadeIn>
        </div>

        {/* Projects List */}
        <div className="space-y-5 sm:space-y-10 lg:space-y-16">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <FadeIn key={project.title} delay={0.15} y={40}>
                <div
                  className={`flex flex-col ${
                    isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } gap-4 sm:gap-8 lg:gap-12 items-center bg-[#12141A]/90 border border-white/10 p-3.5 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl shadow-2xl hover:border-white/25 transition-all duration-300`}
                >
                  {/* Browser Mockup Window */}
                  <div className="w-full lg:w-1/2 group relative rounded-xl sm:rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl">
                    {/* Browser Toolbar */}
                    <div className="w-full bg-[#181B22] px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between border-b border-white/10 text-xs text-[#D7E2EA]/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/80" />
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/80" />
                      </div>
                      <span className="font-mono text-[11px] sm:text-xs truncate max-w-[200px] sm:max-w-[240px] text-[#D7E2EA]/50">
                        {project.liveUrl.replace('https://', '')}
                      </span>
                      <ExternalLink className="w-4 h-4 text-[#D7E2EA]/40 group-hover:text-white transition-colors" />
                    </div>

                    <div className="relative w-full aspect-[16/10] overflow-hidden bg-black">
                      <img
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={750}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2.5 sm:p-3 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 hover:scale-110 transition-transform shadow-xl"
                        title="Abrir o site"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-3.5 sm:space-y-5 px-1 sm:px-0 pb-1 sm:pb-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 sm:px-3 py-1 rounded-md">
                          {project.category}
                        </span>
                        {kindBadge[project.kind] && (
                          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-amber-300 bg-amber-400/10 border border-amber-400/25 px-2.5 sm:px-3 py-1 rounded-md">
                            {kindBadge[project.kind]}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-3xl font-extrabold text-white mt-2.5 sm:mt-3 tracking-tight leading-tight">
                        {project.title}
                      </h3>
                      <p className="text-[#D7E2EA]/70 text-sm sm:text-base leading-relaxed mt-2 sm:mt-3 font-light">
                        {project.description}
                      </p>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-1.5 sm:space-y-2">
                      {project.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-center gap-2 text-xs sm:text-sm text-[#D7E2EA]">
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Depoimento */}
                    {project.testimonial && (
                      <figure className="relative rounded-xl bg-white/[0.04] border border-white/10 p-4 sm:p-5">
                        <Quote className="absolute top-3 right-3 w-5 h-5 text-emerald-400/40" />
                        <blockquote className="text-sm sm:text-base text-white leading-relaxed pr-6">
                          "{project.testimonial.quote}"
                        </blockquote>
                        <figcaption className="mt-2.5 text-xs text-[#D7E2EA]/60">
                          <span className="font-semibold text-[#D7E2EA]">{project.testimonial.author}</span>
                          {' · '}
                          {project.testimonial.role}
                        </figcaption>
                      </figure>
                    )}

                    {/* Action Button */}
                    <div className="pt-1 sm:pt-2 flex items-center gap-4">
                      <LiveProjectButton url={project.liveUrl} label={project.kind === 'modelo' ? 'Ver o modelo' : 'Abrir o site'} />
                    </div>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};
