/**
 * One-shot handoff of the click position (as a % of the viewport) from the
 * Properties grid to the PropertyDetail page, so the "fly into the building"
 * iris-wipe entrance can expand from wherever the user actually clicked
 * (card, pin, or "Подробнее" button) instead of always from the center.
 *
 * sessionStorage (not React context) because navigation is a full route
 * change via wouter — there is no shared component tree to pass state through.
 */
const KEY = 'eom-property-detail-origin';

export function setDetailOrigin(x: number, y: number) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify({
      x: (x / window.innerWidth) * 100,
      y: (y / window.innerHeight) * 100,
    }));
  } catch {
    // sessionStorage unavailable (private mode, etc.) — entrance just falls back to center.
  }
}

/** Reads and clears the stored origin — it's only valid for the very next detail page mount. */
export function consumeDetailOrigin(): { x: number; y: number } | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    const parsed = JSON.parse(raw);
    if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') return parsed;
    return null;
  } catch {
    return null;
  }
}
