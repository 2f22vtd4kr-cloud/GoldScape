import { useId } from 'react';

type Variant = 'blob' | 'star4' | 'spike' | 'ring' | 'orb' | 'drip';

interface Props {
  variant?: Variant;
  size?: number;
  iridescent?: boolean;
  breathe?: boolean;
  float?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** 0–360 — initial hue rotation for iridescent variants */
  hueOffset?: number;
}

/** Pixel-perfect 3D chrome shape with breathing / floating animations.
 *  Matches the Softulka "3D Chrome Shapes" pack aesthetic:
 *  hard specular highlight, deep shadow band, secondary rim light. */
export function ChromeShape({
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
    </span>
  );
}

/* ─── Chrome gradient palette ──────────────────────────────────────────── */

function ChromeStops({ id, angle = 145, iridescent = false }: { id: string; angle?: number; iridescent?: boolean }) {
  if (iridescent) {
    return (
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1"
        gradientTransform={`rotate(${angle}, 0.5, 0.5)`}>
        <stop offset="0%"   stopColor="#0e0a1e" />
        <stop offset="12%"  stopColor="#2a1a50" />
        <stop offset="24%"  stopColor="#5a3aa0" />
        <stop offset="34%"  stopColor="#9070d8" />
        <stop offset="42%"  stopColor="#e0d4fc" />
        <stop offset="48%"  stopColor="#f8f4ff" />
        <stop offset="54%"  stopColor="#c0a8f0" />
        <stop offset="64%"  stopColor="#5040a8" />
        <stop offset="74%"  stopColor="#7070c8" />
        <stop offset="84%"  stopColor="#d0c4f4" />
        <stop offset="92%"  stopColor="#9880d0" />
        <stop offset="100%" stopColor="#1a0e30" />
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

/* ─── Blob ──────────────────────────────────────────────────────────────── */

function BlobShape({ size, uid, iridescent, hueOffset }: { size: number; uid: string; iridescent: boolean; hueOffset: number }) {
  const s = size;
  return (
    <svg viewBox="0 0 100 100" width={s} height={s} xmlns="http://www.w3.org/2000/svg"
      style={iridescent ? { filter: `hue-rotate(${hueOffset}deg)` } : undefined}>
      <defs>
        <ChromeStops id={`cg_${uid}`} angle={148} iridescent={iridescent} />
        <radialGradient id={`spec_${uid}`} cx="28%" cy="22%" r="35%">
          <stop offset="0%" stopColor={iridescent ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.85)"} />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
        <radialGradient id={`rim_${uid}`} cx="70%" cy="74%" r="22%">
          <stop offset="0%" stopColor={iridescent ? "rgba(200,160,255,0.55)" : "rgba(200,200,200,0.35)"} />
          <stop offset="100%" stopColor="rgba(200,200,200,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={iridescent ? "rgba(120,60,220,0.3)" : "rgba(0,0,0,0.4)"} />
        </filter>
      </defs>
      {/* Organic blob path — amoeba shape */}
      <path
        d="M 70,12 C 88,18 94,38 90,56 C 86,74 74,90 56,92 C 38,94 18,84 12,66 C 6,48 14,26 30,16 C 46,6 52,6 70,12 Z"
        fill={`url(#cg_${uid})`}
        filter={`url(#shadow_${uid})`}
      />
      <path
        d="M 70,12 C 88,18 94,38 90,56 C 86,74 74,90 56,92 C 38,94 18,84 12,66 C 6,48 14,26 30,16 C 46,6 52,6 70,12 Z"
        fill={`url(#spec_${uid})`}
      />
      <path
        d="M 70,12 C 88,18 94,38 90,56 C 86,74 74,90 56,92 C 38,94 18,84 12,66 C 6,48 14,26 30,16 C 46,6 52,6 70,12 Z"
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
      {/* 4-pointed cusped star — matched to Softulka 4-pt star shape */}
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
      <polygon
        points={pts.join(' ')}
        fill={`url(#cg_${uid})`}
        filter={`url(#shadow_${uid})`}
      />
      <polygon points={pts.join(' ')} fill={`url(#spec_${uid})`} />
    </svg>
  );
}

/* ─── Ring / torus ──────────────────────────────────────────────────────── */

function RingShape({ size, uid, iridescent }: { size: number; uid: string; iridescent: boolean }) {
  // Annulus via evenodd fill rule
  const outer = "M50 4 a46 46 0 0 1 0 92 a46 46 0 0 1 0-92 Z";
  const inner = "M50 26 a24 24 0 0 0 0 48 a24 24 0 0 0 0-48 Z";
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Ring chrome goes lighter in the upper-right of the tube */}
        <linearGradient id={`cg_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          {iridescent ? (
            <>
              <stop offset="0%"   stopColor="#0e0a1e" />
              <stop offset="18%"  stopColor="#4a3888" />
              <stop offset="34%"  stopColor="#ddd0f8" />
              <stop offset="46%"  stopColor="#f8f4ff" />
              <stop offset="58%"  stopColor="#6050b0" />
              <stop offset="70%"  stopColor="#1e1238" />
              <stop offset="82%"  stopColor="#8878c8" />
              <stop offset="92%"  stopColor="#d8ccf4" />
              <stop offset="100%" stopColor="#382868" />
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
          <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor={iridescent ? "rgba(80,40,180,0.4)" : "rgba(0,0,0,0.5)"} />
        </filter>
      </defs>
      <path
        fillRule="evenodd"
        d={`${outer} ${inner}`}
        fill={`url(#cg_${uid})`}
        filter={`url(#shadow_${uid})`}
      />
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
              <stop offset="14%"  stopColor="#e0d8fc" />
              <stop offset="28%"  stopColor="#9878e0" />
              <stop offset="46%"  stopColor="#4030a0" />
              <stop offset="65%"  stopColor="#1a0e3a" />
              <stop offset="80%"  stopColor="#2a1a50" />
              <stop offset="100%" stopColor="#080410" />
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
        {/* Secondary rim light bottom-right */}
        <radialGradient id={`rim_${uid}`} cx="68%" cy="72%" r="22%">
          <stop offset="0%" stopColor={iridescent ? "rgba(180,140,255,0.45)" : "rgba(160,160,160,0.35)"} />
          <stop offset="100%" stopColor="rgba(160,160,160,0)" />
        </radialGradient>
        <filter id={`shadow_${uid}`}>
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor={iridescent ? "rgba(80,30,200,0.35)" : "rgba(0,0,0,0.5)"} />
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
      {/* Liquid drip — flat top, tapered bottom point */}
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
