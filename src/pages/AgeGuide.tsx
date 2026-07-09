import { useEffect } from 'react';
import AffiliateDisclosure from '../components/AffiliateDisclosure';
import EditorialStandards from '../components/EditorialStandards';
import ImagePlaceholder from '../components/ImagePlaceholder';
import PageBreadcrumb from '../components/PageBreadcrumb';
import { setPageMeta, breadcrumbList, articleSchema } from '../lib/meta';
import { useLang, type Lang, type CopyLang, copyLang, LANG_TO_PREFIX } from '../i18n/useLang';

type Cell = string | { v: string; note?: string };

interface Row {
  range: string;
  label: string;
  summary: string;
  cells: Cell[];
}

const COPY: Record<CopyLang, {
  metaTitle: string;
  metaDescription: string;
  canonical: string;
  breadcrumbHome: string;
  breadcrumbName: string;
  articleHeadline: string;
  articleDescription: string;
  lead: string;
  matrixEyebrow: string;
  ageHeader: string;
  legend: string;
  activities: string[];
  rows: Row[];
  altHero: string;
}> = {
  en: {
    metaTitle: 'Age guide: which Lapland activities suit which age | #LaplandTours',
    metaDescription:
      'A practical age-by-activity matrix for Finnish Lapland. See which tours work for infants, pre-schoolers, early-school, tweens, teens and adults, and which operators specialise in each band.',
    canonical: 'https://laplandtours.online/age-guide',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Age guide',
    articleHeadline: 'Age guide: which Lapland activities suit which age',
    articleDescription:
      'An age-by-activity matrix for Finnish Lapland tours, infants to 16+.',
    lead:
      'Which Lapland activities work at which age, and which do not. A practical matrix covering five age bands and the six staples: aurora hunt, husky, snowmobile, reindeer, sauna, glass igloo.',
    matrixEyebrow: 'The matrix',
    ageHeader: 'Age',
    legend: '✓ available · — not offered · "passenger" / "tandem" / "solo" specifies the role',
    activities: ['Aurora hunt', 'Husky', 'Snowmobile', 'Reindeer', 'Sauna', 'Glass igloo'],
    altHero: 'Snowy fell summit at golden hour in Finnish Lapland',
    rows: [
      {
        range: '0–2',
        label: 'Infants',
        summary:
          'A trip about the adults seeing the place with a baby in tow. Sub-zero rules out an everyday pram. Bring an arctic carrier or buggy bag. Most operators offer a free or discounted infant rate.',
        cells: [
          '✓',
          { v: '—', note: 'too cold, sled motion' },
          { v: '—', note: 'no infants' },
          '—',
          { v: 'limited', note: 'short low-temp only' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: 'Pre-school',
        summary:
          "The sweet spot for Santa-themed packages. Santa's Lapland and TUI build the itinerary around this age. Reindeer rides, Santa visit, snowmobile passenger sled, tobogganing all work.",
        cells: [
          { v: 'short', note: 'late-evening cap' },
          { v: 'passenger', note: 'short, supervised' },
          { v: 'passenger', note: 'parent drives, child sled' },
          '✓',
          { v: 'limited', note: 'family slot only' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: 'Early school',
        summary:
          'Active enough for half-day husky and snowmobile safaris (as passenger). Aurora hunts work if late-evening start times suit. Skiing programmes start to make sense at Levi, Ylläs, Saariselkä.',
        cells: [
          '✓',
          { v: 'passenger', note: 'half-day' },
          { v: 'passenger', note: 'half-day' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: 'Tweens & teens',
        summary:
          'All standard activities open up. From age 12+, many operators allow tandem snowmobile driving with a parent. Adventure-week packages (Transun, Inghams Adventure) target this age strongly.',
        cells: [
          '✓',
          '✓',
          { v: 'tandem 12+', note: 'parent on bike' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: 'Independent',
        summary:
          'Treated as adults for most activities. Solo snowmobile driving with full driving licence (16+ in Finland), longer husky drives, ice climbing, multi-day fell hiking. Aurora photography workshops also need this maturity.',
        cells: [
          '✓',
          '✓',
          { v: 'solo', note: 'driving licence required' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  fi: {
    metaTitle: 'Ikäopas: Lapin retket eri ikäisille | #LaplandTours',
    metaDescription:
      'Käytännön ikä × retki -taulukko Suomen Lapin matkoille: mikä sopii vauvalle, lapselle, teinille ja aikuiselle ja mihin kukin matkanjärjestäjä on erikoistunut.',
    canonical: 'https://laplandtours.online/fi/age-guide',
    breadcrumbHome: 'Etusivu',
    breadcrumbName: 'Ikäopas',
    articleHeadline: 'Ikäopas: mitkä Lapin retket sopivat mihinkin ikään',
    articleDescription: 'Ikäkohtainen retkitaulukko Suomen Lapin matkanjärjestäjille, vauvasta 16+ vuotiaisiin.',
    lead:
      'Mitkä Lapin päiväretket sopivat mihinkin ikään ja mitkä eivät. Käytännön taulukko viidessä ikäryhmässä ja kuudessa peruspaketissa: revontulet, husky, kelkka, poro, sauna, lasi-iglu.',
    matrixEyebrow: 'Taulukko',
    ageHeader: 'Ikä',
    legend: '✓ tarjolla · — ei tarjolla · "matkustaja" / "tandem" / "yksin" kertoo roolin',
    activities: ['Revontuliretki', 'Husky', 'Kelkkasafari', 'Pororetki', 'Sauna', 'Lasi-iglu'],
    altHero: 'Luminen tunturin huippu kultaisen tunnin valossa Suomen Lapissa',
    rows: [
      {
        range: '0–2',
        label: 'Vauvat',
        summary:
          'Matka on aikuisten näkökulmaa, vauva kulkee mukana. Pakkanen sulkee pois tavallisen rattaan, joten mukaan arktinen kantoreppu tai rattaiden lämpöpussi. Useimmat matkanjärjestäjät tarjoavat vauvalle ilmaisen tai alennetun hinnan.',
        cells: [
          '✓',
          { v: '—', note: 'liian kylmää, kelkan tärinä' },
          { v: '—', note: 'ei vauvoille' },
          '—',
          { v: 'rajoitetusti', note: 'vain hyvin lyhyt ja viileä saunavuoro' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: 'Eskari',
        summary:
          "Joulu­matkojen ydinikä. Ohjelmat rakennetaan usein juuri tämän ikäisille. Pororetket, joulupukin vierailu, kelkan kyydissä lasten reki ja pulkkailu toimivat.",
        cells: [
          { v: 'lyhyt', note: 'iltakatkaisu' },
          { v: 'matkustaja', note: 'lyhyt, valvottu' },
          { v: 'matkustaja', note: 'vanhempi ajaa, lapsi reessä' },
          '✓',
          { v: 'rajoitetusti', note: 'vain perhevuoro' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: 'Alaluokat',
        summary:
          'Riittävän aktiivinen puolen päivän husky- ja kelkkasafarille (matkustajana). Revontuliretket onnistuvat, jos myöhäinen lähtö sopii. Hiihto-ohjelmat alkavat olla mielekkäitä Levillä, Ylläksellä ja Saariselällä.',
        cells: [
          '✓',
          { v: 'matkustaja', note: 'puolen päivän retki' },
          { v: 'matkustaja', note: 'puolen päivän retki' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: 'Varhaisteinit',
        summary:
          'Kaikki perusretket aukeavat. 12-vuotiaasta moni matkanjärjestäjä sallii kelkan tandem-ajon vanhemman kanssa. Monipäiväiset seikkailuviikot on suunnattu vahvasti tähän ikäluokkaan.',
        cells: [
          '✓',
          '✓',
          { v: 'tandem 12+', note: 'vanhempi ajaa' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: 'Itsenäiset',
        summary:
          'Kohdellaan aikuisina useimmissa retkissä. Itsenäinen kelkka-ajo täydellä ajokortilla (Suomessa 16+), pidemmät huskyretket, jääkiipeily, monipäiväiset tunturivaellukset. Revontulivalokuvauksen työpajat vaativat myös tätä ikää.',
        cells: [
          '✓',
          '✓',
          { v: 'yksin', note: 'ajokortti vaaditaan' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  de: {
    metaTitle: 'Alters-Guide: Lappland-Tour je Alter | #LaplandTours',
    metaDescription:
      'Eine praktische Matrix Alter × Tour für Finnisch-Lappland. Was für Kinder, Teenager und Erwachsene funktioniert und welche Veranstalter sich spezialisieren.',
    canonical: 'https://laplandtours.online/de/age-guide',
    breadcrumbHome: 'Start',
    breadcrumbName: 'Alters-Guide',
    articleHeadline: 'Alters-Guide: welche Lappland-Tour zu welchem Alter passt',
    articleDescription:
      'Eine Matrix Alter × Tour für Lappland-Reisen von Säuglingen bis 16+.',
    lead:
      'Welche Lappland-Tagestouren zu welchem Alter passen, und welche nicht. Eine praktische Matrix für fünf Altersgruppen und die sechs Klassiker: Polarlichtjagd, Husky, Schneemobil, Rentier, Sauna, Glas-Iglu.',
    matrixEyebrow: 'Die Matrix',
    ageHeader: 'Alter',
    legend: '✓ verfügbar · — nicht im Angebot · "Mitfahrer" / "Tandem" / "selbst" beschreibt die Rolle',
    activities: ['Polarlichtjagd', 'Husky', 'Schneemobil', 'Rentier', 'Sauna', 'Glas-Iglu'],
    altHero: 'Verschneiter Fjäll-Gipfel im goldenen Licht in Finnisch-Lappland',
    rows: [
      {
        range: '0–2',
        label: 'Säuglinge',
        summary:
          'Eine Reise aus Sicht der Erwachsenen, mit Baby im Gepäck. Bei Minustemperaturen ist ein normaler Kinderwagen ungeeignet. Eine Arktis-Trage oder ein Wagensack ist nötig. Die meisten Reiseveranstalter bieten einen kostenfreien oder vergünstigten Säuglingstarif.',
        cells: [
          '✓',
          { v: '—', note: 'zu kalt, Schlittenbewegung' },
          { v: '—', note: 'keine Säuglinge' },
          '—',
          { v: 'eingeschränkt', note: 'nur sehr kurz und mild' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: 'Vorschule',
        summary:
          "Kernalter der Weihnachtspakete. Die Programme werden oft um dieses Alter herum gebaut. Rentier-Schlittenfahrten, Besuch beim Weihnachtsmann, Schneemobil-Mitfahrt im Kinderschlitten und Schlittenfahren funktionieren.",
        cells: [
          { v: 'kurz', note: 'frühe Rückkehr' },
          { v: 'Mitfahrer', note: 'kurz, betreut' },
          { v: 'Mitfahrer', note: 'Eltern fahren, Kind im Schlitten' },
          '✓',
          { v: 'eingeschränkt', note: 'nur Familiensauna' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: 'Grundschule',
        summary:
          'Aktiv genug für eine halbtägige Husky- und Schneemobiltour (als Mitfahrer). Polarlichtjagden funktionieren, wenn die spätere Abfahrtszeit passt. Skiprogramme werden in Levi, Ylläs und Saariselkä sinnvoll.',
        cells: [
          '✓',
          { v: 'Mitfahrer', note: 'halbtags' },
          { v: 'Mitfahrer', note: 'halbtags' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: 'Tweens & Teens',
        summary:
          'Alle Standardtouren stehen offen. Ab 12 Jahren erlauben viele Reiseveranstalter das Tandem-Fahren des Schneemobils mit einem Elternteil. Mehrtägige Abenteuerwochen zielen stark auf diese Altersgruppe.',
        cells: [
          '✓',
          '✓',
          { v: 'Tandem 12+', note: 'Elternteil fährt' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: 'Eigenständig',
        summary:
          'Werden bei den meisten Touren wie Erwachsene behandelt. Eigenes Schneemobil mit Führerschein (in Finnland ab 16), längere Husky-Touren, Eisklettern, mehrtägige Fjäll-Wanderungen. Polarlicht-Fotoworkshops setzen ebenfalls dieses Alter voraus.',
        cells: [
          '✓',
          '✓',
          { v: 'selbst', note: 'Führerschein erforderlich' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  ja: {
    metaTitle: '年齢別ガイド：ラップランドのアクティビティが適した年齢層 | #LaplandTours',
    metaDescription:
      'フィンランド・ラップランドの年齢別アクティビティマトリクス。乳児、未就学児、学童、ティーンエイジャー、大人それぞれに合うツアー、各年齢層を得意とするオペレーターをご紹介します。',
    canonical: 'https://laplandtours.online/ja/age-guide',
    breadcrumbHome: 'ホーム',
    breadcrumbName: '年齢別ガイド',
    articleHeadline: '年齢別ガイド：ラップランドのアクティビティが適した年齢層',
    articleDescription:
      'フィンランド・ラップランドのツアーの年齢別アクティビティマトリクス、乳児から16歳以上まで。',
    lead:
      'ラップランドのどのアクティビティがどの年齢に適しているか、そして適していないか。5つの年齢層と6つの定番（オーロラ観察、ハスキー、スノーモービル、トナカイ、サウナ、ガラスイグルー）をカバーする実用的なマトリクスです。',
    matrixEyebrow: 'マトリクス',
    ageHeader: '年齢',
    legend: '✓ 利用可能 · — 提供なし · 「passenger(同乗者)」/「tandem(タンデム)」/「solo(単独)」は役割を示します',
    activities: ['オーロラ観察', 'ハスキー', 'スノーモービル', 'トナカイ', 'サウナ', 'ガラスイグルー'],
    altHero: 'フィンランド・ラップランドのゴールデンアワーに輝く雪の山頂',
    rows: [
      {
        range: '0〜2歳',
        label: '乳児',
        summary:
          '赤ちゃん連れで大人がラップランドを楽しむ旅。氷点下のため通常のベビーカーは使えません。北極用のキャリアやバギーバッグをご持参ください。ほとんどのオペレーターが乳児に無料または割引料金を提供します。',
        cells: [
          '✓',
          { v: '—', note: '寒すぎ、そりの揺れあり' },
          { v: '—', note: '乳児不可' },
          '—',
          { v: '限定', note: '低温・短時間のみ' },
          '✓',
        ],
      },
      {
        range: '3〜5歳',
        label: '未就学児',
        summary:
          'サンタクロースをテーマにしたパッケージの主要対象層です。地元の事業者はこの年齢を中心に旅程を組み立てています。トナカイそり、サンタ訪問、スノーモービルの同乗そり、そり遊びすべてが楽しめます。',
        cells: [
          { v: '短時間', note: '夜遅い時間まで' },
          { v: '同乗', note: '短時間、監督下' },
          { v: '同乗', note: '親が運転、お子様はそりに' },
          '✓',
          { v: '限定', note: '家族向け時間枠のみ' },
          '✓',
        ],
      },
      {
        range: '6〜9歳',
        label: '小学生低学年',
        summary:
          '半日のハスキーやスノーモービルサファリ(同乗)に十分なアクティブさ。夜遅い開始時間が合えばオーロラ観察も。レヴィ、ユッラス、サーリセルカでのスキープログラムも始められます。',
        cells: [
          '✓',
          { v: '同乗', note: '半日' },
          { v: '同乗', note: '半日' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10〜15歳',
        label: 'プレティーン・ティーン',
        summary:
          'すべての標準アクティビティが利用可能になります。12歳以上では、多くのオペレーターが親とのタンデムスノーモービル運転を許可します。数日間のアドベンチャー週間はこの年齢層を強くターゲットにしています。',
        cells: [
          '✓',
          '✓',
          { v: 'タンデム12+', note: '親が運転' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16歳以上',
        label: '独立した行動が可能',
        summary:
          'ほとんどのアクティビティで大人として扱われます。運転免許保有(フィンランドでは16歳以上)があれば単独でスノーモービル運転、より長距離のハスキー、アイスクライミング、複数日の登山が可能。オーロラ写真ワークショップにもこの成熟度が必要です。',
        cells: [
          '✓',
          '✓',
          { v: '単独', note: '運転免許必要' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  ko: {
    metaTitle: '연령 가이드: 어떤 라플란드 액티비티가 어느 연령에 맞나요 | #LaplandTours',
    metaDescription:
      '핀란드 라플란드의 실용 연령 × 액티비티 매트릭스. 영유아, 미취학, 초등 저학년, 청소년, 성인 각 연령에 맞는 투어와 각 그룹에 강한 운영사 소개.',
    canonical: 'https://laplandtours.online/kr/age-guide',
    breadcrumbHome: '홈',
    breadcrumbName: '연령 가이드',
    articleHeadline: '연령 가이드: 어떤 라플란드 액티비티가 어느 연령에 맞나요',
    articleDescription:
      '영유아부터 16세 이상까지, 핀란드 라플란드 투어의 연령 × 액티비티 매트릭스.',
    lead:
      '라플란드의 어떤 액티비티가 어느 연령에 맞고, 어떤 것은 맞지 않는지. 다섯 개 연령대와 여섯 가지 대표 액티비티(오로라 헌트, 허스키, 스노모빌, 순록, 사우나, 글래스 이글루)를 다루는 실용 매트릭스입니다.',
    matrixEyebrow: '매트릭스',
    ageHeader: '연령',
    legend: '✓ 가능 · — 미제공 · "동승자" / "탠덤" / "단독" 은 역할을 의미합니다',
    activities: ['오로라 헌트', '허스키', '스노모빌', '순록', '사우나', '글래스 이글루'],
    altHero: '핀란드 라플란드의 황금빛 시간 속 눈 덮인 펠 정상',
    rows: [
      {
        range: '0~2세',
        label: '영아',
        summary:
          '아기와 함께 어른들이 이곳을 보러 가는 여행입니다. 영하 기온에서는 일반 유모차가 어렵습니다. 북극용 캐리어나 유모차 보온 백을 준비하세요. 대부분의 운영사가 영아에게 무료 또는 할인 요금을 제공합니다.',
        cells: [
          '✓',
          { v: '—', note: '너무 춥고 썰매 진동' },
          { v: '—', note: '영아 불가' },
          '—',
          { v: '제한적', note: '저온·단시간만' },
          '✓',
        ],
      },
      {
        range: '3~5세',
        label: '미취학',
        summary:
          "산타 테마 패키지의 핵심 연령대입니다. 이 연령대에 맞춰 일정을 구성하는 운영사가 많습니다. 순록 썰매, 산타 방문, 스노모빌 동승 어린이 썰매, 썰매 타기가 모두 가능합니다.",
        cells: [
          { v: '단시간', note: '늦은 저녁 제한' },
          { v: '동승자', note: '단시간, 감독 하에' },
          { v: '동승자', note: '부모 운전, 아이 썰매' },
          '✓',
          { v: '제한적', note: '가족 시간대만' },
          '✓',
        ],
      },
      {
        range: '6~9세',
        label: '초등 저학년',
        summary:
          '반나절 허스키와 스노모빌 사파리(동승자)에 충분한 활동량. 늦은 저녁 출발이 괜찮다면 오로라 헌트도 가능합니다. 레비, 윌래스, 사리셀카에서의 스키 프로그램이 의미를 갖기 시작합니다.',
        cells: [
          '✓',
          { v: '동승자', note: '반나절' },
          { v: '동승자', note: '반나절' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10~15세',
        label: '청소년',
        summary:
          '모든 표준 액티비티가 가능해집니다. 12세 이상부터 많은 운영사가 부모와의 탠덤 스노모빌 운전을 허용합니다. 여러 날에 걸친 어드벤처 위크는 이 연령대를 강하게 겨냥합니다.',
        cells: [
          '✓',
          '✓',
          { v: '탠덤 12+', note: '부모가 운전' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16세 이상',
        label: '독립적 행동 가능',
        summary:
          '대부분의 액티비티에서 성인으로 대우받습니다. 핀란드 운전면허(16세 이상) 보유 시 단독 스노모빌 운전, 더 긴 허스키 주행, 빙벽 등반, 여러 날에 걸친 펠 트레킹 가능. 오로라 사진 워크숍 역시 이 정도의 성숙도가 필요합니다.',
        cells: [
          '✓',
          '✓',
          { v: '단독', note: '운전면허 필요' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  fr: {
    metaTitle: 'Guide par âge : activités en Laponie | #LaplandTours',
    metaDescription:
      'Une matrice pratique âge × activité pour la Laponie finlandaise : quelles excursions pour enfants, ados et adultes, et quels voyagistes se spécialisent.',
    canonical: 'https://laplandtours.online/fr/age-guide',
    breadcrumbHome: 'Accueil',
    breadcrumbName: 'Guide par âge',
    articleHeadline: 'Guide par âge : quelles activités en Laponie selon l\'âge',
    articleDescription:
      'Une matrice âge × activité pour les circuits en Laponie finlandaise, du nourrisson aux 16 ans et plus.',
    lead:
      'Quelles activités en Laponie fonctionnent à quel âge, et lesquelles ne fonctionnent pas. Une matrice pratique couvrant cinq tranches d\'âge et les six classiques : chasse aux aurores, husky, motoneige, renne, sauna, iglou de verre.',
    matrixEyebrow: 'La matrice',
    ageHeader: 'Âge',
    legend: '✓ disponible · — non proposé · « passager » / « tandem » / « seul » indique le rôle',
    activities: ['Chasse aux aurores', 'Husky', 'Motoneige', 'Renne', 'Sauna', 'Iglou de verre'],
    altHero: 'Sommet de fjäll enneigé à l\'heure dorée en Laponie finlandaise',
    rows: [
      {
        range: '0–2',
        label: 'Nourrissons',
        summary:
          'Un voyage où les adultes découvrent le lieu avec un bébé. Les températures négatives excluent la poussette habituelle. Prévoyez un porte-bébé arctique ou un sac chaud pour la nacelle. La plupart des voyagistes proposent un tarif gratuit ou réduit pour les nourrissons.',
        cells: [
          '✓',
          { v: '—', note: 'trop froid, secousses du traîneau' },
          { v: '—', note: 'pas pour nourrissons' },
          '—',
          { v: 'limité', note: 'court et peu chaud seulement' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: 'Maternelle',
        summary:
          "Tranche idéale pour les forfaits Père Noël. Les programmes sont souvent construits autour de cet âge. Traîneau à rennes, visite au Père Noël, motoneige avec traîneau enfant à l\'arrière et descentes en luge fonctionnent.",
        cells: [
          { v: 'court', note: 'retour en début de soirée' },
          { v: 'passager', note: 'court, encadré' },
          { v: 'passager', note: 'parent conduit, enfant en traîneau' },
          '✓',
          { v: 'limité', note: 'créneau famille uniquement' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: 'Primaire',
        summary:
          'Assez en forme pour une demi-journée husky et motoneige (en passager). Les chasses aux aurores fonctionnent si les départs en soirée conviennent. Les programmes de ski commencent à avoir du sens à Levi, Ylläs, Saariselkä.',
        cells: [
          '✓',
          { v: 'passager', note: 'demi-journée' },
          { v: 'passager', note: 'demi-journée' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: 'Pré-ados et ados',
        summary:
          'Toutes les activités standard s\'ouvrent. À partir de 12 ans, beaucoup de voyagistes autorisent la conduite en tandem de la motoneige avec un parent. Les semaines aventure de plusieurs jours ciblent fortement cet âge.',
        cells: [
          '✓',
          '✓',
          { v: 'tandem 12+', note: 'parent au guidon' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: 'Autonomes',
        summary:
          'Traités comme des adultes pour la plupart des activités. Conduite de motoneige en solo avec permis (16+ en Finlande), sorties husky plus longues, escalade sur glace, randonnées de plusieurs jours en fjäll. Les ateliers de photographie d\'aurore demandent aussi cette maturité.',
        cells: [
          '✓',
          '✓',
          { v: 'seul', note: 'permis requis' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  it: {
    metaTitle: 'Guida per età: attività in Lapponia | #LaplandTours',
    metaDescription:
      'Una matrice pratica età × attività per la Lapponia finlandese: quali escursioni per bambini, adolescenti e adulti, e quali operatori si specializzano.',
    canonical: 'https://laplandtours.online/it/age-guide',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Guida per età',
    articleHeadline: 'Guida per età: quali attività in Lapponia per quale età',
    articleDescription:
      'Una matrice età × attività per i tour in Lapponia finlandese, dai neonati ai 16+.',
    lead:
      'Quali attività in Lapponia funzionano a quale età e quali no. Una matrice pratica che copre cinque fasce di età e i sei classici: caccia all\'aurora, husky, motoslitta, renna, sauna, iglù di vetro.',
    matrixEyebrow: 'La matrice',
    ageHeader: 'Età',
    legend: '✓ disponibile · — non offerto · "passeggero" / "tandem" / "da solo" indica il ruolo',
    activities: ['Caccia all\'aurora', 'Husky', 'Motoslitta', 'Renna', 'Sauna', 'Iglù di vetro'],
    altHero: 'Vetta di un fjäll innevato all\'ora d\'oro in Lapponia finlandese',
    rows: [
      {
        range: '0–2',
        label: 'Neonati',
        summary:
          'Un viaggio in cui sono gli adulti a vivere il luogo, con un neonato al seguito. Le temperature sotto zero escludono il passeggino normale. Porti un marsupio artico o una sacca termica. La maggior parte degli operatori prevede tariffa gratuita o ridotta per i neonati.',
        cells: [
          '✓',
          { v: '—', note: 'troppo freddo, sobbalzi della slitta' },
          { v: '—', note: 'no neonati' },
          '—',
          { v: 'limitata', note: 'solo molto breve e a bassa temperatura' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: 'Prescolari',
        summary:
          "Età d\'oro per i pacchetti a tema Babbo Natale. I programmi sono spesso costruiti intorno a questa fascia. Slitta trainata dalle renne, incontro con Babbo Natale, motoslitta con slitta per bambino al traino e discese in slittino funzionano.",
        cells: [
          { v: 'breve', note: 'rientro a inizio serata' },
          { v: 'passeggero', note: 'breve, sotto sorveglianza' },
          { v: 'passeggero', note: 'genitore guida, bambino sulla slitta' },
          '✓',
          { v: 'limitata', note: 'solo turno famiglia' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: 'Primaria',
        summary:
          'Abbastanza attivi per una mezza giornata di husky e motoslitta (come passeggero). Le cacce all\'aurora funzionano se va bene una partenza in serata. I programmi di sci iniziano ad avere senso a Levi, Ylläs e Saariselkä.',
        cells: [
          '✓',
          { v: 'passeggero', note: 'mezza giornata' },
          { v: 'passeggero', note: 'mezza giornata' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: 'Pre-adolescenti e adolescenti',
        summary:
          'Si aprono tutte le attività standard. Dai 12 anni in su, molti operatori consentono la guida in tandem della motoslitta con un genitore. Le settimane avventura di più giorni puntano molto su questa fascia.',
        cells: [
          '✓',
          '✓',
          { v: 'tandem 12+', note: 'genitore alla guida' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: 'Autonomi',
        summary:
          'Trattati come adulti per la maggior parte delle attività. Guida in solitaria della motoslitta con patente (in Finlandia da 16 anni), uscite husky più lunghe, arrampicata su ghiaccio, trekking in fjäll di più giorni. Anche i workshop di fotografia dell\'aurora richiedono questa maturità.',
        cells: [
          '✓',
          '✓',
          { v: 'da solo', note: 'patente richiesta' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  nl: {
    metaTitle: 'Leeftijdsgids: Lapland per leeftijd | #LaplandTours',
    metaDescription:
      'Een praktische leeftijd × activiteit-matrix voor Fins Lapland: wat past bij kinderen, tieners en volwassenen, en welke reisorganisaties zich richten.',
    canonical: 'https://laplandtours.online/nl/age-guide',
    breadcrumbHome: 'Home',
    breadcrumbName: 'Leeftijdsgids',
    articleHeadline: 'Leeftijdsgids: welke Lapland-activiteit past bij welke leeftijd',
    articleDescription:
      'Een leeftijd × activiteit-matrix voor Lapland-reizen, van baby tot 16+.',
    lead:
      'Welke Lapland-activiteiten passen bij welke leeftijd, en welke niet. Een praktische matrix over vijf leeftijdsgroepen en de zes klassiekers: aurora-jacht, husky, sneeuwscooter, rendier, sauna, glaziglo.',
    matrixEyebrow: 'De matrix',
    ageHeader: 'Leeftijd',
    legend: '✓ mogelijk · — niet aangeboden · "passagier" / "tandem" / "solo" geeft de rol aan',
    activities: ['Aurora-jacht', 'Husky', 'Sneeuwscooter', 'Rendier', 'Sauna', 'Glaziglo'],
    altHero: 'Besneeuwde fjäll-top in het gouden uur in Fins Lapland',
    rows: [
      {
        range: '0–2',
        label: 'Baby\'s',
        summary:
          'Een reis waarbij volwassenen de plek beleven met een baby op sleeptouw. Min-graden sluiten een gewone kinderwagen uit. Neem een arctische draagzak of wagenzak mee. De meeste reisorganisaties bieden een gratis of korting-tarief voor baby\'s.',
        cells: [
          '✓',
          { v: '—', note: 'te koud, sledebewegingen' },
          { v: '—', note: 'geen baby\'s' },
          '—',
          { v: 'beperkt', note: 'alleen kort en laag in temperatuur' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: 'Kleuters',
        summary:
          "De ideale leeftijd voor kerstreizen. De programma's worden vaak rond deze leeftijd opgebouwd. Rendierritten, bezoek aan de Kerstman, sneeuwscooter met kinderslede en sleeën werken allemaal.",
        cells: [
          { v: 'kort', note: 'einde vroege avond' },
          { v: 'passagier', note: 'kort, onder begeleiding' },
          { v: 'passagier', note: 'ouder rijdt, kind op slede' },
          '✓',
          { v: 'beperkt', note: 'alleen gezinsmoment' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: 'Basisschool',
        summary:
          'Actief genoeg voor een halve dag husky- en sneeuwscootersafari (als passagier). Aurora-jachten kunnen, als een late starttijd uitkomt. Skiprogramma\'s gaan zinvol worden in Levi, Ylläs en Saariselkä.',
        cells: [
          '✓',
          { v: 'passagier', note: 'halve dag' },
          { v: 'passagier', note: 'halve dag' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: 'Tweens en tieners',
        summary:
          'Alle standaardactiviteiten gaan open. Vanaf 12 jaar staan veel reisorganisaties tandem-sneeuwscooterrijden met een ouder toe. Meerdaagse avontuurweken richten zich sterk op deze leeftijdsgroep.',
        cells: [
          '✓',
          '✓',
          { v: 'tandem 12+', note: 'ouder bestuurt' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: 'Zelfstandig',
        summary:
          'Worden bij de meeste activiteiten als volwassenen behandeld. Solo sneeuwscooter met rijbewijs (in Finland vanaf 16), langere husky-tochten, ijsklimmen, meerdaagse fjäll-tochten. Aurora-fotografieworkshops vragen ook deze leeftijd.',
        cells: [
          '✓',
          '✓',
          { v: 'solo', note: 'rijbewijs vereist' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  es: {
    metaTitle: 'Guía por edades: actividades en Laponia | #LaplandTours',
    metaDescription:
      'Una matriz práctica de edad × actividad para la Laponia finlandesa: qué sirve para bebés, niños, adolescentes y adultos, y en qué se especializa cada operador.',
    canonical: 'https://laplandtours.online/es/age-guide',
    breadcrumbHome: 'Inicio',
    breadcrumbName: 'Guía por edades',
    articleHeadline: 'Guía por edades: qué actividad de Laponia para cada edad',
    articleDescription:
      'Una matriz de edad × actividad para los viajes a la Laponia finlandesa, de bebés a mayores de 16 años.',
    lead:
      'Qué actividades de Laponia funcionan a cada edad y cuáles no. Una matriz práctica con cinco franjas de edad y los seis básicos: caza de auroras, huskies, motonieve, renos, sauna e iglú de cristal.',
    matrixEyebrow: 'La matriz',
    ageHeader: 'Edad',
    legend: '✓ disponible · — no se ofrece · «pasajero» / «tándem» / «en solitario» indica el papel',
    activities: ['Caza de auroras', 'Husky', 'Motonieve', 'Renos', 'Sauna', 'Iglú de cristal'],
    altHero: 'Cumbre nevada de un fell a la hora dorada en la Laponia finlandesa',
    rows: [
      {
        range: '0–2',
        label: 'Bebés',
        summary:
          'Un viaje pensado para que los adultos conozcan el lugar con un bebé a cuestas. El frío bajo cero descarta el cochecito de diario: lleve una mochila o saco ártico. La mayoría de los operadores ofrecen tarifa gratuita o reducida para bebés.',
        cells: [
          '✓',
          { v: '—', note: 'demasiado frío, vaivén del trineo' },
          { v: '—', note: 'no admite bebés' },
          '—',
          { v: 'limitada', note: 'solo sesiones cortas y a baja temperatura' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: 'Preescolar',
        summary:
          "La edad ideal para los paquetes navideños: Los programas suelen construirse en torno a estas edades. Paseos en reno, visita a Papá Noel, trineo de motonieve como pasajero y descensos en trineo funcionan bien.",
        cells: [
          { v: 'corta', note: 'tope a primera hora de la noche' },
          { v: 'pasajero', note: 'corto, supervisado' },
          { v: 'pasajero', note: 'conduce el adulto, niño en trineo' },
          '✓',
          { v: 'limitada', note: 'solo turno familiar' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: 'Primaria',
        summary:
          'Con energía suficiente para safaris de huskies y motonieve de media jornada (como pasajero). Las cazas de auroras valen si encajan los horarios de noche. Los programas de esquí empiezan a tener sentido en Levi, Ylläs y Saariselkä.',
        cells: [
          '✓',
          { v: 'pasajero', note: 'media jornada' },
          { v: 'pasajero', note: 'media jornada' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: 'Preadolescentes y adolescentes',
        summary:
          'Se abren todas las actividades estándar. A partir de los 12 años, muchos operadores permiten conducir la motonieve en tándem con un adulto. Las semanas de aventura de varios días apuntan con fuerza a esta franja.',
        cells: [
          '✓',
          '✓',
          { v: 'tándem 12+', note: 'el adulto conduce' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: 'Autónomos',
        summary:
          'Se tratan como adultos en casi todas las actividades. Motonieve en solitario con permiso de conducir (16+ en Finlandia), recorridos de huskies más largos, escalada en hielo, travesías de varios días por los fells. Los talleres de fotografía de auroras también piden esta madurez.',
        cells: [
          '✓',
          '✓',
          { v: 'en solitario', note: 'permiso de conducir obligatorio' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  'pt-BR': {
    metaTitle: 'Guia por idade: atividades na Lapônia | #LaplandTours',
    metaDescription:
      'Uma matriz prática de idade × atividade para a Lapônia finlandesa: o que serve para crianças, adolescentes e adultos, e a especialidade de cada operadora.',
    canonical: 'https://laplandtours.online/br/age-guide',
    breadcrumbHome: 'Início',
    breadcrumbName: 'Guia por idade',
    articleHeadline: 'Guia por idade: qual atividade da Lapônia para cada idade',
    articleDescription:
      'Uma matriz de idade × atividade para as viagens à Lapônia finlandesa, de bebês a maiores de 16 anos.',
    lead:
      'Quais atividades da Lapônia funcionam em cada idade e quais não. Uma matriz prática com cinco faixas etárias e os seis clássicos: caça à aurora, huskies, snowmobile, renas, sauna e iglu de vidro.',
    matrixEyebrow: 'A matriz',
    ageHeader: 'Idade',
    legend: '✓ disponível · — não oferecido · "passageiro" / "tandem" / "sozinho" indica o papel',
    activities: ['Caça à aurora', 'Husky', 'Snowmobile', 'Renas', 'Sauna', 'Iglu de vidro'],
    altHero: 'Cume nevado de um fell na hora dourada na Lapônia finlandesa',
    rows: [
      {
        range: '0–2',
        label: 'Bebês',
        summary:
          'Uma viagem para os adultos conhecerem o lugar com um bebê a tiracolo. O frio abaixo de zero descarta o carrinho do dia a dia: leve um canguru ou saco ártico. A maioria das operadoras oferece tarifa gratuita ou reduzida para bebês.',
        cells: [
          '✓',
          { v: '—', note: 'frio demais, balanço do trenó' },
          { v: '—', note: 'não aceita bebês' },
          '—',
          { v: 'limitada', note: 'apenas sessões curtas e a baixa temperatura' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: 'Pré-escola',
        summary:
          "A idade ideal para os pacotes natalinos: Os programas costumam ser montados em torno dessas idades. Passeios de trenó de renas, visita ao Papai Noel, snowmobile como passageiro e descidas de trenó funcionam bem.",
        cells: [
          { v: 'curta', note: 'limite no início da noite' },
          { v: 'passageiro', note: 'curto, supervisionado' },
          { v: 'passageiro', note: 'o adulto dirige, criança no trenó' },
          '✓',
          { v: 'limitada', note: 'apenas horário em família' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: 'Anos iniciais',
        summary:
          'Com energia suficiente para safáris de huskies e snowmobile de meio dia (como passageiro). As caças à aurora valem se os horários no fim da noite encaixarem. Os programas de esqui começam a fazer sentido em Levi, Ylläs e Saariselkä.',
        cells: [
          '✓',
          { v: 'passageiro', note: 'meio dia' },
          { v: 'passageiro', note: 'meio dia' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: 'Pré-adolescentes e adolescentes',
        summary:
          'Todas as atividades padrão se abrem. A partir dos 12 anos, muitas operadoras permitem dirigir o snowmobile em tandem com um adulto. As semanas de aventura de vários dias miram fortemente nesta faixa.',
        cells: [
          '✓',
          '✓',
          { v: 'tandem 12+', note: 'o adulto dirige' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: 'Independentes',
        summary:
          'Tratados como adultos na maioria das atividades. Snowmobile sozinho com habilitação (16+ na Finlândia), passeios de huskies mais longos, escalada no gelo, trilhas de vários dias pelos fells. As oficinas de fotografia de aurora também exigem essa maturidade.',
        cells: [
          '✓',
          '✓',
          { v: 'sozinho', note: 'habilitação obrigatória' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
  'zh-CN': {
    metaTitle: '年龄指南：哪个年龄适合哪种拉普兰活动 | #LaplandTours',
    metaDescription:
      '一份面向芬兰拉普兰的年龄 × 活动实用对照表。涵盖婴儿、学龄前、低年级、青春期前、青少年和成人各自适合的活动，以及各运营商专长于哪个年龄段。',
    canonical: 'https://laplandtours.online/cn/age-guide',
    breadcrumbHome: '首页',
    breadcrumbName: '年龄指南',
    articleHeadline: '年龄指南：哪个年龄适合哪种拉普兰活动',
    articleDescription:
      '一份面向芬兰拉普兰旅行的年龄 × 活动对照表，从婴儿到 16 岁以上。',
    lead:
      '哪些拉普兰活动适合哪个年龄，哪些不适合。一份涵盖五个年龄段和六大经典项目的实用对照表：极光追寻、哈士奇、雪地摩托、驯鹿、桑拿和玻璃穹顶屋。',
    matrixEyebrow: '对照表',
    ageHeader: '年龄',
    legend: '✓ 可参加 · — 不提供 · “乘客”/“双人”/“单独”表示角色',
    activities: ['极光追寻', '哈士奇', '雪地摩托', '驯鹿', '桑拿', '玻璃穹顶屋'],
    altHero: '芬兰拉普兰黄金时刻覆雪的山丘之巅',
    rows: [
      {
        range: '0–2',
        label: '婴儿',
        summary:
          '这是一趟由大人带着宝宝去看风景的旅行。零下气温让日常婴儿车不可行，请带上极地背带或保暖睡袋。多数运营商为婴儿提供免费或优惠价格。',
        cells: [
          '✓',
          { v: '—', note: '太冷，雪橇颠簸' },
          { v: '—', note: '不接受婴儿' },
          '—',
          { v: '有限', note: '仅限低温下的短时段' },
          '✓',
        ],
      },
      {
        range: '3–5',
        label: '学龄前',
        summary:
          "圣诞主题套餐的黄金年龄。行程往往就围绕这个年龄设计。驯鹿雪橇、拜访圣诞老人、坐在雪地摩托后座以及滑雪橇都很合适。",
        cells: [
          { v: '短时', note: '限傍晚较早时段' },
          { v: '乘客', note: '短时，有人看护' },
          { v: '乘客', note: '家长驾驶，孩子坐拖橇' },
          '✓',
          { v: '有限', note: '仅家庭时段' },
          '✓',
        ],
      },
      {
        range: '6–9',
        label: '小学低年级',
        summary:
          '体力足以参加半日的哈士奇和雪地摩托之旅（作为乘客）。若较晚的开始时间合适，极光追寻也可行。在 Levi、Ylläs 和 Saariselkä，滑雪课程开始变得有意义。',
        cells: [
          '✓',
          { v: '乘客', note: '半日' },
          { v: '乘客', note: '半日' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '10–15',
        label: '青春期前与青少年',
        summary:
          '所有常规活动都开放了。从 12 岁起，许多运营商允许与家长双人驾驶雪地摩托。多日探险周主打这个年龄段。',
        cells: [
          '✓',
          '✓',
          { v: '双人 12+', note: '家长驾驶' },
          '✓',
          '✓',
          '✓',
        ],
      },
      {
        range: '16+',
        label: '可独立',
        summary:
          '在多数活动中按成人对待。持驾照可单独驾驶雪地摩托（芬兰为 16 岁以上）、更长的哈士奇驾乘、攀冰、多日山地徒步。极光摄影工作坊也需要这种成熟度。',
        cells: [
          '✓',
          '✓',
          { v: '单独', note: '需持驾照' },
          '✓',
          '✓',
          '✓',
        ],
      },
    ],
  },
};

function CellMark({ cell, lang }: { cell: Cell; lang: Lang }) {
  const value = typeof cell === 'string' ? cell : cell.v;
  const note = typeof cell === 'string' ? undefined : cell.note;
  // YES values across all langs
  const isYes = value === '✓';
  const isNo = value === '—';
  return (
    <div className="flex flex-col items-center gap-0.5">
      <span
        className={`font-mono ${
          isYes ? 'text-aurora-green' : isNo ? 'text-snow/25' : 'text-snow/85 text-xs'
        }`}
        lang={lang}
      >
        {value}
      </span>
      {note && <span className="text-snow/75 text-[10px] leading-tight text-center">{note}</span>}
    </div>
  );
}

export default function AgeGuide() {
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
          { name: c.breadcrumbName, path: lang === 'en' ? '/age-guide' : `/${LANG_TO_PREFIX[lang]}/age-guide` },
        ]),
        articleSchema({
          headline: c.articleHeadline,
          description: c.articleDescription,
          path: lang === 'en' ? '/age-guide' : `/${LANG_TO_PREFIX[lang]}/age-guide`,
        }),
      ],
    });
  }, [lang, c]);

  return (
    <>
      <section className="relative bg-deep-night overflow-hidden flex items-center min-h-[56vh] md:min-h-[62vh]">
        <ImagePlaceholder
          variant="fell"
          src="/images/hero-age-guide.webp"
          alt={c.altHero}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(15,23,42,0.80) 0%, rgba(15,23,42,0.42) 50%, rgba(15,23,42,0.30) 100%)',
          }}
        />
        <div className="relative z-10 max-w-[1300px] w-full mx-auto px-6 sm:px-10 py-24 sm:py-28">
          <h1
            className="font-heading text-snow leading-[0.82] tracking-tighter drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]"
            style={{ fontSize: 'clamp(4rem,14vw,11rem)' }}
          >
            0&nbsp;–&nbsp;<span className="text-vibe-pink">16+</span>
          </h1>
          <p className="mt-6 text-snow/90 text-lg sm:text-xl leading-relaxed font-body max-w-2xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
            {c.lead}
          </p>
        </div>
      </section>

      <PageBreadcrumb />

      <section className="bg-deeper-night py-20 sm:py-24">
        <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
          <p className="cap-meta mb-3">{c.matrixEyebrow}</p>
          <div className="-mx-6 sm:mx-0 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="cap-meta py-4 pl-6 sm:pl-0 pr-6 sticky left-0 bg-deeper-night z-10 align-bottom"
                  >
                    {c.ageHeader}
                  </th>
                  {c.activities.map((a) => (
                    <th key={a} scope="col" className="cap-meta py-4 px-3 align-bottom whitespace-nowrap text-center">
                      {a}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map((r) => (
                  <tr key={r.range} className="border-t border-white/8 hover:bg-white/[0.02] transition-colors">
                    <th
                      scope="row"
                      className="py-5 pl-6 sm:pl-0 pr-6 sticky left-0 bg-deeper-night z-10 align-top font-normal"
                    >
                      <span className="font-heading text-snow text-3xl tracking-wide block leading-none">
                        {r.range}
                      </span>
                      <span className="cap-meta block mt-1">{r.label}</span>
                    </th>
                    {r.cells.map((cell, i) => (
                      <td key={i} className="py-5 px-3 text-center align-top">
                        <CellMark cell={cell} lang={lang} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="cap-meta mt-6">{c.legend}</p>
        </div>
      </section>

      <section className="bg-deep-night py-20 sm:py-28">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 space-y-14">
          {c.rows.map((r) => (
            <article key={r.range} className="grid grid-cols-12 gap-x-6 gap-y-3 pb-12 rule-hairline">
              <span className="col-span-12 sm:col-span-2 cap-meta self-start pt-1">{r.range}</span>
              <h2 className="col-span-12 sm:col-span-3 font-heading tracking-wide text-snow text-3xl sm:text-4xl leading-tight">
                {r.label}
              </h2>
              <p className="col-span-12 sm:col-span-7 text-snow/70 font-body text-[15px] sm:text-base leading-[1.7]">
                {r.summary}
              </p>
            </article>
          ))}
        </div>
      </section>

      <EditorialStandards />

      <div className="bg-deep-night py-6 px-4">
        <AffiliateDisclosure variant="full" />
      </div>
    </>
  );
}
