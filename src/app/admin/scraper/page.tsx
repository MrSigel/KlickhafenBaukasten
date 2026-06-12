import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, ExternalLink, Search } from "lucide-react";
import { AdminHeader, StatusBadge } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { ignoreScraperResultAction, importScraperResultAction, runScraperAction } from "./actions";

export const metadata: Metadata = {
  title: "Scraper | Klickhafen Admin",
  robots: { index: false, follow: false },
};

type SearchParams = {
  success?: string;
  error?: string;
};

type ScraperResult = {
  id: string;
  created_at: string;
  query: string | null;
  business_name: string | null;
  industry: string | null;
  city: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  imported_customer_id: string | null;
};

export default async function AdminScraperPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const { data } = await getSupabaseAdmin()
    .from("scraper_results")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  const results = (data || []) as ScraperResult[];

  return (
    <AdminGuard>
      <AdminHeader
        title="Scraper"
        text="Lokale Unternehmen per Suchbegriff finden und öffentlich sichtbare Kontaktdaten übernehmen."
      />

      {params.success ? <p className="mb-4 rounded-md bg-emerald-50 p-4 text-emerald-800">{params.success}</p> : null}
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">{params.error}</p> : null}

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
        <div className="flex gap-3">
          <AlertTriangle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <p>
            Bitte nur öffentlich erreichbare Unternehmensdaten verwenden und vor Kontaktaufnahme rechtliche Vorgaben beachten.
            Es werden keine Captchas umgangen, keine Login-Bereiche ausgelesen und keine Massenabfragen gestartet.
          </p>
        </div>
      </div>

      <form action={runScraperAction} className="mt-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">Lokale Suche</h2>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Gib nur einen Suchbegriff ein, z. B. „Fahrschule Castrop-Rauxel“. Es werden wenige öffentliche Websites geprüft und nur Name, Website, E-Mail und optional Telefonnummer gespeichert.
        </p>
        <div className="mt-5">
          <Field label="Suchbegriff">
            <input name="query" required placeholder="Fahrschule Castrop-Rauxel" className="input" />
          </Field>
        </div>
        <button className="mt-5 inline-flex min-h-11 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800">
          <Search className="mr-2 size-4" /> Suche starten
        </button>
      </form>

      <section className="mt-8">
        <h2 className="text-xl font-semibold text-slate-950">Ergebnisliste</h2>
        {!results.length ? (
          <p className="mt-4 rounded-lg bg-white p-6 text-slate-600 shadow-sm">Noch keine Scraper-Ergebnisse vorhanden.</p>
        ) : (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Unternehmen</th>
                    <th className="px-4 py-3">Branche</th>
                    <th className="px-4 py-3">Ort</th>
                    <th className="px-4 py-3">Website</th>
                    <th className="px-4 py-3">E-Mail</th>
                    <th className="px-4 py-3">Telefon</th>
                    <th className="px-4 py-3">Quelle</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Aktion</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {results.map((result) => (
                    <tr key={result.id} className="align-top">
                      <td className="px-4 py-4 font-semibold text-slate-950">{result.business_name || "Ohne Namen"}</td>
                      <td className="px-4 py-4 text-slate-600">{result.industry || "-"}</td>
                      <td className="px-4 py-4 text-slate-600">{result.city || "-"}</td>
                      <td className="max-w-64 px-4 py-4">
                        {result.website ? (
                          <a href={result.website} target="_blank" rel="noopener noreferrer" className="inline-flex max-w-full items-center gap-1 break-all font-semibold text-cyan-800 hover:text-cyan-950">
                            {result.website} <ExternalLink className="size-3 shrink-0" />
                          </a>
                        ) : "-"}
                      </td>
                      <td className="px-4 py-4 font-semibold text-slate-950">{result.email || <span className="text-slate-500">Keine E-Mail gefunden</span>}</td>
                      <td className="px-4 py-4 text-slate-600">{result.phone || "-"}</td>
                      <td className="max-w-64 px-4 py-4 text-slate-600">
                        {result.source ? <span className="break-all">{result.source}</span> : "-"}
                        {result.notes ? <p className="mt-1 text-xs text-slate-500">{result.notes}</p> : null}
                      </td>
                      <td className="px-4 py-4"><StatusBadge value={result.status} /></td>
                      <td className="px-4 py-4">
                        <div className="flex min-w-44 flex-col gap-2">
                          {result.email && result.status === "new" ? (
                            <form action={importScraperResultAction}>
                              <input type="hidden" name="id" value={result.id} />
                              <div className="mb-2 rounded-md bg-slate-50 p-2 text-xs text-slate-700">
                                <p className="mb-2 font-semibold text-slate-950">In Kunden speichern:</p>
                                <div className="grid gap-1">
                                  <CheckOption name="include_email" label="E-Mail" checked disabled />
                                  <CheckOption name="include_company" label="Name" checked={Boolean(result.business_name)} disabled={!result.business_name} />
                                  <CheckOption name="include_website" label="Website" checked={Boolean(result.website)} disabled={!result.website} />
                                  <CheckOption name="include_phone" label="Telefon" checked={Boolean(result.phone)} disabled={!result.phone} />
                                  <CheckOption name="include_industry" label="Branche" checked={Boolean(result.industry)} disabled={!result.industry} />
                                  <CheckOption name="include_city" label="Ort" checked={Boolean(result.city)} disabled={!result.city} />
                                  <CheckOption name="include_notes" label="Notiz" checked={Boolean(result.notes)} disabled={!result.notes} />
                                </div>
                              </div>
                              <button className="w-full rounded-md bg-cyan-700 px-3 py-2 text-xs font-semibold text-white hover:bg-cyan-800">
                                In Kunden übernehmen
                              </button>
                            </form>
                          ) : null}
                          {result.status === "new" ? (
                            <form action={ignoreScraperResultAction}>
                              <input type="hidden" name="id" value={result.id} />
                              <button className="w-full rounded-md border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-cyan-700 hover:text-cyan-800">
                                Ignorieren
                              </button>
                            </form>
                          ) : null}
                          {!result.email && result.website ? (
                            <Link href={result.website} target="_blank" rel="noopener noreferrer" className="rounded-md border border-slate-300 px-3 py-2 text-center text-xs font-semibold text-slate-700 hover:border-cyan-700 hover:text-cyan-800">
                              Manuell prüfen
                            </Link>
                          ) : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </AdminGuard>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-800">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

function CheckOption({ name, label, checked, disabled }: { name: string; label: string; checked: boolean; disabled?: boolean }) {
  return (
    <label className={`flex items-center gap-2 ${disabled ? "text-slate-400" : ""}`}>
      <input
        type="checkbox"
        name={name}
        defaultChecked={checked}
        disabled={disabled}
        className="size-4 rounded border-slate-300 text-cyan-700 focus:ring-cyan-700"
      />
      <span>{label}</span>
      {disabled ? <input type="hidden" name={name} value={checked ? "on" : ""} disabled={!checked} /> : null}
    </label>
  );
}
