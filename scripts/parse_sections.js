import fs from 'fs';

const html = fs.readFileSync('C:/Users/Owner/.gemini/antigravity-ide/brain/eff833e3-5827-410e-9975-1b68efee8b78/.system_generated/steps/182/content.md', 'utf8');

// Also extract nav and footer
const nav = html.match(/<nav[\s\S]*?<\/nav>/);
console.log('=== NAVBAR ===');
if (nav) {
  const links = [...nav[0].matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({ href: m[1], text: m[2].replace(/<[^>]*>/g, '').trim() }));
  console.log('Nav links:', links);
}

console.log('\n=== SECTIONS ===');
const sectionMatches = [...html.matchAll(/<section([\s\S]*?)<\/section>/g)];
console.log('Total sections:', sectionMatches.length);

sectionMatches.forEach((m, idx) => {
  const full = m[0];
  const classMatch = full.match(/class="([^"]*)"/);
  const idMatch = full.match(/id="([^"]*)"/);
  const headings = [...full.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g)].map(h => h[1].replace(/<[^>]*>/g, '').trim());
  const paragraphs = [...full.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(p => p[1].replace(/<[^>]*>/g, '').trim()).filter(Boolean);
  const buttons = [...full.matchAll(/<(?:button|a)[^>]*class="([^"]*)"[^>]*>([\s\S]*?)<\/(?:button|a)>/g)].map(b => ({
    class: b[1],
    text: b[2].replace(/<[^>]*>/g, '').trim()
  })).filter(b => b.text);
  const images = [...full.matchAll(/<img[^>]*src="([^"]*)"[^>]*>/g)].map(img => img[1]);

  console.log(`\n--- [Section ${idx + 1}] ---`);
  console.log('Class:', classMatch ? classMatch[1] : '');
  console.log('Id:', idMatch ? idMatch[1] : '');
  console.log('Headings:', headings);
  console.log('Paragraphs:', paragraphs.slice(0, 3));
  console.log('Images:', images);
  console.log('Key Buttons/Links:', buttons.slice(0, 4));
});

console.log('\n=== FOOTER ===');
const footer = html.match(/<footer[\s\S]*?<\/footer>/);
if (footer) {
  const fHeadings = [...footer[0].matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/g)].map(h => h[1].replace(/<[^>]*>/g, '').trim());
  console.log('Footer headings:', fHeadings);
  const fLinks = [...footer[0].matchAll(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(m => ({ href: m[1], text: m[2].replace(/<[^>]*>/g, '').trim() }));
  console.log('Footer links count:', fLinks.length);
}
