import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AiAddition } from '../AiAddition';

export const Stay = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const accommodations = [
    { title: 'stay_type_1', desc: 'stay_desc_1', feat: 'stay_feat_1', price: 'stay_price_1' },
    { title: 'stay_type_2', desc: 'stay_desc_2', feat: 'stay_feat_2', price: 'stay_price_2' },
    { title: 'stay_type_3', desc: 'stay_desc_3', feat: 'stay_feat_3', price: 'stay_price_3' },
  ];

  return (
    <section id="stay" className="py-20 md:py-48 bg-background relative" ref={ref}>
      <div className="w-full px-8 md:px-12 max-w-screen-xl mx-auto">

        {/* Editorial section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-10"
        >
          03 / {t('stay_title')}
        </motion.p>

        {/* Full-width hero image — grayscale on load, color on hover */}
        <motion.div
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden mb-24 group"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <motion.img
            src="/images/stay.jpg"
            alt="Luxury Mountain Hotel"
            className="absolute inset-0 w-full h-[120%] object-cover object-center transition-all duration-[1200ms] grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-90"
            style={{ y: imageY }}
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <motion.div
            className="md:col-span-1"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-mono text-[9px] tracking-[0.25em] text-white/30 uppercase sticky top-32">
              {t('stay_title')}
            </p>
          </motion.div>

          <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {accommodations.map((acc, i) => (
              <motion.div
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                className="flex flex-col space-y-4 border-t border-white/10 pt-6"
              >
                <span className="font-mono text-[9px] tracking-[0.25em] text-primary">0{i + 1}</span>
                <h3 className="font-serif text-2xl text-white">{t(acc.title)}</h3>
                <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">{t(acc.desc)}</p>
                {/* Feature tags — hidden on mobile, too dense */}
                <div className="hidden md:flex flex-wrap pt-1">
                  {t(acc.feat).split(' · ').map((feat, j) => (
                    <span
                      key={j}
                      className="inline-block font-mono text-[9px] text-white/30 border border-white/8 px-2 py-0.5 mr-1 mb-1 leading-relaxed tracking-wider"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
                {/* Pricing */}
                <div className="pt-3 border-t border-white/8 mt-auto">
                  <span className="font-mono text-[9px] text-primary/70 tracking-widest">{t(acc.price)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <AiAddition sectionKey="stay_ai" className="hidden md:block" />
      </div>
    </section>
  );
};
