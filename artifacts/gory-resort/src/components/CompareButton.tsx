import { GitCompareArrows } from 'lucide-react';
import { toggleCompare, useIsComparing, MAX_COMPARE } from '@/lib/compare';

/** Sits opposite FavoriteButton on the photo — same stop-propagation contract (lives inside clickable cards). */
export function CompareButton({ id, className = '' }: { id: number; className?: string }) {
  const active = useIsComparing(id);

  return (
    <button
      type="button"
      aria-label={active ? 'Убрать из сравнения' : `Добавить к сравнению (макс. ${MAX_COMPARE})`}
      aria-pressed={active}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleCompare(id);
      }}
      className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 backdrop-blur-md border shadow-lg hover:scale-110 active:scale-95 transition-all ${
        active ? 'bg-[#74b4f5]/90 border-[#74b4f5]' : 'bg-[#080808]/80 border-white/10'
      } ${className}`}
    >
      <GitCompareArrows className={`w-4 h-4 ${active ? 'text-black' : 'text-white/85'}`} />
    </button>
  );
}
