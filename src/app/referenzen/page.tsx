import type { Metadata } from "next";
import { ArrowRight, Images } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { ReferenceCard } from "@/components/reference-card";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { getActiveReferences } from "@/lib/references";

export const metadata: Metadata = pageMetadata({
  title: "Referenzen & Projekte | Klickhafen",
  description:
    "Ausgewählte Websites, Landingpages und Projekte, die über Klickhafen umgesetzt oder betreut wurden.",
  path: "/referenzen",
});

export default async function ReferencesPage() {
  const references = await getActiveReferences();

  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Images className="size-10 text-cyan-700" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">Referenzen</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Referenzen & umgesetzte Projekte
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-650">
              Hier zeige ich ausgewählte Websites und Projekte, die über Klickhafen umgesetzt oder betreut wurden.
            </p>
          </div>
        </div>
      </section>

      <Section title="Ausgewählte Referenzen" text="Es werden nur Referenzen angezeigt, die im Admin-Bereich freigegeben wurden.">
        {references.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {references.map((reference) => (
              <ReferenceCard key={reference.id} reference={reference} />
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-white p-6 text-slate-650 shadow-sm ring-1 ring-slate-200">Aktuell werden Referenzen vorbereitet.</p>
        )}
      </Section>

      <section className="bg-cyan-950 py-16 text-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight">Ähnliches Projekt anfragen</h2>
            <p className="mt-4 text-lg leading-8 text-cyan-50">
              Wenn eine neue Website, Landingpage oder Überarbeitung geplant ist, kann der Umfang kurz eingeschätzt werden.
            </p>
          </div>
          <ButtonLink href="/kontakt" variant="secondary" className="shrink-0">
            Ähnliches Projekt anfragen <ArrowRight className="ml-2 size-4" />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
