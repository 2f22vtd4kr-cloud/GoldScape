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
      message: 'Нет рабочей ссылки на страницу агентства',
    });
  }

  if (!listing.agency || listing.agency.trim().length < 2) {
    issues.push({
      code: 'weak_attribution',
      message: 'Не указано агентство',
    });
  }

  const photos = listing.agencyPhotos ?? [];
  if (photos.length === 0) {
    issues.push({
      code: 'missing_agency_photos',
      message: 'Нет фотографий агентства — только обложка',
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

/** Listing is “verified” when it has agency URL + at least one agency photo + core fields. */
export function isListingVerified(listing: Listing): boolean {
  const issues = checkListingIntegrity(listing);
  return !issues.some((i) =>
    i.code === 'missing_agency_url' || i.code === 'missing_fields' || i.code === 'weak_attribution',
  );
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
