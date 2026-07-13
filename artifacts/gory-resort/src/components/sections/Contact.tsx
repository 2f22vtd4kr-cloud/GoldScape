import React, { useState, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useInView } from 'framer-motion';
import { AiAddition } from '../AiAddition';

type InterestType = 'investor' | 'guest' | 'media' | '';

export const Contact = () => {
  const { t } = useLanguage();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedInterest, setSelectedInterest] = useState<InterestType>('');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 4000);
    }, 1000);
  };

  const interestOptions: { value: InterestType; labelKey: string; icon: string }[] = [
    { value: 'investor', labelKey: 'form_interest_inv', icon: '◈' },
    { value: 'guest',    labelKey: 'form_interest_guest', icon: '◇' },
    { value: 'media',    labelKey: 'form_interest_media', icon: '◉' },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-card border-t border-white/5" ref={ref}>
      <div className="w-full px-8 md:px-12 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">

          {/* Info Column */}
          <motion.div
            initial={{ x: -30 }}
            animate={isInView ? { x: 0 } : { x: -30 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h2 className="font-serif text-4xl md:text-7xl text-white mb-8 md:mb-12">
                {t('form_title')}
              </h2>
              <div className="space-y-6 text-white/70 font-serif text-base md:text-lg">
                <p className="max-w-sm text-balance leading-relaxed">
                  {t('footer_address')}
                </p>
                <p>
                  <a href="mailto:invest@gory.ge" className="hover:text-white transition-colors link-underline">
                    invest@gory.ge
                  </a>
                </p>
                <p>
                  <a href="tel:+995322000000" className="hover:text-white transition-colors link-underline">
                    +995 322 000 000
                  </a>
                </p>
              </div>

              {/* Schedule CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-10"
              >
                <a
                  href="mailto:invest@gory.ge?subject=Private%20Presentation%20Request"
                  className="inline-block text-xs tracking-[0.2em] uppercase text-white/40 hover:text-white/80 transition-colors border-b border-white/15 hover:border-white/40 pb-1"
                >
                  {t('contact_schedule_cta')}
                </a>
              </motion.div>
            </div>

            <div className="mt-20 lg:mt-0">
              <span className="font-display text-4xl tracking-[0.2em] text-white/20">GORY</span>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ y: 30 }}
            animate={isInView ? { y: 0 } : { y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {status === 'success' ? (
              <div className="h-full min-h-[400px] flex items-center justify-center border border-white/10 bg-background/50 p-12 text-center">
                <p className="font-serif text-2xl text-white/80">{t('form_success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">

                {/* Visual interest card selector */}
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest text-white/50">{t('form_interest')}</label>
                  <div className="grid grid-cols-3 gap-3">
                    {interestOptions.map((opt) => {
                      const isSelected = selectedInterest === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => setSelectedInterest(opt.value)}
                          className={`flex flex-col items-center justify-center gap-2 py-4 px-2 border transition-all duration-200 ${
                            isSelected
                              ? 'border-white/50 bg-white/8 text-white'
                              : 'border-white/12 bg-transparent text-white/55 hover:border-white/28 hover:text-white/75'
                          }`}
                        >
                          <span className="text-xl leading-none">{opt.icon}</span>
                          <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
                            {t(opt.labelKey)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Hidden input to carry value */}
                  <input type="hidden" name="interest" value={selectedInterest} required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">{t('form_name')}</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50">{t('form_email')}</label>
                    <input
                      required
                      type="email"
                      className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50">{t('form_message')}</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-white resize-none focus:outline-none focus:border-white transition-colors"
                  ></textarea>
                </div>

                {/* Response time commitment — visible before submission */}
                {selectedInterest === 'investor' && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] tracking-[0.2em] uppercase text-white/25"
                  >
                    {t('contact_response_time')}
                  </motion.p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || !selectedInterest}
                  className="w-full bg-white text-black py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? '...' : t('form_submit')}
                </button>
              </form>
            )}
          </motion.div>

        </div>
        <AiAddition sectionKey="contact_ai" className="hidden md:block" />
      </div>
    </section>
  );
};
