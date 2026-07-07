import { useLocation } from 'react-router-dom';

export type Lang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl';

/**
 * Locales that have full per-component COPY blocks.
 * en/fi/de/ja have always been fully translated; ko/fr/it/nl were added 2026-05-21;
 * es/pt-BR/zh-CN were promoted to full native copy 2026-05-29 (previously fell back
 * to EN for body content). Every Lang now resolves to its own copy.
 */
export type CopyLang = Lang;

/** Map any Lang down to a fully-translated CopyLang value (now identity). */
export function copyLang(lang: Lang): CopyLang {
  return lang;
}

export function useLang(): Lang {
  const { pathname } = useLocation();
  if (pathname === '/fi' || pathname.startsWith('/fi/')) return 'fi';
  if (pathname === '/de' || pathname.startsWith('/de/')) return 'de';
  if (pathname === '/ja' || pathname.startsWith('/ja/')) return 'ja';
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  if (pathname === '/br' || pathname.startsWith('/br/')) return 'pt-BR';
  if (pathname === '/cn' || pathname.startsWith('/cn/')) return 'zh-CN';
  if (pathname === '/kr' || pathname.startsWith('/kr/')) return 'ko';
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr';
  if (pathname === '/it' || pathname.startsWith('/it/')) return 'it';
  if (pathname === '/nl' || pathname.startsWith('/nl/')) return 'nl';
  return 'en';
}

export const LANG_TO_PREFIX: Record<Lang, string> = {
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
};

export function useLocalePath() {
  const lang = useLang();
  return (path: string): string => {
    if (lang === 'en') return path;
    const prefix = `/${LANG_TO_PREFIX[lang]}`;
    if (path === '/') return prefix;
    return `${prefix}${path.startsWith('/') ? path : `/${path}`}`;
  };
}

export type Bcp47 =
  | 'en-US'
  | 'fi-FI'
  | 'de-DE'
  | 'ja-JP'
  | 'es-ES'
  | 'pt-BR'
  | 'zh-CN'
  | 'ko-KR'
  | 'fr-FR'
  | 'it-IT'
  | 'nl-NL';

export function useHtmlLang(): Bcp47 {
  const lang = useLang();
  if (lang === 'fi') return 'fi-FI';
  if (lang === 'de') return 'de-DE';
  if (lang === 'ja') return 'ja-JP';
  if (lang === 'es') return 'es-ES';
  if (lang === 'pt-BR') return 'pt-BR';
  if (lang === 'zh-CN') return 'zh-CN';
  if (lang === 'ko') return 'ko-KR';
  if (lang === 'fr') return 'fr-FR';
  if (lang === 'it') return 'it-IT';
  if (lang === 'nl') return 'nl-NL';
  return 'en-US';
}
