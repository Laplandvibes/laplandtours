import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

/*
  Pole on LEFT, flag flies RIGHT.
  Grid: 5fr | 3fr | 10fr
    col 1 (5fr):  hoist, narrow white, near pole, empty
    col 2 (3fr):  blue cross (vertical stripe)
    col 3 (10fr): fly side, wide white, holds all content

  Mobile:  pole left:15px (6px wide) → right edge 21px; banner left:27px → gap 6px
  Desktop: pole left:45px (5px wide) → right edge 50px; banner left:56px → gap 6px
  Pole height = bannerBottom + bannerHeight (finial at banner top edge)
*/

/**
 * Optional dictionary of UI strings for the cookie banner. Pass `dict` to
 * localise the four user-visible strings (label, body, decline, accept). If
 * omitted, English defaults are used (backwards-compatible).
 *
 * Common usage: pick the right entry from `COOKIE_BANNER_LOCALES` based on
 * the current URL locale, e.g. `<CookieBanner dict={COOKIE_BANNER_LOCALES[lang]} />`.
 */
export interface CookieBannerDict {
  label?: string;       // "Cookies" eyebrow
  body?: string;        // "We use cookies to improve your experience."
  policyLink?: string;  // "Cookie Policy"
  decline?: string;     // "Decline"
  accept?: string;      // "Accept"
  ariaLabel?: string;   // dialog aria-label, e.g. "Cookie consent"
}

/**
 * Built-in 11-language translations matching the LaplandVibes ecosystem
 * (en, fi, de, ja, es, pt-BR, zh-CN, ko, fr, it, nl). Use these as either
 * `dict` directly, or as the source for per-site overrides.
 *
 * Legally important: this banner is the FIRST consent prompt a non-English
 * visitor sees. Showing English copy on /kr /fr /it /nl is a GDPR + ePrivacy
 * problem (consent must be given in a language the user understands).
 */
export const COOKIE_BANNER_LOCALES: Record<string, Required<CookieBannerDict>> = {
  en:      { label: 'Cookies',  body: 'We use cookies to improve your experience.',         policyLink: 'Cookie Policy', decline: 'Decline',  accept: 'Accept',    ariaLabel: 'Cookie consent' },
  fi:      { label: 'Evästeet', body: 'Käytämme evästeitä parantaaksemme käyttökokemustasi.', policyLink: 'Evästekäytäntö', decline: 'Hylkää',   accept: 'Hyväksy',   ariaLabel: 'Evästeiden hyväksyntä' },
  de:      { label: 'Cookies',  body: 'Wir verwenden Cookies, um Ihr Erlebnis zu verbessern.', policyLink: 'Cookie-Richtlinie', decline: 'Ablehnen', accept: 'Akzeptieren', ariaLabel: 'Cookie-Einwilligung' },
  ja:      { label: 'クッキー', body: '体験を向上させるためにクッキーを使用しています。',           policyLink: 'クッキーポリシー', decline: '拒否',     accept: '同意する',  ariaLabel: 'クッキーの同意' },
  es:      { label: 'Cookies',  body: 'Utilizamos cookies para mejorar tu experiencia.',     policyLink: 'Política de Cookies', decline: 'Rechazar', accept: 'Aceptar',   ariaLabel: 'Consentimiento de cookies' },
  'pt-BR': { label: 'Cookies',  body: 'Usamos cookies para melhorar sua experiência.',        policyLink: 'Política de Cookies', decline: 'Recusar',  accept: 'Aceitar',   ariaLabel: 'Consentimento de cookies' },
  'zh-CN': { label: 'Cookie',   body: '我们使用 Cookie 来改善您的体验。',                       policyLink: 'Cookie 政策',  decline: '拒绝',     accept: '接受',      ariaLabel: 'Cookie 同意' },
  ko:      { label: '쿠키',     body: '더 나은 경험을 위해 쿠키를 사용합니다.',                  policyLink: '쿠키 정책',    decline: '거부',     accept: '동의',      ariaLabel: '쿠키 동의' },
  fr:      { label: 'Cookies',  body: 'Nous utilisons des cookies pour améliorer votre expérience.', policyLink: 'Politique des cookies', decline: 'Refuser',  accept: 'Accepter',  ariaLabel: 'Consentement aux cookies' },
  it:      { label: 'Cookie',   body: 'Utilizziamo i cookie per migliorare la tua esperienza.', policyLink: 'Informativa sui Cookie', decline: 'Rifiuta',  accept: 'Accetta',   ariaLabel: 'Consenso ai cookie' },
  nl:      { label: 'Cookies',  body: 'We gebruiken cookies om uw ervaring te verbeteren.',   policyLink: 'Cookiebeleid', decline: 'Weigeren', accept: 'Accepteren', ariaLabel: 'Cookietoestemming' },
  sv:      { label: 'Cookies',  body: 'Vi använder cookies för att förbättra din upplevelse.', policyLink: 'Cookiepolicy', decline: 'Avvisa',   accept: 'Acceptera', ariaLabel: 'Samtycke till cookies' },
};

const DEFAULT_DICT: Required<CookieBannerDict> = COOKIE_BANNER_LOCALES.en;

interface CookieBannerProps {
  consentKey?: string;
  /**
   * Optional locale code (en | fi | de | ja | es | pt-BR | zh-CN | ko | fr | it | nl).
   * When provided, the banner auto-picks copy from the built-in
   * `COOKIE_BANNER_LOCALES` table. Overridden by an explicit `dict`.
   */
  lang?: string;
  /** Explicit translation dictionary. Wins over `lang`. */
  dict?: CookieBannerDict;
  /**
   * Optional locale-prefixed cookie-policy path, e.g. `/kr/cookie-policy`.
   * Defaults to `/cookie-policy`. Pass this when the site uses locale URL
   * prefixes so the consent link doesn't dump the visitor back to English.
   */
  policyHref?: string;
}

export default function CookieBanner({
  consentKey = 'laplandvibes_cookie_consent',
  lang,
  dict,
  policyHref,
}: CookieBannerProps) {
  // Keep the policy link in the visitor's locale: derive the URL prefix from the
  // first path segment (fi/de/ja/es/br/cn/kr/fr/it/nl) unless an explicit
  // policyHref is passed. A bare /cookie-policy would dump a /fr visitor to EN.
  const { pathname } = useLocation();
  const _seg = pathname.split('/')[1] || '';
  const _href = policyHref ?? (/^(fi|de|ja|es|br|cn|kr|fr|it|nl|sv)$/.test(_seg) ? `/${_seg}/cookie-policy` : '/cookie-policy');
  const D: Required<CookieBannerDict> = {
    ...DEFAULT_DICT,
    ...(lang && COOKIE_BANNER_LOCALES[lang] ? COOKIE_BANNER_LOCALES[lang] : {}),
    ...(dict ?? {}),
  };
  const [visible, setVisible]       = useState(false);
  const [dismissing, setDismissing] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(consentKey)) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    }
  }, [consentKey]);

  const dismiss = (value: 'accepted' | 'declined') => {
    setDismissing(true);
    setTimeout(() => {
      localStorage.setItem(consentKey, value);
      setVisible(false);
      setDismissing(false);
    }, 850);
  };

  const accept = () => {
    dismiss('accepted');
    (window as any).gtag?.('consent', 'update', { analytics_storage: 'granted' });
  };
  const decline = () => dismiss('declined');

  if (!visible) return null;

  return (
    <>
      {/* ── Flagpole, LEFT side ── */}
      <div className="lv-pole fixed bottom-0 z-[9997] pointer-events-none">
        {/* Ball finial */}
        <div
          className="lv-finial absolute rounded-full"
          style={{
            left: '50%', transform: 'translateX(-50%)',
            background: 'radial-gradient(circle at 35% 35%, #e2e8f0, #64748b)',
            boxShadow: '0 1px 4px rgba(0,0,0,0.45)',
          }}
        />
        {/* Shaft */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, #94a3b8 0%, #64748b 50%, #475569 100%)' }}
        />
      </div>

      {/* ── Outer div: rise / lower (translateY) ── */}
      <div
        className="lv-banner fixed z-[9999]"
        style={{
          animation: dismissing
            ? 'cookieFlagLower 0.8s ease-in forwards'
            : 'cookieFlagRise 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        }}
        role="dialog"
        aria-label={D.ariaLabel}
        aria-modal="true"
      >
        {/* ── Inner div: flutter (skewY, pivot at hoist/LEFT side) ── */}
        <div style={{ transformOrigin: 'left center', animation: 'cookieFlagFlutter 3.5s ease-in-out 1.6s infinite' }}>

          {/* Rope container */}
          <div className="lv-card" style={{ position: 'relative' }}>

            {/* Top rope, banner top-left corner → pole */}
            <div
              className="lv-rope"
              style={{
                position: 'absolute', top: 6, left: -9,
                transformOrigin: 'left center',
                transform: 'rotate(2deg)',
              }}
            />
            {/* Bottom rope, banner bottom-left corner → pole */}
            <div
              className="lv-rope"
              style={{
                position: 'absolute', bottom: 6, left: -9,
                transformOrigin: 'left center',
                transform: 'rotate(-2deg)',
              }}
            />

            {/*
              Nordic cross, hoist on LEFT (near pole)
              Columns: 5fr | 3fr | 10fr
              Rows:     4fr | 3fr | 4fr
            */}
            <div
              className="overflow-hidden rounded-sm shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-[#002F6C]/40 h-full grid"
              style={{ gridTemplateColumns: '5fr 3fr 10fr', gridTemplateRows: '4fr 3fr 4fr' }}
            >
              {/* Row 1 */}
              <div className="bg-white" />               {/* hoist, empty */}
              <div className="bg-[#002F6C]" />
              <div className="bg-white flex items-center px-3">
                <p className="lv-label text-[#002F6C] font-extrabold tracking-[0.22em] uppercase">{D.label}</p>
              </div>

              {/* Row 2, horizontal stripe */}
              <div className="bg-[#002F6C]" />
              <div className="bg-[#002F6C]" />
              <div className="bg-[#002F6C] flex items-center px-3">
                <p className="lv-body text-white leading-[1.35]">
                  {D.body}{' '}
                  <Link to={_href} className="underline opacity-80 hover:opacity-100 transition-opacity">
                    {D.policyLink}
                  </Link>
                </p>
              </div>

              {/* Row 3 */}
              <div className="bg-white" />               {/* hoist, empty */}
              <div className="bg-[#002F6C]" />
              <div className="bg-white flex items-center justify-start gap-2 px-3">
                <button
                  onClick={decline}
                  className="lv-btn text-[#002F6C] font-semibold border border-[#002F6C]/35 rounded-sm hover:bg-[#002F6C]/10 transition-colors cursor-pointer"
                >
                  {D.decline}
                </button>
                <button
                  onClick={accept}
                  className="lv-btn bg-[#002F6C] text-white font-bold rounded-sm hover:bg-[#001a4a] transition-colors cursor-pointer"
                >
                  {D.accept}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* ── Mobile ── (fixed pixel bottoms so mobile browser chrome resize does not displace the flag)
           Sized down 2026-07-06 — Vesa: the flag was disproportionately huge on many sites. */
        .lv-pole   { width: 3px; left: 12px; height: 250px; }
        .lv-finial { top: -4px; width: 8px; height: 8px; }
        .lv-banner { left: 20px; bottom: 110px; }
        .lv-card   { width: min(215px, 60vw); aspect-ratio: 18/11; }
        .lv-rope   { width: 7px; height: 1.5px; background: #334155; border-radius: 1px; }
        .lv-label  { font-size: 7.5px; letter-spacing: 0.13em; }
        .lv-body   { font-size: 8px; }
        .lv-btn    { font-size: 8.5px; padding: 3.5px 8px; }

        /* ── Desktop ── */
        @media (min-width: 768px) {
          .lv-pole   { width: 4px; left: 40px; height: 430px; }
          .lv-finial { top: -5px; width: 10px; height: 10px; }
          .lv-banner { left: 49px; bottom: 220px; }
          .lv-card   { width: 330px; }
          .lv-rope   { width: 9px; height: 2px; }
          .lv-label  { font-size: 10.5px; letter-spacing: 0.16em; }
          .lv-body   { font-size: 11.5px; }
          .lv-btn    { font-size: 11.5px; padding: 6px 13px; }
        }

        @keyframes cookieFlagRise {
          from { transform: translateY(100vh); }
          to   { transform: translateY(0); }
        }
        @keyframes cookieFlagLower {
          from { transform: translateY(0); }
          to   { transform: translateY(100vh); }
        }
        @keyframes cookieFlagFlutter {
          0%, 100% { transform: skewY(0deg); }
          20%      { transform: skewY(-1.3deg); }
          55%      { transform: skewY(0.7deg); }
          80%      { transform: skewY(-0.5deg); }
        }
      `}</style>
    </>
  );
}
