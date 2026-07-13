import { MessageCircle, Send } from 'lucide-react';
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <span className="font-oxanium text-2xl font-bold chrome-text tracking-wide block mb-6">EstateofMind</span>
            <p className="font-space-grotesk text-sm text-white/40 max-w-xs">
              Ваш капитал заслуживает свободы. Инвестиции в зарубежную недвижимость с полным сопровождением.
            </p>
          </div>

          <div>
            <h4 className="font-oxanium text-white mb-6 uppercase tracking-wider text-sm">Направления</h4>
            <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-white/40">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  ОАЭ (Дубай)
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  Турция (Стамбул)
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  Кипр (Лимасол)
                </Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  Грузия (Батуми)
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-oxanium text-white mb-6 uppercase tracking-wider text-sm">Услуги</h4>
            <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-white/40">
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">
                  Подбор недвижимости
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Юридическое сопровождение
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Помощь с ВНЖ
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Управление объектами
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-oxanium text-white mb-6 uppercase tracking-wider text-sm">Компания</h4>
            <ul className="flex flex-col gap-4 font-space-grotesk text-sm text-white/40 mb-8">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <a href="/about#consult" className="hover:text-white transition-colors">
                  Контакты
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Блог
                </a>
              </li>
            </ul>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
                aria-label="Telegram"
              >
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
            <a href="#" className="hover:text-white/60 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-white/60 transition-colors">
              Пользовательское соглашение
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
