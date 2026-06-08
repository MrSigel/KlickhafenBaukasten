import {
  CheckCircle,
  Clock,
  Code,
  FileText,
  Globe,
  Layers,
  LineChart,
  Mail,
  MessageCircle,
  MonitorSmartphone,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Klickhafen",
  url: "https://klickhafen.net",
  domain: "klickhafen.net",
  email: "kontakt@klickhafen.net",
  owner: "Enrico Gross",
  businessType: "Einzelunternehmer",
  address: "Gerther Straße 76, 44577 Castrop-Rauxel, Deutschland",
};

export const navItems = [
  { href: "/", label: "Startseite" },
  { href: "/leistungen", label: "Leistungen" },
  { href: "/preise", label: "Preise" },
  { href: "/warum-klickhafen", label: "Warum Klickhafen" },
  { href: "/kontakt", label: "Kontakt" },
];

export const systems = [
  "WordPress",
  "Elementor",
  "WooCommerce",
  "Shopify",
  "Wix",
  "Strato",
  "IONOS",
  "Jimdo",
  "Squarespace",
  "Webflow",
  "GoDaddy",
  "One.com",
  "Weebly",
  "Shopware nach Absprache",
];

export const helpTasks = [
  "Texte ändern",
  "Bilder austauschen",
  "Buttons anpassen",
  "mobile Ansicht verbessern",
  "Kontaktformulare prüfen",
  "Produkte einpflegen",
  "Zahlungsarten prüfen",
  "Versandoptionen einstellen",
  "Plugins prüfen",
  "kleine Fehler beheben",
  "Domain verbinden",
  "E-Mail verbinden",
  "Website veröffentlichen",
  "neue Unterseiten anlegen",
  "bestehende Seiten anpassen",
  "Inhalte strukturieren",
  "Menü anpassen",
  "Footer anpassen",
  "kleine Shop-Probleme lösen",
  "rechtliche Seiten nach Kundenvorgabe einfügen",
  "Tracking oder externe Tools nach Absprache einbinden",
];

export const trustPoints = [
  { title: "Transparente Preise", text: "29 Euro pro Stunde für einzelne Website- und Shop-Hilfe.", icon: ShieldCheck },
  { title: "Schnelle Online-Hilfe", text: "Direkte Unterstützung ohne lange Agenturphase.", icon: Zap },
  { title: "Verständliche Umsetzung", text: "Klare Erklärung, saubere Anpassung, nachvollziehbare Abrechnung.", icon: MessageCircle },
  { title: "Deutschlandweit erreichbar", text: "Persönliche Hilfe online, auch für Castrop-Rauxel, Dortmund, Herne, Bochum und das Ruhrgebiet.", icon: Globe },
];

export const services: Array<{
  title: string;
  href: string;
  price: string;
  text: string;
  icon: LucideIcon;
  featured?: boolean;
}> = [
  {
    title: "Website- & Shop-Hilfe",
    href: "/leistungen/website-shop-hilfe",
    price: "29 Euro pro Stunde",
    text: "Hilfe bei bestehenden Websites und Shops, wenn etwas nicht funktioniert oder angepasst werden soll.",
    icon: Wrench,
    featured: true,
  },
  {
    title: "SEO & Sichtbarkeit",
    href: "/leistungen/seo-sichtbarkeit",
    price: "Preis nach Absprache",
    text: "Realistische SEO-Grundlagen für bestehende Websites, lokale Sichtbarkeit und saubere Indexierung.",
    icon: Search,
  },
  {
    title: "Individuelle Website-Arbeiten",
    href: "/preise",
    price: "Preis nach Absprache",
    text: "Größere Anpassungen, neue Unterseiten, Relaunch-Unterstützung und Sonderfunktionen.",
    icon: Code,
  },
];

export const carePlans = [
  {
    name: "Basis-Pflege",
    price: "59 Euro",
    hours: "bis zu 2 Stunden monatlich",
    items: [
      "kleine Text- und Bildänderungen",
      "Links, Buttons oder Kontaktdaten anpassen",
      "Kontaktformular kurz prüfen",
      "monatlicher SEO-Basischeck für eine wichtige Seite",
    ],
  },
  {
    name: "Standard-Pflege",
    price: "119 Euro",
    hours: "bis zu 4 Stunden monatlich",
    items: [
      "regelmäßige kleine Anpassungen",
      "Inhalte aktualisieren",
      "Seitenbereiche pflegen",
      "kleinere Shop-Anpassungen",
      "Formular- und Darstellungsprüfung",
    ],
  },
  {
    name: "Plus-Pflege",
    price: "179 Euro",
    hours: "bis zu 6 Stunden monatlich",
    items: [
      "laufende Website-Pflege",
      "Produkt- und Inhaltsupdates",
      "kleinere technische Anpassungen",
      "mobile Ansicht prüfen",
      "SEO-Grundpunkte mit prüfen",
    ],
  },
  {
    name: "Intensiv-Pflege",
    price: "299 Euro",
    hours: "bis zu 10 Stunden monatlich",
    items: [
      "umfangreichere monatliche Pflege",
      "regelmäßige Shop- oder Website-Anpassungen",
      "Produktpflege",
      "Inhaltsupdates",
      "Formular- und Funktionsprüfung",
      "priorisierte Bearbeitung nach Absprache",
    ],
  },
];

export const priceNotes = [
  "zusätzliche Stunden: 29 Euro pro Stunde",
  "nicht genutzte Stunden aus Pflegepaketen verfallen am Monatsende",
  "alle Leistungen erfolgen nach Absprache und technischer Machbarkeit",
  "bei größeren Aufgaben kann vorab ein Angebot erstellt werden",
  "Angebote sind 7 Tage gültig",
];

export const seoTasks = [
  "SEO-Grundcheck",
  "Meta-Titel prüfen",
  "Meta-Beschreibungen prüfen",
  "Überschriftenstruktur prüfen",
  "Texte für Google verbessern",
  "Bilder und Alt-Texte prüfen",
  "Google Search Console prüfen oder einrichten",
  "Sitemap prüfen",
  "robots.txt prüfen",
  "Indexierung prüfen",
  "lokale SEO",
  "technische SEO-Grundlagen prüfen",
  "interne Verlinkung prüfen",
  "bestehende Inhalte verbessern",
  "SEO für WordPress, Shopify, Wix und Baukasten-Websites",
];

export const iconMap = {
  CheckCircle,
  Clock,
  FileText,
  Layers,
  LineChart,
  Mail,
  MonitorSmartphone,
  Settings,
  ShoppingCart,
};
