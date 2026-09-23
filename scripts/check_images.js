import fs from 'fs';
import path from 'path';

function getImages(dir) {
  let list = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      list.push(...getImages(full));
    } else if (f.endsWith('.jsx') || f.endsWith('.js')) {
      const code = fs.readFileSync(full, 'utf8');
      const matches = [...code.matchAll(/['"](\/?assets\/[^'"]+)['"]/g)].map(m => m[1]);
      list.push(...matches);
    }
  }
  return list;
}

const used = [...new Set(getImages('src'))];
console.log('All asset paths in src/ (components + data):');
let missingCount = 0;
used.forEach(img => {
  const localPath = path.join('public', img.replace(/^\//, ''));
  const exists = fs.existsSync(localPath);
  if (!exists) {
    missingCount++;
    console.log('[MISSING]', img, '-> looked at:', localPath);
  } else {
    console.log('[OK]', img);
  }
});

console.log('Total checked:', used.length, 'Missing:', missingCount);
