import './_group.css';
import { ChromeShape } from './ChromeShape';

/** Faithful extraction of the live EstateofMind decorative chrome system —
 *  Hero visual column, "Why us" spike accent + spill glow, and the
 *  consultation CTA card. Exact classes/colors/images from
 *  artifacts/gory-resort/src/pages/Home.tsx + index.css. This is the
 *  baseline the "Liquid Spill" variant is compared against. */
export default function Current() {
  return (
    <div style={{ background: '#080808', minHeight: '100vh' }} className="font-space-grotesk">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[640px] flex items-center pt-20 overflow-hidden">
        <div className="hero-grid" />
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
          </div>

          <div className="lg:col-span-5 relative h-[400px] lg:h-[520px] flex items-center justify-center mt-4 lg:mt-0">
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
              <div
                style={{
                  width: 'min(480px, 88vw)',
                  height: 'min(480px, 88vw)',
                  background: 'conic-gradient(from 0deg, #4a00e0, #8e2de2, #f000ff, #00c9ff, #92fe9d, #4a00e0)',
                  filter: 'blur(90px)',
                  opacity: 0.22,
                  borderRadius: '50%',
                }}
              />
            </div>
            <img
              src="/__mockup/chrome/blob-iridescent-3.png"
              alt=""
              className="animate-float relative z-10 drop-shadow-[0_0_60px_rgba(120,80,255,0.4)]"
              style={{ width: 'clamp(240px, 36vw, 440px)', height: 'auto', pointerEvents: 'none' }}
            />
            <img
              src="/__mockup/chrome/spike-chrome.png"
              alt=""
              className="animate-float-small absolute z-20 opacity-80 hidden sm:block"
              style={{ width: '80px', bottom: '14%', right: '6%', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.25))' }}
            />
            <ChromeShape
              variant="ring"
              size={52}
              breathe={true}
              iridescent={false}
              className="absolute z-20 opacity-60 hidden sm:block"
              style={{ top: '18%', left: '4%' }}
            />
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-24 bg-[#0f0f0f] relative overflow-hidden">
        <div className="iridescent-spill w-[500px] h-[500px] absolute -bottom-[250px] -left-[250px] opacity-25 z-0 pointer-events-none" />
        <ChromeShape
          variant="spike"
          size={68}
          breathe={true}
          float={true}
          iridescent={false}
          className="absolute top-10 right-[8%] opacity-35 pointer-events-none hidden lg:block"
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
                <div className="feature-icon-wrapper chrome-bg-gradient shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  <div className="feature-icon-inner w-5 h-5 rounded-sm bg-current" />
                </div>
                <h3 className="font-oxanium text-[18px] text-white mb-4">{title}</h3>
                <p className="font-space-grotesk text-[15px] text-white/50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 bg-[#080808] relative overflow-hidden">
        <div className="container mx-auto px-6 flex items-center justify-center">
          <div className="relative flex flex-col items-center justify-center py-20">
            <div className="iridescent-spill w-[380px] h-[380px] absolute z-0 opacity-28 mix-blend-screen pointer-events-none" />
            <div className="chrome-blob w-[260px] h-[260px] absolute z-10 animate-float-small opacity-72 pointer-events-none" />
            <ChromeShape
              variant="star4"
              size={46}
              breathe={true}
              iridescent={true}
              className="absolute z-20 opacity-80 hidden md:block"
              style={{ top: '12%', right: '-4%' }}
            />
            <div className="relative z-20 text-center bg-black/48 backdrop-blur-2xl px-10 py-12 border border-white/12 rounded-3xl shadow-[0_8px_60px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.08)] max-w-[320px] w-full">
              <ChromeShape
                variant="orb"
                size={36}
                breathe={true}
                iridescent={true}
                className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-90"
              />
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

      {/* ─── Testimonials strip (shows current chrome-bg-gradient avatar + ring) ─── */}
      <section className="py-24 bg-[#080808] relative overflow-hidden">
        <ChromeShape
          variant="ring"
          size={80}
          breathe={true}
          iridescent={true}
          float={true}
          className="absolute bottom-12 left-[5%] opacity-25 pointer-events-none hidden lg:block"
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="testimonial-card max-w-md">
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
