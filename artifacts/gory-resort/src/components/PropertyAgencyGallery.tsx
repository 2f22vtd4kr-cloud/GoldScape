/**
 * PropertyAgencyGallery
 *
 * Displays real agency photos fetched from the listing's original source.
 * Shown above the AI visualisation carousel so buyers see the real property first.
 *
 * Features:
 *  - Touch swipe on mobile
 *  - Keyboard arrow navigation
 *  - Badge + agency link in a single non-overlapping top bar
 *  - Nav arrows always subtly visible (not hidden-until-hover on touch devices)
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera, ExternalLink } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1] as const;
const SWIPE_THRESHOLD = 40; // px

interface Props {
  photos: string[];
  agency: string;
  agencyUrl?: string;
  accent?: string;
}

function PhotoThumb({
  src, alt, isActive, isHovered, accent, onClick, onEnter, onLeave, idx,
}: {
  src: string; alt: string; isActive: boolean; isHovered: boolean;
  accent: string; onClick: () => void; onEnter: () => void; onLeave: () => void; idx: number;
}) {
  return (
    <button
      data-photo-idx={idx}
      onClick={onClick}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg"
      style={{ width: 96 }}
      aria-label={`Фото ${idx + 1}`}
    >
      <div
        className="relative overflow-hidden rounded-lg"
        style={{
          height: 64,
          border: `2px solid ${isActive ? accent : 'transparent'}`,
          boxShadow: isActive ? `0 0 12px ${accent}50` : 'none',
          transition: 'border-color 0.25s, box-shadow 0.25s',
        }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{ transform: isHovered || isActive ? 'scale(1.08)' : 'scale(1)' }}
        />
        {isActive && (
          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: accent }} />
        )}
      </div>
    </button>
  );
}

export function PropertyAgencyGallery({ photos, agency, agencyUrl, accent = 'hsl(38,90%,58%)' }: Props) {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback((delta: number) => {
    setActive(i => (i + delta + photos.length) % photos.length);
    setImgLoaded(false);
  }, [photos.length]);

  // Keyboard navigation
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input,textarea')) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [go]);

  // Scroll active thumb into view
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const thumb = strip.querySelector(`[data-photo-idx="${active}"]`) as HTMLElement;
    if (!thumb) return;
    const center = thumb.offsetLeft + thumb.offsetWidth / 2;
    strip.scrollTo({ left: Math.max(0, center - strip.clientWidth / 2), behavior: 'smooth' });
  }, [active]);

  // Touch swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > SWIPE_THRESHOLD) go(diff < 0 ? 1 : -1);
    touchStartX.current = null;
  }, [go]);

  if (!photos.length) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* ── Main stage ── */}
      <div
        className="relative group overflow-hidden rounded-xl md:rounded-2xl bg-[#111] dark:bg-[#0a0a0a] select-none"
        style={{ aspectRatio: '16/9', maxHeight: '70vh' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {/* Skeleton */}
            {!imgLoaded && (
              <div className="absolute inset-0 bg-[#181818] overflow-hidden">
                <div
                  className="absolute inset-0 -translate-x-full"
                  style={{
                    background: 'linear-gradient(90deg,transparent 0%,rgba(255,255,255,0.05) 50%,transparent 100%)',
                    animation: 'shimmer 1.6s infinite',
                  }}
                />
              </div>
            )}
            <img
              src={photos[active]}
              alt={`${agency} — фото ${active + 1}`}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: imgLoaded ? 1 : 0, transition: 'opacity 0.3s' }}
              onLoad={() => setImgLoaded(true)}
            />
          </motion.div>
        </AnimatePresence>

        {/* Gradient scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/20 pointer-events-none" />

        {/* ── Top bar: badge + agency link in a single flex row ── */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
          {/* "Реальные фото" badge */}
          <div className="flex items-center gap-1.5 bg-black/65 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 flex-shrink-0 pointer-events-auto">
            <Camera className="w-3 h-3 text-emerald-400 flex-shrink-0" />
            <span className="text-[10px] font-oxanium uppercase tracking-[0.12em] text-emerald-300 whitespace-nowrap">
              Реальные фото
            </span>
          </div>

          {/* Source link */}
          {agencyUrl ? (
            <a
              href={agencyUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 bg-black/65 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 hover:border-white/30 transition-colors group/link pointer-events-auto min-w-0 flex-shrink"
            >
              <span className="text-[10px] font-space-grotesk text-white/50 group-hover/link:text-white/80 transition-colors truncate max-w-[180px]">
                {agency}
              </span>
              <ExternalLink className="w-2.5 h-2.5 text-white/30 group-hover/link:text-white/60 transition-colors flex-shrink-0" />
            </a>
          ) : null}
        </div>

        {/* Counter */}
        <div className="absolute bottom-3 right-3 text-[10px] font-space-grotesk text-white/40 bg-black/40 backdrop-blur-sm rounded px-2 py-0.5">
          {active + 1} / {photos.length}
        </div>

        {/* Nav arrows — subtly visible always (essential for touch); more prominent on hover */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 hover:border-white/30 transition-all z-10 opacity-40 group-hover:opacity-100"
              aria-label="Предыдущее фото"
            >
              <ChevronLeft className="w-4 h-4 text-white/80" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 hover:border-white/30 transition-all z-10 opacity-40 group-hover:opacity-100"
              aria-label="Следующее фото"
            >
              <ChevronRight className="w-4 h-4 text-white/80" />
            </button>
          </>
        )}
      </div>

      {/* ── Thumbnail filmstrip ── */}
      {photos.length > 1 && (
        <div className="relative">
          <div
            ref={stripRef}
            className="flex gap-2 overflow-x-auto pb-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            role="tablist"
            aria-label="Фотографии объекта"
          >
            {photos.map((src, idx) => (
              <PhotoThumb
                key={idx}
                src={src}
                alt={`Фото ${idx + 1}`}
                isActive={idx === active}
                isHovered={hovered === idx}
                accent={accent}
                idx={idx}
                onClick={() => { setActive(idx); setImgLoaded(false); }}
                onEnter={() => setHovered(idx)}
                onLeave={() => setHovered(null)}
              />
            ))}
          </div>
          {photos.length > 4 && (
            <div
              className="absolute right-0 top-0 bottom-1 w-10 pointer-events-none"
              style={{ background: 'linear-gradient(to right, transparent, var(--scenes-bg, #050505))' }}
            />
          )}
        </div>
      )}
    </div>
  );
}
