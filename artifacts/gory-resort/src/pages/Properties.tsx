import { useState } from 'react';
import { useSearch } from 'wouter';
import { Filter, MessageCircle, ArrowRight, Send, Check, ShieldCheck } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PropertyLocationMap, type LocationMap } from '@/components/PropertyLocationMap';

import mapDubaiPalm      from '@assets/generated_images/listing-map-dubai-palm-jumeirah.png';
import mapDubaiMarina    from '@assets/generated_images/listing-map-dubai-marina.png';
import mapDubaiDowntown  from '@assets/generated_images/listing-map-dubai-downtown.png';
import mapDubaiRanches   from '@assets/generated_images/listing-map-dubai-arabian-ranches.png';
import mapDubaiBizBay    from '@assets/generated_images/listing-map-dubai-business-bay.png';
import mapIstanbul       from '@assets/generated_images/listing-map-istanbul-besiktas.png';
import mapAntalya        from '@assets/generated_images/listing-map-antalya-lara.png';
import mapLimassol       from '@assets/generated_images/listing-map-limassol-germasogeia.png';
import mapPaphos         from '@assets/generated_images/listing-map-paphos-koloni.png';
import mapBatumi         from '@assets/generated_images/listing-map-batumi-seafront.png';
import mapTbilisi        from '@assets/generated_images/listing-map-tbilisi-vake.png';
import mapPhuket         from '@assets/generated_images/listing-map-phuket-rawai.png';
import mapSamui          from '@assets/generated_images/listing-map-samui-chaweng-noi.png';
import mapLisbon         from '@assets/generated_images/listing-map-lisbon-campo-de-ourique.png';
import mapAlgarve        from '@assets/generated_images/listing-map-algarve-vale-do-lobo.png';
import mapBelgrade       from '@assets/generated_images/listing-map-belgrade-savski-venac.png';

const LISTINGS: Array<{
  id: number; country: string; city: string; district: string; type: string;
  price: string; pricePerSqm: string; beds: number | string; baths: number;
  area: number; image: string; agency: string; exclusive: boolean;
  tags: string[]; crypto: boolean; locationMap: LocationMap;
}> = [
  /* ── UAE ──────────────────────────────────────────────────────── */
  {
    id: 1,
    country: 'AE',
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
    tags: ['Вид на море', 'Золотая виза'],
    crypto: true,
    locationMap: {
      image: mapDubaiPalm,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 1 },
        { icon: 'center', label: 'До центра города', minutes: 20 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 18 },
      ],
    },
  },
  {
    id: 2,
    country: 'AE',
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
    tags: ['Доходность 7%', '0% налог'],
    crypto: true,
    locationMap: {
      image: mapDubaiMarina,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 3 },
        { icon: 'center', label: 'До центра города', minutes: 20 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 4 },
      ],
    },
  },
  {
    id: 3,
    country: 'AE',
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
    tags: ['Вид Burj Khalifa', 'ВНЖ инвестора'],
    crypto: true,
    locationMap: {
      image: mapDubaiDowntown,
      distances: [
        { icon: 'sea',    label: 'До моря (JBR)',   minutes: 15 },
        { icon: 'center', label: 'Центр города',    minutes: 1 },
        { icon: 'mall',   label: 'До Dubai Mall',   minutes: 3 },
      ],
    },
  },
  {
    id: 4,
    country: 'AE',
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
    tags: ['Семейное комьюнити', 'Школы IB'],
    crypto: true,
    locationMap: {
      image: mapDubaiRanches,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 25 },
        { icon: 'center', label: 'До центра города', minutes: 20 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 10 },
      ],
    },
  },
  {
    id: 16,
    country: 'AE',
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
    tags: ['Canal View', 'Счёт в банке ОАЭ'],
    crypto: true,
    locationMap: {
      image: mapDubaiBizBay,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 15 },
        { icon: 'center', label: 'До центра города', minutes: 5 },
        { icon: 'mall',   label: 'До Dubai Mall',   minutes: 8 },
      ],
    },
  },
  /* ── Turkey ───────────────────────────────────────────────────── */
  {
    id: 5,
    country: 'TR',
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
    tags: ['ВНЖ при покупке'],
    crypto: false,
    locationMap: {
      image: mapIstanbul,
      distances: [
        { icon: 'sea',    label: 'До Босфора',      minutes: 3 },
        { icon: 'center', label: 'До центра (Таксим)', minutes: 10 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 8 },
      ],
    },
  },
  {
    id: 6,
    country: 'TR',
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
    tags: ['200м до пляжа', 'Гражданство'],
    crypto: true,
    locationMap: {
      image: mapAntalya,
      distances: [
        { icon: 'sea',    label: 'До пляжа',        minutes: 1 },
        { icon: 'center', label: 'До центра города', minutes: 15 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 10 },
      ],
    },
  },
  /* ── Cyprus ───────────────────────────────────────────────────── */
  {
    id: 7,
    country: 'CY',
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
    tags: ['Non-dom статус', 'ПМЖ'],
    crypto: true,
    locationMap: {
      image: mapLimassol,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 5 },
        { icon: 'center', label: 'До центра города', minutes: 10 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 12 },
      ],
    },
  },
  {
    id: 8,
    country: 'CY',
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
    tags: ['Частная школа рядом'],
    crypto: true,
    locationMap: {
      image: mapPaphos,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 8 },
        { icon: 'center', label: 'До центра Пафоса', minutes: 12 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 15 },
      ],
    },
  },
  /* ── Georgia ──────────────────────────────────────────────────── */
  {
    id: 9,
    country: 'GE',
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
    tags: ['ВНЖ Грузии', 'Налог 0%'],
    crypto: true,
    locationMap: {
      image: mapBatumi,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 1 },
        { icon: 'center', label: 'До центра города', minutes: 5 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 8 },
      ],
    },
  },
  {
    id: 10,
    country: 'GE',
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
    tags: ['Премиум район'],
    crypto: true,
    locationMap: {
      image: mapTbilisi,
      distances: [
        { icon: 'landmark', label: 'До парка Ваке', minutes: 3 },
        { icon: 'center',   label: 'До центра города', minutes: 10 },
        { icon: 'mall',     label: 'До ТЦ',          minutes: 7 },
      ],
    },
  },
  /* ── Thailand ─────────────────────────────────────────────────── */
  {
    id: 11,
    country: 'TH',
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
    tags: ['Elite Visa'],
    crypto: true,
    locationMap: {
      image: mapPhuket,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 3 },
        { icon: 'center', label: 'До Phuket Town',  minutes: 20 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 20 },
      ],
    },
  },
  {
    id: 15,
    country: 'TH',
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
    tags: ['Рядом с пляжем'],
    crypto: true,
    locationMap: {
      image: mapSamui,
      distances: [
        { icon: 'sea',    label: 'До моря',        minutes: 3 },
        { icon: 'center', label: 'До Chaweng',      minutes: 8 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 10 },
      ],
    },
  },
  /* ── Portugal ─────────────────────────────────────────────────── */
  {
    id: 13,
    country: 'PT',
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
    tags: ['D7 / D8 Визы'],
    crypto: false,
    locationMap: {
      image: mapLisbon,
      distances: [
        { icon: 'sea',    label: 'До реки Тежу',    minutes: 10 },
        { icon: 'center', label: 'До центра (Байша)', minutes: 12 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 10 },
      ],
    },
  },
  {
    id: 14,
    country: 'PT',
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
    tags: ['Гольф-курорт', 'International School'],
    crypto: false,
    locationMap: {
      image: mapAlgarve,
      distances: [
        { icon: 'sea',    label: 'До океана',       minutes: 5 },
        { icon: 'center', label: 'До Алмансила',    minutes: 15 },
        { icon: 'mall',   label: 'До ТЦ',           minutes: 20 },
      ],
    },
  },
  /* ── Serbia ───────────────────────────────────────────────────── */
  {
    id: 12,
    country: 'RS',
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
    tags: ['ВНЖ по недвижимости'],
    crypto: true,
    locationMap: {
      image: mapBelgrade,
      distances: [
        { icon: 'landmark', label: 'До Калемегдана', minutes: 6 },
        { icon: 'center',   label: 'До центра города', minutes: 8 },
        { icon: 'mall',     label: 'До ТЦ',          minutes: 6 },
      ],
    },
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
          className="absolute top-8 right-[12%] w-[120px] opacity-10 md:opacity-70 animate-float drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] pointer-events-none -z-10 md:z-0"
        />
        <img
          src="/chrome/blob-iridescent-1.png"
          alt=""
          className="absolute -top-20 right-0 w-[360px] opacity-10 md:opacity-30 mix-blend-screen pointer-events-none -z-10 md:z-0"
        />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-4">
          <div className="text-xs text-gray-500 font-space-grotesk flex items-center min-h-[48px] md:min-h-0">
            <span className="hover:text-white cursor-pointer transition-colors">Главная</span>
            <span className="mx-2">/</span>
            <span className="text-gray-300">Объекты</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-oxanium font-bold chrome-text leading-tight tracking-tight">
            Объекты за рубежом
          </h1>
          <p className="text-gray-400 font-space-grotesk text-base md:text-lg">
            847 объектов · 8 стран · от $88 000
          </p>
        </div>
      </header>

      {/* FILTER BAR */}
      <div className="sticky top-20 z-40 bg-[#080808]/90 backdrop-blur-xl border-b border-white/10 py-4 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:flex md:flex-wrap gap-3 items-center">
          <select
            className="w-full md:w-auto min-h-[48px] bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer"
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

          <select className="w-full md:w-auto min-h-[48px] bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer">
            <option>Тип: Все</option>
            <option>Апартаменты</option>
            <option>Вилла</option>
            <option>Пентхаус</option>
            <option>Студия</option>
          </select>

          <select className="w-full md:w-auto min-h-[48px] bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer">
            <option>Цена: Все</option>
            <option>до $100к</option>
            <option>$100к–500к</option>
            <option>$500к–2М</option>
            <option>$2М+</option>
          </select>

          <select className="w-full md:w-auto min-h-[48px] bg-[#141414] border border-white/10 rounded-lg px-4 py-2.5 text-xs font-oxanium uppercase tracking-wider text-gray-300 hover:border-white/30 focus:border-white focus:outline-none transition-colors appearance-none cursor-pointer md:ml-auto col-span-2 md:col-span-1">
            <option>Популярные</option>
            <option>По цене ↑</option>
            <option>По новизне</option>
          </select>
        </div>
      </div>

      {/* PROPERTY GRID */}
      <section className="py-12 px-4 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <div key={item.id} className="eom-card flex flex-col group cursor-pointer border border-white/5 bg-[#0a0a0a] hover:border-white/20 transition-all duration-300 overflow-hidden rounded-xl">
                <div className="relative aspect-[3/2] overflow-hidden bg-[#111]">
                  <img
                    src={item.image}
                    alt={`${item.type} · ${item.city}, ${item.district}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 pr-16">
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
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Nika's Hierarchy: Price -> Location -> Type -> Specs */}
                  <div className="mb-4 flex flex-col gap-1 relative z-10">
                    <div className="text-2xl font-oxanium font-bold chrome-text tracking-tight">{item.price}</div>
                    <div className="flex items-center gap-2 text-[11px] font-space-grotesk text-gray-500">
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
                    <div className="text-sm font-space-grotesk text-gray-200 font-medium">
                      {item.city} <span className="mx-1 opacity-40">·</span> <span className="text-gray-400">{item.district}</span>
                    </div>
                    <div className="text-[10px] font-oxanium uppercase tracking-[0.2em] text-gray-500 font-medium">
                      {item.type}
                    </div>
                  </div>

                  <div className="flex gap-5 mb-5 pt-4 border-t border-white/5 text-[13px] font-space-grotesk text-gray-300 relative z-10">
                    <div className="flex items-center gap-1.5" title="Спальни">
                      <span className="text-gray-500 text-[11px] uppercase tracking-wider">Beds</span> {item.beds}
                    </div>
                    <div className="flex items-center gap-1.5" title="Ванные">
                      <span className="text-gray-500 text-[11px] uppercase tracking-wider">Baths</span> {item.baths}
                    </div>
                    <div className="flex items-center gap-1.5" title="Площадь">
                      <span className="text-gray-500 text-[11px] uppercase tracking-wider">Area</span> {item.area}м²
                    </div>
                  </div>

                  <div className="mb-5 relative z-10">
                    <PropertyLocationMap {...item.locationMap} />
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
                    <div className="flex items-center gap-2 text-[10px] font-space-grotesk text-gray-500">
                      <ShieldCheck className="w-3 h-3 text-white/30" />
                      <span>Partner: <span className="text-gray-400">{item.agency}</span></span>
                    </div>
                    <button className="min-h-[48px] px-4 rounded text-[11px] font-space-grotesk uppercase tracking-wider text-white/70 group-hover:text-white group-hover:bg-white/10 transition-all flex items-center">
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
            <button className="min-h-[48px] px-8 rounded-full border border-white/20 text-sm font-space-grotesk text-gray-300 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all">
              Загрузить ещё (831 объект)
            </button>
          </div>
        </div>
      </section>

      {/* CONSULTATION STRIP */}
      <section className="bg-[#0f0f0f] border-t border-t-white/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px]">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#8b5e1a] to-transparent opacity-50" />
        </div>

        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none opacity-10 md:opacity-20 -z-10 md:z-0">
          <div className="chrome-blob w-[180px] h-[180px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-4 text-center lg:text-left max-w-2xl">
            <h3 className="text-xl md:text-2xl font-oxanium font-semibold text-white tracking-tight">
              Самостоятельный поиск или помощь эксперта?
            </h3>
            <p className="text-sm md:text-base text-gray-400 font-space-grotesk leading-relaxed">
              Мы понимаем, что переезд и перевод капитала требуют конфиденциальности и скорости. 
              Наши брокеры рассчитывают полную стоимость с налогами, помогают с легализацией ВНЖ 
              и структурируют безопасные сделки, включая оплату в USDT.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center lg:justify-start">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gray-400 font-space-grotesk bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Check className="w-3 h-3 text-[#8b5e1a]" /> 100% Конфиденциально
              </div>
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gray-400 font-space-grotesk bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                <Check className="w-3 h-3 text-[#8b5e1a]" /> Прямая связь (без форм)
              </div>
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gray-400 font-space-grotesk bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
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
                href="#"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors bg-[#141414] hover:bg-[#1a1a1a]"
                aria-label="Написать в WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 transition-colors bg-[#141414] hover:bg-[#1a1a1a]"
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
