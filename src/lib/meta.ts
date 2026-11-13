/**
 * Per-page meta helper for #LaplandTours.
 *
 * 2026-05-21: locale-aware — hreflang × 11 + og:locale + JSON-LD inLanguage.
 * Detects locale from the canonical URL's prefix; emits hreflang alternates
 * and og:locale metadata for the full 11-locale matrix.
 */

const JSONLD_ID = 'lv-page-jsonld';

export interface PageMetaInput {
  title: string;
  description: string;
  /** Absolute canonical URL (may already include locale prefix). */
  canonical: string;
  robots?: string;
  ogImage?: string;
  jsonLd?: object | object[];
}

const SITE_URL = 'https://laplandtours.online';

type Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv';
const SUPPORTED: Lang[] = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl', 'sv'];
const URL_PREFIX_OF: Record<Lang, string> = {
  en: '', fi: '/fi', de: '/de', ja: '/ja', es: '/es',
  'pt-BR': '/br', 'zh-CN': '/cn', ko: '/kr', fr: '/fr', it: '/it', nl: '/nl', sv: '/sv',
};
const BCP47: Record<Lang, string> = {
  en: 'en-US', fi: 'fi-FI', de: 'de-DE', ja: 'ja-JP', es: 'es-ES',
  'pt-BR': 'pt-BR', 'zh-CN': 'zh-CN', ko: 'ko-KR', fr: 'fr-FR', it: 'it-IT', nl: 'nl-NL', sv: 'sv-SE',
};
const OG_LOCALE: Record<Lang, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP', es: 'es_ES',
  'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN', ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE',
};

function langFromUrl(url: string): Lang {
  const path = url.replace(SITE_URL, '');
  const m = path.match(/^\/(fi|de|ja|es|br|cn|kr|fr|it|nl|sv)(?=\/|$|\?|#)/);
  if (!m) return 'en';
  const seg = m[1];
  const map: Record<string, Lang> = {
    fi: 'fi', de: 'de', ja: 'ja', es: 'es', br: 'pt-BR',
    cn: 'zh-CN', kr: 'ko', fr: 'fr', it: 'it', nl: 'nl', sv: 'sv',
  };
  return map[seg] ?? 'en';
}

function stripLocalePath(url: string): string {
  const path = url.replace(SITE_URL, '') || '/';
  return path.replace(/^\/(fi|de|ja|es|br|cn|kr|fr|it|nl|sv)(?=\/|$|\?|#)/, '') || '/';
}

function injectInLanguage(node: unknown, bcp47: string): unknown {
  if (Array.isArray(node)) return node.map((n) => injectInLanguage(n, bcp47));
  if (node && typeof node === 'object') {
    const o = node as Record<string, unknown>;
    if (o['@type'] && o.inLanguage === undefined) o.inLanguage = bcp47;
    if (Array.isArray(o['@graph'])) o['@graph'] = (o['@graph'] as unknown[]).map((n) => injectInLanguage(n, bcp47));
    return o;
  }
  return node;
}

function upsertMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]:not([data-seo-alt])`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// Rakenteisen datan sisäiset osoitteet samaan muotoon kuin kanoninen, hreflang ja sivukartta:
// sivun OMA kieliversio ja loppukauttaviiva. Sivujen schema-oliot kirjoittivat kauttaviivattomat osoitteet
// (https://laplandtours.online/fi/lapland-holidays, joka ohjautuu 308). Mitattu 12.–13.11.2026, mittari lv-ops
// scripts/audit_jsonld_osoitteet.mjs.
// - polullinen osoite -> sivun kieliversio + kauttaviiva (/fi/lapland-holidays/); juuri -> https://laplandtours.online/
// - tiedostot (.jpg), ankkurit (#travelagency) ja ulkoiset osoitteet jäävät ennalleen
// Sivun oma BreadcrumbList ei tulostu: esirenderöijä kirjoittaa jokaiselle sivulle murupolun sivun kielellä ja
// oikeilla osoitteilla (sama ratkaisu kuin laplandcarrental 25.9. ja laplandwellness 12.11.2026).
const INTERNAL_URL = /^https:\/\/laplandtours\.online((?:\/[A-Za-z0-9_-]+)*)\/?$/;
function localizeUrls(node: unknown, lang: Lang, key = ''): unknown {
  if (typeof node === 'string') {
    const m = INTERNAL_URL.exec(node);
    if (!m) return node;
    const raw = m[1] || '/';
    if (raw === '/' && key !== 'item') return `${SITE_URL}/`;
    const path = stripLocalePath(`${SITE_URL}${raw}`);
    return `${SITE_URL}${URL_PREFIX_OF[lang]}${path === '/' ? '' : path}/`;
  }
  if (Array.isArray(node)) return node.map((n) => localizeUrls(n, lang, key));
  if (node && typeof node === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) out[k] = localizeUrls(v, lang, k);
    return out;
  }
  return node;
}
const isBreadcrumbList = (x: unknown) =>
  Boolean(x && typeof x === 'object' && (x as { '@type'?: unknown })['@type'] === 'BreadcrumbList');

function upsertJsonLd(input: object | object[] | undefined, bcp47: string, lang: Lang) {
  const existing = document.head.querySelector<HTMLScriptElement>(`script#${JSONLD_ID}`);
  const data = Array.isArray(input) ? input.filter((x) => !isBreadcrumbList(x)) : isBreadcrumbList(input) ? undefined : input;
  if (!data || (Array.isArray(data) && !data.length)) {
    if (existing) existing.remove();
    return;
  }
  const localized = localizeUrls(injectInLanguage(JSON.parse(JSON.stringify(data)), bcp47), lang);
  const json = JSON.stringify(localized);
  if (existing) {
    existing.textContent = json;
    return;
  }
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = JSONLD_ID;
  script.textContent = json;
  document.head.appendChild(script);
}

export function setPageMeta(input: PageMetaInput): void {
  const lang = langFromUrl(input.canonical);
  const bcp47 = BCP47[lang];
  const cleanPath = stripLocalePath(input.canonical);
  // Trailing-slash form matches the prerendered static HTML (Cloudflare Pages
  // serves /path/index.html at /path/ with 200; the no-slash form 308-redirects).
  const canonical = input.canonical.replace(/\/?$/, '/');

  document.title = input.title;
  document.documentElement.lang = bcp47;
  upsertMeta('description', input.description);
  upsertMeta('robots', input.robots ?? 'index, follow, max-image-preview:large, max-snippet:-1');

  upsertMeta('og:title', input.title, 'property');
  upsertMeta('og:description', input.description, 'property');
  upsertMeta('og:url', canonical, 'property');
  upsertMeta('og:locale', OG_LOCALE[lang], 'property');
  upsertMeta('twitter:title', input.title);
  upsertMeta('twitter:description', input.description);
  if (input.ogImage) {
    upsertMeta('og:image', input.ogImage, 'property');
    upsertMeta('twitter:image', input.ogImage);
  }

  // og:locale:alternate EI täällä (8.10.2026): esirenderöity HTML ei kirjoita sitä, ja Facebook lukee vain
  // staattisen HTML:n, joten tämän hookin lisäämällä tagilla ei ollut lukijaa (gate:og-js "vain-js" joka sivulla).

  upsertCanonical(canonical);

  // hreflang × 11 + x-default — SHORT codes (en, fi, pt-BR, …) + trailing-slash
  // hrefs: must match the prerenderer (_prerender_routes.mjs) and sitemap.xml.
  document.head.querySelectorAll('link[rel="alternate"][data-seo-hreflang]').forEach((el) => el.remove());
  SUPPORTED.forEach((l) => {
    const lnk = document.createElement('link');
    lnk.setAttribute('rel', 'alternate');
    lnk.setAttribute('hreflang', l);
    lnk.setAttribute('href', (SITE_URL + URL_PREFIX_OF[l] + (cleanPath === '/' ? '' : cleanPath)).replace(/\/?$/, '/'));
    lnk.setAttribute('data-seo-hreflang', 'true');
    document.head.appendChild(lnk);
  });
  // x-default = this page's own EN URL (trailing-slash form).
  const xd = document.createElement('link');
  xd.setAttribute('rel', 'alternate');
  xd.setAttribute('hreflang', 'x-default');
  xd.setAttribute('href', (SITE_URL + (cleanPath === '/' ? '' : cleanPath)).replace(/\/?$/, '/'));
  xd.setAttribute('data-seo-hreflang', 'true');
  document.head.appendChild(xd);

  upsertJsonLd(input.jsonLd, bcp47, lang);
}

const SITE_NAME = '#LaplandTours';

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    image: `${SITE_URL}/og-default.jpg`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${opts.path}` },
    // inLanguage intentionally omitted — setPageMeta's injectInLanguage stamps
    // the page's real BCP47 locale (hardcoding 'en' here mislabeled 11 locales).
    datePublished: opts.datePublished ?? '2026-05-09',
    dateModified: opts.dateModified ?? '2026-05-09',
    author: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'LaPeso Oy', url: 'https://laplandvibes.com' },
  };
}

export function faqPageSchema(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

export function travelAgencySchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    '@id': `${SITE_URL}/#travelagency`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      'A non-selling editorial guide comparing hand-picked Lapland tour operators, UK & European package operators and Finland-based local specialists, with real prices via direct referrals.',
    areaServed: { '@type': 'Place', name: 'Finnish Lapland' },
    parentOrganization: { '@type': 'Organization', name: 'LaPeso Oy', url: 'https://laplandvibes.com/' },
  };
}
