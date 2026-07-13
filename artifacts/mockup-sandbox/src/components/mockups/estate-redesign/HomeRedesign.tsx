import React, { useState, useEffect } from 'react';
import { 
  Shield, Globe, Zap, ArrowRight, Menu, X, ChevronRight, CheckCircle2,
  Phone, Send, MapPin, BedDouble, Bath, Maximize
} from 'lucide-react';

const chromeText = {
  background: 'linear-gradient(135deg, #ffffff 0%, #d8d8d8 22%, #888888 45%, #cccccc 68%, #ffffff 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
};

const HomeRedesign = () => {
  return (
    <div style={{ background: '#080808', minHeight: '100vh', color: 'white', fontFamily: '"Space Grotesk", sans-serif', overflowX: 'hidden', position: 'relative' }}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;600;700&family=Space+Grotesk:wght@300;400;500;600&display=swap');
        .font-oxanium { font-family: 'Oxanium', display; }
        .font-space { font-family: 'Space Grotesk', sans-serif; }
        .glass-panel { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); backdrop-filter: blur(12px); }
        .chrome-border { border: 1px solid transparent; background: linear-gradient(#080808, #080808) padding-box, linear-gradient(135deg, #ffffff 0%, #888888 45%, #cccccc 68%, #ffffff 100%) border-box; }
        .glow-orb { position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.4; z-index: 0; pointer-events: none; }
        .glow-purple { background: radial-gradient(circle, rgba(124,58,237,0.5) 0%, rgba(0,0,0,0) 70%); }
        .glow-blue { background: radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(0,0,0,0) 70%); }
        .grid-bg { background-size: 80px 80px; background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px); }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}} />
      
      {/* Background elements */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
      
      {/* 1. Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b-0 border-white/5 py-4 px-6 md:px-12 flex justify-between items-center" style={{ background: 'rgba(8,8,8,0.85)', backdropFilter: 'blur(16px)' }}>
        <div className="font-oxanium text-xl md:text-2xl font-bold tracking-wider" style={chromeText}>
          EstateofMind
        </div>
        <div className="hidden md:flex gap-8 text-sm text-white/70 font-space font-medium tracking-wide">
          <a href="#" className="hover:text-white transition-colors">Главная</a>
          <a href="#" className="hover:text-white transition-colors">Как мы работаем</a>
          <a href="#" className="hover:text-white transition-colors">Объекты</a>
        </div>
        <button className="hidden md:flex px-5 py-2.5 rounded-full chrome-border text-sm font-medium hover:bg-white/5 transition-colors">
          Консультация
        </button>
        <button className="md:hidden text-white/70">
          <Menu size={24} />
        </button>
      </nav>

      {/* 2. Hero */}
      <section className="relative pt-40 pb-24 md:pt-56 md:pb-32 px-6 md:px-12 max-w-7xl mx-auto z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 flex flex-col items-start space-y-8 relative z-10">
          <div className="uppercase tracking-[0.3em] text-[10px] md:text-xs text-white/40 font-oxanium">
            Международная недвижимость
          </div>
          <h1 className="text-5xl md:text-[84px] leading-[1.1] font-oxanium font-light tracking-tight" style={chromeText}>
            Ваш капитал<br />заслуживает<br />свободы
          </h1>
          <p className="text-lg md:text-xl text-white/60 font-space max-w-lg leading-relaxed">
            Инвестиции в зарубежную недвижимость — ОАЭ, Турция, Кипр, Грузия. Безопасно, конфиденциально, без скрытых комиссий.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <button className="px-8 py-4 rounded-full chrome-border font-space font-medium text-white hover:bg-white/5 transition-all text-center">
              Подобрать объект
            </button>
            <button className="px-8 py-4 rounded-full border border-white/10 hover:border-white/30 bg-white/5 hover:bg-white/10 font-space font-medium text-white transition-all text-center">
              Бесплатная консультация
            </button>
          </div>
          <div className="flex flex-wrap gap-8 pt-8 md:pt-12 text-sm font-space text-white/50 w-full border-t border-white/5 mt-4">
            <div className="flex items-center gap-2"><strong className="text-white text-lg">847</strong> <span className="uppercase text-[10px] tracking-wider">сделок</span></div>
            <div className="flex items-center gap-2"><strong className="text-white text-lg">12</strong> <span className="uppercase text-[10px] tracking-wider">стран</span></div>
            <div className="flex items-center gap-2"><strong className="text-white text-lg">₽0</strong> <span className="uppercase text-[10px] tracking-wider">комиссии</span></div>
          </div>
        </div>
        
        <div className="w-full md:w-2/5 mt-16 md:mt-0 relative flex justify-center h-[400px] md:h-[600px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] glow-orb glow-purple z-0"></div>
          <img src="/__mockup/images/blob-iridescent-3.png" alt="Hero abstraction" className="relative z-10 w-full max-w-[500px] object-contain animate-[spin_60s_linear_infinite]" />
          <img src="/__mockup/images/spike-chrome.png" alt="Spike accent" className="absolute bottom-10 right-10 w-24 md:w-32 z-20 opacity-80 mix-blend-screen drop-shadow-2xl translate-y-4 hover:translate-y-0 transition-transform duration-500" />
        </div>
      </section>

      {/* 3. Destinations Strip */}
      <section className="py-24 relative z-10">
        <div className="px-6 md:px-12 max-w-7xl mx-auto mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-[40px] font-oxanium tracking-tight mb-3" style={chromeText}>Куда переезжают</h2>
            <p className="text-white/50 font-space">Топ-6 направлений 2026 года</p>
          </div>
        </div>
        
        <div className="flex overflow-x-auto scrollbar-hide px-6 md:px-12 gap-4 pb-8 -mx-6 md:-mx-12 md:grid md:grid-cols-6 md:overflow-visible">
          {[
            { country: "ОАЭ", city: "Дубай", price: "$380,000", img: "/__mockup/images/dest-dubai.jpg", flag: "🇦🇪" },
            { country: "Турция", city: "Стамбул", price: "$120,000", img: "", flag: "🇹🇷" },
            { country: "Кипр", city: "Лимасол", price: "€180,000", img: "/__mockup/images/dest-cyprus.jpg", flag: "🇨🇾" },
            { country: "Грузия", city: "Батуми", price: "$65,000", img: "/__mockup/images/dest-georgia.jpg", flag: "🇬🇪" },
            { country: "Таиланд", city: "Пхукет", price: "$95,000", img: "", flag: "🇹🇭" },
            { country: "Сербия", city: "Белград", price: "€85,000", img: "", flag: "🇷🇸" },
          ].map((dest, i) => (
            <div key={i} className="min-w-[240px] md:min-w-0 w-full h-[200px] md:h-[240px] relative rounded-2xl overflow-hidden glass-panel group shrink-0 transition-transform duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between p-5">
              {dest.img && (
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors z-10"></div>
                  <img src={dest.img} alt={dest.city} className="w-full h-full object-cover" />
                </div>
              )}
              {!dest.img && <div className="absolute inset-0 bg-[#0c0c0c] z-0"></div>}
              
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <h3 className="font-oxanium text-lg font-medium text-white">{dest.country}</h3>
                  <span className="text-xl">{dest.flag}</span>
                </div>
                <p className="font-space text-sm text-white/60 mt-1">{dest.city}</p>
              </div>
              
              <div className="relative z-10">
                <p className="font-space text-[10px] uppercase tracking-wider text-white/40 mb-1">От</p>
                <p className="font-oxanium font-bold text-lg" style={chromeText}>{dest.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why us */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <h2 className="text-3xl md:text-[40px] font-oxanium tracking-tight mb-16 text-center" style={chromeText}>Почему нас выбирают</h2>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 relative">
          <img src="/__mockup/images/blob-iridescent-1.png" alt="Decorative blob" className="absolute -top-32 -left-32 w-64 opacity-30 mix-blend-screen pointer-events-none" />
          
          <div className="flex flex-col items-center text-center p-8 glass-panel rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl chrome-border flex items-center justify-center mb-6">
              <Shield className="text-white/80" size={28} />
            </div>
            <h3 className="font-oxanium text-xl mb-4 text-white">Юридическая чистота</h3>
            <p className="font-space text-white/55 leading-relaxed text-sm">
              Полный Due Diligence объекта, проверка застройщика, сопровождение сделки и легализация средств в юрисдикции покупки.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 glass-panel rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl chrome-border flex items-center justify-center mb-6">
              <Globe className="text-white/80" size={28} />
            </div>
            <h3 className="font-oxanium text-xl mb-4 text-white">Локальные партнёры</h3>
            <p className="font-space text-white/55 leading-relaxed text-sm">
              Эксклюзивный доступ к закрытым стартам продаж через fäm Properties, H&S Real Estate и других топовых брокеров.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 glass-panel rounded-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 rounded-2xl chrome-border flex items-center justify-center mb-6">
              <Zap className="text-white/80" size={28} />
            </div>
            <h3 className="font-oxanium text-xl mb-4 text-white">Сделка за 14 дней</h3>
            <p className="font-space text-white/55 leading-relaxed text-sm">
              Выстроенный процесс от первого звонка до подписания договора и получения ключей или ВНЖ.
            </p>
          </div>
        </div>
      </section>

      {/* 5. Trust metrics */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
        
        <div className="px-6 md:px-12 max-w-7xl mx-auto py-12 flex flex-col md:flex-row justify-around items-center gap-12 md:gap-0 text-center relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[200px] glow-orb glow-blue opacity-20"></div>
          
          <div>
            <div className="text-5xl md:text-6xl font-oxanium font-light mb-2" style={chromeText}>$130M+</div>
            <div className="font-space text-xs uppercase tracking-widest text-white/40">Общая стоимость сделок</div>
          </div>
          
          <div className="hidden md:block w-[1px] h-16 bg-white/10"></div>
          
          <div>
            <div className="text-5xl md:text-6xl font-oxanium font-light mb-2" style={chromeText}>847</div>
            <div className="font-space text-xs uppercase tracking-widest text-white/40">Семей нашли новый дом</div>
          </div>
          
          <div className="hidden md:block w-[1px] h-16 bg-white/10"></div>
          
          <div>
            <div className="text-5xl md:text-6xl font-oxanium font-light mb-2" style={chromeText}>12</div>
            <div className="font-space text-xs uppercase tracking-widest text-white/40">Стран присутствия</div>
          </div>
          
          <div className="hidden md:block w-[1px] h-16 bg-white/10"></div>
          
          <div>
            <div className="text-5xl md:text-6xl font-oxanium font-light mb-2" style={chromeText}>2019</div>
            <div className="font-space text-xs uppercase tracking-widest text-white/40">Год основания</div>
          </div>
        </div>
      </section>

      {/* 6. Process */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-[40px] font-oxanium tracking-tight mb-12" style={chromeText}>Как мы работаем</h2>
            
            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-6 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent pl-16 md:pl-0">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-[#080808] text-white/70 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -ml-6 md:ml-0 group-hover:border-white/50 group-hover:text-white transition-colors duration-500 font-oxanium text-lg">
                  1
                </div>
                <div className="w-full md:w-[calc(50%-3rem)] glass-panel p-6 rounded-2xl md:group-odd:text-right group-hover:bg-white/[0.05] transition-colors duration-500">
                  <h4 className="font-oxanium text-lg text-white mb-2">Консультация</h4>
                  <p className="font-space text-sm text-white/50 leading-relaxed">Определяем цели покупки: ВНЖ, инвестиции или переезд. Подбираем стратегию и юрисдикцию.</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-[#080808] text-white/70 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -ml-6 md:ml-0 group-hover:border-white/50 group-hover:text-white transition-colors duration-500 font-oxanium text-lg">
                  2
                </div>
                <div className="w-full md:w-[calc(50%-3rem)] glass-panel p-6 rounded-2xl md:group-odd:text-right group-hover:bg-white/[0.05] transition-colors duration-500">
                  <h4 className="font-oxanium text-lg text-white mb-2">Подбор</h4>
                  <p className="font-space text-sm text-white/50 leading-relaxed">Формируем шорт-лист из 3-5 проверенных объектов. Организуем онлайн-показ или тур на месте.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-[#080808] text-white/70 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -ml-6 md:ml-0 group-hover:border-white/50 group-hover:text-white transition-colors duration-500 font-oxanium text-lg">
                  3
                </div>
                <div className="w-full md:w-[calc(50%-3rem)] glass-panel p-6 rounded-2xl md:group-odd:text-right group-hover:bg-white/[0.05] transition-colors duration-500">
                  <h4 className="font-oxanium text-lg text-white mb-2">Сделка</h4>
                  <p className="font-space text-sm text-white/50 leading-relaxed">Юридическая проверка, безопасный перевод средств (в т.ч. крипто), подписание договора.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-12 h-12 rounded-full border border-white/20 bg-[#080808] text-white/70 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 absolute left-0 md:left-1/2 -ml-6 md:ml-0 group-hover:border-white/50 group-hover:text-white transition-colors duration-500 font-oxanium text-lg">
                  4
                </div>
                <div className="w-full md:w-[calc(50%-3rem)] glass-panel p-6 rounded-2xl md:group-odd:text-right group-hover:bg-white/[0.05] transition-colors duration-500">
                  <h4 className="font-oxanium text-lg text-white mb-2">Ключи и ВНЖ</h4>
                  <p className="font-space text-sm text-white/50 leading-relaxed">Пост-продажный сервис, оформление ВНЖ, передача в управление для сдачи в аренду.</p>
                </div>
              </div>

            </div>
          </div>
          
          <div className="w-full lg:w-1/2 flex justify-center relative mt-12 lg:mt-0">
            <div className="absolute w-[300px] h-[300px] glow-orb glow-purple top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
            <img src="/__mockup/images/ring-chrome.png" alt="Decorative ring" className="absolute -top-12 -right-6 w-32 md:w-48 animate-[bounce_8s_infinite] opacity-80" />
            
            <div className="glass-panel w-full max-w-md p-8 md:p-12 rounded-[2rem] relative z-10 flex flex-col items-center text-center shadow-2xl shadow-black/50 border-t-white/20">
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Phone className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-oxanium mb-3 text-white">Первая консультация бесплатно</h3>
              <p className="font-space text-sm text-white/50 mb-8">Разберем вашу ситуацию конфиденциально и предложим 2-3 стратегии инвестирования.</p>
              
              <div className="w-full space-y-4">
                <input type="text" placeholder="Ваше имя" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white font-space placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors" />
                <input type="tel" placeholder="Телефон / WhatsApp" className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white font-space placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors" />
                <button className="w-full chrome-border text-white font-space font-medium rounded-xl px-5 py-4 flex items-center justify-center gap-2 hover:bg-white/5 transition-all group">
                  <span>Обсудить задачу</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            
            <img src="/__mockup/images/drip-chrome.png" alt="Decorative drip" className="absolute -bottom-10 -left-6 w-24 md:w-32 animate-[pulse_6s_infinite] opacity-60 z-20" />
          </div>
        </div>
      </section>

      {/* 7. Featured properties */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <h2 className="text-3xl md:text-[40px] font-oxanium tracking-tight" style={chromeText}>Избранные объекты</h2>
          <a href="#" className="font-space text-sm text-white/60 hover:text-white flex items-center gap-1 transition-colors group">
            Смотреть все <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { img: "/__mockup/images/prop-dubai.jpg", loc: "Дубай, ОАЭ", type: "Апартаменты", name: "Kempinski Residences", dist: "The Creek", price: "$650,000", beds: 2, baths: 2, sqft: 124 },
            { img: "/__mockup/images/prop-cyprus.jpg", loc: "Лимасол, Кипр", type: "Вилла", name: "Azure Heights", dist: "Mouttagiaka", price: "€1,200,000", beds: 4, baths: 3, sqft: 280 },
            { img: "/__mockup/images/prop-georgia.jpg", loc: "Батуми, Грузия", type: "Пентхаус", name: "Alliance Centropolis", dist: "New Boulevard", price: "$320,000", beds: 3, baths: 2, sqft: 165 },
          ].map((prop, i) => (
            <div key={i} className="glass-panel rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full bg-[#080808]">
              <div className="relative h-[240px] overflow-hidden shrink-0">
                <img src={prop.img} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="glass-panel px-3 py-1 rounded-full text-[10px] font-space tracking-wider uppercase text-white/90 backdrop-blur-md bg-black/40">
                    {prop.loc}
                  </span>
                  <span className="glass-panel px-3 py-1 rounded-full text-[10px] font-space tracking-wider uppercase text-white/90 backdrop-blur-md bg-black/40">
                    {prop.type}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="mb-4">
                  <h3 className="font-oxanium text-2xl font-light mb-1" style={chromeText}>{prop.price}</h3>
                  <div className="text-white font-oxanium text-lg">{prop.name}</div>
                  <div className="text-white/40 font-space text-sm flex items-center gap-1 mt-1">
                    <MapPin size={14} /> {prop.dist}
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between text-white/50 font-space text-sm">
                  <div className="flex items-center gap-1.5"><BedDouble size={16} /> {prop.beds}</div>
                  <div className="flex items-center gap-1.5"><Bath size={16} /> {prop.baths}</div>
                  <div className="flex items-center gap-1.5"><Maximize size={16} /> {prop.sqft} м²</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-[40px] font-oxanium tracking-tight mb-3" style={chromeText}>Клиенты говорят сами</h2>
          <p className="text-white/50 font-space">Реальные истории — без маркетинга</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {[
            { initials: "ВМ", name: "Виктор М.", route: "Москва → Дубай", date: "Ноябрь 2025", quote: "За 11 дней закрыли сделку на апартаменты в Downtown Dubai. Документы, структура перевода средств, регистрация — без единой проблемы. Уровень выше, чем у крупных инвестбанков.", deal: "Апартаменты · Dubai · $340 000" },
            { initials: "АК", name: "Анна и Сергей К.", route: "С-Петербург → Кипр", date: "Февраль 2026", quote: "Переезжали с тремя детьми. Нашли дом, помогли с ВНЖ, подсказали международные школы. Дети уже учатся в Лимасоле — мы даже не ожидали такой скорости.", deal: "Вилла · Лимасол · €285 000" },
            { initials: "ДЛ", name: "Дмитрий Л.", route: "Екатеринбург → Батуми", date: "Март 2026", quote: "Взял квартиру в Батуми под посуточную аренду. Доходность — 9,4% годовых. Команда сама рекомендовала управляющую компанию. Всё работает без моего участия.", deal: "Апартаменты · Батуми · $78 000" }
          ].map((test, i) => (
            <div key={i} className="glass-panel bg-[#0a0a0a]/80 p-8 rounded-2xl flex flex-col h-full relative group">
              <div className="absolute top-0 right-0 p-6 opacity-10 font-oxanium text-6xl text-white pointer-events-none group-hover:opacity-20 transition-opacity">"</div>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full flex items-center justify-center font-oxanium font-bold text-black text-lg shrink-0" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #d8d8d8 22%, #888888 45%, #cccccc 68%, #ffffff 100%)' }}>
                  {test.initials}
                </div>
                <div>
                  <div className="font-oxanium text-white text-lg">{test.name}</div>
                  <div className="font-space text-xs text-white/40 mt-1">{test.route} <span className="mx-1 opacity-50">/</span> {test.date}</div>
                </div>
              </div>
              
              <p className="font-space text-white/65 leading-relaxed text-sm flex-grow mb-8 italic">
                "{test.quote}"
              </p>
              
              <div className="pt-4 border-t border-white/5 font-space text-[11px] uppercase tracking-wider text-white/30 font-medium">
                Сделка: {test.deal}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="border-t border-white/10 pt-20 pb-10 px-6 md:px-12 relative z-10 overflow-hidden bg-[#050505]">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] glow-orb glow-blue opacity-10 translate-y-1/2 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
          <div className="md:col-span-1">
            <div className="font-oxanium text-2xl font-bold tracking-wider mb-4" style={chromeText}>
              EstateofMind
            </div>
            <p className="font-space text-sm text-white/40 mb-6 max-w-xs">
              Бутиковое агентство зарубежной недвижимости. Конфиденциальность, скорость, результат.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/5 hover:border-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors border border-white/5 hover:border-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-oxanium text-white mb-6 uppercase text-sm tracking-wider">Направления</h4>
            <ul className="space-y-3 font-space text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">ОАЭ, Дубай</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Турция, Стамбул</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Кипр, Лимасол</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Грузия, Батуми</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-oxanium text-white mb-6 uppercase text-sm tracking-wider">Услуги</h4>
            <ul className="space-y-3 font-space text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">Подбор недвижимости</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Оформление ВНЖ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Инвестиционный консалтинг</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Легализация средств</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-oxanium text-white mb-6 uppercase text-sm tracking-wider">Компания</h4>
            <ul className="space-y-3 font-space text-sm text-white/50">
              <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Кейсы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs font-space text-white/30 relative z-10">
          <p>© {new Date().getFullYear()} EstateofMind. Все права защищены.</p>
          <div className="mt-4 md:mt-0 opacity-50 hover:opacity-100 transition-opacity">
            <span style={chromeText} className="font-oxanium font-bold text-sm tracking-widest">EstateofMind</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeRedesign;
