import type { Metadata } from "next";
import { CreditCard, FileText } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { PricingCard } from "@/components/pricing-card";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { carePlans, priceNotes } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Preise | Website-Hilfe ab 29 Euro pro Stunde | Klickhafen",
  description: "Transparente Preise für Website- & Shop-Hilfe, Pflegepakete, SEO und individuelle Website-Arbeiten.",
  path: "/preise",
});

export default function PreisePage() {
  return (
    <>
      <Section eyebrow="Preise" title="Transparente Preise für Website- & Shop-Hilfe" text="Klickhafen bleibt bezahlbar und verständlich: Einzelhilfe ab 29 Euro pro Stunde, Pflegepakete mit Monatskontingent und individuelle Angebote nach Absprache.">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-lg bg-cyan-950 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">Einmalige Website- & Shop-Hilfe</h2>
            <p className="mt-5 text-5xl font-semibold">29 Euro</p>
            <p className="mt-2 text-cyan-100">pro Stunde</p>
            <p className="mt-6 leading-7 text-cyan-50">Für einzelne Anpassungen, kleine Fehler, Einrichtungshilfe oder Unterstützung bei WordPress, Shopify, Wix, WooCommerce und Baukasten-Websites.</p>
            <div className="mt-8">
              <ButtonLink href="/kontakt" variant="secondary">Problem schildern</ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Weitere Leistungen</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-950">SEO & Sichtbarkeit</h3>
                <p className="mt-2 text-sm text-slate-650">Preis nach Absprache</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-5">
                <h3 className="font-semibold text-slate-950">Individuelle Website-Arbeiten</h3>
                <p className="mt-2 text-sm text-slate-650">Preis nach Absprache</p>
              </div>
            </div>
            <div className="mt-6">
              <CheckList items={priceNotes} />
            </div>
          </div>
        </div>
      </Section>
      <Section className="bg-slate-50" title="Pflegepakete" text="Regelmäßige Pflege statt Einzelstunden, monatlich kündbar und mit klaren Kontingenten.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {carePlans.map((plan) => <PricingCard key={plan.name} {...plan} />)}
        </div>
      </Section>
      <Section title="Zahlungsarten und Fixpreis-Projekte" text="Bei größeren Aufgaben kann vorab ein Angebot erstellt werden. Angebote sind 7 Tage gültig.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <CreditCard className="size-7 text-cyan-700" />
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Zahlungsarten</h2>
            <CheckList items={["PayPal", "Überweisung", "Crypto nach Absprache"]} />
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <FileText className="size-7 text-cyan-700" />
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Fixpreis-Modell</h2>
            <p className="mt-3 leading-7 text-slate-650">Bei vereinbarten Fixpreisen kann die Zahlung in drei Schritten erfolgen: 30 Prozent vor Beginn, 30 Prozent während der aktiven Umsetzung oder Änderungsphase, 40 Prozent nach vollständiger Abnahme.</p>
            <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm font-semibold text-slate-800">Beispiel: 20 Stunden x 29 Euro = 580 Euro.</p>
            <p className="mt-4 leading-7 text-slate-650">Ab 1.000 Euro Projektwert kann nach Absprache 25 Prozent Anzahlung vor Projektbeginn und der Restbetrag mit 30 Tagen Zahlungsziel angeboten werden.</p>
          </div>
        </div>
      </Section>
    </>
  );
}
