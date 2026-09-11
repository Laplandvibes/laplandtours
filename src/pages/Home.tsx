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

const META: Record<CopyLang, { title: string; description: string; canonical: string; breadcrumbHome: string }> = {
  en: {
    // 2026-09-11: "real prices" dropped — the operator list deliberately
    // quotes no prices (lib/operators.ts), so the meta promised what the page
    // does not show. Same fix in ko/fr/it/nl and scripts/routes.json.
    title: 'Plan a Lapland trip: build your own or buy a bundle',
    description:
      'Two ways to plan a Finnish Lapland trip: mix hotel, cabin, car and day activities yourself, or hand it to one of six tour operators. Plus five road trips.',
    canonical: 'https://laplandtours.online/',
    breadcrumbHome: 'Home',
  },
  fi: {
    title: '#LaplandTours: suunnittele Lapin matka, kokoa itse tai varaa paikallinen toimija',
    description:
      'Suomen Lapin matkan voi koota kahdella tavalla. Yhdistä itse hotelli, vuokra-auto ja päiväretket, tai varaa aktiviteetit suoraan yhdeltä kuudesta luotettavasta lappilaisesta paikallistoimijasta.',
    canonical: 'https://laplandtours.online/fi',
    breadcrumbHome: 'Etusivu',
  },
  de: {
    title: 'Lappland-Reise planen: selbst oder mit lokalem Anbieter',
    description:
      'Finnisch-Lappland auf zwei Wegen planen: Hotel, Mietwagen und Tagestouren selbst kombinieren oder direkt bei einem von sechs lokalen Anbietern buchen.',
    canonical: 'https://laplandtours.online/de',
    breadcrumbHome: 'Start',
  },
  ja: {
    title: '#LaplandTours：ラップランドの旅を計画。自分で組み立てるか地元の会社に予約',
    description:
      'フィンランド・ラップランドへの旅を2つの方法で計画できます。ホテル、レンタカー、アクティビティを自分で組み合わせるか、信頼できる地元ラップランドの6社にアクティビティを直接予約できます。',
    canonical: 'https://laplandtours.online/ja',
    breadcrumbHome: 'ホーム',
  },
  ko: {
    title: '라플란드 여행 계획: 직접 조합하거나 패키지로',
    description:
      '핀란드 라플란드 여행을 계획하는 두 가지 방법: 호텔, 통나무집, 렌터카, 액티비티를 직접 조합하거나 핀란드 현지 운영사 6곳에 바로 예약하세요. 자동차 경로 다섯 가지도 함께.',
    canonical: 'https://laplandtours.online/kr',
    breadcrumbHome: '홈',
  },
  fr: {
    title: 'Planifier un voyage en Laponie : à la carte ou en forfait',
    description:
      'Deux façons de préparer un voyage en Laponie finlandaise : composez hôtel, chalet, voiture et activités, ou confiez tout à l’un de six opérateurs locaux.',
    canonical: 'https://laplandtours.online/fr',
    breadcrumbHome: 'Accueil',
  },
  it: {
    title: 'Organizzare un viaggio in Lapponia: fai da sé o pacchetto',
    description:
      'Due modi per organizzare un viaggio nella Lapponia finlandese: componga Lei hotel, baita, auto e attività, oppure si affidi a uno di sei operatori locali.',
    canonical: 'https://laplandtours.online/it',
    breadcrumbHome: 'Home',
  },
  nl: {
    title: 'Een Lapland-reis plannen: zelf samenstellen of pakket',
    description:
      'Twee manieren om een reis naar Fins Lapland te plannen: stel zelf hotel, hut, auto en activiteiten samen, of kies een van zes lokale aanbieders.',
    canonical: 'https://laplandtours.online/nl',
    breadcrumbHome: 'Home',
  },
  sv: {
    title: '#LaplandTours: planera din Lapplandsresa, sätt ihop själv eller boka en lokal aktör',
    description:
      'En resa till finska Lappland kan planeras på två sätt. Sätt ihop hotell, hyrbil och dagsutflykter själv, eller boka aktiviteterna direkt hos en av sex pålitliga lokala aktörer i finska Lappland.',
    canonical: 'https://laplandtours.online/sv',
    breadcrumbHome: 'Hem',
  },
  es: {
    title: '#LaplandTours: planifique su viaje a Laponia, a la carta o con operador local',
    description:
      'Hay dos formas de organizar un viaje a la Laponia finlandesa. Combine usted mismo hotel, coche de alquiler y actividades, o reserve directamente con uno de seis operadores locales de la Laponia finlandesa.',
    canonical: 'https://laplandtours.online/es',
    breadcrumbHome: 'Inicio',
  },
  'pt-BR': {
    title: '#LaplandTours: Lapônia à la carte ou com operadora local',
    description:
      'Há duas formas de organizar uma viagem à Lapônia finlandesa. Monte você mesmo hotel, aluguel de carro e atividades, ou reserve direto com uma de seis operadoras locais da Lapônia finlandesa.',
    canonical: 'https://laplandtours.online/br',
    breadcrumbHome: 'Início',
  },
  'zh-CN': {
    title: '#LaplandTours：规划你的拉普兰之旅，自由组合或预订本地运营商',
    description:
      '前往芬兰拉普兰有两种规划方式。自己组合酒店、租车和活动，或者直接向六家芬兰本地拉普兰运营商预订活动。',
    canonical: 'https://laplandtours.online/cn',
    breadcrumbHome: '首页',
  },
};

export default function Home() {
  const lang = useLang();
  const lp = useLocalePath();
  const meta = META[copyLang(lang)];
  useEffect(() => {
    setPageMeta({
      title: meta.title,
      description: meta.description,
      canonical: meta.canonical,
      jsonLd: [
        travelAgencySchema(),
        breadcrumbList([{ name: meta.breadcrumbHome, path: lang === 'en' ? '/' : `/${LANG_TO_PREFIX[lang]}` }]),
        faqPageSchema(FAQ_BY_LANG[copyLang(lang)].map((f) => ({ q: f.q, a: f.a }))),
      ],
    });
  }, [lang, meta.title, meta.description, meta.canonical, meta.breadcrumbHome]);

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
