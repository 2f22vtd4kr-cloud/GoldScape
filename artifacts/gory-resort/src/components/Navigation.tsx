import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'Как мы работаем' },
  { href: '/properties', label: 'Объекты' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav className={`eom-nav ${isScrolled || mobileOpen ? 'scrolled' : ''}`}>
      <Link href="/" className="flex items-center shrink-0">
        <span className="font-oxanium text-[20px] font-bold chrome-text tracking-[0.06em]"
          style={{ filter: 'drop-shadow(0 1px 6px rgba(0,0,0,0.9)) drop-shadow(0 0 14px rgba(220,216,208,0.12))' }}>
          EstateofMind
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`nav-link font-space-grotesk tracking-wide uppercase text-xs ${location === link.href ? 'active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <a href="/about#consult" className="eom-btn-oilslick hidden md:inline-flex">
          Консультация
        </a>
        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 md:hidden bg-[#080808]/95 backdrop-blur-xl border-t border-white/5 flex flex-col px-8 py-6 gap-6">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link font-space-grotesk tracking-wide uppercase text-sm ${location === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <a href="/about#consult" className="eom-btn-primary text-center justify-center">
            Консультация
          </a>
        </div>
      )}
    </nav>
  );
}
