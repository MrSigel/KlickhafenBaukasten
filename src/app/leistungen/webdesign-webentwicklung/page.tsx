import type { Metadata } from "next";
import Script from "next/script";
import {
  ArrowRight,
  CheckCircle,
  ClipboardList,
  Code,
  FileText,
  Globe,
  LayoutTemplate,
  MonitorSmartphone,
  Search,
  Settings,
} from "lucide-react";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { FadeIn } from "@/components/motion";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website erstellen lassen, Landingpage & Relaunch | Klickhafen",
  description:
    "Websites, Landingpages, Onepager und Online-Shops erstellen oder überarbeiten lassen: WordPress, Baukasten-Systeme, Relaunch, Redesign und individuelle Lösungen.",
  path: "/leistungen/webdesign-webentwicklung",
});

const included = [
  "komplette Websites von 0 auf",
  "Landingpages und Onepager",
  "kleine Unternehmenswebsites",
  "WordPress-Websites",
  "Baukasten-Websites",
  "individuelle Lösungen ohne Baukasten",
  "Relaunch bestehender Websites",
  "neues Design für vorhandene Websites",
  "technische Weiterentwicklung",
  "responsive Umsetzung",
  "Kontaktformular",
  "klare Seitenstruktur",
  "SEO-Grundlagen",
  "technische Einrichtung",
  "Domain- und E-Mail-Anbindung nach Absprache",
  "Inhalte, Bilder und Texte nach Kundenvorgabe",
  "rechtliche Seiten nach Kundenvorgabe einbinden",
];

const audiences = [
  "Selbstständige",
  "kleine Unternehmen",
  "lokale Betriebe",
  "Vereine",
  "Dienstleister",
  "Handwerker",
  "Coaches",
  "Praxen",
  "kleine Online-Projekte",
];

const projects = [
  ["Landingpage für ein Angebot", LayoutTemplate],
  ["Onepager für lokale Dienstleister", FileText],
  ["WordPress-Website für kleine Unternehmen", Code],
  ["Baukasten-Website mit sauberer Struktur", MonitorSmartphone],
  ["Relaunch einer vorhandenen Website", Settings],
  ["Kontakt- und Anfrage-Website", ClipboardList],
] as const;

const steps = [
  "Anfrage stellen",
  "Ziel und Inhalte klären",
  "Struktur und Umfang festlegen",
  "Umsetzung mit WordPress oder Baukasten",
  "Prüfung auf Desktop und Mobile",
  "Veröffentlichung und Übergabe",
];

const faq = [
  {
    question: "Erstellt Klickhafen komplette Websites?",
    answer:
      "Ja. Klickhafen erstellt komplette Websites, Onepager und Landingpages für Selbstständige, kleine Unternehmen und lokale Betriebe.",
  },
  {
    question: "Kann meine Website mit WordPress umgesetzt werden?",
    answer:
      "Ja. WordPress eignet sich für viele Unternehmenswebsites, Landingpages und später erweiterbare Projekte. Die konkrete Umsetzung hängt vom Ziel und Umfang ab.",
  },
  {
    question: "Sind auch Baukasten-Websites möglich?",
    answer:
      "Ja. Je nach Ziel, Budget und gewünschter Pflege kann ein passendes Baukasten-System sinnvoll sein. Klickhafen hilft bei Auswahl und Umsetzung.",
  },
  {
    question: "Kann ich eine Landingpage erstellen lassen?",
    answer:
      "Ja. Landingpages für Angebote, Dienstleistungen oder lokale Kampagnen können klar strukturiert und auf Anfragewege ausgelegt werden.",
  },
  {
    question: "Werden Inhalte und mobile Ansicht berücksichtigt?",
    answer:
      "Ja. Inhalte, Bilder und Texte werden nach Kundenvorgabe eingebunden. Die Darstellung wird auf Desktop und Mobile geprüft.",
  },
  {
    question: "Was kostet eine neue Website?",
    answer:
      "Der Preis hängt vom Umfang, System und den gewünschten Funktionen ab. Nach einer kurzen Einschätzung kann ein individuelles Angebot erstellt werden.",
  },
];

export default function WebdesignWebentwicklungPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: site.url },
      { "@type": "ListItem", position: 2, name: "Leistungen", item: `${site.url}/leistungen` },
      {
        "@type": "ListItem",
        position: 3,
        name: "Webdesign & Webentwicklung",
        item: `${site.url}/leistungen/webdesign-webentwicklung`,
      },
    ],
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Webdesign & Webentwicklung für Websites, Landingpages und Shops",
    provider: {
      "@type": "ProfessionalService",
      name: site.name,
      url: site.url,
      email: site.email,
    },
    areaServed: ["Castrop-Rauxel", "Dortmund", "Herne", "Bochum", "Ruhrgebiet", "Deutschland"],
    serviceType: ["Webdesign", "Webentwicklung", "Landingpage erstellen lassen", "WordPress-Website erstellen", "Baukasten-Website erstellen", "Website-Relaunch", "Shop erstellen"],
    description:
      "Moderne Websites, Landingpages, kleine Unternehmenswebsites, Shops, Relaunches und individuelle Lösungen mit oder ohne Baukasten.",
  };

  return (
    <>
      <Script id="webdesign-faq-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <Script id="webdesign-breadcrumb-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id="webdesign-service-json-ld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumbs current="Webdesign & Webentwicklung" />
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="max-w-4xl">
              <Code className="size-10 text-cyan-700" aria-hidden="true" />
              <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">Webdesign & Webentwicklung</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
                Websites, Landingpages und Shop-Lösungen erstellen lassen
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-650">
                Klickhafen erstellt moderne Websites, Landingpages, Onepager und Shop-Lösungen von Grund auf - mit WordPress,
                Baukasten-Systemen oder individueller Umsetzung ohne Baukasten. Bestehende Websites können neu gestaltet,
                technisch weiterentwickelt oder als Relaunch sauber neu aufgebaut werden.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/kontakt">Website-Projekt anfragen</ButtonLink>
                <ButtonLink href="/leistungen/website-shop-hilfe" variant="secondary">
                  Bestehende Website verbessern
                </ButtonLink>
                <ButtonLink href="/referenzen" variant="secondary">
                  Referenzen ansehen
                </ButtonLink>
              </div>
            </div>
            <FadeIn className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <Globe className="size-8 text-cyan-700" aria-hidden="true" />
              <h2 className="mt-4 text-2xl font-semibold text-slate-950">Für Castrop-Rauxel, das Ruhrgebiet und deutschlandweit</h2>
              <p className="mt-4 leading-7 text-slate-650">
                Sinnvoll für neue Websites, Website überarbeiten, Landingpage erstellen lassen, WordPress-Website erstellen,
                Baukasten-Website erstellen, Shop-Projekte und individuelle Lösungen - online abstimmbar und klar im Umfang.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <Section title="Was umgesetzt werden kann" text="Die Umsetzung richtet sich nach Ziel, System, vorhandenen Inhalten und gewünschtem Umfang.">
        <CheckList columns items={included} />
      </Section>

      <Section className="bg-slate-50" title="Für wen ist das geeignet?" text="Klickhafen unterstützt kleine Projekte, lokale Anbieter und Unternehmen, die online klarer auftreten möchten.">
        <div className="flex flex-wrap gap-3">
          {audiences.map((item) => (
            <span key={item} className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700">
              {item}
            </span>
          ))}
        </div>
      </Section>

      <Section title="Typische Projekte" text="Von der schlanken Landingpage bis zur strukturierten Unternehmenswebsite.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map(([title, Icon]) => (
            <FadeIn key={title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="size-7 text-cyan-700" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{title}</h2>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50" title="Ablauf" text="Der Ablauf bleibt verständlich und überschaubar, damit Inhalt, Struktur und technische Umsetzung zusammenpassen.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <FadeIn key={step} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <span className="inline-flex size-9 items-center justify-center rounded-md bg-cyan-50 text-sm font-semibold text-cyan-800">{index + 1}</span>
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{step}</h2>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section title="WordPress oder Baukasten?" text="Je nach Ziel, Budget und späterer Pflege kann eine WordPress-Website oder ein passendes Baukasten-System sinnvoll sein. Klickhafen hilft bei der Auswahl und setzt die Website verständlich und sauber um.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <MonitorSmartphone className="size-7 text-cyan-700" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-slate-950">Responsive Umsetzung</h2>
            <p className="mt-3 leading-7 text-slate-650">Desktop und Mobile werden mitgedacht, damit Inhalte, Buttons und Kontaktwege sauber nutzbar bleiben.</p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <Search className="size-7 text-cyan-700" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-semibold text-slate-950">SEO-Grundlagen</h2>
            <p className="mt-3 leading-7 text-slate-650">Seitenstruktur, Überschriften, Meta-Daten, interne Links und technische Grundlagen werden passend zum Projekt berücksichtigt.</p>
          </div>
        </div>
      </Section>

      <Section className="bg-slate-50" title="Preise" text="Der Preis richtet sich nach Umfang, System und gewünschter Umsetzung. Nach einer kurzen Einschätzung kann ein individuelles Angebot erstellt werden.">
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <CheckList items={["klare Einschätzung vorab", "individuelle Umsetzung je nach Umfang", "kleine Anpassungen und größere Projekte möglich", "Angebot nach kurzer Abstimmung"]} />
        </div>
      </Section>

      <Section title="Passende Ratgeber" text="Weitere Orientierung zu Landingpages, Domains und technischen Grundlagen.">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ButtonLink href="/ratgeber/landingpage-erstellen-lassen" variant="secondary">Landingpage erstellen lassen</ButtonLink>
          <ButtonLink href="/ratgeber/domain-mit-website-verbinden" variant="secondary">Domain verbinden</ButtonLink>
          <ButtonLink href="/kontakt" variant="secondary">Kontakt aufnehmen</ButtonLink>
        </div>
      </Section>

      <Section title="Häufige Fragen" text="Kurze Antworten zu neuen Websites, Landingpages, Systemauswahl und Kosten.">
        <div className="grid gap-4 lg:grid-cols-2">
          {faq.map((item) => (
            <FadeIn key={item.question} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">{item.question}</h2>
              <p className="mt-3 leading-7 text-slate-650">{item.answer}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <section className="bg-cyan-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <CheckCircle className="size-8 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Website-Projekt anfragen</h2>
            <p className="mt-4 text-lg leading-8 text-cyan-50">
              Schildern Sie kurz, welche Website, Landingpage oder Überarbeitung geplant ist. Danach kann der Umfang sinnvoll eingeschätzt werden.
            </p>
          </div>
          <ButtonLink href="/kontakt" variant="secondary" className="shrink-0">
            Website-Projekt anfragen <ArrowRight className="ml-2 size-4" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
