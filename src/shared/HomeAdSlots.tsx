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
import { adSlotsCopy } from './adSlotsCopy';

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
  const t = adSlotsCopy(locale);
  const light = surface === 'light';
  const labelCls = [
    'text-xs uppercase tracking-[0.2em] font-semibold',
    light ? 'text-gray-500' : 'text-[#F9FAFB]/75',
  ].join(' ');
  const countCls = ['text-[11px] font-semibold', light ? 'text-gray-400' : 'text-[#F9FAFB]/40'].join(' ');

  return (
    <section
      data-lv-ad-slots
      className={['py-12 sm:py-16 px-6 md:px-12 lg:px-20', className].filter(Boolean).join(' ')}
    >
      <div className="max-w-6xl mx-auto">
        {/* KAKKOSPÄÄKUMPPANI — hieman edullisempi pääkumppanipaikka */}
        <div className="mb-4">
          <p className={labelCls}>{t.mainPartnerTwo}</p>
        </div>
        <PartnerSlot
          variant="card"
          partner={config.sponsors[1] ?? null}
          locale={locale}
          surface={surface}
          className={sponsorClassName}
          placeholder={{
            siteSlug: config.siteSlug,
            slotId: 'main_partner_2',
            level: 'sponsor',
          }}
        />

        {/* PREMIUM-PAIKAT — 6 kohdekohtaista paikkaa */}
        <div className="flex items-baseline gap-2.5 mt-8 sm:mt-10 mb-4">
          <p className={labelCls}>{t.premiumSpots}</p>
          <span className={countCls}>· {t.slotCount(config.spots.length)}</span>
        </div>
        <PremiumSpotGrid
          spots={config.spots}
          siteSlug={config.siteSlug}
          locale={locale}
          surface={surface}
        />
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
