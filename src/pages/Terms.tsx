import { useEffect } from 'react';
import TermsContent from '../../../shared/Legal/TermsContent';
import { setPageMeta } from '../lib/meta';
import { useLang } from '../i18n/useLang';

export default function Terms() {
  const lang = useLang();
  useEffect(() => {
    setPageMeta({
      title: 'Terms of Service | #LaplandTours',
      description:
        'Terms governing your use of laplandtours.online. Operator bookings happen on the operator\'s own site under the operator\'s terms.',
      canonical: 'https://laplandtours.online/terms',
      robots: 'index, follow',
    });
  }, []);

  return <TermsContent siteName="LaplandTours" siteUrl="laplandtours.online" lang={lang} />;
}
