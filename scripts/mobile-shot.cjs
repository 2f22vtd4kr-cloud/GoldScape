// One-off helper: capture a mobile-viewport screenshot of a local dev URL using
// Playwright chromium. Usage: node scripts/mobile-shot.cjs <path> <outFile> [width] [height]
const path = process.argv[2] || '/';
const outFile = process.argv[3] || 'screenshots/mobile.jpg';
const width = parseInt(process.argv[4] || '390', 10);
const height = parseInt(process.argv[5] || '844', 10);

(async () => {
  const { chromium } = require('/home/runner/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width, height } });
  const context = page.context();
  await page.setViewportSize({ width, height });
  await page.goto(`http://127.0.0.1:5000${path}`, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(600);
  await page.screenshot({ path: outFile, type: 'jpeg', quality: 85 });
  await browser.close();
  console.log('saved', outFile);
})().catch(e => { console.error(e); process.exit(1); });
