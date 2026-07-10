import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Briefcase, Newspaper, X } from 'lucide-react';

// Finnish flag colors, match CookieBanner
const BLUE = '#002F6C';
const WHITE = '#F8FAFC';
const PINK = '#EC4899';

// ─── Contact form backend ─────────────────────────────────────────────────
// All 27 sites post the footer contact form to the hub project's
// `send-contact-email` edge function (CORS allows every ecosystem origin;
// emails route to sales@laplandvibes.com + a confirmation to the sender).
// The anon/publishable key is public by design. Hardcoded here so spoke sites
// that use a *different* Supabase project for their newsletter still reach the
// one project where send-contact-email is deployed.
const CONTACT_ENDPOINT = 'https://oogioaxmfnqcbvjbcodh.supabase.co/functions/v1/send-contact-email';
const CONTACT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';

type ContactKind = 'error' | 'partner' | 'press' | 'general';
interface ContactFormCopy {
  name: string; email: string; subject: string; message: string;
  send: string; sending: string; successTitle: string; successBody: string;
  errorMsg: string; close: string; required: string;
  subj: Record<ContactKind, string>;
}
const CONTACT_FORM_COPY: Record<string, ContactFormCopy> = {
  en: { name:'Your name', email:'Your email', subject:'Subject', message:'Message', send:'Send message', sending:'Sending…', successTitle:'Message sent!', successBody:"Thanks, we'll get back to you within 24–48 hours.", errorMsg:'Something went wrong. Please try again.', close:'Close', required:'Please fill in all fields with a valid email.', subj:{ error:'Error report', partner:'Partnership inquiry', press:'Press inquiry', general:'General inquiry' } },
  fi: { name:'Nimesi', email:'Sähköpostisi', subject:'Aihe', message:'Viesti', send:'Lähetä viesti', sending:'Lähetetään…', successTitle:'Viesti lähetetty!', successBody:'Kiitos, vastaamme 24–48 tunnin kuluessa.', errorMsg:'Jokin meni pieleen. Yritä uudelleen.', close:'Sulje', required:'Täytä kaikki kentät ja anna kelvollinen sähköposti.', subj:{ error:'Virheilmoitus', partner:'Yhteistyötiedustelu', press:'Lehdistötiedustelu', general:'Yleinen tiedustelu' } },
  de: { name:'Ihr Name', email:'Ihre E-Mail', subject:'Betreff', message:'Nachricht', send:'Nachricht senden', sending:'Senden…', successTitle:'Nachricht gesendet!', successBody:'Danke, wir melden uns innerhalb von 24–48 Stunden.', errorMsg:'Etwas ist schiefgelaufen. Bitte erneut versuchen.', close:'Schließen', required:'Bitte alle Felder mit gültiger E-Mail ausfüllen.', subj:{ error:'Fehlermeldung', partner:'Kooperationsanfrage', press:'Presseanfrage', general:'Allgemeine Anfrage' } },
  ja: { name:'お名前', email:'メールアドレス', subject:'件名', message:'メッセージ', send:'送信', sending:'送信中…', successTitle:'送信しました!', successBody:'ありがとうございます, 24〜48時間以内にご返信します。', errorMsg:'問題が発生しました。もう一度お試しください。', close:'閉じる', required:'すべての項目と有効なメールアドレスをご入力ください。', subj:{ error:'エラー報告', partner:'提携のお問い合わせ', press:'プレスのお問い合わせ', general:'一般的なお問い合わせ' } },
  es: { name:'Tu nombre', email:'Tu correo', subject:'Asunto', message:'Mensaje', send:'Enviar mensaje', sending:'Enviando…', successTitle:'¡Mensaje enviado!', successBody:'Gracias, te responderemos en 24–48 horas.', errorMsg:'Algo salió mal. Inténtalo de nuevo.', close:'Cerrar', required:'Completa todos los campos con un correo válido.', subj:{ error:'Reporte de error', partner:'Consulta de colaboración', press:'Consulta de prensa', general:'Consulta general' } },
  'pt-BR': { name:'Seu nome', email:'Seu e-mail', subject:'Assunto', message:'Mensagem', send:'Enviar mensagem', sending:'Enviando…', successTitle:'Mensagem enviada!', successBody:'Obrigado, responderemos em 24–48 horas.', errorMsg:'Algo deu errado. Tente novamente.', close:'Fechar', required:'Preencha todos os campos com um e-mail válido.', subj:{ error:'Relatar erro', partner:'Consulta de parceria', press:'Consulta de imprensa', general:'Consulta geral' } },
  'zh-CN': { name:'您的姓名', email:'您的邮箱', subject:'主题', message:'留言', send:'发送', sending:'发送中…', successTitle:'已发送!', successBody:'谢谢, 我们将在 24–48 小时内回复。', errorMsg:'出错了,请重试。', close:'关闭', required:'请填写所有字段并提供有效邮箱。', subj:{ error:'错误报告', partner:'合作咨询', press:'媒体咨询', general:'一般咨询' } },
  ko: { name:'이름', email:'이메일', subject:'제목', message:'메시지', send:'보내기', sending:'전송 중…', successTitle:'전송되었습니다!', successBody:'감사합니다, 24~48시간 이내에 답변드리겠습니다.', errorMsg:'문제가 발생했습니다. 다시 시도해 주세요.', close:'닫기', required:'모든 항목과 유효한 이메일을 입력해 주세요.', subj:{ error:'오류 신고', partner:'제휴 문의', press:'언론 문의', general:'일반 문의' } },
  fr: { name:'Votre nom', email:'Votre e-mail', subject:'Objet', message:'Message', send:'Envoyer', sending:'Envoi…', successTitle:'Message envoyé !', successBody:'Merci, nous vous répondrons sous 24–48 heures.', errorMsg:'Une erreur est survenue. Réessayez.', close:'Fermer', required:'Veuillez remplir tous les champs avec un e-mail valide.', subj:{ error:'Signalement d\'erreur', partner:'Demande de partenariat', press:'Demande presse', general:'Demande générale' } },
  it: { name:'Il tuo nome', email:'La tua email', subject:'Oggetto', message:'Messaggio', send:'Invia messaggio', sending:'Invio…', successTitle:'Messaggio inviato!', successBody:'Grazie, ti risponderemo entro 24–48 ore.', errorMsg:'Qualcosa è andato storto. Riprova.', close:'Chiudi', required:'Compila tutti i campi con un\'email valida.', subj:{ error:'Segnalazione di errore', partner:'Richiesta di collaborazione', press:'Richiesta stampa', general:'Richiesta generale' } },
  nl: { name:'Uw naam', email:'Uw e-mail', subject:'Onderwerp', message:'Bericht', send:'Bericht versturen', sending:'Versturen…', successTitle:'Bericht verzonden!', successBody:'Bedankt, we reageren binnen 24–48 uur.', errorMsg:'Er ging iets mis. Probeer opnieuw.', close:'Sluiten', required:'Vul alle velden in met een geldig e-mailadres.', subj:{ error:'Foutmelding', partner:'Samenwerkingsverzoek', press:'Persaanvraag', general:'Algemene vraag' } },
};

/**
 * Optional i18n dictionary. If a site provides a `dict` prop, those strings
 * replace the English defaults. Sites that don't pass dict keep the existing
 * English chrome (backwards compatible, every site keeps working).
 */
export interface FooterDict {
  networkBadge?: string;
  tagline?: string;
  groups?: {
    stay?: string;
    eatDrink?: string;
    do?: string;
    explore?: string;
    essentials?: string;
  };
  travelGuideKicker?: string;
  about?: {
    eyebrow?: string;
    body?: string;
    badge?: string;
  };
  spottedError?: { title?: string; body?: string; cta?: string };
  partner?: { title?: string; body?: string; cta?: string };
  press?: { title?: string; body?: string; cta?: string };
  affiliate?: string;
  copyright?: string;
  websiteBy?: string;
  legal?: { privacy?: string; cookie?: string; terms?: string; contact?: string };
  /**
   * Optional localized labels for the 27-spoke ecosystem grid. Keys correspond
   * to the site slug; values replace the English defaults like "Hotel Deals".
   * Any missing key falls back to the hardcoded English label so backwards
   * compatibility is preserved. Brand-name sites (where the URL == the brand)
   * still render their English brand. These labels describe the niche.
   */
  siteLabels?: {
    hotelDeals?: string;
    staysCabins?: string;
    whereToStay?: string;
    familyFriendly?: string;
    localFood?: string;
    fineDining?: string;
    barsPubs?: string;
    activities?: string;
    huskySafaris?: string;
    skiResorts?: string;
    snowmobileTours?: string;
    spaWellness?: string;
    nightlife?: string;
    natureParks?: string;
    travelGuide?: string;
    christmas?: string;
    giftsSouvenirs?: string;
    travelBlog?: string;
    dealsOffers?: string;
    transport?: string;
    carRental?: string;
    workInLapland?: string;
    luxuryVillas?: string;
    tours?: string;
    weddings?: string;
    store?: string;
    flights?: string;
  };
}

const DEFAULT_DICT: Required<FooterDict> & {
  groups: Required<NonNullable<FooterDict['groups']>>;
  about: Required<NonNullable<FooterDict['about']>>;
  spottedError: Required<NonNullable<FooterDict['spottedError']>>;
  partner: Required<NonNullable<FooterDict['partner']>>;
  press: Required<NonNullable<FooterDict['press']>>;
  legal: Required<NonNullable<FooterDict['legal']>>;
  siteLabels: Required<NonNullable<FooterDict['siteLabels']>>;
} = {
  networkBadge: 'Finnish Lapland Network',
  tagline: 'The definitive digital home for Finnish Lapland travel.',
  groups: {
    stay: 'Stay',
    eatDrink: 'Eat & Drink',
    do: 'Do',
    explore: 'Explore',
    essentials: 'Essentials',
  },
  travelGuideKicker: 'Lapland Travel Guide',
  about: {
    eyebrow: 'About LaplandVibes',
    body: 'The definitive guide to Finnish Lapland, from the revontulet to the midnight sun. Curated experiences, insider tips, and cited sources for planning your Arctic trip.',
    badge: 'Independently maintained · sources cited',
  },
  spottedError: {
    title: 'Spotted an Error?',
    body: "See something that needs fixing? Tell us, we'll correct it immediately.",
    cta: 'Report an Error →',
  },
  partner: {
    title: 'Partner With Us',
    body: 'Advertise or collaborate across 21+ Lapland sites.',
    cta: 'Get in Touch →',
  },
  press: {
    title: 'Press & Media',
    body: 'Editorial partnerships and press kits.',
    cta: 'Press Enquiries →',
  },
  affiliate:
    'This site contains affiliate links. If you book through these links, LaplandVibes may receive a commission at no extra cost to you.',
  copyright: '© {{year}} #LaplandVibes, Part of the #LaplandVibes Network',
  websiteBy: 'Website by Yrityspaketit.fi',
  legal: {
    privacy: 'Privacy Policy',
    cookie: 'Cookie Policy',
    terms: 'Terms of Use',
    contact: 'Contact',
  },
  siteLabels: {
    hotelDeals: '100+ hand-picked hotel deals',
    staysCabins: 'Stays & Cabins',
    whereToStay: 'Glass igloos, cabins, real rates',
    familyFriendly: 'Family resorts + Santa visits',
    localFood: 'Sami cuisine + foraging',
    fineDining: 'Fine Dining',
    barsPubs: 'Bars & Pubs',
    activities: 'Hand-picked Arctic activities',
    huskySafaris: 'Husky safaris from 35+ operators',
    skiResorts: '8 ski resorts compared',
    snowmobileTours: 'Snowmobile safaris from €120',
    spaWellness: 'Saunas, spas, aurora wellness',
    nightlife: 'Nightlife',
    natureParks: 'Nature & Parks',
    travelGuide: 'Travel Guide',
    christmas: 'Christmas in Lapland, Santa Village, Aurora',
    giftsSouvenirs: 'Gifts & Souvenirs',
    travelBlog: 'Travel Blog',
    dealsOffers: 'Deals & Offers',
    transport: 'Transport',
    carRental: 'Car Rental',
    workInLapland: 'Work in Lapland',
    luxuryVillas: 'Private villas & luxury lodges',
    tours: 'Guided tours & day trips',
    weddings: 'Arctic weddings & elopements',
    store: 'Official Lapland store',
    flights: 'Flights to Lapland',
  },
};

// ─── Built-in 11-lang siteLabels, auto-applied based on URL prefix ───────────
// This means every spoke site that imports SharedFooter gets localized niche
// labels for the 27-spoke ecosystem grid for free on /kr /fr /it /nl etc.
// Sites that pass their own `dict.siteLabels` override these.
type SiteLabelsKey =
  | 'hotelDeals' | 'staysCabins' | 'whereToStay' | 'familyFriendly'
  | 'localFood' | 'fineDining' | 'barsPubs' | 'activities'
  | 'huskySafaris' | 'skiResorts' | 'snowmobileTours' | 'spaWellness'
  | 'nightlife' | 'natureParks' | 'travelGuide' | 'christmas'
  | 'giftsSouvenirs' | 'travelBlog' | 'dealsOffers' | 'transport'
  | 'carRental' | 'workInLapland';

const BUILT_IN_SITE_LABELS: Record<string, Record<SiteLabelsKey, string>> = {
  en: { hotelDeals:'100+ hand-picked hotel deals',staysCabins:'Stays & Cabins',whereToStay:'Glass igloos, cabins, real rates',familyFriendly:'Family resorts + Santa visits',localFood:'Sami cuisine + foraging',fineDining:'Fine Dining',barsPubs:'Bars & Pubs',activities:'Hand-picked Arctic activities',huskySafaris:'Husky safaris from 35+ operators',skiResorts:'8 ski resorts compared',snowmobileTours:'Snowmobile safaris from €120',spaWellness:'Saunas, spas, aurora wellness',nightlife:'Nightlife',natureParks:'Nature & Parks',travelGuide:'Travel Guide',christmas:'Christmas in Lapland, Santa Village, Aurora',giftsSouvenirs:'Gifts & Souvenirs',travelBlog:'Travel Blog',dealsOffers:'Deals & Offers',transport:'Transport',carRental:'Car Rental',workInLapland:'Work in Lapland' },
  fi: { hotelDeals:'100+ käsin valittua hotellitarjousta',staysCabins:'Majoitus & Mökit',whereToStay:'Lasi-iglut, mökit, oikeat hinnat',familyFriendly:'Perheresortit + joulupukin tapaaminen',localFood:'Saamelaisruoka & marjastus',fineDining:'Fine dining',barsPubs:'Baarit & Pubit',activities:'Käsin valitut Arktis-elämykset',huskySafaris:'Huskysafarit 35+ operaattorilta',skiResorts:'8 hiihtokeskusta vertailussa',snowmobileTours:'Moottorikelkkasafarit alk. 120 €',spaWellness:'Saunat, kylpylät, revontuli-hyvinvointi',nightlife:'Yöelämä',natureParks:'Luonto & Puistot',travelGuide:'Matkaopas',christmas:'Joulu Lapissa, Joulupukin pajakylä, revontulet',giftsSouvenirs:'Lahjat & Matkamuistot',travelBlog:'Matkablogi',dealsOffers:'Tarjoukset',transport:'Liikenne',carRental:'Autovuokraus',workInLapland:'Työ Lapissa' },
  de: { hotelDeals:'100+ handverlesene Hotelangebote',staysCabins:'Unterkünfte & Hütten',whereToStay:'Glasiglus, Hütten, echte Preise',familyFriendly:'Familienresorts + Weihnachtsmann-Besuche',localFood:'Samische Küche & Beerensammeln',fineDining:'Fine Dining',barsPubs:'Bars & Pubs',activities:'Handverlesene Arktis-Aktivitäten',huskySafaris:'Husky-Safaris von 35+ Anbietern',skiResorts:'8 Skigebiete im Vergleich',snowmobileTours:'Schneemobil-Safaris ab 120 €',spaWellness:'Saunas, Spas, Aurora-Wellness',nightlife:'Nachtleben',natureParks:'Natur & Parks',travelGuide:'Reiseführer',christmas:'Weihnachten in Lappland, Weihnachtsmanndorf, Polarlicht',giftsSouvenirs:'Geschenke & Souvenirs',travelBlog:'Reiseblog',dealsOffers:'Angebote',transport:'Transport',carRental:'Mietwagen',workInLapland:'Arbeiten in Lappland' },
  ja: { hotelDeals:'100軒以上の厳選ホテル特価',staysCabins:'宿泊・コテージ',whereToStay:'ガラスイグルー、コテージ、実際の料金',familyFriendly:'ファミリーリゾート＋サンタ訪問',localFood:'サーミ料理＋ベリー摘み',fineDining:'ファインダイニング',barsPubs:'バー・パブ',activities:'厳選北極アクティビティ',huskySafaris:'35以上の業者のハスキーサファリ',skiResorts:'8つのスキーリゾート比較',snowmobileTours:'スノーモービルサファリ €120〜',spaWellness:'サウナ、スパ、オーロラ・ウェルネス',nightlife:'ナイトライフ',natureParks:'自然と公園',travelGuide:'旅行ガイド',christmas:'ラップランドのクリスマス, サンタ村、オーロラ',giftsSouvenirs:'ギフト・お土産',travelBlog:'旅行ブログ',dealsOffers:'お得な情報',transport:'交通',carRental:'レンタカー',workInLapland:'ラップランドで働く' },
  es: { hotelDeals:'+100 ofertas de hotel seleccionadas',staysCabins:'Alojamiento y Cabañas',whereToStay:'Iglús de cristal, cabañas, precios reales',familyFriendly:'Resorts familiares + visitas a Papá Noel',localFood:'Cocina sami + recolección',fineDining:'Alta cocina',barsPubs:'Bares y pubs',activities:'Actividades árticas seleccionadas',huskySafaris:'Safaris en husky de +35 operadores',skiResorts:'8 estaciones de esquí comparadas',snowmobileTours:'Safaris en motonieve desde 120 €',spaWellness:'Saunas, spas, bienestar aurora',nightlife:'Vida nocturna',natureParks:'Naturaleza y parques',travelGuide:'Guía de viaje',christmas:'Navidad en Laponia, Aldea de Papá Noel, auroras',giftsSouvenirs:'Regalos y recuerdos',travelBlog:'Blog de viajes',dealsOffers:'Ofertas',transport:'Transporte',carRental:'Alquiler de coches',workInLapland:'Trabajar en Laponia' },
  'pt-BR': { hotelDeals:'+100 ofertas de hotel selecionadas',staysCabins:'Hospedagens e Chalés',whereToStay:'Iglus de vidro, chalés, preços reais',familyFriendly:'Resorts familiares + visitas ao Papai Noel',localFood:'Culinária sami + colheita',fineDining:'Alta gastronomia',barsPubs:'Bares e pubs',activities:'Atividades árticas selecionadas',huskySafaris:'Safáris com huskies de +35 operadores',skiResorts:'8 estações de esqui comparadas',snowmobileTours:'Safáris de snowmobile a partir de € 120',spaWellness:'Saunas, spas, bem-estar aurora',nightlife:'Vida noturna',natureParks:'Natureza e parques',travelGuide:'Guia de viagem',christmas:'Natal na Lapônia, Vila do Papai Noel, auroras',giftsSouvenirs:'Presentes e Lembranças',travelBlog:'Blog de viagem',dealsOffers:'Ofertas',transport:'Transporte',carRental:'Aluguel de carros',workInLapland:'Trabalhar na Lapônia' },
  'zh-CN': { hotelDeals:'100+ 精选酒店特惠',staysCabins:'住宿与小木屋',whereToStay:'玻璃穹屋、小木屋、真实价格',familyFriendly:'家庭度假村 + 圣诞老人探访',localFood:'萨米料理 + 采摘野味',fineDining:'高级餐饮',barsPubs:'酒吧',activities:'精选北极活动',huskySafaris:'35+ 运营商哈士奇雪橇游',skiResorts:'8 家滑雪度假村对比',snowmobileTours:'雪地摩托旅程 €120 起',spaWellness:'桑拿、水疗、极光养生',nightlife:'夜生活',natureParks:'自然与公园',travelGuide:'旅行指南',christmas:'拉普兰圣诞, 圣诞老人村、极光',giftsSouvenirs:'礼品与纪念品',travelBlog:'旅行博客',dealsOffers:'优惠',transport:'交通',carRental:'租车',workInLapland:'在拉普兰工作' },
  ko: { hotelDeals:'엄선한 호텔 특가 100+',staysCabins:'숙소 & 오두막',whereToStay:'글래스 이글루, 캐빈, 실제 가격',familyFriendly:'가족 리조트 + 산타 방문',localFood:'사미 요리 + 채집',fineDining:'파인다이닝',barsPubs:'바 & 펍',activities:'엄선한 북극 액티비티',huskySafaris:'35곳 이상 업체의 허스키 사파리',skiResorts:'8개 스키 리조트 비교',snowmobileTours:'스노모빌 사파리 €120부터',spaWellness:'사우나, 스파, 오로라 웰니스',nightlife:'나이트라이프',natureParks:'자연 & 공원',travelGuide:'여행 가이드',christmas:'라플란드 크리스마스, 산타 마을, 오로라',giftsSouvenirs:'기프트 & 기념품',travelBlog:'여행 블로그',dealsOffers:'특가 정보',transport:'교통',carRental:'렌터카',workInLapland:'라플란드에서 일하기' },
  fr: { hotelDeals:'100+ offres hôtelières sélectionnées',staysCabins:'Hébergements & Chalets',whereToStay:'Igloos de verre, chalets, tarifs réels',familyFriendly:'Resorts famille + visites au Père Noël',localFood:'Cuisine sami + cueillette',fineDining:'Gastronomie',barsPubs:'Bars & Pubs',activities:'Activités arctiques sélectionnées',huskySafaris:'Safaris huskies de 35+ opérateurs',skiResorts:'8 stations de ski comparées',snowmobileTours:'Safaris en motoneige dès 120 €',spaWellness:'Saunas, spas, bien-être aurores',nightlife:'Vie nocturne',natureParks:'Nature & Parcs',travelGuide:'Guide de voyage',christmas:'Noël en Laponie, Village du Père Noël, aurores',giftsSouvenirs:'Cadeaux & Souvenirs',travelBlog:'Blog voyage',dealsOffers:'Offres',transport:'Transport',carRental:'Location de voiture',workInLapland:'Travailler en Laponie' },
  it: { hotelDeals:'100+ offerte hotel selezionate',staysCabins:'Alloggi e Cottage',whereToStay:'Igloo di vetro, chalet, prezzi reali',familyFriendly:'Resort famiglia + visite a Babbo Natale',localFood:'Cucina sami + raccolta',fineDining:'Alta cucina',barsPubs:'Bar e Pub',activities:'Attività artiche selezionate',huskySafaris:'Safari con i husky da 35+ operatori',skiResorts:'8 stazioni sciistiche a confronto',snowmobileTours:'Safari in motoslitta da 120 €',spaWellness:'Saune, spa, benessere aurora',nightlife:'Vita notturna',natureParks:'Natura e Parchi',travelGuide:'Guida di viaggio',christmas:'Natale in Lapponia, Villaggio di Babbo Natale, aurore',giftsSouvenirs:'Regali e Souvenir',travelBlog:'Blog di viaggio',dealsOffers:'Offerte',transport:'Trasporti',carRental:'Noleggio auto',workInLapland:'Lavorare in Lapponia' },
  nl: { hotelDeals:'100+ zorgvuldig gekozen hotelaanbiedingen',staysCabins:'Verblijven & Hutten',whereToStay:'Glasiglo\'s, cabins, echte prijzen',familyFriendly:'Gezinsresorts + bezoek aan de Kerstman',localFood:'Sami-keuken + plukken',fineDining:'Fine dining',barsPubs:'Bars & Pubs',activities:'Zorgvuldig gekozen Arctische activiteiten',huskySafaris:"Husky-safari's van 35+ operators",skiResorts:'8 skioorden vergeleken',snowmobileTours:'Sneeuwscootersafari\'s vanaf €120',spaWellness:'Sauna\'s, spa\'s, aurora-welzijn',nightlife:'Nachtleven',natureParks:'Natuur & Parken',travelGuide:'Reisgids',christmas:'Kerstmis in Lapland, Kerstmandorp, noorderlicht',giftsSouvenirs:'Cadeaus & Souvenirs',travelBlog:'Reisblog',dealsOffers:'Aanbiedingen',transport:'Vervoer',carRental:'Autoverhuur',workInLapland:'Werken in Lapland' },
};

// ─── 4 ecosystem sites added to the footer grid (kept in a separate map so the
// typed BUILT_IN_SITE_LABELS above stays valid without touching all 11 lines) ──
type ExtLabelsKey = 'luxuryVillas' | 'tours' | 'weddings' | 'store' | 'flights';
const EXT_SITE_LABELS: Record<string, Record<ExtLabelsKey, string>> = {
  en: { luxuryVillas:'Private villas & luxury lodges', tours:'Guided tours & day trips', weddings:'Arctic weddings & elopements', store:'Official Lapland store', flights:'Flights to Lapland' },
  fi: { luxuryVillas:'Yksityishuvilat & luksusmajat', tours:'Opastetut retket & päiväretket', weddings:'Arktiset häät & vihkimiset', store:'Virallinen Lappi-kauppa', flights:'Lennot Lappiin' },
  de: { luxuryVillas:'Private Villen & Luxus-Lodges', tours:'Geführte Touren & Tagesausflüge', weddings:'Arktische Hochzeiten', store:'Offizieller Lappland-Shop', flights:'Flüge nach Lappland' },
  ja: { luxuryVillas:'プライベートヴィラ・高級ロッジ', tours:'ガイドツアー・日帰り旅行', weddings:'北極ウエディング', store:'公式ラップランドストア', flights:'ラップランドへの航空券' },
  es: { luxuryVillas:'Villas privadas y lodges de lujo', tours:'Tours guiados y excursiones', weddings:'Bodas árticas', store:'Tienda oficial de Laponia', flights:'Vuelos a Laponia' },
  'pt-BR': { luxuryVillas:'Vilas privativas e lodges de luxo', tours:'Tours guiados e bate-voltas', weddings:'Casamentos no Ártico', store:'Loja oficial da Lapônia', flights:'Voos para a Lapônia' },
  'zh-CN': { luxuryVillas:'私人别墅与豪华小屋', tours:'导览游与一日游', weddings:'北极婚礼', store:'拉普兰官方商店', flights:'飞往拉普兰的航班' },
  ko: { luxuryVillas:'프라이빗 빌라 & 럭셔리 로지', tours:'가이드 투어 & 당일 여행', weddings:'북극 웨딩', store:'공식 라플란드 스토어', flights:'라플란드행 항공편' },
  fr: { luxuryVillas:'Villas privées & lodges de luxe', tours:'Visites guidées & excursions', weddings:'Mariages arctiques', store:'Boutique officielle Laponie', flights:'Vols vers la Laponie' },
  it: { luxuryVillas:'Ville private e lodge di lusso', tours:'Tour guidati ed escursioni', weddings:'Matrimoni artici', store:'Negozio ufficiale Lapponia', flights:'Voli per la Lapponia' },
  nl: { luxuryVillas:"Privévilla's & luxe lodges", tours:'Begeleide tours & dagtrips', weddings:'Arctische bruiloften', store:'Officiële Lapland-winkel', flights:'Vluchten naar Lapland' },
};

/** Detect lang from URL path prefix. Returns 'en' if none matches. */
function detectLangFromURL(): keyof typeof BUILT_IN_SITE_LABELS {
  if (typeof window === 'undefined') return 'en';
  const seg = window.location.pathname.split('/')[1]?.toLowerCase() ?? '';
  // Accept both ISO codes and short codes used across the network
  const map: Record<string, keyof typeof BUILT_IN_SITE_LABELS> = {
    fi: 'fi', de: 'de', ja: 'ja', es: 'es',
    br: 'pt-BR', 'pt-br': 'pt-BR', pt: 'pt-BR',
    cn: 'zh-CN', 'zh-cn': 'zh-CN', zh: 'zh-CN',
    kr: 'ko', ko: 'ko',
    fr: 'fr', it: 'it', nl: 'nl',
    en: 'en',
  };
  return map[seg] ?? 'en';
}

/**
 * Canonical URL path prefix per detected lang, used so same-site internal
 * links (legal pages) stay inside the visitor's locale. EN lives at the root,
 * so its prefix is ''. Keys mirror what detectLangFromURL() returns.
 */
const LOCALE_PATH_PREFIX: Record<string, string> = {
  en: '', fi: '/fi', de: '/de', ja: '/ja', es: '/es',
  'pt-BR': '/br', 'zh-CN': '/cn', ko: '/kr',
  fr: '/fr', it: '/it', nl: '/nl',
};

// ─── Built-in 11-lang FULL footer dicts ────────────────────────────────────
// Localized defaults for groups / kicker / about / partner / press / affiliate /
// legal so every spoke site gets a native footer on /fi /de /ja /es /br /cn /
// kr /fr /it /nl without each site shipping its own footer dict.
// Sites can still override per-key via the `dict` prop.
const BUILT_IN_FULL_DICT: Record<string, Partial<typeof DEFAULT_DICT>> = {
  en: {}, // EN already covered by DEFAULT_DICT
  fi: {
    tagline: 'Suomen Lapin matkaopas, revontulista keskiyön aurinkoon.',
    groups: { stay: 'Majoitu', eatDrink: 'Syö & juo', do: 'Tee', explore: 'Tutustu', essentials: 'Käytännön asiat' },
    travelGuideKicker: 'Lapin matkaopas',
    about: { eyebrow: 'Tietoa LaplandVibes-verkostosta', body: 'Suomen Lapin matkaopas, revontulista keskiyön aurinkoon. Käsin valittuja kohteita, paikallista tietoa ja avoimet lähteet kaiken Arktis-matkasi suunnitteluun.', badge: 'Itsenäisesti ylläpidetty · lähteet näkyvillä' },
    spottedError: { title: 'Huomasitko virheen?', body: 'Näetkö jotain joka pitäisi korjata? Kerro meille, korjaamme heti.', cta: 'Ilmoita virheestä →' },
    partner: { title: 'Tee yhteistyötä kanssamme', body: 'Mainosta tai tee yhteistyötä yli 21 Lappi-sivuston verkostossa.', cta: 'Ota yhteyttä →' },
    press: { title: 'Lehdistö & media', body: 'Toimitukselliset yhteistyöt ja mediapaketit.', cta: 'Lehdistökyselyt →' },
    affiliate: 'Tämä sivusto sisältää kumppanilinkkejä. Jos varaat näiden linkkien kautta, LaplandVibes voi saada provision sinulle ilman lisäkustannuksia.',
    legal: { privacy: 'Tietosuojaseloste', cookie: 'Evästekäytäntö', terms: 'Käyttöehdot', contact: 'Yhteystiedot' },
  },
  de: {
    tagline: 'Der Reiseführer für Finnisch-Lappland, von den Polarlichtern bis zur Mitternachtssonne.',
    groups: { stay: 'Übernachten', eatDrink: 'Essen & Trinken', do: 'Erleben', explore: 'Entdecken', essentials: 'Praktisches' },
    travelGuideKicker: 'Lappland-Reiseführer',
    about: { eyebrow: 'Über LaplandVibes', body: 'Der Reiseführer für Finnisch-Lappland, von den Polarlichtern bis zur Mitternachtssonne. Handverlesene Erlebnisse, lokales Wissen und Quellen für Ihre Arktis-Reise.', badge: 'Unabhängig betrieben · Quellen sichtbar' },
    spottedError: { title: 'Einen Fehler entdeckt?', body: 'Etwas, das korrigiert werden muss? Schreiben Sie uns, wir korrigieren es sofort.', cta: 'Fehler melden →' },
    partner: { title: 'Mit uns kooperieren', body: 'Werben oder kooperieren über 21+ Lappland-Sites.', cta: 'Kontakt aufnehmen →' },
    press: { title: 'Presse & Medien', body: 'Redaktionelle Kooperationen und Pressekits.', cta: 'Presseanfragen →' },
    affiliate: 'Diese Website enthält Partner-Links. Wenn Sie über diese Links buchen, kann LaplandVibes eine Provision ohne Mehrkosten für Sie erhalten.',
    legal: { privacy: 'Datenschutz', cookie: 'Cookie-Richtlinie', terms: 'Nutzungsbedingungen', contact: 'Kontakt' },
  },
  ja: {
    tagline: 'フィンランド・ラップランドの旅行ガイド, オーロラから白夜まで。',
    groups: { stay: '泊まる', eatDrink: '食べる・飲む', do: '体験する', explore: '見る', essentials: '知っておくこと' },
    travelGuideKicker: 'ラップランド旅行ガイド',
    about: { eyebrow: 'LaplandVibesについて', body: 'オーロラから白夜まで、フィンランド・ラップランドの決定版ガイド。厳選した体験と現地の知恵、出典を明記した情報で、北極圏の旅の計画を支えます。', badge: '独立運営 · 出典明記' },
    spottedError: { title: '間違いを見つけましたか?', body: '修正が必要な箇所がありましたら教えてください, すぐに修正します。', cta: '報告する →' },
    partner: { title: '提携のご相談', body: '21以上のラップランドサイトで広告・コラボレーション。', cta: 'お問い合わせ →' },
    press: { title: 'プレス・メディア', body: '編集パートナーシップとプレスキット。', cta: 'プレスお問い合わせ →' },
    affiliate: 'このサイトにはアフィリエイトリンクが含まれます。これらのリンクを通じて予約された場合、LaplandVibesに追加費用なしで手数料が支払われることがあります。',
    legal: { privacy: 'プライバシーポリシー', cookie: 'Cookieポリシー', terms: '利用規約', contact: 'お問い合わせ' },
  },
  es: {
    tagline: 'La guía de viajes de la Laponia finlandesa, desde las auroras hasta el sol de medianoche.',
    groups: { stay: 'Dónde dormir', eatDrink: 'Comer y beber', do: 'Hacer', explore: 'Explorar', essentials: 'Esenciales' },
    travelGuideKicker: 'Guía de viaje de Laponia',
    about: { eyebrow: 'Sobre LaplandVibes', body: 'La guía definitiva de la Laponia finlandesa, desde las auroras hasta el sol de medianoche. Experiencias seleccionadas, consejos locales y fuentes citadas para planear tu aventura ártica.', badge: 'Mantenido de forma independiente · fuentes citadas' },
    spottedError: { title: '¿Has visto un error?', body: '¿Algo que arreglar? Dínoslo, lo corregiremos enseguida.', cta: 'Reportar un error →' },
    partner: { title: 'Colabora con nosotros', body: 'Publicidad o colaboración en más de 21 sitios sobre Laponia.', cta: 'Contactar →' },
    press: { title: 'Prensa y medios', body: 'Colaboraciones editoriales y kits de prensa.', cta: 'Consultas de prensa →' },
    affiliate: 'Este sitio contiene enlaces de afiliación. Si reservas a través de estos enlaces, LaplandVibes puede recibir una comisión sin coste adicional para ti.',
    legal: { privacy: 'Política de privacidad', cookie: 'Política de cookies', terms: 'Términos de uso', contact: 'Contacto' },
  },
  'pt-BR': {
    tagline: 'O guia da Lapônia finlandesa, das auroras boreais ao sol da meia-noite.',
    groups: { stay: 'Onde dormir', eatDrink: 'Comer e beber', do: 'Fazer', explore: 'Explorar', essentials: 'Essenciais' },
    travelGuideKicker: 'Guia de viagem da Lapônia',
    about: { eyebrow: 'Sobre o LaplandVibes', body: 'O guia definitivo da Lapônia finlandesa, das auroras boreais ao sol da meia-noite. Experiências selecionadas, dicas locais e fontes citadas para planejar sua viagem ao Ártico.', badge: 'Mantido de forma independente · fontes à vista' },
    spottedError: { title: 'Encontrou um erro?', body: 'Viu algo que precisa de correção? Avise, corrigimos imediatamente.', cta: 'Relatar um erro →' },
    partner: { title: 'Faça parceria conosco', body: 'Anuncie ou colabore em mais de 21 sites da Lapônia.', cta: 'Entre em contato →' },
    press: { title: 'Imprensa e mídia', body: 'Parcerias editoriais e kits de imprensa.', cta: 'Consultas de imprensa →' },
    affiliate: 'Este site contém links de afiliados. Se você fizer uma reserva por meio destes links, o LaplandVibes pode receber comissão sem custo adicional para você.',
    legal: { privacy: 'Política de Privacidade', cookie: 'Política de Cookies', terms: 'Termos de Uso', contact: 'Contato' },
  },
  'zh-CN': {
    tagline: '芬兰拉普兰旅游指南, 从北极光到午夜阳光。',
    groups: { stay: '住', eatDrink: '吃喝', do: '玩', explore: '探索', essentials: '实用信息' },
    travelGuideKicker: '拉普兰旅游指南',
    about: { eyebrow: '关于 LaplandVibes', body: '从北极光到午夜阳光，芬兰拉普兰的权威指南。精选体验、本地建议与注明来源的信息，助您规划北极之旅。', badge: '独立运营 · 来源公开' },
    spottedError: { title: '发现错误了吗?', body: '有需要修正的地方吗?告诉我们, 我们会立即更正。', cta: '报告错误 →' },
    partner: { title: '与我们合作', body: '在 21+ 个拉普兰网站上投放广告或开展合作。', cta: '联系我们 →' },
    press: { title: '媒体与新闻', body: '编辑合作与媒体资源包。', cta: '媒体咨询 →' },
    affiliate: '本网站包含联盟链接。如果您通过这些链接预订,LaplandVibes 可获得佣金,您无需支付额外费用。',
    legal: { privacy: '隐私政策', cookie: 'Cookie 政策', terms: '使用条款', contact: '联系方式' },
  },
  ko: {
    tagline: '핀란드 라플란드 여행 가이드, 오로라부터 백야까지.',
    groups: { stay: '숙박', eatDrink: '음식과 음료', do: '체험', explore: '둘러보기', essentials: '필수 정보' },
    travelGuideKicker: '라플란드 여행 가이드',
    about: { eyebrow: 'LaplandVibes 소개', body: '오로라부터 백야까지, 핀란드 라플란드의 결정판 가이드. 엄선한 경험과 현지의 조언, 출처를 밝힌 정보로 북극 여행 계획을 돕습니다.', badge: '독립 운영 · 출처 명시' },
    spottedError: { title: '오류를 발견하셨나요?', body: '수정이 필요한 부분이 있나요? 알려주세요, 즉시 수정합니다.', cta: '오류 신고 →' },
    partner: { title: '저희와 협력하세요', body: '21개 이상의 라플란드 사이트에서 광고 또는 협업.', cta: '문의하기 →' },
    press: { title: '언론·미디어', body: '편집 제휴 및 보도 자료.', cta: '언론 문의 →' },
    affiliate: '이 사이트에는 제휴 링크가 포함되어 있습니다. 이러한 링크를 통해 예약하시면 LaplandVibes가 추가 비용 없이 수수료를 받을 수 있습니다.',
    legal: { privacy: '개인정보 처리방침', cookie: '쿠키 정책', terms: '이용 약관', contact: '연락처' },
  },
  fr: {
    tagline: 'Le guide de voyage de la Laponie finlandaise, des aurores boréales au soleil de minuit.',
    groups: { stay: 'Où dormir', eatDrink: 'Manger & boire', do: 'À faire', explore: 'Explorer', essentials: 'L\'essentiel' },
    travelGuideKicker: 'Guide de voyage Laponie',
    about: { eyebrow: 'À propos de LaplandVibes', body: 'Le guide de référence pour la Laponie finlandaise, des aurores boréales au soleil de minuit. Expériences sélectionnées, conseils locaux et tout pour préparer votre voyage en Arctique.', badge: 'Géré indépendamment · sources citées' },
    spottedError: { title: 'Repéré une erreur ?', body: 'Quelque chose à corriger ? Dites-le-nous, nous corrigeons immédiatement.', cta: 'Signaler une erreur →' },
    partner: { title: 'Devenir partenaire', body: 'Publicité ou collaboration sur 21+ sites Laponie.', cta: 'Nous contacter →' },
    press: { title: 'Presse & médias', body: 'Partenariats éditoriaux et kits de presse.', cta: 'Demandes presse →' },
    affiliate: 'Ce site contient des liens d\'affiliation. Si vous réservez via ces liens, LaplandVibes peut recevoir une commission sans coût supplémentaire pour vous.',
    legal: { privacy: 'Politique de confidentialité', cookie: 'Politique des cookies', terms: 'Conditions d\'utilisation', contact: 'Contact' },
  },
  it: {
    tagline: 'La guida di viaggio della Lapponia finlandese, dalle aurore al sole di mezzanotte.',
    groups: { stay: 'Dove dormire', eatDrink: 'Mangiare e bere', do: 'Da fare', explore: 'Esplorare', essentials: 'Informazioni utili' },
    travelGuideKicker: 'Guida di viaggio Lapponia',
    about: { eyebrow: 'Su LaplandVibes', body: 'La guida definitiva alla Lapponia finlandese, dalle aurore boreali al sole di mezzanotte. Esperienze selezionate, consigli locali e fonti citate per pianificare il Suo viaggio nell\'Artico.', badge: 'Gestita in modo indipendente · fonti citate' },
    spottedError: { title: 'Notato un errore?', body: 'C\'è qualcosa da correggere? Ce lo dica, correggeremo subito.', cta: 'Segnala un errore →' },
    partner: { title: 'Collabora con noi', body: 'Pubblicità o collaborazione su oltre 21 siti dedicati alla Lapponia.', cta: 'Mettersi in contatto →' },
    press: { title: 'Stampa e media', body: 'Collaborazioni editoriali e kit stampa.', cta: 'Richieste stampa →' },
    affiliate: 'Questo sito contiene link di affiliazione. Se prenoti tramite questi link, LaplandVibes può ricevere una commissione senza alcun costo aggiuntivo per Lei.',
    legal: { privacy: 'Informativa sulla privacy', cookie: 'Politica sui cookie', terms: 'Termini di utilizzo', contact: 'Contatti' },
  },
  nl: {
    tagline: 'De reisgids voor Fins Lapland, van het noorderlicht tot de middernachtszon.',
    groups: { stay: 'Verblijf', eatDrink: 'Eten & drinken', do: 'Beleven', explore: 'Ontdekken', essentials: 'Praktisch' },
    travelGuideKicker: 'Lapland-reisgids',
    about: { eyebrow: 'Over LaplandVibes', body: 'De definitieve gids voor Fins Lapland, van het noorderlicht tot de middernachtszon. Geselecteerde ervaringen, lokale tips en duidelijke bronnen om uw arctische reis te plannen.', badge: 'Onafhankelijk beheerd · bronnen zichtbaar' },
    spottedError: { title: 'Een fout gezien?', body: 'Iets dat aangepast moet worden? Laat het ons weten, we corrigeren het meteen.', cta: 'Fout melden →' },
    partner: { title: 'Word partner', body: 'Adverteer of werk samen op meer dan 21 Lapland-sites.', cta: 'Neem contact op →' },
    press: { title: 'Pers & media', body: 'Redactionele partnerschappen en perskits.', cta: 'Pers-aanvragen →' },
    affiliate: 'Deze site bevat affiliate-links. Als u via deze links boekt, kan LaplandVibes een commissie ontvangen zonder extra kosten voor u.',
    legal: { privacy: 'Privacybeleid', cookie: 'Cookiebeleid', terms: 'Gebruiksvoorwaarden', contact: 'Contact' },
  },
};

function mergeDict(d?: FooterDict): typeof DEFAULT_DICT {
  // Always seed siteLabels from URL-detected lang so /kr /fr /it /nl etc.
  // get localized niche labels even when the spoke site passes no dict.
  const urlLang = detectLangFromURL();
  const autoLabels = {
    ...(BUILT_IN_SITE_LABELS[urlLang] ?? BUILT_IN_SITE_LABELS.en),
    ...(EXT_SITE_LABELS[urlLang] ?? EXT_SITE_LABELS.en),
  };
  const langDefaults = BUILT_IN_FULL_DICT[urlLang] ?? {};
  if (!d) {
    return {
      ...DEFAULT_DICT,
      ...langDefaults,
      groups: { ...DEFAULT_DICT.groups, ...langDefaults.groups },
      about: { ...DEFAULT_DICT.about, ...langDefaults.about },
      spottedError: { ...DEFAULT_DICT.spottedError, ...langDefaults.spottedError },
      partner: { ...DEFAULT_DICT.partner, ...langDefaults.partner },
      press: { ...DEFAULT_DICT.press, ...langDefaults.press },
      legal: { ...DEFAULT_DICT.legal, ...langDefaults.legal },
      siteLabels: { ...DEFAULT_DICT.siteLabels, ...autoLabels },
    } as typeof DEFAULT_DICT;
  }
  return {
    networkBadge: d.networkBadge ?? langDefaults.networkBadge ?? DEFAULT_DICT.networkBadge,
    tagline: d.tagline ?? langDefaults.tagline ?? DEFAULT_DICT.tagline,
    groups: {
      stay: d.groups?.stay ?? langDefaults.groups?.stay ?? DEFAULT_DICT.groups.stay,
      eatDrink: d.groups?.eatDrink ?? langDefaults.groups?.eatDrink ?? DEFAULT_DICT.groups.eatDrink,
      do: d.groups?.do ?? langDefaults.groups?.do ?? DEFAULT_DICT.groups.do,
      explore: d.groups?.explore ?? langDefaults.groups?.explore ?? DEFAULT_DICT.groups.explore,
      essentials: d.groups?.essentials ?? langDefaults.groups?.essentials ?? DEFAULT_DICT.groups.essentials,
    },
    travelGuideKicker: d.travelGuideKicker ?? langDefaults.travelGuideKicker ?? DEFAULT_DICT.travelGuideKicker,
    about: {
      eyebrow: d.about?.eyebrow ?? langDefaults.about?.eyebrow ?? DEFAULT_DICT.about.eyebrow,
      body: d.about?.body ?? langDefaults.about?.body ?? DEFAULT_DICT.about.body,
      badge: d.about?.badge ?? langDefaults.about?.badge ?? DEFAULT_DICT.about.badge,
    },
    spottedError: {
      title: d.spottedError?.title ?? langDefaults.spottedError?.title ?? DEFAULT_DICT.spottedError.title,
      body: d.spottedError?.body ?? langDefaults.spottedError?.body ?? DEFAULT_DICT.spottedError.body,
      cta: d.spottedError?.cta ?? langDefaults.spottedError?.cta ?? DEFAULT_DICT.spottedError.cta,
    },
    partner: {
      title: d.partner?.title ?? langDefaults.partner?.title ?? DEFAULT_DICT.partner.title,
      body: d.partner?.body ?? langDefaults.partner?.body ?? DEFAULT_DICT.partner.body,
      cta: d.partner?.cta ?? langDefaults.partner?.cta ?? DEFAULT_DICT.partner.cta,
    },
    press: {
      title: d.press?.title ?? langDefaults.press?.title ?? DEFAULT_DICT.press.title,
      body: d.press?.body ?? langDefaults.press?.body ?? DEFAULT_DICT.press.body,
      cta: d.press?.cta ?? langDefaults.press?.cta ?? DEFAULT_DICT.press.cta,
    },
    affiliate: d.affiliate ?? langDefaults.affiliate ?? DEFAULT_DICT.affiliate,
    copyright: d.copyright ?? langDefaults.copyright ?? DEFAULT_DICT.copyright,
    websiteBy: d.websiteBy ?? langDefaults.websiteBy ?? DEFAULT_DICT.websiteBy,
    legal: {
      privacy: d.legal?.privacy ?? langDefaults.legal?.privacy ?? DEFAULT_DICT.legal.privacy,
      cookie: d.legal?.cookie ?? langDefaults.legal?.cookie ?? DEFAULT_DICT.legal.cookie,
      terms: d.legal?.terms ?? langDefaults.legal?.terms ?? DEFAULT_DICT.legal.terms,
      contact: d.legal?.contact ?? langDefaults.legal?.contact ?? DEFAULT_DICT.legal.contact,
    },
    siteLabels: {
      hotelDeals: d.siteLabels?.hotelDeals ?? autoLabels.hotelDeals,
      staysCabins: d.siteLabels?.staysCabins ?? autoLabels.staysCabins,
      whereToStay: d.siteLabels?.whereToStay ?? autoLabels.whereToStay,
      familyFriendly: d.siteLabels?.familyFriendly ?? autoLabels.familyFriendly,
      localFood: d.siteLabels?.localFood ?? autoLabels.localFood,
      fineDining: d.siteLabels?.fineDining ?? autoLabels.fineDining,
      barsPubs: d.siteLabels?.barsPubs ?? autoLabels.barsPubs,
      activities: d.siteLabels?.activities ?? autoLabels.activities,
      huskySafaris: d.siteLabels?.huskySafaris ?? autoLabels.huskySafaris,
      skiResorts: d.siteLabels?.skiResorts ?? autoLabels.skiResorts,
      snowmobileTours: d.siteLabels?.snowmobileTours ?? autoLabels.snowmobileTours,
      spaWellness: d.siteLabels?.spaWellness ?? autoLabels.spaWellness,
      nightlife: d.siteLabels?.nightlife ?? autoLabels.nightlife,
      natureParks: d.siteLabels?.natureParks ?? autoLabels.natureParks,
      travelGuide: d.siteLabels?.travelGuide ?? autoLabels.travelGuide,
      christmas: d.siteLabels?.christmas ?? autoLabels.christmas,
      giftsSouvenirs: d.siteLabels?.giftsSouvenirs ?? autoLabels.giftsSouvenirs,
      travelBlog: d.siteLabels?.travelBlog ?? autoLabels.travelBlog,
      dealsOffers: d.siteLabels?.dealsOffers ?? autoLabels.dealsOffers,
      transport: d.siteLabels?.transport ?? autoLabels.transport,
      carRental: d.siteLabels?.carRental ?? autoLabels.carRental,
      workInLapland: d.siteLabels?.workInLapland ?? autoLabels.workInLapland,
      luxuryVillas: d.siteLabels?.luxuryVillas ?? autoLabels.luxuryVillas,
      tours: d.siteLabels?.tours ?? autoLabels.tours,
      weddings: d.siteLabels?.weddings ?? autoLabels.weddings,
      store: d.siteLabels?.store ?? autoLabels.store,
      flights: d.siteLabels?.flights ?? autoLabels.flights,
    },
  };
}

// Default pillar links point to the hub's TOPIC GUIDE pages on laplandvibes.com,
// NOT to the ecosystem spoke domains. The 27-spoke grid below already links every
// spoke site once; if these pills also pointed at the spoke domains (as they used
// to) every spoke would appear twice in the footer, bad for internal linking/SEO.
// Pointing them at hub guide pages keeps the "Lapland Travel Guide" row distinct
// from the network grid. All six routes exist on laplandvibes.com (verified
// 2026-06-01: /northern-lights /husky-safaris /ski-resorts /accommodation
// /things-to-do /nature). The hub itself overrides this via the `pillarLinks`
// prop with locale-aware hub-local routes.
const defaultPillarLinks = [
  { name: 'Northern Lights', href: 'https://laplandvibes.com/northern-lights' },
  { name: 'Husky Safaris', href: 'https://laplandvibes.com/husky-safaris' },
  { name: 'Ski Resorts', href: 'https://laplandvibes.com/ski-resorts' },
  { name: 'Where to Stay', href: 'https://laplandvibes.com/accommodation' },
  { name: 'Things to Do', href: 'https://laplandvibes.com/things-to-do' },
  { name: 'Nature & Parks', href: 'https://laplandvibes.com/nature' },
];

function buildSiteGroups(d: typeof DEFAULT_DICT) {
  const s = d.siteLabels;
  return [
    {
      title: d.groups.stay,
      links: [
        { name: s.hotelDeals, url: 'https://laplandhoteldeals.com' },
        { name: s.staysCabins, url: 'https://laplandstays.com' },
        { name: s.luxuryVillas, url: 'https://laplandluxuryvillas.com' },
        { name: s.whereToStay, url: 'https://stayinlapland.com' },
        { name: s.familyFriendly, url: 'https://laplandkids.com' },
      ],
    },
    {
      title: d.groups.eatDrink,
      links: [
        { name: s.localFood, url: 'https://laplandfood.com' },
        { name: s.fineDining, url: 'https://laplanddining.com' },
        { name: s.barsPubs, url: 'https://laplandbars.com' },
      ],
    },
    {
      title: d.groups.do,
      links: [
        { name: s.activities, url: 'https://laplandactivities.fi' },
        { name: s.tours, url: 'https://laplandtours.online' },
        { name: s.huskySafaris, url: 'https://laplandhuskysafaris.com' },
        { name: s.skiResorts, url: 'https://laplandskiresorts.com' },
        { name: s.snowmobileTours, url: 'https://laplandsnowmobile.com' },
        { name: s.spaWellness, url: 'https://laplandwellness.com' },
        { name: s.nightlife, url: 'https://laplandnightlife.com' },
      ],
    },
    {
      title: d.groups.explore,
      links: [
        { name: s.natureParks, url: 'https://laplandnature.com' },
        { name: s.travelGuide, url: 'https://laplandvisit.com' },
        { name: s.christmas, url: 'https://laplandchristmas.com' },
        { name: s.weddings, url: 'https://laplandweddings.online' },
        { name: s.giftsSouvenirs, url: 'https://laplandgifts.com' },
        { name: s.store, url: 'https://laplandstore.fi' },
        { name: s.travelBlog, url: 'https://lapland.blog' },
      ],
    },
    {
      title: d.groups.essentials,
      links: [
        { name: s.dealsOffers, url: 'https://laplanddeals.com' },
        { name: s.transport, url: 'https://laplandtransport.com' },
        { name: s.carRental, url: 'https://laplandcarrental.com' },
        { name: s.flights, url: 'https://laplandflights.fi' },
        { name: s.workInLapland, url: 'https://laplandwork.com' },
      ],
    },
  ];
}

const socials = [
  {
    label: 'YouTube',
    href: 'https://youtube.com/@laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#fff" opacity="0.9" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/laplandvibesofficial',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://tiktok.com/@laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.19 8.19 0 0 0 4.84 1.56V6.79a4.85 4.85 0 0 1-1.07-.1z" />
      </svg>
    ),
  },
  {
    label: 'Pinterest',
    href: 'https://pinterest.com/laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
      </svg>
    ),
  },
  {
    label: 'X / Twitter',
    href: 'https://x.com/laplandvibes',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.26 5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

interface SharedFooterProps {
  pillarLinks?: { name: string; href: string }[];
  onPillarClick?: (name: string) => void;
  /**
   * Per-site editorial note. Renders above the affiliate-disclosure line in the
   * bottom strip. Use for "Independently maintained · last reviewed YYYY · we
   * earn affiliate commission on some bookings, but it never shapes
   * recommendations." style closures that previously sat in hero copy.
   */
  editorialNote?: string;
  /**
   * Extra links rendered alongside Privacy / Cookie / Terms in the bottom
   * legal strip. Internal RR7 routes only, pass `{ to, label }`. Use for
   * /editorial-policy, /sitemap, /press, etc.
   */
  extraLegalLinks?: { to: string; label: string }[];
  /**
   * Destination for the "Website by …" credit link. Defaults to yrityspaketit.fi;
   * pass e.g. "https://www.zatap.fi" on sites whose `websiteBy` label names Zatap,
   * so the label and the link target match.
   */
  websiteByHref?: string;
  /**
   * Optional i18n strings. If omitted, English defaults are used. Sites with
   * a t() context build this from useTranslation('common') and pass it in.
   */
  dict?: FooterDict;
}

// In-page contact form modal. Replaces the old mailto: links (which opened the
// OS "choose an app" dialog). Posts to the hub send-contact-email edge function.
function ContactModal({ kind, title, c, onClose }: { kind: ContactKind; title: string; c: ContactFormCopy; onClose: () => void }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(c.subj[kind]);
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot, humans leave blank
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [err, setErr] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = prev; };
  }, [onClose]);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSend = name.trim() && emailValid && subject.trim() && message.trim();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) { setErr(c.required); setStatus('error'); return; }
    setStatus('sending'); setErr('');
    const host = typeof window !== 'undefined' ? window.location.hostname : '';
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CONTACT_ANON_KEY}` },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim(),
          message: `${message.trim()}\n\n, sent from ${host}`,
          website, // honeypot
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('success');
    } catch {
      setErr(c.errorMsg); setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1.5px solid rgba(0,47,108,0.25)', fontSize: 14, color: '#1f2937', background: '#fff', outline: 'none' };
  const labelStyle: React.CSSProperties = { fontSize: 12, fontWeight: 600, color: BLUE, marginBottom: 4, display: 'block' };

  return (
    <div
      role="dialog" aria-modal="true" aria-label={title}
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(15,23,42,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, backdropFilter: 'blur(2px)' }}
    >
      <div style={{ background: WHITE, borderRadius: 16, width: '100%', maxWidth: 460, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.35)', position: 'relative' }}>
        <div style={{ height: 4, width: '100%', background: 'linear-gradient(90deg, #EC4899, #f472b6)' }} />
        <button
          onClick={onClose} aria-label={c.close}
          style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', cursor: 'pointer', color: BLUE, padding: 6, lineHeight: 0 }}
        >
          <X className="w-5 h-5" />
        </button>
        <div style={{ padding: '24px 24px 28px' }}>
          {status === 'success' ? (
            <div style={{ textAlign: 'center', padding: '16px 0' }}>
              <p className="font-heading" style={{ fontSize: 24, color: BLUE, marginBottom: 10, letterSpacing: '0.02em' }}>{c.successTitle}</p>
              <p style={{ fontSize: 15, color: '#374151', lineHeight: 1.6, marginBottom: 22 }}>{c.successBody}</p>
              <button onClick={onClose} style={{ background: PINK, color: '#fff', border: 'none', borderRadius: 999, padding: '11px 26px', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{c.close}</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <p className="font-heading" style={{ fontSize: 22, color: BLUE, marginBottom: 18, letterSpacing: '0.02em', paddingRight: 24 }}>{title}</p>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle} htmlFor="cf-name">{c.name}</label>
                <input id="cf-name" type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} autoComplete="name" required />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle} htmlFor="cf-email">{c.email}</label>
                <input id="cf-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} autoComplete="email" required />
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={labelStyle} htmlFor="cf-subject">{c.subject}</label>
                <input id="cf-subject" type="text" value={subject} onChange={(e) => setSubject(e.target.value)} style={inputStyle} required />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle} htmlFor="cf-message">{c.message}</label>
                <textarea id="cf-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 96 }} required />
              </div>
              {/* honeypot, visually hidden, off-screen, not announced */}
              <input
                type="text" value={website} onChange={(e) => setWebsite(e.target.value)}
                name="website" tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
              />
              {status === 'error' && <p style={{ color: '#dc2626', fontSize: 13, marginBottom: 12 }}>{err}</p>}
              <button
                type="submit" disabled={status === 'sending'}
                style={{ width: '100%', background: status === 'sending' ? '#DB2777' : PINK, color: '#fff', border: 'none', borderRadius: 999, padding: '13px', fontSize: 14, fontWeight: 700, cursor: status === 'sending' ? 'wait' : 'pointer', minHeight: 48 }}
              >
                {status === 'sending' ? c.sending : c.send}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SharedFooter({ pillarLinks = defaultPillarLinks, onPillarClick, editorialNote, extraLegalLinks = [], dict, websiteByHref = 'https://yrityspaketit.fi' }: SharedFooterProps) {
  const d = mergeDict(dict);
  const siteGroups = buildSiteGroups(d);
  const [contactKind, setContactKind] = useState<ContactKind | null>(null);
  const lang = detectLangFromURL();
  const contactCopy = CONTACT_FORM_COPY[lang] ?? CONTACT_FORM_COPY.en;
  // Same locale detection the labels use, keeps legal links inside /fi /de /ja
  // /es /br /cn /kr /fr /it /nl instead of dropping the visitor back to EN.
  const localePrefix = LOCALE_PATH_PREFIX[lang] ?? '';
  const contactTitle: Record<ContactKind, string> = { error: d.spottedError.title, partner: d.partner.title, press: d.press.title, general: d.legal.contact };
  // data-fv: footer build version. Bump when a footer fix must bypass a stale
  // Cloudflare edge-cached chunk that rebuilt to the same hashed name.
  return (
    <footer data-fv="20260615">

      {/* Soft transition from page content above into the blue band below */}
      <div
        aria-hidden="true"
        style={{ height: '100px', background: `linear-gradient(to bottom, transparent, ${BLUE})` }}
      />

      {/* ═══ BAND A: BLUE, Network badge, Logo + socials, full site network ═══ */}
      <div style={{ background: BLUE }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-10 sm:py-12">

          {/* Finnish Lapland Network badge */}
          <div className="flex items-center gap-3 mb-7 sm:mb-9">
            <div className="flex-1 h-px" style={{ background: 'rgba(248,250,252,0.25)' }} />
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-normal tracking-wide"
              style={{ background: 'rgba(248,250,252,0.08)', border: '1px solid rgba(248,250,252,0.3)', color: WHITE }}
            >
              <div
                className="relative flex-shrink-0 overflow-hidden"
                style={{ width: 20, height: 13, borderRadius: 2, background: WHITE, border: '1px solid rgba(0,47,108,0.5)' }}
              >
                <div className="absolute left-0 right-0" style={{ top: 4, height: 4, background: BLUE }} />
                <div className="absolute top-0 bottom-0" style={{ left: 5, width: 4, background: BLUE }} />
              </div>
              {d.networkBadge}
            </div>
            <div className="flex-1 h-px" style={{ background: 'rgba(248,250,252,0.25)' }} />
          </div>

          {/* Logo + tagline + socials */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-8 mb-8 sm:mb-10">
            <div>
              <img
                src="/lv-footer-logo.webp"
                alt="#LaplandVibes"
                className="h-9 sm:h-11 md:h-14 w-auto max-w-full"
                loading="lazy"
                decoding="async"
              />
              <p
                className="text-[13px] sm:text-sm font-normal mt-2 tracking-wide"
                style={{ color: 'rgba(248,250,252,0.75)' }}
              >
                {d.tagline}
              </p>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200"
                  style={{ background: 'rgba(248,250,252,0.12)', border: '1px solid rgba(248,250,252,0.3)', color: WHITE }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#EC4899';
                    (e.currentTarget as HTMLElement).style.borderColor = '#EC4899';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(248,250,252,0.12)';
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(248,250,252,0.3)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Site network grid, 5 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 gap-y-7 sm:gap-x-10 sm:gap-y-8">
            {siteGroups.map((group) => (
              <div key={group.title}>
                <h3
                  className="text-[10px] font-semibold mb-4 sm:mb-5 pb-2.5 sm:pb-3 uppercase tracking-[0.2em] border-b"
                  style={{ color: WHITE, borderColor: 'rgba(248,250,252,0.25)' }}
                >
                  {group.title}
                </h3>
                <ul className="space-y-2.5 sm:space-y-3.5">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] sm:text-sm font-normal leading-snug transition-colors duration-200"
                        style={{ color: 'rgba(248,250,252,0.85)' }}
                        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#EC4899')}
                        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(248,250,252,0.85)')}
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ BAND B: WHITE, Pillar pills, About, contact CTAs, copyright + legal ═══ */}
      <div style={{ background: WHITE }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-12 py-12 sm:py-16">

          {/* Travel Guide pillar pills */}
          <div className="mb-12 sm:mb-14">
            <p
              className="text-[10px] font-normal uppercase tracking-[0.25em] mb-4 sm:mb-5"
              style={{ color: BLUE }}
            >
              {d.travelGuideKicker}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 sm:gap-2.5">
              {pillarLinks.map((link) => {
                const isExternal = /^https?:\/\//.test(link.href);
                const pillClassName = "text-[13px] sm:text-sm font-semibold px-3 sm:px-4 py-2.5 sm:py-2 rounded-full transition-all duration-200 hover:scale-105 whitespace-nowrap inline-flex items-center justify-center min-h-[44px] sm:min-h-0 shadow-sm";
                const pillStyle = { background: PINK, border: `1.5px solid ${PINK}`, color: '#FFFFFF' };
                const onEnter = (e: React.MouseEvent<HTMLElement>) => {
                  (e.currentTarget as HTMLElement).style.background = '#DB2777';
                  (e.currentTarget as HTMLElement).style.borderColor = '#DB2777';
                };
                const onLeave = (e: React.MouseEvent<HTMLElement>) => {
                  (e.currentTarget as HTMLElement).style.background = PINK;
                  (e.currentTarget as HTMLElement).style.borderColor = PINK;
                };
                if (isExternal) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener"
                      onClick={() => onPillarClick?.(link.name)}
                      className={pillClassName}
                      style={pillStyle}
                      onMouseEnter={onEnter}
                      onMouseLeave={onLeave}
                    >
                      {link.name}
                    </a>
                  );
                }
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => onPillarClick?.(link.name)}
                    className={pillClassName}
                    style={pillStyle}
                    onMouseEnter={onEnter}
                    onMouseLeave={onLeave}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* About + 3 contact CTA cards */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10 mb-12 sm:mb-14">

            <div className="lg:col-span-2">
              <p
                className="text-[10px] font-normal uppercase tracking-[0.25em] mb-5 pb-3 border-b"
                style={{ color: BLUE, borderColor: 'rgba(0,47,108,0.2)' }}
              >
                {d.about.eyebrow}
              </p>
              <p className="text-sm font-normal leading-relaxed mb-5" style={{ color: '#374151' }}>
                {d.about.body}
              </p>
              <div
                className="inline-flex items-center gap-2 text-xs font-normal px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(16,185,129,0.10)', border: '1px solid rgba(16,185,129,0.25)', color: '#059669' }}
              >
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#10b981' }} />
                {d.about.badge}
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">

              {/* Spotted an Error */}
              <div
                className="rounded-xl flex flex-col transition-all duration-200 overflow-hidden"
                style={{ background: WHITE, border: `2px solid ${BLUE}` }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#EC4899')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = BLUE)}
              >
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #EC4899, #f472b6)' }} />
                <div className="p-5 flex flex-col flex-1">
                  <AlertCircle className="w-5 h-5 mb-3 shrink-0" style={{ color: '#EC4899' }} />
                  <p className="font-heading text-lg mb-2 tracking-wide" style={{ color: BLUE }}>{d.spottedError.title}</p>
                  <p className="text-sm font-normal leading-relaxed mb-5 flex-1" style={{ color: '#374151' }}>
                    {d.spottedError.body}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactKind('error')}
                    className="inline-flex items-center justify-center w-full px-3 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm cursor-pointer whitespace-nowrap"
                    style={{ background: '#EC4899', border: '2px solid #EC4899', color: '#FFFFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DB2777'; (e.currentTarget as HTMLElement).style.borderColor = '#DB2777'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EC4899'; (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'; }}
                  >
                    {d.spottedError.cta.replace(/\s*[→›»➔]\s*$/, '')}
                  </button>
                </div>
              </div>

              {/* Partner With Us */}
              <div
                className="rounded-xl flex flex-col transition-all duration-200 overflow-hidden"
                style={{ background: WHITE, border: `2px solid ${BLUE}` }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#EC4899')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = BLUE)}
              >
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #EC4899, #f472b6)' }} />
                <div className="p-5 flex flex-col flex-1">
                  <Briefcase className="w-5 h-5 mb-3 shrink-0" style={{ color: '#EC4899' }} />
                  <p className="font-heading text-lg mb-2 tracking-wide" style={{ color: BLUE }}>{d.partner.title}</p>
                  <p className="text-sm font-normal leading-relaxed mb-5 flex-1" style={{ color: '#374151' }}>
                    {d.partner.body}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactKind('partner')}
                    className="inline-flex items-center justify-center w-full px-3 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm cursor-pointer whitespace-nowrap"
                    style={{ background: '#EC4899', border: '2px solid #EC4899', color: '#FFFFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DB2777'; (e.currentTarget as HTMLElement).style.borderColor = '#DB2777'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EC4899'; (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'; }}
                  >
                    {d.partner.cta.replace(/\s*[→›»➔]\s*$/, '')}
                  </button>
                </div>
              </div>

              {/* Press & Media */}
              <div
                className="rounded-xl flex flex-col transition-all duration-200 overflow-hidden"
                style={{ background: WHITE, border: `2px solid ${BLUE}` }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.borderColor = '#EC4899')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.borderColor = BLUE)}
              >
                <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #EC4899, #f472b6)' }} />
                <div className="p-5 flex flex-col flex-1">
                  <Newspaper className="w-5 h-5 mb-3 shrink-0" style={{ color: '#EC4899' }} />
                  <p className="font-heading text-lg mb-2 tracking-wide" style={{ color: BLUE }}>{d.press.title}</p>
                  <p className="text-sm font-normal leading-relaxed mb-5 flex-1" style={{ color: '#374151' }}>
                    {d.press.body}
                  </p>
                  <button
                    type="button"
                    onClick={() => setContactKind('press')}
                    className="inline-flex items-center justify-center w-full px-3 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 min-h-[44px] shadow-sm cursor-pointer whitespace-nowrap"
                    style={{ background: '#EC4899', border: '2px solid #EC4899', color: '#FFFFFF' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#DB2777'; (e.currentTarget as HTMLElement).style.borderColor = '#DB2777'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EC4899'; (e.currentTarget as HTMLElement).style.borderColor = '#EC4899'; }}
                  >
                    {d.press.cta.replace(/\s*[→›»➔]\s*$/, '')}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom strip, affiliate disclosure + copyright + legal links */}
          <div
            className="pt-6 sm:pt-8 border-t flex flex-col gap-3"
            style={{ borderColor: 'rgba(0,47,108,0.18)' }}
          >
            {editorialNote && (
              <p
                className="text-[11px] leading-relaxed text-center md:text-left font-medium"
                style={{ color: BLUE }}
              >
                {editorialNote}
              </p>
            )}
            <p className="text-[11px] leading-relaxed text-center md:text-left" style={{ color: 'rgba(0,47,108,0.65)' }}>
              <span aria-hidden="true">ⓘ </span>
              {d.affiliate}
            </p>

            {/* Bottom strip: ALL legal links on one full-width centred row so
                nothing orphans onto its own line, with © + credit centred below.
                The earlier two-column (©-left / links-right) layout still
                dropped the 6th link to a lonely second line on wide screens
                (Vesa 2026-07-03); full width + centre fits all six cleanly and
                wraps evenly if it ever needs to. */}
            <div className="flex flex-col items-center gap-3 text-xs font-normal">
              <div className="flex flex-wrap justify-center items-center gap-x-5 gap-y-1">
                {[
                  { to: `${localePrefix}/privacy`, label: d.legal.privacy },
                  { to: `${localePrefix}/cookie-policy`, label: d.legal.cookie },
                  { to: `${localePrefix}/terms`, label: d.legal.terms },
                  ...extraLegalLinks,
                ].map(({ to, label }) => (
                  <Link
                    key={to}
                    to={to}
                    className="transition-colors duration-200 inline-flex items-center min-h-[44px] px-1"
                    style={{ color: BLUE }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#EC4899')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = BLUE)}
                  >
                    {label}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={() => setContactKind('general')}
                  className="transition-colors duration-200 inline-flex items-center min-h-[44px] px-1 bg-transparent border-0 cursor-pointer text-xs font-normal"
                  style={{ color: BLUE }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#EC4899')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = BLUE)}
                >
                  {d.legal.contact}
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-0.5 sm:gap-3">
                <p style={{ color: BLUE }}>
                  &copy; {d.copyright.replace('{{year}}', String(new Date().getFullYear()))}
                </p>
                <span aria-hidden="true" className="hidden sm:inline" style={{ color: 'rgba(0,47,108,0.35)' }}>·</span>
                <a
                  href={websiteByHref}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="transition-colors duration-200 inline-flex items-center min-h-[44px]"
                  style={{ color: BLUE }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#EC4899')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = BLUE)}
                >
                  {d.websiteBy}
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {contactKind && (
        <ContactModal
          kind={contactKind}
          title={contactTitle[contactKind]}
          c={contactCopy}
          onClose={() => setContactKind(null)}
        />
      )}

    </footer>
  );
}
