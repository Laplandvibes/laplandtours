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
 * The site DOES earn affiliate commission on the cross-sell rail (hotels and
 * cars via the go.laplandvibes.com Worker, GetYourGuide direct partner_id).
 * Those sit in `<AffiliateCTA>`, completely separate from this operator list.
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

// =====================================================================
// LOCAL operator set — real Finland-based Lapland activity operators /
// DMCs, shown on every NON-English locale (see `localizedOperators`).
//
// Unlike the UK package operators above, these do NOT bundle flights:
// the traveller arranges their own travel and books activities (or a
// stay / tailor-made trip) directly with the operator. All six were
// verified against their official sites in July 2026.
//
// `departures` here means the NEAREST airport(s) for their bases
// (arrival, not a chartered UK departure) — the non-EN OperatorGuide
// relabels the field. `glassIgloo` / `selfDrive` stars are low across
// the board because these are guided-activity specialists, not
// accommodation or car-rental sellers — that is an honest read of what
// they do, not a gap in our coverage.
// =====================================================================
export const OPERATORS_LOCAL: Operator[] = [
  {
    slug: 'lapland-safaris',
    name: 'Lapland Safaris',
    domain: 'laplandsafaris.com',
    url: 'https://www.laplandsafaris.com',
    tagline: "Lapland's biggest activity operator",
    bestFor:
      'Travellers who want one operator for the whole activity slate, husky, snowmobile, reindeer, aurora, across several resorts.',
    basedIn: 'Rovaniemi, Finland',
    bases: ['Rovaniemi', 'Levi', 'Ylläs', 'Saariselkä', 'Luosto'],
    departures: ['RVN', 'KTT', 'IVL'],
    typicalLength: 'Half-day to multi-day',
    tier: 'mid',
    tierLabel: 'Full-range activity operator',
    stars: { family: 4, aurora: 3, husky: 4, snowmobile: 4, glassIgloo: 1, selfDrive: 0, luxury: 2 },
    whatTheyDoWell:
      "Running since 1982, with bases in Rovaniemi, Levi, Ylläs, Saariselkä and Luosto and the widest activity range in Finnish Lapland: husky and reindeer farms, snowmobile safaris, aurora tours, snowshoeing and equipment hire. Guiding is rooted in local and Sámi knowledge, and they hold Finland's national tourism safety award.",
    whatTheyDont:
      'They sell activities, not flights or full holiday packages. You arrange your own travel and accommodation. As the largest operator, group tours can be busier than a small-group specialist.',
    image: '/images/card-family-holiday.webp',
    alt: 'Snowy Lapland forest path at golden afternoon light with two empty wooden sleds',
    isFeatured: true,
  },
  {
    slug: 'beyond-arctic',
    name: 'Beyond Arctic',
    domain: 'beyondarctic.com',
    url: 'https://www.beyondarctic.com',
    tagline: 'Small-group aurora & photography specialist',
    bestFor: 'Photographers and couples who want groups capped small and a guide who chases clear skies.',
    basedIn: 'Rovaniemi, Finland',
    bases: ['Rovaniemi', 'Levi', 'Pyhä-Luosto'],
    departures: ['RVN', 'KTT'],
    typicalLength: '3–8 h, small group',
    tier: 'premium',
    tierLabel: 'Small-group specialist',
    stars: { family: 2, aurora: 4, husky: 3, snowmobile: 3, glassIgloo: 0, selfDrive: 0, luxury: 3 },
    whatTheyDoWell:
      'A Rovaniemi company (also Levi and Pyhä-Luosto) that never runs a tour over eight people. Northern-lights photography is the core, with reindeer and husky visits, national-park hikes and summer midnight-sun shoots. Holds the Sustainable Travel Finland label.',
    whatTheyDont:
      'Not built for large families or big groups. No accommodation or self-drive: activities only.',
    image: '/images/card-northern-lights.webp',
    alt: 'Faint green-cyan aurora arc above a frozen Lapland lake',
  },
  {
    slug: 'safartica',
    name: 'Safartica',
    domain: 'safartica.com',
    url: 'https://safartica.com',
    tagline: 'Full activity range, including electric sleds',
    bestFor: 'Travellers who want a broad activity menu and a lower-emission option, with the choice of a stay bundled in.',
    basedIn: 'Rovaniemi, Finland',
    bases: ['Rovaniemi', 'Ylläs', 'Levi', 'Saariselkä'],
    departures: ['RVN', 'KTT', 'IVL'],
    typicalLength: 'Half-day to multi-day',
    tier: 'mid',
    tierLabel: 'Activities & lodging',
    stars: { family: 3, aurora: 3, husky: 4, snowmobile: 4, glassIgloo: 1, selfDrive: 0, luxury: 2 },
    whatTheyDoWell:
      "Based in Rovaniemi with bases in Ylläs, Levi and Saariselkä. Husky, reindeer and snowmobile safaris, aurora hunts, ice fishing and winter swimming, and the world's first electric snowmobile (eSled) safaris. Also runs its own chalets and wilderness lodging for stay-plus-activity bundles.",
    whatTheyDont:
      'A busy, multi-base operation rather than an intimate one-guide outfit. Flights are on you.',
    image: '/images/card-arctic-adventure.webp',
    alt: 'A single snowmobile track curving across a vast frozen Lapland lake',
  },
  {
    slug: 'harriniva',
    name: 'Harriniva',
    domain: 'harriniva.fi',
    url: 'https://harriniva.fi',
    tagline: 'Third-generation Muonio wilderness family',
    bestFor: 'Husky lovers and anyone after a multi-day wilderness trip rather than a single afternoon excursion.',
    basedIn: 'Muonio, Finland',
    bases: ['Muonio', 'Jeris', 'Torassieppi'],
    departures: ['KTT'],
    typicalLength: 'Day trips to multi-day expeditions',
    tier: 'premium',
    tierLabel: 'Wilderness resorts & safaris',
    stars: { family: 3, aurora: 3, husky: 4, snowmobile: 3, glassIgloo: 1, selfDrive: 0, luxury: 3 },
    whatTheyDoWell:
      'A family business in Muonio since 1973, now third generation, built around its own large husky kennel and multi-day safaris. Runs three resorts, Harriniva, Jeris Lakeside and Torassieppi reindeer farm, with in-house restaurants, plus summer rafting and hiking. Transfers from Kittilä airport and Kolari railway.',
    whatTheyDont:
      'Muonio is remote, roughly 1.5 hours from Kittilä airport. Not a Rovaniemi day-trip operator.',
    image: '/images/card-christmas-santa.webp',
    alt: 'Two reindeer grazing in a snowy Lapland forest at twilight',
  },
  {
    slug: 'nordic-unique',
    name: 'Nordic Unique Travels',
    domain: 'nordictravels.eu',
    url: 'https://nordictravels.eu',
    tagline: 'Rovaniemi DMC, group or tailor-made',
    bestFor: 'Travellers who want a local specialist to shape a full itinerary, not just book one activity.',
    basedIn: 'Rovaniemi, Finland',
    bases: ['Rovaniemi'],
    departures: ['RVN'],
    typicalLength: 'Half-day to full itinerary',
    tier: 'mid',
    tierLabel: 'DMC & tailor-made',
    stars: { family: 3, aurora: 4, husky: 3, snowmobile: 3, glassIgloo: 2, selfDrive: 1, luxury: 2 },
    whatTheyDoWell:
      'A Rovaniemi destination-management company running aurora hunts (their specialty), husky and reindeer visits, wildlife safaris and Santa visits, in fixed group departures or fully tailor-made holidays arranged by a local specialist.',
    whatTheyDont:
      'Tailor-made planning takes a conversation and time, not an instant one-click booking. Single-base, so activities cluster around Rovaniemi.',
    image: '/images/card-midnight-sun.webp',
    alt: 'Lapland river bend at midnight sun, low warm horizontal golden light',
  },
  {
    slug: 'arctic-gm',
    name: 'Arctic GM',
    domain: 'arcticgm.com',
    url: 'https://arcticgm.com',
    tagline: 'The Original Aurora Hunters®',
    bestFor: 'Couples and photographers who want a high-end, small-group aurora chase with mobility.',
    basedIn: 'Rovaniemi, Finland',
    bases: ['Rovaniemi', 'Levi'],
    departures: ['RVN', 'KTT'],
    typicalLength: '3–8 h, small group',
    tier: 'premium',
    tierLabel: 'Aurora specialist',
    stars: { family: 1, aurora: 4, husky: 3, snowmobile: 3, glassIgloo: 0, selfDrive: 0, luxury: 3 },
    whatTheyDoWell:
      "A Rovaniemi and Levi operator from the Rytilahti family, focused on northern-lights hunting with groups capped around five and 2025 luxury vans that drive to wherever the sky is clearest. Most aurora tours include photography and 24/7 aurora tracking. Rated Tripadvisor 'Best of the Best' (top 1%).",
    whatTheyDont:
      'Aurora-led and premium, not a broad family-activity operator. Winter-weighted; summer choice is thinner.',
    image: '/images/card-luxury-aurora.webp',
    alt: 'Premium glass-roofed wilderness suite at blue hour with faint aurora through the roof',
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

/**
 * Narrow the site's UI language to an OperatorLang. Swedish (the network's 12th
 * language) has no translated operator editorial yet, so /sv shows the English
 * operator descriptions + category labels while all site chrome stays Swedish
 * (phased rollout). Every other locale maps 1:1.
 */
export function operatorLang(lang: string): OperatorLang {
  return (lang === 'sv' ? 'en' : lang) as OperatorLang;
}

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

// i18n for the LOCAL (Finland-based) operator set. 'en' is omitted — the
// base OPERATORS_LOCAL fields are already English, and the EN locale renders
// the UK set anyway. Every non-EN locale is present.
const L10N_LOCAL: Record<string, Partial<Record<OperatorLang, OperatorL10n>>> = {
  'lapland-safaris': {
    fi: {
      tagline: 'Lapin suurin ohjelmapalveluyritys',
      bestFor: 'Matkaajalle, joka haluaa yhden toimijan koko aktiviteettivalikoimaan, husky, kelkka, poro, revontulet, usealla matkailukeskuksella.',
      basedIn: 'Rovaniemi, Suomi',
      typicalLength: 'Puolikkaasta päivästä monipäiväretkeen',
      tierLabel: 'Koko kirjon ohjelmapalvelu',
      whatTheyDoWell:
        'Toiminut vuodesta 1982. Tukikohdat Rovaniemellä, Levillä, Ylläksellä, Saariselällä ja Luostolla ja Suomen Lapin laajin aktiviteettivalikoima: husky- ja porotilat, kelkkasafarit, revontuliretket, lumikenkäily ja välinevuokraus. Opastus nojaa paikalliseen ja saamelaiseen osaamiseen, ja yrityksellä on Suomen kansallinen matkailun turvallisuuspalkinto.',
      whatTheyDont:
        'Yritys myy aktiviteetteja, ei lentoja tai valmiita matkapaketteja. Matkat ja majoituksen järjestät itse. Suurimpana toimijana ryhmäretket voivat olla vilkkaampia kuin pienryhmäerikoistujalla.',
    },
    de: {
      tagline: 'Lapplands größter Aktivanbieter',
      bestFor: 'Für Reisende, die einen Anbieter für das gesamte Aktivitätenprogramm möchten, Husky, Schneemobil, Rentier, Polarlicht, an mehreren Standorten.',
      basedIn: 'Rovaniemi, Finnland',
      typicalLength: 'Vom halben Tag bis zur Mehrtagestour',
      tierLabel: 'Aktivanbieter mit vollem Programm',
      whatTheyDoWell:
        'Seit 1982 aktiv, mit Standorten in Rovaniemi, Levi, Ylläs, Saariselkä und Luosto und dem breitesten Aktivitätenangebot in Finnisch-Lappland: Husky- und Rentierfarmen, Schneemobil-Safaris, Polarlichttouren, Schneeschuhwandern und Ausrüstungsverleih. Die Führung basiert auf lokalem und samischem Wissen, und das Unternehmen trägt Finnlands nationalen Preis für Tourismussicherheit.',
      whatTheyDont:
        'Verkauft Aktivitäten, keine Flüge oder Komplettpakete. An- und Abreise sowie Unterkunft organisieren Sie selbst. Als größter Anbieter können Gruppentouren voller sein als bei einem Kleingruppen-Spezialisten.',
    },
    ja: {
      tagline: 'ラップランド最大のアクティビティ運営会社',
      bestFor: 'ハスキー、スノーモービル、トナカイ、オーロラまで、複数の拠点で一社にまとめて任せたい方に。',
      basedIn: 'ロヴァニエミ、フィンランド',
      typicalLength: '半日から数日',
      tierLabel: 'フルレンジのアクティビティ会社',
      whatTheyDoWell:
        '1982年から続く老舗で、ロヴァニエミ、レヴィ、ユッラス、サーリセルカ、ルオストに拠点を持ち、フィンランド・ラップランド最大級のアクティビティの幅を誇ります。ハスキー・トナカイ牧場、スノーモービルサファリ、オーロラツアー、スノーシュー、用具レンタル。ガイドは地元とサーミの知識に根ざし、フィンランドの国家観光安全賞を受賞しています。',
      whatTheyDont:
        '販売するのはアクティビティであり、航空券や旅行パッケージ一式ではありません。移動と宿泊はご自身で手配します。最大手ゆえ、グループツアーは小規模専門業者より賑やかになることがあります。',
    },
    ko: {
      tagline: '라플란드 최대 액티비티 운영사',
      bestFor: '허스키, 스노모빌, 순록, 오로라까지 여러 리조트에서 한 운영사로 해결하고 싶은 여행자에게.',
      basedIn: '핀란드 로바니에미',
      typicalLength: '반나절에서 여러 날까지',
      tierLabel: '전 종목 액티비티 운영사',
      whatTheyDoWell:
        '1982년부터 운영해 왔으며 로바니에미, 레비, 윌래스, 사리셀카, 루오스토에 거점을 두고 핀란드 라플란드에서 가장 폭넓은 액티비티를 제공합니다. 허스키·순록 농장, 스노모빌 사파리, 오로라 투어, 스노슈잉, 장비 대여까지. 가이드는 현지와 사미족의 지식에 뿌리를 두고 있으며, 핀란드 국가 관광 안전상을 보유하고 있습니다.',
      whatTheyDont:
        '항공권이나 전체 패키지가 아니라 액티비티를 판매합니다. 이동과 숙박은 직접 준비하셔야 합니다. 최대 규모인 만큼 그룹 투어는 소규모 전문 운영사보다 붐빌 수 있습니다.',
    },
    fr: {
      tagline: "Le plus grand opérateur d'activités de Laponie",
      bestFor: 'Pour le voyageur qui veut un seul opérateur pour tout le programme, husky, motoneige, renne, aurore, sur plusieurs stations.',
      basedIn: 'Rovaniemi, Finlande',
      typicalLength: 'De la demi-journée à plusieurs jours',
      tierLabel: "Opérateur d'activités complet",
      whatTheyDoWell:
        "En activité depuis 1982, avec des bases à Rovaniemi, Levi, Ylläs, Saariselkä et Luosto et la plus large gamme d'activités de Laponie finlandaise : fermes de huskies et de rennes, safaris en motoneige, sorties aurores, raquettes et location de matériel. L'encadrement s'appuie sur un savoir local et sâme, et l'entreprise détient le prix national finlandais de la sécurité touristique.",
      whatTheyDont:
        "Ils vendent des activités, pas des vols ni des forfaits complets. Le transport et l'hébergement sont à votre charge. En tant que plus grand opérateur, les sorties de groupe peuvent être plus fréquentées que chez un spécialiste des petits groupes.",
    },
    it: {
      tagline: 'Il più grande operatore di attività della Lapponia',
      bestFor: 'Per chi vuole un solo operatore per tutte le attività, husky, motoslitta, renna, aurora, in più località.',
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: 'Da mezza giornata a più giorni',
      tierLabel: 'Operatore di attività a gamma completa',
      whatTheyDoWell:
        "Attivo dal 1982, con basi a Rovaniemi, Levi, Ylläs, Saariselkä e Luosto e la più ampia gamma di attività della Lapponia finlandese: fattorie di husky e renne, safari in motoslitta, uscite per l'aurora, ciaspolate e noleggio attrezzatura. Le guide si fondano sul sapere locale e sami, e l'azienda detiene il premio nazionale finlandese per la sicurezza turistica.",
      whatTheyDont:
        'Vendono attività, non voli o pacchetti completi. Viaggio e alloggio li organizza lei. Essendo il più grande operatore, le uscite di gruppo possono essere più affollate rispetto a uno specialista dei piccoli gruppi.',
    },
    nl: {
      tagline: 'Laplands grootste activiteitenaanbieder',
      bestFor: 'Voor de reiziger die één aanbieder wil voor het hele activiteitenaanbod, husky, sneeuwscooter, rendier, aurora, op meerdere bestemmingen.',
      basedIn: 'Rovaniemi, Finland',
      typicalLength: 'Halve dag tot meerdaags',
      tierLabel: 'Activiteitenaanbieder met volledig aanbod',
      whatTheyDoWell:
        "Actief sinds 1982, met bases in Rovaniemi, Levi, Ylläs, Saariselkä en Luosto en het breedste activiteitenaanbod van Fins Lapland: husky- en rendierboerderijen, sneeuwscootersafari's, aurorotochten, sneeuwschoenwandelen en materiaalverhuur. De begeleiding stoelt op lokale en Samische kennis, en het bedrijf heeft de Finse nationale prijs voor toerismeveiligheid.",
      whatTheyDont:
        'Ze verkopen activiteiten, geen vluchten of complete pakketten. Vervoer en verblijf regelt u zelf. Als grootste aanbieder kunnen groepstochten drukker zijn dan bij een kleinegroep-specialist.',
    },
    es: {
      tagline: 'El mayor operador de actividades de Laponia',
      bestFor: 'Para quien quiere un solo operador para todo el programa, husky, motonieve, reno, aurora, en varias estaciones.',
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: 'De media jornada a varios días',
      tierLabel: 'Operador de actividades de gama completa',
      whatTheyDoWell:
        'En activo desde 1982, con bases en Rovaniemi, Levi, Ylläs, Saariselkä y Luosto y la mayor variedad de actividades de la Laponia finlandesa: granjas de huskies y renos, safaris en motonieve, salidas de auroras, raquetas de nieve y alquiler de equipo. El guiado se apoya en el saber local y sami, y la empresa posee el premio nacional finlandés de seguridad turística.',
      whatTheyDont:
        'Venden actividades, no vuelos ni paquetes completos: el viaje y el alojamiento los organiza usted. Como operador más grande, las salidas de grupo pueden estar más concurridas que en un especialista de grupos pequeños.',
    },
    'pt-BR': {
      tagline: 'A maior operadora de atividades da Lapônia',
      bestFor: 'Para quem quer uma só operadora para todo o programa, husky, snowmobile, rena, aurora, em várias estações.',
      basedIn: 'Rovaniemi, Finlândia',
      typicalLength: 'De meio período a vários dias',
      tierLabel: 'Operadora de atividades de gama completa',
      whatTheyDoWell:
        'Em atividade desde 1982, com bases em Rovaniemi, Levi, Ylläs, Saariselkä e Luosto e a maior variedade de atividades da Lapônia finlandesa: fazendas de huskies e renas, safáris de snowmobile, saídas para a aurora, caminhadas com raquetes de neve e aluguel de equipamento. A condução se apoia no saber local e sami, e a empresa detém o prêmio nacional finlandês de segurança turística.',
      whatTheyDont:
        'Vendem atividades, não voos nem pacotes completos. O transporte e a hospedagem ficam por sua conta. Por ser a maior operadora, as saídas em grupo podem ser mais movimentadas do que em uma especialista de grupos pequenos.',
    },
    'zh-CN': {
      tagline: '拉普兰最大的活动运营商',
      bestFor: '适合想用一家运营商搞定全部活动——哈士奇、雪地摩托、驯鹿、极光——并覆盖多个度假地的旅客。',
      basedIn: '芬兰罗瓦涅米',
      typicalLength: '半日至多日',
      tierLabel: '全项目活动运营商',
      whatTheyDoWell:
        '自 1982 年运营至今，在罗瓦涅米、莱维、于莱斯、萨里塞尔卡和卢奥斯托设有基地，拥有芬兰拉普兰最广的活动种类：哈士奇与驯鹿农场、雪地摩托、极光团、雪鞋行走以及装备租赁。向导植根于当地与萨米人的知识，公司还获得芬兰国家旅游安全奖。',
      whatTheyDont:
        '他们销售的是活动，而非机票或整套打包行程——交通和住宿需你自行安排。作为最大的运营商，团队出行可能比小团专营者更热闹。',
    },
  },
  'beyond-arctic': {
    fi: {
      tagline: 'Pienryhmien revontuli- ja valokuvauserikoistuja',
      bestFor: 'Valokuvaajalle ja pariskunnalle, joka haluaa pienen ryhmäkoon ja oppaan, joka ajaa selkeän taivaan perässä.',
      basedIn: 'Rovaniemi, Suomi',
      typicalLength: '3–8 h, pieni ryhmä',
      tierLabel: 'Pienryhmäerikoistuja',
      whatTheyDoWell:
        'Rovaniemeläinen yritys (myös Levi ja Pyhä-Luosto), joka ei koskaan vie retkelle yli kahdeksaa henkeä. Ydin on revontulivalokuvaus, lisäksi poro- ja huskyvierailut, kansallispuistoretket ja kesän yöttömän yön kuvaukset. Yrityksellä on Sustainable Travel Finland -merkki.',
      whatTheyDont:
        'Ei suurille perheille tai isoille ryhmille. Ei majoitusta eikä vuokra-autoa: vain aktiviteetteja.',
    },
    de: {
      tagline: 'Kleingruppen-Spezialist für Polarlicht & Fotografie',
      bestFor: 'Für Fotografen und Paare, die kleine Gruppen und einen Guide wollen, der dem klaren Himmel nachfährt.',
      basedIn: 'Rovaniemi, Finnland',
      typicalLength: '3–8 Std., kleine Gruppe',
      tierLabel: 'Kleingruppen-Spezialist',
      whatTheyDoWell:
        'Ein Unternehmen aus Rovaniemi (auch Levi und Pyhä-Luosto), das nie mehr als acht Personen mitnimmt. Kern ist die Polarlichtfotografie, dazu Rentier- und Huskybesuche, Nationalparkwanderungen und Mitternachtssonnen-Shootings im Sommer. Trägt das Label Sustainable Travel Finland.',
      whatTheyDont:
        'Nicht für große Familien oder große Gruppen gemacht. Keine Unterkunft, kein Selbstfahren: nur Aktivitäten.',
    },
    ja: {
      tagline: '少人数オーロラ・写真の専門会社',
      bestFor: '少人数と、晴れ間を追うガイドを求める写真好き・カップルに。',
      basedIn: 'ロヴァニエミ、フィンランド',
      typicalLength: '3〜8時間、少人数',
      tierLabel: '少人数専門',
      whatTheyDoWell:
        'ロヴァニエミの会社(レヴィ、ピュハ・ルオストにも拠点)で、1回のツアーは8人を超えません。中心はオーロラ写真で、トナカイ・ハスキー訪問、国立公園ハイキング、夏の白夜撮影も。Sustainable Travel Finlandラベルを取得しています。',
      whatTheyDont:
        '大人数の家族や大きなグループ向けではありません。宿泊や自由運転はなく、アクティビティのみです。',
    },
    ko: {
      tagline: '소규모 오로라·사진 전문 운영사',
      bestFor: '소규모 인원과 맑은 하늘을 좇는 가이드를 원하는 사진가와 커플에게.',
      basedIn: '핀란드 로바니에미',
      typicalLength: '3~8시간, 소규모',
      tierLabel: '소규모 전문',
      whatTheyDoWell:
        '로바니에미 회사(레비, 퓌해-루오스토에도 거점)로, 한 투어에 여덟 명을 넘기지 않습니다. 핵심은 오로라 사진이며, 순록·허스키 방문, 국립공원 하이킹, 여름 백야 촬영도 진행합니다. Sustainable Travel Finland 라벨을 보유하고 있습니다.',
      whatTheyDont:
        '대가족이나 큰 그룹을 위한 곳은 아닙니다. 숙박이나 자유 운전은 없고 액티비티만 제공합니다.',
    },
    fr: {
      tagline: 'Spécialiste des petits groupes pour aurore et photo',
      bestFor: 'Pour les photographes et les couples qui veulent de petits groupes et un guide qui poursuit le ciel dégagé.',
      basedIn: 'Rovaniemi, Finlande',
      typicalLength: '3 à 8 h, petit groupe',
      tierLabel: 'Spécialiste des petits groupes',
      whatTheyDoWell:
        "Une entreprise de Rovaniemi (également Levi et Pyhä-Luosto) qui ne dépasse jamais huit personnes par sortie. Le cœur, c'est la photographie des aurores, avec visites de rennes et de huskies, randonnées en parc national et prises de vue sous le soleil de minuit en été. Détient le label Sustainable Travel Finland.",
      whatTheyDont:
        "Pas conçu pour les grandes familles ni les grands groupes. Pas d'hébergement ni d'autotour: uniquement des activités.",
    },
    it: {
      tagline: 'Specialista di piccoli gruppi per aurora e fotografia',
      bestFor: 'Per fotografi e coppie che vogliono gruppi ridotti e una guida che insegue il cielo sereno.',
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: '3–8 h, piccolo gruppo',
      tierLabel: 'Specialista dei piccoli gruppi',
      whatTheyDoWell:
        "Un'azienda di Rovaniemi (anche Levi e Pyhä-Luosto) che non supera mai le otto persone per uscita. Il cuore è la fotografia dell'aurora, con visite a renne e husky, escursioni nei parchi nazionali e servizi al sole di mezzanotte in estate. Detiene il marchio Sustainable Travel Finland.",
      whatTheyDont:
        'Non è pensata per famiglie numerose o grandi gruppi. Niente alloggio né autotour: solo attività.',
    },
    nl: {
      tagline: 'Kleinegroep-specialist voor aurora en fotografie',
      bestFor: 'Voor fotografen en stellen die kleine groepen willen en een gids die de heldere hemel opzoekt.',
      basedIn: 'Rovaniemi, Finland',
      typicalLength: '3–8 u, kleine groep',
      tierLabel: 'Kleinegroep-specialist',
      whatTheyDoWell:
        "Een bedrijf uit Rovaniemi (ook Levi en Pyhä-Luosto) dat nooit meer dan acht personen meeneemt. De kern is noorderlichtfotografie, met rendier- en huskybezoeken, wandelingen in nationale parken en midzomerzon-shoots in de zomer. Draagt het label Sustainable Travel Finland.",
      whatTheyDont:
        'Niet gemaakt voor grote gezinnen of grote groepen. Geen accommodatie of zelfrijden: alleen activiteiten.',
    },
    es: {
      tagline: 'Especialista en grupos pequeños para aurora y fotografía',
      bestFor: 'Para fotógrafos y parejas que quieren grupos reducidos y un guía que persigue el cielo despejado.',
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: '3–8 h, grupo pequeño',
      tierLabel: 'Especialista en grupos pequeños',
      whatTheyDoWell:
        'Una empresa de Rovaniemi (también Levi y Pyhä-Luosto) que nunca lleva más de ocho personas por salida. El núcleo es la fotografía de auroras, con visitas a renos y huskies, rutas por parques nacionales y sesiones bajo el sol de medianoche en verano. Posee el sello Sustainable Travel Finland.',
      whatTheyDont:
        'No está pensada para familias numerosas ni grupos grandes. Sin alojamiento ni autotour: solo actividades.',
    },
    'pt-BR': {
      tagline: 'Especialista em grupos pequenos para aurora e fotografia',
      bestFor: 'Para fotógrafos e casais que querem grupos reduzidos e um guia que persegue o céu limpo.',
      basedIn: 'Rovaniemi, Finlândia',
      typicalLength: '3–8 h, grupo pequeno',
      tierLabel: 'Especialista em grupos pequenos',
      whatTheyDoWell:
        'Uma empresa de Rovaniemi (também Levi e Pyhä-Luosto) que nunca leva mais de oito pessoas por saída. O núcleo é a fotografia da aurora, com visitas a renas e huskies, trilhas em parques nacionais e ensaios sob o sol da meia-noite no verão. Detém o selo Sustainable Travel Finland.',
      whatTheyDont:
        'Não é feita para famílias grandes ou grupos numerosos. Sem hospedagem ou autotour: apenas atividades.',
    },
    'zh-CN': {
      tagline: '小团极光与摄影专营',
      bestFor: '适合想要小团人数、并有向导追逐晴朗天空的摄影爱好者与情侣。',
      basedIn: '芬兰罗瓦涅米',
      typicalLength: '3–8 小时，小团',
      tierLabel: '小团专营',
      whatTheyDoWell:
        '一家罗瓦涅米的公司（在莱维和皮哈-卢奥斯托也设点），每次出行不超过八人。核心是极光摄影，另有驯鹿与哈士奇探访、国家公园徒步以及夏季午夜阳光拍摄。持有 Sustainable Travel Finland 可持续旅行标识。',
      whatTheyDont:
        '不适合大家庭或大型团队。不含住宿或自驾——只做活动。',
    },
  },
  safartica: {
    fi: {
      tagline: 'Koko aktiviteettikirjo, myös sähkökelkat',
      bestFor: 'Matkaajalle, joka haluaa laajan aktiviteettivalikoiman ja vähäpäästöisemmän vaihtoehdon, ja halutessaan majoituksen samaan pakettiin.',
      basedIn: 'Rovaniemi, Suomi',
      typicalLength: 'Puolikkaasta päivästä monipäiväretkeen',
      tierLabel: 'Aktiviteetit ja majoitus',
      whatTheyDoWell:
        'Kotipaikka Rovaniemi, tukikohdat Ylläksellä, Levillä ja Saariselällä. Husky-, poro- ja kelkkasafarit, revontuliretket, pilkkiminen ja avantouinti sekä maailman ensimmäiset sähkökelkka- eli eSled-safarit. Tarjoaa myös omat mökit ja erämaamajoituksen majoitus-plus-aktiviteetti-paketteihin.',
      whatTheyDont:
        'Vilkas monen tukikohdan toimija, ei intiimi yhden oppaan yritys. Lennot järjestät itse.',
    },
    de: {
      tagline: 'Volles Aktivitätenangebot, auch E-Schlitten',
      bestFor: 'Für Reisende, die ein breites Angebot und eine emissionsärmere Option wollen, mit optional gebündelter Unterkunft.',
      basedIn: 'Rovaniemi, Finnland',
      typicalLength: 'Vom halben Tag bis zur Mehrtagestour',
      tierLabel: 'Aktivitäten & Unterkunft',
      whatTheyDoWell:
        'Sitz in Rovaniemi, mit Standorten in Ylläs, Levi und Saariselkä. Husky-, Rentier- und Schneemobil-Safaris, Polarlichtjagden, Eisangeln und Winterschwimmen, und die weltweit ersten Elektro-Schneemobil-Safaris (eSled). Betreibt zudem eigene Chalets und Wildnisunterkünfte für Kombi-Pakete aus Übernachtung und Aktivität.',
      whatTheyDont:
        'Ein betriebsamer Anbieter mit mehreren Standorten, kein intimer Ein-Guide-Betrieb. Flüge organisieren Sie selbst.',
    },
    ja: {
      tagline: '電動ソリまで揃うフルレンジ',
      bestFor: '幅広いアクティビティと低排出の選択肢を求め、希望すれば宿泊も一括にしたい方に。',
      basedIn: 'ロヴァニエミ、フィンランド',
      typicalLength: '半日から数日',
      tierLabel: 'アクティビティと宿泊',
      whatTheyDoWell:
        '本拠はロヴァニエミ、ユッラス・レヴィ・サーリセルカに拠点。ハスキー・トナカイ・スノーモービルサファリ、オーロラハント、氷上釣り、冬の水泳、そして世界初の電動スノーモービル(eSled)サファリ。自社のシャレーや原野の宿も持ち、宿泊+アクティビティのパッケージにできます。',
      whatTheyDont:
        '少人数の一ガイド制ではなく、複数拠点の活気ある運営です。航空券はご自身で手配します。',
    },
    ko: {
      tagline: '전동 썰매까지 갖춘 풀 라인업',
      bestFor: '폭넓은 액티비티와 저배출 옵션을 원하고, 원하면 숙박까지 한 번에 묶고 싶은 여행자에게.',
      basedIn: '핀란드 로바니에미',
      typicalLength: '반나절에서 여러 날까지',
      tierLabel: '액티비티 & 숙박',
      whatTheyDoWell:
        '본사는 로바니에미, 거점은 윌래스·레비·사리셀카. 허스키·순록·스노모빌 사파리, 오로라 헌팅, 얼음낚시, 겨울 수영, 그리고 세계 최초의 전동 스노모빌(eSled) 사파리. 자체 샬레와 야생 숙소도 운영해 숙박+액티비티 패키지가 가능합니다.',
      whatTheyDont:
        '가이드 한 명의 아담한 운영이 아니라 여러 거점의 분주한 운영입니다. 항공편은 직접 준비하셔야 합니다.',
    },
    fr: {
      tagline: 'Gamme complète, y compris traîneaux électriques',
      bestFor: "Pour le voyageur qui veut un large choix d'activités et une option à plus faibles émissions, avec la possibilité d'y joindre l'hébergement.",
      basedIn: 'Rovaniemi, Finlande',
      typicalLength: 'De la demi-journée à plusieurs jours',
      tierLabel: 'Activités et hébergement',
      whatTheyDoWell:
        "Basée à Rovaniemi, avec des points d'attache à Ylläs, Levi et Saariselkä. Safaris husky, renne et motoneige, chasses aux aurores, pêche blanche et baignade hivernale, et les premiers safaris en motoneige électrique (eSled) au monde. Gère aussi ses propres chalets et hébergements en pleine nature pour des formules séjour + activité.",
      whatTheyDont:
        'Un opérateur animé à plusieurs bases, pas une structure intime à guide unique. Les vols restent à votre charge.',
    },
    it: {
      tagline: 'Gamma completa, slitte elettriche incluse',
      bestFor: "Per chi vuole un'ampia scelta di attività e un'opzione a minori emissioni, con la possibilità di aggiungere il soggiorno.",
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: 'Da mezza giornata a più giorni',
      tierLabel: 'Attività e alloggio',
      whatTheyDoWell:
        "Con sede a Rovaniemi e basi a Ylläs, Levi e Saariselkä. Safari con husky, renne e motoslitte, cacce all'aurora, pesca sul ghiaccio e bagno invernale, e i primi safari al mondo in motoslitta elettrica (eSled). Gestisce anche chalet e alloggi nella natura per pacchetti soggiorno + attività.",
      whatTheyDont:
        'Un operatore vivace su più basi, non una struttura intima con una sola guida. I voli sono a suo carico.',
    },
    nl: {
      tagline: 'Volledig aanbod, inclusief elektrische sleeën',
      bestFor: 'Voor de reiziger die veel keuze wil en een optie met minder uitstoot, met eventueel het verblijf erbij.',
      basedIn: 'Rovaniemi, Finland',
      typicalLength: 'Halve dag tot meerdaags',
      tierLabel: 'Activiteiten & verblijf',
      whatTheyDoWell:
        "Gevestigd in Rovaniemi, met bases in Ylläs, Levi en Saariselkä. Husky-, rendier- en sneeuwscootersafari's, aurorajachten, ijsvissen en winterzwemmen, en 's werelds eerste elektrische sneeuwscooter- (eSled) safari's. Runt ook eigen chalets en wildernisverblijven voor verblijf-plus-activiteit-pakketten.",
      whatTheyDont:
        'Een drukke aanbieder met meerdere bases, geen intiem één-gidsbedrijf. Vluchten regelt u zelf.',
    },
    es: {
      tagline: 'Gama completa, incluidos trineos eléctricos',
      bestFor: 'Para quien quiere una amplia oferta de actividades y una opción de menores emisiones, con la posibilidad de sumar el alojamiento.',
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: 'De media jornada a varios días',
      tierLabel: 'Actividades y alojamiento',
      whatTheyDoWell:
        'Con sede en Rovaniemi y bases en Ylläs, Levi y Saariselkä. Safaris de husky, reno y motonieve, cazas de auroras, pesca en hielo y baño invernal, y los primeros safaris del mundo en motonieve eléctrica (eSled). También gestiona sus propios chalets y alojamientos en plena naturaleza para paquetes de estancia más actividad.',
      whatTheyDont:
        'Un operador dinámico con varias bases, no una estructura íntima de un solo guía. Los vuelos corren de su cuenta.',
    },
    'pt-BR': {
      tagline: 'Gama completa, incluindo trenós elétricos',
      bestFor: 'Para quem quer um leque amplo de atividades e uma opção de menor emissão, com a possibilidade de incluir a hospedagem.',
      basedIn: 'Rovaniemi, Finlândia',
      typicalLength: 'De meio período a vários dias',
      tierLabel: 'Atividades e hospedagem',
      whatTheyDoWell:
        'Com sede em Rovaniemi e bases em Ylläs, Levi e Saariselkä. Safáris de husky, rena e snowmobile, caças à aurora, pesca no gelo e banho de inverno, e os primeiros safáris do mundo em snowmobile elétrico (eSled). Também opera seus próprios chalés e hospedagens na natureza para pacotes de estadia mais atividade.',
      whatTheyDont:
        'Uma operadora movimentada com várias bases, não uma estrutura intimista de guia único. Os voos ficam por sua conta.',
    },
    'zh-CN': {
      tagline: '项目齐全，含电动雪橇',
      bestFor: '适合想要丰富活动选择与更低排放选项、并可将住宿一并打包的旅客。',
      basedIn: '芬兰罗瓦涅米',
      typicalLength: '半日至多日',
      tierLabel: '活动与住宿',
      whatTheyDoWell:
        '总部位于罗瓦涅米，在于莱斯、莱维和萨里塞尔卡设有基地。哈士奇、驯鹿与雪地摩托、极光追寻、冰钓和冬泳——以及全球首创的电动雪地摩托（eSled）团。还经营自有小木屋和荒野住宿，可组合“住宿+活动”套餐。',
      whatTheyDont:
        '这是一家多基地、节奏繁忙的运营商，而非单向导的小而精团队。机票需你自理。',
    },
  },
  harriniva: {
    fi: {
      tagline: 'Kolmannen polven Muonion erämaayritys',
      bestFor: 'Huskyn ystäville ja kaikille, jotka haluavat monipäiväisen erämaaretken yhden iltapäiväretken sijaan.',
      basedIn: 'Muonio, Suomi',
      typicalLength: 'Päiväretkistä monipäiväretkiin',
      tierLabel: 'Erämaakeskukset ja safarit',
      whatTheyDoWell:
        'Muoniolainen perheyritys vuodesta 1973, nyt kolmannessa polvessa, ja sen ytimenä on oma iso huskytarha ja monipäiväiset safarit. Yritys pyörittää kolmea keskusta, Harriniva, Jeris Lakeside ja Torassiepin porotila, omine ravintoloineen, sekä kesäisin koskenlaskua ja vaellusta. Kuljetukset Kittilän lentoasemalta ja Kolarin rautatieasemalta.',
      whatTheyDont:
        'Muonio on syrjässä, noin 1,5 tuntia Kittilän lentoasemalta. Ei Rovaniemen päiväretkitoimija.',
    },
    de: {
      tagline: 'Wildnis-Familie aus Muonio in dritter Generation',
      bestFor: 'Für Husky-Fans und alle, die eine mehrtägige Wildnistour statt eines einzelnen Nachmittagsausflugs suchen.',
      basedIn: 'Muonio, Finnland',
      typicalLength: 'Von Tagesausflügen bis Mehrtagesexpeditionen',
      tierLabel: 'Wildnis-Resorts & Safaris',
      whatTheyDoWell:
        'Ein Familienbetrieb in Muonio seit 1973, heute in dritter Generation, aufgebaut rund um den eigenen großen Husky-Zwinger und mehrtägige Safaris. Betreibt drei Resorts, Harriniva, Jeris Lakeside und die Rentierfarm Torassieppi, mit eigenen Restaurants, dazu im Sommer Rafting und Wandern. Transfers ab Flughafen Kittilä und Bahnhof Kolari.',
      whatTheyDont:
        'Muonio liegt abgelegen, rund 1,5 Stunden vom Flughafen Kittilä. Kein Tagesausflugs-Anbieter ab Rovaniemi.',
    },
    ja: {
      tagline: 'ムオニオの三代続く原野ファミリー',
      bestFor: 'ハスキー好き、そして半日の遠足ではなく数日の原野の旅を求める方に。',
      basedIn: 'ムオニオ、フィンランド',
      typicalLength: '日帰りから数日の遠征まで',
      tierLabel: '原野リゾートとサファリ',
      whatTheyDoWell:
        '1973年創業、いまや三代目のムオニオの家族経営。自前の大きなハスキー犬舎と数日がかりのサファリが柱です。ハリニヴァ、イェリス湖畔、トラシエッピのトナカイ牧場という3つのリゾートを直営レストランとともに運営し、夏はラフティングやハイキングも。送迎はキッティラ空港とコラリ駅から。',
      whatTheyDont:
        'ムオニオは辺境で、キッティラ空港から約1.5時間。ロヴァニエミ発の日帰り業者ではありません。',
    },
    ko: {
      tagline: '무오니오의 3대째 야생 가족 기업',
      bestFor: '허스키를 좋아하는 분, 그리고 반나절 나들이보다 여러 날의 야생 여행을 원하는 분에게.',
      basedIn: '핀란드 무오니오',
      typicalLength: '당일치기부터 여러 날 원정까지',
      tierLabel: '야생 리조트 & 사파리',
      whatTheyDoWell:
        '1973년부터 이어온 무오니오의 가족 기업으로 지금은 3대째이며, 자체 대형 허스키 견사와 여러 날에 걸친 사파리가 중심입니다. 하리니바, 예리스 레이크사이드, 토라시에피 순록 농장 등 세 곳의 리조트를 직영 레스토랑과 함께 운영하며, 여름에는 래프팅과 하이킹도 진행합니다. 키틸레 공항과 콜라리 기차역에서 이동 서비스를 제공합니다.',
      whatTheyDont:
        '무오니오는 외진 곳으로 키틸레 공항에서 약 1.5시간 거리입니다. 로바니에미 당일 투어 업체가 아닙니다.',
    },
    fr: {
      tagline: 'Famille de la nature à Muonio, troisième génération',
      bestFor: "Pour les amoureux des huskies et tous ceux qui veulent une sortie de plusieurs jours en pleine nature plutôt qu'un simple après-midi.",
      basedIn: 'Muonio, Finlande',
      typicalLength: "De l'excursion à la journée à l'expédition de plusieurs jours",
      tierLabel: 'Complexes nature & safaris',
      whatTheyDoWell:
        "Une entreprise familiale de Muonio depuis 1973, aujourd'hui à la troisième génération, articulée autour de son grand chenil de huskies et de safaris de plusieurs jours. Elle gère trois complexes, Harriniva, Jeris Lakeside et la ferme de rennes de Torassieppi, avec leurs restaurants, plus rafting et randonnée en été. Transferts depuis l'aéroport de Kittilä et la gare de Kolari.",
      whatTheyDont:
        "Muonio est isolé, environ 1 h 30 de l'aéroport de Kittilä. Ce n'est pas un opérateur de sorties à la journée depuis Rovaniemi.",
    },
    it: {
      tagline: 'Famiglia della natura di Muonio, terza generazione',
      bestFor: 'Per gli amanti degli husky e per chi cerca un viaggio nella natura di più giorni, non una singola uscita pomeridiana.',
      basedIn: 'Muonio, Finlandia',
      typicalLength: 'Da gite in giornata a spedizioni di più giorni',
      tierLabel: 'Resort nella natura & safari',
      whatTheyDoWell:
        "Un'azienda familiare di Muonio dal 1973, oggi alla terza generazione, imperniata sul proprio grande canile di husky e su safari di più giorni. Gestisce tre resort, Harriniva, Jeris Lakeside e la fattoria di renne Torassieppi, con ristoranti interni, oltre a rafting ed escursioni in estate. Transfer dall'aeroporto di Kittilä e dalla stazione di Kolari.",
      whatTheyDont:
        "Muonio è isolata, circa 1,5 ore dall'aeroporto di Kittilä. Non è un operatore di gite in giornata da Rovaniemi.",
    },
    nl: {
      tagline: 'Muonio-natuurfamilie in de derde generatie',
      bestFor: 'Voor husky-liefhebbers en iedereen die een meerdaagse wildernistocht wil in plaats van één middagexcursie.',
      basedIn: 'Muonio, Finland',
      typicalLength: 'Dagtochten tot meerdaagse expedities',
      tierLabel: "Wildernisresorts & safari's",
      whatTheyDoWell:
        "Een familiebedrijf in Muonio sinds 1973, nu in de derde generatie, opgebouwd rond de eigen grote huskykennel en meerdaagse safari's. Runt drie resorts, Harriniva, Jeris Lakeside en de rendierboerderij Torassieppi, met eigen restaurants, plus raften en wandelen in de zomer. Transfers vanaf luchthaven Kittilä en station Kolari.",
      whatTheyDont:
        'Muonio ligt afgelegen, ongeveer 1,5 uur van luchthaven Kittilä. Geen dagtochtaanbieder vanuit Rovaniemi.',
    },
    es: {
      tagline: 'Familia de naturaleza de Muonio, tercera generación',
      bestFor: 'Para los amantes de los huskies y para quien busca un viaje de varios días en plena naturaleza, no una simple excursión de tarde.',
      basedIn: 'Muonio, Finlandia',
      typicalLength: 'De excursiones de un día a expediciones de varios días',
      tierLabel: 'Complejos en la naturaleza y safaris',
      whatTheyDoWell:
        'Un negocio familiar de Muonio desde 1973, hoy en la tercera generación, centrado en su propia gran perrera de huskies y en safaris de varios días. Gestiona tres complejos, Harriniva, Jeris Lakeside y la granja de renos de Torassieppi, con restaurantes propios, además de rafting y senderismo en verano. Traslados desde el aeropuerto de Kittilä y la estación de tren de Kolari.',
      whatTheyDont:
        'Muonio está apartada: a alrededor de 1,5 horas del aeropuerto de Kittilä. No es un operador de excursiones de un día desde Rovaniemi.',
    },
    'pt-BR': {
      tagline: 'Família da natureza de Muonio, terceira geração',
      bestFor: 'Para os amantes de huskies e para quem quer uma viagem de vários dias na natureza, e não um único passeio de tarde.',
      basedIn: 'Muonio, Finlândia',
      typicalLength: 'De passeios de um dia a expedições de vários dias',
      tierLabel: 'Resorts na natureza & safáris',
      whatTheyDoWell:
        'Um negócio familiar em Muonio desde 1973, hoje na terceira geração, centrado no próprio grande canil de huskies e em safáris de vários dias. Opera três resorts, Harriniva, Jeris Lakeside e a fazenda de renas Torassieppi, com restaurantes próprios, além de rafting e caminhadas no verão. Traslados do aeroporto de Kittilä e da estação de trem de Kolari.',
      whatTheyDont:
        'Muonio é remota, cerca de 1,5 hora do aeroporto de Kittilä. Não é uma operadora de bate-volta a partir de Rovaniemi.',
    },
    'zh-CN': {
      tagline: '穆奥尼奥三代传承的荒野家族',
      bestFor: '适合哈士奇爱好者，以及想要数日荒野之旅而非单个下午短游的旅客。',
      basedIn: '芬兰穆奥尼奥',
      typicalLength: '从一日游到多日探险',
      tierLabel: '荒野度假村与团队游',
      whatTheyDoWell:
        '穆奥尼奥的家族企业，始于 1973 年，如今已是第三代，核心是自有的大型哈士奇犬舍和多日团队游。经营三处度假村——Harriniva、Jeris 湖畔和 Torassieppi 驯鹿农场——并配有自营餐厅，夏季还有漂流和徒步。提供从基蒂莱机场和科拉里火车站的接送。',
      whatTheyDont:
        '穆奥尼奥地处偏远——距基蒂莱机场约 1.5 小时。并非从罗瓦涅米出发的一日游运营商。',
    },
  },
  'nordic-unique': {
    fi: {
      tagline: 'Rovaniemeläinen DMC, ryhmä tai räätälöity',
      bestFor: 'Matkaajalle, joka haluaa paikallisen asiantuntijan rakentavan koko matkasuunnitelman, ei vain yhtä retkeä.',
      basedIn: 'Rovaniemi, Suomi',
      typicalLength: 'Puolikkaasta päivästä koko matkaan',
      tierLabel: 'DMC ja räätälöinti',
      whatTheyDoWell:
        'Rovaniemeläinen matkakohteen hallintayritys (DMC), joka tekee revontuliretkiä (erikoisalansa), husky- ja porovierailuja, luontosafareita ja joulupukkikäyntejä, joko kiinteinä ryhmälähtöinä tai täysin räätälöityinä matkoina paikallisen asiantuntijan suunnittelemina.',
      whatTheyDont:
        'Räätälöinti vaatii keskustelun ja aikaa, ei yhden klikkauksen pikavarausta. Yksi tukikohta, joten aktiviteetit keskittyvät Rovaniemen ympärille.',
    },
    de: {
      tagline: 'DMC aus Rovaniemi, Gruppe oder maßgeschneidert',
      bestFor: 'Für Reisende, die einen lokalen Spezialisten wollen, der die ganze Reise gestaltet, nicht nur eine Aktivität bucht.',
      basedIn: 'Rovaniemi, Finnland',
      typicalLength: 'Vom halben Tag bis zur kompletten Reise',
      tierLabel: 'DMC & Maßanfertigung',
      whatTheyDoWell:
        'Ein Destinationsmanagement-Unternehmen (DMC) aus Rovaniemi mit Polarlichtjagden (ihr Spezialgebiet), Husky- und Rentierbesuchen, Wildtier-Safaris und Weihnachtsmann-Besuchen, als feste Gruppenabfahrten oder als vollständig maßgeschneiderte Reisen, geplant von einem lokalen Spezialisten.',
      whatTheyDont:
        'Maßgeschneiderte Planung braucht ein Gespräch und Zeit, keine sofortige Ein-Klick-Buchung. Nur ein Standort, daher konzentrieren sich die Aktivitäten auf Rovaniemi.',
    },
    ja: {
      tagline: 'ロヴァニエミのDMC、団体もオーダーメイドも',
      bestFor: 'アクティビティを1つ予約するだけでなく、地元の専門家に旅程全体を組んでほしい方に。',
      basedIn: 'ロヴァニエミ、フィンランド',
      typicalLength: '半日から旅程一式まで',
      tierLabel: 'DMC・オーダーメイド',
      whatTheyDoWell:
        'ロヴァニエミのデスティネーション・マネジメント会社(DMC)。オーロラハント(得意分野)、ハスキー・トナカイ訪問、野生動物サファリ、サンタ訪問を、定発の団体、または地元専門家が組む完全オーダーメイドの旅として提供します。',
      whatTheyDont:
        'オーダーメイドは相談と時間が必要で、ワンクリックの即時予約ではありません。拠点は1か所のため、アクティビティはロヴァニエミ周辺に集まります。',
    },
    ko: {
      tagline: '로바니에미 DMC, 단체 또는 맞춤형',
      bestFor: '액티비티 하나만 예약하기보다 현지 전문가가 전체 일정을 짜주길 원하는 여행자에게.',
      basedIn: '핀란드 로바니에미',
      typicalLength: '반나절부터 전체 일정까지',
      tierLabel: 'DMC & 맞춤형',
      whatTheyDoWell:
        '로바니에미의 목적지 관리 회사(DMC)로, 오로라 헌팅(전문 분야), 허스키·순록 방문, 야생동물 사파리, 산타 방문을 고정 단체 출발이나 현지 전문가가 짜는 완전 맞춤형 여행으로 제공합니다.',
      whatTheyDont:
        '맞춤형 기획은 상담과 시간이 필요합니다. 원클릭 즉시 예약이 아닙니다. 거점이 한 곳이라 액티비티가 로바니에미 주변에 몰려 있습니다.',
    },
    fr: {
      tagline: 'Réceptif à Rovaniemi, groupe ou sur mesure',
      bestFor: "Pour le voyageur qui veut un spécialiste local pour bâtir tout l'itinéraire, pas seulement réserver une activité.",
      basedIn: 'Rovaniemi, Finlande',
      typicalLength: "De la demi-journée à l'itinéraire complet",
      tierLabel: 'Réceptif & sur mesure',
      whatTheyDoWell:
        'Une agence réceptive (DMC) de Rovaniemi proposant des chasses aux aurores (sa spécialité), des visites de huskies et de rennes, des safaris animaliers et des visites du Père Noël, en départs de groupe fixes ou en voyages entièrement sur mesure conçus par un spécialiste local.',
      whatTheyDont:
        'Le sur-mesure demande un échange et du temps, pas une réservation instantanée en un clic. Base unique : les activités se concentrent autour de Rovaniemi.',
    },
    it: {
      tagline: 'DMC di Rovaniemi, gruppo o su misura',
      bestFor: "Per chi vuole uno specialista locale che costruisca l'intero itinerario, non solo prenotare una singola attività.",
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: "Da mezza giornata all'itinerario completo",
      tierLabel: 'DMC & su misura',
      whatTheyDoWell:
        "Un'agenzia incoming (DMC) di Rovaniemi che propone cacce all'aurora (la sua specialità), visite a husky e renne, safari faunistici e visite a Babbo Natale, con partenze di gruppo fisse o viaggi interamente su misura ideati da uno specialista locale.",
      whatTheyDont:
        'La progettazione su misura richiede un confronto e tempo, non una prenotazione immediata con un clic. Base unica: le attività si concentrano intorno a Rovaniemi.',
    },
    nl: {
      tagline: 'DMC in Rovaniemi, groep of op maat',
      bestFor: 'Voor de reiziger die een lokale specialist wil die de hele reis vormgeeft, niet alleen één activiteit boekt.',
      basedIn: 'Rovaniemi, Finland',
      typicalLength: 'Halve dag tot volledige reis',
      tierLabel: 'DMC & maatwerk',
      whatTheyDoWell:
        "Een destinatiemanagementbedrijf (DMC) uit Rovaniemi met aurorajachten (hun specialiteit), husky- en rendierbezoeken, wildlifesafari's en bezoeken aan de Kerstman, als vaste groepsvertrekken of als volledig op maat gemaakte reizen, samengesteld door een lokale specialist.",
      whatTheyDont:
        'Maatwerk vraagt om een gesprek en tijd, geen directe boeking met één klik. Eén base, dus de activiteiten liggen rond Rovaniemi.',
    },
    es: {
      tagline: 'DMC de Rovaniemi, en grupo o a medida',
      bestFor: 'Para quien quiere un especialista local que diseñe todo el itinerario, no solo reservar una actividad.',
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: 'De media jornada al itinerario completo',
      tierLabel: 'DMC y a medida',
      whatTheyDoWell:
        'Una empresa de gestión de destino (DMC) de Rovaniemi que ofrece cazas de auroras (su especialidad), visitas a huskies y renos, safaris de fauna y visitas a Papá Noel, en salidas de grupo fijas o en viajes totalmente a medida diseñados por un especialista local.',
      whatTheyDont:
        'La planificación a medida requiere una conversación y tiempo: no es una reserva instantánea de un clic. Base única, así que las actividades se concentran alrededor de Rovaniemi.',
    },
    'pt-BR': {
      tagline: 'DMC de Rovaniemi, em grupo ou sob medida',
      bestFor: 'Para quem quer um especialista local para montar todo o roteiro, não apenas reservar uma atividade.',
      basedIn: 'Rovaniemi, Finlândia',
      typicalLength: 'De meio período ao roteiro completo',
      tierLabel: 'DMC e sob medida',
      whatTheyDoWell:
        'Uma empresa de gestão de destino (DMC) de Rovaniemi que oferece caças à aurora (sua especialidade), visitas a huskies e renas, safáris de vida selvagem e visitas ao Papai Noel, em saídas de grupo fixas ou em viagens totalmente sob medida montadas por um especialista local.',
      whatTheyDont:
        'O planejamento sob medida exige conversa e tempo, não é uma reserva instantânea de um clique. Base única, então as atividades se concentram em torno de Rovaniemi.',
    },
    'zh-CN': {
      tagline: '罗瓦涅米地接社，团队或定制',
      bestFor: '适合希望由当地专家规划整段行程、而不只是预订单个活动的旅客。',
      basedIn: '芬兰罗瓦涅米',
      typicalLength: '半日至整段行程',
      tierLabel: '地接社与定制',
      whatTheyDoWell:
        '一家罗瓦涅米的目的地管理公司（DMC），提供极光追寻（其专长）、哈士奇与驯鹿探访、野生动物团和圣诞老人探访，可选固定团期出发，或由当地专家规划的完全定制行程。',
      whatTheyDont:
        '定制规划需要沟通和时间——并非一键即订。仅一个基地，活动集中在罗瓦涅米周边。',
    },
  },
  'arctic-gm': {
    fi: {
      tagline: 'The Original Aurora Hunters®',
      bestFor: 'Pariskunnille ja valokuvaajille, jotka haluavat korkeatasoisen pienryhmän revontulijahdin liikkuvuudella.',
      basedIn: 'Rovaniemi, Suomi',
      typicalLength: '3–8 h, pieni ryhmä',
      tierLabel: 'Revontulierikoistuja',
      whatTheyDoWell:
        "Rovaniemellä ja Levillä toimiva Rytilahden suvun yritys, joka keskittyy revontulijahtiin noin viiden hengen ryhmillä ja vuoden 2025 luksuspakuilla, jotka ajavat sinne, missä taivas on selkein. Useimpiin revontuliretkiin kuuluu valokuvaus ja jatkuva revontuliseuranta. Tripadvisorin 'Best of the Best' -arvio (paras 1 %).",
      whatTheyDont:
        'Revontulivetoinen ja premium, ei laaja perheaktiviteettitoimija. Talvipainotteinen; kesävalikoima on ohuempi.',
    },
    de: {
      tagline: 'The Original Aurora Hunters®',
      bestFor: 'Für Paare und Fotografen, die eine hochwertige Polarlichtjagd in kleiner Gruppe mit Mobilität wollen.',
      basedIn: 'Rovaniemi, Finnland',
      typicalLength: '3–8 Std., kleine Gruppe',
      tierLabel: 'Polarlicht-Spezialist',
      whatTheyDoWell:
        "Ein Anbieter aus Rovaniemi und Levi der Familie Rytilahti, spezialisiert auf die Polarlichtjagd mit Gruppen von rund fünf Personen und Luxus-Vans (Baujahr 2025), die dorthin fahren, wo der Himmel am klarsten ist. Die meisten Touren umfassen Fotografie und rund um die Uhr Polarlicht-Tracking. Von Tripadvisor als 'Best of the Best' (Top 1 %) ausgezeichnet.",
      whatTheyDont:
        'Polarlicht-orientiert und Premium, kein breiter Familien-Aktivanbieter. Winterlastig; die Sommerauswahl ist dünner.',
    },
    ja: {
      tagline: 'The Original Aurora Hunters®',
      bestFor: '機動力のある少人数で、上質なオーロラ追跡を求めるカップルや写真好きに。',
      basedIn: 'ロヴァニエミ、フィンランド',
      typicalLength: '3〜8時間、少人数',
      tierLabel: 'オーロラ専門',
      whatTheyDoWell:
        'ロヴァニエミとレヴィで営むRytilahti一家の会社。約5名までの少人数でのオーロラハントに特化し、2025年式の高級バンで空が最も晴れる場所へ向かいます。多くのツアーに写真撮影と24時間体制のオーロラ追跡が含まれます。トリップアドバイザーの「Best of the Best」(上位1%)。',
      whatTheyDont:
        'オーロラ中心のプレミアムで、幅広い家族向けアクティビティ業者ではありません。冬に偏り、夏の選択肢は少なめです。',
    },
    ko: {
      tagline: 'The Original Aurora Hunters®',
      bestFor: '기동력 있는 소규모로 고급 오로라 추적을 원하는 커플과 사진가에게.',
      basedIn: '핀란드 로바니에미',
      typicalLength: '3~8시간, 소규모',
      tierLabel: '오로라 전문',
      whatTheyDoWell:
        "로바니에미와 레비에서 운영하는 뤼틸라흐티(Rytilahti) 가문의 업체로, 약 다섯 명 규모의 소규모 오로라 헌팅에 특화되어 있으며 하늘이 가장 맑은 곳으로 이동하는 2025년형 럭셔리 밴을 운용합니다. 대부분의 오로라 투어에 사진 촬영과 24시간 오로라 추적이 포함됩니다. 트립어드바이저 'Best of the Best'(상위 1%) 등급.",
      whatTheyDont:
        '오로라 중심의 프리미엄으로, 폭넓은 가족 액티비티 업체가 아닙니다. 겨울에 치우쳐 있고 여름 선택지는 얇습니다.',
    },
    fr: {
      tagline: 'The Original Aurora Hunters®',
      bestFor: 'Pour les couples et les photographes qui veulent une chasse aux aurores haut de gamme, en petit groupe et mobile.',
      basedIn: 'Rovaniemi, Finlande',
      typicalLength: '3 à 8 h, petit groupe',
      tierLabel: 'Spécialiste des aurores',
      whatTheyDoWell:
        "Un opérateur de Rovaniemi et Levi, de la famille Rytilahti, spécialisé dans la chasse aux aurores en groupes d'environ cinq personnes, avec des vans de luxe de 2025 qui roulent là où le ciel est le plus dégagé. La plupart des sorties incluent la photographie et un suivi des aurores 24 h/24. Classé 'Best of the Best' (top 1 %) sur Tripadvisor.",
      whatTheyDont:
        "Axé aurores et haut de gamme, pas un opérateur d'activités familiales polyvalent. Surtout hivernal ; l'offre estivale est plus mince.",
    },
    it: {
      tagline: 'The Original Aurora Hunters®',
      bestFor: 'Per coppie e fotografi che vogliono una caccia all\'aurora di alto livello, in piccolo gruppo e con mobilità.',
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: '3–8 h, piccolo gruppo',
      tierLabel: "Specialista dell'aurora",
      whatTheyDoWell:
        "Un operatore di Rovaniemi e Levi, della famiglia Rytilahti, dedicato alla caccia all'aurora in gruppi di circa cinque persone, con van di lusso del 2025 che raggiungono i cieli più sereni. La maggior parte delle uscite include fotografia e monitoraggio dell'aurora 24 ore su 24. Valutato 'Best of the Best' (top 1%) su Tripadvisor.",
      whatTheyDont:
        "Incentrato sull'aurora e di fascia alta, non un operatore di attività per famiglie a tutto tondo. Sbilanciato sull'inverno; l'offerta estiva è più ridotta.",
    },
    nl: {
      tagline: 'The Original Aurora Hunters®',
      bestFor: 'Voor stellen en fotografen die een hoogwaardige, mobiele aurorajacht in een kleine groep willen.',
      basedIn: 'Rovaniemi, Finland',
      typicalLength: '3–8 u, kleine groep',
      tierLabel: 'Aurora-specialist',
      whatTheyDoWell:
        "Een aanbieder uit Rovaniemi en Levi van de familie Rytilahti, gericht op noorderlichtjacht met groepen van ongeveer vijf personen en luxe bestelbussen uit 2025 die naar de helderste hemel rijden. De meeste tochten omvatten fotografie en 24/7 auroramonitoring. Door Tripadvisor beoordeeld als 'Best of the Best' (top 1%).",
      whatTheyDont:
        'Aurora-gericht en premium, geen brede aanbieder van gezinsactiviteiten. Wintergericht; het zomeraanbod is dunner.',
    },
    es: {
      tagline: 'The Original Aurora Hunters®',
      bestFor: 'Para parejas y fotógrafos que quieren una caza de auroras de alto nivel, en grupo pequeño y con movilidad.',
      basedIn: 'Rovaniemi, Finlandia',
      typicalLength: '3–8 h, grupo pequeño',
      tierLabel: 'Especialista en auroras',
      whatTheyDoWell:
        "Un operador de Rovaniemi y Levi, de la familia Rytilahti, centrado en la caza de auroras en grupos de unas cinco personas, con furgonetas de lujo de 2025 que conducen hasta donde el cielo está más despejado. La mayoría de las salidas incluyen fotografía y seguimiento de auroras 24/7. Valorado 'Best of the Best' (top 1 %) en Tripadvisor.",
      whatTheyDont:
        'Centrado en auroras y de gama alta, no un operador amplio de actividades familiares. Orientado al invierno; la oferta de verano es más escasa.',
    },
    'pt-BR': {
      tagline: 'The Original Aurora Hunters®',
      bestFor: 'Para casais e fotógrafos que querem uma caça à aurora de alto nível, em grupo pequeno e com mobilidade.',
      basedIn: 'Rovaniemi, Finlândia',
      typicalLength: '3–8 h, grupo pequeno',
      tierLabel: 'Especialista em aurora',
      whatTheyDoWell:
        "Uma operadora de Rovaniemi e Levi, da família Rytilahti, focada na caça à aurora em grupos de cerca de cinco pessoas, com vans de luxo de 2025 que dirigem até onde o céu está mais limpo. A maioria das saídas inclui fotografia e rastreamento de aurora 24 horas. Avaliada como 'Best of the Best' (top 1%) no Tripadvisor.",
      whatTheyDont:
        'Focada em aurora e premium, não uma operadora ampla de atividades para famílias. Voltada ao inverno; a oferta de verão é mais enxuta.',
    },
    'zh-CN': {
      tagline: 'The Original Aurora Hunters®',
      bestFor: '适合想要高端、小团且机动灵活的极光追逐的情侣与摄影爱好者。',
      basedIn: '芬兰罗瓦涅米',
      typicalLength: '3–8 小时，小团',
      tierLabel: '极光专营',
      whatTheyDoWell:
        '一家由 Rytilahti 家族在罗瓦涅米和莱维经营的运营商，专注极光追寻，团队约五人上限，配 2025 款豪华厢车，开往天空最晴朗的地方。多数极光团含摄影和全天候极光追踪。获猫途鹰（Tripadvisor）"Best of the Best"（前 1%）评级。',
      whatTheyDont:
        '以极光为主、走高端路线，并非面面俱到的家庭活动运营商。偏重冬季，夏季选择较少。',
    },
  },
};

/** Copy an operator with its prose fields swapped for a resolved L10n entry. */
function withL10n(op: Operator, l?: OperatorL10n): Operator {
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

/** Returns a copy of a UK operator with prose fields swapped for the requested language. */
export function localizeOperator(op: Operator, lang: OperatorLang): Operator {
  return withL10n(op, L10N[op.slug]?.[lang]);
}

/**
 * Locale-aware operator list. The English locale serves the UK & European
 * package operators (that market's audience). Every other locale serves the
 * Finland-based local operators, since a Finnish, German or Japanese reader
 * has no use for "departs Gatwick" package trips. (Vesa 2026-07-08.)
 */
export function localizedOperators(lang: OperatorLang): Operator[] {
  if (lang === 'en') return operators.map((op) => localizeOperator(op, 'en'));
  return OPERATORS_LOCAL.map((op) => withL10n(op, L10N_LOCAL[op.slug]?.[lang]));
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
