import type { Metadata } from "next";
import { ExternalLink, ImageIcon, PlayCircle } from "lucide-react";
import { AdminHeader } from "@/components/admin/ui";
import { SubmitButton } from "@/components/admin/submit-button";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { referenceStatusLabel, referenceStatuses, type ReferenceItem } from "@/lib/references";
import { AdminGuard } from "../guard";
import {
  archiveReferenceAction,
  createReferenceAction,
  deleteReferenceAction,
  generateReferenceScreenshotAction,
  updateReferenceAction,
} from "./actions";

export const metadata: Metadata = {
  title: "Referenzen verwalten | Klickhafen Admin",
  robots: { index: false, follow: false },
};

export default async function AdminReferencesPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const { data, error } = await getSupabaseAdmin()
    .from("references")
    .select("*")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <AdminGuard>
      <AdminHeader title="Referenzen" text="Echte Projekte erstellen, freigeben und Website-Vorschaubilder verwalten." />
      {params.success ? <p className="mb-4 rounded-md bg-emerald-50 p-4 text-emerald-800">{params.success}</p> : null}
      {params.error ? <p className="mb-4 rounded-md bg-amber-50 p-4 text-amber-900">{params.error}</p> : null}
      {error ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">Referenzen konnten nicht geladen werden.</p> : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-4">
          {((data || []) as ReferenceItem[]).map((reference) => (
            <ReferenceAdminCard key={reference.id} reference={reference} />
          ))}
          {!data?.length ? <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">Noch keine Referenzen angelegt.</p> : null}
        </div>

        <form action={createReferenceAction} className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Neue Referenz erstellen</h2>
          <ReferenceFields />
          <SubmitButton
            className="mt-5 w-full rounded-md bg-cyan-700 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-60"
            pendingText="Speichern und Screenshot erstellen ..."
          >
            Referenz speichern
          </SubmitButton>
        </form>
      </div>
    </AdminGuard>
  );
}

function ReferenceAdminCard({ reference }: { reference: ReferenceItem }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-5 lg:grid-cols-[220px_1fr]">
        <div className="overflow-hidden rounded-md bg-slate-100">
          <div className="aspect-[3/2]">
            {reference.media_url && reference.media_type === "video" ? (
              <video src={reference.media_url} className="h-full w-full object-cover" controls preload="metadata" />
            ) : reference.media_url ? (
              <img src={reference.media_url} alt={`Projektbild ${reference.title}`} className="h-full w-full object-cover" />
            ) : reference.screenshot_url ? (
              <img src={reference.screenshot_url} alt={`Vorschau ${reference.title}`} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400">
                <ImageIcon className="size-9" aria-hidden="true" />
              </div>
            )}
          </div>
        </div>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">{referenceStatusLabel(reference.status)}</span>
            {reference.featured ? <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">Featured</span> : null}
            {reference.media_url ? <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{reference.media_type === "video" ? <PlayCircle className="size-3" /> : <ImageIcon className="size-3" />} Eigenes Medium</span> : null}
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">Sortierung {reference.sort_order}</span>
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-950">{reference.title}</h2>
          <a href={reference.url} target="_blank" rel="noreferrer" className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-cyan-800 hover:text-cyan-950">
            {reference.url} <ExternalLink className="size-4 shrink-0" aria-hidden="true" />
          </a>
          {reference.description ? <p className="mt-3 leading-7 text-slate-650">{reference.description}</p> : null}
        </div>
      </div>

      <details className="mt-5 rounded-md bg-slate-50 p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800">Referenz bearbeiten</summary>
        <form action={updateReferenceAction} className="mt-4">
          <input type="hidden" name="id" value={reference.id} />
          <ReferenceFields reference={reference} />
          <SubmitButton
            className="mt-5 rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800 disabled:opacity-60"
            pendingText="Speichern ..."
          >
            Änderungen speichern
          </SubmitButton>
        </form>
      </details>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row">
        <form action={generateReferenceScreenshotAction}>
          <input type="hidden" name="id" value={reference.id} />
          <input type="hidden" name="url" value={reference.url} />
          <SubmitButton
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800 disabled:opacity-60 sm:w-auto"
            pendingText="Screenshot wird erstellt ..."
          >
            Screenshot neu laden
          </SubmitButton>
        </form>
        <form action={archiveReferenceAction}>
          <input type="hidden" name="id" value={reference.id} />
          <SubmitButton
            className="w-full rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-60 sm:w-auto"
            pendingText="Archivieren ..."
          >
            Archivieren
          </SubmitButton>
        </form>
        <form action={deleteReferenceAction}>
          <input type="hidden" name="id" value={reference.id} />
          <SubmitButton
            className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60 sm:w-auto"
            pendingText="Löschen ..."
          >
            Löschen
          </SubmitButton>
        </form>
      </div>
    </article>
  );
}

function ReferenceFields({ reference }: { reference?: ReferenceItem }) {
  return (
    <div className="mt-4 grid gap-3">
      <label className="text-sm font-semibold text-slate-800">
        Titel
        <input name="title" required defaultValue={reference?.title || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
      </label>
      <label className="text-sm font-semibold text-slate-800">
        URL
        <input name="url" required type="url" defaultValue={reference?.url || ""} placeholder="https://example.de" className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
      </label>
      <label className="text-sm font-semibold text-slate-800">
        Beschreibung
        <textarea name="description" defaultValue={reference?.description || ""} className="mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2" />
      </label>
      <label className="text-sm font-semibold text-slate-800">
        Eigenes Bild oder Video
        <input name="media" type="file" accept="image/*,video/*" className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" />
        <span className="mt-1 block text-xs font-normal text-slate-500">Optional und unabhängig vom automatisch erzeugten Website-Vorschaubild.</span>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">
          Status
          <select name="status" defaultValue={reference?.status || "draft"} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2">
            {referenceStatuses.map((status) => (
              <option key={status} value={status}>
                {referenceStatusLabel(status)}
              </option>
            ))}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-800">
          Sortierung
          <input name="sort_order" type="number" defaultValue={reference?.sort_order || 0} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
        </label>
      </div>
      <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
        <input name="featured" type="checkbox" defaultChecked={reference?.featured || false} className="size-5 accent-cyan-700" />
        Featured Referenz
      </label>
    </div>
  );
}
