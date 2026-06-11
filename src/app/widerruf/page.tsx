import type { Metadata } from "next";
import { RotateCcw } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Widerruf | Klickhafen",
  description: "Widerrufsbelehrung für Verbraucher bei Klickhafen Dienstleistungen.",
  path: "/widerruf",
});

const links = [
  "Widerrufsrecht",
  "Widerrufsfrist",
  "Ausübung des Widerrufs",
  "Folgen des Widerrufs",
  "Dienstleistungen",
  "Muster-Widerrufsformular",
];

export default function WiderrufPage() {
  return (
    <LegalPage eyebrow="Widerruf" title="Widerrufsbelehrung" intro="Informationen zum gesetzlichen Widerrufsrecht für Verbraucher bei Dienstleistungen von Klickhafen." icon={RotateCcw} links={links}>
      <LegalSection title="Widerrufsrecht">
        <p>Verbraucher haben grundsätzlich das Recht, binnen 14 Tagen ohne Angabe von Gründen einen Vertrag zu widerrufen.</p>
      </LegalSection>
      <LegalSection title="Widerrufsfrist">
        <p>Die Widerrufsfrist beträgt 14 Tage ab dem Tag des Vertragsschlusses. Die Frist wird nicht auf 7 Tage verkürzt.</p>
      </LegalSection>
      <LegalSection title="Ausübung des Widerrufs">
        <p>Um das Widerrufsrecht auszuüben, genügt eine eindeutige Erklärung per E-Mail an {site.email}. Bitte nennen Sie, soweit möglich, Name, Kontaktdaten, Datum der Beauftragung und die betroffene Leistung.</p>
      </LegalSection>
      <LegalSection title="Folgen des Widerrufs">
        <p>Wenn ein Vertrag widerrufen wird, sind bereits empfangene Zahlungen nach den gesetzlichen Vorgaben zurückzugewähren. Wurde auf ausdrücklichen Wunsch bereits mit der Dienstleistung begonnen, kann Wertersatz für bereits erbrachte Leistungen geschuldet sein.</p>
      </LegalSection>
      <LegalSection title="Dienstleistungen">
        <p>Beginnt Klickhafen vor Ablauf der Widerrufsfrist mit der Ausführung, erfolgt dies bei Verbrauchern nur nach ausdrücklicher Zustimmung. Das Widerrufsrecht kann bei vollständiger Vertragserfüllung erlöschen, wenn der Kunde ausdrücklich zugestimmt und seine Kenntnis bestätigt hat.</p>
        <div className="rounded-lg bg-slate-50 p-5">
          <p>„Ich stimme ausdrücklich zu, dass Klickhafen vor Ablauf der gesetzlichen Widerrufsfrist mit der Ausführung der Dienstleistung beginnt.“</p>
          <p className="mt-3">„Mir ist bekannt, dass mein Widerrufsrecht bei vollständiger Vertragserfüllung erlöschen kann.“</p>
        </div>
      </LegalSection>
      <LegalSection title="Muster-Widerrufsformular">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p>An Klickhafen, E-Mail: {site.email}</p>
          <p className="mt-3">Hiermit widerrufe ich den von mir abgeschlossenen Vertrag über folgende Dienstleistung:</p>
          <p className="mt-3">Beauftragt am:</p>
          <p>Name des Verbrauchers:</p>
          <p>Anschrift des Verbrauchers:</p>
          <p>Datum:</p>
        </div>
        <p className="mt-4 text-sm text-slate-600">Stand: 11. Juni 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
