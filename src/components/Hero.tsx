import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ImagePlaceholder from './ImagePlaceholder';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';

const COPY: Record<Lang, {
  h1: string;
  pinkLine: string;
  lead: string;
  primary: string;
  secondary: string;
  alt: string;
}> = {
  en: {
    h1: 'Plan a Lapland trip',
    pinkLine: 'Build your own, or buy a bundle.',
    lead:
      'Two ways to reach Finnish Lapland. Mix a hotel, a car and a day activity yourself, or let one of six tour operators sort the lot.',
    primary: 'Build my trip',
    secondary: 'See the bundles',
    alt: 'Lapland fell landscape at golden hour, distant fells over open water',
  },
  fi: {
    h1: 'Lapin parhaat reitit, valmiiksi mietittynä',
    pinkLine: 'Kokoa itse, tai osta matkapaketti.',
    lead:
      'Kaksi tapaa päästä Suomen Lappiin: yhdistä itse hotelli, vuokra-auto ja päiväretki, tai jätä järjestelyt kuuden matkanjärjestäjän hoidettavaksi. Kirjoitettu Suomesta, lähteet näkyvillä.',
    primary: 'Kokoa matkani',
    secondary: 'Katso matkapaketit',
    alt: 'Lappilainen tunturimaisema kultaisen tunnin valossa, järvi etualalla',
  },
  de: {
    h1: 'Planen Sie Ihre Lappland-Reise',
    pinkLine: 'Selbst zusammenstellen oder ein Reisepaket buchen.',
    lead:
      'Zwei Wege nach Finnisch-Lappland: Hotel, Mietwagen und Tagestour selbst kombinieren, oder das gesamte Paket bei einem von sechs Reiseveranstaltern buchen.',
    primary: 'Reise selbst zusammenstellen',
    secondary: 'Reisepakete ansehen',
    alt: 'Fjäll-Landschaft in Lappland im goldenen Abendlicht, See im Vordergrund',
  },
  ja: {
    h1: 'ラップランドの旅を計画する',
    pinkLine: '自分で組み立てる。またはパッケージを購入する。',
    lead:
      'フィンランド・ラップランドへの2つの行き方。ホテル、レンタカー、日帰り体験を自分で組み合わせるか、6社のツアーオペレーターのいずれかにすべてお任せください。',
    primary: 'マイ旅程を組み立てる',
    secondary: 'パッケージを見る',
    alt: 'ゴールデンアワーのラップランドの丘陵地帯、手前に湖、遠くに連なる山々',
  },
  es: {
    h1: 'Planifique su viaje a Laponia',
    pinkLine: 'Personalice usted mismo o reserve un paquete organizado.',
    lead:
      'Dos formas de llegar a la Laponia finlandesa: combine usted mismo hotel, coche de alquiler y actividad de un día, o deje que una de las seis operadoras de tour organice todo el viaje. Reseñas escritas desde Finlandia, con fuentes citadas.',
    primary: 'Personalizar mi viaje',
    secondary: 'Ver los paquetes',
    alt: 'Paisaje de montañas de Laponia a la hora dorada, lago en primer plano',
  },
  'pt-BR': {
    h1: 'Planeje sua viagem à Lapônia',
    pinkLine: 'Monte você mesmo ou compre um pacote organizado.',
    lead:
      'Duas formas de chegar à Lapônia finlandesa: combine você mesmo hotel, aluguel de carro e atividade do dia, ou deixe que uma das seis operadoras de tour organize toda a viagem. Avaliações escritas a partir da Finlândia, com fontes citadas.',
    primary: 'Montar minha viagem',
    secondary: 'Ver os pacotes',
    alt: 'Paisagem de montanhas da Lapônia na hora dourada, lago em primeiro plano',
  },
  'zh-CN': {
    h1: '规划您的拉普兰之旅',
    pinkLine: '自行组合，或购买组织好的套餐。',
    lead:
      '前往芬兰拉普兰的两种方式:自己组合酒店、租车和一日活动,或让六家旅行社中的一家为您安排整个行程。来自芬兰当地的评测,来源引用清晰。',
    primary: '组合我的行程',
    secondary: '查看套餐',
    alt: '黄金时刻的拉普兰山峦景观,湖泊在前景',
  },
  ko: {
    h1: '라플란드 여행 계획하기',
    pinkLine: '직접 구성, 또는 패키지 투어 예약.',
    lead:
      '핀란드 라플란드에 도착하는 두 가지 방법. 호텔, 렌터카, 당일 액티비티를 직접 조합하거나, 6개의 투어 운영사 중 한 곳에 모든 것을 맡기세요. 핀란드 현지에서 작성된 가이드, 출처 인용.',
    primary: '내 여행 만들기',
    secondary: '패키지 보기',
    alt: '황금빛 라플란드 산악 풍경, 앞쪽에 호수와 멀리 보이는 봉우리',
  },
  fr: {
    h1: 'Planifiez votre voyage en Laponie',
    pinkLine: 'À composer soi-même ou en forfait clé en main.',
    lead:
      'Deux façons de rejoindre la Laponie finlandaise. Combinez vous-même hôtel, location de voiture et activité d’une journée, ou laissez l’un des six opérateurs de circuit tout organiser. Guides rédigés depuis la Finlande, sources citées.',
    primary: 'Composer mon voyage',
    secondary: 'Voir les forfaits',
    alt: 'Paysage de fjells lapons à l’heure dorée, lac au premier plan',
  },
  it: {
    h1: 'Pianifica il tuo viaggio in Lapponia',
    pinkLine: 'Componi tu, oppure scegli un pacchetto.',
    lead:
      'Due modi per raggiungere la Lapponia finlandese. Combina hotel, auto a noleggio e attività giornaliera, oppure lascia che uno dei sei tour operator organizzi tutto. Guide scritte dalla Finlandia, fonti citate.',
    primary: 'Componi il mio viaggio',
    secondary: 'Vedi i pacchetti',
    alt: 'Paesaggio di fjell della Lapponia all’ora dorata, lago in primo piano',
  },
  nl: {
    h1: 'Plan een Lapland-rondreis',
    pinkLine: 'Zelf samenstellen of een pakket boeken.',
    lead:
      'Twee manieren om Fins Lapland te bereiken. Combineer zelf hotel, huurauto en dagactiviteit, of laat een van zes touroperators alles regelen. Gidsen geschreven vanuit Finland, met bronvermelding.',
    primary: 'Mijn reis samenstellen',
    secondary: 'Bekijk de pakketten',
    alt: 'Fjell-landschap in Lapland bij gouden uur, meer op de voorgrond',
  },
};

// May–Sep (months 5–9) shows the summer hero; Oct–Apr shows the winter hero.
const isSummerSeason = () => {
  const m = new Date().getMonth() + 1;
  return m >= 5 && m <= 9;
};

export default function Hero() {
  const lang = useLang();
  const to = useLocalePath();
  const c = COPY[lang];
  const heroBase = isSummerSeason() ? 'hero-home-summer' : 'hero-home';
  return (
    <section className="relative flex items-center min-h-[65svh] sm:min-h-[80svh] lg:min-h-[640px] lg:max-h-[780px] overflow-hidden">
      <ImagePlaceholder
        variant="aurora"
        src={`/images/${heroBase}.webp`}
        alt={c.alt}
        objectPosition="center 35%"
        priority
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(15,23,42,0.80) 0%, rgba(15,23,42,0.42) 50%, rgba(15,23,42,0.30) 100%)',
        }}
      />

      <div className="relative z-10 max-w-[1300px] w-full mx-auto px-6 sm:px-10 py-24 sm:py-28 lg:py-20">
        <h1 className="font-heading tracking-tight leading-[0.95] text-snow text-[clamp(2.5rem,6vw,5rem)] break-words hyphens-auto [text-wrap:balance] drop-shadow-[0_3px_18px_rgba(0,0,0,0.95)]">
          {c.h1}
        </h1>
        <p className="mt-3 sm:mt-4 font-heading tracking-wide text-vibe-pink text-[clamp(1.5rem,4.5vw,3rem)] leading-tight break-words drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {c.pinkLine}
        </p>

        <p className="mt-6 sm:mt-8 text-snow/90 font-body text-base sm:text-lg leading-relaxed max-w-xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          {c.lead}
        </p>

        <div className="mt-7 sm:mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
          <a
            href="#build"
            className="group inline-flex items-center gap-2 px-5 py-3 bg-vibe-pink hover:bg-vibe-pink/90 text-white font-body font-semibold text-base transition-colors shadow-lg shadow-vibe-pink/25"
          >
            {c.primary}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link
            to={to('/lapland-holidays')}
            className="inline-flex items-center gap-2 text-snow border-b border-snow/40 hover:border-vibe-pink hover:text-vibe-pink pb-1 font-body font-medium transition-colors"
          >
            {c.secondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
