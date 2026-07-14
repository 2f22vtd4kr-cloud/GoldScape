import { motion } from 'framer-motion';

interface ChromeHeroFrameProps {
  opacity?: number;
  className?: string;
}

// Spike path generators — organic needle shapes
function spikeDown(x: number, L: number, W: number): string {
  const hw = W / 2;
  const bw = W * 0.38;
  const cw = W * 0.10;
  return `M ${x - hw},0 C ${x - bw},${L * 0.32} ${x - cw},${L * 0.76} ${x},${L} C ${x + cw},${L * 0.76} ${x + bw},${L * 0.32} ${x + hw},0 Z`;
}
function spikeUp(x: number, L: number, W: number, by = 900): string {
  const hw = W / 2;
  const bw = W * 0.38;
  const cw = W * 0.10;
  return `M ${x - hw},${by} C ${x - bw},${by - L * 0.32} ${x - cw},${by - L * 0.76} ${x},${by - L} C ${x + cw},${by - L * 0.76} ${x + bw},${by - L * 0.32} ${x + hw},${by} Z`;
}
function spikeRight(y: number, L: number, W: number): string {
  const hw = W / 2;
  const bw = W * 0.38;
  const cw = W * 0.10;
  return `M 0,${y - hw} C ${L * 0.32},${y - bw} ${L * 0.76},${y - cw} ${L},${y} C ${L * 0.76},${y + cw} ${L * 0.32},${y + bw} 0,${y + hw} Z`;
}
function spikeLeft(y: number, L: number, W: number, bx = 1440): string {
  const hw = W / 2;
  const bw = W * 0.38;
  const cw = W * 0.10;
  return `M ${bx},${y - hw} C ${bx - L * 0.32},${y - bw} ${bx - L * 0.76},${y - cw} ${bx - L},${y} C ${bx - L * 0.76},${y + cw} ${bx - L * 0.32},${y + bw} ${bx},${y + hw} Z`;
}
function star4(cx: number, cy: number, r: number): string {
  const a = r; const b = r * 0.22;
  return `M ${cx},${cy - a} C ${cx + b},${cy - b} ${cx + b},${cy - b} ${cx + a},${cy} C ${cx + b},${cy + b} ${cx + b},${cy + b} ${cx},${cy + a} C ${cx - b},${cy + b} ${cx - b},${cy + b} ${cx - a},${cy} C ${cx - b},${cy - b} ${cx - b},${cy - b} ${cx},${cy - a} Z`;
}

// All spike definitions
const TOP_SPIKES: Array<{ x: number; l: number; w: number }> = [
  // TL corner
  { x: 22,  l: 138, w: 5.5 }, { x: 50,  l: 192, w: 7   }, { x: 80,  l: 158, w: 5   },
  { x: 110, l: 218, w: 8   }, { x: 140, l: 132, w: 4.5 }, { x: 165, l: 172, w: 6   },
  { x: 192, l: 108, w: 4   }, { x: 218, l: 142, w: 5   },
  // TR corner
  { x: 1222, l: 142, w: 5 }, { x: 1248, l: 172, w: 6   }, { x: 1275, l: 108, w: 4   },
  { x: 1300, l: 192, w: 7 }, { x: 1330, l: 148, w: 5   }, { x: 1358, l: 165, w: 5.5 },
  { x: 1385, l: 132, w: 4.5}, { x: 1418, l: 192, w: 7  },
  // Top center accent
  { x: 692, l: 62, w: 3.5 }, { x: 720, l: 82, w: 4.5 }, { x: 748, l: 58, w: 3   },
];
const BOTTOM_SPIKES: Array<{ x: number; l: number; w: number }> = [
  // BL corner
  { x: 22,  l: 135, w: 5.5 }, { x: 50,  l: 188, w: 7   }, { x: 80,  l: 128, w: 4.5 },
  { x: 110, l: 175, w: 6   }, { x: 140, l: 148, w: 5   }, { x: 165, l: 122, w: 4   },
  { x: 192, l: 158, w: 5   }, { x: 218, l: 110, w: 3.5 },
  // BR corner
  { x: 1222, l: 138, w: 5 }, { x: 1250, l: 182, w: 6   }, { x: 1278, l: 122, w: 4  },
  { x: 1305, l: 162, w: 5.5}, { x: 1332, l: 138, w: 4.5}, { x: 1358, l: 165, w: 5  },
  { x: 1385, l: 138, w: 5  }, { x: 1418, l: 192, w: 7  },
  // Bottom center accent
  { x: 692, l: 60, w: 3 }, { x: 720, l: 78, w: 4.5 }, { x: 748, l: 55, w: 3 },
];
const LEFT_SPIKES: Array<{ y: number; l: number; w: number }> = [
  { y: 25,  l: 122, w: 5 }, { y: 58,  l: 175, w: 6   }, { y: 92,  l: 145, w: 5 },
  { y: 125, l: 115, w: 4 }, { y: 155, l: 92,  w: 3.5 },
  { y: 745, l: 122, w: 5 }, { y: 775, l: 165, w: 5.5 }, { y: 803, l: 135, w: 4.5 },
  { y: 832, l: 110, w: 4 }, { y: 864, l: 92,  w: 3.5 },
];
const RIGHT_SPIKES: Array<{ y: number; l: number; w: number }> = [
  { y: 25,  l: 122, w: 5 }, { y: 58,  l: 175, w: 6   }, { y: 92,  l: 145, w: 5 },
  { y: 125, l: 115, w: 4 }, { y: 155, l: 92,  w: 3.5 },
  { y: 745, l: 122, w: 5 }, { y: 775, l: 165, w: 5.5 }, { y: 803, l: 135, w: 4.5 },
  { y: 832, l: 110, w: 4 }, { y: 864, l: 92,  w: 3.5 },
];

// Web connections (connecting tips of nearby spikes in corners)
const WEB_LINES: Array<{ x1: number; y1: number; x2: number; y2: number }> = [
  // TL corner web
  { x1: 50,  y1: 192, x2: 175, y2: 58  },
  { x1: 110, y1: 218, x2: 145, y2: 92  },
  { x1: 80,  y1: 158, x2: 122, y2: 58  },
  { x1: 22,  y1: 138, x2: 175, y2: 25  },
  // TR corner web
  { x1: 1390, y1: 192, x2: 1265, y2: 58  },
  { x1: 1330, y1: 218, x2: 1295, y2: 92  },
  { x1: 1360, y1: 158, x2: 1318, y2: 58  },
  // BL corner web
  { x1: 50,   y1: 708, x2: 175, y2: 842 },
  { x1: 110,  y1: 682, x2: 145, y2: 808 },
  // BR corner web
  { x1: 1390, y1: 708, x2: 1265, y2: 842 },
  { x1: 1330, y1: 682, x2: 1295, y2: 808 },
];

// Crystal star positions (at intersections of web lines + spike tips)
const STARS: Array<{ x: number; y: number; r: number }> = [
  { x: 110, y: 218, r: 6 }, { x: 50,  y: 192, r: 5 }, { x: 1300, y: 192, r: 5 },
  { x: 1418, y: 192, r: 6}, { x: 720,  y: 82,  r: 5 }, { x: 720,  y: 818, r: 5 },
  { x: 22,  y: 138, r: 4 }, { x: 1418, y: 708, r: 6},
];

export function ChromeHeroFrame({ opacity = 0.70, className = '' }: ChromeHeroFrameProps) {
  return (
    <motion.div
      className={`absolute inset-0 pointer-events-none select-none hidden lg:block ${className}`}
      style={{ zIndex: 15 }}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{ duration: 1.8, ease: 'easeOut' }}
    >
      <motion.svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        animate={{ scale: [1, 1.004, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      >
        <defs>
          {/* Main chrome gradient */}
          <linearGradient id="cg1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#1c1c1c" />
            <stop offset="18%"  stopColor="#606060" />
            <stop offset="38%"  stopColor="#b8b8b8" />
            <stop offset="50%"  stopColor="#f4f4f4" />
            <stop offset="62%"  stopColor="#d0d0d0" />
            <stop offset="78%"  stopColor="#888888" />
            <stop offset="100%" stopColor="#2a2a2a" />
          </linearGradient>
          {/* Bright chrome for star tips */}
          <radialGradient id="sg" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="1"   />
            <stop offset="55%"  stopColor="#d8d8d8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#606060" stopOpacity="0.2" />
          </radialGradient>
          {/* Chrome border line gradient */}
          <linearGradient id="bgl" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%"   stopColor="#404040" stopOpacity="0.9" />
            <stop offset="15%"  stopColor="#e0e0e0" stopOpacity="1"   />
            <stop offset="50%"  stopColor="#888888" stopOpacity="0.5" />
            <stop offset="85%"  stopColor="#e0e0e0" stopOpacity="1"   />
            <stop offset="100%" stopColor="#404040" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="bgv" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%"   stopColor="#404040" stopOpacity="0.9" />
            <stop offset="15%"  stopColor="#d8d8d8" stopOpacity="1"   />
            <stop offset="50%"  stopColor="#808080" stopOpacity="0.4" />
            <stop offset="85%"  stopColor="#d8d8d8" stopOpacity="1"   />
            <stop offset="100%" stopColor="#404040" stopOpacity="0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>

        {/* ── Web connections (draw first, behind spikes) ── */}
        {WEB_LINES.map((l, i) => (
          <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
            stroke="url(#cg1)" strokeWidth="0.65" opacity="0.35" />
        ))}

        {/* ── Top spikes ── */}
        {TOP_SPIKES.map((s, i) => (
          <path key={`t${i}`} d={spikeDown(s.x, s.l, s.w)}
            fill="url(#cg1)" opacity="0.88" filter="url(#glow)" />
        ))}

        {/* ── Bottom spikes ── */}
        {BOTTOM_SPIKES.map((s, i) => (
          <path key={`b${i}`} d={spikeUp(s.x, s.l, s.w)}
            fill="url(#cg1)" opacity="0.88" filter="url(#glow)" />
        ))}

        {/* ── Left spikes ── */}
        {LEFT_SPIKES.map((s, i) => (
          <path key={`l${i}`} d={spikeRight(s.y, s.l, s.w)}
            fill="url(#cg1)" opacity="0.88" filter="url(#glow)" />
        ))}

        {/* ── Right spikes ── */}
        {RIGHT_SPIKES.map((s, i) => (
          <path key={`r${i}`} d={spikeLeft(s.y, s.l, s.w)}
            fill="url(#cg1)" opacity="0.88" filter="url(#glow)" />
        ))}

        {/* ── Crystal stars at key intersections ── */}
        {STARS.map((s, i) => (
          <path key={`s${i}`} d={star4(s.x, s.y, s.r)}
            fill="url(#sg)" opacity="0.95" filter="url(#glow)" />
        ))}

        {/* ── Chrome border lines ── */}
        <line x1="0" y1="1.2" x2="1440" y2="1.2"   stroke="url(#bgl)" strokeWidth="1.2" opacity="0.65" />
        <line x1="0" y1="898.8" x2="1440" y2="898.8" stroke="url(#bgl)" strokeWidth="1.2" opacity="0.65" />
        <line x1="1.2" y1="0" x2="1.2" y2="900"     stroke="url(#bgv)" strokeWidth="1.2" opacity="0.65" />
        <line x1="1438.8" y1="0" x2="1438.8" y2="900" stroke="url(#bgv)" strokeWidth="1.2" opacity="0.65" />
      </motion.svg>
    </motion.div>
  );
}
