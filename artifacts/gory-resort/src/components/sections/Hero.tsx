import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

export const Hero = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const letterVariants = prefersReducedMotion
    ? undefined
    : { hidden: { y: 48, opacity: 0 }, visible: { y: 0, opacity: 1 } };

  const wordmark = 'GORY'.split('');

  const scrollToSection = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div
      ref={ref}
      className="relative h-[100dvh] w-full overflow-hidden"
      style={{ background: '#050505' }}
    >
      {/* Background photo — cinematic letterbox reveal + parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y }}
        initial={prefersReducedMotion ? false : { clipPath: 'inset(50% 0 50% 0)' }}
        animate={{ clipPath: 'inset(0% 0 0% 0)' }}
        transition={{ duration: 1.6, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/40 z-10" />
        <img
          src="/images/hero.jpg"
          alt="GORY Resort Mountains"
          fetchPriority="high"
          decoding="sync"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        {/* GORY wordmark — letter-by-letter stagger, delayed after letterbox */}
        {prefersReducedMotion || !letterVariants ? (
          <div className="flex font-display text-[20vw] md:text-[16vw] leading-none tracking-[0.15em] text-white select-none ml-[0.15em]">
            {wordmark.map((letter, i) => (
              <span key={i}>{letter}</span>
            ))}
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.09, delayChildren: 0.9 }}
            className="flex font-display text-[20vw] md:text-[16vw] leading-none tracking-[0.15em] text-white select-none ml-[0.15em]"
          >
            {wordmark.map((letter, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                transition={{ duration: 0.65, ease: [0.215, 0.61, 0.355, 1] }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Tagline + sub + minimal text CTAs */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="mt-8 flex flex-col items-center space-y-4 text-center"
        >
          <p className="font-mono text-[9px] md:text-[11px] tracking-[0.12em] md:tracking-[0.32em] uppercase text-primary">
            {t('hero_tagline')}
          </p>

          <p className="text-[10px] tracking-[0.18em] text-white/30 uppercase">
            {t('hero_sub')}
          </p>

          {/* Minimal text-only CTAs separated by accent pip */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="flex items-center gap-6 pt-3"
          >
            <button
              onClick={() => scrollToSection('vision')}
              className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/40 hover:text-primary transition-colors duration-500"
            >
              {t('hero_cta_discover')}
            </button>
            <span className="w-px h-3 bg-white/15" />
            <button
              onClick={() => scrollToSection('invest')}
              className="font-mono text-[9px] tracking-[0.25em] uppercase text-white/40 hover:text-primary transition-colors duration-500"
            >
              {t('hero_cta_invest')}
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator — thin accent line only */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.3, duration: 0.6 }}
      >
        <motion.div
          className="w-px bg-gradient-to-b from-primary/50 to-transparent"
          initial={prefersReducedMotion ? false : { height: 0 }}
          animate={{ height: 48 }}
          transition={{ duration: 1, delay: 2.4, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  );
};
