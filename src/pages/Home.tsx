import { useEffect } from 'react';
import Hero from '../components/Hero';
import BuildYourOwn from '../components/BuildYourOwn';
import BookableActivities from '../components/BookableActivities';
import OperatorGuide from '../components/OperatorGuide';
import SeasonStrip from '../components/SeasonStrip';
import SectionTeasers from '../components/SectionTeasers';
import FAQ, { FAQ_BY_LANG } from '../components/FAQ';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import HomeAdSlots, { MainPartnerBanner } from '../shared/HomeAdSlots';
import { AD_SLOTS } from '../data/adSlots';
import { setPageMeta, breadcrumbList, faqPageSchema, travelAgencySchema } from '../lib/meta';
import { useLang, type CopyLang, copyLang, LANG_TO_PREFIX } from '../i18n/useLang';

const META: Record<CopyLang, { title: string; description: string; canonical: string; breadcrumbHome: string }> = {
  en: {
    title: 'Lapland Tours 2026: Six Operators Compared',
    description:
      'Book a 2026 Lapland tour: six hand-picked UK & European operators, real prices, packages or build-your-own. Hotels, husky, aurora, Santa visits compared.',
    canonical: 'https://laplandtours.online/',
    breadcrumbHome: 'Home',
  },
  fi: {
    title: '#LaplandTours: suunnittele Lapin matka — kokoa itse tai varaa paikallinen toimija',
    description:
      'Suomen Lapin matkan voi koota kahdella tavalla. Yhdistä itse hotelli, vuokra-auto ja päiväretket, tai varaa aktiviteetit suoraan yhdeltä kuudesta luotettavasta lappilaisesta paikallistoimijasta.',
    canonical: 'https://laplandtours.online/fi',
    breadcrumbHome: 'Etusivu',
  },
  de: {
    title: '#LaplandTours: Lappland-Reise planen — selbst zusammenstellen oder lokalen Anbieter buchen',
    description:
      'Eine Reise nach Finnisch-Lappland lässt sich auf zwei Wegen planen. Selbst zusammenstellen mit Hotel, Mietwagen und Tagestouren, oder Aktivitäten direkt bei einem von sechs verlässlichen lokalen Lappland-Anbietern buchen.',
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
    title: '라플란드 투어 2026: 운영사 6곳 비교, 실제 가격',
    description:
      '2026 라플란드 투어 예약. 핀란드 현지 운영사 6곳, 실제 가격, 직접 예약 또는 직접 조립. 호텔, 허스키, 오로라, 산타 방문, 트랜스퍼 비교.',
    canonical: 'https://laplandtours.online/kr',
    breadcrumbHome: '홈',
  },
  fr: {
    title: 'Séjours Laponie 2026 : six voyagistes comparés, vrais prix',
    description:
      'Réservez votre séjour Laponie 2026 : six opérateurs locaux de Laponie finlandaise, vrais prix, réservation directe ou à la carte. Hôtels, husky, aurores, Père Noël, transferts comparés.',
    canonical: 'https://laplandtours.online/fr',
    breadcrumbHome: 'Accueil',
  },
  it: {
    title: 'Tour Lapponia 2026: sei operatori a confronto, prezzi reali',
    description:
      'Prenota un tour Lapponia 2026: sei operatori locali della Lapponia finlandese, prezzi reali, prenotazione diretta o componi tu. Hotel, husky, aurora, Babbo Natale, transfer a confronto.',
    canonical: 'https://laplandtours.online/it',
    breadcrumbHome: 'Home',
  },
  nl: {
    title: 'Lapland-reizen 2026: zes aanbieders vergeleken, echte prijzen',
    description:
      'Boek je Lapland-reis 2026: zes lokale aanbieders uit Fins Lapland, echte prijzen, direct boeken of zelf samenstellen. Hotels, husky, aurora, Kerstman, transfers vergeleken.',
    canonical: 'https://laplandtours.online/nl',
    breadcrumbHome: 'Home',
  },
  sv: {
    title: '#LaplandTours: planera din Lapplandsresa — sätt ihop själv eller boka en lokal aktör',
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
    title: '#LaplandTours: planeje sua viagem à Lapônia, à la carte ou com operadora local',
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
      <MainPartnerBanner config={AD_SLOTS} locale={lang} />
      <BuildYourOwn />
      <HomeAdSlots config={AD_SLOTS} locale={lang} />
      <BookableActivities />
      <OperatorGuide />
      <SeasonStrip />
      <SectionTeasers />
      <FAQ />      <div className="bg-deep-night py-6 px-4">
        <AffiliateDisclosure variant="full" />
      </div>
    </>
  );
}
