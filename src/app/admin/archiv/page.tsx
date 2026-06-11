import { Archive, Plus, RefreshCw, Trash2 } from "lucide-react";
import { AdminHeader, statusLabel } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";

const actionLabels: Record<string, string> = {
  created: "Erstellt",
  updated: "Aktualisiert",
  deleted: "Gelöscht",
};

const entityLabels: Record<string, string> = {
  inquiry: "Anfrage",
  customer: "Kunde",
  offer: "Angebot",
  invoice: "Rechnung",
  settings: "Einstellungen",
  reference: "Referenz",
  post: "Beitrag",
};

const actionIcons = {
  created: Plus,
  updated: RefreshCw,
  deleted: Trash2,
};

export default async function AdminArchivePage() {
  const { data, error } = await getSupabaseAdmin()
    .from("activity_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <AdminGuard>
      <AdminHeader title="Archiv" text="Chronologisches Protokoll wichtiger Admin-Aktionen." />
      {error ? (
        <p className="rounded-md bg-amber-50 p-4 text-amber-900">
          Das Archiv konnte nicht geladen werden. Bitte stelle sicher, dass die Supabase-Migration fuer activity_logs ausgefuehrt wurde.
        </p>
      ) : null}
      <div className="space-y-3">
        {(data || []).map((entry) => {
          const Icon = actionIcons[entry.action as keyof typeof actionIcons] || Archive;
          return (
            <article key={entry.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-cyan-50 text-cyan-800">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{actionLabels[entry.action] || entry.action}</span>
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-700">{entityLabels[entry.entity_type] || entry.entity_type}</span>
                    </div>
                    <h2 className="mt-2 text-base font-semibold text-slate-950">{entry.title || "Admin-Aktion"}</h2>
                    {entry.description ? <p className="mt-1 text-sm leading-6 text-slate-650">{entry.description}</p> : null}
                    {entry.metadata?.status ? <p className="mt-2 text-xs font-semibold text-slate-500">Status: {statusLabel(String(entry.metadata.status))}</p> : null}
                  </div>
                </div>
                <time className="text-sm text-slate-500" dateTime={entry.created_at}>
                  {new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(entry.created_at))}
                </time>
              </div>
            </article>
          );
        })}
        {!error && !data?.length ? <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">Noch keine Archiv-Eintraege vorhanden.</p> : null}
      </div>
    </AdminGuard>
  );
}
