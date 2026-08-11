#!/usr/bin/env node
/**
 * CI-style listing integrity audit.
 * Exit 1 if any listing lacks agencyUrl or required investment fields.
 *
 *   node scripts/audit-listings.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LISTINGS = path.join(ROOT, "artifacts/gory-resort/src/data/listings.ts");
const AGENCY_DIR = path.join(ROOT, "artifacts/gory-resort/public/images/agency");
const REPORT = path.join(ROOT, "chats/screenshots-2026-08-11/listing-integrity-report.md");

const src = fs.readFileSync(LISTINGS, "utf8");

// Split on listing object starts: "id: N,"
const blocks = [];
const idRe = /^\s+id:\s*(\d+),/gm;
let m;
const indices = [];
while ((m = idRe.exec(src))) {
  indices.push({ id: parseInt(m[1], 10), index: m.index });
}
for (let i = 0; i < indices.length; i++) {
  const start = indices[i].index;
  const end = i + 1 < indices.length ? indices[i + 1].index : src.length;
  blocks.push({ id: indices[i].id, text: src.slice(start, end) });
}

function field(block, name) {
  const re = new RegExp(`${name}:\\s*('(?:\\\\'|[^'])*'|"(?:\\\\"|[^"])*"|\\[[\\s\\S]*?\\]|true|false|\\d+)`, "m");
  const match = block.text.match(re);
  return match ? match[1] : null;
}

const rows = [];
let hardFails = 0;

for (const b of blocks) {
  const agencyUrl = field(b, "agencyUrl");
  const agency = field(b, "agency");
  const price = field(b, "price");
  const description = field(b, "description");
  const legalFit = field(b, "legalFit");
  const yieldEstimate = field(b, "yieldEstimate");
  const riskNote = field(b, "riskNote");
  const photosMatch = b.text.match(/agencyPhotos:\s*\[([\s\S]*?)\]/);
  const photoCount = photosMatch
    ? (photosMatch[1].match(/['"][^'"]+['"]/g) || []).length
    : 0;

  const issues = [];
  if (!agencyUrl || agencyUrl === "undefined") issues.push("missing_agency_url");
  if (!agency) issues.push("missing_agency");
  if (!description) issues.push("missing_description");
  if (!legalFit) issues.push("missing_legalFit");
  if (!yieldEstimate) issues.push("missing_yieldEstimate");
  if (!riskNote) issues.push("missing_riskNote");
  if (photoCount === 0) issues.push("no_agency_photos");

  // On-disk agency folder
  const folder = path.join(AGENCY_DIR, `p${b.id}`);
  const diskPhotos = fs.existsSync(folder)
    ? fs.readdirSync(folder).filter((f) => /\.(jpg|jpeg|png|webp)$/i.test(f)).length
    : 0;
  if (photoCount > 0 && diskPhotos === 0) issues.push("agency_photos_paths_but_folder_empty");
  if (diskPhotos > 0 && photoCount === 0) issues.push("disk_photos_not_wired_in_listings");

  const hard = issues.some((i) =>
    ["missing_agency_url", "missing_agency", "missing_description", "missing_legalFit"].includes(i),
  );
  if (hard) hardFails++;

  rows.push({
    id: b.id,
    price: price?.replace(/['"]/g, "") ?? "?",
    agency: agency?.replace(/['"]/g, "") ?? "?",
    photoCount,
    diskPhotos,
    issues,
    hard,
  });
}

const md = [
  `# Listing integrity report`,
  ``,
  `Generated: ${new Date().toISOString()}`,
  ``,
  `Listings: ${rows.length} · Hard fails: ${hardFails}`,
  ``,
  `| ID | Price | Agency | Photos (data) | Photos (disk) | Issues |`,
  `|----|-------|--------|---------------|---------------|--------|`,
  ...rows.map(
    (r) =>
      `| p${r.id} | ${r.price} | ${r.agency.slice(0, 24)} | ${r.photoCount} | ${r.diskPhotos} | ${r.issues.join(", ") || "ok"} |`,
  ),
  ``,
  hardFails
    ? `## Status: FAIL (${hardFails} listings missing required fields)`
    : `## Status: PASS (all listings have agencyUrl + core fields)`,
  ``,
  `Soft warnings (no_agency_photos) are expected for some markets until photos are scraped/added.`,
].join("\n");

fs.mkdirSync(path.dirname(REPORT), { recursive: true });
fs.writeFileSync(REPORT, md);
console.log(md);
process.exit(hardFails > 0 ? 1 : 0);
