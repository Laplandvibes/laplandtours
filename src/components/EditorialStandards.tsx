import { Link } from 'react-router-dom';
import { useLang, useLocalePath, type CopyLang, copyLang } from '../i18n/useLang';

const COPY: Record<CopyLang, {
  eyebrow: string;
  hLine1: string;
  hLine2: string;
  p1: string;
  stats: string;
  bullets: string[];
  bulletsHtml?: string[];
  privacy: string;
  terms: string;
  cookie: string;
}> = {
  en: {
    eyebrow: 'Editorial standards',
    hLine1: 'How',
    hLine2: 'we cover this',
    p1:
      'This is a small Finnish editorial outfit based in Rovaniemi. Six tour operators are listed because they are honest about what their packages include, and what they do not. No trips are sold here. When you book through an operator, your contract is with that operator under their terms.',
    stats:
      '6 operators compared  ·  5 UK departure airports  ·  0 % commission charged to you  ·  updated May 2026',
    bullets: [
      'No operator pays to be featured, and no affiliate commission is earned on operator clicks.',
      'Affiliate commission is earned only on the cross-sell rail: Hotels.com (CJ), EconomyBookings (CJ) and GetYourGuide. Those links are labelled and disclosed.',
      'Operator profiles, prices and star ratings are reviewed every six months. Last review: May 2026.',
      'If something on this page is wrong or out of date, write to info@laplandvibes.com and it will be fixed.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'If something on this page is wrong or out of date, write to <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a> and it will be fixed.',
    ],
    privacy: 'Privacy',
    terms: 'Terms',
    cookie: 'Cookie policy',
  },
  fi: {
    eyebrow: 'Toimitukselliset periaatteet',
    hLine1: 'Näin',
    hLine2: 'tämä on tehty',
    p1:
      'Pieni toimituksellinen kokoonpano Rovaniemellä. Kuusi matkanjärjestäjää on listattu, koska ne kertovat rehellisesti mitä matkapakettiin kuuluu ja mitä ei. Matkoja ei myydä täällä. Kun varaat matkanjärjestäjän kautta, sopimus syntyy heidän ehdoillaan. Kirjoitettu Suomesta, lähteet näkyvillä.',
    stats:
      '6 käsin valittua matkanjärjestäjää  ·  5 brittilähtökenttää  ·  0 % palvelumaksu sinulle  ·  päivitetty toukokuu 2026',
    bullets: [
      'Yksikään matkanjärjestäjä ei maksa listaukseen pääsystä, eikä matkanjärjestäjien linkeistä makseta provisiota.',
      'Kumppanuusprovisioita saadaan vain ristiinmyyntiriviltä: Hotels.com (CJ), EconomyBookings (CJ) ja GetYourGuide. Nämä linkit ovat merkityt ja avoimet.',
      'Matkanjärjestäjien profiilit, hinnat ja arviot tarkistetaan puolen vuoden välein. Edellinen tarkistus: toukokuu 2026.',
      'Jos tällä sivulla on virhe tai vanhentunutta tietoa, lähetä viesti osoitteeseen info@laplandvibes.com ja korjaus tehdään.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'Jos tällä sivulla on virhe tai vanhentunutta tietoa, lähetä viesti osoitteeseen <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a> ja korjaus tehdään.',
    ],
    privacy: 'Tietosuoja',
    terms: 'Ehdot',
    cookie: 'Evästekäytäntö',
  },
  de: {
    eyebrow: 'Redaktionelle Grundsätze',
    hLine1: 'So',
    hLine2: 'arbeitet diese Seite',
    p1:
      'Eine kleine redaktionelle Einheit aus Rovaniemi in Finnland. Sechs Reiseveranstalter sind hier gelistet, weil sie offen darüber informieren, was in ihren Paketen enthalten ist und was nicht. Es werden keine Reisen verkauft. Bei einer Buchung über einen Reiseveranstalter kommt der Vertrag mit dessen Bedingungen zustande.',
    stats:
      '6 Veranstalter im Vergleich  ·  5 britische Abflughäfen  ·  0 % Provision für Sie  ·  Stand Mai 2026',
    bullets: [
      'Kein Reiseveranstalter zahlt für die Aufnahme, und auf Operator-Klicks fließt keine Affiliate-Provision.',
      'Affiliate-Provisionen fallen ausschließlich auf der Zusatz-Schiene an: Hotels.com (CJ), EconomyBookings (CJ) und GetYourGuide. Diese Links sind gekennzeichnet und offen ausgewiesen.',
      'Veranstalter-Profile, Preise und Bewertungen werden alle sechs Monate geprüft. Letzte Überprüfung: Mai 2026.',
      'Sollte auf dieser Seite etwas falsch oder veraltet sein, melden Sie es bitte an info@laplandvibes.com. Es wird korrigiert.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'Sollte auf dieser Seite etwas falsch oder veraltet sein, melden Sie es bitte an <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a>. Es wird korrigiert.',
    ],
    privacy: 'Datenschutz',
    terms: 'AGB',
    cookie: 'Cookie-Richtlinie',
  },
  ko: {
    eyebrow: '편집 원칙',
    hLine1: '이 사이트가',
    hLine2: '취재하는 방식',
    p1:
      '핀란드 로바니에미에 거점을 둔 작은 편집팀입니다. 여섯 곳의 운영사가 게재된 이유는 패키지에 무엇이 포함되고 무엇이 포함되지 않는지 정직하게 알려주기 때문입니다. 여기서 여행을 판매하지 않습니다. 운영사를 통해 예약하시면 계약은 해당 운영사의 약관에 따라 체결됩니다.',
    stats:
      '엄선된 운영사 6곳  ·  영국 출발 공항 5곳  ·  고객 부담 수수료 0 %  ·  2026년 5월 업데이트',
    bullets: [
      '어떤 운영사도 게재를 위해 비용을 지불하지 않으며, 운영사 클릭에서 제휴 수수료는 발생하지 않습니다.',
      '제휴 수수료는 크로스셀 영역에서만 발생합니다: Hotels.com(CJ), EconomyBookings(CJ), GetYourGuide. 해당 링크는 명시되고 공개됩니다.',
      '운영사 프로필, 가격, 평가는 6개월마다 검토됩니다. 마지막 검토: 2026년 5월.',
      '이 페이지의 정보가 잘못되었거나 오래된 경우 info@laplandvibes.com 으로 알려 주세요. 수정하겠습니다.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      '이 페이지의 정보가 잘못되었거나 오래된 경우 <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a> 으로 알려 주세요. 수정하겠습니다.',
    ],
    privacy: '개인정보 처리방침',
    terms: '이용약관',
    cookie: '쿠키 정책',
  },
  fr: {
    eyebrow: 'Principes éditoriaux',
    hLine1: 'Comment',
    hLine2: 'nous travaillons',
    p1:
      'Une petite équipe éditoriale basée à Rovaniemi, en Finlande. Six voyagistes sont listés ici parce qu\'ils sont honnêtes sur ce que leurs forfaits contiennent et sur ce qu\'ils ne contiennent pas. Aucun voyage n\'est vendu sur ce site. Lorsque vous réservez auprès d\'un voyagiste, le contrat est conclu avec lui, selon ses conditions.',
    stats:
      '6 voyagistes comparés  ·  5 aéroports de départ britanniques  ·  0 % de commission à votre charge  ·  mis à jour mai 2026',
    bullets: [
      'Aucun voyagiste ne paie pour figurer sur cette page, et aucune commission n\'est perçue sur les clics vers leurs sites.',
      'Une commission d\'affiliation n\'est perçue que sur le rail de ventes croisées : Hotels.com (CJ), EconomyBookings (CJ) et GetYourGuide. Ces liens sont identifiés et déclarés.',
      'Profils des voyagistes, prix et notes sont revus tous les six mois. Dernier contrôle : mai 2026.',
      'Si une information de cette page est inexacte ou périmée, écrivez à info@laplandvibes.com. Elle sera corrigée.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'Si une information de cette page est inexacte ou périmée, écrivez à <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a>. Elle sera corrigée.',
    ],
    privacy: 'Confidentialité',
    terms: 'Conditions',
    cookie: 'Politique de cookies',
  },
  it: {
    eyebrow: 'Principi editoriali',
    hLine1: 'Come',
    hLine2: 'lavoriamo',
    p1:
      'Una piccola redazione con sede a Rovaniemi, in Finlandia. Sei tour operator sono elencati perché dichiarano in modo onesto cosa è incluso nei pacchetti e cosa no. Su questo sito non vendiamo viaggi. Quando prenota tramite un operatore, il contratto si conclude con lui alle sue condizioni.',
    stats:
      '6 operatori a confronto  ·  5 aeroporti di partenza nel Regno Unito  ·  0 % di commissione a suo carico  ·  aggiornato a maggio 2026',
    bullets: [
      'Nessun operatore paga per essere presente in questa pagina, e sui clic verso il loro sito non maturano commissioni di affiliazione.',
      'La commissione di affiliazione si attiva solo sulla fascia di cross-sell: Hotels.com (CJ), EconomyBookings (CJ) e GetYourGuide. Tali link sono etichettati e dichiarati.',
      'I profili degli operatori, i prezzi e le valutazioni vengono rivisti ogni sei mesi. Ultima revisione: maggio 2026.',
      'Se qualcosa in questa pagina è errato o non aggiornato, scriva a info@laplandvibes.com e sarà corretto.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'Se qualcosa in questa pagina è errato o non aggiornato, scriva a <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a> e sarà corretto.',
    ],
    privacy: 'Privacy',
    terms: 'Condizioni',
    cookie: 'Cookie policy',
  },
  nl: {
    eyebrow: 'Redactionele uitgangspunten',
    hLine1: 'Hoe',
    hLine2: 'wij werken',
    p1:
      'Een kleine redactionele ploeg gevestigd in Rovaniemi, Finland. Zes reisorganisaties staan hier omdat zij eerlijk vertellen wat hun arrangementen bevatten en wat niet. Op deze site worden geen reizen verkocht. Wanneer u via een reisorganisatie boekt, sluit u het contract met hen onder hun voorwaarden.',
    stats:
      '6 reisorganisaties vergeleken  ·  5 Britse vertrekluchthavens  ·  0 % commissie voor u  ·  bijgewerkt mei 2026',
    bullets: [
      'Geen enkele reisorganisatie betaalt om vermeld te worden, en op kliks naar hun site wordt geen affiliate-commissie ontvangen.',
      'Affiliate-commissie wordt alleen op de cross-sell-balk verdiend: Hotels.com (CJ), EconomyBookings (CJ) en GetYourGuide. Die links zijn gemarkeerd en toegelicht.',
      'Profielen, prijzen en beoordelingen van reisorganisaties worden elk half jaar herzien. Laatste controle: mei 2026.',
      'Klopt er iets niet op deze pagina, of is het verouderd? Mail naar info@laplandvibes.com en het wordt aangepast.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'Klopt er iets niet op deze pagina, of is het verouderd? Mail naar <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a> en het wordt aangepast.',
    ],
    privacy: 'Privacy',
    terms: 'Voorwaarden',
    cookie: 'Cookiebeleid',
  },
  ja: {
    eyebrow: '編集方針',
    hLine1: '当サイトの',
    hLine2: '取材スタイル',
    p1:
      'ロヴァニエミに拠点を置く、フィンランドの小規模な編集チームです。6社のツアーオペレーターを掲載しているのは、パッケージに何が含まれるか、そして含まれないかについて誠実に説明してくれるからです。当サイトでは旅行を販売していません。ツアー会社経由でご予約いただく場合、契約はそのオペレーターの条件に基づき結ばれます。',
    stats:
      '6社のオペレーターを比較  ·  5空港のイギリス出発地  ·  お客様への手数料0%  ·  2026年5月更新',
    bullets: [
      'オペレーターが掲載のために費用を支払うことはありません。オペレーターのクリックでアフィリエイト手数料を受け取ることもありません。',
      'アフィリエイト手数料は、Hotels.com(CJ)、EconomyBookings(CJ)、GetYourGuideのクロスセル枠でのみ発生します。これらのリンクは明示・開示されています。',
      'ツアー会社のプロフィール、価格、評価は6か月ごとに見直しています。前回の見直し:2026年5月。',
      'このページに誤りや古い情報がありましたら、info@laplandvibes.com までご連絡ください。修正いたします。',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'このページに誤りや古い情報がありましたら、<a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a> までご連絡ください。修正いたします。',
    ],
    privacy: 'プライバシー',
    terms: '利用規約',
    cookie: 'クッキーポリシー',
  },
  es: {
    eyebrow: 'Principios editoriales',
    hLine1: 'Cómo',
    hLine2: 'lo contamos',
    p1:
      'Somos un pequeño equipo editorial finlandés con sede en Rovaniemi. Listamos seis operadores porque son honestos sobre lo que incluyen sus paquetes y lo que no. Aquí no se vende ningún viaje. Cuando reserva a través de un operador, el contrato es con ese operador y según sus condiciones.',
    stats:
      '6 operadores comparados  ·  5 aeropuertos de salida británicos  ·  0 % de comisión a su cargo  ·  actualizado en mayo de 2026',
    bullets: [
      'Ningún operador paga por aparecer, y los clics hacia los operadores no generan comisión de afiliación.',
      'La comisión de afiliación solo se obtiene en la franja de venta cruzada: Hotels.com (CJ), EconomyBookings (CJ) y GetYourGuide. Esos enlaces están señalados y declarados.',
      'Los perfiles de operadores, los precios y las valoraciones se revisan cada seis meses. Última revisión: mayo de 2026.',
      'Si algo de esta página es incorrecto o está desactualizado, escriba a info@laplandvibes.com y se corregirá.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'Si algo de esta página es incorrecto o está desactualizado, escriba a <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a> y se corregirá.',
    ],
    privacy: 'Privacidad',
    terms: 'Condiciones',
    cookie: 'Política de cookies',
  },
  'pt-BR': {
    eyebrow: 'Princípios editoriais',
    hLine1: 'Como',
    hLine2: 'fazemos a cobertura',
    p1:
      'Somos uma pequena equipe editorial finlandesa sediada em Rovaniemi. Listamos seis operadoras porque elas são honestas sobre o que os pacotes incluem e o que não incluem. Aqui não se vende nenhuma viagem. Quando você reserva por uma operadora, o contrato é com ela, segundo os termos dela.',
    stats:
      '6 operadoras comparadas  ·  5 aeroportos de partida no Reino Unido  ·  0 % de comissão a seu cargo  ·  atualizado em maio de 2026',
    bullets: [
      'Nenhuma operadora paga para aparecer, e os cliques nas operadoras não geram comissão de afiliado.',
      'A comissão de afiliado só é obtida na faixa de venda cruzada: Hotels.com (CJ), EconomyBookings (CJ) e GetYourGuide. Esses links são sinalizados e divulgados.',
      'Os perfis das operadoras, os preços e as avaliações são revisados a cada seis meses. Última revisão: maio de 2026.',
      'Se algo nesta página estiver errado ou desatualizado, escreva para info@laplandvibes.com que será corrigido.',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      'Se algo nesta página estiver errado ou desatualizado, escreva para <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a> que será corrigido.',
    ],
    privacy: 'Privacidade',
    terms: 'Termos',
    cookie: 'Política de cookies',
  },
  'zh-CN': {
    eyebrow: '编辑准则',
    hLine1: '我们',
    hLine2: '如何报道',
    p1:
      '我们是一支驻罗瓦涅米的芬兰小型编辑团队。之所以列出这六家运营商，是因为它们对套餐包含什么、以及不包含什么，都说得坦诚。本站不销售任何行程。当你通过运营商预订时，合同是与该运营商按其条款签订的。',
    stats:
      '6 家运营商对比  ·  5 个英国出发机场  ·  对你收取 0% 佣金  ·  2026 年 5 月更新',
    bullets: [
      '没有运营商付费上榜，点击运营商也不会产生联盟佣金。',
      '联盟佣金只来自交叉销售栏目：Hotels.com（CJ）、EconomyBookings（CJ）和 GetYourGuide。这些链接均已标注并公开说明。',
      '运营商资料、价格和星级每六个月复核一次。上次复核：2026 年 5 月。',
      '如果本页面有错误或信息过时，请发送邮件至 info@laplandvibes.com，我们会更正。',
    ],
    bulletsHtml: [
      undefined as any,
      undefined as any,
      undefined as any,
      '如果本页面有错误或信息过时，请发送邮件至 <a href="mailto:info@laplandvibes.com" class="text-vibe-pink hover:underline">info@laplandvibes.com</a>，我们会更正。',
    ],
    privacy: '隐私',
    terms: '条款',
    cookie: 'Cookie 政策',
  },
};

export default function EditorialStandards() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[copyLang(lang)];
  return (
    <section className="bg-deeper-night py-20 sm:py-28">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 grid grid-cols-12 gap-8">
        <div className="col-span-12 sm:col-span-4">
          <p className="cap-meta">{c.eyebrow}</p>
          <h2 className="mt-2 font-heading tracking-tight leading-[0.95] text-snow text-4xl sm:text-5xl lg:text-6xl break-words hyphens-auto">
            {c.hLine1}<br />{c.hLine2}
          </h2>
        </div>

        <div className="col-span-12 sm:col-span-7 sm:col-start-6 space-y-5 text-snow/70 font-body text-[15px] leading-relaxed">
          <p>{c.p1}</p>
          <p className="font-mono text-[13px] tracking-[0.06em] text-snow/80 border-y border-white/8 py-3 -mx-1 px-1">
            {c.stats}
          </p>

          <ul className="space-y-3 pl-0">
            {c.bullets.map((bullet, i) => (
              <li key={i} className="grid grid-cols-[auto_1fr] gap-x-4">
                <span className="cap-meta self-start mt-1">{String(i + 1).padStart(2, '0')}</span>
                {c.bulletsHtml && c.bulletsHtml[i] ? (
                  <span dangerouslySetInnerHTML={{ __html: c.bulletsHtml[i] }} />
                ) : (
                  <span>{bullet}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-x-8 gap-y-2 pt-2 cap-meta">
            <Link to={to('/privacy')} className="hover:text-vibe-pink transition-colors">{c.privacy}</Link>
            <Link to={to('/terms')} className="hover:text-vibe-pink transition-colors">{c.terms}</Link>
            <Link to={to('/cookie-policy')} className="hover:text-vibe-pink transition-colors">{c.cookie}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
