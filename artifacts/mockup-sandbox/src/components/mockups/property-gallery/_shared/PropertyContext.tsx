import { Waves, Building2, ShoppingBag, Car, MessageCircle, ArrowLeft, MapPin } from 'lucide-react';

/** Trimmed, faithful recreation of PropertyDetail.tsx's Hero + Description/Map
 *  section — real listing #4 (Arabian Ranches villa) data & exact class names —
 *  used ONLY so reviewers can see exactly where the new gallery section will
 *  sit on the real page. Not itself a design target. */
export const VILLA = {
  city: 'Дубай',
  district: 'Arabian Ranches',
  type: 'ВИЛЛА',
  price: '$1,850,000',
  beds: 4,
  baths: 5,
  area: 420,
  pricePerSqm: '≈ $4,404/м²',
  image: '/__mockup/images/property-gallery/prop-dubai-villa.jpg',
  mapImage: '/__mockup/images/property-gallery/listing-map-dubai-arabian-ranches.png',
  description: 'Отдельностоящая вилла на закрытой территории с собственным садом и бассейном — формат, который выбирают семьи, переезжающие в Дубай на постоянной основе, а не под инвестицию. Четыре спальни на втором этаже, отдельная гостевая на первом, гараж на две машины, зона барбекю на заднем дворе.',
  neighborhood: 'Arabian Ranches — тихое семейное комьюнити на удалении от туристических кластеров: собственные парки, детские площадки в шаговой доступности.',
};

export function PropertyHeroAndMap() {
  return (
    <>
      <section className="relative pt-10 pb-8 overflow-hidden border-b border-white/5">
        <div className="container mx-auto px-4 md:px-12 lg:px-24">
          <div className="inline-flex items-center gap-2 text-[12px] font-space-grotesk uppercase tracking-wider text-white/50 mb-6">
            <ArrowLeft className="w-3.5 h-3.5" /> Назад к каталогу
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0a0a0a] flex flex-col">
            <div className="relative aspect-[21/9]">
              <img src={VILLA.image} alt="villa" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <div className="bg-[#080808]/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-oxanium flex items-center gap-1.5 shadow-lg">
                  <span className="text-gray-200 tracking-wider uppercase">AE</span>
                </div>
                <div className="bg-[#141414]/90 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-space-grotesk text-white/80 shadow-lg whitespace-nowrap">
                  Семейное комьюнити
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-10 flex flex-row items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-white/60 text-[11px] font-oxanium uppercase tracking-[0.2em] mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {VILLA.city} · {VILLA.district}
                  </div>
                  <div className="text-5xl font-oxanium font-bold chrome-text tracking-tight mb-2">{VILLA.price}</div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/70 text-sm font-space-grotesk">
                    <span>{VILLA.type}</span><span className="opacity-30">·</span>
                    <span>{VILLA.beds} спальни</span><span className="opacity-30">·</span>
                    <span>{VILLA.baths} санузла</span><span className="opacity-30">·</span>
                    <span>{VILLA.area} м²</span>
                  </div>
                </div>
                <a className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-8 inline-flex items-center justify-center gap-2 whitespace-nowrap">
                  <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 border-b border-white/5">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="font-oxanium text-xl md:text-2xl font-semibold text-white mb-4 tracking-tight">Описание</h2>
              <p className="text-gray-300 font-space-grotesk text-[15px] md:text-base leading-relaxed">{VILLA.description}</p>
            </div>
            <div>
              <h2 className="font-oxanium text-xl md:text-2xl font-semibold text-white mb-4 tracking-tight">Район</h2>
              <p className="text-gray-400 font-space-grotesk text-[15px] leading-relaxed">{VILLA.neighborhood}</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="relative rounded-lg overflow-hidden border border-white/5 bg-[#0c0c0c]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={VILLA.mapImage} alt="Изометрическая карта локации объекта" className="absolute inset-0 w-full h-full object-contain scale-[1.12] drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]" />
              </div>
              <div className="flex items-center divide-x divide-white/5 border-t border-white/5">
                {[{ Icon: Waves, m: 25, l: 'До моря' }, { Icon: Building2, m: 20, l: 'До центра' }, { Icon: ShoppingBag, m: 10, l: 'До ТЦ' }].map((d) => (
                  <div key={d.l} title={d.l} className="flex-1 min-h-[48px] flex items-center justify-center gap-1.5 px-2 py-2">
                    <d.Icon className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                    <span className="text-[12px] font-space-grotesk text-gray-300 whitespace-nowrap">{d.m} мин</span>
                    <Car className="w-3 h-3 text-gray-600 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
