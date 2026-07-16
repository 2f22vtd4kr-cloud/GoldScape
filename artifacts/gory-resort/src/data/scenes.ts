/**
 * scenes.ts
 *
 * Scene image sets for each property listing.
 * 
 * Architecture:
 * - Each entry is keyed by listing id
 * - Scenes are ordered: architecture (exterior → section → floorplan) → life → bizarre
 * - The site/location map is injected dynamically from listing.locationMap.image in PropertyDetail
 * - Images live in /images/scenes/{slug}.jpg (public folder)
 * 
 * Consistency principle ("property DNA"):
 *   All scenes for a given listing were generated with the same DNA string describing the property's
 *   architecture, materials, palette, and distinctive features — ensuring visual coherence across
 *   exterior, cross-section, life, and bizarre images.
 */
import type { PropertyScene } from '@/components/PropertyScenesCarousel';

type SceneMap = Record<number, PropertyScene[]>;

export const PROPERTY_SCENES: SceneMap = {
  /* ── 1 · Palm Jumeirah, Dubai ──────────────────────────────────── */
  1: [
    { id: 'p1-exterior',  type: 'exterior',      category: 'architecture', label: 'Экстерьер',           sublabel: 'Башня на Пальме',          image: '/images/scenes/p1-exterior.jpg'  },
    { id: 'p1-section',   type: 'section',       category: 'architecture', label: 'Разрез',              sublabel: 'Горизонтальный срез, эт. 18', image: '/images/scenes/p1-section.jpg'   },
    { id: 'p1-floorplan', type: 'floorplan',     category: 'architecture', label: 'Планировка',          sublabel: 'Этаж 18',                  image: '/images/scenes/p1-floorplan.jpg' },
    { id: 'p1-bbq',       type: 'life_bbq',      category: 'life',         label: 'Барбекю на террасе',  sublabel: 'Вечер, залив внизу',       image: '/images/scenes/p1-bbq.jpg'      },
    { id: 'p1-matchday',  type: 'life_matchday', category: 'life',         label: 'Матч-день',           sublabel: 'Champions League, весь дом', image: '/images/scenes/p1-matchday.jpg' },
    { id: 'p1-bizarre',   type: 'bizarre',       category: 'bizarre',      label: 'Ocean\'s Eleven',     sublabel: 'Планирование операции',     image: '/images/scenes/p1-bizarre.jpg'  },
  ],

  /* ── 2 · Dubai Marina Studio ────────────────────────────────────── */
  // DNA: Modern studio · Dubai Marina canal view · 52m² · polished concrete · full-wall west-facing glass · glass highrise tower · silver and canal-blue palette
  2: [
    { id: 'p2-exterior',  type: 'exterior',   category: 'architecture', label: 'Экстерьер',        sublabel: 'Башня у канала',        image: '/images/scenes/p2-exterior.jpg'  },
    { id: 'p2-section',   type: 'section',    category: 'architecture', label: 'Разрез',           sublabel: 'Студия, планировка',    image: '/images/scenes/p2-section.jpg'   },
    { id: 'p2-floorplan', type: 'floorplan',  category: 'architecture', label: 'Планировка',       sublabel: '52 м², без коридоров',  image: '/images/scenes/p2-floorplan.jpg' },
    { id: 'p2-party',     type: 'life_party', category: 'life',         label: 'Вечеринка',        sublabel: 'Ночь, вся студия',      image: '/images/scenes/p2-party.jpg'     },
    { id: 'p2-bizarre',   type: 'bizarre',    category: 'bizarre',      label: 'Волк с Марины',    sublabel: 'Дирхамы и речь',        image: '/images/scenes/p2-bizarre.jpg'   },
  ],

  /* ── 3 · Downtown Dubai Penthouse ───────────────────────────────── */
  // DNA: Luxury duplex penthouse · Downtown Dubai · 4 BR · 580m² · Calacatta marble · full-height glass facing Burj Khalifa · warm ivory and gold palette
  3: [
    { id: 'p3-exterior',  type: 'exterior',      category: 'architecture', label: 'Экстерьер',        sublabel: 'Вид Burj Khalifa',        image: '/images/scenes/p3-exterior.jpg'  },
    { id: 'p3-section',   type: 'section',       category: 'architecture', label: 'Разрез дуплекса',  sublabel: 'Оба этажа',               image: '/images/scenes/p3-section.jpg'   },
    { id: 'p3-floorplan', type: 'floorplan',     category: 'architecture', label: 'Планировка',       sublabel: 'Два уровня, 580 м²',      image: '/images/scenes/p3-floorplan.jpg' },
    { id: 'p3-bbq',       type: 'life_bbq',      category: 'life',         label: 'Ужин на террасе',  sublabel: 'Burj Khalifa в огнях',    image: '/images/scenes/p3-bbq.jpg'       },
    { id: 'p3-matchday',  type: 'life_matchday', category: 'life',         label: 'Финал ЛЧ',         sublabel: 'Весь дуплекс в деле',     image: '/images/scenes/p3-matchday.jpg'  },
  ],

  /* ── 4 · Arabian Ranches Villa ──────────────────────────────────── */
  // DNA: Detached family villa · Arabian Ranches Dubai · 4 BR · 420m² · beige stone tile · white stucco · French doors to pool and garden · Spanish-colonial style · terracotta palette
  4: [
    { id: 'p4-exterior',  type: 'exterior',  category: 'architecture', label: 'Экстерьер',        sublabel: 'Вилла и сад',           image: '/images/scenes/p4-exterior.jpg'  },
    { id: 'p4-section',   type: 'section',   category: 'architecture', label: 'Разрез',           sublabel: 'Два этажа, бассейн',    image: '/images/scenes/p4-section.jpg'   },
    { id: 'p4-floorplan', type: 'floorplan', category: 'architecture', label: 'Планировка',       sublabel: 'Вилла, 420 м²',         image: '/images/scenes/p4-floorplan.jpg' },
    { id: 'p4-bbq',       type: 'life_bbq',  category: 'life',         label: 'Барбекю в саду',   sublabel: 'Семейная суббота',       image: '/images/scenes/p4-bbq.jpg'       },
    { id: 'p4-bizarre',   type: 'bizarre',   category: 'bizarre',      label: 'Тигр в бассейне',  sublabel: 'The Hangover, Dubai',   image: '/images/scenes/p4-bizarre.jpg'   },
  ],

  /* ── 5 · Istanbul Beşiktaş ──────────────────────────────────────── */
  // DNA: Historic restored apartment · Istanbul Besiktas · 2 BR · 95m² · 3.1m ceilings · herringbone oak parquet · white plaster · tall French windows · Ottoman-era stone building · Bosphorus glimpses
  5: [
    { id: 'p5-exterior',  type: 'exterior',    category: 'architecture', label: 'Экстерьер',        sublabel: 'Исторический фасад',      image: '/images/scenes/p5-exterior.jpg'  },
    { id: 'p5-section',   type: 'section',     category: 'architecture', label: 'Разрез',           sublabel: 'Высокие потолки, 3.1м',   image: '/images/scenes/p5-section.jpg'   },
    { id: 'p5-floorplan', type: 'floorplan',   category: 'architecture', label: 'Планировка',       sublabel: '95 м², Beşiktaş',         image: '/images/scenes/p5-floorplan.jpg' },
    { id: 'p5-family',    type: 'life_family', category: 'life',         label: 'Семейное утро',    sublabel: 'Воскресный завтрак',      image: '/images/scenes/p5-family.jpg'    },
    { id: 'p5-bizarre',   type: 'bizarre',     category: 'bizarre',      label: 'Базар ковров',     sublabel: 'Прямо в гостиной',        image: '/images/scenes/p5-bizarre.jpg'   },
  ],

  /* ── 6 · Antalya Lara Beach ─────────────────────────────────────── */
  // DNA: Mediterranean villa · Antalya Lara Beach · 3 BR · 220m² · stone tile floors · white render · sliding glass to pool terrace · private pool · cypress trees · Aegean turquoise and terracotta palette
  6: [
    { id: 'p6-exterior',  type: 'exterior',  category: 'architecture', label: 'Экстерьер',            sublabel: 'Вилла у моря',          image: '/images/scenes/p6-exterior.jpg'  },
    { id: 'p6-section',   type: 'section',   category: 'architecture', label: 'Разрез',               sublabel: 'Вилла, бассейн, сад',   image: '/images/scenes/p6-section.jpg'   },
    { id: 'p6-floorplan', type: 'floorplan', category: 'architecture', label: 'Планировка',           sublabel: '220 м², Lara Beach',    image: '/images/scenes/p6-floorplan.jpg' },
    { id: 'p6-bbq',       type: 'life_bbq',  category: 'life',         label: 'Вечеринка у бассейна', sublabel: 'Закат, 8 гостей',       image: '/images/scenes/p6-bbq.jpg'       },
    { id: 'p6-bizarre',   type: 'bizarre',   category: 'bizarre',      label: 'Прилетел на вертолёте', sublabel: 'Прямо в бассейн',      image: '/images/scenes/p6-bizarre.jpg'   },
  ],

  /* ── 7 · Limassol Germasogeia ───────────────────────────────────── */
  // DNA: Modern IT-district apartment · Limassol Germasogeia Cyprus · 2 BR · 100m² · light oak floors · white smooth render · panoramic south-facing Mediterranean sea view · contemporary complex · sea-blue palette
  7: [
    { id: 'p7-exterior',  type: 'exterior',  category: 'architecture', label: 'Экстерьер',        sublabel: 'Кипрский фасад',            image: '/images/scenes/p7-exterior.jpg'  },
    { id: 'p7-section',   type: 'section',   category: 'architecture', label: 'Разрез',           sublabel: 'Вид на море, балкон',       image: '/images/scenes/p7-section.jpg'   },
    { id: 'p7-floorplan', type: 'floorplan', category: 'architecture', label: 'Планировка',       sublabel: '100 м², Germasogeia',       image: '/images/scenes/p7-floorplan.jpg' },
    { id: 'p7-life',      type: 'life_bbq',  category: 'life',         label: 'Удалённая работа', sublabel: 'IT-команда с видом на море', image: '/images/scenes/p7-life.jpg'      },
    { id: 'p7-bizarre',   type: 'bizarre',   category: 'bizarre',      label: 'Non-Dom ритуал',   sublabel: 'Налоговые консультанты',    image: '/images/scenes/p7-bizarre.jpg'   },
  ],

  /* ── 8 · Paphos Koloni ──────────────────────────────────────────── */
  // DNA: Secluded villa compound · Paphos Koloni Cyprus · 3 BR + guesthouse · 240m² · travertine tile · white render + stone accents · heated pool · enclosed garden · travertine cream and olive green palette
  8: [
    { id: 'p8-exterior',  type: 'exterior',    category: 'architecture', label: 'Экстерьер',            sublabel: 'Вилла и сад, Пафос',      image: '/images/scenes/p8-exterior.jpg'  },
    { id: 'p8-section',   type: 'section',     category: 'architecture', label: 'Разрез',               sublabel: 'Вилла + гостевой домик',  image: '/images/scenes/p8-section.jpg'   },
    { id: 'p8-floorplan', type: 'floorplan',   category: 'architecture', label: 'Планировка',           sublabel: 'Участок, 240 м², Пафос',  image: '/images/scenes/p8-floorplan.jpg' },
    { id: 'p8-family',    type: 'life_family', category: 'life',         label: 'Семейный день',        sublabel: 'Дети у бассейна, Пафос',  image: '/images/scenes/p8-family.jpg'    },
    { id: 'p8-bizarre',   type: 'bizarre',     category: 'bizarre',      label: 'Сократ в гостевом домике', sublabel: 'Занятия философией', image: '/images/scenes/p8-bizarre.jpg'   },
  ],

  /* ── 9 · Batumi Seafront ────────────────────────────────────────── */
  // DNA: Resort highrise apartment · Batumi Black Sea seafront Georgia · 2 BR · 72m² · beige porcelain tile · white walls · full-height balcony glass facing Black Sea · sleek glass tower · White and sea-blue palette
  9: [
    { id: 'p9-exterior',  type: 'exterior',   category: 'architecture', label: 'Экстерьер',        sublabel: 'Высотка у Чёрного моря', image: '/images/scenes/p9-exterior.jpg'  },
    { id: 'p9-section',   type: 'section',    category: 'architecture', label: 'Разрез',           sublabel: 'Балкон, вид на море',    image: '/images/scenes/p9-section.jpg'   },
    { id: 'p9-floorplan', type: 'floorplan',  category: 'architecture', label: 'Планировка',       sublabel: '72 м², Батуми',          image: '/images/scenes/p9-floorplan.jpg' },
    { id: 'p9-party',     type: 'life_party', category: 'life',         label: 'Новый год',        sublabel: 'Фейерверк над морем',    image: '/images/scenes/p9-party.jpg'     },
    { id: 'p9-bizarre',   type: 'bizarre',    category: 'bizarre',      label: 'Сувенирный киоск', sublabel: 'Прямо в гостиной',       image: '/images/scenes/p9-bizarre.jpg'   },
  ],

  /* ── 10 · Tbilisi Vake Penthouse ────────────────────────────────── */
  // DNA: Boutique penthouse · Tbilisi Vake · 3 BR · 140m² · dark herringbone oak floors · white plaster + exposed brick · panoramic terraces with Vake park and Caucasus mountain views · warm oak and terracotta palette
  10: [
    { id: 'p10-exterior',  type: 'exterior',        category: 'architecture', label: 'Экстерьер',        sublabel: 'Пентхаус, Ваке',        image: '/images/scenes/p10-exterior.jpg'  },
    { id: 'p10-section',   type: 'section',         category: 'architecture', label: 'Разрез',           sublabel: 'Пентхаус + две террасы', image: '/images/scenes/p10-section.jpg'   },
    { id: 'p10-floorplan', type: 'floorplan',       category: 'architecture', label: 'Планировка',       sublabel: '140 м², Ваке, Тбилиси',  image: '/images/scenes/p10-floorplan.jpg' },
    { id: 'p10-remote',    type: 'life_remote_work', category: 'life',         label: 'Удалённая работа', sublabel: 'Утро, горы за стеклом',  image: '/images/scenes/p10-remote.jpg'    },
    { id: 'p10-bizarre',   type: 'bizarre',         category: 'bizarre',      label: 'Хор на террасе',   sublabel: 'Внезапно, 8 голосов',    image: '/images/scenes/p10-bizarre.jpg'   },
  ],

  /* ── 11 · Phuket Rawai ──────────────────────────────────────────── */
  // DNA: Tropical pavilion villa · Phuket Rawai Thailand · 3 BR in separate pavilions · 280m² · natural stone + teak wood · white render + teak cladding · sliding glass to tropical garden + infinity pool · three pavilions · natural stone and teak palette
  11: [
    { id: 'p11-exterior',  type: 'exterior',  category: 'architecture', label: 'Экстерьер',           sublabel: 'Тропическая вилла',        image: '/images/scenes/p11-exterior.jpg'  },
    { id: 'p11-section',   type: 'section',   category: 'architecture', label: 'Разрез',              sublabel: 'Три павильона, бассейн',   image: '/images/scenes/p11-section.jpg'   },
    { id: 'p11-floorplan', type: 'floorplan', category: 'architecture', label: 'Планировка',          sublabel: '280 м², Rawai, Пхукет',    image: '/images/scenes/p11-floorplan.jpg' },
    { id: 'p11-bbq',       type: 'life_bbq',  category: 'life',         label: 'Тропическое барбекю', sublabel: 'Пять гостей у бассейна',   image: '/images/scenes/p11-bbq.jpg'       },
    { id: 'p11-bizarre',   type: 'bizarre',   category: 'bizarre',      label: 'Слон в саду',         sublabel: 'Добродушный, непрошеный',  image: '/images/scenes/p11-bizarre.jpg'   },
  ],

  /* ── 12 · Belgrade Savski Venac ─────────────────────────────────── */
  // DNA: Pre-war apartment · Belgrade Savski Venac · 2 BR · 68m² · 3m ceilings · restored chevron parquet · white plaster + period cornices · tall wooden sash windows · Art Deco 1930s stone building · Kalemegdan area · warm parquet and Belgrade-grey palette
  12: [
    { id: 'p12-exterior',  type: 'exterior',        category: 'architecture', label: 'Экстерьер',        sublabel: 'Межвоенное здание',      image: '/images/scenes/p12-exterior.jpg'  },
    { id: 'p12-section',   type: 'section',         category: 'architecture', label: 'Разрез',           sublabel: 'Высокие потолки, 3м',    image: '/images/scenes/p12-section.jpg'   },
    { id: 'p12-floorplan', type: 'floorplan',       category: 'architecture', label: 'Планировка',       sublabel: '68 м², Savski Venac',    image: '/images/scenes/p12-floorplan.jpg' },
    { id: 'p12-remote',    type: 'life_remote_work', category: 'life',         label: 'Удалённая работа', sublabel: 'Вид на Калемегдан',      image: '/images/scenes/p12-remote.jpg'    },
    { id: 'p12-bizarre',   type: 'bizarre',         category: 'bizarre',      label: 'Слава',            sublabel: '20 родственников, хаос', image: '/images/scenes/p12-bizarre.jpg'   },
  ],

  /* ── 13 · Lisbon Campo de Ourique ───────────────────────────────── */
  // DNA: Restored azulejo tile-house apartment · Lisbon Campo de Ourique · 2 BR · 82m² · 3m ceilings · original wood strip floors · white plaster + azulejo accents · tall French shuttered windows · Pombaline building · azulejo blue and warm wood palette
  13: [
    { id: 'p13-exterior',  type: 'exterior',    category: 'architecture', label: 'Экстерьер',        sublabel: 'Азулежу, Лиссабон',      image: '/images/scenes/p13-exterior.jpg'  },
    { id: 'p13-section',   type: 'section',     category: 'architecture', label: 'Разрез',           sublabel: 'Высокие потолки, 3м',    image: '/images/scenes/p13-section.jpg'   },
    { id: 'p13-floorplan', type: 'floorplan',   category: 'architecture', label: 'Планировка',       sublabel: '82 м², Campo de Ourique', image: '/images/scenes/p13-floorplan.jpg' },
    { id: 'p13-family',    type: 'life_family', category: 'life',         label: 'Семья на рынке',   sublabel: 'Mercado de Ourique',     image: '/images/scenes/p13-family.jpg'    },
    { id: 'p13-bizarre',   type: 'bizarre',     category: 'bizarre',      label: 'Три дня фаду',     sublabel: 'Мелодрама нон-стоп',     image: '/images/scenes/p13-bizarre.jpg'   },
  ],

  /* ── 14 · Algarve Vale do Lobo ──────────────────────────────────── */
  // DNA: Golf-resort villa · Algarve Vale do Lobo Portugal · 4 BR · 230m² · Portuguese stone tile · white render · large openings to garden and golf fairway · terracotta roof · Algarve pines · Atlantic cliffs · white and fairway-green palette
  14: [
    { id: 'p14-exterior',  type: 'exterior',  category: 'architecture', label: 'Экстерьер',        sublabel: 'Вилла на гольф-курорте', image: '/images/scenes/p14-exterior.jpg'  },
    { id: 'p14-section',   type: 'section',   category: 'architecture', label: 'Разрез',           sublabel: 'Вилла + сад, фервей',    image: '/images/scenes/p14-section.jpg'   },
    { id: 'p14-floorplan', type: 'floorplan', category: 'architecture', label: 'Планировка',       sublabel: '230 м², Vale do Lobo',   image: '/images/scenes/p14-floorplan.jpg' },
    { id: 'p14-bbq',       type: 'life_bbq',  category: 'life',         label: 'После гольфа',     sublabel: 'Барбекю у Атлантики',    image: '/images/scenes/p14-bbq.jpg'       },
    { id: 'p14-bizarre',   type: 'bizarre',   category: 'bizarre',      label: 'Мяч в бассейне',   sublabel: 'Кедди по колено в воде', image: '/images/scenes/p14-bizarre.jpg'   },
  ],

  /* ── 15 · Koh Samui Chaweng Noi ─────────────────────────────────── */
  // DNA: Hillside tropical villa · Koh Samui Chaweng Noi Thailand · 3 BR · 188m² · pale stone + teak deck · white render · infinity view terrace over Gulf of Thailand · white villa on hillside above Chaweng Noi bay · tropical planting · infinity pool
  15: [
    { id: 'p15-exterior',  type: 'exterior',  category: 'architecture', label: 'Экстерьер',          sublabel: 'Вилла над заливом',       image: '/images/scenes/p15-exterior.jpg'  },
    { id: 'p15-section',   type: 'section',   category: 'architecture', label: 'Разрез',             sublabel: 'Уровни склона, бассейн',  image: '/images/scenes/p15-section.jpg'   },
    { id: 'p15-floorplan', type: 'floorplan', category: 'architecture', label: 'Планировка',         sublabel: '188 м², Chaweng Noi',     image: '/images/scenes/p15-floorplan.jpg' },
    { id: 'p15-bbq',       type: 'life_bbq',  category: 'life',         label: 'Барбекю на закате',  sublabel: 'Залив Самуи внизу',       image: '/images/scenes/p15-bbq.jpg'       },
    { id: 'p15-bizarre',   type: 'bizarre',   category: 'bizarre',      label: 'Кабаре на террасе', sublabel: 'Самуи, закат',             image: '/images/scenes/p15-bizarre.jpg'   },
  ],

  /* ── 16 · Dubai Business Bay ────────────────────────────────────── */
  // DNA: Canal-view apartment · Dubai Business Bay · 2 BR · 87m² · grey marble tile · white walls · floor-to-ceiling glass balcony facing Dubai Water Canal · sleek modern glass tower · urban Dubai skyline · grey marble and canal-blue palette
  16: [
    { id: 'p16-exterior',  type: 'exterior',      category: 'architecture', label: 'Экстерьер',      sublabel: 'Вид на канал',          image: '/images/scenes/p16-exterior.jpg'   },
    { id: 'p16-section',   type: 'section',       category: 'architecture', label: 'Разрез',         sublabel: 'Балкон, канал внизу',   image: '/images/scenes/p16-section.jpg'    },
    { id: 'p16-floorplan', type: 'floorplan',     category: 'architecture', label: 'Планировка',     sublabel: '87 м², Business Bay',   image: '/images/scenes/p16-floorplan.jpg'  },
    { id: 'p16-matchday',  type: 'life_matchday', category: 'life',         label: 'Матч-день',      sublabel: 'DIFC коллеги, ЛЧ',      image: '/images/scenes/p16-matchday.jpg'   },
    { id: 'p16-bizarre',   type: 'bizarre',       category: 'bizarre',      label: 'Крипто-вар-рум', sublabel: '6 мониторов, луна',     image: '/images/scenes/p16-bizarre.jpg'    },
  ],

  /* ── 17 · Limassol Marina (new real listing) ────────────────────── */
  // DNA: Under-construction seafront tower apartment · Limassol Marina Cyprus · 3 BR · 143m² · light stone floors · glass curtain wall south Mediterranean sea view · 35-floor ultra-slim glass and steel tower · Mediterranean sea panorama and yacht marina · glass silver and Mediterranean blue palette
  17: [
    { id: 'p17-exterior',  type: 'exterior',  category: 'architecture', label: 'Экстерьер',         sublabel: '35-этажная башня на набережной', image: '/images/scenes/p17-exterior.jpg'  },
    { id: 'p17-section',   type: 'section',   category: 'architecture', label: 'Разрез',            sublabel: 'Башня, этаж 6, марина',         image: '/images/scenes/p17-section.jpg'   },
    { id: 'p17-floorplan', type: 'floorplan', category: 'architecture', label: 'Планировка',        sublabel: '143 м² + терраса 42 м²',        image: '/images/scenes/p17-floorplan.jpg' },
    { id: 'p17-life',      type: 'life_bbq',  category: 'life',         label: 'Приёмка объекта',   sublabel: 'Шестой этаж, вид на марину',    image: '/images/scenes/p17-life.jpg'      },
    { id: 'p17-bizarre',   type: 'bizarre',   category: 'bizarre',      label: 'Non-Dom ритуал №2', sublabel: 'Три бухгалтера и море',         image: '/images/scenes/p17-bizarre.jpg'   },
  ],

  /* ── 18 · Dobrota, Kotor Bay (Sotheby's International Realty Montenegro) ── */
  // DNA: Modern seafront apartment · 3 BR · 2 BA · 121 m² · 2.85m ceilings
  //      floor: pale travertine tile  walls: white smooth render
  //      windows: full-width south sliding glass, Bay of Kotor view (Perast church domes)
  //      exterior: white-render 3-floor building, glass railings, rocky waterfront
  //      palette: pearl white, Kotor-bay silver-blue, travertine beige, pine green
  18: [
    { id: 'p18-exterior',  type: 'exterior',   category: 'architecture', label: 'Экстерьер',          sublabel: 'Первая линия, залив Котор',    image: '/images/scenes/p18-exterior.jpg'  },
    { id: 'p18-floorplan', type: 'floorplan',  category: 'architecture', label: 'Планировка',         sublabel: 'Терраса 12 м над заливом',     image: '/images/scenes/p18-floorplan.jpg' },
    { id: 'p18-section',   type: 'section',    category: 'architecture', label: 'Разрез',             sublabel: '3 спальни, залив снаружи',      image: '/images/scenes/p18-section.jpg'   },
    { id: 'p18-bbq',       type: 'life_bbq',   category: 'life',         label: 'Барбекю на террасе', sublabel: 'Вечер, залив Котор внизу',     image: '/images/scenes/p18-bbq.jpg'       },
    { id: 'p18-bizarre',   type: 'bizarre',    category: 'bizarre',      label: '✦ Балканский улов',  sublabel: 'Рыбацкая лодка в гостиной',    image: '/images/scenes/p18-bizarre.jpg'   },
  ],

  /* ── 19 · Sveti Stefan, Budva Riviera (Monteonline) ──────────────── */
  // DNA: Boutique hillside apartment · 1 BR · 1 BA · 62 m² · 2.75m ceilings
  //      floor: light herringbone oak parquet  walls: white plaster + stone accent
  //      windows: floor-to-ceiling west-facing glass, Sveti Stefan island view
  //      exterior: white render + stone facade, terraced hillside garden
  //      palette: white plaster, Adriatic turquoise, warm terracotta, honey oak
  19: [
    { id: 'p19-exterior',  type: 'exterior',        category: 'architecture', label: 'Экстерьер',         sublabel: 'Вид на Свети-Стефан',          image: '/images/scenes/p19-exterior.jpg'  },
    { id: 'p19-floorplan', type: 'floorplan',        category: 'architecture', label: 'Планировка',        sublabel: '62 м² на склоне над морем',    image: '/images/scenes/p19-floorplan.jpg' },
    { id: 'p19-section',   type: 'section',          category: 'architecture', label: 'Разрез',            sublabel: 'Остров в окне',                image: '/images/scenes/p19-section.jpg'   },
    { id: 'p19-remote',    type: 'life_remote_work', category: 'life',         label: 'Удалённая работа',  sublabel: 'Утро, Адриатика за стеклом',   image: '/images/scenes/p19-remote.jpg'    },
    { id: 'p19-bizarre',   type: 'bizarre',          category: 'bizarre',      label: '✦ Скрипторий',      sublabel: 'Византийский монах, свитки',   image: '/images/scenes/p19-bizarre.jpg'   },
  ],

  /* ── 20 · Belgrade Waterfront, Sava River (Atrium Property Services) ─ */
  // DNA: High-rise corner apartment · Floor 14 · 2 BR · 2 BA · 84 m² · 3.0m ceilings
  //      floor: wide-plank light oak engineered wood  walls: white render + glass curtain
  //      windows: full-height glass west + north, wrap-around Sava + Kalemegdan view
  //      exterior: glass-and-steel tower, Belgrade Waterfront quayside promenade
  //      palette: cool silver-white, Sava steel-blue, warm brass, light oak
  20: [
    { id: 'p20-exterior',  type: 'exterior',      category: 'architecture', label: 'Экстерьер',          sublabel: 'Beograd na vodi, Сава',         image: '/images/scenes/p20-exterior.jpg'  },
    { id: 'p20-floorplan', type: 'floorplan',      category: 'architecture', label: 'Планировка',         sublabel: 'Угловой, 14 этаж, вид на реку', image: '/images/scenes/p20-floorplan.jpg' },
    { id: 'p20-section',   type: 'section',        category: 'architecture', label: 'Разрез',             sublabel: 'Крепость Калемегдан снаружи',   image: '/images/scenes/p20-section.jpg'   },
    { id: 'p20-matchday',  type: 'life_matchday',  category: 'life',         label: 'Матч-день',          sublabel: 'ЛЧ, Сава внизу',               image: '/images/scenes/p20-matchday.jpg'  },
    { id: 'p20-bizarre',   type: 'bizarre',        category: 'bizarre',      label: '✦ Тесла дома',       sublabel: 'Катушка в гостиной, 1890-е',    image: '/images/scenes/p20-bizarre.jpg'   },
  ],
};

/**
 * Get scenes for a listing, prepending the isometric site-map as scene #0.
 * siteMapImage is the imported module URL from listing.locationMap.image.
 */
export function getScenesForListing(id: number, siteMapImage: string, accent: string): PropertyScene[] {
  const siteScene: PropertyScene = {
    id: `site-${id}`,
    type: 'site',
    category: 'architecture',
    label: 'Птичий полёт',
    sublabel: 'Вид с высоты',
    image: siteMapImage,
  };
  const rest = PROPERTY_SCENES[id] ?? [];
  return [siteScene, ...rest];
}
