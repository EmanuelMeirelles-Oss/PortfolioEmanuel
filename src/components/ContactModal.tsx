import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle, Mail, ArrowRight, CheckCircle2, Phone } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LinkedinIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const whatsappNumber = '554888722967';
  const displayPhone = '(48) 8872-2967';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Olá Emanuel! Vi seu portfólio e gostaria de conversar sobre um projeto de site.'
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-3xl border border-[#D7E2EA]/20 bg-[#12141A] p-6 sm:p-8 text-[#D7E2EA] shadow-2xl z-10"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-[#B600A8] font-bold">
                Contato Direto
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mt-1">
                Vamos construir seu novo site
              </h2>
              <p className="text-sm text-[#D7E2EA]/70 mt-2">
                Estou disponível para novos projetos de sites institucionais, landing pages e sistemas sob medida.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-600/20 to-teal-500/20 border border-emerald-500/30 hover:border-emerald-400 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500 text-black">
                    <MessageCircle className="w-6 h-6 fill-current" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                      WhatsApp / Telefone
                    </h3>
                    <p className="text-xs font-semibold text-emerald-400 mt-0.5">
                      {displayPhone}
                    </p>
                    <p className="text-[11px] text-[#D7E2EA]/60">
                      Clique para enviar mensagem direta
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="mailto:Emanuelymei99@gmail.com"
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-purple-300 transition-colors">
                      Enviar E-mail
                    </h3>
                    <p className="text-xs text-[#D7E2EA]/70">
                      Emanuelymei99@gmail.com
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="https://www.linkedin.com/in/emanuel-yunes-de-meirelles-83779b281/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                    <LinkedinIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">
                      LinkedIn
                    </h3>
                    <p className="text-xs text-[#D7E2EA]/70">
                      Emanuel Yunes de Meirelles
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#D7E2EA]/60">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Atendimento sem compromisso
              </span>
              <span>Florianópolis, SC</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
