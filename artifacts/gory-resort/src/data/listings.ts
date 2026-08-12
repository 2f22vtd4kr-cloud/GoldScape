import type { LocationMap } from '@/components/PropertyLocationMap';

/** Temporary stub after accidental overwrite — restore full LISTINGS from commit 6b3c666 ASAP. */
export interface Listing {
  id: number; country: string; city: string; district: string; type: string;
  price: string; pricePerSqm: string; beds: number | string; baths: number;
  area: number; image: string; agency: string; agencyUrl?: string; exclusive: boolean;
  tags: string[]; crypto: boolean; locationMap: LocationMap;
  agencyPhotos?: string[];
  description: string;
  neighborhood: string;
  legalFit: string;
  yieldEstimate: string;
  riskNote: string;
}

export const LISTINGS: Listing[] = [];

export const listingById = (id: number | string): Listing | undefined =>
  LISTINGS.find(l => l.id === Number(id));
