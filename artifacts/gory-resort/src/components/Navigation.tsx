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
        {/* object-fit:cover centers on the text band of the ~1:1 image */}
        <img
          src="/chrome/liquid/logo-estateofmind.png"
          alt="EstateofMind"
          style={{
            mixBlendMode: 'screen',
            objectFit: 'cover',
            objectPosition: 'center',
            width: '186px',
            height: '30px',
          }}
          draggable={false}
        />
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
