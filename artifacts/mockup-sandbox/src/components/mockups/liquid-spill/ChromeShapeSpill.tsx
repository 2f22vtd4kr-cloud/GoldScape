import { useId } from 'react';

type Variant = 'blob' | 'star4' | 'spike' | 'ring' | 'orb' | 'drip' | 'spill';

interface Props {
  variant?: Variant;
  size?: number;
  iridescent?: boolean;
  breathe?: boolean;
  float?: boolean;
  className?: string;
  style?: React.CSSProperties;
  hueOffset?: number;
}

/** Liquid Spill upgrade of ChromeShape: smoother, more liquid blob curves,
 *  a true oil-slick multi-hue palette (blue → cyan → magenta → gold → violet,
 *  instead of monochrome purple), and a new "spill" variant — a
 *  multi-tendril gas-spill / splash shape generated from radiating petal
 *  curves, matching the Softulka "Wavy Chrome" reference pack. */
export function ChromeShapeSpill({
  variant = 'blob',
  size = 120,
  iridescent = false,
  breathe = true,
  float = false,
  className = '',
  style,
  hueOffset = 0,
}: Props) {
  const uid = useId().replace(/:/g, '');

  const animClass = [
    breathe ? 'chrome-shape-breathe' : '',
    float ? 'chrome-shape-float' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span
      className={`inline-block pointer-events-none select-none ${animClass} ${className}`}
      style={{ width: size, height: size, display: 'inline-block', ...style }}
    >
      {variant === 'blob' && <BlobShape size={size} uid={uid} iridescent={iridescent} hueOffset={hueOffset} />}
      {variant === 'star4' && <Star4Shape size={size} uid={uid} iridescent={iridescent} />}
      {variant === 'spike' && <SpikeShape size={size} uid={uid} iridescent={iridescent} />}
      {variant === 'ring' && <RingShape size={size} uid={uid} iridescent={iridescent} />}
      {variant === 'orb' && <OrbShape size={size} uid={uid} iridescent={iridescent} />}
      {variant === 'drip' && <DripShape size={size} uid={uid} iridescent={iridescent} />}
      {variant === 'spill' && <SpillShape size={size} uid={uid} iridescent={iridescent} />}
    </span>
  );
}

/* ─── Gas-spill oil-slick palette ──────────────────────────────────────────
   Broader hue sweep than the original monochrome purple iridescent stops:
   deep core → violet → electric blue → cyan hot-spot → magenta-pink →
   warm gold → violet → teal → back to deep core. */

function ChromeStops({ id, angle = 145, iridescent = false }: { id: string; angle?: number; iridescent?: boolean }) {
  if (iridescent) {
    return (
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"
        gradientTransform={`rotate(${angle}, 0.5, 0.5)`}>
        <stop offset="0%"   stopColor="#06040f" />
        <stop offset="10%"  stopColor="#1c1440" />
        <stop offset="20%"  stopColor="#4a2c9c" />
        <stop offset="30%"  stopColor="#6f4ecb" />
        <stop offset="38%"  stopColor="#3a9ce0" />
        <stop offset="44%"  stopColor="#8be8ff" />
        <stop offset="50%"  stopColor="#fdf6ff" />
        <stop offset="56%"  stopColor="#ffd7f0" />
        <stop offset="63%"  stopColor="#ff8fce" />
        <stop offset="71%"  stopColor="#ffb347" />
        <stop offset="80%"  stopColor="#7a4fd0" />
        <stop offset="89%"  stopColor="#35c9c9" />
        <stop offset="96%"  stopColor="#d9c6ff" />
        <stop offset="100%" stopColor="#0a0716" />
      </linearGradient>
    );
  }
  return (
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"
      gradientTransform={`rotate(${angle}, 0.5, 0.5)`}>
      <stop offset="0%"   stopColor="#111111" />
      <stop offset="12%"  stopColor="#4a4a4a" />
      <stop offset="24%"  stopColor="#a8a8a8" />
      <stop offset="34%"  stopColor="#e8e8e8" />
      <stop offset="40%"  stopColor="#f8f8f8" />
      <stop offset="46%"  stopColor="#ffffff" />
      <stop offset="52%"  stopColor="#d8d8d8" />
      <stop offset="62%"  stopColor="#5a5a5a" />
      <stop offset="72%"  stopColor="#202020" />
      <stop offset="82%"  stopColor="#6a6a6a" />
      <stop offset="92%"  stopColor="#c8c8c8" />
      <stop offset="100%" stopColor="#404040" />
    </linearGradient>
  );
}

/* ─── Blob — smoother, more asymmetric liquid curve ────────────────────── */

function BlobShape({ size, uid, iridescent, hueOffset }: { size: number; uid: string; iridescent: boolean; hueOffset: number }) {
  const s = size;
  return (
    <svg viewBox="0 0 100 100" width={s} height={s} xmlns="http://www.w3.org/2000/svg"
      style={iridescent ? { filter: `hue-rotate(${hueOffset}deg)` } : undefined}>
      <defs>
        <ChromeStops id={`cg_${uid}`} angle={148} iridescent={iridescent} />
        <radialGradient id={`spec_${uid}`} cx="26%" cy="20%" r="36%">
          <stop offset="0%" stopColor={iridescent ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.85)"} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={`rim_${uid}`} cx="72%" cy="76%" r="24%">
          <stop offset="0%" stopColor={iridescent ? "rgba(255,150,220,0.5)" : "rgba(200,200,200,0.35)"} />
          <stop offset="100%" stopColor="rgba(200,200,200,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={iridescent ? "rgba(80,180,255,0.32)" : "rgba(0,0,0,0.4)"} />
        </filter>
      </defs>
      {/* Smoother, more liquid amoeba silhouette — fewer sharp inflections,
          longer flowing curve segments than the original blob */}
      <path
        d="M 66,9 C 84,13 96,32 93,52 C 90,71 82,88 60,93 C 41,97 20,91 10,73 C 1,56 3,34 18,20 C 32,7 48,5 66,9 Z"
        fill={`url(#cg_${uid})`}
        filter={`url(#shadow_${uid})`}
      />
      <path
        d="M 66,9 C 84,13 96,32 93,52 C 90,71 82,88 60,93 C 41,97 20,91 10,73 C 1,56 3,34 18,20 C 32,7 48,5 66,9 Z"
        fill={`url(#spec_${uid})`}
      />
      <path
        d="M 66,9 C 84,13 96,32 93,52 C 90,71 82,88 60,93 C 41,97 20,91 10,73 C 1,56 3,34 18,20 C 32,7 48,5 66,9 Z"
        fill={`url(#rim_${uid})`}
      />
    </svg>
  );
}

/* ─── 4-pointed star ────────────────────────────────────────────────────── */

function Star4Shape({ size, uid, iridescent }: { size: number; uid: string; iridescent: boolean }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <ChromeStops id={`cg_${uid}`} angle={135} iridescent={iridescent} />
        <radialGradient id={`spec_${uid}`} cx="30%" cy="26%" r="28%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.88)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(0,0,0,0.5)" />
        </filter>
      </defs>
      <path
        d="M50,3 C51,24 76,49 97,50 C76,51 51,76 50,97 C49,76 24,51 3,50 C24,49 49,24 50,3 Z"
        fill={`url(#cg_${uid})`}
        filter={`url(#shadow_${uid})`}
      />
      <path
        d="M50,3 C51,24 76,49 97,50 C76,51 51,76 50,97 C49,76 24,51 3,50 C24,49 49,24 50,3 Z"
        fill={`url(#spec_${uid})`}
      />
    </svg>
  );
}

/* ─── Spike burst ───────────────────────────────────────────────────────── */

function SpikeShape({ size, uid, iridescent }: { size: number; uid: string; iridescent: boolean }) {
  const cx = 50, cy = 50, n = 12, outerR = 47, innerR = 5;
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const angle = (i * Math.PI) / n - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${(cx + r * Math.cos(angle)).toFixed(2)},${(cy + r * Math.sin(angle)).toFixed(2)}`);
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <ChromeStops id={`cg_${uid}`} angle={130} iridescent={iridescent} />
        <radialGradient id={`spec_${uid}`} cx="35%" cy="28%" r="32%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(0,0,0,0.45)" />
        </filter>
      </defs>
      <polygon points={pts.join(' ')} fill={`url(#cg_${uid})`} filter={`url(#shadow_${uid})`} />
      <polygon points={pts.join(' ')} fill={`url(#spec_${uid})`} />
    </svg>
  );
}

/* ─── Ring / torus ──────────────────────────────────────────────────────── */

function RingShape({ size, uid, iridescent }: { size: number; uid: string; iridescent: boolean }) {
  const outer = "M50 4 a46 46 0 0 1 0 92 a46 46 0 0 1 0-92 Z";
  const inner = "M50 26 a24 24 0 0 0 0 48 a24 24 0 0 0 0-48 Z";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`cg_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          {iridescent ? (
            <>
              <stop offset="0%"   stopColor="#06040f" />
              <stop offset="16%"  stopColor="#3d2c9c" />
              <stop offset="30%"  stopColor="#3a9ce0" />
              <stop offset="42%"  stopColor="#c9f6ff" />
              <stop offset="50%"  stopColor="#fdf6ff" />
              <stop offset="58%"  stopColor="#ff9ad1" />
              <stop offset="70%"  stopColor="#ffb347" />
              <stop offset="82%"  stopColor="#6f4ecb" />
              <stop offset="92%"  stopColor="#35c9c9" />
              <stop offset="100%" stopColor="#140b2e" />
            </>
          ) : (
            <>
              <stop offset="0%"   stopColor="#141414" />
              <stop offset="18%"  stopColor="#5a5a5a" />
              <stop offset="32%"  stopColor="#d8d8d8" />
              <stop offset="42%"  stopColor="#f5f5f5" />
              <stop offset="52%"  stopColor="#c0c0c0" />
              <stop offset="64%"  stopColor="#3a3a3a" />
              <stop offset="76%"  stopColor="#181818" />
              <stop offset="86%"  stopColor="#7a7a7a" />
              <stop offset="94%"  stopColor="#d0d0d0" />
              <stop offset="100%" stopColor="#484848" />
            </>
          )}
        </linearGradient>
        <radialGradient id={`spec_${uid}`} cx="32%" cy="26%" r="30%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={iridescent ? "rgba(60,150,220,0.4)" : "rgba(0,0,0,0.5)"} />
        </filter>
      </defs>
      <path fillRule="evenodd" d={`${outer} ${inner}`} fill={`url(#cg_${uid})`} filter={`url(#shadow_${uid})`} />
      <path fillRule="evenodd" d={`${outer} ${inner}`} fill={`url(#spec_${uid})`} />
    </svg>
  );
}

/* ─── Orb / sphere ──────────────────────────────────────────────────────── */

function OrbShape({ size, uid, iridescent }: { size: number; uid: string; iridescent: boolean }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`cg_${uid}`} cx="34%" cy="28%" r="72%">
          {iridescent ? (
            <>
              <stop offset="0%"   stopColor="#ffffff" />
              <stop offset="12%"  stopColor="#d6f4ff" />
              <stop offset="26%"  stopColor="#7ecbe8" />
              <stop offset="40%"  stopColor="#c78fe0" />
              <stop offset="55%"  stopColor="#5a30a0" />
              <stop offset="72%"  stopColor="#241454" />
              <stop offset="88%"  stopColor="#150a2c" />
              <stop offset="100%" stopColor="#070310" />
            </>
          ) : (
            <>
              <stop offset="0%"   stopColor="#ffffff" />
              <stop offset="14%"  stopColor="#e8e8e8" />
              <stop offset="30%"  stopColor="#c0c0c0" />
              <stop offset="50%"  stopColor="#6a6a6a" />
              <stop offset="70%"  stopColor="#2a2a2a" />
              <stop offset="85%"  stopColor="#404040" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </>
          )}
        </radialGradient>
        <radialGradient id={`rim_${uid}`} cx="68%" cy="72%" r="22%">
          <stop offset="0%" stopColor={iridescent ? "rgba(255,170,120,0.45)" : "rgba(160,160,160,0.35)"} />
          <stop offset="100%" stopColor="rgba(160,160,160,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={iridescent ? "rgba(60,140,220,0.35)" : "rgba(0,0,0,0.5)"} />
        </filter>
      </defs>
      <circle cx="50" cy="50" r="46" fill={`url(#cg_${uid})`} filter={`url(#shadow_${uid})`} />
      <circle cx="50" cy="50" r="46" fill={`url(#rim_${uid})`} />
    </svg>
  );
}

/* ─── Drip ──────────────────────────────────────────────────────────────── */

function DripShape({ size, uid, iridescent }: { size: number; uid: string; iridescent: boolean }) {
  return (
    <svg viewBox="0 0 100 130" width={size} height={size * 1.3} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <ChromeStops id={`cg_${uid}`} angle={155} iridescent={iridescent} />
        <radialGradient id={`spec_${uid}`} cx="32%" cy="20%" r="28%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="rgba(0,0,0,0.45)" />
        </filter>
      </defs>
      <path
        d="M 50,8 C 72,8 86,22 86,44 C 86,66 70,90 50,122 C 30,90 14,66 14,44 C 14,22 28,8 50,8 Z"
        fill={`url(#cg_${uid})`}
        filter={`url(#shadow_${uid})`}
      />
      <path
        d="M 50,8 C 72,8 86,22 86,44 C 86,66 70,90 50,122 C 30,90 14,66 14,44 C 14,22 28,8 50,8 Z"
        fill={`url(#spec_${uid})`}
      />
    </svg>
  );
}

/* ─── Spill — new "gas spill" multi-tendril splash ──────────────────────
   Radiating petal curves from a rounded core, each a smooth cubic-bezier
   teardrop rather than a straight polygon spike — reads as a liquid metal
   splash captured mid-drip, matching the Softulka reference sheets. */

function petalPath(cx: number, cy: number, angleDeg: number, len: number, width: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const dx = Math.cos(rad), dy = Math.sin(rad);
  const px = -dy, py = dx;
  const baseR = width * 0.42;
  const x0 = cx + px * baseR, y0 = cy + py * baseR;
  const x1 = cx - px * baseR, y1 = cy - py * baseR;
  const tipX = cx + dx * len, tipY = cy + dy * len;
  const c1x = cx + dx * len * 0.32 + px * width * 0.95, c1y = cy + dy * len * 0.32 + py * width * 0.95;
  const c2x = cx + dx * len * 0.78 + px * width * 0.3, c2y = cy + dy * len * 0.78 + py * width * 0.3;
  const c3x = cx + dx * len * 0.78 - px * width * 0.3, c3y = cy + dy * len * 0.78 - py * width * 0.3;
  const c4x = cx + dx * len * 0.32 - px * width * 0.95, c4y = cy + dy * len * 0.32 - py * width * 0.95;
  return `M${x0.toFixed(2)},${y0.toFixed(2)} C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${tipX.toFixed(2)},${tipY.toFixed(2)} C${c3x.toFixed(2)},${c3y.toFixed(2)} ${c4x.toFixed(2)},${c4y.toFixed(2)} ${x1.toFixed(2)},${y1.toFixed(2)} Z`;
}

const SPILL_TENDRILS = [
  { angle: -100, len: 44, width: 15 },
  { angle: -52, len: 30, width: 11 },
  { angle: -6, len: 40, width: 13 },
  { angle: 42, len: 24, width: 9 },
  { angle: 96, len: 46, width: 16 },
  { angle: 150, len: 28, width: 10 },
  { angle: 205, len: 36, width: 12 },
];

function SpillShape({ size, uid, iridescent }: { size: number; uid: string; iridescent: boolean }) {
  const cx = 50, cy = 50;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <ChromeStops id={`cg_${uid}`} angle={140} iridescent={iridescent} />
        <radialGradient id={`spec_${uid}`} cx="30%" cy="24%" r="40%">
          <stop offset="0%" stopColor={iridescent ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.88)"} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={`rim_${uid}`} cx="70%" cy="72%" r="26%">
          <stop offset="0%" stopColor={iridescent ? "rgba(255,150,90,0.5)" : "rgba(200,200,200,0.35)"} />
          <stop offset="100%" stopColor="rgba(200,200,200,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor={iridescent ? "rgba(90,190,255,0.3)" : "rgba(0,0,0,0.4)"} />
        </filter>
      </defs>
      <g filter={`url(#shadow_${uid})`}>
        {SPILL_TENDRILS.map((t, i) => (
          <path key={i} d={petalPath(cx, cy, t.angle, t.len, t.width)} fill={`url(#cg_${uid})`} />
        ))}
        <circle cx={cx} cy={cy} r={13} fill={`url(#cg_${uid})`} />
      </g>
      {SPILL_TENDRILS.map((t, i) => (
        <path key={`spec-${i}`} d={petalPath(cx, cy, t.angle, t.len, t.width)} fill={`url(#spec_${uid})`} opacity={0.7} />
      ))}
      <circle cx={cx} cy={cy} r={13} fill={`url(#spec_${uid})`} opacity={0.85} />
      <circle cx={cx} cy={cy} r={13} fill={`url(#rim_${uid})`} />
    </svg>
  );
}
