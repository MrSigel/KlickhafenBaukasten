import type { Metadata } from "next";
import { Section } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { ButtonLink } from "@/components/button-link";
import { pageMetadata } from "@/lib/metadata";
import { systemHelpLinks } from "@/lib/service-pages";
import { services } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Leistungen | Webdesign, SEO & Website-Hilfe | Klickhafen",
  description:
    "Webdesign, SEO und Website-Hilfe für Castrop-Rauxel, Dortmund und Umgebung: Unterstützung für WordPress, Shopify, Wix und Baukasten-Systeme.",
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <Section eyebrow="Leistungen" title="Website-Hilfe, SEO und individuelle Arbeiten" text="Klickhafen unterstützt bestehende Websites und Shops schnell, verständlich und bezahlbar.">
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.title} {...service} />)}
        </div>
      </Section>
      <Section className="bg-slate-50" title="Gezielte Hilfe nach System" text="Für WordPress, Shopify, Wix, WooCommerce, Baukasten-Websites und regelmäßige Website-Pflege gibt es eigene Leistungsseiten mit klaren Beispielen und häufigen Fragen.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
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
            <h2 className="text-2xl font-semibold text-slate-950">Website- & Shop-Hilfe steht im Mittelpunkt</h2>
            <p className="mt-4 max-w-3xl leading-7 text-slate-650">Wenn WordPress, Shopify, Wix, WooCommerce oder ein Baukasten-System nicht macht, was es soll, beginnt Klickhafen mit einer verständlichen Einschätzung und hilft nach technischer Machbarkeit direkt weiter.</p>
            <div className="mt-6">
              <ButtonLink href="/leistungen/website-shop-hilfe">Hauptleistung ansehen</ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
