import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { ChromeSwitch } from '@/components/ChromeSwitch';

/**
 * Theme toggle — thin wrapper over ChromeSwitch with Sun/Moon icons.
 * All spring physics, specular layers, and responsive sizing live in ChromeSwitch.
 *
 * Mapping:
 *   dark  → thumb left, Sun icon  (unchecked)
 *   light → thumb right, Moon icon (checked)
 */
export function ChromeThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <ChromeSwitch
      checked={!isDark}
      onCheckedChange={() => toggleTheme()}
      aria-label={isDark ? 'Переключить на светлую тему' : 'Переключить на тёмную тему'}
      className={className}
      checkedIcon={<Moon className="h-3.5 w-3.5 max-sm:h-4 max-sm:w-4" strokeWidth={2.35} />}
      uncheckedIcon={<Sun className="h-3.5 w-3.5 max-sm:h-4 max-sm:w-4" strokeWidth={2.35} />}
    />
  );
}
