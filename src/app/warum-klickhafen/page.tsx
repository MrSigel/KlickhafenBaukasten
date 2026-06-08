import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Section } from "@/components/section";
import { FadeIn } from "@/components/motion";
import { pageMetadata } from "@/lib/metadata";
import { trustPoints } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Warum Klickhafen | Persönliche Website-Hilfe",
  description: "Transparente Preise, persönliche Unterstützung und schnelle Hilfe bei WordPress, Shopify, Wix und Baukasten-Websites.",
  path: "/warum-klickhafen",
});

const reasons = [
  "keine großen Agenturpakete",
  "schnelle Online-Hilfe",
  "verständliche Kommunikation",
  "persönliche Unterstützung",
  "Erfahrung mit Websites, Shops und Baukasten-Systemen",
  "Hilfe für Selbstständige, kleine Unternehmen und lokale Betriebe",
  "Unterstützung deutschlandweit",
  "klare Abrechnung",
  "vorherige Einschätzung möglich",
];

export default function WarumPage() {
  return (
    <>
      <Section eyebrow="Warum Klickhafen" title="Transparente Hilfe statt großer Agenturpakete" text="Klickhafen richtet sich an Menschen, die mit ihrer bestehenden Website oder ihrem Shop konkret weiterkommen wollen: schnell, verständlich und fair abgerechnet.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ title, text, icon: Icon }) => (
            <FadeIn key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="size-7 text-cyan-700" />
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-650">{text}</p>
            </FadeIn>
          ))}
        </div>
      </Section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <div key={reason} className="rounded-lg bg-white p-5 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200">{reason}</div>
            ))}
          </div>
          <div className="mt-10 rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-950">Vertrauen ohne erfundene Referenzen</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-650">Vorhandene Google-Bewertungen können erwähnt und eingesehen werden. Auf dieser Website werden keine Bewertungen, Kundendaten oder Referenzen erfunden.</p>
            <div className="mt-6">
              <ButtonLink href="/kontakt">Kontakt aufnehmen</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
