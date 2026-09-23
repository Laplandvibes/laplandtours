import type { NewsletterPopupCopy } from '../shared/NewsletterPopup';

/**
 * laplandtours.online: uutiskirjepopupin oma teksti.
 *
 * Vesa 23.9.2026: "tekstit ja värimaailma sivustokohtaisiksi" → "kyllä, vie
 * kaikille". Kuva, lomake, nappi ja #LAPLAND-merkki pysyvät verkoston yhteisinä.
 * Teksti = sivun oma aihe lukijan näkökulmasta, 12 kielellä natiivina.
 * 🔴 Ei hälytyksiä, ei lähetystahtia, ei "ensimmäisenä" (9.8.2026 lupauspurku):
 * uutiskirje lähtee vain kun on kerrottavaa. Otsikko tulee jaetusta komponentista.
 */
export const POPUP_COPY: NewsletterPopupCopy = {
  en: {
    description: 'Founder of LaplandVibes. You can build a route yourself or choose a ready-made tour. I tell you how the pieces of a Lapland trip fit together and what needs booking early.',
  },
  fi: {
    description: 'LaplandVibesin perustaja. Reitin voi koota itse tai valita valmiin kiertomatkan. Kerron, miten Lapin-matkan palaset sovitetaan yhteen ja mitä pitää varata ajoissa.',
  },
  de: {
    description: 'Gründer von LaplandVibes. Sie können Ihre Route selbst zusammenstellen oder eine fertige Rundreise wählen. Ich zeige Ihnen, wie die Bausteine einer Lappland-Reise zusammenpassen und was Sie rechtzeitig buchen müssen.',
  },
  ja: {
    description: 'LaplandVibes創業者。ルートは自分で組み立てることも、用意された周遊ツアーを選ぶこともできます。ラップランドの旅のピースをどう組み合わせるか、何を早めに予約しておくべきかをお伝えします。',
  },
  es: {
    description: 'Fundador de LaplandVibes. Puede armar la ruta por su cuenta o elegir un paquete ya organizado. Le explico cómo encajar las piezas de un viaje a Laponia y qué hay que reservar con tiempo.',
  },
  'pt-BR': {
    description: 'Fundador do LaplandVibes. Você pode montar o roteiro por conta própria ou escolher um pacote pronto. Explico como encaixar as peças de uma viagem à Lapônia e o que é preciso reservar com antecedência.',
  },
  'zh-CN': {
    description: 'LaplandVibes创始人。路线可以自己组合，也可以选一条现成的环游行程。我告诉你怎样把拉普兰之旅的各个环节拼到一起，以及哪些需要提前预订。',
  },
  ko: {
    description: 'LaplandVibes 창립자. 루트를 직접 짜도 되고, 이미 짜인 투어를 골라도 됩니다. 라플란드 여행의 조각들을 어떻게 맞추는지, 무엇을 미리 예약해야 하는지 정리해드립니다.',
  },
  fr: {
    description: 'Fondateur de LaplandVibes. Vous pouvez composer votre itinéraire vous-même ou choisir un circuit clés en main. Je vous explique comment assembler les pièces d\'un voyage en Laponie et ce qu\'il faut réserver tôt.',
  },
  it: {
    description: 'Fondatore di LaplandVibes. Si può costruire l\'itinerario da sé oppure scegliere un tour già pronto. Le spiego come incastrare i pezzi di un viaggio in Lapponia e cosa va prenotato per tempo.',
  },
  nl: {
    description: 'Oprichter van LaplandVibes. U kunt uw reisroute zelf samenstellen of een kant-en-klare rondreis kiezen. Ik leg u uit hoe de onderdelen van een reis naar Lapland in elkaar passen en wat u tijdig moet boeken.',
  },
  sv: {
    description: 'Grundare av LaplandVibes. Du kan sätta ihop rutten själv eller välja en färdig rundresa. Jag visar hur du får bitarna i en Lapplandsresa att falla på plats och vad som måste bokas i god tid.',
  },
};
