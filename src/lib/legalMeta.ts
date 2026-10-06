/**
 * Lakisivujen (tietosuoja, ehdot, evästeet) otsikko, kuvaus ja kanoninen
 * nykyisellä kielellä. Otsikko ja kuvaus tulevat `routeMeta`sta eli samasta
 * `scripts/routes.json`ista, josta esirenderöinti kirjoittaa staattisen HTML:n;
 * kanoninen osoittaa sivun omaan kieliversioon.
 */
import type { Lang } from '../i18n/useLang';
import { routeMeta } from './routeMeta';

type LegalPath = '/privacy' | '/terms' | '/cookie-policy';

const SITE_URL = 'https://laplandtours.online';

export function legalMeta(path: LegalPath, lang: Lang, localePath: (p: string) => string) {
  return {
    ...routeMeta(path, lang),
    canonical: `${SITE_URL}${localePath(path)}`,
  };
}
