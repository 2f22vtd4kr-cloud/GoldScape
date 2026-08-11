import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Reusable liquid-chrome binary switch.
 *
 * Spring physics (same as ChromeThemeToggle):
 *   Thumb: k=380, c=30, m=0.85 → ζ ≈ 0.83 (near-critical, weighty)
 *
 * No backdrop-filter — pure metallic gradients + layered specular.
 * Responsive: larger hit target on mobile (max-sm).
 *
 * Use for any on/off control that should match EstateofMind chrome identity
 * (theme, filters, residency flags, feature toggles, etc.).
 */
export interface ChromeSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  /** Accessible name — required for a11y */
  'aria-label': string;
  disabled?: boolean;
  className?: string;
  /** Optional icons rendered inside the thumb (e.g. Sun/Moon) */
  checkedIcon?: React.ReactNode;
  uncheckedIcon?: React.ReactNode;
  id?: string;
}

export function ChromeSwitch({
  checked,
  onCheckedChange,
  'aria-label': ariaLabel,
  disabled = false,
  className,
  checkedIcon,
  uncheckedIcon,
  id,
}: ChromeSwitchProps) {
  const reduceMotion = useReducedMotion();

  const thumbSpring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 380, damping: 30, mass: 0.85 };

  const iconSpring = reduceMotion
    ? { duration: 0 }
    : { type: 'spring' as const, stiffness: 520, damping: 28 };

  return (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => !disabled && onCheckedChange(!checked)}
      className={cn(
        'chrome-switch group relative inline-flex shrink-0 items-center rounded-full',
        'h-9 w-[3.35rem] p-[3px]',
        'max-sm:h-11 max-sm:w-[3.75rem] max-sm:p-[3.5px]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c8c4bc]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'active:scale-[0.96] transition-transform duration-150',
        'touch-manipulation',
        disabled && 'opacity-45 pointer-events-none',
        className,
      )}
    >
      {/* Track */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-0 rounded-full transition-[background] duration-400',
          'bg-gradient-to-b from-[#2e2c2a] via-[#1c1b19] to-[#0e0d0c]',
          'shadow-[inset_0_1px_1px_rgba(255,255,255,0.14),inset_0_-2px_3px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.05)]',
          checked && 'from-[#3c3a36] via-[#2a2824] to-[#181614]',
        )}
      />

      {/* Iridescent rim */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-full opacity-35 transition-opacity duration-500 group-hover:opacity-65 max-sm:group-hover:opacity-50"
        style={{
          background:
            'conic-gradient(from 200deg, transparent 0%, #a8a0c0 16%, #c8e8f8 30%, #f0dce8 46%, #e8d8f0 60%, transparent 76%)',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          WebkitMaskComposite: 'xor',
          padding: '1px',
        }}
      />

      {/* Thumb */}
      <motion.span
        layout
        transition={thumbSpring}
        className={cn(
          'relative z-10 flex items-center justify-center rounded-full',
          'h-[1.7rem] w-[1.7rem] max-sm:h-[2rem] max-sm:w-[2rem]',
          checked ? 'ml-auto' : 'ml-0',
        )}
        style={{
          background: checked
            ? `linear-gradient(
                145deg,
                #fffef9 0%,
                #f4f0e8 16%,
                #d8d4cc 36%,
                #b0aca4 56%,
                #848078 76%,
                #5c5a54 100%
              )`
            : `linear-gradient(
                145deg,
                #f8f4ee 0%,
                #e8e4dc 18%,
                #c8c4bc 38%,
                #98948c 58%,
                #6c6860 78%,
                #4a4842 100%
              )`,
          boxShadow: `
            0 1px 4px rgba(0,0,0,0.55),
            0 0 0 0.5px rgba(255,255,255,0.12),
            inset 0 1.5px 2px rgba(255,255,255,0.65),
            inset 0 -1.5px 2.5px rgba(0,0,0,0.35)
          `,
        }}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[1.5px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 32% 26%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.35) 38%, transparent 68%)',
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[1.5px] rounded-full opacity-60"
          style={{
            background:
              'radial-gradient(ellipse 90% 70% at 50% 40%, rgba(255,255,255,0.22) 0%, transparent 65%)',
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-[3px] bottom-[2px] h-[40%] rounded-b-full opacity-40"
          style={{
            background:
              'linear-gradient(to top, rgba(255,255,255,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Slow liquid sheen — CSS only, reduced-motion aware */}
        <span className="chrome-sheen" aria-hidden>
          <span />
        </span>

        {(checkedIcon || uncheckedIcon) && (
          <span className="relative z-10 flex h-3.5 w-3.5 max-sm:h-4 max-sm:w-4 items-center justify-center">
            <motion.span
              key={checked ? 'on' : 'off'}
              initial={
                reduceMotion
                  ? false
                  : { opacity: 0, scale: 0.55, rotate: checked ? -48 : 48 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={iconSpring}
              className="absolute inset-0 flex items-center justify-center text-[#1e1c18]"
            >
              {checked ? checkedIcon : uncheckedIcon}
            </motion.span>
          </span>
        )}
      </motion.span>
    </button>
  );
}
