import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, Loader2, X } from 'lucide-react';

/**
 * Shared LaplandVibes ecosystem newsletter popup.
 *
 * Mounted once at the root of every site (laplandvibes.com, laplandstays.com,
 * laplandhuskysafaris.com, etc.). Triggers after 25 s OR 55 % scroll, whichever
 * comes first. Suppressed on policy / utility routes. State stored per-site in
 * localStorage so a dismissal on one site does not silence the popup on others.
 *
 * The newsletter list is shared across the entire ecosystem, submissions land
 * in the same Supabase + Resend pipeline. The `source` tag differentiates the
 * referring site in GA4 / mailing-list analytics.
 *
 * Default copy positions the newsletter as the *#LaplandVibes newsletter* even
 * on sister sites, there is one master newsletter, and the visitor's current
 * site is just where they encountered it.
 */

const REMIND_AFTER_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const SUPPRESSED_PATHS = ['/privacy', '/terms', '/cookie-policy', '/unsubscribe'];

type Status = 'hidden' | 'visible' | 'loading' | 'success' | 'already' | 'error';

interface StoredState {
  subscribed?: number;
  dismissed?: number;
}

/**
 * Optional dictionary of UI strings used inside the popup. Pass this to
 * localise the popup. If omitted, English defaults are used (preserves
 * backwards compatibility with sites that haven't migrated to i18n yet).
 */
export interface NewsletterPopupDict {
  successHeadline?: string;
  successBody?: string;
  alreadyHeadline?: string;
  alreadyBody?: string;
  emailPlaceholder?: string;
  submit?: string;
  loading?: string;
  later?: string;
  closeAria?: string;
  closeLabel?: string;
  trust?: string;
  errorGeneric?: string;
  /** Eyebrow above the discount-code chip (e.g. "Sinun koodisi" / "Your subscriber code"). */
  codeLabel?: string;
  /** Helper text under the code (e.g. how/when to use it). */
  codeFootnote?: string;
  /** Tooltip text shown briefly after the user clicks Copy. */
  codeCopied?: string;
  /** Aria-label on the copy button. */
  codeCopyAria?: string;
}

type SupportedLang = 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl';

interface NewsletterPopupProps {
  /**
   * Per-site identifier. Used for the localStorage key and the analytics
   * `source` tag. Examples: 'laplandvibes', 'laplandstays', 'laplandhuskysafaris'.
   */
  siteId: string;
  /**
   * Brand suffix in the `#LAPLAND<word>` logo at the top of the popup.
   * Defaults to 'VIBES'. Examples: 'STAYS', 'HUSKYSAFARIS', 'SKIRESORTS'.
   */
  brandWord?: string;
  /** Optional headline override. */
  headline?: string;
  /** Optional supporting paragraph override (rendered as-is, plain text). */
  description?: string;
  /** Optional translation dictionary, see NewsletterPopupDict. */
  dict?: NewsletterPopupDict;
  /**
   * Current site locale. If provided AND `headline`/`description` are NOT
   * overridden, the popup picks built-in localized copy + dict.
   * Added 2026-05-23, fixes Vesa's flag that EN newsletter appeared on /fi /cn etc.
   */
  lang?: SupportedLang;
  /**
   * Optional analytics callback. Fires after a *new* successful subscription
   * (not when the email was already on the list). Use this to forward to
   * `trackNewsletterSignup` from your site's `lib/analytics`.
   */
  onSubscribed?: (source: string) => void;
  /**
   * Trigger thresholds. Pass `delaySeconds: 0` and `scrollPercent: 0` to
   * disable the auto-trigger and rely on a manual `defaultOpen` instead.
   */
  delaySeconds?: number;
  scrollPercent?: number;
  /** If true the popup opens immediately on mount (debugging / preview). */
  defaultOpen?: boolean;
  /**
   * Optional same-origin proxy endpoint (e.g. `/api/newsletter`). When set,
   * the popup POSTs `{email, source}` here instead of calling Supabase
   * directly, useful for sister sites whose origins aren't yet on the
   * Supabase function's CORS allowlist. The proxy must accept the same
   * `{email, source}` payload and return `{message, alreadySubscribed?}`.
   *
   * If `endpoint` is set, `supabaseUrl` + `supabaseAnonKey` may be omitted.
   */
  endpoint?: string;
  /** Supabase project URL with the `send-welcome-email` function. Required if `endpoint` not set. */
  supabaseUrl?: string;
  /** Supabase publishable anon key. Required if `endpoint` not set. */
  supabaseAnonKey?: string;
}

function readStored(key: string): StoredState | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeStored(key: string, s: StoredState) {
  try {
    localStorage.setItem(key, JSON.stringify(s));
  } catch {
    // ignore, Safari private mode etc.
  }
}

// Built-in locale defaults (2026-05-23). Activated when `lang` prop is passed
// but `headline`/`description` overrides are not. Fixes Vesa's flag that
// EN newsletter copy appeared on /fi /cn /de etc. across the ecosystem.
const LOCALE_HEADLINES: Record<SupportedLang, { headline: string; description: string }> = {
  en: {
    headline: 'Lapland in your inbox, straight from Finland.',
    description: "Aurora alerts before the clearest nights, glass-igloo booking windows before they sell out, and seasonal travel guides. Written from Finland, sources cited.",
  },
  fi: {
    headline: 'Lappi suoraan sähköpostiisi.',
    description: 'Revontulivaroituksia ennen kirkkaimpia öitä, lasi-iglujen varausikkunat ennen kuin paikat loppuvat ja kausivinkit. Kirjoitettu Suomesta, lähteet näkyvillä.',
  },
  de: {
    headline: 'Lappland direkt in Ihr Postfach, aus Finnland.',
    description: 'Polarlicht-Warnungen vor den klarsten Nächten, Glasiglu-Buchungsfenster, bevor alles ausverkauft ist, und saisonale Reiseguides. Aus Finnland, mit Quellen.',
  },
  ja: {
    headline: 'ラップランドを、フィンランドから直接お届け。',
    description: '晴天の夜が来る前のオーロラ予報、売り切れる前のガラスイグルー予約タイミング、季節ごとの旅行ガイド, フィンランド現地から、出典付きで。',
  },
  es: {
    headline: 'Laponia en tu bandeja, directo desde Finlandia.',
    description: 'Avisos de auroras antes de las noches más claras, ventanas de reserva de iglús de cristal antes de que se agoten y guías de temporada. Escrito desde Finlandia, con fuentes.',
  },
  'pt-BR': {
    headline: 'Lapônia direto na sua caixa, escrito da Finlândia.',
    description: 'Alertas de aurora antes das noites mais claras, janelas de reserva dos iglus de vidro antes de esgotarem e guias sazonais. Escrito da Finlândia, com fontes.',
  },
  'zh-CN': {
    headline: '拉普兰直达邮箱——来自芬兰第一手。',
    description: '晴朗夜晚来临前的极光预警、玻璃冰屋售罄前的预订窗口、按季节的旅行指南。来自芬兰本地编辑，出处清晰。',
  },
  ko: {
    headline: '라플란드 소식, 핀란드 현지에서 직접.',
    description: '맑은 밤이 오기 전 오로라 알림, 매진되기 전 글래스 이글루 예약 창, 계절별 여행 가이드. 핀란드 현지에서 작성, 출처 명시.',
  },
  fr: {
    headline: 'La Laponie dans votre boîte, direct de Finlande.',
    description: 'Alertes aurores avant les nuits les plus claires, fenêtres de réservation des igloos en verre avant qu\'ils ne se vendent et guides saisonniers. Écrit depuis la Finlande, sources citées.',
  },
  it: {
    headline: 'La Lapponia nella tua casella, dalla Finlandia.',
    description: 'Avvisi aurore prima delle notti più limpide, finestre di prenotazione degli igloo di vetro prima del tutto esaurito e guide stagionali. Scritto dalla Finlandia, con fonti.',
  },
  nl: {
    headline: 'Lapland in je inbox, rechtstreeks uit Finland.',
    description: 'Noorderlicht-meldingen vóór de helderste nachten, boekingsvensters voor glazen iglo\'s voordat ze uitverkocht zijn en seizoenreisgidsen. Geschreven vanuit Finland, met bronnen.',
  },
};

const LOCALE_DICTS: Record<SupportedLang, Required<NewsletterPopupDict>> = {
  en: {
    successHeadline: "You're in.",
    successBody: 'Check your inbox for a welcome email, and the next aurora alert when the forecast lights up.',
    alreadyHeadline: 'Already on the list!',
    alreadyBody: "Looks like you're already subscribed. We'll keep the Lapland updates coming.",
    emailPlaceholder: 'Your email address',
    submit: 'Get Lapland In My Inbox',
    loading: 'Subscribing…',
    later: 'Maybe later',
    closeAria: 'Close',
    closeLabel: 'Close',
    trust: 'Only when something is worth flagging. Unsubscribe any time. We never share your email.',
    errorGeneric: 'Subscription failed. Please try again.',
    codeLabel: 'Your subscriber code',
    codeFootnote: "Save this code. It's reserved for you across the #LaplandVibes network.",
    codeCopied: 'Copied!',
    codeCopyAria: 'Copy code to clipboard',
  },
  fi: {
    successHeadline: 'Olet listalla.',
    successBody: 'Tarkista sähköpostisi, tervetuloviesti on tulossa. Seuraavan revontulivaroituksen saat kun ennuste lupaa kirkasta yötä.',
    alreadyHeadline: 'Olit jo listalla.',
    alreadyBody: 'Tilauksesi oli jo voimassa. Lappi-päivitykset jatkuvat normaalisti.',
    emailPlaceholder: 'Sähköpostiosoitteesi',
    submit: 'Tilaa',
    loading: 'Tilataan…',
    later: 'Ehkä myöhemmin',
    closeAria: 'Sulje',
    closeLabel: 'Sulje',
    trust: 'Lähetämme vain silloin kun on jotain oikeasti kerrottavaa. Tilauksen voi perua koska tahansa. Sähköpostia ei jaeta kolmansille.',
    errorGeneric: 'Tilauksessa virhe. Yritä uudelleen.',
    codeLabel: 'Tilaajakoodisi',
    codeFootnote: 'Säilytä tämä koodi. Se on varattu sinulle koko #LaplandVibes-verkostossa.',
    codeCopied: 'Kopioitu!',
    codeCopyAria: 'Kopioi koodi leikepöydälle',
  },
  de: {
    successHeadline: 'Sie sind dabei.',
    successBody: 'Schauen Sie in Ihren Posteingang für eine Willkommens-E-Mail, und die nächste Polarlicht-Warnung, wenn die Prognose günstig steht.',
    alreadyHeadline: 'Schon auf der Liste!',
    alreadyBody: 'Sieht so aus, als wären Sie bereits abonniert. Die Lappland-Updates kommen weiter.',
    emailPlaceholder: 'Ihre E-Mail-Adresse',
    submit: 'Lappland abonnieren',
    loading: 'Anmeldung läuft…',
    later: 'Vielleicht später',
    closeAria: 'Schließen',
    closeLabel: 'Schließen',
    trust: 'Nur wenn etwas wirklich der Rede wert ist. Jederzeit kündbar. Wir teilen Ihre E-Mail nie.',
    errorGeneric: 'Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    codeLabel: 'Ihr Abonnentencode',
    codeFootnote: 'Bewahren Sie diesen Code auf, er ist für Sie im #LaplandVibes-Netzwerk reserviert.',
    codeCopied: 'Kopiert!',
    codeCopyAria: 'Code in die Zwischenablage kopieren',
  },
  ja: {
    successHeadline: '登録完了。',
    successBody: 'ようこそメールを受信トレイでご確認ください, Kp指数が上昇したら次のオーロラアラートをお届けします。',
    alreadyHeadline: 'すでに登録済みです!',
    alreadyBody: 'すでにご登録いただいているようです。ラップランドの最新情報を引き続きお届けします。',
    emailPlaceholder: 'メールアドレス',
    submit: '購読する',
    loading: '登録中…',
    later: 'あとで',
    closeAria: '閉じる',
    closeLabel: '閉じる',
    trust: '本当に価値のある時だけお届けします。いつでも解除可能。メールアドレスを第三者と共有しません。',
    errorGeneric: '登録に失敗しました。もう一度お試しください。',
    codeLabel: '購読者コード',
    codeFootnote: 'このコードを保存してください。#LaplandVibesネットワーク全体であなた専用に予約されています。',
    codeCopied: 'コピーしました!',
    codeCopyAria: 'コードをクリップボードにコピー',
  },
  es: {
    successHeadline: 'Estás dentro.',
    successBody: 'Revisa tu bandeja de entrada para el correo de bienvenida, y la próxima alerta de aurora cuando el Kp suba.',
    alreadyHeadline: '¡Ya estás en la lista!',
    alreadyBody: 'Parece que ya estás suscrito. Seguiremos enviándote las novedades de Laponia.',
    emailPlaceholder: 'Tu correo electrónico',
    submit: 'Suscribirme',
    loading: 'Suscribiendo…',
    later: 'Quizá más tarde',
    closeAria: 'Cerrar',
    closeLabel: 'Cerrar',
    trust: 'Solo cuando hay algo que merezca la pena. Cancela cuando quieras. Nunca compartimos tu correo.',
    errorGeneric: 'Suscripción fallida. Inténtalo de nuevo.',
    codeLabel: 'Tu código de suscriptor',
    codeFootnote: 'Guarda este código. Está reservado para ti en toda la red #LaplandVibes.',
    codeCopied: '¡Copiado!',
    codeCopyAria: 'Copiar el código al portapapeles',
  },
  'pt-BR': {
    successHeadline: 'Você está dentro.',
    successBody: 'Confira sua caixa de entrada para o e-mail de boas-vindas, e o próximo alerta de aurora quando o Kp subir.',
    alreadyHeadline: 'Já está na lista!',
    alreadyBody: 'Parece que você já está inscrito. Continuaremos enviando as atualizações da Lapônia.',
    emailPlaceholder: 'Seu e-mail',
    submit: 'Inscrever-se',
    loading: 'Inscrevendo…',
    later: 'Talvez depois',
    closeAria: 'Fechar',
    closeLabel: 'Fechar',
    trust: 'Apenas quando vale a pena destacar. Cancele a qualquer momento. Nunca compartilhamos seu e-mail.',
    errorGeneric: 'Falha na inscrição. Tente novamente.',
    codeLabel: 'Seu código de assinante',
    codeFootnote: 'Guarde este código. Ele está reservado para você em toda a rede #LaplandVibes.',
    codeCopied: 'Copiado!',
    codeCopyAria: 'Copiar código para a área de transferência',
  },
  'zh-CN': {
    successHeadline: '订阅成功。',
    successBody: '请查收欢迎邮件——以及下一次预报转好时的极光提醒。',
    alreadyHeadline: '您已在订阅列表中!',
    alreadyBody: '看来您已经订阅了。我们将继续为您发送拉普兰的最新动态。',
    emailPlaceholder: '您的邮箱地址',
    submit: '订阅',
    loading: '订阅中…',
    later: '稍后再说',
    closeAria: '关闭',
    closeLabel: '关闭',
    trust: '只在真正值得通知时发送。随时可取消。我们绝不分享您的邮箱。',
    errorGeneric: '订阅失败。请重试。',
    codeLabel: '您的订阅码',
    codeFootnote: '请保存此代码。它在整个 #LaplandVibes 网络中为您专属保留。',
    codeCopied: '已复制!',
    codeCopyAria: '复制代码到剪贴板',
  },
  ko: {
    successHeadline: '구독 완료.',
    successBody: '환영 이메일을 확인해 주세요, 다음 오로라 예보가 좋을 때 알림을 보내드립니다.',
    alreadyHeadline: '이미 구독 중입니다!',
    alreadyBody: '이미 구독하고 계신 것 같습니다. 라플란드 업데이트를 계속 보내드릴게요.',
    emailPlaceholder: '이메일 주소',
    submit: '구독하기',
    loading: '구독 중…',
    later: '나중에',
    closeAria: '닫기',
    closeLabel: '닫기',
    trust: '정말 가치 있는 소식만 보내드립니다. 언제든 해지 가능. 이메일을 공유하지 않습니다.',
    errorGeneric: '구독 실패. 다시 시도해 주세요.',
    codeLabel: '구독자 코드',
    codeFootnote: '이 코드를 저장하세요. #LaplandVibes 네트워크 전체에서 당신만을 위해 예약되어 있습니다.',
    codeCopied: '복사됨!',
    codeCopyAria: '코드를 클립보드에 복사',
  },
  fr: {
    successHeadline: 'C\'est fait.',
    successBody: 'Vérifiez votre boîte pour l\'e-mail de bienvenue, et la prochaine alerte aurore au pic du Kp.',
    alreadyHeadline: 'Déjà inscrit·e !',
    alreadyBody: 'Il semble que vous êtes déjà abonné·e. Nous continuons à envoyer les nouvelles de la Laponie.',
    emailPlaceholder: 'Votre adresse e-mail',
    submit: 'S\'abonner',
    loading: 'Inscription…',
    later: 'Peut-être plus tard',
    closeAria: 'Fermer',
    closeLabel: 'Fermer',
    trust: 'Uniquement quand cela vaut le coup. Désabonnement à tout moment. Nous ne partageons jamais votre e-mail.',
    errorGeneric: 'Inscription échouée. Veuillez réessayer.',
    codeLabel: 'Votre code d\'abonné',
    codeFootnote: 'Conservez ce code. Il vous est réservé sur tout le réseau #LaplandVibes.',
    codeCopied: 'Copié !',
    codeCopyAria: 'Copier le code dans le presse-papiers',
  },
  it: {
    successHeadline: 'Sei dentro.',
    successBody: 'Controlla la posta per l\'e-mail di benvenuto, e il prossimo avviso aurora quando le previsioni si fanno favorevoli.',
    alreadyHeadline: 'Sei già nella lista!',
    alreadyBody: 'Sembra che Lei sia già iscritto. Continueremo a inviarLe gli aggiornamenti dalla Lapponia.',
    emailPlaceholder: 'Il Suo indirizzo e-mail',
    submit: 'Iscriviti',
    loading: 'Iscrizione…',
    later: 'Forse più tardi',
    closeAria: 'Chiudi',
    closeLabel: 'Chiudi',
    trust: 'Solo quando c\'è qualcosa che vale davvero. Disiscrizione in qualsiasi momento. Non condividiamo mai la Sua e-mail.',
    errorGeneric: 'Iscrizione fallita. Riprovi.',
    codeLabel: 'Il Suo codice abbonato',
    codeFootnote: 'Salvi questo codice. È riservato a Lei in tutta la rete #LaplandVibes.',
    codeCopied: 'Copiato!',
    codeCopyAria: 'Copia il codice negli appunti',
  },
  nl: {
    successHeadline: 'U bent erbij.',
    successBody: 'Controleer uw inbox voor de welkomstmail, en de volgende noorderlicht-melding bij stijgende Kp.',
    alreadyHeadline: 'Al op de lijst!',
    alreadyBody: 'Het lijkt erop dat u al geabonneerd bent. We blijven u de Lapland-updates sturen.',
    emailPlaceholder: 'Uw e-mailadres',
    submit: 'Abonneren',
    loading: 'Bezig…',
    later: 'Misschien later',
    closeAria: 'Sluiten',
    closeLabel: 'Sluiten',
    trust: 'Alleen als het echt de moeite waard is. Op elk moment opzegbaar. We delen uw e-mail nooit.',
    errorGeneric: 'Abonneren mislukt. Probeer opnieuw.',
    codeLabel: 'Uw abonneecode',
    codeFootnote: 'Bewaar deze code. Hij is voor u gereserveerd in het hele #LaplandVibes-netwerk.',
    codeCopied: 'Gekopieerd!',
    codeCopyAria: 'Code naar klembord kopiëren',
  },
};

// Kept for back-compat with consumers that imported DEFAULT_DICT directly.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const DEFAULT_DICT: Required<NewsletterPopupDict> = LOCALE_DICTS.en;
void DEFAULT_DICT;

export default function NewsletterPopup({
  siteId,
  brandWord = 'VIBES',
  headline,
  description,
  dict,
  lang,
  onSubscribed,
  delaySeconds = 60,
  scrollPercent = 60,
  defaultOpen = false,
  endpoint,
  supabaseUrl,
  supabaseAnonKey,
}: NewsletterPopupProps) {
  // 2026-05-23: pick localized defaults when `lang` is supplied + caller
  // didn't override headline/description. Prevents EN copy on /fi /cn etc.
  const safeLang: SupportedLang = (lang && LOCALE_HEADLINES[lang]) ? lang : 'en';
  const localized = LOCALE_HEADLINES[safeLang];
  const resolvedHeadline = headline ?? localized.headline;
  const resolvedDescription = description ?? localized.description;
  const D = { ...LOCALE_DICTS[safeLang], ...(dict ?? {}) };
  const storageKey = `${siteId}_newsletter_popup`;
  // Per-session "already shown" guard (sessionStorage). Once the popup has
  // appeared once this browsing session it will NOT pop again on later page
  // views, even if the visitor never clicked dismiss (Vesa 2026-07-03: "ettei
  // joka sivulla tulisi vastaan, aika ärsyttävä"). Cleared when the browser
  // session ends. Layered on top of the localStorage dismiss (7 d) / subscribe.
  const sessionShownKey = `${siteId}_newsletter_shown`;
  const sourceTag = `${siteId}-popup`;

  const [status, setStatus] = useState<Status>(defaultOpen ? 'visible' : 'hidden');
  const [email, setEmail] = useState('');
  const [website, setWebsite] = useState(''); // honeypot, humans leave blank
  const [errorMsg, setErrorMsg] = useState('');
  const [discountCode, setDiscountCode] = useState<string | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (defaultOpen) return;
    if (SUPPRESSED_PATHS.includes(location.pathname)) return;

    const stored = readStored(storageKey);
    if (stored?.subscribed) return; // never show again after subscribe
    if (stored?.dismissed && Date.now() - stored.dismissed < REMIND_AFTER_MS) return;
    // Already shown once this session → do not re-arm on this (or any later)
    // page view. This is what stops it appearing on every page as you browse.
    try { if (sessionStorage.getItem(sessionShownKey)) return; } catch { /* private mode */ }

    let fired = false;
    const trigger = () => {
      if (fired) return;
      fired = true;
      try { sessionStorage.setItem(sessionShownKey, '1'); } catch { /* private mode */ }
      setStatus('visible');
    };

    const timer =
      delaySeconds > 0 ? window.setTimeout(trigger, delaySeconds * 1000) : 0;

    const onScroll = () => {
      if (scrollPercent <= 0) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const pct = (window.scrollY / total) * 100;
      if (pct >= scrollPercent) trigger();
    };
    if (scrollPercent > 0) {
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      if (timer) window.clearTimeout(timer);
      if (scrollPercent > 0) window.removeEventListener('scroll', onScroll);
    };
  }, [location.pathname, storageKey, sessionShownKey, defaultOpen, delaySeconds, scrollPercent]);

  // Esc to dismiss when visible
  useEffect(() => {
    if (status === 'hidden') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismiss();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Lock body scroll while open
  useEffect(() => {
    if (status === 'hidden') return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [status]);

  const dismiss = () => {
    writeStored(storageKey, { ...(readStored(storageKey) || {}), dismissed: Date.now() });
    setStatus('hidden');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');

    try {
      // Resolve URL + headers based on whether a proxy endpoint or direct
      // Supabase call is configured. Proxy doesn't need Authorization (the
      // server-side proxy injects it).
      const url = endpoint ?? `${supabaseUrl}/functions/v1/send-welcome-email`;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (!endpoint && supabaseAnonKey) {
        headers.Authorization = `Bearer ${supabaseAnonKey}`;
      }
      const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ email, source: sourceTag, website }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || D.errorGeneric);

      if (data.alreadySubscribed) {
        setStatus('already');
      } else {
        setStatus('success');
        if (typeof data.discountCode === 'string' && data.discountCode.length > 0) {
          setDiscountCode(data.discountCode);
        }
        onSubscribed?.(sourceTag);
      }
      writeStored(storageKey, { subscribed: Date.now() });
      setEmail('');
    } catch (err: any) {
      setErrorMsg(err?.message || D.errorGeneric);
      setStatus('error');
    }
  };

  if (status === 'hidden') return null;

  const isSuccess = status === 'success' || status === 'already';

  return (
    <div className="fixed inset-0 z-[9990] flex items-center justify-center px-4 py-8">
      {/* Backdrop */}
      <button
        type="button"
        aria-label={D.closeAria}
        onClick={dismiss}
        className="absolute inset-0 bg-deep-night/85 backdrop-blur-sm cursor-default"
      />

      {/* Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lv-newsletter-popup-title"
        className="relative max-w-md w-full bg-deep-night rounded-2xl shadow-2xl"
        style={{ border: '1px solid rgba(236,72,153,0.40)' }}
      >
        {/* Pink accent strip */}
        <div
          className="h-1 w-full rounded-t-2xl"
          style={{ background: 'linear-gradient(90deg, #EC4899 0%, #DB2777 50%, #BE185D 100%)' }}
          aria-hidden="true"
        />

        <button
          type="button"
          onClick={dismiss}
          aria-label={D.closeAria}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-snow/60 hover:text-snow hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Brand mark, adapts to current site */}
          <p className="font-heading tracking-wide text-2xl sm:text-3xl mb-4 leading-none">
            <span className="text-vibe-pink">#</span>
            <span className="text-snow">LAPLAND</span>
            <span className="text-vibe-pink">{brandWord}</span>
          </p>

          {isSuccess ? (
            <>
              <CheckCircle className="w-10 h-10 text-aurora-green mb-3" />
              <h2
                id="lv-newsletter-popup-title"
                className="font-heading text-2xl sm:text-3xl text-snow tracking-wide leading-tight mb-3"
              >
                {status === 'success' ? D.successHeadline : D.alreadyHeadline}
              </h2>
              <p className="text-snow/75 text-sm sm:text-base leading-relaxed mb-5">
                {status === 'success' ? D.successBody : D.alreadyBody}
              </p>

              {status === 'success' && discountCode && (
                <div
                  className="mb-6 rounded-xl px-5 py-4 text-center"
                  style={{
                    background: 'rgba(245,158,11,0.10)',
                    border: '1px solid rgba(245,158,11,0.40)',
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.22em] mb-2"
                    style={{ color: '#F59E0B' }}
                  >
                    {D.codeLabel}
                  </p>
                  <button
                    type="button"
                    aria-label={D.codeCopyAria}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(discountCode);
                        setCodeCopied(true);
                        window.setTimeout(() => setCodeCopied(false), 1800);
                      } catch {
                        // ignore, user can still read & copy the code
                      }
                    }}
                    className="font-heading text-2xl sm:text-[28px] tracking-[0.10em] text-snow leading-none cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    {discountCode}
                  </button>
                  <p className="text-[11px] text-snow/55 mt-3 leading-relaxed">
                    {codeCopied ? D.codeCopied : D.codeFootnote}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={dismiss}
                className="w-full px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-snow font-medium text-sm transition-colors cursor-pointer"
              >
                {D.closeLabel}
              </button>
            </>
          ) : (
            <>
              <h2
                id="lv-newsletter-popup-title"
                className="font-heading text-2xl sm:text-3xl text-snow tracking-wide leading-tight mb-3"
              >
                {resolvedHeadline}
              </h2>
              <p className="text-snow/75 text-sm sm:text-base leading-relaxed mb-5">
                {resolvedDescription}
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                {/* Honeypot: off-screen, not focusable, hidden from a11y tree. Bots fill it; humans never see it. */}
                <input
                  type="text"
                  name="website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={D.emailPlaceholder}
                  required
                  disabled={status === 'loading'}
                  autoComplete="email"
                  // 2026-05-12: switched from Tailwind `bg-white/8 text-snow` to
                  // explicit inline style, not every LV site (e.g. laplandvisit)
                  // defines the `snow` colour token in tailwind.config, which
                  // made the input render as pure white-on-white and invisible.
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    color: '#F8FAFC',
                    WebkitTextFillColor: '#F8FAFC',
                  }}
                  className="w-full px-5 py-3 rounded-full border border-white/15 focus:border-vibe-pink/60 focus:outline-none focus:ring-2 focus:ring-vibe-pink/25 disabled:opacity-50 placeholder:text-white/40"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-3 rounded-full bg-vibe-pink hover:bg-vibe-pink/90 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-vibe-pink/25 cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {D.loading}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> {D.submit}
                    </>
                  )}
                </button>
              </form>

              {status === 'error' && (
                <p className="mt-3 text-xs flex items-center justify-center gap-1.5 text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5" /> {errorMsg}
                </p>
              )}

              <button
                type="button"
                onClick={dismiss}
                className="mt-4 w-full text-center text-snow/60 hover:text-snow/75 text-xs transition-colors cursor-pointer"
              >
                {D.later}
              </button>

              <p className="mt-4 text-[11px] text-snow/60 text-center leading-relaxed">
                {D.trust}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
