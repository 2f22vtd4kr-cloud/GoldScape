import { MessageCircle } from 'lucide-react';

/**
 * Floating WhatsApp CTA — visible on all pages.
 * Primary contact channel for Viktor (wants a human number), Irina (phone-first),
 * and Dmitri (fast, no forms).
 */
export function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/971502345678"
      target="_blank"
      rel="noreferrer"
      aria-label="Написать в WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center
                 hover:scale-105 active:scale-95 transition-all duration-200"
      style={{
        background: 'radial-gradient(ellipse at 50% 18%, rgba(80,240,140,0.50) 0%, rgba(37,211,102,0.82) 55%, rgba(18,160,70,0.90) 100%)',
        backdropFilter: 'blur(18px) saturate(190%)',
        WebkitBackdropFilter: 'blur(18px) saturate(190%)',
        border: '1px solid rgba(255,255,255,0.26)',
        borderBottomColor: 'rgba(255,255,255,0.07)',
        boxShadow: [
          '0 8px 32px rgba(37,211,102,0.36)',
          '0 2px 10px rgba(0,0,0,0.22)',
          'inset 0 1.5px 2px rgba(255,255,255,0.44)',
          'inset 0 -2px 6px rgba(0,0,0,0.18)',
        ].join(', '),
      }}
    >
      <MessageCircle className="w-6 h-6 text-white drop-shadow-sm" />
    </a>
  );
}
