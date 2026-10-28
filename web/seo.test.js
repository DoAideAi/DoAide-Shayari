/**
 * SEO consistency checks: sitemap ⇔ routeMeta ⇔ App.jsx routes, plus
 * prerendered HTML output when dist/ exists.
 *
 * Run: node --test seo.test.js
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { routes, SITE_URL } from './routeMeta.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const read = (p) => readFileSync(join(__dirname, p), 'utf-8');

const sitemapPaths = [...read('public/sitemap.xml').matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map(([, loc]) => loc.replace(SITE_URL, '').replace(/^$/, '/'));

const appPaths = [...read('src/App.jsx').matchAll(/<Route path="([^"]+)"/g)]
  .map(([, p]) => p)
  .filter((p) => !p.includes(':') && p !== '*' && p !== '/search');

test('sitemap lists exactly the prerendered routes', () => {
  assert.deepEqual([...sitemapPaths].sort(), Object.keys(routes).sort());
});

test('every indexable App route has prerender metadata', () => {
  assert.deepEqual(appPaths.filter((p) => !routes[p]), []);
});

test('titles are unique and metadata is complete', () => {
  const titles = Object.values(routes).map((r) => r.title);
  assert.equal(new Set(titles).size, titles.length);
  for (const [path, meta] of Object.entries(routes)) {
    for (const field of ['title', 'description', 'h1', 'jsonLd']) {
      assert.ok(meta[field], `${path} missing ${field}`);
    }
    const ld = JSON.parse(meta.jsonLd);
    assert.equal(ld['@context'], 'https://schema.org', `${path} JSON-LD context`);
  }
});

test('prerendered HTML has title, canonical, h1, JSON-LD and social tags', { skip: !existsSync(join(__dirname, 'dist/_home.html')) }, () => {
  for (const [path, meta] of Object.entries(routes)) {
    const file = path === '/' ? '_home.html' : `${path.slice(1)}.html`;
    const html = read(`dist/${file}`);
    const canonical = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
    assert.match(html, new RegExp(`<link rel="canonical" href="${canonical}" />`), `${path} canonical`);
    assert.ok(html.includes('<h1'), `${path} h1`);
    assert.ok(html.includes(`<title>${meta.title.replace(/&/g, '&amp;')}</title>`), `${path} title`);
    for (const tag of ['og:title', 'og:url', 'og:image', 'twitter:card', 'twitter:image']) {
      assert.ok(html.includes(tag), `${path} ${tag}`);
    }
    const [, ld] = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    JSON.parse(ld);
  }
});
