/**
 * scenes.ts
 *
 * Scene image sets for each real property listing.
 *
 * ─────────────────────────────────────────────────────────────────
 * GENERATING / REGENERATING IMAGES — READ THIS FIRST
 * ─────────────────────────────────────────────────────────────────
 * Every scene image MUST be generated using the DNA system defined in
 * `src/data/property-dna.ts`.  Do NOT write ad-hoc prompts.
 *
 *   import { buildPrompt } from '@/data/property-dna';
 *   const prompt = buildPrompt(listingId, sceneType, sceneSpecificDescription);
 *   // then pass prompt to generateImage({ prompt, resolution: 'high' })
 *
 * The full playbook (rationale, step-by-step, review checklist) is at:
 *   docs/IMAGE_GENERATION.md
 *
 * ─────────────────────────────────────────────────────────────────
 * Architecture:
 * - Each entry is keyed by listing id
 * - Scenes are ordered: architecture (exterior → section → floorplan) → life → bizarre
 * - The site/location map is injected dynamically from listing.locationMap.image in PropertyDetail
 * - Images live in /images/scenes/{slug}.jpg (public folder)
 *
 * Naming convention:
 *   - Slot 0 (site map): label = "Птичий полёт"
 *   - Floor plan: label = "Планировка" (single floor) or "Планировка · эт. N" (multi-floor)
 *   - Each scene type must have a unique, specific label — never generic "Архитектура"
 */
import type { PropertyScene } from '@/components/PropertyScenesCarousel';

type SceneMap = Record<number, PropertyScene[]>;

export const PROPERTY_SCENES: SceneMap = {

  /* ── 1 · Dubai Marina ─────────────────────────────────────────── */
  1: [
    { id: 'p1-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Небоскрёб Marina Walk',         image: '/images/scenes/p1-exterior.jpg'  },
    { id: 'p1-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '68 м², Marina Walk',            image: '/images/scenes/p1-floorplan.jpg' },
    { id: 'p1-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Каналы и яхты внизу',           image: '/images/scenes/p1-section.jpg'   },
    { id: 'p1-marina',    type: 'life_marina_walk',  category: 'life',         label: 'Вечер на набережной',sublabel: 'Яхты, закат, Marina Walk',       image: '/images/scenes/p1-marina.jpg'    },
    { id: 'p1-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Heat',             sublabel: 'Кофе. Два пистолета. Канал',    image: '/images/scenes/p1-bizarre.jpg'   },
  ],

  /* ── 2 · Downtown Dubai ───────────────────────────────────────── */
  2: [
    { id: 'p2-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Opera District, Downtown',       image: '/images/scenes/p2-exterior.jpg'  },
    { id: 'p2-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '98 м², вид на Бурдж',           image: '/images/scenes/p2-floorplan.jpg' },
    { id: 'p2-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Бурдж-Халифа в окне',           image: '/images/scenes/p2-section.jpg'   },
    { id: 'p2-remote',    type: 'life_remote_work',  category: 'life',         label: 'Удалённая работа',   sublabel: 'Ноутбук, Бурдж-Халифа за стеклом', image: '/images/scenes/p2-remote.jpg' },
    { id: 'p2-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Mission: Impossible', sublabel: 'Снаряжение. Бурдж-Халифа', image: '/images/scenes/p2-bizarre.jpg'   },
  ],

  /* ── 3 · Business Bay ─────────────────────────────────────────── */
  3: [
    { id: 'p3-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Башня Business Bay, канал',      image: '/images/scenes/p3-exterior.jpg'  },
    { id: 'p3-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '87 м², Dubai Water Canal',       image: '/images/scenes/p3-floorplan.jpg' },
    { id: 'p3-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Вид на DIFC',                   image: '/images/scenes/p3-section.jpg'   },
    { id: 'p3-cowork',    type: 'life_cowork',       category: 'life',         label: 'Коворкинг',          sublabel: 'Два монитора, канал снаружи',    image: '/images/scenes/p3-cowork.jpg'    },
    { id: 'p3-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Wall Street',      sublabel: 'Гекко. Bloomberg. Канал',        image: '/images/scenes/p3-bizarre.jpg'   },
  ],

  /* ── 15 · Palm Jumeirah ───────────────────────────────────────── */
  15: [
    { id: 'p15-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Пальма Джумейра',                image: '/images/scenes/p15-exterior.jpg'  },
    { id: 'p15-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '195 м², ветвь Пальмы',           image: '/images/scenes/p15-floorplan.jpg' },
    { id: 'p15-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Бурдж-эль-Араб на горизонте',    image: '/images/scenes/p15-section.jpg'   },
    { id: 'p15-beach',     type: 'life_beach',        category: 'life',         label: 'Пляжное утро',       sublabel: 'Частный пляж, Бурдж за горизонтом', image: '/images/scenes/p15-beach.jpg'  },
    { id: 'p15-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Волк с Уолл-стрит',sublabel: 'Дом Периньон. Наличные. Залив', image: '/images/scenes/p15-bizarre.jpg'   },
  ],

  /* ── 16 · Arabian Ranches ─────────────────────────────────────── */
  16: [
    { id: 'p16-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Вилла, гольф-поле',              image: '/images/scenes/p16-exterior.jpg'  },
    { id: 'p16-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '320 м², сад и бассейн',          image: '/images/scenes/p16-floorplan.jpg' },
    { id: 'p16-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Гольф-клуб из спальни',          image: '/images/scenes/p16-section.jpg'   },
    { id: 'p16-garden',    type: 'life_garden',       category: 'life',         label: 'Сад и бассейн',      sublabel: 'Семья у бассейна, гольф-поле',   image: '/images/scenes/p16-garden.jpg'    },
    { id: 'p16-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ American Beauty',  sublabel: 'Ванна из роз. Гольф за стеклом', image: '/images/scenes/p16-bizarre.jpg'   },
  ],

  /* ── 4 · Beşiktaş Istanbul ────────────────────────────────────── */
  4: [
    { id: 'p4-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Первая линия Босфора',           image: '/images/scenes/p4-exterior.jpg'  },
    { id: 'p4-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '112 м², Beşiktaş',              image: '/images/scenes/p4-floorplan.jpg' },
    { id: 'p4-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Азиатский берег в окне',         image: '/images/scenes/p4-section.jpg'   },
    { id: 'p4-bosphorus', type: 'life_bosphorus',    category: 'life',         label: 'Закат над Босфором', sublabel: 'Ракы, пролив, огни Азии',        image: '/images/scenes/p4-bosphorus.jpg' },
    { id: 'p4-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Skyfall',          sublabel: 'Мотоцикл на паркете. Босфор',   image: '/images/scenes/p4-bizarre.jpg'   },
  ],

  /* ── 5 · Antalya Lara ─────────────────────────────────────────── */
  5: [
    { id: 'p5-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Курортный комплекс Лара',        image: '/images/scenes/p5-exterior.jpg'  },
    { id: 'p5-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '138 м², Анталья',               image: '/images/scenes/p5-floorplan.jpg' },
    { id: 'p5-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Средиземноморье за балконом',    image: '/images/scenes/p5-section.jpg'   },
    { id: 'p5-pool',      type: 'life_pool',         category: 'life',         label: 'Бассейн и море',     sublabel: 'Пальмы, вода, Таврские горы',    image: '/images/scenes/p5-pool.jpg'      },
    { id: 'p5-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Талантливый Рипли',sublabel: 'Паспорта. Оливетти. Средиземноморье', image: '/images/scenes/p5-bizarre.jpg' },
  ],

  /* ── 6 · Limassol Germasogeia ─────────────────────────────────── */
  6: [
    { id: 'p6-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Герасогея, Лимасол',             image: '/images/scenes/p6-exterior.jpg'  },
    { id: 'p6-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '108 м², IT-квартал',             image: '/images/scenes/p6-floorplan.jpg' },
    { id: 'p6-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Море на горизонте',              image: '/images/scenes/p6-section.jpg'   },
    { id: 'p6-remote',    type: 'life_remote_work',  category: 'life',         label: 'IT-номад',           sublabel: 'Два монитора, тимьян, море',     image: '/images/scenes/p6-remote.jpg'    },
    { id: 'p6-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Non-Dom Year 1',   sublabel: 'Оффшор. Командария. Кипр',       image: '/images/scenes/p6-bizarre.jpg'   },
  ],

  /* ── 7 · Paphos Koloni ────────────────────────────────────────── */
  7: [
    { id: 'p7-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Мыс Колони, Пафос',              image: '/images/scenes/p7-exterior.jpg'  },
    { id: 'p7-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '92 м², терраса 18 м²',           image: '/images/scenes/p7-floorplan.jpg' },
    { id: 'p7-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Скала Афродиты в окне',          image: '/images/scenes/p7-section.jpg'   },
    { id: 'p7-terrace',   type: 'life_terrace',      category: 'life',         label: 'Закат на террасе',   sublabel: 'Белые стулья, Петра ту Ромиу',   image: '/images/scenes/p7-terrace.jpg'   },
    { id: 'p7-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Рождение Венеры',  sublabel: 'Ракушка на террасе. Скала Афродиты', image: '/images/scenes/p7-bizarre.jpg' },
  ],

  /* ── 8 · Tbilisi Vake ─────────────────────────────────────────── */
  8: [
    { id: 'p8-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Сталинка, Ваке, Тбилиси',        image: '/images/scenes/p8-exterior.jpg'  },
    { id: 'p8-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '82 м², Ваке',                   image: '/images/scenes/p8-floorplan.jpg' },
    { id: 'p8-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Мтацминда в окне',               image: '/images/scenes/p8-section.jpg'   },
    { id: 'p8-remote',    type: 'life_remote_work',  category: 'life',         label: 'Удалённая работа',   sublabel: 'Вино. Мтацминда. Ёлочный паркет', image: '/images/scenes/p8-remote.jpg'   },
    { id: 'p8-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ The Living Daylights', sublabel: 'КГБ. Катушечник. Мтацминда', image: '/images/scenes/p8-bizarre.jpg'   },
  ],

  /* ── 9 · Batumi Boulevard ─────────────────────────────────────── */
  9: [
    { id: 'p9-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Батумский бульвар',              image: '/images/scenes/p9-exterior.jpg'  },
    { id: 'p9-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '48 м², первая линия',            image: '/images/scenes/p9-floorplan.jpg' },
    { id: 'p9-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Чёрное море в окне',             image: '/images/scenes/p9-section.jpg'   },
    { id: 'p9-balcony',   type: 'life_balcony',      category: 'life',         label: 'Рассвет на Чёрном море', sublabel: 'Кофе. Халат. Алфавитная башня', image: '/images/scenes/p9-balcony.jpg' },
    { id: 'p9-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Casino Royale',    sublabel: 'Карточный стол. Чёрное море',    image: '/images/scenes/p9-bizarre.jpg'   },
  ],

  /* ── 10 · Phuket Rawai ────────────────────────────────────────── */
  10: [
    { id: 'p10-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Равай, Пхукет',                  image: '/images/scenes/p10-exterior.jpg'  },
    { id: 'p10-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '85 м², Andaman Sea',             image: '/images/scenes/p10-floorplan.jpg' },
    { id: 'p10-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Андаманское море в окне',         image: '/images/scenes/p10-section.jpg'   },
    { id: 'p10-pool',      type: 'life_pool',         category: 'life',         label: 'Инфинити-бассейн',   sublabel: 'Золотой час. Андаман',           image: '/images/scenes/p10-pool.jpg'      },
    { id: 'p10-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ The Beach',        sublabel: 'Карта на листе. Маска. Андаман', image: '/images/scenes/p10-bizarre.jpg'   },
  ],

  /* ── 11 · Koh Samui Chaweng Noi ──────────────────────────────── */
  11: [
    { id: 'p11-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Чавенг Ной, Самуи',              image: '/images/scenes/p11-exterior.jpg'  },
    { id: 'p11-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '185 м², вилла',                  image: '/images/scenes/p11-floorplan.jpg' },
    { id: 'p11-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Залив Чавенг в окне',            image: '/images/scenes/p11-section.jpg'   },
    { id: 'p11-infinity',  type: 'life_infinity',     category: 'life',         label: 'Инфинити на закате', sublabel: 'Залив горит медью',              image: '/images/scenes/p11-infinity.jpg'  },
    { id: 'p11-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Мальчишник в Таиланде', sublabel: 'Тигр в гостиной. Залив Чавенг', image: '/images/scenes/p11-bizarre.jpg' },
  ],

  /* ── 13 · Lisbon Campo de Ourique ─────────────────────────────── */
  13: [
    { id: 'p13-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Кампу-ди-Урики, Лиссабон',       image: '/images/scenes/p13-exterior.jpg'  },
    { id: 'p13-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '108 м², ёлочный паркет',         image: '/images/scenes/p13-floorplan.jpg' },
    { id: 'p13-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Купол Эштрелы в окне',           image: '/images/scenes/p13-section.jpg'   },
    { id: 'p13-remote',    type: 'life_remote_work',  category: 'life',         label: 'Лиссабонское утро',  sublabel: 'Ноутбук. Занавески. Купол',      image: '/images/scenes/p13-remote.jpg'    },
    { id: 'p13-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Ночной поезд в Лиссабон', sublabel: 'Пессоа. Ремингтон. Ёлочка', image: '/images/scenes/p13-bizarre.jpg' },
  ],

  /* ── 14 · Algarve Vale do Lobo ────────────────────────────────── */
  14: [
    { id: 'p14-exterior',  type: 'exterior',         category: 'architecture', label: 'Экстерьер',          sublabel: 'Вале-ду-Лобу, Алгарви',          image: '/images/scenes/p14-exterior.jpg'  },
    { id: 'p14-floorplan', type: 'floorplan',         category: 'architecture', label: 'Планировка',         sublabel: '245 м², вилла',                  image: '/images/scenes/p14-floorplan.jpg' },
    { id: 'p14-section',   type: 'section',           category: 'architecture', label: 'Разрез',             sublabel: 'Атлантика за стеклом',           image: '/images/scenes/p14-section.jpg'   },
    { id: 'p14-garden',    type: 'life_garden',       category: 'life',         label: 'Обед на веранде',    sublabel: 'Каменные сосны, гольф, океан',   image: '/images/scenes/p14-garden.jpg'    },
    { id: 'p14-bizarre',   type: 'bizarre',           category: 'bizarre',      label: '✦ Шпион, выйди вон', sublabel: 'Папка KARLA. PPK. Атлантика',    image: '/images/scenes/p14-bizarre.jpg'   },
  ],

  /* ── 12 · Belgrade Savski Venac (Estitor) ───────────────────── */
  // DNA → see property-dna.ts entry 12
  12: [
    { id: 'p12-exterior',  type: 'exterior',        category: 'architecture', label: 'Экстерьер',        sublabel: 'Межвоенное здание',      image: '/images/scenes/p12-exterior.jpg'  },
    { id: 'p12-section',   type: 'section',         category: 'architecture', label: 'Разрез',           sublabel: 'Высокие потолки, 3м',    image: '/images/scenes/p12-section.jpg'   },
    { id: 'p12-floorplan', type: 'floorplan',       category: 'architecture', label: 'Планировка',       sublabel: '68 м², Savski Venac',    image: '/images/scenes/p12-floorplan.jpg' },
    { id: 'p12-remote',    type: 'life_remote_work', category: 'life',        label: 'Удалённая работа', sublabel: 'Вид на Калемегдан',      image: '/images/scenes/p12-remote.jpg'    },
    { id: 'p12-bizarre',   type: 'bizarre',         category: 'bizarre',      label: "✦ Ocean's Eleven", sublabel: 'Белладжио, план на столе', image: '/images/scenes/p12-bizarre.jpg'   },
  ],

  /* ── 20 · Belgrade Waterfront (Atrium Property Services) ────── */
  // DNA → see property-dna.ts entry 20
  20: [
    { id: 'p20-exterior',  type: 'exterior',      category: 'architecture', label: 'Экстерьер',          sublabel: 'Beograd na vodi, Сава',         image: '/images/scenes/p20-exterior.jpg'  },
    { id: 'p20-floorplan', type: 'floorplan',     category: 'architecture', label: 'Планировка',         sublabel: 'Угловой, 14 этаж, вид на реку', image: '/images/scenes/p20-floorplan.jpg' },
    { id: 'p20-section',   type: 'section',       category: 'architecture', label: 'Разрез',             sublabel: 'Крепость Калемегдан снаружи',   image: '/images/scenes/p20-section.jpg'   },
    { id: 'p20-matchday',  type: 'life_matchday', category: 'life',         label: 'Матч-день',          sublabel: 'ЛЧ, Сава внизу',               image: '/images/scenes/p20-matchday.jpg'  },
    { id: 'p20-bizarre',   type: 'bizarre',       category: 'bizarre',      label: '✦ American Psycho',  sublabel: 'Визитки. Облицовка — жемчуг',  image: '/images/scenes/p20-bizarre.jpg'   },
  ],

  /* ── 18 · Dobrota, Kotor Bay (Sotheby's International Realty Montenegro) ── */
  // DNA → see property-dna.ts entry 18  (proof-of-concept: first set generated with full DNA system)
  18: [
    { id: 'p18-exterior',  type: 'exterior',   category: 'architecture', label: 'Экстерьер',          sublabel: 'Первая линия, залив Котор',    image: '/images/scenes/p18-exterior.jpg'  },
    { id: 'p18-floorplan', type: 'floorplan',  category: 'architecture', label: 'Планировка',         sublabel: 'Терраса 12 м над заливом',     image: '/images/scenes/p18-floorplan.jpg' },
    { id: 'p18-section',   type: 'section',    category: 'architecture', label: 'Разрез',             sublabel: '3 спальни, залив снаружи',      image: '/images/scenes/p18-section.jpg'   },
    { id: 'p18-bbq',       type: 'life_bbq',   category: 'life',         label: 'Барбекю на террасе', sublabel: 'Вечер, залив Котор внизу',     image: '/images/scenes/p18-bbq.jpg'       },
    { id: 'p18-bizarre',   type: 'bizarre',    category: 'bizarre',      label: '✦ Le Grand Bleu',    sublabel: 'Жак Майоль. Которский залив',  image: '/images/scenes/p18-bizarre.jpg'   },
  ],

  /* ── 19 · Sveti Stefan, Budva Riviera (Monteonline) ──────────── */
  // DNA → see property-dna.ts entry 19
  19: [
    { id: 'p19-exterior',  type: 'exterior',        category: 'architecture', label: 'Экстерьер',         sublabel: 'Вид на Свети-Стефан',          image: '/images/scenes/p19-exterior.jpg'  },
    { id: 'p19-floorplan', type: 'floorplan',        category: 'architecture', label: 'Планировка',        sublabel: '62 м² на склоне над морем',    image: '/images/scenes/p19-floorplan.jpg' },
    { id: 'p19-section',   type: 'section',          category: 'architecture', label: 'Разрез',            sublabel: 'Остров в окне',                image: '/images/scenes/p19-section.jpg'   },
    { id: 'p19-remote',    type: 'life_remote_work', category: 'life',         label: 'Удалённая работа',  sublabel: 'Утро, Адриатика за стеклом',   image: '/images/scenes/p19-remote.jpg'    },
    { id: 'p19-bizarre',   type: 'bizarre',          category: 'bizarre',      label: '✦ Похмелье',        sublabel: 'Тигр в ванной',                image: '/images/scenes/p19-bizarre.jpg'   },
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
