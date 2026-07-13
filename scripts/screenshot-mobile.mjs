import puppeteer from 'puppeteer-core';
import path from 'path';
import { mkdirSync } from 'fs';

const CHROMIUM = '/nix/store/0n9rl5l9syy808xi9bk4f6dhnfrvhkww-playwright-browsers-chromium/chromium-1080/chrome-linux/chrome';
const BASE = 'http://127.0.0.1:19679';
const OUT = 'screenshots/mobile';

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
// iPhone 14 Pro viewport, 2x pixel ratio
await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');

await page.goto(BASE, { waitUntil: 'networkidle0', timeout: 30000 });
await sleep(1500);

for (const section of sections) {
  if (section.scrollToBottom) {
    await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  } else if (section.id) {
    await page.evaluate((id) => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, section.id);
  } else {
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  }

  await sleep(section.id === 'vision' ? 2500 : 900);

  const file = path.join(OUT, `${section.name}.jpg`);
  await page.screenshot({ path: file, type: 'jpeg', quality: 90, fullPage: false });
  console.log(`✓ ${section.name}`);
}

await browser.close();
console.log('Done.');
