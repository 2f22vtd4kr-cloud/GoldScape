import type { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export function Layout({ children }: { children: ReactNode }) {
  useScrollReveal();

  return (
    <div className="bg-[#080808] text-white min-h-screen font-space-grotesk overflow-x-hidden selection:bg-white/20 selection:text-white">
      <Navigation />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
