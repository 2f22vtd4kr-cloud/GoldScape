import { ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PropertyLocationMap } from '@/components/PropertyLocationMap';
import { FavoriteButton } from '@/components/FavoriteButton';
import { CompareButton } from '@/components/CompareButton';
import type { Listing } from '@/data/listings';
import { hasAgencyGallery, isListingVerified, listingCoverImage, formatBedsLabel, formatBathsLabel } from '@/lib/listingIntegrity';

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
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
        <img
          src={listingCoverImage(item)}
          alt={`${item.type} · ${item.city}, ${item.district}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 38%, transparent 58%), linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, transparent 28%)',
          }}
        />
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
        <div className="absolute bottom-3 left-3 right-3">
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

      <div className="flex flex-col gap-3.5 p-4 md:p-5 flex-1">
        <div>
          <div className="font-oxanium text-[15px] md:text-base font-medium dark:text-white text-foreground tracking-tight leading-snug">
            {item.city}
            <span className="mx-1.5 text-foreground/25 dark:text-white/25">·</span>
            <span className="dark:text-white/50 text-foreground/55 font-normal">{item.district}</span>
          </div>
          <div className="mt-1 text-[11px] uppercase tracking-[0.12em] dark:text-white/35 text-foreground/40">
            {item.type}
          </div>
        </div>

        <div className="flex items-center gap-3 text-[12px] dark:text-white/60 text-foreground/65">
          <span>{formatBedsLabel(item.beds)}</span>
          <span className="opacity-25">·</span>
          <span>{formatBathsLabel(item.baths)}</span>
          <span className="opacity-25">·</span>
          <span>{item.area} м²</span>
        </div>

        <div
          className="rounded-xl overflow-hidden border dark:border-white/[0.07] border-black/[0.06]"
          onClick={(e) => e.stopPropagation()}
        >
          <PropertyLocationMap
            {...item.locationMap}
            onPinClick={() => onOpen(item.id, window.innerWidth / 2, window.innerHeight * 0.4)}
          />
        </div>

        <div className="mt-auto pt-0.5 flex items-center justify-between gap-3">
          <div className="min-w-0 text-[11px] dark:text-white/38 text-foreground/42 truncate">
{hasAgencyGallery(item)
              ? `Проверено · ${item.agencyPhotos!.length} фото`
              : isListingVerified(item)
                ? 'Проверено'
                : 'В каталоге'}
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-medium tracking-[0.04em] dark:text-white/55 text-foreground/55 group-hover:dark:text-white group-hover:text-foreground transition-colors">
            Смотреть
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}
