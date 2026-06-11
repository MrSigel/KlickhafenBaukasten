import type { Metadata } from "next";
import { Section } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { ButtonLink } from "@/components/button-link";
import { pageMetadata } from "@/lib/metadata";
import { systemHelpLinks } from "@/lib/service-pages";
import { services } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen | Webdesign, Website-Hilfe & SEO | Klickhafen",
  description:
    "Webdesign, Landingpages, WordPress-Websites, Website- & Shop-Hilfe, Pflegepakete und SEO-Grundlagen für bestehende und neue Websites.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <Section eyebrow="Leistungen" title="Webdesign, Website-Hilfe, Pflege und SEO" text="Klickhafen unterstützt neue Websites, Landingpages und bestehende Websites schnell, verständlich und sauber strukturiert.">
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.title} {...service} />)}
        </div>
      </Section>
      <Section className="bg-slate-50" title="Gezielte Hilfe nach System" text="Für WordPress, Shopify, Wix, WooCommerce, Baukasten-Websites und regelmäßige Website-Pflege gibt es eigene Leistungsseiten mit klaren Beispielen und häufigen Fragen.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Webdesign & Webentwicklung",
              href: "/leistungen/webdesign-webentwicklung",
              text: "Komplette Websites, Landingpages, Onepager und WordPress- oder Baukasten-Websites.",
              icon: services[0].icon,
            },
            ...systemHelpLinks,
            {
              title: "SEO & Sichtbarkeit",
              href: "/leistungen/seo-sichtbarkeit",
              text: "SEO-Grundcheck, lokale Sichtbarkeit und technische Grundlagen für bestehende Websites.",
              icon: services[1].icon,
            },
            {
              title: "Website- & Shop-Hilfe",
              href: "/leistungen/website-shop-hilfe",
              text: "Direkte Hilfe für bestehende Websites und Shops, wenn etwas nicht funktioniert oder angepasst werden soll.",
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
            <h2 className="text-2xl font-semibold text-slate-950">Neue Website oder bestehende Website verbessern</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-650">Wenn eine neue Website, Landingpage oder WordPress-Website entstehen soll, führt die Webdesign-Seite durch Umfang, Ablauf und typische Projekte. Wenn ein vorhandenes System nicht macht, was es soll, passt die Website- & Shop-Hilfe.</p>
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
