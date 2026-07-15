import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './_group.css';
import { PropertyHeroAndMap } from './_shared/PropertyContext';
import { GALLERY_ITEMS, type GalleryItem } from './_shared/galleryData';

function Pill({ item, active, onClick }: { item: GalleryItem; active: boolean; onClick: () => void }) {
  const isEasterEgg = item.category === 'easter-egg';
  return (
    <button
      onClick={onClick}
      className={[
        'shrink-0 min-h-[44px] px-4 rounded-full font-oxanium text-[12px] uppercase tracking-wider transition-all duration-300 border flex items-center gap-1.5 whitespace-nowrap',
        active
          ? 'bg-white text-black border-white'
          : isEasterEgg
            ? 'border-white/15 text-white/70 hover:text-white hover:border-white/30 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent'
            : 'border-white/10 text-white/60 hover:text-white hover:border-white/25',
      ].join(' ')}
    >
      {isEasterEgg && <Sparkles className={`w-3 h-3 ${active ? 'text-black' : 'text-amber-300'}`} />}
      {item.tabLabel}
    </button>
  );
}

export function TabbedCrossfade() {
  const [activeId, setActiveId] = useState(GALLERY_ITEMS[0].id);
  const active = GALLERY_ITEMS.find((g) => g.id === activeId)!;

  return (
    <div className="pg-root dark">
      <PropertyHeroAndMap />

      {/* ─── NEW: Внутри объекта — close-up isometric gallery ────────── */}
      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 border-b border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="font-oxanium text-xl md:text-2xl font-semibold chrome-text tracking-tight mb-1">
                Внутри объекта
              </h2>
              <p className="text-gray-500 font-space-grotesk text-sm max-w-xl">
                Изометрические 3D-визуализации каждого этажа, экстерьера и жизни в этом доме —
                сгенерированы специально для этого объекта.
              </p>
            </div>
          </div>

          {/* Category pills — horizontally scrollable on mobile */}
          <div className="flex gap-2 overflow-x-auto pb-1 mb-5 -mx-1 px-1 [&::-webkit-scrollbar]:hidden">
            {GALLERY_ITEMS.map((item) => (
              <Pill key={item.id} item={item} active={item.id === activeId} onClick={() => setActiveId(item.id)} />
            ))}
          </div>

          {/* Main crossfade stage */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a]">
            <div className="relative aspect-[16/10] md:aspect-[21/11] overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 50% 45%, rgba(139,94,26,0.12), transparent 60%)' }}
              />
              <AnimatePresence mode="wait">
                <motion.img
                  key={active.id}
                  src={active.image}
                  alt={active.title}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
                  className="absolute inset-0 w-full h-full object-contain scale-[1.05] drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
                />
              </AnimatePresence>

              {active.category === 'easter-egg' && (
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-amber-300/30 rounded-full px-3 py-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span className="iridescent-text text-[9px] font-oxanium font-bold uppercase tracking-[0.2em]">Пасхалка</span>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id + '-caption'}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="p-6 md:p-8 border-t border-white/5"
              >
                <h3 className="font-oxanium text-base md:text-lg font-semibold text-white mb-1.5">{active.title}</h3>
                <p className="text-gray-400 font-space-grotesk text-sm leading-relaxed max-w-2xl">{active.caption}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Thumbnail strip for quick scanning */}
          <div className="flex gap-3 overflow-x-auto mt-4 pb-1 [&::-webkit-scrollbar]:hidden">
            {GALLERY_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveId(item.id)}
                className={[
                  'relative shrink-0 w-24 md:w-28 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all bg-[#0f0f0f]',
                  item.id === activeId ? 'border-white/70' : 'border-white/10 opacity-60 hover:opacity-90',
                ].join(' ')}
              >
                <img src={item.image} alt={item.tabLabel} className="absolute inset-0 w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default TabbedCrossfade;
