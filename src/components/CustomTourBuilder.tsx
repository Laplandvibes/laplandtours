import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { CheckCircle, Send } from 'lucide-react';
import PhotoCredit from './PhotoCredit';
import { useLang, useLocalePath, useHtmlLang, type CopyLang, copyLang } from '../i18n/useLang';

/**
 * Trip planner (/design-tour). Rewritten 2026-09-11.
 *
 * Vesa on the old version: "lomake on myös liian kapea, ei tuolla saa mitään
 * suunniteltua … poor toteutus". It was a 5-field contact box in a narrow
 * right-hand column. This is a full-width planner: when and who, where and
 * what, how and for how much — as tap-to-select chips — then contact and
 * a free message. The brief that lands in sales@ is structured, so an
 * answer with concrete operators and prices can be written from it.
 *
 * Unchanged on purpose (measured and gated 21.8.2026, e2e/laplandtours.spec.ts):
 * POST to the shared send-contact-email function, thank-you screen only after
 * a 2xx, error state + mailto fallback on failure, honeypot `website`, and
 * the funnel events tour_builder_view/start/blocked/submit/success/error.
 * Field names `name`, `email`, `dates`, `message`, `website` are part of the
 * gate and stay.
 *
 * The repo has no .env and CI builds from a clean clone, so the endpoint and
 * the public anon key are literals (same reason as Home.tsx / NewsletterPopup).
 */
const CONTACT_ENDPOINT = 'https://oogioaxmfnqcbvjbcodh.supabase.co/functions/v1/send-contact-email';
const CONTACT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';

function track(event: string, data?: Record<string, unknown>) {
  try {
    (window as unknown as { umami?: { track: (e: string, d?: unknown) => void } }).umami?.track(event, data);
  } catch {
    /* analytics must never break the form */
  }
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

/** Place names are proper nouns and identical in every locale. */
const DESTINATIONS = ['Rovaniemi', 'Levi', 'Ylläs', 'Saariselkä', 'Ruka–Kuusamo', 'Pyhä–Luosto', 'Inari', 'Kilpisjärvi', 'Muonio'];
/** Keys that go into the sales@ brief (English, always the same). */
const ACTIVITY_KEYS = ['husky', 'snowmobile', 'aurora', 'reindeer', 'skiing', 'sauna', 'ice fishing', 'icebreaker', 'hiking'];
const STAY_KEYS = ['hotel', 'cabin', 'glass igloo', 'open'];
const TRAVEL_KEYS = ['fly', 'own car', 'train', 'open'];
const DURATION_KEYS = ['3-4 nights', '5-7 nights', '8+ nights', 'open'];
const BUDGET_KEYS = ['under 500', '500-1000', '1000-2000', 'over 2000', 'open'];

const COPY: Record<CopyLang, {
  eyebrow: string;
  h1a: string;
  h1b: string;
  lead: string;
  bullets: string[];
  noCommitment: string;
  altPhoto: string;
  secWhen: string;
  month: string;
  monthAny: string;
  duration: string;
  durationOpts: string[];
  adults: string;
  children: string;
  childAges: string;
  childAgesPh: string;
  dates: string;
  datesPh: string;
  secWhere: string;
  secWhat: string;
  activities: string[];
  secStay: string;
  stayOpts: string[];
  secTravel: string;
  travelOpts: string[];
  secBudget: string;
  budgetOpts: string[];
  message: string;
  messagePh: string;
  secContact: string;
  name: string;
  namePh: string;
  email: string;
  emailPh: string;
  submit: string;
  sending: string;
  errorMsg: string;
  sentEyebrow: string;
  sentHeadline: string;
  sentBody: string;
  sentLink: string;
  sentConfirm: string;
  subjectPrefix: string;
  stepWhen: string;
  stepWho: string;
  stepHow: string;
  next: string;
  back: string;
  optional: string;
  summary: string;
}> = {
  en: {
    eyebrow: 'Plan it with us',
    h1a: 'Tell us the trip.',
    h1b: 'We send back a plan.',
    lead: 'Pick where, when, what and roughly how much. Within 24–48 hours you get a reply with concrete operators, a realistic budget and an honest word on what does not fit.',
    bullets: ['Real operators and tours, not a brochure', 'A budget check before you book anything', 'Written from Finland by people who drive these roads', 'No obligation, no fee to you'],
    noCommitment: 'No obligation. No fee to you.',
    altPhoto: 'Chandeliers and gilded armchairs in the lounge of a historic hotel in Tornio',
    secWhen: 'When and who',
    month: 'Month',
    monthAny: 'Not decided yet',
    duration: 'Length',
    durationOpts: ['3–4 nights', '5–7 nights', '8+ nights', 'Open'],
    adults: 'Adults',
    children: 'Children',
    childAges: 'Children’s ages',
    childAgesPh: 'e.g. 4 and 9',
    dates: 'Exact dates, if known',
    datesPh: 'e.g. 12–18 February 2027',
    secWhere: 'Where',
    secWhat: 'What you want to do',
    activities: ['Husky', 'Snowmobile', 'Northern lights', 'Reindeer', 'Skiing', 'Sauna & spa', 'Ice fishing', 'Icebreaker', 'Hiking (summer)'],
    secStay: 'Where to sleep',
    stayOpts: ['Hotel', 'Cabin', 'Glass igloo', 'Open'],
    secTravel: 'How you arrive',
    travelOpts: ['Fly', 'Own car', 'Train', 'Open'],
    secBudget: 'Budget per person',
    budgetOpts: ['Under 500 €', '500–1 000 €', '1 000–2 000 €', 'Over 2 000 €', 'Open'],
    message: 'Anything else',
    messagePh: 'Birthday, proposal, wheelchair, a dog, no reindeer farms — whatever matters.',
    secContact: 'Where to send the plan',
    name: 'Name',
    namePh: 'Your name',
    email: 'Email',
    emailPh: 'you@example.com',
    submit: 'Send my brief',
    sending: 'Sending…',
    errorMsg: 'The brief did not go through. Try again, or email',
    sentEyebrow: 'Brief received',
    sentHeadline: 'Thanks. A plan is on its way.',
    sentBody: 'You will hear from us within 24–48 hours. Meanwhile the operator guide shows who runs what:',
    sentLink: 'the operator guide',
    sentConfirm: 'A confirmation went to',
    subjectPrefix: 'LaplandTours trip brief from',
    stepWhen: 'When?',
    stepWho: 'Who is coming?',
    stepHow: 'Stay, arrival and budget',
    next: 'Next',
    back: 'Back',
    optional: 'optional',
    summary: 'Your brief so far',
  },
  fi: {
    eyebrow: 'Suunnitellaan yhdessä',
    h1a: 'Kerro matkasi.',
    h1b: 'Me lähetämme suunnitelman.',
    lead: 'Valitse minne, milloin, mitä ja suunnilleen millä rahalla. Saat 24–48 tunnin sisällä vastauksen, jossa on oikeat toimijat, realistinen budjetti ja rehellinen sana siitä, mikä ei sovi.',
    bullets: ['Oikeita toimijoita ja retkiä, ei esitettä', 'Budjettitarkistus ennen kuin varaat mitään', 'Kirjoitettu Suomesta, näitä teitä ajaneiden käsin', 'Ei sitoumusta, ei maksua sinulle'],
    noCommitment: 'Ei sitoumusta. Ei maksua sinulle.',
    altPhoto: 'Kattokruunut ja kullatut nojatuolit historiallisen hotellin salongissa Torniossa',
    secWhen: 'Milloin ja ketkä',
    month: 'Kuukausi',
    monthAny: 'Ei vielä päätetty',
    duration: 'Kesto',
    durationOpts: ['3–4 yötä', '5–7 yötä', '8+ yötä', 'Avoin'],
    adults: 'Aikuisia',
    children: 'Lapsia',
    childAges: 'Lasten iät',
    childAgesPh: 'esim. 4 ja 9',
    dates: 'Tarkat päivät, jos tiedossa',
    datesPh: 'esim. 12.–18.2.2027',
    secWhere: 'Minne',
    secWhat: 'Mitä haluat tehdä',
    activities: ['Husky', 'Moottorikelkka', 'Revontulet', 'Poro', 'Hiihto ja laskettelu', 'Sauna ja kylpylä', 'Pilkkiminen', 'Jäänmurtaja', 'Vaellus (kesä)'],
    secStay: 'Missä nukutaan',
    stayOpts: ['Hotelli', 'Mökki', 'Lasi-iglu', 'Avoin'],
    secTravel: 'Miten tullaan',
    travelOpts: ['Lentäen', 'Omalla autolla', 'Junalla', 'Avoin'],
    secBudget: 'Budjetti per henkilö',
    budgetOpts: ['Alle 500 €', '500–1 000 €', '1 000–2 000 €', 'Yli 2 000 €', 'Avoin'],
    message: 'Muuta huomioitavaa',
    messagePh: 'Syntymäpäivä, kosinta, pyörätuoli, koira mukana, ei porotiloja — mikä tahansa, jolla on väliä.',
    secContact: 'Mihin suunnitelma lähetetään',
    name: 'Nimi',
    namePh: 'Nimesi',
    email: 'Sähköposti',
    emailPh: 'sinun@sähköposti.fi',
    submit: 'Lähetä toiveeni',
    sending: 'Lähetetään…',
    errorMsg: 'Lähetys ei mennyt läpi. Yritä uudelleen tai lähetä sähköpostia osoitteeseen',
    sentEyebrow: 'Toiveet vastaanotettu',
    sentHeadline: 'Kiitos. Suunnitelma on tulossa.',
    sentBody: 'Kuulet meistä 24–48 tunnin sisällä. Sillä välin matkanjärjestäjäopas kertoo, kuka tekee mitä:',
    sentLink: 'matkanjärjestäjäopas',
    sentConfirm: 'Vahvistus lähti osoitteeseen',
    subjectPrefix: 'LaplandTours-matkatoive:',
    stepWhen: 'Milloin?',
    stepWho: 'Ketkä lähtevät?',
    stepHow: 'Majoitus, saapuminen ja budjetti',
    next: 'Seuraava',
    back: 'Takaisin',
    optional: 'valinnainen',
    summary: 'Toiveesi tähän asti',
  },
  de: {
    eyebrow: 'Gemeinsam planen',
    h1a: 'Beschreiben Sie die Reise.',
    h1b: 'Wir schicken den Plan.',
    lead: 'Wählen Sie wohin, wann, was und ungefähr für wie viel. Innerhalb von 24–48 Stunden erhalten Sie eine Antwort mit konkreten Anbietern, einem realistischen Budget und einem ehrlichen Wort dazu, was nicht passt.',
    bullets: ['Echte Anbieter und Touren, kein Prospekt', 'Ein Budget-Check, bevor Sie etwas buchen', 'Aus Finnland geschrieben, von Leuten, die diese Straßen fahren', 'Unverbindlich, ohne Gebühr für Sie'],
    noCommitment: 'Unverbindlich. Ohne Gebühr für Sie.',
    altPhoto: 'Kronleuchter und vergoldete Sessel im Salon eines historischen Hotels in Tornio',
    secWhen: 'Wann und wer',
    month: 'Monat',
    monthAny: 'Noch offen',
    duration: 'Dauer',
    durationOpts: ['3–4 Nächte', '5–7 Nächte', '8+ Nächte', 'Offen'],
    adults: 'Erwachsene',
    children: 'Kinder',
    childAges: 'Alter der Kinder',
    childAgesPh: 'z. B. 4 und 9',
    dates: 'Genaue Daten, falls bekannt',
    datesPh: 'z. B. 12.–18. Februar 2027',
    secWhere: 'Wohin',
    secWhat: 'Was Sie erleben möchten',
    activities: ['Husky', 'Schneemobil', 'Polarlicht', 'Rentier', 'Ski', 'Sauna & Spa', 'Eisangeln', 'Eisbrecher', 'Wandern (Sommer)'],
    secStay: 'Wo Sie schlafen',
    stayOpts: ['Hotel', 'Hütte', 'Glas-Iglu', 'Offen'],
    secTravel: 'Wie Sie anreisen',
    travelOpts: ['Flug', 'Eigenes Auto', 'Zug', 'Offen'],
    secBudget: 'Budget pro Person',
    budgetOpts: ['Unter 500 €', '500–1.000 €', '1.000–2.000 €', 'Über 2.000 €', 'Offen'],
    message: 'Sonst noch etwas',
    messagePh: 'Geburtstag, Heiratsantrag, Rollstuhl, Hund dabei, keine Rentierfarmen — alles, was zählt.',
    secContact: 'Wohin der Plan geht',
    name: 'Name',
    namePh: 'Ihr Name',
    email: 'E-Mail',
    emailPh: 'sie@beispiel.de',
    submit: 'Wünsche absenden',
    sending: 'Wird gesendet…',
    errorMsg: 'Die Anfrage ist nicht angekommen. Versuchen Sie es erneut oder schreiben Sie an',
    sentEyebrow: 'Wünsche erhalten',
    sentHeadline: 'Danke. Der Plan ist unterwegs.',
    sentBody: 'Sie hören innerhalb von 24–48 Stunden von uns. Bis dahin zeigt der Anbieter-Guide, wer was macht:',
    sentLink: 'der Anbieter-Guide',
    sentConfirm: 'Eine Bestätigung ging an',
    subjectPrefix: 'LaplandTours-Reisewunsch von',
    stepWhen: 'Wann?',
    stepWho: 'Wer reist mit?',
    stepHow: 'Unterkunft, Anreise und Budget',
    next: 'Weiter',
    back: 'Zurück',
    optional: 'optional',
    summary: 'Ihre Wünsche bisher',
  },
  ja: {
    eyebrow: '一緒に計画する',
    h1a: '旅の希望を教えてください。',
    h1b: 'プランをお送りします。',
    lead: '行き先、時期、やりたいこと、おおよその予算を選ぶだけ。24〜48時間以内に、具体的な会社、現実的な予算、合わない点についての率直な一言を添えて返信します。',
    bullets: ['パンフレットではなく、実在の会社とツアー', '予約前の予算チェック', 'この道を走った者がフィンランドから書きます', '義務も手数料もありません'],
    noCommitment: '義務なし。手数料なし。',
    altPhoto: 'トルニオの歴史あるホテルのサロン。シャンデリアと金彩の椅子',
    secWhen: '時期と人数',
    month: '月',
    monthAny: 'まだ未定',
    duration: '日数',
    durationOpts: ['3〜4泊', '5〜7泊', '8泊以上', '未定'],
    adults: '大人',
    children: '子ども',
    childAges: '子どもの年齢',
    childAgesPh: '例：4歳と9歳',
    dates: '日程が決まっていれば',
    datesPh: '例：2027年2月12〜18日',
    secWhere: '行き先',
    secWhat: 'やりたいこと',
    activities: ['ハスキー', 'スノーモービル', 'オーロラ', 'トナカイ', 'スキー', 'サウナ・スパ', '氷上釣り', '砕氷船', 'ハイキング（夏）'],
    secStay: '宿泊',
    stayOpts: ['ホテル', 'コテージ', 'ガラスイグルー', '未定'],
    secTravel: '移動手段',
    travelOpts: ['飛行機', '自家用車', '列車', '未定'],
    secBudget: '一人あたりの予算',
    budgetOpts: ['500€未満', '500〜1,000€', '1,000〜2,000€', '2,000€以上', '未定'],
    message: 'その他',
    messagePh: '誕生日、プロポーズ、車椅子、犬連れ、トナカイ牧場は不要など、大事なことは何でも。',
    secContact: 'プランの送り先',
    name: 'お名前',
    namePh: 'お名前',
    email: 'メールアドレス',
    emailPh: 'you@example.com',
    submit: '希望を送る',
    sending: '送信中…',
    errorMsg: '送信できませんでした。もう一度お試しいただくか、次のアドレスへメールしてください：',
    sentEyebrow: '希望を受け付けました',
    sentHeadline: 'ありがとうございます。プランをお送りします。',
    sentBody: '24〜48時間以内にご連絡します。それまでは、各社の得意分野をまとめたガイドをご覧ください：',
    sentLink: 'ツアー会社ガイド',
    sentConfirm: '確認メールの送信先：',
    subjectPrefix: 'LaplandTours 旅行の希望:',
    stepWhen: 'いつ？',
    stepWho: '誰が行きますか？',
    stepHow: '宿泊・移動・予算',
    next: '次へ',
    back: '戻る',
    optional: '任意',
    summary: 'ここまでのご希望',
  },
  ko: {
    eyebrow: '함께 계획하기',
    h1a: '여행을 알려 주세요.',
    h1b: '계획을 보내 드립니다.',
    lead: '어디로, 언제, 무엇을, 대략 얼마로 갈지 고르세요. 24~48시간 안에 실제 운영사, 현실적인 예산, 맞지 않는 부분에 대한 솔직한 한마디를 담아 답장합니다.',
    bullets: ['브로슈어가 아닌 실제 운영사와 투어', '예약 전 예산 점검', '이 길을 직접 달려 본 사람들이 핀란드에서 작성', '의무도 수수료도 없습니다'],
    noCommitment: '의무 없음. 수수료 없음.',
    altPhoto: '토르니오의 역사적인 호텔 살롱, 샹들리에와 금박 안락의자',
    secWhen: '언제, 누구와',
    month: '월',
    monthAny: '아직 미정',
    duration: '기간',
    durationOpts: ['3~4박', '5~7박', '8박 이상', '미정'],
    adults: '성인',
    children: '어린이',
    childAges: '어린이 나이',
    childAgesPh: '예: 4세와 9세',
    dates: '정확한 날짜(있다면)',
    datesPh: '예: 2027년 2월 12~18일',
    secWhere: '어디로',
    secWhat: '하고 싶은 것',
    activities: ['허스키', '스노모빌', '오로라', '순록', '스키', '사우나·스파', '얼음낚시', '쇄빙선', '하이킹(여름)'],
    secStay: '숙소',
    stayOpts: ['호텔', '통나무집', '유리 이글루', '미정'],
    secTravel: '이동 수단',
    travelOpts: ['항공', '자가용', '기차', '미정'],
    secBudget: '1인당 예산',
    budgetOpts: ['500€ 미만', '500~1,000€', '1,000~2,000€', '2,000€ 이상', '미정'],
    message: '기타',
    messagePh: '생일, 프러포즈, 휠체어, 반려견 동반, 순록 농장 제외 등 중요한 것은 무엇이든.',
    secContact: '계획을 받을 곳',
    name: '이름',
    namePh: '이름',
    email: '이메일',
    emailPh: 'you@example.com',
    submit: '희망 사항 보내기',
    sending: '보내는 중…',
    errorMsg: '전송되지 않았습니다. 다시 시도하거나 다음 주소로 메일을 보내 주세요:',
    sentEyebrow: '희망 사항 접수',
    sentHeadline: '감사합니다. 계획을 준비 중입니다.',
    sentBody: '24~48시간 안에 연락드립니다. 그동안 운영사 가이드에서 누가 무엇을 하는지 보실 수 있습니다:',
    sentLink: '운영사 가이드',
    sentConfirm: '확인 메일 발송 주소:',
    subjectPrefix: 'LaplandTours 여행 문의:',
    stepWhen: '언제?',
    stepWho: '누가 가나요?',
    stepHow: '숙소, 이동, 예산',
    next: '다음',
    back: '이전',
    optional: '선택',
    summary: '지금까지의 희망 사항',
  },
  fr: {
    eyebrow: 'On planifie ensemble',
    h1a: 'Décrivez le voyage.',
    h1b: 'On vous renvoie un plan.',
    lead: 'Choisissez où, quand, quoi et à peu près pour combien. Sous 24 à 48 heures, vous recevez une réponse avec des opérateurs concrets, un budget réaliste et un mot honnête sur ce qui ne colle pas.',
    bullets: ['De vrais opérateurs et de vraies excursions, pas une brochure', 'Un contrôle du budget avant toute réservation', 'Écrit depuis la Finlande par des gens qui roulent sur ces routes', 'Sans engagement, sans frais pour vous'],
    noCommitment: 'Sans engagement. Sans frais pour vous.',
    altPhoto: 'Lustres et fauteuils dorés dans le salon d’un hôtel historique de Tornio',
    secWhen: 'Quand et qui',
    month: 'Mois',
    monthAny: 'Pas encore décidé',
    duration: 'Durée',
    durationOpts: ['3–4 nuits', '5–7 nuits', '8 nuits et plus', 'Ouvert'],
    adults: 'Adultes',
    children: 'Enfants',
    childAges: 'Âge des enfants',
    childAgesPh: 'ex. 4 et 9 ans',
    dates: 'Dates exactes, si connues',
    datesPh: 'ex. 12–18 février 2027',
    secWhere: 'Où',
    secWhat: 'Ce que vous voulez faire',
    activities: ['Huskys', 'Motoneige', 'Aurores boréales', 'Rennes', 'Ski', 'Sauna et spa', 'Pêche sur glace', 'Brise-glace', 'Randonnée (été)'],
    secStay: 'Où dormir',
    stayOpts: ['Hôtel', 'Chalet', 'Igloo de verre', 'Ouvert'],
    secTravel: 'Comment vous arrivez',
    travelOpts: ['En avion', 'En voiture', 'En train', 'Ouvert'],
    secBudget: 'Budget par personne',
    budgetOpts: ['Moins de 500 €', '500 à 1 000 €', '1 000 à 2 000 €', 'Plus de 2 000 €', 'Ouvert'],
    message: 'Autre chose',
    messagePh: 'Anniversaire, demande en mariage, fauteuil roulant, chien, pas de ferme de rennes : tout ce qui compte.',
    secContact: 'Où envoyer le plan',
    name: 'Nom',
    namePh: 'Votre nom',
    email: 'E-mail',
    emailPh: 'vous@exemple.fr',
    submit: 'Envoyer mes souhaits',
    sending: 'Envoi…',
    errorMsg: 'La demande n’est pas passée. Réessayez, ou écrivez à',
    sentEyebrow: 'Souhaits reçus',
    sentHeadline: 'Merci. Le plan arrive.',
    sentBody: 'Vous aurez de nos nouvelles sous 24 à 48 heures. En attendant, le guide des opérateurs montre qui fait quoi :',
    sentLink: 'le guide des opérateurs',
    sentConfirm: 'Une confirmation a été envoyée à',
    subjectPrefix: 'Souhaits de voyage LaplandTours de',
    stepWhen: 'Quand ?',
    stepWho: 'Qui part ?',
    stepHow: 'Hébergement, arrivée et budget',
    next: 'Suivant',
    back: 'Retour',
    optional: 'facultatif',
    summary: 'Vos souhaits jusqu’ici',
  },
  it: {
    eyebrow: 'Pianifichiamo insieme',
    h1a: 'Ci racconti il viaggio.',
    h1b: 'Le rispondiamo con un piano.',
    lead: 'Scelga dove, quando, cosa e più o meno a quale prezzo. Entro 24–48 ore riceve una risposta con operatori concreti, un budget realistico e una parola onesta su ciò che non è adatto.',
    bullets: ['Operatori ed escursioni reali, non un dépliant', 'Una verifica del budget prima di prenotare qualsiasi cosa', 'Scritto dalla Finlandia da chi percorre queste strade', 'Nessun impegno, nessun costo per Lei'],
    noCommitment: 'Nessun impegno. Nessun costo per Lei.',
    altPhoto: 'Lampadari e poltrone dorate nel salone di un hotel storico a Tornio',
    secWhen: 'Quando e chi',
    month: 'Mese',
    monthAny: 'Non ancora deciso',
    duration: 'Durata',
    durationOpts: ['3–4 notti', '5–7 notti', '8+ notti', 'Aperto'],
    adults: 'Adulti',
    children: 'Bambini',
    childAges: 'Età dei bambini',
    childAgesPh: 'es. 4 e 9 anni',
    dates: 'Date precise, se note',
    datesPh: 'es. 12–18 febbraio 2027',
    secWhere: 'Dove',
    secWhat: 'Cosa vuole fare',
    activities: ['Husky', 'Motoslitta', 'Aurora boreale', 'Renne', 'Sci', 'Sauna e spa', 'Pesca sul ghiaccio', 'Rompighiaccio', 'Trekking (estate)'],
    secStay: 'Dove dormire',
    stayOpts: ['Hotel', 'Baita', 'Igloo di vetro', 'Aperto'],
    secTravel: 'Come arriva',
    travelOpts: ['In aereo', 'In auto propria', 'In treno', 'Aperto'],
    secBudget: 'Budget a persona',
    budgetOpts: ['Meno di 500 €', '500–1.000 €', '1.000–2.000 €', 'Oltre 2.000 €', 'Aperto'],
    message: 'Altro',
    messagePh: 'Compleanno, proposta di matrimonio, sedia a rotelle, cane al seguito, niente fattorie di renne: tutto ciò che conta.',
    secContact: 'Dove inviare il piano',
    name: 'Nome',
    namePh: 'Il Suo nome',
    email: 'E-mail',
    emailPh: 'lei@esempio.it',
    submit: 'Invia le mie richieste',
    sending: 'Invio…',
    errorMsg: 'La richiesta non è arrivata. Riprovi, oppure scriva a',
    sentEyebrow: 'Richieste ricevute',
    sentHeadline: 'Grazie. Il piano è in arrivo.',
    sentBody: 'La ricontattiamo entro 24–48 ore. Nel frattempo la guida agli operatori mostra chi fa cosa:',
    sentLink: 'la guida agli operatori',
    sentConfirm: 'Una conferma è stata inviata a',
    subjectPrefix: 'Richiesta di viaggio LaplandTours di',
    stepWhen: 'Quando?',
    stepWho: 'Chi parte?',
    stepHow: 'Alloggio, arrivo e budget',
    next: 'Avanti',
    back: 'Indietro',
    optional: 'facoltativo',
    summary: 'Le Sue richieste finora',
  },
  nl: {
    eyebrow: 'Samen plannen',
    h1a: 'Vertel ons de reis.',
    h1b: 'Wij sturen een plan terug.',
    lead: 'Kies waarheen, wanneer, wat en ongeveer voor hoeveel. Binnen 24–48 uur krijgt u een antwoord met concrete aanbieders, een realistisch budget en een eerlijk woord over wat niet past.',
    bullets: ['Echte aanbieders en tours, geen brochure', 'Een budgetcheck voordat u iets boekt', 'Geschreven vanuit Finland door mensen die deze wegen rijden', 'Vrijblijvend, zonder kosten voor u'],
    noCommitment: 'Vrijblijvend. Zonder kosten voor u.',
    altPhoto: 'Kroonluchters en verguld meubilair in de salon van een historisch hotel in Tornio',
    secWhen: 'Wanneer en wie',
    month: 'Maand',
    monthAny: 'Nog niet besloten',
    duration: 'Duur',
    durationOpts: ['3–4 nachten', '5–7 nachten', '8+ nachten', 'Open'],
    adults: 'Volwassenen',
    children: 'Kinderen',
    childAges: 'Leeftijd van de kinderen',
    childAgesPh: 'bijv. 4 en 9',
    dates: 'Exacte data, indien bekend',
    datesPh: 'bijv. 12–18 februari 2027',
    secWhere: 'Waarheen',
    secWhat: 'Wat u wilt doen',
    activities: ['Husky', 'Sneeuwscooter', 'Noorderlicht', 'Rendier', 'Skiën', 'Sauna & spa', 'IJsvissen', 'IJsbreker', 'Wandelen (zomer)'],
    secStay: 'Waar u slaapt',
    stayOpts: ['Hotel', 'Hut', 'Glazen iglo', 'Open'],
    secTravel: 'Hoe u aankomt',
    travelOpts: ['Vliegen', 'Eigen auto', 'Trein', 'Open'],
    secBudget: 'Budget per persoon',
    budgetOpts: ['Onder 500 €', '500–1.000 €', '1.000–2.000 €', 'Boven 2.000 €', 'Open'],
    message: 'Nog iets anders',
    messagePh: 'Verjaardag, aanzoek, rolstoel, hond mee, geen rendierboerderijen — alles wat ertoe doet.',
    secContact: 'Waar het plan naartoe gaat',
    name: 'Naam',
    namePh: 'Uw naam',
    email: 'E-mail',
    emailPh: 'u@voorbeeld.nl',
    submit: 'Mijn wensen versturen',
    sending: 'Versturen…',
    errorMsg: 'De aanvraag is niet aangekomen. Probeer het opnieuw of mail naar',
    sentEyebrow: 'Wensen ontvangen',
    sentHeadline: 'Bedankt. Het plan komt eraan.',
    sentBody: 'U hoort binnen 24–48 uur van ons. Intussen laat de aanbiedersgids zien wie wat doet:',
    sentLink: 'de aanbiedersgids',
    sentConfirm: 'Een bevestiging is gestuurd naar',
    subjectPrefix: 'LaplandTours-reiswens van',
    stepWhen: 'Wanneer?',
    stepWho: 'Wie gaat mee?',
    stepHow: 'Verblijf, aankomst en budget',
    next: 'Volgende',
    back: 'Terug',
    optional: 'optioneel',
    summary: 'Uw wensen tot nu toe',
  },
  sv: {
    eyebrow: 'Vi planerar tillsammans',
    h1a: 'Berätta om resan.',
    h1b: 'Vi skickar en plan.',
    lead: 'Välj vart, när, vad och ungefär för hur mycket. Inom 24–48 timmar får du ett svar med konkreta arrangörer, en realistisk budget och ett ärligt ord om vad som inte passar.',
    bullets: ['Riktiga arrangörer och turer, ingen broschyr', 'En budgetkoll innan du bokar något', 'Skrivet från Finland av folk som kör de här vägarna', 'Ingen förbindelse, ingen avgift för dig'],
    noCommitment: 'Ingen förbindelse. Ingen avgift för dig.',
    altPhoto: 'Kristallkronor och förgyllda fåtöljer i salongen på ett historiskt hotell i Torneå',
    secWhen: 'När och vilka',
    month: 'Månad',
    monthAny: 'Inte bestämt än',
    duration: 'Längd',
    durationOpts: ['3–4 nätter', '5–7 nätter', '8+ nätter', 'Öppet'],
    adults: 'Vuxna',
    children: 'Barn',
    childAges: 'Barnens ålder',
    childAgesPh: 't.ex. 4 och 9',
    dates: 'Exakta datum, om du vet',
    datesPh: 't.ex. 12–18 februari 2027',
    secWhere: 'Vart',
    secWhat: 'Vad du vill göra',
    activities: ['Husky', 'Skoter', 'Norrsken', 'Ren', 'Skidåkning', 'Bastu & spa', 'Pimpelfiske', 'Isbrytare', 'Vandring (sommar)'],
    secStay: 'Var du sover',
    stayOpts: ['Hotell', 'Stuga', 'Glasigloo', 'Öppet'],
    secTravel: 'Hur du kommer',
    travelOpts: ['Flyg', 'Egen bil', 'Tåg', 'Öppet'],
    secBudget: 'Budget per person',
    budgetOpts: ['Under 500 €', '500–1 000 €', '1 000–2 000 €', 'Över 2 000 €', 'Öppet'],
    message: 'Något mer',
    messagePh: 'Födelsedag, frieri, rullstol, hund med, inga renfarmer – allt som spelar roll.',
    secContact: 'Vart planen ska skickas',
    name: 'Namn',
    namePh: 'Ditt namn',
    email: 'E-post',
    emailPh: 'du@exempel.se',
    submit: 'Skicka mina önskemål',
    sending: 'Skickar…',
    errorMsg: 'Förfrågan gick inte fram. Försök igen eller mejla',
    sentEyebrow: 'Önskemål mottagna',
    sentHeadline: 'Tack. Planen är på väg.',
    sentBody: 'Du hör av oss inom 24–48 timmar. Under tiden visar arrangörsguiden vem som gör vad:',
    sentLink: 'arrangörsguiden',
    sentConfirm: 'En bekräftelse gick till',
    subjectPrefix: 'LaplandTours-reseönskemål från',
    stepWhen: 'När?',
    stepWho: 'Vilka åker?',
    stepHow: 'Boende, ankomst och budget',
    next: 'Nästa',
    back: 'Tillbaka',
    optional: 'valfritt',
    summary: 'Dina önskemål hittills',
  },
  es: {
    eyebrow: 'Lo planificamos juntos',
    h1a: 'Cuéntenos el viaje.',
    h1b: 'Le devolvemos un plan.',
    lead: 'Elija dónde, cuándo, qué y más o menos por cuánto. En 24–48 horas recibe una respuesta con operadores concretos, un presupuesto realista y una palabra honesta sobre lo que no encaja.',
    bullets: ['Operadores y excursiones reales, no un folleto', 'Una revisión del presupuesto antes de reservar nada', 'Escrito desde Finlandia por gente que conduce por estas carreteras', 'Sin compromiso, sin coste para usted'],
    noCommitment: 'Sin compromiso. Sin coste para usted.',
    altPhoto: 'Lámparas de araña y sillones dorados en el salón de un hotel histórico de Tornio',
    secWhen: 'Cuándo y quiénes',
    month: 'Mes',
    monthAny: 'Aún sin decidir',
    duration: 'Duración',
    durationOpts: ['3–4 noches', '5–7 noches', '8+ noches', 'Abierto'],
    adults: 'Adultos',
    children: 'Niños',
    childAges: 'Edad de los niños',
    childAgesPh: 'p. ej. 4 y 9',
    dates: 'Fechas exactas, si las sabe',
    datesPh: 'p. ej. 12–18 de febrero de 2027',
    secWhere: 'Adónde',
    secWhat: 'Qué quiere hacer',
    activities: ['Huskies', 'Motonieve', 'Auroras boreales', 'Renos', 'Esquí', 'Sauna y spa', 'Pesca en hielo', 'Rompehielos', 'Senderismo (verano)'],
    secStay: 'Dónde dormir',
    stayOpts: ['Hotel', 'Cabaña', 'Iglú de cristal', 'Abierto'],
    secTravel: 'Cómo llega',
    travelOpts: ['En avión', 'En coche propio', 'En tren', 'Abierto'],
    secBudget: 'Presupuesto por persona',
    budgetOpts: ['Menos de 500 €', '500–1 000 €', '1 000–2 000 €', 'Más de 2 000 €', 'Abierto'],
    message: 'Algo más',
    messagePh: 'Cumpleaños, pedida de mano, silla de ruedas, perro, sin granjas de renos: lo que importe.',
    secContact: 'Adónde enviamos el plan',
    name: 'Nombre',
    namePh: 'Su nombre',
    email: 'Correo electrónico',
    emailPh: 'usted@ejemplo.es',
    submit: 'Enviar mis deseos',
    sending: 'Enviando…',
    errorMsg: 'La solicitud no llegó. Inténtelo de nuevo o escriba a',
    sentEyebrow: 'Deseos recibidos',
    sentHeadline: 'Gracias. El plan está en camino.',
    sentBody: 'Tendrá noticias nuestras en 24–48 horas. Mientras tanto, la guía de operadores muestra quién hace qué:',
    sentLink: 'la guía de operadores',
    sentConfirm: 'Se envió una confirmación a',
    subjectPrefix: 'Deseos de viaje LaplandTours de',
    stepWhen: '¿Cuándo?',
    stepWho: '¿Quiénes viajan?',
    stepHow: 'Alojamiento, llegada y presupuesto',
    next: 'Siguiente',
    back: 'Atrás',
    optional: 'opcional',
    summary: 'Sus deseos hasta ahora',
  },
  'pt-BR': {
    eyebrow: 'Planejamos juntos',
    h1a: 'Conte como é a viagem.',
    h1b: 'Devolvemos um plano.',
    lead: 'Escolha para onde, quando, o quê e mais ou menos por quanto. Em 24–48 horas você recebe uma resposta com operadoras concretas, um orçamento realista e uma palavra honesta sobre o que não encaixa.',
    bullets: ['Operadoras e passeios reais, não um folheto', 'Uma checagem do orçamento antes de reservar qualquer coisa', 'Escrito da Finlândia por quem dirige nessas estradas', 'Sem compromisso, sem custo para você'],
    noCommitment: 'Sem compromisso. Sem custo para você.',
    altPhoto: 'Lustres e poltronas douradas no salão de um hotel histórico em Tornio',
    secWhen: 'Quando e quem',
    month: 'Mês',
    monthAny: 'Ainda não decidido',
    duration: 'Duração',
    durationOpts: ['3–4 noites', '5–7 noites', '8+ noites', 'Em aberto'],
    adults: 'Adultos',
    children: 'Crianças',
    childAges: 'Idade das crianças',
    childAgesPh: 'ex.: 4 e 9',
    dates: 'Datas exatas, se souber',
    datesPh: 'ex.: 12–18 de fevereiro de 2027',
    secWhere: 'Para onde',
    secWhat: 'O que você quer fazer',
    activities: ['Huskies', 'Snowmobile', 'Aurora boreal', 'Renas', 'Esqui', 'Sauna e spa', 'Pesca no gelo', 'Quebra-gelo', 'Trilhas (verão)'],
    secStay: 'Onde dormir',
    stayOpts: ['Hotel', 'Cabana', 'Iglu de vidro', 'Em aberto'],
    secTravel: 'Como você chega',
    travelOpts: ['De avião', 'De carro próprio', 'De trem', 'Em aberto'],
    secBudget: 'Orçamento por pessoa',
    budgetOpts: ['Menos de 500 €', '500–1.000 €', '1.000–2.000 €', 'Mais de 2.000 €', 'Em aberto'],
    message: 'Mais alguma coisa',
    messagePh: 'Aniversário, pedido de casamento, cadeira de rodas, cachorro junto, sem fazendas de renas — tudo o que importa.',
    secContact: 'Para onde enviar o plano',
    name: 'Nome',
    namePh: 'Seu nome',
    email: 'E-mail',
    emailPh: 'voce@exemplo.com',
    submit: 'Enviar meus pedidos',
    sending: 'Enviando…',
    errorMsg: 'O pedido não chegou. Tente de novo ou escreva para',
    sentEyebrow: 'Pedidos recebidos',
    sentHeadline: 'Obrigado. O plano está a caminho.',
    sentBody: 'Você terá notícias nossas em 24–48 horas. Enquanto isso, o guia de operadoras mostra quem faz o quê:',
    sentLink: 'o guia de operadoras',
    sentConfirm: 'Uma confirmação foi enviada para',
    subjectPrefix: 'Pedido de viagem LaplandTours de',
    stepWhen: 'Quando?',
    stepWho: 'Quem vai?',
    stepHow: 'Hospedagem, chegada e orçamento',
    next: 'Próximo',
    back: 'Voltar',
    optional: 'opcional',
    summary: 'Seus pedidos até aqui',
  },
  'zh-CN': {
    eyebrow: '一起规划',
    h1a: '告诉我们你的行程。',
    h1b: '我们回复一份方案。',
    lead: '选择去哪里、什么时候、做什么、大概花多少。24–48 小时内你会收到回复：具体的运营商、切实的预算，以及哪些不合适的坦率建议。',
    bullets: ['真实的运营商和行程，不是宣传册', '预订任何东西之前先核对预算', '由跑过这些路的人在芬兰撰写', '不设义务，不收费用'],
    noCommitment: '不设义务。不收费用。',
    altPhoto: '托尔尼奥一家历史酒店的沙龙：水晶吊灯与镀金扶手椅',
    secWhen: '时间与人数',
    month: '月份',
    monthAny: '尚未决定',
    duration: '天数',
    durationOpts: ['3–4 晚', '5–7 晚', '8 晚以上', '未定'],
    adults: '成人',
    children: '儿童',
    childAges: '儿童年龄',
    childAgesPh: '例如 4 岁和 9 岁',
    dates: '确切日期（如已知）',
    datesPh: '例如 2027 年 2 月 12–18 日',
    secWhere: '去哪里',
    secWhat: '想做什么',
    activities: ['哈士奇', '雪地摩托', '极光', '驯鹿', '滑雪', '桑拿与水疗', '冰钓', '破冰船', '徒步（夏季）'],
    secStay: '住哪里',
    stayOpts: ['酒店', '木屋', '玻璃穹顶屋', '未定'],
    secTravel: '怎么来',
    travelOpts: ['飞机', '自驾', '火车', '未定'],
    secBudget: '人均预算',
    budgetOpts: ['500 € 以下', '500–1,000 €', '1,000–2,000 €', '2,000 € 以上', '未定'],
    message: '其他说明',
    messagePh: '生日、求婚、轮椅、带狗、不去驯鹿农场——任何重要的事。',
    secContact: '方案发送到',
    name: '姓名',
    namePh: '您的姓名',
    email: '邮箱',
    emailPh: 'you@example.com',
    submit: '发送我的需求',
    sending: '发送中…',
    errorMsg: '发送未成功。请重试，或发邮件至',
    sentEyebrow: '已收到需求',
    sentHeadline: '谢谢。方案正在准备。',
    sentBody: '我们会在 24–48 小时内联系你。在此期间，运营商指南会告诉你谁做什么：',
    sentLink: '运营商指南',
    sentConfirm: '确认邮件已发送至',
    subjectPrefix: 'LaplandTours 行程需求，来自',
    stepWhen: '什么时候？',
    stepWho: '谁去？',
    stepHow: '住宿、到达与预算',
    next: '下一步',
    back: '返回',
    optional: '可选',
    summary: '到目前为止的需求',
  },
};

/* ── UI ──────────────────────────────────────────────────────────────────── */
// Design-system forms (LV-DESIGN-SYSTEM.md): labels 11 px uppercase tracked
// 🔴 MITATTU 12.9.2026 uudella lomakeportilla (`scripts/audit_lomakkeet.mjs`):
// valkoinen teksti verkoston litteällä pinkillä #EC4899 on 3,53:1, ja AA vaatii
// 4,5:1 kun labeli on 15 px lihavoitu. Täytetty pinkki on siksi #DB2777 (4,63:1)
// — sama askel alas pinkin rampilla kuin laplandhoteldealsin 14 px pillereissä
// (CLAUDE.md, dokumentoitu poikkeus). Iso hero-CTA saa jäädä #EC4899:ään, koska
// ≥ 18,66 px lihavoidulle riittää 3:1.
// white/60; choices are rounded-full pills, snow/20 border at rest, vibe-pink
// only when selected; primary button is the network's rounded-full pink.
/**
 * 2026-09-12 colour pass. Vesa: "värimaailmaa ei ole mietitty". Three inks,
 * one job each, and nothing else:
 *   snow      — every word the reader has to read
 *   pink      — the current choice and the one button that moves forward
 *   cyan      — only what has already been answered (done steps, focus ring)
 * The card sits on a lifted plum-tinted panel (`#151B2C`) so the pills read as
 * objects on a surface rather than outlines floating on the page background.
 */
const LABEL = 'block text-[11px] uppercase tracking-[0.15em] text-snow/65 font-semibold mb-3';
const FIELD =
  'w-full min-h-[48px] px-5 py-3 rounded-full border border-snow/25 bg-white/[0.07] text-snow placeholder-snow/60 font-body text-base focus:outline-none focus:border-arctic-cyan focus:ring-2 focus:ring-arctic-cyan/30 transition';
const PRIMARY =
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap min-h-[48px] rounded-full bg-[#DB2777] hover:bg-[#BE185D] disabled:opacity-60 disabled:cursor-wait text-white font-body font-semibold px-7 py-3 transition-colors';
const GHOST =
  'inline-flex items-center gap-2 min-h-[48px] font-body font-medium text-snow/65 hover:text-snow transition-colors';

function Pill({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`min-h-[44px] rounded-full border px-5 py-2.5 font-body text-[15px] leading-none transition-colors ${
        on
          ? 'bg-[#DB2777] border-[#DB2777] text-white'
          : 'bg-white/[0.07] border-snow/25 text-snow/90 hover:bg-white/[0.12] hover:border-snow/45'
      }`}
    >
      {children}
    </button>
  );
}

/**
 * Stepper — luku kahden napin valissa.
 *
 * 🔴 Mitattu `scripts/audit_lomakkeet.mjs`:lla 12.9.2026: napit olivat 40 px ja
 * lukukentta 32 px, eli molemmat alle 44 px:n kosketuskohteen, ja nakyva label
 * oli pelkka <span> jota mikaan ei kytkenyt kenttaan (kentalla oli vain
 * aria-label). Kolme kierrosta silmalla ei ollut huomannut kumpaakaan.
 */
function Stepper({ label, value, min, max, onChange, name }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void; name: string }) {
  const id = `tp-${name}`;
  return (
    <div className="flex items-center justify-between gap-4 rounded-full border border-snow/15 bg-white/[0.03] pl-5 pr-2 py-1.5">
      <label htmlFor={id} className="font-body text-snow/90 text-[15px]">{label}</label>
      <span className="inline-flex items-center gap-2">
        <button type="button" aria-label={`${label} −`} onClick={() => onChange(Math.max(min, value - 1))} className="w-11 h-11 rounded-full border border-snow/20 text-snow hover:border-arctic-cyan transition-colors leading-none">−</button>
        <input id={id} type="number" name={name} readOnly value={value} className="w-10 h-11 bg-transparent text-center font-heading text-2xl text-snow tabular-nums [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none" />
        <button type="button" aria-label={`${label} +`} onClick={() => onChange(Math.min(max, value + 1))} className="w-11 h-11 rounded-full border border-snow/20 text-snow hover:border-arctic-cyan transition-colors leading-none">+</button>
      </span>
    </div>
  );
}

const STEPS = 6;

export default function CustomTourBuilder() {
  const lang = useLang();
  const to = useLocalePath();
  const bcp47 = useHtmlLang();
  const c = COPY[copyLang(lang)];
  const [status, setStatus] = useState<FormStatus>('idle');
  const [sentTo, setSentTo] = useState('');
  const sentPeriod = lang === 'ja' || lang === 'zh-CN' ? '。' : '.';

  // One question per screen (Vesa 11.9.2026: the all-at-once grid "näyttää
  // niin työläältä"). Everything is state, because only the current step is
  // in the DOM.
  const [step, setStep] = useState(0);
  const [month, setMonth] = useState<number | null>(null); // 0–11, null = not decided
  const [duration, setDuration] = useState<number | null>(null);
  const [dates, setDates] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [childAges, setChildAges] = useState('');
  const [dest, setDest] = useState<Set<number>>(() => new Set());
  const [acts, setActs] = useState<Set<number>>(() => new Set());
  const [stay, setStay] = useState<number | null>(null);
  const [travel, setTravel] = useState<number | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const toggle = (set: Set<number>, i: number, setter: (s: Set<number>) => void) => {
    const next = new Set(set);
    if (next.has(i)) next.delete(i); else next.add(i);
    setter(next);
  };

  const months = Array.from({ length: 12 }, (_, m) =>
    new Intl.DateTimeFormat(bcp47, { month: 'long' }).format(new Date(2027, m, 1)),
  );
  // Short names in the picker. Twelve long month pills wrapped onto five rows at
  // 375 px, so screen 1 was 899 px tall while the others were 554 — and a card that
  // changes height that much makes the browser clamp the scroll position, which is
  // the jump Vesa saw. Long names stay in the summary and in the brief.
  const monthsShort = Array.from({ length: 12 }, (_, m) =>
    new Intl.DateTimeFormat(bcp47, { month: 'short' }).format(new Date(2027, m, 1)).replace(/\.$/, ''),
  );

  // [LV-FUNNEL] view once when the planner scrolls in; start on the first
  // choice; blocked once per submit attempt; submit before fetch; success /
  // error after the server has answered.
  const funnelData = { lang };
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const startTracked = useRef(false);
  const blockedTracked = useRef(false);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((en) => en.isIntersecting)) {
        track('tour_builder_view', funnelData);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const trackStart = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    track('tour_builder_start', funnelData);
  };
  const pick = (fn: () => void) => () => { trackStart(); fn(); };
  /**
   * 2026-09-12: no scrolling here. Vesa: "lomaketta kun täyttää niin se koko
   * sivu pomppii kun painaa seuraava" — `scrollIntoView` moved the page on
   * every step, and because each screen is a different height the card jumped
   * twice. The card now keeps a fixed body height instead, so the heading and
   * the buttons stay exactly where the reader last saw them.
   */
  const go = (n: number) => setStep(Math.max(0, Math.min(STEPS - 1, n)));

  const list = (set: Set<number>, keys: string[]) => keys.filter((_, i) => set.has(i)).join(', ') || '—';
  const summaryParts = [
    month === null ? c.monthAny : months[month],
    duration === null ? null : c.durationOpts[duration],
    `${adults} + ${children}`,
    dest.size ? DESTINATIONS.filter((_, i) => dest.has(i)).join(', ') : null,
    acts.size ? c.activities.filter((_, i) => acts.has(i)).join(', ') : null,
    stay === null ? null : c.stayOpts[stay],
    travel === null ? null : c.travelOpts[travel],
    budget === null ? null : c.budgetOpts[budget],
  ].filter(Boolean) as string[];

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    // The brief is read in sales@, so keys are English whatever the reader's language.
    const body = [
      `Month: ${month === null ? '—' : new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(2027, month, 1))}`,
      `Length: ${duration === null ? '—' : DURATION_KEYS[duration]}`,
      `Dates: ${dates.trim() || '—'}`,
      `Adults: ${adults} · Children: ${children}${childAges.trim() ? ` (ages ${childAges.trim()})` : ''}`,
      `Destinations: ${list(dest, DESTINATIONS)}`,
      `Activities: ${list(acts, ACTIVITY_KEYS)}`,
      `Stay: ${stay === null ? '—' : STAY_KEYS[stay]}`,
      `Arrival: ${travel === null ? '—' : TRAVEL_KEYS[travel]}`,
      `Budget per person (EUR): ${budget === null ? '—' : BUDGET_KEYS[budget]}`,
      '',
      message.trim() || '—',
      '',
      `— laplandtours.online /design-tour (${lang})`,
    ].join('\n');
    const website = String(new FormData(e.target as HTMLFormElement).get('website') ?? '');

    track('tour_builder_submit', funnelData);
    setStatus('sending');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CONTACT_ANON_KEY}` },
        body: JSON.stringify({
          name: name.trim(),
          lang,
          email: email.trim(),
          subject: `${c.subjectPrefix} ${name.trim()}`.trim(),
          message: body,
          website, // honeypot: bots fill it, people never see it
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      track('tour_builder_success', funnelData);
      setSentTo(email.trim());
      setStatus('success');
    } catch (err) {
      track('tour_builder_error', { ...funnelData, reason: err instanceof Error ? err.message : 'network' });
      setStatus('error');
    }
  }

  const stepTitles = [c.stepWhen, c.stepWho, c.secWhere, c.secWhat, c.stepHow, c.secContact];

  return (
    <section id="custom-tour" ref={sectionRef} className="bg-deep-night">
      {/* Opening: the promise and one real photograph. */}
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 pt-16 md:pt-24 pb-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <p className="cap-meta">{c.eyebrow}</p>
          <h1 className="mt-2 font-heading text-snow/95 tracking-wide leading-[0.95] text-5xl sm:text-6xl lg:text-7xl [text-wrap:balance]">
            {c.h1a}<br />{c.h1b}
          </h1>
          <p className="mt-6 text-snow/80 font-body text-base sm:text-lg leading-relaxed max-w-prose">
            {c.lead}
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 font-body text-snow/80 text-[14.5px]">
            {c.bullets.map((item) => (
              <li key={item} className="inline-flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-arctic-cyan flex-shrink-0" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/10">
            <img src="/images/hero-design-tour.webp" alt={c.altPhoto} loading="eager" fetchPriority="high" decoding="async" className="absolute inset-0 w-full h-full object-cover" />
          </div>
          <PhotoCredit taken="2026-07-21" place="Tornio" className="mt-3" />
        </div>
      </div>

      {/* The planner: one question per screen, six screens, max-w-2xl like the
          network's other narrow forms. */}
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 pb-20 md:pb-28">
        <div
          ref={cardRef}
          /* 🔴 Vesa 12.9. (2. kierros): "edelleen lomake nayttaa liian kelluvalta,
             pitaa saada vahan rajoja." Kortilla oli yksi 12 %:n reunaviiva ja
             pehmea varjo, eika sisalla ollut yhtaan viivaa: otsikko, valinnat ja
             navi leijuivat samassa tilassa. Nyt kortti on kehys: vahvempi reuna,
             sisapuolen valokehä, oma ylapalkki ja alapalkki taysleveilla viivoilla,
             ja valinnat omissa kaivoissaan. */
          className="max-w-2xl mx-auto scroll-mt-28 overflow-hidden rounded-3xl border border-snow/20 p-6 sm:p-10 shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(249,250,251,0.07)]"
          style={{ background: 'linear-gradient(180deg,#182034 0%,#131A2A 100%)' }}
        >
          {status === 'success' ? (
            <div className="py-4">
              <p className="cap-meta is-success flex items-center gap-2">
                <CheckCircle className="w-4 h-4" aria-hidden="true" />
                {c.sentEyebrow}
              </p>
              <h2 className="mt-3 font-heading text-3xl sm:text-4xl text-snow tracking-wide leading-tight">{c.sentHeadline}</h2>
              <p className="mt-4 text-snow/80 font-body">
                {c.sentBody}{' '}
                <a href={to('/lapland-holidays')} className="text-vibe-pink hover:underline">{c.sentLink}</a>{sentPeriod}
              </p>
              <p className="cap-meta mt-8 text-snow/55">{c.sentConfirm}</p>
              <p className="mt-1 font-body text-sm text-snow/85 break-words">{sentTo}</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onInvalidCapture={(e) => {
                if (blockedTracked.current) return;
                blockedTracked.current = true;
                window.setTimeout(() => { blockedTracked.current = false; }, 400);
                const t = e.target as HTMLInputElement;
                track('tour_builder_blocked', { ...funnelData, reason: t.name || 'field' });
              }}
            >
              {/* Progress: one track, filled as far as the reader has come. Six
                  separate dashes read as six more things to do. */}
              <div className="-mx-6 sm:-mx-10 px-6 sm:px-10 pb-5 mb-7 border-b border-white/10">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="cap-meta text-snow/60">{step + 1} / {STEPS}</p>
                  <p className="cap-meta text-arctic-cyan">{Math.round(((step + 1) / STEPS) * 100)} %</p>
                </div>
                <div className="mt-2 h-[3px] w-full rounded-full bg-white/12 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-vibe-pink transition-[width] duration-300 ease-out"
                    style={{ width: `${((step + 1) / STEPS) * 100}%` }}
                  />
                </div>
              </div>

              {/* Kiintea rungon korkeus: kortti ei saa muuttaa kokoaan askelten
                  valilla, tai napit liikkuvat kursorin alta (Vesa 12.9.: "sivu pomppii").
                  🔴 Lattia on MITATTU uudelleen 12.9. illalla, kun valinnoille tuli
                  kaivot: puhelimessa askel 5 (majoitus+saapuminen+budjetti) on korkein
                  642 px ja tyopoydalla askel 6 on 435 px (lattia 436). Jos lisaat kaivon, pillerin tai rivin,
                  MITTAA uudestaan (.tmp/wiz-measure.mjs) — muuten pomppiminen palaa. */}
              <div data-planner-body className="min-h-[642px] sm:min-h-[436px]">
                <h2 className="font-heading tracking-wide text-snow text-3xl sm:text-4xl leading-none mb-7">{stepTitles[step]}</h2>
                {step === 0 && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 divide-y divide-white/10">
                    <div className="p-3 sm:p-4">
                      <span className={LABEL}>{c.month}</span>
                      <div className="space-y-2">
                        <Pill on={month === null} onClick={pick(() => setMonth(null))}>{c.monthAny}</Pill>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                          {monthsShort.map((m, i) => (
                            <Pill key={m} on={month === i} onClick={pick(() => setMonth(i))}>{m}</Pill>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <span className={LABEL}>{c.duration}</span>
                      <div className="flex flex-wrap gap-2">
                        {c.durationOpts.map((o, i) => (
                          <Pill key={o} on={duration === i} onClick={pick(() => setDuration(duration === i ? null : i))}>{o}</Pill>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
  
                {step === 1 && (
                  <div className="space-y-4">
                    <Stepper label={c.adults} value={adults} min={1} max={30} onChange={(v) => { trackStart(); setAdults(v); }} name="adults" />
                    <Stepper label={c.children} value={children} min={0} max={20} onChange={(v) => { trackStart(); setChildren(v); }} name="children" />
                    {children > 0 && (
                      <div className="pt-2">
                        <label className={LABEL} htmlFor="tp-ages">{c.childAges}</label>
                        <input id="tp-ages" type="text" name="childAges" value={childAges} maxLength={60} onChange={(e) => setChildAges(e.target.value)} placeholder={c.childAgesPh} className={FIELD} />
                      </div>
                    )}
                    <div>
                    <label className={LABEL} htmlFor="tp-dates">{c.dates} · {c.optional}</label>
                    <input id="tp-dates" type="text" name="dates" value={dates} maxLength={80} onFocus={trackStart} onChange={(e) => setDates(e.target.value)} placeholder={c.datesPh} className={FIELD} />
                    </div>
                  </div>
                )}
  
                {step === 2 && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4 flex flex-wrap gap-2">
                    {DESTINATIONS.map((d, i) => (
                      <Pill key={d} on={dest.has(i)} onClick={pick(() => toggle(dest, i, setDest))}>{d}</Pill>
                    ))}
                  </div>
                )}
  
                {step === 3 && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 p-3 sm:p-4 flex flex-wrap gap-2">
                    {c.activities.map((a, i) => (
                      <Pill key={a} on={acts.has(i)} onClick={pick(() => toggle(acts, i, setActs))}>{a}</Pill>
                    ))}
                  </div>
                )}
  
                {step === 4 && (
                  <div className="rounded-2xl border border-white/10 bg-black/20 divide-y divide-white/10">
                    <div className="p-3 sm:p-4">
                      <span className={LABEL}>{c.secStay}</span>
                      <div className="flex flex-wrap gap-2">
                        {c.stayOpts.map((o, i) => (
                          <Pill key={o} on={stay === i} onClick={pick(() => setStay(stay === i ? null : i))}>{o}</Pill>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <span className={LABEL}>{c.secTravel}</span>
                      <div className="flex flex-wrap gap-2">
                        {c.travelOpts.map((o, i) => (
                          <Pill key={o} on={travel === i} onClick={pick(() => setTravel(travel === i ? null : i))}>{o}</Pill>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 sm:p-4">
                      <span className={LABEL}>{c.secBudget}</span>
                      <div className="flex flex-wrap gap-2">
                        {c.budgetOpts.map((o, i) => (
                          <Pill key={o} on={budget === i} onClick={pick(() => setBudget(budget === i ? null : i))}>{o}</Pill>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
  
                {step === 5 && (
                  <div className="space-y-5">
                    {summaryParts.length > 0 && (
                      <p className="rounded-2xl border border-arctic-cyan/25 bg-arctic-cyan/[0.06] px-5 py-4 font-body text-[14.5px] text-snow/85 leading-relaxed">
                        <span className="block text-[11px] uppercase tracking-[0.15em] text-arctic-cyan font-semibold mb-1">{c.summary}</span>
                        {summaryParts.join(' · ')}
                      </p>
                    )}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className={LABEL} htmlFor="tp-name">{c.name}</label>
                        <input id="tp-name" type="text" name="name" autoComplete="name" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} onFocus={trackStart} placeholder={c.namePh} className={FIELD} />
                      </div>
                      <div>
                        <label className={LABEL} htmlFor="tp-email">{c.email}</label>
                        <input id="tp-email" type="email" name="email" autoComplete="email" required maxLength={255} value={email} onChange={(e) => setEmail(e.target.value)} onFocus={trackStart} placeholder={c.emailPh} className={FIELD} />
                      </div>
                    </div>
                    <div>
                      <label className={LABEL} htmlFor="tp-message">{c.message} · {c.optional}</label>
                      {/* 🔴 Esimerkit olivat placeholderina: 96 merkkia, joka katosi heti
                          ensimmaisesta kirjaimesta, ja nelja rivia korkeassa laatikossa ne
                          nayttivat leijuvan (Vesa 12.9.: "miksi tuossa isossa puhekuplassa
                          tekstit ei ole keskella sita?"). Kentan teksti ei voi olla
                          pystykeskitettya - kirjoittaminen alkaa vasemmasta ylakulmasta -
                          joten laatikko tehtiin sisaltonsa kokoiseksi ja esimerkit
                          nostettiin vihjeriville, jossa ne pysyvat nakyvissa. */}
                      <p id="tp-message-hint" className="-mt-1 mb-2 font-body text-[13px] leading-relaxed text-snow/55">
                        {c.messagePh}
                      </p>
                      <textarea
                        id="tp-message"
                        name="message"
                        rows={3}
                        maxLength={2000}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onFocus={trackStart}
                        aria-describedby="tp-message-hint"
                        className="w-full px-5 py-4 rounded-2xl border border-snow/25 bg-white/[0.07] text-snow font-body text-base leading-relaxed resize-none focus:outline-none focus:border-arctic-cyan focus:ring-2 focus:ring-arctic-cyan/30 transition"
                      />
                    </div>
                    {/* Honeypot: hidden from people, filled by bots; the edge function
                        returns 200 and sends nothing when it is set. */}
                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute left-[-9999px] w-px h-px opacity-0" />
                    {status === 'error' && (
                      <p role="alert" className="font-body text-sm text-red-300">
                        {c.errorMsg}{' '}
                        <a href="mailto:info@laplandvibes.com" className="underline hover:text-vibe-pink">info@laplandvibes.com</a>
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation. Fixed height and a fixed left slot: the reassurance
                  line used to sit here on step 1 only, wrapped to two lines on a
                  phone, and that alone changed the card height between steps. It
                  now lives under the card, where it never moves. */}
              <div className="-mx-6 sm:-mx-10 px-6 sm:px-10 pt-6 mt-8 border-t border-white/10 flex items-center justify-between gap-3 min-h-[48px]">
                {step > 0 ? (
                  <button type="button" onClick={() => go(step - 1)} className={GHOST}>
                    <span aria-hidden="true">←</span> {c.back}
                  </button>
                ) : (
                  <span aria-hidden="true" />
                )}
                {step < STEPS - 1 ? (
                  <button type="button" onClick={() => { trackStart(); go(step + 1); }} className={PRIMARY}>
                    {c.next} <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button type="submit" disabled={status === 'sending'} aria-busy={status === 'sending'} className={PRIMARY}>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    {status === 'sending' ? c.sending : c.submit}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
        <p className="max-w-2xl mx-auto mt-4 cap-meta text-snow/50 text-center">{c.noCommitment}</p>
      </div>
    </section>
  );
}
