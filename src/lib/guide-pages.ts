import {
  Blocks,
  CreditCard,
  FileText,
  Globe,
  LayoutTemplate,
  Link2,
  MailWarning,
  MonitorSmartphone,
  PackagePlus,
  Search,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type GuidePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  description: string;
  intro: string;
  icon: LucideIcon;
  context: string;
  causes: string[];
  checks: string[];
  help: string;
  faq: Array<{ question: string; answer: string }>;
  related: Array<{ label: string; href: string }>;
};

const ctaText =
  "Sie möchten das nicht selbst machen? Klickhafen unterstützt bei WordPress, Shopify, Wix, WooCommerce, Baukasten-Websites und kompletten Website-Projekten.";

export const guideCtaText = ctaText;

export const guidePages: GuidePage[] = [
  {
    slug: "wordpress-kontaktformular-funktioniert-nicht",
    title: "WordPress-Kontaktformular funktioniert nicht - was tun?",
    metaTitle: "WordPress-Kontaktformular funktioniert nicht | Klickhafen",
    metaDescription:
      "Mögliche Ursachen, erste Prüfungen und Hilfe, wenn ein WordPress-Kontaktformular keine Nachrichten sendet oder Fehler verursacht.",
    category: "WordPress",
    description: "Ursachen und erste Prüfungen, wenn ein Formular keine E-Mails sendet.",
    intro:
      "Wenn ein WordPress-Kontaktformular keine Nachrichten verschickt, liegt es oft nicht am sichtbaren Formular allein. Häufig spielen Plugin-Einstellungen, E-Mail-Versand, Spamfilter oder Hosting mit hinein.",
    icon: MailWarning,
    context:
      "Kontaktformulare sind ein wichtiger Anfrageweg. Wenn Nachrichten nicht ankommen, sollten Formular, Empfängeradresse, SMTP-Versand und Fehlermeldungen gemeinsam geprüft werden.",
    causes: ["falsche Empfängeradresse", "fehlender SMTP-Versand", "Plugin-Konflikte", "Spamfilter oder Hosting-Beschränkungen", "Pflichtfelder oder Bestätigungsmails falsch eingestellt"],
    checks: ["Testnachricht mit eigener E-Mail senden", "Spamordner prüfen", "Empfängeradresse im Formular kontrollieren", "Plugin-Updates und Fehlermeldungen ansehen", "prüfen, ob SMTP eingerichtet ist"],
    help:
      "Professionelle Hilfe ist sinnvoll, wenn trotz korrekter Adresse keine Nachrichten ankommen, mehrere Plugins beteiligt sind oder der Versand über SMTP eingerichtet werden soll.",
    faq: [
      { question: "Warum kommen Formular-E-Mails nicht an?", answer: "Häufig fehlen saubere Versand-Einstellungen oder der Webhoster blockiert unzuverlässige PHP-Mail-Zustellung." },
      { question: "Muss das Formular neu erstellt werden?", answer: "Nicht immer. Oft reicht eine Prüfung der Formular- und Mail-Einstellungen." },
      { question: "Kann SMTP helfen?", answer: "Ja, SMTP kann den Versand zuverlässiger machen, wenn es passend eingerichtet wird." },
    ],
    related: [
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "Website- & Shop-Hilfe", href: "/leistungen/website-shop-hilfe" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "wordpress-website-mobil-optimieren",
    title: "WordPress-Website mobil optimieren - typische Probleme und Lösungen",
    metaTitle: "WordPress-Website mobil optimieren | Klickhafen",
    metaDescription:
      "Typische Probleme bei der mobilen Ansicht von WordPress-Websites und wann professionelle Unterstützung sinnvoll ist.",
    category: "WordPress",
    description: "Was bei mobiler Darstellung, Abständen, Menüs und Formularen oft schiefgeht.",
    intro:
      "Eine WordPress-Website kann am Desktop ordentlich wirken und auf dem Smartphone trotzdem schwer nutzbar sein. Typisch sind zu breite Elemente, überlaufende Texte, verschobene Buttons oder unklare Menüs.",
    icon: MonitorSmartphone,
    context:
      "Mobile Optimierung betrifft Layout, Inhalte, Bilder, Formulare und Ladeverhalten. Gerade Elementor- oder Theme-Seiten brauchen oft getrennte Einstellungen für Desktop, Tablet und Smartphone.",
    causes: ["zu breite Spalten oder Bilder", "fehlende mobile Einstellungen im Builder", "lange Wörter oder Buttons", "ungünstige Abstände", "nicht getestete Formulare"],
    checks: ["wichtige Seiten am Smartphone öffnen", "Menü und Buttons testen", "Formular absenden", "Texte auf Umbrüche prüfen", "Bilder und Abschnitte auf Überbreite prüfen"],
    help:
      "Hilfe ist sinnvoll, wenn sich mobile Probleme über mehrere Seiten ziehen oder Theme, Elementor und eigene CSS-Regeln zusammenspielen.",
    faq: [
      { question: "Muss eine mobile Website komplett neu gebaut werden?", answer: "Nicht zwangsläufig. Viele Probleme lassen sich gezielt in Layout, Breakpoints und Abständen verbessern." },
      { question: "Ist Elementor mobil anpassbar?", answer: "Ja. Elementor bietet responsive Einstellungen, die aber sauber geprüft werden müssen." },
      { question: "Warum ist mobile Optimierung wichtig?", answer: "Viele Besucher kommen über Smartphones. Eine schlecht nutzbare Seite verliert schnell Anfragen." },
    ],
    related: [
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "Webdesign & Webentwicklung", href: "/leistungen/webdesign-webentwicklung" },
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
    ],
  },
  {
    slug: "elementor-seite-bearbeiten-lassen",
    title: "Elementor-Seite bearbeiten lassen - wann Hilfe sinnvoll ist",
    metaTitle: "Elementor-Seite bearbeiten lassen | Klickhafen",
    metaDescription:
      "Wann Unterstützung bei Elementor-Seiten sinnvoll ist und welche Aufgaben häufig bei bestehenden WordPress-Websites anfallen.",
    category: "WordPress",
    description: "Für bestehende Elementor-Seiten, die angepasst oder strukturell verbessert werden sollen.",
    intro:
      "Elementor macht viele Änderungen möglich, kann aber bei gewachsenen Seiten unübersichtlich werden. Kleine Anpassungen wirken manchmal auf Desktop, Tablet und Mobile unterschiedlich.",
    icon: Wrench,
    context:
      "Typische Aufgaben sind neue Abschnitte, geänderte Texte, Formularbereiche, Buttons, mobile Abstände oder eine bessere Seitenstruktur.",
    causes: ["verschachtelte Container", "unterschiedliche responsive Einstellungen", "alte Templates", "uneinheitliche Abstände", "fehlende globale Farben oder Schriftgrößen"],
    checks: ["Seite duplizieren oder sichern", "Änderungen auf mehreren Viewports testen", "Templates und globale Einstellungen prüfen", "nur notwendige Widgets verwenden", "Formulare nach Anpassungen testen"],
    help:
      "Unterstützung ist sinnvoll, wenn Anpassungen nicht nur optisch, sondern auch strukturell sauber und mobil stabil sein sollen.",
    faq: [
      { question: "Kann eine einzelne Elementor-Seite bearbeitet werden?", answer: "Ja. Auch einzelne Seiten oder Abschnitte können gezielt angepasst werden." },
      { question: "Bleibt die bestehende Website erhalten?", answer: "In der Regel ja. Änderungen können an bestehenden Seiten vorgenommen werden." },
      { question: "Kann Elementor langsam werden?", answer: "Zu viele Widgets, große Bilder oder ungünstige Strukturen können die Performance beeinflussen." },
    ],
    related: [
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "Website-Pflege", href: "/leistungen/website-pflege" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "shopify-produkte-einpflegen",
    title: "Shopify-Produkte einpflegen lassen - Texte, Bilder und Varianten",
    metaTitle: "Shopify-Produkte einpflegen lassen | Klickhafen",
    metaDescription:
      "Hilfe beim Einpflegen von Shopify-Produkten, Varianten, Bildern, Texten, Kategorien und grundlegenden Produktdaten.",
    category: "Shopify",
    description: "Produktdaten, Varianten, Bilder und Texte in Shopify sauber vorbereiten.",
    intro:
      "Produkte in Shopify brauchen mehr als nur einen Titel und Preis. Für verständliche Produktseiten sind Texte, Bilder, Varianten, Kategorien und Versandinformationen wichtig.",
    icon: PackagePlus,
    context:
      "Sauber gepflegte Produktdaten helfen Kunden beim Verständnis und erleichtern später Pflege, Filterung und Optimierung.",
    causes: ["fehlende Varianten", "uneinheitliche Bilder", "zu kurze Produkttexte", "falsche Kategorien oder Kollektionen", "unklare Versandinformationen"],
    checks: ["Produktbilder in passender Qualität sammeln", "Varianten und Preise vorbereiten", "Kollektionen planen", "SEO-Titel und Beschreibung prüfen", "Testbestellung oder Vorschau ansehen"],
    help:
      "Hilfe ist sinnvoll, wenn viele Produkte eingepflegt werden sollen oder Varianten, Bilder und Struktur einheitlich vorbereitet werden müssen.",
    faq: [
      { question: "Kann Klickhafen Produkte in Shopify einpflegen?", answer: "Ja, nach Absprache können Produkte, Bilder, Varianten und Texte strukturiert eingepflegt werden." },
      { question: "Müssen Texte fertig vorliegen?", answer: "Kundenvorgaben sind hilfreich. Bestehende Texte können strukturiert eingebunden werden." },
      { question: "Sind Varianten möglich?", answer: "Ja, Varianten wie Größen, Farben oder Ausführungen können geprüft und angelegt werden." },
    ],
    related: [
      { label: "Shopify-Hilfe", href: "/leistungen/shopify-hilfe" },
      { label: "Website- & Shop-Hilfe", href: "/leistungen/website-shop-hilfe" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "shopify-zahlungsarten-versand-pruefen",
    title: "Shopify-Zahlungsarten und Versand prüfen lassen",
    metaTitle: "Shopify-Zahlungsarten und Versand prüfen lassen | Klickhafen",
    metaDescription:
      "Was bei Shopify-Zahlungsarten, Versandzonen und Grundeinstellungen geprüft werden sollte, bevor Kunden bestellen.",
    category: "Shopify",
    description: "Zahlung, Versand und Checkout-Grundlagen in Shopify nachvollziehbar prüfen.",
    intro:
      "Wenn Kunden im Shopify-Shop nicht reibungslos bezahlen oder Versandarten nicht sehen, liegen die Ursachen oft in Zahlungsanbietern, Versandzonen oder Produktdaten.",
    icon: CreditCard,
    context:
      "Zahlung und Versand sollten vor dem Livegang und nach größeren Änderungen getestet werden, damit Bestellungen nicht an vermeidbaren Einstellungen scheitern.",
    causes: ["Zahlungsanbieter nicht vollständig aktiviert", "Versandzone fehlt", "Produktgewicht oder Standort fehlt", "Checkout-Einstellungen unklar", "Markt- oder Länder-Einstellungen passen nicht"],
    checks: ["Zahlungsanbieterstatus prüfen", "Versandzonen ansehen", "Produktgewichte kontrollieren", "Testbestellung durchführen", "Checkout am Smartphone prüfen"],
    help:
      "Professionelle Hilfe ist sinnvoll, wenn mehrere Versandregeln, Länder oder Zahlungsanbieter beteiligt sind und die Ursache nicht offensichtlich ist.",
    faq: [
      { question: "Warum wird eine Versandart nicht angezeigt?", answer: "Oft passen Versandzone, Produktgewicht, Standort oder Warenkorbwert nicht zur Regel." },
      { question: "Kann eine Testbestellung helfen?", answer: "Ja. Eine Testbestellung zeigt, ob Zahlung, Versand und Checkout zusammen funktionieren." },
      { question: "Kann Klickhafen Shopify-Einstellungen prüfen?", answer: "Ja, Einstellungen können nach vorhandenen Zugängen und technischer Machbarkeit geprüft werden." },
    ],
    related: [
      { label: "Shopify-Hilfe", href: "/leistungen/shopify-hilfe" },
      { label: "Shopify-Produkte einpflegen", href: "/ratgeber/shopify-produkte-einpflegen" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "woocommerce-checkout-funktioniert-nicht",
    title: "WooCommerce-Checkout funktioniert nicht - mögliche Ursachen",
    metaTitle: "WooCommerce-Checkout funktioniert nicht | Klickhafen",
    metaDescription:
      "Mögliche Ursachen, wenn der WooCommerce-Checkout nicht funktioniert, Zahlungsarten fehlen oder Bestellungen abbrechen.",
    category: "WooCommerce",
    description: "Checkout-Probleme in WooCommerce eingrenzen und typische Ursachen verstehen.",
    intro:
      "Ein nicht funktionierender WooCommerce-Checkout kann viele Ursachen haben: Zahlungsanbieter, Versandzonen, Pflichtfelder, Plugins oder Theme-Konflikte.",
    icon: ShoppingCart,
    context:
      "Der Checkout verbindet Warenkorb, Versand, Zahlung und E-Mail-Benachrichtigungen. Deshalb sollte nicht nur eine einzelne Einstellung isoliert geprüft werden.",
    causes: ["Plugin-Konflikte", "fehlende Zahlungsanbieter-Konfiguration", "Versandzone nicht passend", "JavaScript-Fehler im Theme", "Pflichtfelder oder Steuereinstellungen fehlerhaft"],
    checks: ["Checkout mit einfachem Produkt testen", "Versand und Zahlung separat prüfen", "Plugin-Updates kontrollieren", "Browser-Konsole auf Fehler prüfen", "Bestell-E-Mails testen"],
    help:
      "Hilfe ist sinnvoll, wenn echte Bestellungen betroffen sind oder Änderungen an Zahlungs- und Versandlogik sicher geprüft werden müssen.",
    faq: [
      { question: "Warum bricht der WooCommerce-Checkout ab?", answer: "Häufige Ursachen sind Plugin-Konflikte, Zahlungsanbieterfehler oder JavaScript-Probleme." },
      { question: "Sollte man Plugins einfach deaktivieren?", answer: "Nur vorsichtig und idealerweise mit Backup oder Staging, damit der Shop nicht zusätzlich ausfällt." },
      { question: "Kann Klickhafen WooCommerce prüfen?", answer: "Ja, kleinere WooCommerce-Probleme können nach technischer Machbarkeit geprüft werden." },
    ],
    related: [
      { label: "WooCommerce-Hilfe", href: "/leistungen/woocommerce-hilfe" },
      { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "wix-website-bearbeiten-lassen",
    title: "Wix-Website bearbeiten lassen - Inhalte, mobile Ansicht und Formulare",
    metaTitle: "Wix-Website bearbeiten lassen | Klickhafen",
    metaDescription:
      "Hilfe bei bestehenden Wix-Websites: Inhalte ändern, mobile Ansicht verbessern, Formulare prüfen und Seitenstruktur überarbeiten.",
    category: "Wix",
    description: "Bestehende Wix-Websites gezielt anpassen und mobil prüfen lassen.",
    intro:
      "Wix-Websites lassen sich direkt im Editor bearbeiten. Trotzdem entstehen häufig Probleme bei mobiler Ansicht, Abständen, Formularen oder der Seitenstruktur.",
    icon: Blocks,
    context:
      "Gerade bei gewachsenen Wix-Seiten lohnt sich eine strukturierte Prüfung, bevor viele einzelne Änderungen unübersichtlich werden.",
    causes: ["mobile Elemente verschoben", "Formular nicht getestet", "uneinheitliche Abschnitte", "alte Inhalte", "unklare Navigation"],
    checks: ["Desktop und Mobile vergleichen", "Formular testen", "Menü und Footer prüfen", "wichtige Texte aktualisieren", "SEO-Grunddaten ansehen"],
    help:
      "Unterstützung ist sinnvoll, wenn mehrere Seiten angepasst werden sollen oder mobile Darstellung und Anfragewege zuverlässig funktionieren müssen.",
    faq: [
      { question: "Kann eine bestehende Wix-Website bearbeitet werden?", answer: "Ja, Inhalte, Bilder, Abschnitte, Formulare und mobile Ansicht können geprüft und angepasst werden." },
      { question: "Brauche ich Zugang zum Wix-Konto?", answer: "Für direkte Änderungen wird ein passender Zugang oder eine Einladung benötigt." },
      { question: "Kann Wix auch für kleine Unternehmen reichen?", answer: "Ja, wenn Ziel, Umfang und spätere Pflege zum Baukasten passen." },
    ],
    related: [
      { label: "Wix-Hilfe", href: "/leistungen/wix-hilfe" },
      { label: "Baukasten-Hilfe", href: "/leistungen/baukasten-hilfe" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "ionos-website-baukasten-ueberarbeiten",
    title: "IONOS Website-Baukasten überarbeiten lassen",
    metaTitle: "IONOS Website-Baukasten überarbeiten lassen | Klickhafen",
    metaDescription:
      "Hilfe beim Überarbeiten bestehender IONOS Baukasten-Websites: Inhalte, Struktur, mobile Ansicht, Formulare und Domain-Grundlagen.",
    category: "Baukasten-Websites",
    description: "IONOS-Baukasten-Websites verständlich strukturieren und aktualisieren.",
    intro:
      "Eine IONOS-Baukasten-Website kann für kleine Unternehmen ausreichen, wenn Inhalte, Struktur, mobile Ansicht und Kontaktwege sauber gepflegt sind.",
    icon: LayoutTemplate,
    context:
      "Bei Baukasten-Websites geht es oft weniger um komplexe Entwicklung, sondern um klare Inhalte, gute Struktur und funktionierende Anfragewege.",
    causes: ["veraltete Texte", "ungünstige mobile Darstellung", "unvollständige Kontaktbereiche", "unklare Seitenstruktur", "Domain oder E-Mail nicht sauber verbunden"],
    checks: ["Startseite und Kontaktseite prüfen", "mobile Ansicht testen", "Bilder aktualisieren", "Formular testen", "Domain- und Veröffentlichungsstatus ansehen"],
    help:
      "Hilfe ist sinnvoll, wenn die Website moderner wirken oder schneller zu klaren Anfragen führen soll.",
    faq: [
      { question: "Kann ein IONOS Baukasten überarbeitet werden?", answer: "Ja, abhängig vom gebuchten System und vorhandenen Zugängen können Inhalte und Struktur angepasst werden." },
      { question: "Muss dafür eine neue Website gebaut werden?", answer: "Nicht immer. Häufig reicht eine gezielte Überarbeitung." },
      { question: "Kann die mobile Ansicht verbessert werden?", answer: "In vielen Fällen ja, soweit der Baukasten die nötigen Einstellungen erlaubt." },
    ],
    related: [
      { label: "Baukasten-Hilfe", href: "/leistungen/baukasten-hilfe" },
      { label: "Domain verbinden", href: "/ratgeber/domain-mit-website-verbinden" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "strato-website-baukasten-hilfe",
    title: "Strato Website-Baukasten Hilfe für bestehende Websites",
    metaTitle: "Strato Website-Baukasten Hilfe | Klickhafen",
    metaDescription:
      "Unterstützung für bestehende Strato Website-Baukasten-Seiten: Inhalte, mobile Ansicht, Formulare, Domain und Struktur prüfen.",
    category: "Baukasten-Websites",
    description: "Hilfe bei bestehenden Strato-Baukasten-Websites und typischen Anpassungen.",
    intro:
      "Strato-Baukasten-Websites lassen sich ohne klassische Programmierung pflegen, können aber bei Struktur, mobiler Ansicht oder Formularen Unterstützung brauchen.",
    icon: Blocks,
    context:
      "Wichtig sind klare Inhalte, aktuelle Kontaktdaten, eine verständliche Navigation und funktionierende Anfragewege.",
    causes: ["alte Inhalte", "nicht getestete Formulare", "uneinheitliche Abschnitte", "mobile Darstellungsprobleme", "Domain- oder Veröffentlichungsfragen"],
    checks: ["Kontaktinformationen prüfen", "Formular testen", "Seitenstruktur ansehen", "mobile Ansicht prüfen", "Impressum und Datenschutz nach Kundenvorgabe einbinden"],
    help:
      "Professionelle Hilfe ist sinnvoll, wenn die Website aktualisiert werden soll, ohne direkt auf ein anderes System umzuziehen.",
    faq: [
      { question: "Kann Klickhafen bei Strato helfen?", answer: "Ja, viele Inhalte und Einstellungen können nach vorhandenen Zugängen geprüft werden." },
      { question: "Kann eine Strato-Seite modernisiert werden?", answer: "Oft lassen sich Struktur, Inhalte und mobile Darstellung verbessern." },
      { question: "Sind rechtliche Seiten enthalten?", answer: "Rechtliche Inhalte können nach Kundenvorgabe eingebunden werden; Rechtsberatung erfolgt nicht." },
    ],
    related: [
      { label: "Baukasten-Hilfe", href: "/leistungen/baukasten-hilfe" },
      { label: "IONOS Baukasten überarbeiten", href: "/ratgeber/ionos-website-baukasten-ueberarbeiten" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "domain-mit-website-verbinden",
    title: "Domain mit Website verbinden - was dabei wichtig ist",
    metaTitle: "Domain mit Website verbinden | Klickhafen",
    metaDescription:
      "Was bei Domain-Verbindung, DNS, Weiterleitung, SSL und E-Mail zu beachten ist, wenn eine Website veröffentlicht werden soll.",
    category: "Domains & Technik",
    description: "Grundlagen zu Domain, DNS, SSL und Website-Veröffentlichung.",
    intro:
      "Eine Domain mit einer Website zu verbinden klingt einfach, kann aber je nach Anbieter, Hosting und Baukasten mehrere Einstellungen betreffen.",
    icon: Link2,
    context:
      "DNS-Einträge, Weiterleitungen, SSL-Zertifikate und E-Mail-Verknüpfungen sollten sauber geplant werden, damit Website und E-Mail erreichbar bleiben.",
    causes: ["falsche DNS-Einträge", "alte Weiterleitungen", "SSL noch nicht aktiv", "Domain zeigt auf falsches Ziel", "E-Mail-Einstellungen werden versehentlich verändert"],
    checks: ["Domainanbieter identifizieren", "Zielsystem klären", "DNS-Einträge dokumentieren", "E-Mail-Nutzung prüfen", "nach Änderung genug DNS-Zeit einplanen"],
    help:
      "Hilfe ist sinnvoll, wenn Website, Domain und E-Mail bei verschiedenen Anbietern liegen oder bestehende E-Mail-Adressen nicht gestört werden dürfen.",
    faq: [
      { question: "Wie lange dauert eine Domain-Verbindung?", answer: "Die Einstellung selbst kann schnell gehen, DNS-Änderungen brauchen aber manchmal einige Stunden." },
      { question: "Kann dabei E-Mail ausfallen?", answer: "Wenn falsche DNS-Einträge geändert werden, ja. Deshalb sollten bestehende Mail-Einträge vorher geprüft werden." },
      { question: "Was ist SSL?", answer: "SSL sorgt für verschlüsselte HTTPS-Verbindungen und sollte für öffentliche Websites aktiv sein." },
    ],
    related: [
      { label: "Webdesign & Webentwicklung", href: "/leistungen/webdesign-webentwicklung" },
      { label: "Website- & Shop-Hilfe", href: "/leistungen/website-shop-hilfe" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "website-mit-google-search-console-verbinden",
    title: "Website mit Google Search Console verbinden",
    metaTitle: "Website mit Google Search Console verbinden | Klickhafen",
    metaDescription:
      "Warum Google Search Console wichtig ist, wie eine Website grundsätzlich verbunden wird und wann SEO-Unterstützung sinnvoll ist.",
    category: "SEO-Grundlagen",
    description: "Google Search Console als Grundlage für Indexierung, Sitemap und Suchanfragen.",
    intro:
      "Die Google Search Console hilft zu verstehen, ob Google eine Website findet, welche Seiten indexiert sind und über welche Suchanfragen Besucher kommen.",
    icon: Search,
    context:
      "Für SEO-Grundlagen ist die Search Console ein wichtiger Baustein. Sie ersetzt keine Strategie, zeigt aber technische Hinweise und Suchdaten.",
    causes: ["Website noch nicht verifiziert", "Sitemap nicht eingereicht", "Seiten nicht indexiert", "robots.txt blockiert Inhalte", "Canonical oder Weiterleitungen sind unklar"],
    checks: ["Property anlegen", "Inhaberschaft verifizieren", "Sitemap einreichen", "wichtige URLs prüfen", "Indexierungsberichte regelmäßig ansehen"],
    help:
      "Unterstützung ist sinnvoll, wenn Verifizierung, Sitemap, Indexierung oder technische Meldungen nicht verständlich sind.",
    faq: [
      { question: "Ist Google Search Console kostenlos?", answer: "Ja, die Search Console ist ein kostenloses Google-Tool." },
      { question: "Garantiert die Einreichung eine gute Platzierung?", answer: "Nein. Sie hilft Google beim Erfassen, garantiert aber keine Rankings." },
      { question: "Sollte jede Website verbunden werden?", answer: "Für ernsthafte Websites ist es sehr sinnvoll, weil technische Probleme früher sichtbar werden." },
    ],
    related: [
      { label: "SEO & Sichtbarkeit", href: "/leistungen/seo-sichtbarkeit" },
      { label: "Domain verbinden", href: "/ratgeber/domain-mit-website-verbinden" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
  {
    slug: "landingpage-erstellen-lassen",
    title: "Landingpage erstellen lassen - was eine gute Seite enthalten sollte",
    metaTitle: "Landingpage erstellen lassen | Klickhafen",
    metaDescription:
      "Was eine gute Landingpage enthalten sollte und wie Klickhafen bei Struktur, Design, Kontaktformular und Umsetzung unterstützen kann.",
    category: "Landingpages",
    description: "Aufbau, Inhalte und Anfragewege für eine fokussierte Landingpage.",
    intro:
      "Eine Landingpage konzentriert sich auf ein Angebot, eine Dienstleistung oder eine Kampagne. Sie sollte schnell verständlich machen, worum es geht und wie eine Anfrage gestellt werden kann.",
    icon: FileText,
    context:
      "Gute Landingpages bestehen nicht nur aus schönem Design. Entscheidend sind klare Struktur, verständliche Texte, passende Bilder, Vertrauen und ein einfacher Kontaktweg.",
    causes: ["unklare Zielgruppe", "zu viele Ablenkungen", "fehlender CTA", "schwache mobile Darstellung", "Kontaktformular oder Tracking nicht geprüft"],
    checks: ["Ziel der Landingpage definieren", "ein Hauptangebot festlegen", "Kontaktweg klar platzieren", "mobile Ansicht prüfen", "SEO-Grundlagen und Ladezeit beachten"],
    help:
      "Professionelle Hilfe ist sinnvoll, wenn Strategie, Struktur, Design und technische Umsetzung zusammen geplant werden sollen.",
    faq: [
      { question: "Was ist der Unterschied zwischen Website und Landingpage?", answer: "Eine Website umfasst mehrere Bereiche, eine Landingpage fokussiert meist ein konkretes Ziel oder Angebot." },
      { question: "Kann eine Landingpage mit WordPress erstellt werden?", answer: "Ja. WordPress oder ein passender Baukasten können je nach Ziel sinnvoll sein." },
      { question: "Was kostet eine Landingpage?", answer: "Der Preis hängt vom Umfang, System und den gewünschten Funktionen ab. Nach einer Einschätzung ist ein Angebot möglich." },
    ],
    related: [
      { label: "Webdesign & Webentwicklung", href: "/leistungen/webdesign-webentwicklung" },
      { label: "Website-Projekt anfragen", href: "/kontakt" },
      { label: "Referenzen", href: "/referenzen" },
    ],
  },
];

export function getGuidePage(slug: string) {
  return guidePages.find((page) => page.slug === slug);
}
