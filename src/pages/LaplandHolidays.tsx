import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OperatorGuide from '../components/OperatorGuide';
import OperatorMatrix from '../components/OperatorMatrix';
import MatkapojatGroupTrips from '../components/MatkapojatGroupTrips';
import AffiliateCTA from '../components/AffiliateCTA';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { setPageMeta, breadcrumbList, articleSchema } from '../lib/meta';
import { useLang, useLocalePath, type CopyLang, copyLang, LANG_TO_PREFIX } from '../i18n/useLang';

const COPY: Record<CopyLang, {
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbHome: string;
  breadcrumbName: string;
  articleHeadline: string;
  articleDescription: string;
  /**
   * One string, ONE line on desktop (Vesa 2026-07-24: no visible hyphen-wrap
   * at lg+). Long fi/de compounds carry a soft hyphen (­) that only
   * activates when the line truly cannot fit (mobile widths).
   */
  h1: string;
  chapter: string;
  addons: string;
  addonsBody: string;
  addonHotel: string;
  addonCar: string;
  addonActivity: string;
  noneEyebrow: string;
  noneLine: string;
  noneCta: string;
  altHero: string;
}> = {
  en: {
    metaTitle: 'The Operators: Six tour companies for Finnish Lapland | #LaplandTours',
    metaDescription:
      'An honest guide to six Finland-based local operators running Lapland activities themselves in 2026: what each one does well, and what you actually get when you book.',
    canonical: 'https://laplandtours.online/lapland-holidays',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Operator guide',
    articleHeadline: 'The Operators: Six tour companies for Finnish Lapland',
    articleDescription:
      'An editorial guide to six local operators that run Finnish Lapland trips on the ground.',
    h1: 'The operators',
    chapter: 'Chapter IV',
    addons: 'The add-ons',
    addonsBody:
      "Most travellers extend the operator package with a hotel night either side, a self-drive day, or a half-day GetYourGuide activity. These are the three rails commission is earned on. Booked direct, no middleman, the contract is with the partner.",
    addonHotel: 'Hotel night, Rovaniemi →',
    addonCar: 'Self-drive, ex-RVN →',
    addonActivity: 'Day activity →',
    noneEyebrow: 'None of the above?',
    noneLine:
      "Tell us your trip and a matching operator will be suggested.",
    noneCta: 'Design your trip →',
    altHero: 'Husky team running through a snowy spruce corridor',
  },
  fi: {
    metaTitle: 'Matkanjärjestäjät: Suomen Lappi | #LaplandTours',
    metaDescription:
      'Rehellinen opas kuuteen suomalaiseen Lapin toimijaan 2026: mitä kukin osaa, missä ne sijaitsevat ja mitä todella saat, kun varaat suoraan.',
    canonical: 'https://laplandtours.online/fi/lapland-holidays',
    breadcrumbHome: 'Etusivu',
    breadcrumbName: 'Matkanjärjestäjät',
    articleHeadline: 'Matkanjärjestäjät: kuusi Suomen Lapin matkanjärjestäjää',
    articleDescription:
      'Toimituksellinen opas kuuteen matkanjärjestäjään, joiden kautta ihmiset matkustavat Suomen Lappiin.',
    h1: 'Matkan­järjestäjät',
    chapter: 'Luku IV',
    addons: 'Lisät',
    addonsBody:
      'Useimmat täydentävät aktiviteettejaan hotelliyöllä alku- tai loppuun, omatoimisella ajopäivällä tai puolen päivän GetYourGuide-retkellä. Nämä kolme raidetta tuottavat provisiota. Varaus suoraan, ei välikäsiä, sopimus syntyy kumppanin kanssa.',
    addonHotel: 'Hotelliyö Rovaniemi →',
    addonCar: 'Vuokra-auto Rovaniemestä →',
    addonActivity: 'Päiväretki →',
    noneEyebrow: 'Eikö mikään näistä sovi?',
    noneLine:
      'Kerro matkaideasi, ja sopiva matkanjärjestäjä ehdotetaan.',
    noneCta: 'Suunnittele oma matka →',
    altHero: 'Huskysafari etenee lumisen kuusimetsän käytävässä',
  },
  de: {
    metaTitle: 'Die Reiseveranstalter: Finnisch-Lappland | #LaplandTours',
    metaDescription:
      'Ein ehrlicher Überblick über sechs in Finnland ansässige Lappland-Anbieter 2026: Stärken, Standorte und was Sie bei der Direktbuchung wirklich bekommen.',
    canonical: 'https://laplandtours.online/de/lapland-holidays',
    breadcrumbHome: 'Start',
    breadcrumbName: 'Reiseveranstalter',
    articleHeadline: 'Die Reiseveranstalter: Sechs Anbieter für Finnisch-Lappland',
    articleDescription:
      'Ein redaktioneller Überblick über die sechs Reiseveranstalter, die Gäste nach Finnisch-Lappland bringen.',
    h1: 'Die Reise­veranstalter',
    chapter: 'Kapitel IV',
    addons: 'Die Ergänzungen',
    addonsBody:
      'Die meisten Gäste ergänzen ihre Aktivitäten um eine Hotelnacht vorher oder nachher, einen Selbstfahrer-Tag oder eine halbtägige GetYourGuide-Tour. Auf diesen drei Schienen fällt Provision an. Direkt gebucht, ohne Zwischenhändler, der Vertrag entsteht mit dem jeweiligen Partner.',
    addonHotel: 'Hotelnacht in Rovaniemi →',
    addonCar: 'Selbstfahrer ab Rovaniemi →',
    addonActivity: 'Tagestour →',
    noneEyebrow: 'Nichts dabei?',
    noneLine:
      'Beschreiben Sie Ihre Reise, und ein passender Reiseveranstalter wird vorgeschlagen.',
    noneCta: 'Reise individuell planen →',
    altHero: 'Husky-Gespann läuft durch einen verschneiten Fichtenkorridor',
  },
  ja: {
    metaTitle: 'ツアー会社｜フィンランド・ラップランドの6社のツアー会社 | #LaplandTours',
    metaDescription:
      '2026年、フィンランドを拠点とするラップランドの6社を率直にご紹介します。各社の得意分野、拠点、そして直接予約したときに実際に得られるもの。',
    canonical: 'https://laplandtours.online/ja/lapland-holidays',
    breadcrumbHome: 'ホーム',
    breadcrumbName: 'ツアー会社ガイド',
    articleHeadline: 'ツアー会社｜フィンランド・ラップランドの6社のツアー会社',
    articleDescription:
      'フィンランド・ラップランドへ旅行者を送る6社のツアーオペレーターについての編集ガイドです。',
    h1: '主要オペレーター',
    chapter: '第IV章',
    addons: 'アドオン',
    addonsBody:
      'ほとんどの旅行者は、アクティビティに前後の宿泊、自由運転日、GetYourGuideの半日アクティビティを組み合わせます。これらが当サイトの手数料が発生する3つの枠です。直接予約、仲介者なし、契約はパートナーとの間で結ばれます。',
    addonHotel: '宿泊、ロヴァニエミ →',
    addonCar: '自由運転、RVN出発 →',
    addonActivity: '日帰りアクティビティ →',
    noneEyebrow: '上記のどれも合わない場合は？',
    noneLine:
      'ご希望の旅をお聞かせください。マッチするオペレーターをご提案します。',
    noneCta: 'あなたの旅をデザインする →',
    altHero: '雪に覆われたモミの木の通路を走るハスキーチーム',
  },
  ko: {
    metaTitle: '운영사: 핀란드 라플란드를 다루는 여섯 운영사 | #LaplandTours',
    metaDescription:
      '2026년 핀란드에 기반을 둔 라플란드 운영사 여섯 곳을 솔직하게 안내합니다. 각 운영사의 강점, 위치, 그리고 직접 예약 시 실제로 받게 되는 내용.',
    canonical: 'https://laplandtours.online/kr/lapland-holidays',
    breadcrumbHome: '홈',
    breadcrumbName: '운영사 가이드',
    articleHeadline: '운영사: 핀란드 라플란드를 다루는 여섯 운영사',
    articleDescription:
      '핀란드 라플란드로 사람들을 보내는 여섯 운영사에 대한 편집 가이드입니다.',
    h1: '대표 운영사',
    chapter: '챕터 IV',
    addons: '추가 옵션',
    addonsBody:
      '대부분의 여행자는 액티비티에 앞뒤 호텔 숙박, 자유 운전 하루, 또는 GetYourGuide의 반나절 액티비티를 곁들입니다. 이 세 영역이 수수료가 발생하는 곳입니다. 중개 없이 직접 예약하며, 계약은 파트너와 맺습니다.',
    addonHotel: '로바니에미 호텔 숙박 →',
    addonCar: 'RVN 출발 자유 운전 →',
    addonActivity: '당일 액티비티 →',
    noneEyebrow: '이 중에 맞는 게 없으신가요?',
    noneLine: '원하시는 여행을 알려주시면 적합한 운영사를 제안해 드립니다.',
    noneCta: '여행 디자인하기 →',
    altHero: '눈 덮인 가문비나무 사이를 달리는 허스키 팀',
  },
  fr: {
    metaTitle: 'Les voyagistes : Laponie finlandaise | #LaplandTours',
    metaDescription:
      'Un guide honnête de six opérateurs lapons établis en Finlande en 2026 : leurs points forts, où ils sont basés et ce que vous obtenez en réservant en direct.',
    canonical: 'https://laplandtours.online/fr/lapland-holidays',
    breadcrumbHome: 'Accueil',
    breadcrumbName: 'Guide des voyagistes',
    articleHeadline: 'Les voyagistes : Six tour-opérateurs pour la Laponie finlandaise',
    articleDescription:
      'Un guide éditorial des six tour-opérateurs qui emmènent les voyageurs en Laponie finlandaise.',
    h1: 'Les voyagistes',
    chapter: 'Chapitre IV',
    addons: 'Les compléments',
    addonsBody:
      'La plupart des voyageurs associent leurs activités à une nuit d\'hôtel avant ou après, une journée en autotour ou une activité d\'une demi-journée via GetYourGuide. Ce sont les trois rails sur lesquels une commission est perçue : réservation directe, sans intermédiaire, le contrat se conclut avec le partenaire.',
    addonHotel: 'Nuit d\'hôtel, Rovaniemi →',
    addonCar: 'Autotour, départ RVN →',
    addonActivity: 'Activité à la journée →',
    noneEyebrow: 'Aucun ne convient ?',
    noneLine: 'Décrivez votre voyage et un voyagiste compatible vous sera proposé.',
    noneCta: 'Concevoir votre voyage →',
    altHero: 'Attelage de huskies traversant un couloir d\'épicéas enneigés',
  },
  it: {
    metaTitle: 'I tour operator: Lapponia finlandese | #LaplandTours',
    metaDescription:
      'Una guida onesta a sei operatori lapponi con sede in Finlandia nel 2026: punti di forza, dove hanno sede e cosa ottiene prenotando direttamente.',
    canonical: 'https://laplandtours.online/it/lapland-holidays',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Guida agli operatori',
    articleHeadline: 'I tour operator: Sei operatori per la Lapponia finlandese',
    articleDescription:
      'Una guida editoriale ai sei tour operator che portano persone in Lapponia finlandese.',
    h1: 'Gli operatori',
    chapter: 'Capitolo IV',
    addons: 'I complementi',
    addonsBody:
      'La maggior parte dei viaggiatori affianca alle attività una notte in hotel prima o dopo, una giornata in autotour o un\'attività di mezza giornata su GetYourGuide. Questi sono i tre binari su cui maturiamo commissione: prenotazione diretta, senza intermediari, il contratto si conclude con il partner.',
    addonHotel: 'Notte in hotel, Rovaniemi →',
    addonCar: 'Autotour, da RVN →',
    addonActivity: 'Attività di un giorno →',
    noneEyebrow: 'Nessuno fa al caso suo ?',
    noneLine: 'Ci descriva il suo viaggio: le proporremo un operatore compatibile.',
    noneCta: 'Progetti il Suo viaggio →',
    altHero: 'Muta di husky in corsa lungo un corridoio di abeti innevati',
  },
  nl: {
    metaTitle: 'De reisorganisaties: Fins Lapland | #LaplandTours',
    metaDescription:
      'Een eerlijke gids over zes in Finland gevestigde Lapland-aanbieders in 2026: sterktes, waar ze gevestigd zijn en wat u krijgt als u direct boekt.',
    canonical: 'https://laplandtours.online/nl/lapland-holidays',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Operator-gids',
    articleHeadline: 'De reisorganisaties: Zes touroperators voor Fins Lapland',
    articleDescription:
      'Een redactionele gids over de zes reisorganisaties die reizigers naar Fins Lapland brengen.',
    h1: 'De operators',
    chapter: 'Hoofdstuk IV',
    addons: 'De aanvullingen',
    addonsBody:
      'De meeste reizigers combineren hun activiteiten met een hotelnacht aan een van beide kanten, een zelfrij-dag of een halfdagactiviteit via GetYourGuide. Dat zijn de drie sporen waarop commissie wordt verdiend: direct geboekt, zonder tussenpersoon, het contract is met de partner.',
    addonHotel: 'Hotelnacht, Rovaniemi →',
    addonCar: 'Zelfrijden, vanaf RVN →',
    addonActivity: 'Dagactiviteit →',
    noneEyebrow: 'Niets van uw gading ?',
    noneLine: 'Vertel ons uw reis en we stellen een passende reisorganisatie voor.',
    noneCta: 'Ontwerp uw reis →',
    altHero: 'Husky-team rent door een besneeuwde sparrenlaan',
  },
  sv: {
    metaTitle: 'Aktörerna: finska Lappland | #LaplandTours',
    metaDescription:
      'En ärlig guide till sex aktörer baserade i finska Lappland 2026: vad var och en är bra på, var de finns och vad du faktiskt får när du bokar direkt.',
    canonical: 'https://laplandtours.online/sv/lapland-holidays',
    breadcrumbHome: 'Hem',
    breadcrumbName: 'Aktörsguide',
    articleHeadline: 'Aktörerna: sex researrangörer för finska Lappland',
    articleDescription:
      'En redaktionell guide till de sex aktörer som tar resenärer till finska Lappland.',
    h1: 'Aktörerna',
    chapter: 'Kapitel IV',
    addons: 'Tilläggen',
    addonsBody:
      'De flesta kompletterar sina aktiviteter med en hotellnatt före eller efter, en dag med hyrbil på egen hand eller en GetYourGuide-utflykt på en halvdag. Det är på de här tre spåren provision tjänas in. Bokat direkt, utan mellanhänder, avtalet ingås med partnern.',
    addonHotel: 'Hotellnatt, Rovaniemi →',
    addonCar: 'Hyrbil från Rovaniemi →',
    addonActivity: 'Dagsutflykt →',
    noneEyebrow: 'Passar ingen av dem?',
    noneLine:
      'Berätta om din resa, så föreslår vi en aktör som passar.',
    noneCta: 'Planera din resa →',
    altHero: 'Huskyspann springer genom en snötäckt grankorridor',
  },
  es: {
    metaTitle: 'Los operadores: Laponia finlandesa | #LaplandTours',
    metaDescription:
      'Una guía honesta de seis operadores lapones con sede en Finlandia en 2026: qué hace bien cada uno, dónde están y qué obtiene al reservar directamente.',
    canonical: 'https://laplandtours.online/es/lapland-holidays',
    breadcrumbHome: 'Inicio',
    breadcrumbName: 'Guía de operadores',
    articleHeadline: 'Los operadores: Seis empresas para la Laponia finlandesa',
    articleDescription:
      'Una guía editorial de los seis operadores que llevan gente a la Laponia finlandesa.',
    h1: 'Los operadores',
    chapter: 'Capítulo IV',
    addons: 'Los complementos',
    addonsBody:
      'La mayoría suma a sus actividades una noche de hotel a un lado u otro, un día de autotour o una actividad de media jornada de GetYourGuide. Son las tres vías en las que se obtiene comisión: reservadas directamente, sin intermediarios; el contrato es con el socio.',
    addonHotel: 'Noche de hotel, Rovaniemi →',
    addonCar: 'Autotour, desde RVN →',
    addonActivity: 'Actividad de un día →',
    noneEyebrow: '¿Ninguno encaja?',
    noneLine:
      'Cuéntenos su viaje y le sugeriremos un operador a medida.',
    noneCta: 'Diseñe su viaje →',
    altHero: 'Tiro de huskies corriendo por un corredor nevado de abetos',
  },
  'pt-BR': {
    metaTitle: 'As operadoras: Lapônia finlandesa | #LaplandTours',
    metaDescription:
      'Um guia honesto de seis operadoras locais sediadas na Finlândia em 2026: o que cada uma faz bem, onde ficam e o que você recebe ao reservar direto.',
    canonical: 'https://laplandtours.online/br/lapland-holidays',
    breadcrumbHome: 'Início',
    breadcrumbName: 'Guia de operadoras',
    articleHeadline: 'As operadoras: Seis empresas para a Lapônia finlandesa',
    articleDescription:
      'Um guia editorial das seis operadoras que levam pessoas à Lapônia finlandesa.',
    h1: 'As operadoras',
    chapter: 'Capítulo IV',
    addons: 'Os complementos',
    addonsBody:
      'A maioria combina suas atividades com uma diária de hotel em uma das pontas, um dia de autotour ou uma atividade de meio período da GetYourGuide. São os três trilhos em que se ganha comissão: reservados direto, sem intermediário; o contrato é com o parceiro.',
    addonHotel: 'Diária de hotel, Rovaniemi →',
    addonCar: 'Autotour, a partir de RVN →',
    addonActivity: 'Atividade de um dia →',
    noneEyebrow: 'Nenhuma serve?',
    noneLine:
      'Conte-nos sua viagem e sugerimos uma operadora compatível.',
    noneCta: 'Crie a sua viagem →',
    altHero: 'Matilha de huskies correndo por um corredor nevado de abetos',
  },
  'zh-CN': {
    metaTitle: '运营商：六家做芬兰拉普兰的旅游公司 | #LaplandTours',
    metaDescription:
      '一份关于 2026 年六家总部设在芬兰的拉普兰运营商的坦诚指南：各家擅长什么、位于何处，以及直接预订后你实际能得到什么。',
    canonical: 'https://laplandtours.online/cn/lapland-holidays',
    breadcrumbHome: '首页',
    breadcrumbName: '运营商指南',
    articleHeadline: '运营商：六家做芬兰拉普兰的旅游公司',
    articleDescription:
      '一份关于六家把旅客送往芬兰拉普兰的运营商的编辑指南。',
    h1: '这些运营商',
    chapter: '第四章',
    addons: '附加项',
    addonsBody:
      '多数旅客会在活动前后加一晚酒店、一个自驾日，或一次 GetYourGuide 的半日活动。这就是产生佣金的三条线路：直接预订，无中间商，合同与合作伙伴签订。',
    addonHotel: '酒店住宿，罗瓦涅米 →',
    addonCar: '自驾，从 RVN 出发 →',
    addonActivity: '一日活动 →',
    noneEyebrow: '都不合适？',
    noneLine:
      '告诉我们你的行程，我们会推荐合适的运营商。',
    noneCta: '定制你的行程 →',
    altHero: '一队哈士奇在覆雪的云杉通道中奔跑',
  },
};


export default function LaplandHolidays() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[copyLang(lang)];
  useEffect(() => {
    setPageMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      canonical: c.canonical,
      jsonLd: [
        breadcrumbList([
          { name: c.breadcrumbHome, path: lang === 'en' ? '/' : `/${LANG_TO_PREFIX[lang]}` },
          { name: c.breadcrumbName, path: lang === 'en' ? '/lapland-holidays' : `/${LANG_TO_PREFIX[lang]}/lapland-holidays` },
        ]),
        articleSchema({
          headline: c.articleHeadline,
          description: c.articleDescription,
          path: lang === 'en' ? '/lapland-holidays' : `/${LANG_TO_PREFIX[lang]}/lapland-holidays`,
        }),
      ],
    });
  }, [lang, c]);

  return (
    <>
      {/* 2026-09-11: hero rebuilt. Vesa on the old top: "ihan levällään kaikki,
          alku on ihan paskaa, ei aiheuta mitään himoa lukea". Gone: the four
          stat tiles (incl. "0 € commission"), the drop-cap essay and the
          "nothing is sold here" note. Now: one real photograph, the title, one
          sentence, and the operators start within a screen. */}
      <section className="relative min-h-[60svh] md:min-h-[68svh] flex items-end overflow-hidden bg-deep-night">
        <ImagePlaceholder
          variant="twilight"
          src="/images/hero-holidays.webp"
          alt={c.altHero}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(15,23,42,0.92) 0%, rgba(15,23,42,0.45) 45%, rgba(15,23,42,0.05) 100%)',
          }}
        />
        <div className="relative z-10 max-w-[1200px] w-full mx-auto px-6 sm:px-10 pt-32 pb-14 md:pb-20">
          <h1 className="mt-3 font-heading tracking-wide leading-[0.95] text-snow text-[clamp(2.75rem,7vw,6rem)] [hyphens:manual] break-words [text-wrap:balance] drop-shadow-[0_3px_18px_rgba(0,0,0,0.9)]">
            {c.h1}
          </h1>
          <p className="mt-5 text-snow/90 font-body text-lg sm:text-xl leading-relaxed max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {c.articleDescription}
          </p>
        </div>
      </section>

      <PageBreadcrumb />
      <OperatorGuide />


      <OperatorMatrix />

      {/* FI only: the one package-trip partner we can honestly list (Matkapojat,
          Adtraction). Sits after the no-commission operator table and is
          labelled as a partner link, so the "0 € from the list" figure above
          stays true of the list. */}
      <MatkapojatGroupTrips />

      <section className="bg-deep-night py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-12 gap-8">
          <div className="sm:col-span-4">
            <p className="cap-meta">{c.chapter}</p>
            <h2 className="mt-2 font-heading tracking-tight leading-[0.92] text-snow text-5xl sm:text-6xl">
              {c.addons}
            </h2>
          </div>
          <div className="sm:col-span-7 sm:col-start-6">
            <p className="text-snow/70 font-body text-base sm:text-lg leading-relaxed mb-8 max-w-2xl">
              {c.addonsBody}
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              <AffiliateCTA
                partner="hotels"
                sid="holidays_addon_hotels"
                destination="Rovaniemi"
                className="block px-5 py-4 bg-vibe-pink text-white font-body font-semibold hover:bg-vibe-pink/90 transition-colors text-[15px]"
              >
                {c.addonHotel}
              </AffiliateCTA>
              <AffiliateCTA
                partner="cars"
                sid="holidays_addon_cars"
                destination="RVN"
                className="block px-5 py-4 border border-snow/30 text-snow font-body font-medium hover:border-vibe-pink hover:text-vibe-pink transition-colors text-[15px]"
              >
                {c.addonCar}
              </AffiliateCTA>
              <AffiliateCTA
                partner="activities"
                sid="holidays_addon_activities"
                destination="s569-finnish-lapland-tc16"
                gygSearch="Lapland activities Rovaniemi"
                className="block px-5 py-4 border border-snow/30 text-snow font-body font-medium hover:border-vibe-pink hover:text-vibe-pink transition-colors text-[15px]"
              >
                {c.addonActivity}
              </AffiliateCTA>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-deeper-night py-16 sm:py-20">
        <div className="max-w-[900px] mx-auto px-6 sm:px-10 text-center">
          <p className="cap-meta">{c.noneEyebrow}</p>
          <p className="mt-4 font-heading text-snow text-3xl sm:text-4xl tracking-wide leading-tight">
            {c.noneLine}
          </p>
          <Link
            to={to('/design-tour')}
            className="mt-8 inline-flex items-center gap-2 text-snow border-b border-snow/40 hover:border-vibe-pink hover:text-vibe-pink pb-1 font-body font-medium transition-colors"
          >
            {c.noneCta}
          </Link>
        </div>
      </section>

      <div className="bg-deep-night py-6 px-4">
        <AffiliateDisclosure variant="full" />
      </div>
    </>
  );
}
