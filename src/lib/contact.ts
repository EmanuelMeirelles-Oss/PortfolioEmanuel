export const WHATSAPP_NUMBER = '554888722967';
export const DISPLAY_PHONE = '(48) 8872-2967';

// Nome do lead vindo do link personalizado: ?para=Clínica%20Bella
export function getLeadName(): string | null {
  if (typeof window === 'undefined') return null;
  const raw = new URLSearchParams(window.location.search).get('para');
  if (!raw) return null;
  const name = raw.replace(/\s+/g, ' ').trim().slice(0, 40);
  return name || null;
}

export function getWhatsappUrl(): string {
  const lead = getLeadName();
  const message = lead
    ? `Olá Emanuel! Vi o portfólio que você mandou para ${lead} e quero conversar sobre um site.`
    : 'Olá Emanuel! Vi seu portfólio e quero conversar sobre um site.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function isMobileViewport(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 767px)').matches;
}
