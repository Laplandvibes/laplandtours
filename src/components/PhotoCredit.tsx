import { useLang, useHtmlLang, type CopyLang, copyLang } from '../i18n/useLang';

/**
 * Photo credit with the month the picture was taken.
 *
 * 2026-09-12, Vesa: "kesä kuva ja -30 luku hero osiossa?" and "takana
 * vesipark ja puhutaan igluista?" — our own photo pool is entirely from July
 * 2026, so a summer picture under winter copy reads as a mistake. Two things
 * fix that: the copy stops claiming winter over a summer photo, and the photo
 * says out loud when it was taken. A reader who sees "July 2026" is not being
 * misled; one who sees green trees next to −30 °C is.
 *
 * The month comes from Intl, so this is 12 short labels, not 12 × 12 strings.
 */
const LABEL: Record<CopyLang, string> = {
  en: 'Photo: LaplandVibes',
  fi: 'Kuva: LaplandVibes',
  de: 'Foto: LaplandVibes',
  ja: '写真：LaplandVibes',
  ko: '사진: LaplandVibes',
  fr: 'Photo : LaplandVibes',
  it: 'Foto: LaplandVibes',
  nl: 'Foto: LaplandVibes',
  sv: 'Foto: LaplandVibes',
  es: 'Foto: LaplandVibes',
  'pt-BR': 'Foto: LaplandVibes',
  'zh-CN': '摄影：LaplandVibes',
};

export default function PhotoCredit({
  taken,
  place,
  className = '',
}: {
  /** ISO date of the shot, e.g. '2026-07-19'. */
  taken: string;
  /** Place name — a proper noun, identical in every locale. */
  place?: string;
  className?: string;
}) {
  const lang = useLang();
  const bcp47 = useHtmlLang();
  const d = new Date(`${taken}T12:00:00Z`);
  const when = new Intl.DateTimeFormat(bcp47, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
  return (
    <p className={`font-mono text-[11px] tracking-[0.06em] text-snow/55 ${className}`}>
      {LABEL[copyLang(lang)]} · {when}
      {place ? ` · ${place}` : ''}
    </p>
  );
}
