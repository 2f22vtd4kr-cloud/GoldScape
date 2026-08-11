#!/usr/bin/env node
/**
 * Spot-check: every listing with agency photos should have DNA;
 * DNA ids should exist in listings; flag missing agencyPhotos.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LISTINGS = path.join(ROOT, "artifacts/gory-resort/src/data/listings.ts");
const DNA = path.join(ROOT, "artifacts/gory-resort/src/data/property-dna.ts");
const REPORT = path.join(ROOT, "chats/screenshots-2026-08-11/dna-audit-report.md");

const listingsSrc = fs.readFileSync(LISTINGS, "utf8");
const dnaSrc = fs.readFileSync(DNA, "utf8");

const listingIds = [...listingsSrc.matchAll(/^\s+id:\s*(\d+),/gm)].map((m) => parseInt(m[1], 10));
const dnaIds = [...dnaSrc.matchAll(/^\s+(\d+):\s*\{/gm)].map((m) => parseInt(m[1], 10));

const withAgency = [...listingsSrc.matchAll(/id:\s*(\d+)[\s\S]*?agencyUrl:\s*'([^']+)'/g)].map(
  (m) => ({ id: parseInt(m[1], 10), url: m[2] }),
);

const missingDna = listingIds.filter((id) => !dnaIds.includes(id));
const orphanDna = dnaIds.filter((id) => !listingIds.includes(id));
const priority = [12, 18, 19, 20, 1, 2, 3];

const lines = [
  `# DNA vs listings audit`,
  ``,
  `Generated: ${new Date().toISOString()}`,
  ``,
  `- Listings: ${listingIds.length} — ${listingIds.join(", ")}`,
  `- DNA entries: ${dnaIds.length} — ${dnaIds.join(", ")}`,
  `- Missing DNA (listing has no DNA): ${missingDna.length ? missingDna.join(", ") : "none"}`,
  `- Orphan DNA (DNA without listing): ${orphanDna.length ? orphanDna.join(", ") : "none"}`,
  ``,
  `## Priority listings (recently corrected)`,
  ``,
  ...priority.map((id) => {
    const hasDna = dnaIds.includes(id);
    const hasListing = listingIds.includes(id);
    const agency = withAgency.find((a) => a.id === id);
    return `- p${id}: listing=${hasListing} DNA=${hasDna} agencyUrl=${agency?.url || "—"}`;
  }),
  ``,
  `## Agency URLs`,
  ``,
  ...withAgency.map((a) => `- p${a.id}: ${a.url}`),
  ``,
  `## Recommended next DNA audits`,
  `For each listing with agencyPhotos folder under public/images/agency/pN/, open real photos and verify DNA building/site matches (same process as p12/p18/p19).`,
];

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, lines.join("\n"));
console.log(lines.join("\n"));
