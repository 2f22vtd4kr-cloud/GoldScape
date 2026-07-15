import { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Eye, MapPin, Layers, Grid3x3, Flame, Users, Tv2, Coffee, Sparkles } from 'lucide-react';

/* ── Scene data ─────────────────────────────────────────────────── */
type SceneCategory = 'architecture' | 'life' | 'bizarre';

interface Scene {
  id: string;
  category: SceneCategory;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  image: string;
  accent: string;
}

const SCENES: Scene[] = [
  /* Architecture */
  {
    id: 'location',
    category: 'architecture',
    label: 'Расположение',
    sublabel: 'Palm Jumeirah · Dubai',
    icon: <MapPin className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(38, 90%, 58%)',
  },
  {
    id: 'exterior',
    category: 'architecture',
    label: 'Экстерьер',
    sublabel: 'Вид снаружи',
    icon: <Layers className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(200, 80%, 55%)',
  },
  {
    id: 'section',
    category: 'architecture',
    label: 'Разрез',
    sublabel: 'Горизонтальный срез',
    icon: <Grid3x3 className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(160, 60%, 48%)',
  },
  {
    id: 'floorplan',
    category: 'architecture',
    label: 'Планировка',
    sublabel: 'Этаж 42',
    icon: <Grid3x3 className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(270, 60%, 60%)',
  },
  /* Life scenes */
  {
    id: 'bbq',
    category: 'life',
    label: 'Барбекю',
    sublabel: 'Терраса, закат',
    icon: <Flame className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(18, 90%, 55%)',
  },
  {
    id: 'party',
    category: 'life',
    label: 'Вечеринка',
    sublabel: 'Крыша, ночь',
    icon: <Users className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(290, 70%, 60%)',
  },
  {
    id: 'matchday',
    category: 'life',
    label: 'Матч-день',
    sublabel: 'Champions League, весь дом',
    icon: <Tv2 className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f4834c?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(220, 80%, 58%)',
  },
  {
    id: 'morning',
    category: 'life',
    label: 'Семейное утро',
    sublabel: 'Воскресный завтрак',
    icon: <Coffee className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(38, 70%, 52%)',
  },
  /* Bizarre */
  {
    id: 'bizarre',
    category: 'bizarre',
    label: 'Ocean\'s Eleven',
    sublabel: 'Планирование операции',
    icon: <Sparkles className="w-3.5 h-3.5" />,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1280&h=720&fit=crop&q=80',
    accent: 'hsl(142, 70%, 42%)',
  },
];

const CATEGORY_CONFIG: Record<SceneCategory, { label: string; color: string; bg: string }> = {
  architecture: { label: 'Архитектура', color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/30' },
  life:         { label: 'Жизнь',        color: 'text-emerald-400', bg: 'bg-emerald-400/10 border-emerald-400/30' },
  bizarre:      { label: '✦ Особое',     color: 'text-violet-400', bg: 'bg-violet-400/10 border-violet-400/30' },
};

/* ── Crossfade image ─────────────────────────────────────────────── */
function CrossfadeImage({ src, alt }: { src: string; alt: string }) {
  const [current, setCurrent] = useState(src);
  const [next, setNext] = useState<string | null>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (src === current) return;
    setNext(src);
    setFading(true);
    const t = setTimeout(() => {
      setCurrent(src);
      setNext(null);
      setFading(false);
    }, 420);
    return () => clearTimeout(t);
  }, [src]);

  return (
    <div className="relative w-full h-full">
      <img
        key={current}
        src={current}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.42s ease' }}
      />
      {next && (
        <img
          src={next}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: fading ? 1 : 0, transition: 'opacity 0.42s ease' }}
        />
      )}
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────── */
export function FilmstripViewer() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [activeCategory, setActiveCategory] = useState<SceneCategory | 'all'>('all');
  const filmstripRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filtered = activeCategory === 'all'
    ? SCENES
    : SCENES.filter(s => s.category === activeCategory);

  const scene = filtered[activeIdx] ?? SCENES[0];

  const go = useCallback((delta: number) => {
    setActiveIdx(i => (i + delta + filtered.length) % filtered.length);
  }, [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [go]);

  // Scroll active thumbnail into view
  useEffect(() => {
    const strip = filmstripRef.current;
    if (!strip) return;
    const thumb = strip.children[activeIdx] as HTMLElement;
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIdx]);

  // Reset index when category changes
  useEffect(() => { setActiveIdx(0); }, [activeCategory]);

  const accent = scene.accent;

  return (
    <div className="min-h-screen bg-[#060606] text-white flex flex-col" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      {/* ── Header ── */}
      <div className="px-8 pt-8 pb-4 flex items-start justify-between">
        <div>
          <div className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-1">Palm Jumeirah · Dubai</div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ fontFamily: "'Oxanium', sans-serif", background: `linear-gradient(135deg, #d4b483 0%, #f0d9a8 45%, #c8a96e 100%)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            Резиденция на Пальме · 3 спальни · $2,400,000
          </h1>
        </div>
        <div className="text-[11px] text-white/30 pt-2">{activeIdx + 1} / {filtered.length}</div>
      </div>

      {/* ── Category tabs ── */}
      <div className="px-8 pb-4 flex gap-2">
        {(['all', ...Object.keys(CATEGORY_CONFIG)] as ('all' | SceneCategory)[]).map(cat => {
          const isAll = cat === 'all';
          const cfg = isAll ? null : CATEGORY_CONFIG[cat];
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium border transition-all duration-200 ${
                active
                  ? (isAll ? 'bg-white/10 border-white/30 text-white' : `${cfg!.bg} ${cfg!.color} border`)
                  : 'bg-white/[0.03] border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
              }`}
            >
              {isAll ? 'Все сцены' : cfg!.label}
            </button>
          );
        })}
      </div>

      {/* ── Main stage ── */}
      <div className="px-8 flex-1 flex flex-col min-h-0">
        <div className="relative rounded-2xl overflow-hidden bg-[#111]" style={{ aspectRatio: '16/9', maxHeight: '420px' }}>
          <CrossfadeImage src={scene.image} alt={scene.label} />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-black/20 pointer-events-none" />

          {/* Scene info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 pointer-events-none">
            <div className="flex items-end justify-between">
              <div>
                <div className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] font-medium mb-1.5 ${
                  CATEGORY_CONFIG[scene.category].color
                }`}>
                  {scene.icon}
                  {CATEGORY_CONFIG[scene.category].label}
                </div>
                <div className="text-white text-xl font-semibold" style={{ fontFamily: "'Oxanium', sans-serif" }}>{scene.label}</div>
                {scene.sublabel && <div className="text-white/50 text-sm mt-0.5">{scene.sublabel}</div>}
              </div>
              {/* Accent dot pulse */}
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
                />
              </div>
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={() => go(-1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 hover:border-white/30 transition-all group"
          >
            <ChevronLeft className="w-5 h-5 text-white/70 group-hover:text-white" />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center hover:bg-black/80 hover:border-white/30 transition-all group"
          >
            <ChevronRight className="w-5 h-5 text-white/70 group-hover:text-white" />
          </button>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
            <div
              className="h-full transition-all duration-300"
              style={{ width: `${((activeIdx + 1) / filtered.length) * 100}%`, background: accent }}
            />
          </div>
        </div>

        {/* ── Filmstrip ── */}
        <div className="mt-4 pb-6">
          {/* Category dividers label row */}
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-2 px-1">
            Все сцены — прокрутите ниже
          </div>
          <div
            ref={filmstripRef}
            className="flex gap-2 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Category group separators inline */}
            {SCENES.map((s, idx) => {
              const isActive = s === scene;
              const isHovered = hoveredIdx === idx;
              const cfg = CATEGORY_CONFIG[s.category];
              const showDivider = idx === 0 || SCENES[idx - 1].category !== s.category;
              return (
                <div key={s.id} className="flex items-start gap-2 flex-shrink-0">
                  {showDivider && idx > 0 && (
                    <div className="flex flex-col items-center pt-1 self-stretch">
                      <div className="w-px flex-1 bg-white/10" />
                    </div>
                  )}
                  {/* Thumbnail card */}
                  <div
                    className="relative flex-shrink-0 group cursor-pointer"
                    style={{ width: 130 }}
                    onClick={() => {
                      // If filtered, find in filtered list; else switch category
                      const filtIdx = filtered.indexOf(s);
                      if (filtIdx >= 0) {
                        setActiveIdx(filtIdx);
                      } else {
                        setActiveCategory('all');
                        const allIdx = SCENES.indexOf(s);
                        setActiveIdx(allIdx);
                      }
                    }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  >
                    {/* Thumbnail image */}
                    <div
                      className="relative overflow-hidden rounded-lg"
                      style={{
                        height: 78,
                        border: isActive ? `2px solid ${s.accent}` : '2px solid transparent',
                        boxShadow: isActive ? `0 0 12px ${s.accent}40` : 'none',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                    >
                      <img
                        src={s.image}
                        alt={s.label}
                        className="w-full h-full object-cover"
                        style={{
                          transform: isHovered || isActive ? 'scale(1.05)' : 'scale(1)',
                          transition: 'transform 0.3s ease',
                        }}
                      />
                      {/* Category badge */}
                      <div
                        className={`absolute top-1.5 left-1.5 text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded-full ${cfg.bg} ${cfg.color} font-medium`}
                        style={{ fontSize: 8 }}
                      >
                        {cfg.label}
                      </div>
                      {/* Quick-view overlay */}
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-[2px] transition-opacity duration-200"
                        style={{ opacity: isHovered && !isActive ? 1 : 0 }}
                      >
                        <div className="flex items-center gap-1 bg-white/15 backdrop-blur px-2 py-1.5 rounded-full border border-white/20">
                          <Eye className="w-3.5 h-3.5 text-white" />
                          <span className="text-white text-[10px] font-medium">Смотреть</span>
                        </div>
                      </div>
                      {/* Active indicator */}
                      {isActive && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: s.accent }} />
                      )}
                    </div>
                    {/* Label below thumbnail */}
                    <div className="mt-1.5 px-0.5">
                      <div
                        className="text-[11px] font-medium truncate"
                        style={{ color: isActive ? s.accent : 'rgba(255,255,255,0.65)' }}
                      >
                        {s.label}
                      </div>
                      {s.sublabel && (
                        <div className="text-[9px] text-white/35 truncate mt-0.5">{s.sublabel}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
