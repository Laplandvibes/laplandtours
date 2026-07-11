/**
 * AD_SLOTS — laplandtours: etusivun mainospaikkojen konfiguraatio (LV Media).
 *
 * JAETTU MALLI:
 *   sponsors[0] = PÄÄKUMPPANI     → <MainPartnerBanner> heti heron alle
 *   sponsors[1] = KAKKOSPÄÄKUMPPANI → <HomeAdSlots>-osion kortti
 *   spots       = 6 kohdekohtaista premium-paikkaa (PremiumSpotGrid)
 *
 * Tyhjä paikka (null) renderöi house-adin, joka linkittää LV Media -portaaliin:
 * https://laplandvibes.com/media/site/laplandtours
 *
 * Myyntiprosessi: kauppa → täytä Partner-objekti tähän → build → deploy.
 */
import type { HomeAdSlotsConfig } from '../shared/HomeAdSlots';
import { DEFAULT_PREMIUM_SPOTS } from '../shared/PremiumSpotGrid';

export const AD_SLOTS: HomeAdSlotsConfig = {
  siteSlug: 'laplandtours',
  sponsors: [null, null],
  spots: DEFAULT_PREMIUM_SPOTS,
};
