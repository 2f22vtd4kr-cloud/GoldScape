export type GalleryCategory = 'layout' | 'floor' | 'exterior' | 'lifestyle' | 'easter-egg';

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  tabLabel: string;      // short label for the pill/tab
  title: string;         // heading shown over the big image
  caption: string;       // one-line description
  image: string;
}

const base = '/__mockup/images/property-gallery/';

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'floor1',
    category: 'floor',
    tabLabel: '1-й этаж',
    title: 'Гостиная, кухня и гостевая — 1-й этаж',
    caption: 'Открытая планировка: кухня-остров переходит в гостиную высотой 3,2 м, отдельная гостевая спальня с выходом на террасу.',
    image: base + 'listing-4-floor1.png',
  },
  {
    id: 'floor2',
    category: 'floor',
    tabLabel: '2-й этаж',
    title: 'Спальни — 2-й этаж',
    caption: 'Четыре спальни-сюиты вдоль общего коридора, мастер-спальня с гардеробной и приватным балконом.',
    image: base + 'listing-4-floor2.png',
  },
  {
    id: 'exterior',
    category: 'exterior',
    tabLabel: 'Экстерьер',
    title: 'Фасад, бассейн и сад',
    caption: 'Закрытый двор с бассейном, зоной барбекю под навесом и ландшафтным садом — вид с высоты птичьего полёта на сам объект.',
    image: base + 'listing-4-exterior.png',
  },
  {
    id: 'lifestyle-bbq',
    category: 'lifestyle',
    tabLabel: 'Барбекю',
    title: 'Семейный барбекю на террасе',
    caption: 'Так может выглядеть обычный субботний вечер во дворе — с грилем, бассейном и детьми на заднем плане.',
    image: base + 'listing-4-lifestyle-bbq.png',
  },
  {
    id: 'lifestyle-party',
    category: 'lifestyle',
    tabLabel: 'Просмотр матча',
    title: 'Вечер с друзьями за просмотром матча',
    caption: 'Гостиная легко становится местом сбора: большой экран, диван на компанию, честная домашняя атмосфера.',
    image: base + 'listing-4-lifestyle-party.png',
  },
  {
    id: 'bizarre',
    category: 'easter-egg',
    tabLabel: '?! Пасхалка',
    title: '«Планёрка перед делом»',
    caption: 'Один бонусный кадр на каждый объект — просто ради настроения. В этот раз гостиная сыграла штаб операции в духе старого доброго кино про грабителей казино.',
    image: base + 'listing-4-bizarre.png',
  },
];
