import {
  localizedOperators,
  matrixCategoryLabels,
  withUtm,
  type Operator,
} from '../lib/operators';
import { useLang, type CopyLang, copyLang } from '../i18n/useLang';

const COPY: Record<CopyLang, {
  h2Line1: string;
  meta: string;
  operator: string;
  tier: string;
  reviewedNote: string;
}> = {
  en: {
    h2Line1: 'Side by side',
    meta: 'Four dots = signature specialty  ·  one = competent  ·  em-dash = does not offer',
    operator: 'Operator',
    tier: 'Tier',
    reviewedNote: 'Editorial assessment · last reviewed May 2026',
  },
  fi: {
    h2Line1: 'Rinnan vertailu',
    meta: 'Neljä pistettä = erityisosaaminen  ·  yksi = kelvollinen  ·  viiva = ei tarjolla',
    operator: 'Matkanjärjestäjä',
    tier: 'Hintaluokka',
    reviewedNote: 'Toimituksellinen arvio · viimeksi tarkistettu heinäkuu 2026',
  },
  de: {
    h2Line1: 'Vergleich nebeneinander',
    meta: 'Vier Punkte = klare Spezialität  ·  einer = solide  ·  Strich = nicht im Angebot',
    operator: 'Reiseveranstalter',
    tier: 'Klasse',
    reviewedNote: 'Redaktionelle Einschätzung · zuletzt überprüft Juli 2026',
  },
  ja: {
    h2Line1: '横並びで比較',
    meta: '4つのドット = 得意分野  ·  1つ = 対応可能  ·  ダッシュ = 提供なし',
    operator: 'ツアー会社',
    tier: 'クラス',
    reviewedNote: '編集評価 · 最終確認2026年7月',
  },
  ko: {
    h2Line1: '나란히 비교',
    meta: '점 4개 = 대표 전문 분야  ·  1개 = 가능  ·  대시 = 미제공',
    operator: '운영사',
    tier: '가격대',
    reviewedNote: '편집 평가 · 최근 검토 2026년 7월',
  },
  fr: {
    h2Line1: 'Comparaison côte à côte',
    meta: 'Quatre points = spécialité phare  ·  un = compétent  ·  tiret = non proposé',
    operator: 'Voyagiste',
    tier: 'Gamme',
    reviewedNote: 'Évaluation éditoriale · dernier examen juillet 2026',
  },
  it: {
    h2Line1: 'Confronto fianco a fianco',
    meta: 'Quattro punti = specialità di punta  ·  uno = competente  ·  trattino = non offerto',
    operator: 'Tour operator',
    tier: 'Fascia',
    reviewedNote: 'Valutazione editoriale · ultima revisione luglio 2026',
  },
  nl: {
    h2Line1: 'Naast elkaar vergelijken',
    meta: 'Vier stippen = specialiteit  ·  één = vakbekwaam  ·  streep = niet aangeboden',
    operator: 'Reisorganisatie',
    tier: 'Klasse',
    reviewedNote: 'Redactionele beoordeling · laatst herzien juli 2026',
  },
  es: {
    h2Line1: 'Una al lado de otra',
    meta: 'Cuatro puntos = especialidad propia  ·  uno = competente  ·  raya = no lo ofrece',
    operator: 'Operador',
    tier: 'Gama',
    reviewedNote: 'Valoración editorial · última revisión julio de 2026',
  },
  'pt-BR': {
    h2Line1: 'Lado a lado',
    meta: 'Quatro pontos = especialidade própria  ·  um = competente  ·  travessão = não oferece',
    operator: 'Operadora',
    tier: 'Categoria',
    reviewedNote: 'Avaliação editorial · última revisão julho de 2026',
  },
  'zh-CN': {
    h2Line1: '并排对比',
    meta: '四个圆点 = 招牌专长  ·  一个 = 能胜任  ·  破折号 = 不提供',
    operator: '运营商',
    tier: '档位',
    reviewedNote: '编辑评估 · 最近复核 2026 年 7 月',
  },
};

function Stars({ n, max = 4 }: { n: number; max?: number }) {
  if (n === 0) {
    return (
      <span className="text-snow/25 font-mono text-sm" aria-label="not offered">
        —
      </span>
    );
  }
  return (
    <span className="inline-flex gap-0.5" aria-label={`${n} of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < n ? 'bg-vibe-pink' : 'bg-snow/12'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export default function OperatorMatrix() {
  const lang = useLang();
  const c = COPY[copyLang(lang)];
  const ops: Operator[] = localizedOperators(copyLang(lang));
  const starLabels = matrixCategoryLabels[copyLang(lang)];
  const orderedKeys: Array<keyof Operator['stars']> = [
    'family',
    'aurora',
    'husky',
    'snowmobile',
    'glassIgloo',
    'selfDrive',
    'luxury',
  ];
  return (
    <section className="bg-deeper-night py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <header className="mb-10 sm:mb-14">
          <h2 className="font-heading tracking-tight leading-[0.92] text-snow text-5xl sm:text-7xl break-words hyphens-auto">
            {c.h2Line1}
          </h2>
          <p className="cap-meta mt-4">{c.meta}</p>
        </header>

        <div className="-mx-6 sm:mx-0 overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="text-snow/80">
                <th
                  scope="col"
                  className="cap-meta !tracking-[0.18em] py-4 pl-6 sm:pl-0 pr-6 sticky left-0 bg-deeper-night z-10 align-bottom"
                >
                  {c.operator}
                </th>
                {orderedKeys.map((k) => (
                  <th
                    key={k}
                    scope="col"
                    className="cap-meta !tracking-[0.18em] py-4 px-3 align-bottom whitespace-nowrap"
                  >
                    {starLabels[k]}
                  </th>
                ))}
                <th
                  scope="col"
                  className="cap-meta !tracking-[0.18em] py-4 px-3 pr-6 sm:pr-0 align-bottom text-right"
                >
                  {c.tier}
                </th>
              </tr>
            </thead>
            <tbody>
              {ops.map((op) => (
                <tr key={op.slug} className="border-t border-white/8 hover:bg-white/[0.02] transition-colors">
                  <th
                    scope="row"
                    className="py-5 pl-6 sm:pl-0 pr-6 sticky left-0 bg-deeper-night z-10 align-middle font-normal"
                  >
                    <a
                      href={withUtm(op.url, op.slug)}
                      target="_blank"
                      rel="sponsored nofollow noopener"
                      className="block group"
                    >
                      <span className="font-heading text-snow tracking-wide text-2xl group-hover:text-vibe-pink transition-colors block leading-none">
                        {op.name}
                      </span>
                      <span className="text-snow/75 text-xs font-body mt-1 block">{op.tagline}</span>
                    </a>
                  </th>
                  {orderedKeys.map((k) => (
                    <td key={k} className="py-5 px-3 align-middle">
                      <Stars n={op.stars[k]} />
                    </td>
                  ))}
                  <td className="py-5 px-3 pr-6 sm:pr-0 align-middle text-right font-body text-snow/85 text-[13px] italic whitespace-nowrap">
                    {op.tierLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="cap-meta mt-6">{c.reviewedNote}</p>
      </div>
    </section>
  );
}
