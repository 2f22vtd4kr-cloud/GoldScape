import puppeteer from 'puppeteer-core';
import path from 'path';
import { mkdirSync } from 'fs';

const CHROMIUM = '/nix/store/0n9rl5l9syy808xi9bk4f6dhnfrvhkww-playwright-browsers-chromium/chromium-1080/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:5000';
const OUT = 'screenshots';

mkdirSync(OUT, { recursive: true });

const sections = [
  { name: '01-hero',        id: null },
  { name: '02-vision',      id: 'vision' },
  { name: '03-ski',         id: 'ski' },
  { name: '04-stay',        id: 'stay' },
  { name: '05-experiences', id: 'experiences' },
  { name: '06-investment',  id: 'invest' },
  { name: '07-press',       id: 'press' },
  { name: '08-gallery',     id: 'gallery' },
  { name: '09-contact',     id: 'contact' },
  { name: '10-footer',      id: null, scrollToBottom: true },
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROMIUM,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

// Load page once; disable framer-motion reduced-motion so animations fire
await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 30000 });

// Give React time to mount and IntersectionObserver time to fire for hero
await sleep(1500);

for (const section of sections) {
  if (section.scrollToBottom) {
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  } else if (section.id) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, section.id);
    if (section.scrollExtra) {
      await page.evaluate((extra) => window.scrollBy(0, extra), section.scrollExtra);
    }
  } else {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }

  // Let IntersectionObserver fire + framer-motion render.
  // Vision's stat counters are spring-animated and need longer to settle.
  await sleep(section.id === 'vision' ? 2500 : 800);

  const file = path.join(OUT, `${section.name}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 90, fullPage: false });
  console.log(`✓ ${section.name}`);
}

await browser.close();
console.log('Done.');
