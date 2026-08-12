/**
 * Listing integrity helpers — verified bureau listings only.
 * Used by UI badges and by scripts/audit-listings.mjs (mirrored checks).
 */
import type { Listing } from '@/data/listings';

export type IntegrityIssue = {
  code: 'missing_agency_url' | 'missing_agency_photos' | 'missing_fields' | 'weak_attribution';
  message: string;
};

export function checkListingIntegrity(listing: Listing): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];

  if (!listing.agencyUrl || !/^https?:\/\//i.test(listing.agencyUrl)) {
    issues.push({
      code: 'missing_agency_url',
      message: 'Нет рабочей ссылки для верификации объекта',
    });
  }

  if (!listing.agency || listing.agency.trim().length < 2) {
    issues.push({
      code: 'weak_attribution',
      message: 'Не указан источник верификации',
    });
  }

  const photos = listing.agencyPhotos ?? [];
  if (photos.length === 0) {
    issues.push({
      code: 'missing_agency_photos',
      message: 'Нет фото объекта — только обложка-заглушка',
    });
  }

  if (!listing.description || !listing.legalFit || !listing.yieldEstimate || !listing.riskNote) {
    issues.push({
      code: 'missing_fields',
      message: 'Не заполнены описание или инвестиционные поля',
    });
  }

  return issues;
}

/** Fully verified: verification URL + core fields + at least one real photo. */
export function isListingVerified(listing: Listing): boolean {
  const issues = checkListingIntegrity(listing);
  return !issues.some((i) =>
    i.code === 'missing_agency_url' ||
    i.code === 'missing_fields' ||
    i.code === 'weak_attribution' ||
    i.code === 'missing_agency_photos',
  );
}

/** Soft catalog presence: URL + core text, photos optional. */
export function isListingCatalogReady(listing: Listing): boolean {
  const issues = checkListingIntegrity(listing);
  return !issues.some((i) =>
    i.code === 'missing_agency_url' || i.code === 'missing_fields' || i.code === 'weak_attribution',
  );
}

/** Russian beds label: Студия / 1 спальня / 2 спальни / 5 спален */
export function formatBedsLabel(beds: number | string): string {
  if (beds === 'Studio' || beds === 'studio') return 'Студия';
  const n = typeof beds === 'number' ? beds : parseInt(String(beds), 10);
  if (!Number.isFinite(n)) return String(beds);
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} спальня`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} спальни`;
  return `${n} спален`;
}

/** Russian baths/санузел label */
export function formatBathsLabel(baths: number): string {
  const n = baths;
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return `${n} санузел`;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return `${n} санузла`;
  return `${n} санузлов`;
}

/** Soft badge: has real bureau photos (stronger trust signal). */
export function hasAgencyGallery(listing: Listing): boolean {
  return (listing.agencyPhotos?.length ?? 0) >= 1;
}

/** Residency-oriented tags for catalogue filters. */
export function listingResidencyTags(listing: Listing): string[] {
  const tags = listing.tags ?? [];
  const out: string[] = [];
  const blob = [...tags, listing.legalFit, listing.description].join(' ').toLowerCase();

  if (tags.some((t) => /внж|резидент|visa|golden/i.test(t)) || /внж|golden visa|резидент/i.test(blob)) {
    out.push('residency');
  }
  if (listing.crypto) out.push('crypto');
  if (listing.exclusive) out.push('exclusive');
  return out;
}

/**
 * Catalogue / card cover: prefer first real agency photo, then listing.image.
 * Avoids shared dest-*.jpg placeholders when bureau photos exist.
 */
export function listingCoverImage(listing: Listing): string {
  const photo = listing.agencyPhotos?.find((p) => typeof p === 'string' && p.length > 0);
  if (photo) return photo;
  return listing.image;
}
