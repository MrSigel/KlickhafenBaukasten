import type { Metadata } from "next";
import { Cookie } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Cookie-Einstellungen | Klickhafen",
  description: "Informationen zu notwendigen Technologien, Vercel Analytics, Vercel Speed Insights und Cookie-Einstellungen.",
  path: "/cookies",
});

const links = ["Überblick", "Notwendige Technologien", "Analyse & Performance", "Einstellungen ändern"];

export default function CookiesPage() {
  return (
    <LegalPage eyebrow="Cookies" title="Cookie-Einstellungen" intro={`Informationen zu den auf ${site.domain} verwendeten notwendigen Technologien und optionalen Analyse- und Performance-Diensten.`} icon={Cookie} links={links}>
      <LegalSection title="Überblick">
        <p>Diese Website verwendet notwendige Technologien, damit sie technisch funktioniert. Zusätzlich können Vercel Analytics und Vercel Speed Insights für anonymisierte Analyse- und Performance-Daten zugelassen werden.</p>
      </LegalSection>
      <LegalSection title="Notwendige Technologien">
        <p>Notwendige Technologien sind immer aktiv. Dazu gehört insbesondere die Speicherung Ihrer Cookie-Auswahl im Browser, damit das Consent-Popup nicht bei jedem Besuch erneut erscheint und Ihre Auswahl berücksichtigt werden kann.</p>
      </LegalSection>
      <LegalSection title="Analyse & Performance">
        <p>Diese optionale Kategorie umfasst Vercel Analytics und Vercel Speed Insights zur Auswertung von Seitenaufrufen, Performance-Messung und Ladegeschwindigkeit. Diese Dienste werden nur nach Zustimmung geladen.</p>
        <p>Vercel Web Analytics arbeitet nach Angaben von Vercel ohne Cookies. Speed Insights erfasst anonyme technische Web-Vitals-Daten. Es werden keine Marketing-Cookies, kein Google Analytics, kein Meta Pixel und kein TikTok Pixel eingesetzt.</p>
      </LegalSection>
      <LegalSection title="Einstellungen ändern">
        <p>Sie können Ihre Auswahl jederzeit erneut öffnen und ändern.</p>
        <CookieSettingsButton />
        <p className="mt-4 text-sm text-slate-600">Stand: 11. Juni 2026</p>
      </LegalSection>
    </LegalPage>
  );
}
