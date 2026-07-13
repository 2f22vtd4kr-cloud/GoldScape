/**
 * Mobile home page — Liquid Chrome redesign
 * Inspired by the "Liquid Chrome Poster Series" aesthetic:
 * flowing silver wire ribbons, explosive starbursts, organic chrome forms
 * — each used as a large atmospheric background shape behind real content.
 *
 * Images stored at artifacts/mockup-sandbox/public/images/
 * Referenced as /__mockup/images/ (through Replit proxy to port 8081)
 */

import '../liquid-spill/_group.css';
import './mobile-chrome.css';
import chromeWire from '@/assets/images/chrome-wire.png';
import chromeBurst from '@/assets/images/chrome-burst.png';
import chromeOrganic from '@/assets/images/chrome-organic.png';

export default function MobileHome() {
  return (
    <div className="mobile-root font-space-grotesk">

      {/* ─── NAV ─────────────────────────────────────────────────── */}
      <nav className="mobile-nav">
        <span className="mobile-logo">
          <span className="chrome-text font-oxanium font-bold tracking-widest text-[14px]">ESTATE</span>
          <span className="chrome-text-accent font-oxanium font-bold tracking-widest text-[14px]">MIND</span>
        </span>
        <button className="mobile-menu-btn" aria-label="Меню">
          <span /><span /><span />
        </button>
      </nav>

      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="mobile-hero">
        {/* Grain overlay */}
        <div className="hero-grain" />

        {/* Chrome wire — bleeding in from top-right */}
        <img
          src={chromeWire}
          alt=""
          aria-hidden="true"
          className="chrome-deco"
          style={{
            width: 310,
            top: -30,
            right: -80,
            transform: 'rotate(-18deg)',
            opacity: 0.72,
          }}
        />

        {/* Chrome burst — right mid-hero */}
        <img
          src={chromeBurst}
          alt=""
          aria-hidden="true"
          className="chrome-deco"
          style={{
            width: 340,
            bottom: 60,
            right: -110,
            opacity: 0.48,
          }}
        />

        {/* Hero content */}
        <div className="hero-content">
          <span className="hero-eyebrow">Международная недвижимость</span>

          <h1 className="hero-heading chrome-text font-oxanium">
            Ваш<br />капитал<br />заслуживает<br />
            <span className="chrome-text-accent font-bold">свободы</span>
          </h1>

          <p className="hero-sub">
            ОАЭ · Турция · Кипр · Грузия · Португалия
          </p>

          <div className="hero-ctas">
            <a href="#" className="eom-btn-primary font-oxanium text-[12px] uppercase tracking-widest px-5 py-3">
              Подобрать объект
            </a>
            <a href="#" className="eom-btn-ghost font-oxanium text-[12px] uppercase tracking-widest px-5 py-3">
              Консультация
            </a>
          </div>

          {/* Stats strip */}
          <div className="hero-stats">
            {[['847', 'сделок'], ['12', 'стран'], ['₽0', 'комиссии']].map(([n, l]) => (
              <div key={l} className="stat-item">
                <span className="stat-num chrome-text font-oxanium font-bold">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CHROME DIVIDER ──────────────────────────────────────── */}
      <div className="chrome-divider" />

      {/* ─── WHY US ──────────────────────────────────────────────── */}
      <section className="mobile-section why-us-section">
        {/* Organic chrome form — bleeding left */}
        <img
          src={chromeOrganic}
          alt=""
          aria-hidden="true"
          className="chrome-deco"
          style={{
            width: 280,
            top: '50%',
            left: -110,
            transform: 'translateY(-50%) rotate(8deg)',
            opacity: 0.22,
          }}
        />

        <div className="section-inner">
          <p className="section-eyebrow">Почему нас выбирают</p>

          {[
            { num: '01', title: 'Юридическая чистота', desc: 'Каждый объект проходит полную проверку права собственности' },
            { num: '02', title: 'Локальные партнёры', desc: 'fäm Properties, Knight Frank и аккредитованные агентства в каждой стране' },
            { num: '03', title: 'Сделка за 14 дней', desc: 'От первого звонка до подписания — в среднем 14 рабочих дней' },
          ].map(({ num, title, desc }) => (
            <div key={num} className="feature-row">
              <span className="feature-num chrome-text font-oxanium">{num}</span>
              <div>
                <p className="feature-title font-oxanium">{title}</p>
                <p className="feature-desc">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── STATS GRID ──────────────────────────────────────────── */}
      <section className="stats-grid-section">
        {[
          ['$130M+', 'Закрыто сделок'],
          ['847', 'Семей'],
          ['12', 'Стран'],
          ['2019', 'Основан'],
        ].map(([v, l]) => (
          <div key={l} className="stats-grid-cell">
            <span className="stats-val chrome-text font-oxanium font-bold">{v}</span>
            <span className="stats-lbl">{l}</span>
          </div>
        ))}
      </section>

      {/* ─── PROCESS ─────────────────────────────────────────────── */}
      <section className="mobile-section process-section">
        {/* Chrome wire accent — top right corner */}
        <img
          src={chromeWire}
          alt=""
          aria-hidden="true"
          className="chrome-deco"
          style={{
            width: 180,
            top: -20,
            right: -40,
            transform: 'rotate(140deg) scaleX(-1)',
            opacity: 0.35,
          }}
        />

        <div className="section-inner">
          <p className="section-eyebrow">Процесс</p>

          {[
            { num: '01', title: 'Консультация', desc: 'Анализ задач и бюджета' },
            { num: '02', title: 'Подбор объектов', desc: 'Шорт-лист из закрытой базы' },
            { num: '03', title: 'Юр. сопровождение', desc: 'Проверка, документы' },
            { num: '04', title: 'Закрытие сделки', desc: 'Безопасный перевод, регистрация' },
          ].map(({ num, title, desc }) => (
            <div key={num} className="process-row">
              <div className="process-num-wrap">
                <span className="process-num chrome-text font-oxanium">{num}</span>
              </div>
              <div className="process-text">
                <p className="font-oxanium text-white text-[13px] font-medium">{title}</p>
                <p className="text-white/45 text-[12px] leading-relaxed mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── CTA ─────────────────────────────────────────────────── */}
      <section className="cta-section">
        {/* Burst in background — upper right */}
        <img
          src={chromeBurst}
          alt=""
          aria-hidden="true"
          className="chrome-deco"
          style={{
            width: 260,
            top: -60,
            right: -70,
            opacity: 0.30,
          }}
        />

        <div className="cta-card">
          <p className="font-oxanium text-[10px] tracking-[0.2em] text-white/35 uppercase mb-3">
            Первый шаг
          </p>
          <h2 className="font-oxanium text-[22px] chrome-text leading-tight mb-2">
            Бесплатная<br />консультация
          </h2>
          <p className="text-white/50 text-[13px] mb-6 leading-relaxed">
            Разберём вашу ситуацию и подберём лучшие варианты.
          </p>
          <a href="#" className="eom-btn-primary font-oxanium text-[12px] uppercase tracking-widest w-full text-center block py-3">
            Записаться
          </a>
        </div>
      </section>

      {/* ─── FOOTER STRIP ────────────────────────────────────────── */}
      <footer className="mobile-footer">
        <span className="font-oxanium text-[10px] text-white/25 tracking-widest uppercase">
          EstateofMind © 2026
        </span>
        <span className="font-oxanium text-[10px] text-white/25 tracking-widest uppercase">
          ₽0 комиссии
        </span>
      </footer>

    </div>
  );
}
