import type { ReactNode } from 'react';
import { GitCompareArrows, MessageCircle, X, ShieldCheck } from 'lucide-react';
import { Link, useSearch, useLocation } from 'wouter';
import { Layout } from '@/components/Layout';
import { listingById } from '@/data/listings';
import { toggleCompare } from '@/lib/compare';

/**
 * Side-by-side listing comparison (Irina: deciding with her husband between
 * a handful of shortlisted options). Reads listing IDs from the URL query
 * (?ids=1,2,4) rather than component state, so the compare bar's "Сравнить"
 * link is a real, shareable/bookmarkable URL, not just in-memory state.
 */
export default function Compare() {
  const search = useSearch();
  const [, navigate] = useLocation();
  const ids = Array.from(new Set((new URLSearchParams(search).get('ids') ?? '')
    .split(',')
    .map((s) => parseInt(s, 10))
    .filter((n) => !Number.isNaN(n))));

  const items = ids.map(listingById).filter((l): l is NonNullable<typeof l> => Boolean(l));

  const removeFromCompare = (id: number) => {
    toggleCompare(id); // keeps the global compare-bar selection in sync
    const remaining = ids.filter((i) => i !== id);
    if (remaining.length < 2) navigate('/properties');
    else navigate(`/compare?ids=${remaining.join(',')}`);
  };

  const rows: { label: string; render: (l: NonNullable<ReturnType<typeof listingById>>) => ReactNode }[] = [
    { label: 'Цена', render: (l) => <span className="font-oxanium font-bold chrome-text text-lg">{l.price}</span> },
    { label: 'Цена за м²', render: (l) => l.pricePerSqm },
    { label: 'Локация', render: (l) => `${l.city}, ${l.district}` },
    { label: 'Тип', render: (l) => l.type },
    { label: 'Спальни', render: (l) => l.beds },
    { label: 'Ванные', render: (l) => l.baths },
    { label: 'Площадь', render: (l) => `${l.area} м²` },
    { label: 'Крипта (USDT)', render: (l) => l.crypto ? <span className="text-[#8b5e1a]">Принимается</span> : <span className="opacity-40">Нет</span> },
    { label: 'Правовой статус', render: (l) => <span className="text-sm leading-relaxed">{l.legalFit}</span> },
    { label: 'Оценка доходности', render: (l) => <span className="text-sm leading-relaxed">{l.yieldEstimate}</span> },
    { label: 'Риск', render: (l) => <span className="text-sm leading-relaxed dark:text-gray-400 text-foreground/60">{l.riskNote}</span> },
    { label: 'Партнёр', render: (l) => l.agency },
  ];

  return (
    <Layout>
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden dark:border-b dark:border-white/5 border-b border-black/5">
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-4">
          <div className="text-xs text-gray-500 font-space-grotesk flex items-center min-h-[48px] md:min-h-0">
            <Link href="/" className="dark:hover:text-white hover:text-foreground cursor-pointer transition-colors">Главная</Link>
            <span className="mx-2">/</span>
            <Link href="/properties" className="dark:hover:text-white hover:text-foreground cursor-pointer transition-colors">Объекты</Link>
            <span className="mx-2">/</span>
            <span className="dark:text-gray-300 text-foreground/75">Сравнение</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oxanium font-bold chrome-text leading-tight tracking-tight flex items-center gap-4">
            <GitCompareArrows className="w-9 h-9 md:w-11 md:h-11 dark:text-white/70 text-foreground/60 shrink-0" />
            Сравнение объектов
          </h1>
        </div>
      </header>

      <section className="py-12 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {items.length < 2 ? (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-16">
              <p className="dark:text-gray-400 text-foreground/60 font-space-grotesk max-w-md">
                Выберите минимум 2 объекта для сравнения — иконка <GitCompareArrows className="w-4 h-4 inline -mt-1" /> на карточке в каталоге добавляет объект в сравнение.
              </p>
              <Link href="/properties" className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-8 inline-flex items-center justify-center">
                Смотреть каталог
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse">
                <thead>
                  <tr>
                    <th className="w-40" />
                    {items.map((item) => (
                      <th key={item.id} className="p-3 text-left align-top">
                        <div className="relative rounded-xl overflow-hidden mb-3 aspect-[3/2]">
                          <img src={item.image} alt={item.type} className="absolute inset-0 w-full h-full object-cover" />
                          <button
                            type="button"
                            aria-label="Убрать из сравнения"
                            onClick={() => removeFromCompare(item.id)}
                            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center hover:bg-black/90 transition-colors"
                          >
                            <X className="w-4 h-4 text-white" />
                          </button>
                        </div>
                        <Link href={`/properties/${item.id}`} className="font-oxanium font-semibold dark:text-white text-foreground hover:underline">
                          {item.city} · {item.district}
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.label} className={i % 2 === 0 ? 'dark:bg-white/[0.02] bg-black/[0.02]' : ''}>
                      <td className="p-3 text-[11px] font-oxanium uppercase tracking-wider dark:text-gray-500 text-foreground/50 whitespace-nowrap align-top">
                        {row.label}
                      </td>
                      {items.map((item) => (
                        <td key={item.id} className="p-3 dark:text-gray-200 text-foreground/80 font-space-grotesk align-top">
                          {row.render(item)}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td className="p-3" />
                    {items.map((item) => (
                      <td key={item.id} className="p-3">
                        <a
                          href={`https://wa.me/971502345678?text=${encodeURIComponent(`Здравствуйте! Хочу обсудить объект: ${item.type}, ${item.city} (${item.district}), ${item.price}`)}`}
                          target="_blank" rel="noreferrer"
                          className="min-h-[44px] w-full px-4 rounded-lg dark:border dark:border-white/15 border border-black/15 text-xs font-space-grotesk dark:text-gray-300 text-foreground/60 dark:hover:text-white hover:text-foreground dark:hover:border-white/40 hover:border-black/25 transition-all flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="w-3.5 h-3.5" /> Написать
                        </a>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
              <p className="mt-6 text-[11px] dark:text-gray-600 text-foreground/40 font-space-grotesk flex items-center gap-1.5">
                <ShieldCheck className="w-3 h-3" /> Правовой статус и оценка доходности — общая справочная информация, не индивидуальная консультация. Актуальные условия уточняйте у брокера.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
