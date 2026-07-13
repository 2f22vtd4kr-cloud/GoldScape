import type { TerrainPreset } from '@/components/TerrainMap3D';

export interface CountryMarket {
  city:      string;
  priceFrom: string;
  highlight: string;
}

export interface CountryStat {
  value: string;
  label: string;
}

export interface CountryFeature {
  title: string;
  body:  string;
}

export interface CountryData {
  code:           string;   // lowercase, used in URL  e.g. "ae"
  listingCode:    string;   // uppercase, matches LISTINGS[].country  e.g. "AE"
  flag:           string;
  nameRu:         string;
  nameEn:         string;
  capital:        string;   // main city shown in header
  currency:       string;
  entryPrice:     string;   // "от $65 000"
  terrainPreset:  TerrainPreset;
  tagline:        string;   // one-line hero sub-heading
  stats:          CountryStat[];
  features:       CountryFeature[];
  markets:        CountryMarket[];
  visa:           string;   // short residency/visa note
  taxNote:        string;   // short tax note
}

export const COUNTRIES: CountryData[] = [
  {
    code: 'ae', listingCode: 'AE', flag: '🇦🇪',
    nameRu: 'ОАЭ', nameEn: 'UAE',
    capital: 'Дубай',
    currency: 'USD / AED',
    entryPrice: 'от $380 000',
    terrainPreset: 'uae',
    tagline: 'Нулевой подоходный налог. Стремительный рост капитала.',
    stats: [
      { value: '0%',    label: 'подоходный налог' },
      { value: '+18%',  label: 'рост цен за год' },
      { value: '8–11%', label: 'доходность аренды' },
    ],
    features: [
      {
        title: 'Золотая виза',
        body:  'При инвестиции от $545 000 — резидентство ОАЭ на 10 лет с правом для всей семьи.',
      },
      {
        title: 'Нулевой налог',
        body:  'Нет налога на доход, прирост капитала и наследство. Полная репатриация прибыли.',
      },
      {
        title: 'Ликвидность',
        body:  'Вторичный рынок Дубая — один из самых активных в мире. Перепродажа за 30–60 дней.',
      },
    ],
    markets: [
      { city: 'Palm Jumeirah', priceFrom: '$2 400 000', highlight: 'Пентхаусы с видом на Персидский залив' },
      { city: 'Dubai Marina',  priceFrom: '$368 000',   highlight: 'Студии с высокой доходностью аренды' },
      { city: 'Downtown',      priceFrom: '$5 200 000', highlight: 'Вид на Burj Khalifa, элитный сегмент' },
      { city: 'Business Bay',  priceFrom: '$695 000',   highlight: 'Деловой центр, Canal View апартаменты' },
    ],
    visa:    'Резидентская виза от $205 000 (2 года). Golden Visa от $545 000 (10 лет).',
    taxNote: 'НДС 5% на покупку. Нет налога на доход, прирост капитала и наследство.',
  },
  {
    code: 'tr', listingCode: 'TR', flag: '🇹🇷',
    nameRu: 'Турция', nameEn: 'Turkey',
    capital: 'Стамбул',
    currency: 'USD / TRY',
    entryPrice: 'от $120 000',
    terrainPreset: 'turkey',
    tagline: 'Гражданство за инвестиции. Две части света — один рынок.',
    stats: [
      { value: '$400K',  label: 'минимум для гражданства' },
      { value: '6–10%',  label: 'доходность аренды' },
      { value: '2–5%',   label: 'налог при покупке' },
    ],
    features: [
      {
        title: 'Гражданство Турции',
        body:  'Инвестиция от $400 000 в недвижимость — турецкий паспорт за 3–6 месяцев без ценза оседлости.',
      },
      {
        title: 'Две столицы',
        body:  'Стамбул — финансовый хаб, Анталья — курорт. Оба рынка показывают двузначный рост.',
      },
      {
        title: 'Доступный вход',
        body:  'Апартаменты в Алании или Авсалларе — от $80 000. Курортная аренда приносит 8–12% годовых.',
      },
    ],
    markets: [
      { city: 'Стамбул · Beşiktaş', priceFrom: '$285 000', highlight: 'Центральный район, ликвидные апартаменты' },
      { city: 'Анталья · Lara',     priceFrom: '$448 000', highlight: 'Вилла 200м до пляжа' },
      { city: 'Алания',             priceFrom: '$80 000',  highlight: 'Быстрорастущий курортный рынок' },
    ],
    visa:    'Туристическая виза при покупке любого объекта. Гражданство от $400 000.',
    taxNote: 'Налог на покупку 4% (TAPU). НДС 18% для нового строительства. Доход от аренды облагается по прогрессивной шкале.',
  },
  {
    code: 'cy', listingCode: 'CY', flag: '🇨🇾',
    nameRu: 'Кипр', nameEn: 'Cyprus',
    capital: 'Лимасол',
    currency: 'EUR',
    entryPrice: 'от €180 000',
    terrainPreset: 'cyprus',
    tagline: 'ЕС, низкий налог, 340 солнечных дней в году.',
    stats: [
      { value: '12.5%', label: 'корпоративный налог' },
      { value: '5–8%',  label: 'доходность аренды' },
      { value: '€300K', label: 'ВНЖ инвестора (PR)' },
    ],
    features: [
      {
        title: 'ПМЖ инвестора',
        body:  'Покупка объекта от €300 000 даёт постоянное место жительства ЕС для всей семьи.',
      },
      {
        title: 'Налоговая гавань EU',
        body:  'Корпоративный налог 12.5% — один из самых низких в ЕС. Нет налога на дивиденды для нерезидентов.',
      },
      {
        title: 'Лимасол — Med Riviera',
        body:  'Набережная Лимасола — самый дорогой и ликвидный адрес острова. Рост +12% в 2025.',
      },
    ],
    markets: [
      { city: 'Лимасол · Germasogeia', priceFrom: '€435 000', highlight: 'Рядом с морем, высокая ликвидность' },
      { city: 'Пафос · Koloni',        priceFrom: '€680 000', highlight: 'Вилла с бассейном, панорама на Средиземное' },
      { city: 'Ларнака',               priceFrom: '€180 000', highlight: 'Доступный вход, аэропорт рядом' },
    ],
    visa:    'ВНЖ от €300 000 (один объект). Гражданство — через 5 лет ПМЖ.',
    taxNote: 'Гербовый сбор 0.15–0.2%. НДС 5% (новостройки). Доход от аренды 0–20% в зависимости от суммы.',
  },
  {
    code: 'ge', listingCode: 'GE', flag: '🇬🇪',
    nameRu: 'Грузия', nameEn: 'Georgia',
    capital: 'Батуми',
    currency: 'USD / GEL',
    entryPrice: 'от $65 000',
    terrainPreset: 'georgia',
    tagline: 'Самый низкий порог входа. Рекордная доходность аренды.',
    stats: [
      { value: '9.4%',   label: 'доходность аренды' },
      { value: '1%',     label: 'налог на доход нерезидента' },
      { value: '$100K',  label: 'ВНЖ инвестора' },
    ],
    features: [
      {
        title: 'Нулевые барьеры',
        body:  'Иностранцы могут владеть любой недвижимостью без ограничений. Регистрация за 1 день.',
      },
      {
        title: 'Микро-налог',
        body:  'Подоходный налог для нерезидентов от аренды — 5%. При статусе резидента — 1% (малый бизнес).',
      },
      {
        title: 'Батуми — черноморский Дубай',
        body:  'Самый быстрорастущий черноморский курорт. Доходность апартаментов достигает 12% в сезон.',
      },
    ],
    markets: [
      { city: 'Батуми · Набережная', priceFrom: '$95 000',  highlight: 'Морской фронт, 9.4% yield' },
      { city: 'Тбилиси · Ваке',     priceFrom: '$185 000', highlight: 'Пентхаус с видом на Мтацминда' },
      { city: 'Тбилиси · Старый',   priceFrom: '$120 000', highlight: 'Туристический поток, сезонный доход' },
    ],
    visa:    'ВНЖ инвестора от $100 000. Безвизовый режим 365 дней для граждан РФ, Украины, Беларуси.',
    taxNote: 'Налог на прибыль нерезидентов — 20%, но аренда через local company — 15%. Налог при продаже — 5% с прибыли.',
  },
  {
    code: 'th', listingCode: 'TH', flag: '🇹🇭',
    nameRu: 'Таиланд', nameEn: 'Thailand',
    capital: 'Пхукет',
    currency: 'USD / THB',
    entryPrice: 'от $95 000',
    terrainPreset: 'thailand',
    tagline: 'Элитные виллы. Курортный доход круглый год.',
    stats: [
      { value: '8–12%',  label: 'доходность аренды' },
      { value: '365',    label: 'дней туристического сезона' },
      { value: '51%',    label: 'доля иностранца в кондо' },
    ],
    features: [
      {
        title: 'Кондо-квота',
        body:  'Иностранцы вправе владеть до 49% в кондоминиуме на правах полной собственности (Freehold).',
      },
      {
        title: 'Elite Visa',
        body:  'Thailand Elite Visa: $30 000 — долгосрочная виза от 5 до 20 лет с правом многократного въезда.',
      },
      {
        title: 'Высокий yield',
        body:  'Пхукет и Самуи — среди мировых лидеров по доходности краткосрочной аренды (Airbnb).',
      },
    ],
    markets: [
      { city: 'Пхукет · Rawai',          priceFrom: '$520 000', highlight: 'Вилла с Infinity-бассейном' },
      { city: 'Самуи · Chaweng Noi',      priceFrom: '$318 000', highlight: 'Рядом с пляжем, высокий сезон' },
      { city: 'Паттайя',                  priceFrom: '$95 000',  highlight: 'Самый доступный вход, high yield' },
    ],
    visa:    'Thailand Elite Visa от 5 лет ($30 000). LTR Visa для инвесторов от $500 000.',
    taxNote: 'Трансфертный налог 2%. Нет налога на прирост капитала для физлиц. Доход от аренды — 15% у источника.',
  },
  {
    code: 'pt', listingCode: 'PT', flag: '🇵🇹',
    nameRu: 'Португалия', nameEn: 'Portugal',
    capital: 'Лиссабон',
    currency: 'EUR',
    entryPrice: 'от €345 000',
    terrainPreset: 'portugal',
    tagline: 'Шенген. NHR-режим. Atlantic lifestyle.',
    stats: [
      { value: '10%',   label: 'NHR-налог на иностранный доход' },
      { value: '€500K', label: 'Golden Visa (некоторые регионы)' },
      { value: '5–7%',  label: 'доходность аренды в Лиссабоне' },
    ],
    features: [
      {
        title: 'Golden Visa',
        body:  'Резидентская виза Шенгена при инвестиции в фонды или недвижимость в некоторых регионах.',
      },
      {
        title: 'NHR — налоговый режим',
        body:  'Статус Non-Habitual Resident: иностранный пассивный доход облагается 10% в течение 10 лет.',
      },
      {
        title: 'Алгарве — европейская Ривьера',
        body:  'Самый дорогой рынок страны. Vale do Lobo и Quinta do Lago — виллы до €5 млн.',
      },
    ],
    markets: [
      { city: 'Лиссабон · Campo de Ourique', priceFrom: '€410 000', highlight: '82 м² в центре, Golden Visa' },
      { city: 'Алгарве · Vale do Lobo',      priceFrom: '€1 380 000', highlight: 'Вилла-европейская Ривьера' },
      { city: 'Порту',                        priceFrom: '€280 000',  highlight: 'Рост +15% за 2 года' },
    ],
    visa:    'D7 Visa (пассивный доход) от €760/мес. Golden Visa: фонды €500 000 или недвижимость в отдельных регионах.',
    taxNote: 'IMT (налог при покупке) 1–8%. Гербовый сбор 0.8%. Ежегодный IMI 0.3–0.45%.',
  },
  {
    code: 'rs', listingCode: 'RS', flag: '🇷🇸',
    nameRu: 'Сербия', nameEn: 'Serbia',
    capital: 'Белград',
    currency: 'EUR / RSD',
    entryPrice: 'от €85 000',
    terrainPreset: 'serbia',
    tagline: 'Нет ограничений для иностранцев. Европа на входе.',
    stats: [
      { value: '15%',   label: 'подоходный налог (flat)' },
      { value: '6–9%',  label: 'доходность аренды в Белграде' },
      { value: '€0',    label: 'ограничений на владение' },
    ],
    features: [
      {
        title: 'Свободный рынок',
        body:  'Иностранцы покупают жилую недвижимость без ограничений. Регистрация права — 5–10 дней.',
      },
      {
        title: 'Belgrad — растущий хаб',
        body:  'Белград входит в топ-10 самых быстрорастущих рынков Европы. Рост цен +11% в 2025.',
      },
      {
        title: 'Доступный вход',
        body:  'Апартаменты в New Belgrade — от €85 000. Высокий спрос со стороны IT-экспатов.',
      },
    ],
    markets: [
      { city: 'Белград · New Belgrade', priceFrom: '€85 000',  highlight: 'IT-кластер, высокий rental demand' },
      { city: 'Белград · Старый город', priceFrom: '€140 000', highlight: 'Историческое ядро, Airbnb premium' },
      { city: 'Нови-Сад',              priceFrom: '€70 000',  highlight: 'Второй город страны, university hub' },
    ],
    visa:    'Вид на жительство при покупке от €100 000. Безвизовый въезд для граждан РФ на 30 дней.',
    taxNote: 'Налог при покупке 2.5% (вторичный рынок). Новостройки — НДС 10%. Налог на прирост капитала 15%.',
  },
];

/** Quick lookup by URL code (lowercase) */
export const countryByCode = (code: string): CountryData | undefined =>
  COUNTRIES.find(c => c.code === code.toLowerCase());

/** Quick lookup by listing code (uppercase, e.g. "AE") */
export const countryByListingCode = (lc: string): CountryData | undefined =>
  COUNTRIES.find(c => c.listingCode === lc.toUpperCase());
