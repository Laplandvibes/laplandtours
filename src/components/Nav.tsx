import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';
import EcosystemMenu from '../../../shared/EcosystemMenu';

const COPY: Record<Lang, { operators: string; practical: string; age: string; bespoke: string; cta: string; menu: string; close: string }> = {
  en: {
    operators: 'Operators',
    practical: 'Practical',
    age: 'Age guide',
    bespoke: 'Bespoke',
    cta: 'Plan my trip',
    menu: 'Open menu',
    close: 'Close menu',
  },
  fi: {
    operators: 'Matkanjärjestäjät',
    practical: 'Käytännön tieto',
    age: 'Ikäopas',
    bespoke: 'Räätälöity',
    cta: 'Suunnittele matka',
    menu: 'Avaa valikko',
    close: 'Sulje valikko',
  },
  de: {
    operators: 'Reise­veranstalter',
    practical: 'Praxis',
    age: 'Alters-Guide',
    bespoke: 'Individuell',
    cta: 'Reise planen',
    menu: 'Menü öffnen',
    close: 'Menü schließen',
  },
  ja: {
    operators: 'ツアー会社',
    practical: '実用情報',
    age: '年齢別ガイド',
    bespoke: 'カスタマイズ',
    cta: '旅程を計画',
    menu: 'メニューを開く',
    close: 'メニューを閉じる',
  },
  es: {
    operators: 'Operadoras',
    practical: 'Práctica',
    age: 'Edades',
    bespoke: 'Personalizado',
    cta: 'Planifique mi viaje',
    menu: 'Abrir menú',
    close: 'Cerrar menú',
  },
  'pt-BR': {
    operators: 'Operadoras',
    practical: 'Prática',
    age: 'Idades',
    bespoke: 'Personalizado',
    cta: 'Planeje minha viagem',
    menu: 'Abrir menu',
    close: 'Fechar menu',
  },
  'zh-CN': {
    operators: '旅行社',
    practical: '实用',
    age: '年龄指南',
    bespoke: '定制',
    cta: '规划我的旅程',
    menu: '打开菜单',
    close: '关闭菜单',
  },
  ko: {
    operators: '투어 운영사',
    practical: '실용 정보',
    age: '연령별 가이드',
    bespoke: '맞춤 패키지',
    cta: '여행 계획',
    menu: '메뉴 열기',
    close: '메뉴 닫기',
  },
  fr: {
    operators: 'Opérateurs',
    practical: 'Pratique',
    age: 'Guide par âge',
    bespoke: 'Sur mesure',
    cta: 'Planifier mon voyage',
    menu: 'Ouvrir le menu',
    close: 'Fermer le menu',
  },
  it: {
    operators: 'Operatori',
    practical: 'Pratica',
    age: 'Guida per età',
    bespoke: 'Su misura',
    cta: 'Pianifica il viaggio',
    menu: 'Apri il menù',
    close: 'Chiudi il menù',
  },
  nl: {
    operators: 'Touroperators',
    practical: 'Praktisch',
    age: 'Leeftijdsgids',
    bespoke: 'Maatwerk',
    cta: 'Plan mijn reis',
    menu: 'Menu openen',
    close: 'Menu sluiten',
  },
};

const LANG_PREFIX: Record<Lang, string> = {
  en: '', fi: 'fi', de: 'de', ja: 'ja',
  es: 'es', 'pt-BR': 'br', 'zh-CN': 'cn',
  ko: 'kr', fr: 'fr', it: 'it', nl: 'nl',
};

function Logo({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const textSize = size === 'lg' ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl';
  return (
    <span className={`font-heading tracking-wide ${textSize}`}>
      <span className="text-vibe-pink">#</span>
      <span className="text-snow">LAPLAND</span>
      <span className="text-vibe-pink">TOURS</span>
    </span>
  );
}

const LANG_OPTIONS: { code: Lang; label: string; native: string }[] = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'fi', label: 'FI', native: 'Suomi' },
  { code: 'de', label: 'DE', native: 'Deutsch' },
  { code: 'ja', label: 'JA', native: '日本語' },
  { code: 'es', label: 'ES', native: 'Español' },
  { code: 'pt-BR', label: 'BR', native: 'Português' },
  { code: 'zh-CN', label: 'CN', native: '中文' },
  { code: 'ko', label: 'KR', native: '한국어' },
  { code: 'fr', label: 'FR', native: 'Français' },
  { code: 'it', label: 'IT', native: 'Italiano' },
  { code: 'nl', label: 'NL', native: 'Nederlands' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang];

  useEffect(() => {
    if (!langOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setLangOpen(false); };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [langOpen]);

  const links = [
    { to: to('/lapland-holidays'), label: c.operators },
    { to: to('/practical-info'), label: c.practical },
    { to: to('/age-guide'), label: c.age },
    { to: to('/design-tour'), label: c.bespoke },
  ];

  const switchTo = (target: Lang) => {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('lv_locale_choice', target);
    }
    const path = location.pathname;
    let bare = path;
    if (path === '/fi' || path.startsWith('/fi/')) bare = path.replace(/^\/fi/, '') || '/';
    else if (path === '/de' || path.startsWith('/de/')) bare = path.replace(/^\/de/, '') || '/';
    else if (path === '/ja' || path.startsWith('/ja/')) bare = path.replace(/^\/ja/, '') || '/';
    else if (path === '/es' || path.startsWith('/es/')) bare = path.replace(/^\/es/, '') || '/';
    else if (path === '/br' || path.startsWith('/br/')) bare = path.replace(/^\/br/, '') || '/';
    else if (path === '/cn' || path.startsWith('/cn/')) bare = path.replace(/^\/cn/, '') || '/';
    else if (path === '/kr' || path.startsWith('/kr/')) bare = path.replace(/^\/kr/, '') || '/';
    else if (path === '/fr' || path.startsWith('/fr/')) bare = path.replace(/^\/fr/, '') || '/';
    else if (path === '/it' || path.startsWith('/it/')) bare = path.replace(/^\/it/, '') || '/';
    else if (path === '/nl' || path.startsWith('/nl/')) bare = path.replace(/^\/nl/, '') || '/';
    const prefix = LANG_PREFIX[target];
    if (!prefix) navigate(bare);
    else navigate(bare === '/' ? `/${prefix}` : `/${prefix}${bare}`);
  };

  const langButton = (target: Lang, label: string) => (
    <button
      key={target}
      onClick={() => switchTo(target)}
      className={`px-1.5 text-xs font-semibold tracking-wide transition-colors ${
        lang === target ? 'text-vibe-pink' : 'text-snow/85 hover:text-vibe-pink'
      }`}
      aria-pressed={lang === target}
    >
      {label}
    </button>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-deep-night/90 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-5 shrink-0">
          <EcosystemMenu lang={lang} currentDomain="laplandtours.online" />
          <Link to={to('/')} className="shrink-0" aria-label="LaplandTours home">
            <Logo size="sm" />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-5">
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`text-sm font-medium transition-colors ${
                  active ? 'text-vibe-pink' : 'text-snow/70 hover:text-vibe-pink'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="relative ml-1" ref={langRef}>
            <button
              type="button"
              onClick={() => setLangOpen((o) => !o)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Select language"
              className="bg-deep-night/85 backdrop-blur-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase border border-snow/40 text-snow/85 hover:border-vibe-pink hover:text-vibe-pink transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {LANG_OPTIONS.find((l) => l.code === lang)?.label ?? 'EN'}
              <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
            </button>
            {langOpen && (
              <ul
                role="listbox"
                aria-label="Select language"
                className="absolute right-0 top-full mt-2 min-w-[180px] py-1 bg-deep-night/95 backdrop-blur-md border border-white/15 rounded-lg shadow-xl z-50 max-h-[80vh] overflow-y-auto"
              >
                {LANG_OPTIONS.map((l) => {
                  const isActive = l.code === lang;
                  return (
                    <li key={l.code} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onClick={() => { switchTo(l.code); setLangOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors ${
                          isActive ? 'bg-vibe-pink/15 text-vibe-pink font-semibold' : 'text-snow/85 hover:bg-white/5 hover:text-snow'
                        }`}
                      >
                        <span className="w-8 text-xs font-semibold tracking-wide">{l.label}</span>
                        <span>{l.native}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <Link
            to={to('/design-tour')}
            className="ml-2 px-5 py-2 bg-vibe-pink hover:bg-vibe-pink/90 text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-vibe-pink/25"
          >
            {c.cta}
          </Link>
        </nav>

        <div className="lg:hidden flex items-center gap-2">
          <select
            value={lang}
            onChange={(e) => switchTo(e.target.value as Lang)}
            aria-label="Language"
            className="bg-deep-night/85 backdrop-blur-sm bg-transparent border border-snow/40 rounded px-2 py-1 text-xs font-semibold uppercase text-snow"
          >
            {LANG_OPTIONS.map((l) => (
              <option key={l.code} value={l.code} className="bg-deep-night text-snow">
                {l.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 text-snow/80 min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={open ? c.close : c.menu}
            aria-expanded={open}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="lg:hidden bg-deep-night border-t border-white/10 px-4 py-4 flex flex-col gap-1">
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)}
                className={`block px-3 py-3 text-base font-medium rounded-lg transition-colors ${
                  active
                    ? 'text-vibe-pink bg-white/5'
                    : 'text-snow/80 hover:text-vibe-pink hover:bg-white/5'
                }`}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex items-center flex-wrap gap-2 px-3 py-3 border-t border-white/10 mt-1" role="group" aria-label="Language">
            {LANG_OPTIONS.map((l, i) => (
              <span key={l.code} className="flex items-center gap-2">
                {i > 0 && <span className="text-snow/30 text-xs">·</span>}
                {langButton(l.code, l.label)}
              </span>
            ))}
          </div>
          <Link
            to={to('/design-tour')}
            onClick={() => setOpen(false)}
            className="mt-2 px-5 py-3 bg-vibe-pink text-white text-base font-semibold rounded-full text-center"
          >
            {c.cta}
          </Link>
        </nav>
      )}
    </header>
  );
}
