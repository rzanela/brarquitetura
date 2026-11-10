import fs from 'node:fs';
import path from 'node:path';

function findLinks(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      findLinks(full);
    } else if (f.endsWith('.astro') || f.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf8');
      const matches = [...content.matchAll(/href=["'](\/[^"']*)["']/g)];
      if (matches.length > 0) {
        console.log(`\nFile: ${full}`);
        for (const m of matches) {
          console.log(`  ${m[1]}`);
        }
      }
    }
  }
}

findLinks('./src');

