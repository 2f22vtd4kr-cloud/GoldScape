import React from 'react';
import { CheckCircle2, Phone, Mail, MessageCircle, Send, SendHorizonal } from 'lucide-react';
import './_group.css';

export default function About() {
  return (
    <div className="min-h-screen bg-[#080808] text-zinc-300 font-['Space_Grotesk'] overflow-hidden selection:bg-zinc-800 selection:text-white">
      {/* NAV */}
      <nav className="eom-nav sticky top-0 z-50 bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-['Oxanium'] font-bold tracking-tighter chrome-text uppercase">
            EstateofMind.
          </div>
          <div className="hidden md:flex gap-8 text-sm tracking-wide">
            <a href="#" className="hover:text-white transition-colors duration-300">Портфолио</a>
            <a href="#" className="text-white relative after:absolute after:-bottom-2 after:left-0 after:w-full after:h-px after:bg-white">О нас</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Направления</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Контакты</a>
          </div>
          <button className="eom-btn-primary">
            Связаться
          </button>
        </div>
      </nav>

      {/* PAGE HEADER */}
      <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="absolute top-20 right-1/4 w-[600px] h-[600px] rounded-full iridescent-spill opacity-30 blur-[100px] pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-5xl md:text-[64px] font-['Oxanium'] font-bold chrome-text leading-[1.1] mb-6 uppercase">
            Как мы работаем
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed">
            «Полное сопровождение от первого запроса до ключей в руках»
          </p>
        </div>
      </section>

      {/* HOW IT WORKS - PROCESS */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row items-center gap-16 relative">
            <div className="absolute -left-10 md:left-0 top-1/2 -translate-y-1/2 text-[150px] md:text-[200px] font-['Oxanium'] font-bold chrome-text opacity-[0.06] pointer-events-none select-none z-0">
              01
            </div>
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-transparent text-white font-['Oxanium'] text-[11px] uppercase tracking-wider mb-6">
                30 минут · Бесплатно
              </div>
              <h3 className="text-3xl md:text-4xl font-['Oxanium'] font-bold text-white mb-6 uppercase">
                Консультация
              </h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Рассказываем о доступных направлениях, объясняем юридические нюансы и помогаем сформировать бюджет. Без давления и скрытых целей.
              </p>
              <div className="space-y-4">
                {['Анализ вашей ситуации', 'Расчёт бюджета', 'Подбор страны'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/50" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center relative z-10">
              <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] chrome-blob" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }} />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-16 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[150px] md:text-[200px] font-['Oxanium'] font-bold chrome-text opacity-[0.06] pointer-events-none select-none z-0">
              02
            </div>
            <div className="flex-1 flex justify-center relative z-10">
              <div className="w-[280px] h-[320px] md:w-[380px] md:h-[420px] chrome-blob" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} />
            </div>
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-transparent text-white font-['Oxanium'] text-[11px] uppercase tracking-wider mb-6">
                3–5 рабочих дней
              </div>
              <h3 className="text-3xl md:text-4xl font-['Oxanium'] font-bold text-white mb-6 uppercase">
                Подбор объектов
              </h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Формируем персонализированную подборку из нашего портфеля и баз партнёров (fäm Properties, H&S Real Estate и др.). Только объекты, прошедшие наш аудит.
              </p>
              <div className="space-y-4">
                {['Подборка под бюджет', 'Проверенные объекты', 'Виртуальные туры'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/50" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row items-center gap-16 relative">
            <div className="absolute -left-10 md:left-0 top-1/2 -translate-y-1/2 text-[150px] md:text-[200px] font-['Oxanium'] font-bold chrome-text opacity-[0.06] pointer-events-none select-none z-0">
              03
            </div>
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-transparent text-white font-['Oxanium'] text-[11px] uppercase tracking-wider mb-6">
                5–10 дней
              </div>
              <h3 className="text-3xl md:text-4xl font-['Oxanium'] font-bold text-white mb-6 uppercase">
                Юридическое сопровождение
              </h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Проверка права собственности, история объекта, налоговые последствия, структурирование сделки. Мы работаем с местными юристами в каждой стране.
              </p>
              <div className="space-y-4">
                {['Due diligence', 'Договор купли-продажи', 'Нотариальное заверение'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/50" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 flex justify-center relative z-10">
              <div className="w-[320px] h-[280px] md:w-[420px] md:h-[380px] chrome-blob" style={{ borderRadius: '30% 70% 50% 50% / 50% 50% 70% 30%' }} />
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-16 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[150px] md:text-[200px] font-['Oxanium'] font-bold chrome-text opacity-[0.06] pointer-events-none select-none z-0">
              04
            </div>
            <div className="flex-1 flex justify-center relative z-10">
              <div className="w-[350px] h-[350px] md:w-[450px] md:h-[450px] chrome-blob" style={{ borderRadius: '70% 30% 40% 60% / 40% 60% 40% 60%' }} />
            </div>
            <div className="flex-1 relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-transparent text-white font-['Oxanium'] text-[11px] uppercase tracking-wider mb-6">
                2–5 дней
              </div>
              <h3 className="text-3xl md:text-4xl font-['Oxanium'] font-bold text-white mb-6 uppercase">
                Закрытие сделки и ВНЖ
              </h3>
              <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
                Подписание, передача ключей, регистрация собственности. При необходимости — сопровождение в получении вида на жительство (ОАЭ, Кипр, Турция, Грузия).
              </p>
              <div className="space-y-4">
                {['Регистрация собственности', 'Программы ВНЖ', 'Постпродажный сервис'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/50" />
                    <span className="text-zinc-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS DEEP-DIVE */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-[44px] font-['Oxanium'] font-bold chrome-text mb-16 uppercase text-center">
            Наши направления
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* UAE */}
            <div className="eom-card p-8 flex flex-col aspect-[2/3] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="text-[64px] mb-6">🇦🇪</div>
              <h3 className="text-xl font-['Oxanium'] font-bold chrome-text uppercase mb-6">
                ОАЭ / Дубай
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400 mb-auto flex-1">
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> 0% налог на доход и прирост капитала</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Golden Visa от $545,000</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Крупнейший рынок среди эмигрантов из России</li>
              </ul>
              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">Инвестиционный порог</div>
                  <div className="text-[18px] font-['Oxanium'] font-bold iridescent-text">от $368,000</div>
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-['Oxanium'] uppercase tracking-wider text-white">
                    ВНЖ: Golden Visa
                  </div>
                </div>
              </div>
            </div>

            {/* Turkey */}
            <div className="eom-card p-8 flex flex-col aspect-[2/3] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="text-[64px] mb-6">🇹🇷</div>
              <h3 className="text-xl font-['Oxanium'] font-bold chrome-text uppercase mb-6">
                Турция / Стамбул и Анталья
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400 mb-auto flex-1">
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Гражданство от $400,000 (ускоренный процесс)</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Высокий спрос на аренду, доходность 5–8%</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> №1 по покупкам среди россиян 50 месяцев подряд</li>
              </ul>
              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">Инвестиционный порог</div>
                  <div className="text-[18px] font-['Oxanium'] font-bold iridescent-text">от $120,000</div>
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-['Oxanium'] uppercase tracking-wider text-white">
                    ВНЖ: Ikamet + Гражданство
                  </div>
                </div>
              </div>
            </div>

            {/* Cyprus */}
            <div className="eom-card p-8 flex flex-col aspect-[2/3] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="text-[64px] mb-6">🇨🇾</div>
              <h3 className="text-xl font-['Oxanium'] font-bold chrome-text uppercase mb-6">
                Кипр / Лимасол
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400 mb-auto flex-1">
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Член ЕС — доступ к Шенгену</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Non-dom режим: льготное налогообложение</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Лимасол — финансовая столица Кипра</li>
              </ul>
              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">Инвестиционный порог</div>
                  <div className="text-[18px] font-['Oxanium'] font-bold iridescent-text">от €180,000</div>
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-['Oxanium'] uppercase tracking-wider text-white">
                    ВНЖ: EU Residency
                  </div>
                </div>
              </div>
            </div>

            {/* Georgia */}
            <div className="eom-card p-8 flex flex-col aspect-[2/3] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="text-[64px] mb-6">🇬🇪</div>
              <h3 className="text-xl font-['Oxanium'] font-bold chrome-text uppercase mb-6">
                Грузия / Тбилиси и Батуми
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400 mb-auto flex-1">
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Территориальный налог: 0% на зарубежный доход</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Самый доступный рынок для старта</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Без виз для граждан РФ до 1 года</li>
              </ul>
              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">Инвестиционный порог</div>
                  <div className="text-[18px] font-['Oxanium'] font-bold iridescent-text">от $60,000</div>
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-['Oxanium'] uppercase tracking-wider text-white">
                    ВНЖ: Residence permit
                  </div>
                </div>
              </div>
            </div>

            {/* Thailand */}
            <div className="eom-card p-8 flex flex-col aspect-[2/3] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="text-[64px] mb-6">🇹🇭</div>
              <h3 className="text-xl font-['Oxanium'] font-bold chrome-text uppercase mb-6">
                Таиланд / Пхукет и Паттайя
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400 mb-auto flex-1">
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Thailand Elite Visa — ВНЖ от $15,000</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Высокий туристический рентный доход</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Тёплый климат, развитая инфраструктура</li>
              </ul>
              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">Инвестиционный порог</div>
                  <div className="text-[18px] font-['Oxanium'] font-bold iridescent-text">от $85,000</div>
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-['Oxanium'] uppercase tracking-wider text-white">
                    ВНЖ: Elite Visa
                  </div>
                </div>
              </div>
            </div>

            {/* Serbia */}
            <div className="eom-card p-8 flex flex-col aspect-[2/3] group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="text-[64px] mb-6">🇷🇸</div>
              <h3 className="text-xl font-['Oxanium'] font-bold chrome-text uppercase mb-6">
                Сербия / Белград
              </h3>
              <ul className="space-y-3 text-sm text-zinc-400 mb-auto flex-1">
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Безвизовый въезд, простая регистрация</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Самая доступная недвижимость в Европе</li>
                <li className="flex gap-2"><span className="text-white/30 mt-1">•</span> Динамично растущий рынок (рост 12% за 2025)</li>
              </ul>
              <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                <div>
                  <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">Инвестиционный порог</div>
                  <div className="text-[18px] font-['Oxanium'] font-bold iridescent-text">от €75,000</div>
                </div>
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-['Oxanium'] uppercase tracking-wider text-white">
                    ВНЖ: Boravišna dozvola
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-[40px] font-['Oxanium'] font-bold text-white mb-16 text-center uppercase">
          Часто задаваемые вопросы
        </h2>
        
        <div className="space-y-4">
          {[
            {
              q: "Как перевести деньги за рубеж для покупки недвижимости?",
              a: "Существует несколько легальных механизмов в зависимости от страны назначения. Мы помогаем структурировать транзакцию совместно с нашими юридическими партнёрами. На консультации разберём вашу конкретную ситуацию."
            },
            {
              q: "Нужно ли мне лично ехать для покупки?",
              a: "Нет. Большинство сделок в ОАЭ, Грузии и Сербии закрываются дистанционно через нотариальную доверенность. На Кипре и в Турции часто требуется личное присутствие — мы организуем поездку под ключ."
            },
            {
              q: "Сколько стоят ваши услуги?",
              a: "Для покупателя — бесплатно. Наше вознаграждение выплачивается агентством-продавцом из комиссии, принятой на рынке страны. Вы не переплачиваете."
            },
            {
              q: "Можно ли купить за криптовалюту?",
              a: "В ОАЭ — да, ряд застройщиков принимает USDT/BTC напрямую. В других странах конвертация обязательна. Мы помогаем с безопасным обменом через лицензированные платформы."
            }
          ].map((faq, i) => (
            <div key={i} className="bg-white/[0.02] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#b096f4] via-[#74b4f5] to-[#f596b4]" />
              <h4 className="text-[17px] text-white font-medium mb-3 pl-4">
                {faq.q}
              </h4>
              <p className="text-[15px] text-zinc-400 leading-relaxed pl-4">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-24 bg-white/[0.02] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Form Column */}
            <div>
              <div className="mb-12">
                <h2 className="text-4xl md:text-[52px] font-['Oxanium'] font-bold chrome-text leading-[1.1] mb-4 uppercase">
                  Начать работу
                </h2>
                <p className="text-xl text-zinc-400 font-light">
                  «Бесплатная консультация — без давления, без навязывания»
                </p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-400 block ml-1">
                      Имя *
                    </label>
                    <input 
                      type="text" 
                      className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-400 block ml-1">
                      Телефон / WhatsApp *
                    </label>
                    <input 
                      type="tel" 
                      className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="+7 (999) 000-00-00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-400 block ml-1">
                      Бюджет
                    </label>
                    <select className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none">
                      <option>до $100k</option>
                      <option>$100k–500k</option>
                      <option>$500k–2M</option>
                      <option>$2M+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-400 block ml-1">
                      Направление интереса
                    </label>
                    <select className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none">
                      <option>ОАЭ</option>
                      <option>Турция</option>
                      <option>Кипр</option>
                      <option>Грузия</option>
                      <option>Другое</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-400 block ml-1">
                    Сообщение
                  </label>
                  <textarea 
                    className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors min-h-[120px] resize-y"
                    placeholder="Опишите вашу ситуацию (необязательно)"
                  />
                </div>

                <button className="w-full eom-btn-primary flex items-center justify-center gap-2 py-4 mt-8">
                  Отправить запрос <SendHorizonal className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-zinc-500 text-center mt-4 px-4 leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  <br />Мы никогда не продаём и не передаём ваши данные.
                </p>
              </form>
            </div>

            {/* Info Column */}
            <div className="relative flex flex-col justify-center">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full iridescent-spill opacity-30 blur-[80px] pointer-events-none" />
              
              <div className="bg-[#080808] border border-white/10 p-8 rounded-2xl relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">WhatsApp</div>
                    <div className="text-lg text-white">+971 58 XXX XXXX</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#229ED9]/10 flex items-center justify-center">
                    <Send className="w-5 h-5 text-[#229ED9] -ml-1" />
                  </div>
                  <div>
                    <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">Telegram</div>
                    <div className="text-lg text-white">@estateofmind</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <div className="text-[11px] font-['Oxanium'] uppercase tracking-wider text-zinc-500 mb-1">Email</div>
                    <div className="text-lg text-white">hello@estateofmind.com</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Ответим в течение 2 часов в рабочее время <br/>(Пн–Пт, 9:00–20:00 MSK)
                  </p>
                </div>
              </div>

              <div className="mt-12 flex justify-center lg:justify-end relative z-10">
                <div className="w-[220px] h-[220px] chrome-blob" style={{ borderRadius: '50% 50% 30% 70% / 60% 40% 60% 40%' }} />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#080808] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-2xl font-['Oxanium'] font-bold tracking-tighter chrome-text uppercase">
            EstateofMind.
          </div>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Условия использования</a>
          </div>
          <div className="text-sm text-zinc-600">
            © 2025 EstateofMind. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
