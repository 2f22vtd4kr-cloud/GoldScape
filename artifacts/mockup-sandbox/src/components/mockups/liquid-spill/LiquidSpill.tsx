import './_group.css';
import './liquid-spill.css';

/** Improved decorative chrome system — one large background shape per
 *  visible-window section. Chrome PNGs used at 2–4× their "normal" accent
 *  size, bleeding off a viewport edge, sitting behind the real content.
 *  Compare against Current.tsx:
 *    Current  → shapes are small centred visuals in their own column
 *    This     → same shapes at 4–5× scale as atmospheric section backgrounds */
export default function LiquidSpill() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }} className="font-space-grotesk">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[640px] flex items-center pt-20 overflow-hidden">
        <div className="hero-grid" />

        {/* BIG background shape — blob at 700px, right-edge bleed.
            /chrome/* is the correct static-asset path for the mockup sandbox. */}
        <img
          src="/chrome/blob-iridescent-3.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-y-0 my-auto pointer-events-none select-none"
          style={{
            width: 700,
            height: 'auto',
            right: -80,
            opacity: 0.52,
          }}
        />

        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0">
            <span className="font-oxanium text-[11px] tracking-[0.25em] text-white/40 mb-6 uppercase">
              Международная недвижимость
            </span>
            <h1 className="font-oxanium text-5xl md:text-7xl lg:text-[72px] font-light leading-[1.05] chrome-text mb-6 tracking-tight section-reveal-heading">
              Ваш капитал <br /> заслуживает <br />
              <span className="chrome-text-accent font-bold">свободы</span>
            </h1>
            <p className="font-space-grotesk text-lg text-white/55 max-w-lg mb-12 leading-relaxed">
              Инвестиции в зарубежную недвижимость — ОАЭ, Турция, Кипр, Грузия, Португалия
            </p>
            <div className="flex flex-wrap gap-4 mb-16">
              <a href="#" className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider">
                Подобрать объект
              </a>
              <a href="#" className="eom-btn-ghost font-oxanium text-sm uppercase tracking-wider">
                Бесплатная консультация
              </a>
            </div>
            <div className="flex gap-10 pt-4 border-t border-white/8 w-full max-w-md">
              {[['847','сделок'],['12','стран'],['₽0','комиссии']].map(([n,l]) => (
                <div key={l}>
                  <p className="font-oxanium text-xl chrome-text font-bold">{n}</p>
                  <p className="font-space-grotesk text-xs text-white/35 uppercase tracking-wider">{l}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Empty right col — the blob above IS the right-column decoration */}
          <div className="lg:col-span-5 hidden lg:block" />
        </div>
      </section>

      {/* ─── WHY US ───────────────────────────────────────────────────────── */}
      <section id="why-us" className="py-24 bg-[#0f0f0f] relative overflow-hidden">
        {/* BIG background shape — ring at 520px, bottom-left bleed */}
        <img
          src="/chrome/ring-chrome.png"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            width: 520,
            height: 'auto',
            bottom: -120,
            left: -100,
            opacity: 0.32,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-oxanium text-3xl md:text-[40px] text-white mb-16 section-reveal-heading">
            Почему нас выбирают
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: 'Юридическая чистота', desc: 'Каждый объект проходит полную проверку права собственности.' },
              { title: 'Локальные партнёры', desc: 'fäm Properties (ОАЭ), H&S Real Estate (Кипр/Турция), Knight Frank.' },
              { title: 'Сделка за 14 дней', desc: 'От первого звонка до подписания договора — в среднем 14 дней.' },
            ].map(({ title, desc }, i) => (
              <div key={i} className="flex flex-col">
                <div className="feature-icon-wrapper chrome-bg-gradient shadow-[0_0_20px_rgba(120,200,255,0.2)]">
                  <div className="feature-icon-inner w-5 h-5 rounded-sm bg-current" />
                </div>
                <h3 className="font-oxanium text-[18px] text-white mb-4">{title}</h3>
                <p className="font-space-grotesk text-[15px] text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section id="cta" className="py-32 bg-[#080808] relative overflow-hidden">
        {/* BIG background shape — spike at 560px, top-right bleed */}
        <img
          src="/chrome/spike-chrome.png"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            width: 560,
            height: 'auto',
            top: -80,
            right: -90,
            opacity: 0.28,
          }}
        />

        <div className="container mx-auto px-6 flex items-center justify-center relative z-10">
          <div className="relative flex flex-col items-center justify-center py-20">
            <div className="relative z-20 text-center bg-black/48 backdrop-blur-2xl px-10 py-12 border border-white/12 rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(120,180,255,0.1)] max-w-[320px] w-full">
              <h3 className="font-oxanium text-[28px] chrome-text mt-2 mb-8 max-w-[250px] mx-auto leading-tight">
                Первая консультация бесплатно
              </h3>
              <a href="#" className="eom-btn-ghost w-full font-oxanium tracking-wide justify-center">
                Записаться
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─────────────────────────────────────────────────── */}
      <section id="testimonials" className="py-24 bg-[#080808] relative overflow-hidden">
        {/* BIG background shape — drip at 480px, left bleed */}
        <img
          src="/chrome/drip-chrome.png"
          alt=""
          aria-hidden="true"
          className="absolute pointer-events-none select-none"
          style={{
            width: 480,
            height: 'auto',
            top: '50%',
            left: -120,
            transform: 'translateY(-50%) rotate(-12deg)',
            opacity: 0.30,
          }}
        />

        <div className="container mx-auto px-6 relative z-10">
          <div className="testimonial-card max-w-md" style={{ borderColor: 'rgba(140,200,255,0.12)' }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full chrome-bg-gradient flex items-center justify-center flex-shrink-0">
                <span className="font-oxanium text-xs text-white font-bold">В.М.</span>
              </div>
              <div>
                <p className="font-oxanium text-white text-sm">Виктор М.</p>
                <p className="font-space-grotesk text-xs text-white/40">Москва → Дубай</p>
              </div>
            </div>
            <p className="font-space-grotesk text-[15px] text-white/65 leading-relaxed">
              «За 11 дней закрыли сделку на апартаменты в Downtown Dubai.»
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
