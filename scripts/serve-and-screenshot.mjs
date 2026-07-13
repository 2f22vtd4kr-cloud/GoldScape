import puppeteer from 'puppeteer-core';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { mkdirSync } from 'fs';

const CHROMIUM = '/nix/store/0n9rl5l9syy808xi9bk4f6dhnfrvhkww-playwright-browsers-chromium/chromium-1080/chrome-linux/chrome';
const DIST    = path.resolve('artifacts/gory-resort/dist/public');
const OUT     = 'screenshots';
const PORT    = 19700;

mkdirSync(OUT, { recursive: true });

// ── simple static file server ──────────────────────────────────────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.ttf':  'font/ttf',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0].split('#')[0] || '/';
  let filePath = path.join(DIST, urlPath === '/' ? 'index.html' : urlPath);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST, 'index.html');
  }
  const ext  = path.extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime, 'Access-Control-Allow-Origin': '*' });
    res.end(data);
  } catch (e) {
    res.writeHead(404); res.end('Not found: ' + filePath);
    console.log('404:', filePath);
  }
});

await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
console.log(`Static server on http://127.0.0.1:${PORT}`);

// ── Puppeteer ──────────────────────────────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  executablePath: CHROMIUM,
  args: [
    '--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage',
    '--disable-web-security', '--force-color-profile=srgb',
    '--disable-features=VizDisplayCompositor',
  ],
  headless: true,
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

// Capture ALL errors before load
await page.evaluateOnNewDocument(() => {
  window.__errors = [];
  window.__consoleErrors = [];
  window.addEventListener('error', (e) => window.__errors.push({ msg: e.message, src: e.filename, line: e.lineno }));
  window.addEventListener('unhandledrejection', (e) => window.__errors.push({ msg: 'Unhandled: ' + String(e.reason) }));
  const origErr = console.error;
  console.error = (...args) => { window.__consoleErrors.push(args.map(String).join(' ')); origErr(...args); };
});

page.on('pageerror', (e) => console.error('PAGEERROR:', e.message));
page.on('console', (m) => console.log(`[${m.type()}] ${m.text()}`));
page.on('requestfailed', (r) => console.log('REQFAILED:', r.url(), r.failure()?.errorText));
page.on('response', (r) => { if (r.status() >= 400) console.log('HTTP', r.status(), r.url()); });

await page.goto(`http://127.0.0.1:${PORT}`, { waitUntil: 'load', timeout: 30000 });
await sleep(5000);

// Diagnostic snapshot
const diag = await page.evaluate(() => ({
  rootChildren: document.getElementById('root')?.children.length,
  bodyScrollH:  document.body.scrollHeight,
  errors:       window.__errors,
  consoleErrors:window.__consoleErrors,
  rootHTML:     document.getElementById('root')?.innerHTML?.slice(0, 300),
  scripts:      Array.from(document.querySelectorAll('script')).map(s => s.src || s.type),
}));
console.log('\nDIAGNOSTIC:', JSON.stringify(diag, null, 2));

// Take a diagnostic screenshot regardless
await page.screenshot({ path: path.join(OUT, 'diag.jpg'), type: 'jpeg', quality: 90 });

await browser.close();
server.close();
