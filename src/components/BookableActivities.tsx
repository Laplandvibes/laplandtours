/**
 * Bookable activities rail — the live booking layer.
 *
 * Each card is a genuinely bookable Lapland tour routed to a SPECIFIC
 * GetYourGuide search ("activity + place") via AffiliateCTA partner="activities"
 * + gygSearch. Those /s/?q= links always resolve (HTTP 200), so a browser-only
 * visitor who isn't ready for a full operator bundle can still book a single
 * half-day and we earn the commission.
 *
 * Only real GYG-bookable experiences live here — no museums, no free landmarks,
 * no the-VR-train. Copy is factual (activity site), no em-dash poetry.
 */
import { Dog, Snowflake, Sparkles, Fish, Ship, Mountain } from 'lucide-react';
import AffiliateCTA from './AffiliateCTA';
import { useLang, type CopyLang, copyLang } from '../i18n/useLang';

interface ActivityCard {
  sid: string;
  /** Specific GYG search query — activity + place. Verified to resolve. */
  gygSearch: string;
  icon: typeof Dog;
  bgHex: string;
  labels: Record<CopyLang, { title: string; body: string; meta: string }>;
}

const cards: ActivityCard[] = [
  {
    sid: 'do_husky_rovaniemi',
    gygSearch: 'husky safari Rovaniemi',
    icon: Dog,
    bgHex: '#0E1A1F',
    labels: {
      en: { title: 'Husky safari', body: 'Drive your own team through frozen forest, or ride as a passenger. Half-day from Rovaniemi.', meta: 'Rovaniemi · Nov–Apr · 2–4 h' },
      fi: { title: 'Huskysafari', body: 'Aja oma valjakko halki jäisen metsän, tai istu kyydissä. Puolen päivän retki Rovaniemeltä.', meta: 'Rovaniemi · marras–huhti · 2–4 h' },
      de: { title: 'Husky-Safari', body: 'Lenken Sie Ihr eigenes Gespann durch den gefrorenen Wald oder fahren Sie als Gast mit. Halbtags ab Rovaniemi.', meta: 'Rovaniemi · Nov–Apr · 2–4 Std.' },
      ja: { title: 'ハスキーサファリ', body: '凍った森を自分の犬ぞりで走るか、ゲストとして同乗。ロヴァニエミ発の半日ツアー。', meta: 'ロヴァニエミ · 11〜4月 · 2〜4時間' },
      ko: { title: '허스키 사파리', body: '얼어붙은 숲을 직접 썰매를 몰며 달리거나 동승자로 즐기세요. 로바니에미 출발 반나절.', meta: '로바니에미 · 11~4월 · 2~4시간' },
      fr: { title: 'Safari husky', body: 'Conduisez votre attelage à travers la forêt gelée, ou montez en passager. Demi-journée au départ de Rovaniemi.', meta: 'Rovaniemi · nov.–avr. · 2–4 h' },
      it: { title: 'Safari husky', body: 'Guidi la sua muta attraverso la foresta ghiacciata, o sieda come passeggero. Mezza giornata da Rovaniemi.', meta: 'Rovaniemi · nov–apr · 2–4 h' },
      nl: { title: 'Husky-safari', body: 'Bestuur je eigen team door het bevroren bos, of rijd mee als passagier. Halve dag vanaf Rovaniemi.', meta: 'Rovaniemi · nov–apr · 2–4 u' },
      sv: { title: 'Huskysafari', body: 'Kör ditt eget spann genom frusen skog, eller åk med som passagerare. Halvdag från Rovaniemi.', meta: 'Rovaniemi · nov–apr · 2–4 h' },
      es: { title: 'Safari en huskies', body: 'Conduzca su propio trineo por el bosque helado, o vaya como pasajero. Media jornada desde Rovaniemi.', meta: 'Rovaniemi · nov–abr · 2–4 h' },
      'pt-BR': { title: 'Safári de huskies', body: 'Conduza seu próprio trenó pela floresta congelada, ou vá como passageiro. Meio dia a partir de Rovaniemi.', meta: 'Rovaniemi · nov–abr · 2–4 h' },
      'zh-CN': { title: '哈士奇雪橇之旅', body: '亲自驾驭雪橇穿过冰封森林，或作为乘客同行。从罗瓦涅米出发的半日行程。', meta: '罗瓦涅米 · 11–4月 · 2–4 小时' },
    },
  },
  {
    sid: 'do_snowmobile_rovaniemi',
    gygSearch: 'snowmobile tour Rovaniemi',
    icon: Snowflake,
    bgHex: '#0E1726',
    labels: {
      en: { title: 'Snowmobile tour', body: 'Across frozen lakes and open fell. Driver licence for solo, tandem from age 12 with a parent.', meta: 'Rovaniemi · Dec–Apr · 2–3 h' },
      fi: { title: 'Moottorikelkkaretki', body: 'Yli jäisten järvien ja avotunturin. Yksin ajavalle ajokortti, tandem 12-vuotiaasta vanhemman kanssa.', meta: 'Rovaniemi · joulu–huhti · 2–3 h' },
      de: { title: 'Schneemobiltour', body: 'Über zugefrorene Seen und offenes Fjäll. Solo mit Führerschein, Tandem ab 12 mit einem Elternteil.', meta: 'Rovaniemi · Dez–Apr · 2–3 Std.' },
      ja: { title: 'スノーモービルツアー', body: '凍った湖と開けた丘陵を走る。単独運転は免許が必要、タンデムは12歳から保護者同乗で。', meta: 'ロヴァニエミ · 12〜4月 · 2〜3時間' },
      ko: { title: '스노모빌 투어', body: '얼어붙은 호수와 탁 트인 구릉을 가로지릅니다. 단독 운전은 면허 필요, 동승은 부모와 함께 12세부터.', meta: '로바니에미 · 12~4월 · 2~3시간' },
      fr: { title: 'Sortie motoneige', body: 'Sur lacs gelés et fjells ouverts. Permis pour conduire seul, tandem dès 12 ans avec un parent.', meta: 'Rovaniemi · déc.–avr. · 2–3 h' },
      it: { title: 'Gita in motoslitta', body: 'Su laghi ghiacciati e fjell aperti. Patente per guidare da soli, tandem dai 12 anni con un genitore.', meta: 'Rovaniemi · dic–apr · 2–3 h' },
      nl: { title: 'Sneeuwscootertocht', body: 'Over bevroren meren en open fjell. Rijbewijs voor solo, tandem vanaf 12 jaar met een ouder.', meta: 'Rovaniemi · dec–apr · 2–3 u' },
      sv: { title: 'Skotertur', body: 'Över frusna sjöar och öppna fjäll. Körkort för att köra själv, tandem från 12 år med en förälder.', meta: 'Rovaniemi · dec–apr · 2–3 h' },
      es: { title: 'Ruta en motonieve', body: 'Por lagos helados y campo abierto. Carné para conducir solo, tándem desde los 12 con un adulto.', meta: 'Rovaniemi · dic–abr · 2–3 h' },
      'pt-BR': { title: 'Passeio de snowmobile', body: 'Sobre lagos congelados e campo aberto. Habilitação para conduzir sozinho, tandem a partir dos 12 com um adulto.', meta: 'Rovaniemi · dez–abr · 2–3 h' },
      'zh-CN': { title: '雪地摩托之旅', body: '驰骋于冰湖与开阔丘陵之上。单独驾驶需驾照，12 岁起可在家长陪同下双人乘坐。', meta: '罗瓦涅米 · 12–4月 · 2–3 小时' },
    },
  },
  {
    sid: 'do_aurora_saariselka',
    gygSearch: 'northern lights tour Saariselka',
    icon: Sparkles,
    bgHex: '#101830',
    labels: {
      en: { title: 'Northern lights hunt', body: 'A guide tracks the clear skies and drives you to them. Far-north Saariselkä sits under the aurora oval.', meta: 'Saariselkä · Sep–Mar · 3–4 h' },
      fi: { title: 'Revontuliretki', body: 'Opas seuraa selkeitä taivaita ja vie sinut niiden alle. Pohjoinen Saariselkä on revontulivyöhykkeellä.', meta: 'Saariselkä · syys–maalis · 3–4 h' },
      de: { title: 'Polarlichtjagd', body: 'Ein Guide verfolgt den klaren Himmel und fährt Sie hin. Das hohe Saariselkä liegt unter dem Polarlicht-Oval.', meta: 'Saariselkä · Sep–Mär · 3–4 Std.' },
      ja: { title: 'オーロラ観察ツアー', body: 'ガイドが晴れた空を追い、その下へご案内。北部のサーリセルカはオーロラ帯の真下にあります。', meta: 'サーリセルカ · 9〜3月 · 3〜4時間' },
      ko: { title: '오로라 헌트', body: '가이드가 맑은 하늘을 쫓아 그곳으로 데려갑니다. 북부 사리셀카는 오로라 타원 아래에 있습니다.', meta: '사리셀카 · 9~3월 · 3~4시간' },
      fr: { title: 'Chasse aux aurores', body: 'Un guide suit le ciel dégagé et vous y conduit. Saariselkä, au grand nord, se trouve sous l’ovale auroral.', meta: 'Saariselkä · sept.–mars · 3–4 h' },
      it: { title: 'Caccia all’aurora', body: 'Una guida segue il cielo sereno e vi accompagna. Saariselkä, nell’estremo nord, è sotto l’ovale aurorale.', meta: 'Saariselkä · set–mar · 3–4 h' },
      nl: { title: 'Aurora-jacht', body: 'Een gids volgt de heldere lucht en rijdt je ernaartoe. Het hoge noorden van Saariselkä ligt onder de aurora-ovaal.', meta: 'Saariselkä · sep–mrt · 3–4 u' },
      sv: { title: 'Norrskensjakt', body: 'En guide följer den klara himlen och kör dig dit. Saariselkä långt norrut ligger under norrskensovalen.', meta: 'Saariselkä · sep–mars · 3–4 h' },
      es: { title: 'Caza de auroras', body: 'Un guía sigue los cielos despejados y le lleva hasta ellos. El extremo norte de Saariselkä queda bajo el óvalo auroral.', meta: 'Saariselkä · sep–mar · 3–4 h' },
      'pt-BR': { title: 'Caça à aurora', body: 'Um guia acompanha os céus limpos e leva você até eles. O extremo norte de Saariselkä fica sob o oval auroral.', meta: 'Saariselkä · set–mar · 3–4 h' },
      'zh-CN': { title: '极光追寻', body: '向导追踪晴朗的天空并带你前往。最北端的萨里色尔卡正处于极光带之下。', meta: '萨里色尔卡 · 9–3月 · 3–4 小时' },
    },
  },
  {
    sid: 'do_reindeer_levi',
    gygSearch: 'reindeer sleigh ride Levi',
    icon: Mountain,
    bgHex: '#0F1B33',
    labels: {
      en: { title: 'Reindeer sleigh ride', body: 'A quiet ride behind a herder’s reindeer, the way Sámi families have travelled for generations. Gentle, works for toddlers up.', meta: 'Levi · Dec–Apr · 1–2 h' },
      fi: { title: 'Poroajelu', body: 'Rauhallinen ajelu poronhoitajan poron vetämänä, kuten saamelaisperheet ovat kulkeneet sukupolvet. Sopii pienimmillekin.', meta: 'Levi · joulu–huhti · 1–2 h' },
      de: { title: 'Rentierschlittenfahrt', body: 'Eine ruhige Fahrt hinter dem Rentier eines Hirten, wie Sámi-Familien seit Generationen reisen. Sanft, schon für Kleinkinder.', meta: 'Levi · Dez–Apr · 1–2 Std.' },
      ja: { title: 'トナカイそり', body: 'トナカイ飼いのトナカイが引く静かなそり旅。サーミの家族が何世代も続けてきた移動です。幼児から楽しめます。', meta: 'レヴィ · 12〜4月 · 1〜2時間' },
      ko: { title: '순록 썰매', body: '순록치기의 순록이 끄는 고요한 썰매. 사미 가족이 여러 세대에 걸쳐 다녀온 방식입니다. 유아도 즐길 수 있습니다.', meta: '레비 · 12~4월 · 1~2시간' },
      fr: { title: 'Traîneau à rennes', body: 'Une balade paisible derrière le renne d’un éleveur, comme les familles sámies voyagent depuis des générations. Doux, dès le plus jeune âge.', meta: 'Levi · déc.–avr. · 1–2 h' },
      it: { title: 'Slitta trainata da renne', body: 'Un giro tranquillo dietro la renna di un allevatore, come viaggiano le famiglie sámi da generazioni. Dolce, anche per i più piccoli.', meta: 'Levi · dic–apr · 1–2 h' },
      nl: { title: 'Rendiersleerit', body: 'Een rustige rit achter het rendier van een herder, zoals Sámi-families al generaties reizen. Zacht, geschikt vanaf peuters.', meta: 'Levi · dec–apr · 1–2 u' },
      sv: { title: 'Renslädetur', body: 'En stillsam färd bakom en renskötares ren, så som samiska familjer har färdats i generationer. Lugnt, fungerar även för de minsta.', meta: 'Levi · dec–apr · 1–2 h' },
      es: { title: 'Paseo en trineo de renos', body: 'Un paseo tranquilo tras el reno de un pastor, como han viajado las familias sami durante generaciones. Suave, apto desde niños pequeños.', meta: 'Levi · dic–abr · 1–2 h' },
      'pt-BR': { title: 'Passeio de trenó de renas', body: 'Um passeio tranquilo atrás da rena de um pastor, como as famílias sámi viajam há gerações. Suave, indicado a partir de crianças pequenas.', meta: 'Levi · dez–abr · 1–2 h' },
      'zh-CN': { title: '驯鹿雪橇', body: '由驯鹿牧人的驯鹿牵引的宁静雪橇，正如萨米家庭世代以来的出行方式。平稳，适合幼儿以上。', meta: '列维 · 12–4月 · 1–2 小时' },
    },
  },
  {
    sid: 'do_icefishing_rovaniemi',
    gygSearch: 'ice fishing Rovaniemi',
    icon: Fish,
    bgHex: '#0E1726',
    labels: {
      en: { title: 'Ice fishing', body: 'Drill a hole through a metre of lake ice, drop a line, wait. A guide brings the gear and the hot drinks.', meta: 'Rovaniemi · Jan–Apr · 2–3 h' },
      fi: { title: 'Pilkkiminen', body: 'Kairaa reikä metrin paksuun järvijäähän, laske siima, odota. Opas tuo välineet ja kuumat juomat.', meta: 'Rovaniemi · tammi–huhti · 2–3 h' },
      de: { title: 'Eisfischen', body: 'Bohren Sie ein Loch durch meterdickes Seeeis, lassen Sie die Schnur hinab, warten Sie. Ein Guide bringt Ausrüstung und Heißgetränke.', meta: 'Rovaniemi · Jan–Apr · 2–3 Std.' },
      ja: { title: '氷上釣り', body: '1メートルの湖氷に穴を開け、糸を垂らして待つ。ガイドが道具と温かい飲み物を用意します。', meta: 'ロヴァニエミ · 1〜4月 · 2〜3時間' },
      ko: { title: '얼음낚시', body: '1미터 두께의 호수 얼음을 뚫고 줄을 내린 뒤 기다립니다. 가이드가 장비와 따뜻한 음료를 준비합니다.', meta: '로바니에미 · 1~4월 · 2~3시간' },
      fr: { title: 'Pêche blanche', body: 'Percez un trou dans un mètre de glace, descendez la ligne, attendez. Un guide apporte le matériel et les boissons chaudes.', meta: 'Rovaniemi · janv.–avr. · 2–3 h' },
      it: { title: 'Pesca sul ghiaccio', body: 'Si trapana un foro in un metro di ghiaccio, si cala la lenza, si aspetta. Una guida porta attrezzatura e bevande calde.', meta: 'Rovaniemi · gen–apr · 2–3 h' },
      nl: { title: 'IJsvissen', body: 'Boor een gat door een meter meerijs, laat de lijn zakken, wacht. Een gids brengt de uitrusting en warme dranken.', meta: 'Rovaniemi · jan–apr · 2–3 u' },
      sv: { title: 'Pimpelfiske', body: 'Borra ett hål genom en meter sjöis, sänk ner reven, vänta. En guide tar med utrustningen och de varma dryckerna.', meta: 'Rovaniemi · jan–apr · 2–3 h' },
      es: { title: 'Pesca en hielo', body: 'Perfore un agujero en un metro de hielo, suelte el sedal, espere. Un guía lleva el equipo y las bebidas calientes.', meta: 'Rovaniemi · ene–abr · 2–3 h' },
      'pt-BR': { title: 'Pesca no gelo', body: 'Fure um buraco em um metro de gelo, solte a linha, espere. Um guia leva o equipamento e as bebidas quentes.', meta: 'Rovaniemi · jan–abr · 2–3 h' },
      'zh-CN': { title: '冰上垂钓', body: '在一米厚的湖冰上钻孔，垂下钓线，静候。向导带来装备与热饮。', meta: '罗瓦涅米 · 1–4月 · 2–3 小时' },
    },
  },
  {
    sid: 'do_icebreaker_kemi',
    gygSearch: 'Sampo icebreaker Kemi',
    icon: Ship,
    bgHex: '#0D1A2B',
    labels: {
      en: { title: 'Icebreaker cruise', body: 'Sail on the Sampo as it crushes the frozen Gulf of Bothnia, then float in a survival suit in the open channel.', meta: 'Kemi · Dec–Apr · 4 h' },
      fi: { title: 'Jäänmurtajaristeily', body: 'Lähde Sampo-jäänmurtajalle, joka rikkoo jäätyneen Perämeren, ja kellu pelastuspuvussa avoimessa väylässä.', meta: 'Kemi · joulu–huhti · 4 h' },
      de: { title: 'Eisbrecher-Fahrt', body: 'Fahren Sie auf der Sampo, die den zugefrorenen Bottnischen Meerbusen bricht, und treiben Sie im Überlebensanzug in der offenen Rinne.', meta: 'Kemi · Dez–Apr · 4 Std.' },
      ja: { title: '砕氷船クルーズ', body: '凍ったボスニア湾を砕く砕氷船サンポに乗船し、開いた水路でサバイバルスーツを着て浮かびます。', meta: 'ケミ · 12〜4月 · 4時間' },
      ko: { title: '쇄빙선 크루즈', body: '얼어붙은 보트니아만을 가르는 쇄빙선 삼포에 승선한 뒤, 생존복을 입고 트인 수로에서 둥둥 떠 보세요.', meta: '케미 · 12~4월 · 4시간' },
      fr: { title: 'Croisière brise-glace', body: 'Embarquez sur le Sampo qui broie le golfe de Botnie gelé, puis flottez en combinaison de survie dans le chenal ouvert.', meta: 'Kemi · déc.–avr. · 4 h' },
      it: { title: 'Crociera rompighiaccio', body: 'Salga sul Sampo mentre frantuma il golfo di Botnia ghiacciato, poi galleggi in tuta di sopravvivenza nel canale aperto.', meta: 'Kemi · dic–apr · 4 h' },
      nl: { title: 'IJsbrekercruise', body: 'Vaar mee op de Sampo terwijl die de bevroren Botnische Golf breekt, en drijf daarna in een overlevingspak in de open geul.', meta: 'Kemi · dec–apr · 4 u' },
      sv: { title: 'Isbrytarkryssning', body: 'Åk med isbrytaren Sampo när den krossar isen på Bottenviken, och flyt sedan i överlevnadsdräkt i den öppna rännan.', meta: 'Kemi · dec–apr · 4 h' },
      es: { title: 'Crucero rompehielos', body: 'Navegue en el Sampo mientras rompe el helado golfo de Botnia, y luego flote con un traje de supervivencia en el canal abierto.', meta: 'Kemi · dic–abr · 4 h' },
      'pt-BR': { title: 'Cruzeiro quebra-gelo', body: 'Navegue no Sampo enquanto ele quebra o congelado golfo de Bótnia e depois flutue com uma roupa de sobrevivência no canal aberto.', meta: 'Kemi · dez–abr · 4 h' },
      'zh-CN': { title: '破冰船巡航', body: '搭乘“桑波号”破冰船碾过冰封的波的尼亚湾，再穿上救生服在开阔水道中漂浮。', meta: '凯米 · 12–4月 · 4 小时' },
    },
  },
];

const COPY: Record<CopyLang, { eyebrow: string; h2: string; lead: string; cta: string; note: string }> = {
  en: {
    eyebrow: 'Book a single day',
    h2: 'Or just book one tour',
    lead: 'Not ready for a whole bundle? Book a single half-day direct on GetYourGuide. Live prices, instant confirmation, free cancellation on most.',
    cta: 'Book on GetYourGuide',
    note: 'Affiliate links. A commission may be earned on bookings, at no cost to you.',
  },
  fi: {
    eyebrow: 'Varaa yksittäinen päivä',
    h2: 'Tai varaa vain yksi retki',
    lead: 'Et halua koko pakettia? Varaa yksittäinen puolen päivän retki suoraan GetYourGuidesta. Reaaliaikaiset hinnat, vahvistus heti, useimmissa ilmainen peruutus.',
    cta: 'Varaa GetYourGuidessa',
    note: 'Kumppanuuslinkkejä. Varauksesta voi tulla pieni provisio, ilman lisäkustannuksia sinulle.',
  },
  de: {
    eyebrow: 'Einen Tag buchen',
    h2: 'Oder einfach eine Tour buchen',
    lead: 'Noch kein ganzes Paket? Buchen Sie einen einzelnen Halbtag direkt auf GetYourGuide. Live-Preise, sofortige Bestätigung, meist kostenlose Stornierung.',
    cta: 'Auf GetYourGuide buchen',
    note: 'Partnerlinks. Bei einer Buchung kann eine geringe Provision anfallen, ohne Mehrkosten für Sie.',
  },
  ja: {
    eyebrow: '1日だけ予約',
    h2: 'ツアー1つだけの予約も',
    lead: 'パッケージまでは決めきれない? GetYourGuideで半日の体験を1つだけ直接予約できます。リアルタイム価格、即時確認、多くは無料キャンセル。',
    cta: 'GetYourGuideで予約',
    note: 'アフィリエイトリンクを含みます。ご予約に対し、お客様への追加料金なしで手数料が支払われる場合があります。',
  },
  ko: {
    eyebrow: '하루만 예약',
    h2: '아니면 투어 하나만 예약하세요',
    lead: '아직 전체 패키지가 부담스러우신가요? GetYourGuide에서 반나절 체험 하나만 바로 예약하세요. 실시간 가격, 즉시 확정, 대부분 무료 취소.',
    cta: 'GetYourGuide에서 예약',
    note: '제휴 링크가 포함되어 있습니다. 예약 시 고객 추가 부담 없이 소액의 수수료가 발생할 수 있습니다.',
  },
  fr: {
    eyebrow: 'Réserver une journée',
    h2: 'Ou réservez une seule excursion',
    lead: 'Pas prêt pour un forfait complet ? Réservez une demi-journée directement sur GetYourGuide. Tarifs en direct, confirmation immédiate, annulation gratuite la plupart du temps.',
    cta: 'Réserver sur GetYourGuide',
    note: 'Liens d’affiliation. Une commission peut être perçue sur les réservations, sans coût supplémentaire pour vous.',
  },
  it: {
    eyebrow: 'Prenota una sola giornata',
    h2: 'Oppure prenoti una sola escursione',
    lead: 'Non è pronto per un pacchetto intero? Prenoti una singola mezza giornata direttamente su GetYourGuide. Prezzi in tempo reale, conferma immediata, nella maggior parte dei casi cancellazione gratuita.',
    cta: 'Prenota su GetYourGuide',
    note: 'Link di affiliazione. Sulle prenotazioni può maturare una commissione, senza costi aggiuntivi per lei.',
  },
  nl: {
    eyebrow: 'Boek één dag',
    h2: 'Of boek gewoon één excursie',
    lead: 'Nog niet klaar voor een heel pakket? Boek een losse halve dag direct op GetYourGuide. Live prijzen, directe bevestiging, meestal gratis annuleren.',
    cta: 'Boek op GetYourGuide',
    note: 'Affiliate-links. Bij een boeking kan een kleine commissie worden uitgekeerd, zonder extra kosten voor u.',
  },
  sv: {
    eyebrow: 'Boka en enda dag',
    h2: 'Eller boka bara en tur',
    lead: 'Inte redo för ett helt paket? Boka en enskild halvdag direkt på GetYourGuide. Aktuella priser, direkt bekräftelse, fri avbokning på de flesta.',
    cta: 'Boka på GetYourGuide',
    note: 'Affiliatelänkar. Bokningar kan ge en provision, utan kostnad för dig.',
  },
  es: {
    eyebrow: 'Reserve un solo día',
    h2: 'O reserve solo una excursión',
    lead: '¿Aún no se decide por un paquete entero? Reserve una media jornada suelta directamente en GetYourGuide. Precios en directo, confirmación inmediata y, en la mayoría, cancelación gratuita.',
    cta: 'Reservar en GetYourGuide',
    note: 'Enlaces de afiliado. Las reservas pueden generar una comisión, sin coste adicional para usted.',
  },
  'pt-BR': {
    eyebrow: 'Reserve um único dia',
    h2: 'Ou reserve só um passeio',
    lead: 'Ainda não quer um pacote inteiro? Reserve um meio dia avulso direto no GetYourGuide. Preços em tempo real, confirmação imediata e, na maioria, cancelamento grátis.',
    cta: 'Reservar no GetYourGuide',
    note: 'Links de afiliado. As reservas podem gerar uma comissão, sem custo adicional para você.',
  },
  'zh-CN': {
    eyebrow: '只订一天',
    h2: '也可以只订一项行程',
    lead: '还没想好整套套餐？可在 GetYourGuide 上直接预订单项半日体验。实时价格，即时确认，大多支持免费取消。',
    cta: '在 GetYourGuide 预订',
    note: '含联盟链接。预订可能产生佣金，您无需额外付费。',
  },
};

export default function BookableActivities() {
  const lang = useLang();
  const c = COPY[copyLang(lang)];
  return (
    <section id="book-a-tour" className="bg-deeper-night pt-20 sm:pt-28 pb-12 sm:pb-16">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        <header className="mb-10 sm:mb-14 max-w-[820px]">
          <p className="cap-meta">{c.eyebrow}</p>
          <h2 className="mt-2 font-heading tracking-tight leading-[0.92] text-snow text-5xl sm:text-7xl [text-wrap:balance]">
            {c.h2}
          </h2>
          <p className="mt-5 text-snow/70 font-body text-base sm:text-lg leading-relaxed max-w-xl [text-wrap:pretty]">
            {c.lead}
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {cards.map((card) => {
            const t = card.labels[copyLang(lang)];
            return (
              <article
                key={card.sid}
                className="relative flex flex-col h-full p-7 sm:p-8 overflow-hidden border border-white/8 hover:border-vibe-pink/40 transition-colors"
                style={{ background: card.bgHex }}
              >
                <card.icon className="w-7 h-7 text-vibe-pink mb-4" strokeWidth={1.4} />

                <h3 className="font-heading text-snow tracking-tight leading-[0.95] text-3xl sm:text-4xl mb-3 [text-wrap:balance]">
                  {t.title}
                </h3>

                <p className="text-snow/70 font-body text-[14.5px] leading-[1.65] mb-4 [text-wrap:pretty]">
                  {t.body}
                </p>

                <p className="font-mono text-[12px] tracking-[0.04em] text-snow/80 mb-7">
                  {t.meta}
                </p>

                <AffiliateCTA
                  partner="activities"
                  sid={card.sid}
                  gygSearch={card.gygSearch}
                  ariaLabel={`${t.title}: ${c.cta}`}
                  className="mt-auto inline-flex items-center justify-between gap-2 px-4 py-3 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-body font-semibold text-[14px] transition-colors"
                >
                  <span>{c.cta}</span>
                  <span aria-hidden="true">→</span>
                </AffiliateCTA>
              </article>
            );
          })}
        </div>

        <p className="cap-meta mt-6 text-snow/60 [text-wrap:pretty]">{c.note}</p>
      </div>
    </section>
  );
}
