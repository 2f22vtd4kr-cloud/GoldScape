import React, { useEffect, useState } from 'react';
import { Shield, Globe, Zap, Bed, Bath, ArrowRight, MessageCircle, Send } from 'lucide-react';
import './_group.css';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#080808] text-white min-h-screen font-space-grotesk overflow-x-hidden selection:bg-white/20 selection:text-white">
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --eom-bg: #080808;
          --eom-bg-2: #141414;
          --eom-border: rgba(255,255,255,0.08);
          --oxanium: 'Oxanium', sans-serif;
          --space: 'Space Grotesk', sans-serif;
        }
        
        .font-oxanium { font-family: var(--oxanium); }
        .font-space-grotesk { font-family: var(--space); }

        .eom-nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 50;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(8, 8, 8, 0.6);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: all 0.3s ease;
        }
        
        .eom-nav.scrolled {
          padding: 1rem 2rem;
          background: rgba(8, 8, 8, 0.85);
          border-bottom: 1px solid var(--eom-border);
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 80px 80px;
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 80%);
          pointer-events: none;
          z-index: 0;
        }

        @keyframes float-blob {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }

        .animate-float {
          animation: float-blob 6s ease-in-out infinite;
        }
        
        @keyframes float-blob-small {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(3deg); }
        }
        
        .animate-float-small {
          animation: float-blob-small 5s ease-in-out infinite;
        }

        .iridescent-line {
          height: 1px;
          width: 100%;
          background: conic-gradient(from 90deg at 50% 50%, #4a00e0, #8e2de2, #f000ff, #00c9ff, #92fe9d, #4a00e0);
          opacity: 0.5;
        }

        .nav-link {
          position: relative;
          color: rgba(255,255,255,0.7);
          transition: color 0.3s ease;
          font-size: 14px;
          text-decoration: none;
        }
        .nav-link:hover {
          color: white;
        }
        .nav-link.active {
          color: white;
        }
        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1px;
          background: conic-gradient(from 90deg at 50% 50%, #4a00e0, #8e2de2, #f000ff, #00c9ff);
        }

        .dest-card {
          background: var(--eom-bg-2);
          border: 1px solid var(--eom-border);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        
        .dest-card::before {
          content: '';
          position: absolute;
          top: 12px;
          right: 12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: conic-gradient(from 0deg, #4a00e0, #8e2de2, #f000ff, #00c9ff, #4a00e0);
          opacity: 0;
          transform: scale(0.5);
          transition: all 0.3s ease;
        }

        .dest-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.25);
          box-shadow: 0 12px 30px -10px rgba(0,0,0,0.5);
        }
        
        .dest-card:hover::before {
          opacity: 1;
          transform: scale(1);
        }

        .feature-icon-wrapper {
          width: 40px;
          height: 40px;
          transform: rotate(45deg);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .feature-icon-inner {
          transform: rotate(-45deg);
          color: #080808;
        }

        .prop-grad-1 { background: radial-gradient(circle at top right, #c8933a, #1a1408); }
        .prop-grad-2 { background: radial-gradient(circle at top right, #1a3a5c, #0a0f1a); }
        .prop-grad-3 { background: radial-gradient(circle at top right, #1a4a3a, #080f0c); }

        .process-line {
          position: absolute;
          left: 19px;
          top: 40px;
          bottom: -20px;
          width: 1px;
          background: rgba(255,255,255,0.12);
        }
        .process-item:last-child .process-line {
          display: none;
        }
        
        /* Utility classes overrides / fallbacks if not in _group.css */
        .chrome-text {
          background: linear-gradient(to bottom, #ffffff 0%, #a0a0a0 50%, #ffffff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        .iridescent-text {
          background: conic-gradient(from 90deg at 50% 50%, #4a00e0, #8e2de2, #f000ff, #00c9ff, #92fe9d, #4a00e0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        .chrome-blob {
          background: radial-gradient(circle at 30% 30%, #ffffff 0%, #b0b0b0 20%, #404040 60%, #101010 100%);
          box-shadow: inset 10px 10px 20px rgba(255,255,255,0.5), inset -10px -10px 20px rgba(0,0,0,0.8);
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation: morph 8s ease-in-out infinite;
        }
        .chrome-bg-gradient {
          background: linear-gradient(135deg, #e0e0e0 0%, #808080 50%, #d0d0d0 100%);
        }
        .iridescent-spill {
          background: conic-gradient(from 0deg, #4a00e0, #8e2de2, #f000ff, #00c9ff, #92fe9d, #4a00e0);
          filter: blur(80px);
          border-radius: 50%;
          animation: spin 10s linear infinite;
        }
        @keyframes morph {
          0%, 100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
          34% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; }
          67% { border-radius: 100% 60% 60% 100% / 100% 100% 60% 60%; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .eom-btn-primary {
          background: linear-gradient(135deg, #ffffff 0%, #d0d0d0 100%);
          color: #080808;
          padding: 12px 24px;
          border-radius: 30px;
          font-weight: 600;
          transition: all 0.3s;
          border: none;
        }
        .eom-btn-primary:hover {
          box-shadow: 0 0 20px rgba(255,255,255,0.3);
          transform: scale(1.02);
        }
        .eom-btn-ghost {
          background: transparent;
          color: #fff;
          padding: 12px 24px;
          border-radius: 30px;
          border: 1px solid rgba(255,255,255,0.2);
          transition: all 0.3s;
        }
        .eom-btn-ghost:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.4);
        }
      `}} />

      {/* 1. NAV */}
      <nav className={`eom-nav ${isScrolled ? 'scrolled' : ''}`}>
        <div className="flex items-center">
          <span className="font-oxanium text-[22px] font-bold chrome-text tracking-wide">
            EstateofMind
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="nav-link font-space-grotesk tracking-wide uppercase text-xs">О нас</a>
          <a href="#properties" className="nav-link font-space-grotesk tracking-wide uppercase text-xs active">Объекты</a>
          <a href="#countries" className="nav-link font-space-grotesk tracking-wide uppercase text-xs">Страны</a>
          <a href="#consult" className="nav-link font-space-grotesk tracking-wide uppercase text-xs">Консультация</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-space-grotesk opacity-60">
            <span className="text-white font-medium cursor-pointer">RU</span>
            <span>|</span>
            <span className="cursor-pointer hover:text-white transition-colors">EN</span>
          </div>
          <button className="md:hidden text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </button>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="relative min-h-[100dvh] flex items-center pt-20 overflow-hidden">
        <div className="hero-grid"></div>
        
        <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 flex flex-col items-start pt-10 lg:pt-0">
            <span className="font-oxanium text-[11px] tracking-[0.25em] text-white/40 mb-6 uppercase">
              Международная недвижимость
            </span>
            
            <h1 className="font-oxanium text-5xl md:text-7xl lg:text-[88px] font-light leading-[1.05] chrome-text mb-6 tracking-tight">
              Ваш капитал <br/> заслуживает <br/> свободы
            </h1>
            
            <p className="font-space-grotesk text-lg text-white/55 max-w-lg mb-12 leading-relaxed">
              Инвестиции в зарубежную недвижимость — ОАЭ, Турция, Кипр, Грузия
            </p>
            
            <div className="flex flex-wrap gap-4 mb-16">
              <button className="eom-btn-primary font-oxanium text-sm uppercase tracking-wider">
                Подобрать объект
              </button>
              <button className="eom-btn-ghost font-oxanium text-sm uppercase tracking-wider">
                Бесплатная консультация
              </button>
            </div>
            
            <div className="flex items-center gap-4 text-white/45 font-oxanium text-[13px] uppercase tracking-wider">
              <span>847 сделок</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>12 стран</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>₽0 комиссии для покупателя</span>
            </div>
          </div>
          
          <div className="lg:col-span-5 relative h-[400px] lg:h-[600px] flex items-center justify-center mt-12 lg:mt-0">
            {/* Ambient iridescent glow behind the blob */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div style={{
                width: '480px', height: '480px',
                background: 'conic-gradient(from 0deg, #4a00e0, #8e2de2, #f000ff, #00c9ff, #92fe9d, #4a00e0)',
                filter: 'blur(90px)',
                opacity: 0.22,
                borderRadius: '50%',
              }} />
            </div>
            
            {/* Real 3D chrome blob image */}
            <img
              src={`${import.meta.env.BASE_URL}chrome/blob-iridescent-3.png`}
              alt=""
              className="animate-float relative z-10 drop-shadow-[0_0_60px_rgba(120,80,255,0.4)]"
              style={{ width: 'clamp(280px, 38vw, 520px)', height: 'auto', pointerEvents: 'none' }}
            />

            {/* Secondary floating accent */}
            <img
              src={`${import.meta.env.BASE_URL}chrome/spike-chrome.png`}
              alt=""
              className="animate-float-small absolute z-20 opacity-80"
              style={{ width: '90px', bottom: '10%', right: '8%', filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.25))' }}
            />
          </div>
          
        </div>
      </section>

      {/* 3. DESTINATIONS STRIP */}
      <section id="countries" className="py-24 bg-[#080808] relative z-10">
        <div className="container mx-auto px-6 mb-12">
          <h2 className="font-oxanium text-3xl md:text-[32px] chrome-text mb-2">Куда переезжают</h2>
          <p className="font-space-grotesk text-sm text-white/40">Топ-6 направлений 2026 года</p>
        </div>
        
        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="container mx-auto px-6">
          <div className="flex overflow-x-auto pb-8 -mx-6 px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-3 xl:grid-cols-6 gap-4 snap-x hide-scrollbar">
            
            {[
              { flag: '🇦🇪', country: 'ОАЭ', city: 'Дубай', price: '$380,000' },
              { flag: '🇹🇷', country: 'Турция', city: 'Стамбул', price: '$120,000' },
              { flag: '🇨🇾', country: 'Кипр', city: 'Лимасол', price: '€180,000' },
              { flag: '🇬🇪', country: 'Грузия', city: 'Батуми', price: '$65,000' },
              { flag: '🇹🇭', country: 'Таиланд', city: 'Пхукет', price: '$95,000' },
              { flag: '🇷🇸', country: 'Сербия', city: 'Белград', price: '€85,000' },
            ].map((dest, i) => (
              <div key={i} className="dest-card min-w-[240px] lg:min-w-0 snap-start flex flex-col justify-between h-[160px]">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{dest.flag}</span>
                  <div>
                    <h3 className="font-oxanium text-white font-medium text-lg">{dest.country}</h3>
                    <p className="font-space-grotesk text-white/50 text-sm">{dest.city}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-space-grotesk text-white/40 text-xs mb-1">от</p>
                  <p className="font-oxanium text-white text-xl tracking-wide">{dest.price}</p>
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </section>

      {/* 4. WHY ESTATEOFMIND */}
      <section id="about" className="py-24 bg-[var(--eom-bg-2)] relative overflow-hidden">
        <div className="iridescent-spill w-[500px] h-[500px] absolute -bottom-[250px] -left-[250px] opacity-25 z-0 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="font-oxanium text-3xl md:text-[40px] text-white mb-16">Почему нас выбирают</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            <div className="flex flex-col">
              <div className="feature-icon-wrapper chrome-bg-gradient shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <Shield className="feature-icon-inner w-5 h-5" />
              </div>
              <h3 className="font-oxanium text-[18px] text-white mb-4">Юридическая чистота</h3>
              <p className="font-space-grotesk text-[15px] text-white/50 leading-relaxed">
                Каждый объект проходит полную проверку права собственности. Мы работаем с нотариусами и юристами в каждой стране.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="feature-icon-wrapper chrome-bg-gradient shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <Globe className="feature-icon-inner w-5 h-5" />
              </div>
              <h3 className="font-oxanium text-[18px] text-white mb-4">Локальные партнёры</h3>
              <p className="font-space-grotesk text-[15px] text-white/50 leading-relaxed">
                fäm Properties (ОАЭ), H&S Real Estate (Кипр/Турция) и другие аккредитованные агентства. Выход на реальный рынок, не витрину.
              </p>
            </div>
            
            <div className="flex flex-col">
              <div className="feature-icon-wrapper chrome-bg-gradient shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                <Zap className="feature-icon-inner w-5 h-5" />
              </div>
              <h3 className="font-oxanium text-[18px] text-white mb-4">Сделка за 14 дней</h3>
              <p className="font-space-grotesk text-[15px] text-white/50 leading-relaxed">
                От первого звонка до подписания договора — в среднем 14 рабочих дней. Сопровождение на каждом шаге.
              </p>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. TRUST METRICS BAR */}
      <section className="bg-[#080808] relative">
        <div className="iridescent-line"></div>
        
        <div className="container mx-auto px-6 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x-0 md:divide-x divide-white/10">
            
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-oxanium text-4xl md:text-[56px] chrome-text mb-2">₽12 млрд+</span>
              <span className="font-space-grotesk text-[13px] text-white/40 uppercase tracking-wider max-w-[180px]">
                Общая стоимость закрытых сделок
              </span>
            </div>
            
            <div className="flex flex-col items-center text-center px-4">
              <span className="font-oxanium text-4xl md:text-[56px] chrome-text mb-2">847</span>
              <span className="font-space-grotesk text-[13px] text-white/40 uppercase tracking-wider max-w-[180px]">
                Семей, нашедших новый дом
              </span>
            </div>
            
            <div className="flex flex-col items-center text-center px-4 mt-8 md:mt-0">
              <span className="font-oxanium text-4xl md:text-[56px] chrome-text mb-2">12</span>
              <span className="font-space-grotesk text-[13px] text-white/40 uppercase tracking-wider max-w-[180px]">
                Стран присутствия
              </span>
            </div>
            
            <div className="flex flex-col items-center text-center px-4 mt-8 md:mt-0">
              <span className="font-oxanium text-4xl md:text-[56px] chrome-text mb-2">2019</span>
              <span className="font-space-grotesk text-[13px] text-white/40 uppercase tracking-wider max-w-[180px]">
                Год основания
              </span>
            </div>
            
          </div>
        </div>
        
        <div className="iridescent-line"></div>
      </section>

      {/* 6. PROCESS TEASER */}
      <section id="consult" className="py-32 bg-[#080808] relative overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          
          <div>
            <h2 className="font-oxanium text-3xl md:text-[40px] text-white mb-16">Как это работает</h2>
            
            <div className="flex flex-col gap-10 relative">
              {[
                { num: "01", title: "Консультация", desc: "Анализ задач, бюджета и предпочтений. Подбор оптимальной юрисдикции." },
                { num: "02", title: "Подбор объектов", desc: "Предоставляем шорт-лист из закрытой базы с расчетом доходности." },
                { num: "03", title: "Юридическое сопровождение", desc: "Проверка застройщика или собственника, подготовка документов." },
                { num: "04", title: "Закрытие сделки", desc: "Безопасный перевод средств, регистрация права собственности." }
              ].map((step, i) => (
                <div key={i} className="process-item relative flex gap-6 z-10">
                  <div className="process-line"></div>
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/20 flex items-center justify-center shrink-0 shadow-[inset_0_2px_10px_rgba(255,255,255,0.1)] relative z-10 bg-[#080808]">
                    <span className="font-oxanium text-sm chrome-text">{step.num}</span>
                  </div>
                  <div className="pt-2">
                    <h4 className="font-space-grotesk text-[18px] text-white mb-2">{step.title}</h4>
                    <p className="font-space-grotesk text-[14px] text-white/40 max-w-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative flex flex-col items-center justify-center py-20">
            <div className="iridescent-spill w-[400px] h-[400px] absolute z-0 opacity-30 mix-blend-screen"></div>
            <div className="chrome-blob w-[280px] h-[280px] absolute z-10 animate-float-small opacity-80"></div>
            
            <div className="relative z-20 text-center bg-black/40 backdrop-blur-xl p-10 border border-white/10 rounded-3xl shadow-2xl">
              <h3 className="font-oxanium text-[28px] chrome-text mb-8 max-w-[250px] mx-auto leading-tight">
                Первая консультация бесплатно
              </h3>
              <button className="eom-btn-ghost w-full font-oxanium tracking-wide">
                Записаться
              </button>
            </div>
          </div>
          
        </div>
      </section>

      {/* 7. FEATURED PROPERTIES */}
      <section id="properties" className="py-24 bg-[var(--eom-bg-2)] relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <h2 className="font-oxanium text-3xl md:text-[36px] text-white">Избранные объекты</h2>
            <a href="#" className="font-space-grotesk text-sm text-white/60 hover:text-white transition-colors flex items-center gap-2 group">
              Смотреть все объекты
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-colors">
              <div className="aspect-[3/2] prop-grad-1 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-space-grotesk">
                  🇦🇪 Дубай, ОАЭ
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-space-grotesk">
                  Апартаменты
                </div>
              </div>
              <div className="p-6">
                <p className="font-oxanium text-[28px] chrome-text mb-6">$2,400,000</p>
                <p className="font-space-grotesk text-sm text-white/60 mb-6">Palm Jumeirah</p>
                <div className="flex items-center gap-6 text-sm text-white/40 font-space-grotesk border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>3 спальни</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    <span>2 ванные</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>210м²</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 2 */}
            <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-colors">
              <div className="aspect-[3/2] prop-grad-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-space-grotesk">
                  🇨🇾 Лимасол, Кипр
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-space-grotesk">
                  Вилла
                </div>
              </div>
              <div className="p-6">
                <p className="font-oxanium text-[28px] chrome-text mb-6">€680,000</p>
                <p className="font-space-grotesk text-sm text-white/60 mb-6">Панорамный вид на море</p>
                <div className="flex items-center gap-6 text-sm text-white/40 font-space-grotesk border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>3 спальни</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    <span>3 ванные</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>240м²</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card 3 */}
            <div className="bg-[#080808] border border-white/10 rounded-2xl overflow-hidden group cursor-pointer hover:border-white/20 transition-colors">
              <div className="aspect-[3/2] prop-grad-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs px-3 py-1.5 rounded-full font-space-grotesk">
                  🇬🇪 Батуми, Грузия
                </div>
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full font-space-grotesk">
                  Апартаменты
                </div>
              </div>
              <div className="p-6">
                <p className="font-oxanium text-[28px] chrome-text mb-6">$95,000</p>
                <p className="font-space-grotesk text-sm text-white/60 mb-6">Морской фронт</p>
                <div className="flex items-center gap-6 text-sm text-white/40 font-space-grotesk border-t border-white/5 pt-4">
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>2 спальни</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    <span>1 ванная</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>72м²</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-1">
              <span className="font-oxanium text-2xl font-bold chrome-text tracking-wide block mb-6">
                EstateofMind
              </span>
              <p className="font-space-grotesk text-sm text-white/40 max-w-xs">
                Ваш капитал заслуживает свободы. Инвестиции в зарубежную недвижимость с полным сопровождением.
              </p>
            </div>
            
            <div>
              <h4 className="font-oxanium text-white mb-6 uppercase tracking-wider text-sm">Направления</h4>
              <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">ОАЭ (Дубай)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Турция (Стамбул)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Кипр (Лимасол)</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Грузия (Батуми)</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-oxanium text-white mb-6 uppercase tracking-wider text-sm">Услуги</h4>
              <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-white/40">
                <li><a href="#" className="hover:text-white transition-colors">Подбор недвижимости</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Юридическое сопровождение</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Помощь с ВНЖ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Управление объектами</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-oxanium text-white mb-6 uppercase tracking-wider text-sm">Компания</h4>
              <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-white/40 mb-8">
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Блог</a></li>
              </ul>
              
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <MessageCircle className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <Send className="w-5 h-5" />
                </a>
              </div>
            </div>
            
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/5 font-space-grotesk text-xs text-white/30 gap-4">
            <p>
              ©2026 <span className="iridescent-text font-medium">EstateofMind</span>. Все права защищены.
            </p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white/60 transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white/60 transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
