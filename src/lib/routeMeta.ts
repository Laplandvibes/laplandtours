/**
 * Sivun otsikko ja hakutuloskuvaus nykyisellä kielellä.
 *
 * Lähde on `scripts/routes.json` (fallbackTitleByLang / fallbackDescriptionByLang),
 * sama tiedosto josta esirenderöinti (`scripts/_prerender_routes.mjs`) kirjoittaa
 * staattisen HTML:n. Selain lukee saman kentän, joten hakutulos, jakokortti ja
 * välilehti näyttävät yhden tekstin. Älä kirjoita otsikkoa tai kuvausta sivun
 * omaan copyyn: kaksi kopiota ajautuu erilleen.
 *
 * Kuvaus pidetään 70–160 merkissä (CJK: leveys 100–200, merkki = 2), jolloin
 * esirenderöinti ei jatka eikä leikkaa sitä ja selain näyttää täsmälleen saman.
 */
import routes from '../../scripts/routes.json';
import type { Lang } from '../i18n/useLang';

export type MetaPath =
  | '/'
  | '/lapland-holidays'
  | '/practical-info'
  | '/age-guide'
  | '/design-tour'
  | '/privacy'
  | '/terms'
  | '/cookie-policy';

interface RouteMeta {
  path: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackTitleByLang?: Partial<Record<Lang, string>>;
  fallbackDescriptionByLang?: Partial<Record<Lang, string>>;
}

/** Sama järjestys kuin esirenderöinnin resolveLocaleMeta: kielen kenttä, sitten reitin englanti. */
export function routeMeta(path: MetaPath, lang: Lang): { title: string; description: string } {
  const route = (routes as RouteMeta[]).find((r) => r.path === path);
  return {
    title: route?.fallbackTitleByLang?.[lang] ?? route?.fallbackTitle ?? '#LaplandTours',
    description: route?.fallbackDescriptionByLang?.[lang] ?? route?.fallbackDescription ?? '',
  };
}
