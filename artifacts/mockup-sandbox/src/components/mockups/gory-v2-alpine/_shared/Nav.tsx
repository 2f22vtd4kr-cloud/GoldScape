import React from 'react';

export default function Nav() {
  return (
    <nav className="flex justify-between items-center py-8 px-6 md:px-12 text-sm-mono text-[var(--text-secondary)] z-50 relative border-b border-[var(--border-color)]">
      <div className="flex gap-8 md:gap-12 w-1/3">
        <a href="/__mockup/preview/gory-v2-alpine/Ski" className="hover:text-[var(--text-primary)] transition-colors">Ski</a>
        <a href="/__mockup/preview/gory-v2-alpine/Stay" className="hover:text-[var(--text-primary)] transition-colors">Stay</a>
      </div>
      <div className="w-1/3 flex justify-center">
        <a href="/__mockup/preview/gory-v2-alpine/Home" className="font-serif text-3xl tracking-[0.15em] text-[var(--text-primary)] normal-case">GORY</a>
      </div>
      <div className="flex gap-8 md:gap-12 w-1/3 justify-end">
        <a href="#vision" className="hover:text-[var(--text-primary)] transition-colors hidden md:block">Vision</a>
        <a href="#inquire" className="hover:text-[var(--text-primary)] transition-colors">Inquire</a>
      </div>
    </nav>
  );
}