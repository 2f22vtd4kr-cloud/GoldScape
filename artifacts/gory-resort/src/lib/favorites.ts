import { useSyncExternalStore } from 'react';

/**
 * Client-only "saved listings" store — no backend, no account required.
 * Dmitri (fast, self-serve, no phone calls) and Irina (comparing options
 * for the family before committing to a call) both need a way to shortlist
 * listings across browsing sessions without talking to anyone first.
 *
 * localStorage (not sessionStorage): favorites should survive closing the
 * tab/browser, same as a real estate portal's "saved" list would.
 */
const KEY = 'eom-favorites';
const CHANGE_EVENT = 'eom-favorites-changed';

function parse(raw: string | null): number[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((n): n is number => typeof n === 'number') : [];
  } catch {
    return [];
  }
}

function readRaw(): string | null {
  try {
    return localStorage.getItem(KEY);
  } catch {
    // localStorage unavailable (private mode, disabled storage) — favorites just won't persist.
    return null;
  }
}

// useSyncExternalStore requires getSnapshot to return a *stable* reference
// until the underlying data actually changes — returning a freshly-filtered
// array on every call (even with identical contents) makes React think the
// store changed on every render, which re-triggers the subscription and
// spins into "Maximum update depth exceeded". Cache the parsed array and
// only re-parse when the raw string actually differs.
let cachedRaw: string | null | undefined;
let cachedIds: number[] = [];

function getSnapshot(): number[] {
  const raw = readRaw();
  if (raw !== cachedRaw) {
    cachedRaw = raw;
    cachedIds = parse(raw);
  }
  return cachedIds;
}

function write(ids: number[]) {
  const raw = JSON.stringify(ids);
  try {
    localStorage.setItem(KEY, raw);
  } catch {
    // Same fallback as above — the toggle still updates in-memory for this session via the cache below.
  }
  cachedRaw = raw;
  cachedIds = ids;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function getFavoriteIds(): number[] {
  return getSnapshot();
}

export function isFavoriteId(id: number): boolean {
  return getSnapshot().includes(id);
}

/** Returns the new state (true = now favorited) so callers can react without a second read. */
export function toggleFavorite(id: number): boolean {
  const ids = getSnapshot();
  const idx = ids.indexOf(id);
  if (idx >= 0) {
    write([...ids.slice(0, idx), ...ids.slice(idx + 1)]);
    return false;
  }
  write([...ids, id]);
  return true;
}

function subscribe(callback: () => void) {
  // The custom event covers same-tab toggles (the native 'storage' event only
  // fires in *other* tabs); 'storage' is included too so multiple tabs stay in sync.
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

/** Reactive list of favorited listing IDs — re-renders any subscriber when favorites change anywhere. */
export function useFavoriteIds(): number[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => []);
}

export function useIsFavorite(id: number): boolean {
  return useFavoriteIds().includes(id);
}
