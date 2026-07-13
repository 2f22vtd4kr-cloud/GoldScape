import { useState } from 'react';
import { useSearch } from 'wouter';
import { Filter, MessageCircle, ArrowRight, Send } from 'lucide-react';
import { Layout } from '@/components/Layout';

const LISTINGS = [
  /* ── UAE ──────────────────────────────────────────────────────── */
  {
    id: 1,
    country: 'AE',
    flag: '🇦🇪',
    city: 'Дубай',
    district: 'Palm Jumeirah',
    type: 'АПАРТАМЕНТЫ',
    price: '$2,400,000',
    pricePerSqm: '≈ $11,428/м²',
    beds: 3,
    baths: 3,
    area: 210,
    image: '/images/prop-dubai.jpg',
    agency: 'fäm Properties',
    exclusive: true,
    tag: 'Вид на море',
  },
  {
    id: 2,
    country: 'AE',
    flag: '🇦🇪',
    city: 'Дубай',
    district: 'Dubai Marina',
    type: 'СТУДИЯ',
    price: '$368,000',
    pricePerSqm: '≈ $7,076/м²',
    beds: 'Studio',
    baths: 1,
    area: 52,
    image: '/images/prop-dubai-marina.jpg',
    agency: 'fäm Properties',
    exclusive: false,
    tag: null,
  },
  {
    id: 3,
    country: 'AE',
    flag: '🇦🇪',
    city: 'Дубай',
    district: 'Downtown Dubai',
    type: 'ПЕНТХАУС',
    price: '$5,200,000',
    pricePerSqm: '≈ $8,965/м²',
    beds: 4,
    baths: 4,
    area: 580,
    image: '/images/prop-dubai-downtown.jpg',
    agency: 'fäm Properties',
    exclusive: true,
    tag: 'Вид Burj Khalifa',
  },
  {
    id: 4,
    country: 'AE',
    flag: '🇦🇪',
    city: 'Дубай',
    district: 'Arabian Ranches',
    type: 'ВИЛЛА',
    price: '$1,850,000',
    pricePerSqm: '≈ $4,404/м²',
    beds: 4,
    baths: 5,
    area: 420,
    image: '/images/prop-dubai-villa.jpg',
    agency: 'fäm Properties',
    exclusive: false,
    tag: null,
  },
  {
    id: 16,
    country: 'AE',
    flag: '🇦🇪',
    city: 'Дубай',
    district: 'Business Bay',
    type: 'АПАРТАМЕНТЫ',
    price: '$695,000',
    pricePerSqm: '≈ $7,989/м²',
    beds: 2,
    baths: 2,
    area: 87,
    image: '/images/prop-dubai-canal.jpg',
    agency: 'fäm Properties',
    exclusive: false,
    tag: 'Canal View',
  },
  /* ── Turkey ───────────────────────────────────────────────────── */
  {
    id: 5,
    country: 'TR',
    flag: '🇹🇷',
    city: 'Стамбул',
    district: 'Beşiktaş',
    type: 'АПАРТАМЕНТЫ',
    price: '$285,000',
    pricePerSqm: '≈ $3,000/м²',
    beds: 2,
    baths: 1,
    area: 95,
    image: '/images/prop-istanbul.jpg',
    agency: 'H&S Real Estate',
    exclusive: false,
    tag: null,
  },
  {
    id: 6,
    country: 'TR',
    flag: '🇹🇷',
    city: 'Анталья',
    district: 'Lara Beach',
    type: 'ВИЛЛА',
    price: '$448,000',
    pricePerSqm: '≈ $2,036/м²',
    beds: 3,
    baths: 3,
    area: 220,
    image: '/images/prop-antalya.jpg',
    agency: 'H&S Real Estate',
    exclusive: false,
    tag: '200м до пляжа',
  },
  /* ── Cyprus ───────────────────────────────────────────────────── */
  {
    id: 7,
    country: 'CY',
    flag: '🇨🇾',
    city: 'Лимасол',
    district: 'Germasogeia',
    type: 'АПАРТАМЕНТЫ',
    price: '€435,000',
    pricePerSqm: '≈ €4,350/м²',
    beds: 2,
    baths: 2,
    area: 100,
    image: '/images/prop-limassol.jpg',
    agency: 'H&S Real Estate',
    exclusive: false,
    tag: 'Рядом с морем',
  },
  {
    id: 8,
    country: 'CY',
    flag: '🇨🇾',
    city: 'Пафос',
    district: 'Koloni',
    type: 'ВИЛЛА',
    price: '€680,000',
    pricePerSqm: '≈ €2,833/м²',
    beds: 3,
    baths: 3,
    area: 240,
    image: '/images/prop-cyprus.jpg',
    agency: 'H&S Real Estate',
    exclusive: true,
    tag: 'Бассейн',
  },
  /* ── Georgia ──────────────────────────────────────────────────── */
  {
    id: 9,
    country: 'GE',
    flag: '🇬🇪',
    city: 'Батуми',
    district: 'Набережная',
    type: 'АПАРТАМЕНТЫ',
    price: '$95,000',
    pricePerSqm: '≈ $1,319/м²',
    beds: 2,
    baths: 1,
    area: 72,
    image: '/images/prop-georgia.jpg',
    agency: 'EstateofMind Direct',
    exclusive: false,
    tag: 'Доходность 9.4%',
  },
  {
    id: 10,
    country: 'GE',
    flag: '🇬🇪',
    city: 'Тбилиси',
    district: 'Ваке',
    type: 'ПЕНТХАУС',
    price: '$185,000',
    pricePerSqm: '≈ $1,321/м²',
    beds: 3,
    baths: 2,
    area: 140,
    image: '/images/prop-tbilisi.jpg',
    agency: 'EstateofMind Direct',
    exclusive: false,
    tag: 'Вид на Мтацминда',
  },
  /* ── Thailand ─────────────────────────────────────────────────── */
  {
    id: 11,
    country: 'TH',
    flag: '🇹🇭',
    city: 'Пхукет',
    district: 'Rawai',
    type: 'ВИЛЛА',
    price: '$520,000',
    pricePerSqm: '≈ $1,857/м²',
    beds: 3,
    baths: 3,
    area: 280,
    image: '/images/prop-phuket.jpg',
    agency: 'Samui Exclusive Homes',
    exclusive: false,
    tag: 'Бассейн с инфинити',
  },
  {
    id: 15,
    country: 'TH',
    flag: '🇹🇭',
    city: 'Самуи',
    district: 'Chaweng Noi',
    type: 'ВИЛЛА',
    price: '$318,000',
    pricePerSqm: '≈ $1,691/м²',
    beds: 3,
    baths: 3,
    area: 188,
    image: '/images/prop-koh-samui.jpg',
    agency: 'Samui Exclusive Homes',
    exclusive: false,
    tag: 'Рядом с пляжем',
  },
  /* ── Portugal ─────────────────────────────────────────────────── */
  {
    id: 13,
    country: 'PT',
    flag: '🇵🇹',
    city: 'Лиссабон',
    district: 'Campo de Ourique',
    type: 'АПАРТАМЕНТЫ',
    price: '€410,000',
    pricePerSqm: '≈ €5,000/м²',
    beds: 2,
    baths: 1,
    area: 82,
    image: '/images/prop-lisbon.jpg',
    agency: 'Sotheby\'s International Realty',
    exclusive: false,
    tag: 'Golden Visa',
  },
  {
    id: 14,
    country: 'PT',
    flag: '🇵🇹',
    city: 'Алгарве',
    district: 'Vale do Lobo',
    type: 'ВИЛЛА',
    price: '€1,380,000',
    pricePerSqm: '≈ €6,000/м²',
    beds: 4,
    baths: 4,
    area: 230,
    image: '/images/prop-algarve.jpg',
    agency: 'Knight Frank Portugal',
    exclusive: true,
    tag: 'Golf & Ocean',
  },
  /* ── Serbia ───────────────────────────────────────────────────── */
  {
    id: 12,
    country: 'RS',
    flag: '🇷🇸',
    city: 'Белград',
    district: 'Savski Venac',
    type: 'АПАРТАМЕНТЫ',
    price: '€88,000',
    pricePerSqm: '≈ €1,294/м²',
    beds: 2,
    baths: 1,
    area: 68,
    image: '/images/prop-belgrade.jpg',
    agency: 'EstateofMind Direct',
    exclusive: false,
    tag: null,
  },
];

export default function Properties() {
  const search = useSearch();
  const initialCountry = new URLSearchParams(search).get('country') ?? '';
  const [countryFilter, setCountryFilter] = useState(initialCountry.toUpperCase());

  const filteredListings = countryFilter
    ? LISTINGS.filter(l => l.country === countryFilter)
    : LISTINGS;

  return (
    <Layout>
      {/* PAGE HEADER */}
      <header className="relative pt-32 pb-12 px-6 md:px-12 lg:px-24 overflow-hidden border-b border-white/5">
        <img
          src="/chrome/spike-chrome.png"
          alt=""
          className="absolute top-8 right-[12%] w-[120px] opacity-70 animate-float drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] pointer-events-none hidden lg:block"
        />
        <img
          src="/chrome/blob-iridescent-1.png"
          alt=""
          className="absolute -top-20 right-0 w-[360px] opacity-30 mix-blend-screen pointer-events-none"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-4">
          <div className="text-xs text-gray-500 font-space-grotesk">
            <span className="hover:text-white cursor-pointer transition-colors">Главная</span>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Объекты</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oxanium font-bold chrome-text leading-tight">
            Объекты за рубежом
          </h1>
          <p className="text-gray-400 font-space-grotesk text-base md:text-lg">
            847 объектов · 8 стран · от $88 000
          </p>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="sticky top-20 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 py-4 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-3 items-center">
          <select
            className="bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
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

          <select className="bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer">
            <option>Тип: Все</option>
            <option>Апартаменты</option>
            <option>Вилла</option>
            <option>Пентхаус</option>
            <option>Студия</option>
          </select>

          <select className="bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer">
            <option>Цена: Все</option>
            <option>до $100к</option>
            <option>$100к–500к</option>
            <option>$500к–2М</option>
            <option>$2М+</option>
          </select>

          <select className="bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer ml-auto">
            <option>Популярные</option>
            <option>По цене ↑</option>
            <option>По новизне</option>
          </select>

          <button className="bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 hover:text-white transition-colors flex items-center gap-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Фильтры</span>
          </button>
        </div>
      </div>

      {/* PROPERTY GRID */}
      <section className="py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <div key={item.id} className="eom-card flex flex-col group cursor-pointer">
                <div className="relative aspect-[3/2] overflow-hidden bg-[#111]">
                  <img
                    src={item.image}
                    alt={`${item.type} · ${item.city}, ${item.district}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-[#080808]/70 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 text-[10px] font-oxanium flex items-center gap-1.5 shadow-lg">
                      <span className="text-sm leading-none">{item.flag}</span>
                      <span className="text-gray-200 tracking-wider">{item.country}</span>
                    </div>
                    {item.tag && (
                      <div className="bg-[#080808]/60 backdrop-blur-md border border-white/10 rounded-full px-2.5 py-1 text-[10px] font-space-grotesk text-white/70 shadow-lg">
                        {item.tag}
                      </div>
                    )}
                  </div>

                  {item.exclusive && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded px-2 py-1">
                        <span className="iridescent-text text-[9px] font-oxanium font-bold uppercase tracking-[0.2em]">
                          ЭКСКЛЮЗИВ
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex flex-col gap-1.5">
                      <div className="text-gray-400 text-xs font-space-grotesk">
                        {item.city} <span className="mx-1 opacity-50">·</span> {item.district}
                      </div>
                      <div className="text-[10px] font-oxanium uppercase tracking-[0.2em] text-gray-500 font-medium">
                        {item.type}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-col gap-0.5">
                    <div className="text-2xl font-oxanium font-bold chrome-text">{item.price}</div>
                    <div className="text-[11px] font-space-grotesk text-gray-500">{item.pricePerSqm}</div>
                  </div>

                  <div className="flex gap-4 mb-5 pt-4 border-t border-white/5 text-[13px] font-space-grotesk text-gray-300">
                    <div className="flex items-center gap-1.5">
                      <span className="opacity-50">🛏</span> {item.beds}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="opacity-50">🚿</span> {item.baths}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span>📐</span> {item.area}м²
                    </div>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="text-[10px] font-space-grotesk text-gray-500 italic">{item.agency}</div>
                    <button className="eom-btn-ghost !py-2 !px-4 !text-[11px] group-hover:bg-white/5 group-hover:border-white/20 group-hover:text-white transition-all">
                      Подробнее <ArrowRight className="w-3 h-3 ml-1" />
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
            <button className="eom-btn-ghost">Загрузить ещё (831 объект)</button>
          </div>
        </div>
      </section>

      {/* CONSULTATION STRIP */}
      <section className="bg-[#0f0f0f] border-t border-t-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px]">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#8b5e1a] to-transparent opacity-50" />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-20 hidden md:block">
          <div className="chrome-blob w-[180px] h-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-2 text-center md:text-left max-w-xl">
            <h3 className="text-xl md:text-2xl font-oxanium font-semibold text-white">Не нашли подходящий объект?</h3>
            <p className="text-sm md:text-base text-gray-400 font-space-grotesk">
              Наши брокеры подберут варианты под ваш бюджет и задачи
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a href="/about" className="eom-btn-primary whitespace-nowrap">
              Получить подборку
            </a>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors bg-[#141414]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors bg-[#141414]"
                aria-label="Telegram"
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
