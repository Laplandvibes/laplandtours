/**
 * Locale-aware internal-path builder for the shared LaplandVibes Legal
 * components.
 *
 * Mirrors each site's `LOCALE_PATH_PREFIX` / `localisedPath`
 * (`src/i18n/config.ts`) so internal <Link> targets inside `shared/` carry the
 * active locale prefix. Without this, clicking "Privacy Policy" from
 * `/fi/cookie-policy` jumps to the English `/privacy` instead of `/fi/privacy`.
 *
 * Kept self-contained (no import from any single site's config) because
 * `shared/` is consumed by 21+ sites via relative import and cannot reach into
 * one site's `useLocale()` / config.
 */

export type LegalLang =
  | 'en'
  | 'fi'
  | 'de'
  | 'ja'
  | 'es'
  | 'pt-BR'
  | 'zh-CN'
  | 'ko'
  | 'fr'
  | 'it'
  | 'nl'
  | 'sv';

// locale -> URL segment, identical to each site's LOCALE_PATH_PREFIX
// (note pt-BR -> br, zh-CN -> cn, ko -> kr).
const LOCALE_SEGMENT: Record<LegalLang, string> = {
  en: '',
  fi: 'fi',
  de: 'de',
  ja: 'ja',
  es: 'es',
  'pt-BR': 'br',
  'zh-CN': 'cn',
  ko: 'kr',
  fr: 'fr',
  it: 'it',
  nl: 'nl',
  sv: 'sv',
};

/**
 * Prefix an internal absolute path (e.g. "/", "/privacy") with the active
 * locale segment. EN (and any unknown lang) returns the path unchanged.
 */
export function localePath(path: string, lang: LegalLang = 'en'): string {
  const seg = LOCALE_SEGMENT[lang] ?? '';
  if (!seg) return path;
  const prefix = `/${seg}`;
  return path === '/' ? prefix : `${prefix}${path}`;
}
