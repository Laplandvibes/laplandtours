import { Users, ArrowUpRight } from 'lucide-react';
import AffiliateCTA from './AffiliateCTA';
import { useLang } from '../i18n/useLang';

/**
 * MatkapojatGroupTrips — the one Finnish package-trip partner this site can
 * honestly offer today (Vesa 11.9.2026: "pitää löytää affiliate sopivia
 * matkoja sinne, matkapörssi ehkä, matkapojat?").
 *
 * What the partner actually sells for Lapland (read from matkapojat.fi
 * 2026-09-11): four GROUP trips under /ryhmat/ — bus, hotel and a programme
 * suggestion, priced as a quote per group. Their only individual Lapland
 * departure (Patikkamatka Kilpisjärvi) left on 2.9.2026 with no next date
 * listed, so it is deliberately NOT here — a trip with no bookable date is
 * not an offer. Matkapörssi was checked too: no Lapland product at all.
 *
 * FI-only by construction: the Adtraction programme is a Finnish programme
 * (3.1 % of sale) and every landing page is Finnish. Other locales render
 * nothing. Deep links pass through the Worker (`/go/matkapojat?dest=`) and
 * were measured landing on the product page with the `at_gd` cookie set.
 *
 * No prices, no dates, no "what's included" beyond what their page says:
 * the title is theirs, the promise is theirs.
 */

const TRIPS: Array<{ sid: string; title: string; area: string; url: string }> = [
  {
    sid: 'matkapojat_olos',
    title: 'Aitoa Lapin tunnelmaa: Olos',
    area: 'Länsi-Lappi · Muonio',
    url: 'https://www.matkapojat.fi/ryhmat/kotimaa/pohjois-suomi/lapin-tunnelmaa-olos-ryhmille',
  },
  {
    sid: 'matkapojat_inarinmaa',
    title: 'Inarinmaan elämysmatka',
    area: 'Pohjois-Lappi · Inari',
    url: 'https://www.matkapojat.fi/ryhmat/kotimaa/pohjois-suomi/inarinmaa-elamysmatka-ryhmat',
  },
  {
    sid: 'matkapojat_levi_tyhy',
    title: 'Työhyvinvointimatka Leville',
    area: 'Tunturi-Lappi · Kittilä',
    url: 'https://www.matkapojat.fi/ryhmat/kokous-ja-tyohyvinvointi/tyohyvinvointi/tyohyvinvointi-leville',
  },
  {
    sid: 'matkapojat_ruka',
    title: 'Hotellimatka Ruka–Kuusamo',
    area: 'Koillismaa · Kuusamo',
    url: 'https://www.matkapojat.fi/ryhmat/kotimaa/pohjois-suomi/hotellimatka-ruka-kuusamo',
  },
];

const COPY = {
  eyebrow: 'Kumppanuuslinkki · Matkapojat',
  h2: 'Ryhmän Lapin matka yhdeltä luukulta',
  lead:
    'Yhdistys, työporukka vai luokka? Matkapojat kokoaa ryhmälle bussikuljetuksen, hotellin ja retkiohjelman ja hinnoittelee matkan ryhmän koon ja ajankohdan mukaan. Neljä Lapin-kohdetta on valmiina, tarjous pyydetään heiltä.',
  tag: 'Ryhmille',
  cta: 'Katso matka Matkapojilla',
  note: 'Hinta ja matkan sisältö ovat Matkapojan sivulla, eivät täällä. Linkit kulkevat kumppanuusohjelman kautta; se ei muuta hintaa.',
};

export default function MatkapojatGroupTrips() {
  const lang = useLang();
  if (lang !== 'fi') return null;

  return (
    <section id="ryhmalle" className="bg-deeper-night py-16 sm:py-24">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
        <header className="lg:col-span-4">
          <p className="cap-meta">{COPY.eyebrow}</p>
          <h2 className="mt-2 font-heading tracking-wide leading-[0.95] text-snow text-4xl sm:text-5xl [text-wrap:balance]">
            {COPY.h2}
          </h2>
          <p className="mt-5 text-snow/70 font-body text-base sm:text-lg leading-relaxed max-w-md">
            {COPY.lead}
          </p>
          <p className="mt-6 text-snow/50 font-body text-[13px] leading-relaxed max-w-md">
            {COPY.note}
          </p>
        </header>

        <ul className="lg:col-span-8 lg:col-start-5 border-t border-white/10">
          {TRIPS.map((t) => (
            <li key={t.sid} className="border-b border-white/10">
              <AffiliateCTA
                partner="matkapojat"
                sid={t.sid}
                destination={t.url}
                className="group flex items-center gap-4 sm:gap-6 py-4 sm:py-5 hover:bg-white/[0.03] transition-colors -mx-3 px-3"
              >
                <span
                  className="flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
                  style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.30)' }}
                >
                  <Users className="w-4 h-4 text-arctic-cyan" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-heading tracking-wide text-snow text-xl sm:text-2xl leading-tight group-hover:text-vibe-pink transition-colors">
                    {t.title}
                  </span>
                  <span className="block mt-0.5 text-snow/65 font-body text-[14px] sm:text-[15px]">
                    {t.area}
                  </span>
                </span>
                <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-snow/60 whitespace-nowrap shrink-0">
                  {COPY.tag}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[13px] font-body font-medium text-arctic-cyan group-hover:text-vibe-pink transition-colors shrink-0">
                  {COPY.cta}
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <ArrowUpRight className="sm:hidden w-4 h-4 text-arctic-cyan shrink-0" strokeWidth={1.6} aria-hidden="true" />
              </AffiliateCTA>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
