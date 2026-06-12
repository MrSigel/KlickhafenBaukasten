import type { Metadata } from "next";
import { ArrowRight, CheckCircle, Globe } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Website erstellen lassen | Klickhafen",
  description:
    "Neue Website von Grund auf erstellen lassen: klare Struktur, responsives Design, WordPress, Baukasten-Systeme oder individuelle Umsetzung ohne Baukasten.",
  path: "/leistungen/website-erstellen-lassen",
});

const tasks = [
  "neue Website von 0 auf erstellen",
  "klare Seitenstruktur",
  "responsives Design für Desktop und Mobile",
  "Kontaktwege und Formular einrichten",
  "WordPress oder passendes Baukasten-System",
  "individuelle Umsetzung ohne Baukasten nach Absprache",
  "SEO-Grundlagen",
  "Domain- und E-Mail-Anbindung nach Absprache",
  "verständliche Übergabe",
];

export default function WebsiteErstellenPage() {
  return (
    <>
      <Section eyebrow="Website erstellen lassen" title="Neue Website von Grund auf erstellen lassen" text="Klickhafen erstellt komplette Websites für Selbstständige, lokale Betriebe und kleine Unternehmen. Die Umsetzung kann mit WordPress, einem passenden Baukasten-System oder individuell ohne Baukasten erfolgen.">
        <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Globe className="size-8 text-cyan-700" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Sauberer Aufbau statt Stückwerk</h2>
            <p className="mt-3 leading-7 text-slate-650">
              Inhalt, Struktur, mobile Ansicht, Kontaktwege und technische Grundlagen werden zusammen geplant, damit die Website verständlich wirkt und später gepflegt werden kann.
            </p>
          </div>
          <div className="rounded-lg bg-cyan-950 p-6 text-white shadow-sm">
            <CheckCircle className="size-8 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold">Projekt anfragen</h2>
            <p className="mt-3 leading-7 text-cyan-50">Schildern Sie kurz Ziel, Umfang und gewünschtes System. Danach kann der Aufwand sinnvoll eingeschätzt werden.</p>
            <ButtonLink href="/kontakt" variant="secondary" className="mt-5">Website-Projekt anfragen <ArrowRight className="ml-2 size-4" /></ButtonLink>
          </div>
        </div>
      </Section>
      <Section className="bg-slate-50" title="Typische Leistungen" text="Der Umfang richtet sich nach Ziel, Inhalten, System und gewünschter Pflege.">
        <CheckList columns items={tasks} />
      </Section>
    </>
  );
}
