import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { AiAddition } from '../AiAddition';

export const Investment = () => {
  const { t, language } = useLanguage();
  const isRu = language === 'ru';
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const tiers = [
    { title: 'inv_tier_1_title', desc: 'inv_tier_1_desc', ret: 'inv_tier_1_ret', index: 0 },
    { title: 'inv_tier_2_title', desc: 'inv_tier_2_desc', ret: 'inv_tier_2_ret', index: 1 },
    { title: 'inv_tier_3_title', desc: 'inv_tier_3_desc', ret: 'inv_tier_3_ret', index: 2 },
  ];

  const structure = [
    { label: 'inv_timeline_label', value: 'inv_timeline' },
    { label: 'inv_exit_label',     value: 'inv_exit' },
    { label: 'inv_legal_label',    value: 'inv_legal' },
  ];

  const timeline = [
    { year: '2024', en: 'Land secured. Planning approved. Site surveys complete.', ru: 'Земля приобретена. Планирование одобрено. Топографические съёмки завершены.' },
    { year: '2025', en: 'Infrastructure & gondola construction begins. Phase I groundbreak.', ru: 'Начало строительства инфраструктуры и гондолы. Старт первой очереди.' },
    { year: '2026', en: 'Vertical build Phase I. Resort shell and first accommodation units.', ru: 'Вертикальное строительство I очереди. Корпус курорта и первые юниты.' },
    { year: 'Q4 2027', en: 'Grand Opening — Phase I. Ski season inaugurated.', ru: 'Торжественное открытие — I очередь. Старт горнолыжного сезона.', highlight: true },
    { year: '2028–30', en: 'Phase II & III expansion. Additional accommodation and facilities.', ru: 'Расширение II и III очереди. Дополнительные объекты размещения.' },
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="invest" className="relative py-20 md:py-48 overflow-hidden" ref={ref}>
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <img
          src="/images/investment.jpg"
          alt="Construction Site"
          className="w-full h-[130%] object-cover object-center grayscale hover:grayscale-0 transition-all duration-[3s]"
        />
        <div className="absolute inset-0 bg-black/82 backdrop-blur-[2px]" />
      </motion.div>

      <div className="relative z-10 w-full px-8 md:px-12 max-w-screen-xl mx-auto">

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-10"
        >
          03 / INVEST
        </motion.p>

        {/* Market validation banner — Rotana/Gudauri signal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-16 border-l-2 border-primary pl-6 md:pl-8 py-2"
        >
          <p className="font-mono text-[9px] tracking-[0.25em] text-primary uppercase mb-2">
            {isRu ? 'РЫНОЧНЫЙ СИГНАЛ — ИЮЛЬ 2026' : 'MARKET SIGNAL — JULY 2026'}
          </p>
          <p
            className="hidden md:block text-3xl text-white/90 leading-snug mb-3 max-w-3xl"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            {isRu
              ? 'Rotana Hotels — 100+ объектов по всему миру — приобрела курорт Гудаури. Первый институциональный игрок на горнолыжном рынке Грузии. GORY строился с самого начала.'
              : 'Rotana Hotels — 100+ properties worldwide — acquired Gudauri, Georgia\'s leading ski resort. The first institutional hospitality group to enter the Georgian ski market. GORY was already building.'}
          </p>
          <p
            className="md:hidden text-sm text-white/75 leading-snug mb-3"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
          >
            {isRu
              ? 'Rotana Hotels приобрела Гудаури. Первый институциональный игрок на горнолыжном рынке Грузии.'
              : 'Rotana Hotels acquired Gudauri — the first institutional hospitality group to enter the Georgian ski market.'}
          </p>
          <p className="font-mono text-[9px] tracking-[0.15em] text-white/35 uppercase break-words">
            {isRu
              ? 'Gudauri: 2 200м · GORY: 3 042м — на 840м выше'
              : 'Gudauri: 2,200m · GORY: 3,042m — 840m higher'}
          </p>
        </motion.div>

        {/* Key stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 border border-white/10 bg-black/30 backdrop-blur-sm mb-16"
        >
          {[
            { val: '3,042M', lbl: isRu ? 'Высочайший курорт\nБольшого Кавказа' : 'Highest ski resort\nin the Greater Caucasus' },
            { val: '320CM', lbl: isRu ? 'Годовой снегопад\nна 60% выше Гудаури' : 'Annual snowfall\n60% more than Gudauri' },
            { val: 'Q4 2027', lbl: isRu ? 'Открытие I очереди\nПредпродажи открыты' : 'Phase I opening\nPre-sales now open' },
            { val: '0%', lbl: isRu ? 'Налог на прирост\nкапитала, Грузия' : 'Capital gains tax\nGeorgia' },
          ].map((s, i) => (
            <div
              key={i}
              className={`px-6 md:px-8 py-6 md:py-8 ${i > 0 ? 'border-t md:border-t-0 md:border-l border-white/8' : ''}`}
            >
              <p
                className="text-3xl md:text-4xl text-primary mb-2 leading-none"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}
              >
                {s.val}
              </p>
              <p className="font-mono text-[9px] tracking-[0.15em] text-white/40 uppercase whitespace-pre-line leading-relaxed">
                {s.lbl}
              </p>
            </div>
          ))}
        </motion.div>

        <div className="max-w-3xl mb-16">
          <motion.h2
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : { y: 20 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-4xl md:text-7xl text-white mb-6 md:mb-8"
          >
            {t('inv_title')}
          </motion.h2>
          <motion.p
            initial={{ y: 20 }}
            animate={isInView ? { y: 0 } : { y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-xl text-white/70 leading-relaxed font-serif"
          >
            {t('inv_subhead')}
          </motion.p>
        </div>

        {/* Investment tiers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {tiers.map((tier) => (
            <motion.div
              key={tier.index}
              initial={{ y: 30 }}
              animate={isInView ? { y: 0 } : { y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 + tier.index * 0.1 }}
              className="bg-black/40 border border-white/10 p-5 md:p-10 backdrop-blur-md flex flex-col justify-between hover:bg-black/60 hover:border-primary/40 transition-all duration-300 group"
            >
              <div>
                <h3 className="font-display text-2xl md:text-3xl tracking-widest text-white mb-4 group-hover:text-primary transition-colors">
                  {t(tier.title)}
                </h3>
                <p className="text-white/60 font-serif italic text-sm md:text-lg mb-4 md:mb-6">{t(tier.desc)}</p>
                {tier.index === 2 && (
                  <div className="mb-6">
                    <p className="text-[9px] text-white/25 uppercase tracking-[0.25em] mb-2">Membership includes</p>
                    <p className="text-[10px] text-white/40 leading-relaxed">{t('inv_tier_3_benefits')}</p>
                  </div>
                )}
              </div>
              <div className="pt-5 border-t border-white/10 mt-auto">
                <span className="text-xs uppercase tracking-widest text-primary font-medium">
                  {t(tier.ret)}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Scarcity signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="text-center font-mono text-[10px] text-white/30 tracking-[0.2em] uppercase mb-14"
        >
          {t('inv_scarcity')}
        </motion.p>

        {/* Investment structure strip */}
        <motion.div
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : { y: 20 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-12 border border-white/8 bg-black/30 backdrop-blur-sm p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          <div className="md:col-span-3 mb-2">
            <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.3em]">{t('inv_structure_label')}</p>
          </div>
          {structure.map((item, i) => (
            <div key={i} className={i > 0 ? 'md:border-l md:border-white/8 md:pl-8' : ''}>
              <p className="font-mono text-[10px] text-white/35 uppercase tracking-widest mb-2">{t(item.label)}</p>
              <p className="text-xs text-white/55 leading-relaxed">{t(item.value)}</p>
            </div>
          ))}
        </motion.div>

        {/* Management team + IRR */}
        <motion.div
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : { y: 20 }}
          transition={{ duration: 0.8, delay: 0.95 }}
          className="hidden md:grid mb-14 border border-white/8 bg-black/30 backdrop-blur-sm p-6 md:p-8 grid-cols-1 md:grid-cols-2 gap-6 md:gap-12"
        >
          <div>
            <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.3em] mb-4">{t('inv_team_label')}</p>
            <p className="text-sm text-white/70 font-semibold mb-2">{t('inv_developer_name')}</p>
            <p className="text-xs text-white/45 leading-relaxed">{t('inv_developer_desc')}</p>
          </div>
          <div className="md:border-l md:border-white/8 md:pl-12">
            <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.3em] mb-4">{t('inv_irr_label')}</p>
            <p className="text-xs text-white/45 leading-relaxed">{t('inv_irr_desc')}</p>
          </div>
        </motion.div>

        {/* Development timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-14"
        >
          <p className="font-mono text-[10px] text-white/25 uppercase tracking-[0.3em] mb-8">
            {isRu ? 'ВРЕМЕННАЯ ШКАЛА РАЗВИТИЯ' : 'DEVELOPMENT TIMELINE'}
          </p>
          <div className="relative">
            {/* Horizontal connector line — desktop */}
            <div className="hidden md:block absolute top-[22px] left-0 right-0 h-px bg-white/8" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 md:gap-4">
              {timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1.1 + i * 0.08 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className={`hidden md:block absolute top-[17px] left-0 w-3 h-3 rounded-full border ${
                    item.highlight ? 'border-primary bg-primary/20' : 'border-white/20 bg-transparent'
                  }`} />
                  <div className="md:pt-10 md:pl-5">
                    <p className={`font-mono text-[10px] tracking-widest uppercase mb-2 ${
                      item.highlight ? 'text-primary' : 'text-white/35'
                    }`}>
                      {item.year}
                    </p>
                    <p className="text-[11px] text-white/50 leading-relaxed">
                      {isRu ? item.ru : item.en}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20 }}
          animate={isInView ? { y: 0 } : { y: 20 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="text-center"
        >
          <button
            onClick={scrollToContact}
            className="bg-white text-black px-10 py-5 text-sm uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-white transition-colors duration-300"
          >
            {t('inv_cta')}
          </button>
          <p className="font-mono text-[9px] text-white/25 tracking-[0.2em] uppercase mt-4">
            {isRu
              ? 'Минимальный объём инвестиций: $500 000 · Строгая конфиденциальность'
              : 'Minimum qualifying investment: $500,000 · Strict NDA applies'}
          </p>
        </motion.div>

        <AiAddition sectionKey="investment_ai" className="hidden md:block" />
      </div>
    </section>
  );
};
