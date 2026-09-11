import { Route, ArrowUpRight } from 'lucide-react';
import { useLang, useHtmlLang, LANG_TO_PREFIX, type CopyLang, copyLang } from '../i18n/useLang';

/**
 * DriveToLapland — "Tulossa autolla?" (Vesa 11.9.2026: "aja lappiin osiota
 * voisi linkata tänne jos joku ajaa autolla").
 *
 * The five road-trip guides live on the hub (laplandvibes.com) under
 * /drive-to-lapland*, in all 12 languages with the SAME locale prefixes this
 * site uses (/fi, /de, /ja, /es, /br, /cn, /kr, /fr, /it, /nl, /sv — measured
 * 2026-09-11: /kr/… is 200, /ko/… is 404). Hub routes 308-redirect to a
 * trailing slash, so the slash is part of the URL here.
 *
 * Distances are the hub's own figures (EN source pages, 2026-09-11) — the
 * only numbers on this surface, so the number gate (no figure the EN source
 * does not carry) holds by construction. Formatted per locale at render.
 *
 * Not affiliate: these are network-internal links, so they carry Umami
 * `data-umami-event` attributes (the D1 click log only sees Worker routes).
 */

type RouteKey = 'west' | 'east' | 'central' | 'sweden' | 'norway';

const ROUTES: Array<{ key: RouteKey; slug: string; km: number }> = [
  { key: 'west', slug: 'drive-to-lapland', km: 1182 },
  { key: 'east', slug: 'drive-to-lapland-east', km: 1204 },
  { key: 'central', slug: 'drive-to-lapland-central', km: 1073 },
  { key: 'sweden', slug: 'drive-to-lapland-via-sweden', km: 1028 },
  { key: 'norway', slug: 'drive-to-lapland-arctic-norway', km: 1022 },
];

const OVERVIEW_SLUG = 'blog/drive-to-lapland-by-car';

const COPY: Record<CopyLang, {
  eyebrow: string;
  h2: string;
  lead: string;
  cta: string;
  overview: string;
  routes: Record<RouteKey, { title: string; sub: string }>;
}> = {
  en: {
    eyebrow: 'Coming by car',
    h2: 'Drive up. Five mapped routes.',
    lead:
      'Bringing your own car, or picking one up in the south? The LaplandVibes road-trip guides walk each route stop by stop: where to sleep, where to eat, where to stretch your legs.',
    cta: 'See the route',
    overview: 'All five routes in one article',
    routes: {
      west: { title: 'West coast', sub: 'Helsinki → Levi' },
      east: { title: 'Eastern lakes', sub: 'Helsinki → Saariselkä' },
      central: { title: 'Central route', sub: 'Helsinki → Ylläs' },
      sweden: { title: 'Via Sweden, on the E4', sub: 'Stockholm → Tornio' },
      norway: { title: 'On to Arctic Norway', sub: 'Levi → the Lofoten Islands' },
    },
  },
  fi: {
    eyebrow: 'Tulossa autolla',
    h2: 'Aja Lappiin. Viisi valmiiksi ajettua reittiä.',
    lead:
      'Omalla autolla vai etelästä vuokratulla? LaplandVibesin reittioppaat käyvät jokaisen reitin läpi pysähdys pysähdykseltä: missä nukkua, missä syödä, missä jaloitella.',
    cta: 'Katso reitti',
    overview: 'Kaikki viisi reittiä yhdessä artikkelissa',
    routes: {
      west: { title: 'Länsirannikko', sub: 'Helsinki → Levi' },
      east: { title: 'Itäreitti', sub: 'Helsinki → Saariselkä' },
      central: { title: 'Keskireitti', sub: 'Helsinki → Ylläs' },
      sweden: { title: 'Ruotsin kautta E4-tietä', sub: 'Tukholma → Tornio' },
      norway: { title: 'Jatko Arktiseen Norjaan', sub: 'Levi → Lofootit' },
    },
  },
  de: {
    eyebrow: 'Mit dem Auto',
    h2: 'Hinauffahren. Fünf ausgearbeitete Routen.',
    lead:
      'Mit dem eigenen Wagen oder einem Mietwagen aus dem Süden? Die Roadtrip-Guides von LaplandVibes gehen jede Route Halt für Halt durch: wo Sie schlafen, wo Sie essen, wo Sie sich die Beine vertreten.',
    cta: 'Route ansehen',
    overview: 'Alle fünf Routen in einem Artikel',
    routes: {
      west: { title: 'Westküste', sub: 'Helsinki → Levi' },
      east: { title: 'Ostroute', sub: 'Helsinki → Saariselkä' },
      central: { title: 'Mittlere Route', sub: 'Helsinki → Ylläs' },
      sweden: { title: 'Über Schweden auf der E4', sub: 'Stockholm → Tornio' },
      norway: { title: 'Weiter nach Nordnorwegen', sub: 'Levi → Lofoten' },
    },
  },
  ja: {
    eyebrow: '車で来る',
    h2: '北へドライブ。道順つきの5ルート。',
    lead:
      'マイカーで、または南部で借りたレンタカーで。LaplandVibesのロードトリップガイドは、各ルートを立ち寄り地点ごとに案内します。どこで泊まり、どこで食べ、どこで体を伸ばすか。',
    cta: 'ルートを見る',
    overview: '5つのルートを1つの記事で',
    routes: {
      west: { title: '西海岸ルート', sub: 'ヘルシンキ → レヴィ' },
      east: { title: '東ルート', sub: 'ヘルシンキ → サーリセルカ' },
      central: { title: '中央ルート', sub: 'ヘルシンキ → ユッラス' },
      sweden: { title: 'スウェーデン経由（E4）', sub: 'ストックホルム → トルニオ' },
      norway: { title: 'ノルウェー北部へ', sub: 'レヴィ → ロフォーテン諸島' },
    },
  },
  ko: {
    eyebrow: '자동차로 오신다면',
    h2: '북쪽으로 달리기. 정리된 다섯 경로.',
    lead:
      '직접 차를 몰고 오거나 남부에서 렌터카를 빌리시나요? LaplandVibes 로드트립 가이드가 각 경로를 정차지마다 안내합니다. 어디서 자고, 어디서 먹고, 어디서 쉬어 갈지.',
    cta: '경로 보기',
    overview: '다섯 경로를 한 글에서',
    routes: {
      west: { title: '서해안 경로', sub: '헬싱키 → 레비' },
      east: { title: '동부 경로', sub: '헬싱키 → 사리셀카' },
      central: { title: '중앙 경로', sub: '헬싱키 → 윌래스' },
      sweden: { title: '스웨덴 경유 (E4)', sub: '스톡홀름 → 토르니오' },
      norway: { title: '노르웨이 북부로', sub: '레비 → 로포텐 제도' },
    },
  },
  fr: {
    eyebrow: 'En voiture',
    h2: 'Monter en voiture. Cinq itinéraires balisés.',
    lead:
      'Avec votre propre voiture ou une location prise dans le sud ? Les guides road trip de LaplandVibes détaillent chaque itinéraire étape par étape : où dormir, où manger, où se dégourdir les jambes.',
    cta: 'Voir l’itinéraire',
    overview: 'Les cinq itinéraires dans un seul article',
    routes: {
      west: { title: 'Côte ouest', sub: 'Helsinki → Levi' },
      east: { title: 'Route de l’est', sub: 'Helsinki → Saariselkä' },
      central: { title: 'Route centrale', sub: 'Helsinki → Ylläs' },
      sweden: { title: 'Par la Suède, sur la E4', sub: 'Stockholm → Tornio' },
      norway: { title: 'Vers la Norvège arctique', sub: 'Levi → les îles Lofoten' },
    },
  },
  it: {
    eyebrow: 'In auto',
    h2: 'Salire in auto. Cinque itinerari tracciati.',
    lead:
      'Con la Sua auto o con un’auto a noleggio presa al sud? Le guide road trip di LaplandVibes seguono ogni itinerario tappa per tappa: dove dormire, dove mangiare, dove sgranchirsi le gambe.',
    cta: 'Vedi l’itinerario',
    overview: 'Tutti e cinque gli itinerari in un solo articolo',
    routes: {
      west: { title: 'Costa occidentale', sub: 'Helsinki → Levi' },
      east: { title: 'Via orientale', sub: 'Helsinki → Saariselkä' },
      central: { title: 'Via centrale', sub: 'Helsinki → Ylläs' },
      sweden: { title: 'Attraverso la Svezia, sulla E4', sub: 'Stoccolma → Tornio' },
      norway: { title: 'Verso la Norvegia artica', sub: 'Levi → le isole Lofoten' },
    },
  },
  nl: {
    eyebrow: 'Met de auto',
    h2: 'Naar boven rijden. Vijf uitgewerkte routes.',
    lead:
      'Met uw eigen auto of een huurauto uit het zuiden? De roadtripgidsen van LaplandVibes lopen elke route stop voor stop door: waar u slaapt, waar u eet, waar u de benen strekt.',
    cta: 'Bekijk de route',
    overview: 'Alle vijf routes in één artikel',
    routes: {
      west: { title: 'Westkust', sub: 'Helsinki → Levi' },
      east: { title: 'Oostelijke route', sub: 'Helsinki → Saariselkä' },
      central: { title: 'Centrale route', sub: 'Helsinki → Ylläs' },
      sweden: { title: 'Via Zweden, over de E4', sub: 'Stockholm → Tornio' },
      norway: { title: 'Door naar Noord-Noorwegen', sub: 'Levi → de Lofoten' },
    },
  },
  sv: {
    eyebrow: 'Kommer du med bil',
    h2: 'Kör upp. Fem färdiga rutter.',
    lead:
      'Med egen bil eller en hyrbil från söder? LaplandVibes roadtrip-guider går igenom varje rutt stopp för stopp: var du sover, var du äter, var du sträcker på benen.',
    cta: 'Se rutten',
    overview: 'Alla fem rutterna i en artikel',
    routes: {
      west: { title: 'Västkusten', sub: 'Helsingfors → Levi' },
      east: { title: 'Östra rutten', sub: 'Helsingfors → Saariselkä' },
      central: { title: 'Mellersta rutten', sub: 'Helsingfors → Ylläs' },
      sweden: { title: 'Via Sverige längs E4', sub: 'Stockholm → Torneå' },
      norway: { title: 'Vidare till Nordnorge', sub: 'Levi → Lofoten' },
    },
  },
  es: {
    eyebrow: 'Si viene en coche',
    h2: 'Subir en coche. Cinco rutas trazadas.',
    lead:
      '¿Con su propio coche o con uno alquilado en el sur? Las guías de road trip de LaplandVibes recorren cada ruta parada a parada: dónde dormir, dónde comer, dónde estirar las piernas.',
    cta: 'Ver la ruta',
    overview: 'Las cinco rutas en un solo artículo',
    routes: {
      west: { title: 'Costa oeste', sub: 'Helsinki → Levi' },
      east: { title: 'Ruta oriental', sub: 'Helsinki → Saariselkä' },
      central: { title: 'Ruta central', sub: 'Helsinki → Ylläs' },
      sweden: { title: 'Por Suecia, por la E4', sub: 'Estocolmo → Tornio' },
      norway: { title: 'Hacia la Noruega ártica', sub: 'Levi → las islas Lofoten' },
    },
  },
  'pt-BR': {
    eyebrow: 'Vindo de carro',
    h2: 'Subir de carro. Cinco rotas mapeadas.',
    lead:
      'Com o próprio carro ou com um alugado no sul? Os guias de road trip da LaplandVibes percorrem cada rota parada por parada: onde dormir, onde comer, onde esticar as pernas.',
    cta: 'Ver a rota',
    overview: 'As cinco rotas em um só artigo',
    routes: {
      west: { title: 'Costa oeste', sub: 'Helsinque → Levi' },
      east: { title: 'Rota leste', sub: 'Helsinque → Saariselkä' },
      central: { title: 'Rota central', sub: 'Helsinque → Ylläs' },
      sweden: { title: 'Pela Suécia, na E4', sub: 'Estocolmo → Tornio' },
      norway: { title: 'Rumo à Noruega ártica', sub: 'Levi → as ilhas Lofoten' },
    },
  },
  'zh-CN': {
    eyebrow: '自驾前来',
    h2: '一路向北。五条已规划好的路线。',
    lead:
      '开自己的车，还是在南部租车？LaplandVibes 的自驾指南逐站讲解每条路线：在哪里住、在哪里吃、在哪里下车活动。',
    cta: '查看路线',
    overview: '一篇文章看完五条路线',
    routes: {
      west: { title: '西海岸线', sub: '赫尔辛基 → 莱维' },
      east: { title: '东线', sub: '赫尔辛基 → 萨利色尔卡' },
      central: { title: '中线', sub: '赫尔辛基 → 于莱斯' },
      sweden: { title: '经瑞典（E4 公路）', sub: '斯德哥尔摩 → 托尔尼奥' },
      norway: { title: '继续北上挪威', sub: '莱维 → 罗弗敦群岛' },
    },
  },
};

function hubUrl(lang: CopyLang, slug: string): string {
  const prefix = LANG_TO_PREFIX[lang];
  return `https://laplandvibes.com/${prefix ? `${prefix}/` : ''}${slug}/`;
}

export default function DriveToLapland() {
  const lang = useLang();
  const c = COPY[copyLang(lang)];
  const bcp47 = useHtmlLang();
  const km = new Intl.NumberFormat(bcp47, { maximumFractionDigits: 0 });

  return (
    <section id="drive" className="bg-deep-night py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <header className="lg:col-span-4">
          <p className="cap-meta">{c.eyebrow}</p>
          <h2 className="mt-2 font-heading tracking-wide leading-[0.95] text-snow text-4xl sm:text-5xl [text-wrap:balance]">
            {c.h2}
          </h2>
          <p className="mt-5 text-snow/70 font-body text-base sm:text-lg leading-relaxed max-w-md">
            {c.lead}
          </p>
          <a
            href={hubUrl(lang, OVERVIEW_SLUG)}
            data-umami-event="drive_overview_click"
            className="mt-6 inline-flex items-center gap-2 text-snow border-b border-snow/40 hover:border-vibe-pink hover:text-vibe-pink pb-1 font-body font-medium transition-colors"
          >
            <Route className="w-4 h-4 text-arctic-cyan" strokeWidth={1.6} aria-hidden="true" />
            <span>{c.overview}</span>
          </a>
        </header>

        <ol className="lg:col-span-8 lg:col-start-5 border-t border-white/10">
          {ROUTES.map((r, i) => {
            const t = c.routes[r.key];
            return (
              <li key={r.key} className="border-b border-white/10">
                <a
                  href={hubUrl(lang, r.slug)}
                  data-umami-event="drive_route_click"
                  data-umami-event-route={r.key}
                  className="group flex items-center gap-4 sm:gap-6 py-4 sm:py-5 hover:bg-white/[0.03] transition-colors -mx-3 px-3"
                >
                  <span className="font-mono text-[12px] tracking-[0.08em] text-snow/45 w-6 shrink-0">
                    0{i + 1}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className="block font-heading tracking-wide text-snow text-xl sm:text-2xl leading-tight group-hover:text-vibe-pink transition-colors">
                      {t.title}
                    </span>
                    {/* Endpoints never break mid-name: at 375 px the ja/ko/zh
                        lines wrapped inside "サーリセルカ" (measured 2026-09-11),
                        so each end is an unbreakable unit and the line folds
                        only at the arrow. */}
                    <span className="block mt-0.5 text-snow/65 font-body text-[14px] sm:text-[15px]">
                      {t.sub.split(' → ').map((part, j, arr) => (
                        <span key={j}>
                          <span className="whitespace-nowrap">{part}</span>
                          {j < arr.length - 1 ? ' → ' : ''}
                        </span>
                      ))}
                    </span>
                  </span>
                  <span className="font-mono text-[12px] sm:text-[13px] tracking-[0.04em] text-snow/70 whitespace-nowrap shrink-0">
                    ~{km.format(r.km)} km
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[13px] font-body font-medium text-arctic-cyan group-hover:text-vibe-pink transition-colors shrink-0">
                    {c.cta}
                    <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <ArrowUpRight className="sm:hidden w-4 h-4 text-arctic-cyan shrink-0" strokeWidth={1.6} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
