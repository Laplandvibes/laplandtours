import { useLang, useLocalePath } from '../i18n/useLang';
import { COPY } from '../components/Nav';
import SharedNotFound from '../shared/NotFound';

// Thin wrapper around the vendored LV-network 404 (see ../shared/NotFound.tsx
// for the design contract; kept as a byte-for-byte copy of ../../../shared/NotFound.tsx
// per this site's existing vendoring pattern). Supplies this site's language,
// home path, and a handful of the site's own pillar pages — reusing the same
// localized labels already shown in the nav — so an unknown URL still routes
// the visitor back into #LaplandTours instead of a dead end.
export default function NotFound() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang];
  return (
    <SharedNotFound
      lang={lang}
      siteName="LaplandTours"
      homeHref={to('/')}
      links={[
        { href: to('/lapland-holidays'), label: c.operators },
        { href: to('/practical-info'), label: c.practical },
        { href: to('/design-tour'), label: c.bespoke },
      ]}
    />
  );
}
