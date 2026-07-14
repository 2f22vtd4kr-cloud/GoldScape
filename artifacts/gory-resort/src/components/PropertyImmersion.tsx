import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

export interface ImmersionListing {
  image: string;
  mapImage: string;
  city: string;
  district: string;
  type: string;
  price: string;
  beds: number | string;
  baths: number;
  area: number;
  pinPos?: { x: number; y: number };
  accentColor?: string;
}

interface Props {
  listing: ImmersionListing | null;
  /** Viewport position (in %) the pin was clicked at — the "fly into" wipe expands from here. */
  origin: { x: number; y: number } | null;
  onClose: () => void;
}

/**
 * Full-screen "fly into the building" transition: an iris wipe expands from
 * the exact spot the user tapped on the isometric location map, the map
 * image rushes forward and dissolves, and the property's real photo settles
 * in behind it — as if the user descended from the map straight into the
 * building it marks.
 */
export function PropertyImmersion({ listing, origin, onClose }: Props) {
  useEffect(() => {
    if (!listing) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [listing, onClose]);

  const clickX = origin?.x ?? 50;
  const clickY = origin?.y ?? 50;
  const mapX = listing?.pinPos?.x ?? 50;
  const mapY = listing?.pinPos?.y ?? 50;
  const accent = listing?.accentColor ?? 'hsl(38, 90%, 58%)';

  return (
    <AnimatePresence>
      {listing && (
        <motion.div
          className="fixed inset-0 z-[200] overflow-hidden bg-black"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, black)` }}
          initial={{ clipPath: `circle(0% at ${clickX}% ${clickY}%)` }}
          animate={{ clipPath: `circle(150% at ${clickX}% ${clickY}%)` }}
          exit={{ clipPath: `circle(0% at ${clickX}% ${clickY}%)` }}
          transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
        >
          {/* Isometric map rushes forward and dissolves — the "descent" */}
          <motion.img
            src={listing.mapImage}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transformOrigin: `${mapX}% ${mapY}%` }}
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 0, scale: 12 }}
            transition={{ duration: 1.0, ease: [0.8, 0, 1, 1] }}
          />
          {/* Real photo settles in — "arriving" inside the property */}
          <motion.img
            src={listing.image}
            alt={`${listing.type} · ${listing.city}, ${listing.district}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, delay: 0.4, ease: 'easeOut' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/55" />

          <motion.button
            type="button"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-black/50 border border-white/15 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white hover:border-white/40 transition-colors"
            aria-label="Закрыть"
          >
            <X className="w-5 h-5" />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute bottom-0 left-0 right-0 p-6 md:p-14 max-w-3xl"
          >
            <div className="flex items-center gap-2 text-white/55 text-[11px] font-oxanium uppercase tracking-[0.2em] mb-3">
              <MapPin className="w-3.5 h-3.5" />
              {listing.city} · {listing.district}
            </div>
            <div className="text-3xl md:text-5xl font-oxanium font-bold chrome-text mb-4">
              {listing.price}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/70 text-sm font-space-grotesk mb-7">
              <span>{listing.type}</span>
              <span className="opacity-30">·</span>
              <span>{listing.beds} спальни</span>
              <span className="opacity-30">·</span>
              <span>{listing.baths} санузла</span>
              <span className="opacity-30">·</span>
              <span>{listing.area} м²</span>
            </div>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noreferrer"
              className="eom-btn-primary inline-flex font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-8 items-center justify-center"
            >
              Написать в WhatsApp
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
