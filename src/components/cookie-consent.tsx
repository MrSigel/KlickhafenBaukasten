"use client";

import { X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { isEnglishPath } from "@/lib/i18n";

type Consent = {
  necessary: true;
  analytics: boolean;
};

const storageKey = "klickhafen-cookie-consent";

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(storageKey);
    return value ? (JSON.parse(value) as Consent) : null;
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const titleId = useId();
  const pathname = usePathname();
  const isEnglish = isEnglishPath(pathname);
  const [consent, setConsent] = useState<Consent | null>(null);
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const stored = readConsent();
    if (stored) {
      setConsent(stored);
      setAnalytics(stored.analytics);
    } else {
      setOpen(true);
    }

    const openSettings = () => {
      const latest = readConsent();
      setAnalytics(latest?.analytics ?? false);
      setSettings(true);
      setOpen(true);
    };

    window.addEventListener("klickhafen:open-cookie-settings", openSettings);
    return () => window.removeEventListener("klickhafen:open-cookie-settings", openSettings);
  }, []);

  function save(next: Consent) {
    window.localStorage.setItem(storageKey, JSON.stringify(next));
    setConsent(next);
    setAnalytics(next.analytics);
    setOpen(false);
    setSettings(false);
    window.dispatchEvent(new Event("klickhafen:cookie-consent-changed"));
  }

  return (
    <>
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="max-h-[calc(100vh-3rem)] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-5 shadow-2xl ring-1 ring-slate-200 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">{isEnglish ? "Privacy" : "Datenschutz"}</p>
                <h2 id={titleId} className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {isEnglish ? "Cookie settings" : "Cookie-Einstellungen"}
                </h2>
              </div>
              <button
                type="button"
                className="inline-flex size-10 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-700"
                onClick={() => (consent ? setOpen(false) : save({ necessary: true, analytics: false }))}
                aria-label={isEnglish ? "Close cookie settings" : "Cookie-Einstellungen schließen"}
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <p className="mt-5 text-base leading-7 text-slate-650">
              {isEnglish
                ? "We use necessary technologies so this website works. In addition, Vercel Analytics and Vercel Speed Insights may be loaded for anonymized analytics and performance data. You can decide whether to allow these optional services."
                : "Wir verwenden notwendige Technologien, damit diese Website funktioniert. Zusätzlich können Vercel Analytics und Vercel Speed Insights für anonymisierte Analyse- und Performance-Daten geladen werden. Sie können selbst entscheiden, ob Sie diese optionalen Dienste zulassen möchten."}
            </p>

            {settings ? (
              <div className="mt-6 space-y-4">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-slate-950">{isEnglish ? "Necessary cookies / technologies" : "Notwendige Cookies / Technologien"}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-650">
                        {isEnglish
                          ? "These technologies are required for the website to work technically, for example security, display and storing your cookie choice."
                          : "Diese Technologien sind erforderlich, damit die Website technisch funktioniert, z. B. für Sicherheit, Darstellung und die Speicherung Ihrer Cookie-Auswahl."}
                      </p>
                    </div>
                    <span className="rounded-md bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-700">{isEnglish ? "Always active" : "Immer aktiv"}</span>
                  </div>
                </div>
                <label className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-slate-200 p-4">
                  <span>
                    <span className="block font-semibold text-slate-950">{isEnglish ? "Analytics & performance" : "Analyse & Performance"}</span>
                    <span className="mt-2 block text-sm leading-6 text-slate-650">
                      {isEnglish
                        ? "This category includes Vercel Analytics and Vercel Speed Insights for page views, performance measurement and loading speed. No separate marketing cookies are used."
                        : "Diese Kategorie umfasst Vercel Analytics und Vercel Speed Insights zur Auswertung von Seitenaufrufen, Performance-Messung und Ladegeschwindigkeit. Es werden keine eigenen Marketing-Cookies eingesetzt."}
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(event) => setAnalytics(event.target.checked)}
                    className="mt-1 size-5 shrink-0 accent-cyan-700"
                  />
                </label>
                <div className="grid gap-3 sm:grid-cols-3">
                  <button type="button" className="min-h-12 rounded-md bg-cyan-700 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-800" onClick={() => save({ necessary: true, analytics })}>
                    {isEnglish ? "Save selection" : "Auswahl speichern"}
                  </button>
                  <button type="button" className="min-h-12 rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700" onClick={() => save({ necessary: true, analytics: true })}>
                    {isEnglish ? "Accept all" : "Alle akzeptieren"}
                  </button>
                  <button type="button" className="min-h-12 rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700" onClick={() => save({ necessary: true, analytics: false })}>
                    {isEnglish ? "Reject all" : "Alle ablehnen"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <button type="button" className="min-h-12 rounded-md bg-cyan-700 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-800" onClick={() => save({ necessary: true, analytics: true })}>
                  {isEnglish ? "Accept all" : "Alle akzeptieren"}
                </button>
                <button type="button" className="min-h-12 rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700" onClick={() => save({ necessary: true, analytics: false })}>
                  {isEnglish ? "Necessary only" : "Nur notwendige akzeptieren"}
                </button>
                <button type="button" className="min-h-12 rounded-md border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700" onClick={() => setSettings(true)}>
                  {isEnglish ? "Adjust settings" : "Einstellungen anpassen"}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
