import SharedNewsletterPopup from '../shared/NewsletterPopup';
import { trackNewsletterSignup } from '../lib/analytics';
import { useLang } from '../i18n/useLang';

// Shared network creds hardcoded (public anon key): this site has NO .env at
// all, so the old import.meta.env guard returned null and the popup has been
// silently dead here — same hardcoded pattern as wellness/food/christmas.
const SUPABASE_URL = 'https://oogioaxmfnqcbvjbcodh.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';

// Founder popup (2026-08-09): the per-locale DICTS table is gone — the shared
// founder default (Vesa + spiral avatar + social links) is the network
// standard. Do not re-add per-site copy overrides here.
export default function NewsletterPopup() {
  const lang = useLang();
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
