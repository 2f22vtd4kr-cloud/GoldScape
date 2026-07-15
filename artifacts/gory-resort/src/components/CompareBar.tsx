import { X, GitCompareArrows } from 'lucide-react';
import { useLocation } from 'wouter';
import { useCompareIds, toggleCompare, clearCompare } from '@/lib/compare';
import { listingById } from '@/data/listings';

/**
 * Global sticky bar (mounted in Layout, so it follows the user from the
 * catalogue to favorites to anywhere else) — shows the current compare
 * shortlist and a way to jump into the side-by-side view without losing
 * the selection made on a different page.
 */
export function CompareBar() {
  const ids = useCompareIds();
  const [, navigate] = useLocation();

  if (ids.length === 0) return null;

  const items = ids.map(listingById).filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 dark:bg-[#0a0a0a]/95 bg-white/95 backdrop-blur-xl dark:border-t dark:border-white/10 border-t border-black/10 px-4 md:px-8 py-3 flex items-center gap-4 shadow-[0_-8px_30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0">
        {items.map((item) => (
          <div key={item.id} className="relative shrink-0 w-14 h-14 rounded-lg overflow-hidden border dark:border-white/10 border-black/10">
            <img src={item.image} alt={item.type} className="w-full h-full object-cover" />
            <button
              type="button"
              aria-label="Убрать из сравнения"
              onClick={() => toggleCompare(item.id)}
              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/70 flex items-center justify-center"
            >
              <X className="w-2.5 h-2.5 text-white" />
            </button>
          </div>
        ))}
        <span className="text-xs font-space-grotesk dark:text-gray-400 text-foreground/60 whitespace-nowrap px-2">
          {items.length} {items.length === 1 ? 'объект выбран' : 'объекта выбрано'}
        </span>
      </div>

      <button
        type="button"
        onClick={clearCompare}
        className="hidden sm:inline text-xs font-space-grotesk dark:text-gray-500 text-foreground/50 dark:hover:text-white hover:text-foreground transition-colors whitespace-nowrap"
      >
        Очистить
      </button>

      <button
        type="button"
        disabled={items.length < 2}
        onClick={() => navigate(`/compare?ids=${ids.join(',')}`)}
        className="eom-btn-primary min-h-[44px] px-5 text-xs font-oxanium uppercase tracking-wider inline-flex items-center gap-2 whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <GitCompareArrows className="w-4 h-4" /> Сравнить
      </button>
    </div>
  );
}
