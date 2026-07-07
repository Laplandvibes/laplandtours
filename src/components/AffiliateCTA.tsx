import type { ReactNode } from 'react';
import { useLang } from '../i18n/useLang';

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
  | 'activities';

type _Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl';

export interface AffiliateCTAProps {
  partner: AffiliatePartner;
  sid: string;
  /** For hotels: search query (city). For cars: pickup IATA. For activities: GYG slug-lID. */
  destination?: string;
  /**
   * GetYourGuide search query (partner="activities" only) — e.g.
   * "husky safari Rovaniemi". Emits the resolving search endpoint
   * https://www.getyourguide.{tld}/s/?q=<query>&partner_id=VRMKD7N
   * (HTTP 200, never the slug-collapse 404). Takes precedence over
   * `destination` for activities. Use this for genuinely bookable tours.
   */
  gygSearch?: string;
  query?: Record<string, string | undefined>;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  ariaLabel?: string;
}

const REDIRECT_BASE = 'https://go.laplandvibes.com/go';
const GYG_PARTNER_ID = 'VRMKD7N';
const SITE_ID = 'laplandtours';

const HOTELS_LOCALE: Record<_Lang, string> = {
  en: 'en_US', fi: 'fi_FI', de: 'de_DE', ja: 'ja_JP',
  es: 'es_ES', 'pt-BR': 'pt_BR', 'zh-CN': 'zh_CN',
  ko: 'ko_KR', fr: 'fr_FR', it: 'it_IT', nl: 'nl_NL',
};
const CARS_LANG: Record<_Lang, string> = {
  en: 'en', fi: 'fi', de: 'de', ja: 'ja',
  es: 'es', 'pt-BR': 'pt', 'zh-CN': 'zh',
  ko: 'ko', fr: 'fr', it: 'it', nl: 'nl',
};
const GYG_DOMAIN: Record<_Lang, string> = {
  en: 'https://www.getyourguide.com',
  fi: 'https://www.getyourguide.com',
  de: 'https://www.getyourguide.de',
  ja: 'https://www.getyourguide.com',
  es: 'https://www.getyourguide.es',
  'pt-BR': 'https://www.getyourguide.com.br',
  'zh-CN': 'https://www.getyourguide.com',
  ko: 'https://www.getyourguide.com',
  fr: 'https://www.getyourguide.fr',
  it: 'https://www.getyourguide.it',
  nl: 'https://www.getyourguide.nl',
};
const GYG_LANGUAGE: Partial<Record<_Lang, string>> = {
  fi: 'fi', ja: 'ja', es: 'es', 'pt-BR': 'pt-br', 'zh-CN': 'zh',
  ko: 'ko', fr: 'fr', it: 'it', nl: 'nl',
};

function buildHref(props: AffiliateCTAProps, lang: _Lang = 'en'): string {
  const { partner, sid, destination, query } = props;

  if (partner === 'activities') {
    const base = GYG_DOMAIN[lang];
    // gygSearch → resolving /s/?q= endpoint (always HTTP 200). Preferred for
    // genuinely bookable tours; sidesteps the Worker slug-collapse 404 bug.
    if (props.gygSearch) {
      const url = new URL(`${base}/s/`);
      url.searchParams.set('q', props.gygSearch);
      url.searchParams.set('partner_id', GYG_PARTNER_ID);
      url.searchParams.set('cmp', `lv_${SITE_ID}_${sid}`);
      const gygLang = GYG_LANGUAGE[lang];
      if (gygLang) url.searchParams.set('language', gygLang);
      return url.toString();
    }
    const path = (destination ?? '').replace(/^\/+/, '').replace(/\/+$/, '');
    const url = new URL(path ? `${base}/${path}/` : `${base}/`);
    url.searchParams.set('partner_id', GYG_PARTNER_ID);
    url.searchParams.set('cmp', `lv_${SITE_ID}_${sid}`);
    const gygLang = GYG_LANGUAGE[lang];
    if (gygLang) url.searchParams.set('language', gygLang);
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== '') url.searchParams.set(k, v);
      }
    }
    return url.toString();
  }

  const params = new URLSearchParams();
  params.set('sid', sid);

  if (destination) {
    if (partner === 'hotels' || partner === 'hotels-seasonal' || partner === 'hotels-budget') {
      params.set('ss', destination);
    } else if (partner === 'cars') {
      params.set('pickup_location', destination);
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
