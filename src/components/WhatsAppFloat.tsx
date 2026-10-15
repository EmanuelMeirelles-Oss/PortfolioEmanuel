import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsappUrl } from '../lib/contact';

// Botão fixo de WhatsApp: aparece depois que o visitante passa do hero.
export const WhatsAppFloat: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={getWhatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp"
      className={`fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2 rounded-full bg-emerald-500 text-black font-semibold text-sm shadow-[0_8px_30px_rgba(16,185,129,0.35)] p-3.5 sm:px-5 sm:py-3 transition-all duration-300 hover:bg-emerald-400 active:scale-95 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <MessageCircle className="w-6 h-6 sm:w-5 sm:h-5 fill-current" />
      <span className="hidden sm:inline">Falar no WhatsApp</span>
    </a>
  );
};
