import type { Metadata } from "next";
import { Search } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { seoTasks } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "SEO Castrop-Rauxel | Suchmaschinenoptimierung | Klickhafen",
  description:
    "Suchmaschinenoptimierung in Castrop-Rauxel: SEO-Grundcheck, lokale SEO, technische Grundlagen und Sichtbarkeit für bestehende Websites.",
  path: "/leistungen/seo-sichtbarkeit",
});

export default function SeoPage() {
  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Search className="size-10 text-cyan-700" />
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">SEO & Suchmaschinenoptimierung für bestehende Websites</h1>
            <p className="mt-5 text-lg leading-8 text-slate-650">
              Klickhafen prüft technische und inhaltliche Grundlagen, damit bestehende Websites sauberer verstanden, indexiert und lokal besser eingeordnet werden können. Der Fokus liegt auf SEO in Castrop-Rauxel, lokaler Sichtbarkeit im Ruhrgebiet und realistischen Verbesserungen für bestehende Websites.
            </p>
            <p className="mt-6 text-xl font-semibold text-slate-950">Preis nach Absprache</p>
            <div className="mt-8">
              <ButtonLink href="/kontakt">SEO anfragen</ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <Section title="SEO-Leistungen" text="Realistische Unterstützung für WordPress, Shopify, Wix und Baukasten-Websites, ohne Ranking-Versprechen.">
        <CheckList columns items={seoTasks} />
      </Section>
      <Section className="bg-slate-50" title="Lokale SEO für Castrop-Rauxel und Umgebung" text="Viele Suchanfragen kommen regional: Suchmaschinenoptimierung Castrop-Rauxel, SEO Castrop-Rauxel, SEO Optimierung Castrop-Rauxel, Webdesign Castrop-Rauxel oder WordPress Wartung Dortmund. Klickhafen baut diese lokalen Signale natürlich in Seitenstruktur, Inhalte, Meta-Daten und technische Grundlagen ein.">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">SEO-Optimierung Castrop-Rauxel</h2>
            <p className="mt-3 leading-7 text-slate-650">Für lokale Unternehmen zählt, dass Google Ort, Leistung und Zielgruppe klar erkennt. Dafür werden Titel, Beschreibungen, Überschriften, interne Links und Inhalte sauber aufeinander abgestimmt.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Webdesign und responsive Grundlagen</h2>
            <p className="mt-3 leading-7 text-slate-650">Gute Sichtbarkeit hängt auch von sauberer mobiler Darstellung ab. Responsives Webdesign für Dortmund, Castrop-Rauxel und das Ruhrgebiet wird deshalb als technischer SEO-Grundpunkt mitgedacht.</p>
          </div>
        </div>
      </Section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-950">Seriöse SEO ohne Garantien</h2>
            <p className="mt-4 max-w-4xl leading-7 text-slate-650">
              SEO ist ein laufender Prozess. Wir geben keine Garantie für bestimmte Platzierungen bei Google, helfen aber dabei, technische und inhaltliche Grundlagen sauber aufzubauen.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
