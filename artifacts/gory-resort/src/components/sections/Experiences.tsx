import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { AiAddition } from '../AiAddition';

export const Experiences = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    { key: 'exp_3', descKey: 'exp_desc_3' }, // Heliskiing — lead differentiator
    { key: 'exp_1', descKey: 'exp_desc_1' }, // Skiing & Snowboarding
    { key: 'exp_2', descKey: 'exp_desc_2' }, // Wellness & Spa
    { key: 'exp_4', descKey: 'exp_desc_4' }, // Georgian Gastronomy
    { key: 'exp_5', descKey: 'exp_desc_5' }, // Alpine Summer
  ];

  return (
    <section id="experiences" className="py-20 bg-card scroll-mt-16" ref={ref}>
      <div className="w-full px-8 md:px-12 max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-24">

          <div className="w-full md:w-1/3 flex flex-col justify-center">
            {/* Editorial section label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-12"
            >
              05 / {t('exp_title')}
            </motion.p>

            {/* Experience list — editorial bordered rows */}
            <div className="flex flex-col border-t border-white/8">
              {experiences.map((exp, i) => (
                <motion.div
                  key={exp.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="group py-5 border-b border-white/8 hover:pl-2 transition-all duration-300 cursor-default"
                >
                  <div className="flex items-baseline gap-4 mb-2">
                    <span className="font-mono text-[9px] text-primary/50 tracking-widest">0{i + 1}</span>
                    <h3 className="font-serif text-xl md:text-3xl text-white/70 group-hover:text-white transition-colors">
                      {t(exp.key)}
                    </h3>
                  </div>
                  <p className="hidden md:block font-mono text-[9px] text-white/30 leading-relaxed max-w-xs tracking-wider pl-7">
                    {t(exp.descKey)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image — grayscale → color on hover */}
          <motion.div
            className="w-full md:w-2/3 relative aspect-square md:aspect-[4/3] overflow-hidden group"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <img
              src="/images/experiences.jpg"
              alt="Luxury Spa"
              className="w-full h-full object-cover transition-all duration-[1200ms] grayscale group-hover:grayscale-0 brightness-75 group-hover:brightness-90 group-hover:scale-105"
            />
          </motion.div>

        </div>
        <AiAddition sectionKey="experiences_ai" className="hidden md:block" />
      </div>
    </section>
  );
};
