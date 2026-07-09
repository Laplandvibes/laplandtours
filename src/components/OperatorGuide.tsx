import { ExternalLink } from 'lucide-react';
import { localizedOperators, withUtm, matrixCategoryLabels, type Operator } from '../lib/operators';
import { useLang, type Lang, type CopyLang, copyLang } from '../i18n/useLang';

const HEADINGS: Record<CopyLang, {
  eyebrow: string;
  h2: string;
  lead: string;
  visit: string;
  tier: string;
  length: string;
  departures: string;
  bases: string;
  bestFor: string;
  strongIn: string;
}> = {
  en: {
    eyebrow: 'Path two',
    h2: 'Or buy a bundle',
    lead:
      'Six tour operators that fly UK and European travellers to Finnish Lapland on ready-made packages. There is no commercial agreement with any of them. This is editorial signposting, not a storefront. Updated every six months.',
    visit: 'Visit',
    tier: 'Tier',
    length: 'Length',
    departures: 'Departures',
    bases: 'Bases',
    bestFor: 'Best for',
    strongIn: 'Strong in',
  },
  fi: {
    eyebrow: 'Polku 2',
    h2: 'Tai varaa paikallinen toimija',
    lead:
      'Kuusi Suomessa toimivaa yritystä, jotka pyörittävät Lapin aktiviteetit itse — husky, revontulet, kelkka, poro. Varaat suoraan heidän ehdoillaan; yhdenkään kanssa ei ole kaupallista sopimusta. Kyseessä on toimituksellinen opas, ei kauppapaikka. Tarkistettu heinäkuu 2026. Kirjoitettu Suomesta, lähteet näkyvillä.',
    visit: 'Vieraile',
    tier: 'Hintaluokka',
    length: 'Kesto',
    departures: 'Lähin kenttä',
    bases: 'Tukikohdat',
    bestFor: 'Sopii parhaiten',
    strongIn: 'Vahva osa-alue',
  },
  de: {
    eyebrow: 'Weg zwei',
    h2: 'Oder einen lokalen Anbieter buchen',
    lead:
      'Sechs in Finnland ansässige Anbieter, die Lapplands Aktivitäten selbst durchführen — Husky, Polarlicht, Schneemobil, Rentier. Sie buchen direkt zu deren Bedingungen; mit keinem besteht eine Geschäftsbeziehung. Dies ist ein redaktioneller Wegweiser, kein Shop. Überprüft im Juli 2026.',
    visit: 'Besuchen',
    tier: 'Klasse',
    length: 'Dauer',
    departures: 'Nächster Flughafen',
    bases: 'Standorte',
    bestFor: 'Geeignet für',
    strongIn: 'Stark in',
  },
  ja: {
    eyebrow: 'ルート2',
    h2: '地元の会社に直接予約する',
    lead:
      'ラップランドのアクティビティを自ら運営する、フィンランドを拠点とする6社をご紹介します。ハスキー、オーロラ、スノーモービル、トナカイ。各社の条件で直接予約でき、いずれとも商業的な提携はありません。これは編集による道しるべであり、販売窓口ではありません。2026年7月確認。',
    visit: 'サイトを見る',
    tier: 'クラス',
    length: '日数',
    departures: '最寄り空港',
    bases: '拠点',
    bestFor: 'おすすめ',
    strongIn: '得意分野',
  },
  ko: {
    eyebrow: '경로 2',
    h2: '또는 현지 운영사에 직접 예약',
    lead:
      '라플란드의 액티비티를 직접 운영하는, 핀란드에 기반을 둔 여섯 곳을 소개합니다. 허스키, 오로라, 스노모빌, 순록. 각 업체의 조건으로 직접 예약하며, 누구와도 상업적 제휴는 없습니다. 이것은 편집 가이드이지 판매 창구가 아닙니다. 2026년 7월 확인.',
    visit: '방문',
    tier: '가격대',
    length: '일정',
    departures: '가까운 공항',
    bases: '거점',
    bestFor: '추천 대상',
    strongIn: '강점 분야',
  },
  fr: {
    eyebrow: 'Voie 2',
    h2: 'Ou réservez un opérateur local',
    lead:
      'Six opérateurs établis en Finlande qui exploitent eux-mêmes les activités de Laponie — husky, aurore, motoneige, renne. Vous réservez directement, à leurs conditions ; aucun accord commercial avec aucun d\'eux. Il s\'agit d\'un repérage éditorial, pas d\'une boutique. Vérifié en juillet 2026.',
    visit: 'Visiter',
    tier: 'Gamme',
    length: 'Durée',
    departures: 'Aéroport le plus proche',
    bases: 'Bases',
    bestFor: 'Convient à',
    strongIn: 'Points forts',
  },
  it: {
    eyebrow: 'Strada 2',
    h2: 'O prenota un operatore locale',
    lead:
      'Sei operatori con sede in Finlandia che gestiscono in prima persona le attività della Lapponia — husky, aurora, motoslitta, renna. Prenoti direttamente, alle loro condizioni; con nessuno vi è un accordo commerciale. È una guida editoriale, non una vetrina. Verificato a luglio 2026.',
    visit: 'Visita',
    tier: 'Fascia',
    length: 'Durata',
    departures: 'Aeroporto più vicino',
    bases: 'Basi',
    bestFor: 'Indicato per',
    strongIn: 'Punto forte',
  },
  nl: {
    eyebrow: 'Route 2',
    h2: 'Of boek een lokale aanbieder',
    lead:
      'Zes in Finland gevestigde aanbieders die de activiteiten van Lapland zelf uitvoeren — husky, aurora, sneeuwscooter, rendier. U boekt rechtstreeks, op hun voorwaarden; met geen van hen is een commerciële afspraak. Dit is redactionele wegwijzering, geen winkel. Gecontroleerd in juli 2026.',
    visit: 'Bezoeken',
    tier: 'Klasse',
    length: 'Duur',
    departures: 'Dichtstbijzijnde luchthaven',
    bases: 'Bases',
    bestFor: 'Geschikt voor',
    strongIn: 'Sterk in',
  },
  es: {
    eyebrow: 'Camino 2',
    h2: 'O reserve un operador local',
    lead:
      'Seis operadores con sede en Finlandia que gestionan ellos mismos las actividades de Laponia — husky, aurora, motonieve, reno. Reserva directamente, según sus condiciones; no hay acuerdo comercial con ninguno. Es una guía editorial, no una tienda. Revisado en julio de 2026.',
    visit: 'Visitar',
    tier: 'Gama',
    length: 'Duración',
    departures: 'Aeropuerto más cercano',
    bases: 'Bases',
    bestFor: 'Ideal para',
    strongIn: 'Fuertes en',
  },
  'pt-BR': {
    eyebrow: 'Caminho 2',
    h2: 'Ou reserve uma operadora local',
    lead:
      'Seis operadoras sediadas na Finlândia que conduzem elas mesmas as atividades da Lapônia — husky, aurora, snowmobile, rena. Você reserva direto, segundo os termos delas; não há acordo comercial com nenhuma. É uma orientação editorial, não uma loja. Revisado em julho de 2026.',
    visit: 'Visitar',
    tier: 'Categoria',
    length: 'Duração',
    departures: 'Aeroporto mais próximo',
    bases: 'Bases',
    bestFor: 'Ideal para',
    strongIn: 'Fortes em',
  },
  'zh-CN': {
    eyebrow: '路线 2',
    h2: '或直接预订本地运营商',
    lead:
      '六家总部设在芬兰、自行运营拉普兰活动的公司——哈士奇、极光、雪地摩托、驯鹿。你按它们的条款直接预订；我们与其中任何一家都没有商业协议。这是编辑性的指引，而非购物商店。2026 年 7 月核实。',
    visit: '访问',
    tier: '档位',
    length: '时长',
    departures: '最近机场',
    bases: '基地',
    bestFor: '适合',
    strongIn: '强项',
  },
};

/**
 * Honest operator profiles. Paragraph-form (not bullet-card). Image
 * alternates left/right per row, aspect varies (4/3 or 5/4) to break the
 * card-grid look. Marginal item number 01–06 in the LEFT outer margin on
 * desktop, like a printed catalog.
 *
 * No fake badges, no invented product names, no "Most Popular" labels —
 * we have no commercial relationship with any of these operators.
 */

function StarRow({ value, max = 4 }: { value: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} of ${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className={`w-1.5 h-1.5 rounded-full ${i < value ? 'bg-vibe-pink' : 'bg-snow/15'}`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function OperatorRow({ op, index, eager, lang }: { op: Operator; index: number; eager?: boolean; lang: Lang }) {
  const labels = HEADINGS[copyLang(lang)];
  const starLabels = matrixCategoryLabels[copyLang(lang)];
  const imageLeft = index % 2 === 0;
  const aspect = index % 3 === 0 ? 'aspect-[4/3]' : 'aspect-[5/4]';

  return (
    <article className="relative grid grid-cols-12 gap-x-5 sm:gap-x-10 gap-y-6 py-16 sm:py-20 border-t border-white/8 first:border-t-0">
      {/* Image */}
      <a
        href={withUtm(op.url, op.slug)}
        target="_blank"
        rel="sponsored nofollow noopener"
        aria-label={`Visit ${op.name}`}
        className={`col-span-12 ${
          imageLeft ? 'sm:col-span-5 sm:order-1' : 'sm:col-span-5 sm:col-start-8 sm:order-2'
        } relative block ${aspect} overflow-hidden bg-deep-night`}
      >
        <img
          src={op.image}
          alt={op.alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </a>

      {/* Body */}
      <div
        className={`col-span-12 ${
          imageLeft ? 'sm:col-span-7 sm:order-2' : 'sm:col-span-7 sm:col-start-1 sm:row-start-1 sm:order-1'
        } flex flex-col`}
      >
        <p className="cap-meta mb-3 lg:hidden">{op.basedIn}</p>
        <p className="cap-meta mb-3 hidden lg:block">{op.basedIn}</p>

        <h3 className="font-heading text-snow tracking-tight leading-[0.92] text-4xl sm:text-5xl lg:text-6xl mb-3">
          {op.name}
        </h3>

        <p className="text-vibe-pink font-body italic text-base sm:text-lg mb-6 max-w-2xl">
          {op.tagline}
        </p>

        {/* Editorial paragraph — runs as one block instead of bullet-card */}
        <p className="text-snow/75 font-body text-[15.5px] sm:text-base leading-[1.8] mb-6 max-w-2xl">
          {op.whatTheyDoWell}{' '}
          <span className="text-snow/75">{op.whatTheyDont}</span>
        </p>

        {/* Spec rail — flat data, no card boxes */}
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 mb-7 max-w-2xl text-[14px]">
          <dt className="cap-meta self-center">{labels.tier}</dt>
          <dd className="text-snow/85 font-body italic">{op.tierLabel}</dd>
          <dt className="cap-meta self-center">{labels.length}</dt>
          <dd className="text-snow/85 font-body">{op.typicalLength}</dd>
          <dt className="cap-meta self-center">{labels.departures}</dt>
          <dd className="text-snow/85 font-mono text-[13px]">{op.departures.join(' · ')}</dd>
          <dt className="cap-meta self-center">{labels.bases}</dt>
          <dd className="text-snow/85 font-body">{op.bases.join(', ')}</dd>
          <dt className="cap-meta self-center">{labels.bestFor}</dt>
          <dd className="text-snow/85 font-body italic">{op.bestFor}</dd>
        </dl>

        {/* Star strengths — inline horizontal */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-7 max-w-2xl">
          <span className="cap-meta">{labels.strongIn}</span>
          {(['family', 'aurora', 'glassIgloo', 'luxury', 'selfDrive'] as const).map((k) => (
            <span key={k} className="inline-flex items-center gap-2 text-snow/65 text-[13px] font-body">
              <StarRow value={op.stars[k]} />
              <span>{starLabels[k]}</span>
            </span>
          ))}
        </div>

        <a
          href={withUtm(op.url, op.slug)}
          target="_blank"
          rel="sponsored nofollow noopener"
          className="inline-flex items-center gap-2 text-snow hover:text-vibe-pink border-b border-snow/40 hover:border-vibe-pink pb-1 self-start font-body font-medium transition-colors text-[15px]"
        >
          {labels.visit} {op.domain}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}

export default function OperatorGuide() {
  const lang = useLang();
  const c = HEADINGS[copyLang(lang)];
  const ops = localizedOperators(copyLang(lang));
  return (
    <section id="operators" className="bg-deep-night pt-20 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
        <header className="mb-12 sm:mb-16 max-w-[820px]">
          <p className="cap-meta">{c.eyebrow}</p>
          <h2 className="mt-2 font-heading tracking-tight leading-[0.92] text-snow text-5xl sm:text-7xl break-words hyphens-auto [text-wrap:balance]">
            {c.h2}
          </h2>
          <p className="mt-5 text-snow/80 font-body text-base sm:text-lg leading-relaxed max-w-2xl">
            {c.lead}
          </p>
        </header>

        <div>
          {ops.map((op, idx) => (
            <OperatorRow key={op.slug} op={op} index={idx} eager={idx === 0} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}
