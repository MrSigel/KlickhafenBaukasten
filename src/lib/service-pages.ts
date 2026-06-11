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
      "Der Preis richtet sich nach Umfang, System und gewünschter Umsetzung. Nach einer kurzen Einschätzung kann ein individuelles Angebot oder eine transparente Abrechnung vereinbart werden.",
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
    title: "WordPress-Website erstellen, überarbeiten oder weiterentwickeln lassen",
    metaTitle: "WordPress-Website erstellen & überarbeiten | Klickhafen",
    metaDescription:
      "WordPress-Websites erstellen, überarbeiten und weiterentwickeln lassen: Relaunch, Elementor, mobile Ansicht, Formulare, Struktur und SEO-Grundlagen.",
    eyebrow: "WordPress Websites",
    intro:
      "Klickhafen erstellt neue WordPress-Websites, überarbeitet bestehende Seiten und unterstützt bei Relaunch, Redesign, Elementor, Formularen, mobiler Darstellung, Seitenstruktur und technischer Weiterentwicklung. Die Unterstützung erfolgt online für Castrop-Rauxel, das Ruhrgebiet und deutschlandweit.",
    cta: "WordPress-Projekt anfragen",
    icon: Wrench,
    tasks: [
      "neue WordPress-Website erstellen",
      "bestehende WordPress-Website überarbeiten",
      "Relaunch oder neues Design umsetzen",
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
      { label: "Kontaktformular funktioniert nicht", href: "/ratgeber/wordpress-kontaktformular-funktioniert-nicht" },
      { label: "WordPress mobil optimieren", href: "/ratgeber/wordpress-website-mobil-optimieren" },
      { label: "Elementor-Seite bearbeiten lassen", href: "/ratgeber/elementor-seite-bearbeiten-lassen" },
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
    title: "Shopify-Shop erstellen, überarbeiten oder weiterentwickeln lassen",
    metaTitle: "Shopify-Shop erstellen & überarbeiten | Klickhafen",
    metaDescription:
      "Shopify-Shop erstellen, überarbeiten und weiterentwickeln lassen: Produkte, Theme, Zahlungsarten, Versand, mobile Ansicht und SEO-Grundlagen.",
    eyebrow: "Shopify Shops",
    intro:
      "Klickhafen erstellt neue Shopify-Shops und entwickelt bestehende Shops weiter. Dazu gehören Produktseiten, Startseite, Kollektionen, Theme-Anpassungen, Zahlungsarten, Versand, mobile Ansicht und eine klare Shop-Struktur.",
    cta: "Shop-Projekt anfragen",
    icon: ShoppingBag,
    tasks: [
      "neuen Shopify-Shop erstellen",
      "bestehenden Shopify-Shop überarbeiten",
      "Shop-Design und Theme-Bereiche anpassen",
      "Produkte einpflegen",
      "Produkttexte anpassen",
      "Bilder austauschen",
      "Varianten pflegen",
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
      { label: "Shopify-Produkte einpflegen", href: "/ratgeber/shopify-produkte-einpflegen" },
      { label: "Zahlungsarten und Versand prüfen", href: "/ratgeber/shopify-zahlungsarten-versand-pruefen" },
      { label: "Website- & Shop-Hilfe", href: "/leistungen/website-shop-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: standardFaq,
  },
  {
    slug: "wix-hilfe",
    title: "Wix-Website erstellen, neu gestalten oder überarbeiten lassen",
    metaTitle: "Wix-Website erstellen & überarbeiten | Klickhafen",
    metaDescription:
      "Wix-Website erstellen, neu gestalten oder überarbeiten lassen: Struktur, Texte, Bilder, Formulare, mobile Ansicht, Domain und SEO-Grundlagen.",
    eyebrow: "Wix Websites",
    intro:
      "Klickhafen erstellt neue Wix-Websites, gestaltet bestehende Wix-Seiten neu und hilft bei Struktur, Texten, Bildern, Formularen, mobiler Ansicht, Domain-Verknüpfung und SEO-Grundlagen.",
    cta: "Wix-Projekt anfragen",
    icon: Blocks,
    tasks: [
      "neue Wix-Website erstellen",
      "bestehende Wix-Website neu gestalten",
      "Relaunch oder bessere Seitenstruktur umsetzen",
      "Texte ändern",
      "Bilder austauschen",
      "neue Abschnitte ergänzen",
      "mobile Ansicht verbessern",
      "Buttons und Links prüfen",
      "Kontaktformulare prüfen",
      "Seitenstruktur verbessern",
      "Domain-Anbindung prüfen",
      "SEO-Grundlagen bei Wix prüfen",
      "Impressum, Datenschutz oder rechtliche Seiten nach Kundenvorgabe einfügen",
      "kleine Darstellungsprobleme beheben",
    ],
    related: [
      { label: "Wix-Website bearbeiten lassen", href: "/ratgeber/wix-website-bearbeiten-lassen" },
      { label: "Baukasten-Hilfe", href: "/leistungen/baukasten-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: standardFaq,
  },
  {
    slug: "woocommerce-hilfe",
    title: "WooCommerce-Shop erstellen, überarbeiten oder verbessern lassen",
    metaTitle: "WooCommerce-Shop erstellen & überarbeiten | Klickhafen",
    metaDescription:
      "WooCommerce-Shop erstellen, überarbeiten und verbessern lassen: Produkte, Versand, Zahlungsarten, Checkout, mobile Ansicht und SEO-Grundlagen.",
    eyebrow: "WooCommerce Shops",
    intro:
      "Klickhafen erstellt WooCommerce-Shops auf WordPress-Basis und überarbeitet bestehende Shops. Dazu gehören Produktseiten, Shop-Struktur, Checkout, Zahlungsarten, Versand, mobile Ansicht und technische Verbesserungen.",
    cta: "Shop-Projekt anfragen",
    icon: ShoppingCart,
    tasks: [
      "neuen WooCommerce-Shop erstellen",
      "bestehenden WooCommerce-Shop überarbeiten",
      "Shop-Struktur und Produktseiten verbessern",
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
      { label: "WooCommerce-Checkout funktioniert nicht", href: "/ratgeber/woocommerce-checkout-funktioniert-nicht" },
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "Shopify-Hilfe", href: "/leistungen/shopify-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "Kontakt", href: "/kontakt" },
    ],
    faq: standardFaq,
  },
  {
    slug: "baukasten-hilfe",
    title: "Baukasten-Website erstellen, redesignen oder überarbeiten lassen",
    metaTitle: "Baukasten-Website erstellen & überarbeiten | Klickhafen",
    metaDescription:
      "Baukasten-Website erstellen, redesignen oder überarbeiten lassen: Strato, IONOS, Jimdo, Wix, Squarespace, Webflow und weitere Systeme.",
    eyebrow: "Baukasten Websites",
    intro:
      "Klickhafen erstellt neue Baukasten-Websites, redesignet bestehende Seiten und hilft bei Inhalten, Seitenstruktur, Bildern, Buttons, Formularen, mobiler Darstellung, Domain-Verknüpfung und SEO-Grundlagen.",
    cta: "Baukasten-Projekt anfragen",
    icon: HelpCircle,
    systems: ["Strato", "IONOS", "Jimdo", "Squarespace", "Webflow", "GoDaddy", "One.com", "Weebly", "Wix", "weitere Baukasten-Systeme"],
    tasks: [
      "neue Baukasten-Website erstellen",
      "bestehende Baukasten-Website redesignen",
      "Relaunch und bessere Seitenstruktur umsetzen",
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
      { label: "IONOS Baukasten überarbeiten", href: "/ratgeber/ionos-website-baukasten-ueberarbeiten" },
      { label: "Strato Baukasten Hilfe", href: "/ratgeber/strato-website-baukasten-hilfe" },
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
