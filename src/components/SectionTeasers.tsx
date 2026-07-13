import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useLang, useLocalePath, type CopyLang, copyLang } from '../i18n/useLang';

const ITEMS: Record<
  CopyLang,
  Array<{ to: string; eyebrow: string; title: string; body: string; readLabel: string }>
> = {
  en: [
    {
      to: '/age-guide',
      eyebrow: 'Travelling with kids?',
      title: 'Which Lapland activities work at which age',
      body: 'A practical age × activity matrix from infants to 16+, plus operator-by-age guidance.',
      readLabel: 'Read it',
    },
    {
      to: '/practical-info',
      eyebrow: 'First time in Lapland?',
      title: 'Climate, visas, transport, packing',
      body: '−30 °C floor in winter, ETIAS rules from late 2026, six things to know before booking.',
      readLabel: 'Read it',
    },
  ],
  fi: [
    {
      to: '/age-guide',
      eyebrow: 'Lasten kanssa?',
      title: 'Mitkä Lapin retket sopivat mihinkin ikään',
      body: 'Käytännön ikäkohtainen retkitaulukko vauvasta 16+ ikäisiin sekä matkanjärjestäjäkohtainen vinkki.',
      readLabel: 'Lue lisää',
    },
    {
      to: '/practical-info',
      eyebrow: 'Ensikertalainen Lapissa?',
      title: 'Sää, viisumi, kulkuyhteydet, pakkauslista',
      body: 'Talvella −30 °C alaraja, ETIAS-säännöt loppuvuodesta 2026, kuusi tietoa ennen varausta.',
      readLabel: 'Lue lisää',
    },
  ],
  de: [
    {
      to: '/age-guide',
      eyebrow: 'Reisen Sie mit Kindern?',
      title: 'Welche Lappland-Touren für welches Alter',
      body: 'Eine praxisnahe Matrix Alter × Aktivität vom Säugling bis 16+, dazu Hinweise je Reiseveranstalter.',
      readLabel: 'Lesen',
    },
    {
      to: '/practical-info',
      eyebrow: 'Zum ersten Mal in Lappland?',
      title: 'Klima, Visum, Transport, Packliste',
      body: 'Im Winter bis −30 °C, ETIAS ab Ende 2026, sechs Punkte vor der Buchung.',
      readLabel: 'Lesen',
    },
  ],
  ja: [
    {
      to: '/age-guide',
      eyebrow: 'お子様との旅行ですか?',
      title: 'どのラップランドのアクティビティが何歳から楽しめるか',
      body: '乳児から16歳以上まで、年齢×アクティビティの実用マトリクスとツアー会社ごとの目安。',
      readLabel: '読む',
    },
    {
      to: '/practical-info',
      eyebrow: 'ラップランドは初めてですか?',
      title: '気候、ビザ、交通、持ち物',
      body: '冬は−30°Cまで下がり、2026年末からETIAS、予約前に押さえておきたい6つのポイント。',
      readLabel: '読む',
    },
  ],
  ko: [
    {
      to: '/age-guide',
      eyebrow: '아이와 함께 여행하시나요?',
      title: '어떤 라플란드 액티비티가 어느 연령에 맞을까요',
      body: '영유아부터 16세 이상까지, 연령 × 액티비티 실용 매트릭스와 운영사별 가이드.',
      readLabel: '읽어보기',
    },
    {
      to: '/practical-info',
      eyebrow: '라플란드가 처음이신가요?',
      title: '기후, 비자, 교통, 짐 싸기',
      body: '겨울 최저 −30°C, 2026년 말 시행되는 ETIAS 규정, 예약 전 알아야 할 여섯 가지.',
      readLabel: '읽어보기',
    },
  ],
  fr: [
    {
      to: '/age-guide',
      eyebrow: 'Vous voyagez avec des enfants ?',
      title: 'Quelles activités en Laponie selon l\'âge',
      body: 'Une matrice pratique âge × activité, du nourrisson aux 16 ans et plus, avec des repères par voyagiste.',
      readLabel: 'Lire',
    },
    {
      to: '/practical-info',
      eyebrow: 'Première fois en Laponie ?',
      title: 'Climat, visa, transport, bagages',
      body: 'Plancher à −30 °C en hiver, règles ETIAS à partir de fin 2026, six points à connaître avant de réserver.',
      readLabel: 'Lire',
    },
  ],
  it: [
    {
      to: '/age-guide',
      eyebrow: 'Viaggia con bambini ?',
      title: 'Quali attività in Lapponia per quale età',
      body: 'Una matrice pratica età × attività, da neonati a 16+ anni, con indicazioni per operatore.',
      readLabel: 'Leggi',
    },
    {
      to: '/practical-info',
      eyebrow: 'Prima volta in Lapponia ?',
      title: 'Clima, visto, trasporti, bagaglio',
      body: 'Minima invernale di −30 °C, regole ETIAS dalla fine del 2026, sei cose da sapere prima di prenotare.',
      readLabel: 'Leggi',
    },
  ],
  nl: [
    {
      to: '/age-guide',
      eyebrow: 'Reist u met kinderen?',
      title: 'Welke Lapland-activiteiten passen bij welke leeftijd',
      body: 'Een praktische leeftijd × activiteit-matrix van baby tot 16+, met aanwijzingen per reisorganisatie.',
      readLabel: 'Lezen',
    },
    {
      to: '/practical-info',
      eyebrow: 'Voor het eerst in Lapland?',
      title: 'Klimaat, visum, vervoer, inpakken',
      body: 'Wintervloer −30 °C, ETIAS-regels vanaf eind 2026, zes punten om te weten vóór het boeken.',
      readLabel: 'Lezen',
    },
  ],
  sv: [
    {
      to: '/age-guide',
      eyebrow: 'Reser du med barn?',
      title: 'Vilka aktiviteter i Lappland passar vilken ålder',
      body: 'En praktisk matris ålder × aktivitet, från spädbarn till 16+, plus vägledning per arrangör och ålder.',
      readLabel: 'Läs mer',
    },
    {
      to: '/practical-info',
      eyebrow: 'Första gången i Lappland?',
      title: 'Klimat, visum, transport, packning',
      body: 'Ner till −30 °C på vintern, ETIAS-regler från slutet av 2026, sex saker att veta innan du bokar.',
      readLabel: 'Läs mer',
    },
  ],
  es: [
    {
      to: '/age-guide',
      eyebrow: '¿Viaja con niños?',
      title: 'Qué actividades de Laponia funcionan a cada edad',
      body: 'Una matriz práctica de edad × actividad, de bebés a mayores de 16 años, con orientación por operador.',
      readLabel: 'Leer',
    },
    {
      to: '/practical-info',
      eyebrow: '¿Primera vez en Laponia?',
      title: 'Clima, visados, transporte, equipaje',
      body: 'Mínimas de −30 °C en invierno, normas ETIAS desde finales de 2026, seis cosas que saber antes de reservar.',
      readLabel: 'Leer',
    },
  ],
  'pt-BR': [
    {
      to: '/age-guide',
      eyebrow: 'Vai viajar com crianças?',
      title: 'Quais atividades da Lapônia funcionam em cada idade',
      body: 'Uma matriz prática de idade × atividade, de bebês a maiores de 16 anos, com orientação por operadora.',
      readLabel: 'Ler',
    },
    {
      to: '/practical-info',
      eyebrow: 'Primeira vez na Lapônia?',
      title: 'Clima, vistos, transporte, bagagem',
      body: 'Mínimas de −30 °C no inverno, regras do ETIAS a partir do fim de 2026, seis coisas para saber antes de reservar.',
      readLabel: 'Ler',
    },
  ],
  'zh-CN': [
    {
      to: '/age-guide',
      eyebrow: '带孩子出行？',
      title: '哪些拉普兰活动适合哪个年龄',
      body: '一份实用的年龄 × 活动对照表，从婴儿到 16 岁以上，并附按运营商划分的建议。',
      readLabel: '阅读',
    },
    {
      to: '/practical-info',
      eyebrow: '第一次来拉普兰？',
      title: '气候、签证、交通、行李打包',
      body: '冬季最低 −30 °C，2026 年底起实施的 ETIAS 规定，预订前要了解的六件事。',
      readLabel: '阅读',
    },
  ],
};

export default function SectionTeasers() {
  const lang = useLang();
  const to = useLocalePath();
  const items = ITEMS[copyLang(lang)];

  return (
    <section className="bg-deeper-night py-16 sm:py-20">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10 grid sm:grid-cols-2 gap-x-12 gap-y-12">
        {items.map((it) => (
          <Link
            key={it.to}
            to={to(it.to)}
            className="group block border-t border-white/15 pt-6 hover:border-vibe-pink transition-colors"
          >
            <p className="cap-meta">{it.eyebrow}</p>
            <h3 className="mt-3 font-heading tracking-wide text-snow group-hover:text-vibe-pink text-3xl sm:text-4xl leading-[1.05] transition-colors [text-wrap:balance]">
              {it.title}
            </h3>
            <p className="mt-3 text-snow/80 font-body text-[15px] leading-relaxed max-w-md">
              {it.body}
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-snow/85 group-hover:text-vibe-pink font-body text-sm transition-colors">
              {it.readLabel} <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
