import { CheckCircle2, Mail, MessageCircle, Send, SendHorizonal } from 'lucide-react';
import { Layout } from '@/components/Layout';

const PROCESS_STEPS = [
  {
    num: '01',
    badge: '30 минут · Бесплатно',
    title: 'Консультация',
    desc: 'Рассказываем о доступных направлениях, объясняем юридические нюансы и помогаем сформировать бюджет. Без давления и скрытых целей.',
    items: ['Анализ вашей ситуации', 'Расчёт бюджета', 'Подбор страны'],
    image: '/chrome/blob-iridescent-1.png',
    reverse: false,
  },
  {
    num: '02',
    badge: '3–5 рабочих дней',
    title: 'Подбор объектов',
    desc: 'Формируем персонализированную подборку из нашего портфеля и баз партнёров (fäm Properties, H&S Real Estate и др.). Только объекты, прошедшие наш аудит.',
    items: ['Подборка под бюджет', 'Проверенные объекты', 'Виртуальные туры'],
    image: '/chrome/ring-chrome.png',
    reverse: true,
  },
  {
    num: '03',
    badge: '5–10 дней',
    title: 'Юридическое сопровождение',
    desc: 'Проверка права собственности, история объекта, налоговые последствия, структурирование сделки. Мы работаем с местными юристами в каждой стране.',
    items: ['Due diligence', 'Договор купли-продажи', 'Нотариальное заверение'],
    image: '/chrome/blob-iridescent-2.png',
    reverse: false,
  },
  {
    num: '04',
    badge: '2–5 дней',
    title: 'Закрытие сделки и ВНЖ',
    desc: 'Подписание, передача ключей, регистрация собственности. При необходимости — сопровождение в получении вида на жительство (ОАЭ, Кипр, Турция, Грузия).',
    items: ['Регистрация собственности', 'Программы ВНЖ', 'Постпродажный сервис'],
    image: '/chrome/drip-chrome.png',
    reverse: true,
  },
];

const DESTINATIONS = [
  {
    flag: '🇦🇪',
    title: 'ОАЭ / Дубай',
    points: ['0% налог на доход и прирост капитала', 'Golden Visa от $545,000', 'Крупнейший рынок среди эмигрантов из России'],
    threshold: 'от $368,000',
    visa: 'ВНЖ: Golden Visa',
  },
  {
    flag: '🇹🇷',
    title: 'Турция / Стамбул и Анталья',
    points: ['Гражданство от $400,000 (ускоренный процесс)', 'Высокий спрос на аренду, доходность 5–8%', '№1 по покупкам среди россиян 50 месяцев подряд'],
    threshold: 'от $120,000',
    visa: 'ВНЖ: Ikamet + Гражданство',
  },
  {
    flag: '🇨🇾',
    title: 'Кипр / Лимасол',
    points: ['Член ЕС — доступ к Шенгену', 'Non-dom режим: льготное налогообложение', 'Лимасол — финансовая столица Кипра'],
    threshold: 'от €180,000',
    visa: 'ВНЖ: EU Residency',
  },
  {
    flag: '🇬🇪',
    title: 'Грузия / Тбилиси и Батуми',
    points: ['Территориальный налог: 0% на зарубежный доход', 'Самый доступный рынок для старта', 'Без виз для граждан РФ до 1 года'],
    threshold: 'от $60,000',
    visa: 'ВНЖ: Residence permit',
  },
  {
    flag: '🇹🇭',
    title: 'Таиланд / Пхукет и Паттайя',
    points: ['Thailand Elite Visa — ВНЖ от $15,000', 'Высокий туристический рентный доход', 'Тёплый климат, развитая инфраструктура'],
    threshold: 'от $85,000',
    visa: 'ВНЖ: Elite Visa',
  },
  {
    flag: '🇷🇸',
    title: 'Сербия / Белград',
    points: ['Безвизовый въезд, простая регистрация', 'Самая доступная недвижимость в Европе', 'Динамично растущий рынок (рост 12% за 2025)'],
    threshold: 'от €75,000',
    visa: 'ВНЖ: Boravišna dozvola',
  },
];

const FAQ = [
  {
    q: 'Как перевести деньги за рубеж для покупки недвижимости?',
    a: 'Существует несколько легальных механизмов в зависимости от страны назначения. Мы помогаем структурировать транзакцию совместно с нашими юридическими партнёрами. На консультации разберём вашу конкретную ситуацию.',
  },
  {
    q: 'Нужно ли мне лично ехать для покупки?',
    a: 'Нет. Большинство сделок в ОАЭ, Грузии и Сербии закрываются дистанционно через нотариальную доверенность. На Кипре и в Турции часто требуется личное присутствие — мы организуем поездку под ключ.',
  },
  {
    q: 'Сколько стоят ваши услуги?',
    a: 'Для покупателя — бесплатно. Наше вознаграждение выплачивается агентством-продавцом из комиссии, принятой на рынке страны. Вы не переплачиваете.',
  },
  {
    q: 'Можно ли купить за криптовалюту?',
    a: 'В ОАЭ — да, ряд застройщиков принимает USDT/BTC напрямую. В других странах конвертация обязательна. Мы помогаем с безопасным обменом через лицензированные платформы.',
  },
];

export default function About() {
  return (
    <Layout>
      {/* PAGE HEADER */}
      <section className="relative pt-28 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        {/* Subtle accent — absolutely-positioned wrapper so it never affects flow */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: '520px', height: '520px', pointerEvents: 'none', zIndex: 0 }}>
          <div className="iridescent-spill w-full h-full" style={{ opacity: 0.12 }} />
        </div>
        <div className="relative z-10 max-w-3xl">
          <span className="font-oxanium text-[11px] tracking-[0.25em] text-white/40 uppercase mb-6 block">
            Как мы работаем
          </span>
          <h1 className="text-5xl md:text-[64px] font-oxanium font-bold text-white leading-[1.05] mb-6 uppercase">
            Полное сопровождение
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light leading-relaxed max-w-xl">
            От первого запроса до ключей в руках — мы с вами на каждом шаге.
          </p>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col gap-32">
          {PROCESS_STEPS.map((step) => (
            <div
              key={step.num}
              className={`flex flex-col ${step.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-16 relative`}
            >
              <div
                className={`absolute ${step.reverse ? 'right-0' : '-left-10 md:left-0'} top-1/2 -translate-y-1/2 text-[150px] md:text-[200px] font-oxanium font-bold chrome-text opacity-[0.06] pointer-events-none select-none z-0`}
              >
                {step.num}
              </div>
              <div className="flex-1 relative z-10">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-white/20 bg-transparent text-white font-oxanium text-[11px] uppercase tracking-wider mb-6">
                  {step.badge}
                </div>
                <h3 className="text-3xl md:text-4xl font-oxanium font-bold text-white mb-6 uppercase">{step.title}</h3>
                <p className="text-lg text-zinc-400 mb-8 leading-relaxed">{step.desc}</p>
                <div className="space-y-4">
                  {step.items.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white/50" />
                      <span className="text-zinc-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex justify-center relative z-10">
                <img
                  src={step.image}
                  alt=""
                  className="animate-float drop-shadow-[0_0_60px_rgba(100,60,255,0.35)]"
                  style={{ width: 'clamp(240px,32vw,420px)', height: 'auto', pointerEvents: 'none' }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINATIONS DEEP-DIVE */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-[44px] font-oxanium font-bold chrome-text mb-16 uppercase text-center">
            Наши направления
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DESTINATIONS.map((dest) => (
              <div key={dest.title} className="eom-card p-8 flex flex-col aspect-[2/3] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="text-[64px] mb-6">{dest.flag}</div>
                <h3 className="text-xl font-oxanium font-bold chrome-text uppercase mb-6">{dest.title}</h3>
                <ul className="space-y-3 text-sm text-zinc-400 mb-auto flex-1">
                  {dest.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <span className="text-white/30 mt-1">•</span> {point}
                    </li>
                  ))}
                </ul>
                <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                  <div>
                    <div className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-500 mb-1">Инвестиционный порог</div>
                    <div className="text-[18px] font-oxanium font-bold iridescent-text">{dest.threshold}</div>
                  </div>
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-oxanium uppercase tracking-wider text-white">
                      {dest.visa}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-[40px] font-oxanium font-bold text-white mb-16 text-center uppercase">
          Часто задаваемые вопросы
        </h2>

        <div className="space-y-4">
          {FAQ.map((faq) => (
            <div key={faq.q} className="bg-white/[0.02] border border-white/10 rounded-xl p-6 relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#b096f4] via-[#74b4f5] to-[#f596b4]" />
              <h4 className="text-[17px] text-white font-medium mb-3 pl-4">{faq.q}</h4>
              <p className="text-[15px] text-zinc-400 leading-relaxed pl-4">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT FORM */}
      <section id="consult" className="py-24 bg-white/[0.02] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <div className="mb-12">
                <h2 className="text-4xl md:text-[52px] font-oxanium font-bold chrome-text leading-[1.1] mb-4 uppercase">
                  Начать работу
                </h2>
                <p className="text-xl text-zinc-400 font-light">«Бесплатная консультация — без давления, без навязывания»</p>
              </div>

              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-400 block ml-1">Имя *</label>
                    <input
                      type="text"
                      className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors"
                      placeholder="Иван Иванов"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-400 block ml-1">
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
                    <label className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-400 block ml-1">Бюджет</label>
                    <select className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors appearance-none">
                      <option>до $100k</option>
                      <option>$100k–500k</option>
                      <option>$500k–2M</option>
                      <option>$2M+</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-400 block ml-1">
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
                  <label className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-400 block ml-1">Сообщение</label>
                  <textarea
                    className="w-full bg-[#080808] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 transition-colors min-h-[120px] resize-y"
                    placeholder="Опишите вашу ситуацию (необязательно)"
                  />
                </div>

                <button type="submit" className="w-full eom-btn-primary flex items-center justify-center gap-2 py-4 mt-8">
                  Отправить запрос <SendHorizonal className="w-4 h-4" />
                </button>

                <p className="text-[11px] text-zinc-500 text-center mt-4 px-4 leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                  <br />
                  Мы никогда не продаём и не передаём ваши данные.
                </p>
              </form>
            </div>

            <div className="relative flex flex-col justify-center">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full iridescent-spill opacity-30 blur-[80px] pointer-events-none" />

              <div className="bg-[#080808] border border-white/10 p-8 rounded-2xl relative z-10 space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-500 mb-1">WhatsApp</div>
                    <div className="text-lg text-white">+971 58 XXX XXXX</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#229ED9]/10 flex items-center justify-center">
                    <Send className="w-5 h-5 text-[#229ED9] -ml-1" />
                  </div>
                  <div>
                    <div className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-500 mb-1">Telegram</div>
                    <div className="text-lg text-white">@estateofmind</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <div className="text-[11px] font-oxanium uppercase tracking-wider text-zinc-500 mb-1">Email</div>
                    <div className="text-lg text-white">hello@estateofmind.com</div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    Ответим в течение 2 часов в рабочее время <br />
                    (Пн–Пт, 9:00–20:00 MSK)
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
    </Layout>
  );
}
