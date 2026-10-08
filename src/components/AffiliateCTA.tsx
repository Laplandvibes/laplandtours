import type { ReactNode } from 'react';
import { useLang } from '../i18n/useLang';
import { GYG_LOCALE_PREFIX, gygProductPath } from '../shared/gyg/picks';

/**
 * AffiliateCTA — every monetised click goes through go.laplandvibes.com.
 * The Cloudflare Worker handles CJ tracking, GYG partner_id, and per-domain
 * Website ID attribution via the Referer header.
 *
 * LOCALE 2026-05-16: appends partner-specific locale params so DE/FI users
 * land on the local partner site.
 */

export type AffiliatePartner =
  | 'hotels'
  | 'hotels-seasonal'
  | 'hotels-budget'
  | 'cars'
  | 'activities'
  /** Adtraction (FI): Lapland cabins. `destination` = full lomarengas.fi deep URL. */
  | 'lomarengas'
  /** Travelpayouts: airport transfers. `destination` = full welcomepickups.com deep URL. */
  | 'welcomepickups'
  /** Adtraction (FI-only programme): package trips. `destination` = full matkapojat.fi deep URL. */
  | 'matkapojat'
  /** Travelpayouts: eSIM. `destination` = full airalo.com deep URL (e.g. /finland-esim). */
  | 'airalo'
  /** Adtraction (FI shop): winter gear. `destination` = full scandinavianoutdoor.fi URL. */
  | 'scandinavianoutdoor'
  /** Trip.com trains via the Worker: pass departurecity / arrivalcity / tripTab in `query`. */
  | 'trains';

/** Partners whose Worker route takes the landing page as a full `dest=` URL. */
const DEST_URL_PARTNERS: ReadonlySet<AffiliatePartner> = new Set([
  'lomarengas', 'welcomepickups', 'matkapojat', 'airalo', 'scandinavianoutdoor',
]);

type _Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv';

export interface AffiliateCTAProps {
  partner: AffiliatePartner;
  sid: string;
  /**
   * For hotels: search query (city). For cars: pickup IATA. For activities:
   * a GetYourGuide path — location `rovaniemi-l2653`, category
   * `rovaniemi-l2653/dog-sledding-husky-tours-tc118` or product
   * `<location>/<slug>-tNNN`. For lomarengas / welcomepickups / matkapojat:
   * the full partner deep URL (Worker forwards it as `dest=`; a missing dest
   * lands on the partner front page, which the network rule forbids — always
   * pass one).
   *
   * 🔴 Activities take no search words (the old `gygSearch` prop is gone,
   * 8.10.2026). GetYourGuide's /s?q= stopped honouring the query on
   * 2026-08-23; every q-only link then opened the generic Lapland list, and
   * since 4.10. the Worker (LV-GYG-TOPIC) folds the words into a topic page.
   * That is a safety net, not a link pattern: a button that names a product
   * links the product, a browse button a category or location.
   */
  destination?: string;
  query?: Record<string, string | undefined>;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}

const REDIRECT_BASE = 'https://go.laplandvibes.com/go';

const HOTELS_LOCALE: Record<_Lang, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP',
  es: 'es_ES', 'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN',
  ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL', sv: 'sv_SE',
};
const CARS_LANG: Record<_Lang, string> = {
  en: 'en', fi: 'fi', de: 'de', ja: 'ja',
  es: 'es', 'pt-BR': 'pt', 'zh-CN': 'zh',
  ko: 'ko', fr: 'fr', it: 'it', nl: 'nl', sv: 'sv',
};
/**
 * Worker `?language=` codes (same table as shared/gyg/picks.ts). The Worker's
 * handleGyg turns the code into GetYourGuide's `<lang>-<country>/` PATH prefix
 * — the only localisation GYG honours. 🔴 A raw `?language=xx` appended to a
 * getyourguide.com URL does NOTHING (measured in a real browser 2026-08-02),
 * so never "simplify" back to passing it to GYG directly. `en` is GYG's
 * default and needs no param; `de` needs a code here even though the old raw
 * links didn't send one — they used the getyourguide.de domain instead.
 */
const GYG_WORKER_LANG: Record<_Lang, string | undefined> = {
  en: undefined, fi: 'fi', de: 'de', ja: 'ja', es: 'es', 'pt-BR': 'pt-br',
  'zh-CN': 'zh', ko: 'ko', fr: 'fr', it: 'it', nl: 'nl', sv: 'sv',
};

function buildHref(props: AffiliateCTAProps, lang: _Lang = 'en'): string {
  const { partner, sid, destination, query } = props;

  if (partner === 'activities') {
    // Reitittää Workerin kautta 2026-08-03 alkaen: Worker kirjaa klikin D1:een
    // ja lisää sijainti- ja kategoriapolulle kielen polkuprefiksin (raaka
    // ?language= on GYG:llä no-op). Hakusanoja ei lähetetä (ks. destination).
    const params = new URLSearchParams({ sid });
    const path = (destination ?? '').replace(/^\/+/, '').replace(/\/+$/, '');
    // 🔴 Tuotepolku (`…-t<id>`) saa kieliprefiksin TÄSSÄ: Worker ei lisää sitä
    // tuotepolkuun 20.9.2026 alkaen (LV-GYG-PRODUCT-NOPREFIX), joten
    // `?language=fi` avaisi tuotteen englanniksi. Sama sääntö kuin
    // gygHref:ssä (shared/gyg/picks.ts) ja skiresortsin AffiliateCTA:ssa.
    const goPath = GYG_LOCALE_PREFIX[lang] ? gygProductPath(path, lang) : path;
    const gygLang = GYG_WORKER_LANG[lang];
    if (gygLang && !goPath.includes('/-t')) params.set('language', gygLang);
    return `${REDIRECT_BASE}/activities${goPath ? `/${goPath}` : ''}?${params.toString()}`;
  }

  const params = new URLSearchParams();
  params.set('sid', sid);

  if (destination) {
    if (partner === 'hotels' || partner === 'hotels-seasonal' || partner === 'hotels-budget') {
      params.set('ss', anchorHotelsSs(partner, destination));
    } else if (partner === 'cars') {
      params.set('pickup_location', destination);
    } else if (DEST_URL_PARTNERS.has(partner)) {
      params.set('dest', destination);
    }
  }

  if (partner === 'hotels' || partner === 'hotels-seasonal' || partner === 'hotels-budget') {
    params.set('locale', HOTELS_LOCALE[lang]);
  } else if (partner === 'cars') {
    params.set('lang', CARS_LANG[lang]);
  }

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== '') params.set(key, value);
    }
  }

  return `${REDIRECT_BASE}/${partner}?${params.toString()}`;
}

export default function AffiliateCTA(props: AffiliateCTAProps) {
  const { className, children, onClick, ariaLabel } = props;
  const lang = useLang() as _Lang;
  return (
    <a
      href={buildHref(props, lang)}
      target="_blank"
      rel="sponsored nofollow noopener"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}

/**
 * Anchor any hotels search to Finnish Lapland. A bare "Lapland"/"Levi"/etc.
 * makes the lodging partner geocode to *Lapland, Indiana, USA* — a real revenue/trust
 * bug (Vesa 2026-07-08). Force ", Finland" onto every hotels query that does
 * not already name the country; leave cars/activities queries untouched.
 * Callers cannot re-introduce the bug.
 */
function anchorHotelsSs(partner: string, destination: string): string {
  const isHotels = partner === "hotels" || partner === "hotels-seasonal" || partner === "hotels-budget";
  if (!isHotels) return destination;
  return /finland|suomi/i.test(destination) ? destination : `${destination.replace(/[\s,]+$/, "")}, Finland`;
}
