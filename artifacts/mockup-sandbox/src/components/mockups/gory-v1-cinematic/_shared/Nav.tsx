import React, { useState, useEffect } from 'react';
import '../_group.css';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/90 backdrop-blur-md gory-border-b py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="/__mockup/preview/gory-v1-cinematic/Home" className="gory-font-serif text-2xl tracking-widest uppercase hover:text-[var(--gory-accent)] transition-colors duration-300">
          Gory
        </a>
        <div className="flex items-center gap-8 text-sm uppercase tracking-widest gory-font-mono text-[var(--gory-text-muted)]">
          <a href="/__mockup/preview/gory-v1-cinematic/Ski" className="hover:text-white transition-colors duration-300">Ski</a>
          <a href="/__mockup/preview/gory-v1-cinematic/Stay" className="hover:text-white transition-colors duration-300">Stay</a>
          <div className="flex gap-2 ml-4">
            <span className="text-white">EN</span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer transition-colors duration-300">RU</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
