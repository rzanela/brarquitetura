import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log('Total HTML pages found:', htmlFiles.length);

let errors = 0;
let warnings = 0;

for (const file of htmlFiles) {
  const relPath = path.relative(distDir, file);
  const content = fs.readFileSync(file, 'utf8');

  // Check img without alt
  const imgMatches = content.match(/<img(?![^>]*\balt=)[^>]*>/gi);
  if (imgMatches) {
    console.error('ERROR: Missing alt attribute in', relPath, imgMatches);
    errors++;
  }

  // Check empty alts that are not decorative
  const emptyAltMatches = content.match(/<img[^>]*\balt=["']\s*["'][^>]*>/gi);
  if (emptyAltMatches) {
    console.log('INFO: Decorative/empty alt in', relPath, emptyAltMatches.length);
  }

  // Check form labels
  const inputsWithoutLabel = content.match(/<input(?![^>]*type=["'](hidden|submit|button|checkbox|radio)["'])(?![^>]*aria-label)[^>]*>/gi);
  
  // Check lang attribute
  if (!content.includes('lang="pt-BR"')) {
    console.error('ERROR: Missing lang="pt-BR" in', relPath);
    errors++;
  }

  // Check title
  if (!content.includes('<title>')) {
    console.error('ERROR: Missing <title> in', relPath);
    errors++;
  }

  // Check meta description
  if (!content.includes('<meta name="description"')) {
    console.error('ERROR: Missing meta description in', relPath);
    errors++;
  }

  // Check skip-to-content link
  if (!content.includes('class="skip-to-content"')) {
    console.warn('WARN: Missing skip-to-content in', relPath);
    warnings++;
  }
}

console.log(`Audit finished. Errors: ${errors}, Warnings: ${warnings}`);

