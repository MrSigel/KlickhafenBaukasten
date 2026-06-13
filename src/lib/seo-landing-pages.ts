import {
  Megaphone,
  MessageCircleWarning,
  MonitorCog,
  ShoppingCart,
  Store,
  type LucideIcon,
} from "lucide-react";

export type SeoLandingPage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  description: string;
  cta: string;
  icon: LucideIcon;
  problems: string[];
  services: string[];
  faqs: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
};

export const seoLandingPages: SeoLandingPage[] = [
  {
    slug: "woocommerce-beratung",
    title: "WooCommerce Beratung für Shop-Struktur, Produkte und Technik",
    metaTitle: "WooCommerce Beratung | Shop-Hilfe von Klickhafen",
    metaDescription:
      "WooCommerce Beratung für bestehende Shops: Shop-Struktur, Produkte, Zahlungen, Versand, Checkout, mobile Ansicht und technische Hilfe.",
    eyebrow: "WooCommerce Beratung",
    intro:
      "Wenn ein WooCommerce-Shop gewachsen ist, aber Struktur, Checkout oder Produktpflege nicht mehr sauber funktionieren, hilft Klickhafen mit klarer technischer und inhaltlicher Beratung.",
    description:
      "Die WooCommerce Beratung richtet sich an kleine Unternehmen, Selbstständige und lokale Anbieter, die ihren bestehenden WordPress-Shop verbessern möchten. Klickhafen prüft Shop-Aufbau, Produkte, Kategorien, Zahlungsarten, Versand, mobile Darstellung und wichtige Grundlagen für eine bessere Bedienbarkeit. Rechtliche Seiten können nach Kundenvorgabe technisch eingebunden werden, ohne Rechtsberatung zu ersetzen.",
    cta: "WooCommerce Beratung anfragen",
    icon: ShoppingCart,
    problems: [
      "Produkte, Kategorien oder Varianten sind unübersichtlich angelegt",
      "Zahlungsarten oder Versandoptionen passen nicht zum Ablauf",
      "Checkout, Warenkorb oder Produktseiten wirken auf Mobilgeräten unsauber",
      "Plugins, Theme oder Einstellungen verursachen kleine Shop-Probleme",
      "rechtliche Seiten sollen nach vorhandener Kundenvorgabe sauber eingebunden werden",
      "SEO-Grundlagen für Produktseiten und Kategorien fehlen",
    ],
    services: [
      "Shop-Struktur und Produktlogik prüfen",
      "Produkte, Kategorien, Varianten und Bilder sinnvoll ordnen",
      "Zahlungsarten, Versandoptionen und Checkout-Einstellungen technisch prüfen",
      "mobile Produktseiten, Warenkorb und Anfragewege verbessern",
      "WooCommerce-Einstellungen verständlich erklären",
      "SEO-Grundlagen und interne Links für Shop-Seiten verbessern",
    ],
    faqs: [
      {
        question: "Ist die WooCommerce Beratung auch für kleine Shops sinnvoll?",
        answer:
          "Ja. Gerade kleine Shops profitieren von klarer Struktur, verständlichen Produktseiten und einem stabilen Checkout, weil Kundinnen und Kunden schneller zum Kauf oder zur Anfrage kommen.",
      },
      {
        question: "Übernimmt Klickhafen auch rechtliche Texte?",
        answer:
          "Klickhafen kann rechtliche Seiten nach Ihrer Vorgabe technisch einbauen und verlinken. Eine Rechtsberatung oder rechtliche Prüfung wird nicht angeboten.",
      },
      {
        question: "Kann auch nur ein einzelnes Shop-Problem geprüft werden?",
        answer:
          "Ja. Auch Hilfe bei einzelnen Problemen wie Versand, Zahlung, Produktpflege, Formularen oder mobiler Ansicht kann angefragt werden.",
      },
    ],
    related: [
      { label: "WooCommerce-Hilfe", href: "/leistungen/woocommerce-hilfe" },
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "WooCommerce Checkout prüfen", href: "/ratgeber/woocommerce-checkout-funktioniert-nicht" },
      { label: "Kontakt aufnehmen", href: "/kontakt" },
    ],
  },
  {
    slug: "shopsystem-pflege",
    title: "Shopsystem pflegen lassen für Shopify, WooCommerce, Wix & Baukästen",
    metaTitle: "Shopsystem pflegen lassen | Klickhafen",
    metaDescription:
      "Shopsystem pflegen lassen: Hilfe für Shopify, WooCommerce, Wix, Strato, IONOS, Jimdo, Squarespace, Webflow, GoDaddy, One.com und Weebly.",
    eyebrow: "Shop-Pflege",
    intro:
      "Ein Shop muss regelmäßig gepflegt werden, damit Produkte, Texte, Bilder, Zahlungen, Versand, mobile Ansicht und Anfragewege zuverlässig funktionieren.",
    description:
      "Klickhafen unterstützt bei der Pflege bestehender Shopsysteme wie Shopify, WooCommerce, Wix, Strato, IONOS, Jimdo, Squarespace, Webflow, GoDaddy, One.com und Weebly. Der Fokus liegt auf praktischer Hilfe für laufende Shops: Inhalte aktualisieren, Produkte sauber einpflegen, kleine Fehler beheben und die Bedienbarkeit verbessern.",
    cta: "Shopsystem-Hilfe anfragen",
    icon: Store,
    problems: [
      "Produktdaten, Bilder oder Varianten sind veraltet",
      "Versand- und Zahlungsinformationen müssen angepasst werden",
      "mobile Shop-Seiten brechen um oder wirken unübersichtlich",
      "Buttons, Links oder Formulare führen nicht zum gewünschten Ziel",
      "Shop-Baukasten oder Theme ist schwer nachvollziehbar",
      "regelmäßige Pflege bleibt im Tagesgeschäft liegen",
    ],
    services: [
      "Produkte, Kategorien, Varianten und Bilder pflegen",
      "Shop-Inhalte, Startseite und wichtige Unterseiten aktualisieren",
      "Formulare, Buttons, Links und Anfragewege prüfen",
      "mobile Darstellung und Lesbarkeit verbessern",
      "Shopify, WooCommerce, Wix und gängige Baukasten-Systeme betreuen",
      "SEO-Grundlagen und interne Verlinkung im Shop mitdenken",
    ],
    faqs: [
      {
        question: "Welche Shopsysteme kann Klickhafen pflegen?",
        answer:
          "Klickhafen unterstützt unter anderem Shopify, WooCommerce, Wix, Strato, IONOS, Jimdo, Squarespace, Webflow, GoDaddy, One.com und Weebly nach technischer Machbarkeit.",
      },
      {
        question: "Kann ein Shopsystem dauerhaft betreut werden?",
        answer:
          "Ja. Neben einzelnen Aufgaben sind auch regelmäßige Pflegearbeiten möglich, zum Beispiel für Produkte, Inhalte, Formulare und mobile Ansichten.",
      },
      {
        question: "Werden auch sehr kleine Änderungen übernommen?",
        answer:
          "Ja. Auch kleine Anpassungen wie Bildwechsel, Textänderungen, Produktkorrekturen oder Button-Links können sinnvoll gebündelt umgesetzt werden.",
      },
    ],
    related: [
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "Shopify-Hilfe", href: "/leistungen/shopify-hilfe" },
      { label: "WooCommerce Beratung", href: "/woocommerce-beratung" },
      { label: "Kontakt aufnehmen", href: "/kontakt" },
    ],
  },
  {
    slug: "website-betreuung-ennepetal",
    title: "Website Betreuung Ennepetal für kleine Unternehmen",
    metaTitle: "Website Betreuung Ennepetal | Klickhafen",
    metaDescription:
      "Website Betreuung Ennepetal: Online-Hilfe für bestehende Websites, Pflege, Formulare, mobile Ansicht, Inhalte und SEO-Grundlagen.",
    eyebrow: "Website Betreuung Ennepetal",
    intro:
      "Klickhafen betreut Websites für Unternehmen in Ennepetal und Umgebung online, ohne eine falsche Büro-Adresse vor Ort zu behaupten.",
    description:
      "Die Website Betreuung für Ennepetal eignet sich für Betriebe, Selbstständige und Vereine, die bei ihrer bestehenden Website nicht weiterkommen oder regelmäßig Unterstützung brauchen. Klickhafen hilft online bei Inhalten, Formularen, mobiler Darstellung, technischen Kleinigkeiten, Struktur, SEO-Grundlagen und klaren Anfragewegen.",
    cta: "Website-Betreuung anfragen",
    icon: MonitorCog,
    problems: [
      "Texte, Bilder oder Kontaktdaten sind nicht mehr aktuell",
      "Kontaktformulare funktionieren nicht zuverlässig",
      "die mobile Ansicht wirkt unruhig oder schwer lesbar",
      "neue Leistungen oder Unterseiten sollen ergänzt werden",
      "Google versteht Ort, Leistung oder Zielgruppe nicht klar genug",
      "es fehlt eine feste Hilfe für laufende Website-Aufgaben",
    ],
    services: [
      "Website-Inhalte, Bilder, Buttons und Links pflegen",
      "Formulare, E-Mail-Ziele und Weiterleitungen prüfen",
      "mobile Ansicht und Lesbarkeit verbessern",
      "neue Unterseiten und Leistungsbereiche vorbereiten",
      "SEO-Grundlagen für lokale Suchanfragen in Ennepetal stärken",
      "Website-Probleme verständlich einordnen und lösen",
    ],
    faqs: [
      {
        question: "Ist Klickhafen direkt in Ennepetal vor Ort?",
        answer:
          "Nein. Klickhafen arbeitet online und unterstützt Unternehmen in Ennepetal und Umgebung remote. Es wird keine Büro-Adresse in Ennepetal behauptet.",
      },
      {
        question: "Welche Websites können betreut werden?",
        answer:
          "Unterstützung ist für WordPress, Shopify, Wix, WooCommerce und viele Baukasten-Websites möglich, sofern Zugänge und technische Voraussetzungen vorhanden sind.",
      },
      {
        question: "Kann ich auch nur einmalig Hilfe anfragen?",
        answer:
          "Ja. Die Betreuung kann einmalig für ein konkretes Problem oder regelmäßig für laufende Website-Pflege angefragt werden.",
      },
    ],
    related: [
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "Website- & Shop-Hilfe", href: "/leistungen/website-shop-hilfe" },
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Kontakt aufnehmen", href: "/kontakt" },
    ],
  },
  {
    slug: "online-marketing-castrop-rauxel",
    title: "Online Marketing Castrop-Rauxel für lokale Unternehmen",
    metaTitle: "Online Marketing Castrop-Rauxel | Klickhafen",
    metaDescription:
      "Online Marketing Castrop-Rauxel: lokale Hilfe für Website, Google Business, SEO-Grundlagen, Social Media und bessere Anfragewege.",
    eyebrow: "Online Marketing Castrop-Rauxel",
    intro:
      "Lokales Online Marketing beginnt mit einer klaren Website, verständlichen Anfragewegen und einer sauberen Grundlage für Google, Social Media und regionale Sichtbarkeit.",
    description:
      "Klickhafen unterstützt Unternehmen in Castrop-Rauxel bei praktischen Online-Marketing-Grundlagen: Website-Struktur, Google Business Profil, lokale SEO, Inhalte, Social-Media-Verknüpfungen und Kontaktwege. Ziel ist keine laute Werbung, sondern ein professioneller digitaler Auftritt, der Leistungen verständlich macht und Anfragen erleichtert.",
    cta: "Online-Marketing-Hilfe anfragen",
    icon: Megaphone,
    problems: [
      "Website, Google Business und Social Media wirken nicht einheitlich",
      "lokale Leistungen werden auf der Website nicht klar genug erklärt",
      "Kontaktbuttons, Formulare oder Telefonnummern sind schlecht erreichbar",
      "Meta-Titel, Beschreibungen und interne Links sind nicht auf lokale Suchen abgestimmt",
      "es fehlen Inhalte für konkrete Leistungen in Castrop-Rauxel",
      "Anfragen kommen über mehrere Kanäle, aber ohne klare Struktur",
    ],
    services: [
      "Website-Struktur und lokale Leistungsseiten verbessern",
      "Google Business Profil inhaltlich und technisch mitdenken",
      "SEO-Grundlagen für Castrop-Rauxel sauber einbauen",
      "Kontaktwege, CTAs, Formulare und Anfrageprozesse prüfen",
      "Social-Media-Links und Inhalte sinnvoll mit der Website verbinden",
      "realistische Maßnahmen ohne Ranking- oder Umsatzversprechen priorisieren",
    ],
    faqs: [
      {
        question: "Geht es um komplette Marketing-Kampagnen?",
        answer:
          "Der Fokus liegt auf praktischen Grundlagen: Website, lokale SEO, Google Business, Social Media und klare Anfragewege. Größere Kampagnen können nach Umfang eingeordnet werden.",
      },
      {
        question: "Kann Klickhafen Sichtbarkeit bei Google garantieren?",
        answer:
          "Nein. Seriöses Online Marketing arbeitet mit sauberen Grundlagen und laufender Verbesserung, aber ohne Garantie für bestimmte Platzierungen.",
      },
      {
        question: "Ist die Unterstützung nur für Castrop-Rauxel?",
        answer:
          "Der lokale Schwerpunkt liegt auf Castrop-Rauxel und Umgebung. Technische Website-Hilfe ist aber deutschlandweit online möglich.",
      },
    ],
    related: [
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Webdesign & Webentwicklung", href: "/leistungen/webdesign-webentwicklung" },
      { label: "Website Betreuung Ennepetal", href: "/website-betreuung-ennepetal" },
      { label: "Kontakt aufnehmen", href: "/kontakt" },
    ],
  },
  {
    slug: "wordpress-kontaktformular-kommt-nicht-an",
    title: "WordPress Kontaktformular kommt nicht an - Hilfe bei Formular-Mails",
    metaTitle: "WordPress Kontaktformular kommt nicht an | Klickhafen",
    metaDescription:
      "WordPress Kontaktformular kommt nicht an? Hilfe bei SMTP, Formularprüfung, Spam, Weiterleitungen, Empfängeradresse und technischer Fehlersuche.",
    eyebrow: "WordPress Formular-Hilfe",
    intro:
      "Wenn ein WordPress Kontaktformular nicht ankommt, liegt das Problem oft nicht am sichtbaren Formular, sondern an E-Mail-Versand, SMTP, Spamfiltern oder falschen Empfänger-Einstellungen.",
    description:
      "Klickhafen prüft WordPress-Formulare technisch und nachvollziehbar: Plugin-Einstellungen, Empfängeradresse, SMTP-Versand, Spam-Ordner, Weiterleitungen, Hosting-E-Mail, Pflichtfelder und Testversand. So wird aus einem unklaren Problem ein konkreter Prüfweg.",
    cta: "Kontaktformular prüfen lassen",
    icon: MessageCircleWarning,
    problems: [
      "Formular zeigt Erfolg, aber keine E-Mail kommt an",
      "Nachrichten landen im Spam oder werden vom Server abgelehnt",
      "Empfängeradresse, Weiterleitung oder Absender sind falsch gesetzt",
      "SMTP ist nicht eingerichtet oder fehlerhaft konfiguriert",
      "Formular-Plugin, Theme oder Sicherheitsplugin stört den Versand",
      "Kundenanfragen gehen verloren, obwohl die Website erreichbar ist",
    ],
    services: [
      "WordPress-Formular und Plugin-Einstellungen prüfen",
      "SMTP-Versand sauber einrichten oder vorhandene Konfiguration testen",
      "Empfänger, Absender, Reply-To und Weiterleitungen kontrollieren",
      "Spamfilter, Hosting-E-Mail und Domain-Einstellungen einordnen",
      "Testnachrichten senden und Fehler nachvollziehbar dokumentieren",
      "Kontaktwege verbessern, damit Anfragen zuverlässiger ankommen",
    ],
    faqs: [
      {
        question: "Warum kommt mein WordPress Kontaktformular nicht an?",
        answer:
          "Häufige Ursachen sind fehlendes SMTP, falsche Empfängeradressen, Spamfilter, Hosting-Einschränkungen, Plugin-Konflikte oder fehlerhafte Formular-Einstellungen.",
      },
      {
        question: "Kann Klickhafen das Formular direkt reparieren?",
        answer:
          "Wenn die nötigen Zugänge vorhanden sind und das System technisch mitspielt, kann Klickhafen die Ursache prüfen und passende Einstellungen vornehmen.",
      },
      {
        question: "Brauche ich ein neues Formular-Plugin?",
        answer:
          "Nicht immer. Oft reicht es, SMTP, Empfänger, Absender und Formularfelder sauber zu prüfen. Ein Plugin-Wechsel wird nur empfohlen, wenn er technisch sinnvoll ist.",
      },
    ],
    related: [
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "Ratgeber: Kontaktformular funktioniert nicht", href: "/ratgeber/wordpress-kontaktformular-funktioniert-nicht" },
      { label: "Website- & Shop-Hilfe", href: "/leistungen/website-shop-hilfe" },
      { label: "Kontakt aufnehmen", href: "/kontakt" },
    ],
  },
];

export function getSeoLandingPage(slug: string) {
  return seoLandingPages.find((page) => page.slug === slug);
}
