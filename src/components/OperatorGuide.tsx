import { ExternalLink } from 'lucide-react';
import AffiliateCTA from './AffiliateCTA';
import { localizedOperators, matrixCategoryLabels, operatorLang, type Operator } from '../lib/operators';
import { useLang, type Lang, type CopyLang, copyLang } from '../i18n/useLang';

/**
 * GetYourGuide search per operator (Worker builds the resolving /s/?q= URL).
 * Measured 2026-09-11: a bare operator NAME returns GYG's generic "500+"
 * inventory (no supplier match), so the query names the operator's home base
 * and signature product instead — that is what lands the reader on the right
 * shelf. Verified counts: "northern lights Saariselka" 5, "reindeer sleigh
 * Levi" 205, "ice fishing Rovaniemi" 500+.
 */
const GYG_SEARCH: Record<string, string> = {
  'lapland-safaris': 'Rovaniemi snowmobile safari',
  'beyond-arctic': 'northern lights photography tour Rovaniemi',
  safartica: 'Rovaniemi husky safari',
  harriniva: 'husky safari Muonio',
  'nordic-unique': 'Rovaniemi day tours',
  'arctic-gm': 'northern lights hunting Rovaniemi',
  inghams: 'Saariselkä activities',
  'santas-lapland': 'Santa Claus Village Rovaniemi',
  tui: 'Levi activities',
  transun: 'Rovaniemi snowmobile',
  'magnetic-north': 'glass igloo Saariselkä',
  'nordic-visitor': 'Lapland tours',
};

const HEADINGS: Record<CopyLang, {
  eyebrow: string;
  h2: string;
  lead: string;
  visit: string;
  gyg: string;
  tier: string;
  length: string;
  departures: string;
  bases: string;
  bestFor: string;
  strongIn: string;
}> = {
  en: {
    eyebrow: 'Path two',
    h2: 'Or book a local operator',
    lead:
      'Six Finland-based companies that run Lapland’s activities themselves: husky, aurora, snowmobile, reindeer. What each does best, and where the matching tours are booked.',
    visit: 'Visit',
    gyg: 'See tours on GetYourGuide',
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
      'Kuusi Suomessa toimivaa yritystä, jotka pyörittävät Lapin aktiviteetit itse: husky, revontulet, kelkka, poro. Mitä kukin osaa parhaiten, ja mistä vastaavat retket varataan.',
    visit: 'Vieraile',
    gyg: 'Katso retkiä GetYourGuidessa',
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
      'Sechs Unternehmen aus Finnland, die Lapplands Aktivitäten selbst durchführen: Husky, Polarlicht, Schneemobil, Rentier. Was jedes am besten kann, und wo Sie die passenden Touren buchen.',
    visit: 'Besuchen',
    gyg: 'Touren auf GetYourGuide ansehen',
    tier: 'Klasse',
    length: 'Dauer',
    departures: 'Nächste Flughäfen',
    bases: 'Standorte',
    bestFor: 'Geeignet für',
    strongIn: 'Stark in',
  },
  ja: {
    eyebrow: 'ルート2',
    h2: '地元の会社に直接予約する',
    lead:
      'ラップランドのアクティビティを自社で運営するフィンランドの6社。ハスキー、オーロラ、スノーモービル、トナカイ。各社の得意分野と、該当ツアーの予約先。',
    visit: 'サイトを見る',
    gyg: 'GetYourGuideでツアーを見る',
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
      '라플란드 액티비티를 직접 운영하는 핀란드 회사 6곳: 허스키, 오로라, 스노모빌, 순록. 각 회사가 가장 잘하는 것과, 해당 투어를 예약하는 곳.',
    visit: '방문',
    gyg: 'GetYourGuide에서 투어 보기',
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
      'Six entreprises basées en Finlande qui exploitent elles-mêmes les activités de Laponie : huskys, aurores, motoneige, rennes. Ce que chacune fait de mieux, et où réserver les excursions correspondantes.',
    visit: 'Visiter',
    gyg: 'Voir les excursions sur GetYourGuide',
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
      'Sei aziende con sede in Finlandia che gestiscono in proprio le attività della Lapponia: husky, aurora, motoslitta, renne. Cosa fa meglio ciascuna, e dove si prenotano le escursioni corrispondenti.',
    visit: 'Visita',
    gyg: 'Vedi le escursioni su GetYourGuide',
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
      'Zes bedrijven uit Finland die de activiteiten in Lapland zelf uitvoeren: husky, noorderlicht, sneeuwscooter, rendier. Waar elk het beste in is, en waar u de bijbehorende tours boekt.',
    visit: 'Bezoeken',
    gyg: 'Tours bekijken op GetYourGuide',
    tier: 'Klasse',
    length: 'Duur',
    departures: 'Dichtstbijzijnde luchthaven',
    bases: 'Bases',
    bestFor: 'Geschikt voor',
    strongIn: 'Sterk in',
  },
  sv: {
    eyebrow: 'Väg 2',
    h2: 'Eller boka en lokal arrangör',
    lead:
      'Sex företag i Finland som driver Lapplands aktiviteter själva: husky, norrsken, skoter, ren. Vad var och en gör bäst, och var du bokar motsvarande turer.',
    visit: 'Besök',
    gyg: 'Se turer på GetYourGuide',
    tier: 'Prisklass',
    length: 'Längd',
    departures: 'Närmaste flygplats',
    bases: 'Baser',
    bestFor: 'Passar bäst',
    strongIn: 'Stark inom',
  },
  es: {
    eyebrow: 'Camino 2',
    h2: 'O reserve un operador local',
    lead:
      'Seis empresas con sede en Finlandia que operan ellas mismas las actividades de Laponia: huskies, auroras, motonieve, renos. En qué destaca cada una y dónde se reservan las excursiones correspondientes.',
    visit: 'Visitar',
    gyg: 'Ver excursiones en GetYourGuide',
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
      'Seis empresas sediadas na Finlândia que operam elas mesmas as atividades da Lapônia: huskies, aurora, snowmobile, renas. No que cada uma é melhor, e onde reservar os passeios correspondentes.',
    visit: 'Visitar',
    gyg: 'Ver passeios no GetYourGuide',
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
      '六家总部在芬兰、自行运营拉普兰活动的公司：哈士奇、极光、雪地摩托、驯鹿。各家最擅长什么，以及相应行程在哪里预订。',
    visit: '访问',
    gyg: '在 GetYourGuide 查看行程',
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
  const starLabels = matrixCategoryLabels[operatorLang(lang)];
  const imageLeft = index % 2 === 0;
  const aspect = index % 3 === 0 ? 'aspect-[4/3]' : 'aspect-[5/4]';

  return (
    <article className="relative grid grid-cols-12 gap-x-5 sm:gap-x-10 gap-y-6 py-16 sm:py-20 border-t border-white/8 first:border-t-0">
      {/* Image — a real photograph of the operator's home region (July 2026
          road trip), no longer a link: Vesa 11.9.2026, "ei me nyt ohjata
          minnekään ilman että siitä saadaan rahaa". */}
      <div
        className={`col-span-12 ${
          imageLeft ? 'sm:col-span-5 sm:order-1' : 'sm:col-span-5 sm:col-start-8 sm:order-2'
        } relative block ${aspect} overflow-hidden rounded-2xl bg-deep-night`}
      >
        <img
          src={op.image}
          alt={op.alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

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

        {/* The click that earns: the matching tours on GetYourGuide through
            the Worker (8 %, D1-logged). The operator's own site is named in
            the copy but not linked — no free referrals. */}
        <AffiliateCTA
          partner="activities"
          sid={`operators_${op.slug}_gyg`}
          gygSearch={GYG_SEARCH[op.slug] ?? 'Lapland activities Rovaniemi'}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-vibe-pink hover:bg-vibe-pink/90 text-white self-start font-body font-semibold transition-colors text-[15px]"
        >
          {labels.gyg}
          <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
        </AffiliateCTA>
      </div>
    </article>
  );
}

export default function OperatorGuide() {
  const lang = useLang();
  const c = HEADINGS[copyLang(lang)];
  const ops = localizedOperators(operatorLang(lang));
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
