import { useEffect } from 'react';
import CustomTourBuilder from '../components/CustomTourBuilder';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { setPageMeta, breadcrumbList, articleSchema } from '../lib/meta';
import { routeMeta } from '../lib/routeMeta';
import { useLang, type CopyLang, copyLang, LANG_TO_PREFIX } from '../i18n/useLang';

// Otsikko ja kuvaus: routeMeta('/design-tour') eli scripts/routes.json, sama lähde kuin esirenderöinnillä.
const META: Record<CopyLang, {
  canonical: string;
  breadcrumbHome: string;
  breadcrumbName: string;
  articleHeadline: string;
  articleDescription: string;
}> = {
  en: {
    canonical: 'https://laplandtours.online/design-tour',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Custom tour',
    articleHeadline: 'Design your own Lapland trip',
    articleDescription:
      'A request form for travellers who need a fully bespoke Lapland itinerary: proposals, family birthdays, multi-region trips and luxury bookings.',
  },
  fi: {
    canonical: 'https://laplandtours.online/fi/design-tour',
    breadcrumbHome: 'Etusivu',
    breadcrumbName: 'Räätälöity matka',
    articleHeadline: 'Suunnittele oma Lapin matkasi',
    articleDescription:
      'Tiedustelu­lomake matkustajille, jotka haluavat täysin räätälöidyn matkasuunnitelman: kosinta, perheen syntymäpäivät, useamman alueen matka tai luksusvaraus.',
  },
  de: {
    canonical: 'https://laplandtours.online/de/design-tour',
    breadcrumbHome: 'Start',
    breadcrumbName: 'Individuelle Reise',
    articleHeadline: 'Individuelle Lappland-Reise planen',
    articleDescription:
      'Anfrageformular für Reisende, die einen vollständig maßgeschneiderten Lappland-Reiseplan wünschen: Heiratsanträge, Familiengeburtstage, Reisen durch mehrere Regionen oder Luxusbuchungen.',
  },
  ja: {
    canonical: 'https://laplandtours.online/ja/design-tour',
    breadcrumbHome: 'ホーム',
    breadcrumbName: 'カスタムツアー',
    articleHeadline: 'ラップランドの旅をデザインする',
    articleDescription:
      '完全にカスタマイズされたラップランドの旅程をご希望の方向けのお問い合わせフォーム：プロポーズ、家族の誕生日、複数地域の旅行、ラグジュアリー予約。',
  },
  ko: {
    canonical: 'https://laplandtours.online/kr/design-tour',
    breadcrumbHome: '홈',
    breadcrumbName: '맞춤형 투어',
    articleHeadline: '라플란드 여행을 직접 디자인하기',
    articleDescription:
      '완전 맞춤형 라플란드 일정이 필요한 여행자를 위한 요청 양식: 청혼, 가족 생일, 복수 지역 여행, 럭셔리 예약.',
  },
  fr: {
    canonical: 'https://laplandtours.online/fr/design-tour',
    breadcrumbHome: 'Accueil',
    breadcrumbName: 'Voyage sur mesure',
    articleHeadline: 'Concevez votre voyage en Laponie',
    articleDescription:
      'Formulaire de demande pour les voyageurs qui veulent un itinéraire entièrement sur mesure en Laponie : demandes en mariage, anniversaires en famille, voyages multi-régions et réservations de luxe.',
  },
  it: {
    canonical: 'https://laplandtours.online/it/design-tour',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Viaggio su misura',
    articleHeadline: 'Progetti il suo viaggio in Lapponia',
    articleDescription:
      'Modulo di richiesta per i viaggiatori che desiderano un itinerario in Lapponia interamente su misura: proposte di matrimonio, compleanni in famiglia, viaggi multi-regione e prenotazioni di lusso.',
  },
  nl: {
    canonical: 'https://laplandtours.online/nl/design-tour',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Reis op maat',
    articleHeadline: 'Ontwerp uw eigen reis naar Lapland',
    articleDescription:
      'Aanvraagformulier voor reizigers die een volledig op maat gemaakte Lapland-reisplanning willen: aanzoeken, gezinsverjaardagen, meerregio-reizen en luxe boekingen.',
  },
  sv: {
    canonical: 'https://laplandtours.online/sv/design-tour',
    breadcrumbHome: 'Hem',
    breadcrumbName: 'Skräddarsydd resa',
    articleHeadline: 'Planera din egen Lapplandsresa',
    articleDescription:
      'Ett förfrågningsformulär för resenärer som vill ha ett helt skräddarsytt Lapplandsprogram: frierier, familjefödelsedagar, resor över flera regioner och lyxbokningar.',
  },
  es: {
    canonical: 'https://laplandtours.online/es/design-tour',
    breadcrumbHome: 'Inicio',
    breadcrumbName: 'Viaje a medida',
    articleHeadline: 'Diseñe su propio viaje a Laponia',
    articleDescription:
      'Formulario de solicitud para viajeros que necesitan un itinerario en Laponia totalmente a medida: pedidas de mano, cumpleaños familiares, viajes por varias regiones y reservas de lujo.',
  },
  'pt-BR': {
    canonical: 'https://laplandtours.online/br/design-tour',
    breadcrumbHome: 'Início',
    breadcrumbName: 'Viagem sob medida',
    articleHeadline: 'Crie a sua própria viagem à Lapônia',
    articleDescription:
      'Formulário de pedido para viajantes que precisam de um roteiro na Lapônia totalmente sob medida: pedidos de casamento, aniversários em família, viagens por várias regiões e reservas de luxo.',
  },
  'zh-CN': {
    canonical: 'https://laplandtours.online/cn/design-tour',
    breadcrumbHome: '首页',
    breadcrumbName: '定制行程',
    articleHeadline: '定制你自己的拉普兰之旅',
    articleDescription:
      '面向需要完全定制拉普兰行程的旅客的需求表单：求婚、家庭生日、跨区域行程和高端预订。',
  },
};

export default function DesignTour() {
  const lang = useLang();
  const m = META[copyLang(lang)];
  const { title, description } = routeMeta('/design-tour', lang);
  useEffect(() => {
    setPageMeta({
      title,
      description,
      canonical: m.canonical,
      jsonLd: [
        breadcrumbList([
          { name: m.breadcrumbHome, path: lang === 'en' ? '/' : `/${LANG_TO_PREFIX[lang]}` },
          { name: m.breadcrumbName, path: lang === 'en' ? '/design-tour' : `/${LANG_TO_PREFIX[lang]}/design-tour` },
        ]),
        articleSchema({
          headline: m.articleHeadline,
          description: m.articleDescription,
          path: lang === 'en' ? '/design-tour' : `/${LANG_TO_PREFIX[lang]}/design-tour`,
        }),
      ],
    });
  }, [lang, m, title, description]);

  return (
    <>
      <CustomTourBuilder />
      <PageBreadcrumb />
      <div className="bg-deep-night py-6 px-4 border-t border-white/5">
        <AffiliateDisclosure variant="full" />
      </div>
    </>
  );
}
