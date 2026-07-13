/**
 * adSlotsCopy — 11 kielen tekstit mainospaikkojen house-adeille ja osioille.
 *
 * Käytetään shared/PartnerSlot.tsx (house-ad) + shared/PremiumSpotGrid.tsx +
 * shared/HomeAdSlots.tsx -komponenteissa. Tekstit ovat komponentin sisällä
 * (ei per-sivu i18n-tiedostoissa), jotta rollout ~27 sivustolle ei vaadi
 * 11 × 27 lokaalitiedoston muokkausta ja kaikki kielet pysyvät synkassa
 * (feedback_translate_all_languages).
 *
 * Lokaalinormalisointi: hub käyttää koodeja en/fi/de/ja/es/pt-BR/zh-CN/ko/fr/it/nl,
 * osa sivustoista lyhyitä URL-prefiksejä (br/cn/kr) — normalizeAdLocale kattaa molemmat.
 */

export type AdLocale =
  | 'en' | 'fi' | 'de' | 'fr' | 'it' | 'es' | 'pt' | 'nl' | 'sv' | 'ja' | 'ko' | 'zh';

export function normalizeAdLocale(locale?: string): AdLocale {
  const l = (locale || 'en').toLowerCase();
  if (l.startsWith('fi')) return 'fi';
  if (l.startsWith('de')) return 'de';
  if (l.startsWith('fr')) return 'fr';
  if (l.startsWith('it')) return 'it';
  if (l.startsWith('es')) return 'es';
  if (l.startsWith('pt') || l === 'br') return 'pt';
  if (l.startsWith('nl')) return 'nl';
  if (l.startsWith('sv')) return 'sv';
  if (l.startsWith('ja')) return 'ja';
  if (l.startsWith('ko') || l === 'kr') return 'ko';
  if (l.startsWith('zh') || l === 'cn') return 'zh';
  return 'en';
}

/**
 * Mainospaikat (LV Media -myyntitila) näytetään VAIN suomeksi, englanniksi ja
 * ruotsiksi (Vesa 2026-07-13). Mainostilaa ostavat yritykset asioivat näillä
 * kielillä; muut kielet ovat kohdeyleisölle turhia. Koskee MainPartnerBanner /
 * HomeAdSlots / PremiumSpotGrid. EI koske affiliate-AdUniteja.
 */
export function adLocaleEnabled(locale?: string): boolean {
  const l: string = normalizeAdLocale(locale);
  return l === 'en' || l === 'fi' || l === 'sv';
}

export type AdSlotsCopy = {
  /** Kuluttajansuojalain edellyttämä maksetun paikan badge */
  badge: string;
  /** Osion eyebrow-otsikko (legacy, ei enää käytössä HomeAdSlotsissa) */
  partners: string;
  /** Ryhmä 1: pääkumppanipaikkojen otsikko */
  mainPartners: string;
  /** Ykköspääkumppanin label (heron alla oleva banneri) */
  mainPartnerOne: string;
  /** Kakkospääkumppanin label (kumppaniosion kortti, edullisempi paikka) */
  mainPartnerTwo: string;
  /** Ryhmä 2: premium-paikkojen otsikko */
  premiumSpots: string;
  /** Paikkamäärän teksti ryhmäotsikon perään, esim. "2 paikkaa" */
  slotCount: (n: number) => string;
  /** House-ad: pieni yläkulmalabel */
  slotOpen: string;
  /** House-ad: pääotsikko */
  wantYourAd: string;
  /** House-ad (pääsponsori): alaotsikko */
  sponsorSub: string;
  /** House-ad (premium-gridi): alaotsikko / tyhjän paikan teksti */
  premiumOpen: string;
  /** House-ad: CTA */
  bookCta: string;
  /** Premium-gridin tyhjän solun lyhyt CTA */
  bookShort: string;
};

export const AD_SLOTS_COPY: Record<AdLocale, AdSlotsCopy> = {
  en: {
    badge: 'Partner',
    partners: 'Partners',
    mainPartners: 'Main partners',
    mainPartnerOne: 'Main partner',
    mainPartnerTwo: 'Second main partner',
    premiumSpots: 'Premium spots',
    slotCount: (n) => n === 1 ? '1 slot' : `${n} slots`,
    slotOpen: 'Ad spot available',
    wantYourAd: 'Want your ad here?',
    sponsorSub: 'Become a main partner — the most visible placement on this site.',
    premiumOpen: 'Ad spot available',
    bookCta: 'Book this spot →',
    bookShort: 'Book →',
  },
  fi: {
    badge: 'Kumppani',
    partners: 'Kumppanit',
    mainPartners: 'Pääkumppanit',
    mainPartnerOne: 'Pääkumppani',
    mainPartnerTwo: 'Kakkospääkumppani',
    premiumSpots: 'Premium-paikat',
    slotCount: (n) => n === 1 ? '1 paikka' : `${n} paikkaa`,
    slotOpen: 'Mainospaikka vapaana',
    wantYourAd: 'Haluatko mainoksesi tähän?',
    sponsorSub: 'Ryhdy sivuston pääkumppaniksi — näkyvin paikka etusivulla.',
    premiumOpen: 'Mainospaikka vapaana',
    bookCta: 'Varaa mainospaikka →',
    bookShort: 'Varaa →',
  },
  de: {
    badge: 'Partner',
    partners: 'Partner',
    mainPartners: 'Hauptpartner',
    mainPartnerOne: 'Hauptpartner',
    mainPartnerTwo: 'Zweiter Hauptpartner',
    premiumSpots: 'Premium-Plätze',
    slotCount: (n) => n === 1 ? '1 Platz' : `${n} Plätze`,
    slotOpen: 'Werbeplatz frei',
    wantYourAd: 'Möchten Sie hier werben?',
    sponsorSub: 'Werden Sie Hauptpartner — der sichtbarste Platz dieser Website.',
    premiumOpen: 'Werbeplatz frei',
    bookCta: 'Platz buchen →',
    bookShort: 'Buchen →',
  },
  fr: {
    badge: 'Partenaire',
    partners: 'Partenaires',
    mainPartners: 'Partenaires principaux',
    mainPartnerOne: 'Partenaire principal',
    mainPartnerTwo: 'Deuxième partenaire principal',
    premiumSpots: 'Emplacements premium',
    slotCount: (n) => n === 1 ? '1 emplacement' : `${n} emplacements`,
    slotOpen: 'Emplacement disponible',
    wantYourAd: 'Votre publicité ici ?',
    sponsorSub: 'Devenez partenaire principal — l’emplacement le plus visible du site.',
    premiumOpen: 'Emplacement disponible',
    bookCta: 'Réserver cet emplacement →',
    bookShort: 'Réserver →',
  },
  it: {
    badge: 'Partner',
    partners: 'Partner',
    mainPartners: 'Partner principali',
    mainPartnerOne: 'Partner principale',
    mainPartnerTwo: 'Secondo partner principale',
    premiumSpots: 'Spazi premium',
    slotCount: (n) => n === 1 ? '1 spazio' : `${n} spazi`,
    slotOpen: 'Spazio pubblicitario libero',
    wantYourAd: 'Vuoi il tuo annuncio qui?',
    sponsorSub: 'Diventa partner principale — lo spazio più visibile del sito.',
    premiumOpen: 'Spazio pubblicitario libero',
    bookCta: 'Prenota questo spazio →',
    bookShort: 'Prenota →',
  },
  es: {
    badge: 'Colaborador',
    partners: 'Colaboradores',
    mainPartners: 'Colaboradores principales',
    mainPartnerOne: 'Colaborador principal',
    mainPartnerTwo: 'Segundo colaborador principal',
    premiumSpots: 'Espacios premium',
    slotCount: (n) => n === 1 ? '1 espacio' : `${n} espacios`,
    slotOpen: 'Espacio publicitario libre',
    wantYourAd: '¿Quieres tu anuncio aquí?',
    sponsorSub: 'Conviértete en colaborador principal — el espacio más visible del sitio.',
    premiumOpen: 'Espacio publicitario libre',
    bookCta: 'Reservar este espacio →',
    bookShort: 'Reservar →',
  },
  pt: {
    badge: 'Parceiro',
    partners: 'Parceiros',
    mainPartners: 'Parceiros principais',
    mainPartnerOne: 'Parceiro principal',
    mainPartnerTwo: 'Segundo parceiro principal',
    premiumSpots: 'Espaços premium',
    slotCount: (n) => n === 1 ? '1 espaço' : `${n} espaços`,
    slotOpen: 'Espaço publicitário livre',
    wantYourAd: 'Quer o seu anúncio aqui?',
    sponsorSub: 'Torne-se parceiro principal — o espaço mais visível do site.',
    premiumOpen: 'Espaço publicitário livre',
    bookCta: 'Reservar este espaço →',
    bookShort: 'Reservar →',
  },
  nl: {
    badge: 'Partner',
    partners: 'Partners',
    mainPartners: 'Hoofdpartners',
    mainPartnerOne: 'Hoofdpartner',
    mainPartnerTwo: 'Tweede hoofdpartner',
    premiumSpots: 'Premium-plekken',
    slotCount: (n) => n === 1 ? '1 plek' : `${n} plekken`,
    slotOpen: 'Advertentieplek beschikbaar',
    wantYourAd: 'Uw advertentie hier?',
    sponsorSub: 'Word hoofdpartner — de meest zichtbare plek op deze site.',
    premiumOpen: 'Advertentieplek beschikbaar',
    bookCta: 'Reserveer deze plek →',
    bookShort: 'Reserveer →',
  },
  sv: {
    badge: 'Partner',
    partners: 'Partner',
    mainPartners: 'Huvudpartner',
    mainPartnerOne: 'Huvudpartner',
    mainPartnerTwo: 'Andra huvudpartner',
    premiumSpots: 'Premiumplatser',
    slotCount: (n) => n === 1 ? '1 plats' : `${n} platser`,
    slotOpen: 'Annonsplats ledig',
    wantYourAd: 'Vill du synas här?',
    sponsorSub: 'Bli huvudpartner — den mest synliga platsen på den här sidan.',
    premiumOpen: 'Annonsplats ledig',
    bookCta: 'Boka denna plats →',
    bookShort: 'Boka →',
  },
  ja: {
    badge: '広告',
    partners: 'パートナー',
    mainPartners: 'メインパートナー',
    mainPartnerOne: 'メインパートナー',
    mainPartnerTwo: 'セカンドパートナー',
    premiumSpots: 'プレミアム枠',
    slotCount: (n) => `${n}枠`,
    slotOpen: '広告枠 募集中',
    wantYourAd: 'ここに広告を掲載しませんか？',
    sponsorSub: 'メインパートナーに — サイトで最も目立つ広告枠です。',
    premiumOpen: '広告枠 募集中',
    bookCta: 'この枠を予約 →',
    bookShort: '予約 →',
  },
  ko: {
    badge: '광고',
    partners: '파트너',
    mainPartners: '메인 파트너',
    mainPartnerOne: '메인 파트너',
    mainPartnerTwo: '세컨드 메인 파트너',
    premiumSpots: '프리미엄 자리',
    slotCount: (n) => `${n}자리`,
    slotOpen: '광고 자리 모집 중',
    wantYourAd: '이곳에 광고를 게재해 보세요',
    sponsorSub: '메인 파트너가 되어 사이트에서 가장 눈에 띄는 자리를 차지하세요.',
    premiumOpen: '광고 자리 모집 중',
    bookCta: '이 자리 예약하기 →',
    bookShort: '예약 →',
  },
  zh: {
    badge: '广告',
    partners: '合作伙伴',
    mainPartners: '主要合作伙伴',
    mainPartnerOne: '主要合作伙伴',
    mainPartnerTwo: '第二主要合作伙伴',
    premiumSpots: '高级广告位',
    slotCount: (n) => `${n} 个广告位`,
    slotOpen: '广告位招商中',
    wantYourAd: '想在这里展示您的广告吗？',
    sponsorSub: '成为主要合作伙伴——本站最显眼的广告位。',
    premiumOpen: '广告位招商中',
    bookCta: '预订此广告位 →',
    bookShort: '预订 →',
  },
};

export function adSlotsCopy(locale?: string): AdSlotsCopy {
  return AD_SLOTS_COPY[normalizeAdLocale(locale)];
}

/**
 * LV Media -portaalin per-sivu-URL (piiloportaali, noindex).
 * Portaalissa on vain fi/en-reitit → fi saa /fi-prefiksin, kaikki muut → en.
 */
export function mediaSiteUrl(siteSlug: string, locale?: string): string {
  const fi = normalizeAdLocale(locale) === 'fi';
  return `https://laplandvibes.com${fi ? '/fi' : ''}/media/site/${siteSlug}`;
}

/** GA4-event tyhjän paikan CTA-klikille. gtag puuttuu → ei kaadu. */
export function fireAdvertiseHereClick(siteSlug: string, slotId: string): void {
  try {
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    w.gtag?.('event', 'advertise_here_click', {
      lv_site: siteSlug,
      lv_slot: slotId,
    });
  } catch {
    /* analytics ei saa estää navigointia */
  }
}
