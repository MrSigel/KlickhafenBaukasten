import {
  ArrowRight,
  CheckCircle,
  Code,
  Globe,
  LayoutTemplate,
  MessageCircle,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { Metadata } from "next";
import Script from "next/script";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { FadeIn, MotionDiv } from "@/components/motion";
import { Section } from "@/components/section";
import { ServiceCard } from "@/components/service-card";
import { PricingCard } from "@/components/pricing-card";
import { ReferenceCard } from "@/components/reference-card";
import { pageMetadata } from "@/lib/metadata";
import { getActiveReferences } from "@/lib/references";
import { systemHelpLinks } from "@/lib/service-pages";
import { carePlans, services, site, systems, trustPoints } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Klickhafen | Webdesign, Landingpages & Website-Hilfe",
  description:
    "Klickhafen erstellt moderne Websites und Landingpages mit WordPress oder Baukasten-Systemen und hilft bei bestehenden Websites, Shops und SEO-Grundlagen.",
  path: "/",
});

export const dynamic = "force-dynamic";

export default async function Home() {
  const references = await getActiveReferences(3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Klickhafen",
    url: site.url,
    email: site.email,
    areaServed: ["Deutschland", "Castrop-Rauxel", "Dortmund", "Herne", "Bochum", "Ruhrgebiet"],
    priceRange: "Individuell nach Umfang",
    serviceType: [
      "Webdesign",
      "Webentwicklung",
      "Landingpage erstellen lassen",
      "Website erstellen lassen",
      "WordPress-Website erstellen",
      "Baukasten-Website erstellen",
      "Website-Hilfe",
      "Shop-Hilfe",
      "Webdesign Castrop-Rauxel",
      "SEO Castrop-Rauxel",
      "Suchmaschinenoptimierung Castrop-Rauxel",
      "WordPress Wartung Dortmund",
      "Responsives Webdesign Dortmund",
    ],
    description: "Webdesign, Landingpages und Website-Hilfe für WordPress, Shopify, Wix, WooCommerce und Baukasten-Websites.",
  };

  // Source: Unsplash, Christopher Gower - https://unsplash.com/photos/m_HRfLhgABo
  const heroImageUrl =
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1800&q=82";
  const heroTrustPoints = [
    { label: "Websites & Landingpages", icon: LayoutTemplate },
    { label: "WordPress & Baukasten-Systeme", icon: MonitorSmartphone },
    { label: "Website-Hilfe & Pflege", icon: ShieldCheck },
    { label: "Online & deutschlandweit", icon: Globe },
  ];
  const entryCards = [
    {
      title: "Neue Website erstellen lassen",
      text: "Für Landingpages, Onepager und moderne Unternehmenswebsites mit WordPress oder passenden Baukasten-Systemen.",
      cta: "Website erstellen lassen",
      href: "/leistungen/webdesign-webentwicklung",
      icon: LayoutTemplate,
    },
    {
      title: "Bestehende Website verbessern",
      text: "Für neue Inhalte, bessere Struktur, mobile Optimierung, Formulare, Design-Anpassungen und technische Verbesserungen.",
      cta: "Website verbessern",
      href: "/kontakt",
      icon: Wrench,
    },
    {
      title: "Website- & Shop-Hilfe",
      text: "Für WordPress, Shopify, Wix, WooCommerce und Baukasten-Websites, wenn etwas nicht funktioniert oder angepasst werden soll.",
      cta: "Website-Hilfe ansehen",
      href: "/leistungen/website-shop-hilfe",
      icon: MessageCircle,
    },
  ];

  return (
    <>
      <Script id="home-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <img
          src={heroImageUrl}
          alt="Professioneller Arbeitsplatz mit Laptop für Website-Support"
          className="absolute inset-0 -z-20 h-full w-full object-cover object-center sm:object-[center_42%]"
        />
        <div className="absolute inset-0 -z-10 bg-slate-950/78" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,0.96)_0%,rgba(2,6,23,0.88)_46%,rgba(2,6,23,0.58)_100%)]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:min-h-[690px] lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div className="max-w-4xl">
            <MotionDiv
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
            >
              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                Websites, Landingpages & Website-Hilfe für Selbstständige und kleine Unternehmen
              </h1>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.16 }}
            >
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
                Klickhafen erstellt moderne Websites und Landingpages mit WordPress oder passenden Baukasten-Systemen
                und hilft zusätzlich bei bestehenden Websites, Shops, technischen Problemen und SEO-Grundlagen.
              </p>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.24 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <ButtonLink href="/kontakt" className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-300 sm:w-auto">
                Website-Projekt anfragen
              </ButtonLink>
              <ButtonLink
                href="/leistungen/website-shop-hilfe"
                variant="secondary"
                className="w-full border-white/35 bg-white/10 text-white backdrop-blur hover:border-cyan-200 hover:bg-white/15 hover:text-white sm:w-auto"
              >
                Bestehende Website verbessern
              </ButtonLink>
            </MotionDiv>
            <MotionDiv
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.32 }}
              className="mt-8 grid gap-3 sm:grid-cols-2"
            >
              {heroTrustPoints.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex min-h-12 items-center gap-3 rounded-md border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold text-white shadow-sm backdrop-blur"
                >
                  <Icon className="size-4 shrink-0 text-cyan-200" aria-hidden="true" />
                  <span className="min-w-0 break-words">{label}</span>
                </div>
              ))}
            </MotionDiv>
          </div>

          <MotionDiv
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.18 }}
            className="rounded-lg border border-white/15 bg-white/12 p-4 shadow-2xl backdrop-blur-md sm:p-5 lg:ml-auto lg:max-w-md"
          >
            <div className="rounded-lg bg-slate-950/75 p-5 ring-1 ring-white/10">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-semibold text-cyan-100">Neue Projekte & bestehende Websites</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">Sauber online auftreten</p>
                  <p className="mt-3 text-sm leading-6 text-slate-200">
                    Von der ersten Landingpage bis zur Verbesserung einer vorhandenen Website.
                  </p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-md bg-cyan-400/15 text-cyan-100">
                  <Code className="size-6" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-6 grid gap-3">
                {["Websites & Onepager", "Landingpages für Angebote", "WordPress- und Baukasten-Websites", "SEO-Grundlagen & mobile Ansicht"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md bg-white/10 px-4 py-3 text-sm font-semibold text-slate-50">
                    <CheckCircle className="size-4 shrink-0 text-cyan-200" aria-hidden="true" />
                    <span className="min-w-0 break-words">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
        </div>
      </section>

      <Section title="Der passende Einstieg für Ihr Website-Projekt" text="Ob neue Website, bessere Struktur oder konkrete Hilfe bei einem bestehenden System: Klickhafen unterstützt verständlich, sauber und online.">
        <div className="grid gap-5 lg:grid-cols-3">
          {entryCards.map(({ title, text, cta, href, icon: Icon }) => (
            <FadeIn key={title} className="flex min-h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="size-8 text-cyan-700" aria-hidden="true" />
              <h2 className="mt-5 text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 flex-1 leading-7 text-slate-650">{text}</p>
              <ButtonLink href={href} variant="secondary" className="mt-6 w-full sm:w-fit">
                {cta}
              </ButtonLink>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50" title="Für neue und bestehende Websites, Shops und Baukasten-Systeme" text="Klickhafen hilft Selbstständigen, kleinen Unternehmen und lokalen Betrieben aus Castrop-Rauxel, dem Ruhrgebiet und deutschlandweit bei neuen Websites, Landingpages und bestehenden Website-Problemen.">
        <div className="flex flex-wrap gap-3">
          {systems.slice(0, 13).map((system) => (
            <span key={system} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">{system}</span>
          ))}
        </div>
      </Section>

      <Section eyebrow="Regional & online" title="Webdesign, SEO und Website-Hilfe aus Castrop-Rauxel" text="Klickhafen unterstützt lokale Unternehmen in Castrop-Rauxel, Dortmund, Herne, Bochum und im Ruhrgebiet online bei Webdesign, Webentwicklung, SEO-Grundlagen und Website-Pflege. Dazu gehören neue Landingpages, WordPress-Websites, Baukasten-Websites und die Überarbeitung bestehender Seiten.">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["SEO Castrop-Rauxel", "Suchmaschinenoptimierung für bestehende Websites mit Fokus auf technische Grundlagen, Inhalte und lokale Auffindbarkeit."],
            ["Webdesign Castrop-Rauxel", "Neue Websites, Landingpages, saubere Unterseiten und responsive Gestaltung für Selbstständige, kleine Unternehmen und lokale Betriebe."],
            ["WordPress Wartung Dortmund", "Regelmäßige Pflege, kleine Fehlerbehebungen und übersichtliche Unterstützung für WordPress-Websites im Raum Dortmund."],
          ].map(([title, text]) => (
            <FadeIn key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-650">{text}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section title="Hilfe für Ihre Website oder Ihren Shop" text="Wählen Sie die passende Unterstützung für Ihr System. Jede Seite erklärt typische Aufgaben, Ablauf und verwandte Leistungen.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {systemHelpLinks.concat({
            title: "SEO & Sichtbarkeit",
            href: "/leistungen/seo-sichtbarkeit",
            text: "SEO-Grundcheck, lokale Sichtbarkeit und technische Grundlagen für bestehende Websites.",
            icon: Search,
          }).map((service) => (
            <ServiceCard key={service.href} title={service.title} text={service.text} price="Mehr erfahren" href={service.href} icon={service.icon} />
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50" eyebrow="Leistungen" title="Webdesign, Hilfe, Pflege und Sichtbarkeit aus einer Hand" text="Kleine Anpassungen und größere Projekte sind möglich. Vorab gibt es eine klare Einschätzung, welche Umsetzung zum Ziel passt.">
        <div className="grid gap-5 lg:grid-cols-3">
          {services.map((service) => <ServiceCard key={service.title} {...service} />)}
        </div>
      </Section>

      {references.length ? (
        <Section title="Ausgewählte Referenzen" text="Ein Blick auf ausgewählte Websites und Projekte, die mit Klickhafen umgesetzt oder betreut wurden.">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {references.map((reference) => (
              <ReferenceCard key={reference.id} reference={reference} />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href="/referenzen" variant="secondary">
              Alle Referenzen ansehen
            </ButtonLink>
          </div>
        </Section>
      ) : null}

      <Section title="Typische Probleme, bei denen wir helfen" text="Keine großen Agenturpakete. Keine komplizierte Projektphase. Sie schildern Ihr Problem, wir helfen verständlich und direkt.">
        <CheckList columns items={["Texte und Bilder ändern", "Buttons, Menüs und Footer anpassen", "Kontaktformulare prüfen", "mobile Ansicht verbessern", "Produkte, Zahlung und Versand prüfen", "Domain, E-Mail oder Veröffentlichung begleiten"]} />
      </Section>

      <Section className="bg-slate-50" title="Pflegepakete kurz erklärt" text="Regelmäßige Pflege statt Einzelstunden, für planbare monatliche Kosten.">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {carePlans.map((plan) => <PricingCard key={plan.name} {...plan} />)}
        </div>
      </Section>

      <Section title="Warum Klickhafen" text="Schnelle Hilfe soll verständlich, fair und erreichbar bleiben. Vorhandene Google-Bewertungen können auf Wunsch eingesehen werden, ohne dass hier Bewertungen erfunden werden.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {trustPoints.map(({ title, text, icon: Icon }) => (
            <FadeIn key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="size-7 text-cyan-700" />
              <h3 className="mt-4 text-lg font-semibold text-slate-950">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-650">{text}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <section className="bg-cyan-950 py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <Globe className="size-8 text-cyan-200" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Jetzt Unterstützung erhalten</h2>
            <p className="mt-4 text-lg leading-8 text-cyan-50">Schildern Sie kurz, wo es hakt. Klickhafen unterstützt online in Castrop-Rauxel, Dortmund, Herne, Bochum, im Ruhrgebiet und deutschlandweit.</p>
          </div>
          <ButtonLink href="/kontakt" variant="secondary" className="shrink-0">
            Jetzt Unterstützung erhalten <ArrowRight className="ml-2 size-4" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
