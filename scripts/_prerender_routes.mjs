/**
 * Universal per-route prerender for LV SPA sites.
 *
 * Goal: fix "Discovered but not indexed" — Googlebot fetches the shell, sees
 * identical <title>/canonical for every route, and dedupes them. By writing a
 * per-route static HTML file with route-specific <title>, <meta description>,
 * <link rel="canonical">, hreflang, og:* etc. baked in, every URL ships unique
 * SEO at first byte. React still hydrates as before — we keep <div id="root">
 * empty.
 *
 * Inputs (per site, passed via CLI args):
 *   --site=https://laplandhoteldeals.com    canonical origin (no trailing /)
 *   --siteName="LaplandHotelDeals"          for og:site_name
 *   --twitter="@laplandvibes"               twitter site handle
 *   --defaultOg="/og-default.jpg"           OG image path (or absolute URL)
 *   --routes=routes.json                    JSON file listing routes (see below)
 *   --locales=en,fi,de                      (optional) override locale list,
 *                                           comma-separated — for single-locale
 *                                           or 3-locale sites (ski, default 11)
 *   --source=auto|meta|per-lang|nested|json|page-inline
 *                                           (optional) force a specific reader.
 *                                           Default "auto" tries readers in
 *                                           preference order.
 *   --meta=scripts/prerender-meta.json      (optional) pre-generated meta map:
 *                                           { "<path>": { "<lang>": { "title", "description" } } }
 *                                           Tried FIRST in auto order. Lang codes match
 *                                           the `lang` field below (en, fi, …, pt-BR, zh-CN).
 *                                           Lets a site supply per-route × per-locale meta
 *                                           computed by its own generator (e.g. transport's
 *                                           scripts/generate-prerender-meta.mjs). Missing
 *                                           file/route/lang falls through to other readers.
 *
 * routes.json schema:
 *   [
 *     { "path": "/hotels",          "copyKey": "hotels" },
 *     // ↑ for per-lang copy.{lang}.ts AND nested COPY = { en: {…} } AND ski/visit:
 *     //   copyKey resolves to `pages.{copyKey}.metaTitle` etc.
 *
 *     { "path": "/safari-companies","jsonKey": "safariCompanies" },
 *     // ↑ for JSON locales (husky): reads
 *     //   src/locales/{lang}/pages.json → {jsonKey}.title / .description
 *     //   You can also use "jsonKey": "common.foo.bar" → reads common.json
 *
 *     { "path": "/destinations/levi", "pageFile": "src/pages/Levi.tsx" },
 *     // ↑ for per-page inline pattern (stays): regex-extracts
 *     //   seoTitle/seoDescription from each `const <lang>: ...` block in the file.
 *
 *     { "path": "/about", "copyFile": "src/pages/About.copy.{lang}.ts" },
 *     // ↑ for per-page per-lang copy files (stays): reads
 *     //   src/pages/About.copy.{lang}.ts → seo.title / seo.description
 *     //   {lang} placeholder is replaced with copy file lang ident (e.g. ptBR, zhCN).
 *
 *     { "path": "/privacy",          "copyKey": null,
 *       "fallbackTitle": "Privacy | LaplandHoteldeals" }
 *     // ↑ no per-route copy — use fallbackTitle (and optional fallbackDescription)
 *   ]
 *
 * Idempotent. Safe to re-run after vite build.
 *
 * Run from the site's root directory:
 *   node ../_prerender_routes.mjs \
 *     --site=https://laplandhoteldeals.com \
 *     --siteName=LaplandHotelDeals \
 *     --twitter=@laplandvibes \
 *     --defaultOg=/og-default.jpg \
 *     --routes=scripts/routes.json
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const CWD = process.cwd();
const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const m = a.match(/^--([^=]+)=(.*)$/);
    return m ? [m[1], m[2]] : [a.replace(/^--/, ''), true];
  })
);

const SITE = (args.site || '').replace(/\/$/, '');
if (!SITE) {
  console.error('[prerender] --site=https://example.com required');
  process.exit(1);
}
const SITE_NAME = args.siteName || 'LaplandVibes';
const TWITTER = args.twitter || '@laplandvibes';
const DEFAULT_OG = args.defaultOg || '/og-default.jpg';
const ROUTES_FILE = resolve(CWD, args.routes || 'scripts/routes.json');
const FORCE_SOURCE = args.source || 'auto';

// Optional pre-generated meta map (--meta). Absent/invalid → empty map, which
// makes the 'meta' reader a no-op and preserves behavior for all other sites.
let META_MAP = {};
if (args.meta && typeof args.meta === 'string') {
  const metaFile = resolve(CWD, args.meta);
  if (existsSync(metaFile)) {
    try {
      META_MAP = JSON.parse(readFileSync(metaFile, 'utf-8'));
    } catch (e) {
      console.warn(`[prerender] WARN: could not parse --meta file ${metaFile}: ${e.message}`);
    }
  } else {
    console.warn(`[prerender] WARN: --meta file missing at ${metaFile} — falling back to other readers`);
  }
}

const DIST = resolve(CWD, 'dist');
const LOCALES = resolve(CWD, 'src', 'locales');

if (!existsSync(resolve(DIST, 'index.html'))) {
  console.error(`[prerender] dist/index.html missing in ${CWD} — run vite build first`);
  process.exit(1);
}
if (!existsSync(ROUTES_FILE)) {
  console.error(`[prerender] routes manifest missing at ${ROUTES_FILE}`);
  process.exit(1);
}

const SHELL = readFileSync(resolve(DIST, 'index.html'), 'utf-8');

// Extract the runtime LV-LOCALE-TITLE map (`var T = {…}`) baked into the shell by
// scripts/inject_locale_titles.mjs — it holds the localized HOME/site title per
// locale. Reused as a static per-locale <title>/og:title for the HOME route on
// sites whose routes.json has only an English fallbackTitle (otherwise /fi /de
// /ja … would ship an English static title — bad for social shares + crawl).
let SHELL_TITLE_MAP = null;
try {
  const tm = SHELL.match(/var\s+T\s*=\s*(\{[\s\S]*?\})\s*;/);
  if (tm) SHELL_TITLE_MAP = JSON.parse(tm[1]);
} catch { SHELL_TITLE_MAP = null; }
// loc.lang → short code used as a key in the shell T map.
const SHELL_TITLE_KEY = { en: 'en', fi: 'fi', de: 'de', ja: 'ja', es: 'es', 'pt-BR': 'pt-br', 'zh-CN': 'zh-cn', ko: 'kr', fr: 'fr', it: 'it', nl: 'nl' };
const routes = JSON.parse(readFileSync(ROUTES_FILE, 'utf-8'));

// Locale config — keep in sync with src/components/SEO.tsx PATH_PREFIX/BCP47/OG_LOCALE
// `file` is the per-lang `copy.{file}.ts` filename (legacy reader);
// `ident` is the identifier used inside a monolithic copy.ts (e.g. `const ptBR: ...`);
// `jsonDir` is the per-lang JSON folder under src/locales/{jsonDir}/.
const FULL_LOCALE_LIST = [
  { lang: 'en',    prefix: '',    bcp47: 'en-US', og: 'en_US', file: 'copy.en.ts',   ident: 'en',   jsonDir: 'en'    },
  { lang: 'fi',    prefix: '/fi', bcp47: 'fi-FI', og: 'fi_FI', file: 'copy.fi.ts',   ident: 'fi',   jsonDir: 'fi'    },
  { lang: 'de',    prefix: '/de', bcp47: 'de-DE', og: 'de_DE', file: 'copy.de.ts',   ident: 'de',   jsonDir: 'de'    },
  { lang: 'ja',    prefix: '/ja', bcp47: 'ja-JP', og: 'ja_JP', file: 'copy.ja.ts',   ident: 'ja',   jsonDir: 'ja'    },
  { lang: 'es',    prefix: '/es', bcp47: 'es-ES', og: 'es_ES', file: 'copy.es.ts',   ident: 'es',   jsonDir: 'es'    },
  { lang: 'pt-BR', prefix: '/br', bcp47: 'pt-BR', og: 'pt_BR', file: 'copy.ptBR.ts', ident: 'ptBR', jsonDir: 'pt-BR' },
  { lang: 'zh-CN', prefix: '/cn', bcp47: 'zh-CN', og: 'zh_CN', file: 'copy.zhCN.ts', ident: 'zhCN', jsonDir: 'zh-CN' },
  { lang: 'ko',    prefix: '/kr', bcp47: 'ko-KR', og: 'ko_KR', file: 'copy.ko.ts',   ident: 'ko',   jsonDir: 'ko'    },
  { lang: 'fr',    prefix: '/fr', bcp47: 'fr-FR', og: 'fr_FR', file: 'copy.fr.ts',   ident: 'fr',   jsonDir: 'fr'    },
  { lang: 'it',    prefix: '/it', bcp47: 'it-IT', og: 'it_IT', file: 'copy.it.ts',   ident: 'it',   jsonDir: 'it'    },
  { lang: 'nl',    prefix: '/nl', bcp47: 'nl-NL', og: 'nl_NL', file: 'copy.nl.ts',   ident: 'nl',   jsonDir: 'nl'    },
];

const LOCALE_FILTER = args.locales
  ? new Set(args.locales.split(',').map((s) => s.trim()))
  : null;
const LOCALE_LIST = LOCALE_FILTER
  ? FULL_LOCALE_LIST.filter((l) => LOCALE_FILTER.has(l.lang))
  : FULL_LOCALE_LIST;

// ---------- shared helpers ----------
function unescapeJsString(s) {
  return s
    .replace(/\\n/g, ' ')
    .replace(/\\t/g, ' ')
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\`/g, '`')
    .replace(/\\\\/g, '\\')
    .replace(/\s+/g, ' ')
    .trim();
}

function htmlEscape(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Walk braces from the first `{` after openIdx, return inner slice. */
function sliceBlock(src, openIdx) {
  let depth = 0, start = -1, end = -1;
  for (let i = openIdx; i < src.length; i++) {
    const c = src[i];
    if (c === '{') { if (depth === 0) start = i + 1; depth++; }
    else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (start < 0 || end < 0) return null;
  return src.slice(start, end);
}

/** Find ALL `<key>: { … }` blocks in src, return list of inner slices. */
function findKeyBlocks(src, key) {
  const re = new RegExp(`(?:["']${key.replace(/[-/]/g, '\\$&')}["']|\\b${key}\\b)\\s*:\\s*\\{`, 'g');
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const inner = sliceBlock(src, m.index + m[0].length - 1);
    if (inner != null) out.push(inner);
  }
  return out;
}

/** Match `<key>: { … }` blocks recursively respecting strings + braces. Returns FIRST. */
function findKeyBlock(src, key) {
  const blocks = findKeyBlocks(src, key);
  return blocks[0] || null;
}

/** Find the first block matching key that ALSO contains a title-like field. */
function findKeyBlockWithMeta(src, key) {
  const blocks = findKeyBlocks(src, key);
  for (const b of blocks) {
    if (
      /seoTitle\s*:/.test(b) ||
      /metaTitle\s*:/.test(b) ||
      /["']title["']\s*:/.test(b) ||
      /(?:^|[\s,{])title\s*:/.test(b) ||
      /heroH1\s*:/.test(b)
    ) {
      return b;
    }
  }
  return blocks[0] || null;
}

function pickTD(block) {
  if (!block) return null;
  const tMatch =
    block.match(/seoTitle\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    block.match(/metaTitle\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    block.match(/["']title["']\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    // unquoted `title:` (TS shorthand JSON, stays *.copy.{lang}.ts).
    block.match(/(?:^|[\s,{])title\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    // visit-style fallback: use heroH1 as title when no seo/meta is present.
    block.match(/heroH1\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s);
  const dMatch =
    block.match(/seoDescription\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    block.match(/seoDesc\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    block.match(/metaDescription\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    block.match(/["']description["']\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    block.match(/(?:^|[\s,{])description\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s) ||
    block.match(/heroLead\s*:\s*(['"`])((?:\\.|(?!\1).)*)\1/s);
  if (!tMatch && !dMatch) return null;
  // tMatch may have 2 or 3 captures depending on the regex - find the title group.
  const t = tMatch ? (tMatch[2] ?? tMatch[1]) : null;
  const d = dMatch ? (dMatch[2] ?? dMatch[1]) : null;
  return {
    title: t ? unescapeJsString(t) : null,
    description: d ? unescapeJsString(d) : null,
  };
}

// ---------- READER 1: per-lang copy.{lang}.ts (original) ----------
const perLangSources = {};
for (const loc of LOCALE_LIST) {
  const fp = resolve(LOCALES, loc.file);
  if (existsSync(fp)) perLangSources[loc.lang] = readFileSync(fp, 'utf-8');
}

function readPerLangCopy(loc, copyKey) {
  if (!copyKey) return null;
  const src = perLangSources[loc.lang];
  if (!src) return null;
  let block = findKeyBlockWithMeta(src, copyKey);
  return pickTD(block);
}

// ---------- READER 2: monolithic copy.ts (nested per-lang blocks) ----------
const COPY_TS_PATH = resolve(LOCALES, 'copy.ts');
const monolithicSrc = existsSync(COPY_TS_PATH) ? readFileSync(COPY_TS_PATH, 'utf-8') : null;

/** For monolithic copy.ts:
 *  - First try `const <ident>: ...` top-level blocks (ski, visit).
 *  - Then try nested `<ident>: {` blocks (older sites).
 *  Return the inner slice for the language's block, or null.
 */
function getLangBlockInMonolithic(loc) {
  if (!monolithicSrc) return null;
  // Top-level: `const ptBR: SectionCopy = {`
  const reConst = new RegExp(`\\bconst\\s+${loc.ident}\\b\\s*(?::[^=]+)?=\\s*\\{`, 'g');
  const m1 = reConst.exec(monolithicSrc);
  if (m1) {
    const inner = sliceBlock(monolithicSrc, m1.index + m1[0].length - 1);
    if (inner) return inner;
  }
  // Nested: `'pt-BR': {` or `ptBR: {`
  const candidates = [loc.lang, loc.ident];
  for (const k of candidates) {
    const inner = findKeyBlock(monolithicSrc, k);
    if (inner) return inner;
  }
  return null;
}

function readMonolithicCopy(loc, copyKey) {
  if (!copyKey || !monolithicSrc) return null;
  const langBlock = getLangBlockInMonolithic(loc);
  if (!langBlock) return null;
  const parts = copyKey.split('.');
  let cursor = langBlock;
  for (const part of parts) {
    const found = findKeyBlockWithMeta(cursor, part);
    if (!found) {
      cursor = null;
      break;
    }
    cursor = found;
  }
  if (cursor) {
    const td = pickTD(cursor);
    if (td) return td;
  }
  // Fallback: search the final key directly inside the language block.
  const directBlock = findKeyBlockWithMeta(langBlock, parts[parts.length - 1]);
  return pickTD(directBlock);
}

// ---------- READER 3: JSON locales (husky pattern) ----------
function readJsonLocale(loc, jsonKey) {
  if (!jsonKey) return null;
  const dir = resolve(LOCALES, loc.jsonDir);
  if (!existsSync(dir)) return null;
  // Parse "file.path.to.key" — first segment is the JSON filename
  // (without .json), the rest is a nested key path. If no dot, default to
  // pages.json for back-compat.
  const parts = jsonKey.split('.');
  let file, keyPath;
  if (parts.length === 1) {
    file = 'pages';
    keyPath = parts;
  } else {
    file = parts[0];
    keyPath = parts.slice(1);
  }
  const fp = resolve(dir, `${file}.json`);
  if (!existsSync(fp)) {
    // Try the inverse: maybe the first segment is a key in pages.json.
    const altFp = resolve(dir, 'pages.json');
    if (!existsSync(altFp)) return null;
    try {
      const data = JSON.parse(readFileSync(altFp, 'utf-8'));
      let cursor = data;
      for (const p of parts) cursor = cursor?.[p];
      if (cursor && (cursor.title || cursor.description)) {
        return { title: cursor.title || null, description: cursor.description || null };
      }
    } catch { /* ignore */ }
    return null;
  }
  try {
    const data = JSON.parse(readFileSync(fp, 'utf-8'));
    let cursor = data;
    for (const p of keyPath) cursor = cursor?.[p];
    if (cursor && (cursor.title || cursor.description)) {
      return { title: cursor.title || null, description: cursor.description || null };
    }
  } catch { /* ignore */ }
  return null;
}

// ---------- READER 4: per-page inline COPY (stays city pages) ----------
const inlinePageCache = new Map();
function readPageInline(loc, pageFile) {
  if (!pageFile) return null;
  const fp = resolve(CWD, pageFile);
  if (!existsSync(fp)) return null;
  let src;
  if (inlinePageCache.has(fp)) src = inlinePageCache.get(fp);
  else {
    src = readFileSync(fp, 'utf-8');
    inlinePageCache.set(fp, src);
  }
  // Locate `const <ident>: ...` block for the locale.
  const reConst = new RegExp(`\\bconst\\s+${loc.ident}\\b\\s*(?::[^=]+)?=\\s*\\{`, 'g');
  const m = reConst.exec(src);
  if (!m) return null;
  const inner = sliceBlock(src, m.index + m[0].length - 1);
  if (!inner) return null;
  return pickTD(inner);
}

// ---------- READER 5: per-page per-lang copy file (stays About/Home/etc.) ----------
function readPerPageCopyFile(loc, copyFileTpl) {
  if (!copyFileTpl) return null;
  // copyFileTpl is like "src/pages/About.copy.{lang}.ts" — replace {lang}.
  const filename = copyFileTpl.replace('{lang}', loc.ident);
  const fp = resolve(CWD, filename);
  if (!existsSync(fp)) return null;
  const src = readFileSync(fp, 'utf-8');
  // Find `"seo": { ... }` or `seo: { ... }` block.
  const seoBlock = findKeyBlockWithMeta(src, 'seo');
  return pickTD(seoBlock);
}

// ---------- READER 0: pre-generated meta map (--meta, e.g. transport) ----------
function readMetaMap(loc, route) {
  const entry = META_MAP[route.path];
  const m = entry && entry[loc.lang];
  if (!m || (!m.title && !m.description)) return null;
  return { title: m.title || null, description: m.description || null };
}

/**
 * Optional FAQ for a route/locale from the --meta map. Returns an array of
 * { q, a } or null. Only sites whose meta generator emits a `faq` array (e.g.
 * laplandnature) produce this; every other site's map has no `faq` key, so this
 * is a no-op for them and the prerendered output is byte-identical to before.
 */
function readFaqFromMeta(loc, route) {
  const entry = META_MAP[route.path];
  const m = entry && entry[loc.lang];
  const faq = m && Array.isArray(m.faq) ? m.faq : null;
  if (!faq || !faq.length) return null;
  const items = faq.filter((it) => it && typeof it.q === 'string' && typeof it.a === 'string');
  return items.length ? items : null;
}

// ---------- meta resolver: try all configured sources in preference order ----------
function resolveRouteMeta(loc, route) {
  const order = FORCE_SOURCE === 'auto'
    ? ['meta', 'copyFile', 'per-lang', 'nested', 'json', 'page-inline']
    : [FORCE_SOURCE];

  for (const src of order) {
    let meta = null;
    if (src === 'meta') {
      meta = readMetaMap(loc, route);
    } else if (src === 'copyFile' && route.copyFile) {
      meta = readPerPageCopyFile(loc, route.copyFile);
    } else if (src === 'per-lang' && route.copyKey) {
      meta = readPerLangCopy(loc, route.copyKey);
    } else if (src === 'nested' && route.copyKey) {
      meta = readMonolithicCopy(loc, route.copyKey);
    } else if (src === 'json' && route.jsonKey) {
      meta = readJsonLocale(loc, route.jsonKey);
    } else if (src === 'page-inline' && route.pageFile) {
      meta = readPageInline(loc, route.pageFile);
    }
    if (meta && (meta.title || meta.description)) return meta;
  }
  return null;
}

// ---------- HTML shell injection (same as before) ----------
/** Replace a tag pattern but skip occurrences inside HTML comments. */
function replaceOutsideComments(html, pattern, replacement) {
  const COMMENT = /<!--[\s\S]*?-->/g;
  // Find all comment ranges.
  const skipRanges = [];
  let cm;
  while ((cm = COMMENT.exec(html)) !== null) {
    skipRanges.push([cm.index, cm.index + cm[0].length]);
  }
  // Find pattern matches not inside any comment.
  const re = new RegExp(pattern.source, pattern.flags);
  let result = '';
  let last = 0;
  let m;
  while ((m = re.exec(html)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    const inside = skipRanges.some(([s, e]) => start >= s && end <= e);
    if (inside) continue;
    result += html.slice(last, start) + replacement;
    last = end;
    if (!pattern.flags.includes('g')) break;
  }
  result += html.slice(last);
  return last === 0 ? html : result;
}

function hasTagOutsideComments(html, pattern) {
  const COMMENT = /<!--[\s\S]*?-->/g;
  const stripped = html.replace(COMMENT, '');
  return pattern.test(stripped);
}

function injectShell({ shell, bcp47, og, canonical, title, description, hreflangs, ogImage, faq }) {
  let html = shell;

  html = html.replace(/<html\s+lang="[^"]*"/i, `<html lang="${bcp47}"`);

  if (/<title>[^<]*<\/title>/i.test(html)) {
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${htmlEscape(title)}</title>`);
  } else {
    html = html.replace(/<\/head>/i, `    <title>${htmlEscape(title)}</title>\n  </head>`);
  }

  if (hasTagOutsideComments(html, /<meta\s+name="description"[^>]*>/i)) {
    html = replaceOutsideComments(
      html,
      /<meta\s+name="description"[^>]*>/i,
      `<meta name="description" content="${htmlEscape(description || '')}" />`
    );
  } else {
    html = html.replace(
      /<\/head>/i,
      `    <meta name="description" content="${htmlEscape(description || '')}" />\n  </head>`
    );
  }

  // Kill JS canonical injector + prior canonical/hreflang.
  html = html.replace(
    /<script>[^<]*?window\.location\.pathname[\s\S]*?<\/script>/i,
    ''
  );
  html = html.replace(/<link\s+rel="canonical"[^>]*>\s*/gi, '');
  html = html.replace(/<link\s+rel="alternate"\s+hreflang="[^"]*"[^>]*>\s*/gi, '');

  const altLinks = hreflangs
    .map((h) => `    <link rel="alternate" hreflang="${h.hreflang}" href="${h.url}" />`)
    .join('\n');

  // x-default = this page's own EN URL (same path, '' prefix, trailing slash) —
  // NOT the site root. Falls back to site root only if no EN alternate exists
  // (e.g. --locales filter without en).
  const xDefaultUrl =
    (hreflangs.find((h) => h.hreflang === 'en') || hreflangs[0] || { url: `${SITE}/` }).url;
  const canonicalBlock = `    <link rel="canonical" href="${canonical}" />\n${altLinks}\n    <link rel="alternate" hreflang="x-default" href="${xDefaultUrl}" />`;
  html = html.replace(/<\/head>/i, `${canonicalBlock}\n  </head>`);

  // Server-rendered BreadcrumbList JSON-LD (rich-result eligible), derived from the
  // canonical path. Skips the home page. Locale URL-prefix is treated as the locale root.
  try {
    const LOC_PREFIXES = new Set(['fi', 'de', 'ja', 'es', 'br', 'cn', 'kr', 'fr', 'it', 'nl']);
    const u = new URL(canonical);
    const segs = u.pathname.split('/').filter(Boolean);
    const hasLoc = segs.length > 0 && LOC_PREFIXES.has(segs[0]);
    const localeRoot = hasLoc ? `${SITE}/${segs[0]}` : SITE;
    const pathSegs = hasLoc ? segs.slice(1) : segs;
    if (pathSegs.length > 0) {
      const items = [{ name: SITE_NAME, url: `${localeRoot}/` }];
      let acc = localeRoot;
      pathSegs.forEach((seg, i) => {
        acc += `/${seg}`;
        const last = i === pathSegs.length - 1;
        const name = last
          ? title.replace(/\s*[|—–]\s.*$/, '').trim()
          : seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        items.push({ name, url: acc });
      });
      const breadcrumb = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: it.name,
          item: it.url,
        })),
      };
      const bcScript = `    <script type="application/ld+json">${JSON.stringify(breadcrumb)}</script>`;
      html = html.replace(/<\/head>/i, `${bcScript}\n  </head>`);
    }
  } catch { /* never block the build on breadcrumb derivation */ }

  // Server-rendered FAQPage JSON-LD (rich-result eligible). Only emitted when the
  // --meta map carried a `faq` array for this route/locale (opt-in per site).
  try {
    if (Array.isArray(faq) && faq.length) {
      const faqPage = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        inLanguage: bcp47,
        mainEntity: faq.map((it) => ({
          '@type': 'Question',
          name: it.q,
          acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
      };
      const faqScript = `    <script type="application/ld+json">${JSON.stringify(faqPage)}</script>`;
      html = html.replace(/<\/head>/i, `${faqScript}\n  </head>`);
    }
  } catch { /* never block the build on FAQ derivation */ }

  function setMeta(attr, key, value) {
    const re = new RegExp(
      `<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}"[^>]*>`,
      'i'
    );
    const tag = `<meta ${attr}="${key}" content="${htmlEscape(value)}" />`;
    if (hasTagOutsideComments(html, re)) html = replaceOutsideComments(html, re, tag);
    else html = html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
  }

  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:title', title);
  setMeta('property', 'og:description', description || '');
  setMeta('property', 'og:url', canonical);
  setMeta('property', 'og:locale', og);
  setMeta('property', 'og:image', /^https?:/.test(ogImage) ? ogImage : `${SITE}${ogImage}`);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', title);
  setMeta('name', 'twitter:description', description || '');
  setMeta('name', 'twitter:site', TWITTER);
  setMeta('name', 'twitter:image', /^https?:/.test(ogImage) ? ogImage : `${SITE}${ogImage}`);

  return html;
}

function fallbackMeta(routePath, route) {
  const slug = routePath.replace(/^\//, '').replace(/-/g, ' ').replace(/\//g, ' · ').trim();
  const human = slug
    .split(' ')
    .map((w) => w[0]?.toUpperCase() + w.slice(1))
    .join(' ');
  return {
    title: route.fallbackTitle || `${human || 'Home'} | ${SITE_NAME}`,
    description: route.fallbackDescription || `${SITE_NAME}: ${human || 'home'}.`,
  };
}

// ---------- write loop ----------
let written = 0;
const summary = [];
const debugNoMeta = [];

for (const route of routes) {
  const routePath = route.path;
  const ogImage = route.ogImage || DEFAULT_OG;

  // EN fallback (always populated): try EN meta first, else derive from path.
  const enLoc = LOCALE_LIST.find((l) => l.lang === 'en') || LOCALE_LIST[0];
  const enMeta = resolveRouteMeta(enLoc, route) || fallbackMeta(routePath, route);

  // Optional per-route locale restriction: a route with "locales": ["fi"] in
  // routes.json is generated ONLY for those locales (e.g. a Finnish-market-only
  // page) — prevents ghost /de/… /ja/… variants that have no matching React route.
  const routeLocales = Array.isArray(route.locales)
    ? LOCALE_LIST.filter((l) => route.locales.includes(l.lang))
    : LOCALE_LIST;

  for (const loc of routeLocales) {
    let meta = resolveRouteMeta(loc, route);
    // Tracks whether THIS locale got a locale-specific title from any source
    // (copy readers, fallbackTitleByLang, shell title map) — routes that end up
    // on the EN fallback are the only ones worth reporting in the debug log.
    let localizedTitle = !!(meta && meta.title);
    // Per-locale fallbacks BEFORE English: (1) explicit routes.json
    // fallbackTitleByLang/fallbackDescriptionByLang; (2) for the HOME route, the
    // localized title from the shell's LV-LOCALE-TITLE map. Keeps a native
    // <title>/og:title at first byte for every locale instead of English.
    if (!meta || !meta.title) {
      const tByLang = route.fallbackTitleByLang && route.fallbackTitleByLang[loc.lang];
      const dByLang = route.fallbackDescriptionByLang && route.fallbackDescriptionByLang[loc.lang];
      if (tByLang) {
        meta = { title: tByLang, description: dByLang || (meta && meta.description) || null };
        localizedTitle = true;
      } else if (route.path === '/' && SHELL_TITLE_MAP) {
        const st = SHELL_TITLE_MAP[SHELL_TITLE_KEY[loc.lang]];
        if (st) { meta = { title: st, description: (meta && meta.description) || null }; localizedTitle = true; }
      }
    }
    if (!meta || !meta.title) {
      meta = { title: enMeta.title, description: meta?.description || enMeta.description };
    }
    if (!meta.description) {
      const dByLang = route.fallbackDescriptionByLang && route.fallbackDescriptionByLang[loc.lang];
      meta.description = dByLang || enMeta.description;
    }
    // If the title doesn't already include site name, append it. Detect
    // pre-existing site name via case-insensitive substring of SITE_NAME or
    // a clear " | " / " — " separator with a brand-shaped word on the right.
    if (
      route.appendSiteName &&
      meta.title &&
      !meta.title.toLowerCase().includes(SITE_NAME.toLowerCase()) &&
      !/\s[|—]\s/.test(meta.title)
    ) {
      meta.title = `${meta.title} | ${SITE_NAME}`;
    }

    const cleanPath = routePath === '/' ? '' : routePath;
    // Canonical/hreflang MUST use the trailing-slash form, because the prerendered
    // file lives at /path/index.html and Cloudflare Pages serves it at /path/ (200),
    // 308-redirecting the no-slash form. A canonical pointing at the redirecting
    // no-slash URL makes Google pick its own canonical ("Duplicate, Google chose
    // a different canonical than the user"). Trailing slash = the real 200 URL.

    // Opt-in per-route consolidation: a route flagged "canonicalLocale":"en" (or
    // any lang) renders the SAME single-language content on every locale URL —
    // e.g. an English-only blog article that isn't translated. Every locale
    // variant then canonicalises to that ONE locale and advertises NO per-locale
    // hreflang, so Google folds them into the single real version instead of
    // flagging "Duplicate, Google chose a different canonical than the user".
    // Routes without the field keep the default per-locale self-canonical.
    const canonicalLoc = route.canonicalLocale
      ? (LOCALE_LIST.find((l) => l.lang === route.canonicalLocale) || loc)
      : loc;
    const canonical = `${SITE}${canonicalLoc.prefix}${cleanPath}`.replace(/\/?$/, '/');

    const hreflangs = route.canonicalLocale
      ? [{ hreflang: canonicalLoc.lang === 'en' ? 'en' : canonicalLoc.lang, url: canonical }]
      : routeLocales.map((l) => ({
          hreflang: l.lang === 'en' ? 'en' : l.lang,
          url: `${SITE}${l.prefix}${cleanPath}`.replace(/\/?$/, '/'),
        }));

    const outPath =
      loc.prefix === '' && cleanPath === ''
        ? resolve(DIST, 'index.html')
        : resolve(
            DIST,
            `${loc.prefix.slice(1) || ''}${cleanPath}`.replace(/^\//, ''),
            'index.html'
          );

    // FAQ for this route/locale (opt-in via --meta map). Falls back to EN faq so
    // every locale ships a FAQPage even before per-locale translations land.
    const faq = readFaqFromMeta(loc, route) || readFaqFromMeta(enLoc, route);

    const html = injectShell({
      shell: SHELL,
      bcp47: loc.bcp47,
      og: loc.og,
      canonical,
      title: meta.title,
      description: meta.description,
      hreflangs,
      ogImage,
      faq,
    });

    mkdirSync(dirname(outPath), { recursive: true });
    writeFileSync(outPath, html, 'utf-8');
    written++;
    if (summary.length < 6) {
      summary.push(`  ${loc.lang.padEnd(5)} ${routePath.padEnd(34)} → ${outPath.replace(DIST + '\\', '').replace(DIST + '/', '')}`);
    }
    // Report ONLY non-EN locales that truly shipped an EN(-derived) title.
    // A per-locale fallback (fallbackTitleByLang / shell title map) is a real
    // localized source — logging it as "no-meta" caused false-alarm fix tasks
    // (lapland-blog home 2026-07-07, where ja/es were already localized).
    if (loc.lang !== 'en' && !localizedTitle && debugNoMeta.length < 5) {
      debugNoMeta.push(`    no-meta: ${loc.lang} ${routePath}`);
    }
  }
}

console.log(`[prerender] wrote ${written} files for ${routes.length} routes × ${LOCALE_LIST.length} locales`);
console.log(`[prerender] sample:`);
summary.forEach((l) => console.log(l));
if (debugNoMeta.length) {
  console.log(`[prerender] some routes fell back to EN (first ${debugNoMeta.length}):`);
  debugNoMeta.forEach((l) => console.log(l));
}
