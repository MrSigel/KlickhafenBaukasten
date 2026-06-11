import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Datenschutz | Klickhafen",
  description: "Datenschutzerklärung von Klickhafen mit Informationen zu Kontakt, Hosting, Vercel Analytics, Speed Insights und Consent.",
  path: "/datenschutz",
});

const links = [
  "Verantwortlicher",
  "Allgemeine Hinweise",
  "Rechtsgrundlagen",
  "Speicherdauer",
  "Betroffenenrechte",
  "Kontakt und Kundendaten",
  "Hosting und Vercel",
  "Cookies und Consent",
  "Analyse und Performance",
  "Sicherheit",
  "Weitergabe und Drittanbieter",
  "Änderungen",
];

export default function DatenschutzPage() {
  return (
    <LegalPage eyebrow="Datenschutz" title="Datenschutzerklärung" intro={`Diese Datenschutzerklärung informiert über die Verarbeitung personenbezogener Daten auf ${site.domain} und bei Anfragen an Klickhafen.`} icon={ShieldCheck} links={links}>
      <LegalSection title="Verantwortlicher">
        <p>{site.name}, {site.owner}, {site.address}</p>
        <p>Kontakt: <a className="font-semibold text-cyan-800" href={`mailto:${site.email}`}>{site.email}</a></p>
      </LegalSection>
      <LegalSection title="Allgemeine Hinweise">
        <p>Personenbezogene Daten werden verarbeitet, soweit dies für den Betrieb der Website, die Bearbeitung von Anfragen, die Vertragsanbahnung, die Angebotserstellung, die Rechnungsstellung oder gesetzliche Pflichten erforderlich ist.</p>
      </LegalSection>
      <LegalSection title="Rechtsgrundlagen">
        <p>Die Verarbeitung erfolgt insbesondere auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bei Einwilligung, Art. 6 Abs. 1 lit. b DSGVO bei vorvertraglichen oder vertraglichen Maßnahmen, Art. 6 Abs. 1 lit. c DSGVO bei rechtlichen Pflichten und Art. 6 Abs. 1 lit. f DSGVO bei berechtigten Interessen.</p>
        <p>Einwilligungen können nach Art. 7 DSGVO jederzeit widerrufen werden. Betroffenenrechte richten sich insbesondere nach Art. 12 bis 23 DSGVO. Sicherheitsmaßnahmen werden nach Art. 32 DSGVO berücksichtigt. Je nach Verarbeitung können außerdem BDSG und TDDDG relevant sein.</p>
      </LegalSection>
      <LegalSection title="Speicherdauer">
        <p>Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen. Angebots-, Vertrags- und Rechnungsdaten können wegen handels- und steuerrechtlicher Pflichten länger gespeichert werden.</p>
      </LegalSection>
      <LegalSection title="Betroffenenrechte">
        <p>Betroffene Personen haben im Rahmen der gesetzlichen Vorgaben Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit, Widerspruch und Widerruf erteilter Einwilligungen.</p>
        <p>Außerdem besteht ein Beschwerderecht bei einer zuständigen Datenschutzaufsichtsbehörde.</p>
      </LegalSection>
      <LegalSection title="Kontakt und Kundendaten">
        <p>Bei Kontaktaufnahme per Formular oder E-Mail werden die übermittelten Angaben zur Bearbeitung der Anfrage verarbeitet. Dazu können Name, Unternehmen, E-Mail-Adresse, Website-URL, System / Plattform, Nachricht und freiwillig hochgeladene Dateien gehören.</p>
        <p>Bei Angebots- und Rechnungsprozessen können zusätzlich Leistungsdaten, Angebotsdaten, Zahlungsstatus, Rechnungsdaten und Kommunikationsverläufe verarbeitet werden.</p>
      </LegalSection>
      <LegalSection title="Hosting und Vercel">
        <p>Die Website ist für den Betrieb auf Vercel vorgesehen. Beim Aufruf können technisch notwendige Zugriffsdaten verarbeitet werden, zum Beispiel IP-Adresse, Zeitpunkt, Browserinformationen, angeforderte URL und übertragene Datenmenge.</p>
        <p>Hosting- und Sicherheitsdaten werden verarbeitet, damit die Website ausgeliefert, geschützt und technisch betrieben werden kann. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>
        <p>Weitere Informationen finden Sie in den Datenschutzhinweisen von Vercel als externem Anbieter.</p>
      </LegalSection>
      <LegalSection title="Cookies und Consent">
        <p>Notwendige Technologien werden genutzt, damit die Website technisch funktioniert, etwa für Darstellung, Sicherheit und die Speicherung der Cookie-Auswahl im Browser. Diese Speicherung ist erforderlich, damit die getroffene Auswahl berücksichtigt werden kann.</p>
        <p>Optionale Analyse- und Performance-Dienste werden erst geladen, wenn im Cookie-Banner die Kategorie „Analyse & Performance“ akzeptiert wurde. Die Auswahl kann über „Cookie-Einstellungen“ im Footer nachträglich geändert werden.</p>
        <p>Es werden keine eigenen Marketing-Cookies eingesetzt. Es wird kein Google Analytics, kein Meta Pixel und kein TikTok Pixel verwendet.</p>
      </LegalSection>
      <LegalSection title="Analyse und Performance">
        <p>Bei Zustimmung werden Vercel Analytics und Vercel Speed Insights geladen. Vercel Analytics dient der anonymisierten Auswertung von Seitenaufrufen und nutzt nach Angaben von Vercel keine Cookies. Vercel Speed Insights dient der anonymisierten Messung technischer Performance-Werte wie Core Web Vitals.</p>
        <p>Rechtsgrundlage für das Laden dieser optionalen Dienste ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO. Soweit Informationen im Endgerät gespeichert oder ausgelesen werden, erfolgt dies nach Ihrer Einwilligung gemäß § 25 TDDDG, soweit keine gesetzliche Ausnahme für technisch erforderliche Vorgänge greift.</p>
        <p>Weitere Informationen: <a className="font-semibold text-cyan-800" href="https://vercel.com/docs/analytics/privacy-policy">Vercel Web Analytics Privacy</a> und <a className="font-semibold text-cyan-800" href="https://vercel.com/docs/speed-insights/privacy-policy">Vercel Speed Insights Privacy</a>.</p>
      </LegalSection>
      <LegalSection title="Sicherheit">
        <p>Die Website nutzt technische und organisatorische Maßnahmen zum Schutz personenbezogener Daten. Dazu gehört insbesondere eine SSL-/TLS-verschlüsselte Übertragung, soweit die Website über HTTPS aufgerufen wird.</p>
      </LegalSection>
      <LegalSection title="Weitergabe und Drittanbieter">
        <p>Daten werden nur weitergegeben, wenn dies zur Bearbeitung der Anfrage, zur Vertragserfüllung, aufgrund gesetzlicher Pflichten oder mit Einwilligung erforderlich ist. Drittanbieter und externe Dienste können eigene Verantwortlichkeiten und Datenschutzbedingungen haben.</p>
      </LegalSection>
      <LegalSection title="Änderungen">
        <p>Diese Datenschutzerklärung kann angepasst werden, wenn sich technische, rechtliche oder organisatorische Anforderungen ändern.</p>
        <p>Stand: 11. Juni 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
