import { useEffect } from 'react';
import TermsContent from '../shared/Legal/TermsContent';
import { setPageMeta } from '../lib/meta';
import { legalMeta } from '../lib/legalMeta';
import { useLang, useLocalePath } from '../i18n/useLang';

export default function Terms() {
  const lang = useLang();
  const localePath = useLocalePath();
  useEffect(() => {
    // Otsikko, kuvaus ja kanoninen nykyisellä kielellä samasta lähteestä kuin
    // prerender (scripts/routes.json) — ks. lib/legalMeta.ts.
    setPageMeta({ ...legalMeta('/terms', lang, localePath), robots: 'index, follow' });
    // localePath johdetaan langista, joten lang riittää riippuvuudeksi.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return <TermsContent siteName="LaplandTours" siteUrl="laplandtours.online" lang={lang} />;
}
