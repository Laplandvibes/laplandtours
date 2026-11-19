import { Mountain } from 'lucide-react'
import type { RailPartner } from '../ProductRail'

// Scandinavian Outdoor — Adtraction. Copy follows the COPY RULES in ProductRail.tsx:
// one-clause headline, one-sentence sub, and nothing claimed that the feed
// or the advertiser's own page does not support. Finnish and English only —
// the rail renders nothing in a locale it has no copy for, which is the
// honest outcome for a Finland-market shop.
//
// The English "see the full range" link goes to the same Finland-market shop:
// scandinavianoutdoor.fi has no /en/ path (404 on 19.11.2026), and its
// English site is a separate domain (scandinavianoutdoor.com) outside this
// Adtraction channel.
const scandinavianoutdoor: RailPartner = {
  key: 'scandinavianoutdoor',
  categoryUrl: {
    fi: "https://scandinavianoutdoor.fi/",
    en: "https://scandinavianoutdoor.fi/",
  },
  accent: '#1F5F4B',
  accentDark: '#7FC0A8',
  icon: Mountain,
  copy: {
    fi: {
      eyebrow: "Scandinavian Outdoor",
      headline: "Varusteet pohjoiseen talveen",
      sub: "Ulkoilutakkeja, aluskerrastoja ja talvikenkiä Columbialta, Haltilta ja Raiskilta.",
      from: 'alk.',
      ctaAll: "Katso koko valikoima",
      note: "Hinnat tarkistettu {date}. Ajantasainen hinta ja koot näkyvät Scandinavian Outdoorin sivulla.",
    },
    en: {
      eyebrow: "Scandinavian Outdoor",
      headline: "Kit for a northern winter",
      sub: "Jackets, base layers and winter boots from Columbia, Halti and Raiski.",
      from: 'from',
      ctaAll: "See the full range",
      note: "Prices checked {date}. Current price and sizes are shown on Scandinavian Outdoor’s own page.",
    },
  },
}

export default scandinavianoutdoor
