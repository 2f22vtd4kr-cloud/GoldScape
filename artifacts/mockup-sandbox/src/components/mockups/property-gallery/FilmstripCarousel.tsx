import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import './_group.css';
import { PropertyHeroAndMap } from './_shared/PropertyContext';
import { GALLERY_ITEMS } from './_shared/galleryData';

const CATEGORY_LABEL: Record<string, string> = {
  layout: 'Планировка',
  floor: 'Этаж',
  exterior: 'Экстерьер',
  lifestyle: 'Из жизни',
  'easter-egg': 'Пасхалка',
};

export function FilmstripCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(GALLERY_ITEMS.length - 1, i));
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[clamped] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const { scrollLeft, clientWidth } = track;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(track.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const dist = Math.abs(el.offsetLeft - scrollLeft - (el.clientWidth - clientWidth) / -2 - (clientWidth - el.clientWidth) / 2);
        const center = el.offsetLeft + el.clientWidth / 2;
        const viewCenter = scrollLeft + clientWidth / 2;
        const d = Math.abs(center - viewCenter);
        if (d < closestDist) { closestDist = d; closest = i; }
      });
      setActive(closest);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="pg-root dark">
      <PropertyHeroAndMap />

      {/* ─── NEW: Внутри объекта — filmstrip carousel gallery ─────────── */}
      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 border-b border-white/5">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
            <div>
              <h2 className="font-oxanium text-xl md:text-2xl font-semibold chrome-text tracking-tight mb-1">
                Внутри объекта
              </h2>
              <p className="text-gray-500 font-space-grotesk text-sm max-w-xl">
                Пролистайте изометрические визуализации каждого этажа, экстерьера и жизни в этом доме.
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollToIndex(active - 1)}
                aria-label="Предыдущий слайд"
                className="glass-icon-btn w-10 h-10 text-white/70 hover:text-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToIndex(active + 1)}
                aria-label="Следующий слайд"
                className="glass-icon-btn w-10 h-10 text-white/70 hover:text-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filmstrip — scroll-snap horizontal carousel */}
          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 -mx-1 px-1 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none' }}
          >
            {GALLERY_ITEMS.map((item, i) => (
              <div
                key={item.id}
                className={[
                  'relative shrink-0 snap-center rounded-2xl overflow-hidden border transition-all duration-300',
                  'w-[86%] md:w-[62%]',
                  i === active ? 'border-white/20 opacity-100' : 'border-white/5 opacity-50',
                ].join(' ')}
              >
                <div className="relative aspect-[16/10] bg-[#0a0a0a]">
                  <div
                    className="absolute inset-0"
                    style={{ background: 'radial-gradient(circle at 50% 45%, rgba(139,94,26,0.12), transparent 60%)' }}
                  />
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain scale-[1.05] drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
                  />
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5">
                    {item.category === 'easter-egg' && <Sparkles className="w-3 h-3 text-amber-300" />}
                    <span className={item.category === 'easter-egg' ? 'iridescent-text text-[9px] font-oxanium font-bold uppercase tracking-[0.2em]' : 'text-white/70 text-[10px] font-oxanium uppercase tracking-[0.15em]'}>
                      {CATEGORY_LABEL[item.category]}
                    </span>
                  </div>
                </div>
                <div className="p-5 border-t border-white/5 bg-[#0c0c0c]">
                  <h3 className="font-oxanium text-sm md:text-base font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-gray-400 font-space-grotesk text-[13px] leading-relaxed">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {GALLERY_ITEMS.map((item, i) => (
              <button
                key={item.id}
                onClick={() => scrollToIndex(i)}
                aria-label={`Слайд ${i + 1}: ${item.tabLabel}`}
                className={[
                  'h-1.5 rounded-full transition-all duration-300',
                  i === active ? 'w-6 bg-white' : 'w-1.5 bg-white/25 hover:bg-white/40',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default FilmstripCarousel;
