import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Sun, Moon, Heart } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useFavoriteIds } from '@/lib/favorites';

const LINKS = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'Как мы работаем' },
  { href: '/properties', label: 'Объекты' },
  { href: '/tax', label: 'Налоговый гид' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const favoriteCount = useFavoriteIds().length;

  useEffect(() => {
    // rAF-throttled: a bare scroll listener can fire dozens of times per
    // gesture, each one a synchronous setState. Coalescing to one check per
    // animation frame keeps the class toggle (and the CSS transition it
    // kicks off) from competing with the browser's own scroll/paint work.
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    // Lock body scroll while the mobile menu is open. Without this, the
    // dropdown only covers its own content height — anything behind it
    // (e.g. the hero CTA pills) can peek out from under its bottom edge
    // once scrolled, and the page underneath stays scrollable/interactive.
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <nav className={`eom-nav ${isScrolled || mobileOpen ? 'scrolled' : ''}`}>
      <Link href="/" className="flex items-center shrink-0">
        {/* object-fit:cover centers on the text band of the ~1:1 image.
            The PNG has a real alpha channel (black background baked out) —
            no mix-blend-mode needed, which was unreliable combined with the
            nav's backdrop-filter blur and left a visible dark box on some browsers. */}
        <img
          src="/chrome/liquid/logo-estateofmind.png"
          alt="EstateofMind"
          /* invert + hue-rotate(180) is a classic dark-mode-icon trick, but it
             only cleanly restores hue for near-grayscale source art. This logo
             is a saturated multi-hue iridescent chrome gradient, so inverting
             each RGB channel and rotating hue does not map back to the
             original colors — it produces a streaky, glitchy rainbow smear in
             light mode. Grayscale + darken instead: strip the hue entirely and
             darken so the metallic highlights/shadows still read as a
             brushed-steel wordmark against a light background, matching the
             .chrome-text light-mode treatment used for headings. */
          className="dark:filter-none grayscale brightness-[0.4] contrast-125 transition-all duration-300"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            width: '186px',
            height: '30px',
          }}
          draggable={false}
        />
      </Link>

      {/* lg, not md: at exactly 768px (a common tablet-portrait width) the
          logo + 4 links + Консультация + theme toggle add up to more than
          the viewport, pushing the theme toggle off-screen. Desktop nav only
          gets room to breathe at lg (1024px); tablets keep the hamburger. */}
      <div className="hidden lg:flex items-center gap-8">
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
        <a href="/about#consult" className="eom-btn-oilslick hidden lg:inline-flex">
          Консультация
        </a>
        <Link
          href="/favorites"
          className="glass-icon-btn relative w-9 h-9 rounded-full text-foreground/70 dark:text-white/70"
          aria-label={favoriteCount > 0 ? `Избранное (${favoriteCount})` : 'Избранное'}
        >
          <Heart className={`w-4 h-4 ${favoriteCount > 0 ? 'fill-[#f596b4] text-[#f596b4]' : ''}`} />
          {favoriteCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[16px] h-[16px] px-[3px] rounded-full bg-[#f596b4] text-black text-[9px] font-oxanium font-bold flex items-center justify-center leading-none">
              {favoriteCount}
            </span>
          )}
        </Link>
        <button
          type="button"
          onClick={toggleTheme}
          className="glass-icon-btn w-9 h-9 rounded-full text-foreground/70 dark:text-white/70"
          aria-label="Переключить тему"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
        <button
          type="button"
          className="lg:hidden text-foreground w-12 h-12 -mr-3 flex items-center justify-center"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 min-h-screen lg:hidden bg-white dark:bg-[#080808] border-t border-black/5 dark:border-white/5 flex flex-col px-8 py-6 gap-6">
          {/* Fully opaque (not translucent + blurred) on purpose: with the animated
              chrome-blob hero sitting right underneath, a semi-transparent panel let
              the bright hero text/blob bleed through and collide with the menu links.
              min-h-screen is load-bearing, not decorative: the panel only sizes to
              its own content by default, which is shorter than the viewport, so
              whatever sits behind it in the page's normal flow (e.g. the hero CTA
              pills) pokes out from under its bottom edge. min-h-screen guarantees
              full coverage no matter how tall the menu's own content is. */}
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link font-space-grotesk tracking-wide uppercase text-sm block py-3 ${location === link.href ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/favorites"
            className={`nav-link font-space-grotesk tracking-wide uppercase text-sm py-3 flex items-center gap-2 ${location === '/favorites' ? 'active' : ''}`}
          >
            <Heart className={`w-4 h-4 ${favoriteCount > 0 ? 'fill-[#f596b4] text-[#f596b4]' : ''}`} />
            Избранное{favoriteCount > 0 ? ` (${favoriteCount})` : ''}
          </Link>
          <a href="/about#consult" className="eom-btn-primary text-center justify-center min-h-[48px] flex items-center">
            Консультация
          </a>
        </div>
      )}
    </nav>
  );
}
