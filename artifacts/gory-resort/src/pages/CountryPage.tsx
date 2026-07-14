import { useParams, Link } from 'wouter';
import { ArrowRight, MessageCircle, Send, CheckCircle, ShieldCheck, Landmark, Building2, Scale } from 'lucide-react';
import { Layout } from '@/components/Layout';
import { countryByCode, type CountryData } from '@/data/countries';

// ─── Page body (renders once we have valid data) ──────────────────────────────
function CountryPageContent({ data }: { data: CountryData }) {
  return (
    <Layout>
      {/* ─── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 md:pt-36 pb-12 md:pb-24 overflow-hidden border-b border-white/5">
        {/* Deep, expensive dark background, not generic black. */}
        <div className="absolute inset-0 bg-[#020202] pointer-events-none" />
        {/* Subtle, desaturated iridescent wash. Not crypto neon. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(35,30,45,0.4)_0%,transparent_70%)] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
          
          {/* Left Column: Text & Stats */}
          <div className="w-full md:w-1/2 flex flex-col relative z-20">
            {/* Breadcrumb - 48px tap target for mobile */}
            <nav className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] md:text-[13px] font-space-grotesk text-white/40 mb-6 md:mb-8" aria-label="breadcrumb">
              <Link href="/" className="hover:text-white/80 transition-colors flex items-center min-h-[48px]">Главная</Link>
              <span className="text-white/20">/</span>
              <Link href="/properties" className="hover:text-white/80 transition-colors flex items-center min-h-[48px]">Объекты</Link>
              <span className="text-white/20">/</span>
              <span className="text-white/80 flex items-center min-h-[48px]">{data.nameRu}</span>
            </nav>

            <h1 className="font-oxanium text-[clamp(2.75rem,7vw,4.5rem)] font-medium text-white leading-[1.0] tracking-[-0.03em] chrome-text drop-shadow-md mb-6">
              {data.nameRu}
            </h1>

            <p className="font-space-grotesk text-white/60 text-lg md:text-xl max-w-xl leading-relaxed tracking-[-0.01em] mb-10">
              {data.tagline}
            </p>

            {/* Quick stats row */}
            <div className="flex flex-wrap items-end gap-x-8 gap-y-8 pt-8 border-t border-white/[0.08] w-full">
              {data.stats.map((s, i) => (
                <div key={i} className="flex flex-col">
                  <span className="font-oxanium text-[clamp(1.5rem,3vw,2rem)] text-white font-medium leading-none mb-2 tracking-tight drop-shadow-sm">{s.value}</span>
                  <span className="font-space-grotesk text-[10px] md:text-[11px] text-white/40 uppercase tracking-[0.08em]">{s.label}</span>
                </div>
              ))}
              <div className="ml-auto flex flex-col text-right mt-2 sm:mt-0">
                <span className="font-oxanium text-[clamp(1.2rem,2.5vw,1.5rem)] chrome-text font-medium drop-shadow-sm">{data.entryPrice}</span>
                <span className="font-space-grotesk text-[10px] text-white/30 mt-2 uppercase tracking-[0.08em]">Минимальный вход</span>
              </div>
            </div>
          </div>

          {/* Desktop & Mobile Map Element */}
          {/* Nika: On mobile, this sits as a dimmed background wash behind the text to avoid a massive empty scroll block. On desktop, it's a full compositional piece. */}
          <div className="absolute md:relative inset-0 md:inset-auto z-0 md:z-10 w-full md:w-[45%] flex items-center justify-center pointer-events-none overflow-hidden md:overflow-visible">
            {/* Mobile treatment: dimmed wash */}
            <div className="md:hidden absolute inset-0 opacity-[0.12] mix-blend-screen flex items-center justify-center mt-20">
              <img
                src={data.mapImage}
                alt=""
                className="w-[160%] max-w-none object-contain blur-[1px]"
              />
            </div>
            
            {/* Desktop treatment: crisp, elevated */}
            <div className="hidden md:flex relative w-full h-full items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03),transparent_60%)]" />
              <img
                src={data.mapImage}
                alt={`${data.capital}, ${data.nameEn}`}
                className="relative z-10 w-auto max-w-[110%] max-h-[550px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] iso-tile transition-transform duration-1000 hover:rotate-0 hover:scale-105"
              />
              <div className="absolute bottom-4 right-0 z-20 bg-[#050505]/80 backdrop-blur-md px-5 py-3 rounded-full border border-white/10 shadow-2xl">
                <p className="font-oxanium text-white/80 text-[11px] font-medium tracking-[0.18em] uppercase">
                  {data.capital} · {data.nameEn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUST & LEGITIMACY STRIP (Viktor / Irina) ─────────────────────── */}
      {/* Wrapped without overflow to strictly follow no horizontal scroll rule */}
      <section className="border-b border-white/5 bg-[#030303] py-4 md:py-5 relative z-20">
        <div className="container mx-auto px-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[11px] md:text-[13px] font-space-grotesk text-white/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-white/30" />
            <span className="tracking-wide uppercase md:normal-case">AML Compliance 2026</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-white/30" />
            <span className="tracking-wide uppercase md:normal-case">7 лет на рынке</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-white/10" />
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-white/30" />
            <span className="tracking-wide uppercase md:normal-case">KYC & Конфиденциальность</span>
          </div>
        </div>
      </section>

      {/* ─── WHY THIS COUNTRY ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12 md:mb-16">
            <h2 className="font-oxanium text-[11px] md:text-[12px] tracking-[0.2em] text-white/30 uppercase">
              Почему {data.nameRu}
            </h2>
            <div className="h-px bg-white/10 flex-1 max-w-[120px]"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {data.features.map((f, i) => (
              <div
                key={i}
                className="border border-white/[0.06] rounded-xl p-8 bg-[#080808] flex flex-col gap-6
                           hover:border-white/[0.15] hover:bg-[#0a0a0a] transition-all duration-500 group"
              >
                <div className="w-12 h-12 rounded-full border border-white/[0.08] bg-[#0c0c0c] flex items-center justify-center shrink-0 group-hover:border-white/[0.2] transition-colors">
                  <CheckCircle className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </div>
                <div>
                  <h3 className="font-oxanium text-white/90 font-medium text-[20px] leading-snug mb-3 tracking-[-0.01em]">{f.title}</h3>
                  <p className="font-space-grotesk text-white/50 text-[14px] leading-relaxed tracking-wide">{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── MARKETS TABLE ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-32 bg-[#020202] border-y border-white/5">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="mb-12 md:mb-16 text-center md:text-left">
            <h2 className="font-oxanium text-[11px] md:text-[12px] tracking-[0.2em] text-white/30 uppercase mb-4">
              Рынки и ликвидность
            </h2>
            <p className="font-oxanium text-[28px] md:text-[36px] text-white font-medium tracking-tight">
              Локации и порог входа
            </p>
          </div>

          {/* Editorial, high-craft list. No generic table borders, just clean typography and spacing. */}
          <div className="border border-white/[0.06] rounded-xl bg-[#060606] shadow-2xl flex flex-col">
            {data.markets.map((m, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 px-6 md:px-10 py-8
                            ${i < data.markets.length - 1 ? 'border-b border-white/[0.04]' : ''}
                            hover:bg-[#090909] transition-colors duration-300`}
              >
                <div className="md:w-1/3 min-w-0">
                  <span className="font-oxanium text-white/90 text-[18px] font-medium tracking-[-0.01em] block">{m.city}</span>
                </div>
                <div className="md:w-1/2 min-w-0">
                  <span className="font-space-grotesk text-white/50 text-[14px] leading-relaxed block">{m.highlight}</span>
                </div>
                <div className="md:w-1/6 md:text-right shrink-0 mt-2 md:mt-0">
                  <span className="font-oxanium chrome-text text-[20px] font-medium whitespace-nowrap block drop-shadow-sm">{m.priceFrom}</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA to full filtered listing - Self-serve for Dmitri */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
            <Link
              href={`/properties?country=${data.listingCode}`}
              className="eom-btn-primary min-h-[52px] px-8 font-oxanium text-[12px] uppercase tracking-[0.1em] flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              Перейти к каталогу объектов
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── VISA + TAX (Legal Transparency for Viktor/Dmitri/Irina) ───────── */}
      <section className="py-20 md:py-32 bg-[#050505]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-12 md:mb-16">
            <Landmark className="w-5 h-5 text-white/30" />
            <h2 className="font-oxanium text-[11px] md:text-[12px] tracking-[0.2em] text-white/30 uppercase text-center md:text-left">
              Юридическая и налоговая база (2026)
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <div className="border border-white/[0.05] rounded-xl p-8 bg-[#080808] relative overflow-hidden group hover:border-white/[0.12] transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Scale className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <p className="font-oxanium text-[10px] md:text-[11px] tracking-[0.2em] text-white/40 uppercase mb-3">
                  Резиденция и Паспорт
                </p>
                <h3 className="font-oxanium text-[22px] text-white font-medium tracking-tight mb-6">Виза и ВНЖ</h3>
                <p className="font-space-grotesk text-white/60 text-[14px] leading-relaxed tracking-wide">{data.visa}</p>
              </div>
            </div>
            
            <div className="border border-white/[0.05] rounded-xl p-8 bg-[#080808] relative overflow-hidden group hover:border-white/[0.12] transition-colors">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Landmark className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <p className="font-oxanium text-[10px] md:text-[11px] tracking-[0.2em] text-white/40 uppercase mb-3">
                  Расходы и Пошлины
                </p>
                <h3 className="font-oxanium text-[22px] text-white font-medium tracking-tight mb-6">Налогообложение</h3>
                <p className="font-space-grotesk text-white/60 text-[14px] leading-relaxed tracking-wide">{data.taxNote}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA STRIP ─────────────────────────────────────────────────────── */}
      <section className="bg-[#080808] border-t border-white/10 relative overflow-hidden">
        {/* Iridescent wash behind CTA */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(60,50,80,0.1),transparent_100%)] pointer-events-none" />
        
        <div className="container mx-auto px-6 py-16 md:py-24 flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10 text-center lg:text-left">
          <div className="max-w-2xl">
            <h3 className="font-oxanium text-[24px] md:text-[32px] font-medium text-white mb-4 tracking-[-0.01em] leading-snug">
              Приватная консультация
            </h3>
            <p className="font-space-grotesk text-[15px] text-white/50 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Обсудим легальный перевод капитала, подберем объекты вне рынка и подготовим прозрачную смету всех налоговых и юридических расходов (с учетом compliance).
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto">
            <a
              href="https://wa.me/971501234567"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-3 min-h-[52px] px-8 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 hover:bg-[#141414] transition-all bg-[#0c0c0c] w-full sm:w-auto group"
            >
              <MessageCircle className="w-5 h-5 text-white/40 group-hover:text-green-500/90 transition-colors" />
              <span className="font-space-grotesk text-[13px] font-medium tracking-[0.05em] uppercase">WhatsApp</span>
            </a>
            <a
              href="https://t.me/estateofmind"
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-3 min-h-[52px] px-8 rounded-full border border-white/15 text-white/80 hover:text-white hover:border-white/40 hover:bg-[#141414] transition-all bg-[#0c0c0c] w-full sm:w-auto group"
            >
              <Send className="w-5 h-5 text-white/40 group-hover:text-[#0088cc]/90 transition-colors" />
              <span className="font-space-grotesk text-[13px] font-medium tracking-[0.05em] uppercase">Telegram</span>
            </a>
            <Link href="/about" className="eom-btn-primary min-h-[52px] px-8 flex items-center justify-center font-oxanium text-[12px] uppercase tracking-[0.1em] w-full sm:w-auto">
              Оставить заявку
            </Link>
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
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 bg-[#020202]">
          <h1 className="font-oxanium text-4xl text-white mb-4 tracking-tight">Страна не найдена</h1>
          <p className="font-space-grotesk text-white/40 mb-8">
            Направление «{code}» не найдено в каталоге.
          </p>
          <Link href="/" className="eom-btn-primary min-h-[48px] px-8 flex items-center justify-center text-[13px] uppercase tracking-wider">На главную</Link>
        </div>
      </Layout>
    );
  }

  return <CountryPageContent data={data} />;
}
