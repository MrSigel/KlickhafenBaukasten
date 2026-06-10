import {
  Blocks,
  HelpCircle,
  RefreshCw,
  ShoppingBag,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  cta: string;
  icon: LucideIcon;
  tasks: string[];
  systems?: string[];
  related: Array<{ label: string; href: string }>;
  faq: Array<{ question: string; answer: string }>;
};

const standardFaq = [
  {
    question: "Wie schnell kann Klickhafen helfen?",
    answer:
      "Viele kleinere Anpassungen lassen sich nach kurzer Einschätzung zeitnah online prüfen. Der konkrete Start hängt vom Umfang und den vorhandenen Zugangsdaten ab.",
  },
  {
    question: "Was kostet die Hilfe?",
    answer:
      "Einzelne Website- und Shop-Hilfe wird transparent mit 29 Euro pro Stunde abgerechnet, sofern nichts anderes vereinbart wurde.",
  },
  {
    question: "Brauche ich technische Kenntnisse?",
    answer:
      "Nein. Sie schildern das Problem verständlich, Klickhafen prüft die Umsetzung und erklärt die nächsten Schritte klar und nachvollziehbar.",
  },
  {
    question: "Welche Zugangsdaten werden benötigt?",
    answer:
      "Je nach Aufgabe werden passende Zugänge zum System, Hosting, Shop, Domainanbieter oder Formularanbieter benötigt.",
  },
];

export const servicePages: ServicePage[] = [
  {
    slug: "wordpress-hilfe",
    title: "WordPress-Hilfe für bestehende Websites",
    metaTitle: "WordPress-Hilfe & WordPress-Websites | Klickhafen",
    metaDescription:
      "Hilfe bei bestehenden WordPress-Websites und Unterstützung bei neuen WordPress-Websites, Anpassungen, Formularen, mobiler Ansicht und SEO-Grundlagen.",
    eyebrow: "WordPress Support",
    intro:
      "Klickhafen hilft bei bestehenden WordPress-Websites, wenn Anpassungen, Fehlerbehebungen, neue Inhalte, Formularprobleme, mobile Darstellung oder kleine technische Änderungen notwendig sind. Die Unterstützung erfolgt online für Castrop-Rauxel, das Ruhrgebiet und deutschlandweit.",
    cta: "WordPress-Hilfe anfragen",
    icon: Wrench,
    tasks: [
      "Texte und Bilder ändern",
      "neue Unterseiten anlegen",
      "Elementor-Anpassungen",
      "Gutenberg-Anpassungen",
      "Kontaktformulare prüfen",
      "Menü und Footer anpassen",
      "mobile Ansicht verbessern",
      "kleine Fehler beheben",
      "Plugins prüfen",
      "WordPress-Grundeinstellungen prüfen",
      "WooCommerce-Anbindung nach Absprache",
      "SEO-Grundlagen prüfen",
    ],
    related: [
      { label: "Webdesign & Webentwicklung", href: "/leistungen/webdesign-webentwicklung" },
      { label: "WooCommerce-Hilfe", href: "/leistungen/woocommerce-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: standardFaq.concat({
      question: "Kann auch nur eine kleine Änderung umgesetzt werden?",
      answer:
        "Ja. Auch einzelne Textänderungen, Formularprüfungen, Plugin-Fragen oder kleinere Darstellungsfehler können angefragt werden.",
    }),
  },
  {
    slug: "shopify-hilfe",
    title: "Shopify-Hilfe für bestehende Online-Shops",
    metaTitle: "Shopify-Hilfe für Online-Shops | Klickhafen",
    metaDescription:
      "Hilfe bei Shopify-Shops: Produkte, Texte, Bilder, Zahlungsarten, Versand, Theme-Anpassungen und SEO-Grundlagen für bestehende Shops.",
    eyebrow: "Shopify Support",
    intro:
      "Klickhafen unterstützt bei Shopify-Shops, wenn Produkte, Texte, Bilder, Zahlungsarten, Versand, Seitenbereiche oder kleinere technische Einstellungen angepasst werden sollen.",
    cta: "Shopify-Hilfe anfragen",
    icon: ShoppingBag,
    tasks: [
      "Produkte einpflegen",
      "Produkttexte anpassen",
      "Bilder austauschen",
      "Kategorien / Kollektionen prüfen",
      "Zahlungsarten prüfen",
      "Versandoptionen prüfen",
      "Theme-Bereiche anpassen",
      "Startseite oder Produktseiten optimieren",
      "mobile Darstellung prüfen",
      "kleine Shop-Probleme lösen",
      "SEO-Grundlagen für Shopify prüfen",
    ],
    related: [
      { label: "Website- & Shop-Hilfe", href: "/leistungen/website-shop-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: standardFaq,
  },
  {
    slug: "wix-hilfe",
    title: "Wix-Hilfe für bestehende Websites",
    metaTitle: "Wix-Hilfe für bestehende Websites | Klickhafen",
    metaDescription:
      "Schnelle Wix-Hilfe für bestehende Websites: Texte, Bilder, mobile Ansicht, Formulare, Seitenstruktur und SEO-Grundlagen.",
    eyebrow: "Wix Website-Hilfe",
    intro:
      "Klickhafen hilft bei bestehenden Wix-Websites, wenn Inhalte geändert, neue Bereiche ergänzt, mobile Ansichten verbessert oder Einstellungen geprüft werden sollen.",
    cta: "Wix-Hilfe anfragen",
    icon: Blocks,
    tasks: [
      "Texte ändern",
      "Bilder austauschen",
      "neue Abschnitte ergänzen",
      "mobile Ansicht verbessern",
      "Buttons und Links prüfen",
      "Kontaktformulare prüfen",
      "Seitenstruktur verbessern",
      "SEO-Grundlagen bei Wix prüfen",
      "Impressum, Datenschutz oder rechtliche Seiten nach Kundenvorgabe einfügen",
      "kleine Darstellungsprobleme beheben",
    ],
    related: [
      { label: "Baukasten-Hilfe", href: "/leistungen/baukasten-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: standardFaq,
  },
  {
    slug: "woocommerce-hilfe",
    title: "WooCommerce-Hilfe für WordPress-Shops",
    metaTitle: "WooCommerce-Hilfe für WordPress-Shops | Klickhafen",
    metaDescription:
      "Hilfe bei WooCommerce-Shops: Produkte, Versand, Zahlungsarten, Checkout, mobile Ansicht und SEO-Grundlagen für WordPress-Shops.",
    eyebrow: "WooCommerce Support",
    intro:
      "Klickhafen unterstützt bei WooCommerce-Shops, wenn Produkte, Versand, Zahlungsarten, Shopseiten, Produktseiten oder kleinere technische Probleme angepasst werden sollen.",
    cta: "WooCommerce-Hilfe anfragen",
    icon: ShoppingCart,
    tasks: [
      "Produkte einpflegen",
      "Produkttexte ändern",
      "Produktbilder austauschen",
      "Kategorien prüfen",
      "Zahlungsarten prüfen",
      "Versandarten prüfen",
      "Warenkorb und Checkout prüfen",
      "WooCommerce-Einstellungen prüfen",
      "kleine Darstellungsfehler beheben",
      "mobile Shop-Ansicht verbessern",
      "SEO-Grundlagen für Produktseiten prüfen",
    ],
    related: [
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "Shopify-Hilfe", href: "/leistungen/shopify-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: standardFaq,
  },
  {
    slug: "baukasten-hilfe",
    title: "Baukasten-Hilfe für Websites von Strato, IONOS, Jimdo & Co.",
    metaTitle: "Baukasten-Hilfe für Strato, IONOS, Jimdo & Wix | Klickhafen",
    metaDescription:
      "Hilfe für Baukasten-Websites von Strato, IONOS, Jimdo, Wix, Squarespace & Co.: Inhalte, Formulare, mobile Ansicht und SEO-Grundlagen.",
    eyebrow: "Website-Baukasten Hilfe",
    intro:
      "Klickhafen hilft bei bestehenden Baukasten-Websites, wenn Inhalte, Seiten, Bilder, Buttons, Formulare, mobile Darstellung oder Grundeinstellungen angepasst werden sollen.",
    cta: "Baukasten-Hilfe anfragen",
    icon: HelpCircle,
    systems: ["Strato", "IONOS", "Jimdo", "Squarespace", "Webflow", "GoDaddy", "One.com", "Weebly", "Wix"],
    tasks: [
      "Texte ändern",
      "Bilder austauschen",
      "neue Abschnitte erstellen",
      "Kontaktformulare prüfen",
      "mobile Ansicht verbessern",
      "Buttons und Links anpassen",
      "Seitenstruktur verbessern",
      "Domain-Verbindung prüfen",
      "E-Mail-Verknüpfung prüfen",
      "SEO-Grundlagen prüfen",
    ],
    related: [
      { label: "Webdesign & Webentwicklung", href: "/leistungen/webdesign-webentwicklung" },
      { label: "Wix-Hilfe", href: "/leistungen/wix-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: standardFaq,
  },
  {
    slug: "website-pflege",
    title: "Website-Pflege für bestehende Websites & Shops",
    metaTitle: "Website-Pflege ab 59 € pro Monat | Klickhafen",
    metaDescription:
      "Regelmäßige Website-Pflege für WordPress, Shopify, Wix und Baukasten-Websites. Pflegepakete ab 59 € monatlich.",
    eyebrow: "Website Wartung",
    intro:
      "Klickhafen bietet regelmäßige Pflege für Websites und Shops, damit Inhalte, kleine Änderungen, Formulare, mobile Darstellung und SEO-Grundlagen regelmäßig geprüft und angepasst werden können.",
    cta: "Website-Pflege anfragen",
    icon: RefreshCw,
    tasks: [
      "kleine Text- und Bildänderungen",
      "Links, Buttons oder Kontaktdaten anpassen",
      "Inhalte aktualisieren",
      "kleinere Shop-Anpassungen",
      "Formular- und Darstellungsprüfung",
      "Produkt- und Inhaltsupdates",
      "mobile Ansicht prüfen",
      "SEO-Grundpunkte mit prüfen",
    ],
    related: [
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "Shopify-Hilfe", href: "/leistungen/shopify-hilfe" },
      { label: "Wix-Hilfe", href: "/leistungen/wix-hilfe" },
      { label: "Preise", href: "/preise" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: [
      {
        question: "Was ist in der Website-Pflege enthalten?",
        answer:
          "Je nach Paket sind regelmäßige kleine Anpassungen, Inhaltsupdates, Formularprüfungen, mobile Darstellungschecks und SEO-Grundpunkte enthalten.",
      },
      {
        question: "Was passiert mit nicht genutzten Stunden?",
        answer: "Nicht genutzte Stunden verfallen am Monatsende. Zusätzliche Stunden kosten 29 Euro pro Stunde.",
      },
      {
        question: "Kann das Pflegepaket monatlich gekündigt werden?",
        answer: "Ja, die Pflegepakete sind monatlich kündbar, sofern nichts anderes vereinbart wurde.",
      },
      {
        question: "Für welche Systeme eignet sich die Pflege?",
        answer:
          "Die Pflege eignet sich für WordPress, Shopify, Wix, WooCommerce und viele Baukasten-Websites nach technischer Machbarkeit.",
      },
    ],
  },
];

export const systemHelpLinks = servicePages.map((page) => ({
  title: page.title.replace(" für bestehende Websites", "").replace(" für bestehende Online-Shops", ""),
  href: `/leistungen/${page.slug}`,
  text: page.intro,
  icon: page.icon,
}));

export function getServicePage(slug: string) {
  return servicePages.find((page) => page.slug === slug);
}
