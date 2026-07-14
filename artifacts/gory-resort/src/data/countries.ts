import mapUae from '@assets/generated_images/terrain-map-uae.png';
import mapTurkey from '@assets/generated_images/terrain-map-turkey.png';
import mapCyprus from '@assets/generated_images/terrain-map-cyprus.png';
import mapGeorgia from '@assets/generated_images/terrain-map-georgia.png';
import mapThailand from '@assets/generated_images/terrain-map-thailand.png';
import mapPortugal from '@assets/generated_images/terrain-map-portugal.png';
import mapSerbia from '@assets/generated_images/terrain-map-serbia.png';

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
  mapImage:       string;   // isometric 3D map chunk (transparent PNG)
  tagline:        string;   // one-line hero sub-heading
  stats:          CountryStat[];
  features:       CountryFeature[];
  markets:        CountryMarket[];
  visa:           string;   // short residency/visa note
  taxNote:        string;   // short tax note
}

export const COUNTRIES: CountryData[] = [
  {
    code: 'ae', listingCode: 'AE', flag: '',
    nameRu: 'ОАЭ', nameEn: 'UAE',
    capital: 'Дубай',
    currency: 'USD / AED',
    entryPrice: 'от $380 000',
    mapImage: mapUae,
    tagline: 'Абсолютная защита капитала. Нулевые налоги и прозрачный KYC.',
    stats: [
      { value: '0%',    label: 'налог на доход и капитал' },
      { value: '10 лет', label: 'срок Золотой визы' },
      { value: '8–11%', label: 'валютная доходность' },
    ],
    features: [
      {
        title: 'Защита активов',
        body:  'Полная конфиденциальность, отсутствие обмена финансовой информацией. Безопасные банковские переводы (AML) и оплата криптоактивами.',
      },
      {
        title: 'Инфраструктура для семьи',
        body:  'Нулевой уровень преступности. Лучшие британские и IB школы (GEMS, Repton). Современная медицина и абсолютная безопасность для детей.',
      },
      {
        title: 'ВНЖ инвестора (Golden Visa)',
        body:  'При покупке от $545 000 — резидентство на 10 лет для всей семьи и родителей. Понятная процедура комплаенса без скрытых комиссий.',
      },
    ],
    markets: [
      { city: 'Dubai Hills',   priceFrom: '$950 000',   highlight: 'Закрытое комьюнити, гольф-поля, топовые школы рядом' },
      { city: 'Dubai Marina',  priceFrom: '$368 000',   highlight: 'Высокая ликвидность, быстрая сдача в аренду (ROI 8%)' },
      { city: 'Palm Jumeirah', priceFrom: '$2 400 000', highlight: 'Ультра-премиум сегмент, частные пляжи, защита от инфляции' },
      { city: 'Business Bay',  priceFrom: '$695 000',   highlight: 'Деловой центр, возможность крипто-оплаты застройщику' },
    ],
    visa:    'Виза резидента от $205 000 (2 года). Золотая виза от $545 000 (10 лет). Весь процесс оформления ВНЖ берет на себя наш Legal-департамент.',
    taxNote: 'НДС 5% при покупке. 0% на прирост капитала, дивиденды, аренду и крипто-доходы. DLD сбор — 4%.',
  },
  {
    code: 'tr', listingCode: 'TR', flag: '',
    nameRu: 'Турция', nameEn: 'Turkey',
    capital: 'Стамбул',
    currency: 'USD / TRY',
    entryPrice: 'от $150 000',
    mapImage: mapTurkey,
    tagline: 'Гражданство за инвестиции без потери первого паспорта.',
    stats: [
      { value: '$400K',  label: 'паспорт за 4 месяца' },
      { value: '150+',   label: 'стран безвизового въезда' },
      { value: '4%',     label: 'налог на покупку (TAPU)' },
    ],
    features: [
      {
        title: 'Второе гражданство',
        body:  'Турецкий паспорт за покупку от $400 000. Отличный "запасной аэродром". Инвестицию можно вернуть через 3 года, продав объект.',
      },
      {
        title: 'Развитый экспат-хаб',
        body:  'Международные школы в Стамбуле (MEF, BISI) и Анталии. Сильное комьюнити, европейский стиль жизни, передовая платная медицина.',
      },
      {
        title: 'Гибкие расчеты',
        body:  'Оплата зарубежными картами или криптовалютой (USDT). Проводим сделки под ключ, включая получение сертификата соответствия (Uygunluk).',
      },
    ],
    markets: [
      { city: 'Стамбул · Beşiktaş', priceFrom: '$450 000', highlight: 'Бизнес-центр, элитные школы, ликвидность для ВНЖ' },
      { city: 'Анталья · Konyaaltı',priceFrom: '$280 000', highlight: 'Семейный район, русскоязычные сады, ПМЖ' },
      { city: 'Бодрум',             priceFrom: '$650 000', highlight: 'Премиум-сегмент, виллы у Эгейского моря, приватность' },
    ],
    visa:    'ВНЖ по ТАПУ от $200 000. Гражданство от $400 000 (оформляется за 4-6 месяцев на всю семью).',
    taxNote: 'Налог на покупку 4% (TAPU). В Стамбуле НДС 1% (для квартир до 150м2). Отсутствуют санкционные ограничения на ввод капитала.',
  },
  {
    code: 'cy', listingCode: 'CY', flag: '',
    nameRu: 'Кипр', nameEn: 'Cyprus',
    capital: 'Лимасол',
    currency: 'EUR',
    entryPrice: 'от €250 000',
    mapImage: mapCyprus,
    tagline: 'Безопасная европейская гавань. Британское право и IT-комьюнити.',
    stats: [
      { value: '12.5%', label: 'корпоративный налог' },
      { value: '0%',    label: 'налог на дивиденды (Non-Dom)' },
      { value: '€300K', label: 'ПМЖ за инвестиции' },
    ],
    features: [
      {
        title: 'Легализация капитала в ЕС',
        body:  'Прозрачный compliance. Помогаем перевести средства через надежные юрисдикции. Кипр работает по системе британского права (Common Law).',
      },
      {
        title: 'Налоговый рай для IT (Non-Dom)',
        body:  'Статус Non-Domicile освобождает от налога на дивиденды и проценты на 17 лет. Идеально для фаундеров и цифровых кочевников.',
      },
      {
        title: 'Безопасность и английское образование',
        body:  'Нулевой уровень уличной преступности. Огромный выбор британских школ (Foley’s, Heritage). Крупнейшее русскоязычное IT-сообщество в ЕС.',
      },
    ],
    markets: [
      { city: 'Лимасол · Germasogeia', priceFrom: '€480 000', highlight: 'IT-столица, частные школы, высокая ликвидность' },
      { city: 'Пафос',                 priceFrom: '€320 000', highlight: 'Семейные виллы, тихое побережье, английские комьюнити' },
      { city: 'Ларнака',               priceFrom: '€250 000', highlight: 'Быстрорастущий рынок, рядом с международным аэропортом' },
    ],
    visa:    'Пожизненный ПМЖ (Fast-Track) при покупке первички от €300,000 + НДС. Статус распространяется на детей до 25 лет.',
    taxNote: 'НДС 5% на первую недвижимость для личного проживания (вместо 19%). Налог на перевод прав (Transfer Fee) — 0% на первичку.',
  },
  {
    code: 'ge', listingCode: 'GE', flag: '',
    nameRu: 'Грузия', nameEn: 'Georgia',
    capital: 'Тбилиси',
    currency: 'USD / GEL',
    entryPrice: 'от $65 000',
    mapImage: mapGeorgia,
    tagline: 'Быстрые инвестиции. Территориальная система налогов.',
    stats: [
      { value: '1%',     label: 'налог для малого бизнеса' },
      { value: '10–12%', label: 'ROI на аренде' },
      { value: '$100K',  label: 'порог для ВНЖ' },
    ],
    features: [
      {
        title: 'Простота транзакций',
        body:  'Полное отсутствие валютного контроля. Возможна прямая оплата в криптовалюте. Оформление сделки в Доме Юстиции занимает всего 1 день.',
      },
      {
        title: 'Налоговая оптимизация',
        body:  'Территориальная система: доходы из-за рубежа не облагаются налогом. Статус индивидуального предпринимателя со ставкой всего 1%.',
      },
      {
        title: 'Удаленная работа и комфорт',
        body:  'Безвизовый въезд на 365 дней. Много частных школ и коворкингов в Тбилиси. Низкая стоимость жизни при европейском сервисе.',
      },
    ],
    markets: [
      { city: 'Тбилиси · Ваке',     priceFrom: '$160 000', highlight: 'Премиум-район, парки, лучшие школы, экспат-среда' },
      { city: 'Тбилиси · Сабуртало',priceFrom: '$90 000',  highlight: 'Бизнес-инфраструктура, высокий спрос на долгосрок' },
      { city: 'Батуми · Бульвар',   priceFrom: '$65 000',  highlight: 'Спекулятивный рост, управление отельными операторами (10%+ ROI)' },
    ],
    visa:    'ВНЖ инвестора от $100,000. ВНЖ через регистрацию ИП (оборот от 50,000 GEL). Безвиз 365 дней для граждан РФ.',
    taxNote: 'Налог на прибыль при перепродаже — 5%. Налог от сдачи в аренду — 5% (как физлицо). 0% налог на зарубежные доходы.',
  },
  {
    code: 'th', listingCode: 'TH', flag: '',
    nameRu: 'Таиланд', nameEn: 'Thailand',
    capital: 'Бангкок',
    currency: 'USD / THB',
    entryPrice: 'от $110 000',
    mapImage: mapThailand,
    tagline: 'Доход в твердой валюте. Независимая экономическая зона.',
    stats: [
      { value: '7–10%',  label: 'гарантированный доход' },
      { value: '5-20 лет',label: 'срок Elite Visa' },
      { value: '0%',     label: 'налог на крипто-покупки' },
    ],
    features: [
      {
        title: 'Надежное право собственности',
        body:  'Оформление во Freehold (полная собственность) для иностранцев по квоте 49%. Абсолютно нейтральная юрисдикция вне санкционных списков.',
      },
      {
        title: 'Удаленное управление активами',
        body:  'Покупка квартир под управлением 5* отельных брендов (Banyan Tree, Wyndham). Стабильные выплаты на зарубежные счета.',
      },
      {
        title: 'Идеально для зимовки и детей',
        body:  'Широкий выбор первоклассных международных школ на Пхукете (UWC, BISP). Передовая медицина (Bangkok Hospital). Высший уровень безопасности.',
      },
    ],
    markets: [
      { city: 'Пхукет · Bang Tao', priceFrom: '$180 000', highlight: 'Семейная зона, район Лагуна, близость к топовым школам' },
      { city: 'Пхукет · Kamala',   priceFrom: '$220 000', highlight: 'Элитный сектор, отели 5 звезд, премиум-инфраструктура' },
      { city: 'Самуи',             priceFrom: '$350 000', highlight: 'Приватные виллы, тихое побережье, отсутствие многоэтажек' },
    ],
    visa:    'Thailand Privilege Visa (бывш. Elite) на 5-20 лет от $25,000. LTR Visa для состоятельных инвесторов на 10 лет.',
    taxNote: 'Налог при покупке (Transfer Fee) около 1-2%. Отсутствует ежегодный налог на недвижимость для базовых объектов.',
  },
  {
    code: 'pt', listingCode: 'PT', flag: '',
    nameRu: 'Португалия', nameEn: 'Portugal',
    capital: 'Лиссабон',
    currency: 'EUR',
    entryPrice: 'от €400 000',
    mapImage: mapPortugal,
    tagline: 'Атлантическая безопасность. Паспорт ЕС через 5 лет.',
    stats: [
      { value: '5 лет',   label: 'путь до паспорта ЕС' },
      { value: '€500K', label: 'ВНЖ через инвестфонды' },
      { value: 'Топ-7', label: 'в индексе безопасности мира' },
    ],
    features: [
      {
        title: 'Фондовый Golden Visa',
        body:  'Инвестиции от €500,000 в регулируемые паевые фонды. Надежный compliance, сохранение капитала в европейских евро-активах без забот о недвижимости.',
      },
      {
        title: 'Высший стандарт жизни',
        body:  'Португалия стабильно входит в Топ-10 самых безопасных стран мира. Качественные международные школы (Carlucci, St. Julian’s) и мягкий климат.',
      },
      {
        title: 'Виза D8 для номадов',
        body:  'Один из лучших режимов в ЕС для удаленщиков (требуется доход от €3,280 в месяц). Путь к гражданству без необходимости инвестировать полмиллиона.',
      },
    ],
    markets: [
      { city: 'Лиссабон',               priceFrom: '€450 000', highlight: 'Европейская стартап-столица, максимальная ликвидность' },
      { city: 'Кашкайш (Лиссабонская Ривьера)', priceFrom: '€850 000', highlight: 'Резиденции премиум-класса, британские школы' },
      { city: 'Алгарве',                priceFrom: '€600 000', highlight: 'Курортный юг, виллы у океана, гольф-поля' },
    ],
    visa:    'Golden Visa (через фонды €500K), виза цифрового кочевника D8, виза рантье D7. Гражданство ЕС через 5 лет владения ВНЖ.',
    taxNote: 'IMT (налог на передачу) до 7.5%, Гербовый сбор 0.8%. Тщательный банковский AML-контроль при вводе средств.',
  },
  {
    code: 'rs', listingCode: 'RS', flag: '',
    nameRu: 'Сербия', nameEn: 'Serbia',
    capital: 'Белград',
    currency: 'EUR / RSD',
    entryPrice: 'от €95 000',
    mapImage: mapSerbia,
    tagline: 'Быстрый ВНЖ в центре Европы. Легкий перевод капитала.',
    stats: [
      { value: '15%',   label: 'подоходный налог (flat)' },
      { value: '1 месяц',label: 'срок получения ВНЖ' },
      { value: '0',     label: 'санкционных барьеров' },
    ],
    features: [
      {
        title: 'Легкий ВНЖ за недвижимость',
        body:  'Отсутствует минимальный порог инвестиций. Покупка квартиры любой стоимости гарантирует ВНЖ для вас и вашей семьи за 30 дней.',
      },
      {
        title: 'Свободное движение денег',
        body:  'Сербские банки лояльно относятся к переводам из РФ. Возможно открытие корпоративных и личных счетов, функционирует система Swift.',
      },
      {
        title: 'Европейская инфраструктура',
        body:  'Белград быстро становится IT-столицей Балкан. Отличные частные школы (Prima, BIS), безопасность и понятный менталитет.',
      },
    ],
    markets: [
      { city: 'Белград · Врачар',       priceFrom: '€160 000', highlight: 'Исторический премиум-центр, посольства, безопасность' },
      { city: 'Белград · Нови Београд', priceFrom: '€120 000', highlight: 'Бизнес-хаб, современные ЖК, стабильная аренда' },
      { city: 'Нови-Сад',              priceFrom: '€95 000',  highlight: 'Айти-кластер, зеленые зоны, спокойная семейная жизнь' },
    ],
    visa:    'ВНЖ за покупку любой жилой недвижимости. ВНЖ по открытию юрлица или ИП. Паспорт возможен через 3 года проживания.',
    taxNote: 'Налог при покупке (вторичка) — 2.5%, первичка (НДС) — 10%. Налог на дивиденды — 15%. Упрощенная система для ИП.',
  },
];

/** Quick lookup by URL code (lowercase) */
export const countryByCode = (code: string): CountryData | undefined =>
  COUNTRIES.find(c => c.code === code.toLowerCase());

/** Quick lookup by listing code (uppercase, e.g. "AE") */
export const countryByListingCode = (lc: string): CountryData | undefined =>
  COUNTRIES.find(c => c.listingCode === lc.toUpperCase());