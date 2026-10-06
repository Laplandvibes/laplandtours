import ProductRail, { type RailLang } from '../shared/ads/ProductRail'
import scandinavianoutdoorRail from '../shared/ads/rails/scandinavianoutdoor'
import scandinavianoutdoorPicks from '../shared/ads/data/scandinavianoutdoorPicks'
import { useEffect } from 'react';
import Hero from '../components/Hero';
import NewsletterInline from '../shared/NewsletterInline';
import BuildYourOwn from '../components/BuildYourOwn';
import DriveToLapland from '../components/DriveToLapland';
import BookableActivities from '../components/BookableActivities';
import OperatorGuide from '../components/OperatorGuide';
import MatkapojatGroupTrips from '../components/MatkapojatGroupTrips';
import SeasonStrip from '../components/SeasonStrip';
import SectionTeasers from '../components/SectionTeasers';
import FAQ, { FAQ_BY_LANG } from '../components/FAQ';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import HomeAdSlots, { MainPartnerBanner } from '../shared/HomeAdSlots';
import { AD_SLOTS } from '../data/adSlots';
import { setPageMeta, breadcrumbList, faqPageSchema, travelAgencySchema } from '../lib/meta';
import { routeMeta } from '../lib/routeMeta';
import { useLang, useLocalePath, type CopyLang, copyLang, LANG_TO_PREFIX } from '../i18n/useLang';
import { AppPromoHero } from '../components/AppPromo';

// Shared network creds hardcoded (public anon key) — SAME reason as this
// site's NewsletterPopup.tsx: the repo has no .env and .gitignore forbids one
// (`.env` + `.env.*`), and CI (.github/workflows/deploy.yml, on: push) builds
// from a clean clone. `import.meta.env.VITE_SUPABASE_URL` therefore compiled
// to undefined and this form POSTed to
// https://laplandtours.online/undefined/functions/v1/send-welcome-email → 405.
// Measured live 2026-08-21; the popup was fixed this way earlier, the inline
// form was missed. Do not reintroduce an env read here.
const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';

// Otsikko ja kuvaus: routeMeta('/') eli scripts/routes.json, sama lähde kuin esirenderöinnillä.
const META: Record<CopyLang, { canonical: string; breadcrumbHome: string }> = {
  en: { canonical: 'https://laplandtours.online/', breadcrumbHome: 'Home' },
  fi: { canonical: 'https://laplandtours.online/fi', breadcrumbHome: 'Etusivu' },
  de: { canonical: 'https://laplandtours.online/de', breadcrumbHome: 'Start' },
  ja: { canonical: 'https://laplandtours.online/ja', breadcrumbHome: 'ホーム' },
  ko: { canonical: 'https://laplandtours.online/kr', breadcrumbHome: '홈' },
  fr: { canonical: 'https://laplandtours.online/fr', breadcrumbHome: 'Accueil' },
  it: { canonical: 'https://laplandtours.online/it', breadcrumbHome: 'Home' },
  nl: { canonical: 'https://laplandtours.online/nl', breadcrumbHome: 'Home' },
  sv: { canonical: 'https://laplandtours.online/sv', breadcrumbHome: 'Hem' },
  es: { canonical: 'https://laplandtours.online/es', breadcrumbHome: 'Inicio' },
  'pt-BR': { canonical: 'https://laplandtours.online/br', breadcrumbHome: 'Início' },
  'zh-CN': { canonical: 'https://laplandtours.online/cn', breadcrumbHome: '首页' },
};

export default function Home() {
  const lang = useLang();
  const lp = useLocalePath();
  const meta = META[copyLang(lang)];
  const { title, description } = routeMeta('/', lang);
  useEffect(() => {
    setPageMeta({
      title,
      description,
      canonical: meta.canonical,
      jsonLd: [
        travelAgencySchema(),
        breadcrumbList([{ name: meta.breadcrumbHome, path: lang === 'en' ? '/' : `/${LANG_TO_PREFIX[lang]}` }]),
        faqPageSchema(FAQ_BY_LANG[copyLang(lang)].map((f) => ({ q: f.q, a: f.a }))),
      ],
    });
  }, [lang, title, description, meta.canonical, meta.breadcrumbHome]);

  return (
    <>
      <Hero />
      {/* App launch block, directly under the site's own opening. At the foot
          of the page it measured 81 % down a 33 000 px front page, and an
          announcement nobody scrolls to is not an announcement. */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppPromoHero />
      </div>



      <MainPartnerBanner config={AD_SLOTS} locale={lang} />
      <BuildYourOwn />
      {/* "Tulossa autolla?" — the hub's five road-trip guides, straight after
          the Drive rail (Vesa 11.9.2026). Network-internal links, not affiliate. */}
      <DriveToLapland />
      <HomeAdSlots config={AD_SLOTS} locale={lang} />
      {/* Oikea tuoterivi tyhjän house-ad-kortin tilalle (Vesa 4.9.). */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <ProductRail partner={scandinavianoutdoorRail} snapshot={scandinavianoutdoorPicks} lang={lang as RailLang} sid="home_gear" variant="dark" />
      </div>

      <BookableActivities />
      <OperatorGuide />
      {/* FI only: Matkapojat's four Lapland group trips (Adtraction). Renders
          nothing in the other 11 locales — the programme and its landing
          pages are Finnish. */}
      <MatkapojatGroupTrips />
      <SeasonStrip />
      <SectionTeasers />
      <FAQ />
      {/* [LV-CONSENT-KIELI 2026-08-16] lang eksplisiittisesti URL:sta: ilman
          proppia komponentti luki document.documentElement.lang render-hetkellä
          → suostumus jäi väärälle kielelle kielenvaihdon jälkeen.
          privacyHref lokaaliprefiksillä (hubin 0bf517d-malli). */}
      <NewsletterInline
        siteId="laplandtours"
        lang={lang}
        privacyHref={lp('/privacy')}
        supabaseUrl={SUPABASE_URL}
        supabaseAnonKey={SUPABASE_ANON_KEY}
      />
      <div className="bg-deep-night py-6 px-4">
        <AffiliateDisclosure variant="full" />
      </div>
    </>  );
}
