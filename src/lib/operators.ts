/**
 * Single source of truth for the six operators we cover.
 *
 * Editorial framing: we are NOT selling these packages. We list operators we
 * trust, link out via UTM-tagged direct referrals, and let the visitor book
 * on the operator's site under the operator's terms. Star ratings are our
 * editorial assessment of how strong each operator is per category — not the
 * operator's own marketing claim. We do not have affiliate contracts with any
 * of these operators (no commission flows back to us from these clicks).
 *
 * The site DOES earn affiliate commission on the cross-sell rail (Hotels.com
 * via CJ, EconomyBookings via CJ, GetYourGuide direct partner_id) — those
 * sit in `<AffiliateCTA>`, completely separate from this operator list.
 *
 * Star scale (subjective editorial, reviewed every 6 months):
 *   ★★★★  signature specialty — what the operator is famous for
 *   ★★★   strong category — they do this well
 *   ★★    competent — they offer it but it isn't a focus
 *   ★     basic — bookable but not their strength
 *   —     does not offer
 */

export type StarLevel = 0 | 1 | 2 | 3 | 4;

/**
 * Subjective price tier — NOT a specific price quote, NOT a currency mark.
 *   budget    cheapest end of the segment   (TUI day-trips)
 *   mid       mid-tier mass-market          (Inghams, Santa's Lapland, Nordic Visitor)
 *   premium   premium specialist            (Transun adventure week)
 *   luxury    bespoke luxury                (Magnetic North, glass-igloo packages)
 *
 * Real prices change by week, season, departure airport, group size, etc. We
 * deliberately don't quote a number — clicking through to the operator's site
 * shows the visitor the actual current price for their dates.
 */
export type PriceTier = 'budget' | 'mid' | 'premium' | 'luxury';

export interface Operator {
  slug: string;
  name: string;
  domain: string;             // bare domain, no protocol (display)
  url: string;                // full URL for the referral link
  tagline: string;
  bestFor: string;            // short editorial line — "best for X"
  basedIn: string;            // operator HQ
  bases: string[];            // Lapland bases they use
  departures: string[];       // departure airports they fly from
  typicalLength: string;
  tier: PriceTier;            // subjective editorial tier — see PriceTier
  tierLabel: string;          // human descriptor for the tier
  stars: {
    family: StarLevel;
    aurora: StarLevel;
    husky: StarLevel;
    snowmobile: StarLevel;
    glassIgloo: StarLevel;
    selfDrive: StarLevel;
    luxury: StarLevel;
  };
  whatTheyDoWell: string;     // one paragraph, editorial
  whatTheyDont: string;       // honest limitation
  image: string;              // /images/* webp slot
  alt: string;
  isFeatured?: boolean;       // shown as Editor's Pick (one only)
}

export const operators: Operator[] = [
  {
    slug: 'inghams',
    name: 'Inghams',
    domain: 'inghams.co.uk',
    url: 'https://www.inghams.co.uk/lapland-holidays',
    tagline: 'UK\'s long-running Lapland-specialist',
    bestFor: 'Families with kids 4–12 on a 4–7-night aurora or Christmas trip from a UK regional airport.',
    basedIn: 'Surrey, UK',
    bases: ['Saariselkä', 'Luosto', 'Levi', 'Ylläs'],
    departures: ['LGW', 'MAN', 'BHX', 'BRS', 'EDI'],
    typicalLength: '3–7 nights',
    tier: 'mid',
    tierLabel: 'Mid-tier mass-market',
    stars: { family: 3, aurora: 3, husky: 3, snowmobile: 3, glassIgloo: 2, selfDrive: 0, luxury: 2 },
    whatTheyDoWell:
      'Reliable family-skewed packages with strong UK-regional departures, full-board hotel basis at Saariselkä Holiday Club and Luosto Aurora Chalets, and a fixed activity slate that suits parents with kids who don\'t want to plan day by day.',
    whatTheyDont:
      'No self-drive options. Activity menu is the same week to week, so independent-minded travellers may find it formulaic.',
    image: '/images/card-northern-lights.webp',
    alt: 'Faint green-cyan aurora arc above a frozen Lapland lake',
    isFeatured: true,
  },
  {
    slug: 'santas-lapland',
    name: "Santa's Lapland",
    domain: 'santaslapland.com',
    url: 'https://www.santaslapland.com',
    tagline: 'Single-product Christmas specialist',
    bestFor: 'Families with kids 3–9 on a short December Santa trip.',
    basedIn: 'Surrey, UK',
    bases: ['Saariselkä'],
    departures: ['LGW', 'MAN', 'BHX', 'EDI'],
    typicalLength: '3–4 nights',
    tier: 'mid',
    tierLabel: 'Mid-tier family',
    stars: { family: 4, aurora: 1, husky: 2, snowmobile: 2, glassIgloo: 1, selfDrive: 0, luxury: 0 },
    whatTheyDoWell:
      'Single-purpose December operator built around a one-on-one Santa visit in a Saariselkä forest setting, plus thermal-clothing hire and a tight all-inclusive activity slate. Books out from August onwards.',
    whatTheyDont:
      'Operates only late Nov–24 Dec. No summer or non-Christmas product. Limited choice of base.',
    image: '/images/card-christmas-santa.webp',
    alt: 'Two reindeer grazing in a snowy Lapland forest at twilight',
  },
  {
    slug: 'tui',
    name: 'TUI',
    domain: 'tui.co.uk/destinations/lapland',
    url: 'https://www.tui.co.uk/destinations/lapland',
    tagline: 'Mass-market UK package operator',
    bestFor: 'First-timers on a 3-night day-trip or short break from a regional airport.',
    basedIn: 'Luton, UK',
    bases: ['Saariselkä', 'Levi', 'Rovaniemi'],
    departures: ['LGW', 'STN', 'MAN', 'BHX', 'BRS', 'EMA', 'EDI', 'GLA'],
    typicalLength: '1–4 nights',
    tier: 'budget',
    tierLabel: 'Budget mass-market',
    stars: { family: 3, aurora: 2, husky: 2, snowmobile: 2, glassIgloo: 0, selfDrive: 0, luxury: 0 },
    whatTheyDoWell:
      'Widest UK regional-airport coverage in the segment. Day trips and overnight Santa breaks for the price-sensitive. Volume-driven, predictable.',
    whatTheyDont:
      'Activity programme is shorter than specialist operators. No glass igloos. No bespoke or private experiences.',
    image: '/images/card-family-holiday.webp',
    alt: 'Snowy Lapland forest path at golden afternoon light with two empty wooden sleds',
  },
  {
    slug: 'transun',
    name: 'Transun',
    domain: 'transun.co.uk',
    url: 'https://www.transun.co.uk',
    tagline: 'Adventure-week specialist',
    bestFor: 'Couples or active families on a 4–7 night multi-activity week.',
    basedIn: 'Oxford, UK',
    bases: ['Saariselkä', 'Luosto', 'Inari'],
    departures: ['LGW', 'MAN', 'BHX'],
    typicalLength: '4–7 nights',
    tier: 'premium',
    tierLabel: 'Premium adventure',
    stars: { family: 2, aurora: 3, husky: 3, snowmobile: 3, glassIgloo: 2, selfDrive: 0, luxury: 2 },
    whatTheyDoWell:
      'Activity-led weeks with husky sledding, snowmobile safaris and aurora hunting bundled by night, not by single excursion. Strong on northern Saariselkä / Inari base where aurora visibility is statistically higher.',
    whatTheyDont:
      'Less family-soft than Inghams or Santa\'s Lapland. Smaller departure list.',
    image: '/images/card-arctic-adventure.webp',
    alt: 'A single snowmobile track curving across a vast frozen Lapland lake',
  },
  {
    slug: 'magnetic-north',
    name: 'Magnetic North Travel',
    domain: 'magneticnorthtravel.com',
    url: 'https://www.magneticnorthtravel.com',
    tagline: 'Tailor-made Nordic luxury',
    bestFor: 'Couples and 30-something professionals on a glass-igloo + aurora chase at the high end of the market.',
    basedIn: 'Hampshire, UK',
    bases: ['Kakslauttanen', 'Inari', 'Muonio', 'Levi'],
    departures: ['LHR', 'LGW', 'MAN', 'EDI'],
    typicalLength: '3–6 nights',
    tier: 'luxury',
    tierLabel: 'Bespoke luxury',
    stars: { family: 1, aurora: 4, husky: 2, snowmobile: 2, glassIgloo: 4, selfDrive: 1, luxury: 4 },
    whatTheyDoWell:
      'Bespoke itineraries built on a phone call with a specialist consultant. Glass igloo product is their flagship (Kakslauttanen, Levin Iglut, Wilderness Hotels). Private aurora hunts with photography guide are routine.',
    whatTheyDont:
      'Not a price-sensitive option. No fixed package menu. Every quote is bespoke, which means slower turnaround.',
    image: '/images/card-luxury-aurora.webp',
    alt: 'Premium glass-roofed wilderness suite at blue hour with faint aurora through the roof',
  },
  {
    slug: 'nordic-visitor',
    name: 'Nordic Visitor',
    domain: 'nordicvisitor.com',
    url: 'https://www.nordicvisitor.com',
    tagline: 'Self-drive Nordic specialist',
    bestFor: 'Independent travellers wanting to combine Lapland with another Nordic country, summer or winter.',
    basedIn: 'Reykjavík, Iceland',
    bases: ['Rovaniemi', 'Levi', 'Saariselkä', 'Inari'],
    departures: ['HEL', 'RVN', 'KTT', 'IVL'],
    typicalLength: '5–10 nights',
    tier: 'mid',
    tierLabel: 'Mid-tier self-drive',
    stars: { family: 1, aurora: 2, husky: 1, snowmobile: 2, glassIgloo: 1, selfDrive: 4, luxury: 2 },
    whatTheyDoWell:
      'Best self-drive product in the network, with pre-booked rental, route, and accommodation across Finnish Lapland, plus summer Midnight Sun trips that the UK winter-only operators don\'t cover. Multi-country itineraries (Lapland + Iceland, Lapland + Norway).',
    whatTheyDont:
      'No UK-departure flights bundled. You book your own flights to Helsinki or Lapland. Less hand-holding than UK specialists.',
    image: '/images/card-midnight-sun.webp',
    alt: 'Lapland river bend at midnight sun, low warm horizontal golden light',
  },
];

export const matrixCategories: { key: keyof Operator['stars']; label: string }[] = [
  { key: 'family',      label: 'Family' },
  { key: 'aurora',      label: 'Aurora' },
  { key: 'husky',       label: 'Husky' },
  { key: 'snowmobile',  label: 'Snowmobile' },
  { key: 'glassIgloo',  label: 'Glass igloo' },
  { key: 'selfDrive',   label: 'Self-drive' },
  { key: 'luxury',      label: 'Luxury' },
];

export function withUtm(url: string, slug: string): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', 'laplandtours.online');
  u.searchParams.set('utm_medium', 'referral');
  u.searchParams.set('utm_campaign', `operator_${slug}`);
  return u.toString();
}

// =====================================================================
// i18n — localized prose fields per operator. Stars, slug, name, url,
// domain, departures, bases and image stay language-neutral.
// =====================================================================

export type OperatorLang = 'en' | 'fi' | 'de' | 'ja' | 'ko' | 'fr' | 'it' | 'nl' | 'es' | 'pt-BR' | 'zh-CN';

interface OperatorL10n {
  tagline: string;
  bestFor: string;
  basedIn: string;
  typicalLength: string;
  tierLabel: string;
  whatTheyDoWell: string;
  whatTheyDont: string;
}

const L10N: Record<string, Record<OperatorLang, OperatorL10n>> = {
  inghams: {
    en: {
      tagline: "UK's long-running Lapland specialist",
      bestFor: 'Families with kids 4–12 on a 4–7-night aurora or Christmas trip from a UK regional airport.',
      basedIn: 'Surrey, UK',
      typicalLength: '3–7 nights',
      tierLabel: 'Mid-tier mass-market',
      whatTheyDoWell:
        "Reliable family-skewed packages with strong UK-regional departures, full-board hotel basis at Saariselkä Holiday Club and Luosto Aurora Chalets, and a fixed activity slate that suits parents with kids who don't want to plan day by day.",
      whatTheyDont:
        'No self-drive options. Activity menu is the same week to week, so independent-minded travellers may find it formulaic.',
    },
    fi: {
      tagline: 'Pitkän linjan brittiläinen Lapin matkanjärjestäjä',
      bestFor: '4–12-vuotiaiden lasten perheet 4–7 yön revontuli- tai joulumatkalla brittikentältä.',
      basedIn: 'Surrey, Iso-Britannia',
      typicalLength: '3–7 yötä',
      tierLabel: 'Keskihintainen massamatka',
      whatTheyDoWell:
        'Luotettavat perhepainotteiset matkapaketit ja vahvat britti­regionaali­lähdöt. Täysihoito Saariselän Holiday Clubilla ja Luoston Aurora Chaleteilla. Kiinteä päiväretkivalikoima sopii perheille, jotka eivät halua suunnitella jokaista päivää erikseen.',
      whatTheyDont:
        'Ei vuokra-autovaihtoehtoa. Retkivalikoima toistuu viikosta toiseen, joten itsenäisesti matkaavalle se voi tuntua kaavamaiselta.',
    },
    de: {
      tagline: 'Langjähriger britischer Lappland-Spezialist',
      bestFor:
        'Familien mit Kindern zwischen 4 und 12 Jahren auf einer 4–7 Nächte langen Polarlicht- oder Weihnachtsreise ab einem britischen Regionalflughafen.',
      basedIn: 'Surrey, Vereinigtes Königreich',
      typicalLength: '3–7 Nächte',
      tierLabel: 'Mittelklasse für den Massenmarkt',
      whatTheyDoWell:
        'Zuverlässige, familienorientierte Reisepakete mit starken britischen Regional-Abflügen. Vollpension im Saariselkä Holiday Club und in den Luosto Aurora Chalets. Festes Tourenprogramm für Eltern, die nicht jeden Tag selbst planen möchten.',
      whatTheyDont:
        'Keine Mietwagen-Optionen. Das Tourenprogramm wiederholt sich Woche für Woche, für unabhängig Reisende möglicherweise zu formelhaft.',
    },
    ja: {
      tagline: 'イギリスの老舗ラップランド専門業者',
      bestFor: '4〜12歳のお子様連れの家族の方、イギリスの地方空港から4〜7泊のオーロラまたはクリスマスの旅。',
      basedIn: 'サリー、イギリス',
      typicalLength: '3〜7泊',
      tierLabel: '中価格帯のマスマーケット',
      whatTheyDoWell:
        '家族向けに偏った信頼できるパッケージ、イギリスの地方空港からの便が充実、サーリセルカホリデークラブとルオストオーロラシャレーでの全食付き宿泊。日々の計画を立てたくない子供連れの親御様にぴったりの固定アクティビティ構成です。',
      whatTheyDont:
        '自由運転オプションなし。アクティビティメニューは週ごとに同じため、自由な旅行を好む方には形式的に感じられるかもしれません。',
    },
    ko: {
      tagline: '영국의 오랜 라플란드 전문 투어 운영사',
      bestFor: '4~12세 자녀를 둔 가족, 영국 지방 공항에서 출발하는 4~7박 오로라 또는 크리스마스 투어에 적합합니다.',
      basedIn: '영국 서리',
      typicalLength: '3~7박',
      tierLabel: '중가 대중형',
      whatTheyDoWell:
        '영국 지방 공항 출발편이 강한 안정적인 가족 중심 패키지입니다. 사리셀카 Holiday Club과 루오스토 Aurora Chalets의 전식 호텔 숙박, 그리고 매일의 일정을 직접 계획하고 싶지 않은 부모에게 적합한 고정 액티비티 구성을 제공합니다.',
      whatTheyDont:
        '렌터카 옵션은 없습니다. 액티비티 메뉴가 매주 동일하기 때문에 자유로운 여행을 선호하는 분에게는 다소 정형화되어 보일 수 있습니다.',
    },
    fr: {
      tagline: 'Spécialiste britannique de la Laponie de longue date',
      bestFor: 'Familles avec enfants de 4 à 12 ans pour une visite de 4 à 7 nuits, aurore ou Noël, depuis un aéroport régional britannique.',
      basedIn: 'Surrey, Royaume-Uni',
      typicalLength: '3 à 7 nuits',
      tierLabel: 'Milieu de gamme grand public',
      whatTheyDoWell:
        'Circuits familiaux fiables avec de solides départs régionaux britanniques, hébergement en pension complète au Saariselkä Holiday Club et aux Luosto Aurora Chalets, et un programme d\'excursions fixe qui convient aux parents avec enfants qui ne souhaitent pas planifier chaque journée.',
      whatTheyDont:
        'Pas d\'option en autotour. Le menu d\'excursions se répète d\'une semaine à l\'autre, ce que les voyageurs autonomes peuvent trouver formaté.',
    },
    it: {
      tagline: 'Storico specialista britannico della Lapponia',
      bestFor: 'Famiglie con bambini di 4–12 anni per un tour di 4–7 notti, aurora o Natale, da un aeroporto regionale britannico.',
      basedIn: 'Surrey, Regno Unito',
      typicalLength: '3–7 notti',
      tierLabel: 'Fascia media di massa',
      whatTheyDoWell:
        'Tour familiari affidabili con buone partenze dai regionali britannici, pensione completa al Saariselkä Holiday Club e ai Luosto Aurora Chalets, e un programma di escursioni fisso adatto ai genitori con bambini che non vogliono pianificare giorno per giorno.',
      whatTheyDont:
        'Nessuna opzione in autonoleggio. Il menu delle escursioni si ripete settimana dopo settimana, quindi può sembrare schematico per chi cerca indipendenza.',
    },
    nl: {
      tagline: 'Britse Lapland-specialist met lange staat van dienst',
      bestFor: 'Gezinnen met kinderen van 4–12 jaar voor een 4–7-daagse aurora- of kerstreis vanaf een Britse regionale luchthaven.',
      basedIn: 'Surrey, Verenigd Koninkrijk',
      typicalLength: '3–7 nachten',
      tierLabel: 'Middensegment, mass-market',
      whatTheyDoWell:
        'Betrouwbare gezinsgerichte arrangementen met sterke regionale vertrekken vanuit het VK, hotel met vol pension in Saariselkä Holiday Club en Luosto Aurora Chalets, en een vast excursieprogramma dat past bij ouders die niet elke dag zelf willen plannen.',
      whatTheyDont:
        'Geen huurauto-opties. Het excursieprogramma is elke week hetzelfde, wat voor onafhankelijke reizigers schematisch kan aanvoelen.',
    },
    es: {
      tagline: 'Veterano especialista británico en Laponia',
      bestFor: 'Familias con niños de 4 a 12 años en un viaje de 4–7 noches de auroras o Navidad desde un aeropuerto regional británico.',
      basedIn: 'Surrey, Reino Unido',
      typicalLength: '3–7 noches',
      tierLabel: 'Gama media para el gran público',
      whatTheyDoWell:
        'Paquetes fiables orientados a familias, con buenas salidas desde aeropuertos regionales británicos, alojamiento en pensión completa en el Saariselkä Holiday Club y los Luosto Aurora Chalets, y un programa de excursiones fijo pensado para padres que no quieren planificar día a día.',
      whatTheyDont:
        'Sin opciones de autotour. El menú de actividades se repite semana tras semana, por lo que el viajero independiente puede encontrarlo previsible.',
    },
    'pt-BR': {
      tagline: 'Veterano especialista britânico em Lapônia',
      bestFor: 'Famílias com crianças de 4 a 12 anos em uma viagem de 4–7 noites de auroras ou Natal saindo de um aeroporto regional britânico.',
      basedIn: 'Surrey, Reino Unido',
      typicalLength: '3–7 noites',
      tierLabel: 'Categoria intermediária de grande público',
      whatTheyDoWell:
        'Pacotes confiáveis voltados a famílias, com boas saídas de aeroportos regionais britânicos, hospedagem com pensão completa no Saariselkä Holiday Club e nos Luosto Aurora Chalets, e um roteiro de atividades fixo, ideal para pais que não querem planejar dia a dia.',
      whatTheyDont:
        'Sem opções de autotour. O cardápio de atividades se repete a cada semana, então quem viaja por conta própria pode achá-lo previsível.',
    },
    'zh-CN': {
      tagline: '历史悠久的英国拉普兰专家',
      bestFor: '带 4 至 12 岁孩子、从英国地方机场出发的 4–7 晚极光或圣诞之旅家庭。',
      basedIn: '英国萨里',
      typicalLength: '3–7 晚',
      tierLabel: '面向大众的中端',
      whatTheyDoWell:
        '可靠的家庭向行程，英国地方机场航班选择多，在 Saariselkä Holiday Club 和 Luosto Aurora Chalets 提供全食宿，固定的活动安排适合不想逐日规划的家长。',
      whatTheyDont:
        '不提供自驾选项。活动菜单每周相同，喜欢自主安排的旅客可能觉得偏程式化。',
    },
},
  'santas-lapland': {
    en: {
      tagline: 'Single-product Christmas specialist',
      bestFor: 'Families with kids 3–9 on a short December Santa trip.',
      basedIn: 'Surrey, UK',
      typicalLength: '3–4 nights',
      tierLabel: 'Mid-tier family',
      whatTheyDoWell:
        'Single-purpose December operator built around a one-on-one Santa visit in a Saariselkä forest setting, plus thermal-clothing hire and a tight all-inclusive activity slate. Books out from August onwards.',
      whatTheyDont:
        'Operates only late Nov–24 Dec. No summer or non-Christmas product. Limited choice of base.',
    },
    fi: {
      tagline: 'Yhden tuotteen joulu­matkanjärjestäjä',
      bestFor: '3–9-vuotiaiden lasten perheet lyhyellä joulu­matkalla.',
      basedIn: 'Surrey, Iso-Britannia',
      typicalLength: '3–4 yötä',
      tierLabel: 'Keskihintainen perhe­matkanjärjestäjä',
      whatTheyDoWell:
        'Yksinomaan joulumatkoihin keskittynyt järjestäjä. Tarjontaan kuuluu kahdenkeskinen vierailu joulupukin luona Saariselän metsässä, lämpövaatteet ja tiivis all inclusive -retkivalikoima. Paikat täyttyvät elokuusta alkaen.',
      whatTheyDont:
        'Toiminta vain marraskuun loppu–24.12. Ei kesä- tai muita tuotteita. Vain yksi tukikohta.',
    },
    de: {
      tagline: 'Weihnachts-Spezialist mit einzigem Produkt',
      bestFor: 'Familien mit Kindern zwischen 3 und 9 Jahren auf einer kurzen Weihnachtsreise im Dezember.',
      basedIn: 'Surrey, Vereinigtes Königreich',
      typicalLength: '3–4 Nächte',
      tierLabel: 'Mittelklasse Familienreise',
      whatTheyDoWell:
        'Reiner Dezember-Veranstalter mit einem persönlichen Besuch beim Weihnachtsmann im Wald bei Saariselkä, Thermokleidung und einem kompakten All-inclusive-Programm. Ab August häufig ausgebucht.',
      whatTheyDont:
        'Betrieb nur von Ende November bis 24. Dezember. Kein Sommer- oder Nicht-Weihnachtsprogramm. Nur ein Standort.',
    },
    ja: {
      tagline: '単一商品のクリスマス専門業者',
      bestFor: '3〜9歳のお子様連れの家族の方、短期間の12月のサンタ訪問旅行。',
      basedIn: 'サリー、イギリス',
      typicalLength: '3〜4泊',
      tierLabel: '中価格帯の家族向け',
      whatTheyDoWell:
        '12月限定の専門オペレーター、サーリセルカの森でのサンタクロースとの個別面会、防寒着のレンタル、充実したオールインクルーシブのアクティビティ構成。8月から予約が埋まり始めます。',
      whatTheyDont:
        '11月下旬から12月24日のみの運営。夏季やクリスマス以外の商品はありません。拠点の選択肢が限られます。',
    },
    ko: {
      tagline: '단일 상품 크리스마스 전문 운영사',
      bestFor: '3~9세 자녀를 둔 가족의 짧은 12월 산타 여행에 적합합니다.',
      basedIn: '영국 서리',
      typicalLength: '3~4박',
      tierLabel: '중가 가족형',
      whatTheyDoWell:
        '12월 한정 운영사로, 사리셀카 숲에서의 일대일 산타 방문을 중심으로 구성됩니다. 방한복 대여와 빠짐없는 올인클루시브 액티비티 일정이 포함됩니다. 8월부터 예약이 차기 시작합니다.',
      whatTheyDont:
        '11월 말부터 12월 24일까지만 운영합니다. 여름이나 크리스마스 외 상품은 없습니다. 거점 선택지가 제한적입니다.',
    },
    fr: {
      tagline: 'Spécialiste de Noël à produit unique',
      bestFor: 'Familles avec enfants de 3 à 9 ans pour un court séjour Père Noël en décembre.',
      basedIn: 'Surrey, Royaume-Uni',
      typicalLength: '3 à 4 nuits',
      tierLabel: 'Milieu de gamme familial',
      whatTheyDoWell:
        'Voyagiste exclusivement orienté décembre, articulé autour d\'une visite individuelle du Père Noël dans la forêt de Saariselkä, avec location de vêtements thermiques et un programme d\'activités tout compris bien ficelé. Réservations qui se remplissent dès août.',
      whatTheyDont:
        'Exploitation uniquement de fin novembre au 24 décembre. Pas de produit estival ni hors-Noël. Choix de base limité.',
    },
    it: {
      tagline: 'Specialista del Natale a prodotto unico',
      bestFor: 'Famiglie con bambini di 3–9 anni per un breve viaggio dicembrino dedicato a Babbo Natale.',
      basedIn: 'Surrey, Regno Unito',
      typicalLength: '3–4 notti',
      tierLabel: 'Fascia media familiare',
      whatTheyDoWell:
        'Operatore dedicato esclusivamente a dicembre, costruito intorno a un incontro individuale con Babbo Natale nella foresta di Saariselkä, con noleggio dell\'abbigliamento termico e un programma all-inclusive serrato. Si esaurisce a partire da agosto.',
      whatTheyDont:
        'Opera solo da fine novembre al 24 dicembre. Nessun prodotto estivo o non natalizio. Scelta di base limitata.',
    },
    nl: {
      tagline: 'Kerst-specialist met één product',
      bestFor: 'Gezinnen met kinderen van 3–9 jaar voor een korte decemberreis bij de Kerstman.',
      basedIn: 'Surrey, Verenigd Koninkrijk',
      typicalLength: '3–4 nachten',
      tierLabel: 'Middensegment, familiair',
      whatTheyDoWell:
        'Uitsluitend op december gerichte reisorganisatie, opgebouwd rond een persoonlijk bezoek aan de Kerstman in het bos van Saariselkä, met huur van thermokleding en een strak all-inclusive activiteitenprogramma. Vanaf augustus snel volgeboekt.',
      whatTheyDont:
        'Alleen actief van eind november tot 24 december. Geen zomer- of niet-kerstproduct. Beperkte keuze qua basis.',
    },
    es: {
      tagline: 'Especialista navideño de producto único',
      bestFor: 'Familias con niños de 3 a 9 años en una escapada corta a Papá Noel en diciembre.',
      basedIn: 'Surrey, Reino Unido',
      typicalLength: '3–4 noches',
      tierLabel: 'Gama media familiar',
      whatTheyDoWell:
        'Operador exclusivo de diciembre, articulado en torno a un encuentro individual con Papá Noel en un bosque de Saariselkä, con alquiler de ropa térmica y un programa de actividades todo incluido bien medido. Se agota desde agosto.',
      whatTheyDont:
        'Opera solo de finales de noviembre al 24 de diciembre. Sin producto de verano ni fuera de Navidad. Una única base.',
    },
    'pt-BR': {
      tagline: 'Especialista de Natal com produto único',
      bestFor: 'Famílias com crianças de 3 a 9 anos em uma viagem curta ao Papai Noel em dezembro.',
      basedIn: 'Surrey, Reino Unido',
      typicalLength: '3–4 noites',
      tierLabel: 'Categoria intermediária familiar',
      whatTheyDoWell:
        'Operadora exclusiva de dezembro, construída em torno de um encontro individual com o Papai Noel em uma floresta de Saariselkä, com aluguel de roupas térmicas e um programa de atividades all-inclusive bem enxuto. Esgota a partir de agosto.',
      whatTheyDont:
        'Opera apenas do fim de novembro a 24 de dezembro. Sem produto de verão ou fora do Natal. Uma única base.',
    },
    'zh-CN': {
      tagline: '专注单一圣诞产品的运营商',
      bestFor: '带 3 至 9 岁孩子、十二月短途圣诞老人之旅的家庭。',
      basedIn: '英国萨里',
      typicalLength: '3–4 晚',
      tierLabel: '家庭向中端',
      whatTheyDoWell:
        '只在十二月运营，核心是在 Saariselkä 森林中与圣诞老人一对一会面，并提供保暖衣物租赁和紧凑的全包活动安排。从八月起便开始售罄。',
      whatTheyDont:
        '仅在十一月底至 12 月 24 日运营。没有夏季或非圣诞产品。基地选择单一。',
    },
},
  tui: {
    en: {
      tagline: 'Mass-market UK package operator',
      bestFor: 'First-timers on a 3-night day-trip or short break from a regional airport.',
      basedIn: 'Luton, UK',
      typicalLength: '1–4 nights',
      tierLabel: 'Budget mass-market',
      whatTheyDoWell:
        'Widest UK regional-airport coverage in the segment. Day trips and overnight Santa breaks for the price-sensitive. Volume-driven, predictable.',
      whatTheyDont:
        'Activity programme is shorter than specialist operators. No glass igloos. No bespoke or private experiences.',
    },
    fi: {
      tagline: 'Brittiläinen massamarkkina­matkanjärjestäjä',
      bestFor: 'Ensikertalaisille 3 yön päiväretki tai lyhyt loma brittikentältä.',
      basedIn: 'Luton, Iso-Britannia',
      typicalLength: '1–4 yötä',
      tierLabel: 'Edullinen massamatka',
      whatTheyDoWell:
        'Laajin britti­regionaalikentti­kattavuus segmentissä. Päiväretkiä ja lyhyitä joulumatkoja hinta­tietoiselle matkaajalle. Suuri volyymi, ennakoitava palvelu.',
      whatTheyDont:
        'Retkivalikoima on lyhyempi kuin erikoistuneilla järjestäjillä. Ei lasi-igluja. Ei räätälöityjä tai yksityisiä elämyksiä.',
    },
    de: {
      tagline: 'Britischer Massenmarkt-Veranstalter',
      bestFor: 'Erstreisende auf einer 3-Nächte-Tagesreise oder Kurzpause ab einem Regionalflughafen.',
      basedIn: 'Luton, Vereinigtes Königreich',
      typicalLength: '1–4 Nächte',
      tierLabel: 'Massenmarkt im Budget-Bereich',
      whatTheyDoWell:
        'Größte Abdeckung britischer Regionalflughäfen im Segment. Tagesreisen und kurze Weihnachts-Trips für preisbewusste Reisende. Volumenorientiert, planbar.',
      whatTheyDont:
        'Tourenprogramm kürzer als bei Spezialveranstaltern. Keine Glas-Iglus. Keine individuellen oder privaten Erlebnisse.',
    },
    ja: {
      tagline: 'マスマーケット向けイギリスのパッケージ業者',
      bestFor: '初めての方、地方空港からの3泊の日帰り旅行または短期休暇。',
      basedIn: 'ルートン、イギリス',
      typicalLength: '1〜4泊',
      tierLabel: '低価格帯のマスマーケット',
      whatTheyDoWell:
        'このセグメントでイギリスの地方空港カバレッジが最大。価格を重視する方向けの日帰り旅行と1泊のサンタ訪問。大量提供で予測可能なサービスです。',
      whatTheyDont:
        'アクティビティプログラムは専門業者よりも短いです。ガラスイグルーはありません。カスタマイズやプライベート体験はありません。',
    },
    ko: {
      tagline: '대중형 영국 패키지 운영사',
      bestFor: '지방 공항에서 출발하는 3박 당일 투어 또는 짧은 휴가에 적합한 초보 여행자에게 추천합니다.',
      basedIn: '영국 루턴',
      typicalLength: '1~4박',
      tierLabel: '저가 대중형',
      whatTheyDoWell:
        '이 세그먼트에서 영국 지방 공항 커버리지가 가장 넓습니다. 가격에 민감한 여행자를 위한 당일 투어와 1박 산타 여행을 제공합니다. 대량 운영, 예측 가능한 서비스입니다.',
      whatTheyDont:
        '액티비티 프로그램은 전문 운영사보다 짧습니다. 글래스 이글루는 제공하지 않습니다. 맞춤형 또는 프라이빗 경험은 없습니다.',
    },
    fr: {
      tagline: 'Voyagiste britannique grand public',
      bestFor: 'Premiers voyages : excursion de 3 nuits ou court séjour depuis un aéroport régional.',
      basedIn: 'Luton, Royaume-Uni',
      typicalLength: '1 à 4 nuits',
      tierLabel: 'Économique, grand public',
      whatTheyDoWell:
        'La plus large couverture d\'aéroports régionaux britanniques du segment. Excursions à la journée et courts séjours Père Noël pour les voyageurs sensibles au prix. Volume élevé, prévisible.',
      whatTheyDont:
        'Programme d\'activités plus court que celui des spécialistes. Pas d\'iglous de verre. Aucune expérience sur mesure ou privée.',
    },
    it: {
      tagline: 'Tour operator britannico di massa',
      bestFor: 'Per chi parte per la prima volta: gita di 3 notti o breve soggiorno da un aeroporto regionale.',
      basedIn: 'Luton, Regno Unito',
      typicalLength: '1–4 notti',
      tierLabel: 'Economico di massa',
      whatTheyDoWell:
        'La copertura più ampia di aeroporti regionali britannici del segmento. Gite di un giorno e brevi soggiorni dedicati a Babbo Natale per chi è attento al prezzo. Alto volume e prevedibilità.',
      whatTheyDont:
        'Programma di attività più ridotto rispetto agli specialisti. Niente iglù di vetro. Nessuna esperienza su misura o privata.',
    },
    nl: {
      tagline: 'Britse mass-market pakketreisorganisatie',
      bestFor: 'Eerstereizigers op een 3-daagse dagtocht of korte break vanaf een regionale luchthaven.',
      basedIn: 'Luton, Verenigd Koninkrijk',
      typicalLength: '1–4 nachten',
      tierLabel: 'Budget mass-market',
      whatTheyDoWell:
        'De breedste dekking van Britse regionale luchthavens in dit segment. Dagtochten en korte kerstreizen voor prijsbewuste reizigers. Volumegedreven, voorspelbaar.',
      whatTheyDont:
        'Activiteitenprogramma is korter dan bij specialisten. Geen glazen iglo\'s. Geen maatwerk- of privé-ervaringen.',
    },
    es: {
      tagline: 'Operador británico de paquetes para el gran público',
      bestFor: 'Quienes viajan por primera vez: excursión de 3 noches o escapada corta desde un aeropuerto regional.',
      basedIn: 'Luton, Reino Unido',
      typicalLength: '1–4 noches',
      tierLabel: 'Económico para el gran público',
      whatTheyDoWell:
        'La mayor cobertura de aeropuertos regionales británicos del segmento. Excursiones de un día y escapadas de una noche a Papá Noel para quienes miran el precio. Gran volumen, previsible.',
      whatTheyDont:
        'Programa de actividades más corto que el de los especialistas. Sin iglús de cristal. Sin experiencias a medida ni privadas.',
    },
    'pt-BR': {
      tagline: 'Operadora britânica de pacotes para grande público',
      bestFor: 'Quem viaja pela primeira vez: bate-volta de 3 noites ou escapada curta de um aeroporto regional.',
      basedIn: 'Luton, Reino Unido',
      typicalLength: '1–4 noites',
      tierLabel: 'Econômico de grande público',
      whatTheyDoWell:
        'A maior cobertura de aeroportos regionais britânicos do segmento. Bate-voltas e escapadas de uma noite ao Papai Noel para quem é sensível a preço. Alto volume, previsível.',
      whatTheyDont:
        'Programa de atividades mais curto que o dos especialistas. Sem iglus de vidro. Sem experiências sob medida ou privativas.',
    },
    'zh-CN': {
      tagline: '面向大众的英国打包旅游运营商',
      bestFor: '首次出行者，从地方机场出发的 3 晚短途或短假行程。',
      basedIn: '英国卢顿',
      typicalLength: '1–4 晚',
      tierLabel: '面向大众的经济型',
      whatTheyDoWell:
        '该细分市场中覆盖英国地方机场最广。为注重价格的旅客提供一日游和过夜圣诞老人短途行程。运量大，行程可预期。',
      whatTheyDont:
        '活动项目比专业运营商更少。没有玻璃穹顶屋。没有定制或私人体验。',
    },
},
  transun: {
    en: {
      tagline: 'Adventure-week specialist',
      bestFor: 'Couples or active families on a 4–7 night multi-activity week.',
      basedIn: 'Oxford, UK',
      typicalLength: '4–7 nights',
      tierLabel: 'Premium adventure',
      whatTheyDoWell:
        'Activity-led weeks with husky sledding, snowmobile safaris and aurora hunting bundled by night, not by single excursion. Strong on northern Saariselkä / Inari base where aurora visibility is statistically higher.',
      whatTheyDont:
        "Less family-soft than Inghams or Santa's Lapland. Smaller departure list.",
    },
    fi: {
      tagline: 'Seikkailuviikon erikoismatkanjärjestäjä',
      bestFor: 'Pariskunnille tai aktiivisille perheille 4–7 yön monitoiminen viikko.',
      basedIn: 'Oxford, Iso-Britannia',
      typicalLength: '4–7 yötä',
      tierLabel: 'Premium-luokan seikkailu',
      whatTheyDoWell:
        'Aktiivisuuteen rakennetut viikot, joissa huskysafari, kelkkasafari ja revontuliretket on niputettu yön mukaan, ei yksittäisinä retkinä. Vahva pohjoisemmilla Saariselkä/Inari-keskuksilla, joissa revontuli­tilastot ovat parempia.',
      whatTheyDont:
        "Vähemmän perheystävällinen kuin Inghams tai Santa's Lapland. Pienempi lähtökenttä­lista.",
    },
    de: {
      tagline: 'Spezialist für Abenteuerwochen',
      bestFor: 'Paare oder aktive Familien auf einer 4–7-Nächte-Aktivwoche.',
      basedIn: 'Oxford, Vereinigtes Königreich',
      typicalLength: '4–7 Nächte',
      tierLabel: 'Premium-Abenteuer',
      whatTheyDoWell:
        'Aktivitätsbetonte Wochenprogramme (Husky-Schlitten, Schneemobil-Safaris und Polarlichtjagden), gebündelt nach Nacht, nicht als Einzelausflüge. Stark in den nördlichen Standorten Saariselkä und Inari, wo Polarlichter statistisch häufiger sind.',
      whatTheyDont:
        "Weniger familienorientiert als Inghams oder Santa's Lapland. Kleinere Auswahl an Abflughäfen.",
    },
    ja: {
      tagline: 'アドベンチャー週間の専門業者',
      bestFor: 'カップルまたはアクティブな家族の方、4〜7泊のマルチアクティビティの週。',
      basedIn: 'オックスフォード、イギリス',
      typicalLength: '4〜7泊',
      tierLabel: 'プレミアムアドベンチャー',
      whatTheyDoWell:
        'アクティビティ中心の週間プラン、ハスキー犬ぞり、スノーモービルサファリ、オーロラハンティングを単発ではなく宿泊単位でまとめてご提供。サーリセルカやイナリの北部拠点に強く、統計的にオーロラの可視性が高い場所です。',
      whatTheyDont:
        "InghamsやSanta's Laplandと比べて家族向けの柔らかさは少なめ。出発地のリストもより少なめです。",
    },
    ko: {
      tagline: '어드벤처 위크 전문 운영사',
      bestFor: '커플 또는 활동적인 가족을 위한 4~7박의 멀티 액티비티 일주일 투어에 적합합니다.',
      basedIn: '영국 옥스퍼드',
      typicalLength: '4~7박',
      tierLabel: '프리미엄 어드벤처',
      whatTheyDoWell:
        '액티비티 중심의 주간 일정으로, 허스키 썰매, 스노모빌 사파리, 오로라 헌팅을 개별 투어가 아닌 숙박 단위로 묶어 제공합니다. 통계적으로 오로라 가시성이 높은 북부 사리셀카·이나리 거점에 강합니다.',
      whatTheyDont:
        "Inghams나 Santa's Lapland만큼 가족 친화적이지는 않습니다. 출발지 목록도 더 적습니다.",
    },
    fr: {
      tagline: 'Spécialiste des semaines d\'aventure',
      bestFor: 'Couples ou familles actives sur une semaine multi-activités de 4 à 7 nuits.',
      basedIn: 'Oxford, Royaume-Uni',
      typicalLength: '4 à 7 nuits',
      tierLabel: 'Aventure premium',
      whatTheyDoWell:
        'Semaines orientées activité (traîneau à chiens, safari motoneige et chasse aux aurores), groupées par nuitée et non par excursion isolée. Forte présence sur les bases nord, Saariselkä / Inari, où la visibilité des aurores est statistiquement meilleure.',
      whatTheyDont:
        "Moins doux côté famille que Inghams ou Santa's Lapland. Liste de départs plus restreinte.",
    },
    it: {
      tagline: 'Specialista delle settimane avventura',
      bestFor: 'Coppie o famiglie attive su una settimana multi-attività di 4–7 notti.',
      basedIn: 'Oxford, Regno Unito',
      typicalLength: '4–7 notti',
      tierLabel: 'Avventura premium',
      whatTheyDoWell:
        "Settimane incentrate sull'attività (sleddog husky, safari in motoslitta e caccia all'aurora), raggruppate per notte e non per singola escursione. Forte sulle basi settentrionali di Saariselkä e Inari, dove statisticamente l'aurora è più visibile.",
      whatTheyDont:
        "Meno familiare di Inghams o Santa's Lapland. Elenco aeroporti di partenza più ridotto.",
    },
    nl: {
      tagline: 'Specialist in avontuurlijke weekreizen',
      bestFor: 'Stellen of actieve gezinnen op een 4–7-daagse multi-activiteiten week.',
      basedIn: 'Oxford, Verenigd Koninkrijk',
      typicalLength: '4–7 nachten',
      tierLabel: 'Premium avontuur',
      whatTheyDoWell:
        'Activiteitgerichte weken (husky-sledetochten, sneeuwscootersafari\'s en aurora-jachten), gebundeld per nacht in plaats van per losse excursie. Sterk op de noordelijke bases Saariselkä en Inari, waar de zichtbaarheid van het noorderlicht statistisch hoger is.',
      whatTheyDont:
        "Minder gezinsvriendelijk dan Inghams of Santa's Lapland. Kleinere vertreklijst.",
    },
    es: {
      tagline: 'Especialista en semanas de aventura',
      bestFor: 'Parejas o familias activas en una semana multiactividad de 4–7 noches.',
      basedIn: 'Oxford, Reino Unido',
      typicalLength: '4–7 noches',
      tierLabel: 'Aventura premium',
      whatTheyDoWell:
        'Semanas centradas en la actividad (trineo de huskies, safaris en motonieve y caza de auroras), agrupadas por noche y no como excursión suelta. Fuertes en las bases del norte, Saariselkä e Inari, donde la visibilidad de la aurora es estadísticamente mayor.',
      whatTheyDont:
        "Menos enfocados en familias que Inghams o Santa's Lapland. Lista de salidas más reducida.",
    },
    'pt-BR': {
      tagline: 'Especialista em semanas de aventura',
      bestFor: 'Casais ou famílias ativas em uma semana multiatividade de 4–7 noites.',
      basedIn: 'Oxford, Reino Unido',
      typicalLength: '4–7 noites',
      tierLabel: 'Aventura premium',
      whatTheyDoWell:
        'Semanas centradas em atividade (trenó puxado por huskies, safáris de snowmobile e caça à aurora), agrupadas por noite, e não como passeio avulso. Fortes nas bases ao norte, Saariselkä e Inari, onde a visibilidade da aurora é estatisticamente maior.',
      whatTheyDont:
        "Menos voltados a famílias do que Inghams ou Santa's Lapland. Lista de saídas mais enxuta.",
    },
    'zh-CN': {
      tagline: '探险周专家',
      bestFor: '情侣或活力家庭，4–7 晚的多项活动行程周。',
      basedIn: '英国牛津',
      typicalLength: '4–7 晚',
      tierLabel: '高端探险',
      whatTheyDoWell:
        '以活动为核心的行程周，将哈士奇雪橇、雪地摩托和极光追寻按夜数打包，而非单次出行。在北部的 Saariselkä 与 Inari 基地实力突出，那里极光出现概率在统计上更高。',
      whatTheyDont:
        "对家庭的贴心程度不及 Inghams 或 Santa's Lapland。出发地选择更少。",
    },
},
  'magnetic-north': {
    en: {
      tagline: 'Tailor-made Nordic luxury',
      bestFor: 'Couples and 30-something professionals on a glass-igloo + aurora chase at the high end of the market.',
      basedIn: 'Hampshire, UK',
      typicalLength: '3–6 nights',
      tierLabel: 'Bespoke luxury',
      whatTheyDoWell:
        'Bespoke itineraries built on a phone call with a specialist consultant. Glass igloo product is their flagship (Kakslauttanen, Levin Iglut, Wilderness Hotels). Private aurora hunts with photography guide are routine.',
      whatTheyDont:
        'Not a price-sensitive option. No fixed package menu. Every quote is bespoke, which means slower turnaround.',
    },
    fi: {
      tagline: 'Räätälöity pohjoismainen luksus',
      bestFor: 'Pariskunnat ja 30+ ammattilaiset, lasi-iglu ja revontulet markkinoiden ylimmästä päästä.',
      basedIn: 'Hampshire, Iso-Britannia',
      typicalLength: '3–6 yötä',
      tierLabel: 'Räätälöity luksus',
      whatTheyDoWell:
        'Räätälöidyt matkasuunnitelmat puhelinkonsultaation pohjalta. Lasi-iglutuote on lippulaiva (Kakslauttanen, Levin Iglut, Wilderness Hotels). Yksityiset revontuliretket valokuvaajan kanssa ovat arkipäivää.',
      whatTheyDont:
        'Ei hintaherkkä vaihtoehto. Ei kiinteää pakettilistaa, vaan jokainen tarjous räätälöidään, mikä hidastaa vastausta.',
    },
    de: {
      tagline: 'Maßgeschneiderter nordischer Luxus',
      bestFor:
        'Paare und Berufstätige um die 30 auf einer Glas-Iglu- und Polarlicht-Reise im obersten Segment.',
      basedIn: 'Hampshire, Vereinigtes Königreich',
      typicalLength: '3–6 Nächte',
      tierLabel: 'Maßgeschneiderter Luxus',
      whatTheyDoWell:
        'Individuelle Reiseverläufe, entwickelt in einem Beratungsgespräch. Das Glas-Iglu ist das Aushängeschild (Kakslauttanen, Levin Iglut, Wilderness Hotels). Private Polarlichtjagden mit Fotografie-Guide sind Standard.',
      whatTheyDont:
        'Keine preissensible Option. Keine Festpaket-Liste. Jedes Angebot wird individuell erstellt, daher längere Reaktionszeiten.',
    },
    ja: {
      tagline: 'オーダーメイドの北欧ラグジュアリー',
      bestFor: 'カップルおよび30代の専門職の方、市場の最高級セグメントのガラスイグルー+オーロラ探訪。',
      basedIn: 'ハンプシャー、イギリス',
      typicalLength: '3〜6泊',
      tierLabel: 'カスタマイズラグジュアリー',
      whatTheyDoWell:
        '専門コンサルタントとの電話相談に基づくオーダーメイドの旅程。ガラスイグルー商品が主力です（Kakslauttanen、Levin Iglut、Wilderness Hotels）。写真ガイド付きのプライベートオーロラハンティングが標準的にご利用いただけます。',
      whatTheyDont:
        '価格を重視する方向けではありません。固定パッケージメニューはなく、各見積もりはオーダーメイドのため、対応にやや時間がかかります。',
    },
    ko: {
      tagline: '맞춤형 북유럽 럭셔리',
      bestFor: '커플 및 30대 전문직, 시장 최상위 가격대의 글래스 이글루와 오로라 추적 여행에 적합합니다.',
      basedIn: '영국 햄프셔',
      typicalLength: '3~6박',
      tierLabel: '맞춤형 럭셔리',
      whatTheyDoWell:
        '전문 컨설턴트와의 전화 상담을 바탕으로 한 맞춤형 일정. 글래스 이글루 상품이 대표적입니다 (Kakslauttanen, Levin Iglut, Wilderness Hotels). 사진 가이드가 동행하는 프라이빗 오로라 헌팅이 일상적입니다.',
      whatTheyDont:
        '가격에 민감한 옵션이 아닙니다. 고정 패키지 메뉴가 없으며 모든 견적이 맞춤형이라 응답이 다소 느립니다.',
    },
    fr: {
      tagline: 'Luxe nordique sur mesure',
      bestFor: 'Couples et professionnels trentenaires sur une escapade iglou de verre + chasse aux aurores, segment haut de gamme.',
      basedIn: 'Hampshire, Royaume-Uni',
      typicalLength: '3 à 6 nuits',
      tierLabel: 'Luxe sur mesure',
      whatTheyDoWell:
        'Itinéraires sur mesure construits lors d\'un entretien téléphonique avec un consultant spécialisé. L\'iglou de verre est leur produit phare (Kakslauttanen, Levin Iglut, Wilderness Hotels). Les chasses aux aurores privées avec photographe sont routinières.',
      whatTheyDont:
        'Ce n\'est pas une option économique. Pas de menu de forfaits fixes. Chaque devis est sur mesure, ce qui implique des délais plus longs.',
    },
    it: {
      tagline: 'Lusso nordico su misura',
      bestFor: 'Coppie e professionisti trentenni per un iglù di vetro + caccia all\'aurora, segmento alto.',
      basedIn: 'Hampshire, Regno Unito',
      typicalLength: '3–6 notti',
      tierLabel: 'Lusso su misura',
      whatTheyDoWell:
        'Itinerari su misura costruiti durante una telefonata con un consulente specializzato. L\'iglù di vetro è il prodotto di punta (Kakslauttanen, Levin Iglut, Wilderness Hotels). Cacce all\'aurora private con fotografo sono ordinaria amministrazione.',
      whatTheyDont:
        'Non è un\'opzione attenta al prezzo. Nessun menu di pacchetti fisso. Ogni preventivo è su misura, il che comporta tempi più lunghi.',
    },
    nl: {
      tagline: 'Maatwerk Noords luxesegment',
      bestFor: 'Stellen en professionals van rond de 30 op een glaziglo + aurora-jacht in het topsegment.',
      basedIn: 'Hampshire, Verenigd Koninkrijk',
      typicalLength: '3–6 nachten',
      tierLabel: 'Maatwerk luxe',
      whatTheyDoWell:
        'Op maat gemaakte reisroutes, opgebouwd in een telefoongesprek met een gespecialiseerde adviseur. Het glaziglo-product is hun vlaggenschip (Kakslauttanen, Levin Iglut, Wilderness Hotels). Privé-aurorajachten met fotograaf zijn routine.',
      whatTheyDont:
        'Geen prijsgevoelige optie. Geen vast pakketmenu. Elke offerte is maatwerk, wat de doorlooptijd verlengt.',
    },
    es: {
      tagline: 'Lujo nórdico a medida',
      bestFor: 'Parejas y profesionales treintañeros en una escapada de iglú de cristal + caza de auroras en la franja alta del mercado.',
      basedIn: 'Hampshire, Reino Unido',
      typicalLength: '3–6 noches',
      tierLabel: 'Lujo a medida',
      whatTheyDoWell:
        'Itinerarios a medida construidos a partir de una llamada con un asesor especializado. El iglú de cristal es su producto estrella: Kakslauttanen, Levin Iglut, Wilderness Hotels. Las cazas de auroras privadas con guía fotográfico son habituales.',
      whatTheyDont:
        'No es una opción para quien mira el precio. Sin menú de paquetes fijos: cada presupuesto es a medida, lo que implica respuestas más lentas.',
    },
    'pt-BR': {
      tagline: 'Luxo nórdico sob medida',
      bestFor: 'Casais e profissionais na casa dos 30 em uma escapada de iglu de vidro + caça à aurora no topo do mercado.',
      basedIn: 'Hampshire, Reino Unido',
      typicalLength: '3–6 noites',
      tierLabel: 'Luxo sob medida',
      whatTheyDoWell:
        'Roteiros sob medida construídos a partir de uma ligação com um consultor especializado. O iglu de vidro é o carro-chefe: Kakslauttanen, Levin Iglut, Wilderness Hotels. Caças à aurora privativas com guia fotográfico são rotina.',
      whatTheyDont:
        'Não é uma opção para quem é sensível a preço. Sem cardápio fixo de pacotes. Cada orçamento é sob medida, o que torna a resposta mais lenta.',
    },
    'zh-CN': {
      tagline: '量身定制的北欧奢华之旅',
      bestFor: '情侣及三十多岁的专业人士，市场高端的玻璃穹顶屋加极光追寻行程。',
      basedIn: '英国汉普郡',
      typicalLength: '3–6 晚',
      tierLabel: '定制奢华',
      whatTheyDoWell:
        '通过与专属顾问的电话沟通量身定制行程。玻璃穹顶屋是其招牌产品（Kakslauttanen、Levin Iglut、Wilderness Hotels）。配摄影向导的私人极光追寻属于常规项目。',
      whatTheyDont:
        '并非注重价格的选择。没有固定套餐菜单，每份报价都是定制的，因此响应较慢。',
    },
},
  'nordic-visitor': {
    en: {
      tagline: 'Self-drive Nordic specialist',
      bestFor: 'Independent travellers wanting to combine Lapland with another Nordic country, summer or winter.',
      basedIn: 'Reykjavík, Iceland',
      typicalLength: '5–10 nights',
      tierLabel: 'Mid-tier self-drive',
      whatTheyDoWell:
        "Best self-drive product in the network, with pre-booked rental, route, and accommodation across Finnish Lapland, plus summer Midnight Sun trips that the UK winter-only operators don't cover. Multi-country itineraries (Lapland + Iceland, Lapland + Norway).",
      whatTheyDont:
        'No UK-departure flights bundled. You book your own flights to Helsinki or Lapland. Less hand-holding than UK specialists.',
    },
    fi: {
      tagline: 'Vuokra-auto- ja pohjoismaa­erikoismatkanjärjestäjä',
      bestFor: 'Itsenäiset matkaajat, jotka haluavat yhdistää Lapin toiseen Pohjoismaahan, kesällä tai talvella.',
      basedIn: 'Reykjavík, Islanti',
      typicalLength: '5–10 yötä',
      tierLabel: 'Keskihintainen vuokra-automatka',
      whatTheyDoWell:
        'Verkoston paras vuokra-autotuote, jossa auto, reitti ja majoitus ovat valmiina Suomen Lapissa, mukaan lukien kesän yötön yö, jota brittiläiset talvi­järjestäjät eivät tarjoa. Monimaa­matkasuunnitelmat (Lappi + Islanti, Lappi + Norja).',
      whatTheyDont:
        'Ei britti­lentoja paketissa, vaan varaat lennot itse Helsinkiin tai Lappiin. Vähemmän opastusta kuin britti­erikois­järjestäjillä.',
    },
    de: {
      tagline: 'Spezialist für Nordeuropa-Selbstfahrer­reisen',
      bestFor: 'Unabhängige Reisende, die Lappland mit einem weiteren Nordland kombinieren, Sommer oder Winter.',
      basedIn: 'Reykjavík, Island',
      typicalLength: '5–10 Nächte',
      tierLabel: 'Mittelklasse Selbstfahrer',
      whatTheyDoWell:
        'Bestes Selbstfahrer-Produkt im Netzwerk, mit vorab gebuchtem Mietwagen, Route und Unterkünften in ganz Finnisch-Lappland, inklusive Mitternachtssonne im Sommer, die britische Winter-Anbieter nicht anbieten. Mehrländer-Routen (Lappland + Island, Lappland + Norwegen).',
      whatTheyDont:
        'Keine britischen Flüge im Paket. Flug nach Helsinki oder Lappland buchen Sie selbst. Weniger Hand-in-Hand-Betreuung als bei britischen Spezialisten.',
    },
    ja: {
      tagline: '自由運転の北欧専門業者',
      bestFor: '自由な旅行者の方、ラップランドと他の北欧諸国を組み合わせたい方、夏季または冬季。',
      basedIn: 'レイキャヴィーク、アイスランド',
      typicalLength: '5〜10泊',
      tierLabel: '中価格帯の自由運転',
      whatTheyDoWell:
        'ネットワーク内で最高の自由運転商品です。事前予約のレンタカー、ルート、フィンランド・ラップランド全域の宿泊、イギリスの冬季限定業者がカバーしない夏季の白夜旅行も含みます。複数国の旅程(ラップランド+アイスランド、ラップランド+ノルウェー)もご提案できます。',
      whatTheyDont:
        'イギリス出発便のパッケージはありません。ヘルシンキまたはラップランドへの航空券はご自身で予約していただきます。イギリスの専門業者よりもサポートはやや少なめです。',
    },
    ko: {
      tagline: '자유 운전 북유럽 전문 운영사',
      bestFor: '여름이든 겨울이든 라플란드와 다른 북유럽 국가를 결합하고자 하는 자유 여행자에게 적합합니다.',
      basedIn: '아이슬란드 레이캬비크',
      typicalLength: '5~10박',
      tierLabel: '중가 자유 운전',
      whatTheyDoWell:
        '네트워크 내 최고의 자유 운전 상품입니다. 사전 예약된 렌터카, 경로, 핀란드 라플란드 전역의 숙박을 제공하며, 영국의 겨울 전용 운영사가 다루지 않는 여름 백야 여행도 포함됩니다. 다국가 일정(라플란드+아이슬란드, 라플란드+노르웨이)도 가능합니다.',
      whatTheyDont:
        '영국 출발 항공편이 패키지에 포함되지 않습니다. 헬싱키 또는 라플란드행 항공편은 직접 예약하셔야 합니다. 영국 전문 운영사보다 가이드가 적습니다.',
    },
    fr: {
      tagline: 'Spécialiste nordique de l\'autotour',
      bestFor: 'Voyageurs autonomes souhaitant combiner la Laponie avec un autre pays nordique, été comme hiver.',
      basedIn: 'Reykjavík, Islande',
      typicalLength: '5 à 10 nuits',
      tierLabel: 'Milieu de gamme autotour',
      whatTheyDoWell:
        'Meilleur produit en autotour du réseau, avec location, itinéraire et hébergement pré-réservés dans toute la Laponie finlandaise, ainsi que des voyages d\'été sous le soleil de minuit que les voyagistes britanniques n\'offrent pas. Itinéraires multi-pays (Laponie + Islande, Laponie + Norvège).',
      whatTheyDont:
        'Aucun vol au départ du Royaume-Uni inclus. Vous réservez vos vols vers Helsinki ou la Laponie. Moins d\'accompagnement que chez les spécialistes britanniques.',
    },
    it: {
      tagline: 'Specialista nordico in autotour',
      bestFor: 'Viaggiatori autonomi che desiderano combinare la Lapponia con un altro paese nordico, estate o inverno.',
      basedIn: 'Reykjavík, Islanda',
      typicalLength: '5–10 notti',
      tierLabel: 'Fascia media autotour',
      whatTheyDoWell:
        'Il miglior prodotto in autotour della rete, con noleggio, itinerario e alloggi pre-prenotati in tutta la Lapponia finlandese, e viaggi estivi sotto il sole di mezzanotte che gli operatori invernali britannici non offrono. Itinerari multi-paese (Lapponia + Islanda, Lapponia + Norvegia).',
      whatTheyDont:
        'Nessun volo dal Regno Unito incluso. I voli per Helsinki o la Lapponia li prenota lei. Meno accompagnamento rispetto agli specialisti britannici.',
    },
    nl: {
      tagline: 'Noordse specialist in zelfrijden',
      bestFor: 'Onafhankelijke reizigers die Lapland willen combineren met een ander Noords land, zomer of winter.',
      basedIn: 'Reykjavík, IJsland',
      typicalLength: '5–10 nachten',
      tierLabel: 'Middensegment zelfrijden',
      whatTheyDoWell:
        'Het beste zelfrijproduct van het netwerk, met vooraf geboekte huurauto, route en accommodaties door heel Fins Lapland, plus zomerse midzomerzon-reizen die de Britse winterspecialisten niet aanbieden. Meerlanden-routes (Lapland + IJsland, Lapland + Noorwegen).',
      whatTheyDont:
        'Geen vluchten vanuit het VK in het pakket. U boekt uw vluchten naar Helsinki of Lapland zelf. Minder begeleiding dan bij de Britse specialisten.',
    },
    es: {
      tagline: 'Especialista nórdico en autotour',
      bestFor: 'Viajeros independientes que quieren combinar Laponia con otro país nórdico, en verano o en invierno.',
      basedIn: 'Reikiavik, Islandia',
      typicalLength: '5–10 noches',
      tierLabel: 'Autotour de gama media',
      whatTheyDoWell:
        'El mejor producto de autotour de la red: alquiler, ruta y alojamiento reservados de antemano por toda la Laponia finlandesa, con viajes estivales bajo el sol de medianoche que los operadores británicos solo de invierno no cubren. Itinerarios multipaís (Laponia + Islandia, Laponia + Noruega).',
      whatTheyDont:
        'No incluye vuelos desde el Reino Unido: usted reserva sus propios vuelos a Helsinki o Laponia. Menos acompañamiento que los especialistas británicos.',
    },
    'pt-BR': {
      tagline: 'Especialista nórdico em autotour',
      bestFor: 'Viajantes independentes que querem combinar a Lapônia com outro país nórdico, no verão ou no inverno.',
      basedIn: 'Reykjavík, Islândia',
      typicalLength: '5–10 noites',
      tierLabel: 'Autotour de categoria intermediária',
      whatTheyDoWell:
        'O melhor produto de autotour da rede: aluguel, roteiro e hospedagem reservados com antecedência por toda a Lapônia finlandesa, com viagens de verão sob o sol da meia-noite que os operadores britânicos só de inverno não cobrem. Roteiros entre países (Lapônia + Islândia, Lapônia + Noruega).',
      whatTheyDont:
        'Não inclui voos a partir do Reino Unido. Você reserva seus próprios voos para Helsinque ou para a Lapônia. Menos acompanhamento do que os especialistas britânicos.',
    },
    'zh-CN': {
      tagline: '北欧自驾专家',
      bestFor: '希望将拉普兰与另一个北欧国家结合的自主旅客，夏季或冬季皆可。',
      basedIn: '冰岛雷克雅未克',
      typicalLength: '5–10 晚',
      tierLabel: '中端自驾',
      whatTheyDoWell:
        '网络中最佳的自驾产品，含预先预订好的租车、路线和遍布芬兰拉普兰的住宿，还包括只做冬季的英国运营商不覆盖的夏季午夜阳光行程。可安排跨国行程（拉普兰+冰岛、拉普兰+挪威）。',
      whatTheyDont:
        '不含从英国出发的机票，前往赫尔辛基或拉普兰的航班需自行预订。指导服务少于英国专业运营商。',
    },
},
};

/** Returns a copy of `op` with prose fields swapped for the requested language. */
export function localizeOperator(op: Operator, lang: OperatorLang): Operator {
  const l = L10N[op.slug]?.[lang];
  if (!l) return op;
  return {
    ...op,
    tagline: l.tagline,
    bestFor: l.bestFor,
    basedIn: l.basedIn,
    typicalLength: l.typicalLength,
    tierLabel: l.tierLabel,
    whatTheyDoWell: l.whatTheyDoWell,
    whatTheyDont: l.whatTheyDont,
  };
}

export function localizedOperators(lang: OperatorLang): Operator[] {
  return operators.map((op) => localizeOperator(op, lang));
}

export const matrixCategoryLabels: Record<
  OperatorLang,
  Record<keyof Operator['stars'], string>
> = {
  en: {
    family: 'Family',
    aurora: 'Aurora',
    husky: 'Husky',
    snowmobile: 'Snowmobile',
    glassIgloo: 'Glass igloo',
    selfDrive: 'Self-drive',
    luxury: 'Luxury',
  },
  fi: {
    family: 'Perhe',
    aurora: 'Revontulet',
    husky: 'Husky',
    snowmobile: 'Kelkka',
    glassIgloo: 'Lasi-iglu',
    selfDrive: 'Vuokra-auto',
    luxury: 'Luksus',
  },
  de: {
    family: 'Familie',
    aurora: 'Polarlicht',
    husky: 'Husky',
    snowmobile: 'Schneemobil',
    glassIgloo: 'Glas-Iglu',
    selfDrive: 'Selbstfahrer',
    luxury: 'Luxus',
  },
  ja: {
    family: '家族',
    aurora: 'オーロラ',
    husky: 'ハスキー',
    snowmobile: 'スノーモービル',
    glassIgloo: 'ガラスイグルー',
    selfDrive: '自由運転',
    luxury: 'ラグジュアリー',
  },
  ko: {
    family: '가족',
    aurora: '오로라',
    husky: '허스키',
    snowmobile: '스노모빌',
    glassIgloo: '글래스 이글루',
    selfDrive: '자유 운전',
    luxury: '럭셔리',
  },
  fr: {
    family: 'Famille',
    aurora: 'Aurore',
    husky: 'Husky',
    snowmobile: 'Motoneige',
    glassIgloo: 'Iglou de verre',
    selfDrive: 'Autotour',
    luxury: 'Luxe',
  },
  it: {
    family: 'Famiglia',
    aurora: 'Aurora',
    husky: 'Husky',
    snowmobile: 'Motoslitta',
    glassIgloo: 'Iglù di vetro',
    selfDrive: 'Autotour',
    luxury: 'Lusso',
  },
  nl: {
    family: 'Gezin',
    aurora: 'Aurora',
    husky: 'Husky',
    snowmobile: 'Sneeuwscooter',
    glassIgloo: 'Glaziglo',
    selfDrive: 'Zelfrijden',
    luxury: 'Luxe',
  },
  es: {
    family: 'Familia',
    aurora: 'Aurora',
    husky: 'Husky',
    snowmobile: 'Motonieve',
    glassIgloo: 'Iglú de cristal',
    selfDrive: 'Autotour',
    luxury: 'Lujo',
  },
  'pt-BR': {
    family: 'Família',
    aurora: 'Aurora',
    husky: 'Husky',
    snowmobile: 'Snowmobile',
    glassIgloo: 'Iglu de vidro',
    selfDrive: 'Autotour',
    luxury: 'Luxo',
  },
  'zh-CN': {
    family: '家庭',
    aurora: '极光',
    husky: '哈士奇',
    snowmobile: '雪地摩托',
    glassIgloo: '玻璃穹顶屋',
    selfDrive: '自驾',
    luxury: '奢华',
  },
};
