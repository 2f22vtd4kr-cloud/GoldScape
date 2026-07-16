/**
 * PropertyScenesCarousel
 * 
 * Multi-view property visualisation: filmstrip at bottom, crossfade main stage on top.
 * Each property has a consistent "DNA" that all scene images share for visual coherence.
 *
 * Scene categories:
 *  - architecture: site map, exterior, cross-section, floor plan
 *  - life: BBQ, party, match day, family morning, etc.
 *  - bizarre: one absurdist/funny scene per property
 */
import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft, ChevronRight, Eye,
  MapPin, Layers, Grid3x3, Flame, Users, Tv2, Coffee, Sparkles, Laptop,
} from 'lucide-react';

const LUXURY_EASE = [0.22, 1, 0.36, 1] as const;

export type SceneType =
  | 'site'
  | 'exterior'
  | 'section'
  | 'floorplan'
  | 'life_bbq'
  | 'life_party'
  | 'life_matchday'
  | 'life_family'
  | 'life_remote_work'
  | 'bizarre';

export type SceneCategory = 'architecture' | 'life' | 'bizarre';

export interface PropertyScene {
  id: string;
  type: SceneType;
  category: SceneCategory;
  label: string;
  sublabel?: string;
  image: string;
}

const SCENE_ICONS: Record<SceneType, React.ReactNode> = {
  site:          <MapPin className="w-3 h-3" />,
  exterior:      <Layers className="w-3 h-3" />,
  section:       <Grid3x3 className="w-3 h-3" />,
  floorplan:     <Grid3x3 className="w-3 h-3" />,
  life_bbq:      <Flame className="w-3 h-3" />,
  life_party:    <Users className="w-3 h-3" />,
  life_matchday: <Tv2 className="w-3 h-3" />,
  life_family:      <Coffee className="w-3 h-3" />,
  life_remote_work: <Laptop className="w-3 h-3" />,
  bizarre:          <Sparkles className="w-3 h-3" />,
};

const CATEGORY_CONFIG: Record<SceneCategory, { label: string; textClass: string; borderColor: string; glowColor: string }> = {
  architecture: {
    label: 'Архитектура',
    textClass: 'text-amber-400',
    borderColor: 'border-amber-400/40',
    glowColor: 'rgba(251,191,36,0.25)',
  },
  life: {
    label: 'Жизнь',
    textClass: 'text-emerald-400',
    borderColor: 'border-emerald-400/40',
    glowColor: 'rgba(52,211,153,0.25)',
  },
  bizarre: {
    label: '👀',
    textClass: 'text-violet-400',
    borderColor: 'border-violet-400/40',
    glowColor: 'rgba(167,139,250,0.3)',
  },
};

/* ── Scene image with skeleton loading ───────────────────────────── */
function SceneImage({ src, alt, className, style }: { src: string; alt: string; className?: string; style?: React.CSSProperties }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {/* Shimmer skeleton shown until image loads */}
      {!loaded && (
        <div className="absolute inset-0 bg-[#1a1a1a] overflow-hidden">
          <div
            className="absolute inset-0 -translate-x-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
              animation: 'shimmer 1.6s infinite',
            }}
          />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ ...style, opacity: loaded ? 1 : 0, transition: 'opacity 0.3s ease' }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

/* ── Crossfade main image ────────────────────────────────────────── */
function CrossfadeStage({ scene, accent }: { scene: PropertyScene; accent: string }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-xl md:rounded-2xl bg-[#111]"
      style={{ aspectRatio: '16/9', maxHeight: '70vh' }}
    >
      <AnimatePresence mode="sync">
        <motion.div
          key={scene.id}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: LUXURY_EASE }}
        >
          <SceneImage
            src={scene.image}
            alt={scene.label}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient scrim */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/15 pointer-events-none" />

      {/* Scene info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 pointer-events-none">
        <div className="flex items-end justify-between">
          <div>
            <div className={`inline-flex items-center gap-1.5 text-[9px] md:text-[10px] uppercase tracking-[0.2em] font-medium mb-1 md:mb-1.5 ${CATEGORY_CONFIG[scene.category].textClass}`}>
              {SCENE_ICONS[scene.type]}
              {CATEGORY_CONFIG[scene.category].label}
            </div>
            <div className="text-white text-base md:text-lg font-semibold font-oxanium">{scene.label}</div>
            {scene.sublabel && (
              <div className="text-white/50 text-[12px] md:text-sm mt-0.5 font-space-grotesk">{scene.sublabel}</div>
            )}
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10 pointer-events-none" />
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export function PropertyScenesCarousel({
  scenes,
  accent = 'hsl(38, 90%, 58%)',
}: {
  scenes: PropertyScene[];
  accent?: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<SceneCategory | 'all'>('all');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === 'all'
    ? scenes
    : scenes.filter(s => s.category === activeCategory);

  // Clamp activeIdx when filter changes
  const safeIdx = Math.min(activeIdx, Math.max(filtered.length - 1, 0));
  const scene = filtered[safeIdx] ?? scenes[0];

  const go = useCallback((delta: number) => {
    setActiveIdx(i => (i + delta + filtered.length) % filtered.length);
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.closest('input, textarea')) return;
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  // Reset index when category changes
  useEffect(() => { setActiveIdx(0); }, [activeCategory]);

  // Scroll active thumbnail into view — horizontal only, never page-level vertical scroll
  useEffect(() => {
    const strip = filmstripRef.current;
    if (!strip) return;
    const thumb = strip.querySelector(`[data-thumb-idx="${safeIdx}"]`) as HTMLElement;
    if (!thumb) return;
    const thumbCenter = thumb.offsetLeft + thumb.offsetWidth / 2;
    const targetLeft = thumbCenter - strip.clientWidth / 2;
    strip.scrollTo({ left: Math.max(0, targetLeft), behavior: 'smooth' });
  }, [safeIdx]);

  // Categories present in this property's scenes
  const presentCategories = Array.from(new Set(scenes.map(s => s.category))) as SceneCategory[];

  if (scenes.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {/* ── Category pills — only shown when 2+ categories present ── */}
      {presentCategories.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {/* "All" pill only shown when 3+ categories to avoid redundancy */}
          {presentCategories.length >= 3 && (
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1 rounded-full text-[11px] font-space-grotesk border transition-all duration-200 ${
                activeCategory === 'all'
                  ? 'dark:bg-white/10 bg-black/8 dark:border-white/30 border-black/20 dark:text-white text-foreground'
                  : 'dark:bg-white/[0.03] bg-black/[0.03] dark:border-white/10 border-black/8 dark:text-white/40 text-foreground/40 hover:dark:text-white/70 hover:text-foreground/70'
              }`}
            >
              Все виды
            </button>
          )}
          {presentCategories.map(cat => {
            const cfg = CATEGORY_CONFIG[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-full text-[11px] font-space-grotesk border transition-all duration-200 ${
                  activeCategory === cat
                    ? `dark:bg-white/[0.08] bg-black/[0.06] ${cfg.borderColor} ${cfg.textClass}`
                    : 'dark:bg-white/[0.03] bg-black/[0.03] dark:border-white/10 border-black/8 dark:text-white/40 text-foreground/40 hover:dark:text-white/70 hover:text-foreground/70'
                }`}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      )}

      {/* ── Main stage + nav ── */}
      <div className="relative group">
        <CrossfadeStage scene={scene} accent={accent} />

        {/* Left arrow */}
        {filtered.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 hover:border-white/30 transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="Предыдущая сцена"
            >
              <ChevronLeft className="w-4 h-4 text-white/80" />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 hover:border-white/30 transition-all opacity-0 group-hover:opacity-100 z-10"
              aria-label="Следующая сцена"
            >
              <ChevronRight className="w-4 h-4 text-white/80" />
            </button>
          </>
        )}

        {/* Counter */}
        <div className="absolute top-3 right-3 text-[10px] font-space-grotesk text-white/40 bg-black/40 backdrop-blur-sm rounded px-2 py-0.5">
          {safeIdx + 1} / {filtered.length}
        </div>
      </div>

      {/* ── Filmstrip with right-edge fade scroll indicator ── */}
      <div className="relative">
        <div
          ref={filmstripRef}
          className="flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          role="tablist"
          aria-label="Виды объекта"
        >
          {filtered.map((s, idx) => {
            const isActive = idx === safeIdx;
            const isHovered = hoveredIdx === idx;
            const cfg = CATEGORY_CONFIG[s.category];
            // Show category divider when group changes
            const showDivider = idx > 0 && filtered[idx - 1].category !== s.category;
            return (
              <div key={s.id} className="flex items-stretch gap-2 flex-shrink-0">
                {showDivider && (
                  <div className="w-px self-stretch dark:bg-white/10 bg-black/10 mx-0.5" />
                )}
                <button
                  data-thumb-idx={idx}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex flex-col gap-1 flex-shrink-0 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg"
                  style={{ width: 110, minHeight: 48 }}
                >
                  {/* Thumbnail image */}
                  <div
                    className="relative overflow-hidden rounded-lg"
                    style={{
                      height: 68,
                      border: `2px solid ${isActive ? accent : 'transparent'}`,
                      boxShadow: isActive ? `0 0 14px ${accent}50` : 'none',
                      transition: 'border-color 0.25s, box-shadow 0.25s',
                    }}
                  >
                    <img
                      src={s.image}
                      alt={s.label}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300"
                      style={{ transform: isHovered || isActive ? 'scale(1.06)' : 'scale(1)' }}
                    />
                    {/* Hover quick-view indicator (desktop only) */}
                    <div
                      className="hidden md:flex absolute inset-0 items-center justify-center bg-black/55 backdrop-blur-[2px] transition-opacity duration-200"
                      style={{ opacity: isHovered && !isActive ? 1 : 0 }}
                    >
                      <div className="flex items-center gap-1 bg-white/15 px-2 py-1 rounded-full border border-white/20">
                        <Eye className="w-3 h-3 text-white" />
                        <span className="text-white text-[9px] font-medium">Смотреть</span>
                      </div>
                    </div>
                    {/* Active bar */}
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: accent }} />
                    )}
                    {/* Scene-specific label */}
                    <div className={`absolute top-1 left-1 text-[7px] uppercase tracking-wide font-medium px-1 py-0.5 rounded-full bg-black/60 ${cfg.textClass}`}>
                      {s.label}
                    </div>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
        {/* Right-edge fade — signals horizontal scroll available on mobile */}
        {filtered.length > 3 && (
          <div
            className="absolute right-0 top-0 bottom-1 w-12 pointer-events-none"
            style={{
              background: 'linear-gradient(to right, transparent, var(--scenes-bg, #050505))',
            }}
          />
        )}
      </div>
    </div>
  );
}
