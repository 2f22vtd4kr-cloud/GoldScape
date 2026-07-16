import type { LocationMap } from '@/components/PropertyLocationMap';

import mapBelgrade     from '@assets/generated_images/listing-map-belgrade-savski-venac.png';
import mapKotorDobrota from '@assets/generated_images/listing-map-kotor-dobrota.png';
import mapSvetiStefan  from '@assets/generated_images/listing-map-sveti-stefan.png';
import mapBelgradeWF   from '@assets/generated_images/listing-map-belgrade-waterfront.png';

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
    agency: 'Estitor',
    agencyUrl: 'https://estitor.com/rs-en/real-estates/purpose-sale/type-apartment/city-beograd/id-543864',
    exclusive: false,
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

  /* ── Montenegro ──────────────────────────────────────────────── */
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
    image: '/images/prop-kotor.jpg',
    agency: "Sotheby's International Realty Montenegro",
    agencyUrl: 'https://sothebysrealty.me/modern-apartments-on-the-first-line-to-the-sea-dobrota/',
    exclusive: true,
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
    image: '/images/prop-sveti-stefan.jpg',
    agency: 'Monteonline',
    agencyUrl: 'https://monteonline.org/en/properties/novaya-kvartira-s-1-spalnej-v-sveti-stefane-s-panoramnym-vidom-na-more/',
    exclusive: false,
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
];

/** Quick lookup by numeric id, used by the property detail page. */
export const listingById = (id: number | string): Listing | undefined =>
  LISTINGS.find(l => l.id === Number(id));
