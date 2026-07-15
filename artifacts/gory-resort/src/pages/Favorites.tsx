import { Heart, MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { Layout } from '@/components/Layout';
import { PropertyCard } from '@/components/PropertyCard';
import { LISTINGS } from '@/data/listings';
import { useFavoriteIds } from '@/lib/favorites';
import { setDetailOrigin } from '@/lib/propertyOrigin';

/**
 * Saved-listings page (Dmitri: self-serve shortlisting without a call;
 * Irina: comparing a handful of family-fit options before deciding).
 * No account/backend — reads the same localStorage list the heart buttons write to.
 */
export default function Favorites() {
  const favoriteIds = useFavoriteIds();
  const saved = LISTINGS.filter(l => favoriteIds.includes(l.id));
  const [, navigate] = useLocation();

  const openDetail = (id: number, clientX: number, clientY: number) => {
    setDetailOrigin(clientX, clientY);
    navigate(`/properties/${id}`);
  };

  return (
    <Layout>
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden dark:border-b dark:border-white/5 border-b border-black/5">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-4">
          <div className="text-xs text-gray-500 font-space-grotesk flex items-center min-h-[48px] md:min-h-0">
            <Link href="/" className="dark:hover:text-white hover:text-foreground cursor-pointer transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <span className="dark:text-gray-300 text-foreground/75">Избранное</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oxanium font-bold chrome-text leading-tight tracking-tight flex items-center gap-4">
            <Heart className="w-9 h-9 md:w-11 md:h-11 dark:text-white/70 text-foreground/60 shrink-0" />
            Избранное
          </h1>
          <p className="dark:text-gray-400 text-foreground/60 font-space-grotesk text-base md:text-lg">
            {saved.length === 0
              ? 'Пока пусто — сохраняйте объекты нажатием на сердце, чтобы вернуться к ним позже.'
              : `${saved.length} ${saved.length === 1 ? 'сохранённый объект' : saved.length < 5 ? 'сохранённых объекта' : 'сохранённых объектов'}`}
          </p>
        </div>
      </header>

      <section className="py-12 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {saved.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-16">
              <div className="w-16 h-16 rounded-full dark:bg-white/[0.03] bg-black/[0.03] border dark:border-white/10 border-black/10 flex items-center justify-center">
                <Heart className="w-7 h-7 dark:text-white/30 text-foreground/30" />
              </div>
              <p className="dark:text-gray-400 text-foreground/60 font-space-grotesk max-w-md">
                Нажмите на иконку сердца на любом объекте в каталоге, чтобы добавить его сюда — без регистрации, список сохраняется в этом браузере.
              </p>
              <Link href="/properties" className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-8 inline-flex items-center justify-center">
                Смотреть каталог
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {saved.map((item) => (
                  <PropertyCard key={item.id} item={item} onOpen={openDetail} />
                ))}
              </div>

              <div className="mt-16 flex flex-col items-center justify-center">
                <div
                  className="w-12 h-0.5 mb-6 rounded-full opacity-50"
                  style={{ background: 'linear-gradient(90deg, #e0e0e0, #808080)' }}
                />
                <a
                  href="https://wa.me/971502345678?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BC%D0%BE%D0%B8%20%D0%B8%D0%B7%D0%B1%D1%80%D0%B0%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%8B"
                  target="_blank" rel="noreferrer"
                  className="min-h-[48px] px-8 rounded-full dark:border dark:border-white/20 border border-black/15 text-sm font-space-grotesk dark:text-gray-300 text-foreground/60 dark:hover:text-white hover:text-foreground dark:hover:border-white/50 hover:border-black/20 dark:hover:bg-white/5 hover:bg-black/[0.04] transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Обсудить избранные объекты с брокером
                </a>
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
