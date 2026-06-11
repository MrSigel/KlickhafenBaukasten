import type { Metadata } from "next";
import { Building2 } from "lucide-react";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Impressum | Klickhafen",
  description: "Impressum und Anbieterkennzeichnung von Klickhafen.",
  path: "/impressum",
});

const links = ["Anbieter", "Kontakt", "Umsatzsteuer", "Inhaltlich verantwortlich", "Verbraucherstreitbeilegung"];

export default function ImpressumPage() {
  return (
    <LegalPage eyebrow="Rechtliches" title="Impressum" intro={`Anbieterkennzeichnung und Kontaktinformationen für ${site.domain}.`} icon={Building2} links={links}>
      <LegalSection title="Anbieter">
        <div className="rounded-lg bg-slate-50 p-5">
          <p className="font-semibold text-slate-950">{site.name}</p>
          <p>{site.owner}</p>
          <p>{site.businessType}</p>
          <p>{site.address}</p>
        </div>
      </LegalSection>
      <LegalSection title="Kontakt">
        <p>E-Mail: <a className="font-semibold text-cyan-800" href={`mailto:${site.email}`}>{site.email}</a></p>
        <p>Website: <a className="font-semibold text-cyan-800" href={site.url}>{site.domain}</a></p>
      </LegalSection>
      <LegalSection title="Umsatzsteuer">
        <p>Gemäß § 19 UStG wird keine Umsatzsteuer berechnet.</p>
      </LegalSection>
      <LegalSection title="Inhaltlich verantwortlich">
        <p>{site.owner}, {site.address}</p>
      </LegalSection>
      <LegalSection title="Verbraucherstreitbeilegung">
        <p>Klickhafen ist nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </LegalSection>
      <LegalSection title="Stand">
        <p>Stand: 11. Juni 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
