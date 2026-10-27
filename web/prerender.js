/**
 * Post-build prerender: reads dist/index.html and generates per-route HTML
 * with correct title, canonical, description, OG/Twitter meta, h1, and JSON-LD.
 * Output: dist/<route>.html (e.g. dist/good-morning-images.html)
 *         dist/_home.html (for the "/" route)
 *
 * Run after `vite build`:  node prerender.js
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { routes, SITE_URL } from './routeMeta.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, 'dist');
const template = readFileSync(join(distDir, 'index.html'), 'utf-8');

function escAttr(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

let count = 0;
for (const [route, meta] of Object.entries(routes)) {
  const canonical = route === '/' ? SITE_URL : `${SITE_URL}${route}`;

  // Replace <title>
  let html = template.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escAttr(meta.title)}</title>`,
  );

  // Replace meta description
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escAttr(meta.description)}" />`,
  );

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${escAttr(canonical)}" />`,
  );

  // Replace OG tags
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escAttr(meta.title)}" />`,
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escAttr(meta.description)}" />`,
  );
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${escAttr(canonical)}" />`,
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${escAttr(meta.title)}" />`,
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*" \/>/,
    `<meta name="twitter:description" content="${escAttr(meta.description)}" />`,
  );

  // Replace JSON-LD
  if (meta.jsonLd) {
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n    ${meta.jsonLd}\n    </script>`,
    );
  }

  // Inject h1 into body (hidden visually but present in HTML for crawlers)
  // Insert right after <div id="root"> so it's in the initial HTML
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root"><h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0">${escAttr(meta.h1)}</h1></div>`,
  );

  // Write to dist
  const filename = route === '/' ? '_home.html' : `${route.slice(1)}.html`;
  const outPath = join(distDir, filename);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  count++;
}

console.log(`Prerender: wrote ${count} route HTML files to dist/`);
