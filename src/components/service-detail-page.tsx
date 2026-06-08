import Script from "next/script";
import { ButtonLink } from "./button-link";
import { Breadcrumbs } from "./breadcrumbs";
import { CheckList } from "./check-list";
import { PricingCard } from "./pricing-card";
import { RelatedLinks } from "./related-links";
import { Section } from "./section";
import { FadeIn } from "./motion";
import { carePlans, priceNotes, site } from "@/lib/site";
import type { ServicePage } from "@/lib/service-pages";

export function ServiceDetailPage({ page }: { page: ServicePage }) {
  const Icon = page.icon;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.title,
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      email: site.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Gerther Straße 76",
        postalCode: "44577",
        addressLocality: "Castrop-Rauxel",
        addressCountry: "DE",
      },
    },
    areaServed: ["Castrop-Rauxel", "Dortmund", "Herne", "Bochum", "Ruhrgebiet", "Deutschland"],
    description: page.metaDescription,
  };

  return (
    <>
      <Script id={`${page.slug}-faq-json-ld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id={`${page.slug}-service-json-ld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs current={page.title} />
          <div className="max-w-4xl">
            <Icon className="size-10 text-cyan-700" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">{page.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{page.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-650">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/kontakt">{page.cta}</ButtonLink>
              <ButtonLink href="/preise" variant="secondary">Preise ansehen</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {page.systems ? (
        <Section title="Unterstützte Systeme" text="Viele Baukasten-Systeme lassen sich online prüfen und direkt bearbeiten, wenn passende Zugänge vorhanden sind.">
          <div className="flex flex-wrap gap-3">
            {page.systems.map((system) => (
              <span key={system} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">{system}</span>
            ))}
          </div>
        </Section>
      ) : null}

      <Section className={page.systems ? "bg-slate-50" : ""} title="Typische Leistungen" text="Die Unterstützung richtet sich an bestehende Websites und Shops, bei denen konkrete Anpassungen oder Prüfungen notwendig sind.">
        <CheckList columns items={page.tasks} />
      </Section>

      {page.slug === "website-pflege" ? (
        <Section className="bg-slate-50" title="Pflegepakete" text="Regelmäßige Website-Pflege für planbare monatliche Kosten.">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {carePlans.map((plan) => <PricingCard key={plan.name} {...plan} />)}
          </div>
          <div className="mt-8 rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <CheckList items={priceNotes.concat(["monatlich kündbar", "Umsetzung nach technischer Machbarkeit"])} />
          </div>
        </Section>
      ) : null}

      <Section className="bg-slate-50" title="Häufige Fragen" text="Kurze Antworten zu Ablauf, Kosten und Voraussetzungen.">
        <div className="grid gap-4 lg:grid-cols-2">
          {page.faq.map((item) => (
            <FadeIn key={item.question} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">{item.question}</h2>
              <p className="mt-3 leading-7 text-slate-650">{item.answer}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section title="Verwandte Leistungen" text="Weitere passende Leistungen und nächste Schritte.">
        <RelatedLinks links={page.related} />
      </Section>

      <section className="bg-cyan-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">Hilfe für Ihr System anfragen</h2>
            <p className="mt-4 text-lg leading-8 text-cyan-50">Schildern Sie kurz, wobei Sie Unterstützung benötigen. Klickhafen hilft online in Castrop-Rauxel, im Ruhrgebiet und deutschlandweit.</p>
          </div>
          <ButtonLink href="/kontakt" variant="secondary" className="shrink-0">{page.cta}</ButtonLink>
        </div>
      </section>
    </>
  );
}
