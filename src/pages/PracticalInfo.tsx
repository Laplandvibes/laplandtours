import { useEffect } from 'react';
import { Plane, Thermometer, CalendarDays, FileCheck2, TrainFront, HeartPulse } from 'lucide-react';
import AffiliateCTA from '../components/AffiliateCTA';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { setPageMeta, breadcrumbList, articleSchema } from '../lib/meta';
import { useLang, type CopyLang, copyLang, LANG_TO_PREFIX } from '../i18n/useLang';

const COPY: Record<CopyLang, {
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbHome: string;
  breadcrumbName: string;
  articleHeadline: string;
  articleDescription: string;
  h1: string;
  ariaH1: string;
  lead: string;
  altHero: string;
  sections: { n: string; title: string; body: string }[];
  addonsEyebrow: string;
  addonsH2: string;
  addonHotel: string;
  addonCar: string;
  addonActivity: string;
}> = {
  en: {
    metaTitle: 'Practical info: climate, visas, transport for Finnish Lapland | #LaplandTours',
    metaDescription:
      'A pre-trip briefing for Finnish Lapland: getting there, climate by season, visa rules, what to pack, getting around, and health & safety basics.',
    canonical: 'https://laplandtours.online/practical-info',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Practical info',
    articleHeadline: 'Practical info: climate, visas, transport for Finnish Lapland',
    articleDescription:
      'A practical pre-trip briefing for Finnish Lapland: how to get there, climate by season, visa rules, what to pack, and how to extend a package.',
    h1: '−30 °C',
    ariaH1: 'Minus 30 degrees Celsius',
    lead:
      "That's the floor of a typical Lapland winter night, and the reason operators issue thermal overalls. The rest of the planning is calendar, paperwork and a few phone numbers. Below, six things to know before you book.",
    altHero: 'A long single-track snow road through endless boreal Lapland wilderness',
    sections: [
      {
        n: '01',
        title: 'Getting there',
        body:
          'Most operators fly UK-regional (LGW / MAN / BHX / BRS / EDI / EMA / GLA) to Rovaniemi (RVN), Kittilä (KTT) or Ivalo (IVL). You can also fly via Helsinki on Finnair, then connect on a 1-hour domestic flight or take the overnight VR sleeper train (12 hours, lie-flat cabins).',
      },
      {
        n: '02',
        title: 'Climate & what to pack',
        body:
          'Winter (Nov–Mar): −5 °C to −30 °C. Operators provide thermal overalls, boots and gloves. Pack thermal base layers, a wool mid-layer, warm hat, neck buff, mittens and solid walking boots. Summer (Jun–Aug): 10–25 °C, mosquito-prone, so bring repellent.',
      },
      {
        n: '03',
        title: 'When to go',
        body:
          'Aurora season runs September–March (peak Nov–Feb). Christmas Santa-themed trips: 1–24 December. Snow season: late Nov–April. Midnight Sun: late May–late July. Autumn ruska (foliage): mid-September.',
      },
      {
        n: '04',
        title: 'Visa & documents',
        body:
          'EU/EEA citizens travel on a passport or national ID. UK, US, Canadian and Australian citizens visit visa-free up to 90 days under Schengen rules. ETIAS authorisation begins to apply for visa-exempt travellers from late 2026. Check migri.fi or eu-etias.eu before booking.',
      },
      {
        n: '05',
        title: 'Getting around',
        body:
          'Most package holidays include all transfers. To extend independently: domestic flights between Helsinki ↔ Rovaniemi/Kittilä/Ivalo, the VR sleeper train Helsinki–Rovaniemi, or self-drive rental from any of the three Lapland airports.',
      },
      {
        n: '06',
        title: 'Health & safety',
        body:
          'Finnish public healthcare is excellent. EU citizens use EHIC/GHIC; non-EU travellers need travel insurance. Tap water is safe to drink. Frostbite risk is real at −25 °C+, so keep cheeks, nose and fingers covered. Dial 112 for any emergency.',
      },
    ],
    addonsEyebrow: 'Plan the extras',
    addonsH2: 'Three rails to extend the trip',
    addonHotel: 'Hotel night →',
    addonCar: 'Self-drive →',
    addonActivity: 'Day activity →',
  },
  fi: {
    metaTitle: 'Käytännön tieto: Suomen Lappi | #LaplandTours',
    metaDescription:
      'Ennen matkaa luettava opas Suomen Lapista: perilletulo, säätyypit kausittain, viisumi, pakkauslista, kulkuyhteydet sekä terveys ja turvallisuus.',
    canonical: 'https://laplandtours.online/fi/practical-info',
    breadcrumbHome: 'Etusivu',
    breadcrumbName: 'Käytännön tieto',
    articleHeadline: 'Käytännön tieto: sää, viisumi, kulkuyhteydet Suomen Lappiin',
    articleDescription:
      'Käytännön ennakkopaketti Suomen Lapin matkalle: miten päästä perille, sää kausittain, viisumi, pakkaaminen ja paketin jatkaminen.',
    h1: '−30 °C',
    ariaH1: 'Miinus 30 celsiusastetta',
    lead:
      'Se on tyypillisen lappilaisen talviyön alaraja ja syy siihen, miksi matkanjärjestäjät jakavat lämpöhaalarit. Loput suunnittelusta on kalenteria, papereita ja pari puhelinnumeroa. Alla kuusi asiaa ennen varausta.',
    altHero: 'Pitkä, yksittäinen lumitie loputtoman boreaalisen Lapin halki',
    sections: [
      {
        n: '01',
        title: 'Perille pääsy',
        body:
          'Lennä Rovaniemelle (RVN), Kittilään (KTT) tai Ivaloon (IVL): Helsingistä Finnair vie noin tunnissa, ja yöllä kulkee VR:n yöjuna (12 tuntia, makuuvaunut).',
      },
      {
        n: '02',
        title: 'Sää ja pakkauslista',
        body:
          'Talvi (marras–maaliskuu): −5…−30 °C. Matkanjärjestäjät jakavat lämpöhaalarit, saappaat ja hanskat. Itse mukaan: lämpökerrastot, villainen välikerros, lämmin pipo, kaulahuivi, lapaset ja kunnon kävelykengät. Kesä (kesä–elokuu): 10–25 °C, hyttysaikaa, joten pakkaa hyttyssuoja.',
      },
      {
        n: '03',
        title: 'Milloin mennä',
        body:
          'Revontulikausi syys–maaliskuu (huippu marras–helmikuu). Joulupukki­matkat 1.–24. joulukuuta. Lumikausi marraskuun lopusta huhtikuuhun. Yötön yö touko–heinäkuussa. Syksyn ruska syyskuun puolivälissä.',
      },
      {
        n: '04',
        title: 'Viisumi ja paperit',
        body:
          'EU/ETA-kansalaisille riittää passi tai henkilökortti. Britannian, Yhdysvaltain, Kanadan ja Australian kansalaiset saavat oleskella ilman viisumia 90 päivää Schengen-säännöillä. ETIAS-lupa koskee viisumi­vapaiden maiden matkustajia loppuvuodesta 2026. Tarkista migri.fi tai eu-etias.eu ennen varausta.',
      },
      {
        n: '05',
        title: 'Liikkuminen',
        body:
          'Useimpiin paketteihin kuuluvat siirtokuljetukset. Itsenäisesti: lentoja Helsinki ↔ Rovaniemi/Kittilä/Ivalo, VR:n yöjuna Helsinki–Rovaniemi, tai vuokra-auto miltä tahansa kolmesta Lapin kentästä.',
      },
      {
        n: '06',
        title: 'Terveys ja turvallisuus',
        body:
          'Suomen julkinen terveydenhuolto on erinomainen. EU-kansalaiset käyttävät EHIC/GHIC-korttia; EU:n ulkopuolelta tulevat tarvitsevat matkavakuutuksen. Hanavesi on juomakelpoista. Paleltuma­riski on todellinen −25 °C alapuolella, joten peitä posket, nenä ja sormet. Hätänumero 112.',
      },
    ],
    addonsEyebrow: 'Suunnittele lisät',
    addonsH2: 'Kolme raidetta jatkaa matkaa',
    addonHotel: 'Hotelliyö →',
    addonCar: 'Vuokra-auto →',
    addonActivity: 'Päiväretki →',
  },
  de: {
    metaTitle: 'Praktische Hinweise: Finnisch-Lappland | #LaplandTours',
    metaDescription:
      'Ein Briefing vor der Reise nach Finnisch-Lappland: Anreise, Klima nach Saison, Visumregeln, Packliste, Transport vor Ort sowie Gesundheit und Sicherheit.',
    canonical: 'https://laplandtours.online/de/practical-info',
    breadcrumbHome: 'Start',
    breadcrumbName: 'Praktische Hinweise',
    articleHeadline: 'Praktische Hinweise: Klima, Visum, Transport für Finnisch-Lappland',
    articleDescription:
      'Ein praktisches Briefing vor der Reise nach Finnisch-Lappland: Anreise, Klima nach Saison, Visumregeln, Packliste und Paket-Verlängerung.',
    h1: '−30 °C',
    ariaH1: 'Minus 30 Grad Celsius',
    lead:
      'Das ist der typische Tiefpunkt einer Winternacht in Lappland, und der Grund, warum die Reiseveranstalter Thermokleidung stellen. Der Rest ist Kalender, Papierkram und ein paar Telefonnummern. Sechs Punkte vor der Buchung.',
    altHero: 'Eine lange, einzelne Schneestraße durch die endlose boreale Wildnis Lapplands',
    sections: [
      {
        n: '01',
        title: 'Anreise',
        body:
          'Fliegen Sie nach Rovaniemi (RVN), Kittilä (KTT) oder Ivalo (IVL): über Helsinki mit Finnair und einen einstündigen Inlandsflug, oder mit dem VR-Nachtzug (12 Stunden, Liegewagen).',
      },
      {
        n: '02',
        title: 'Klima & Packliste',
        body:
          'Winter (November–März): −5 °C bis −30 °C. Reiseveranstalter stellen Thermokleidung, Stiefel und Handschuhe. Selbst mitzubringen: Thermo-Unterwäsche, Wollzwischenschicht, warme Mütze, Halstuch, Fäustlinge und gute Wanderschuhe. Sommer (Juni–August): 10–25 °C, mückenreich, daher Repellent einpacken.',
      },
      {
        n: '03',
        title: 'Reisezeit',
        body:
          'Polarlicht-Saison von September bis März (Höhepunkt November–Februar). Weihnachts-Trips 1. bis 24. Dezember. Schneesaison Ende November bis April. Mitternachtssonne Ende Mai bis Ende Juli. Herbstfärbung „Ruska" Mitte September.',
      },
      {
        n: '04',
        title: 'Visum & Dokumente',
        body:
          'EU-/EWR-Bürgerinnen und -Bürger reisen mit Pass oder Personalausweis. Reisende aus dem Vereinigten Königreich, den USA, Kanada und Australien dürfen visafrei bis zu 90 Tage im Schengen-Raum bleiben. ETIAS gilt für visumbefreite Reisende ab Ende 2026. Bitte vor der Buchung auf migri.fi oder eu-etias.eu prüfen.',
      },
      {
        n: '05',
        title: 'Vor Ort unterwegs',
        body:
          'Die meisten Pakete enthalten alle Transfers. Bei eigener Verlängerung: Inlandsflüge Helsinki ↔ Rovaniemi/Kittilä/Ivalo, der VR-Nachtzug Helsinki–Rovaniemi oder ein Mietwagen ab einem der drei Lappland-Flughäfen.',
      },
      {
        n: '06',
        title: 'Gesundheit & Sicherheit',
        body:
          'Das öffentliche Gesundheitswesen in Finnland ist hervorragend. EU-Bürgerinnen und -Bürger nutzen EHIC/GHIC; Reisende aus Nicht-EU-Ländern benötigen eine Reisekrankenversicherung. Leitungswasser ist trinkbar. Erfrierungsrisiko unter −25 °C: Wangen, Nase und Finger bedeckt halten. Notruf 112.',
      },
    ],
    addonsEyebrow: 'Zusätze planen',
    addonsH2: 'Drei Schienen zur Verlängerung',
    addonHotel: 'Hotelnacht →',
    addonCar: 'Selbstfahrer →',
    addonActivity: 'Tagestour →',
  },
  ja: {
    metaTitle: '実用情報｜フィンランド・ラップランドの気候、ビザ、交通 | #LaplandTours',
    metaDescription:
      'フィンランド・ラップランドへの旅行前のブリーフィング。行き方、季節別の気候、ビザ規則、持ち物、移動方法、健康と安全の基本。',
    canonical: 'https://laplandtours.online/ja/practical-info',
    breadcrumbHome: 'ホーム',
    breadcrumbName: '実用情報',
    articleHeadline: '実用情報｜フィンランド・ラップランドの気候、ビザ、交通',
    articleDescription:
      'フィンランド・ラップランドへの旅行前の実用ブリーフィング:行き方、季節別の気候、ビザ規則、持ち物、パッケージの拡張方法。',
    h1: '−30 °C',
    ariaH1: 'マイナス30度',
    lead:
      'これは典型的なラップランドの冬の夜の最低気温で、オペレーターが防寒オーバーオールを提供する理由でもあります。残りの計画はカレンダー、書類、いくつかの電話番号です。以下、ご予約前に知っておくべき6つのこと。',
    altHero: '広大な北方ラップランドの荒野を貫く長い単線の雪道',
    sections: [
      {
        n: '01',
        title: '行き方',
        body:
          'ロヴァニエミ(RVN)、キッティラ(KTT)、イヴァロ(IVL)へは、フィンエアーでヘルシンキ経由、1時間の国内線で乗り継ぎ、または夜行VR寝台列車(12時間、フラットベッドのキャビン)でも行けます。',
      },
      {
        n: '02',
        title: '気候と持ち物',
        body:
          '冬(11月〜3月):−5℃から−30℃。ツアー会社が防寒オーバーオール、ブーツ、手袋を提供します。インナーの保温下着、ウールの中間着、暖かい帽子、ネックウォーマー、ミトン、しっかりとした登山靴をご用意ください。夏(6月〜8月):10〜25℃、蚊が多いため虫よけを持参してください。',
      },
      {
        n: '03',
        title: 'いつ訪れるか',
        body:
          'オーロラのシーズンは9月から3月(11月〜2月がピーク)。クリスマスのサンタテーマの旅:12月1日〜24日。雪のシーズン:11月下旬〜4月。白夜:5月下旬〜7月下旬。秋のルスカ(紅葉):9月中旬。',
      },
      {
        n: '04',
        title: 'ビザと書類',
        body:
          'EU/EEAの市民はパスポートまたは国民IDで渡航できます。イギリス、アメリカ、カナダ、オーストラリアの市民はシェンゲン規則のもと最大90日までビザなしで渡航可能です。ETIAS認証は2026年下半期からビザ免除の渡航者に適用が開始されます。ご予約前にmigri.fiまたはeu-etias.euをご確認ください。',
      },
      {
        n: '05',
        title: '移動方法',
        body:
          'ほとんどのパッケージツアーはすべての送迎を含みます。自由に延長する場合:ヘルシンキ↔ロヴァニエミ/キッティラ/イヴァロの国内線、ヘルシンキ–ロヴァニエミのVR寝台列車、またはラップランドの3空港のいずれかからの自由運転レンタカー。',
      },
      {
        n: '06',
        title: '健康と安全',
        body:
          'フィンランドの公的医療制度は優れています。EU市民はEHIC/GHICを利用可能。EU圏外の渡航者は旅行保険が必要です。水道水は飲用可能です。−25℃以上では凍傷のリスクがあります。頬、鼻、指を覆ってください。緊急時は112にお電話ください。',
      },
    ],
    addonsEyebrow: '追加プランを計画',
    addonsH2: '旅を拡張する3つの方法',
    addonHotel: '宿泊 →',
    addonCar: '自由運転 →',
    addonActivity: '日帰りアクティビティ →',
  },
  ko: {
    metaTitle: '실용 정보: 핀란드 라플란드의 기후, 비자, 교통 | #LaplandTours',
    metaDescription:
      '핀란드 라플란드 여행 전 브리핑: 가는 방법, 계절별 기후, 비자 규정, 짐 싸기, 현지 이동, 건강과 안전.',
    canonical: 'https://laplandtours.online/kr/practical-info',
    breadcrumbHome: '홈',
    breadcrumbName: '실용 정보',
    articleHeadline: '실용 정보: 핀란드 라플란드의 기후, 비자, 교통',
    articleDescription:
      '핀란드 라플란드 여행 전 실용 브리핑: 가는 방법, 계절별 기후, 비자 규정, 짐 싸기, 패키지 연장 방법.',
    h1: '−30 °C',
    ariaH1: '영하 30도',
    lead:
      '전형적인 라플란드 겨울밤의 최저 기온이며, 운영사들이 방한복 일체를 지급하는 이유입니다. 나머지 계획은 일정, 서류, 그리고 몇 가지 전화번호입니다. 예약 전 알아야 할 여섯 가지를 정리했습니다.',
    altHero: '광활한 북방림 라플란드 황야를 가로지르는 외길 눈길',
    sections: [
      {
        n: '01',
        title: '가는 방법',
        body:
          '로바니에미(RVN), 키틸레(KTT), 이발로(IVL)로는 Finnair로 헬싱키 경유 후 1시간 국내선을 이용하거나 VR 야간 침대열차(12시간, 평탄형 침대 객실)를 탈 수 있습니다.',
      },
      {
        n: '02',
        title: '기후 및 짐 싸기',
        body:
          '겨울(11월~3월): −5 °C에서 −30 °C. 운영사가 방한복 일체, 부츠, 장갑을 제공합니다. 본인이 챙길 것: 베이스 레이어 보온내복, 울 중간층, 따뜻한 모자, 넥워머, 미튼, 튼튼한 워킹 부츠. 여름(6월~8월): 10~25 °C, 모기가 많으니 방충제를 챙기세요.',
      },
      {
        n: '03',
        title: '언제 가야 할까',
        body:
          '오로라 시즌은 9월~3월(11월~2월 정점). 크리스마스 산타 테마 여행: 12월 1~24일. 적설 시즌: 11월 말~4월. 백야: 5월 말~7월 말. 가을 루스카(단풍): 9월 중순.',
      },
      {
        n: '04',
        title: '비자 및 서류',
        body:
          'EU/EEA 시민은 여권 또는 국민 신분증으로 입국 가능합니다. 영국, 미국, 캐나다, 호주 시민은 셴겐 규정에 따라 최대 90일 무비자로 방문할 수 있습니다. ETIAS 인증은 2026년 말부터 무비자 여행자에게 적용됩니다. 예약 전 migri.fi 또는 eu-etias.eu를 확인하세요.',
      },
      {
        n: '05',
        title: '현지 이동',
        body:
          '대부분의 패키지에는 모든 픽업이 포함됩니다. 독립적으로 연장하려면: 헬싱키 ↔ 로바니에미/키틸레/이발로 국내선, VR 헬싱키–로바니에미 야간 침대열차, 또는 라플란드 세 공항에서의 렌터카 자유 운전을 이용할 수 있습니다.',
      },
      {
        n: '06',
        title: '건강과 안전',
        body:
          '핀란드의 공공 의료는 우수합니다. EU 시민은 EHIC/GHIC 카드를 사용합니다. EU 외 여행자는 여행자 보험이 필요합니다. 수돗물은 음용 가능합니다. −25 °C 이하에서는 동상 위험이 실제로 있으니 뺨, 코, 손가락을 가리세요. 응급 전화는 112입니다.',
      },
    ],
    addonsEyebrow: '추가 옵션 계획',
    addonsH2: '여행을 연장하는 세 가지 방법',
    addonHotel: '호텔 숙박 →',
    addonCar: '자유 운전 →',
    addonActivity: '당일 액티비티 →',
  },
  fr: {
    metaTitle: 'Infos pratiques : Laponie finlandaise | #LaplandTours',
    metaDescription:
      'Un briefing avant le départ pour la Laponie finlandaise : y aller, climat par saison, visa, bagages, déplacements et notions de santé et sécurité.',
    canonical: 'https://laplandtours.online/fr/practical-info',
    breadcrumbHome: 'Accueil',
    breadcrumbName: 'Infos pratiques',
    articleHeadline: 'Infos pratiques : climat, visa, transport pour la Laponie finlandaise',
    articleDescription:
      'Un briefing pratique avant un séjour en Laponie finlandaise : y aller, climat par saison, règles de visa, bagages et prolongation d\'un forfait.',
    h1: '−30 °C',
    ariaH1: 'Moins trente degrés Celsius',
    lead:
      'C\'est le plancher d\'une nuit d\'hiver typique en Laponie, et la raison pour laquelle les voyagistes fournissent les combinaisons thermiques. Le reste de la préparation est affaire de calendrier, de paperasse et de quelques numéros utiles. Voici six points à connaître avant de réserver.',
    altHero: 'Longue piste enneigée à une seule voie traversant la vaste taïga lapone',
    sections: [
      {
        n: '01',
        title: 'Y aller',
        body:
          'Rejoignez Rovaniemi (RVN), Kittilä (KTT) ou Ivalo (IVL) via Helsinki avec Finnair, puis un vol intérieur d\'une heure, ou prenez le train de nuit VR (12 heures, cabines à lits).',
      },
      {
        n: '02',
        title: 'Climat et bagages',
        body:
          'Hiver (nov.–mars) : −5 °C à −30 °C. Les voyagistes fournissent combinaisons, bottes et gants. À glisser dans la valise : sous-vêtements thermiques, couche intermédiaire en laine, bonnet chaud, tour de cou, moufles et bonnes chaussures de marche. Été (juin–août) : 10–25 °C, beaucoup de moustiques, pensez à un répulsif.',
      },
      {
        n: '03',
        title: 'Quand y aller',
        body:
          'Saison des aurores de septembre à mars (pic novembre–février). Séjours Père Noël : du 1er au 24 décembre. Saison de neige : fin novembre à avril. Soleil de minuit : fin mai à fin juillet. « Ruska » (feuillage d\'automne) : mi-septembre.',
      },
      {
        n: '04',
        title: 'Visa et documents',
        body:
          'Les ressortissants UE/EEE voyagent avec un passeport ou une carte d\'identité. Les ressortissants du Royaume-Uni, des États-Unis, du Canada et d\'Australie peuvent rester jusqu\'à 90 jours sans visa selon les règles Schengen. L\'autorisation ETIAS s\'applique aux voyageurs exemptés de visa à partir de fin 2026. Vérifiez migri.fi ou eu-etias.eu avant de réserver.',
      },
      {
        n: '05',
        title: 'Se déplacer sur place',
        body:
          'La plupart des forfaits incluent tous les transferts. Pour prolonger en autonomie : vols intérieurs Helsinki ↔ Rovaniemi/Kittilä/Ivalo, train de nuit VR Helsinki–Rovaniemi ou location de voiture depuis l\'un des trois aéroports de Laponie.',
      },
      {
        n: '06',
        title: 'Santé et sécurité',
        body:
          'Le système de santé public finlandais est excellent. Les citoyens UE utilisent la CEAM/GHIC ; les voyageurs hors UE ont besoin d\'une assurance voyage. L\'eau du robinet est potable. Risque de gelures réel en dessous de −25 °C : couvrez joues, nez et doigts. Numéro d\'urgence : 112.',
      },
    ],
    addonsEyebrow: 'Planifier les extras',
    addonsH2: 'Trois rails pour prolonger le séjour',
    addonHotel: 'Nuit d\'hôtel →',
    addonCar: 'Autotour →',
    addonActivity: 'Activité à la journée →',
  },
  it: {
    metaTitle: 'Informazioni pratiche: Lapponia | #LaplandTours',
    metaDescription:
      'Un briefing pre-partenza per la Lapponia finlandese: come arrivare, clima per stagione, visti, valigia, spostamenti, salute e sicurezza.',
    canonical: 'https://laplandtours.online/it/practical-info',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Informazioni pratiche',
    articleHeadline: 'Informazioni pratiche: clima, visto, trasporti per la Lapponia finlandese',
    articleDescription:
      'Un briefing pratico prima del viaggio in Lapponia finlandese: come arrivare, clima per stagione, regole sui visti, bagaglio e come estendere un pacchetto.',
    h1: '−30 °C',
    ariaH1: 'Meno trenta gradi Celsius',
    lead:
      'È la temperatura minima di una tipica notte d\'inverno in Lapponia e il motivo per cui gli operatori forniscono le tute termiche. Il resto della pianificazione è calendario, documenti e qualche numero di telefono. Di seguito sei cose da sapere prima di prenotare.',
    altHero: 'Lunga strada innevata a singola corsia attraverso la sterminata taiga lapponica',
    sections: [
      {
        n: '01',
        title: 'Come arrivare',
        body:
          'Raggiunga Rovaniemi (RVN), Kittilä (KTT) o Ivalo (IVL) via Helsinki con Finnair e un volo interno di un\'ora, oppure con il treno notturno VR (12 ore, cabine con cuccette piatte).',
      },
      {
        n: '02',
        title: 'Clima e bagaglio',
        body:
          'Inverno (novembre–marzo): da −5 °C a −30 °C. Gli operatori forniscono tute termiche, stivali e guanti. In valigia: maglia termica intima, strato intermedio in lana, berretto caldo, scaldacollo, muffole e robusti scarponi. Estate (giugno–agosto): 10–25 °C, molte zanzare, quindi porti un repellente.',
      },
      {
        n: '03',
        title: 'Quando andare',
        body:
          'Stagione dell\'aurora da settembre a marzo (picco novembre–febbraio). Viaggi a tema Babbo Natale: 1–24 dicembre. Stagione della neve: fine novembre–aprile. Sole di mezzanotte: fine maggio–fine luglio. Ruska (foliage autunnale): metà settembre.',
      },
      {
        n: '04',
        title: 'Visto e documenti',
        body:
          'I cittadini UE/SEE viaggiano con passaporto o carta d\'identità. I cittadini di Regno Unito, Stati Uniti, Canada e Australia possono rimanere fino a 90 giorni senza visto nell\'area Schengen. L\'autorizzazione ETIAS si applicherà ai viaggiatori esenti da visto da fine 2026. Verifichi migri.fi o eu-etias.eu prima di prenotare.',
      },
      {
        n: '05',
        title: 'Spostamenti',
        body:
          'La maggior parte dei pacchetti include tutti i transfer. Per prolungare in autonomia: voli interni Helsinki ↔ Rovaniemi/Kittilä/Ivalo, treno notturno VR Helsinki–Rovaniemi o noleggio auto da uno dei tre aeroporti lapponi.',
      },
      {
        n: '06',
        title: 'Salute e sicurezza',
        body:
          'Il sistema sanitario pubblico finlandese è eccellente. I cittadini UE usano la TEAM/GHIC; i viaggiatori extra-UE hanno bisogno di un\'assicurazione viaggio. L\'acqua del rubinetto è potabile. Il rischio di congelamento è reale sotto i −25 °C: copra guance, naso e dita. Numero di emergenza: 112.',
      },
    ],
    addonsEyebrow: 'Pianifica gli extra',
    addonsH2: 'Tre binari per estendere il viaggio',
    addonHotel: 'Notte in hotel →',
    addonCar: 'Autotour →',
    addonActivity: 'Attività di un giorno →',
  },
  nl: {
    metaTitle: 'Praktische info: Fins Lapland | #LaplandTours',
    metaDescription:
      'Een briefing vóór uw reis naar Fins Lapland: hoe u er komt, klimaat per seizoen, visumregels, inpakken, vervoer en basis gezondheid en veiligheid.',
    canonical: 'https://laplandtours.online/nl/practical-info',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Praktische info',
    articleHeadline: 'Praktische info: klimaat, visum, vervoer voor Fins Lapland',
    articleDescription:
      'Een praktische briefing vóór uw reis naar Fins Lapland: hoe u er komt, klimaat per seizoen, visumregels, inpakken en het verlengen van een arrangement.',
    h1: '−30 °C',
    ariaH1: 'Min dertig graden Celsius',
    lead:
      'Dat is de bodem van een typische winternacht in Lapland, en de reden waarom reisorganisaties thermopakken uitdelen. De rest van de planning is agenda, papierwerk en een paar telefoonnummers. Hieronder zes punten om vóór het boeken te kennen.',
    altHero: 'Lange enkelbaans sneeuwweg door de eindeloze boreale Lapland-wildernis',
    sections: [
      {
        n: '01',
        title: 'Erheen reizen',
        body:
          'Reis naar Rovaniemi (RVN), Kittilä (KTT) of Ivalo (IVL) via Helsinki met Finnair plus een binnenlandse vlucht van een uur, of met de VR-nachttrein (12 uur, vlakke slaapcabines).',
      },
      {
        n: '02',
        title: 'Klimaat en inpakken',
        body:
          'Winter (nov–maa): −5 °C tot −30 °C. Reisorganisaties leveren thermopakken, laarzen en handschoenen. Zelf meenemen: thermo-onderkleding, wollen tussenlaag, warme muts, nekwarmer, wanten en stevige wandelschoenen. Zomer (jun–aug): 10–25 °C, veel muggen, dus neem repellent mee.',
      },
      {
        n: '03',
        title: 'Wanneer gaan',
        body:
          'Aurora-seizoen van september tot maart (piek nov–feb). Kerstman-reizen: 1–24 december. Sneeuwseizoen: eind november–april. Middernachtszon: eind mei–eind juli. Herfstkleuren (ruska): half september.',
      },
      {
        n: '04',
        title: 'Visum en documenten',
        body:
          'EU/EER-burgers reizen met paspoort of identiteitskaart. Reizigers uit het VK, de VS, Canada en Australië mogen tot 90 dagen zonder visum verblijven volgens de Schengenregels. ETIAS-autorisatie gaat vanaf eind 2026 gelden voor visumvrije reizigers. Controleer migri.fi of eu-etias.eu vóór het boeken.',
      },
      {
        n: '05',
        title: 'Vervoer ter plekke',
        body:
          'De meeste arrangementen omvatten alle transfers. Zelf verlengen: binnenlandse vluchten Helsinki ↔ Rovaniemi/Kittilä/Ivalo, de VR-nachttrein Helsinki–Rovaniemi of een huurauto vanaf een van de drie Lapland-luchthavens.',
      },
      {
        n: '06',
        title: 'Gezondheid en veiligheid',
        body:
          'De Finse publieke gezondheidszorg is uitstekend. EU-burgers gebruiken EHIC/GHIC; niet-EU-reizigers hebben een reisverzekering nodig. Kraanwater is drinkbaar. Vanaf −25 °C is bevriezing reëel, dus houd wangen, neus en vingers bedekt. Noodnummer: 112.',
      },
    ],
    addonsEyebrow: 'Extra\'s plannen',
    addonsH2: 'Drie sporen om de reis uit te breiden',
    addonHotel: 'Hotelnacht →',
    addonCar: 'Zelfrijden →',
    addonActivity: 'Dagactiviteit →',
  },
  sv: {
    metaTitle: 'Praktisk info: klimat, visum, transport för finska Lappland | #LaplandTours',
    metaDescription:
      'En genomgång inför resan till finska Lappland: att ta sig dit, klimat per säsong, visumregler, packlista, att ta sig runt samt hälsa och säkerhet.',
    canonical: 'https://laplandtours.online/sv/practical-info',
    breadcrumbHome: 'Hem',
    breadcrumbName: 'Praktisk info',
    articleHeadline: 'Praktisk info: klimat, visum, transport för finska Lappland',
    articleDescription:
      'En praktisk genomgång inför resan till finska Lappland: hur du tar dig dit, klimat per säsong, visumregler, packlista och hur du förlänger ett paket.',
    h1: '−30 °C',
    ariaH1: 'Minus 30 grader Celsius',
    lead:
      'Det är bottennoteringen en typisk vinternatt i Lappland, och skälet till att aktörerna delar ut termoveraller. Resten av planeringen är kalender, papper och några telefonnummer. Nedan sex saker att veta innan du bokar.',
    altHero: 'En lång enfilig snöväg genom den ändlösa boreala vildmarken i Lappland',
    sections: [
      {
        n: '01',
        title: 'Att ta sig dit',
        body:
          'Flyg till Rovaniemi (RVN), Kittilä (KTT) eller Ivalo (IVL): från Helsingfors tar Finnair dig dit på ungefär en timme, och på natten går VR:s nattåg (12 timmar, sovvagnar).',
      },
      {
        n: '02',
        title: 'Klimat och packlista',
        body:
          'Vinter (nov–mar): −5 °C till −30 °C. Aktörerna tillhandahåller termoveraller, kängor och handskar. Packa termounderställ, ett mellanlager i ull, varm mössa, halskrage, tumvantar och rejäla vandringskängor. Sommar (jun–aug): 10–25 °C, mycket mygg, så ta med myggmedel.',
      },
      {
        n: '03',
        title: 'När du ska åka',
        body:
          'Norrskenssäsongen pågår september–mars (topp nov–feb). Julresor med jultomtetema: 1–24 december. Snösäsong: slutet av november–april. Midnattssol: slutet av maj–slutet av juli. Höstens ruska (lövfärger): mitten av september.',
      },
      {
        n: '04',
        title: 'Visum och dokument',
        body:
          'EU/EES-medborgare reser med pass eller nationellt id-kort. Medborgare i Storbritannien, USA, Kanada och Australien får vistas visumfritt upp till 90 dagar enligt Schengenreglerna. ETIAS-tillståndet börjar gälla för visumfria resenärer från slutet av 2026. Kontrollera migri.fi eller eu-etias.eu innan du bokar.',
      },
      {
        n: '05',
        title: 'Att ta sig runt',
        body:
          'De flesta paketresor inkluderar alla transfers. För att förlänga på egen hand: inrikesflyg mellan Helsingfors ↔ Rovaniemi/Kittilä/Ivalo, VR:s nattåg Helsingfors–Rovaniemi eller hyrbil från någon av de tre flygplatserna i Lappland.',
      },
      {
        n: '06',
        title: 'Hälsa och säkerhet',
        body:
          'Den finländska offentliga sjukvården är utmärkt. EU-medborgare använder EHIC/GHIC; resenärer från länder utanför EU behöver reseförsäkring. Kranvattnet går bra att dricka. Risken för köldskador är verklig vid −25 °C och kallare, så håll kinder, näsa och fingrar täckta. Ring 112 vid nödsituationer.',
      },
    ],
    addonsEyebrow: 'Planera tilläggen',
    addonsH2: 'Tre spår för att förlänga resan',
    addonHotel: 'Hotellnatt →',
    addonCar: 'Hyrbil →',
    addonActivity: 'Dagsutflykt →',
  },
  es: {
    metaTitle: 'Información práctica: Laponia finlandesa | #LaplandTours',
    metaDescription:
      'Un resumen previo al viaje a la Laponia finlandesa: cómo llegar, clima por temporada, visados, qué llevar, cómo moverse y nociones de salud y seguridad.',
    canonical: 'https://laplandtours.online/es/practical-info',
    breadcrumbHome: 'Inicio',
    breadcrumbName: 'Información práctica',
    articleHeadline: 'Información práctica: clima, visados, transporte para la Laponia finlandesa',
    articleDescription:
      'Un resumen práctico previo al viaje a la Laponia finlandesa: cómo llegar, clima por temporada, normas de visado, qué llevar y cómo ampliar un paquete.',
    h1: '−30 °C',
    ariaH1: 'Menos treinta grados Celsius',
    lead:
      'Ese es el suelo de una noche típica de invierno en Laponia, y la razón por la que los operadores entregan monos térmicos. El resto de la planificación es calendario, papeleo y un par de teléfonos. Abajo, seis cosas que conviene saber antes de reservar.',
    altHero: 'Una larga carretera nevada de un solo carril a través de la interminable taiga de Laponia',
    sections: [
      {
        n: '01',
        title: 'Cómo llegar',
        body:
          'Llegue a Rovaniemi (RVN), Kittilä (KTT) o Ivalo (IVL) vía Helsinki con Finnair y un vuelo doméstico de una hora, o en el tren nocturno VR (12 horas, cabinas con cama plana).',
      },
      {
        n: '02',
        title: 'Clima y qué llevar',
        body:
          'Invierno (nov–mar): de −5 °C a −30 °C. Los operadores facilitan monos térmicos, botas y guantes. Lleve capas base térmicas, una capa intermedia de lana, gorro abrigado, braga de cuello, manoplas y botas de montaña firmes. Verano (jun–ago): 10–25 °C, con mosquitos: lleve repelente.',
      },
      {
        n: '03',
        title: 'Cuándo ir',
        body:
          'La temporada de auroras va de septiembre a marzo (máximo nov–feb). Viajes navideños con Papá Noel: del 1 al 24 de diciembre. Temporada de nieve: de finales de noviembre a abril. Sol de medianoche: de finales de mayo a finales de julio. Ruska (follaje de otoño): mediados de septiembre.',
      },
      {
        n: '04',
        title: 'Visado y documentos',
        body:
          'Los ciudadanos de la UE/EEE viajan con pasaporte o documento de identidad. Quienes vienen del Reino Unido, EE. UU., Canadá y Australia pueden estar hasta 90 días sin visado según las normas Schengen. La autorización ETIAS empieza a aplicarse a los viajeros exentos de visado desde finales de 2026: consulte migri.fi o eu-etias.eu antes de reservar.',
      },
      {
        n: '05',
        title: 'Cómo moverse',
        body:
          'La mayoría de los paquetes incluyen todos los traslados. Para ampliar por su cuenta: vuelos domésticos entre Helsinki ↔ Rovaniemi/Kittilä/Ivalo, el tren nocturno VR Helsinki–Rovaniemi o un coche de alquiler desde cualquiera de los tres aeropuertos de Laponia.',
      },
      {
        n: '06',
        title: 'Salud y seguridad',
        body:
          'La sanidad pública finlandesa es excelente. Los ciudadanos de la UE usan la EHIC/GHIC; los viajeros de fuera de la UE necesitan seguro de viaje. El agua del grifo es potable. El riesgo de congelación es real a partir de −25 °C: mantenga cubiertas mejillas, nariz y dedos. Marque el 112 ante cualquier emergencia.',
      },
    ],
    addonsEyebrow: 'Planifique los extras',
    addonsH2: 'Tres vías para ampliar el viaje',
    addonHotel: 'Noche de hotel →',
    addonCar: 'Coche de alquiler →',
    addonActivity: 'Actividad de un día →',
  },
  'pt-BR': {
    metaTitle: 'Informações práticas: Lapônia | #LaplandTours',
    metaDescription:
      'Um resumo pré-viagem para a Lapônia finlandesa: como chegar, clima por temporada, regras de visto, o que levar, como se locomover e noções de saúde e segurança.',
    canonical: 'https://laplandtours.online/br/practical-info',
    breadcrumbHome: 'Início',
    breadcrumbName: 'Informações práticas',
    articleHeadline: 'Informações práticas: clima, vistos, transporte para a Lapônia finlandesa',
    articleDescription:
      'Um resumo prático pré-viagem para a Lapônia finlandesa: como chegar, clima por temporada, regras de visto, o que levar e como estender um pacote.',
    h1: '−30 °C',
    ariaH1: 'Menos trinta graus Celsius',
    lead:
      'Esse é o piso de uma típica noite de inverno na Lapônia e o motivo de as operadoras entregarem macacões térmicos. O resto do planejamento é calendário, papelada e alguns telefones. Abaixo, seis coisas para saber antes de reservar.',
    altHero: 'Uma longa estrada de neve de pista única atravessando a interminável taiga da Lapônia',
    sections: [
      {
        n: '01',
        title: 'Como chegar',
        body:
          'Chegue a Rovaniemi (RVN), Kittilä (KTT) ou Ivalo (IVL) via Helsinque pela Finnair e um voo doméstico de uma hora, ou no trem-leito noturno VR (12 horas, cabines com cama plana).',
      },
      {
        n: '02',
        title: 'Clima e o que levar',
        body:
          'Inverno (nov–mar): de −5 °C a −30 °C. As operadoras fornecem macacões térmicos, botas e luvas. Leve camadas-base térmicas, uma camada intermediária de lã, gorro quente, gola tipo bandana, luvas tipo mãe e botas de caminhada firmes. Verão (jun–ago): 10–25 °C, com muitos mosquitos, então leve repelente.',
      },
      {
        n: '03',
        title: 'Quando ir',
        body:
          'A temporada de auroras vai de setembro a março (pico nov–fev). Viagens natalinas com Papai Noel: de 1 a 24 de dezembro. Temporada de neve: do fim de novembro a abril. Sol da meia-noite: do fim de maio ao fim de julho. Ruska (folhagem de outono): meados de setembro.',
      },
      {
        n: '04',
        title: 'Visto e documentos',
        body:
          'Cidadãos da UE/EEE viajam com passaporte ou documento de identidade. Viajantes do Reino Unido, EUA, Canadá e Austrália podem ficar até 90 dias sem visto pelas regras Schengen. A autorização ETIAS começa a valer para viajantes isentos de visto a partir do fim de 2026. Confira migri.fi ou eu-etias.eu antes de reservar.',
      },
      {
        n: '05',
        title: 'Como se locomover',
        body:
          'A maioria dos pacotes inclui todos os traslados. Para estender por conta própria: voos domésticos entre Helsinque ↔ Rovaniemi/Kittilä/Ivalo, o trem-leito noturno VR Helsinque–Rovaniemi ou um carro alugado em qualquer um dos três aeroportos da Lapônia.',
      },
      {
        n: '06',
        title: 'Saúde e segurança',
        body:
          'A saúde pública finlandesa é excelente. Cidadãos da UE usam o EHIC/GHIC; viajantes de fora da UE precisam de seguro-viagem. A água da torneira é potável. O risco de congelamento é real a partir de −25 °C: mantenha bochechas, nariz e dedos cobertos. Disque 112 em qualquer emergência.',
      },
    ],
    addonsEyebrow: 'Planeje os extras',
    addonsH2: 'Três trilhos para estender a viagem',
    addonHotel: 'Diária de hotel →',
    addonCar: 'Autotour →',
    addonActivity: 'Atividade de um dia →',
  },
  'zh-CN': {
    metaTitle: '实用信息：芬兰拉普兰的气候、签证与交通 | #LaplandTours',
    metaDescription:
      '一份前往芬兰拉普兰的行前须知：如何抵达、各季节气候、签证规定、行李清单、当地交通，以及健康与安全要点。',
    canonical: 'https://laplandtours.online/cn/practical-info',
    breadcrumbHome: '首页',
    breadcrumbName: '实用信息',
    articleHeadline: '实用信息：芬兰拉普兰的气候、签证与交通',
    articleDescription:
      '一份前往芬兰拉普兰的实用行前须知：如何抵达、各季节气候、签证规定、行李清单，以及如何延长套餐。',
    h1: '−30 °C',
    ariaH1: '零下三十摄氏度',
    lead:
      '这是拉普兰典型冬夜的最低气温，也是运营商发放保暖连体服的原因。其余的规划无非是日历、文件和几个电话号码。以下是预订前要了解的六件事。',
    altHero: '一条单车道雪路穿过广袤无边的拉普兰北方针叶林',
    sections: [
      {
        n: '01',
        title: '如何抵达',
        body:
          '前往罗瓦涅米（RVN）、基蒂莱（KTT）或伊瓦洛（IVL），可搭芬兰航空经赫尔辛基，再转一小时的国内航班，或乘 VR 夜间卧铺列车（12 小时，可平躺的卧铺包厢）。',
      },
      {
        n: '02',
        title: '气候与行李',
        body:
          '冬季（11 月至 3 月）：−5 °C 到 −30 °C。运营商提供保暖连体服、靴子和手套。请自备保暖打底层、羊毛中间层、保暖帽、脖套、连指手套和结实的徒步靴。夏季（6 月至 8 月）：10–25 °C，蚊虫多，记得带驱蚊液。',
      },
      {
        n: '03',
        title: '何时出发',
        body:
          '极光季从九月到三月（11 月至 2 月为高峰）。圣诞老人主题行程：12 月 1 日至 24 日。雪季：11 月底至 4 月。午夜阳光：5 月底至 7 月底。秋季 ruska（红叶）：9 月中旬。',
      },
      {
        n: '04',
        title: '签证与证件',
        body:
          '欧盟/欧洲经济区公民凭护照或身份证即可。来自英国、美国、加拿大和澳大利亚的旅客按申根规定可免签停留至多 90 天。自 2026 年底起，ETIAS 授权开始适用于免签旅客。预订前请查阅 migri.fi 或 eu-etias.eu。',
      },
      {
        n: '05',
        title: '当地交通',
        body:
          '多数套餐已含所有接送。若想自行延长行程：赫尔辛基 ↔ 罗瓦涅米/基蒂莱/伊瓦洛之间的国内航班、赫尔辛基–罗瓦涅米的 VR 夜间卧铺列车，或在三座拉普兰机场中任何一座租车自驾。',
      },
      {
        n: '06',
        title: '健康与安全',
        body:
          '芬兰公共医疗水平很高。欧盟公民使用 EHIC/GHIC；非欧盟旅客需购买旅行保险。自来水可直接饮用。−25 °C 以下冻伤风险真实存在，请遮好脸颊、鼻子和手指。任何紧急情况请拨打 112。',
      },
    ],
    addonsEyebrow: '规划附加项',
    addonsH2: '延长行程的三条线路',
    addonHotel: '酒店住宿 →',
    addonCar: '自驾 →',
    addonActivity: '一日活动 →',
  },
};

/** Icon per numbered section (01–06), arctic-cyan chip per the LV card pattern. */
const SECTION_ICONS = [Plane, Thermometer, CalendarDays, FileCheck2, TrainFront, HeartPulse];

/**
 * Hero stat tiles — REAL numbers from this page's own sections: 3 Lapland
 * airports (RVN/KTT/IVL, §01), 12 h VR night train (§01/§05), 90 visa-free
 * days under Schengen (§04), 112 emergency number (§06).
 */
const STATS: Record<CopyLang, { value: string; label: string }[]> = {
  en: [
    { value: '3', label: 'Lapland airports' },
    { value: '12 h', label: 'Night train from HEL' },
    { value: '90', label: 'Visa-free days' },
    { value: '112', label: 'Emergency number' },
  ],
  fi: [
    { value: '3', label: 'Lapin lentokenttää' },
    { value: '12 h', label: 'Yöjuna Helsingistä' },
    { value: '90', label: 'Viisumivapaata päivää' },
    { value: '112', label: 'Hätänumero' },
  ],
  de: [
    { value: '3', label: 'Lappland-Flughäfen' },
    { value: '12 h', label: 'Nachtzug ab Helsinki' },
    { value: '90', label: 'Visafreie Tage' },
    { value: '112', label: 'Notruf' },
  ],
  ja: [
    { value: '3', label: 'ラップランドの空港' },
    { value: '12 h', label: 'ヘルシンキ発夜行列車' },
    { value: '90', label: 'ビザなし滞在日数' },
    { value: '112', label: '緊急番号' },
  ],
  ko: [
    { value: '3', label: '라플란드 공항' },
    { value: '12 h', label: '헬싱키발 야간열차' },
    { value: '90', label: '무비자 체류일' },
    { value: '112', label: '응급 전화' },
  ],
  fr: [
    { value: '3', label: 'Aéroports lapons' },
    { value: '12 h', label: 'Train de nuit depuis HEL' },
    { value: '90', label: 'Jours sans visa' },
    { value: '112', label: 'Numéro d\'urgence' },
  ],
  it: [
    { value: '3', label: 'Aeroporti lapponi' },
    { value: '12 h', label: 'Treno notturno da HEL' },
    { value: '90', label: 'Giorni senza visto' },
    { value: '112', label: 'Numero di emergenza' },
  ],
  nl: [
    { value: '3', label: 'Lapland-luchthavens' },
    { value: '12 u', label: 'Nachttrein vanaf HEL' },
    { value: '90', label: 'Visumvrije dagen' },
    { value: '112', label: 'Noodnummer' },
  ],
  sv: [
    { value: '3', label: 'Flygplatser i Lappland' },
    { value: '12 h', label: 'Nattåg från Helsingfors' },
    { value: '90', label: 'Visumfria dagar' },
    { value: '112', label: 'Nödnummer' },
  ],
  es: [
    { value: '3', label: 'Aeropuertos lapones' },
    { value: '12 h', label: 'Tren nocturno desde HEL' },
    { value: '90', label: 'Días sin visado' },
    { value: '112', label: 'Número de emergencias' },
  ],
  'pt-BR': [
    { value: '3', label: 'Aeroportos da Lapônia' },
    { value: '12 h', label: 'Trem noturno de HEL' },
    { value: '90', label: 'Dias sem visto' },
    { value: '112', label: 'Número de emergência' },
  ],
  'zh-CN': [
    { value: '3', label: '拉普兰机场' },
    { value: '12 h', label: '赫尔辛基夜间列车' },
    { value: '90', label: '免签天数' },
    { value: '112', label: '紧急电话' },
  ],
};

export default function PracticalInfo() {
  const lang = useLang();
  const c = COPY[copyLang(lang)];
  useEffect(() => {
    setPageMeta({
      title: c.metaTitle,
      description: c.metaDescription,
      canonical: c.canonical,
      jsonLd: [
        breadcrumbList([
          { name: c.breadcrumbHome, path: lang === 'en' ? '/' : `/${LANG_TO_PREFIX[lang]}` },
          { name: c.breadcrumbName, path: lang === 'en' ? '/practical-info' : `/${LANG_TO_PREFIX[lang]}/practical-info` },
        ]),
        articleSchema({
          headline: c.articleHeadline,
          description: c.articleDescription,
          path: lang === 'en' ? '/practical-info' : `/${LANG_TO_PREFIX[lang]}/practical-info`,
        }),
      ],
    });
  }, [lang, c]);

  return (
    <>
      <section className="relative bg-deep-night overflow-hidden flex items-center min-h-[46svh] md:min-h-[52svh]">
        <ImagePlaceholder
          variant="ice"
          src="/images/hero-practical.webp"
          alt={c.altHero}
          priority
          imgClassName="brightness-[1.35] saturate-[1.1]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(15,23,42,0.66) 0%, rgba(15,23,42,0.24) 50%, rgba(15,23,42,0.06) 100%)',
          }}
        />
        <div className="relative z-10 max-w-[1300px] w-full mx-auto px-6 sm:px-10 pt-14 sm:pt-16 pb-24 md:pb-28 flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1
            className="font-heading text-vibe-pink leading-[0.78] tracking-tighter drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]"
            style={{ fontSize: 'clamp(3.5rem,12vw,9rem)' }}
            aria-label={c.ariaH1}
          >
            {c.h1}
          </h1>
          <p className="mt-6 text-snow/90 text-lg sm:text-xl leading-relaxed font-body max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {c.lead}
          </p>
        </div>
      </section>

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 sm:px-10 -mt-14 md:-mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {STATS[copyLang(lang)].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-white/10 bg-deep-night/85 backdrop-blur-md p-4 md:p-5 text-center shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            >
              <p className="font-heading text-4xl md:text-5xl text-vibe-pink leading-none">{s.value}</p>
              <p className="cap-meta mt-2 !tracking-[0.14em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <PageBreadcrumb />

      <section className="bg-deep-night py-16 sm:py-24">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 grid md:grid-cols-2 gap-5 md:gap-6">
          {c.sections.map((s, i) => {
            const Icon = SECTION_ICONS[i] ?? Plane;
            return (
              <article
                key={s.n}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                    style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.30)' }}
                  >
                    <Icon className="w-5 h-5 text-arctic-cyan" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="cap-meta block">{s.n}</span>
                    <h2 className="font-heading tracking-wide text-snow text-2xl sm:text-3xl leading-tight">
                      {s.title}
                    </h2>
                  </div>
                </div>
                <p className="text-snow/70 font-body text-[15px] sm:text-base leading-[1.7]">
                  {s.body}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-deeper-night py-16 sm:py-20">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 grid grid-cols-1 sm:grid-cols-12 gap-6">
          <div className="sm:col-span-5">
            <p className="cap-meta">{c.addonsEyebrow}</p>
            <h2 className="mt-2 font-heading tracking-wide text-snow text-3xl sm:text-4xl leading-tight">
              {c.addonsH2}
            </h2>
          </div>
          <div className="sm:col-span-6 sm:col-start-7 grid sm:grid-cols-3 gap-3 self-end">
            <AffiliateCTA
              partner="hotels"
              sid="practical_hotels_cta"
              destination="Rovaniemi"
              className="block px-5 py-4 bg-vibe-pink text-white font-body font-semibold hover:bg-vibe-pink/90 transition-colors text-[15px]"
            >
              {c.addonHotel}
            </AffiliateCTA>
            <AffiliateCTA
              partner="cars"
              sid="practical_cars_cta"
              destination="RVN"
              className="block px-5 py-4 border border-snow/30 text-snow font-body font-medium hover:border-vibe-pink hover:text-vibe-pink transition-colors text-[15px]"
            >
              {c.addonCar}
            </AffiliateCTA>
            <AffiliateCTA
              partner="activities"
              sid="practical_activities_cta"
              destination="s569-finnish-lapland-tc16"
              gygSearch="Lapland activities Rovaniemi"
              className="block px-5 py-4 border border-snow/30 text-snow font-body font-medium hover:border-vibe-pink hover:text-vibe-pink transition-colors text-[15px]"
            >
              {c.addonActivity}
            </AffiliateCTA>
          </div>
        </div>
      </section>

      <div className="bg-deep-night py-6 px-4">
        <AffiliateDisclosure variant="full" />
      </div>
    </>
  );
}
