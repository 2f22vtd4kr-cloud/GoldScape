import { ArrowUpRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { PropertyLocationMap } from '@/components/PropertyLocationMap';
import { FavoriteButton } from '@/components/FavoriteButton';
import { CompareButton } from '@/components/CompareButton';
import type { Listing } from '@/data/listings';
import { hasAgencyGallery, isListingVerified, listingCoverImage } from '@/lib/listingIntegrity';

/**
 * Listing card — cinematic photo-first, liquid-chrome price.
 * Hierarchy: photo → price (chrome) → place → specs → agency.
 * Map stays secondary. No generic SaaS card energy.
 */
export function PropertyCard({ item, onOpen }: { item: Listing; onOpen: (id: number, clientX: number, clientY: number) => void }) {
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={(e) => onOpen(item.id, e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') onOpen(item.id, window.innerWidth / 2, window.innerHeight / 2);
      }}
      className="eom-card flex flex-col group cursor-pointer overflow-hidden"
    >
      {/* ── Photo stage ─────────────────────────────────────────── */}
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
        <img
          src={listingCoverImage(item)}
          alt={`${item.type} \u00b7 ${item.city}, ${item.district}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {/* Cinematic vignette — heavier bottom for price legibility */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 38%, transparent 58%), linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 28%)',
          }}
        />

        {/* Badges + actions */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-black/50 backdrop-blur-md border border-white/12 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-white/90 uppercase">
              {item.country}
            </span>
            {isListingVerified(item) && (
              <span className="rounded-full bg-emerald-950/60 backdrop-blur-md border border-emerald-400/25 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-emerald-200/90 uppercase inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </span>
            )}
            {item.exclusive && (
              <span className="rounded-full bg-[#8b5e1a]/35 backdrop-blur-md border border-[#c9a227]/30 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-[#f0d78c] uppercase">
                Exclusive
              </span>
            )}
            {item.crypto && (
              <span className="rounded-full bg-black/50 backdrop-blur-md border border-white/12 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-white/80 uppercase">
                USDT
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <FavoriteButton id={item.id} />
            <CompareButton id={item.id} />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <div className="chrome-text font-oxanium text-xl md:text-2xl font-semibold tracking-tight leading-none">
              {item.price}
            </div>
            {item.pricePerSqm && (
              <div className="mt-1 text-[11px] tracking-wide text-white/55 font-space-grotesk">
                {item.pricePerSqm}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4 md:p-5 flex-1">
        <div>
          <div className="text-[11px] uppercase tracking-[0.14em] dark:text-white/40 text-foreground/45 font-space-grotesk mb-1">
            {item.city}
            {item.district ? ` \u00b7 ${item.district}` : ''}
          </div>
          <h3 className="font-oxanium text-base md:text-lg font-medium dark:text-white text-foreground tracking-tight leading-snug">
            {item.type}
          </h3>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[12px] dark:text-white/50 text-foreground/55 font-space-grotesk">
          {item.beds != null && (
            <span>{item.beds === 'Studio' ? 'Studio' : `${item.beds} \u0441\u043f.`}</span>
          )}
          {item.baths != null && <span>{item.baths} \u0441/\u0443</span>}
          {item.area != null && <span>{item.area} \u043c\u00b2</span>}
        </div>

        {item.locationMap && (
          <div className="rounded-xl overflow-hidden dark:border dark:border-white/8 border border-black/5" onClick={(e) => e.stopPropagation()}>
            <PropertyLocationMap
              {...item.locationMap}
            />
          </div>
        )}

        <div className="mt-auto pt-3 flex items-center justify-between gap-3 border-t dark:border-white/8 border-black/5">
          <div className="text-[11px] dark:text-white/40 text-foreground/45 font-space-grotesk min-w-0 truncate">
            {item.agencyUrl ? (
              <a
                href={item.agencyUrl}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1 hover:dark:text-white/70 hover:text-foreground/70 transition-colors"
              >
                {item.agency}
                <ExternalLink className="w-3 h-3 opacity-50" />
              </a>
            ) : (
              item.agency
            )}
            {hasAgencyGallery(item) && (
              <span className="ml-2 dark:text-white/28 text-foreground/32">
                \u00b7 {item.agencyPhotos!.length} \u0444\u043e\u0442\u043e
              </span>
            )}
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.04em] dark:text-white/55 text-foreground/55 group-hover:dark:text-white group-hover:text-foreground transition-colors">
            \u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}
