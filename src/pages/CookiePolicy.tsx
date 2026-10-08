import { useEffect } from 'react';
import CookieContent from '../shared/Legal/CookieContent';
import { setPageMeta } from '../lib/meta';
import { legalMeta } from '../lib/legalMeta';
import { useLang, useLocalePath } from '../i18n/useLang';

export default function CookiePolicy() {
  const lang = useLang();
  const localePath = useLocalePath();
  useEffect(() => {
    // Otsikko, kuvaus ja kanoninen nykyisellä kielellä samasta lähteestä kuin
    // prerender (scripts/routes.json) — ks. lib/legalMeta.ts.
    setPageMeta({ ...legalMeta('/cookie-policy', lang, localePath) });
    // localePath johdetaan langista, joten lang riittää riippuvuudeksi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return <CookieContent siteId="laplandtours" siteName="LaplandTours" lang={lang} />;
}
