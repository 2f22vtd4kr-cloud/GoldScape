import type { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { WhatsAppFloat } from '@/components/WhatsAppFloat';
import { CompareBar } from '@/components/CompareBar';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Layout({ children }: { children: ReactNode }) {
  useScrollReveal();

  return (
    <div className="text-foreground min-h-screen font-space-grotesk overflow-x-hidden selection:bg-primary/20 selection:text-foreground">
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <CompareBar />
    </div>
  );
}
