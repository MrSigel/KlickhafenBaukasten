import type { Metadata } from "next";
import { Globe, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Kontakt | Website-Projekt anfragen | Klickhafen",
  description: "Fragen Sie eine neue Website, Landingpage, einen Shop, Relaunch oder Unterstützung bei WordPress, Shopify, Wix, WooCommerce oder Baukasten-Systemen an.",
  path: "/kontakt",
});

export default function KontaktPage() {
  return (
    <Section eyebrow="Kontakt" title="Website-Projekt oder Unterstützung anfragen" text="Beschreiben Sie kurz, ob es um eine neue Website, Landingpage, einen Shop, Relaunch, Redesign oder Hilfe bei einem bestehenden System geht. Klickhafen meldet sich mit einer verständlichen Einschätzung zurück.">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4">
          <a href={`mailto:${site.email}`} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-700">
            <Mail className="size-6 shrink-0 text-cyan-700" />
            <span><span className="block font-semibold text-slate-950">E-Mail</span><span className="mt-1 block text-sm text-slate-650">{site.email}</span></span>
          </a>
          <a href={site.url} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-700">
            <Globe className="size-6 shrink-0 text-cyan-700" />
            <span><span className="block font-semibold text-slate-950">Website</span><span className="mt-1 block text-sm text-slate-650">{site.domain}</span></span>
          </a>
        </aside>
        <ContactForm />
      </div>
    </Section>
  );
}
