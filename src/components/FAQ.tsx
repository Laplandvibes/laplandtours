/**
 * Reader Q&A — inline editorial flow, no accordion. Questions are H3
 * headlines, answers flow below as normal magazine paragraphs.
 */
import { useLang, type CopyLang, copyLang } from '../i18n/useLang';

export interface Faq {
  q: string;
  a: string;
  aHtml: string;
}

const FAQS_EN: Faq[] = [
  {
    q: 'What is typically included in a Lapland package?',
    a: 'Most all-inclusive packages from operators like Inghams, Transun and TUI include return flights, airport transfers, accommodation, breakfast and dinner, thermal clothing hire, guided activities and an English-speaking guide.',
    aHtml:
      'Most all-inclusive packages from operators like <a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> and <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> include return flights, airport transfers, accommodation, breakfast and dinner, thermal clothing hire, guided activities and an English-speaking guide.',
  },
  {
    q: 'When is the best time to see the Northern Lights?',
    a: 'The aurora borealis season runs from September to March, with peak activity between November and February. Finnish Lapland, particularly Inari, Saariselkä and Muonio, is one of the best places on Earth to see them.',
    aHtml:
      'The aurora borealis season runs from September to March, with peak activity between November and February. Finnish Lapland, particularly <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari, Saariselkä and Muonio</a>, is one of the best places on Earth to see them.',
  },
  {
    q: 'How cold is it in Lapland?',
    a: 'Winter temperatures range from −5 °C to −30 °C. All package operators provide thermal overalls, boots and gloves. See the practical info guide for packing tips and layering advice.',
    aHtml:
      'Winter temperatures range from −5 °C to −30 °C. All package operators provide thermal overalls, boots and gloves. See the <a href="/practical-info" class="text-vibe-pink hover:underline">practical info guide</a> for packing tips and layering advice.',
  },
  {
    q: 'Are the packages suitable for children?',
    a: "Yes, operators like Santa's Lapland and TUI specialise in family packages. Most activities suit children aged 3+. See the age guide for detailed recommendations.",
    aHtml:
      'Yes, operators like <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> and TUI specialise in family packages. Most activities suit children aged 3+. See the <a href="/age-guide" class="text-vibe-pink hover:underline">age guide</a> for detailed recommendations.',
  },
  {
    q: 'How do I get to Lapland?',
    a: 'Most operators fly from UK and European cities to Rovaniemi (RVN), Kittilä (KTT) or Ivalo (IVL) airports. You can also fly via Helsinki with Finnair.',
    aHtml:
      'Most operators fly from UK and European cities to Rovaniemi (RVN), Kittilä (KTT) or Ivalo (IVL) airports. You can also fly via Helsinki with Finnair. See <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a> for all travel options including trains and car rental.',
  },
  {
    q: 'Where should I stay?',
    a: 'Lapland has glass igloos, log cabins, hotels and unique snow hotels. Popular bases include Rovaniemi, Levi, Saariselkä and Luosto.',
    aHtml:
      'Lapland has glass igloos, log cabins, hotels and unique snow hotels. Popular bases include Rovaniemi, Levi, Saariselkä and Luosto. Browse accommodation on <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> or <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>.',
  },
  {
    q: 'What activities are available?',
    a: 'Popular activities include husky safaris, snowmobile tours, reindeer rides, Northern Lights hunting, skiing, ice fishing and Santa Claus Village visits.',
    aHtml:
      'Popular activities include <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">husky safaris</a>, <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">snowmobile tours</a>, reindeer rides, Northern Lights hunting, <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">skiing</a>, ice fishing and Santa Claus Village visits.',
  },
  {
    q: 'Do I need a visa to travel to Finland?',
    a: 'EU/EEA citizens need only a valid passport or national ID. UK, US, Canadian and Australian citizens can visit visa-free for up to 90 days within the Schengen area.',
    aHtml:
      'EU/EEA citizens need only a valid passport or national ID. UK, US, Canadian and Australian citizens can visit visa-free for up to 90 days within the Schengen area. Check <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a> for other nationalities.',
  },
];

const FAQS_FI: Faq[] = [
  {
    q: 'Mitä Lapin matkapakettiin yleensä kuuluu?',
    a: 'Useimmissa kaiken kattavissa paketeissa (Inghams, Transun, TUI) on lennot edestakaisin, kentältä siirtokuljetus, majoitus, aamiainen ja illallinen, lämpöhaalareiden vuokraus, opastetut päiväretket ja englanninkielinen opas.',
    aHtml:
      'Useimmissa kaiken kattavissa matkapaketeissa (kuten <a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> ja <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a>) sisältyy lennot edestakaisin, kentältä siirtokuljetus, majoitus, aamiainen ja illallinen, lämpöhaalareiden vuokraus, opastetut päiväretket ja englanninkielinen opas.',
  },
  {
    q: 'Milloin revontulet näkyvät parhaiten?',
    a: 'Revontulikausi kestää syyskuusta maaliskuuhun, huippu marraskuun ja helmikuun välillä. Suomen Lappi, erityisesti Inari, Saariselkä ja Muonio, on yksi maailman parhaista paikoista nähdä ne.',
    aHtml:
      'Revontulikausi kestää syyskuusta maaliskuuhun, huippu marraskuun ja helmikuun välillä. Suomen Lappi, erityisesti <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari, Saariselkä ja Muonio</a>, on yksi maailman parhaista paikoista nähdä revontulia.',
  },
  {
    q: 'Kuinka kylmää Lapissa on?',
    a: 'Talvella lämpötila vaihtelee −5 °C:n ja −30 °C:n välillä. Kaikki matkanjärjestäjät tarjoavat lämpöhaalarit, saappaat ja hanskat. Lisätietoa pakkauslistasta käytännön oppaassa.',
    aHtml:
      'Talvella lämpötila vaihtelee −5 °C:n ja −30 °C:n välillä. Kaikki matkanjärjestäjät tarjoavat lämpöhaalarit, saappaat ja hanskat. Tutustu <a href="/fi/practical-info" class="text-vibe-pink hover:underline">käytännön oppaaseen</a> pakkauslistaa ja kerrostuspukeutumista varten.',
  },
  {
    q: 'Sopivatko paketit lapsille?',
    a: "Sopivat, sillä Santa's Lapland ja TUI ovat erikoistuneet perhepaketteihin. Suurin osa retkistä sopii 3 vuotta täyttäneille. Lue ikäkohtainen opas yksityiskohtia varten.",
    aHtml:
      'Sopivat, sillä esimerkiksi <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> ja TUI ovat erikoistuneet perhepaketteihin. Suurin osa retkistä sopii 3 vuotta täyttäneille. Lue <a href="/fi/age-guide" class="text-vibe-pink hover:underline">ikäkohtainen opas</a> yksityiskohtia varten.',
  },
  {
    q: 'Miten Lappiin pääsee?',
    a: 'Useimmat matkanjärjestäjät lentävät Brittein saarilta ja Euroopasta Rovaniemen (RVN), Kittilän (KTT) tai Ivalon (IVL) kentälle. Helsingin kautta lennot myös Finnairilla.',
    aHtml:
      'Useimmat matkanjärjestäjät lentävät Brittein saarilta ja Euroopasta Rovaniemen (RVN), Kittilän (KTT) tai Ivalon (IVL) kentälle. Helsingin kautta lennot myös Finnairilla. Katso kaikki matkavaihtoehdot, junat ja vuokra-autot mukaan lukien, sivustolta <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a>. target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a>:sta.',
  },
  {
    q: 'Mihin majoittua?',
    a: 'Lapissa on lasi-igluja, hirsihuviloita, hotelleja ja lumihotelleja. Suosittuja keskuksia ovat Rovaniemi, Levi, Saariselkä ja Luosto.',
    aHtml:
      'Lapissa on lasi-igluja, hirsihuviloita, hotelleja ja lumihotelleja. Suosittuja keskuksia ovat Rovaniemi, Levi, Saariselkä ja Luosto. Selaa majoitusta sivustoilla <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> ja <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>.',
  },
  {
    q: 'Mitä retkiä Lapissa on tarjolla?',
    a: 'Suosittuja päiväretkiä: huskysafari, kelkkasafarit, pororetket, revontuliretket, hiihto, pilkkiminen ja vierailu Joulupukin Pajakylässä.',
    aHtml:
      'Suosittuja päiväretkiä: <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">huskysafari</a>, <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">kelkkasafarit</a>, pororetket, revontuliretket, <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">hiihto</a>, pilkkiminen ja vierailu Joulupukin Pajakylässä.',
  },
  {
    q: 'Tarvitaanko Suomeen viisumia?',
    a: 'EU/ETA-kansalaisilla riittää voimassa oleva passi tai henkilökortti. Britannian, Yhdysvaltain, Kanadan ja Australian kansalaiset voivat oleskella ilman viisumia 90 päivää Schengen-alueella.',
    aHtml:
      'EU/ETA-kansalaisilla riittää voimassa oleva passi tai henkilökortti. Britannian, Yhdysvaltain, Kanadan ja Australian kansalaiset voivat oleskella ilman viisumia 90 päivää Schengen-alueella. Muut kansallisuudet: katso <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>.',
  },
];

const FAQS_DE: Faq[] = [
  {
    q: 'Was ist in einem Lappland-Reisepaket üblicherweise enthalten?',
    a: 'Die meisten All-inclusive-Pakete von Reiseveranstaltern wie Inghams, Transun und TUI enthalten Hin- und Rückflüge, Transfers, Unterkunft, Frühstück und Abendessen, Thermokleidung, geführte Tagestouren und einen englischsprachigen Reiseleiter.',
    aHtml:
      'Die meisten All-inclusive-Pakete von Reiseveranstaltern wie <a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> und <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> enthalten Hin- und Rückflüge, Transfers, Unterkunft, Frühstück und Abendessen, Thermokleidung, geführte Tagestouren und einen englischsprachigen Reiseleiter.',
  },
  {
    q: 'Wann sieht man Polarlichter am besten?',
    a: 'Die Polarlicht-Saison reicht von September bis März, Höhepunkt zwischen November und Februar. Finnisch-Lappland, insbesondere Inari, Saariselkä und Muonio, gehört zu den weltweit besten Beobachtungsorten.',
    aHtml:
      'Die Polarlicht-Saison reicht von September bis März, Höhepunkt zwischen November und Februar. Finnisch-Lappland, insbesondere <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari, Saariselkä und Muonio</a>, gehört zu den weltweit besten Beobachtungsorten.',
  },
  {
    q: 'Wie kalt ist es in Lappland?',
    a: 'Die Wintertemperaturen liegen zwischen −5 °C und −30 °C. Alle Reiseveranstalter stellen Thermokleidung, Stiefel und Handschuhe. Hinweise zum Packen finden Sie im Praxis-Guide.',
    aHtml:
      'Die Wintertemperaturen liegen zwischen −5 °C und −30 °C. Alle Reiseveranstalter stellen Thermokleidung, Stiefel und Handschuhe. Hinweise zum Packen und zum Zwiebelprinzip finden Sie im <a href="/de/practical-info" class="text-vibe-pink hover:underline">Praxis-Guide</a>.',
  },
  {
    q: 'Sind die Pakete für Kinder geeignet?',
    a: "Ja, Reiseveranstalter wie Santa's Lapland und TUI haben sich auf Familienreisen spezialisiert. Die meisten Tagestouren eignen sich ab 3 Jahren. Detaillierte Hinweise finden Sie im Alters-Guide.",
    aHtml:
      'Ja, Reiseveranstalter wie <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> und TUI haben sich auf Familienreisen spezialisiert. Die meisten Tagestouren eignen sich ab 3 Jahren. Detaillierte Hinweise finden Sie im <a href="/de/age-guide" class="text-vibe-pink hover:underline">Alters-Guide</a>.',
  },
  {
    q: 'Wie reise ich nach Lappland?',
    a: 'Die meisten Reiseveranstalter fliegen aus dem Vereinigten Königreich und Europa nach Rovaniemi (RVN), Kittilä (KTT) oder Ivalo (IVL). Auch eine Anreise über Helsinki mit Finnair ist möglich.',
    aHtml:
      'Die meisten Reiseveranstalter fliegen aus dem Vereinigten Königreich und Europa nach Rovaniemi (RVN), Kittilä (KTT) oder Ivalo (IVL). Auch eine Anreise über Helsinki mit Finnair ist möglich. Alle Optionen (Zug, Mietwagen, Inlandsflug) finden Sie auf <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a>.',
  },
  {
    q: 'Wo sollte ich übernachten?',
    a: 'In Lappland gibt es Glas-Iglus, Holzhütten, Hotels und Schneehotels. Beliebte Ausgangspunkte sind Rovaniemi, Levi, Saariselkä und Luosto.',
    aHtml:
      'In Lappland gibt es Glas-Iglus, Holzhütten, Hotels und Schneehotels. Beliebte Ausgangspunkte sind Rovaniemi, Levi, Saariselkä und Luosto. Unterkünfte finden Sie auf <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> oder <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>.',
  },
  {
    q: 'Welche Tagestouren gibt es?',
    a: 'Beliebte Aktivitäten: Husky-Safari, Schneemobiltouren, Rentier-Schlittenfahrten, Polarlichtjagden, Skifahren, Eisfischen und Besuche im Weihnachtsmanndorf.',
    aHtml:
      'Beliebte Aktivitäten: <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Husky-Safari</a>, <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Schneemobiltouren</a>, Rentier-Schlittenfahrten, Polarlichtjagden, <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Skifahren</a>, Eisfischen und Besuche im Weihnachtsmanndorf.',
  },
  {
    q: 'Brauche ich ein Visum für Finnland?',
    a: 'EU-/EWR-Bürgerinnen und -Bürger benötigen nur einen gültigen Reisepass oder Personalausweis. Reisende aus dem Vereinigten Königreich, den USA, Kanada und Australien dürfen visafrei bis zu 90 Tage im Schengen-Raum bleiben.',
    aHtml:
      'EU-/EWR-Bürgerinnen und -Bürger benötigen nur einen gültigen Reisepass oder Personalausweis. Reisende aus dem Vereinigten Königreich, den USA, Kanada und Australien dürfen visafrei bis zu 90 Tage im Schengen-Raum bleiben. Andere Staatsangehörigkeiten: siehe <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>.',
  },
];

const FAQS_JA: Faq[] = [
  {
    q: 'ラップランドのパッケージには通常何が含まれていますか?',
    a: 'Inghams、Transun、TUIなどのオペレーターのオールインクルーシブパッケージには通常、往復航空券、空港送迎、宿泊、朝食と夕食、防寒着のレンタル、ガイド付きアクティビティ、英語を話すガイドが含まれます。',
    aHtml:
      '<a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>、<a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a>、<a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a>などのオペレーターのオールインクルーシブパッケージには通常、往復航空券、空港送迎、宿泊、朝食と夕食、防寒着のレンタル、ガイド付きアクティビティ、英語を話すガイドが含まれます。',
  },
  {
    q: 'オーロラを観察するのに最適な時期はいつですか?',
    a: 'オーロラのシーズンは9月から3月までで、11月から2月にピークを迎えます。フィンランド・ラップランド（特にイナリ、サーリセルカ、ムオニオ）は世界でも有数のオーロラ観察スポットです。',
    aHtml:
      'オーロラのシーズンは9月から3月までで、11月から2月にピークを迎えます。フィンランド・ラップランド（特に<a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">イナリ、サーリセルカ、ムオニオ</a>）は世界でも有数のオーロラ観察スポットです。',
  },
  {
    q: 'ラップランドの気温はどのくらいですか?',
    a: '冬の気温は−5℃から−30℃の範囲です。すべてのパッケージオペレーターが防寒オーバーオール、ブーツ、手袋を提供します。荷造りのヒントと重ね着のアドバイスについては実用情報ガイドをご覧ください。',
    aHtml:
      '冬の気温は−5℃から−30℃の範囲です。すべてのパッケージオペレーターが防寒オーバーオール、ブーツ、手袋を提供します。荷造りのヒントと重ね着のアドバイスについては<a href="/ja/practical-info" class="text-vibe-pink hover:underline">実用情報ガイド</a>をご覧ください。',
  },
  {
    q: 'パッケージは子供にも適していますか?',
    a: 'はい、Santa\'s LaplandやTUIは家族向けパッケージを専門としています。ほとんどのアクティビティは3歳以上のお子様向けです。詳しい推奨事項については年齢別ガイドをご覧ください。',
    aHtml:
      'はい、<a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a>やTUIは家族向けパッケージを専門としています。ほとんどのアクティビティは3歳以上のお子様向けです。詳しい推奨事項については<a href="/ja/age-guide" class="text-vibe-pink hover:underline">年齢別ガイド</a>をご覧ください。',
  },
  {
    q: 'ラップランドへの行き方を教えてください。',
    a: 'ほとんどのオペレーターは、イギリスとヨーロッパの都市からロヴァニエミ(RVN)、キッティラ(KTT)、イヴァロ(IVL)の各空港へ運航しています。フィンエアーでヘルシンキ経由で行くこともできます。',
    aHtml:
      'ほとんどのオペレーターは、イギリスとヨーロッパの都市からロヴァニエミ(RVN)、キッティラ(KTT)、イヴァロ(IVL)の各空港へ運航しています。フィンエアーでヘルシンキ経由で行くこともできます。鉄道やレンタカーを含むすべての移動手段については<a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a>をご覧ください。',
  },
  {
    q: 'どこに宿泊すべきですか?',
    a: 'ラップランドにはガラスイグルー、ログキャビン、ホテル、ユニークなスノーホテルがあります。人気の拠点はロヴァニエミ、レヴィ、サーリセルカ、ルオストです。',
    aHtml:
      'ラップランドにはガラスイグルー、ログキャビン、ホテル、ユニークなスノーホテルがあります。人気の拠点はロヴァニエミ、レヴィ、サーリセルカ、ルオストです。宿泊施設は<a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a>または<a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>でご覧ください。',
  },
  {
    q: 'どのようなアクティビティがありますか?',
    a: '人気のアクティビティには、ハスキーサファリ、スノーモービルツアー、トナカイそり、オーロラ観察、スキー、氷上釣り、サンタクロース村の訪問があります。',
    aHtml:
      '人気のアクティビティには、<a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">ハスキーサファリ</a>、<a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">スノーモービルツアー</a>、トナカイそり、オーロラ観察、<a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">スキー</a>、氷上釣り、サンタクロース村の訪問があります。',
  },
  {
    q: 'フィンランドへの渡航にはビザが必要ですか?',
    a: 'EU/EEA市民は有効なパスポートまたは国民IDのみで渡航可能です。イギリス、アメリカ、カナダ、オーストラリアの市民はシェンゲン圏内で最大90日間ビザなしで滞在できます。',
    aHtml:
      'EU/EEA市民は有効なパスポートまたは国民IDのみで渡航可能です。イギリス、アメリカ、カナダ、オーストラリアの市民はシェンゲン圏内で最大90日間ビザなしで滞在できます。その他の国籍の方は<a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>でご確認ください。',
  },
];

const FAQS_KO: Faq[] = [
  {
    q: '라플란드 패키지에는 보통 무엇이 포함되나요?',
    a: 'Inghams, Transun, TUI 같은 운영사의 올인클루시브 패키지에는 보통 왕복 항공권, 공항 픽업, 숙박, 조식과 석식, 방한복 대여, 가이드 동반 액티비티, 영어 가이드가 포함됩니다.',
    aHtml:
      '<a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a>, <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> 같은 운영사의 올인클루시브 패키지에는 보통 왕복 항공권, 공항 픽업, 숙박, 조식과 석식, 방한복 대여, 가이드 동반 액티비티, 영어 가이드가 포함됩니다.',
  },
  {
    q: '오로라를 보기에 가장 좋은 시기는 언제인가요?',
    a: '오로라 시즌은 9월부터 3월까지이며, 11월에서 2월 사이가 정점입니다. 핀란드 라플란드, 특히 이나리, 사리셀카, 무오니오는 세계에서 가장 좋은 관측지 중 하나입니다.',
    aHtml:
      '오로라 시즌은 9월부터 3월까지이며, 11월에서 2월 사이가 정점입니다. 핀란드 라플란드, 특히 <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">이나리, 사리셀카, 무오니오</a>는 세계에서 가장 좋은 관측지 중 하나입니다.',
  },
  {
    q: '라플란드는 얼마나 추운가요?',
    a: '겨울 기온은 −5 °C에서 −30 °C 사이입니다. 모든 패키지 운영사가 방한복 일체, 부츠, 장갑을 제공합니다. 짐 싸기 팁과 레이어링 조언은 실용 가이드를 참고하세요.',
    aHtml:
      '겨울 기온은 −5 °C에서 −30 °C 사이입니다. 모든 패키지 운영사가 방한복 일체, 부츠, 장갑을 제공합니다. 짐 싸기 팁과 레이어링 조언은 <a href="/kr/practical-info" class="text-vibe-pink hover:underline">실용 가이드</a>를 참고하세요.',
  },
  {
    q: '패키지가 아이들에게도 적합한가요?',
    a: "네, Santa's Lapland와 TUI는 가족 패키지에 특화되어 있습니다. 대부분의 액티비티는 3세 이상에게 적합합니다. 자세한 추천은 연령별 가이드를 참고하세요.",
    aHtml:
      '네, <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a>와 TUI는 가족 패키지에 특화되어 있습니다. 대부분의 액티비티는 3세 이상에게 적합합니다. 자세한 추천은 <a href="/kr/age-guide" class="text-vibe-pink hover:underline">연령별 가이드</a>를 참고하세요.',
  },
  {
    q: '라플란드에는 어떻게 가나요?',
    a: '대부분의 운영사는 영국 및 유럽 도시에서 로바니에미(RVN), 키틸레(KTT), 이발로(IVL) 공항으로 운항합니다. Finnair로 헬싱키를 경유할 수도 있습니다.',
    aHtml:
      '대부분의 운영사는 영국 및 유럽 도시에서 로바니에미(RVN), 키틸레(KTT), 이발로(IVL) 공항으로 운항합니다. Finnair로 헬싱키를 경유할 수도 있습니다. 기차와 렌터카를 포함한 모든 이동 수단은 <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a> 에서 확인하세요.',
  },
  {
    q: '어디에 묵어야 하나요?',
    a: '라플란드에는 글래스 이글루, 통나무 캐빈, 호텔, 그리고 독특한 스노 호텔이 있습니다. 인기 거점은 로바니에미, 레비, 사리셀카, 루오스토입니다.',
    aHtml:
      '라플란드에는 글래스 이글루, 통나무 캐빈, 호텔, 그리고 독특한 스노 호텔이 있습니다. 인기 거점은 로바니에미, 레비, 사리셀카, 루오스토입니다. 숙박은 <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> 또는 <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a> 에서 둘러보세요.',
  },
  {
    q: '어떤 액티비티가 있나요?',
    a: '인기 액티비티로는 허스키 사파리, 스노모빌 투어, 순록 썰매, 오로라 헌트, 스키, 얼음낚시, 산타클로스 마을 방문이 있습니다.',
    aHtml:
      '인기 액티비티로는 <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">허스키 사파리</a>, <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">스노모빌 투어</a>, 순록 썰매, 오로라 헌트, <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">스키</a>, 얼음낚시, 산타클로스 마을 방문이 있습니다.',
  },
  {
    q: '핀란드 여행에 비자가 필요한가요?',
    a: 'EU/EEA 시민은 유효한 여권이나 신분증만 있으면 됩니다. 영국, 미국, 캐나다, 호주 시민은 셴겐 지역 내에서 최대 90일까지 무비자로 방문할 수 있습니다.',
    aHtml:
      'EU/EEA 시민은 유효한 여권이나 신분증만 있으면 됩니다. 영국, 미국, 캐나다, 호주 시민은 셴겐 지역 내에서 최대 90일까지 무비자로 방문할 수 있습니다. 다른 국적은 <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a> 에서 확인하세요.',
  },
];

const FAQS_FR: Faq[] = [
  {
    q: 'Que contient généralement un forfait Laponie ?',
    a: 'La plupart des forfaits tout compris de voyagistes comme Inghams, Transun et TUI incluent les vols aller-retour, les transferts aéroport, l\'hébergement, le petit-déjeuner et le dîner, la location de vêtements thermiques, les activités guidées et un guide anglophone.',
    aHtml:
      'La plupart des forfaits tout compris de voyagistes comme <a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> et <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> incluent les vols aller-retour, les transferts aéroport, l\'hébergement, le petit-déjeuner et le dîner, la location de vêtements thermiques, les activités guidées et un guide anglophone.',
  },
  {
    q: 'Quelle est la meilleure période pour voir les aurores boréales ?',
    a: 'La saison des aurores s\'étend de septembre à mars, avec un pic d\'activité entre novembre et février. La Laponie finlandaise, et en particulier Inari, Saariselkä et Muonio, fait partie des meilleurs endroits au monde pour les observer.',
    aHtml:
      'La saison des aurores s\'étend de septembre à mars, avec un pic d\'activité entre novembre et février. La Laponie finlandaise, et en particulier <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari, Saariselkä et Muonio</a>, fait partie des meilleurs endroits au monde pour les observer.',
  },
  {
    q: 'Quel froid fait-il en Laponie ?',
    a: 'Les températures hivernales vont de −5 °C à −30 °C. Tous les voyagistes fournissent combinaisons thermiques, bottes et gants. Consultez le guide pratique pour les conseils de bagages et la technique des couches.',
    aHtml:
      'Les températures hivernales vont de −5 °C à −30 °C. Tous les voyagistes fournissent combinaisons thermiques, bottes et gants. Consultez le <a href="/fr/practical-info" class="text-vibe-pink hover:underline">guide pratique</a> pour les conseils de bagages et la technique des couches.',
  },
  {
    q: 'Les forfaits conviennent-ils aux enfants ?',
    a: "Oui, des voyagistes comme Santa's Lapland et TUI sont spécialisés dans les forfaits familles. La plupart des activités conviennent aux enfants de 3 ans et plus. Voir le guide par âge pour les recommandations détaillées.",
    aHtml:
      'Oui, des voyagistes comme <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> et TUI sont spécialisés dans les forfaits familles. La plupart des activités conviennent aux enfants de 3 ans et plus. Voir le <a href="/fr/age-guide" class="text-vibe-pink hover:underline">guide par âge</a> pour les recommandations détaillées.',
  },
  {
    q: 'Comment se rendre en Laponie ?',
    a: 'La plupart des voyagistes opèrent des vols depuis les villes du Royaume-Uni et d\'Europe vers Rovaniemi (RVN), Kittilä (KTT) ou Ivalo (IVL). Il est aussi possible de transiter par Helsinki avec Finnair.',
    aHtml:
      'La plupart des voyagistes opèrent des vols depuis les villes du Royaume-Uni et d\'Europe vers Rovaniemi (RVN), Kittilä (KTT) ou Ivalo (IVL). Il est aussi possible de transiter par Helsinki avec Finnair. Voir toutes les options de transport (trains et location de voiture compris) sur <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a>.',
  },
  {
    q: 'Où séjourner ?',
    a: 'La Laponie offre des iglous de verre, des chalets en rondins, des hôtels et de surprenants hôtels de neige. Les bases populaires sont Rovaniemi, Levi, Saariselkä et Luosto.',
    aHtml:
      'La Laponie offre des iglous de verre, des chalets en rondins, des hôtels et de surprenants hôtels de neige. Les bases populaires sont Rovaniemi, Levi, Saariselkä et Luosto. Parcourez les hébergements sur <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> ou <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>.',
  },
  {
    q: 'Quelles activités sont proposées ?',
    a: 'Les activités phares sont les safaris husky, les sorties en motoneige, les balades en traîneau à rennes, la chasse aux aurores, le ski, la pêche blanche et la visite du Village du Père Noël.',
    aHtml:
      'Les activités phares sont les <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">safaris husky</a>, les <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">sorties en motoneige</a>, les balades en traîneau à rennes, la chasse aux aurores, le <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">ski</a>, la pêche blanche et la visite du Village du Père Noël.',
  },
  {
    q: 'Un visa est-il nécessaire pour la Finlande ?',
    a: 'Les ressortissants de l\'UE/EEE ont besoin d\'un passeport ou d\'une carte d\'identité en cours de validité. Les ressortissants du Royaume-Uni, des États-Unis, du Canada et d\'Australie peuvent séjourner sans visa jusqu\'à 90 jours dans l\'espace Schengen.',
    aHtml:
      'Les ressortissants de l\'UE/EEE ont besoin d\'un passeport ou d\'une carte d\'identité en cours de validité. Les ressortissants du Royaume-Uni, des États-Unis, du Canada et d\'Australie peuvent séjourner sans visa jusqu\'à 90 jours dans l\'espace Schengen. Autres nationalités : voir <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>.',
  },
];

const FAQS_IT: Faq[] = [
  {
    q: 'Cosa è generalmente incluso in un pacchetto per la Lapponia ?',
    a: 'La maggior parte dei pacchetti tutto compreso di operatori come Inghams, Transun e TUI include voli di andata e ritorno, transfer dall\'aeroporto, alloggio, colazione e cena, noleggio di abbigliamento termico, attività guidate e una guida di lingua inglese.',
    aHtml:
      'La maggior parte dei pacchetti tutto compreso di operatori come <a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> e <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> include voli di andata e ritorno, transfer dall\'aeroporto, alloggio, colazione e cena, noleggio di abbigliamento termico, attività guidate e una guida di lingua inglese.',
  },
  {
    q: 'Qual è il momento migliore per vedere l\'aurora boreale ?',
    a: 'La stagione dell\'aurora va da settembre a marzo, con il picco di attività tra novembre e febbraio. La Lapponia finlandese, e in particolare Inari, Saariselkä e Muonio, è uno dei posti migliori al mondo per osservarla.',
    aHtml:
      'La stagione dell\'aurora va da settembre a marzo, con il picco di attività tra novembre e febbraio. La Lapponia finlandese, e in particolare <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari, Saariselkä e Muonio</a>, è uno dei posti migliori al mondo per osservarla.',
  },
  {
    q: 'Che freddo fa in Lapponia ?',
    a: 'In inverno le temperature vanno da −5 °C a −30 °C. Tutti gli operatori forniscono tute termiche, stivali e guanti. Veda la guida pratica per consigli su bagaglio e abbigliamento a strati.',
    aHtml:
      'In inverno le temperature vanno da −5 °C a −30 °C. Tutti gli operatori forniscono tute termiche, stivali e guanti. Veda la <a href="/it/practical-info" class="text-vibe-pink hover:underline">guida pratica</a> per consigli su bagaglio e abbigliamento a strati.',
  },
  {
    q: 'I pacchetti sono adatti ai bambini ?',
    a: "Sì, operatori come Santa's Lapland e TUI sono specializzati in pacchetti per famiglie. La maggior parte delle attività è adatta dai 3 anni in su. Veda la guida per età per consigli dettagliati.",
    aHtml:
      'Sì, operatori come <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> e TUI sono specializzati in pacchetti per famiglie. La maggior parte delle attività è adatta dai 3 anni in su. Veda la <a href="/it/age-guide" class="text-vibe-pink hover:underline">guida per età</a> per consigli dettagliati.',
  },
  {
    q: 'Come si arriva in Lapponia ?',
    a: 'La maggior parte degli operatori vola dalle città del Regno Unito e dell\'Europa verso Rovaniemi (RVN), Kittilä (KTT) o Ivalo (IVL). È anche possibile passare da Helsinki con Finnair.',
    aHtml:
      'La maggior parte degli operatori vola dalle città del Regno Unito e dell\'Europa verso Rovaniemi (RVN), Kittilä (KTT) o Ivalo (IVL). È anche possibile passare da Helsinki con Finnair. Per tutte le opzioni di trasporto, treni e noleggio auto compresi, vedi <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a>.',
  },
  {
    q: 'Dove conviene alloggiare ?',
    a: 'La Lapponia offre iglù di vetro, baite in legno, hotel e sorprendenti snow hotel. Le basi più popolari sono Rovaniemi, Levi, Saariselkä e Luosto.',
    aHtml:
      'La Lapponia offre iglù di vetro, baite in legno, hotel e sorprendenti snow hotel. Le basi più popolari sono Rovaniemi, Levi, Saariselkä e Luosto. Sfogli gli alloggi su <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> o <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>.',
  },
  {
    q: 'Quali attività sono disponibili ?',
    a: 'Tra le più diffuse: safari husky, motoslitta, slitta trainata da renne, caccia all\'aurora, sci, pesca sul ghiaccio e visita al Villaggio di Babbo Natale.',
    aHtml:
      'Tra le più diffuse: <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">safari husky</a>, <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">motoslitta</a>, slitta trainata da renne, caccia all\'aurora, <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">sci</a>, pesca sul ghiaccio e visita al Villaggio di Babbo Natale.',
  },
  {
    q: 'Serve un visto per la Finlandia ?',
    a: 'I cittadini UE/SEE viaggiano con passaporto o carta d\'identità in corso di validità. I cittadini di Regno Unito, Stati Uniti, Canada e Australia possono soggiornare senza visto fino a 90 giorni nello spazio Schengen.',
    aHtml:
      'I cittadini UE/SEE viaggiano con passaporto o carta d\'identità in corso di validità. I cittadini di Regno Unito, Stati Uniti, Canada e Australia possono soggiornare senza visto fino a 90 giorni nello spazio Schengen. Per altre cittadinanze: <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>.',
  },
];

const FAQS_NL: Faq[] = [
  {
    q: 'Wat zit er meestal in een Lapland-arrangement ?',
    a: 'De meeste all-inclusive arrangementen van reisorganisaties als Inghams, Transun en TUI bevatten retourvluchten, transfers, accommodatie, ontbijt en diner, huur van thermokleding, begeleide activiteiten en een Engelstalige gids.',
    aHtml:
      'De meeste all-inclusive arrangementen van reisorganisaties als <a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> en <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> bevatten retourvluchten, transfers, accommodatie, ontbijt en diner, huur van thermokleding, begeleide activiteiten en een Engelstalige gids.',
  },
  {
    q: 'Wanneer is de beste tijd om het noorderlicht te zien ?',
    a: 'Het aurora-seizoen loopt van september tot maart, met piekactiviteit tussen november en februari. Fins Lapland, vooral Inari, Saariselkä en Muonio, is een van de beste plekken ter wereld om het noorderlicht te zien.',
    aHtml:
      'Het aurora-seizoen loopt van september tot maart, met piekactiviteit tussen november en februari. Fins Lapland, vooral <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari, Saariselkä en Muonio</a>, is een van de beste plekken ter wereld om het noorderlicht te zien.',
  },
  {
    q: 'Hoe koud is het in Lapland ?',
    a: 'De wintertemperaturen lopen van −5 °C tot −30 °C. Alle reisorganisaties leveren thermopakken, laarzen en handschoenen. Zie de praktische gids voor inpaktips en advies over kleding in laagjes.',
    aHtml:
      'De wintertemperaturen lopen van −5 °C tot −30 °C. Alle reisorganisaties leveren thermopakken, laarzen en handschoenen. Zie de <a href="/nl/practical-info" class="text-vibe-pink hover:underline">praktische gids</a> voor inpaktips en advies over kleding in laagjes.',
  },
  {
    q: 'Zijn de arrangementen geschikt voor kinderen ?',
    a: "Ja, organisaties als Santa's Lapland en TUI zijn gespecialiseerd in gezinsarrangementen. De meeste activiteiten zijn geschikt vanaf 3 jaar. Zie de leeftijdsgids voor gedetailleerde aanbevelingen.",
    aHtml:
      'Ja, organisaties als <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> en TUI zijn gespecialiseerd in gezinsarrangementen. De meeste activiteiten zijn geschikt vanaf 3 jaar. Zie de <a href="/nl/age-guide" class="text-vibe-pink hover:underline">leeftijdsgids</a> voor gedetailleerde aanbevelingen.',
  },
  {
    q: 'Hoe kom ik in Lapland ?',
    a: 'De meeste reisorganisaties vliegen vanuit Britse en Europese steden naar Rovaniemi (RVN), Kittilä (KTT) of Ivalo (IVL). U kunt ook via Helsinki vliegen met Finnair.',
    aHtml:
      'De meeste reisorganisaties vliegen vanuit Britse en Europese steden naar Rovaniemi (RVN), Kittilä (KTT) of Ivalo (IVL). U kunt ook via Helsinki vliegen met Finnair. Bekijk alle reisopties, inclusief trein en huurauto, op <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a>.',
  },
  {
    q: 'Waar kan ik verblijven ?',
    a: 'Lapland heeft glaziglo\'s, blokhutten, hotels en bijzondere sneeuwhotels. Populaire bases zijn Rovaniemi, Levi, Saariselkä en Luosto.',
    aHtml:
      'Lapland heeft glaziglo\'s, blokhutten, hotels en bijzondere sneeuwhotels. Populaire bases zijn Rovaniemi, Levi, Saariselkä en Luosto. Blader door accommodaties op <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> of <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>.',
  },
  {
    q: 'Welke activiteiten zijn er ?',
    a: 'Populair zijn husky-safari\'s, sneeuwscootertochten, rendierritten, noorderlicht-jachten, skiën, ijsvissen en een bezoek aan het Kerstmandorp.',
    aHtml:
      'Populair zijn <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">husky-safari\'s</a>, <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">sneeuwscootertochten</a>, rendierritten, noorderlicht-jachten, <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">skiën</a>, ijsvissen en een bezoek aan het Kerstmandorp.',
  },
  {
    q: 'Heb ik een visum nodig voor Finland ?',
    a: 'EU/EER-burgers hebben alleen een geldig paspoort of identiteitskaart nodig. Reizigers uit het VK, de VS, Canada en Australië mogen tot 90 dagen visumvrij binnen het Schengengebied verblijven.',
    aHtml:
      'EU/EER-burgers hebben alleen een geldig paspoort of identiteitskaart nodig. Reizigers uit het VK, de VS, Canada en Australië mogen tot 90 dagen visumvrij binnen het Schengengebied verblijven. Andere nationaliteiten: zie <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>.',
  },
];

const FAQS_ES: Faq[] = [
  {
    q: '¿Qué suele incluir un paquete a Laponia?',
    a: 'La mayoría de los paquetes todo incluido de operadores como Inghams, Transun y TUI incluyen vuelos de ida y vuelta, traslados al aeropuerto, alojamiento, desayuno y cena, alquiler de ropa térmica, actividades guiadas y un guía de habla inglesa.',
    aHtml:
      'La mayoría de los paquetes todo incluido de operadores como <a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> y <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> incluyen vuelos de ida y vuelta, traslados al aeropuerto, alojamiento, desayuno y cena, alquiler de ropa térmica, actividades guiadas y un guía de habla inglesa.',
  },
  {
    q: '¿Cuál es la mejor época para ver auroras boreales?',
    a: 'La temporada de auroras va de septiembre a marzo, con la máxima actividad entre noviembre y febrero. La Laponia finlandesa, en particular Inari, Saariselkä y Muonio, es uno de los mejores lugares del planeta para verlas.',
    aHtml:
      'La temporada de auroras va de septiembre a marzo, con la máxima actividad entre noviembre y febrero. La Laponia finlandesa, en particular <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari, Saariselkä y Muonio</a>, es uno de los mejores lugares del planeta para verlas.',
  },
  {
    q: '¿Qué frío hace en Laponia?',
    a: 'En invierno la temperatura oscila entre −5 °C y −30 °C. Todos los operadores de paquetes facilitan monos térmicos, botas y guantes. Consulte la guía de información práctica para consejos de equipaje y de capas de ropa.',
    aHtml:
      'En invierno la temperatura oscila entre −5 °C y −30 °C. Todos los operadores de paquetes facilitan monos térmicos, botas y guantes. Consulte la <a href="/es/practical-info" class="text-vibe-pink hover:underline">guía de información práctica</a> para consejos de equipaje y de capas de ropa.',
  },
  {
    q: '¿Los paquetes son adecuados para niños?',
    a: "Sí: operadores como Santa's Lapland y TUI están especializados en paquetes familiares. La mayoría de las actividades sirven a partir de los 3 años. Consulte la guía por edades para recomendaciones detalladas.",
    aHtml:
      'Sí: operadores como <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> y TUI están especializados en paquetes familiares. La mayoría de las actividades sirven a partir de los 3 años. Consulte la <a href="/es/age-guide" class="text-vibe-pink hover:underline">guía por edades</a> para recomendaciones detalladas.',
  },
  {
    q: '¿Cómo se llega a Laponia?',
    a: 'La mayoría de los operadores vuelan desde ciudades del Reino Unido y de Europa a los aeropuertos de Rovaniemi (RVN), Kittilä (KTT) o Ivalo (IVL). También puede volar vía Helsinki con Finnair.',
    aHtml:
      'La mayoría de los operadores vuelan desde ciudades del Reino Unido y de Europa a los aeropuertos de Rovaniemi (RVN), Kittilä (KTT) o Ivalo (IVL). También puede volar vía Helsinki con Finnair. Consulte <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a> para todas las opciones de viaje, incluidos trenes y alquiler de coche.',
  },
  {
    q: '¿Dónde alojarse?',
    a: 'Laponia tiene iglús de cristal, cabañas de madera, hoteles y singulares hoteles de nieve. Bases populares: Rovaniemi, Levi, Saariselkä y Luosto.',
    aHtml:
      'Laponia tiene iglús de cristal, cabañas de madera, hoteles y singulares hoteles de nieve. Bases populares: Rovaniemi, Levi, Saariselkä y Luosto. Explore alojamiento en <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> o <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>.',
  },
  {
    q: '¿Qué actividades hay?',
    a: 'Entre las más habituales: safaris en trineo de huskies, rutas en motonieve, paseos en reno, caza de auroras, esquí, pesca en hielo y visitas a la Aldea de Papá Noel.',
    aHtml:
      'Entre las más habituales: <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">safaris en trineo de huskies</a>, <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">rutas en motonieve</a>, paseos en reno, caza de auroras, <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">esquí</a>, pesca en hielo y visitas a la Aldea de Papá Noel.',
  },
  {
    q: '¿Necesito visado para viajar a Finlandia?',
    a: 'Los ciudadanos de la UE/EEE solo necesitan un pasaporte o documento de identidad en vigor. Quienes viajen desde el Reino Unido, EE. UU., Canadá y Australia pueden visitar el espacio Schengen sin visado hasta 90 días.',
    aHtml:
      'Los ciudadanos de la UE/EEE solo necesitan un pasaporte o documento de identidad en vigor. Quienes viajen desde el Reino Unido, EE. UU., Canadá y Australia pueden visitar el espacio Schengen sin visado hasta 90 días. Para otras nacionalidades, consulte <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>.',
  },
];

const FAQS_PTBR: Faq[] = [
  {
    q: 'O que costuma estar incluído em um pacote para a Lapônia?',
    a: 'A maioria dos pacotes all-inclusive de operadoras como Inghams, Transun e TUI inclui voos de ida e volta, traslados do aeroporto, hospedagem, café da manhã e jantar, aluguel de roupas térmicas, atividades guiadas e um guia que fala inglês.',
    aHtml:
      'A maioria dos pacotes all-inclusive de operadoras como <a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>, <a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> e <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> inclui voos de ida e volta, traslados do aeroporto, hospedagem, café da manhã e jantar, aluguel de roupas térmicas, atividades guiadas e um guia que fala inglês.',
  },
  {
    q: 'Qual é a melhor época para ver a aurora boreal?',
    a: 'A temporada de auroras vai de setembro a março, com pico de atividade entre novembro e fevereiro. A Lapônia finlandesa, em especial Inari, Saariselkä e Muonio, é um dos melhores lugares do planeta para vê-las.',
    aHtml:
      'A temporada de auroras vai de setembro a março, com pico de atividade entre novembro e fevereiro. A Lapônia finlandesa, em especial <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari, Saariselkä e Muonio</a>, é um dos melhores lugares do planeta para vê-las.',
  },
  {
    q: 'Quanto frio faz na Lapônia?',
    a: 'No inverno, a temperatura varia de −5 °C a −30 °C. Todas as operadoras de pacote fornecem macacões térmicos, botas e luvas. Veja o guia de informações práticas para dicas de mala e de sobreposição de roupas.',
    aHtml:
      'No inverno, a temperatura varia de −5 °C a −30 °C. Todas as operadoras de pacote fornecem macacões térmicos, botas e luvas. Veja o <a href="/br/practical-info" class="text-vibe-pink hover:underline">guia de informações práticas</a> para dicas de mala e de sobreposição de roupas.',
  },
  {
    q: 'Os pacotes são adequados para crianças?',
    a: "Sim, operadoras como Santa's Lapland e TUI são especializadas em pacotes para famílias. A maioria das atividades serve para crianças a partir de 3 anos. Veja o guia por idade para recomendações detalhadas.",
    aHtml:
      'Sim, operadoras como <a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> e TUI são especializadas em pacotes para famílias. A maioria das atividades serve para crianças a partir de 3 anos. Veja o <a href="/br/age-guide" class="text-vibe-pink hover:underline">guia por idade</a> para recomendações detalhadas.',
  },
  {
    q: 'Como chego à Lapônia?',
    a: 'A maioria das operadoras voa de cidades do Reino Unido e da Europa para os aeroportos de Rovaniemi (RVN), Kittilä (KTT) ou Ivalo (IVL). Você também pode voar via Helsinque pela Finnair.',
    aHtml:
      'A maioria das operadoras voa de cidades do Reino Unido e da Europa para os aeroportos de Rovaniemi (RVN), Kittilä (KTT) ou Ivalo (IVL). Você também pode voar via Helsinque pela Finnair. Veja <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a> para todas as opções de viagem, incluindo trens e aluguel de carro.',
  },
  {
    q: 'Onde devo ficar?',
    a: 'A Lapônia tem iglus de vidro, cabanas de madeira, hotéis e singulares hotéis de neve. Bases populares incluem Rovaniemi, Levi, Saariselkä e Luosto.',
    aHtml:
      'A Lapônia tem iglus de vidro, cabanas de madeira, hotéis e singulares hotéis de neve. Bases populares incluem Rovaniemi, Levi, Saariselkä e Luosto. Veja opções de hospedagem em <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> ou <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a>.',
  },
  {
    q: 'Quais atividades estão disponíveis?',
    a: 'Entre as mais procuradas: safáris de huskies, passeios de snowmobile, passeios de trenó de renas, caça à aurora, esqui, pesca no gelo e visitas à Vila do Papai Noel.',
    aHtml:
      'Entre as mais procuradas: <a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">safáris de huskies</a>, <a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">passeios de snowmobile</a>, passeios de trenó de renas, caça à aurora, <a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">esqui</a>, pesca no gelo e visitas à Vila do Papai Noel.',
  },
  {
    q: 'Preciso de visto para viajar à Finlândia?',
    a: 'Cidadãos da UE/EEE precisam apenas de passaporte ou documento de identidade válidos. Viajantes do Reino Unido, EUA, Canadá e Austrália podem permanecer sem visto por até 90 dias no espaço Schengen.',
    aHtml:
      'Cidadãos da UE/EEE precisam apenas de passaporte ou documento de identidade válidos. Viajantes do Reino Unido, EUA, Canadá e Austrália podem permanecer sem visto por até 90 dias no espaço Schengen. Para outras nacionalidades, consulte <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>.',
  },
];

const FAQS_ZH: Faq[] = [
  {
    q: '拉普兰套餐通常包含哪些内容？',
    a: 'Inghams、Transun 和 TUI 等运营商的多数全包套餐包含往返机票、机场接送、住宿、早餐和晚餐、保暖服装租赁、有向导的活动以及一名讲英语的向导。',
    aHtml:
      '<a href="https://www.inghams.co.uk/lapland-holidays?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Inghams</a>、<a href="https://www.transun.co.uk?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Transun</a> 和 <a href="https://www.tui.co.uk/destinations/lapland?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">TUI</a> 等运营商的多数全包套餐包含往返机票、机场接送、住宿、早餐和晚餐、保暖服装租赁、有向导的活动以及一名讲英语的向导。',
  },
  {
    q: '什么时候最适合看极光？',
    a: '极光季从九月持续到三月，十一月至二月活动最强。芬兰拉普兰，尤其是 Inari、Saariselkä 和 Muonio，是地球上观赏极光的最佳地点之一。',
    aHtml:
      '极光季从九月持续到三月，十一月至二月活动最强。芬兰拉普兰，尤其是 <a href="https://laplandnature.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">Inari、Saariselkä 和 Muonio</a>，是地球上观赏极光的最佳地点之一。',
  },
  {
    q: '拉普兰有多冷？',
    a: '冬季气温在 −5 °C 到 −30 °C 之间。所有套餐运营商都会提供保暖连体服、靴子和手套。打包与分层穿衣建议请参阅实用信息指南。',
    aHtml:
      '冬季气温在 −5 °C 到 −30 °C 之间。所有套餐运营商都会提供保暖连体服、靴子和手套。打包与分层穿衣建议请参阅<a href="/cn/practical-info" class="text-vibe-pink hover:underline">实用信息指南</a>。',
  },
  {
    q: '套餐适合儿童吗？',
    a: "适合，Santa's Lapland 和 TUI 等运营商专做家庭套餐。多数活动适合 3 岁以上的儿童。详细建议请参阅年龄指南。",
    aHtml:
      '适合，<a href="https://www.santaslapland.com?utm_source=laplandtours.online&utm_medium=referral&utm_campaign=faq" target="_blank" rel="sponsored nofollow noopener" class="text-vibe-pink hover:underline">Santa\'s Lapland</a> 和 TUI 等运营商专做家庭套餐。多数活动适合 3 岁以上的儿童。详细建议请参阅<a href="/cn/age-guide" class="text-vibe-pink hover:underline">年龄指南</a>。',
  },
  {
    q: '如何前往拉普兰？',
    a: '多数运营商从英国和欧洲城市直飞罗瓦涅米（RVN）、基蒂莱（KTT）或伊瓦洛（IVL）机场。你也可以搭乘芬兰航空经赫尔辛基转机。',
    aHtml:
      '多数运营商从英国和欧洲城市直飞罗瓦涅米（RVN）、基蒂莱（KTT）或伊瓦洛（IVL）机场。你也可以搭乘芬兰航空经赫尔辛基转机。包括火车和租车在内的全部出行方式，请参阅 <a href="https://laplandtransport.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandTransport.com</a>。',
  },
  {
    q: '应该住在哪里？',
    a: '拉普兰有玻璃穹顶屋、木屋、酒店以及别具一格的雪屋酒店。热门落脚点包括罗瓦涅米、Levi、Saariselkä 和 Luosto。',
    aHtml:
      '拉普兰有玻璃穹顶屋、木屋、酒店以及别具一格的雪屋酒店。热门落脚点包括罗瓦涅米、Levi、Saariselkä 和 Luosto。可在 <a href="https://stayinlapland.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">StayInLapland.com</a> 或 <a href="https://laplandstays.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">LaplandStays.com</a> 浏览住宿。',
  },
  {
    q: '有哪些活动？',
    a: '热门活动包括哈士奇雪橇之旅、雪地摩托、驯鹿雪橇、极光追寻、滑雪、冰上垂钓以及参观圣诞老人村。',
    aHtml:
      '热门活动包括<a href="https://laplandhuskysafaris.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">哈士奇雪橇之旅</a>、<a href="https://laplandsnowmobile.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">雪地摩托</a>、驯鹿雪橇、极光追寻、<a href="https://laplandskiresorts.com" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">滑雪</a>、冰上垂钓以及参观圣诞老人村。',
  },
  {
    q: '前往芬兰需要签证吗？',
    a: '欧盟/欧洲经济区公民只需持有效护照或身份证。来自英国、美国、加拿大和澳大利亚的旅客可在申根区内免签停留最多 90 天。',
    aHtml:
      '欧盟/欧洲经济区公民只需持有效护照或身份证。来自英国、美国、加拿大和澳大利亚的旅客可在申根区内免签停留最多 90 天。其他国籍请查阅 <a href="https://migri.fi/en/home" target="_blank" rel="noopener" class="text-vibe-pink hover:underline">migri.fi</a>。',
  },
];

export const FAQ_BY_LANG: Record<CopyLang, Faq[]> = {
  en: FAQS_EN,
  fi: FAQS_FI,
  de: FAQS_DE,
  ja: FAQS_JA,
  ko: FAQS_KO,
  fr: FAQS_FR,
  it: FAQS_IT,
  nl: FAQS_NL,
  es: FAQS_ES,
  'pt-BR': FAQS_PTBR,
  'zh-CN': FAQS_ZH,
};

/** Default-exported list kept for backwards compatibility with `jsonLd` callers. */
export const faqs = FAQS_EN;

const HEADINGS: Record<CopyLang, { h2: string; lead: (email: string) => React.ReactNode }> = {
  en: {
    h2: 'Reader Q&A',
    lead: (email) => (
      <>
        Things people email about. Send a new one to{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        .
      </>
    ),
  },
  fi: {
    h2: 'Lukijoiden kysymyksiä',
    lead: (email) => (
      <>
        Yleisimmät sähköpostissa tulevat kysymykset. Lähetä uusi osoitteeseen{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        .
      </>
    ),
  },
  de: {
    h2: 'Leserfragen',
    lead: (email) => (
      <>
        Wiederkehrende Fragen aus E-Mails. Senden Sie Ihre Frage an{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        .
      </>
    ),
  },
  ja: {
    h2: '読者からのQ&A',
    lead: (email) => (
      <>
        メールで多くいただくご質問。新しいご質問は{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        {' '}までお送りください。
      </>
    ),
  },
  ko: {
    h2: '독자 Q&A',
    lead: (email) => (
      <>
        이메일로 자주 들어오는 질문들입니다. 새 질문은{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        {' '}로 보내주세요.
      </>
    ),
  },
  fr: {
    h2: 'Questions des lecteurs',
    lead: (email) => (
      <>
        Les questions qui reviennent par e-mail. Envoyez la vôtre à{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        .
      </>
    ),
  },
  it: {
    h2: 'Domande dei lettori',
    lead: (email) => (
      <>
        Le domande che ci arrivano via e-mail. Invii la sua a{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        .
      </>
    ),
  },
  nl: {
    h2: 'Lezersvragen',
    lead: (email) => (
      <>
        Vragen die per e-mail binnenkomen. Stuur uw vraag naar{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        .
      </>
    ),
  },
  es: {
    h2: 'Preguntas de los lectores',
    lead: (email) => (
      <>
        Las dudas que nos llegan por correo. Envíe la suya a{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        .
      </>
    ),
  },
  'pt-BR': {
    h2: 'Perguntas dos leitores',
    lead: (email) => (
      <>
        As dúvidas que chegam por e-mail. Envie a sua para{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        .
      </>
    ),
  },
  'zh-CN': {
    h2: '读者问答',
    lead: (email) => (
      <>
        读者常通过邮件提出的问题。新的问题欢迎发送至{' '}
        <a href={`mailto:${email}`} className="text-vibe-pink hover:underline">
          {email}
        </a>
        。
      </>
    ),
  },
};

export default function FAQ() {
  const lang = useLang();
  const list = FAQ_BY_LANG[copyLang(lang)];
  const heading = HEADINGS[copyLang(lang)];
  return (
    <section className="bg-deep-night py-24 sm:py-32">
      <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
        <h2 className="font-heading tracking-tight leading-[0.92] text-snow text-5xl sm:text-7xl mb-2 break-words hyphens-auto [text-wrap:balance]">
          {heading.h2}
        </h2>
        <p className="text-snow/80 font-body text-base mb-16 sm:mb-20 max-w-md">
          {heading.lead('info@laplandvibes.com')}
        </p>

        <div className="space-y-12 sm:space-y-16 max-w-[760px]">
          {list.map((faq, i) => (
            <div key={i} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_1fr] gap-x-4">
              <span className="cap-meta pt-1 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="font-heading text-snow tracking-wide text-2xl sm:text-3xl leading-[1.05] mb-3 [text-wrap:balance]">
                  {faq.q}
                </h3>
                <p
                  className="text-snow/72 font-body text-[15px] sm:text-base leading-[1.78]"
                  dangerouslySetInnerHTML={{ __html: faq.aHtml }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
