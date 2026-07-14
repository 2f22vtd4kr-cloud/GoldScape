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
                 hover:scale-105 active:scale-95 transition-transform duration-150"
      style={{
        background: '#25D366',
        boxShadow: '0 4px 24px rgba(37,211,102,0.4), 0 1px 6px rgba(0,0,0,0.3)',
      }}
    >
      <MessageCircle className="w-6 h-6 text-white" />
    </a>
  );
}
