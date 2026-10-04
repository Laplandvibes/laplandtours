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

/** Openly licensed photo (Wikimedia Commons): author + licence with links, as CC BY / BY-SA
 *  require (4.10.2026, winter heroes). Author and licence name exactly as on the file page. */
export type OpenCredit = { author: string; license: string; licenseUrl: string; sourceUrl: string };

export default function PhotoCredit({
  taken,
  place,
  credit,
  className = '',
}: {
  /** ISO date of the shot, e.g. '2026-07-19'. */
  taken: string;
  /** Place name — a proper noun, identical in every locale. */
  place?: string;
  /** Someone else's openly licensed photo: replaces "LaplandVibes" with the author + licence links. */
  credit?: OpenCredit;
  className?: string;
}) {
  const lang = useLang();
  const bcp47 = useHtmlLang();
  const d = new Date(`${taken}T12:00:00Z`);
  const when = new Intl.DateTimeFormat(bcp47, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d);
  const label = LABEL[copyLang(lang)];
  if (credit) {
    // Same prefix as our own photos ("Photo: ", "Kuva: ", "写真：" …), then the author and the licence.
    const prefix = label.slice(0, label.length - 'LaplandVibes'.length);
    return (
      <p className={`font-mono text-[11px] tracking-[0.06em] text-snow/70 ${className}`}>
        {prefix}
        <a href={credit.sourceUrl} target="_blank" rel="noopener" className="lv-tap underline decoration-snow/40 underline-offset-2 hover:text-snow">{credit.author}</a>
        {' · '}
        <a href={credit.licenseUrl} target="_blank" rel="license noopener" className="lv-tap whitespace-nowrap underline decoration-snow/40 underline-offset-2 hover:text-snow">{credit.license}</a>
        {' · '}{when}
        {place ? ` · ${place}` : ''}
      </p>
    );
  }
  return (
    <p className={`font-mono text-[11px] tracking-[0.06em] text-snow/55 ${className}`}>
      {label} · {when}
      {place ? ` · ${place}` : ''}
    </p>
  );
}
