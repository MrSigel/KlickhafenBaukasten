import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "AGB | Klickhafen",
  description: "Allgemeine Geschäftsbedingungen für Klickhafen Website- und Shop-Hilfe.",
  path: "/agb",
});

const links = [
  "Geltungsbereich",
  "Leistungen",
  "Vertragsschluss",
  "Mitwirkungspflichten",
  "Preise und Abrechnung",
  "Fixpreis-Projekte",
  "Zahlung und Abnahme",
  "Drittanbieter und SEO",
  "Haftung",
  "Widerruf und Kündigung",
  "Schlussbestimmungen",
];

export default function AgbPage() {
  return (
    <LegalPage eyebrow="AGB" title="Allgemeine Geschäftsbedingungen" intro="Regelungen für Website- & Shop-Hilfe, Pflegepakete, SEO & Sichtbarkeit und individuelle Website-Arbeiten." icon={FileText} links={links}>
      <LegalSection title="Geltungsbereich">
        <p>Diese AGB gelten für Leistungen von Klickhafen gegenüber Kunden, sofern keine abweichende individuelle Vereinbarung getroffen wurde. Vertragspartner ist Klickhafen, Enrico Gross, Gerther Straße 76, 44577 Castrop-Rauxel.</p>
      </LegalSection>
      <LegalSection title="Leistungen">
        <p>Klickhafen bietet Website- & Shop-Hilfe für bestehende Websites, Shops und Baukasten-Systeme an, insbesondere für WordPress, Elementor, WooCommerce, Shopify, Wix, Strato, IONOS, Jimdo, Squarespace, Webflow, GoDaddy, One.com, Weebly und Shopware nach Absprache.</p>
        <p>Leistungen können Website- & Shop-Hilfe, SEO & Sichtbarkeit, Pflegepakete, individuelle Website-Arbeiten, größere Anpassungen, neue Unterseiten, technische Erweiterungen, Strukturverbesserungen und Relaunch-Unterstützung umfassen.</p>
      </LegalSection>
      <LegalSection title="Vertragsschluss">
        <p>Eine Beauftragung erfolgt durch Annahme eines schriftlichen oder digitalen Angebots. Die Annahme kann per Unterschrift, E-Mail-Bestätigung, Scan oder Foto erfolgen. Angebote sind 7 Tage ab Angebotsdatum gültig.</p>
        <p>Die Ausführung beginnt erst nach Angebotsannahme. Bei Verbrauchern beginnt die Ausführung vor Ablauf der Widerrufsfrist nur nach ausdrücklicher Zustimmung.</p>
      </LegalSection>
      <LegalSection title="Mitwirkungspflichten">
        <p>Der Kunde stellt richtige Zugangsdaten, notwendige Inhalte, Texte, Bilder, Logos, rechtliche Inhalte nach Kundenvorgabe, Lizenzen, Rechte an Materialien und Informationen zur gewünschten Änderung bereit.</p>
        <p>Vor größeren Änderungen werden Backups empfohlen. Soweit möglich, stellt der Kunde ein Backup bereit oder stimmt einer Backup-Erstellung zu.</p>
      </LegalSection>
      <LegalSection title="Preise und Abrechnung">
        <p>Preise können stundenbasiert, paketbasiert oder individuell vereinbart sein. Stundenbasierte Leistungen kosten 29 Euro pro Stunde, sofern nichts anderes vereinbart wurde.</p>
        <p>Pflegepakete: Basis-Pflege 59 Euro / Monat bis zu 2 Stunden, Standard-Pflege 119 Euro / Monat bis zu 4 Stunden, Plus-Pflege 179 Euro / Monat bis zu 6 Stunden, Intensiv-Pflege 299 Euro / Monat bis zu 10 Stunden.</p>
        <p>Nicht genutzte Stunden aus Pflegepaketen verfallen am Monatsende. Zusätzliche Stunden werden mit 29 Euro pro Stunde berechnet. Kurze Zusatzaufwände können kulant behandelt werden. Pflegepakete werden monatlich im Voraus berechnet, sofern nichts anderes vereinbart wurde.</p>
      </LegalSection>
      <LegalSection title="Fixpreis-Projekte">
        <p>Bei vereinbarten Fixpreisen kann die Zahlung in drei Schritten erfolgen: 30 Prozent vor Beginn, 30 Prozent während der aktiven Umsetzung oder Änderungsphase und 40 Prozent nach vollständiger Abnahme.</p>
        <p>Ab 1.000 Euro Projektwert kann nach Absprache 25 Prozent Anzahlung vor Projektbeginn und der Restbetrag mit 30 Tagen Zahlungsziel angeboten werden.</p>
      </LegalSection>
      <LegalSection title="Zahlung und Abnahme">
        <p>Zahlungsarten sind PayPal, Überweisung und Kryptowährungen nach Absprache. Zahlungsfristen ergeben sich aus Angebot oder Rechnung. Nach Fertigstellung kann der Kunde die Leistung prüfen und Abnahme erklären oder nachvollziehbare Mängel mitteilen.</p>
        <p>Änderungen, die über den vereinbarten Umfang hinausgehen, gelten als Zusatzaufwand und können zusätzlich berechnet werden.</p>
      </LegalSection>
      <LegalSection title="Drittanbieter und SEO">
        <p>Klickhafen hat keinen vollständigen Einfluss auf Hostinganbieter, Plugins, Themes, Baukastenanbieter, Zahlungsanbieter, externe Schnittstellen, Updates von Drittanbietern, Sperrungen oder Änderungen externer Plattformen. Leistungen erfolgen nach technischer Machbarkeit und vorhandenen Zugängen.</p>
        <p>Für SEO & Sichtbarkeit wird keine Garantie für konkrete Google-Rankings, Positionen, Besucherzahlen oder Umsatzsteigerungen übernommen.</p>
      </LegalSection>
      <LegalSection title="Haftung">
        <p>Klickhafen haftet nach den gesetzlichen Vorschriften. Für Einschränkungen, Ausfälle oder Änderungen durch Drittanbieter-Systeme wird keine Garantie übernommen, soweit diese außerhalb des direkten Einflussbereichs liegen.</p>
      </LegalSection>
      <LegalSection title="Widerruf und Kündigung">
        <p>Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu. Details finden sich in der Widerrufsbelehrung. Pflegepakete sind monatlich kündbar, sofern nichts anderes vereinbart wurde.</p>
      </LegalSection>
      <LegalSection title="Schlussbestimmungen">
        <p>Es gilt deutsches Recht, soweit gesetzlich zulässig. Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen Regelungen unberührt.</p>
      </LegalSection>
    </LegalPage>
  );
}
