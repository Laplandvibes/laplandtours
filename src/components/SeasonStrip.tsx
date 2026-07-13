/**
 * 12-month season heat map. Three rows (aurora chance / snow cover / price
 * tier) × 12 columns (Jan–Dec). Replaces the generic 6-card "Find Your
 * Style" theme grid with a specific data view a real travel brand would
 * publish.
 *
 * Heat is rendered as opacity on a single accent (vibe-pink for price,
 * arctic-cyan for aurora, snow for snow cover) — no rainbow charts, no
 * Lucide icons.
 */

import { useLang, type CopyLang, copyLang } from '../i18n/useLang';

const MONTHS_BY_LANG: Record<CopyLang, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fi: ['Tam', 'Hel', 'Maa', 'Huh', 'Tou', 'Kes', 'Hei', 'Elo', 'Syy', 'Lok', 'Mar', 'Jou'],
  de: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
  ja: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  ko: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  fr: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'],
  it: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
  nl: ['Jan', 'Feb', 'Mrt', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'],
  sv: ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec'],
  es: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  'pt-BR': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  'zh-CN': ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
};

const COPY: Record<CopyLang, {
  h2Line1: string;
  meta: string;
  aurora: string;
  snow: string;
  price: string;
  bestAurora: string;
  bestAuroraMonth: string;
  bestAuroraBody: string;
  cheapestWinter: string;
  cheapestWinterMonth: string;
  cheapestWinterBody: string;
  cheapestOverall: string;
  cheapestOverallMonth: string;
  cheapestOverallBody: string;
}> = {
  en: {
    h2Line1: 'When to go',
    meta: 'Aurora · Snow · Price tier  ·  January through December',
    aurora: 'Aurora',
    snow: 'Snow',
    price: 'Price tier',
    bestAurora: 'Best aurora-to-price',
    bestAuroraMonth: 'February',
    bestAuroraBody:
      "Aurora chance peaks while school holidays haven't started; operators discount the second-half-of-Feb weeks 15–25 % vs Christmas.",
    cheapestWinter: 'Cheapest winter',
    cheapestWinterMonth: 'Late March',
    cheapestWinterBody:
      'Snow cover holds, daylight returns, prices fall. Husky and snowmobile activities still on. Worst aurora odds of the winter season.',
    cheapestOverall: 'Cheapest overall',
    cheapestOverallMonth: 'June – August',
    cheapestOverallBody:
      'Midnight Sun. 30–40 % cheaper than winter. No snow, no aurora. Hiking, river rafting, berry picking. A different trip entirely.',
  },
  fi: {
    h2Line1: 'Milloin mennä',
    meta: 'Revontulet · Lumi · Hintataso  ·  tammikuusta joulukuuhun',
    aurora: 'Revontulet',
    snow: 'Lumi',
    price: 'Hintataso',
    bestAurora: 'Paras revontulet/hinta-suhde',
    bestAuroraMonth: 'Helmikuu',
    bestAuroraBody:
      'Revontulten todennäköisyys on huipussaan ja koululaisten loma ei vielä alkanut; matkanjärjestäjät laskevat helmikuun loppupuolen hintoja 15–25 % jouluun verrattuna.',
    cheapestWinter: 'Edullisin talvi',
    cheapestWinterMonth: 'Maaliskuun loppu',
    cheapestWinterBody:
      'Lumi pysyy, päivänvalo palaa, hinnat laskevat. Husky- ja kelkkasafarit yhä käynnissä. Talven heikoimmat revontuliodotukset.',
    cheapestOverall: 'Edullisin kausi',
    cheapestOverallMonth: 'Kesäkuu – elokuu',
    cheapestOverallBody:
      'Yötön yö. 30–40 % halvempi kuin talvi. Ei lunta, ei revontulia. Vaellus, koskenlasku, marjastus. Täysin erilainen matka.',
  },
  de: {
    h2Line1: 'Wann reisen',
    meta: 'Polarlicht · Schnee · Preisniveau  ·  Januar bis Dezember',
    aurora: 'Polarlicht',
    snow: 'Schnee',
    price: 'Preisniveau',
    bestAurora: 'Bestes Polarlicht-Preis-Verhältnis',
    bestAuroraMonth: 'Februar',
    bestAuroraBody:
      'Die Polarlicht-Wahrscheinlichkeit erreicht ihren Höhepunkt, während die Schulferien noch nicht begonnen haben; Reiseveranstalter senken die Preise in der zweiten Februarhälfte um 15–25 % gegenüber Weihnachten.',
    cheapestWinter: 'Günstigster Winter',
    cheapestWinterMonth: 'Ende März',
    cheapestWinterBody:
      'Die Schneedecke hält, das Tageslicht kehrt zurück, die Preise fallen. Husky- und Schneemobiltouren laufen weiter. Schwächste Polarlicht-Chancen der Wintersaison.',
    cheapestOverall: 'Günstigste Saison',
    cheapestOverallMonth: 'Juni – August',
    cheapestOverallBody:
      'Mitternachtssonne. 30–40 % günstiger als der Winter. Kein Schnee, kein Polarlicht. Wandern, Wildwasser, Beeren sammeln. Eine ganz andere Reise.',
  },
  ja: {
    h2Line1: 'いつ訪れるか',
    meta: 'オーロラ · 雪 · 価格帯  ·  1月から12月まで',
    aurora: 'オーロラ',
    snow: '雪',
    price: '価格帯',
    bestAurora: 'オーロラと価格のベストバランス',
    bestAuroraMonth: '2月',
    bestAuroraBody:
      "オーロラの観察確率がピークに達しつつ、学校の休暇がまだ始まらない時期です。オペレーターは2月後半の料金をクリスマスと比べて15〜25%値下げします。",
    cheapestWinter: '最も安い冬季',
    cheapestWinterMonth: '3月下旬',
    cheapestWinterBody:
      '積雪が残り、日照時間が戻り、価格が下がります。ハスキーやスノーモービルのアクティビティもまだ実施可能。冬季シーズンで最もオーロラの観察確率が低い時期です。',
    cheapestOverall: '通年で最も安い時期',
    cheapestOverallMonth: '6月から8月',
    cheapestOverallBody:
      '白夜の季節。冬季と比べて30〜40%安くなります。雪もオーロラもありません。ハイキング、ラフティング、ベリー摘み。まったく異なる旅となります。',
  },
  ko: {
    h2Line1: '언제 가야 할까',
    meta: '오로라 · 눈 · 가격대  ·  1월부터 12월까지',
    aurora: '오로라',
    snow: '눈',
    price: '가격대',
    bestAurora: '오로라 대비 가격이 가장 좋은 시기',
    bestAuroraMonth: '2월',
    bestAuroraBody:
      '오로라 관측 확률은 정점에 가깝지만 학교 방학은 아직 시작되지 않은 시기입니다. 운영사들은 2월 후반 주간을 크리스마스 대비 15~25% 할인합니다.',
    cheapestWinter: '가장 저렴한 겨울',
    cheapestWinterMonth: '3월 하순',
    cheapestWinterBody:
      '적설은 남아 있고 일조 시간은 돌아오며 가격은 내려갑니다. 허스키와 스노모빌 액티비티도 여전히 운영됩니다. 다만 겨울 시즌 중 오로라 관측 확률이 가장 낮은 시기입니다.',
    cheapestOverall: '연중 가장 저렴한 시기',
    cheapestOverallMonth: '6월~8월',
    cheapestOverallBody:
      '백야의 계절. 겨울보다 30~40% 저렴합니다. 눈도 오로라도 없습니다. 트레킹, 강 래프팅, 베리 채집. 완전히 다른 여행이 됩니다.',
  },
  fr: {
    h2Line1: 'Quand y aller',
    meta: 'Aurore · Neige · Niveau de prix  ·  Janvier à décembre',
    aurora: 'Aurore',
    snow: 'Neige',
    price: 'Niveau de prix',
    bestAurora: 'Meilleur rapport aurore / prix',
    bestAuroraMonth: 'Février',
    bestAuroraBody:
      'La probabilité d\'aurores atteint son pic alors que les vacances scolaires n\'ont pas encore commencé ; les voyagistes baissent les prix de la seconde moitié de février de 15 à 25 % par rapport à Noël.',
    cheapestWinter: 'Hiver le moins cher',
    cheapestWinterMonth: 'Fin mars',
    cheapestWinterBody:
      'La neige tient, la lumière revient, les prix baissent. Les sorties husky et motoneige sont toujours possibles. Probabilités d\'aurore les plus faibles de la saison hivernale.',
    cheapestOverall: 'Période la moins chère de l\'année',
    cheapestOverallMonth: 'Juin – août',
    cheapestOverallBody:
      'Soleil de minuit. 30 à 40 % moins cher que l\'hiver. Pas de neige, pas d\'aurore. Randonnée, descente en eau vive, cueillette de baies. Un tout autre voyage.',
  },
  it: {
    h2Line1: 'Quando andare',
    meta: 'Aurora · Neve · Fascia di prezzo  ·  Da gennaio a dicembre',
    aurora: 'Aurora',
    snow: 'Neve',
    price: 'Fascia di prezzo',
    bestAurora: 'Miglior rapporto aurora-prezzo',
    bestAuroraMonth: 'Febbraio',
    bestAuroraBody:
      'La probabilità di vedere l\'aurora raggiunge il picco mentre le vacanze scolastiche non sono ancora iniziate; gli operatori scontano le settimane della seconda metà di febbraio del 15–25 % rispetto al Natale.',
    cheapestWinter: 'Inverno più economico',
    cheapestWinterMonth: 'Fine marzo',
    cheapestWinterBody:
      'La neve tiene, la luce ritorna, i prezzi scendono. Le escursioni husky e motoslitta sono ancora attive. Probabilità di aurora più basse della stagione invernale.',
    cheapestOverall: 'Periodo più economico dell\'anno',
    cheapestOverallMonth: 'Giugno – agosto',
    cheapestOverallBody:
      'Sole di mezzanotte. Dal 30 al 40 % più economico dell\'inverno. Niente neve, niente aurora. Trekking, rafting, raccolta di bacche. Un viaggio completamente diverso.',
  },
  nl: {
    h2Line1: 'Wanneer gaan',
    meta: 'Aurora · Sneeuw · Prijsklasse  ·  Januari tot en met december',
    aurora: 'Aurora',
    snow: 'Sneeuw',
    price: 'Prijsklasse',
    bestAurora: 'Beste verhouding aurora–prijs',
    bestAuroraMonth: 'Februari',
    bestAuroraBody:
      'De kans op aurora bereikt zijn piek terwijl de schoolvakanties nog niet begonnen zijn; reisorganisaties verlagen de prijzen voor de tweede helft van februari met 15–25 % ten opzichte van Kerst.',
    cheapestWinter: 'Goedkoopste winterperiode',
    cheapestWinterMonth: 'Eind maart',
    cheapestWinterBody:
      'De sneeuw blijft liggen, het daglicht keert terug, de prijzen dalen. Husky- en sneeuwscootertochten lopen nog. Slechtste aurorakansen van het winterseizoen.',
    cheapestOverall: 'Goedkoopste periode van het jaar',
    cheapestOverallMonth: 'Juni – augustus',
    cheapestOverallBody:
      'Middernachtszon. 30–40 % goedkoper dan de winter. Geen sneeuw, geen aurora. Wandelen, wildwaterraften, bessen plukken. Een heel andere reis.',
  },
  sv: {
    h2Line1: 'När du ska åka',
    meta: 'Norrsken · Snö · Prisnivå  ·  januari till december',
    aurora: 'Norrsken',
    snow: 'Snö',
    price: 'Prisnivå',
    bestAurora: 'Bäst norrsken för priset',
    bestAuroraMonth: 'februari',
    bestAuroraBody:
      'Chansen för norrsken är som störst innan skolloven har börjat; arrangörerna sänker priserna för veckorna i andra halvan av februari med 15–25 % jämfört med jul.',
    cheapestWinter: 'Billigaste vintern',
    cheapestWinterMonth: 'slutet av mars',
    cheapestWinterBody:
      'Snötäcket ligger kvar, dagsljuset återvänder, priserna faller. Husky- och skotersafari pågår fortfarande. Sämsta norrskenschansen under vintersäsongen.',
    cheapestOverall: 'Billigast totalt',
    cheapestOverallMonth: 'juni – augusti',
    cheapestOverallBody:
      'Midnattssol. 30–40 % billigare än vintern. Ingen snö, inget norrsken. Vandring, forsränning, bärplockning. En helt annan sorts resa.',
  },
  es: {
    h2Line1: 'Cuándo ir',
    meta: 'Aurora · Nieve · Nivel de precio  ·  De enero a diciembre',
    aurora: 'Aurora',
    snow: 'Nieve',
    price: 'Nivel de precio',
    bestAurora: 'Mejor relación aurora-precio',
    bestAuroraMonth: 'Febrero',
    bestAuroraBody:
      'La probabilidad de aurora llega a su punto más alto cuando aún no han empezado las vacaciones escolares; los operadores rebajan las semanas de la segunda mitad de febrero entre un 15 y un 25 % frente a Navidad.',
    cheapestWinter: 'Invierno más económico',
    cheapestWinterMonth: 'Finales de marzo',
    cheapestWinterBody:
      'La nieve aguanta, vuelve la luz y bajan los precios. Las actividades de huskies y motonieve siguen en marcha. Las peores probabilidades de aurora de la temporada de invierno.',
    cheapestOverall: 'Época más económica del año',
    cheapestOverallMonth: 'Junio – agosto',
    cheapestOverallBody:
      'Sol de medianoche. Entre un 30 y un 40 % más barato que el invierno. Sin nieve, sin aurora. Senderismo, descenso de ríos, recogida de bayas. Un viaje completamente distinto.',
  },
  'pt-BR': {
    h2Line1: 'Quando ir',
    meta: 'Aurora · Neve · Faixa de preço  ·  De janeiro a dezembro',
    aurora: 'Aurora',
    snow: 'Neve',
    price: 'Faixa de preço',
    bestAurora: 'Melhor relação aurora-preço',
    bestAuroraMonth: 'Fevereiro',
    bestAuroraBody:
      'A chance de aurora chega ao auge enquanto as férias escolares ainda não começaram; as operadoras dão desconto de 15 a 25 % nas semanas da segunda metade de fevereiro em relação ao Natal.',
    cheapestWinter: 'Inverno mais barato',
    cheapestWinterMonth: 'Fim de março',
    cheapestWinterBody:
      'A neve se mantém, a luz do dia volta e os preços caem. As atividades de huskies e snowmobile continuam acontecendo. As piores chances de aurora da temporada de inverno.',
    cheapestOverall: 'Época mais barata do ano',
    cheapestOverallMonth: 'Junho – agosto',
    cheapestOverallBody:
      'Sol da meia-noite. De 30 a 40 % mais barato que o inverno. Sem neve, sem aurora. Trilhas, rafting, colheita de frutas silvestres. Uma viagem totalmente diferente.',
  },
  'zh-CN': {
    h2Line1: '何时出发',
    meta: '极光 · 积雪 · 价格档位  ·  一月至十二月',
    aurora: '极光',
    snow: '积雪',
    price: '价格档位',
    bestAurora: '极光与价格的最佳平衡',
    bestAuroraMonth: '二月',
    bestAuroraBody:
      '此时极光出现概率达到高峰，而学校假期尚未开始；相比圣诞期间，运营商把二月下旬的价格下调 15–25%。',
    cheapestWinter: '最便宜的冬季',
    cheapestWinterMonth: '三月下旬',
    cheapestWinterBody:
      '积雪仍在，白昼回归，价格下降。哈士奇和雪地摩托活动照常进行。但这是整个冬季极光概率最低的时段。',
    cheapestOverall: '全年最便宜',
    cheapestOverallMonth: '六月至八月',
    cheapestOverallBody:
      '午夜阳光季。比冬季便宜 30–40%。没有积雪，也没有极光。徒步、漂流、采浆果，是一趟截然不同的旅程。',
  },
};

// 0-4 scale per category per month
const aurora = [4, 4, 3, 1, 0, 0, 0, 0, 1, 3, 4, 4];     // probability of visible aurora
const snow   = [4, 4, 4, 3, 1, 0, 0, 0, 0, 1, 3, 4];     // ground snow cover
const price  = [3, 2, 2, 1, 1, 1, 2, 2, 2, 2, 4, 4];     // price tier (4 = peak Christmas)

interface Cell {
  level: number;
  hex: string;        // base accent
  label: string;
}

function HeatCell({ cell }: { cell: Cell }) {
  const opacity = cell.level === 0 ? 0.04 : 0.18 + cell.level * 0.18; // 0.36..0.9
  return (
    <div
      className="relative aspect-[3/4] sm:aspect-[2/3] flex items-end justify-center transition-colors"
      style={{ background: `${cell.hex}${Math.round(opacity * 255).toString(16).padStart(2, '0')}` }}
      title={cell.label}
    >
      <span className="cap-meta !text-[9px] !tracking-[0.15em] pb-1">{cell.level === 0 ? '—' : cell.level}</span>
    </div>
  );
}

export default function SeasonStrip() {
  const lang = useLang();
  const c = COPY[copyLang(lang)];
  const months = MONTHS_BY_LANG[copyLang(lang)];
  return (
    <section className="bg-deep-night py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <header className="mb-12 sm:mb-16 text-center sm:text-left">
          <h2 className="font-heading tracking-tight leading-[0.92] text-snow text-5xl sm:text-7xl break-words hyphens-auto [text-wrap:balance]">
            {c.h2Line1}
          </h2>
          <p className="cap-meta mt-4">{c.meta}</p>
        </header>

        {/* Heatmap — horizontally scrollable on small screens to keep columns readable */}
        <div className="-mx-6 sm:mx-0 overflow-x-auto">
          <div className="min-w-[560px] px-6 sm:px-0">
            {/* Month header row */}
            <div className="grid grid-cols-[88px_repeat(12,1fr)] sm:grid-cols-[120px_repeat(12,1fr)] gap-1 mb-2">
              <div />
              {months.map((m, i) => (
                <div key={m} className="cap-meta text-center !text-[10px]">
                  {m}
                  {i === 1 && <span className="block text-vibe-pink/60 mt-1">▲</span>}
                  {i === 11 && <span className="block text-vibe-pink/60 mt-1">▲</span>}
                </div>
              ))}
            </div>

            {/* Aurora row */}
            <div className="grid grid-cols-[88px_repeat(12,1fr)] sm:grid-cols-[120px_repeat(12,1fr)] gap-1 mb-1">
              <div className="cap-meta self-center pr-3">{c.aurora}</div>
              {aurora.map((lvl, i) => (
                <HeatCell
                  key={i}
                  cell={{ level: lvl, hex: '#06B6D4', label: `${months[i]}: ${c.aurora} ${lvl}/4` }}
                />
              ))}
            </div>

            {/* Snow row */}
            <div className="grid grid-cols-[88px_repeat(12,1fr)] sm:grid-cols-[120px_repeat(12,1fr)] gap-1 mb-1">
              <div className="cap-meta self-center pr-3">{c.snow}</div>
              {snow.map((lvl, i) => (
                <HeatCell
                  key={i}
                  cell={{ level: lvl, hex: '#F9FAFB', label: `${months[i]}: ${c.snow} ${lvl}/4` }}
                />
              ))}
            </div>

            {/* Price row */}
            <div className="grid grid-cols-[88px_repeat(12,1fr)] sm:grid-cols-[120px_repeat(12,1fr)] gap-1 mb-6">
              <div className="cap-meta self-center pr-3">{c.price}</div>
              {price.map((lvl, i) => (
                <HeatCell
                  key={i}
                  cell={{ level: lvl, hex: '#EC4899', label: `${months[i]}: ${c.price} ${lvl}/4` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-x-10 gap-y-6 mt-12">
          <div>
            <p className="cap-meta mb-2">{c.bestAurora}</p>
            <p className="font-heading text-snow text-3xl tracking-wide">{c.bestAuroraMonth}</p>
            <p className="text-snow/80 font-body text-sm mt-1">{c.bestAuroraBody}</p>
          </div>
          <div>
            <p className="cap-meta mb-2">{c.cheapestWinter}</p>
            <p className="font-heading text-snow text-3xl tracking-wide">{c.cheapestWinterMonth}</p>
            <p className="text-snow/80 font-body text-sm mt-1">{c.cheapestWinterBody}</p>
          </div>
          <div>
            <p className="cap-meta mb-2">{c.cheapestOverall}</p>
            <p className="font-heading text-snow text-3xl tracking-wide">{c.cheapestOverallMonth}</p>
            <p className="text-snow/80 font-body text-sm mt-1">{c.cheapestOverallBody}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
