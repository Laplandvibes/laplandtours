// Google Analytics 4 — laplandtours.online
// Property: G-V00ZG3416R
// Initial config + Consent Mode v2 lives in index.html. This module is the
// thin SPA wrapper that fires `page_view` on route change and exposes typed
// helpers for outbound, scroll-depth, and affiliate events.

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

export const GA_ID = 'G-V00ZG3416R';

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args);
  }
}

export function trackPageView(path: string, title?: string) {
  gtag('event', 'page_view', {
    page_path: path,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
    page_title: title ?? (typeof document !== 'undefined' ? document.title : ''),
  });
}

export function trackAffiliateClick(partner: string, sid: string, url: string) {
  gtag('event', 'affiliate_click', {
    event_category: 'monetisation',
    event_label: partner,
    sid,
    outbound_url: url,
  });
}

export function trackOutboundClick(url: string, label?: string) {
  gtag('event', 'outbound_click', {
    event_category: 'engagement',
    event_label: label ?? url,
    outbound_url: url,
  });
}

export function trackNewsletterSignup(source: string) {
  gtag('event', 'newsletter_signup', {
    event_category: 'engagement',
    event_label: source,
  });
}

const SCROLL_BUCKETS = [25, 50, 75, 90] as const;
type ScrollBucket = (typeof SCROLL_BUCKETS)[number];
let scrollFired: Set<ScrollBucket> = new Set();
let scrollHandler: (() => void) | null = null;
let lastPath: string | null = null;

export function initScrollDepth() {
  if (typeof window === 'undefined') return;
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler);
  }
  scrollFired = new Set();

  scrollHandler = () => {
    const doc = document.documentElement;
    const scrolled = window.scrollY + window.innerHeight;
    const total = doc.scrollHeight;
    if (total <= 0) return;
    const pct = Math.round((scrolled / total) * 100);
    for (const bucket of SCROLL_BUCKETS) {
      if (pct >= bucket && !scrollFired.has(bucket)) {
        scrollFired.add(bucket);
        gtag('event', 'scroll_depth', {
          event_category: 'engagement',
          event_label: `${bucket}%`,
          value: bucket,
        });
      }
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });
}

let outboundDelegateInit = false;

export function initOutboundTracking() {
  if (typeof document === 'undefined' || outboundDelegateInit) return;
  outboundDelegateInit = true;

  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest('a');
      if (!(a instanceof HTMLAnchorElement)) return;
      const href = a.getAttribute('href');
      if (!href) return;
      try {
        const url = new URL(href, window.location.origin);
        if (url.origin === window.location.origin) return;
        const isAffiliate = url.hostname.endsWith('go.laplandvibes.com');
        if (isAffiliate) {
          const sid = url.searchParams.get('sid') ?? 'unknown';
          const parts = url.pathname.split('/').filter(Boolean);
          const partner = parts[1] ?? 'unknown';
          trackAffiliateClick(partner, sid, url.href);
          return;
        }
        trackOutboundClick(url.href, a.textContent?.trim().slice(0, 60));
      } catch {
        /* ignore malformed URLs */
      }
    },
    { capture: true },
  );
}

export function onRouteChange(path: string) {
  if (path === lastPath) return;
  lastPath = path;
  trackPageView(path);
  scrollFired = new Set();
}
