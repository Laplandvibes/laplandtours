import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import OperatorGuide from '../components/OperatorGuide';
import OperatorMatrix from '../components/OperatorMatrix';
import ImageBreak from '../components/ImageBreak';
import AffiliateCTA from '../components/AffiliateCTA';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import EditorialStandards from '../components/EditorialStandards';
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
  h1Top: string;
  h1Bot: string;
  introCap: string;
  intro: string;
  noteEyebrow: string;
  noteBody: string;
  quote: string;
  quoteAttribution: string;
  caption: string;
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
  altQuote: string;
}> = {
  en: {
    metaTitle: 'The Operators: Six tour companies for Finnish Lapland | #LaplandTours',
    metaDescription:
      'An honest guide to six UK and European operators selling Finnish Lapland holidays in 2026: what each one does well, where they fly from, and what you actually get when you book.',
    canonical: 'https://laplandtours.online/lapland-holidays',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Operator guide',
    articleHeadline: 'The Operators: Six tour companies for Finnish Lapland',
    articleDescription:
      'An editorial guide to the six tour operators that send people to Finnish Lapland.',
    h1Top: 'The',
    h1Bot: 'operators',
    introCap: 'Drop cap',
    intro:
      'Finnish Lapland is a long, thin country. Most British and European visitors get there on a packaged trip from one of six operators that have been doing this for years. What they sell is not the same: TUI is a 3-night day trip from a regional airport; Magnetic North is a six-night bespoke itinerary with a private aurora photographer. All six are listed honestly, side by side, so the right one for the trip you actually want is easy to find.',
    noteEyebrow: 'A note on what this is',
    noteBody:
      'These packages are not sold here. There is no commercial agreement with any of the six operators below. Click through and the operator pays nothing back. Affiliate commission is earned only on the cross-sell rail (hotel night, car rental, day activity) at the bottom of this page.',
    quote:
      'A glass igloo is not a price-sensitive choice. The cheapest one in the country starts at €430 per night.',
    quoteAttribution: 'On the luxury tier',
    caption: '04 / Glass-roofed suite · Kakslauttanen',
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
    altQuote: 'Glass-roofed wilderness suite at blue hour with faint aurora visible through the roof',
  },
  fi: {
    metaTitle: 'Matkanjärjestäjät: Suomen Lappi | #LaplandTours',
    metaDescription:
      'Rehellinen opas kuuteen brittiläiseen ja eurooppalaiseen matkanjärjestäjään, jotka myyvät Suomen Lapin matkoja 2026: mitä kukin osaa ja mitä todella saat.',
    canonical: 'https://laplandtours.online/fi/lapland-holidays',
    breadcrumbHome: 'Etusivu',
    breadcrumbName: 'Matkanjärjestäjät',
    articleHeadline: 'Matkanjärjestäjät: kuusi Suomen Lapin matkanjärjestäjää',
    articleDescription:
      'Toimituksellinen opas kuuteen matkanjärjestäjään, joiden kautta ihmiset matkustavat Suomen Lappiin.',
    h1Top: 'Matkan-',
    h1Bot: 'järjestäjät',
    introCap: 'Lähestymistapa',
    intro:
      'Suomen Lappi on pitkä ja kapea maakunta. Useimmat brittiläiset ja eurooppalaiset matkustavat sinne kuuden vakiintuneen matkanjärjestäjän pakettimatkalla. Tarjonta ei ole sama: TUI myy kolmen yön päiväretkeä brittikentältä, Magnetic North kuuden yön räätälöityä matkaa yksityisen revontulivalokuvaajan kanssa. Kaikki kuusi on listattu rinnakkain, jotta oikea matka löytyy. Kirjoitettu Suomesta, lähteet näkyvillä.',
    noteEyebrow: 'Miksi tämä sivu',
    noteBody:
      'Näitä paketteja ei myydä täällä. Yhdenkään alla luetellun matkanjärjestäjän kanssa ei ole kaupallista sopimusta, eikä linkin klikkauksesta makseta provisiota. Kumppanuusprovisiota kertyy vain sivun alaosan ristiinmyyntiriviltä (hotelliyö, vuokra-auto, päiväretki).',
    quote:
      'Lasi-iglu ei ole hintaherkkä valinta. Maan halvinkin alkaa 430 €:sta yöltä.',
    quoteAttribution: 'Luksusluokasta',
    caption: '04 / Lasikattoinen huvila · Kakslauttanen',
    chapter: 'Luku IV',
    addons: 'Lisät',
    addonsBody:
      'Useimmat jatkavat pakettia hotelliyöllä alku- tai loppuun, omatoimisella ajopäivällä tai puolen päivän GetYourGuide-retkellä. Nämä kolme raidetta tuottavat provisiota. Varaus suoraan, ei välikäsiä, sopimus syntyy kumppanin kanssa.',
    addonHotel: 'Hotelliyö Rovaniemi →',
    addonCar: 'Vuokra-auto Rovaniemestä →',
    addonActivity: 'Päiväretki →',
    noneEyebrow: 'Eikö mikään näistä sovi?',
    noneLine:
      'Kerro matkaideasi, ja sopiva matkanjärjestäjä ehdotetaan.',
    noneCta: 'Suunnittele oma matka →',
    altHero: 'Huskysafari etenee lumisen kuusimetsän käytävässä',
    altQuote: 'Lasikattoinen erämaa-huvila sinisellä hetkellä, heikko revontuli katon läpi',
  },
  de: {
    metaTitle: 'Die Reiseveranstalter: Finnisch-Lappland | #LaplandTours',
    metaDescription:
      'Ein ehrlicher Überblick über sechs britische und europäische Reiseveranstalter, die 2026 Reisen nach Finnisch-Lappland verkaufen: Stärken und Abflughäfen.',
    canonical: 'https://laplandtours.online/de/lapland-holidays',
    breadcrumbHome: 'Start',
    breadcrumbName: 'Reiseveranstalter',
    articleHeadline: 'Die Reiseveranstalter: Sechs Anbieter für Finnisch-Lappland',
    articleDescription:
      'Ein redaktioneller Überblick über die sechs Reiseveranstalter, die Gäste nach Finnisch-Lappland bringen.',
    h1Top: 'Die Reise-',
    h1Bot: 'veranstalter',
    introCap: 'Ausgangslage',
    intro:
      'Finnisch-Lappland ist eine lange, schmale Region. Die meisten britischen und europäischen Gäste reisen mit einem Paket von sechs etablierten Reiseveranstaltern an. Das Angebot ist unterschiedlich: TUI bietet eine 3-Nächte-Tagesreise ab Regionalflughafen, Magnetic North eine sechs Nächte lange individuelle Reise mit privatem Polarlicht-Fotografen. Alle sechs werden offen nebeneinander gestellt, damit die passende Wahl leichter fällt.',
    noteEyebrow: 'Zum Charakter dieser Seite',
    noteBody:
      'Die Pakete werden hier nicht verkauft. Mit keinem der sechs unten gelisteten Reiseveranstalter besteht eine Geschäftsbeziehung, und beim Durchklicken fließt keine Provision zurück. Affiliate-Provision fällt nur auf der Zusatz-Schiene am Seitenende (Hotelnacht, Mietwagen, Tagestour) an.',
    quote:
      'Ein Glas-Iglu ist keine preissensible Wahl. Das günstigste im Land startet bei 430 € pro Nacht.',
    quoteAttribution: 'Zur Luxusklasse',
    caption: '04 / Glas-Iglu-Suite · Kakslauttanen',
    chapter: 'Kapitel IV',
    addons: 'Die Ergänzungen',
    addonsBody:
      'Die meisten Gäste verlängern das Paket um eine Hotelnacht vorher oder nachher, einen Selbstfahrer-Tag oder eine halbtägige GetYourGuide-Tour. Auf diesen drei Schienen fällt Provision an. Direkt gebucht, ohne Zwischenhändler, der Vertrag entsteht mit dem jeweiligen Partner.',
    addonHotel: 'Hotelnacht in Rovaniemi →',
    addonCar: 'Selbstfahrer ab Rovaniemi →',
    addonActivity: 'Tagestour →',
    noneEyebrow: 'Nichts dabei?',
    noneLine:
      'Beschreiben Sie Ihre Reise, und ein passender Reiseveranstalter wird vorgeschlagen.',
    noneCta: 'Reise individuell planen →',
    altHero: 'Husky-Gespann läuft durch einen verschneiten Fichtenkorridor',
    altQuote: 'Glasüberdachte Wildnis-Suite zur blauen Stunde mit zartem Polarlicht durch das Dach',
  },
  ja: {
    metaTitle: 'ツアー会社｜フィンランド・ラップランドの6社のツアー会社 | #LaplandTours',
    metaDescription:
      '2026年にフィンランド・ラップランドのホリデーを販売するイギリスとヨーロッパの6社のオペレーターを率直にご紹介します。各社の得意分野、出発地、予約時に実際に得られるもの。',
    canonical: 'https://laplandtours.online/ja/lapland-holidays',
    breadcrumbHome: 'ホーム',
    breadcrumbName: 'ツアー会社ガイド',
    articleHeadline: 'ツアー会社｜フィンランド・ラップランドの6社のツアー会社',
    articleDescription:
      'フィンランド・ラップランドへ旅行者を送る6社のツアーオペレーターについての編集ガイドです。',
    h1Top: '主要',
    h1Bot: 'オペレーター',
    introCap: 'ドロップキャップ',
    intro:
      'フィンランド・ラップランドは細長い国です。イギリスとヨーロッパからのほとんどの訪問者は、長年この事業を続けている6社のオペレーターから提供されるパッケージで旅をします。各社が販売するものは同じではありません:TUIは地方空港からの3泊の日帰り旅行、Magnetic Northはプライベートなオーロラ写真家が同行する6泊のオーダーメイド旅程です。6社すべてを率直に横並びで掲載していますので、ご希望の旅にぴったりのものが簡単に見つかります。',
    noteEyebrow: '当ページについての注意',
    noteBody:
      'これらのパッケージは当サイトでは販売していません。以下の6社のオペレーターとは商業的な提携はなく、リンクをクリックしてもオペレーターから当サイトへの支払いは発生しません。アフィリエイト手数料は、このページ下部のクロスセル枠(宿泊、レンタカー、日帰りアクティビティ)でのみ発生します。',
    quote:
      'ガラスイグルーは価格を重視する選択ではありません。国内最安でも1泊430ユーロから始まります。',
    quoteAttribution: 'ラグジュアリークラスについて',
    caption: '04 / ガラス屋根のスイート · Kakslauttanen',
    chapter: '第IV章',
    addons: 'アドオン',
    addonsBody:
      'ほとんどの旅行者はオペレーターのパッケージに、前後の宿泊、自由運転日、GetYourGuideの半日アクティビティを追加します。これらが当サイトの手数料が発生する3つの枠です。直接予約、仲介者なし、契約はパートナーとの間で結ばれます。',
    addonHotel: '宿泊、ロヴァニエミ →',
    addonCar: '自由運転、RVN出発 →',
    addonActivity: '日帰りアクティビティ →',
    noneEyebrow: '上記のどれも合わない場合は?',
    noneLine:
      'ご希望の旅をお聞かせください。マッチするオペレーターをご提案します。',
    noneCta: 'あなたの旅をデザインする →',
    altHero: '雪に覆われたモミの木の通路を走るハスキーチーム',
    altQuote: 'ブルーアワーに屋根からかすかにオーロラが見えるガラス屋根の自然スイート',
  },
  ko: {
    metaTitle: '운영사: 핀란드 라플란드를 다루는 여섯 운영사 | #LaplandTours',
    metaDescription:
      '2026년 핀란드 라플란드 휴가를 판매하는 영국 및 유럽의 여섯 운영사를 솔직하게 안내합니다. 각 운영사의 강점, 출발지, 그리고 실제 예약 시 받게 되는 내용.',
    canonical: 'https://laplandtours.online/kr/lapland-holidays',
    breadcrumbHome: '홈',
    breadcrumbName: '운영사 가이드',
    articleHeadline: '운영사: 핀란드 라플란드를 다루는 여섯 운영사',
    articleDescription:
      '핀란드 라플란드로 사람들을 보내는 여섯 운영사에 대한 편집 가이드입니다.',
    h1Top: '대표',
    h1Bot: '운영사',
    introCap: '드롭캡',
    intro:
      '핀란드 라플란드는 길고 좁은 지역입니다. 영국과 유럽의 대다수 방문객은 오랜 기간 이 일을 해온 여섯 운영사의 패키지로 이곳에 도착합니다. 판매 상품은 동일하지 않습니다. TUI는 지방 공항 출발 3박 당일 여행을 운영하고, Magnetic North는 전담 오로라 사진가가 동행하는 6박 맞춤형 일정을 제공합니다. 여섯 곳 모두 솔직하게 나란히 게재하여 원하시는 여행에 맞는 곳을 쉽게 찾을 수 있도록 했습니다.',
    noteEyebrow: '이 페이지의 성격',
    noteBody:
      '이 패키지들은 여기서 판매되지 않습니다. 아래 여섯 운영사와 상업적 계약은 없으며, 링크를 클릭하셔도 운영사로부터의 수수료는 발생하지 않습니다. 제휴 수수료는 이 페이지 하단의 크로스셀 영역(호텔 숙박, 렌터카, 당일 액티비티)에서만 발생합니다.',
    quote:
      '글래스 이글루는 가격에 민감한 선택이 아닙니다. 국내에서 가장 저렴한 곳도 1박 430유로부터 시작합니다.',
    quoteAttribution: '럭셔리 등급에 대해',
    caption: '04 / 글래스 지붕 스위트 · Kakslauttanen',
    chapter: '챕터 IV',
    addons: '추가 옵션',
    addonsBody:
      '대부분의 여행자는 운영사 패키지에 앞뒤 호텔 숙박, 자유 운전 하루, 또는 GetYourGuide의 반나절 액티비티를 추가합니다. 이 세 영역이 수수료가 발생하는 곳입니다. 중개 없이 직접 예약하며, 계약은 파트너와 맺습니다.',
    addonHotel: '로바니에미 호텔 숙박 →',
    addonCar: 'RVN 출발 자유 운전 →',
    addonActivity: '당일 액티비티 →',
    noneEyebrow: '이 중에 맞는 게 없으신가요?',
    noneLine: '원하시는 여행을 알려주시면 적합한 운영사를 제안해 드립니다.',
    noneCta: '여행 디자인하기 →',
    altHero: '눈 덮인 가문비나무 사이를 달리는 허스키 팀',
    altQuote: '블루아워에 지붕 너머로 희미한 오로라가 보이는 글래스 지붕 야생 스위트',
  },
  fr: {
    metaTitle: 'Les voyagistes : Laponie finlandaise | #LaplandTours',
    metaDescription:
      'Un guide honnête des six voyagistes britanniques et européens qui vendent des séjours en Laponie finlandaise en 2026 : points forts et aéroports de départ.',
    canonical: 'https://laplandtours.online/fr/lapland-holidays',
    breadcrumbHome: 'Accueil',
    breadcrumbName: 'Guide des voyagistes',
    articleHeadline: 'Les voyagistes : Six tour-opérateurs pour la Laponie finlandaise',
    articleDescription:
      'Un guide éditorial des six tour-opérateurs qui emmènent les voyageurs en Laponie finlandaise.',
    h1Top: 'Les',
    h1Bot: 'voyagistes',
    introCap: 'Lettrine',
    intro:
      'La Laponie finlandaise est une région longue et étroite. La plupart des voyageurs britanniques et européens y arrivent via un forfait conçu par l\'un des six voyagistes installés depuis longtemps sur ce marché. Leurs offres ne sont pas équivalentes : TUI propose un voyage de 3 nuits depuis un aéroport régional, Magnetic North compose un itinéraire sur mesure de six nuits avec un photographe-aurore privé. Les six sont présentés honnêtement, côte à côte, pour trouver facilement celui qui correspond au voyage que vous souhaitez.',
    noteEyebrow: 'Ce que cette page est',
    noteBody:
      'Ces forfaits ne sont pas vendus ici. Aucun accord commercial avec les six voyagistes ci-dessous ; le clic ne rapporte rien. Une commission d\'affiliation n\'est perçue que sur le rail de ventes croisées (nuit d\'hôtel, location de voiture, activité à la journée) en bas de page.',
    quote:
      'Un iglou de verre n\'est pas un choix sensible au prix. Le moins cher du pays démarre à 430 € la nuit.',
    quoteAttribution: 'Sur la gamme luxe',
    caption: '04 / Suite avec toit en verre · Kakslauttanen',
    chapter: 'Chapitre IV',
    addons: 'Les compléments',
    addonsBody:
      'La plupart des voyageurs prolongent le forfait avec une nuit d\'hôtel avant ou après, une journée en autotour ou une activité d\'une demi-journée via GetYourGuide. Ce sont les trois rails sur lesquels une commission est perçue : réservation directe, sans intermédiaire, le contrat se conclut avec le partenaire.',
    addonHotel: 'Nuit d\'hôtel, Rovaniemi →',
    addonCar: 'Autotour, départ RVN →',
    addonActivity: 'Activité à la journée →',
    noneEyebrow: 'Aucun ne convient ?',
    noneLine: 'Décrivez votre voyage et un voyagiste compatible vous sera proposé.',
    noneCta: 'Concevoir votre voyage →',
    altHero: 'Attelage de huskies traversant un couloir d\'épicéas enneigés',
    altQuote: 'Suite en pleine nature au toit en verre à l\'heure bleue, faible aurore visible à travers le plafond',
  },
  it: {
    metaTitle: 'I tour operator: Lapponia finlandese | #LaplandTours',
    metaDescription:
      'Una guida onesta ai sei tour operator britannici ed europei che vendono vacanze in Lapponia finlandese nel 2026: punti di forza e aeroporti di partenza.',
    canonical: 'https://laplandtours.online/it/lapland-holidays',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Guida agli operatori',
    articleHeadline: 'I tour operator: Sei operatori per la Lapponia finlandese',
    articleDescription:
      'Una guida editoriale ai sei tour operator che portano persone in Lapponia finlandese.',
    h1Top: 'Gli',
    h1Bot: 'operatori',
    introCap: 'Capolettera',
    intro:
      'La Lapponia finlandese è una regione lunga e stretta. La maggior parte dei visitatori britannici ed europei vi arriva con un pacchetto di uno dei sei operatori che fanno questo mestiere da anni. L\'offerta non è la stessa: TUI propone una gita di tre notti da un aeroporto regionale; Magnetic North un itinerario su misura di sei notti con fotografo dell\'aurora dedicato. Tutti e sei sono presentati onestamente, fianco a fianco, per trovare facilmente quello giusto per il viaggio che vuole davvero.',
    noteEyebrow: 'Una nota su questa pagina',
    noteBody:
      'Questi pacchetti non si vendono qui. Con i sei operatori elencati di seguito non vi è alcun accordo commerciale; il clic non produce alcuna commissione a loro carico. La commissione di affiliazione si attiva solo sul rail di cross-sell in fondo a questa pagina (notte in hotel, noleggio auto, attività di un giorno).',
    quote:
      'Un iglù di vetro non è una scelta sensibile al prezzo. Il più economico del paese parte da 430 € a notte.',
    quoteAttribution: 'Sulla fascia lusso',
    caption: '04 / Suite con tetto in vetro · Kakslauttanen',
    chapter: 'Capitolo IV',
    addons: 'I complementi',
    addonsBody:
      'La maggior parte dei viaggiatori estende il pacchetto con una notte in hotel prima o dopo, una giornata in autotour o un\'attività di mezza giornata su GetYourGuide. Questi sono i tre binari su cui maturiamo commissione: prenotazione diretta, senza intermediari, il contratto si conclude con il partner.',
    addonHotel: 'Notte in hotel, Rovaniemi →',
    addonCar: 'Autotour, da RVN →',
    addonActivity: 'Attività di un giorno →',
    noneEyebrow: 'Nessuno fa al caso suo ?',
    noneLine: 'Ci descriva il suo viaggio: le proporremo un operatore compatibile.',
    noneCta: 'Progetta il tuo viaggio →',
    altHero: 'Muta di husky in corsa lungo un corridoio di abeti innevati',
    altQuote: 'Suite con tetto in vetro nella natura all\'ora blu, con una debole aurora visibile attraverso il soffitto',
  },
  nl: {
    metaTitle: 'De reisorganisaties: Fins Lapland | #LaplandTours',
    metaDescription:
      'Een eerlijke gids over zes Britse en Europese reisorganisaties die in 2026 reizen naar Fins Lapland verkopen: sterktes, vertrekluchthavens en wat u krijgt.',
    canonical: 'https://laplandtours.online/nl/lapland-holidays',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Operator-gids',
    articleHeadline: 'De reisorganisaties: Zes tour operators voor Fins Lapland',
    articleDescription:
      'Een redactionele gids over de zes reisorganisaties die reizigers naar Fins Lapland brengen.',
    h1Top: 'De',
    h1Bot: 'operators',
    introCap: 'Drop cap',
    intro:
      'Fins Lapland is een lang, smal gebied. De meeste Britse en Europese bezoekers komen er via een pakketreis van een van zes reisorganisaties die dit al jaren doen. Wat zij verkopen verschilt: TUI biedt een dagtocht van drie nachten vanaf een regionale luchthaven; Magnetic North een zesnachten-maatwerkroute met een privéfotograaf voor het noorderlicht. Alle zes staan eerlijk naast elkaar, zodat de juiste keuze voor uw reis snel zichtbaar is.',
    noteEyebrow: 'Wat deze pagina is',
    noteBody:
      'Deze arrangementen worden hier niet verkocht. Met de zes hieronder genoemde reisorganisaties is geen commerciële afspraak, en bij doorklikken vloeit niets terug. Affiliate-commissie wordt alleen verdiend op de cross-sell-balk onderaan deze pagina (hotelnacht, huurauto, dagactiviteit).',
    quote:
      'Een glaziglo is geen prijsgevoelige keuze. De goedkoopste in het land begint bij € 430 per nacht.',
    quoteAttribution: 'Over het luxesegment',
    caption: '04 / Suite met glazen dak · Kakslauttanen',
    chapter: 'Hoofdstuk IV',
    addons: 'De aanvullingen',
    addonsBody:
      'De meeste reizigers verlengen het arrangement met een hotelnacht aan een van beide kanten, een zelfrij-dag of een halfdagactiviteit via GetYourGuide. Dat zijn de drie sporen waarop commissie wordt verdiend: direct geboekt, zonder tussenpersoon, het contract is met de partner.',
    addonHotel: 'Hotelnacht, Rovaniemi →',
    addonCar: 'Zelfrijden, vanaf RVN →',
    addonActivity: 'Dagactiviteit →',
    noneEyebrow: 'Niets van uw gading ?',
    noneLine: 'Vertel ons uw reis en we stellen een passende reisorganisatie voor.',
    noneCta: 'Ontwerp uw reis →',
    altHero: 'Husky-team rent door een besneeuwde sparrenlaan',
    altQuote: 'Wildernissuite met glazen dak tijdens het blauwe uur, met vaag noorderlicht door het dak',
  },
  es: {
    metaTitle: 'Los operadores: Laponia finlandesa | #LaplandTours',
    metaDescription:
      'Una guía honesta de seis operadores británicos y europeos que venden viajes a la Laponia finlandesa en 2026: qué hace bien cada uno y desde dónde vuelan.',
    canonical: 'https://laplandtours.online/es/lapland-holidays',
    breadcrumbHome: 'Inicio',
    breadcrumbName: 'Guía de operadores',
    articleHeadline: 'Los operadores: Seis empresas para la Laponia finlandesa',
    articleDescription:
      'Una guía editorial de los seis operadores que llevan gente a la Laponia finlandesa.',
    h1Top: 'Los',
    h1Bot: 'operadores',
    introCap: 'Capitular',
    intro:
      'La Laponia finlandesa es una región larga y estrecha. La mayoría de los visitantes británicos y europeos llegan con un viaje organizado de uno de seis operadores que llevan años haciéndolo. Lo que venden no es lo mismo: TUI es una escapada de tres noches desde un aeropuerto regional; Magnetic North, un itinerario a medida de seis noches con un fotógrafo de auroras privado. Los seis están listados con honestidad, uno al lado del otro, para que sea fácil dar con el adecuado para el viaje que de verdad quiere.',
    noteEyebrow: 'Qué es esto',
    noteBody:
      'Estos paquetes no se venden aquí. No hay acuerdo comercial con ninguno de los seis operadores de abajo: al hacer clic, el operador no paga nada de vuelta. La comisión de afiliación solo se obtiene en la franja de venta cruzada (noche de hotel, alquiler de coche, actividad de un día) al final de esta página.',
    quote:
      'Un iglú de cristal no es una elección para quien mira el precio. El más barato del país parte de 430 € por noche.',
    quoteAttribution: 'Sobre la gama de lujo',
    caption: '04 / Suite con techo de cristal · Kakslauttanen',
    chapter: 'Capítulo IV',
    addons: 'Los complementos',
    addonsBody:
      'La mayoría amplía el paquete del operador con una noche de hotel a un lado u otro, un día de autotour o una actividad de media jornada de GetYourGuide. Son las tres vías en las que se obtiene comisión: reservadas directamente, sin intermediarios; el contrato es con el socio.',
    addonHotel: 'Noche de hotel, Rovaniemi →',
    addonCar: 'Autotour, desde RVN →',
    addonActivity: 'Actividad de un día →',
    noneEyebrow: '¿Ninguno encaja?',
    noneLine:
      'Cuéntenos su viaje y le sugeriremos un operador a medida.',
    noneCta: 'Diseñe su viaje →',
    altHero: 'Tiro de huskies corriendo por un corredor nevado de abetos',
    altQuote: 'Suite de naturaleza con techo de cristal a la hora azul, con una aurora tenue visible a través del techo',
  },
  'pt-BR': {
    metaTitle: 'As operadoras: Lapônia finlandesa | #LaplandTours',
    metaDescription:
      'Um guia honesto de seis operadoras britânicas e europeias que vendem viagens à Lapônia finlandesa em 2026: o que cada uma faz bem e de onde voam.',
    canonical: 'https://laplandtours.online/br/lapland-holidays',
    breadcrumbHome: 'Início',
    breadcrumbName: 'Guia de operadoras',
    articleHeadline: 'As operadoras: Seis empresas para a Lapônia finlandesa',
    articleDescription:
      'Um guia editorial das seis operadoras que levam pessoas à Lapônia finlandesa.',
    h1Top: 'As',
    h1Bot: 'operadoras',
    introCap: 'Capitular',
    intro:
      'A Lapônia finlandesa é uma região longa e estreita. A maioria dos visitantes britânicos e europeus chega com uma viagem organizada por uma de seis operadoras que fazem isso há anos. O que elas vendem não é a mesma coisa: a TUI é um bate-volta de três noites de um aeroporto regional; a Magnetic North, um roteiro sob medida de seis noites com um fotógrafo de auroras particular. As seis estão listadas com honestidade, lado a lado, para você achar com facilidade a certa para a viagem que realmente quer.',
    noteEyebrow: 'O que é isto',
    noteBody:
      'Estes pacotes não são vendidos aqui. Não há acordo comercial com nenhuma das seis operadoras abaixo, e ao clicar, a operadora não repassa nada. A comissão de afiliado só é obtida na faixa de venda cruzada (diária de hotel, aluguel de carro, atividade de um dia) no fim desta página.',
    quote:
      'Um iglu de vidro não é uma escolha para quem é sensível a preço. O mais barato do país começa em € 430 por noite.',
    quoteAttribution: 'Sobre a faixa de luxo',
    caption: '04 / Suíte com teto de vidro · Kakslauttanen',
    chapter: 'Capítulo IV',
    addons: 'Os complementos',
    addonsBody:
      'A maioria estende o pacote da operadora com uma diária de hotel em uma das pontas, um dia de autotour ou uma atividade de meio período da GetYourGuide. São os três trilhos em que se ganha comissão: reservados direto, sem intermediário; o contrato é com o parceiro.',
    addonHotel: 'Diária de hotel, Rovaniemi →',
    addonCar: 'Autotour, a partir de RVN →',
    addonActivity: 'Atividade de um dia →',
    noneEyebrow: 'Nenhuma serve?',
    noneLine:
      'Conte-nos sua viagem e sugerimos uma operadora compatível.',
    noneCta: 'Crie a sua viagem →',
    altHero: 'Matilha de huskies correndo por um corredor nevado de abetos',
    altQuote: 'Suíte na natureza com teto de vidro na hora azul, com uma aurora tênue visível pelo teto',
  },
  'zh-CN': {
    metaTitle: '运营商：六家做芬兰拉普兰的旅游公司 | #LaplandTours',
    metaDescription:
      '一份关于六家在 2026 年销售芬兰拉普兰行程的英国与欧洲运营商的坦诚指南：各家擅长什么、从哪里出发，以及你预订后实际能得到什么。',
    canonical: 'https://laplandtours.online/cn/lapland-holidays',
    breadcrumbHome: '首页',
    breadcrumbName: '运营商指南',
    articleHeadline: '运营商：六家做芬兰拉普兰的旅游公司',
    articleDescription:
      '一份关于六家把旅客送往芬兰拉普兰的运营商的编辑指南。',
    h1Top: '这些',
    h1Bot: '运营商',
    introCap: '首字下沉',
    intro:
      '芬兰拉普兰是一片狭长的土地。多数英国和欧洲游客通过六家经营多年的运营商之一的打包行程前来。它们卖的并不一样：TUI 是从地方机场出发的三晚短途；Magnetic North 则是配私人极光摄影师的六晚定制行程。六家都被坦诚地并排列出，方便你为真正想要的行程找到合适的一家。',
    noteEyebrow: '这个页面是什么',
    noteBody:
      '这些套餐不在本站销售。我们与下面六家运营商都没有商业协议，你点击进入后，运营商不会返给我们任何报酬。联盟佣金只来自本页底部的交叉销售栏目（酒店住宿、租车、一日活动）。',
    quote:
      '玻璃穹顶屋并非注重价格的选择。全国最便宜的也要每晚 430 欧元起。',
    quoteAttribution: '关于奢华档位',
    caption: '04 / 玻璃顶套房 · Kakslauttanen',
    chapter: '第四章',
    addons: '附加项',
    addonsBody:
      '多数旅客会在运营商套餐前后加一晚酒店、一个自驾日，或一次 GetYourGuide 的半日活动来延长行程。这就是产生佣金的三条线路：直接预订，无中间商，合同与合作伙伴签订。',
    addonHotel: '酒店住宿，罗瓦涅米 →',
    addonCar: '自驾，从 RVN 出发 →',
    addonActivity: '一日活动 →',
    noneEyebrow: '都不合适？',
    noneLine:
      '告诉我们你的行程，我们会推荐合适的运营商。',
    noneCta: '定制你的行程 →',
    altHero: '一队哈士奇在覆雪的云杉通道中奔跑',
    altQuote: '蓝色时刻的玻璃顶荒野套房，透过屋顶可见淡淡的极光',
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
      <section className="relative min-h-[56vh] md:min-h-[62vh] flex items-center overflow-hidden bg-deep-night">
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
              'linear-gradient(to top, rgba(15,23,42,0.80) 0%, rgba(15,23,42,0.42) 50%, rgba(15,23,42,0.30) 100%)',
          }}
        />
        <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-10 py-16 sm:py-20">
          <h1 className="font-heading tracking-tight leading-[0.88] text-snow text-[clamp(3rem,10vw,9rem)] break-words hyphens-auto drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
            {c.h1Top}<br />{c.h1Bot}
          </h1>
        </div>
      </section>

      <PageBreadcrumb />

      <section className="bg-deep-night py-20 sm:py-28">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <p className="drop-cap text-snow/85 text-lg sm:text-xl leading-[1.75] font-body">
            {c.intro}
          </p>

          <p className="cap-meta mt-10 mb-3">{c.noteEyebrow}</p>
          <p className="text-snow/65 font-body text-[15px] leading-relaxed">
            {c.noteBody}
          </p>
        </div>
      </section>

      <OperatorGuide />

      <ImageBreak
        src="/images/card-luxury-aurora.webp"
        alt={c.altQuote}
        quote={c.quote}
        attribution={c.quoteAttribution}
        caption={c.caption}
      />

      <OperatorMatrix />

      <section className="bg-deep-night py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 grid grid-cols-12 gap-8">
          <div className="col-span-12 sm:col-span-4">
            <p className="cap-meta">{c.chapter}</p>
            <h2 className="mt-2 font-heading tracking-tight leading-[0.92] text-snow text-5xl sm:text-6xl">
              {c.addons}
            </h2>
          </div>
          <div className="col-span-12 sm:col-span-7 sm:col-start-6">
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

      <EditorialStandards />

      <div className="bg-deep-night py-6 px-4">
        <AffiliateDisclosure variant="full" />
      </div>
    </>
  );
}
