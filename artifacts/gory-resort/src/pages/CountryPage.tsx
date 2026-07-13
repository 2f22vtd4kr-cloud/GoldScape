import { useParams, Link } from 'wouter';
import { ArrowRight, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { TerrainMap3D } from '@/components/TerrainMap3D';
import { countryByCode, type CountryData } from '@/data/countries';

// ─── Page body (renders once we have valid data) ──────────────────────────────
function CountryPageContent({ data }: { data: CountryData }) {
  return (
    <Layout>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-0 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d0a14] to-black" />

        <div className="relative z-10 container mx-auto px-6 pb-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-space-grotesk text-white/40 mb-10" aria-label="breadcrumb">
            <Link href="/" className="hover:text-white/70 transition-colors">Главная</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-white/70 transition-colors">Объекты</Link>
            <span>/</span>
            <span className="text-white/60">{data.nameRu}</span>
          </nav>

          {/* Country header */}
          <div className="flex flex-col sm:flex-row items-start gap-5 mb-8">
            <span className="text-6xl md:text-7xl">{data.flag}</span>
            <div>
              <h1 className="font-oxanium text-[clamp(2.4rem,8vw,4.2rem)] font-bold text-white leading-[1.0] mb-3">
                {data.nameRu}
              </h1>
              <p className="font-space-grotesk text-white/50 text-base md:text-lg max-w-xl leading-relaxed">
                {data.tagline}
              </p>
            </div>
          </div>

          {/* Quick stats row */}
          <div className="flex flex-wrap items-end gap-8 pb-2">
            {data.stats.map((s, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-oxanium text-[clamp(1.6rem,4vw,2.4rem)] chrome-text leading-none">{s.value}</span>
                <span className="font-space-grotesk text-[11px] text-white/35 mt-1.5 uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
            <div className="ml-auto flex flex-col text-right">
              <span className="font-oxanium text-lg text-white/55">{data.entryPrice}</span>
              <span className="font-space-grotesk text-[10px] text-white/25 mt-1 uppercase tracking-wider">минимальная инвестиция</span>
            </div>
          </div>
        </div>

        {/* 3D Terrain — full width immediately below the hero text */}
        <div className="relative z-10 w-full">
          <TerrainMap3D
            preset={data.terrainPreset}
            canvasHeight={520}
            label={`${data.capital} · ${data.nameEn}`}
            className="w-full"
          />
          {/* Gradient blends into the page background */}
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none" />
        </div>
      </section>

      {/* ─── WHY THIS COUNTRY ──────────────────────────────────────────────── */}
      <section className="py-24 bg-[#070707]">
        <div className="container mx-auto px-6">
          <p className="font-oxanium text-[11px] tracking-[0.28em] text-white/30 uppercase mb-12">
            Почему {data.nameRu}
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {data.features.map((f, i) => (
              <div
                key={i}
                className="border border-white/[0.08] rounded-2xl p-7 bg-[#0b0b0b] flex flex-col gap-5
                           hover:border-white/[0.14] transition-colors duration-300"
              >
                <div className="w-9 h-9 rounded-full border border-white/[0.12] flex items-center justify-center shrink-0">
                  <CheckCircle className="w-4 h-4 text-white/40" />
                </div>
                <h3 className="font-oxanium text-white font-semibold text-lg leading-snug">{f.title}</h3>
                <p className="font-space-grotesk text-white/45 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARKETS TABLE ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-black border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <p className="font-oxanium text-[11px] tracking-[0.28em] text-white/30 uppercase mb-2">
              Ключевые рынки
            </p>
            <h2 className="font-oxanium text-2xl md:text-[32px] text-white">Локации и цены</h2>
          </div>

          <div className="border border-white/[0.07] rounded-2xl overflow-hidden">
            {data.markets.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col sm:flex-row sm:items-center gap-3 px-7 py-5
                            ${i < data.markets.length - 1 ? 'border-b border-white/[0.06]' : ''}
                            hover:bg-white/[0.025] transition-colors`}
              >
                <div className="flex-1 min-w-0">
                  <span className="font-oxanium text-white text-base font-medium">{m.city}</span>
                </div>
                <div className="flex-[2] min-w-0">
                  <span className="font-space-grotesk text-white/45 text-sm">{m.highlight}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-oxanium chrome-text text-lg whitespace-nowrap">{m.priceFrom}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA to full filtered listing */}
          <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href={`/properties?country=${data.listingCode}`}
              className="eom-btn-primary font-oxanium text-[12px] uppercase tracking-wider flex items-center gap-2"
            >
              Все объекты в {data.nameRu}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/about" className="eom-btn-ghost font-oxanium text-[12px] uppercase tracking-wider">
              Бесплатная консультация
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VISA + TAX ────────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#070707]">
        <div className="container mx-auto px-6">
          <p className="font-oxanium text-[11px] tracking-[0.28em] text-white/30 uppercase mb-10">
            Юридическая справка
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
            <div className="border border-white/[0.08] rounded-2xl p-7 bg-[#0b0b0b]">
              <p className="font-oxanium text-[10px] tracking-[0.26em] text-white/25 uppercase mb-4">
                Виза и ВНЖ
              </p>
              <p className="font-space-grotesk text-white/55 text-sm leading-relaxed">{data.visa}</p>
            </div>
            <div className="border border-white/[0.08] rounded-2xl p-7 bg-[#0b0b0b]">
              <p className="font-oxanium text-[10px] tracking-[0.26em] text-white/25 uppercase mb-4">
                Налогообложение
              </p>
              <p className="font-space-grotesk text-white/55 text-sm leading-relaxed">{data.taxNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0f0f0f] border-t border-white/10">
        <div className="container mx-auto px-6 py-14 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="font-oxanium text-xl md:text-2xl font-semibold text-white mb-2">
              Инвестиции в {data.nameRu} — с нуля до сделки
            </h3>
            <p className="font-space-grotesk text-sm text-white/40">
              Юридическое сопровождение, налоговая структура, управление арендой
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/about" className="eom-btn-primary whitespace-nowrap">
              Записаться на консультацию
            </Link>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors bg-[#141414]"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-colors bg-[#141414]"
                aria-label="Telegram"
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

// ─── Route component ──────────────────────────────────────────────────────────
export default function CountryPage() {
  const { code } = useParams<{ code: string }>();
  const data = countryByCode(code ?? '');

  if (!data) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24">
          <h1 className="font-oxanium text-4xl text-white mb-4">Страна не найдена</h1>
          <p className="font-space-grotesk text-white/40 mb-8">
            Направление «{code}» не найдено в каталоге.
          </p>
          <Link href="/" className="eom-btn-primary">На главную</Link>
        </div>
      </Layout>
    );
  }

  return <CountryPageContent data={data} />;
}
