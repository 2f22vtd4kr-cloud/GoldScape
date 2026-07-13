import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

const pressItems = [
  {
    name: 'Forbes Georgia',
    detail: 'Investment Boom: Why Luxury Hotels are Flocking to Georgia',
  },
  {
    name: "The Skier's Journal",
    detail: 'Greater Caucasus — Europe\'s Last Great Ski Frontier',
  },
  {
    name: 'Georgian Tourism Awards',
    detail: 'Development Project of the Year — Nomination 2025',
  },
  {
    name: 'Condé Nast Traveller',
    detail: 'Hot List: New Mountain Destinations to Watch — 2026',
  },
  {
    name: 'Financial Times',
    detail: 'Emerging Markets Alpine: The Case for the Caucasus',
  },
];

export const PressStrip = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section id="press" ref={ref} className="py-12 border-y border-white/5 bg-black/30">
      <div className="w-full px-8 md:px-12 max-w-screen-xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="text-[9px] tracking-[0.45em] text-white/25 uppercase mb-10 text-center"
        >
          {t('press_label')}
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8">
          {pressItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`flex flex-col items-center text-center gap-2 group px-2 ${
                i === pressItems.length - 1 && pressItems.length % 2 !== 0
                  ? 'col-span-2 md:col-span-1'
                  : ''
              }`}
            >
              <span className="text-[13px] font-medium tracking-wider text-white/65 group-hover:text-white/85 transition-colors duration-300">
                {item.name}
              </span>
              <span className="text-[10px] text-white/30 leading-snug font-serif italic line-clamp-2 md:line-clamp-none">
                {item.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
