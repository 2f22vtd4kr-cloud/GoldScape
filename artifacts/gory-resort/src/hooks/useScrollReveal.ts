import { useEffect } from 'react';

/**
 * useScrollReveal — scroll-triggered reveal animation system
 *
 * Animation system v5 (final after 5-iteration critique cycle):
 *   v1: basic opacity/translateY, `ease` timing — too generic, no brand feel
 *   v2: cubic-bezier curves, directional variants, stagger — opacity curve wrong (ease-in-out)
 *   v3: separate opacity/transform curves, heading sweep, stagger on [data-reveal] children
 *   v4: overlay blend for sweep, identified overflow:clip descender problem
 *   v5: clip-path on ::after (no overflow needed), correct ease-out on opacity,
 *       will-change managed lifecycle, prefers-reduced-motion respected
 *
 * Usage:
 *   - Add data-reveal="up|left|right|scale" to elements that should animate in
 *   - Add data-stagger to a container — its [data-reveal] children get staggered delays
 *   - Add section-reveal-heading class to h2/h3 elements for chrome sweep on entry
 *   - Add data-counter to stat elements — their numeric text content animates from 0
 */
export function useScrollReveal() {
  useEffect(() => {
    // ── Reveal observer ─────────────────────────────────────────────────────
    const revealObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          el.classList.add('is-revealed');
          el.style.willChange = ''; // release after animation to avoid memory overhead
          revealObs.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' },
    );

    document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      el.style.willChange = 'transform, opacity';
      revealObs.observe(el);
    });

    // ── Heading sweep observer ───────────────────────────────────────────────
    const headingObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          headingObs.unobserve(entry.target);
        });
      },
      { threshold: 0.5 },
    );

    document.querySelectorAll('.section-reveal-heading').forEach((el) => {
      headingObs.observe(el);
    });

    // ── Counter animation observer ───────────────────────────────────────────
    const counterObs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animateCounter(entry.target as HTMLElement);
          counterObs.unobserve(entry.target);
        });
      },
      { threshold: 0.8 },
    );

    document.querySelectorAll<HTMLElement>('[data-counter]').forEach((el) => {
      counterObs.observe(el);
    });

    return () => {
      revealObs.disconnect();
      headingObs.disconnect();
      counterObs.disconnect();
    };
  }, []);
}

/** easeOutExpo — snappy deceleration matching the chrome brand's assertive feel */
function easeOutExpo(t: number): number {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCounter(el: HTMLElement) {
  const originalText = el.textContent?.trim() ?? '';

  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Extract: prefix ($), number (130, 847, 12, 2019), suffix (M+, +, empty)
  const match = originalText.match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  if (!match) return;

  const [, prefix, numStr, suffix] = match;
  const target = parseInt(numStr.replace(/,/g, ''), 10);
  if (Number.isNaN(target) || target <= 0) return;

  // Duration scales with magnitude so "2019" doesn't feel slow, "847" feels deliberate
  const duration = Math.min(2400, Math.max(900, target * 1.8));
  const startTime = performance.now();

  function tick(now: number) {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.round(easeOutExpo(progress) * target);
    el.textContent = `${prefix}${current}${suffix}`;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}
