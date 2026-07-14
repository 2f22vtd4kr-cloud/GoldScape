import { useEffect, useState } from 'react';
import { useParams, Link } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, MessageCircle, Send, ShieldCheck,
  Scale, TrendingUp, AlertTriangle, MapPin, Landmark,
} from 'lucide-react';
import { Layout } from '@/components/Layout';
import { PropertyLocationMap } from '@/components/PropertyLocationMap';
import { LISTINGS, listingById } from '@/data/listings';
import { countryByListingCode } from '@/data/countries';
import { consumeDetailOrigin } from '@/lib/propertyOrigin';

/**
 * Full "fly into the building" entrance: reused from the old PropertyImmersion
 * overlay, but now it's the actual entrance of a real page (not a dead-end
 * modal) — it plays once on mount, then unmounts, revealing the real detail
 * page underneath.
 */
function EntranceReveal({
  origin, mapImage, photo, accent, onDone,
}: {
  origin: { x: number; y: number };
  mapImage: string;
  photo: string;
  accent: string;
  onDone: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] overflow-hidden bg-black pointer-events-none"
      style={{ backgroundColor: `color-mix(in srgb, ${accent} 12%, black)` }}
      initial={{ clipPath: `circle(0% at ${origin.x}% ${origin.y}%)` }}
      animate={{ clipPath: `circle(150% at ${origin.x}% ${origin.y}%)` }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={onDone}
    >
      <motion.img
        src={mapImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: 0, scale: 8 }}
        transition={{ duration: 0.9, ease: [0.8, 0, 1, 1] }}
      />
      <motion.img
        src={photo}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.35, ease: 'easeOut' }}
      />
    </motion.div>
  );
}

export default function PropertyDetail() {
  const params = useParams<{ id: string }>();
  const listing = listingById(params.id);
  const country = listing ? countryByListingCode(listing.country) : undefined;

  const [origin, setOrigin] = useState<{ x: number; y: number } | null | undefined>(undefined);

  useEffect(() => {
    if (!listing) return;
    setOrigin(consumeDetailOrigin());
  }, [listing?.id]);

  if (!listing) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-6 text-center pt-32">
          <h1 className="font-oxanium text-3xl dark:text-white text-foreground">Объект не найден</h1>
          <p className="text-gray-400 font-space-grotesk max-w-md">
            Возможно, ссылка устарела или объект был снят с продажи.
          </p>
          <Link href="/properties" className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-8 inline-flex items-center justify-center">
            К каталогу объектов
          </Link>
        </div>
      </Layout>
    );
  }

  const accent = listing.locationMap.accentColor ?? 'hsl(38, 90%, 58%)';
  const similar = LISTINGS.filter(l => l.country === listing.country && l.id !== listing.id).slice(0, 3);
  const waText = encodeURIComponent(`Добрый день! Хочу получить полную информацию по объекту: ${listing.type} · ${listing.city}, ${listing.district} · ${listing.price}`);

  return (
    <Layout>
      {/* Entrance transition — only plays when arriving from a click in the catalogue */}
      <AnimatePresence>
        {origin && (
          <EntranceReveal
            origin={origin}
            mapImage={listing.locationMap.image}
            photo={listing.image}
            accent={accent}
            onDone={() => setOrigin(null)}
          />
        )}
      </AnimatePresence>

      {/* ─── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-8 md:pb-12 overflow-hidden dark:border-b dark:border-white/5 border-b border-black/10">
        <div className="container mx-auto px-4 md:px-12 lg:px-24">
          <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] md:text-[13px] font-space-grotesk dark:text-white/40 text-foreground/50 mb-6" aria-label="breadcrumb">
            <Link href="/" className="dark:hover:text-white/80 hover:text-foreground/80 transition-colors flex items-center min-h-[48px] md:min-h-0">Главная</Link>
            <span className="dark:text-white/20 text-foreground/25">/</span>
            <Link href="/properties" className="dark:hover:text-white/80 hover:text-foreground/80 transition-colors flex items-center min-h-[48px] md:min-h-0">Объекты</Link>
            <span className="dark:text-white/20 text-foreground/25">/</span>
            <span className="dark:text-white/80 text-foreground/80 flex items-center min-h-[48px] md:min-h-0">{listing.city} · {listing.district}</span>
          </nav>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-[12px] font-space-grotesk uppercase tracking-wider dark:text-white/50 dark:hover:text-white text-foreground/60 hover:text-foreground transition-colors mb-6 min-h-[48px] md:min-h-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Назад к каталогу
          </Link>

          <div className="rounded-2xl overflow-hidden dark:border dark:border-white/10 border border-black/10 dark:bg-[#0a0a0a] bg-white flex flex-col">
            <div className="relative aspect-[4/3] md:aspect-[21/9]">
              <img
                src={listing.image}
                alt={`${listing.type} · ${listing.city}, ${listing.district}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Photo scrim — intentionally stays dark in both themes for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/10 md:from-black/85 md:via-black/10" />

              <div className={`absolute top-4 left-4 right-4 flex flex-wrap gap-2 ${listing.exclusive ? 'pr-28' : ''}`}>
                {/* Badge over photo — stays dark in both themes */}
                <div className="bg-[#080808]/80 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-oxanium flex items-center gap-1.5 shadow-lg">
                  <span className="text-gray-200 tracking-wider uppercase">{listing.country}</span>
                </div>
                {listing.tags.map(tag => (
                  <div key={tag} className="bg-[#141414]/90 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 text-[10px] font-space-grotesk text-white/80 shadow-lg whitespace-nowrap">
                    {tag}
                  </div>
                ))}
              </div>
              {listing.exclusive && (
                <div className="absolute top-4 right-4">
                  {/* Exclusive badge over photo — stays dark in both themes */}
                  <div className="bg-black/60 backdrop-blur-md border border-white/20 rounded px-2 py-1 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <span className="iridescent-text text-[9px] font-oxanium font-bold uppercase tracking-[0.2em]">ЭКСКЛЮЗИВ</span>
                  </div>
                </div>
              )}

              {/* Price/specs live inside the image overlay only from md+; on mobile the short
                  image height leaves no room, so they flow in normal layout below instead (see block below). */}
              <div className="hidden md:flex absolute bottom-0 left-0 right-0 p-10 flex-row items-end justify-between gap-4">
                <div>
                  {/* Text over photo — stays dark for legibility */}
                  <div className="flex items-center gap-2 text-white/60 text-[11px] font-oxanium uppercase tracking-[0.2em] mb-2">
                    <MapPin className="w-3.5 h-3.5" /> {listing.city} · {listing.district}
                  </div>
                  <div className="text-5xl font-oxanium font-bold chrome-text tracking-tight mb-2">
                    {listing.price}
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-white/70 text-sm font-space-grotesk">
                    <span>{listing.type}</span>
                    <span className="opacity-30">·</span>
                    <span>{listing.beds === 'Studio' ? 'Студия' : `${listing.beds} спальни`}</span>
                    <span className="opacity-30">·</span>
                    <span>{listing.baths} санузла</span>
                    <span className="opacity-30">·</span>
                    <span>{listing.area} м²</span>
                    <span className="opacity-30">·</span>
                    <span>{listing.pricePerSqm}</span>
                  </div>
                </div>
                <a
                  href={`https://wa.me/971502345678?text=${waText}`}
                  target="_blank" rel="noreferrer"
                  className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-8 inline-flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
                </a>
              </div>
            </div>

            {/* Mobile-only: same info, in normal flow below the image so nothing overlaps. */}
            <div className="md:hidden p-5 flex flex-col gap-4">
              <div>
                <div className="flex items-center gap-2 dark:text-white/60 text-foreground/65 text-[11px] font-oxanium uppercase tracking-[0.2em] mb-2">
                  <MapPin className="w-3.5 h-3.5" /> {listing.city} · {listing.district}
                </div>
                <div className="text-3xl font-oxanium font-bold chrome-text tracking-tight mb-2">
                  {listing.price}
                </div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 dark:text-white/70 text-foreground/70 text-sm font-space-grotesk">
                  <span>{listing.type}</span>
                  <span className="opacity-30">·</span>
                  <span>{listing.beds === 'Studio' ? 'Студия' : `${listing.beds} спальни`}</span>
                  <span className="opacity-30">·</span>
                  <span>{listing.baths} санузла</span>
                  <span className="opacity-30">·</span>
                  <span>{listing.area} м²</span>
                </div>
              </div>
              <a
                href={`https://wa.me/971502345678?text=${waText}`}
                target="_blank" rel="noreferrer"
                className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider min-h-[48px] px-6 inline-flex items-center justify-center gap-2 w-full"
              >
                <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── DESCRIPTION + NEIGHBORHOOD ───────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 dark:border-b dark:border-white/5 border-b border-black/10 bg-[#F5F3EE] dark:bg-transparent">
        <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <h2 className="font-oxanium text-xl md:text-2xl font-semibold dark:text-white text-foreground mb-4 tracking-tight">Описание</h2>
              <p className="dark:text-gray-300 text-foreground/75 font-space-grotesk text-[15px] md:text-base leading-relaxed">
                {listing.description}
              </p>
            </div>
            <div>
              <h2 className="font-oxanium text-xl md:text-2xl font-semibold dark:text-white text-foreground mb-4 tracking-tight flex items-center gap-2">
                <Landmark className="w-5 h-5 dark:text-white/40 text-foreground/50" /> Район
              </h2>
              <p className="dark:text-gray-400 text-foreground/60 font-space-grotesk text-[15px] leading-relaxed">
                {listing.neighborhood}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <PropertyLocationMap {...listing.locationMap} />
            <div className="flex items-center gap-2 text-[11px] font-space-grotesk dark:text-gray-500 text-foreground/50 px-1">
              <ShieldCheck className="w-3.5 h-3.5 dark:text-white/30 text-foreground/40" />
              <span>Partner: <span className="dark:text-gray-400 text-foreground/60">{listing.agency}</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INVESTMENT ANALYSIS ──────────────────────────────────────── */}
      <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 dark:bg-[#050505] bg-white dark:border-b dark:border-white/5 border-b border-black/10">
        <div className="container mx-auto max-w-7xl">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-xl">{country?.flag}</span>
            <h2 className="font-oxanium text-2xl md:text-3xl font-semibold chrome-text tracking-tight">
              Инвестиционный анализ
            </h2>
          </div>
          <p className="dark:text-gray-500 text-foreground/50 font-space-grotesk text-sm mb-10 max-w-2xl">
            Правовой статус и доходность рассчитаны для этой конкретной цены — не для страны в целом.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="dark:bg-white/[0.02] bg-black/[0.02] dark:border dark:border-white/[0.07] border border-black/[0.06] rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 dark:text-white/80 text-foreground/80">
                <Scale className="w-4 h-4" />
                <h3 className="font-oxanium text-sm uppercase tracking-wider">Резидентство и гражданство</h3>
              </div>
              <p className="dark:text-gray-300 text-foreground/75 font-space-grotesk text-sm leading-relaxed">{listing.legalFit}</p>
              {country && (
                <p className="dark:text-gray-500 text-foreground/50 font-space-grotesk text-[12px] leading-relaxed pt-2 dark:border-t dark:border-white/5 border-t border-black/5">
                  Общий порог по стране: {country.visa}
                </p>
              )}
            </div>

            <div className="dark:bg-white/[0.02] bg-black/[0.02] dark:border dark:border-white/[0.07] border border-black/[0.06] rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 dark:text-white/80 text-foreground/80">
                <ShieldCheck className="w-4 h-4" />
                <h3 className="font-oxanium text-sm uppercase tracking-wider">Налоги и сборы</h3>
              </div>
              <p className="dark:text-gray-300 text-foreground/75 font-space-grotesk text-sm leading-relaxed">
                {country?.taxNote ?? 'Уточняется индивидуально с юридическим отделом.'}
              </p>
            </div>

            <div className="dark:bg-white/[0.02] bg-black/[0.02] dark:border dark:border-white/[0.07] border border-black/[0.06] rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 dark:text-white/80 text-foreground/80">
                <TrendingUp className="w-4 h-4" />
                <h3 className="font-oxanium text-sm uppercase tracking-wider">Доходность</h3>
              </div>
              <p className="dark:text-gray-300 text-foreground/75 font-space-grotesk text-sm leading-relaxed">{listing.yieldEstimate}</p>
            </div>

            <div className="dark:bg-white/[0.02] bg-black/[0.02] dark:border dark:border-white/[0.07] border border-black/[0.06] rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2 dark:text-white/80 text-foreground/80">
                <AlertTriangle className="w-4 h-4" />
                <h3 className="font-oxanium text-sm uppercase tracking-wider">На что обратить внимание</h3>
              </div>
              <p className="dark:text-gray-300 text-foreground/75 font-space-grotesk text-sm leading-relaxed">{listing.riskNote}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="dark:bg-white/[0.015] bg-black/[0.015] dark:border dark:border-white/[0.05] border border-black/[0.05] rounded-xl p-5 flex flex-col gap-2">
              <h4 className="font-oxanium text-[11px] uppercase tracking-wider dark:text-white/50 text-foreground/60">Перевод капитала</h4>
              <p className="dark:text-gray-500 text-foreground/50 font-space-grotesk text-[13px] leading-relaxed">
                Для клиентов с российскими паспортами мы структурируем сделку поэтапно: открытие счёта в юрисдикции покупки, прямой SWIFT-перевод или расчёт в USDT/USDC при согласии застройщика, полное KYC/AML-сопровождение и подтверждение источника средств на каждом шаге, чтобы исключить блокировку транзакции банком-получателем.
              </p>
            </div>
            <div className="dark:bg-white/[0.015] bg-black/[0.015] dark:border dark:border-white/[0.05] border border-black/[0.05] rounded-xl p-5 flex flex-col gap-2">
              <h4 className="font-oxanium text-[11px] uppercase tracking-wider dark:text-white/50 text-foreground/60">Комиссия агентства</h4>
              <p className="dark:text-gray-500 text-foreground/50 font-space-grotesk text-[13px] leading-relaxed">
                Наша комиссия фиксируется в письменном виде до перевода первого платежа и не добавляется к указанной здесь цене объекта — итоговая сумма к оплате известна заранее, без скрытых наценок на этапе сделки.
              </p>
            </div>
          </div>

          <p className="dark:text-gray-600 text-foreground/40 font-space-grotesk text-[11px] leading-relaxed mt-6 max-w-3xl">
            Информация выше носит общий ознакомительный характер, основана на актуальном на 2026 год законодательстве и не является индивидуальной юридической, налоговой или инвестиционной рекомендацией. Пороги и ставки периодически меняются — перед сделкой наш Legal-департамент подтверждает точные условия на дату подписания.
          </p>
        </div>
      </section>

      {/* ─── SIMILAR LISTINGS ──────────────────────────────────────────── */}
      {similar.length > 0 && (
        <section className="py-12 md:py-16 px-4 md:px-12 lg:px-24 dark:border-b dark:border-white/5 border-b border-black/10 bg-[#F5F3EE] dark:bg-transparent">
          <div className="container mx-auto max-w-7xl">
            <h2 className="font-oxanium text-xl md:text-2xl font-semibold dark:text-white text-foreground mb-8 tracking-tight">
              Другие объекты{country ? ` в ${country.nameRu}` : ''}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map(s => (
                <Link
                  key={s.id}
                  href={`/properties/${s.id}`}
                  className="eom-card group flex flex-col dark:border dark:border-white/5 dark:hover:border-white/20 transition-all duration-300 overflow-hidden rounded-xl"
                >
                  <div className="relative aspect-[3/2] overflow-hidden dark:bg-[#111] bg-white">
                    <img
                      src={s.image}
                      alt={`${s.type} · ${s.city}, ${s.district}`}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Photo gradient scrim — intentionally stays dark in both themes */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  </div>
                  <div className="p-5 flex flex-col gap-1">
                    <div className="text-xl font-oxanium font-bold chrome-text tracking-tight">{s.price}</div>
                    <div className="text-sm font-space-grotesk dark:text-gray-300 text-foreground/75">{s.city} · {s.district}</div>
                    <div className="flex items-center gap-1 text-[11px] font-space-grotesk uppercase tracking-wider dark:text-white/50 dark:group-hover:text-white text-foreground/60 group-hover:text-foreground transition-colors mt-2">
                      Подробнее <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── CTA ───────────────────────────────────────────────────────── */}
      <section className="dark:bg-[#0f0f0f] bg-white dark:border-t dark:border-t-white/10 border-t border-t-black/10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px]">
          <div className="w-full h-full bg-gradient-to-r from-transparent via-[#8b5e1a] to-transparent opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-24 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
          <div className="flex flex-col gap-4 text-center lg:text-left max-w-2xl">
            <h3 className="text-xl md:text-2xl font-oxanium font-semibold dark:text-white text-foreground tracking-tight">
              Готовы обсудить детали?
            </h3>
            <p className="text-sm md:text-base dark:text-gray-400 text-foreground/60 font-space-grotesk leading-relaxed">
              Наши брокеры рассчитают полную стоимость с налогами и сборами, подтвердят актуальный правовой статус
              для этого объекта и помогут структурировать безопасный перевод средств.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 lg:mt-0 w-full lg:w-auto">
            <a
              href={`https://wa.me/971502345678?text=${waText}`}
              target="_blank" rel="noreferrer"
              className="w-full sm:w-auto min-h-[48px] px-8 rounded-full dark:bg-white dark:text-black bg-foreground text-background font-oxanium font-semibold text-sm dark:hover:bg-gray-200 hover:opacity-90 transition-colors flex items-center justify-center uppercase tracking-wider gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Написать в WhatsApp
            </a>
            <a
              href="https://t.me/estateofmind_official"
              target="_blank" rel="noreferrer"
              className="glass-icon-btn w-12 h-12 rounded-full dark:text-gray-400 text-foreground/60 hover:text-[#229ED9]"
              aria-label="Написать в Telegram"
            >
              <Send className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
