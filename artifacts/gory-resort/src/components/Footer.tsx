import { MessageCircle, Send } from 'lucide-react';
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-[#F2F0EB] dark:bg-[#050505] border-t border-foreground/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <img
              src="/chrome/liquid/logo-estateofmind.png"
              alt="EstateofMind"
              /* Two bugs fixed here, both pre-existing (present in dark mode
                 too, not just light): (1) the source PNG is a square 1024×1024
                 canvas with the wordmark occupying only a horizontal band —
                 without an explicit width + object-fit:cover (as the nav logo
                 already has), `width: auto` at height:28 rendered the whole
                 square, squashing the wordmark into an illegible 28×28 sliver.
                 (2) mix-blend-mode was an unnecessary hack given the PNG's
                 real alpha channel, and `multiply` against the near-white
                 footer background washed the brighter iridescent pixels out
                 to invisible. Grayscale + darken now matches the nav's
                 light-mode treatment. */
              className="footer-logo dark:filter-none grayscale brightness-[0.4] contrast-125"
              style={{ height: '28px', width: '174px', objectFit: 'cover', objectPosition: 'center', marginBottom: '1.5rem' }}
              draggable={false}
            />
            <p className="font-space-grotesk text-sm text-foreground/50 dark:text-white/40 max-w-xs">
              Ваш капитал заслуживает свободы. Инвестиции в зарубежную недвижимость с полным сопровождением.
            </p>
          </div>

          <div>
            <h4 className="font-oxanium text-foreground mb-6 uppercase tracking-wider text-sm">Направления</h4>
            <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-foreground/50 dark:text-white/40">
              <li>
                <Link href="/properties" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  ОАЭ (Дубай)
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Турция (Стамбул)
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Кипр (Лимасол)
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Грузия (Батуми)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-oxanium text-foreground mb-6 uppercase tracking-wider text-sm">Услуги</h4>
            <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-foreground/50 dark:text-white/40">
              <li>
                <Link href="/properties" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Подбор недвижимости
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Юридическое сопровождение
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Помощь с ВНЖ
                </Link>
              </li>
              <li>
                <a href="/about#consult" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Управление объектами
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-oxanium text-foreground mb-6 uppercase tracking-wider text-sm">Компания</h4>
            <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-foreground/50 dark:text-white/40 mb-8">
              <li>
                <Link href="/about" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  О нас
                </Link>
              </li>
              <li>
                <a href="/about#consult" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Контакты
                </a>
              </li>
              <li>
                <Link href="/tax" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Налоговый гид
                </Link>
              </li>
            </ul>

            <div className="flex gap-4">
              <a
                href="https://wa.me/971502345678"
                target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-[#25D366] hover:bg-foreground/10 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <a
                href="https://t.me/estateofmind_official"
                target="_blank" rel="noreferrer"
                className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-[#229ED9] hover:bg-foreground/10 transition-all"
                aria-label="Telegram"
              >
                <Send className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/5 font-space-grotesk text-xs text-foreground/40 dark:text-white/30 space-y-6">
          <p className="max-w-4xl leading-relaxed">
            Информация на сайте не является индивидуальной инвестиционной рекомендацией. Мы работаем в строгом соответствии с международными стандартами (включая рекомендации FATF) и законодательством стран присутствия. Полная стоимость приобретения, включая налоги и сборы, рассчитывается индивидуально.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>
              ©2026 <span className="iridescent-text font-medium">EstateofMind</span>. Все права защищены.
            </p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="hover:text-foreground/80 dark:hover:text-white/60 transition-colors py-2 md:py-0 min-h-[48px] md:min-h-0 flex items-center">
                Политика конфиденциальности
              </a>
              <a href="#" className="hover:text-foreground/80 dark:hover:text-white/60 transition-colors py-2 md:py-0 min-h-[48px] md:min-h-0 flex items-center">
                Пользовательское соглашение
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
