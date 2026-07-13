import { useState } from 'react';
import { motion } from 'framer-motion';

export interface TerrainLandmark {
  id: string;
  label: string;
  emoji: string;
  svgX: number;
  svgY: number;
  distance: string;
  time: string;
  accent: string;
}

export const DUBAI_DOWNTOWN_LANDMARKS: TerrainLandmark[] = [
  { id: 'burj',    label: 'Burj Khalifa',   emoji: '🏙', svgX: 189, svgY: 126, distance: '0.5 км', time: '2 мин',  accent: '#d4c8ff' },
  { id: 'mall',    label: 'Dubai Mall',      emoji: '🛍', svgX: 214, svgY: 157, distance: '0.8 км', time: '3 мин',  accent: '#88cbff' },
  { id: 'beach',   label: 'Jumeirah Beach',  emoji: '🏖', svgX: 62,  svgY: 52,  distance: '8 км',   time: '15 мин', accent: '#40e8f0' },
  { id: 'airport', label: 'DXB Airport',     emoji: '✈',  svgX: 364, svgY: 18,  distance: '18 км',  time: '25 мин', accent: '#f8d060' },
];

interface IsoTerrainProps {
  propertyName: string;
  propertyAddress?: string;
  propertySvgX?: number;
  propertySvgY?: number;
  landmarks?: TerrainLandmark[];
  className?: string;
}

// Street grid
const STREETS_H = [38, 70, 102, 134, 166, 198, 232, 264];
const STREETS_V = [52, 82, 118, 146, 172, 198, 228, 260, 298, 350];
const HIGHWAY_X = 184;

// Building blocks (Dubai Downtown simplified)
const BUILDINGS = [
  { x: 188, y: 108, w: 7,  h: 26, o: 0.88 }, // Burj Khalifa tower
  { x: 197, y: 116, w: 12, h: 16, o: 0.75 }, // Burj Khalifa base
  { x: 200, y: 134, w: 10, h: 14, o: 0.70 }, // Address Hotel
  { x: 175, y: 115, w: 8,  h: 12, o: 0.62 }, // Emaar Square block
  { x: 170, y: 130, w: 6,  h: 18, o: 0.68 }, // Emirates Towers
  { x: 155, y: 95,  w: 14, h: 20, o: 0.58 }, // DIFC cluster
  { x: 160, y: 115, w: 10, h: 12, o: 0.54 }, // DIFC mid
  { x: 205, y: 148, w: 26, h: 16, o: 0.52 }, // Dubai Mall
  { x: 220, y: 136, w: 8,  h: 22, o: 0.72 }, // BB tower 1
  { x: 230, y: 140, w: 6,  h: 19, o: 0.66 }, // BB tower 2
  { x: 242, y: 144, w: 8,  h: 17, o: 0.60 }, // BB tower 3
  { x: 253, y: 148, w: 6,  h: 14, o: 0.55 }, // BB block
  { x: 265, y: 152, w: 10, h: 12, o: 0.48 }, // BB far
  { x: 108, y: 72,  w: 14, h:  8, o: 0.38 }, // Residential A
  { x: 128, y: 80,  w: 10, h:  8, o: 0.36 }, // Residential B
  { x: 285, y: 158, w: 12, h: 10, o: 0.44 }, // East block
  { x: 305, y: 152, w: 8,  h:  8, o: 0.40 }, // East block 2
  { x: 145, y: 62,  w: 8,  h:  6, o: 0.35 }, // North block
  { x: 212, y: 104, w: 6,  h:  8, o: 0.60 }, // Downtown N
  { x: 206, y: 116, w: 8,  h: 12, o: 0.65 }, // Downtown NW
];

export function IsoTerrain({
  propertyName,
  propertyAddress,
  propertySvgX = 200,
  propertySvgY = 138,
  landmarks = DUBAI_DOWNTOWN_LANDMARKS,
  className = '',
}: IsoTerrainProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  const shortName = propertyName.length > 18 ? propertyName.slice(0, 17) + '…' : propertyName;

  return (
    <div className={`iso-terrain-wrap ${className}`}>
      {/* ── 3D tile ───────────────────────────────────────────────────── */}
      <div className="flex justify-center mb-10">
        <div className="iso-outer">
          <motion.div
            className="iso-tile relative rounded overflow-hidden"
            style={{ width: 'clamp(300px, 68vw, 540px)', aspectRatio: '400 / 280' }}
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <svg viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full block">
              <defs>
                <radialGradient id="pg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="55%"  stopColor="#d0c8ff" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8060ff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="wg" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%"   stopColor="#003448" stopOpacity="0.75" />
                  <stop offset="100%" stopColor="#001c2a" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="ag" cx="50%" cy="50%" r="50%">
                  <stop offset="0%"   stopColor="#5030e8" stopOpacity="0.14" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <filter id="blur2"><feGaussianBlur stdDeviation="2" /></filter>
                <filter id="blur4"><feGaussianBlur stdDeviation="4" /></filter>
              </defs>

              {/* Background */}
              <rect width="400" height="280" fill="#050608" />

              {/* Coastal water — left side */}
              <rect x="0" y="0" width="75" height="280" fill="url(#wg)" />
              <path d="M 73,0 C 68,70 62,140 58,210 C 54,250 52,265 50,280"
                fill="none" stroke="#006688" strokeWidth="0.8" opacity="0.45" />

              {/* Horizontal streets */}
              {STREETS_H.map(y => (
                <line key={`h${y}`} x1="50" y1={y} x2="400" y2={y}
                  stroke="rgba(255,255,255,0.085)" strokeWidth="0.65" />
              ))}
              {/* Vertical streets */}
              {STREETS_V.map(x => (
                <line key={`v${x}`} x1={x} y1="0" x2={x} y2="280"
                  stroke="rgba(255,255,255,0.065)" strokeWidth="0.55" />
              ))}

              {/* Sheikh Zayed Road — main artery */}
              <line x1={HIGHWAY_X} y1="0" x2={HIGHWAY_X} y2="280"
                stroke="rgba(255,255,255,0.24)" strokeWidth="2.4" />
              <line x1={HIGHWAY_X + 6} y1="0" x2={HIGHWAY_X + 6} y2="280"
                stroke="rgba(255,255,255,0.08)" strokeWidth="0.9" />

              {/* Financial Centre Road */}
              <line x1="160" y1="55" x2="163" y2="225"
                stroke="rgba(255,255,255,0.15)" strokeWidth="1.3" />

              {/* Major cross streets */}
              <line x1="50" y1="102" x2="400" y2="102"
                stroke="rgba(255,255,255,0.17)" strokeWidth="1.4" />
              <line x1="50" y1="166" x2="400" y2="166"
                stroke="rgba(255,255,255,0.14)" strokeWidth="1.2" />

              {/* Dubai Creek */}
              <path d="M 316,280 C 334,242 348,204 364,162 C 378,124 388,84 396,44"
                fill="none" stroke="#004455" strokeWidth="9" opacity="0.40" />
              <path d="M 316,280 C 334,242 348,204 364,162 C 378,124 388,84 396,44"
                fill="none" stroke="#00aacc" strokeWidth="1.2" opacity="0.25" />

              {/* Buildings */}
              {BUILDINGS.map((b, i) => (
                <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h}
                  fill={`rgba(30,28,55,${b.o})`}
                  stroke="rgba(255,255,255,0.20)"
                  strokeWidth="0.45"
                  rx="0.4"
                />
              ))}

              {/* Property area glow */}
              <ellipse cx={propertySvgX} cy={propertySvgY} rx="44" ry="30"
                fill="url(#ag)" filter="url(#blur4)" />

              {/* ── Landmark pins ── */}
              {landmarks.map(lm => {
                const active = hovered === lm.id;
                return (
                  <g key={lm.id}
                    onMouseEnter={() => setHovered(lm.id)}
                    onMouseLeave={() => setHovered(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle cx={lm.svgX} cy={lm.svgY} r={active ? 9 : 6}
                      fill={lm.accent} opacity={active ? 0.18 : 0.08} />
                    <circle cx={lm.svgX} cy={lm.svgY} r={active ? 5.5 : 3.8}
                      fill="none" stroke={lm.accent} strokeWidth={active ? 1.2 : 0.75}
                      opacity={active ? 0.80 : 0.55} />
                    <circle cx={lm.svgX} cy={lm.svgY} r={active ? 3 : 2}
                      fill={lm.accent} opacity={active ? 1 : 0.80} />
                    {/* Label */}
                    <text x={lm.svgX + 7} y={lm.svgY - 2}
                      fill={lm.accent} fontSize="6.2"
                      fontFamily="Oxanium, sans-serif"
                      opacity={active ? 1 : 0.60}
                    >{lm.label}</text>
                    {/* Time (only when hovered) */}
                    {active && (
                      <text x={lm.svgX + 7} y={lm.svgY + 6}
                        fill="rgba(255,255,255,0.65)" fontSize="5.4"
                        fontFamily="Space Grotesk, sans-serif"
                      >{lm.distance} · {lm.time}</text>
                    )}
                  </g>
                );
              })}

              {/* ── Property pin ── */}
              {/* Pulse rings */}
              <circle cx={propertySvgX} cy={propertySvgY} r="8" fill="none"
                stroke="white" strokeWidth="0.8" opacity="0">
                <animate attributeName="r"       values="8;24"   dur="2.4s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.45;0" dur="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx={propertySvgX} cy={propertySvgY} r="8" fill="none"
                stroke="#c0a8ff" strokeWidth="0.6" opacity="0">
                <animate attributeName="r"       values="8;24"   dur="2.4s" begin="1.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.35;0" dur="2.4s" begin="1.2s" repeatCount="indefinite" />
              </circle>
              {/* Glow */}
              <circle cx={propertySvgX} cy={propertySvgY} r="14"
                fill="url(#pg)" opacity="0.55" filter="url(#blur2)" />
              {/* Core */}
              <circle cx={propertySvgX} cy={propertySvgY} r="5.5"
                fill="white" opacity="0.95" />
              <circle cx={propertySvgX} cy={propertySvgY} r="2.8"
                fill="white" />
              {/* Stake */}
              <line x1={propertySvgX} y1={propertySvgY + 5.5}
                    x2={propertySvgX} y2={propertySvgY + 14}
                stroke="white" strokeWidth="1.4" opacity="0.55" />
              {/* Label pill */}
              <rect x={propertySvgX - 36} y={propertySvgY - 26} width="72" height="14"
                fill="rgba(6,4,18,0.88)" rx="3.5"
                stroke="rgba(255,255,255,0.22)" strokeWidth="0.5" />
              <text x={propertySvgX} y={propertySvgY - 15}
                fill="white" fontSize="6.5" fontFamily="Oxanium, sans-serif"
                textAnchor="middle" opacity="0.96"
              >{shortName}</text>

              {/* Compass */}
              <g transform="translate(380, 18)" opacity="0.28">
                <line x1="0" y1="-7" x2="0" y2="7"   stroke="white" strokeWidth="0.7" />
                <line x1="-7" y1="0" x2="7" y2="0"   stroke="white" strokeWidth="0.7" />
                <polygon points="0,-7 -1.5,-4 1.5,-4" fill="white" opacity="0.6" />
                <text x="0" y="-10" fill="white" fontSize="5" textAnchor="middle"
                  fontFamily="Oxanium, sans-serif">N</text>
              </g>

              {/* Scale bar */}
              <g transform="translate(68, 268)" opacity="0.30">
                <line x1="0" y1="0" x2="26" y2="0" stroke="white" strokeWidth="0.7" />
                <line x1="0"  y1="-2.5" x2="0"  y2="2.5" stroke="white" strokeWidth="0.7" />
                <line x1="26" y1="-2.5" x2="26" y2="2.5" stroke="white" strokeWidth="0.7" />
                <text x="13" y="-5" fill="white" fontSize="5"
                  textAnchor="middle" fontFamily="Space Grotesk, sans-serif">1 км</text>
              </g>

              {/* City label */}
              <text x="200" y="275" fill="rgba(255,255,255,0.18)" fontSize="7"
                textAnchor="middle" fontFamily="Oxanium, sans-serif" letterSpacing="0.18em">
                DUBAI · DOWNTOWN
              </text>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* ── Legend chips ─────────────────────────────────────────────── */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Property chip */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/14">
          <div className="w-2.5 h-2.5 rounded-full bg-white"
            style={{ boxShadow: '0 0 8px rgba(255,255,255,0.85), 0 0 16px rgba(200,180,255,0.5)' }} />
          <span className="font-oxanium text-[11px] text-white uppercase tracking-wider">
            {propertyName}
          </span>
          {propertyAddress && (
            <span className="font-space-grotesk text-[10px] text-white/35 border-l border-white/10 pl-2">
              {propertyAddress}
            </span>
          )}
        </div>

        {landmarks.map(lm => (
          <div
            key={lm.id}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border cursor-default transition-all duration-200"
            style={{
              background: hovered === lm.id ? `${lm.accent}20` : `${lm.accent}0c`,
              borderColor: hovered === lm.id ? `${lm.accent}55` : `${lm.accent}28`,
            }}
            onMouseEnter={() => setHovered(lm.id)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="w-2 h-2 rounded-full shrink-0"
              style={{ background: lm.accent, boxShadow: `0 0 6px ${lm.accent}90` }} />
            <span className="font-oxanium text-[10px] uppercase tracking-wider"
              style={{ color: lm.accent }}>
              {lm.label}
            </span>
            <span className="font-space-grotesk text-[10px] text-white/38 border-l border-white/10 pl-2">
              {lm.distance}
            </span>
            <span className="font-space-grotesk text-[10px] text-white/28">
              {lm.time}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
