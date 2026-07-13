import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AiAddition } from '../AiAddition';

const IMAGES = [
  {
    src: '/images/gallery-noir-1.jpg',
    caption: 'LOOKING SOUTH — 3,042M SUMMIT RIDGE',
    span: 'full',
    aspect: 'aspect-[21/9]',
  },
  {
    src: '/images/gallery-noir-4.jpg',
    caption: 'ALPENGLOW — SOUTHERN FACE AT DUSK',
    span: 'half',
    aspect: 'aspect-[3/4]',
  },
  {
    src: '/images/gallery-noir-2.jpg',
    caption: 'GROOMED RUN — 2,800M DESCENT LINE',
    span: 'half',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/images/gallery-noir-5.jpg',
    caption: 'DEEP POWDER — OFF-PISTE COULOIR',
    span: 'third',
    aspect: 'aspect-square',
  },
  {
    src: '/images/gallery-noir-7.jpg',
    caption: 'AERIAL — GEOMETRIC SHADOW PATTERNS',
    span: 'third',
    aspect: 'aspect-square',
  },
  {
    src: '/images/gallery-noir-3.jpg',
    caption: 'LAYERED RIDGELINES — KAZBEGI DISTRICT',
    span: 'third',
    aspect: 'aspect-square',
  },
  {
    src: '/images/gallery-noir-8.jpg',
    caption: 'APPROACHING STORM — 320CM ANNUAL SNOWFALL',
    span: 'full',
    aspect: 'aspect-[21/9]',
  },
  {
    src: '/images/gallery-noir-6.jpg',
    caption: 'HIGH-ALTITUDE LODGE CONCEPT — PHASE I',
    span: 'half',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/images/ski.jpg',
    caption: 'THE SLOPE — GREATER CAUCASUS',
    span: 'half',
    aspect: 'aspect-[4/3]',
  },
  {
    src: '/images/gallery-1.jpg',
    caption: 'INTERIOR CONCEPT — MOUNTAIN SUITE',
    span: 'third',
    aspect: 'aspect-square',
  },
  {
    src: '/images/gallery-2.jpg',
    caption: 'GONDOLA — SUMMIT APPROACH',
    span: 'third',
    aspect: 'aspect-square',
  },
  {
    src: '/images/gallery-5.jpg',
    caption: 'EXPERT TERRAIN — BACKCOUNTRY BOWL',
    span: 'third',
    aspect: 'aspect-square',
  },
];

const milestones = [1, 2, 3, 4] as const;

export const Gallery = () => {
  const { t } = useLanguage();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const full = IMAGES.filter(i => i.span === 'full');
  const half = IMAGES.filter(i => i.span === 'half');
  const third = IMAGES.filter(i => i.span === 'third');

  const renderImg = (
    img: typeof IMAGES[number],
    index: number,
    delay = 0,
  ) => (
    <motion.div
      key={img.src}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.9, delay, ease: [0.25, 1, 0.5, 1] }}
      className={`relative overflow-hidden cursor-pointer group ${img.aspect}`}
      onClick={() => setSelectedImg(img.src)}
    >
      <img
        src={img.src}
        alt={img.caption}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 brightness-90"
      />
      {/* Persistent vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Caption — always visible at bottom */}
      <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
        <p className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] text-white/55 uppercase leading-snug group-hover:text-white/90 transition-colors duration-500">
          {img.caption}
        </p>
      </div>
    </motion.div>
  );

  return (
    <section id="gallery" className="py-24 md:py-32 bg-background" ref={ref}>
      <div className="w-full px-8 md:px-12 max-w-screen-xl mx-auto">

        {/* Section header — Cinematic Noir editorial style */}
        <div className="flex items-end justify-between mb-10 md:mb-14 border-b border-white/8 pb-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-4">
              04 / GALLERY
            </p>
            <h2
              className="text-4xl md:text-6xl text-white leading-none"
              style={{ fontFamily: "'Playfair Display', serif", fontWeight: 400 }}
            >
              The Terrain —<br />
              <em style={{ fontStyle: 'italic', color: 'hsl(var(--muted-foreground))' }}>Unedited.</em>
            </h2>
          </div>
          <p className="hidden md:block font-mono text-[9px] tracking-[0.2em] text-white/30 uppercase text-right max-w-[200px] leading-relaxed">
            All photography<br />
            Greater Caucasus<br />
            Kazbegi District<br />
            2,800m – 3,042m
          </p>
        </div>

        {/* Row 1: Full-width aerial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="mb-3 relative overflow-hidden cursor-pointer group aspect-[16/9] md:aspect-[21/9]"
          onClick={() => setSelectedImg(IMAGES[0].src)}
        >
          <img src={IMAGES[0].src} alt={IMAGES[0].caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103 brightness-90" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 inset-x-0 p-5 md:p-8">
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] text-white/55 uppercase group-hover:text-white/90 transition-colors duration-500">
              {IMAGES[0].caption}
            </p>
          </div>
        </motion.div>

        {/* Row 2: portrait + landscape */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-3">
          <div className="md:col-span-2">
            {renderImg(IMAGES[1], 1, 0.1)}
          </div>
          <div className="md:col-span-3">
            {renderImg(IMAGES[2], 2, 0.15)}
          </div>
        </div>

        {/* Row 3: three equal squares */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          {[IMAGES[3], IMAGES[4], IMAGES[5]].map((img, i) => (
            <div key={img.src}>{renderImg(img, i + 3, 0.2 + i * 0.05)}</div>
          ))}
        </div>

        {/* Row 4: full-width storm */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
          className="mb-3 relative overflow-hidden cursor-pointer group aspect-[16/9] md:aspect-[21/9]"
          onClick={() => setSelectedImg(IMAGES[6].src)}
        >
          <img src={IMAGES[6].src} alt={IMAGES[6].caption} className="w-full h-full object-cover brightness-80 transition-transform duration-700 group-hover:scale-103" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 inset-x-0 p-5 md:p-8">
            <p className="font-mono text-[9px] md:text-[10px] tracking-[0.22em] text-white/55 uppercase group-hover:text-white/90 transition-colors duration-500">
              {IMAGES[6].caption}
            </p>
          </div>
        </motion.div>

        {/* Row 5: two halves */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          {[IMAGES[7], IMAGES[8]].map((img, i) => (
            <div key={img.src}>{renderImg(img, i + 7, 0.4 + i * 0.05)}</div>
          ))}
        </div>

        {/* Row 6: three squares — original resort shots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-16">
          {[IMAGES[9], IMAGES[10], IMAGES[11]].map((img, i) => (
            <div key={img.src}>{renderImg(img, i + 9, 0.5 + i * 0.05)}</div>
          ))}
        </div>

        <AiAddition sectionKey="gallery_ai" className="hidden md:block" />

        {/* Behind the Build — construction timeline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 pt-12 border-t border-white/8"
        >
          <p className="font-mono text-[10px] tracking-[0.3em] text-primary uppercase mb-12">
            {t('gallery_progress_label')}
          </p>

          <div className="relative max-w-2xl">
            <div className="absolute left-[6px] top-3 bottom-3 w-px bg-white/8" />
            {milestones.map((n, i) => {
              const isLast = i === milestones.length - 1;
              return (
                <motion.div
                  key={n}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.7 + i * 0.12 }}
                  className="relative pl-8 mb-9 last:mb-0"
                >
                  <div
                    className={`absolute left-0 top-[5px] w-3 h-3 rounded-full border ${
                      isLast ? 'border-white/15 bg-transparent' : 'border-primary/50 bg-primary/10'
                    }`}
                  />
                  <p className="text-xs text-white/40 leading-relaxed">{t(`gallery_milestone_${n}`)}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* The Film — teaser */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-14 border border-white/8 bg-white/[0.02] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center gap-8"
        >
          <div className="flex-1">
            <p className="font-mono text-[9px] tracking-[0.35em] text-muted-foreground uppercase mb-3">
              {t('gallery_film_label')}
            </p>
            <p className="text-sm text-white/45 leading-relaxed font-serif italic">
              {t('gallery_film_desc')}
            </p>
          </div>
          <div className="shrink-0 border border-primary/30 px-6 py-3">
            <span className="font-mono text-[9px] tracking-[0.25em] text-primary/60 uppercase">Coming 2026</span>
          </div>
        </motion.div>

      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/97 backdrop-blur-sm p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <button
              className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              src={selectedImg}
              alt="Gallery Fullscreen"
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
