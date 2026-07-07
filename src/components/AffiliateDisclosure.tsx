import { Info } from 'lucide-react';
import { useLang, type Lang } from '../i18n/useLang';

interface AffiliateDisclosureProps {
  /** Optional override; if omitted, the current route locale is used. */
  lang?: Lang;
  className?: string;
  variant?: 'compact' | 'full';
}

const TEXT: Record<Lang, { compact: string; full: string }> = {
  fi: {
    compact:
      'Sivu sisältää kumppanuuslinkkejä. Varauksista voidaan saada pieni provisio ilman lisäkustannuksia sinulle.',
    full: 'Tämä sivu sisältää kumppanuuslinkkejä. Kun varaat näiden kautta, #LaplandTours voi saada pienen provision ilman lisäkustannuksia sinulle. Kumppanuussuhteet eivät vaikuta toimitukselliseen sisältöön.',
  },
  en: {
    compact: 'Affiliate links. A small commission may be earned on bookings, at no extra cost to you.',
    full: 'This page contains affiliate links. If you book through these links, #LaplandTours may receive a commission at no extra cost to you. Affiliate relationships do not influence editorial coverage.',
  },
  de: {
    compact:
      'Partnerlinks. Bei einer Buchung kann eine geringe Provision anfallen, ohne Mehrkosten für Sie.',
    full: 'Diese Seite enthält Partnerlinks. Bei einer Buchung über diese Links erhält #LaplandTours möglicherweise eine Provision, ohne dass Ihnen dadurch Mehrkosten entstehen. Diese Geschäftsbeziehungen beeinflussen die redaktionelle Berichterstattung nicht.',
  },
  ja: {
    compact: 'アフィリエイトリンクを含みます。ご予約に対し、お客様への追加料金なしで少額の手数料が支払われる場合があります。',
    full: 'このページにはアフィリエイトリンクが含まれます。これらのリンク経由でご予約いただいた場合、お客様への追加料金なしで#LaplandToursに手数料が支払われる場合があります。アフィリエイト関係が編集内容に影響を与えることはありません。',
  },
  es: {
    compact: 'Enlaces de afiliados. Puede generarse una pequeña comisión por las reservas, sin coste adicional para usted.',
    full: 'Esta página contiene enlaces de afiliados. Si reserva a través de estos enlaces, #LaplandTours puede recibir una comisión sin coste adicional para usted. Las relaciones de afiliación no influyen en la cobertura editorial.',
  },
  'pt-BR': {
    compact: 'Links de afiliados. Uma pequena comissão pode ser gerada nas reservas, sem custo adicional para você.',
    full: 'Esta página contém links de afiliados. Se você reservar por meio destes links, a #LaplandTours pode receber uma comissão sem custo adicional. As relações de afiliação não influenciam a cobertura editorial.',
  },
  'zh-CN': {
    compact: '联盟链接。预订时可能产生少量佣金,您无需支付额外费用。',
    full: '本页面包含联盟链接。如果您通过这些链接预订,#LaplandTours 可能会获得佣金,您无需支付额外费用。联盟关系不会影响编辑内容。',
  },
  ko: {
    compact: '제휴 링크. 예약 시 추가 비용 없이 소액의 수수료가 발생할 수 있습니다.',
    full: '이 페이지에는 제휴 링크가 포함되어 있습니다. 이 링크를 통해 예약하시면 #LaplandTours가 추가 비용 없이 수수료를 받을 수 있습니다. 제휴 관계는 편집 내용에 영향을 주지 않습니다.',
  },
  fr: {
    compact: 'Liens d’affiliation. Une petite commission peut être générée sur les réservations, sans coût supplémentaire pour vous.',
    full: 'Cette page contient des liens d’affiliation. Si vous réservez via ces liens, #LaplandTours peut recevoir une commission sans coût supplémentaire pour vous. Les relations d’affiliation n’influencent pas le contenu éditorial.',
  },
  it: {
    compact: 'Link di affiliazione. Una piccola commissione può essere generata sulle prenotazioni, senza costi aggiuntivi per te.',
    full: 'Questa pagina contiene link di affiliazione. Se prenoti tramite questi link, #LaplandTours potrebbe ricevere una commissione senza costi aggiuntivi per te. Le relazioni di affiliazione non influenzano i contenuti editoriali.',
  },
  nl: {
    compact: 'Affiliatielinks. Een kleine commissie kan worden verdiend op boekingen, zonder extra kosten voor jou.',
    full: 'Deze pagina bevat affiliatielinks. Als je via deze links boekt, kan #LaplandTours een commissie ontvangen zonder extra kosten voor jou. Affiliatierelaties beïnvloeden de redactionele inhoud niet.',
  },
};

export default function AffiliateDisclosure({
  lang: langProp,
  className = '',
  variant = 'full',
}: AffiliateDisclosureProps) {
  const routeLang = useLang();
  const lang = langProp ?? routeLang;
  const text = TEXT[lang][variant];
  return (
    <p
      className={`flex items-center justify-center gap-2 text-xs text-snow/80 ${className}`}
      role="note"
    >
      <Info className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>{text}</span>
    </p>
  );
}
