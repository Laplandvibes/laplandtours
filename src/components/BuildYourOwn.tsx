import { Hotel, Car, MapPinned } from 'lucide-react';
import AffiliateCTA from './AffiliateCTA';
import { useLang, type CopyLang, copyLang } from '../i18n/useLang';

interface RailCard {
  partner: 'hotels' | 'cars' | 'activities';
  sid: string;
  destination: string;
  /** GYG search query for activities (resolving /s/?q= endpoint). */
  gygSearch?: string;
  icon: typeof Hotel;
  imgVariant: 'twilight' | 'ice' | 'forest';
  bgHex: string;
  labels: Record<CopyLang, {
    label: string;
    headline: string;
    body: string;
    priceLine: string;
    ctaLabel: string;
  }>;
}

const rails: RailCard[] = [
  {
    partner: 'hotels',
    sid: 'home_build_hotels',
    destination: 'Rovaniemi',
    icon: Hotel,
    imgVariant: 'twilight',
    bgHex: '#0F1B33',
    labels: {
      en: {
        label: '01  ·  Stay',
        headline: 'A bed in Lapland',
        body:
          'From hotel rooms in Rovaniemi to glass igloos in Saariselkä. Compare on Hotels.com, book direct, no middleman.',
        priceLine: 'Live prices on Hotels.com · free cancellation on most rooms',
        ctaLabel: 'Browse Lapland hotels',
      },
      fi: {
        label: '01  ·  Yöpyminen',
        headline: 'Yöpyminen Lapissa',
        body:
          'Rovaniemen hotellihuoneista Saariselän lasi-igluihin. Vertaile Hotels.comissa, varaa suoraan, ei välikäsiä.',
        priceLine: 'Reaaliaikaiset hinnat Hotels.comissa · useimmissa huoneissa ilmainen peruutus',
        ctaLabel: 'Selaa Lapin hotelleja',
      },
      de: {
        label: '01  ·  Übernachten',
        headline: 'Ein Bett in Lappland',
        body:
          'Vom Hotelzimmer in Rovaniemi bis zum Glas-Iglu in Saariselkä. Vergleichen Sie auf Hotels.com und buchen Sie direkt, ohne Zwischenhändler.',
        priceLine: 'Live-Preise auf Hotels.com · kostenlose Stornierung bei den meisten Zimmern',
        ctaLabel: 'Hotels in Lappland ansehen',
      },
      ja: {
        label: '01  ·  宿泊',
        headline: 'ラップランドでの宿泊',
        body:
          'ロヴァニエミのホテルから、サーリセルカのガラスイグルーまで。Hotels.comで比較し、仲介者なしで直接ご予約いただけます。',
        priceLine: 'Hotels.comのリアルタイム価格 · ほとんどのお部屋は無料キャンセル可能',
        ctaLabel: 'ラップランドのホテルを見る',
      },
      ko: {
        label: '01  ·  숙박',
        headline: '라플란드에서의 숙박',
        body:
          '로바니에미의 호텔부터 사리셀카의 글래스 이글루까지. Hotels.com에서 비교하고 중개 없이 직접 예약하세요.',
        priceLine: 'Hotels.com의 실시간 가격 · 대부분의 객실은 무료 취소 가능',
        ctaLabel: '라플란드 호텔 둘러보기',
      },
      fr: {
        label: '01  ·  Hébergement',
        headline: 'Un lit en Laponie',
        body:
          'Des chambres d\'hôtel à Rovaniemi aux iglous de verre de Saariselkä. Comparez sur Hotels.com et réservez en direct, sans intermédiaire.',
        priceLine: 'Tarifs en direct sur Hotels.com · annulation gratuite sur la plupart des chambres',
        ctaLabel: 'Voir les hôtels en Laponie',
      },
      it: {
        label: '01  ·  Dormire',
        headline: 'Un letto in Lapponia',
        body:
          'Dalle camere d\'albergo a Rovaniemi agli iglù di vetro di Saariselkä. Confronti su Hotels.com e prenoti direttamente, senza intermediari.',
        priceLine: 'Prezzi live su Hotels.com · cancellazione gratuita sulla maggior parte delle camere',
        ctaLabel: 'Sfogliare gli hotel in Lapponia',
      },
      nl: {
        label: '01  ·  Verblijf',
        headline: 'Een bed in Lapland',
        body:
          'Van hotelkamers in Rovaniemi tot glaziglo\'s in Saariselkä. Vergelijken op Hotels.com en direct boeken, geen tussenpersoon.',
        priceLine: 'Live prijzen op Hotels.com · gratis annulering bij de meeste kamers',
        ctaLabel: 'Lapland-hotels bekijken',
      },
      es: {
        label: '01  ·  Dormir',
        headline: 'Una cama en Laponia',
        body:
          'Desde habitaciones de hotel en Rovaniemi hasta iglús de cristal en Saariselkä. Compare en Hotels.com y reserve directamente, sin intermediarios.',
        priceLine: 'Precios en directo en Hotels.com · cancelación gratuita en la mayoría de las habitaciones',
        ctaLabel: 'Ver hoteles en Laponia',
      },
      'pt-BR': {
        label: '01  ·  Hospedagem',
        headline: 'Uma cama na Lapônia',
        body:
          'De quartos de hotel em Rovaniemi a iglus de vidro em Saariselkä. Compare no Hotels.com e reserve direto, sem intermediários.',
        priceLine: 'Preços em tempo real no Hotels.com · cancelamento grátis na maioria dos quartos',
        ctaLabel: 'Ver hotéis na Lapônia',
      },
      'zh-CN': {
        label: '01  ·  住宿',
        headline: '在拉普兰的一张床',
        body:
          '从罗瓦涅米的酒店客房到萨里色尔卡的玻璃穹顶屋。在 Hotels.com 上比价，直接预订，无中间商。',
        priceLine: 'Hotels.com 实时价格 · 大部分房间可免费取消',
        ctaLabel: '浏览拉普兰酒店',
      },
},
},
  {
    partner: 'cars',
    sid: 'home_build_cars',
    destination: 'RVN',
    icon: Car,
    imgVariant: 'ice',
    bgHex: '#0E1726',
    labels: {
      en: {
        label: '02  ·  Drive',
        headline: 'A car at the airport',
        body:
          'Self-drive ex-Rovaniemi, Kittilä or Ivalo. Studded winter tyres standard. Pay at pickup, free amendment.',
        priceLine: 'Live prices on EconomyBookings · winter tyres included',
        ctaLabel: 'Compare car rentals',
      },
      fi: {
        label: '02  ·  Ajaminen',
        headline: 'Vuokra-auto kentältä',
        body:
          'Vuokra-auto Rovaniemeltä, Kittilästä tai Ivalosta. Nastarenkaat vakiona. Maksu noudettaessa, ilmainen muutos.',
        priceLine: 'Reaaliaikaiset hinnat EconomyBookingsissa · nastarenkaat sisältyvät',
        ctaLabel: 'Vertaile vuokra-autoja',
      },
      de: {
        label: '02  ·  Fahren',
        headline: 'Ein Mietwagen am Flughafen',
        body:
          'Selbstfahrer ab Rovaniemi, Kittilä oder Ivalo. Spike-Winterreifen serienmäßig. Zahlung bei Abholung, kostenfreie Änderung.',
        priceLine: 'Live-Preise auf EconomyBookings · Winterreifen inklusive',
        ctaLabel: 'Mietwagen vergleichen',
      },
      ja: {
        label: '02  ·  運転',
        headline: '空港でレンタカー',
        body:
          'ロヴァニエミ、キッティラ、イヴァロから自由運転。スパイクタイヤ標準装備。お引き渡し時にお支払い、無料で変更可能。',
        priceLine: 'EconomyBookingsのリアルタイム価格 · 冬用タイヤ込み',
        ctaLabel: 'レンタカーを比較する',
      },
      ko: {
        label: '02  ·  운전',
        headline: '공항에서 렌터카',
        body:
          '로바니에미, 키틸레, 이발로에서 시작하는 자유 운전. 스파이크 겨울 타이어 기본 장착. 픽업 시 결제, 무료 변경.',
        priceLine: 'EconomyBookings의 실시간 가격 · 겨울 타이어 포함',
        ctaLabel: '렌터카 비교하기',
      },
      fr: {
        label: '02  ·  Au volant',
        headline: 'Une voiture à l\'aéroport',
        body:
          'Autotour au départ de Rovaniemi, Kittilä ou Ivalo. Pneus hiver cloutés en standard. Paiement au retrait, modification gratuite.',
        priceLine: 'Tarifs en direct sur EconomyBookings · pneus hiver inclus',
        ctaLabel: 'Comparer les voitures de location',
      },
      it: {
        label: '02  ·  Guidare',
        headline: 'Un\'auto in aeroporto',
        body:
          'Autotour da Rovaniemi, Kittilä o Ivalo. Pneumatici invernali chiodati di serie. Pagamento al ritiro, modifica gratuita.',
        priceLine: 'Prezzi live su EconomyBookings · pneumatici invernali inclusi',
        ctaLabel: 'Confronta i noleggi auto',
      },
      nl: {
        label: '02  ·  Rijden',
        headline: 'Een auto op de luchthaven',
        body:
          'Zelf rijden vanaf Rovaniemi, Kittilä of Ivalo. Spike-winterbanden standaard. Betaling bij ophalen, gratis wijzigen.',
        priceLine: 'Live prijzen op EconomyBookings · winterbanden inbegrepen',
        ctaLabel: 'Huurauto\'s vergelijken',
      },
      es: {
        label: '02  ·  Conducir',
        headline: 'Un coche en el aeropuerto',
        body:
          'Conduzca usted mismo desde Rovaniemi, Kittilä o Ivalo. Neumáticos de clavos de serie. Pago al recoger, modificación gratuita.',
        priceLine: 'Precios en directo en EconomyBookings · neumáticos de invierno incluidos',
        ctaLabel: 'Comparar coches de alquiler',
      },
      'pt-BR': {
        label: '02  ·  Dirigir',
        headline: 'Um carro no aeroporto',
        body:
          'Dirija você mesmo a partir de Rovaniemi, Kittilä ou Ivalo. Pneus de inverno com cravos de série. Pagamento na retirada, alteração gratuita.',
        priceLine: 'Preços em tempo real no EconomyBookings · pneus de inverno incluídos',
        ctaLabel: 'Comparar aluguel de carros',
      },
      'zh-CN': {
        label: '02  ·  自驾',
        headline: '机场取车',
        body:
          '从罗瓦涅米、基蒂莱或伊瓦洛自驾出发。标配冬季钉胎。取车时付款，免费更改。',
        priceLine: 'EconomyBookings 实时价格 · 含冬季轮胎',
        ctaLabel: '比较租车',
      },
},
  },
  {
    partner: 'activities',
    sid: 'home_build_activities',
    destination: 's569-finnish-lapland-tc16',
    gygSearch: 'Lapland activities Rovaniemi',
    icon: MapPinned,
    imgVariant: 'forest',
    bgHex: '#0E1A1F',
    labels: {
      en: {
        label: '03  ·  Do',
        headline: 'A day in the wild',
        body:
          'Husky safaris, snowmobile tours, aurora hunts, ice fishing. Book a half-day or a full week through GetYourGuide.',
        priceLine: 'Live prices on GetYourGuide · instant confirmation',
        ctaLabel: 'Browse Lapland activities',
      },
      fi: {
        label: '03  ·  Tekeminen',
        headline: 'Päivä luonnossa',
        body:
          'Huskysafari, moottorikelkkareitti, revontuliretki, pilkkiminen. Varaa puolen päivän retki tai koko viikon päiväretket GetYourGuidesta.',
        priceLine: 'Reaaliaikaiset hinnat GetYourGuidessa · vahvistus heti',
        ctaLabel: 'Selaa Lapin päiväretkiä',
      },
      de: {
        label: '03  ·  Erleben',
        headline: 'Ein Tag in der Wildnis',
        body:
          'Husky-Safaris, Schneemobiltouren, Polarlichtjagden, Eisfischen. Halbtages- oder Wochenprogramme über GetYourGuide buchbar.',
        priceLine: 'Live-Preise auf GetYourGuide · sofortige Bestätigung',
        ctaLabel: 'Tagestouren in Lappland ansehen',
      },
      ja: {
        label: '03  ·  遊ぶ',
        headline: '自然の中で過ごす1日',
        body:
          'ハスキーサファリ、スノーモービルツアー、オーロラ観察、氷上釣り。半日体験から1週間の体験まで、GetYourGuideでご予約いただけます。',
        priceLine: 'GetYourGuideのリアルタイム価格 · 即時確認',
        ctaLabel: 'ラップランドのアクティビティを見る',
      },
      ko: {
        label: '03  ·  체험',
        headline: '대자연 속에서의 하루',
        body:
          '허스키 사파리, 스노모빌 투어, 오로라 헌트, 얼음낚시. 반나절부터 일주일까지, GetYourGuide에서 예약하세요.',
        priceLine: 'GetYourGuide의 실시간 가격 · 즉시 확정',
        ctaLabel: '라플란드 액티비티 둘러보기',
      },
      fr: {
        label: '03  ·  Faire',
        headline: 'Une journée en pleine nature',
        body:
          'Safaris husky, sorties motoneige, chasses aux aurores, pêche blanche. Réservez d\'une demi-journée à une semaine via GetYourGuide.',
        priceLine: 'Tarifs en direct sur GetYourGuide · confirmation immédiate',
        ctaLabel: 'Voir les excursions en Laponie',
      },
      it: {
        label: '03  ·  Fare',
        headline: 'Una giornata nella natura',
        body:
          'Safari husky, gite in motoslitta, cacce all\'aurora, pesca sul ghiaccio. Prenoti da mezza giornata a una settimana intera tramite GetYourGuide.',
        priceLine: 'Prezzi live su GetYourGuide · conferma immediata',
        ctaLabel: 'Sfogliare le attività in Lapponia',
      },
      nl: {
        label: '03  ·  Doen',
        headline: 'Een dag in de wildernis',
        body:
          'Husky-safari\'s, sneeuwscootertochten, aurora-jachten, ijsvissen. Boek een halve dag of een hele week via GetYourGuide.',
        priceLine: 'Live prijzen op GetYourGuide · directe bevestiging',
        ctaLabel: 'Lapland-activiteiten bekijken',
      },
      es: {
        label: '03  ·  Hacer',
        headline: 'Un día en plena naturaleza',
        body:
          'Safaris en trineo de huskies, rutas en motonieve, cazas de auroras, pesca en hielo. Reserve desde media jornada hasta una semana con GetYourGuide.',
        priceLine: 'Precios en directo en GetYourGuide · confirmación inmediata',
        ctaLabel: 'Ver actividades en Laponia',
      },
      'pt-BR': {
        label: '03  ·  Fazer',
        headline: 'Um dia em meio à natureza',
        body:
          'Safáris de huskies, passeios de snowmobile, caças à aurora, pesca no gelo. Reserve de meio dia a uma semana inteira pelo GetYourGuide.',
        priceLine: 'Preços em tempo real no GetYourGuide · confirmação imediata',
        ctaLabel: 'Ver atividades na Lapônia',
      },
      'zh-CN': {
        label: '03  ·  体验',
        headline: '荒野中的一天',
        body:
          '哈士奇雪橇之旅、雪地摩托、极光追寻、冰上垂钓。可通过 GetYourGuide 预订半日体验或整整一周的行程。',
        priceLine: 'GetYourGuide 实时价格 · 即时确认',
        ctaLabel: '浏览拉普兰活动',
      },
},
  },
];

const COPY: Record<CopyLang, { eyebrow: string; h2: string; lead: string; affiliateNote: string }> = {
  en: {
    eyebrow: 'Path one',
    h2: 'Build your own',
    lead:
      "Pick a place to stay, a way to get around, and what to do when you're there. Three rails, real prices, booked direct on each partner's site.",
    affiliateNote: 'Affiliate links. A commission may be earned on bookings, at no cost to you.',
  },
  fi: {
    eyebrow: 'Polku 1',
    h2: 'Kokoa itse',
    lead:
      'Valitse majoitus, kulkuväline ja päiväretket: kolme erillistä raidetta, reaaliaikaiset hinnat, varaus suoraan kumppanin sivuilla. Lähteet näkyvillä, kirjoitettu Suomesta.',
    affiliateNote:
      'Sivusto käyttää kumppanuuslinkkejä. Varauksesta voi tulla pieni provisio, ilman lisäkustannuksia sinulle.',
  },
  de: {
    eyebrow: 'Weg eins',
    h2: 'Selbst zusammenstellen',
    lead:
      'Wählen Sie Unterkunft, Fortbewegung und Tagestouren: drei Module, Live-Preise, direkt beim jeweiligen Partner buchbar.',
    affiliateNote:
      'Partnerlinks. Bei einer Buchung kann eine geringe Provision anfallen, ohne Mehrkosten für Sie.',
  },
  ja: {
    eyebrow: 'ルート1',
    h2: '自分で組み立てる',
    lead:
      '宿泊先、移動手段、現地での体験を選んでください。3つのレール、リアルタイム価格、各パートナーのサイトで直接ご予約いただけます。',
    affiliateNote: 'アフィリエイトリンクを含みます。ご予約に対し、お客様への追加料金なしで手数料が支払われる場合があります。',
  },
  ko: {
    eyebrow: '경로 1',
    h2: '직접 조립하기',
    lead:
      '숙박, 이동 수단, 현지에서 할 활동을 직접 선택하세요. 세 개의 레일, 실시간 가격, 각 파트너 사이트에서 직접 예약합니다.',
    affiliateNote: '제휴 링크가 포함되어 있습니다. 예약 시 고객 추가 부담 없이 소액의 수수료가 발생할 수 있습니다.',
  },
  fr: {
    eyebrow: 'Voie 1',
    h2: 'Composez vous-même',
    lead:
      'Choisissez un hébergement, un mode de déplacement et ce que vous allez faire sur place. Trois rails, tarifs en direct, réservation directe sur le site de chaque partenaire.',
    affiliateNote:
      'Liens d\'affiliation. Une commission peut être perçue sur les réservations, sans coût supplémentaire pour vous.',
  },
  it: {
    eyebrow: 'Strada 1',
    h2: 'Componi da te',
    lead:
      'Scelga dove dormire, come spostarsi e cosa fare sul posto. Tre binari, prezzi in tempo reale, prenotazione diretta sul sito di ciascun partner.',
    affiliateNote:
      'Link di affiliazione. Sulle prenotazioni può maturare una commissione, senza costi aggiuntivi per lei.',
  },
  nl: {
    eyebrow: 'Route 1',
    h2: 'Zelf samenstellen',
    lead:
      'Kies een plek om te verblijven, een manier om u te verplaatsen en wat u gaat doen. Drie sporen, live prijzen, direct boeken bij elke partner.',
    affiliateNote:
      'Affiliate-links. Bij een boeking kan een kleine commissie worden uitgekeerd, zonder extra kosten voor u.',
  },
  es: {
    eyebrow: 'Camino 1',
    h2: 'Móntelo usted mismo',
    lead:
      'Elija dónde alojarse, cómo moverse y qué hacer una vez allí. Tres vías, precios reales, reserva directa en la web de cada socio.',
    affiliateNote:
      'Enlaces de afiliado. Las reservas pueden generar una comisión, sin coste adicional para usted.',
  },
  'pt-BR': {
    eyebrow: 'Caminho 1',
    h2: 'Monte você mesmo',
    lead:
      'Escolha onde ficar, como se locomover e o que fazer no destino. Três trilhos, preços reais, reserva direta no site de cada parceiro.',
    affiliateNote:
      'Links de afiliado. As reservas podem gerar uma comissão, sem custo adicional para você.',
  },
  'zh-CN': {
    eyebrow: '路线 1',
    h2: '自己组合行程',
    lead:
      '挑选住宿、出行方式以及到达后想做的事。三条线路，真实价格，直接在各合作伙伴网站预订。',
    affiliateNote:
      '含联盟链接。预订可能产生佣金，您无需额外付费。',
  },
};

export default function BuildYourOwn() {
  const lang = useLang();
  const c = COPY[copyLang(lang)];
  return (
    <section id="build" className="bg-deep-night pt-20 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <header className="mb-10 sm:mb-14 max-w-[820px]">
          <p className="cap-meta">{c.eyebrow}</p>
          <h2 className="mt-2 font-heading tracking-tight leading-[0.92] text-snow text-5xl sm:text-7xl break-words hyphens-auto [text-wrap:balance]">
            {c.h2}
          </h2>
          <p className="mt-5 text-snow/70 font-body text-base sm:text-lg leading-relaxed max-w-xl">
            {c.lead}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {rails.map((r) => {
            const t = r.labels[copyLang(lang)];
            return (
              <article
                key={r.sid}
                className="relative flex flex-col p-7 sm:p-8 min-h-[360px] sm:min-h-[420px] overflow-hidden border border-white/8 hover:border-vibe-pink/40 transition-colors"
                style={{ background: r.bgHex }}
              >
                <div className="cap-meta mb-6">{t.label}</div>

                <r.icon className="w-7 h-7 text-vibe-pink mb-4" strokeWidth={1.4} />

                <h3 className="font-heading text-snow tracking-tight leading-[0.95] text-3xl sm:text-4xl mb-3">
                  {t.headline}
                </h3>

                <p className="text-snow/70 font-body text-[14.5px] leading-[1.65] mb-5">
                  {t.body}
                </p>

                <p className="font-mono text-[12px] tracking-[0.04em] text-snow/80 mb-7">
                  {t.priceLine}
                </p>

                <AffiliateCTA
                  partner={r.partner}
                  sid={r.sid}
                  destination={r.destination}
                  gygSearch={r.gygSearch}
                  className="mt-auto inline-flex items-center justify-between gap-2 px-4 py-3 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-body font-semibold text-[14px] transition-colors"
                >
                  <span>{t.ctaLabel}</span>
                  <span aria-hidden="true">→</span>
                </AffiliateCTA>
              </article>
            );
          })}
        </div>

        <p className="cap-meta mt-6 text-snow/60">
          {c.affiliateNote}
        </p>
      </div>
    </section>
  );
}
