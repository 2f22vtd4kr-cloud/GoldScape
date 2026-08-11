import { ArrowUpRight, ShieldCheck, ExternalLink } from 'lucide-react';
import { PropertyLocationMap } from '@/components/PropertyLocationMap';
import { FavoriteButton } from '@/components/FavoriteButton';
import { CompareButton } from '@/components/CompareButton';
import type { Listing } from '@/data/listings';
import { hasAgencyGallery, isListingVerified } from '@/lib/listingIntegrity';

/**
 * Listing card — photo-first, restrained type hierarchy.
 * Price → place → specs → agency. Map stays secondary.
 */
export function PropertyCard({ item, onOpen }: { item: Listing; onOpen: (id: number, clientX: number, clientY: number) => void }) {
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={(e) => onOpen(item.id, e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2)}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(item.id, window.innerWidth / 2, window.innerHeight / 2); }}
      className="eom-card flex flex-col group cursor-pointer overflow-hidden"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-900">
        <img
          src={item.image}
          alt={`${item.type} · ${item.city}, ${item.district}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/20" />

        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="rounded-full bg-black/45 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-white/90 uppercase">
              {item.country}
            </span>
            {isListingVerified(item) && (
              <span className="rounded-full bg-emerald-950/55 backdrop-blur-md border border-emerald-400/25 px-2.5 py-1 text-[10px] font-medium tracking-[0.08em] text-emerald-200/95 uppercase inline-flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                {hasAgencyGallery(item) ? 'Фото' : 'OK'}
              </span>
            )}
            {item.exclusive && (
              <span className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-2.5 py-1 text-[10px] font-medium tracking-[0.14em] text-white/90 uppercase">
                Exclusive
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            <CompareButton id={item.id} />
            <FavoriteButton id={item.id} />
          </div>
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="text-white text-[1.65rem] md:text-[1.75rem] font-semibold tracking-tight leading-none drop-shadow-sm">
            {item.price}
          </div>
          <div className="mt-1 text-[11px] text-white/70 font-medium">
            {item.pricePerSqm}
            {item.crypto ? <span className="ml-2 text-amber-200/80">USDT</span> : null}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-5 flex flex-col flex-1 gap-3">
        <div>
          <div className="text-[15px] font-medium dark:text-white/90 text-foreground leading-snug">
            {item.city}
            <span className="mx-1.5 text-foreground/30">·</span>
            <span className="dark:text-white/55 text-foreground/60 font-normal">{item.district}</span>
          </div>
          <div className="mt-1 text-[12px] dark:text-white/40 text-foreground/45 tracking-[0.04em]">
            {item.type}
          </div>
        </div>

        <div className="flex items-center gap-3 text-[12px] dark:text-white/65 text-foreground/70">
          <span>{item.beds === 'Studio' ? 'Студия' : `${item.beds} спальни`}</span>
          <span className="opacity-25">·</span>
          <span>{item.baths} с/у</span>
          <span className="opacity-25">·</span>
          <span>{item.area} м²</span>
        </div>

        <div className="rounded-xl overflow-hidden border dark:border-white/8 border-black/6" onClick={(e) => e.stopPropagation()}>
          <PropertyLocationMap
            {...item.locationMap}
            onPinClick={() => onOpen(item.id, window.innerWidth / 2, window.innerHeight * 0.4)}
          />
        </div>

        <div className="mt-auto pt-1 flex items-center justify-between gap-3">
          <div className="min-w-0 text-[11px] dark:text-white/40 text-foreground/45 truncate">
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
              <span className="ml-2 dark:text-white/30 text-foreground/35">
                · {item.agencyPhotos!.length} фото
              </span>
            )}
          </div>
          <span className="shrink-0 inline-flex items-center gap-1 text-[11px] font-medium dark:text-white/55 text-foreground/55 group-hover:dark:text-white group-hover:text-foreground transition-colors">
            Смотреть
            <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}
