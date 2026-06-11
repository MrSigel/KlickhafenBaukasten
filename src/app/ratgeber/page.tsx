import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { guidePages } from "@/lib/guide-pages";

export const metadata: Metadata = pageMetadata({
  title: "Ratgeber für Websites, Shops & SEO | Klickhafen",
  description:
    "Verständliche Hilfe zu WordPress, Shopify, Wix, WooCommerce, Baukasten-Websites, Domains, Kontaktformularen, Landingpages und SEO-Grundlagen.",
  path: "/ratgeber",
});

export default function RatgeberPage() {
  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <BookOpen className="size-10 text-cyan-700" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">Ratgeber</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Ratgeber für Websites, Shops & Online-Sichtbarkeit
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-650">
              Hier finden Sie verständliche Hilfe zu typischen Website-Problemen, WordPress, Shopify, Wix, WooCommerce,
              Baukasten-Websites, Domains, Formularen und SEO-Grundlagen.
            </p>
          </div>
        </div>
      </section>

      <Section title="Alle Ratgeberartikel" text="Praxisnahe Hinweise für typische Aufgaben und Probleme rund um Websites und Shops.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {guidePages.map((article) => {
            const Icon = article.icon;
            return (
              <Link
                key={article.slug}
                href={`/ratgeber/${article.slug}`}
                className="flex min-h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-700"
              >
                <Icon className="size-7 text-cyan-700" aria-hidden="true" />
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-cyan-700">{article.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">{article.title}</h2>
                <p className="mt-3 flex-1 leading-7 text-slate-650">{article.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800">
                  Artikel lesen <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>
    </>
  );
}
