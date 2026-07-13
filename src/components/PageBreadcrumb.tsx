import Breadcrumbs from '../shared/Breadcrumbs';
import { useLang, useLocalePath, type Lang } from '../i18n/useLang';

// Short localized crumb labels for each CONTENT subpage (logical path → label).
// Mirrors Nav's concise wording; legal pages are intentionally omitted (no crumb).
const BC_LABELS: Record<Lang, Record<string, string>> = {
  en: { '/lapland-holidays': 'Operators', '/practical-info': 'Practical info', '/age-guide': 'Age guide', '/design-tour': 'Custom tour' },
  fi: { '/lapland-holidays': 'Matkanjärjestäjät', '/practical-info': 'Käytännön tieto', '/age-guide': 'Ikäopas', '/design-tour': 'Räätälöity matka' },
  de: { '/lapland-holidays': 'Reiseveranstalter', '/practical-info': 'Praktische Hinweise', '/age-guide': 'Alters-Guide', '/design-tour': 'Individuelle Reise' },
  ja: { '/lapland-holidays': 'ツアー会社', '/practical-info': '実用情報', '/age-guide': '年齢別ガイド', '/design-tour': 'カスタムツアー' },
  es: { '/lapland-holidays': 'Operadoras', '/practical-info': 'Información práctica', '/age-guide': 'Guía por edad', '/design-tour': 'Tour personalizado' },
  'pt-BR': { '/lapland-holidays': 'Operadoras', '/practical-info': 'Informações práticas', '/age-guide': 'Guia por idade', '/design-tour': 'Tour personalizado' },
  'zh-CN': { '/lapland-holidays': '旅行社', '/practical-info': '实用信息', '/age-guide': '年龄指南', '/design-tour': '定制旅行团' },
  ko: { '/lapland-holidays': '투어 운영사', '/practical-info': '실용 정보', '/age-guide': '연령별 가이드', '/design-tour': '맞춤 투어' },
  fr: { '/lapland-holidays': 'Opérateurs', '/practical-info': 'Infos pratiques', '/age-guide': 'Guide par âge', '/design-tour': 'Forfait sur mesure' },
  it: { '/lapland-holidays': 'Operatori', '/practical-info': 'Info pratiche', '/age-guide': 'Guida per età', '/design-tour': 'Pacchetto su misura' },
  nl: { '/lapland-holidays': 'Touroperators', '/practical-info': 'Praktische info', '/age-guide': 'Leeftijdsgids', '/design-tour': 'Maatwerk-rondreis' },
  sv: { '/lapland-holidays': 'Researrangörer', '/practical-info': 'Praktisk info', '/age-guide': 'Åldersguide', '/design-tour': 'Skräddarsydd resa' },
};

/**
 * Ecosystem breadcrumb, rendered BELOW the hero (mounted once after each
 * subpage's hero <section>) so it reads as the first line of page content
 * instead of a bar wedged between the nav and the hero. Self-hides on home +
 * unmapped routes (shared/Breadcrumbs returns null there), so it can be mounted
 * unconditionally.
 */
export default function PageBreadcrumb() {
  const lang = useLang();
  const to = useLocalePath();
  return (
    <Breadcrumbs
      lang={lang}
      to={to}
      labelMap={BC_LABELS[lang]}
      className="bg-deep-night text-snow border-b border-white/10"
      accentClassName="hover:text-vibe-pink hover:opacity-100"
    />
  );
}
