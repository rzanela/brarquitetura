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
let brokenLinks = 0;

for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const hrefMatches = [...content.matchAll(/href=["'](\/brarquitetura\/[^"'#?]*)["'#?]/g)].map(m => m[1]);

  for (const href of hrefMatches) {
    // Strip /brarquitetura prefix
    let cleanHref = href.replace(/^\/brarquitetura/, '') || '/';
    
    // Test if file exists in dist
    let target = path.join(distDir, cleanHref);
    if (cleanHref.endsWith('/')) {
      target = path.join(target, 'index.html');
    } else if (!path.extname(target)) {
      target = target + '.html';
    }

    if (!fs.existsSync(target) && !fs.existsSync(path.join(distDir, cleanHref, 'index.html'))) {
      console.error(`Broken link in ${path.relative(distDir, file)}: ${href} -> ${target}`);
      brokenLinks++;
    }
  }
}

if (brokenLinks === 0) {
  console.log(`Internal links check PASSED: All /brarquitetura/ links resolve to valid HTML pages in ./dist.`);
} else {
  console.error(`Found ${brokenLinks} broken links.`);
}
