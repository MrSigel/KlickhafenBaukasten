import type { Metadata } from "next";
import { Section } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { ButtonLink } from "@/components/button-link";
import { pageMetadata } from "@/lib/metadata";
import { systemHelpLinks } from "@/lib/service-pages";
import { services } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen | Websites, Shops, Relaunch & Hilfe | Klickhafen",
  description:
    "Klickhafen erstellt Websites, Landingpages und Online-Shops von Grund auf und hilft bei Relaunch, Redesign, WordPress, Shopify, Wix, WooCommerce und Baukasten-Websites.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <Section eyebrow="Leistungen" title="Websites, Shops, Relaunch und Website-Hilfe" text="Klickhafen erstellt neue Websites, Landingpages und Online-Shops und unterstützt zusätzlich bei bestehenden Systemen, Relaunch, neuem Design, Pflege und technischer Weiterentwicklung.">
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.title} {...service} />)}
        </div>
      </Section>
      <Section className="bg-slate-50" title="Gezielte Umsetzung nach System" text="Für neue Projekte, Relaunches und bestehende Systeme wie WordPress, Shopify, Wix, WooCommerce und Baukasten-Websites gibt es eigene Leistungsseiten mit klaren Beispielen.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Webdesign & Webentwicklung",
              href: "/leistungen/webdesign-webentwicklung",
              text: "Komplette Websites, Landingpages, Onepager, Relaunches und individuelle Lösungen mit oder ohne Baukasten.",
              icon: services[0].icon,
            },
            {
              title: "Website erstellen lassen",
              href: "/leistungen/website-erstellen-lassen",
              text: "Neue Websites von 0 auf, passende Seitenstruktur, responsives Design und klare Anfragewege.",
              icon: services[0].icon,
            },
            {
              title: "Landingpage erstellen lassen",
              href: "/leistungen/landingpage-erstellen-lassen",
              text: "Landingpages und Onepager für Angebote, Dienstleistungen, lokale Kampagnen und konkrete Kontaktanfragen.",
              icon: services[0].icon,
            },
            ...systemHelpLinks,
            {
              title: "SEO & Sichtbarkeit",
              href: "/leistungen/seo-sichtbarkeit",
              text: "SEO-Grundcheck, lokale Sichtbarkeit und technische Grundlagen für neue und bestehende Websites.",
              icon: services[1].icon,
            },
            {
              title: "Website- & Shop-Hilfe",
              href: "/leistungen/website-shop-hilfe",
              text: "Direkte Hilfe und Weiterentwicklung für bestehende Websites und Shops, wenn etwas angepasst oder verbessert werden soll.",
              icon: services[0].icon,
            },
          ].map((service) => (
            <ServiceCard key={service.href} title={service.title} text={service.text} price="Mehr erfahren" href={service.href} icon={service.icon} />
          ))}
        </div>
      </Section>
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white p-8 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-semibold text-slate-950">Neue Website erstellen oder bestehende Website verbessern</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-650">Ob Website von 0, Landingpage, Online-Shop, Relaunch, neues Design oder technische Weiterentwicklung: Klickhafen hilft bei der passenden Umsetzung und bei bestehenden Systemen, die verbessert werden sollen.</p>
            <div className="mt-6">
              <ButtonLink href="/leistungen/webdesign-webentwicklung">Webdesign & Webentwicklung ansehen</ButtonLink>
              <ButtonLink href="/referenzen" variant="secondary" className="ml-0 mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto">Referenzen ansehen</ButtonLink>
              <ButtonLink href="/ratgeber" variant="secondary" className="ml-0 mt-3 w-full sm:ml-3 sm:mt-0 sm:w-auto">Ratgeber lesen</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
