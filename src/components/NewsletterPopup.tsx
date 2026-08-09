import SharedNewsletterPopup from '../shared/NewsletterPopup';
import { trackNewsletterSignup } from '../lib/analytics';
import { useLang } from '../i18n/useLang';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) ?? '';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ?? '';

// Founder popup (2026-08-09): the per-locale DICTS table is gone — the shared
// founder default (Vesa + spiral avatar + social links) is the network
// standard. Do not re-add per-site copy overrides here.
export default function NewsletterPopup() {
  const lang = useLang();
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return (
    <SharedNewsletterPopup
      lang={lang as 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv'}
      siteId="laplandtours"
      brandWord="TOURS"
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_ANON_KEY}
      onSubscribed={(s) => trackNewsletterSignup(s)}
    />
  );
}
