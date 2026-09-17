/**
 * Lakisivujen (tietosuoja, ehdot, evästeet) otsikko, kuvaus ja kanoninen
 * nykyisellä kielellä.
 *
 * 🔴 Lähde on `scripts/routes.json` — SAMA tiedosto josta prerender kirjoittaa
 * staattisen HTML:n. 17.9.2026 asti sivut antoivat setPageMetalle kiinteän
 * englanninkielisen otsikon, kuvauksen JA kanonisen, joten renderöity
 * /fi/cookie-policy/ oli Googlelle englanninkielinen sivu, jonka kanoninen
 * osoitti /cookie-policy/:hin (33 sivua: 3 lakisivua × 11 kieltä).
 * Älä kopioi tekstejä tänne: kaksi kopiota ajautuu erilleen.
 */
import routes from '../../scripts/routes.json';
import type { Lang } from '../i18n/useLang';

type LegalPath = '/privacy' | '/terms' | '/cookie-policy';

interface RouteMeta {
  path: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackTitleByLang?: Partial<Record<Lang, string>>;
  fallbackDescriptionByLang?: Partial<Record<Lang, string>>;
}

const SITE_URL = 'https://laplandtours.online';

export function legalMeta(path: LegalPath, lang: Lang, localePath: (p: string) => string) {
  const route = (routes as RouteMeta[]).find((r) => r.path === path);
  return {
    title: route?.fallbackTitleByLang?.[lang] ?? route?.fallbackTitle ?? '#LaplandTours',
    description: route?.fallbackDescriptionByLang?.[lang] ?? route?.fallbackDescription ?? '',
    canonical: `${SITE_URL}${localePath(path)}`,
  };
}
