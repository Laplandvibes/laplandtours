import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'lv_locale_choice';

type StoredLang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl';
const STORED_VALUES: readonly StoredLang[] = ['en', 'fi', 'de', 'ja', 'es', 'pt-BR', 'zh-CN', 'ko', 'fr', 'it', 'nl'];

export default function LocaleAutoRedirect() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/') return;

    const stored =
      typeof window !== 'undefined' && window.localStorage
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;

    let target: StoredLang = 'en';

    if (stored && (STORED_VALUES as readonly string[]).includes(stored)) {
      target = stored as StoredLang;
    } else if (typeof navigator !== 'undefined') {
      const lang = (navigator.languages?.[0] || navigator.language || 'en').toLowerCase();
      if (lang.startsWith('fi')) target = 'fi';
      else if (lang.startsWith('de')) target = 'de';
      else if (lang.startsWith('ja')) target = 'ja';
      else if (lang.startsWith('es')) target = 'es';
      else if (lang.startsWith('pt')) target = 'pt-BR';
      else if (lang.startsWith('zh')) target = 'zh-CN';
      else if (lang.startsWith('ko')) target = 'ko';
      else if (lang.startsWith('fr')) target = 'fr';
      else if (lang.startsWith('it')) target = 'it';
      else if (lang.startsWith('nl')) target = 'nl';
    }

    if (target === 'fi') navigate('/fi', { replace: true });
    else if (target === 'de') navigate('/de', { replace: true });
    else if (target === 'ja') navigate('/ja', { replace: true });
    else if (target === 'es') navigate('/es', { replace: true });
    else if (target === 'pt-BR') navigate('/br', { replace: true });
    else if (target === 'zh-CN') navigate('/cn', { replace: true });
    else if (target === 'ko') navigate('/kr', { replace: true });
    else if (target === 'fr') navigate('/fr', { replace: true });
    else if (target === 'it') navigate('/it', { replace: true });
    else if (target === 'nl') navigate('/nl', { replace: true });
  }, [pathname, navigate]);

  return null;
}
