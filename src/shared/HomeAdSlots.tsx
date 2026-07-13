/**
 * HomeAdSlots — etusivun standardi mainospaikat (LV Media -inventaari).
 *
 * JAETTU MALLI (Vesa 2026-07-11): pääkumppanit eivät näy vierekkäin, jotta
 * kilpailijat eivät tule katsotuksi samaan aikaan, ja paras paikka on sivun
 * ylälaidassa:
 *
 *   1. <MainPartnerBanner>  — PÄÄKUMPPANI (sponsors[0]): kompakti banneri
 *      HETI HERON ALLE. Sivuston näkyvin paikka, hinnaston kallein.
 *   2. <HomeAdSlots>        — osio heti ensimmäisen sisältöosion jälkeen:
 *        · KAKKOSPÄÄKUMPPANI (sponsors[1]): kortti — hieman edullisempi paikka
 *        · PREMIUM-PAIKAT: 6 kohdekohtaista paikkaa (PremiumSpotGrid)
 *
 * Tyhjät paikat renderöivät house-adin → LV Media -portaali + GA4-event.
 *
 * Integraatio per sivusto:
 *   import HomeAdSlots, { MainPartnerBanner } from '../../../shared/HomeAdSlots';
 *   import { AD_SLOTS } from '../data/adSlots';
 *   // heti heron alle:
 *   <MainPartnerBanner config={AD_SLOTS} locale={locale} />
 *   // heti 1. sisältöosion jälkeen:
 *   <HomeAdSlots config={AD_SLOTS} locale={locale} />
 *
 * Per-sivu config src/data/adSlots.ts:
 *   export const AD_SLOTS: HomeAdSlotsConfig = {
 *     siteSlug: 'laplandstays',            // lv_sites.slug (LV Media -portaali)
 *     sponsors: [null, null],              // [0]=pääkumppani, [1]=kakkospääkumppani
 *     spots: DEFAULT_PREMIUM_SPOTS,        // tai oma 6 paikan jako (flights: kentät)
 *   };
 *
 * ALASIVUT (tier 2, kun alasivupaikat rollataan): käytä pickMainPartner(pathname,
 * config) — deterministinen vuorottelu reitin mukaan, näyttää vain TOISEN
 * pääkumppanin per alasivu (ei kilpailijoita rinnakkain; prerender-turvallinen).
 *
 * Vaaleat sivustot: surface="light". Myyntiprosessi: kauppa → täytä config →
 * build → deploy --branch=main.
 */

import PartnerSlot, { type Partner } from './PartnerSlot';
import PremiumSpotGrid, { type PremiumSpot } from './PremiumSpotGrid';
import { adSlotsCopy, adLocaleEnabled } from './adSlotsCopy';

export type HomeAdSlotsConfig = {
  /** LV Median sivuslug (lv_sites.slug) — house-adit linkittävät tänne */
  siteSlug: string;
  /** [0] = pääkumppani (yläbanneri), [1] = kakkospääkumppani (osion kortti) */
  sponsors: (Partner | null)[];
  /** TASO 2: 6 kohdekohtaista premium-paikkaa */
  spots: PremiumSpot[];
};

type SurfaceProps = {
  config: HomeAdSlotsConfig;
  locale?: string;
  surface?: 'dark' | 'light';
  className?: string;
};

/**
 * PÄÄKUMPPANI-banneri — sijoita HETI heron alle (sivun paras paikka).
 * Täysi banneri kun myyty, kompakti house-ad-rivi kun vapaa.
 */
export function MainPartnerBanner({ config, locale, surface = 'dark', className }: SurfaceProps) {
  // Mainospaikat vain fi/en/sv (Vesa 2026-07-13).
  if (!adLocaleEnabled(locale)) return null;
  const t = adSlotsCopy(locale);
  return (
    <section data-lv-main-partner className={['px-6 md:px-12 lg:px-20 py-4', className].filter(Boolean).join(' ')}>
      <div className="max-w-6xl mx-auto">
        <PartnerSlot
          variant="banner"
          partner={config.sponsors[0] ?? null}
          locale={locale}
          surface={surface}
          placeholder={{
            siteSlug: config.siteSlug,
            slotId: 'main_partner_1',
            level: 'sponsor',
            label: `${t.mainPartnerOne} · ${t.slotOpen}`,
          }}
        />
      </div>
    </section>
  );
}

export type HomeAdSlotsProps = SurfaceProps & {
  /** Kakkospääkumppanikortin lisäluokat (vaaleiden sivujen pinnat, kun myyty) */
  sponsorClassName?: string;
};

/**
 * Kumppaniosio — sijoita heti ensimmäisen sisältöosion jälkeen (ylös).
 * Sisältö: kakkospääkumppani (kortti) + 6 premium-paikan kohdegridi.
 */
export default function HomeAdSlots({ config, locale, surface = 'dark', className, sponsorClassName }: HomeAdSlotsProps) {
  // Mainospaikat vain fi/en/sv (Vesa 2026-07-13).
  if (!adLocaleEnabled(locale)) return null;
  const t = adSlotsCopy(locale);
  const light = surface === 'light';

  // HUOM (Vesa 2026-07-12): kävijälle näkyy vain neutraali "Kumppanit"-osio —
  // tier-nimet (pääkumppani/kakkospääkumppani/premium) ovat myyntikieltä ja
  // elävät vain house-adien pitchissä + LV Media -portaalissa/hinnastossa.
  return (
    <section
      data-lv-ad-slots
      className={['py-12 sm:py-16 px-6 md:px-12 lg:px-20', className].filter(Boolean).join(' ')}
    >
      <div className="max-w-6xl mx-auto">
        <p
          className={[
            'text-xs uppercase tracking-[0.2em] font-semibold mb-5',
            light ? 'text-gray-500' : 'text-[#F9FAFB]/75',
          ].join(' ')}
        >
          {t.partners}
        </p>

        {/* Desktop: kumppanikortti (2/5) ja kohdegridi (3/5) vierekkäin —
            kompakti, ei yksinäistä täysleveää korttia. Mobiili: pinottuna. */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5 lg:items-stretch">
          <div className="lg:col-span-2 flex">
            <PartnerSlot
              variant="card"
              partner={config.sponsors[1] ?? null}
              locale={locale}
              surface={surface}
              className={['w-full', sponsorClassName].filter(Boolean).join(' ')}
              placeholder={{
                siteSlug: config.siteSlug,
                slotId: 'main_partner_2',
                level: 'sponsor',
              }}
            />
          </div>
          <div className="lg:col-span-3">
            <PremiumSpotGrid
              spots={config.spots}
              siteSlug={config.siteSlug}
              locale={locale}
              surface={surface}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Deterministinen pääkumppanivuorottelu alasivuille (tier 2): palauttaa
 * VAIN toisen pääkumppaneista reitin mukaan — kilpailijat eivät koskaan näy
 * samalla alasivulla, ja sama reitti näyttää aina saman kumppanin
 * (prerender-turvallinen, GA4-mitattava).
 */
export function pickMainPartner(
  pathname: string,
  config: HomeAdSlotsConfig
): { partner: Partner | null; slotId: 'main_partner_1' | 'main_partner_2' } {
  let h = 0;
  for (let i = 0; i < pathname.length; i++) h = (h * 31 + pathname.charCodeAt(i)) | 0;
  const idx = Math.abs(h) % 2;
  return {
    partner: config.sponsors[idx] ?? null,
    slotId: idx === 0 ? 'main_partner_1' : 'main_partner_2',
  };
}
