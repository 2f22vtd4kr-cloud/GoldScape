import { useSyncExternalStore } from 'react';

/**
 * Session-scoped "compare shortlist" — Irina (comparing a handful of options
 * with her husband before deciding) needs to see specs/price/legal-fit
 * side-by-side, not just skim cards one at a time.
 *
 * sessionStorage (not localStorage, unlike favorites): a comparison set is a
 * short-lived task for one browsing session, not something to keep forever.
 * Capped at MAX_COMPARE — beyond that a side-by-side table stops being readable.
 */
const KEY = 'eom-compare';
const CHANGE_EVENT = 'eom-compare-changed';
export const MAX_COMPARE = 3;

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
    return sessionStorage.getItem(KEY);
  } catch {
    return null;
  }
}

// Same getSnapshot-caching requirement as favorites.ts — see
// .agents/memory/favorites-getsnapshot-caching.md. Returning a fresh array
// every call makes useSyncExternalStore think the store changed on every
// render and spin into "Maximum update depth exceeded".
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
    sessionStorage.setItem(KEY, raw);
  } catch {
    // sessionStorage unavailable — selection still updates in-memory for this render via the cache below.
  }
  cachedRaw = raw;
  cachedIds = ids;
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function getCompareIds(): number[] {
  return getSnapshot();
}

/** Returns false if the id wasn't added because MAX_COMPARE was already reached. */
export function toggleCompare(id: number): boolean {
  const ids = getSnapshot();
  const idx = ids.indexOf(id);
  if (idx >= 0) {
    write([...ids.slice(0, idx), ...ids.slice(idx + 1)]);
    return true;
  }
  if (ids.length >= MAX_COMPARE) return false;
  write([...ids, id]);
  return true;
}

export function clearCompare() {
  write([]);
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function useCompareIds(): number[] {
  return useSyncExternalStore(subscribe, getSnapshot, () => []);
}

export function useIsComparing(id: number): boolean {
  return useCompareIds().includes(id);
}
