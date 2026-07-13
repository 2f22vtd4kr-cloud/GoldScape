import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AiAddition } from '../AiAddition';

export const Ski = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const categories = [
    { title: 'ski_cat_1', km: '8 KM' },
    { title: 'ski_cat_2', km: '18 KM' },
    { title: 'ski_cat_3', km: '16 KM' },
  ];

  const specs = [
    { val: 'ski_spec_1_val', lbl: 'ski_spec_1_lbl' },
    { val: 'ski_spec_2_val', lbl: 'ski_spec_2_lbl' },
    { val: 'ski_spec_3_val', lbl: 'ski_spec_3_lbl' },
    { val: 'ski_spec_4_val', lbl: 'ski_spec_4_lbl' },
    { val: 'ski_spec_5_val', lbl: 'ski_spec_5_lbl' },
    { val: 'ski_spec_6_val', lbl: 'ski_spec_6_lbl' },
    { val: 'ski_spec_7_val', lbl: 'ski_spec_7_lbl' },
  ];

  return (
    <section id="ski" className="py-20 bg-background" ref={ref}>
      <div className="w-full px-8 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

          {/* Image — grayscale → color on hover */}
          <motion.div
            className="order-2 lg:order-1 relative aspect-[3/4] lg:aspect-square overflow-hidden"
            initial={{ x: -50, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <motion.img
              src="/images/ski.jpg"
              alt="Skiing in Caucasus"
              className="absolute inset-0 w-full h-[120%] object-cover object-center transition-all duration-[1200ms] grayscale hover:grayscale-0 brightness-75 hover:brightness-90"
              style={{ y: imageY }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </motion.div>

          <div className="order-1 lg:order-2 flex flex-col justify-center">
            {/* Editorial section label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-8"
            >
              02 / {t('ski_title')}
            </motion.p>

            {/* Framing sentence — hidden on mobile to reduce density */}
            <div className="hidden md:block">
              <motion.p
                initial={{ y: 16, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 16, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="font-serif text-white/55 text-base leading-relaxed mb-10 max-w-sm"
              >
                {t('ski_framing')}
              </motion.p>
            </div>

            {/* Run categories */}
            <div className="flex flex-col border-t border-white/8">
              {categories.map((cat, i) => (
                <motion.div
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="group border-b border-white/8 py-4 md:py-6 flex flex-row items-end justify-between hover:border-white/30 transition-colors"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[9px] text-primary/60 tracking-widest">0{i + 1}</span>
                    <h3 className="font-serif text-xl md:text-5xl text-white/80 group-hover:text-white transition-colors">
                      {t(cat.title)}
                    </h3>
                  </div>
                  <span className="font-mono text-xs tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                    {cat.km}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Specs grid — 2 cols on mobile (only first 4), 3 cols on desktop (all 7) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 pt-6 border-t border-white/8"
            >
              {/* Mobile: show 4 specs */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:hidden">
                {specs.slice(0, 4).map((spec, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display text-xl text-white mb-1 leading-none">
                      {t(spec.val)}
                    </span>
                    <span className="font-mono text-[8px] text-muted-foreground uppercase tracking-widest leading-tight">
                      {t(spec.lbl)}
                    </span>
                  </div>
                ))}
              </div>
              {/* Desktop: show all 7 specs */}
              <div className="hidden md:grid grid-cols-3 gap-x-6 gap-y-7">
                {specs.map((spec, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="font-display text-2xl text-white mb-1 leading-none">
                      {t(spec.val)}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest leading-tight">
                      {t(spec.lbl)}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
        <AiAddition sectionKey="ski_ai" className="hidden md:block" />
      </div>
    </section>
  );
};
