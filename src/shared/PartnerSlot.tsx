/**
 * PartnerSlot, shared kumppanikortti/-banneri/-listaus
 *
 * Käyttö kaikissa LaplandVibes-ekosysteemisivustoissa.
 *
 * SURFACE-TYYLI -huomio:
 *   Perusrakenne käyttää Tailwind-utilityja jotka toimivat dark-sivustoilla
 *   (hub, skiresorts, husky, dining…). Kevyet/lämpimät teemat (laplandchristmas,
 *   laplandstays) voivat ylikirjoittaa pintatyylit `className`-propilla, 
 *   esim. className="bg-white border-black/10 text-gray-900".
 *   Oletuspinta: bg-white/5 backdrop-blur-sm border border-white/15
 *   (toimii dark-sivustoilla; light-sivustot ohittavat className:lla).
 *
 * DOM-tunniste: jokainen renderöity slot saa data-partner-slot-attribuutin.
 *   Tyhjä paikka ILMAN placeholder-propsia ei tuota DOM:ia lainkaan;
 *   placeholder-propsilla tyhjä paikka renderöi house-adin
 *   (data-partner-slot="house-ad") joka linkittää LV Media -portaaliin.
 *
 * Affiliate-huomio: kumppanilinkki EI kulje go.laplandvibes.com-Workerin
 *   kautta (ei CJ-attribuutiota → ei noreferrer-kieltoa). Käytetään vain
 *   rel="sponsored noopener".
 */

import { adSlotsCopy, mediaSiteUrl, fireAdvertiseHereClick } from './adSlotsCopy';

export type Partner = {
  name: string;
  tagline?: string;
  taglineEn?: string;
  url: string;
  imageSrc?: string;
  /** Lifestyle/mood photo for ad units that show both a photo and the logo. */
  photoSrc?: string;
  badgeLabel?: string;
};

/**
 * House-ad-konfiguraatio tyhjälle paikalle. Kun partner === null JA tämä on
 * annettu, slotti renderöi "Haluatko mainoksesi tähän?" -house-adin joka
 * linkittää LV Media -portaaliin. Ilman tätä tyhjä paikka ei renderöidy
 * lainkaan (vanha käytös säilyy).
 */
export type SlotPlaceholder = {
  /** LV Median sivuslug (lv_sites.slug), esim. 'laplandstays' */
  siteSlug: string;
  /** GA4-tunniste, esim. 'sponsor_1' */
  slotId: string;
  /** Tekstin kohdennus: pääsponsori-paikka vai premium-paikka */
  level?: 'sponsor' | 'premium';
  /** Pieni yläkulmalabel, esim. "Pääkumppani" — oletus adSlotsCopy.slotOpen */
  label?: string;
};

export type PartnerSlotProps = {
  partner: Partner | null;
  variant: 'card' | 'banner' | 'listing';
  locale?: string;
  className?: string;
  /** Tyhjän paikan house-ad — ks. SlotPlaceholder */
  placeholder?: SlotPlaceholder;
  /** Vaaleat sivustot (christmas/stays/hoteldeals/nature): 'light' säätää house-adin värit */
  surface?: 'dark' | 'light';
};

function getBadgeLabel(partner: Partner, locale?: string): string {
  if (partner.badgeLabel) return partner.badgeLabel;
  return adSlotsCopy(locale).badge;
}

export default function PartnerSlot({ partner, variant, locale, className, placeholder, surface = 'dark' }: PartnerSlotProps) {
  // Tyhjä paikka: house-ad jos placeholder annettu, muuten ei DOM:ia lainkaan
  if (partner === null) {
    if (!placeholder) return null;
    const t = adSlotsCopy(locale);
    const light = surface === 'light';
    const sub = placeholder.level === 'premium' ? t.premiumOpen : t.sponsorSub;
    const topLabel = placeholder.label || t.slotOpen;

    // BANNER-variantin house-ad: kompakti vaakarivi (heron alle, ei työnnä sisältöä)
    if (variant === 'banner') {
      return (
        <a
          data-partner-slot="house-ad-banner"
          href={mediaSiteUrl(placeholder.siteSlug, locale)}
          onClick={() => fireAdvertiseHereClick(placeholder.siteSlug, placeholder.slotId)}
          className={[
            'group relative flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 w-full',
            'rounded-2xl border-2 border-dashed px-4 py-3 sm:px-6 sm:py-3.5 transition-colors duration-300',
            light
              ? 'border-black/15 bg-black/[0.02] hover:border-[#EC4899]/50'
              : 'border-white/20 bg-white/[0.02] hover:border-[#EC4899]/50',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          aria-label={`${topLabel}: ${t.wantYourAd}`}
        >
          <span className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2.5 min-w-0">
            <span className="flex items-center gap-2 min-w-0">
              <span aria-hidden="true" className="shrink-0 inline-block w-1.5 h-1.5 rounded-full bg-[#EC4899]/70" />
              <span
                className={[
                  'text-[10px] font-semibold uppercase tracking-widest truncate',
                  light ? 'text-gray-500' : 'text-[#F9FAFB]/45',
                ].join(' ')}
              >
                {topLabel}
              </span>
            </span>
            <span
              className={[
                'font-heading text-lg sm:text-xl tracking-wide leading-tight',
                light ? 'text-gray-900' : 'text-[#F9FAFB]',
              ].join(' ')}
            >
              {t.wantYourAd}
            </span>
          </span>
          <span className="shrink-0 text-sm font-semibold text-[#EC4899] group-hover:translate-x-0.5 transition-transform duration-200">
            {t.bookCta}
          </span>
        </a>
      );
    }

    return (
      <a
        data-partner-slot="house-ad"
        href={mediaSiteUrl(placeholder.siteSlug, locale)}
        onClick={() => fireAdvertiseHereClick(placeholder.siteSlug, placeholder.slotId)}
        className={[
          'group relative flex h-full flex-col items-center justify-center text-center gap-2.5',
          'rounded-2xl border-2 border-dashed px-6 py-8 sm:py-10 transition-colors duration-300',
          light
            ? 'border-black/15 bg-black/[0.02] hover:border-[#EC4899]/50'
            : 'border-white/20 bg-white/[0.02] hover:border-[#EC4899]/50',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={t.wantYourAd}
      >
        <span
          className={[
            'inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest',
            light ? 'text-gray-500' : 'text-[#F9FAFB]/45',
          ].join(' ')}
        >
          <span aria-hidden="true" className="inline-block w-1.5 h-1.5 rounded-full bg-[#EC4899]/70" />
          {topLabel}
        </span>
        <p
          className={[
            'font-heading text-2xl sm:text-3xl tracking-wide leading-tight',
            light ? 'text-gray-900' : 'text-[#F9FAFB]',
          ].join(' ')}
        >
          {t.wantYourAd}
        </p>
        <p className={['text-sm leading-snug max-w-xs', light ? 'text-gray-600' : 'text-[#F9FAFB]/60'].join(' ')}>
          {sub}
        </p>
        <span className="mt-1 text-sm font-semibold text-[#EC4899] group-hover:translate-x-0.5 transition-transform duration-200">
          {t.bookCta}
        </span>
      </a>
    );
  }

  const badge = getBadgeLabel(partner, locale);

  // Gradient-placeholder kuvattomille kumppaneille (LV brand-palette)
  const gradientBg = 'bg-gradient-to-br from-[#0d2818] via-[#0F172A] to-[#1e1b4b]';

  /** Pieni badge-pilleri, aina näkyvissä kuluttajansuojalain edellyttämänä */
  function Badge() {
    return (
      <span className="absolute top-2 left-2 z-10 inline-flex items-center gap-1 rounded-full bg-vibe-pink/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm">
        {badge}
      </span>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // CARD variant, kuva (tai gradient) + nimi + tagline
  // ────────────────────────────────────────────────────────────────────────────
  if (variant === 'card') {
    return (
      <a
        data-partner-slot="card"
        href={partner.url}
        target="_blank"
        rel="sponsored noopener"
        className={[
          'group relative flex flex-col overflow-hidden rounded-2xl border',
          'border-white/15 bg-white/5 backdrop-blur-sm',
          'hover:border-vibe-pink/40 transition-all duration-300',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={`${badge}: ${partner.name}`}
      >
        {/* Kuva tai gradient-placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {partner.imageSrc ? (
            <img
              src={partner.imageSrc}
              alt={partner.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <div className={`w-full h-full ${gradientBg}`} />
          )}
          <Badge />
        </div>

        {/* Teksti */}
        <div className="flex flex-col gap-1 p-4 sm:p-5">
          <p className="font-heading text-xl text-snow tracking-wide leading-tight group-hover:text-vibe-pink transition-colors">
            {partner.name}
          </p>
          {partner.tagline && (
            <p className="text-snow/65 text-sm leading-snug">{partner.tagline}</p>
          )}
        </div>
      </a>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // BANNER variant, leveä matala (koko-leveys CTA-banneri)
  // ────────────────────────────────────────────────────────────────────────────
  if (variant === 'banner') {
    return (
      <a
        data-partner-slot="banner"
        href={partner.url}
        target="_blank"
        rel="sponsored noopener"
        className={[
          'group relative flex items-center gap-4 overflow-hidden rounded-2xl border',
          'border-white/15 bg-white/5 backdrop-blur-sm px-5 py-4 sm:px-8 sm:py-5',
          'hover:border-vibe-pink/40 transition-all duration-300 w-full',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        aria-label={`${badge}: ${partner.name}`}
      >
        {/* Pieni kuva/thumbnail tai väripilkku */}
        {partner.imageSrc ? (
          <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden">
            <img
              src={partner.imageSrc}
              alt={partner.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className={`shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl ${gradientBg}`} />
        )}

        {/* Teksti */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-vibe-pink/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm">
              {badge}
            </span>
          </div>
          <p className="font-heading text-lg sm:text-xl text-snow tracking-wide leading-tight group-hover:text-vibe-pink transition-colors truncate">
            {partner.name}
          </p>
          {partner.tagline && (
            <p className="text-snow/65 text-xs sm:text-sm leading-snug truncate">{partner.tagline}</p>
          )}
        </div>

        {/* Nuoli */}
        <span
          aria-hidden="true"
          className="ml-auto shrink-0 text-vibe-pink opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 text-xl"
        >
          →
        </span>
      </a>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // LISTING variant, rivimuoto (esim. ravintola/aktiviteettilistan korostus)
  // ────────────────────────────────────────────────────────────────────────────
  // variant === 'listing'
  return (
    <a
      data-partner-slot="listing"
      href={partner.url}
      target="_blank"
      rel="sponsored noopener"
      className={[
        'group relative flex items-center gap-3 overflow-hidden rounded-xl border',
        'border-vibe-pink/30 bg-vibe-pink/5 px-4 py-3',
        'hover:bg-vibe-pink/10 hover:border-vibe-pink/50 transition-all duration-200 w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`${badge}: ${partner.name}`}
    >
      {/* Väripilkku tai pikkukuva */}
      {partner.imageSrc ? (
        <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden">
          <img
            src={partner.imageSrc}
            alt={partner.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`shrink-0 w-10 h-10 rounded-lg ${gradientBg}`} />
      )}

      {/* Teksti */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center rounded-full bg-vibe-pink/90 px-1.5 py-px text-[9px] font-semibold uppercase tracking-widest text-white shadow-sm">
            {badge}
          </span>
          <p className="font-body font-semibold text-sm text-snow group-hover:text-vibe-pink transition-colors truncate">
            {partner.name}
          </p>
        </div>
        {partner.tagline && (
          <p className="text-snow/55 text-xs leading-snug truncate">{partner.tagline}</p>
        )}
      </div>

      <span
        aria-hidden="true"
        className="ml-auto shrink-0 text-vibe-pink/60 group-hover:text-vibe-pink group-hover:translate-x-0.5 transition-all duration-200 text-sm"
      >
        →
      </span>
    </a>
  );
}
