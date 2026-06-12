import type { Metadata } from "next";
import { ArrowRight, FileText, Target } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Landingpage erstellen lassen | Klickhafen",
  description:
    "Landingpage oder Onepager erstellen lassen: klare Angebotsstruktur, responsives Design, Kontaktformular, SEO-Grundlagen und Umsetzung mit WordPress, Baukasten oder individuell.",
  path: "/leistungen/landingpage-erstellen-lassen",
});

const tasks = [
  "Landingpage von 0 auf erstellen",
  "Onepager für Dienstleistung oder Angebot",
  "klare Abschnittsstruktur",
  "starker Kontaktweg oder Formular",
  "responsive Umsetzung",
  "SEO-Grundlagen",
  "WordPress, Baukasten oder individuelle Umsetzung",
  "Domain-Anbindung nach Absprache",
  "bestehende Landingpage überarbeiten",
];

export default function LandingpageErstellenPage() {
  return (
    <>
      <Section eyebrow="Landingpage erstellen lassen" title="Landingpages und Onepager für klare Anfragen" text="Klickhafen erstellt fokussierte Landingpages für Angebote, Dienstleistungen und Kampagnen. Die Seite wird auf ein klares Ziel, verständliche Inhalte und einen einfachen Kontaktweg ausgerichtet.">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Target className="size-8 text-cyan-700" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Fokus statt Ablenkung</h2>
            <p className="mt-3 leading-7 text-slate-650">
              Eine gute Landingpage erklärt schnell, worum es geht, baut Vertrauen auf und macht die Anfrage so einfach wie möglich.
            </p>
          </div>
          <div className="rounded-lg bg-cyan-950 p-6 text-white shadow-sm">
            <FileText className="size-8 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Landingpage anfragen</h2>
            <p className="mt-3 leading-7 text-cyan-50">Beschreiben Sie kurz Angebot, Zielgruppe und gewünschtes System. Danach kann der Umfang eingeschätzt werden.</p>
            <ButtonLink href="/kontakt" variant="secondary" className="mt-5">Landingpage anfragen <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
        </div>
      </Section>
      <Section className="bg-slate-50" title="Typische Leistungen" text="Geeignet für einzelne Angebote, lokale Dienstleistungen, Aktionen und schlanke Projektseiten.">
        <CheckList columns items={tasks} />
      </Section>
    </>
  );
}
