import { ArrowRight, ShieldCheck } from 'lucide-react';
import { PropertyLocationMap } from '@/components/PropertyLocationMap';
import { FavoriteButton } from '@/components/FavoriteButton';
import { CompareButton } from '@/components/CompareButton';
import type { Listing } from '@/data/listings';

/**
 * Shared listing card — used by the full catalogue (Properties.tsx) and the
 * saved-listings page (Favorites.tsx) so the two stay visually identical.
 * Nika's hierarchy: Price -> Location -> Type -> Specs.
 */
export function PropertyCard({ item, onOpen }: { item: Listing; onOpen: (id: number, clientX: number, clientY: number) => void }) {
  return (
    <div
      role="link"
      tabIndex={0}
      onClick={(e) => onOpen(item.id, e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2)}
      onKeyDown={(e) => { if (e.key === 'Enter') onOpen(item.id, window.innerWidth / 2, window.innerHeight / 2); }}
      className="eom-card flex flex-col group cursor-pointer overflow-hidden rounded-xl transition-all duration-300"
    >
      {/* Photo container — bg-[#111] is intentional placeholder behind <img> */}
      <div className="relative aspect-[3/2] overflow-hidden bg-[#111]">
        <img
          src={item.image}
          alt={`${item.type} · ${item.city}, ${item.district}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Photo legibility scrim — intentionally dark in both themes */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Photo badges — intentionally dark in both themes for legibility */}
        <div className={`absolute top-4 left-4 right-4 flex flex-wrap gap-2 ${item.exclusive ? 'pr-24' : ''}`}>
          <div className="bg-[#080808]/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-oxanium flex items-center gap-1.5 shadow-lg">
            <span className="text-gray-200 tracking-wider uppercase">{item.country}</span>
          </div>
          {item.tags?.map(tag => (
            <div key={tag} className="bg-[#141414]/90 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-space-grotesk text-white/80 shadow-lg whitespace-nowrap">
              {tag}
            </div>
          ))}
        </div>

        {item.exclusive && (
          <div className="absolute top-4 right-4">
            {/* Exclusive badge sits over photo — intentionally dark in both themes */}
            <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded px-2 py-1 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
              <span className="iridescent-text text-[9px] font-oxanium font-bold uppercase tracking-[0.2em]">
                ЭКСКЛЮЗИВ
              </span>
            </div>
          </div>
        )}

        <CompareButton id={item.id} className="absolute bottom-3 left-3" />
        <FavoriteButton id={item.id} className="absolute bottom-3 right-3" />
      </div>

      <div className="p-5 flex flex-col flex-1 relative">
        {/* Decorative background glow on hover */}
        <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-white/[0.03] dark:to-transparent bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="mb-4 flex flex-col gap-1 relative z-10">
          <div className="text-2xl font-oxanium font-bold chrome-text tracking-tight">{item.price}</div>
          <div className="flex items-center gap-2 text-[11px] font-space-grotesk dark:text-gray-500 text-foreground/50">
            <span>{item.pricePerSqm}</span>
            {item.crypto && (
              <>
                <span className="opacity-30">|</span>
                <span className="text-[#8b5e1a]/80 font-medium flex items-center gap-1">USDT</span>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 mb-5 relative z-10">
          <div className="text-sm font-space-grotesk dark:text-gray-200 text-foreground/75 font-medium">
            {item.city} <span className="mx-1 opacity-40">·</span> <span className="dark:text-gray-400 text-foreground/60">{item.district}</span>
          </div>
          <div className="text-[10px] font-oxanium uppercase tracking-[0.2em] dark:text-gray-500 text-foreground/50 font-medium">
            {item.type}
          </div>
        </div>

        <div className="flex gap-5 mb-5 pt-4 dark:border-t dark:border-white/5 border-t border-black/5 text-[13px] font-space-grotesk dark:text-gray-300 text-foreground/75 relative z-10">
          <div className="flex items-center gap-1.5" title="Спальни">
            <span className="dark:text-gray-500 text-foreground/50 text-[11px] uppercase tracking-wider">Beds</span> {item.beds}
          </div>
          <div className="flex items-center gap-1.5" title="Ванные">
            <span className="dark:text-gray-500 text-foreground/50 text-[11px] uppercase tracking-wider">Baths</span> {item.baths}
          </div>
          <div className="flex items-center gap-1.5" title="Площадь">
            <span className="dark:text-gray-500 text-foreground/50 text-[11px] uppercase tracking-wider">Area</span> {item.area}м²
          </div>
        </div>

        <div className="mb-5 relative z-10" onClick={(e) => e.stopPropagation()}>
          <PropertyLocationMap
            {...item.locationMap}
            onPinClick={() => onOpen(item.id, window.innerWidth / 2, window.innerHeight * 0.4)}
          />
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 dark:border-t dark:border-white/5 border-t border-black/5 relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-space-grotesk dark:text-gray-500 text-foreground/50">
            <ShieldCheck className="w-3 h-3 dark:text-white/30 text-foreground/40" />
            <span>Partner: <span className="dark:text-gray-400 text-foreground/60">{item.agency}</span></span>
          </div>
          <button
            type="button"
            className="min-h-[48px] px-4 rounded text-[11px] font-space-grotesk uppercase tracking-wider dark:text-white/70 text-foreground/60 dark:group-hover:text-white group-hover:text-foreground dark:group-hover:bg-white/10 group-hover:bg-black/[0.04] transition-all flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              const rect = (e.currentTarget as HTMLButtonElement).getBoundingClientRect();
              onOpen(item.id, rect.left + rect.width / 2, rect.top + rect.height / 2);
            }}
          >
            Подробнее <ArrowRight className="w-3 h-3 ml-1.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>
    </div>
  );
}
