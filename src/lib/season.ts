/**
 * Kausikuvan vaihto — talvi 1.10.–30.4., kesä 1.5.–30.9. (4.10.2026).
 *
 * Sama sääntö ja samat päivät kuin muualla verkostossa (laplandwellness ja laplandcarrental `src/lib/season.ts`)
 * ja kuin sivustokortin og-summer/og-winter-vaihto, joten etusivu ja jakokuva vaihtuvat samana päivänä.
 * Arvioidaan KÄVIJÄN selaimessa (sivusto renderöidään createRootilla, esirender on vain tekstiä),
 * joten kuva vaihtuu joka vuosi ilman uutta buildia. Ainoa build-hetken arvo on herokuvan
 * esilataus (scripts/hero-preload.mjs), joka käyttää samaa sääntöä buildin päivämäärällä.
 *
 * 🔴 Vesa 4.10.2026: talvella ei kesä- eikä ruskakuvaa sivun pääkuvaksi. Kesäkuva palaa 1.5.
 */
export const isSummerSeason = (d: Date = new Date()): boolean => {
  const m = d.getMonth() + 1 // 1–12
  return m >= 5 && m <= 9
}

export const seasonal = <T,>(winter: T, summer: T): T => (isSummerSeason() ? summer : winter)
