import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { PricingCard } from "@/components/pricing-card";
import { RelatedLinks } from "@/components/related-links";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { carePlans, helpTasks, priceNotes, systems } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "WordPress, Shopify & Wix Hilfe | Klickhafen",
  description: "Hilfe bei WordPress, Shopify, Wix, WooCommerce und Baukasten-Websites: Anpassungen, Fehler, Formulare, mobile Ansicht und Shop-Probleme.",
  path: "/leistungen/website-shop-hilfe",
});

export default function WebsiteShopHilfePage() {
  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Hauptleistung</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Website- & Shop-Hilfe für WordPress, Shopify, Wix & Baukästen
            </h1>
            <p className="mt-6 text-2xl font-semibold text-cyan-800">29 Euro pro Stunde</p>
            <p className="mt-5 text-lg leading-8 text-slate-650">
              Wir helfen bei bestehenden Websites und Shops, wenn etwas nicht funktioniert, angepasst werden soll oder Sie an einer Stelle nicht weiterkommen.
            </p>
            <p className="mt-5 rounded-lg bg-white p-5 leading-7 text-slate-700 shadow-sm ring-1 ring-slate-200">
              Keine großen Agenturpakete. Keine komplizierte Projektphase. Sie schildern Ihr Problem - wir helfen verständlich und direkt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/kontakt">Website-Hilfe anfragen</ButtonLink>
              <ButtonLink href="/preise" variant="secondary">Preise ansehen</ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <Section title="Unterstützte Systeme" text="Viele Aufgaben lassen sich online direkt prüfen. Shopware erfolgt nach Absprache.">
        <div className="flex flex-wrap gap-3">
          {systems.map((system) => <span key={system} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">{system}</span>)}
        </div>
      </Section>
      <Section className="bg-slate-50" title="Typische Hilfe" text="Von kleinen Darstellungsfehlern bis zu Shop-Einstellungen: Klickhafen unterstützt dort, wo bestehende Websites und Shops im Alltag hängen.">
        <CheckList columns items={helpTasks} />
      </Section>
      <Section title="Gezielte Hilfe für Ihr System" text="Für die wichtigsten Systeme gibt es eigene Unterseiten mit passenden Beispielen, FAQ und verwandten Leistungen.">
        <RelatedLinks
          links={[
            { label: "WordPress-Hilfe", href: "/leistungen/wordpress-hilfe" },
            { label: "Webdesign & Webentwicklung", href: "/leistungen/webdesign-webentwicklung" },
            { label: "Shopify-Hilfe", href: "/leistungen/shopify-hilfe" },
            { label: "Wix-Hilfe", href: "/leistungen/wix-hilfe" },
            { label: "WooCommerce-Hilfe", href: "/leistungen/woocommerce-hilfe" },
            { label: "Baukasten-Hilfe", href: "/leistungen/baukasten-hilfe" },
            { label: "Website-Pflege", href: "/leistungen/website-pflege" },
          ]}
        />
      </Section>
      <Section title="Pflegepakete als planbare Alternative" text="Regelmäßige Pflege statt Einzelstunden - für planbare monatliche Kosten.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {carePlans.map((plan) => <PricingCard key={plan.name} {...plan} />)}
        </div>
        <div className="mt-8 rounded-lg bg-slate-50 p-5">
          <CheckList items={priceNotes.concat(["monatlich kündbar", "Umsetzung nach technischer Machbarkeit und vorhandenen Zugängen", "keine Garantie für Drittanbieter-Systeme, Plugins, Themes oder externe Anbieter"])} />
        </div>
      </Section>
    </>
  );
}
