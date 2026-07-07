import { useEffect } from 'react';
import CustomTourBuilder from '../components/CustomTourBuilder';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { setPageMeta, breadcrumbList, articleSchema } from '../lib/meta';
import { useLang, type CopyLang, copyLang, LANG_TO_PREFIX } from '../i18n/useLang';

const META: Record<CopyLang, {
  title: string;
  description: string;
  canonical: string;
  breadcrumbHome: string;
  breadcrumbName: string;
  articleHeadline: string;
  articleDescription: string;
}> = {
  en: {
    title: 'Design your own Lapland trip | #LaplandTours',
    description:
      'Describe the Lapland holiday you actually want (group size, dates, budget and special requests), and a bespoke itinerary lands within 24 hours.',
    canonical: 'https://laplandtours.online/design-tour',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Custom tour',
    articleHeadline: 'Design your own Lapland trip',
    articleDescription:
      'A request form for travellers who need a fully bespoke Lapland itinerary: proposals, family birthdays, multi-region trips and luxury bookings.',
  },
  fi: {
    title: 'Suunnittele oma Lapin matkasi | #LaplandTours',
    description:
      'Kuvaile millaisen Lapin matkan haluat (ryhmäkoko, päivämäärät, budjetti ja erityistoiveet), niin räätälöity matkaehdotus saapuu 24 tunnissa.',
    canonical: 'https://laplandtours.online/fi/design-tour',
    breadcrumbHome: 'Etusivu',
    breadcrumbName: 'Räätälöity matka',
    articleHeadline: 'Suunnittele oma Lapin matkasi',
    articleDescription:
      'Tiedustelu­lomake matkustajille, jotka haluavat täysin räätälöidyn matkasuunnitelman: kosinta, perheen syntymäpäivät, useamman alueen matka tai luksusvaraus.',
  },
  de: {
    title: 'Individuelle Lappland-Reise planen | #LaplandTours',
    description:
      'Beschreiben Sie die Lappland-Reise, die Sie sich wirklich wünschen (Gruppengröße, Daten, Budget und besondere Anlässe), innerhalb von 24 Stunden folgt ein maßgeschneidertes Programm.',
    canonical: 'https://laplandtours.online/de/design-tour',
    breadcrumbHome: 'Start',
    breadcrumbName: 'Individuelle Reise',
    articleHeadline: 'Individuelle Lappland-Reise planen',
    articleDescription:
      'Anfrageformular für Reisende, die einen vollständig maßgeschneiderten Lappland-Reiseplan wünschen: Anträge, Familien-Geburtstage, Mehrregionen-Reisen oder Luxus-Buchungen.',
  },
  ja: {
    title: 'ラップランドの旅をデザインする | #LaplandTours',
    description:
      'ご希望のラップランド旅行をお聞かせください（人数、日程、ご予算、特別なご要望）。24時間以内にカスタマイズされた旅程をお送りします。',
    canonical: 'https://laplandtours.online/ja/design-tour',
    breadcrumbHome: 'ホーム',
    breadcrumbName: 'カスタムツアー',
    articleHeadline: 'ラップランドの旅をデザインする',
    articleDescription:
      '完全にカスタマイズされたラップランドの旅程をご希望の方向けのお問い合わせフォーム：プロポーズ、家族の誕生日、複数地域の旅行、ラグジュアリー予約。',
  },
  ko: {
    title: '라플란드 여행을 직접 디자인하기 | #LaplandTours',
    description:
      '원하시는 라플란드 휴가를 설명해 주세요(인원, 날짜, 예산, 특별한 요청). 24시간 안에 맞춤형 일정을 보내드립니다.',
    canonical: 'https://laplandtours.online/kr/design-tour',
    breadcrumbHome: '홈',
    breadcrumbName: '맞춤형 투어',
    articleHeadline: '라플란드 여행을 직접 디자인하기',
    articleDescription:
      '완전 맞춤형 라플란드 일정이 필요한 여행자를 위한 요청 양식: 청혼, 가족 생일, 복수 지역 여행, 럭셔리 예약.',
  },
  fr: {
    title: 'Concevez votre voyage en Laponie | #LaplandTours',
    description:
      'Décrivez le séjour en Laponie que vous souhaitez réellement (taille du groupe, dates, budget et demandes particulières) : un itinéraire sur mesure arrive sous 24 heures.',
    canonical: 'https://laplandtours.online/fr/design-tour',
    breadcrumbHome: 'Accueil',
    breadcrumbName: 'Voyage sur mesure',
    articleHeadline: 'Concevez votre voyage en Laponie',
    articleDescription:
      'Formulaire de demande pour les voyageurs qui veulent un itinéraire entièrement sur mesure en Laponie : demandes en mariage, anniversaires en famille, voyages multi-régions et réservations de luxe.',
  },
  it: {
    title: 'Progetti il suo viaggio in Lapponia | #LaplandTours',
    description:
      'Descriva la vacanza in Lapponia che desidera davvero (numero di partecipanti, date, budget e richieste speciali), entro 24 ore le inviamo un itinerario su misura.',
    canonical: 'https://laplandtours.online/it/design-tour',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Viaggio su misura',
    articleHeadline: 'Progetti il suo viaggio in Lapponia',
    articleDescription:
      'Modulo di richiesta per i viaggiatori che desiderano un itinerario in Lapponia interamente su misura: proposte di matrimonio, compleanni in famiglia, viaggi multi-regione e prenotazioni di lusso.',
  },
  nl: {
    title: 'Ontwerp uw eigen reis naar Lapland | #LaplandTours',
    description:
      'Beschrijf de Lapland-vakantie die u écht wilt (groepsgrootte, data, budget en speciale wensen), binnen 24 uur ligt er een reis op maat klaar.',
    canonical: 'https://laplandtours.online/nl/design-tour',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Reis op maat',
    articleHeadline: 'Ontwerp uw eigen reis naar Lapland',
    articleDescription:
      'Aanvraagformulier voor reizigers die een volledig op maat gemaakte Lapland-reisplanning willen: aanzoeken, gezinsverjaardagen, meerregio-reizen en luxe boekingen.',
  },
  es: {
    title: 'Diseñe su propio viaje a Laponia | #LaplandTours',
    description:
      'Describa las vacaciones en Laponia que de verdad quiere (tamaño del grupo, fechas, presupuesto y peticiones especiales), y recibirá un itinerario a medida en menos de 24 horas.',
    canonical: 'https://laplandtours.online/es/design-tour',
    breadcrumbHome: 'Inicio',
    breadcrumbName: 'Viaje a medida',
    articleHeadline: 'Diseñe su propio viaje a Laponia',
    articleDescription:
      'Formulario de solicitud para viajeros que necesitan un itinerario en Laponia totalmente a medida: pedidas de mano, cumpleaños familiares, viajes por varias regiones y reservas de lujo.',
  },
  'pt-BR': {
    title: 'Crie a sua própria viagem à Lapônia | #LaplandTours',
    description:
      'Descreva as férias na Lapônia que você realmente quer (tamanho do grupo, datas, orçamento e pedidos especiais), e receba um roteiro sob medida em até 24 horas.',
    canonical: 'https://laplandtours.online/br/design-tour',
    breadcrumbHome: 'Início',
    breadcrumbName: 'Viagem sob medida',
    articleHeadline: 'Crie a sua própria viagem à Lapônia',
    articleDescription:
      'Formulário de pedido para viajantes que precisam de um roteiro na Lapônia totalmente sob medida: pedidos de casamento, aniversários em família, viagens por várias regiões e reservas de luxo.',
  },
  'zh-CN': {
    title: '定制你自己的拉普兰之旅 | #LaplandTours',
    description:
      '描述你真正想要的拉普兰假期（人数、日期、预算和特别要求），我们会在 24 小时内为你送上一份定制行程。',
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
  useEffect(() => {
    setPageMeta({
      title: m.title,
      description: m.description,
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
  }, [lang, m]);

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
