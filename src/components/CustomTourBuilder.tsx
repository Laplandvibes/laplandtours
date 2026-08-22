import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Paintbrush, Send, CheckCircle, ChevronDown } from 'lucide-react';
import { useLang, useLocalePath, type CopyLang, copyLang } from '../i18n/useLang';

/**
 * [LV-FUNNEL 2026-08-21] Lomakesuppilon eventit Umamiin — paikallinen apuri,
 * ei jaettua importtia (vendoroitu sync on refresh-only). Ei saa koskaan
 * rikkoa lomaketta. Standardi: memory _procedural/lv_form_funnel_events.md.
 */
function track(event: string, data?: Record<string, unknown>) {
  try {
    (window as unknown as { umami?: { track: (e: string, d?: unknown) => void } }).umami?.track(event, data);
  } catch { /* ignore */ }
}

/**
 * [LV-LOMAKE 2026-08-21] Brief lahetetaan hubin `send-contact-email`-funktioon
 * — sama paatepiste jota jaetun Footerin yhteydenottomodaali kayttaa. Ennen
 * tata submit avasi `mailto:`-linkin ja naytti kiitosruudun HETI: palvelimelle
 * ei lahtenyt mitaan, ja mobiilissa/webmailissa mailto ei useinkaan avaa
 * mitaan, joten lupaus "vastaus 24 h sisalla" oli katteeton. Kiitosruutu vasta
 * 2xx:n jalkeen, virheesta virhetila. laplandtours.online +
 * laplandtours.pages.dev ovat funktion CORS-listalla; anon-avain on julkinen by
 * design (sama arvo kuin shared/Footer.tsx:ssa).
 */
const CONTACT_ENDPOINT = 'https://oogioaxmfnqcbvjbcodh.supabase.co/functions/v1/send-contact-email';
const CONTACT_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vZ2lvYXhtZm5xY2J2amJjb2RoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NjMyNDIsImV4cCI6MjA5MDQzOTI0Mn0.eTfgsux0zV3_gPyFRUcE8M_-DuDpU2xE9gehQM9pz54';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const COPY: Record<CopyLang, {
  eyebrow: string;
  h2Line1: string;
  h2Line2: string;
  lead: string;
  bullets: string[];
  noCommitment: string;
  sentEyebrow: string;
  sentHeadline: string;
  sentMeantime: string;
  sentLink: string;
  sentConfirm: string;
  briefEyebrow: string;
  briefH: string;
  nameLabel: string;
  namePh: string;
  emailLabel: string;
  emailPh: string;
  datesLabel: string;
  datesPh: string;
  groupLabel: string;
  groupOptions: string[];
  budgetLabel: string;
  budgetOptions: string[];
  messageLabel: string;
  messagePh: string;
  submit: string;
  sending: string;
  errorMsg: string;
  subjectPrefix: string;
}> = {
  en: {
    eyebrow: 'Bespoke',
    h2Line1: 'None of the',
    h2Line2: 'operators fit?',
    lead:
      'Tell us the trip you actually want. A reply with a shortlist of operators (or independent providers) lands within 24–48 hours. It includes an honest read on whether your budget is realistic for what you described.',
    bullets: [
      'Your dates and duration',
      'Activities that matter, and ones to skip',
      'Accommodation style and budget',
      'Special requests: birthdays, proposals, anniversaries',
    ],
    noCommitment: 'No commitment. No commission charged.',
    sentEyebrow: 'Sent',
    sentHeadline: 'Thanks. A reply lands within 24–48 hours.',
    sentMeantime: 'In the meantime, browse the',
    sentLink: 'operator guide',
    sentConfirm: 'Confirmation sent to',
    briefEyebrow: 'Brief',
    briefH: 'Tell us your plans',
    nameLabel: 'Full name',
    namePh: 'Your name',
    emailLabel: 'Email',
    emailPh: 'your@email.com',
    datesLabel: 'Preferred dates',
    datesPh: 'e.g. December 2026',
    groupLabel: 'Group size',
    groupOptions: ['1–2 travellers', '3–4 travellers', '5–8 travellers', '9+ travellers'],
    budgetLabel: 'Budget range (per person)',
    budgetOptions: ['Under 500', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000+'],
    messageLabel: 'Tell us more',
    messagePh: 'Activities you would love, special occasions, dietary needs, anything…',
    submit: 'Send inquiry',
    sending: 'Sending…',
    errorMsg: 'Something went wrong. Please try again.',
    subjectPrefix: 'LaplandTours inquiry from',
  },
  fi: {
    eyebrow: 'Räätälöity',
    h2Line1: 'Eikö yksikään',
    h2Line2: 'pakettimatka sovi?',
    lead:
      'Kerro millaisen matkan haluat. Vastaus matkanjärjestäjäehdotuksineen (tai itsenäisillä palveluntarjoajilla) saapuu 24–48 tunnin sisällä. Mukana on rehellinen arvio siitä, riittääkö budjetti kuvailtuun.',
    bullets: [
      'Päivämäärät ja kesto',
      'Tärkeät päiväretket, ja ne, jotka voi jättää väliin',
      'Majoitustyyli ja budjetti',
      'Erityistoiveet: syntymäpäivät, kosinta, hääpäivät',
    ],
    noCommitment: 'Ei sitoumusta. Ei välityspalkkiota sinulle.',
    sentEyebrow: 'Lähetetty',
    sentHeadline: 'Kiitos. Vastaus tulee 24–48 tunnin sisällä.',
    sentMeantime: 'Sillä välin voit selata',
    sentLink: 'matkanjärjestäjäopasta',
    sentConfirm: 'Vahvistus lähti osoitteeseen',
    briefEyebrow: 'Lähtötiedot',
    briefH: 'Kerro suunnitelmasi',
    nameLabel: 'Koko nimi',
    namePh: 'Nimesi',
    emailLabel: 'Sähköposti',
    emailPh: 'sinun@sähköposti.fi',
    datesLabel: 'Toivotut päivämäärät',
    datesPh: 'esim. joulukuu 2026',
    groupLabel: 'Ryhmäkoko',
    groupOptions: ['1–2 matkustajaa', '3–4 matkustajaa', '5–8 matkustajaa', '9+ matkustajaa'],
    budgetLabel: 'Budjettihaarukka (per henkilö)',
    budgetOptions: ['Alle 500', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000+'],
    messageLabel: 'Kerro lisää',
    messagePh: 'Toiveet päiväretkistä, erityistilaisuudet, ruokavaliot, kaikki tärkeä…',
    submit: 'Lähetä tiedustelu',
    sending: 'Lähetetään…',
    errorMsg: 'Jokin meni pieleen. Yritä uudelleen.',
    subjectPrefix: 'LaplandTours-tiedustelu:',
  },
  de: {
    eyebrow: 'Individuell',
    h2Line1: 'Passt keiner der',
    h2Line2: 'Reise­veranstalter?',
    lead:
      'Beschreiben Sie die Reise, die Sie sich wirklich wünschen. Innerhalb von 24–48 Stunden erhalten Sie eine Antwort mit einer Auswahl an Reiseveranstaltern (oder unabhängigen Anbietern), inklusive einer ehrlichen Einschätzung, ob Ihr Budget zum beschriebenen Vorhaben passt.',
    bullets: [
      'Ihre Daten und Reisedauer',
      'Wichtige Tagestouren, und solche, die Sie auslassen möchten',
      'Unterkunftsstil und Budget',
      'Besondere Anlässe: Geburtstage, Anträge, Jubiläen',
    ],
    noCommitment: 'Unverbindlich. Keine Provision für Sie.',
    sentEyebrow: 'Gesendet',
    sentHeadline: 'Vielen Dank. Eine Antwort folgt innerhalb von 24–48 Stunden.',
    sentMeantime: 'In der Zwischenzeit lohnt sich ein Blick in den',
    sentLink: 'Veranstalter-Guide',
    sentConfirm: 'Bestätigung gesendet an',
    briefEyebrow: 'Briefing',
    briefH: 'Erzählen Sie von Ihren Plänen',
    nameLabel: 'Vollständiger Name',
    namePh: 'Ihr Name',
    emailLabel: 'E-Mail',
    emailPh: 'ihre@e-mail.de',
    datesLabel: 'Wunschtermin',
    datesPh: 'z. B. Dezember 2026',
    groupLabel: 'Gruppengröße',
    groupOptions: ['1–2 Reisende', '3–4 Reisende', '5–8 Reisende', '9+ Reisende'],
    budgetLabel: 'Budgetrahmen (pro Person)',
    budgetOptions: ['Unter 500', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000+'],
    messageLabel: 'Weitere Hinweise',
    messagePh: 'Wunsch-Tagestouren, besondere Anlässe, Ernährung, alles Relevante …',
    submit: 'Anfrage senden',
    sending: 'Senden…',
    errorMsg: 'Etwas ist schiefgelaufen. Bitte erneut versuchen.',
    subjectPrefix: 'LaplandTours-Anfrage von',
  },
  ko: {
    eyebrow: '맞춤형',
    h2Line1: '어느',
    h2Line2: '운영사도 맞지 않으신가요?',
    lead:
      '원하시는 여행을 알려주세요. 24~48시간 안에 적합한 운영사(또는 독립 공급자) 후보 목록을 답변으로 보내드립니다. 설명하신 내용에 비해 예산이 현실적인지에 대한 솔직한 평가도 함께 드립니다.',
    bullets: [
      '여행 날짜와 기간',
      '꼭 하고 싶은 액티비티, 그리고 건너뛸 것',
      '숙박 스타일과 예산',
      '특별한 요청: 생일, 청혼, 기념일',
    ],
    noCommitment: '의무 없음. 고객 수수료 없음.',
    sentEyebrow: '전송 완료',
    sentHeadline: '감사합니다. 24~48시간 안에 회신드립니다.',
    sentMeantime: '그동안 이 글도 함께 읽어보세요:',
    sentLink: '운영사 가이드',
    sentConfirm: '확인 메일을 보낸 주소',
    briefEyebrow: '브리프',
    briefH: '계획을 알려주세요',
    nameLabel: '성함',
    namePh: '성함을 입력해 주세요',
    emailLabel: '이메일',
    emailPh: 'your@email.com',
    datesLabel: '희망 날짜',
    datesPh: '예: 2026년 12월',
    groupLabel: '인원',
    groupOptions: ['1~2명', '3~4명', '5~8명', '9명 이상'],
    budgetLabel: '예산 범위 (1인당)',
    budgetOptions: ['500 미만', '500 ~ 1,000', '1,000 ~ 2,000', '2,000 ~ 5,000', '5,000 이상'],
    messageLabel: '추가로 알려주세요',
    messagePh: '원하시는 액티비티, 특별한 기념일, 식이 요건 등 모두 적어주세요…',
    submit: '문의 보내기',
    sending: '전송 중…',
    errorMsg: '문제가 발생했습니다. 다시 시도해 주세요.',
    subjectPrefix: 'LaplandTours 문의',
  },
  fr: {
    eyebrow: 'Sur mesure',
    h2Line1: 'Aucun',
    h2Line2: 'voyagiste ne convient ?',
    lead:
      'Dites-nous le voyage que vous voulez vraiment. Une réponse avec une présélection de voyagistes (ou de prestataires indépendants) vous parvient sous 24 à 48 heures, avec une appréciation honnête sur le réalisme de votre budget par rapport à ce que vous décrivez.',
    bullets: [
      'Vos dates et la durée du séjour',
      'Les activités importantes, et celles à éviter',
      'Style d\'hébergement et budget',
      'Demandes particulières : anniversaires, demandes en mariage',
    ],
    noCommitment: 'Sans engagement. Aucune commission à votre charge.',
    sentEyebrow: 'Envoyé',
    sentHeadline: 'Merci. Une réponse arrive sous 24 à 48 heures.',
    sentMeantime: 'En attendant, consultez',
    sentLink: 'le guide des voyagistes',
    sentConfirm: 'Confirmation envoyée à',
    briefEyebrow: 'Brief',
    briefH: 'Parlez-nous de votre projet',
    nameLabel: 'Nom complet',
    namePh: 'Votre nom',
    emailLabel: 'E-mail',
    emailPh: 'votre@email.com',
    datesLabel: 'Dates souhaitées',
    datesPh: 'p. ex. décembre 2026',
    groupLabel: 'Taille du groupe',
    groupOptions: ['1–2 voyageurs', '3–4 voyageurs', '5–8 voyageurs', '9+ voyageurs'],
    budgetLabel: 'Fourchette de budget (par personne)',
    budgetOptions: ['Moins de 500', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000 +'],
    messageLabel: 'Détaillez votre projet',
    messagePh: 'Activités souhaitées, occasions particulières, régimes alimentaires, tout détail utile…',
    submit: 'Envoyer la demande',
    sending: 'Envoi…',
    errorMsg: 'Une erreur est survenue. Réessayez.',
    subjectPrefix: 'Demande LaplandTours de',
  },
  it: {
    eyebrow: 'Su misura',
    h2Line1: 'Nessun',
    h2Line2: 'operatore le va a genio?',
    lead:
      'Ci racconti il viaggio che desidera davvero. Entro 24–48 ore le rispondiamo con una rosa di operatori (o fornitori indipendenti), insieme a una valutazione onesta sul fatto che il suo budget sia realistico per quanto descritto.',
    bullets: [
      'Date e durata del viaggio',
      'Attività imprescindibili, e quelle da saltare',
      'Stile di alloggio e budget',
      'Richieste speciali: compleanni, proposte di matrimonio, anniversari',
    ],
    noCommitment: 'Senza impegno. Nessuna commissione a suo carico.',
    sentEyebrow: 'Inviato',
    sentHeadline: 'Grazie. Le rispondiamo entro 24–48 ore.',
    sentMeantime: 'Nel frattempo, dia un\'occhiata',
    sentLink: 'alla guida agli operatori',
    sentConfirm: 'Conferma inviata a',
    briefEyebrow: 'Brief',
    briefH: 'Ci parli del suo progetto',
    nameLabel: 'Nome e cognome',
    namePh: 'Il suo nome',
    emailLabel: 'E-mail',
    emailPh: 'sua@email.com',
    datesLabel: 'Date preferite',
    datesPh: 'es. dicembre 2026',
    groupLabel: 'Numero di partecipanti',
    groupOptions: ['1–2 viaggiatori', '3–4 viaggiatori', '5–8 viaggiatori', '9+ viaggiatori'],
    budgetLabel: 'Fascia di budget (per persona)',
    budgetOptions: ['Sotto 500', '500 – 1.000', '1.000 – 2.000', '2.000 – 5.000', '5.000 +'],
    messageLabel: 'Ci dica di più',
    messagePh: 'Attività che le piacerebbero, occasioni speciali, esigenze alimentari, qualsiasi cosa utile…',
    submit: 'Invia la richiesta',
    sending: 'Invio…',
    errorMsg: 'Qualcosa è andato storto. Riprova.',
    subjectPrefix: 'Richiesta LaplandTours di',
  },
  nl: {
    eyebrow: 'Maatwerk',
    h2Line1: 'Past geen van de',
    h2Line2: 'reisorganisaties?',
    lead:
      'Vertel ons welke reis u écht wilt. Binnen 24–48 uur ontvangt u een antwoord met een shortlist van reisorganisaties (of onafhankelijke aanbieders), inclusief een eerlijke inschatting of uw budget realistisch is voor wat u beschrijft.',
    bullets: [
      'Uw data en reisduur',
      'Activiteiten die ertoe doen, en wat u wilt overslaan',
      'Type accommodatie en budget',
      'Bijzondere wensen: verjaardagen, aanzoeken, jubilea',
    ],
    noCommitment: 'Geen verplichting. Geen commissie voor u.',
    sentEyebrow: 'Verzonden',
    sentHeadline: 'Bedankt. Binnen 24–48 uur volgt een antwoord.',
    sentMeantime: 'Bekijk in de tussentijd',
    sentLink: 'de operator-gids',
    sentConfirm: 'Bevestiging verstuurd naar',
    briefEyebrow: 'Briefing',
    briefH: 'Vertel ons uw plannen',
    nameLabel: 'Volledige naam',
    namePh: 'Uw naam',
    emailLabel: 'E-mail',
    emailPh: 'uw@email.com',
    datesLabel: 'Gewenste data',
    datesPh: 'bv. december 2026',
    groupLabel: 'Groepsgrootte',
    groupOptions: ['1–2 reizigers', '3–4 reizigers', '5–8 reizigers', '9+ reizigers'],
    budgetLabel: 'Budget per persoon',
    budgetOptions: ['Onder 500', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000+'],
    messageLabel: 'Vertel ons meer',
    messagePh: 'Activiteiten waar u zin in heeft, bijzondere gelegenheden, dieetwensen, alles…',
    submit: 'Aanvraag versturen',
    sending: 'Versturen…',
    errorMsg: 'Er ging iets mis. Probeer opnieuw.',
    subjectPrefix: 'LaplandTours-aanvraag van',
  },
  sv: {
    eyebrow: 'Skräddarsytt',
    h2Line1: 'Passar ingen av',
    h2Line2: 'arrangörerna?',
    lead:
      'Berätta vilken resa du faktiskt vill ha. Inom 24–48 timmar får du ett svar med en kortlista över arrangörer (eller fristående leverantörer), inklusive en ärlig bedömning av om din budget är realistisk för det du beskrivit.',
    bullets: [
      'Dina datum och resans längd',
      'Aktiviteter som betyder något, och sådana du vill hoppa över',
      'Typ av boende och budget',
      'Särskilda önskemål: födelsedagar, frierier, årsdagar',
    ],
    noCommitment: 'Ingen förpliktelse. Ingen provision för dig.',
    sentEyebrow: 'Skickat',
    sentHeadline: 'Tack. Du får svar inom 24–48 timmar.',
    sentMeantime: 'Under tiden kan du läsa',
    sentLink: 'arrangörsguiden',
    sentConfirm: 'Bekräftelse skickad till',
    briefEyebrow: 'Uppgifter',
    briefH: 'Berätta om dina planer',
    nameLabel: 'Fullständigt namn',
    namePh: 'Ditt namn',
    emailLabel: 'E-post',
    emailPh: 'din@epost.se',
    datesLabel: 'Önskade datum',
    datesPh: 't.ex. december 2026',
    groupLabel: 'Gruppstorlek',
    groupOptions: ['1–2 resenärer', '3–4 resenärer', '5–8 resenärer', '9+ resenärer'],
    budgetLabel: 'Budgetintervall (per person)',
    budgetOptions: ['Under 500', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000+'],
    messageLabel: 'Berätta mer',
    messagePh: 'Aktiviteter du skulle älska, särskilda tillfällen, kostbehov, vad som helst…',
    submit: 'Skicka förfrågan',
    sending: 'Skickar…',
    errorMsg: 'Något gick fel. Försök igen.',
    subjectPrefix: 'LaplandTours-förfrågan från',
  },
  ja: {
    eyebrow: 'カスタマイズ',
    h2Line1: 'どの',
    h2Line2: 'ツアー会社も合わない場合',
    lead:
      '実際にお望みの旅程をお聞かせください。24〜48時間以内に、ツアーオペレーター(または独立した提供者)の候補リストをお返事いたします。ご予算が現実的かどうかの率直な評価も含みます。',
    bullets: [
      'ご希望の日程と期間',
      '重視するアクティビティ、そして省きたいもの',
      '宿泊施設のスタイルとご予算',
      '特別なご要望:誕生日、プロポーズ、記念日',
    ],
    noCommitment: '契約義務はありません。お客様への手数料もかかりません。',
    sentEyebrow: '送信済み',
    sentHeadline: 'ありがとうございます。24〜48時間以内にご返信いたします。',
    sentMeantime: 'お待ちの間に、ぜひこちらもご覧ください：',
    sentLink: 'ツアー会社ガイド',
    sentConfirm: '確認メールの送信先',
    briefEyebrow: 'お問い合わせ内容',
    briefH: 'ご予定をお聞かせください',
    nameLabel: 'お名前',
    namePh: 'お名前',
    emailLabel: 'メールアドレス',
    emailPh: 'your@email.com',
    datesLabel: 'ご希望の日程',
    datesPh: '例:2026年12月',
    groupLabel: '人数',
    groupOptions: ['1〜2名', '3〜4名', '5〜8名', '9名以上'],
    budgetLabel: 'ご予算範囲(1人あたり)',
    budgetOptions: ['500ユーロ以下', '500〜1,000', '1,000〜2,000', '2,000〜5,000', '5,000以上'],
    messageLabel: '詳細をお聞かせください',
    messagePh: 'お好みのアクティビティ、特別な機会、食事制限、何でも…',
    submit: 'お問い合わせを送信',
    sending: '送信中…',
    errorMsg: '問題が発生しました。もう一度お試しください。',
    subjectPrefix: 'LaplandToursへのお問い合わせ:',
  },
  es: {
    eyebrow: 'A medida',
    h2Line1: '¿Ningún',
    h2Line2: 'operador le encaja?',
    lead:
      'Cuéntenos el viaje que de verdad quiere. En 24–48 horas recibirá una respuesta con una selección de operadores (o proveedores independientes), incluida una valoración honesta de si su presupuesto es realista para lo que describe.',
    bullets: [
      'Sus fechas y la duración',
      'Las actividades que importan, y las que conviene saltarse',
      'Estilo de alojamiento y presupuesto',
      'Peticiones especiales: cumpleaños, pedidas de mano, aniversarios',
    ],
    noCommitment: 'Sin compromiso. Sin comisión a su cargo.',
    sentEyebrow: 'Enviado',
    sentHeadline: 'Gracias. Recibirá una respuesta en 24–48 horas.',
    sentMeantime: 'Mientras tanto, eche un vistazo a',
    sentLink: 'la guía de operadores',
    sentConfirm: 'Confirmación enviada a',
    briefEyebrow: 'Resumen',
    briefH: 'Cuéntenos sus planes',
    nameLabel: 'Nombre completo',
    namePh: 'Su nombre',
    emailLabel: 'Correo electrónico',
    emailPh: 'su@email.com',
    datesLabel: 'Fechas preferidas',
    datesPh: 'p. ej. diciembre de 2026',
    groupLabel: 'Tamaño del grupo',
    groupOptions: ['1–2 viajeros', '3–4 viajeros', '5–8 viajeros', '9+ viajeros'],
    budgetLabel: 'Rango de presupuesto (por persona)',
    budgetOptions: ['Menos de 500', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000+'],
    messageLabel: 'Cuéntenos más',
    messagePh: 'Actividades que le encantarían, ocasiones especiales, necesidades alimentarias, lo que sea…',
    submit: 'Enviar consulta',
    sending: 'Enviando…',
    errorMsg: 'Algo salió mal. Inténtalo de nuevo.',
    subjectPrefix: 'Consulta de LaplandTours de',
  },
  'pt-BR': {
    eyebrow: 'Sob medida',
    h2Line1: 'Nenhuma',
    h2Line2: 'operadora serve?',
    lead:
      'Conte-nos a viagem que você realmente quer. Em 24 a 48 horas você recebe uma resposta com uma seleção de operadoras (ou fornecedores independentes), incluindo uma avaliação honesta sobre se o seu orçamento é realista para o que descreveu.',
    bullets: [
      'Suas datas e a duração',
      'As atividades que importam, e as que dá para pular',
      'Estilo de hospedagem e orçamento',
      'Pedidos especiais: aniversários, pedidos de casamento, datas comemorativas',
    ],
    noCommitment: 'Sem compromisso. Sem comissão a seu cargo.',
    sentEyebrow: 'Enviado',
    sentHeadline: 'Obrigado. Você recebe uma resposta em 24 a 48 horas.',
    sentMeantime: 'Enquanto isso, dê uma olhada',
    sentLink: 'no guia de operadoras',
    sentConfirm: 'Confirmação enviada para',
    briefEyebrow: 'Resumo',
    briefH: 'Conte-nos seus planos',
    nameLabel: 'Nome completo',
    namePh: 'Seu nome',
    emailLabel: 'E-mail',
    emailPh: 'seu@email.com',
    datesLabel: 'Datas preferidas',
    datesPh: 'ex.: dezembro de 2026',
    groupLabel: 'Tamanho do grupo',
    groupOptions: ['1–2 viajantes', '3–4 viajantes', '5–8 viajantes', '9+ viajantes'],
    budgetLabel: 'Faixa de orçamento (por pessoa)',
    budgetOptions: ['Abaixo de 500', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000+'],
    messageLabel: 'Conte-nos mais',
    messagePh: 'Atividades que você adoraria, ocasiões especiais, restrições alimentares, qualquer coisa…',
    submit: 'Enviar consulta',
    sending: 'Enviando…',
    errorMsg: 'Algo deu errado. Tente novamente.',
    subjectPrefix: 'Consulta da LaplandTours de',
  },
  'zh-CN': {
    eyebrow: '定制',
    h2Line1: '没有合适的',
    h2Line2: '运营商？',
    lead:
      '告诉我们你真正想要的行程。我们会在 24–48 小时内回复一份运营商（或独立供应商）候选名单，并坦诚评估你的预算对所描述的行程是否现实。',
    bullets: [
      '你的日期与时长',
      '看重的活动，以及可以略过的',
      '住宿风格与预算',
      '特别要求：生日、求婚、纪念日',
    ],
    noCommitment: '没有约束，无需向你收取佣金。',
    sentEyebrow: '已发送',
    sentHeadline: '谢谢。我们会在 24–48 小时内回复。',
    sentMeantime: '在此期间，欢迎查看',
    sentLink: '运营商指南',
    sentConfirm: '确认邮件已发送至',
    briefEyebrow: '需求',
    briefH: '告诉我们你的计划',
    nameLabel: '姓名',
    namePh: '你的姓名',
    emailLabel: '电子邮箱',
    emailPh: 'your@email.com',
    datesLabel: '期望日期',
    datesPh: '例如 2026 年 12 月',
    groupLabel: '人数',
    groupOptions: ['1–2 人', '3–4 人', '5–8 人', '9 人以上'],
    budgetLabel: '预算范围（每人）',
    budgetOptions: ['500 以下', '500 – 1 000', '1 000 – 2 000', '2 000 – 5 000', '5 000 以上'],
    messageLabel: '告诉我们更多',
    messagePh: '想体验的活动、特别场合、饮食需求，任何信息都行……',
    submit: '发送咨询',
    sending: '发送中…',
    errorMsg: '出错了，请重试。',
    subjectPrefix: 'LaplandTours 咨询，来自',
  },
};

export default function CustomTourBuilder() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[copyLang(lang)];
  const [status, setStatus] = useState<FormStatus>('idle');
  // Vahvistusmaili lahtee lomakkeen osoitteeseen: naytetaan se kiitosruudussa,
  // jotta lupaus on kavijan tarkistettavissa eika pelkka vakuutus.
  const [sentTo, setSentTo] = useState('');
  // ja/zh kayttavat taysleveaa pistetta.
  const sentPeriod = lang === 'ja' || lang === 'zh-CN' ? '。' : '.';
  // [LV-FUNNEL] view = osio vieritetty näkyviin (kerran), start = 1. fokus,
  // blocked kerran per submit-yritys (natiivi invalid laukeaa per kenttä),
  // submit juuri ennen fetchiä, ja success/error vasta kun palvelin on
  // vastannut — lomake ei enää väitä lähettäneensä mitään ennen kuin se on totta.
  const funnelData = { lang };
  const sectionRef = useRef<HTMLElement | null>(null);
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
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const trackStart = () => {
    if (startTracked.current) return;
    startTracked.current = true;
    track('tour_builder_start', funnelData);
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const data = new FormData(e.target as HTMLFormElement);
    const val = (k: string) => String(data.get(k) ?? '').trim();
    const name = val('name');
    const email = val('email');

    // Viesti luetaan sales@:sta, joten kenttänimet ovat englanniksi vaikka
    // kävijä täytti lomakkeen omalla kielellään. Kenttien maxLength pitää
    // tämän funktion 5000 merkin katon alla.
    const body = [
      `Dates: ${val('dates') || '—'}`,
      `Group: ${val('group') || '—'}`,
      `Budget: ${val('budget') || '—'}`,
      '',
      val('message') || '—',
      '',
      `— laplandtours.online /design-tour (${lang})`,
    ].join('\n');

    // [LV-FUNNEL] submit = pyyntö lähtee: validointiportit ohitettu, fetch alkaa.
    track('tour_builder_submit', funnelData);
    setStatus('sending');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${CONTACT_ANON_KEY}` },
        body: JSON.stringify({
          name,
          lang, // vastaanottaja saa automaattivastauksen omalla kielellaan
          email,
          subject: `${c.subjectPrefix} ${name}`.trim(),
          message: body,
          website: val('website'), // hunajapurkki: botti täyttää, ihminen ei
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      track('tour_builder_success', funnelData);
      setSentTo(email);
      setStatus('success');
    } catch (err) {
      track('tour_builder_error', { ...funnelData, reason: err instanceof Error ? err.message : 'network' });
      setStatus('error');
    }
  }

  return (
    <section id="custom-tour" ref={sectionRef} className="py-20 md:py-28 bg-deep-night">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10">
        {/* grid-cols-1 base: a col-span-12 child inside grid-cols-12 + gap-x-10 forces
            11 fixed gaps (440px) = horizontal overflow at 375px. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-12">
          <div className="md:col-span-5">
            <p className="cap-meta">{c.eyebrow}</p>
            {/* h1: this component renders only on /design-tour, which previously had no H1 at all. */}
            <h1 className="mt-2 font-heading text-snow tracking-tight leading-[0.92] text-5xl sm:text-6xl lg:text-7xl break-words hyphens-auto">
              {c.h2Line1}<br />{c.h2Line2}
            </h1>
            <p className="mt-6 text-snow/75 font-body text-base sm:text-lg leading-relaxed max-w-prose">
              {c.lead}
            </p>
            <ul className="mt-8 space-y-3 font-body text-snow/80 text-[15px]">
              {c.bullets.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-vibe-pink flex-shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="cap-meta mt-10">
              <Paintbrush className="inline w-3 h-3 mr-2 text-vibe-pink" />
              {c.noCommitment}
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7 bg-deeper-night p-8 sm:p-10 border border-white/10 rounded-2xl">
            {status === 'success' ? (
              /* Paneeli venyy vasemman palstan korkeuteen (grid stretch), joten
                 sisalto keskitetaan pystysuunnassa — muuten alle jaa iso tyhja. */
              <div className="flex h-full flex-col justify-center py-6">
                {/* aurora-green = LV-design-systeemin success-vari (7,5:1 deeper-nightia vasten) */}
                <p className="cap-meta is-success flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" aria-hidden="true" />
                  {c.sentEyebrow}
                </p>
                <h3 className="mt-3 font-heading text-3xl sm:text-4xl text-snow tracking-wide leading-tight">
                  {c.sentHeadline}
                </h3>
                <p className="mt-4 text-snow/80 font-body">
                  {c.sentMeantime}{' '}
                  <a href={to('/lapland-holidays')} className="text-vibe-pink hover:underline">
                    {c.sentLink}
                  </a>{sentPeriod}
                </p>
                {/* Osoite omalle rivilleen bodyfontilla: .cap-meta pakottaa
                    uppercasen, ja kapiteeleiksi muutettu sahkopostiosoite
                    lukee huonosti eika nayta silta minka kavija kirjoitti. */}
                <p className="cap-meta mt-8 text-snow/55">{c.sentConfirm}</p>
                <p className="mt-1 font-body text-sm text-snow/85 break-words">{sentTo}</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                // [LV-FUNNEL] required-kentät estävät submitin natiivisti ennen
                // handleSubmitia — invalid-capture kertoo MIKÄ kenttä pysäytti.
                onInvalidCapture={(e) => {
                  if (blockedTracked.current) return;
                  blockedTracked.current = true;
                  window.setTimeout(() => { blockedTracked.current = false; }, 400);
                  const t = e.target as HTMLInputElement;
                  track('tour_builder_blocked', { ...funnelData, reason: t.name || 'field' });
                }}
                className="space-y-5"
              >
                <p className="cap-meta">{c.briefEyebrow}</p>
                <h3 className="font-heading text-3xl sm:text-4xl text-snow tracking-wide leading-tight">
                  {c.briefH}
                </h3>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-snow/80 mb-1">
                      {c.nameLabel}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      maxLength={100}
                      onFocus={trackStart}
                      placeholder={c.namePh}
                      className="w-full px-4 py-3 rounded-lg border border-white/15 bg-deep-night/50 text-snow placeholder-snow/30 font-body text-base focus:outline-none focus:ring-2 focus:ring-vibe-pink/50 focus:border-vibe-pink transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-snow/80 mb-1">
                      {c.emailLabel}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      maxLength={255}
                      onFocus={trackStart}
                      placeholder={c.emailPh}
                      className="w-full px-4 py-3 rounded-lg border border-white/15 bg-deep-night/50 text-snow placeholder-snow/30 font-body text-base focus:outline-none focus:ring-2 focus:ring-vibe-pink/50 focus:border-vibe-pink transition"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-body font-medium text-snow/80 mb-1">
                      {c.datesLabel}
                    </label>
                    <input
                      type="text"
                      name="dates"
                      maxLength={80}
                      onFocus={trackStart}
                      placeholder={c.datesPh}
                      className="w-full px-4 py-3 rounded-lg border border-white/15 bg-deep-night/50 text-snow placeholder-snow/30 font-body text-base focus:outline-none focus:ring-2 focus:ring-vibe-pink/50 focus:border-vibe-pink transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body font-medium text-snow/80 mb-1">
                      {c.groupLabel}
                    </label>
                    <div className="relative">
                      <select name="group" onFocus={trackStart} className="w-full px-4 py-3 pr-10 appearance-none rounded-lg border border-white/15 bg-deep-night/50 text-snow font-body text-base focus:outline-none focus:ring-2 focus:ring-vibe-pink/50 focus:border-vibe-pink transition">
                        {c.groupOptions.map((opt) => (
                          <option key={opt} className="bg-deep-night">{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-snow/60" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-snow/80 mb-1">
                    {c.budgetLabel}
                  </label>
                  <div className="relative">
                    <select name="budget" onFocus={trackStart} className="w-full px-4 py-3 pr-10 appearance-none rounded-lg border border-white/15 bg-deep-night/50 text-snow font-body text-base focus:outline-none focus:ring-2 focus:ring-vibe-pink/50 focus:border-vibe-pink transition">
                      {c.budgetOptions.map((opt) => (
                        <option key={opt} className="bg-deep-night">{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-snow/60" aria-hidden="true" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-body font-medium text-snow/80 mb-1">
                    {c.messageLabel}
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    maxLength={2000}
                    onFocus={trackStart}
                    placeholder={c.messagePh}
                    className="w-full px-4 py-3 rounded-lg border border-white/15 bg-deep-night/50 text-snow placeholder-snow/30 font-body text-base focus:outline-none focus:ring-2 focus:ring-vibe-pink/50 focus:border-vibe-pink transition resize-none"
                  />
                </div>

                {/* Hunajapurkki: piilokentta jota ihminen ei nae eika tayta.
                    Yksi neljasta nimesta jonka edge-funktio tarkistaa — jos se
                    on tayttynyt, funktio palauttaa 200:n eika laheta postia. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] w-px h-px opacity-0"
                />

                {status === 'error' && (
                  <p role="alert" className="font-body text-sm text-red-300">
                    {c.errorMsg}{' '}
                    <a href="mailto:info@laplandvibes.com" className="underline hover:text-vibe-pink">
                      info@laplandvibes.com
                    </a>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  aria-busy={status === 'sending'}
                  className="w-full inline-flex items-center justify-center gap-2 bg-vibe-pink hover:bg-vibe-pink/90 disabled:opacity-70 disabled:cursor-wait disabled:hover:scale-100 text-white font-body font-semibold px-6 py-4 rounded-lg transition-all duration-300 hover:scale-[1.02] text-lg shadow-lg shadow-vibe-pink/25"
                >
                  <Send className="w-5 h-5" />
                  {status === 'sending' ? c.sending : c.submit}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
