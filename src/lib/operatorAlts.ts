import type { Lang } from '../i18n/useLang';

/**
 * Operaattorikorttien kuvien altit 12 kielellä (gate:a11y-nimet, 24.10.2026).
 *
 * `operators.ts` kantaa englanninkielisen altin, ja käännetyt operaattoritiedot (L10N_LOCAL)
 * eivät kääntäneet sitä, joten ruudunlukija luki sen englanniksi joka kielellä. Avain on
 * englantilainen alt itse: sama kuva = sama alt usealla operaattorilla. Nämä ovat saman altin
 * käännökset, eivät uusia väitteitä kuvasta; jos englantilainen alt muuttuu, muuta myös avain.
 */
const ALTS: Record<string, Partial<Record<Exclude<Lang, 'en'>, string>>> = {
  'Ylläs village and the fell behind it in July': {
    fi: 'Ylläksen kylä ja sen takana tunturi heinäkuussa',
    sv: 'Byn vid Ylläs och fjället bakom den i juli',
    de: 'Das Dorf am Ylläs und das Fjell dahinter im Juli',
    es: 'El pueblo de Ylläs y el monte detrás en julio',
    fr: 'Le village d’Ylläs et le mont derrière lui en juillet',
    it: 'Il villaggio di Ylläs e il monte alle sue spalle a luglio',
    nl: 'Het dorp Ylläs en de fjell erachter in juli',
    'pt-BR': 'A vila de Ylläs e o monte atrás dela em julho',
    ja: '7月のユッラスの村と背後の山',
    ko: '7월의 윌래스 마을과 뒤편의 펠',
    'zh-CN': '七月的于拉斯村和村后的山',
  },
  'Terrace at Santa Claus Village, Rovaniemi, on a summer afternoon': {
    fi: 'Terassi Joulupukin Pajakylässä Rovaniemellä kesäiltapäivänä',
    sv: 'En terrass i Jultomtens by i Rovaniemi en sommareftermiddag',
    de: 'Eine Terrasse im Weihnachtsmanndorf in Rovaniemi an einem Sommernachmittag',
    es: 'Una terraza en la Aldea de Papá Noel, en Rovaniemi, una tarde de verano',
    fr: 'Une terrasse au Village du Père Noël, à Rovaniemi, un après-midi d’été',
    it: 'Una terrazza al Villaggio di Babbo Natale a Rovaniemi in un pomeriggio d’estate',
    nl: 'Een terras in het Kerstmandorp in Rovaniemi op een zomermiddag',
    'pt-BR': 'Um terraço na Vila do Papai Noel, em Rovaniemi, numa tarde de verão',
    ja: '夏の午後、ロヴァニエミのサンタクロース村のテラス',
    ko: '여름 오후 로바니에미 산타클로스 마을의 테라스',
    'zh-CN': '夏日午后罗瓦涅米圣诞老人村的露台',
  },
  'Levi village centre with hotels and the fell in summer': {
    fi: 'Levin kyläkeskus hotelleineen ja tunturi kesällä',
    sv: 'Levis bycentrum med hotell och fjället på sommaren',
    de: 'Das Ortszentrum von Levi mit Hotels und dem Fjell im Sommer',
    es: 'El centro del pueblo de Levi con sus hoteles y el monte en verano',
    fr: 'Le centre du village de Levi avec ses hôtels et le mont en été',
    it: 'Il centro del villaggio di Levi con gli hotel e il monte d’estate',
    nl: 'Het dorpscentrum van Levi met hotels en de fjell in de zomer',
    'pt-BR': 'O centro da vila de Levi com hotéis e o monte no verão',
    ja: '夏のレヴィ村中心部のホテル群と山',
    ko: '여름의 레비 마을 중심가 호텔들과 펠',
    'zh-CN': '夏季莱维村中心的酒店和山',
  },
  'Signpost at the Arctic Circle, Rovaniemi': {
    fi: 'Opastinpylväs napapiirillä Rovaniemellä',
    sv: 'En vägvisare vid polcirkeln i Rovaniemi',
    de: 'Ein Wegweiser am Polarkreis in Rovaniemi',
    es: 'Un poste indicador en el Círculo Polar Ártico, en Rovaniemi',
    fr: 'Un poteau indicateur sur le cercle polaire arctique, à Rovaniemi',
    it: 'Un cartello segnaletico sul Circolo polare artico, a Rovaniemi',
    nl: 'Een wegwijzer op de poolcirkel in Rovaniemi',
    'pt-BR': 'Uma placa indicativa no Círculo Polar Ártico, em Rovaniemi',
    ja: 'ロヴァニエミの北極圏の道標',
    ko: '로바니에미 북극권의 이정표',
    'zh-CN': '罗瓦涅米北极圈的路标',
  },
  'Midnight sun over a lake at Kemijärvi': {
    fi: 'Keskiyön aurinko järven yllä Kemijärvellä',
    sv: 'Midnattssol över en sjö i Kemijärvi',
    de: 'Mitternachtssonne über einem See in Kemijärvi',
    es: 'Sol de medianoche sobre un lago en Kemijärvi',
    fr: 'Soleil de minuit sur un lac à Kemijärvi',
    it: 'Sole di mezzanotte su un lago a Kemijärvi',
    nl: 'Middernachtzon boven een meer in Kemijärvi',
    'pt-BR': 'Sol da meia-noite sobre um lago em Kemijärvi',
    ja: 'ケミヤルヴィの湖に輝く白夜の太陽',
    ko: 'Kemijärvi의 호수 위에 뜬 백야의 태양',
    'zh-CN': '凯米耶尔维湖面上的午夜阳光',
  },
  'Road into Ylläs with the fell on the horizon': {
    fi: 'Tie Ylläkselle, horisontissa tunturi',
    sv: 'Vägen in mot Ylläs med fjället vid horisonten',
    de: 'Die Straße nach Ylläs mit dem Fjell am Horizont',
    es: 'La carretera hacia Ylläs con el monte en el horizonte',
    fr: 'La route vers Ylläs avec le mont à l’horizon',
    it: 'La strada verso Ylläs con il monte all’orizzonte',
    nl: 'De weg naar Ylläs met de fjell aan de horizon',
    'pt-BR': 'A estrada para Ylläs com o monte no horizonte',
    ja: '地平線に山が見えるユッラスへの道',
    ko: '지평선에 펠이 보이는 윌래스로 가는 길',
    'zh-CN': '通往于拉斯的道路，地平线上是山',
  },
};

export function operatorAlt(enAlt: string, lang: Lang): string {
  if (lang === 'en') return enAlt;
  return ALTS[enAlt]?.[lang] ?? enAlt;
}

/** Vertailutaulukon pisteiden nimet ruudunlukijalle. */
const NOT_OFFERED: Record<Lang, string> = {
  en: 'not offered', fi: 'ei tarjolla', sv: 'erbjuds inte', de: 'nicht im Angebot', es: 'no se ofrece',
  fr: 'non proposé', it: 'non offerto', nl: 'niet aangeboden', 'pt-BR': 'não oferecido',
  ja: '提供なし', ko: '제공하지 않음', 'zh-CN': '不提供',
};
const OF_MAX: Record<Lang, (n: number, max: number) => string> = {
  en: (n, m) => `${n} of ${m}`, fi: (n, m) => `${n}/${m}`, sv: (n, m) => `${n} av ${m}`, de: (n, m) => `${n} von ${m}`,
  es: (n, m) => `${n} de ${m}`, fr: (n, m) => `${n} sur ${m}`, it: (n, m) => `${n} su ${m}`, nl: (n, m) => `${n} van ${m}`,
  'pt-BR': (n, m) => `${n} de ${m}`, ja: (n, m) => `${m}点中${n}点`, ko: (n, m) => `${m}점 중 ${n}점`, 'zh-CN': (n, m) => `${n}/${m}`,
};

export function starsLabel(n: number, max: number, lang: Lang): string {
  return n === 0 ? NOT_OFFERED[lang] : OF_MAX[lang](n, max);
}
