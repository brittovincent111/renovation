/**
 * Route-level SEO audit.
 *
 * Crawls a running build, checks every reachable route, and cross-checks the
 * result set for the problems that are invisible page-by-page: duplicate
 * titles, orphans, sitemap drift, canonical mismatches, broken internal links.
 *
 *   npx next build && npx next start -p 3100 &
 *   node scripts/seo-audit.mjs http://127.0.0.1:3100
 *
 * Writes seo-audit.json (machine-readable) and prints a human summary.
 * Exits non-zero if any HIGH severity finding is present, so it can gate CI.
 *
 * It reports what it can verify from the application itself. It cannot and does
 * not claim anything about live Google indexing — that needs Search Console.
 */
import fs from 'node:fs';

const BASE = (process.argv[2] || 'http://127.0.0.1:3100').replace(/\/$/, '');
/** Host the canonical tags should declare, independent of the host we crawl. */
const CANONICAL_ORIGIN = 'https://renovationcalculator.online';

const THIN_CONTENT_WORDS = 300;
const TITLE_MAX = 60;
const DESC_MIN = 70;
const DESC_MAX = 160;

const findings = [];
function add(severity, code, message, detail = {}) {
  findings.push({ severity, code, message, ...detail });
}

const strip = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

function one(re, s) {
  const m = s.match(re);
  return m ? m[1].trim() : null;
}

function jsonLdTypes(html) {
  const types = new Set();
  for (const m of html.matchAll(
    /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      const walk = (n) => {
        if (Array.isArray(n)) return n.forEach(walk);
        if (n && typeof n === 'object') {
          if (typeof n['@type'] === 'string') types.add(n['@type']);
          Object.values(n).forEach(walk);
        }
      };
      walk(JSON.parse(m[1]));
    } catch {
      add('HIGH', 'INVALID_JSONLD', 'JSON-LD block failed to parse');
    }
  }
  return [...types];
}

function internalLinks(html) {
  const out = new Set();
  for (const m of html.matchAll(/<a[^>]+href="([^"]+)"/gi)) {
    let h = m[1];
    if (/^(https?:)?\/\//i.test(h)) {
      if (!h.includes('renovationcalculator.online')) continue;
      h = h.replace(/^https?:\/\/[^/]+/i, '');
    }
    if (!h.startsWith('/') || h.startsWith('/_next')) continue;
    out.add(h.replace(/[#?].*$/, '') || '/');
  }
  return [...out];
}

async function getSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  if (!res.ok) {
    add('HIGH', 'SITEMAP_STATUS', `sitemap.xml returned ${res.status}`);
    return [];
  }
  const ct = res.headers.get('content-type') || '';
  if (!/xml/i.test(ct)) add('MEDIUM', 'SITEMAP_TYPE', `sitemap content-type is "${ct}"`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(CANONICAL_ORIGIN, '').replace(/^https?:\/\/[^/]+/, '') || '/',
  );
}

const visited = new Map();

async function visit(route) {
  if (visited.has(route)) return visited.get(route);
  const res = await fetch(BASE + route, { redirect: 'manual' });
  const rec = { route, status: res.status };

  if (res.status >= 300 && res.status < 400) {
    rec.redirectTo = res.headers.get('location');
    visited.set(route, rec);
    return rec;
  }
  if (!res.ok) {
    visited.set(route, rec);
    return rec;
  }

  const html = await res.text();
  const head = html.slice(0, html.indexOf('</head>') + 7 || html.length);

  rec.title = one(/<title>([^<]*)<\/title>/i, head);
  rec.description = one(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i, head);
  rec.canonical = one(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i, head);
  rec.robots = one(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i, head);
  rec.ogTitle = one(/<meta[^>]+property="og:title"[^>]+content="([^"]*)"/i, head);
  rec.indexable = !/noindex/i.test(rec.robots || '');
  rec.h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => strip(m[1]));
  rec.words = strip(html).split(' ').filter(Boolean).length;
  rec.schema = jsonLdTypes(html);
  rec.links = internalLinks(html);
  rec.imagesMissingAlt = [...html.matchAll(/<img\b[^>]*>/gi)].filter(
    (m) => !/\balt=/i.test(m[0]),
  ).length;

  visited.set(route, rec);
  return rec;
}

// ---- crawl -----------------------------------------------------------------
const sitemapUrls = await getSitemapUrls();
const queue = ['/', ...sitemapUrls];
const seen = new Set();
while (queue.length) {
  const r = queue.shift();
  if (seen.has(r)) continue;
  seen.add(r);
  const rec = await visit(r);
  if (rec.links) for (const l of rec.links) if (!seen.has(l)) queue.push(l);
}

const pages = [...visited.values()];
const ok = pages.filter((p) => p.status === 200);
const indexable = ok.filter((p) => p.indexable);

// ---- per-page checks -------------------------------------------------------
for (const p of ok) {
  if (!p.title) add('HIGH', 'NO_TITLE', 'Missing <title>', { route: p.route });
  else if (p.title.length > TITLE_MAX)
    add('LOW', 'TITLE_LONG', `Title ${p.title.length} chars (>${TITLE_MAX}, truncates in SERPs)`, { route: p.route });

  if (!p.description) add('MEDIUM', 'NO_DESCRIPTION', 'Missing meta description', { route: p.route });
  else if (p.description.length < DESC_MIN || p.description.length > DESC_MAX)
    add('LOW', 'DESC_LENGTH', `Description ${p.description.length} chars (outside ${DESC_MIN}-${DESC_MAX})`, { route: p.route });

  if (!p.canonical) add('HIGH', 'NO_CANONICAL', 'Missing canonical tag', { route: p.route });
  else {
    const expected = CANONICAL_ORIGIN + (p.route === '/' ? '' : p.route);
    if (p.canonical.replace(/\/$/, '') !== expected.replace(/\/$/, ''))
      add('MEDIUM', 'CANONICAL_MISMATCH', `Canonical "${p.canonical}" != expected "${expected}"`, { route: p.route });
  }

  if (p.h1s.length === 0) add('HIGH', 'NO_H1', 'No <h1> on page', { route: p.route });
  else if (p.h1s.length > 1)
    add('MEDIUM', 'MULTIPLE_H1', `${p.h1s.length} <h1> elements`, { route: p.route });

  if (p.indexable && p.words < THIN_CONTENT_WORDS)
    add('MEDIUM', 'THIN_CONTENT', `Only ${p.words} words rendered`, { route: p.route });

  if (p.imagesMissingAlt > 0)
    add('LOW', 'IMG_NO_ALT', `${p.imagesMissingAlt} <img> without alt`, { route: p.route });

  if (p.indexable && !p.ogTitle)
    add('LOW', 'NO_OG', 'No og:title', { route: p.route });
}

// ---- cross-page checks -----------------------------------------------------
function dupes(key) {
  const m = new Map();
  for (const p of indexable) {
    const v = p[key];
    if (!v) continue;
    if (!m.has(v)) m.set(v, []);
    m.get(v).push(p.route);
  }
  return [...m.entries()].filter(([, r]) => r.length > 1);
}
for (const [val, routes] of dupes('title'))
  add('MEDIUM', 'DUPLICATE_TITLE', `${routes.length} pages share the title "${val.slice(0, 60)}"`, { routes });
for (const [val, routes] of dupes('description'))
  add('MEDIUM', 'DUPLICATE_DESCRIPTION', `${routes.length} pages share a meta description`, { routes, sample: val.slice(0, 80) });

const h1map = new Map();
for (const p of indexable) {
  const v = p.h1s[0];
  if (!v) continue;
  if (!h1map.has(v)) h1map.set(v, []);
  h1map.get(v).push(p.route);
}
for (const [val, routes] of [...h1map.entries()].filter(([, r]) => r.length > 1))
  add('MEDIUM', 'DUPLICATE_H1', `${routes.length} pages share the H1 "${val.slice(0, 60)}"`, { routes });

// broken internal links
const known = new Set(pages.map((p) => p.route));
for (const p of ok)
  for (const l of p.links) {
    const t = visited.get(l);
    if (!t) continue;
    if (t.status === 404) add('HIGH', 'BROKEN_LINK', `Links to 404 ${l}`, { route: p.route });
    else if (t.status >= 300 && t.status < 400)
      add('LOW', 'LINK_TO_REDIRECT', `Links to redirect ${l} -> ${t.redirectTo}`, { route: p.route });
  }

// sitemap vs reality
const sm = new Set(sitemapUrls);
for (const u of sm) {
  const p = visited.get(u);
  if (!p) { add('HIGH', 'SITEMAP_UNREACHABLE', `In sitemap but not reachable: ${u}`); continue; }
  if (p.status !== 200) add('HIGH', 'SITEMAP_NON200', `In sitemap but returns ${p.status}: ${u}`);
  else if (!p.indexable) add('HIGH', 'SITEMAP_NOINDEX', `In sitemap but noindex: ${u}`);
}
for (const p of indexable) if (!sm.has(p.route)) add('MEDIUM', 'MISSING_FROM_SITEMAP', `Indexable but absent from sitemap: ${p.route}`);

// orphans: indexable, in sitemap, but nothing links to it
const inbound = new Map();
for (const p of ok) for (const l of p.links) inbound.set(l, (inbound.get(l) || 0) + 1);
for (const p of indexable)
  if (!inbound.get(p.route) && p.route !== '/')
    add('HIGH', 'ORPHAN', `No internal links point to ${p.route}`);

// host/case/slash handling
for (const [label, path] of [['uppercase', '/Calculators/Tile-Calculator'], ['trailing slash', '/calculators/tile-calculator/']]) {
  try {
    const r = await fetch(BASE + path, { redirect: 'manual' });
    if (r.status === 200)
      add('MEDIUM', 'DUPLICATE_URL_FORM', `${label} variant returns 200 instead of redirecting: ${path}`);
  } catch { /* ignore */ }
}
// soft-404 check
const bogus = await fetch(`${BASE}/this-route-does-not-exist-xyz`, { redirect: 'manual' });
if (bogus.status === 200) add('HIGH', 'SOFT_404', 'Nonexistent URL returns HTTP 200');

// ---- report ----------------------------------------------------------------
const order = { HIGH: 0, MEDIUM: 1, LOW: 2 };
findings.sort((a, b) => order[a.severity] - order[b.severity] || a.code.localeCompare(b.code));
const counts = findings.reduce((a, f) => ((a[f.severity] = (a[f.severity] || 0) + 1), a), {});

const report = {
  generatedAt: new Date().toISOString(),
  base: BASE,
  totals: {
    crawled: pages.length,
    status200: ok.length,
    indexable: indexable.length,
    noindex: ok.length - indexable.length,
    redirects: pages.filter((p) => p.status >= 300 && p.status < 400).length,
    notFound: pages.filter((p) => p.status === 404).length,
    sitemapUrls: sitemapUrls.length,
  },
  counts,
  findings,
  pages: pages.map(({ links, ...rest }) => ({ ...rest, outboundLinks: links?.length ?? 0 })),
};
fs.writeFileSync('seo-audit.json', JSON.stringify(report, null, 2));

console.log('\n=== RenovationCalculator SEO audit ===');
console.log(report.totals);
console.log('\nfindings:', counts.HIGH || 0, 'HIGH |', counts.MEDIUM || 0, 'MEDIUM |', counts.LOW || 0, 'LOW');
const grouped = new Map();
for (const f of findings) {
  if (!grouped.has(f.code)) grouped.set(f.code, { severity: f.severity, items: [] });
  grouped.get(f.code).items.push(f);
}
for (const [code, g] of grouped) {
  console.log(`\n[${g.severity}] ${code} — ${g.items.length}`);
  for (const i of g.items.slice(0, 6)) console.log('    ' + (i.route || i.routes?.join(', ') || '') + (i.route || i.routes ? ' — ' : '') + i.message);
  if (g.items.length > 6) console.log(`    … ${g.items.length - 6} more (see seo-audit.json)`);
}
console.log('\nwrote seo-audit.json');
process.exit((counts.HIGH || 0) > 0 ? 1 : 0);
