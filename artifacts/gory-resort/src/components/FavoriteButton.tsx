import { Heart } from 'lucide-react';
import { toggleFavorite, useIsFavorite } from '@/lib/favorites';

/**
 * Heart toggle used on property cards and the detail hero. Always stops
 * propagation/prevents default — it lives inside clickable cards/links and
 * must never trigger navigation.
 */
export function FavoriteButton({ id, className = '', size = 'md' }: { id: number; className?: string; size?: 'sm' | 'md' }) {
  const active = useIsFavorite(id);
  const dims = size === 'sm' ? 'w-9 h-9' : 'w-10 h-10';
  const iconDims = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  return (
    <button
      type="button"
      aria-label={active ? 'Убрать из избранного' : 'Добавить в избранное'}
      aria-pressed={active}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleFavorite(id);
      }}
      className={`${dims} rounded-full flex items-center justify-center shrink-0 bg-[#080808]/80 backdrop-blur-md border border-white/10 shadow-lg hover:scale-110 active:scale-95 transition-all ${className}`}
    >
      <Heart
        className={`${iconDims} transition-colors ${active ? 'fill-[#f596b4] text-[#f596b4]' : 'text-white/85'}`}
      />
    </button>
  );
}
