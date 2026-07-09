import { useState, useEffect, useRef, useMemo } from 'react';
import { LayoutGrid, ChevronDown, ArrowUpRight, MapPin } from 'lucide-react';

/**
 * EcosystemMenu — the network jump-menu that sits to the LEFT of the logo on
 * every ecosystem site (Vesa 2026-07-03). One glass dropdown, all sites A→Z,
 * jump anywhere; the current site is pinned first as "you are here".
 *
 * SHARED across all 26 sites, so it is THEME-INDEPENDENT: brand colours are
 * inline hex (not Tailwind tokens like `text-snow`/`bg-deep-night`, which are
 * NOT defined on every site — same reason the shared Footer uses inline hex).
 * Only geometry utilities (flex, rounded, px…) use Tailwind. Hover lives in the
 * scoped <style> block. Pass `lang` (locale string) + `currentDomain` per site.
 */

const PINK = '#EC4899';
const SNOW = '#F9FAFB';
const NIGHT = '15, 23, 42';       // deep-night rgb
const PINK_RGB = '236, 72, 153';

type Cat = 'stay' | 'activity' | 'food' | 'transport' | 'season' | 'shopping' | 'guide' | 'hub';

const CAT_RGB: Record<Cat, string> = {
  stay: '236, 72, 153',       // vibe pink
  activity: '6, 182, 212',    // arctic cyan
  food: '249, 115, 22',       // orange
  transport: '147, 197, 253', // sky blue
  season: '52, 211, 153',     // aurora green
  shopping: '167, 139, 250',  // violet
  guide: '34, 211, 238',      // cyan-bright
  hub: '236, 72, 153',        // pink
};

interface Site { domain: string; cat: Cat; fi: string; en: string }

// Alphabetised at render by the active-locale name. Names bilingual (fi/en);
// other locales fall back to EN for now.
const SITES: Site[] = [
  { domain: 'laplandvibes.com',        cat: 'hub',       fi: 'Pääsivu (verkoston keskus)', en: 'Hub (network home)' },
  { domain: 'stayinlapland.com',       cat: 'stay',      fi: 'Majoitus Lapissa',           en: 'Stay in Lapland' },
  { domain: 'laplandstays.com',        cat: 'stay',      fi: 'Mökit ja majoitus',          en: 'Cabins & stays' },
  { domain: 'laplandhoteldeals.com',   cat: 'stay',      fi: 'Hotellitarjoukset',          en: 'Hotel deals' },
  { domain: 'laplandluxuryvillas.com', cat: 'stay',      fi: 'Luksushuvilat',              en: 'Luxury villas' },
  { domain: 'laplandhuskysafaris.com', cat: 'activity',  fi: 'Huskysafarit',               en: 'Husky safaris' },
  { domain: 'laplandsnowmobile.com',   cat: 'activity',  fi: 'Moottorikelkkailu',          en: 'Snowmobiling' },
  { domain: 'laplandskiresorts.com',   cat: 'activity',  fi: 'Laskettelu ja hiihtokeskukset', en: 'Ski resorts' },
  { domain: 'laplandactivities.fi',cat: 'activity',  fi: 'Tekeminen ja retket',        en: 'Activities & tours' },
  { domain: 'laplandtours.online',     cat: 'activity',  fi: 'Opastetut retket',           en: 'Guided tours' },
  { domain: 'laplandkids.com',         cat: 'activity',  fi: 'Perhematkailu',              en: 'Family travel' },
  { domain: 'laplanddining.com',       cat: 'food',      fi: 'Ravintolat',                 en: 'Dining' },
  { domain: 'laplandfood.com',         cat: 'food',      fi: 'Ruoka ja lähiruoka',         en: 'Food & local produce' },
  { domain: 'laplandbars.com',         cat: 'food',      fi: 'Baarit ja pienpanimot',      en: 'Bars & breweries' },
  { domain: 'laplandtransport.com',    cat: 'transport', fi: 'Kuljetus',                   en: 'Transport' },
  { domain: 'laplandcarrental.com',    cat: 'transport', fi: 'Autovuokraus',               en: 'Car rental' },
  { domain: 'laplandflights.fi',       cat: 'transport', fi: 'Lennot Lappiin',             en: 'Flights to Lapland' },
  { domain: 'laplandchristmas.com',    cat: 'season',    fi: 'Joulu',                      en: 'Christmas' },
  { domain: 'laplandwellness.com',     cat: 'season',    fi: 'Hyvinvointi ja kylpylät',    en: 'Wellness & spa' },
  { domain: 'laplandnightlife.com',    cat: 'season',    fi: 'Yöelämä',                    en: 'Nightlife' },
  { domain: 'laplandweddings.online',  cat: 'season',    fi: 'Häät',                       en: 'Weddings' },
  { domain: 'laplandgifts.com',        cat: 'shopping',  fi: 'Lahjat ja matkamuistot',     en: 'Gifts & souvenirs' },
  { domain: 'laplanddeals.com',        cat: 'shopping',  fi: 'Tarjoukset',                 en: 'Deals & offers' },
  { domain: 'laplandstore.fi',         cat: 'shopping',  fi: 'Verkkokauppa',               en: 'Store' },
  { domain: 'laplandvisit.com',        cat: 'guide',     fi: 'Matkaopas',                  en: 'Travel guide' },
  { domain: 'laplandnature.com',       cat: 'guide',     fi: 'Luonto ja kansallispuistot', en: 'Nature & parks' },
  { domain: 'laplandwork.com',         cat: 'guide',     fi: 'Työ Lapissa',                en: 'Work in Lapland' },
];

const NAME_I18N: Record<string, Record<string, string>> = {"laplandvibes.com":{"de":"Zentrale (Netzwerk-Start)","ja":"ハブ (ネットワークの拠点)","es":"Portal (centro de la red)","pt-BR":"Central (início da rede)","zh-CN":"主站 (网络中心)","ko":"허브 (네트워크 홈)","fr":"Accueil (centre du réseau)","it":"Hub (centro della rete)","nl":"Hub (netwerkcentrum)"},"stayinlapland.com":{"de":"Übernachten in Lappland","ja":"ラップランドで泊まる","es":"Alojamiento en Laponia","pt-BR":"Hospedagem na Lapônia","zh-CN":"拉普兰住宿","ko":"라플란드 숙박","fr":"Séjour en Laponie","it":"Soggiorno in Lapponia","nl":"Verblijf in Lapland"},"laplandstays.com":{"de":"Hütten & Unterkünfte","ja":"コテージと宿泊","es":"Cabañas y alojamiento","pt-BR":"Chalés e hospedagem","zh-CN":"小木屋与住宿","ko":"오두막과 숙소","fr":"Chalets et hébergements","it":"Chalet e alloggi","nl":"Hutten & verblijven"},"laplandhoteldeals.com":{"de":"Hotelangebote","ja":"ホテルのお得情報","es":"Ofertas de hoteles","pt-BR":"Ofertas de hotéis","zh-CN":"酒店优惠","ko":"호텔 특가","fr":"Offres d'hôtels","it":"Offerte hotel","nl":"Hotelaanbiedingen"},"laplandluxuryvillas.com":{"de":"Luxusvillen","ja":"ラグジュアリーヴィラ","es":"Villas de lujo","pt-BR":"Vilas de luxo","zh-CN":"豪华别墅","ko":"럭셔리 빌라","fr":"Villas de luxe","it":"Ville di lusso","nl":"Luxe villa's"},"laplandhuskysafaris.com":{"de":"Husky-Safaris","ja":"ハスキーサファリ","es":"Safaris con huskies","pt-BR":"Safáris com huskies","zh-CN":"哈士奇雪橇之旅","ko":"허스키 사파리","fr":"Safaris en husky","it":"Safari con husky","nl":"Husky-safari's"},"laplandsnowmobile.com":{"de":"Schneemobilfahren","ja":"スノーモービル","es":"Motos de nieve","pt-BR":"Passeios de snowmobile","zh-CN":"雪地摩托","ko":"스노모빌","fr":"Motoneige","it":"Motoslitta","nl":"Sneeuwscooteren"},"laplandskiresorts.com":{"de":"Skigebiete","ja":"スキーリゾート","es":"Estaciones de esquí","pt-BR":"Estações de esqui","zh-CN":"滑雪度假村","ko":"스키 리조트","fr":"Stations de ski","it":"Stazioni sciistiche","nl":"Skigebieden"},"laplandactivities.fi":{"de":"Aktivitäten & Touren","ja":"アクティビティとツアー","es":"Actividades y excursiones","pt-BR":"Atividades e passeios","zh-CN":"活动与游览","ko":"액티비티와 투어","fr":"Activités et excursions","it":"Attività ed escursioni","nl":"Activiteiten & tours"},"laplandtours.online":{"de":"Geführte Touren","ja":"ガイドツアー","es":"Tours guiados","pt-BR":"Passeios guiados","zh-CN":"导览行程","ko":"가이드 투어","fr":"Visites guidées","it":"Tour guidati","nl":"Begeleide tours"},"laplanddining.com":{"de":"Essen gehen","ja":"レストラン","es":"Restaurantes","pt-BR":"Restaurantes","zh-CN":"餐饮","ko":"다이닝","fr":"Restaurants","it":"Ristoranti","nl":"Uit eten"},"laplandfood.com":{"de":"Essen & regionale Produkte","ja":"食と地元の食材","es":"Gastronomía y productos locales","pt-BR":"Comida e produtos locais","zh-CN":"美食与当地特产","ko":"음식과 로컬 식재료","fr":"Cuisine et produits locaux","it":"Cibo e prodotti locali","nl":"Eten & streekproducten"},"laplandbars.com":{"de":"Bars & Brauereien","ja":"バーとブルワリー","es":"Bares y cervecerías","pt-BR":"Bares e cervejarias","zh-CN":"酒吧与啤酒厂","ko":"바와 브루어리","fr":"Bars et brasseries","it":"Bar e birrifici","nl":"Bars & brouwerijen"},"laplandtransport.com":{"de":"Transport","ja":"交通","es":"Transporte","pt-BR":"Transporte","zh-CN":"交通","ko":"교통","fr":"Transport","it":"Trasporti","nl":"Vervoer"},"laplandcarrental.com":{"de":"Autovermietung","ja":"レンタカー","es":"Alquiler de coches","pt-BR":"Aluguel de carros","zh-CN":"租车","ko":"렌터카","fr":"Location de voiture","it":"Autonoleggio","nl":"Autoverhuur"},"laplandchristmas.com":{"de":"Weihnachten","ja":"クリスマス","es":"Navidad","pt-BR":"Natal","zh-CN":"圣诞","ko":"크리스마스","fr":"Noël","it":"Natale","nl":"Kerstmis"},"laplandwellness.com":{"de":"Wellness & Spa","ja":"ウェルネスとスパ","es":"Bienestar y spa","pt-BR":"Bem-estar e spa","zh-CN":"养生与水疗","ko":"웰니스와 스파","fr":"Bien-être et spa","it":"Benessere e spa","nl":"Wellness & spa"},"laplandnightlife.com":{"de":"Nachtleben","ja":"ナイトライフ","es":"Vida nocturna","pt-BR":"Vida noturna","zh-CN":"夜生活","ko":"나이트라이프","fr":"Vie nocturne","it":"Vita notturna","nl":"Uitgaansleven"},"laplandweddings.online":{"de":"Hochzeiten","ja":"ウェディング","es":"Bodas","pt-BR":"Casamentos","zh-CN":"婚礼","ko":"웨딩","fr":"Mariages","it":"Matrimoni","nl":"Bruiloften"},"laplandgifts.com":{"de":"Geschenke & Souvenirs","ja":"ギフトとお土産","es":"Regalos y recuerdos","pt-BR":"Presentes e lembranças","zh-CN":"礼品与纪念品","ko":"선물과 기념품","fr":"Cadeaux et souvenirs","it":"Regali e souvenir","nl":"Cadeaus & souvenirs"},"laplanddeals.com":{"de":"Angebote & Deals","ja":"セールとお得情報","es":"Ofertas y promociones","pt-BR":"Ofertas e promoções","zh-CN":"优惠与特价","ko":"할인과 특가","fr":"Bons plans et offres","it":"Offerte e promozioni","nl":"Deals & aanbiedingen"},"laplandstore.fi":{"de":"Onlineshop","ja":"オンラインストア","es":"Tienda online","pt-BR":"Loja online","zh-CN":"在线商店","ko":"온라인 스토어","fr":"Boutique en ligne","it":"Negozio online","nl":"Webshop"},"laplandvisit.com":{"de":"Reiseführer","ja":"旅行ガイド","es":"Guía de viaje","pt-BR":"Guia de viagem","zh-CN":"旅行指南","ko":"여행 가이드","fr":"Guide de voyage","it":"Guida di viaggio","nl":"Reisgids"},"laplandnature.com":{"de":"Natur & Nationalparks","ja":"自然と国立公園","es":"Naturaleza y parques","pt-BR":"Natureza e parques","zh-CN":"自然与国家公园","ko":"자연과 국립공원","fr":"Nature et parcs","it":"Natura e parchi","nl":"Natuur & parken"},"laplandkids.com":{"de":"Familienreisen","ja":"家族旅行","es":"Viajes en familia","pt-BR":"Viagens em família","zh-CN":"亲子旅行","ko":"가족 여행","fr":"Voyages en famille","it":"Viaggi in famiglia","nl":"Gezinsreizen"},"laplandflights.fi":{"de":"Flüge nach Lappland","ja":"ラップランドへの航空券","es":"Vuelos a Laponia","pt-BR":"Voos para a Lapônia","zh-CN":"飞往拉普兰的航班","ko":"라플란드행 항공편","fr":"Vols vers la Laponie","it":"Voli per la Lapponia","nl":"Vluchten naar Lapland"},"laplandwork.com":{"de":"Arbeiten in Lappland","ja":"ラップランドで働く","es":"Trabajar en Laponia","pt-BR":"Trabalhar na Lapônia","zh-CN":"在拉普兰工作","ko":"라플란드에서 일하기","fr":"Travailler en Laponie","it":"Lavorare in Lapponia","nl":"Werken in Lapland"}};
const CHROME_I18N: Record<string, Record<string, string>> = {"label":{"de":"Netzwerk","ja":"ネットワーク","es":"Red","pt-BR":"Rede","zh-CN":"站点网络","ko":"네트워크","fr":"Réseau","it":"Rete","nl":"Netwerk"},"heading":{"de":"Das gesamte Lappland-Netzwerk","ja":"ラップランド・ネットワーク全体","es":"Toda la red de Laponia","pt-BR":"Toda a rede da Lapônia","zh-CN":"整个拉普兰站点网络","ko":"라플란드 네트워크 전체","fr":"Tout le réseau Laponie","it":"Tutta la rete Lapponia","nl":"Het hele Lapland-netwerk"},"here":{"de":"Sie sind hier","ja":"現在のページ","es":"Estás aquí","pt-BR":"Você está aqui","zh-CN":"当前位置","ko":"현재 위치","fr":"Vous êtes ici","it":"Sei qui","nl":"U bent hier"},"jump":{"de":"Zu einer Seite wechseln","ja":"サイトへ移動","es":"Ir a un sitio","pt-BR":"Ir para um site","zh-CN":"前往站点","ko":"사이트로 이동","fr":"Aller sur un site","it":"Vai a un sito","nl":"Ga naar een site"}};

interface Props {
  /** Domain of the site this menu is mounted on; marked "you are here". */
  currentDomain?: string;
  /** Active locale (e.g. 'fi', 'en', 'de'). Passed by the site Nav. */
  lang?: string;
  /** Header tone. 'light' = for sites with a white/light header (laplandgifts). */
  variant?: 'dark' | 'light';
}

export default function EcosystemMenu({ currentDomain = 'laplandvibes.com', lang, variant = 'dark' }: Props) {
  const isFi = lang?.toLowerCase().startsWith('fi');
  const [open, setOpen] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // Normalise the locale to the i18n keys (de/ja/es/pt-BR/zh-CN/ko/fr/it/nl);
  // en/fi fall through to the inline base names.
  const L = (() => {
    const l = (lang || '').toLowerCase();
    if (l.startsWith('pt')) return 'pt-BR';
    if (l.startsWith('zh')) return 'zh-CN';
    return l;
  })();
  const siteName = (s: Site) => NAME_I18N[s.domain]?.[L] ?? (isFi ? s.fi : s.en);
  const chrome = (k: string, fi: string, en: string) => CHROME_I18N[k]?.[L] ?? (isFi ? fi : en);

  const label = chrome('label', 'Verkosto', 'Network');
  const heading = chrome('heading', 'Koko Lapland-verkosto', 'The whole Lapland network');
  const hereLabel = chrome('here', 'Olet tässä', 'You are here');
  const jumpLabel = chrome('jump', 'Siirry sivustolle', 'Jump to a site');

  // Current site pinned FIRST, then everyone else A→Z.
  const { current, others } = useMemo(() => {
    const others = SITES.filter((s) => s.domain !== currentDomain)
      .sort((a, b) => siteName(a).localeCompare(siteName(b), isFi ? 'fi' : 'en'));
    return { current: SITES.find((s) => s.domain === currentDomain), others };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFi, currentDomain, L]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative shrink-0">
      <style>{`
        @keyframes lvEcoPop{from{opacity:0;transform:translateY(-6px) scale(.98)}to{opacity:1;transform:none}}
        .lv-eco-pop{animation:lvEcoPop .16s ease-out}
        .lv-eco-row:hover{background:rgba(255,255,255,.07)}
        .lv-eco-row:hover .lv-eco-arrow{color:${PINK}}
        @media(prefers-reduced-motion:reduce){.lv-eco-pop{animation:none}}
      `}</style>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setBtnHover(true)}
        onMouseLeave={() => setBtnHover(false)}
        aria-haspopup="true"
        aria-expanded={open}
        aria-label={heading}
        className="group flex items-center gap-1.5 rounded-full border px-2.5 sm:px-3 py-1.5 backdrop-blur-sm transition-all duration-200"
        style={(() => {
          const active = open || btnHover;
          return variant === 'light'
            ? { background: active ? 'rgba(236,72,153,0.08)' : 'rgba(15,23,42,0.05)', borderColor: active ? 'rgba(236,72,153,0.55)' : 'rgba(15,23,42,0.22)', color: active ? PINK : 'rgba(15,23,42,0.78)' }
            : { background: active ? 'rgba(236,72,153,0.14)' : 'rgba(255,255,255,0.10)', borderColor: active ? 'rgba(236,72,153,0.55)' : 'rgba(255,255,255,0.32)', color: SNOW };
        })()}
      >
        <LayoutGrid className="w-4 h-4" strokeWidth={2.3} aria-hidden="true" style={{ color: PINK }} />
        <span className="hidden sm:inline font-heading text-sm tracking-widest uppercase" style={{ textShadow: variant === 'light' ? 'none' : '0 1px 6px rgba(0,0,0,0.6)' }}>{label}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {open && (
        <div
          role="menu"
          className="lv-eco-pop absolute left-0 top-[calc(100%+10px)] z-50 w-[min(92vw,540px)] origin-top-left rounded-2xl border backdrop-blur-xl p-4 sm:p-5"
          style={{ background: `rgba(${NIGHT},0.96)`, borderColor: 'rgba(255,255,255,0.12)', color: SNOW, boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 30px 70px -24px rgba(0,0,0,0.85), 0 0 60px -30px rgba(236,72,153,0.5)' }}
        >
          <div className="flex items-center gap-2 mb-3 px-1">
            <span className="font-heading tracking-wide text-lg" style={{ color: SNOW }}>
              <span style={{ color: PINK }}>#</span>LAPLAND<span style={{ color: PINK }}>VIBES</span>
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold" style={{ color: 'rgba(249,250,251,0.45)' }}>{heading}</span>
          </div>
          <div className="h-px mb-3" style={{ background: `linear-gradient(to right, rgba(${PINK_RGB},0.4), rgba(255,255,255,0.1), transparent)` }} />

          {current && (
            <div className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 mb-3 border" style={{ borderColor: `rgba(${PINK_RGB},0.3)`, background: `rgba(${PINK_RGB},0.07)` }} aria-current="page">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: `rgb(${CAT_RGB[current.cat]})`, boxShadow: `0 0 8px rgba(${CAT_RGB[current.cat]},0.8)` }} aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold leading-tight truncate" style={{ color: SNOW }}>{siteName(current)}</span>
                <span className="block font-mono text-[10.5px] leading-tight truncate" style={{ color: 'rgba(249,250,251,0.45)' }}>{current.domain}</span>
              </span>
              <span className="shrink-0 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider" style={{ background: PINK, color: '#fff' }}>
                <MapPin className="w-2.5 h-2.5" strokeWidth={2.4} aria-hidden="true" />{hereLabel}
              </span>
            </div>
          )}

          <p className="px-1 mb-1.5 text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: 'rgba(249,250,251,0.4)' }}>
            {jumpLabel}
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-0.5 max-h-[min(56vh,420px)] overflow-y-auto pr-1">
            {others.map((s) => {
              const rgb = CAT_RGB[s.cat];
              const name = siteName(s);
              return (
                <li key={s.domain} role="none">
                  <a
                    href={`https://${s.domain}`}
                    target="_blank"
                    rel="noopener"
                    role="menuitem"
                    className="lv-eco-row flex items-start gap-2.5 rounded-lg px-2 py-2 transition-colors"
                  >
                    <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 8px rgba(${rgb},0.7)` }} aria-hidden="true" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13.5px] font-semibold leading-tight truncate" style={{ color: SNOW }}>{name}</span>
                      <span className="block font-mono text-[10.5px] leading-tight truncate" style={{ color: 'rgba(249,250,251,0.45)' }}>{s.domain}</span>
                    </span>
                    <ArrowUpRight className="lv-eco-arrow mt-0.5 w-3.5 h-3.5 shrink-0 transition-colors" strokeWidth={2.2} aria-hidden="true" style={{ color: 'rgba(249,250,251,0.3)' }} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
