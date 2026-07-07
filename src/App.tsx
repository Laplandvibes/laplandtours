import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import type { JSX } from 'react';
import { onRouteChange, initOutboundTracking, initScrollDepth } from './lib/analytics';
import Nav from './components/Nav';
import Footer from '../../shared/Footer';
import CookieBanner from '../../shared/CookieBanner';
import NewsletterPopup from './components/NewsletterPopup';
const Home = lazy(() => import('./pages/Home'))
const LaplandHolidays = lazy(() => import('./pages/LaplandHolidays'))
const PracticalInfo = lazy(() => import('./pages/PracticalInfo'))
const AgeGuide = lazy(() => import('./pages/AgeGuide'))
const DesignTour = lazy(() => import('./pages/DesignTour'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
import { useLang, useHtmlLang } from './i18n/useLang';
import LocaleAutoRedirect from './i18n/LocaleAutoRedirect';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AnalyticsRouter() {
  const { pathname } = useLocation();
  useEffect(() => {
    onRouteChange(pathname);
    initScrollDepth();
  }, [pathname]);
  useEffect(() => {
    initOutboundTracking();
  }, []);
  return null;
}

function LocaleSync() {
  const html = useHtmlLang();
  useEffect(() => {
    document.documentElement.lang = html;
  }, [html]);
  return null;
}

const SIDE_STRIPE_BG =
  'linear-gradient(to right, #002F6C 0 30%, #F8FAFC 30% 70%, #002F6C 70% 100%)';

const PILLARS_EN = [
  { name: 'Operator guide', href: '/lapland-holidays' },
  { name: 'Practical info', href: '/practical-info' },
  { name: 'Age guide', href: '/age-guide' },
  { name: 'Custom tour', href: '/design-tour' },
];

const PILLARS_FI = [
  { name: 'Matkapaketit', href: '/fi/lapland-holidays' },
  { name: 'Käytännön tieto', href: '/fi/practical-info' },
  { name: 'Ikäopas', href: '/fi/age-guide' },
  { name: 'Räätälöity matka', href: '/fi/design-tour' },
];

const PILLARS_DE = [
  { name: 'Reise­veranstalter', href: '/de/lapland-holidays' },
  { name: 'Praktische Hinweise', href: '/de/practical-info' },
  { name: 'Alters-Guide', href: '/de/age-guide' },
  { name: 'Individuelle Reise', href: '/de/design-tour' },
];

const PILLARS_JA = [
  { name: 'ツアーオペレーター', href: '/ja/lapland-holidays' },
  { name: '実用情報', href: '/ja/practical-info' },
  { name: '年齢別ガイド', href: '/ja/age-guide' },
  { name: 'カスタムツアー', href: '/ja/design-tour' },
];

const PILLARS_ES = [
  { name: 'Operadoras de tour', href: '/es/lapland-holidays' },
  { name: 'Información práctica', href: '/es/practical-info' },
  { name: 'Guía por edad', href: '/es/age-guide' },
  { name: 'Tour personalizado', href: '/es/design-tour' },
];

const PILLARS_BR = [
  { name: 'Operadoras de tour', href: '/br/lapland-holidays' },
  { name: 'Informações práticas', href: '/br/practical-info' },
  { name: 'Guia por idade', href: '/br/age-guide' },
  { name: 'Tour personalizado', href: '/br/design-tour' },
];

const PILLARS_CN = [
  { name: '旅行社指南', href: '/cn/lapland-holidays' },
  { name: '实用信息', href: '/cn/practical-info' },
  { name: '年龄指南', href: '/cn/age-guide' },
  { name: '定制旅行团', href: '/cn/design-tour' },
];

const PILLARS_KO = [
  { name: '투어 운영사 가이드', href: '/kr/lapland-holidays' },
  { name: '실용 정보', href: '/kr/practical-info' },
  { name: '연령별 가이드', href: '/kr/age-guide' },
  { name: '맞춤 투어 패키지', href: '/kr/design-tour' },
];

const PILLARS_FR = [
  { name: 'Guide des opérateurs', href: '/fr/lapland-holidays' },
  { name: 'Infos pratiques', href: '/fr/practical-info' },
  { name: 'Guide par âge', href: '/fr/age-guide' },
  { name: 'Forfait sur mesure', href: '/fr/design-tour' },
];

const PILLARS_IT = [
  { name: 'Guida agli operatori', href: '/it/lapland-holidays' },
  { name: 'Info pratiche', href: '/it/practical-info' },
  { name: 'Guida per età', href: '/it/age-guide' },
  { name: 'Pacchetto su misura', href: '/it/design-tour' },
];

const PILLARS_NL = [
  { name: 'Tourgids', href: '/nl/lapland-holidays' },
  { name: 'Praktische info', href: '/nl/practical-info' },
  { name: 'Leeftijdsgids', href: '/nl/age-guide' },
  { name: 'Maatwerk-rondreis', href: '/nl/design-tour' },
];

function FooterByLang() {
  const lang = useLang();
  const pillarLinks =
    lang === 'fi' ? PILLARS_FI :
    lang === 'de' ? PILLARS_DE :
    lang === 'ja' ? PILLARS_JA :
    lang === 'es' ? PILLARS_ES :
    lang === 'pt-BR' ? PILLARS_BR :
    lang === 'zh-CN' ? PILLARS_CN :
    lang === 'ko' ? PILLARS_KO :
    lang === 'fr' ? PILLARS_FR :
    lang === 'it' ? PILLARS_IT :
    lang === 'nl' ? PILLARS_NL :
    PILLARS_EN;
  return <Footer pillarLinks={pillarLinks} />;
}

const LOCALE_PREFIXES = ['', '/fi', '/de', '/ja', '/es', '/br', '/cn', '/kr', '/fr', '/it', '/nl'] as const;

function localizedRoutes(path: string, element: JSX.Element) {
  return LOCALE_PREFIXES.map((prefix) => {
    const full = prefix + path;
    return <Route key={full || '/'} path={full || '/'} element={element} />;
  });
}

function AppShell() {
  const lang = useLang();
  return (
    <>
      <LocaleAutoRedirect />
      <LocaleSync />
      <ScrollToTop />
      <AnalyticsRouter />

      <div
        className="fixed left-0 top-0 h-full w-[5px] sm:w-[7px] z-50 pointer-events-none"
        style={{ background: SIDE_STRIPE_BG }}
        aria-hidden="true"
      />
      <div
        className="fixed right-0 top-0 h-full w-[5px] sm:w-[7px] z-50 pointer-events-none"
        style={{ background: SIDE_STRIPE_BG }}
        aria-hidden="true"
      />

      <Nav />
      <main className="pt-16 bg-deep-night">
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
          {localizedRoutes('/', <Home />)}
          {localizedRoutes('/lapland-holidays', <LaplandHolidays />)}
          {localizedRoutes('/practical-info', <PracticalInfo />)}
          {localizedRoutes('/age-guide', <AgeGuide />)}
          {localizedRoutes('/design-tour', <DesignTour />)}
          {localizedRoutes('/privacy', <PrivacyPolicy />)}
          {localizedRoutes('/terms', <Terms />)}
          {localizedRoutes('/cookie-policy', <CookiePolicy />)}
        </Routes>
        </Suspense>
      </main>
      <FooterByLang />

      <CookieBanner consentKey="laplandtours_cookie_consent" lang={lang} />
      <NewsletterPopup />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
