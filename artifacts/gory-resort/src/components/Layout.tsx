import type { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Layout({ children }: { children: ReactNode }) {
  useScrollReveal();

  return (
    <div className="text-white min-h-screen font-space-grotesk overflow-x-hidden selection:bg-white/20 selection:text-white">
      <div className="grain-overlay" aria-hidden="true" />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
