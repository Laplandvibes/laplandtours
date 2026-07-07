import { useEffect } from 'react';
import PrivacyContent from '../../../shared/Legal/PrivacyContent';
import { setPageMeta } from '../lib/meta';
import { useLang } from '../i18n/useLang';

export default function PrivacyPolicy() {
  const lang = useLang();
  useEffect(() => {
    setPageMeta({
      title: 'Privacy Policy | #LaplandTours',
      description:
        'How #LaplandTours collects, uses, and protects visitor data. Operated by Lapeso Oy under EU GDPR.',
      canonical: 'https://laplandtours.online/privacy',
      robots: 'index, follow',
    });
  }, []);

  return <PrivacyContent siteName="LaplandTours" lang={lang} />;
}
