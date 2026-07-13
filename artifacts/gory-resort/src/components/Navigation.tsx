import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver: track which section is currently in the viewport centre
  useEffect(() => {
    const sectionIds = ['vision', 'ski', 'stay', 'experiences', 'invest', 'gallery'];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'vision',      label: 'nav_vision' },
    { id: 'ski',         label: 'nav_ski' },
    { id: 'stay',        label: 'nav_stay' },
    { id: 'experiences', label: 'nav_experiences' },
    { id: 'invest',      label: 'nav_invest' },
    { id: 'gallery',     label: 'nav_gallery' },
  ];

  return (
    <>
      {/* Scroll progress bar — 1px line at very top */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1px] bg-white/50 z-[60] origin-left"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-[1px] left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-black/60 backdrop-blur-md py-4 border-b border-white/5'
            : 'bg-transparent py-8'
        }`}
      >
        <div className="w-full px-8 md:px-12 max-w-screen-xl mx-auto flex items-center justify-between">
          <div
            className="font-display text-4xl tracking-[0.2em] cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            GORY
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`relative text-xs tracking-widest uppercase font-medium pb-1 transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t(item.label)}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-white/60"
                      transition={{ type: 'spring', stiffness: 400, damping: 40 }}
                    />
                  )}
                </button>
              );
            })}

            <div className="flex items-center gap-3 text-xs font-medium border-l border-white/20 pl-6">
              <button
                onClick={() => setLanguage('en')}
                className={`transition-colors ${language === 'en' ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
              >
                EN
              </button>
              <span className="text-white/20">|</span>
              <button
                onClick={() => setLanguage('ru')}
                className={`transition-colors ${language === 'ru' ? 'text-white' : 'text-white/40 hover:text-white/80'}`}
              >
                RU
              </button>
            </div>
          </nav>

          {/* Mobile Toggle — 48×48 tap target per Fitts's Law */}
          <button
            className="md:hidden text-white p-3 -mr-3"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-6 pb-10"
          >
            <button
              className="absolute top-6 right-6 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={32} />
            </button>

            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-2xl font-serif tracking-wide transition-colors ${
                    activeSection === item.id ? 'text-white' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>

            <div className="flex justify-center gap-6 mt-auto">
              <button
                onClick={() => { setLanguage('en'); setMobileMenuOpen(false); }}
                className={`text-xl ${language === 'en' ? 'text-white font-bold' : 'text-white/40'}`}
              >
                EN
              </button>
              <button
                onClick={() => { setLanguage('ru'); setMobileMenuOpen(false); }}
                className={`text-xl ${language === 'ru' ? 'text-white font-bold' : 'text-white/40'}`}
              >
                RU
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
