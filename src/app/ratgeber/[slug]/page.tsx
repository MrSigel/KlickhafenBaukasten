import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle, ChevronRight } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { FadeIn } from "@/components/motion";
import { RelatedLinks } from "@/components/related-links";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { getGuidePage, guideCtaText, guidePages } from "@/lib/guide-pages";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return guidePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = getGuidePage((await params).slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/ratgeber/${page.slug}`,
  });
}

export default async function GuideArticlePage({ params }: Props) {
  const page = getGuidePage((await params).slug);
  if (!page) notFound();
  const Icon = page.icon;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: site.url },
      { "@type": "ListItem", position: 2, name: "Ratgeber", item: `${site.url}/ratgeber` },
      { "@type": "ListItem", position: 3, name: page.title, item: `${site.url}/ratgeber/${page.slug}` },
    ],
  };

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.metaDescription,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    mainEntityOfPage: `${site.url}/ratgeber/${page.slug}`,
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <Script id={`${page.slug}-breadcrumb-json-ld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Script id={`${page.slug}-article-json-ld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <Script id={`${page.slug}-faq-json-ld`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
            <Link href="/" className="font-medium text-slate-700 hover:text-cyan-800">Startseite</Link>
            <ChevronRight className="size-4 text-slate-400" aria-hidden="true" />
            <Link href="/ratgeber" className="font-medium text-slate-700 hover:text-cyan-800">Ratgeber</Link>
            <ChevronRight className="size-4 text-slate-400" aria-hidden="true" />
            <span className="font-semibold text-slate-950">{page.category}</span>
          </nav>
          <div className="max-w-4xl">
            <Icon className="size-10 text-cyan-700" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">{page.category}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{page.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-650">{page.intro}</p>
          </div>
        </div>
      </section>

      <Section title="Worum geht es?" text={page.context}>
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="leading-7 text-slate-650">
            Klickhafen unterstützt Selbstständige, kleine Unternehmen und lokale Betriebe aus Castrop-Rauxel, dem Ruhrgebiet
            und deutschlandweit online, wenn Websites, Shops oder technische Grundlagen nachvollziehbar geprüft werden sollen.
          </p>
        </div>
      </Section>

      <Section className="bg-slate-50" title="Typische Ursachen oder Aufgaben" text="Diese Punkte treten bei ähnlichen Anfragen häufig auf und helfen bei der ersten Einordnung.">
        <CheckList columns items={page.causes} />
      </Section>

      <Section title="Was Sie selbst prüfen können" text="Einige einfache Prüfungen lassen sich vor einer Anfrage selbst durchführen.">
        <CheckList columns items={page.checks} />
      </Section>

      <Section className="bg-slate-50" title="Wann professionelle Hilfe sinnvoll ist" text={page.help}>
        <div className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <p className="leading-7 text-slate-650">{guideCtaText}</p>
        </div>
      </Section>

      <section className="bg-cyan-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <CheckCircle className="size-8 text-cyan-200" aria-hidden="true" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">Sie möchten das Problem nicht selbst lösen?</h2>
            <p className="mt-4 text-lg leading-8 text-cyan-50">
              Schildern Sie kurz, um welche Website oder welchen Shop es geht. Klickhafen prüft, welche Unterstützung sinnvoll ist.
            </p>
          </div>
          <ButtonLink href="/kontakt" variant="secondary" className="shrink-0">
            Problem schildern <ArrowRight className="ml-2 size-4" />
          </ButtonLink>
        </div>
      </section>

      <Section title="Häufige Fragen" text="Kurze Antworten zur ersten Orientierung.">
        <div className="grid gap-4 lg:grid-cols-2">
          {page.faq.map((item) => (
            <FadeIn key={item.question} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">{item.question}</h2>
              <p className="mt-3 leading-7 text-slate-650">{item.answer}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50" title="Verwandte Leistungen" text="Passende nächste Schritte und weiterführende Seiten.">
        <RelatedLinks links={page.related} />
      </Section>
    </>
  );
}
