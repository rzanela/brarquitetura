import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const distDir = path.resolve('dist');

// 1. Total JS size
const astroDir = path.join(distDir, '_astro');
let jsFiles = [];
if (fs.existsSync(astroDir)) {
  jsFiles = fs.readdirSync(astroDir).filter(f => f.endsWith('.js'));
}

console.log('=== CLIENT JS BUNDLE SIZES ===');
let totalRawJs = 0;
let totalGzipJs = 0;

for (const jsFile of jsFiles) {
  const filePath = path.join(astroDir, jsFile);
  const content = fs.readFileSync(filePath);
  const rawSize = content.length;
  const gzipSize = zlib.gzipSync(content).length;
  totalRawJs += rawSize;
  totalGzipJs += gzipSize;
  console.log(`- ${jsFile}: ${(rawSize / 1024).toFixed(2)} KB (gzip: ${(gzipSize / 1024).toFixed(2)} KB)`);
}
console.log(`Total JS: ${(totalRawJs / 1024).toFixed(2)} KB (gzip: ${(totalGzipJs / 1024).toFixed(2)} KB)`);
console.log(`Target: < 15.00 KB gzip -> ${totalGzipJs / 1024 < 15 ? 'PASSED (OK)' : 'FAILED'}`);

// 2. Home page payload
console.log('\n=== HOME PAGE INITIAL LOAD BUDGET ===');
const homeHtmlPath = path.join(distDir, 'index.html');
const homeHtml = fs.readFileSync(homeHtmlPath);
const homeHtmlSize = homeHtml.length;
const homeHtmlGzip = zlib.gzipSync(homeHtml).length;

console.log(`- Home HTML: ${(homeHtmlSize / 1024).toFixed(2)} KB (gzip: ${(homeHtmlGzip / 1024).toFixed(2)} KB)`);

// Check referenced CSS files in Home
const cssMatches = [...homeHtml.toString().matchAll(/href=["'](\/_astro\/[^"']+\.css)["']/g)].map(m => m[1]);
let totalCssRaw = 0;
let totalCssGzip = 0;
for (const cssRef of new Set(cssMatches)) {
  const cssPath = path.join(distDir, cssRef);
  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath);
    totalCssRaw += cssContent.length;
    totalCssGzip += zlib.gzipSync(cssContent).length;
    console.log(`- CSS ${path.basename(cssRef)}: ${(cssContent.length / 1024).toFixed(2)} KB (gzip: ${(zlib.gzipSync(cssContent).length / 1024).toFixed(2)} KB)`);
  }
}

// Check Hero image size (eager loaded picture)
const heroImgMatch = homeHtml.toString().match(/src=["'](\/_astro\/01\.[^"']+\.avif)["']/);
let heroImgSize = 0;
if (heroImgMatch) {
  const heroPath = path.join(distDir, heroImgMatch[1]);
  if (fs.existsSync(heroPath)) {
    heroImgSize = fs.readFileSync(heroPath).length;
    console.log(`- Hero Image (AVIF): ${(heroImgSize / 1024).toFixed(2)} KB`);
  }
}

const homeTotalPayload = (homeHtmlGzip + totalCssGzip + totalGzipJs + heroImgSize) / 1024;
console.log(`Estimated Home initial payload: ${homeTotalPayload.toFixed(2)} KB`);
console.log(`Target: < 900 KB -> ${homeTotalPayload < 900 ? 'PASSED (OK)' : 'FAILED'}`);

