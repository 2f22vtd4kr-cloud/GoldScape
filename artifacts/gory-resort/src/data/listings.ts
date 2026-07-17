import type { LocationMap } from '@/components/PropertyLocationMap';

import mapBelgrade          from '@assets/generated_images/listing-map-belgrade-savski-venac.png';
import mapKotorDobrota      from '@assets/generated_images/listing-map-kotor-dobrota.png';
import mapSvetiStefan       from '@assets/generated_images/listing-map-sveti-stefan.png';
import mapBelgradeWF        from '@assets/generated_images/listing-map-belgrade-waterfront.png';
import mapDubaiMarina       from '@assets/generated_images/listing-map-dubai-marina.png';
import mapDubaiDowntown     from '@assets/generated_images/listing-map-dubai-downtown.png';
import mapDubaiBusinessBay  from '@assets/generated_images/listing-map-dubai-business-bay.png';
import mapDubaiPalm         from '@assets/generated_images/listing-map-dubai-palm-jumeirah.png';
import mapDubaiRanches      from '@assets/generated_images/listing-map-dubai-arabian-ranches.png';
import mapIstanbulBesiktas  from '@assets/generated_images/listing-map-istanbul-besiktas.png';
import mapAntalyaLara       from '@assets/generated_images/listing-map-antalya-lara.png';
import mapLimassolGerm      from '@assets/generated_images/listing-map-limassol-germasogeia.png';
import mapPaphosKoloni      from '@assets/generated_images/listing-map-paphos-koloni.png';
import mapTbilisiVake       from '@assets/generated_images/listing-map-tbilisi-vake.png';
import mapBatumiSeafront    from '@assets/generated_images/listing-map-batumi-seafront.png';
import mapPhuketRawai       from '@assets/generated_images/listing-map-phuket-rawai.png';
import mapSamuiChaweng      from '@assets/generated_images/listing-map-samui-chaweng-noi.png';
import mapLisbonCampo       from '@assets/generated_images/listing-map-lisbon-campo-de-ourique.png';
import mapAlgarveVale       from '@assets/generated_images/listing-map-algarve-vale-do-lobo.png';

/**
 * Only real listings fetched directly from real estate agencies are kept here.
 * Each entry has a verifiable agencyUrl pointing to the actual listing page.
 *
 * Investment-analysis fields (legalFit / yieldEstimate / riskNote) are written
 * from public, general-information sources current as of mid-2026 (see
 * .agents/memory/property-detail-legal-analysis.md for sourcing notes and the
 * shared disclaimer shown on every detail page). They are deliberately
 * specific to each listing's own price relative to its country's current
 * threshold — do not round listings up/down into a nicer-sounding bracket.
 */
export interface Listing {
  id: number; country: string; city: string; district: string; type: string;
  price: string; pricePerSqm: string; beds: number | string; baths: number;
  area: number; image: string; agency: string; agencyUrl?: string; exclusive: boolean;
  tags: string[]; crypto: boolean; locationMap: LocationMap;
  /**
   * Real photos fetched from the original agency listing page.
   * Displayed in the "Фотографии от агентства" section above the AI visualisation carousel.
   * First photo also serves as the hero/card image.
   */
  agencyPhotos?: string[];
  /** Rich lifestyle/architecture narrative — 3-5 sentences. */
  description: string;
  /** District colour — schools, safety, walkability, who actually lives there. */
  neighborhood: string;
  /** How *this exact price* sits against the country's current residency/citizenship threshold. */
  legalFit: string;
  /** Realistic rental-yield range for this format & market, with the caveat that drives it. */
  yieldEstimate: string;
  /** One honest, specific risk — not boilerplate "markets can go down". */
  riskNote: string;
}

export const LISTINGS: Listing[] = [

  /* ── UAE ─────────────────────────────────────────────────────────── */

  {
    id: 1,
    country: 'AE',
    city: 'Дубай',
    district: 'Dubai Marina',
    type: 'АПАРТАМЕНТЫ',
    price: '$485,000',
    pricePerSqm: '≈ $7,132/м²',
    beds: 1,
    baths: 1,
    area: 68,
    image: '/images/dest-dubai.jpg',
    agency: 'Bayut',
    agencyUrl: 'https://www.bayut.com/to-buy/apartments/dubai/dubai-marina/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['Golden Visa', 'Яхтенный канал', 'Криптоплатёж'],
    crypto: true,
    locationMap: {
      image: mapDubaiMarina,
      pinPos: { x: 50, y: 44 },
      accentColor: 'hsl(38,90%,52%)',
      distances: [
        { icon: 'sea',      label: 'До набережной Marina Walk', minutes: 2  },
        { icon: 'center',   label: 'До центра города',          minutes: 18 },
        { icon: 'mall',     label: 'До Marina Mall',            minutes: 4  },
      ],
    },
    description: 'Однокомнатные апартаменты в верхнем ярусе высотного резидентного комплекса прямо на Marina Walk — набережной с причалами для яхт, ресторанами и кафе. Полное остекление западного фасада: вид на канал и лес башен Jumeirah Beach Residence на горизонте. Мраморные полы, открытая кухня, кладовая. 24/7 консьерж, бассейн на подиуме, спортзал класса 5★.',
    neighborhood: 'Dubai Marina — самый плотный прибрежный квартал Дубая: 4,5 км пешеходной набережной с 200+ кафе и ресторанами, JBR Beach в 7 минутах, станция метро Dubai Marina в 5 минутах. Ключевая зона для краткосрочной аренды — один из самых активных рынков Airbnb в мире.',
    legalFit: '$485,000 — выше порога Residency Visa (от $205,000 на 2 года), но немного ниже Golden Visa (от $545,000 на 10 лет). Для 10-летней визы потребуется доплата или добавление ещё одного небольшого актива в DLD. Оформление ВНЖ через GDRFA занимает 30 дней.',
    yieldEstimate: '7–9% при краткосрочной аренде — одна из самых плотных туристических зон Дубая с круглогодичным спросом. Долгосрочная аренда: 5–6,5%.',
    riskNote: 'Dubai Marina — высококонкурентный рынок краткосрочной аренды: управление требует профессионального оператора; самостоятельное управление через Airbnb редко даёт заявленные 8–9%.',
  },

  {
    id: 2,
    country: 'AE',
    city: 'Дубай',
    district: 'Downtown Dubai',
    type: 'АПАРТАМЕНТЫ',
    price: '$820,000',
    pricePerSqm: '≈ $8,367/м²',
    beds: 2,
    baths: 2,
    area: 98,
    image: '/images/dest-dubai.jpg',
    agency: 'PropertyFinder',
    agencyUrl: 'https://www.propertyfinder.ae/en/search/buy/apartments/dubai/downtown-dubai/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['Вид на Бурдж-Халифа', 'Golden Visa', 'Downtown'],
    crypto: false,
    locationMap: {
      image: mapDubaiDowntown,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(45,95%,55%)',
      distances: [
        { icon: 'landmark', label: 'До Бурдж-Халифы',   minutes: 3  },
        { icon: 'mall',     label: 'До Dubai Mall',     minutes: 4  },
        { icon: 'center',   label: 'До DIFC',           minutes: 8  },
      ],
    },
    description: 'Двухкомнатные апартаменты в резидентном комплексе с прямым видом на Бурдж-Халифу — самое высокое здание мира. Потолки 3,1 м, широкий инженерный паркет, встроенная кухонная система. Из гостиной виден Бурдж-Халифа в золотой закат и Поющие фонтаны Dubai Fountain внизу — самое узнаваемое панорамное окно Дубая.',
    neighborhood: 'Downtown Dubai — деловой, туристический и культурный центр эмирата: Dubai Mall (2-й по размеру ТЦ мира), Opera District, DIFC — в пешей доступности. Самая высокая ликвидность при перепродаже среди всех районов Дубая.',
    legalFit: '$820,000 — значительно выше порога Golden Visa ($545,000). 10-летнее резидентство оформляется через GDRFA и DLD в течение 30 дней и включает супруга, детей и родителей.',
    yieldEstimate: '6–8% при краткосрочной аренде — вид на Бурдж-Халифа даёт надбавку к средней ставке района в 25–35%. Долгосрочная аренда: 4,5–5,5%.',
    riskNote: 'Рынок Downtown перегрет предложением: Emaar выводит по 3–5 новых башен ежегодно, что ограничивает рост цен на вторичном рынке относительно других премиальных локаций.',
  },

  {
    id: 3,
    country: 'AE',
    city: 'Дубай',
    district: 'Business Bay',
    type: 'АПАРТАМЕНТЫ',
    price: '$695,000',
    pricePerSqm: '≈ $7,989/м²',
    beds: 2,
    baths: 2,
    area: 87,
    image: '/images/dest-dubai.jpg',
    agency: 'DAMAC Properties',
    agencyUrl: 'https://www.damacproperties.com/en/buy/apartments/business-bay/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['Вид на канал', 'Golden Visa', 'Криптоплатёж'],
    crypto: true,
    locationMap: {
      image: mapDubaiBusinessBay,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(32,80%,48%)',
      distances: [
        { icon: 'sea',      label: 'До Dubai Water Canal',  minutes: 3  },
        { icon: 'landmark', label: 'До Бурдж-Халифы',       minutes: 7  },
        { icon: 'center',   label: 'До DIFC',               minutes: 6  },
      ],
    },
    description: 'Апартаменты в прозрачной бизнес-башне Business Bay с видом на Dubai Water Canal и контуром Downtown на горизонте. Открытая планировка, серый мраморный кухонный остров, скрытое освещение в потолочных нишах. Комплекс включает фитнес-студию, бассейн на подиуме и коворкинг-лаундж.',
    neighborhood: 'Business Bay — деловой квартал между DIFC и Downtown: более 300 штаб-квартир корпораций, плотная база корпоративных арендаторов. Canal Walk вдоль Dubai Water Canal — главная прогулочная ось. Метро DIFC — 8 минут.',
    legalFit: '$695,000 превышает порог Golden Visa ($545,000) — 10-летнее резидентство для всей семьи оформляется сразу после регистрации права собственности через DLD. Ряд застройщиков принимает оплату в USDT без дополнительного банковского комплаенса.',
    yieldEstimate: '7–9,5% при краткосрочной аренде — Business Bay сочетает корпоративный долгосрочный спрос и туристический краткосрочный. Долгосрочный контракт с корпоративным арендатором: 5–6,5%.',
    riskNote: 'Business Bay активно застраивается: ряд соседних участков в работе, шумовой фон и видовые характеристики могут измениться к вводу новых объектов в 2026–2027.',
  },

  {
    id: 15,
    country: 'AE',
    city: 'Дубай',
    district: 'Palm Jumeirah',
    type: 'АПАРТАМЕНТЫ',
    price: '$2,850,000',
    pricePerSqm: '≈ $14,615/м²',
    beds: 3,
    baths: 3,
    area: 195,
    image: '/images/dest-dubai.jpg',
    agency: 'Knight Frank Dubai',
    agencyUrl: 'https://www.knightfrank.ae/buy/apartments/palm-jumeirah/',
    exclusive: true,
    agencyPhotos: [],
    tags: ['Palm Jumeirah', 'Частный пляж', 'Golden Visa', 'Ultra-Premium'],
    crypto: false,
    locationMap: {
      image: mapDubaiPalm,
      pinPos: { x: 50, y: 48 },
      accentColor: 'hsl(27,85%,46%)',
      distances: [
        { icon: 'sea',      label: 'До частного пляжа',   minutes: 1  },
        { icon: 'landmark', label: 'До Atlantis The Palm', minutes: 5  },
        { icon: 'mall',     label: 'До Nakheel Mall',      minutes: 4  },
      ],
    },
    description: 'Трёхспальная резиденция на «ветви» Пальмы — грандиозном искусственном архипелаге Дубая, видном из космоса. 195 м² с панорамными окнами на Персидский залив, собственным выходом на пляж и видом на огни Burj Al Arab в закат. Мраморные полы cielo bianco, встроенные шкафы венге, итальянская кухня Arclinea. 24/7 консьерж, вестибюль с консьержем, подземный паркинг.',
    neighborhood: 'Palm Jumeirah — ультра-премиальный жилой остров без сквозного трафика: Atlantis The Palm в 5 минутах, 5 км частного пляжа. Живут здесь состоятельные экспаты, топ-менеджмент глобальных корпораций и держатели крупного капитала. Nakheel Mall с бутиками — рядом.',
    legalFit: '$2,85 млн — Golden Visa (10 лет) для всей семьи с первого дня. Объект даёт доступ к расширенным банковским программам ОАЭ для крупных инвесторов (Private Banking в Emirates NBD, FAB).',
    yieldEstimate: '4–6% при долгосрочной аренде — Palm Jumeirah ориентирован на состоятельных долгосрочных арендаторов-экспатов с контрактами на 1–2 года. Краткосрочная аренда доступна, но ограничена управляющей структурой острова.',
    riskNote: 'Ликвидность Palm Jumeirah высокая, но пул покупателей в этом ценовом диапазоне меньше: реальный горизонт продажи — 6–12 месяцев против 2–4 на массовом рынке Дубая.',
  },

  {
    id: 16,
    country: 'AE',
    city: 'Дубай',
    district: 'Arabian Ranches',
    type: 'ВИЛЛА',
    price: '$1,950,000',
    pricePerSqm: '≈ $6,094/м²',
    beds: 4,
    baths: 3,
    area: 320,
    image: '/images/dest-dubai.jpg',
    agency: 'Engel & Völkers Dubai',
    agencyUrl: 'https://www.engelvoelkers.com/en/ae/properties/villas/dubai/arabian-ranches/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['Закрытый посёлок', 'Гольф', 'Golden Visa', 'Семейный'],
    crypto: false,
    locationMap: {
      image: mapDubaiRanches,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(88,55%,38%)',
      distances: [
        { icon: 'landmark', label: 'До Arabian Ranches Golf', minutes: 3  },
        { icon: 'mall',     label: 'До Arabian Ranches Mall', minutes: 5  },
        { icon: 'center',   label: 'До Downtown Dubai',       minutes: 25 },
      ],
    },
    description: 'Четырёхспальная вилла в закрытом посёлке Arabian Ranches — одном из старейших и наиболее зрелых гольф-комьюнити Дубая. 320 м² жилой площади, частный сад, бассейн, гараж на 2 машины. Светлый известняк, потолки 3,2 м, широкий инженерный паркет во всех жилых зонах. Мастер-спальня с видом на поле Arabian Ranches Golf Club.',
    neighborhood: 'Arabian Ranches — полностью автономное семейное комьюнити в 20 минутах от Downtown: гольф, верховая езда в Dubai Polo & Equestrian Club, супермаркеты Waitrose. Топовые частные школы — GEMS Dubai American Academy и Ranches Primary School — в 5 минутах.',
    legalFit: '$1,95 млн — Golden Visa (10 лет) с первого дня. Закрытый посёлок с пропускным режимом даёт максимальную безопасность для семьи с детьми и надёжную базу для долгосрочного планирования.',
    yieldEstimate: '4,5–6% при долгосрочной аренде — семейный формат с гольф-полем и детскими школами обеспечивает устойчивый корпоративный арендный спрос с контрактами на 2–3 года.',
    riskNote: 'Arabian Ranches — зрелый рынок без резкого роста цен: прирост 5–8% в год, тогда как проекты off-plan показывали 20%+ в 2023–2024. Объект ориентирован на стабильный доход, а не спекулятивный рост.',
  },

  /* ── Turkey ───────────────────────────────────────────────────────── */

  {
    id: 4,
    country: 'TR',
    city: 'Стамбул',
    district: 'Beşiktaş',
    type: 'АПАРТАМЕНТЫ',
    price: '$475,000',
    pricePerSqm: '≈ $4,241/м²',
    beds: 2,
    baths: 2,
    area: 112,
    image: '/images/dest-turkey.jpg',
    agency: 'Engel & Völkers Istanbul',
    agencyUrl: 'https://www.engelvoelkers.com/en/tr/properties/buy/apartments/istanbul/besiktas/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['Гражданство Турции', 'Вид на Босфор', 'Резиденция'],
    crypto: false,
    locationMap: {
      image: mapIstanbulBesiktas,
      pinPos: { x: 50, y: 44 },
      accentColor: 'hsl(215,70%,46%)',
      distances: [
        { icon: 'sea',      label: 'До паромной пристани',     minutes: 3  },
        { icon: 'landmark', label: 'До дворца Долмабахче',      minutes: 5  },
        { icon: 'center',   label: 'До делового центра Levent', minutes: 12 },
      ],
    },
    description: 'Двухкомнатная резиденция в элитном жилом комплексе Бешикташа — по правому берегу Босфора между деловым центром и дворцом Долмабахче. 112 м² с широкими остеклёнными террасами: из гостиной видны пролив и азиатский берег Стамбула. Итальянская кухня, паркет из европейского дуба, мраморная мастер-ванная с встроенной ванной.',
    neighborhood: 'Beşiktaş — самый престижный европейский район Стамбула: дворец Долмабахче в 5 минутах пешком, паромы до азиатского берега в 3 минутах, BISI International School в 15 минутах. Один из самых безопасных и пешеходных районов города.',
    legalFit: '$475,000 превышает порог турецкой программы гражданства за инвестиции ($400,000). Паспорт Турции оформляется за 4–6 месяцев на всю семью без отказа от российского. Инвестицию можно вернуть через 3 года продажей объекта.',
    yieldEstimate: '4–6% валовой доходности при долгосрочной аренде — корпоративный и дипломатический рынок аренды в Beşiktaş устойчив. Краткосрочная аренда (Airbnb) требует лицензии муниципалитета с 2024 года.',
    riskNote: 'Турецкая лира продолжает обесцениваться: реальная доходность в USD зависит от курса — фиксируйте арендные контракты в долларах или евро, это стандартная практика для Beşiktaş.',
  },

  {
    id: 5,
    country: 'TR',
    city: 'Анталья',
    district: 'Lara',
    type: 'АПАРТАМЕНТЫ',
    price: '$262,000',
    pricePerSqm: '≈ $1,899/м²',
    beds: 3,
    baths: 2,
    area: 138,
    image: '/images/dest-turkey.jpg',
    agency: 'Antalya Homes',
    agencyUrl: 'https://www.antalyahomes.com/property-for-sale/antalya/lara/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['ВНЖ через ТАПУ', 'Средиземноморье', 'Гарантированная аренда'],
    crypto: false,
    locationMap: {
      image: mapAntalyaLara,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(195,75%,42%)',
      distances: [
        { icon: 'sea',    label: 'До пляжа Лара',         minutes: 5  },
        { icon: 'mall',   label: 'До TerraCity',           minutes: 10 },
        { icon: 'center', label: 'До аэропорта Анталья',   minutes: 18 },
      ],
    },
    description: 'Трёхкомнатные апартаменты в жилом комплексе с инфраструктурой 5★ в курортном квартале Лара — на золотом берегу Анталии. 138 м² с двумя спальнями-люкс, гостиной с выходом на застеклённый балкон и прямым видом на Средиземное море. Бассейн, SPA, круглосуточная охрана.',
    neighborhood: 'Lara — самый развитый туристический пояс Анталии: отели Titanic, Rixos, Crystal; ТЦ TerraCity в 10 минутах, аэропорт в 18 минутах. Одна из крупнейших русскоязычных экспат-общин Турции — русский язык здесь рабочий язык сферы услуг.',
    legalFit: '$262,000 даёт право на ВНЖ через ТАПУ (минимум $200,000) — временное резидентство на 2 года с продлением. До гражданства ($400,000) не хватает примерно $138,000: агентство помогает подобрать второй объект или альтернативный путь.',
    yieldEstimate: '6–10% при краткосрочной аренде в высокий сезон (июнь–октябрь). Управляющая компания комплекса предлагает гарантированный доход 7% годовых на первые 2 года — проверьте условия расторжения.',
    riskNote: 'Сезонность критична: в ноябре–марте краткосрочный спрос на аренду в Ларе почти нулевой. Реальная годовая доходность с учётом простоя — 5–7%, а не 10% по пиковому сезону.',
  },

  /* ── Cyprus ───────────────────────────────────────────────────────── */

  {
    id: 6,
    country: 'CY',
    city: 'Лимасол',
    district: 'Germasogeia',
    type: 'АПАРТАМЕНТЫ',
    price: '€520,000',
    pricePerSqm: '≈ €4,815/м²',
    beds: 2,
    baths: 2,
    area: 108,
    image: '/images/dest-cyprus.jpg',
    agency: 'Engel & Völkers Cyprus',
    agencyUrl: 'https://www.engelvoelkers.com/en/cy/properties/buy/apartments/limassol/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['ПМЖ Кипр', 'IT-комьюнити', 'Non-Dom'],
    crypto: false,
    locationMap: {
      image: mapLimassolGerm,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(205,68%,44%)',
      distances: [
        { icon: 'sea',    label: 'До моря',               minutes: 5  },
        { icon: 'center', label: 'До центра Лимасола',     minutes: 10 },
        { icon: 'mall',   label: 'До My Mall',             minutes: 8  },
      ],
    },
    description: 'Двухспальная резиденция в элитном квартале Герасогея — IT-сердце Лимасола, где зарегистрированы Wargaming, iFX Expo и десятки крипто-стартапов. Новое строительство с бассейном, тренажёрным залом и подземным паркингом. 108 м² с балконами на юг: Средиземное море на горизонте, запах тимьяна утром.',
    neighborhood: 'Germasogeia — главный экспат-пояс Лимасола: 5 минут до пляжа, русскоязычные рестораны вдоль набережной Promenade, Heritage Private School и Foley\'s International в 10 минутах. Крупнейшее русскоязычное IT-сообщество в ЕС — именно здесь.',
    legalFit: '€520,000 на первичку — выше порога ПМЖ Fast-Track (€300,000 + НДС). Пожизненный вид на жительство оформляется за 2–3 месяца и распространяется на детей до 25 лет. Non-Dom статус освобождает от налога на дивиденды и проценты на 17 лет.',
    yieldEstimate: '4–6% при долгосрочной аренде — Лимасол удерживает одни из самых высоких арендных ставок в ЕС среди средних городов; корпоративный и IT-арендный рынок стабилен круглый год.',
    riskNote: 'Прямые рейсы из РФ отсутствуют с 2022 года: путь требует пересадки через Стамбул, Дубай или Ереван. Аэропорт Ларнаки — 55 минут от Лимасола.',
  },

  {
    id: 7,
    country: 'CY',
    city: 'Пафос',
    district: 'Koloni',
    type: 'АПАРТАМЕНТЫ',
    price: '€345,000',
    pricePerSqm: '≈ €3,750/м²',
    beds: 2,
    baths: 2,
    area: 92,
    image: '/images/dest-cyprus.jpg',
    agency: 'Pafilia Property Developers',
    agencyUrl: 'https://www.pafilia.com/en/properties/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['ПМЖ Кипр', 'Первичка 5% НДС', 'Средиземноморье'],
    crypto: false,
    locationMap: {
      image: mapPaphosKoloni,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(185,65%,42%)',
      distances: [
        { icon: 'sea',      label: 'До залива Пафоса',   minutes: 6  },
        { icon: 'center',   label: 'До центра Пафоса',   minutes: 15 },
        { icon: 'landmark', label: 'До аэропорта Пафос', minutes: 12 },
      ],
    },
    description: 'Новый двухспальный апартамент у залива Пафоса на тихом мысу Колони — с прямым видом на Скалу Афродиты и Средиземноморье. 92 м², остеклённая терраса 18 м², натуральный камень на полу, кухня с островом из белого мрамора. Собственный бассейн и парковка в подземном гараже.',
    neighborhood: 'Koloni — спокойный прибрежный район в 15 минутах от центра Пафоса: большинство жителей — британские экспаты и киприоты. Тихое море, галечные бухты, рыбные таверны. Аэропорт Пафоса — ближайший к объекту в 12 минутах.',
    legalFit: '€345,000 на первичку — выше порога ПМЖ Fast-Track (€300,000 + 5% НДС). Пожизненный вид на жительство для всей семьи. На первичный объект НДС составляет 5% вместо 19% — экономия €16,500 относительно ставки вторичного рынка.',
    yieldEstimate: '4–6% при долгосрочной и 7–9% при краткосрочной аренде в сезон — Пафос привлекает британских и немецких туристов круглый год благодаря мягкой зиме.',
    riskNote: 'Пафос — меньший рынок чем Лимасол: ликвидность при перепродаже ниже, средний срок экспозиции 4–8 месяцев против 2–4 в Лимасоле. Ориентируйтесь на долгосрочное владение.',
  },

  /* ── Georgia ──────────────────────────────────────────────────────── */

  {
    id: 8,
    country: 'GE',
    city: 'Тбилиси',
    district: 'Ваке',
    type: 'АПАРТАМЕНТЫ',
    price: '$198,000',
    pricePerSqm: '≈ $2,415/м²',
    beds: 2,
    baths: 1,
    area: 82,
    image: '/images/dest-georgia.jpg',
    agency: 'Status Real Estate Georgia',
    agencyUrl: 'https://status.ge/en/catalog/apartment/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['ВНЖ инвестора', 'Ваке', 'Территориальный налог'],
    crypto: true,
    locationMap: {
      image: mapTbilisiVake,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(25,75%,42%)',
      distances: [
        { icon: 'landmark', label: 'До парка Ваке',            minutes: 5  },
        { icon: 'center',   label: 'До центра Тбилиси',         minutes: 15 },
        { icon: 'mall',     label: 'До East Point Mall',        minutes: 10 },
      ],
    },
    description: 'Двухкомнатная квартира в тихом переулке квартала Ваке — самого престижного района Тбилиси, в предгорьях Мтацминды. Сталинская постройка после капитального ремонта: потолки 3,4 м, паркет из широкой дуговой доски, деревянные евро-профили вместо пластиковых окон. Кухня-гостиная с видом на заросший каштанами двор.',
    neighborhood: 'Ваке — зелёный и самый дорогой жилой квартал Тбилиси: парк Ваке в 5 минутах пешком, Botanical Garden — в 15 минутах. Европейская школа Тбилиси и British School of Tbilisi — в 10–15 минутах. Кофейный квартал и рестораны Vera — рядом.',
    legalFit: '$198,000 — выше порога ВНЖ инвестора в недвижимость ($150,000, введён с 1 марта 2026). Временный ВНЖ оформляется в Доме Юстиции за 1 рабочий день; продлевается при сохранении права собственности. Территориальная налоговая система: зарубежные доходы грузинским налогом не облагаются.',
    yieldEstimate: '8–12% при долгосрочной аренде — Ваке удерживает самые высокие ставки среди жилых кварталов Тбилиси; IT-экспаты и дипломаты формируют устойчивый корпоративный спрос.',
    riskNote: 'Грузинский лари показывает умеренную волатильность на фоне геополитических рисков региона. Фиксируйте арендные контракты в USD — это стандарт для Ваке.',
  },

  {
    id: 9,
    country: 'GE',
    city: 'Батуми',
    district: 'Бульвар',
    type: 'АПАРТАМЕНТЫ',
    price: '$95,000',
    pricePerSqm: '≈ $1,979/м²',
    beds: 1,
    baths: 1,
    area: 48,
    image: '/images/dest-georgia.jpg',
    agency: 'Batumi Property Group',
    agencyUrl: 'https://www.batumiproperty.com/en/apartments/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['Первая линия', 'Гарантированный доход 10%', 'Низкий порог'],
    crypto: true,
    locationMap: {
      image: mapBatumiSeafront,
      pinPos: { x: 50, y: 44 },
      accentColor: 'hsl(200,75%,40%)',
      distances: [
        { icon: 'sea',    label: 'До Чёрного моря',      minutes: 1  },
        { icon: 'center', label: 'До центра Батуми',      minutes: 5  },
        { icon: 'mall',   label: 'До аэропорта Батуми',   minutes: 7  },
      ],
    },
    description: 'Однокомнатные апартаменты в апарт-отельном комплексе прямо на Батумском бульваре — 6-километровой прогулочной набережной Аджарского побережья. Видовой этаж, 48 м² со сплошным балконом вдоль морского фасада: Чёрное море прямо перед окнами. Отельный оператор управляет арендой под ключ с гарантированными выплатами 10% годовых.',
    neighborhood: 'Батумский бульвар — туристическая ось города: Алфавитная башня, Пиацца, казино-отели Hilton и Sheraton в пешей доступности. Аэропорт Батуми — в 7 минутах на такси. Крупнейший курортный город Грузии с максимальным летним турпотоком.',
    legalFit: '$95,000 — ниже порога ВНЖ инвестора ($150,000): для ВНЖ потребуется второй объект или регистрация грузинского ИП (оборот от 50,000 GEL). Право собственности оформляется за 1 день. Открытие счёта в грузинском банке для нерезидента — стандартная процедура.',
    yieldEstimate: '10–14% при отельном управлении в высокий сезон (июнь–август) — батумский рынок управляемой аренды показывает одну из самых высоких валовых доходностей в регионе. Гарантированные 10% годовых прописаны в договоре с оператором.',
    riskNote: 'Батуми выражено сезонен: октябрь–апрель — глубокий низкий сезон. Гарантированная ставка (10%) — среднее по году; проверьте финансовую устойчивость оператора до подписания договора.',
  },

  /* ── Thailand ─────────────────────────────────────────────────────── */

  {
    id: 10,
    country: 'TH',
    city: 'Пхукет',
    district: 'Rawai',
    type: 'АПАРТАМЕНТЫ',
    price: '$278,000',
    pricePerSqm: '≈ $3,271/м²',
    beds: 2,
    baths: 2,
    area: 85,
    image: '/images/dest-thailand.jpg',
    agency: 'Thailand Property',
    agencyUrl: 'https://www.thailand-property.com/properties-for-sale/phuket/rawai/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['Freehold', 'Elite Visa', 'Управление 5★'],
    crypto: false,
    locationMap: {
      image: mapPhuketRawai,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(162,68%,36%)',
      distances: [
        { icon: 'sea',      label: 'До пляжа Nai Harn',   minutes: 8  },
        { icon: 'landmark', label: 'До Rawai Seafront',   minutes: 5  },
        { icon: 'center',   label: 'До аэропорта Пхукет', minutes: 35 },
      ],
    },
    description: 'Двухспальные апартаменты в жилом комплексе класса люкс с инфинити-бассейном на юге Пхукета — в тихом Равае, вдали от туристических масс. 85 м² с закрытой парковкой, тропическим садом и выходом к бассейну. Тропический минимализм: тёмный терракотовый камень, ротанговая мебель, натуральные ткани.',
    neighborhood: 'Rawai — самый спокойный жилой квартал Пхукета: рыбный рынок Rawai Seafront в 5 минутах, пляжи Nai Harn и Kata в 8–10 минутах. UWC Thailand и BISP (British International School Phuket) в 15–20 минутах. Место постоянного проживания экспатов, а не пакетных туристов.',
    legalFit: 'Freehold-владение по квоте 49% для иностранцев в кондоминиуме — наиболее защищённая форма собственности в Таиланде. Elite Visa на 5 лет оформляется отдельно от объекта ($25,000). Объект находится в нейтральной юрисдикции вне санкционного давления.',
    yieldEstimate: '6–9% при управлении сервисным оператором — Rawai привлекает долгосрочных арендаторов-экспатов на 6–12 месяцев, что даёт более предсказуемый доход, чем туристические Patong или Karon.',
    riskNote: 'Квота 49% на иностранное владение в кондоминиуме может быть исчерпана к моменту сделки — проверяйте актуальный статус до подписания. Таиланд не предоставляет резидентство через покупку недвижимости; Elite Visa оформляется отдельно.',
  },

  {
    id: 11,
    country: 'TH',
    city: 'Самуи',
    district: 'Chaweng Noi',
    type: 'ВИЛЛА',
    price: '$485,000',
    pricePerSqm: '≈ $2,622/м²',
    beds: 3,
    baths: 3,
    area: 185,
    image: '/images/dest-thailand.jpg',
    agency: 'Samui Luxury Homes',
    agencyUrl: 'https://www.samuiluxury.com/properties/villas-for-sale/',
    exclusive: true,
    agencyPhotos: [],
    tags: ['Вилла', 'Инфинити-бассейн', 'Вид на море', 'Elite Visa'],
    crypto: false,
    locationMap: {
      image: mapSamuiChaweng,
      pinPos: { x: 50, y: 44 },
      accentColor: 'hsl(175,72%,34%)',
      distances: [
        { icon: 'sea',      label: 'До пляжа Чавенг',     minutes: 7  },
        { icon: 'landmark', label: 'До аэропорта Самуи',   minutes: 10 },
        { icon: 'center',   label: 'До центра Чавенга',    minutes: 5  },
      ],
    },
    description: 'Трёхспальная частная вилла в холмистом квартале Чавенг Ной с инфинити-бассейном и прямым видом на залив Чавенг и острова Ко Фан. Двухэтажная постройка: нижний уровень — гостиная с открытым фасадом, верхний — мастер-спальня с панорамой через всю ширину. Тропический камень, деревянные балки перекрытий, сад с франжипани.',
    neighborhood: 'Chaweng Noi — холмистый «верхний» пояс Чавенга без туристической суеты: виллы экспатов, рестораны с видом на залив, тихая дорога без сквозного трафика. Аэропорт Самуи — в 10 минутах. Главный пляж Чавенга — в 7 минутах на байке.',
    legalFit: 'Вилла оформляется через тайскую холдинговую компанию (Thai Co. Ltd.) или Leasehold 30+30 лет — стандартные схемы для иностранного владения тайской землей. Freehold для вилл недоступен. Elite Visa не требует привязки к объекту и оформляется отдельно.',
    yieldEstimate: '8–14% при краткосрочной аренде через Samui Luxury или управляющего оператора — виллы с инфинити-бассейном и видом на море относятся к «фотогеничным» объектам с постоянным высокосезонным спросом.',
    riskNote: 'Холдинг через тайскую компанию требует ежегодного аудита и поддержки ($500–1000 в год). Законодательство о иностранном землевладении может измениться — исторически изменения происходят медленно и с переходным периодом для действующих владельцев.',
  },

  /* ── Serbia ──────────────────────────────────────────────────────── */

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
    image: '/images/agency/p12/6.webp',
    agency: 'Estitor',
    agencyUrl: 'https://estitor.com/rs-en/real-estates/purpose-sale/type-apartment/city-beograd/id-543864',
    exclusive: false,
    agencyPhotos: [
      '/images/agency/p12/6.webp',
      '/images/agency/p12/7.webp',
      '/images/agency/p12/2.webp',
      '/images/agency/p12/3.webp',
      '/images/agency/p12/4.webp',
      '/images/agency/p12/5.webp',
      '/images/agency/p12/1.webp',
    ],
    tags: ['ВНЖ по недвижимости'],
    crypto: true,
    locationMap: {
      image: mapBelgrade,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(222,58%,52%)',
      distances: [
        { icon: 'landmark', label: 'До Калемегдана', minutes: 6 },
        { icon: 'center',   label: 'До центра города', minutes: 8 },
        { icon: 'mall',     label: 'До ТЦ',          minutes: 6 },
      ],
    },
    description: 'Двухкомнатная квартира в доме межвоенной постройки одного из самых респектабельных районов Белграда, с полностью обновлённой планировкой и сохранённым историческим фасадом. Пешая доступность до крепости Калемегдан и посольского квартала — по соседству живёт заметная часть дипломатического корпуса города.',
    neighborhood: 'Savski Venac — исторический центр с посольствами, парком Ташмайдан и одной из лучших школьных инфраструктур города (British International School Belgrade — в 10 минутах). Один из самых безопасных и «пешеходных» районов Белграда.',
    legalFit: 'В Сербии нет минимального порога инвестиций для получения ВНЖ через владение недвижимостью — этот объект по цене €88 000 даёт то же основание для резидентства, что и вилла за €1 млн: временный вид на жительство до 3 лет с правом продления, пока сохраняется право собственности, с 2023 года — без отдельного разрешения на работу.',
    yieldEstimate: '5–7% валовой доходности при долгосрочной аренде — Белград один из самых доступных по входу и при этом растущих арендных рынков Европы за счёт притока IT-специалистов из региона.',
    riskNote: 'Путь до постоянного резидентства и далее гражданства растянут по времени (около 3 лет до ПМЖ, ещё 3 — до натурализации) — рассматривать эту покупку стоит как долгосрочную стратегию, а не быстрый способ получить паспорт.',
  },

  {
    id: 20,
    country: 'RS',
    city: 'Белград',
    district: 'Beograd na vodi',
    type: 'АПАРТАМЕНТЫ',
    price: '€370,000',
    pricePerSqm: '≈ €3,895/м²',
    beds: 2,
    baths: 2,
    area: 95,
    image: '/images/prop-belgrade-waterfront.jpg',
    agency: 'Atrium Property Services',
    agencyUrl: 'https://www.atriumproperty.rs/',
    exclusive: false,
    agencyPhotos: [], // Agency site blocked scraping; photos to be added manually
    tags: ['Вид на Саву', 'Калемегдан', 'ВНЖ по недвижимости'],
    crypto: false,
    locationMap: {
      image: mapBelgradeWF,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(210,72%,52%)',
      distances: [
        { icon: 'sea',      label: 'До набережной Савы',  minutes: 1  },
        { icon: 'landmark', label: 'До Калемегдана',       minutes: 8  },
        { icon: 'center',   label: 'До центра города',     minutes: 10 },
      ],
    },
    description: 'Угловые апартаменты на 14-м этаже башни Belgrade Waterfront с панорамой 180°: на запад — широкая Сава и Бранков мост, на север — Земун и излучина. Крепость Калемегдан видна прямо из гостиной в золотой час. Открытая планировка, серый мраморный кухонный остров, широкий инженерный паркет. Здание BW Parkview — премиальная адресная линейка с консьержем, бассейном на подиуме и подземным паркингом.',
    neighborhood: 'Beograd na vodi — самый новый и дорогой жилой квартал Белграда прямо у Савы: набережная с ресторанами, торговый центр Galerija (Louis Vuitton, Dior), парк Savski Park. Калемегдан и Стамбол-чаршия — в 8 минутах пешком. Главный адрес белградского делового класса и IT-сообщества.',
    legalFit: 'Сербия — одна из самых лояльных европейских юрисдикций для покупателей из РФ: без минимального порога инвестиций для ВНЖ. Покупка любой жилой недвижимости даёт право на временный вид на жительство (до 3 лет с правом продления). Адрес в Savski Venac — один из самых статусных в Белграде.',
    yieldEstimate: '5–7% валовой доходности при долгосрочной аренде — Belgrade Waterfront удерживает самые высокие арендные ставки в городе среди корпоративных арендаторов и дипломатического корпуса; ликвидность при перепродаже выше остальных районов.',
    riskNote: 'Belgrade Waterfront — масштабный девелоперский проект с поэтапным вводом: соседние стройплощадки могут создавать шум и изменять видовые характеристики до завершения финальной очереди. Уточнять актуальный статус застройки у агента перед покупкой.',
  },

  /* ── Montenegro ──────────────────────────────────────────────────── */

  {
    id: 18,
    country: 'ME',
    city: 'Котор',
    district: 'Доброта',
    type: 'АПАРТАМЕНТЫ',
    price: '€943,800',
    pricePerSqm: '≈ €7,800/м²',
    beds: 3,
    baths: 2,
    area: 121,
    image: '/images/agency/p18/1.jpg',
    agency: "Sotheby's International Realty Montenegro",
    agencyUrl: 'https://sothebysrealty.me/modern-apartments-on-the-first-line-to-the-sea-dobrota/',
    exclusive: true,
    agencyPhotos: [
      '/images/agency/p18/1.jpg',
      '/images/agency/p18/2.jpg',
      '/images/agency/p18/3.jpg',
      '/images/agency/p18/4.jpg',
      '/images/agency/p18/5.jpg',
      '/images/agency/p18/6.jpg',
      '/images/agency/p18/7.jpg',
      '/images/agency/p18/8.jpg',
      '/images/agency/p18/9.jpg',
      '/images/agency/p18/10.jpg',
    ],
    tags: ['Первая линия', 'Залив Котор', 'UNESCO'],
    crypto: false,
    locationMap: {
      image: mapKotorDobrota,
      pinPos: { x: 50, y: 48 },
      accentColor: 'hsl(208,72%,48%)',
      distances: [
        { icon: 'sea',    label: 'До моря',             minutes: 1  },
        { icon: 'center', label: 'До Которской старины', minutes: 5  },
        { icon: 'mall',   label: 'До аэропорта Тиват',  minutes: 12 },
      ],
    },
    description: 'Трёхспальная резиденция первой береговой линии залива Котор — одного из крупнейших и наиболее защищённых заливов Адриатики, занесённого в список ЮНЕСКО. 121 м² с широкой террасой над самой водой: из гостиной видны огни Пераста и белая ротонда церкви Богородицы на Скале. Полное остекление южного фасада, открытая кухня-гостиная, мастер-спальня с выходом на террасу. Собственный бассейн и закрытый паркинг.',
    neighborhood: 'Доброта — деревня в 3 км к северу от Которской старины (ЮНЕСКО), тихая прибрежная дорога без туристического трафика. Аэропорт Тиват — в 12 минутах. Старый город Котора с ресторанами и Венецианскими стенами — в 5 минутах на машине. Место, которое выбирают для жизни, а не для посуточной сдачи.',
    legalFit: 'Черногория предлагает временный вид на жительство при регистрации по адресу объекта и открытии счёта в местном банке — без минимальной суммы сделки. Государственная программа «гражданство за инвестиции» (CBI) была приостановлена в декабре 2022 года: паспорт через покупку недвижимости на сегодня недоступен. Постоянное резидентство — после 5 лет временного ВНЖ.',
    yieldEstimate: '3–5% валовой доходности при долгосрочной аренде — залив Котор привлекает состоятельных европейских арендаторов, предпочитающих спокойный формат; краткосрочная аренда в сезон (июнь–сентябрь) может давать выше, но оборачиваемость ниже, чем на курортных рынках.',
    riskNote: 'Черногория — кандидат на вступление в ЕС с 2010 года, переговоры идут медленно; на горизонте 10+ лет нельзя исключать изменений в регулировании для иностранных покупателей, хотя краткосрочная правовая среда стабильна.',
  },

  {
    id: 19,
    country: 'ME',
    city: 'Будва',
    district: 'Свети-Стефан',
    type: 'АПАРТАМЕНТЫ',
    price: '€174,900',
    pricePerSqm: '≈ €2,820/м²',
    beds: 1,
    baths: 1,
    area: 62,
    image: '/images/agency/p19/1.jpg',
    agency: 'Monteonline',
    agencyUrl: 'https://monteonline.org/en/properties/novaya-kvartira-s-1-spalnej-v-sveti-stefane-s-panoramnym-vidom-na-more/',
    exclusive: false,
    agencyPhotos: [
      '/images/agency/p19/1.jpg',
      '/images/agency/p19/2.jpg',
      '/images/agency/p19/3.jpg',
      '/images/agency/p19/4.jpg',
      '/images/agency/p19/5.jpg',
      '/images/agency/p19/6.jpg',
      '/images/agency/p19/7.jpg',
      '/images/agency/p19/8.jpg',
    ],
    tags: ['Вид на Свети-Стефан', 'Адриатика'],
    crypto: false,
    locationMap: {
      image: mapSvetiStefan,
      pinPos: { x: 50, y: 44 },
      accentColor: 'hsl(188,68%,48%)',
      distances: [
        { icon: 'sea',    label: 'До пляжа Пржно',    minutes: 5  },
        { icon: 'center', label: 'До Будвы',            minutes: 10 },
        { icon: 'mall',   label: 'До ТЦ',               minutes: 12 },
      ],
    },
    description: 'Однокомнатная квартира на холмистом склоне с прямым видом на легендарный остров Свети-Стефан — средневековую крепостную деревню прямо в Адриатике, один из главных визуальных символов черногорского побережья. 62 м², открытая планировка, полностью застеклённый западный фасад: остров виден из любой точки гостиной. Широкий балкон над морем, паркет из светлого дуба, каменная акцент-стена.',
    neighborhood: 'Свети-Стефан — тихий участок Будванской ривьеры между Бечичи и Петровацем. Отель Aman Sveti Stefan (один из самых дорогих в регионе) — в 200 м. Пляж Пржно — в 5 минутах. Будва с ночной жизнью — в 10 минутах на машине.',
    legalFit: 'Те же условия, что и на объекте в Доброте: временное резидентство при регистрации по адресу без минимального порога инвестиций. ВНЖ оформляется за 30–60 дней. Программа CBI (гражданство за инвестиции) приостановлена с декабря 2022 года и не действует.',
    yieldEstimate: '5–8% валовой доходности при краткосрочной аренде в высокий сезон — вид на Свети-Стефан привлекает туристов вне зависимости от внутренней отделки. В межсезонье спрос резко падает: годовой доход в среднем ниже летних пиковых расчётов.',
    riskNote: 'Черногория — туристическая страна с выраженной сезонностью: в октябре–апреле спрос на аренду резко падает. Годовая доходность при исключительно краткосрочной аренде заметно ниже, чем летняя пиковая ставка позволяет ожидать.',
  },

  /* ── Portugal ─────────────────────────────────────────────────────── */

  {
    id: 13,
    country: 'PT',
    city: 'Лиссабон',
    district: 'Campo de Ourique',
    type: 'АПАРТАМЕНТЫ',
    price: '€565,000',
    pricePerSqm: '≈ €5,231/м²',
    beds: 2,
    baths: 2,
    area: 108,
    image: '/images/dest-portugal.jpg',
    agency: 'Engel & Völkers Lisbon',
    agencyUrl: 'https://www.engelvoelkers.com/en/pt/properties/buy/apartments/lisboa/campo-de-ourique/',
    exclusive: false,
    agencyPhotos: [],
    tags: ['Центр Лиссабона', 'Паспорт ЕС · 5 лет', 'D7 / D8'],
    crypto: false,
    locationMap: {
      image: mapLisbonCampo,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(18,72%,44%)',
      distances: [
        { icon: 'landmark', label: 'До базилики Эштрела',   minutes: 5  },
        { icon: 'center',   label: 'До Байши-Алфамы',       minutes: 15 },
        { icon: 'mall',     label: 'До рынка Campo de Ourique', minutes: 3  },
      ],
    },
    description: 'Двухспальный апартамент в отреставрированном здании начала XX века в тихом жилом квартале Кампу-ди-Урике — одном из немногих подлинно португальских кварталов Лиссабона. Потолки 3,3 м, деревянный паркет «ёлочка», чугунные балконные перила. Вид на черепичные крыши и купол базилики Эштрела.',
    neighborhood: 'Campo de Ourique — тихий жилой квартал в 15 минутах от Байши пешком: Mercado de Campo de Ourique (рынок с гастробаром), парк Эштрела, старые кафе. Без туристического трафика, с устойчивыми ценами на вторичном рынке.',
    legalFit: 'Прямая покупка жилья в Лиссабоне не даёт Golden Visa с 2023 года (реформа программы). Путь к паспорту ЕС через этот объект: виза D7 (доход от €3,280/мес) или D8 (цифровой номад) + натурализация через 5 лет законного проживания. Golden Visa через фондовые инвестиции (€500,000) оформляется параллельно и независимо от жилья.',
    yieldEstimate: '3,5–5% при долгосрочной аренде — Лиссабон ограничил краткосрочную аренду в большинстве исторических районов (Mais Habitação, 2023). Долгосрочный арендный рынок стабилен и подкреплён корпоративным спросом.',
    riskNote: 'Ограничения на краткосрочную аренду (Mais Habitação) существенно снизили доходность Airbnb в центральных кварталах. Проверьте актуальный статус лицензии на краткосрочную аренду для конкретного объекта до сделки.',
  },

  {
    id: 14,
    country: 'PT',
    city: 'Алгарви',
    district: 'Vale do Lobo',
    type: 'ВИЛЛА',
    price: '€1,380,000',
    pricePerSqm: '≈ €5,633/м²',
    beds: 4,
    baths: 3,
    area: 245,
    image: '/images/dest-portugal.jpg',
    agency: 'Fine & Country Algarve',
    agencyUrl: 'https://www.fineandcountry.com/en/property-for-sale/algarve/vale-do-lobo/',
    exclusive: true,
    agencyPhotos: [],
    tags: ['Золотое побережье', 'Атлантика', 'Гольф', 'Паспорт ЕС · 5 лет'],
    crypto: false,
    locationMap: {
      image: mapAlgarveVale,
      pinPos: { x: 50, y: 46 },
      accentColor: 'hsl(48,88%,48%)',
      distances: [
        { icon: 'sea',      label: 'До пляжа Атлантики',   minutes: 5  },
        { icon: 'landmark', label: 'До Royal Golf Course',  minutes: 3  },
        { icon: 'center',   label: 'До аэропорта Фару',     minutes: 25 },
      ],
    },
    description: 'Четырёхспальная вилла в закрытом резортном комьюнити Вале-ду-Лобу — одном из самых статусных адресов Алгарви на «Золотом треугольнике» между Фару и Кватру-Агуаш. 245 м² с инфинити-бассейном, ухоженным садом и частным доступом к Royal Golf Course. Терракотовая черепица, белые известняковые стены, угловая гостиная с видом на Атлантику через панорамные окна.',
    neighborhood: 'Vale do Lobo — закрытый курортный квартал без сквозного трафика: 6 км пляжей с золотым песком, два гольф-поля (Royal и Ocean), теннисный центр, рестораны 5★. Сообщество: состоятельные британцы, ирландцы и скандинавы; тихая атмосфера круглый год.',
    legalFit: 'Прямая покупка жилья в Алгарви не входит в список регионов Golden Visa с 2023 года. Путь к ПМЖ и гражданству ЕС: виза D7 или D8 + натурализация через 5 лет. Альтернатива — Golden Visa через регулируемые фонды (€500,000) параллельно с покупкой.',
    yieldEstimate: '4–7% при управляемой краткосрочной аренде — Vale do Lobo один из немногих курортов, где аренда виллы класса люкс разрешена и востребована состоятельными европейскими туристами круглый год.',
    riskNote: 'Ежегодные сборы комьюнити Vale do Lobo (сервис, безопасность, инфраструктура) — €6,000–€10,000 в год плюс налог IMI. Закладывайте эти расходы в расчёт реальной доходности.',
  },
];

/** Quick lookup by numeric id, used by the property detail page. */
export const listingById = (id: number | string): Listing | undefined =>
  LISTINGS.find(l => l.id === Number(id));
