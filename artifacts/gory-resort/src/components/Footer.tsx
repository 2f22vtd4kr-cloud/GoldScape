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
            <h4 className="font-oxanium text-foreground mb-6 uppercase tracking-wider text-sm">Контакты</h4>
            <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-foreground/50 dark:text-white/40">
              <li>
                <a href="/about#consult" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Записаться на консультацию
                </a>
              </li>
              <li>
                <Link href="/tax" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px]">
                  Налоговый гид
                </Link>
              </li>
              <li>
                <a href="https://wa.me/971502345678" target="_blank" rel="noreferrer" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px] gap-2">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </li>
              <li>
                <a href="https://t.me/estateofmind_official" target="_blank" rel="noreferrer" className="hover:text-foreground dark:hover:text-white transition-colors py-1 flex items-center min-h-[40px] gap-2">
                  <Send className="w-4 h-4" /> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 font-space-grotesk text-xs text-foreground/40 dark:text-white/30">
          <p>© {new Date().getFullYear()} EstateofMind. Все права защищены.</p>
          <div className="flex flex-wrap gap-6">
            <a href="/about#privacy" className="hover:text-foreground/80 dark:hover:text-white/60 transition-colors py-2 md:py-0 min-h-[48px] md:min-h-0 flex items-center">
              Политика конфиденциальности
            </a>
            <a href="/about#terms" className="hover:text-foreground/80 dark:hover:text-white/60 transition-colors py-2 md:py-0 min-h-[48px] md:min-h-0 flex items-center">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
