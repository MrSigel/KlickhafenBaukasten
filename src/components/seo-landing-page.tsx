import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { FadeIn } from "@/components/motion";
import { RelatedLinks } from "@/components/related-links";
import { Section } from "@/components/section";
import type { SeoLandingPage as SeoLandingPageData } from "@/lib/seo-landing-pages";

export function SeoLandingPage({ page }: { page: SeoLandingPageData }) {
  const Icon = page.icon;

  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-100 bg-white px-4 py-2 text-sm font-semibold text-cyan-800 shadow-sm">
              <Icon className="size-4" aria-hidden="true" />
              <span>{page.eyebrow}</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-650">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/kontakt" className="w-full sm:w-auto">
                {page.cta}
              </ButtonLink>
              <ButtonLink href="/leistungen" variant="secondary" className="w-full sm:w-auto">
                Leistungen ansehen
              </ButtonLink>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Wobei Klickhafen hilft</p>
              <p className="mt-4 leading-7 text-slate-650">{page.description}</p>
              <div className="mt-6 grid gap-3">
                {page.services.slice(0, 4).map((item) => (
                  <div key={item} className="flex gap-3 rounded-md bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                    <CheckCircle2 className="mt-1 size-4 shrink-0 text-cyan-700" aria-hidden="true" />
                    <span className="min-w-0 break-words">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Section title="Typische Probleme" text="Diese Punkte sind häufig der Auslöser, wenn schnelle Website- oder Shop-Hilfe gebraucht wird.">
        <CheckList columns items={page.problems} />
      </Section>

      <Section className="bg-slate-50" title="Was konkret übernommen wird" text="Klickhafen prüft die Situation, setzt sinnvolle Anpassungen um und erklärt die nächsten Schritte verständlich.">
        <CheckList columns items={page.services} />
      </Section>

      <Section title="Häufige Fragen" text="Kurz beantwortet, damit vor der Anfrage klar ist, wie die Unterstützung abläuft.">
        <div className="grid gap-5 md:grid-cols-3">
          {page.faqs.map((item) => (
            <FadeIn key={item.question} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <HelpCircle className="size-6 text-cyan-700" aria-hidden="true" />
              <h2 className="mt-4 text-lg font-semibold text-slate-950">{item.question}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-650">{item.answer}</p>
            </FadeIn>
          ))}
        </div>
      </Section>

      <Section className="bg-slate-50" title="Passende interne Links" text="Weitere Seiten mit ähnlicher Hilfe, Pflege und SEO-Grundlagen.">
        <RelatedLinks links={page.related} />
      </Section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-cyan-950 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">Problem kurz schildern und Hilfe bekommen</h2>
            <p className="mt-4 max-w-3xl leading-7 text-cyan-50">
              Beschreiben Sie kurz, welches System betroffen ist und wobei Sie nicht weiterkommen. Klickhafen meldet sich mit einer klaren Einschätzung zur Umsetzung.
            </p>
            <ButtonLink href="/kontakt" className="mt-6 bg-white text-cyan-950 hover:bg-cyan-50">
              Anfrage senden <ArrowRight className="ml-2 size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
