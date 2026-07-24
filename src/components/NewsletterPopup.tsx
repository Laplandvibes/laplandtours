import SharedNewsletterPopup, { type NewsletterPopupDict } from '../shared/NewsletterPopup';
import { trackNewsletterSignup } from '../lib/analytics';
import { useLang, type Lang } from '../i18n/useLang';

const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL as string) ?? '';
const SUPABASE_ANON_KEY = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string) ?? '';

const DICTS: Record<Lang, { dict: NewsletterPopupDict; headline?: string; description?: string }> = {
  en: { dict: {} }, // shared component already ships EN defaults
  fi: {
    dict: {
      successHeadline: 'Tervetuloa mukaan!',
      successBody:
        'Tervetuloviesti tulee kohta sähköpostiisi, ja seuraavatkin kirjeet samaan osoitteeseen.',
      alreadyHeadline: 'Olet jo listalla',
      alreadyBody:
        'Sähköpostisi on jo mukana. Kiitos että pysyt seurassamme. Lapin kuulumiset jatkavat kulkuaan postilaatikkoosi.',
      emailPlaceholder: 'Sähköpostiosoite',
      submit: 'Tilaa Lapin uutiskirje',
      loading: 'Tilataan…',
      later: 'Ehkä myöhemmin',
      closeAria: 'Sulje',
      closeLabel: 'Sulje',
      trust:
        'Lähetämme vain kun on oikeasti kerrottavaa. Peru yhdellä klikillä. Sähköpostiasi ei jaeta.',
      errorGeneric: 'Tilaus ei mennyt läpi. Kokeile vielä kerran.',
    },
    headline: '#LaplandVibes-uutiskirje',
    description:
      'Rehellisiä matkavinkkejä Suomen Lappiin, kirjoitettu Suomesta, silloin kun on oikeasti jotain kerrottavaa.',
  },
  de: {
    dict: {
      successHeadline: 'Willkommen an Bord.',
      successBody:
        'Bitte schauen Sie in Ihr Postfach. Die Begrüßungsnachricht ist unterwegs, weitere Briefe folgen.',
      alreadyHeadline: 'Bereits eingetragen',
      alreadyBody:
        'Sie sind bereits angemeldet. Die Lappland-Nachrichten kommen weiter zu Ihnen.',
      emailPlaceholder: 'Ihre E-Mail-Adresse',
      submit: 'Newsletter abonnieren',
      loading: 'Wird abonniert …',
      later: 'Später vielleicht',
      closeAria: 'Schließen',
      closeLabel: 'Schließen',
      trust:
        'Nur wenn etwas Erwähnenswertes auftaucht. Jederzeit kündbar. Ihre Adresse wird nicht weitergegeben.',
      errorGeneric: 'Anmeldung fehlgeschlagen. Bitte erneut versuchen.',
    },
    headline: 'Den #LaplandVibes-Newsletter abonnieren',
    description:
      'Ehrliche Reisetipps für Finnisch-Lappland, nur wenn etwas Erwähnenswertes auftaucht.',
  },
  ja: {
    dict: {
      successHeadline: 'ご登録ありがとうございます。',
      successBody:
        'ようこそメールを送信しました。受信箱をご確認ください。今後もニュースレターが届きます。',
      alreadyHeadline: 'すでにご登録いただいています',
      alreadyBody:
        'メールアドレスはすでに登録されています。引き続きラップランドのニュースをお届けします。',
      emailPlaceholder: 'メールアドレス',
      submit: 'ラップランドのニュースレターを購読する',
      loading: '登録中…',
      later: 'また後で',
      closeAria: '閉じる',
      closeLabel: '閉じる',
      trust:
        '本当にお知らせすべきことがあるときのみ配信します。ワンクリックで配信解除可能です。メールアドレスを共有することはありません。',
      errorGeneric: '登録が完了しませんでした。もう一度お試しください。',
    },
    headline: '#LaplandVibesニュースレター',
    description:
      'フィンランド・ラップランドへの旅の率直なヒントを、フィンランドから。本当にお知らせすべきことがあるときのみ。',
  },
  es: {
    dict: {
      successHeadline: 'Bienvenido a bordo.',
      successBody:
        'Le hemos enviado el correo de bienvenida. Revise su bandeja de entrada. Las próximas cartas llegarán al mismo correo.',
      alreadyHeadline: 'Ya está suscrito',
      alreadyBody:
        'Su correo ya está en la lista. Gracias por seguir con nosotros. Las noticias de Laponia continuarán llegando.',
      emailPlaceholder: 'Dirección de correo',
      submit: 'Suscribirse al boletín',
      loading: 'Suscribiendo…',
      later: 'Quizás más tarde',
      closeAria: 'Cerrar',
      closeLabel: 'Cerrar',
      trust:
        'Solo enviamos cuando hay algo realmente interesante. Cancele con un clic. No compartimos su correo.',
      errorGeneric: 'No se ha podido completar la suscripción. Inténtelo de nuevo.',
    },
    headline: 'Boletín #LaplandVibes',
    description:
      'Consejos honestos para viajar a la Laponia finlandesa, escritos desde Finlandia, solo cuando hay algo realmente que contar.',
  },
  'pt-BR': {
    dict: {
      successHeadline: 'Bem-vindo a bordo.',
      successBody:
        'Enviamos o e-mail de boas-vindas. Verifique sua caixa de entrada. As próximas cartas chegarão no mesmo endereço.',
      alreadyHeadline: 'Você já está inscrito',
      alreadyBody:
        'Seu e-mail já está na lista. Obrigado por estar conosco. As novidades da Lapônia continuarão chegando.',
      emailPlaceholder: 'Endereço de e-mail',
      submit: 'Assinar boletim',
      loading: 'Inscrevendo…',
      later: 'Talvez mais tarde',
      closeAria: 'Fechar',
      closeLabel: 'Fechar',
      trust:
        'Só enviamos quando há algo realmente interessante. Cancele com um clique. Não compartilhamos seu e-mail.',
      errorGeneric: 'Não foi possível completar a inscrição. Tente novamente.',
    },
    headline: 'Boletim #LaplandVibes',
    description:
      'Dicas honestas para viajar à Lapônia finlandesa, escritas a partir da Finlândia, somente quando há realmente algo a contar.',
  },
  'zh-CN': {
    dict: {
      successHeadline: '欢迎加入。',
      successBody:
        '我们已发送欢迎邮件，请查收。今后的通讯也将发送至同一邮箱。',
      alreadyHeadline: '您已订阅',
      alreadyBody:
        '您的邮箱已在列表中，感谢您持续关注。拉普兰的最新动态将继续发送给您。',
      emailPlaceholder: '邮箱地址',
      submit: '订阅拉普兰通讯',
      loading: '订阅中…',
      later: '以后再说',
      closeAria: '关闭',
      closeLabel: '关闭',
      trust:
        '仅在确有内容时发送。一键退订。我们不会分享您的邮箱。',
      errorGeneric: '订阅未能完成。请再试一次。',
    },
    headline: '#LaplandVibes 通讯',
    description:
      '来自芬兰当地的拉普兰真实旅行建议，仅在确实有内容值得分享时发送。',
  },
  ko: {
    dict: {
      successHeadline: '환영합니다.',
      successBody: '환영 메일을 보내드렸습니다. 받은편지함을 확인해 주세요. 앞으로의 소식도 같은 주소로 보내드립니다.',
      alreadyHeadline: '이미 구독 중이세요',
      alreadyBody: '이메일이 이미 목록에 있습니다. 함께해 주셔서 감사합니다. 라플란드 소식이 계속 전해집니다.',
      emailPlaceholder: '이메일 주소',
      submit: '라플란드 뉴스레터 구독',
      loading: '구독 중…',
      later: '나중에',
      closeAria: '닫기',
      closeLabel: '닫기',
      trust: '정말 전할 내용이 있을 때만 보냅니다. 한 번의 클릭으로 구독 해지 가능. 이메일은 공유하지 않습니다.',
      errorGeneric: '구독을 완료하지 못했습니다. 다시 시도해 주세요.',
    },
    headline: '#LaplandVibes 뉴스레터',
    description: '핀란드 현지에서 보내드리는 라플란드 여행 팁. 정말 전할 내용이 있을 때만.',
  },
  fr: {
    dict: {
      successHeadline: 'Bienvenue à bord.',
      successBody: 'Nous avons envoyé le message de bienvenue. Vérifiez votre boîte de réception. Les prochains envois arriveront à la même adresse.',
      alreadyHeadline: 'Déjà inscrit',
      alreadyBody: 'Votre adresse est déjà sur la liste. Merci de nous suivre. Les nouvelles de Laponie continueront d’arriver.',
      emailPlaceholder: 'Adresse e-mail',
      submit: 'S’abonner à la newsletter',
      loading: 'Inscription…',
      later: 'Plus tard',
      closeAria: 'Fermer',
      closeLabel: 'Fermer',
      trust: 'Nous écrivons seulement quand il y a vraiment quelque chose à dire. Désinscription en un clic. Adresse jamais partagée.',
      errorGeneric: 'Inscription échouée. Réessayez.',
    },
    headline: 'Newsletter #LaplandVibes',
    description: 'Des conseils honnêtes pour voyager en Laponie finlandaise, écrits depuis la Finlande, seulement quand il y a quelque chose à raconter.',
  },
  it: {
    dict: {
      successHeadline: 'Benvenuto a bordo.',
      successBody: 'Ti abbiamo inviato il messaggio di benvenuto. Controlla la casella di posta. I prossimi arriveranno allo stesso indirizzo.',
      alreadyHeadline: 'Sei già iscritto',
      alreadyBody: 'La tua email è già nella lista. Grazie di seguirci. Le notizie dalla Lapponia continueranno ad arrivare.',
      emailPlaceholder: 'Indirizzo email',
      submit: 'Iscriviti alla newsletter',
      loading: 'Iscrizione in corso…',
      later: 'Forse più tardi',
      closeAria: 'Chiudi',
      closeLabel: 'Chiudi',
      trust: 'Scriviamo solo quando c’è davvero qualcosa da dire. Disiscriviti con un clic. La tua email non viene mai condivisa.',
      errorGeneric: 'Iscrizione non riuscita. Riprova.',
    },
    headline: 'Newsletter #LaplandVibes',
    description: 'Consigli onesti per viaggiare nella Lapponia finlandese, scritti dalla Finlandia, solo quando c’è qualcosa da raccontare.',
  },
  nl: {
    dict: {
      successHeadline: 'Welkom aan boord.',
      successBody: 'We hebben je een welkomstmail gestuurd. Controleer je inbox. Volgende berichten komen op hetzelfde adres aan.',
      alreadyHeadline: 'Je bent al ingeschreven',
      alreadyBody: 'Je e-mailadres staat al op de lijst. Bedankt dat je erbij blijft. Lapland-nieuws blijft binnenkomen.',
      emailPlaceholder: 'E-mailadres',
      submit: 'Schrijf je in voor de nieuwsbrief',
      loading: 'Bezig met inschrijven…',
      later: 'Misschien later',
      closeAria: 'Sluiten',
      closeLabel: 'Sluiten',
      trust: 'We schrijven alleen wanneer er echt iets te vertellen valt. Uitschrijven met één klik. We delen je e-mail niet.',
      errorGeneric: 'Inschrijving niet gelukt. Probeer het opnieuw.',
    },
    headline: '#LaplandVibes-nieuwsbrief',
    description: 'Eerlijke reistips voor Fins Lapland, geschreven vanuit Finland, alleen als er echt iets te vertellen is.',
  },
  sv: {
    dict: {
      successHeadline: 'Välkommen ombord.',
      successBody:
        'Välkomstmejlet är på väg. Kolla din inkorg. Kommande brev landar på samma adress.',
      alreadyHeadline: 'Du står redan på listan',
      alreadyBody:
        'Din e-post finns redan med. Tack för att du håller ihop med oss. Nyheterna från Lappland fortsätter att komma.',
      emailPlaceholder: 'E-postadress',
      submit: 'Prenumerera på Lappland-nyhetsbrevet',
      loading: 'Prenumererar…',
      later: 'Kanske senare',
      closeAria: 'Stäng',
      closeLabel: 'Stäng',
      trust:
        'Vi skriver bara när det finns något att berätta. Avsluta med ett klick. Din e-post delas aldrig.',
      errorGeneric: 'Prenumerationen gick inte igenom. Försök igen.',
    },
    headline: '#LaplandVibes-nyhetsbrevet',
    description:
      'Ärliga resetips för finska Lappland, skrivna från Finland, bara när det verkligen finns något att berätta.',
  },
};

export default function NewsletterPopup() {
  const langRaw = useLang();
  const lang = useLang();
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  const { dict, headline, description } = DICTS[lang];
  return (
    <SharedNewsletterPopuplang={langRaw as 'en' | 'fi' | 'de' | 'ja' | 'es' | 'pt-BR' | 'zh-CN' | 'ko' | 'fr' | 'it' | 'nl' | 'sv'}
      
      siteId="laplandtours"
      brandWord="TOURS"
      supabaseUrl={SUPABASE_URL}
      supabaseAnonKey={SUPABASE_ANON_KEY}
      dict={dict}
      headline={headline}
      description={description}
      onSubscribed={(s) => trackNewsletterSignup(s)}
    />
  );
}
