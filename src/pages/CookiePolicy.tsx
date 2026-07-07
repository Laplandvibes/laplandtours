import { useEffect } from 'react';
import CookieContent from '../../../shared/Legal/CookieContent';
import { setPageMeta } from '../lib/meta';
import { useLang } from '../i18n/useLang';

export default function CookiePolicy() {
  const lang = useLang();
  useEffect(() => {
    setPageMeta({
      title: 'Cookie Policy | #LaplandTours',
      description:
        'How #LaplandTours uses cookies for analytics and consent: GA4 with Consent Mode v2, no advertising or tracking until you accept.',
      canonical: 'https://laplandtours.online/cookie-policy',
      robots: 'index, follow',
    });
  }, []);

  return <CookieContent siteName="LaplandTours" lang={lang} />;
}
