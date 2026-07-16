import { useState } from 'react';
import { useSearch, useLocation } from 'wouter';
import { MessageCircle, Send, Check } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PropertyCard } from '@/components/PropertyCard';
import { LISTINGS } from '@/data/listings';
import { setDetailOrigin } from '@/lib/propertyOrigin';

export default function Properties() {
  const search = useSearch();
  const initialCountry = new URLSearchParams(search).get('country') ?? '';
  const [countryFilter, setCountryFilter] = useState(initialCountry.toUpperCase());
  const [typeFilter, setTypeFilter]   = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [bedFilter, setBedFilter]     = useState('');
  const [cryptoOnly, setCryptoOnly]   = useState(false);

  const parsePrice = (price: string) => parseInt(price.replace(/[^0-9]/g, ''), 10);

  const filteredListings = LISTINGS.filter(l => {
    if (countryFilter && l.country !== countryFilter) return false;
    if (typeFilter && !l.type.includes(typeFilter)) return false;
    if (cryptoOnly && !l.crypto) return false;
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
      const n = parsePrice(l.price);
      if (priceFilter === 'under100'  && n >= 100_000)                        return false;
      if (priceFilter === '100to500'  && (n < 100_000 || n > 500_000))        return false;
      if (priceFilter === '500to2m'   && (n < 500_000 || n > 2_000_000))      return false;
      if (priceFilter === '2mplus'    && n < 2_000_000)                        return false;
    }
    return true;
  // Always sort by price ascending so entry-level listings appear first
  }).sort((a, b) => parsePrice(a.price) - parsePrice(b.price));

  // Compute the cheapest listing's price for the subtitle (dynamic, never stale)
  const cheapestListing = LISTINGS.reduce((min, l) =>
    parsePrice(l.price) < parsePrice(min.price) ? l : min, LISTINGS[0]);
  const minPriceLabel = cheapestListing?.price.replace(/,/g, ' ') ?? '€88 000';

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
          className="absolute top-0 -right-8 w-[300px] opacity-15 md:opacity-35 mix-blend-screen pointer-events-none -z-10 md:z-0"
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
              ? `${LISTINGS.length} объектов · ${new Set(LISTINGS.map(l => l.country)).size} стран · от ${minPriceLabel}`
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
            <option value="ME">Черногория</option>
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

          {/* Viktor (crypto-first buyer): needs to filter down to USDT-accepting sellers
              without reading every card's badge one by one. */}
          <button
            type="button"
            aria-pressed={cryptoOnly}
            onClick={() => setCryptoOnly(v => !v)}
            className={`w-full md:w-auto min-h-[48px] px-4 py-2.5 rounded-lg text-xs font-oxanium uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer ${
              cryptoOnly
                ? 'bg-[#8b5e1a]/20 border border-[#8b5e1a]/60 text-[#c99a4a]'
                : 'glass-filter-select dark:text-gray-300 text-foreground/60'
            }`}
          >
            <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${cryptoOnly ? 'bg-[#8b5e1a] border-[#8b5e1a]' : 'border-current opacity-60'}`}>
              {cryptoOnly && <Check className="w-2.5 h-2.5 text-black" />}
            </span>
            Только USDT
          </button>

          {(countryFilter || typeFilter || priceFilter || bedFilter || cryptoOnly) && (
            <button
              type="button"
              onClick={() => { setCountryFilter(''); setTypeFilter(''); setPriceFilter(''); setBedFilter(''); setCryptoOnly(false); }}
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
              <PropertyCard key={item.id} item={item} onOpen={openDetail} />
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
