import { useState } from 'react';
import { useSearch, useLocation } from 'wouter';
import { Filter, MessageCircle, ArrowRight, Send, Check, ShieldCheck } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PropertyLocationMap } from '@/components/PropertyLocationMap';
import { LISTINGS } from '@/data/listings';
import { setDetailOrigin } from '@/lib/propertyOrigin';

export default function Properties() {
  const search = useSearch();
  const initialCountry = new URLSearchParams(search).get('country') ?? '';
  const [countryFilter, setCountryFilter] = useState(initialCountry.toUpperCase());
  const [typeFilter, setTypeFilter]   = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [bedFilter, setBedFilter]     = useState('');

  const filteredListings = LISTINGS.filter(l => {
    if (countryFilter && l.country !== countryFilter) return false;
    if (typeFilter && !l.type.includes(typeFilter)) return false;
    if (bedFilter) {
      if (bedFilter === 'Studio') {
        if (l.beds !== 'Studio') return false;
      } else {
        const beds = typeof l.beds === 'number' ? l.beds : 0;
        if (bedFilter === '3+') { if (beds < 3) return false; }
        else if (beds !== parseInt(bedFilter, 10)) return false;
      }
    }
    if (priceFilter) {
      const n = parseInt(l.price.replace(/[^0-9]/g, ''), 10);
      if (priceFilter === 'under100'  && n >= 100_000)                        return false;
      if (priceFilter === '100to500'  && (n < 100_000 || n > 500_000))        return false;
      if (priceFilter === '500to2m'   && (n < 500_000 || n > 2_000_000))      return false;
      if (priceFilter === '2mplus'    && n < 2_000_000)                        return false;
    }
    return true;
  });

  const [, navigate] = useLocation();

  const openDetail = (id: number, clientX: number, clientY: number) => {
    setDetailOrigin(clientX, clientY);
    navigate(`/properties/${id}`);
  };

  return (
    <Layout>
      {/* PAGE HEADER */}
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden dark:border-b dark:border-white/5 border-b border-black/5">
        <img
          src="/chrome/spike-chrome.png"
          alt=""
          className="absolute top-8 right-[12%] w-[120px] opacity-10 md:opacity-70 animate-float drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] pointer-events-none -z-10 md:z-0"
        />
        <img
          src="/chrome/blob-iridescent-1.png"
          alt=""
          className="absolute -top-20 right-0 w-[360px] opacity-10 md:opacity-30 mix-blend-screen pointer-events-none -z-10 md:z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-4">
          <div className="text-xs text-gray-500 font-space-grotesk flex items-center min-h-[48px] md:min-h-0">
            <span className="dark:hover:text-white hover:text-foreground cursor-pointer transition-colors">Главная</span>
            <span className="mx-2">/</span>
            <span className="dark:text-gray-300 text-foreground/75">Объекты</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oxanium font-bold chrome-text leading-tight tracking-tight">
            Объекты за рубежом
          </h1>
          <p className="dark:text-gray-400 text-foreground/60 font-space-grotesk text-base md:text-lg">
            {filteredListings.length === LISTINGS.length
              ? `${LISTINGS.length} объектов · 7 стран · от €88 000`
              : `${filteredListings.length} ${filteredListings.length === 1 ? 'объект' : filteredListings.length < 5 ? 'объекта' : 'объектов'} по фильтру`}
          </p>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="sticky top-20 z-40 dark:bg-[#080808]/90 bg-white/90 backdrop-blur-xl dark:border-b dark:border-white/10 border-b border-black/10 py-4 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:flex-wrap gap-3 items-center">
          <select
            className="glass-filter-select w-full md:w-auto min-h-[48px] rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider dark:text-gray-300 text-foreground/60 focus:outline-none appearance-none cursor-pointer"
            value={countryFilter}
            onChange={e => setCountryFilter(e.target.value)}
          >
            <option value="">Страна: Все</option>
            <option value="AE">ОАЭ</option>
            <option value="TR">Турция</option>
            <option value="CY">Кипр</option>
            <option value="GE">Грузия</option>
            <option value="TH">Таиланд</option>
            <option value="PT">Португалия</option>
            <option value="RS">Сербия</option>
          </select>

          <select
            className="glass-filter-select w-full md:w-auto min-h-[48px] rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider dark:text-gray-300 text-foreground/60 focus:outline-none appearance-none cursor-pointer"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value)}
          >
            <option value="">Тип: Все</option>
            <option value="АПАРТАМЕНТЫ">Апартаменты</option>
            <option value="ВИЛЛА">Вилла</option>
            <option value="ПЕНТХАУС">Пентхаус</option>
            <option value="СТУДИЯ">Студия</option>
          </select>

          <select
            className="glass-filter-select w-full md:w-auto min-h-[48px] rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider dark:text-gray-300 text-foreground/60 focus:outline-none appearance-none cursor-pointer"
            value={priceFilter}
            onChange={e => setPriceFilter(e.target.value)}
          >
            <option value="">Цена: Любая</option>
            <option value="under100">до $100к</option>
            <option value="100to500">$100к – $500к</option>
            <option value="500to2m">$500к – $2М</option>
            <option value="2mplus">$2М+</option>
          </select>

          <select
            className="glass-filter-select w-full md:w-auto min-h-[48px] rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider dark:text-gray-300 text-foreground/60 focus:outline-none appearance-none cursor-pointer"
            value={bedFilter}
            onChange={e => setBedFilter(e.target.value)}
          >
            <option value="">Спальни: Все</option>
            <option value="Studio">Студия</option>
            <option value="1">1 спальня</option>
            <option value="2">2 спальни</option>
            <option value="3">3 спальни</option>
            <option value="3+">3+ спальни</option>
          </select>

          {(countryFilter || typeFilter || priceFilter || bedFilter) && (
            <button
              type="button"
              onClick={() => { setCountryFilter(''); setTypeFilter(''); setPriceFilter(''); setBedFilter(''); }}
              className="w-full md:w-auto min-h-[48px] px-5 py-2.5 text-xs font-oxanium uppercase tracking-wider dark:text-gray-400 text-foreground/50 dark:hover:text-white hover:text-foreground dark:border dark:border-white/10 border border-black/10 rounded-lg dark:hover:border-white/30 hover:border-black/15 transition-colors bg-transparent cursor-pointer md:ml-auto"
            >
              Сбросить
            </button>
          )}
        </div>
      </div>

      {/* PROPERTY GRID */}
      <section className="py-12 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <div
                key={item.id}
                role="link"
                tabIndex={0}
                onClick={(e) => openDetail(item.id, e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2)}
                onKeyDown={(e) => { if (e.key === 'Enter') openDetail(item.id, window.innerWidth / 2, window.innerHeight / 2); }}
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
                </div>

                <div className="p-5 flex flex-col flex-1 relative">
                  {/* Decorative background glow on hover */}
                  <div className="absolute inset-0 dark:bg-gradient-to-br dark:from-white/[0.03] dark:to-transparent bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Nika's Hierarchy: Price -> Location -> Type -> Specs */}
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
                      onPinClick={() => openDetail(item.id, window.innerWidth / 2, window.innerHeight * 0.4)}
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
                        openDetail(item.id, rect.left + rect.width / 2, rect.top + rect.height / 2);
                      }}
                    >
                      Подробнее <ArrowRight className="w-3 h-3 ml-1.5 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center justify-center">
            <div
              className="w-12 h-0.5 mb-6 rounded-full opacity-50"
              style={{ background: 'linear-gradient(90deg, #e0e0e0, #808080)' }}
            />
            <a
              href="https://wa.me/971502345678?text=%D0%94%D0%BE%D0%B1%D1%80%D1%8B%D0%B9%20%D0%B4%D0%B5%D0%BD%D1%8C%21%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BF%D0%BE%D0%BB%D1%83%D1%87%D0%B8%D1%82%D1%8C%20%D1%80%D0%B0%D1%81%D1%88%D0%B8%D1%80%D0%B5%D0%BD%D0%BD%D1%8B%D0%B9%20%D0%BA%D0%B0%D1%82%D0%B0%D0%BB%D0%BE%D0%B3%20%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D0%BE%D0%B2"
              target="_blank" rel="noreferrer"
              className="min-h-[48px] px-8 rounded-full dark:border dark:border-white/20 border border-black/15 text-sm font-space-grotesk dark:text-gray-300 text-foreground/60 dark:hover:text-white hover:text-foreground dark:hover:border-white/50 hover:border-black/20 dark:hover:bg-white/5 hover:bg-black/[0.04] transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Запросить расширенный каталог
            </a>
            <p className="text-[11px] dark:text-gray-600 text-foreground/40 mt-3 font-space-grotesk">Закрытые объекты от партнёров — по запросу</p>
          </div>
        </div>
      </section>

      {/* CONSULTATION STRIP */}
      <section className="dark:bg-[#0f0f0f] bg-[#F5F3EE] dark:border-t dark:border-t-white/10 border-t border-t-black/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px]">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#8b5e1a] to-transparent opacity-50" />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-10 md:opacity-20 -z-10 md:z-0">
          <div className="chrome-blob w-[180px] h-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-4 text-center lg:text-left max-w-2xl">
            <h3 className="text-xl md:text-2xl font-oxanium font-semibold dark:text-white text-foreground tracking-tight">
              Самостоятельный поиск или помощь эксперта?
            </h3>
            <p className="text-sm md:text-base dark:text-gray-400 text-foreground/60 font-space-grotesk leading-relaxed">
              Мы понимаем, что переезд и перевод капитала требуют конфиденциальности и скорости. 
              Наши брокеры рассчитывают полную стоимость с налогами, помогают с легализацией ВНЖ 
              и структурируют безопасные сделки с прозрачной цепочкой транзакций.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider dark:text-gray-400 text-foreground/60 font-space-grotesk dark:bg-white/5 bg-black/[0.04] px-3 py-1.5 rounded-full dark:border dark:border-white/5 border border-black/5">
                <Check className="w-3 h-3 text-[#8b5e1a]" /> 100% Конфиденциально
              </div>
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider dark:text-gray-400 text-foreground/60 font-space-grotesk dark:bg-white/5 bg-black/[0.04] px-3 py-1.5 rounded-full dark:border dark:border-white/5 border border-black/5">
                <Check className="w-3 h-3 text-[#8b5e1a]" /> Прямая связь (без форм)
              </div>
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider dark:text-gray-400 text-foreground/60 font-space-grotesk dark:bg-white/5 bg-black/[0.04] px-3 py-1.5 rounded-full dark:border dark:border-white/5 border border-black/5">
                <Check className="w-3 h-3 text-[#8b5e1a]" /> Проверка чистоты (Compliance)
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 lg:mt-0 w-full lg:w-auto">
            <a href="/about" className="w-full sm:w-auto min-h-[48px] px-8 rounded-full bg-white text-black font-oxanium font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center uppercase tracking-wider">
              Запросить подборку
            </a>
            <div className="flex gap-3 w-full sm:w-auto justify-center">
              <a
                href="https://wa.me/971502345678"
                target="_blank" rel="noreferrer"
                className="glass-icon-btn w-12 h-12 rounded-full dark:text-gray-400 text-foreground/60 hover:text-[#25D366]"
                aria-label="Написать в WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/estateofmind_official"
                target="_blank" rel="noreferrer"
                className="glass-icon-btn w-12 h-12 rounded-full dark:text-gray-400 text-foreground/60 hover:text-[#229ED9]"
                aria-label="Написать в Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
}
