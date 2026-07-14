import { Waves, Building2, ShoppingBag, Landmark, Car } from 'lucide-react';

/**
 * RULE: every property listing must ship with a `locationMap` — a generated
 * isometric terrain-diorama image (transparent PNG, @assets/generated_images/listing-map-*)
 * plus 2–3 `distances` entries (drive time in minutes to the sea/nearest water
 * or park landmark, to the city centre, and to the nearest major mall). This
 * is how EstateofMind answers Viktor/Irina/Dmitri's first question — "where
 * exactly is this, and how far from everything that matters" — without
 * forcing them into a real interactive map or a phone call.
 *
 * For inland listings with no coastline, swap the "sea" entry for the
 * nearest relevant landmark (river, park, old town) using icon: 'landmark'.
 */
export type DistanceIcon = 'sea' | 'center' | 'mall' | 'landmark';

export interface Distance {
  icon:    DistanceIcon;
  label:   string;   // e.g. "До моря", "До центра города", "До ТЦ"
  minutes: number;
}

export interface LocationMap {
  image:     string;   // isometric diorama, transparent background
  distances: Distance[];
}

const ICONS: Record<DistanceIcon, typeof Waves> = {
  sea:      Waves,
  center:   Building2,
  mall:     ShoppingBag,
  landmark: Landmark,
};

interface PropertyLocationMapProps extends LocationMap {
  /** Fired when the pin is clicked, with the click's viewport position (used to
   *  anchor the "fly into the building" immersion animation at the exact spot
   *  the user tapped). */
  onPinClick?: (origin: { x: number; y: number }) => void;
}

export function PropertyLocationMap({ image, distances, onPinClick }: PropertyLocationMapProps) {
  return (
    <div className="relative rounded-lg overflow-hidden border border-white/5 bg-[#0c0c0c]">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(139,94,26,0.14), transparent 60%)',
          }}
        />
        <img
          src={image}
          alt="Изометрическая карта локации объекта"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-contain scale-[1.12] drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
        />

        {/* Pin marking the exact property — a slow-breathing, iridescent
            "oil-slick" glow (not a literal map pin icon, which read as a
            lightbulb) so the exact building draws the eye and invites a tap. */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPinClick?.({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
          }}
          className="property-pin absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2"
          aria-label="Смотреть этот объект"
          title="Смотреть этот объект"
        >
          <span className="property-pin__halo" aria-hidden="true" />
          <span className="property-pin__core" aria-hidden="true" />
        </button>
      </div>

      <div className="flex items-center divide-x divide-white/5 border-t border-white/5">
        {distances.map((d) => {
          const Icon = ICONS[d.icon];
          return (
            <div
              key={d.label}
              title={d.label}
              className="flex-1 min-h-[48px] flex items-center justify-center gap-1.5 px-2 py-2"
            >
              <Icon className="w-3.5 h-3.5 text-gray-500 shrink-0" />
              <span className="text-[12px] font-space-grotesk text-gray-300 whitespace-nowrap">
                {d.minutes} мин
              </span>
              <Car className="w-3 h-3 text-gray-600 shrink-0" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
