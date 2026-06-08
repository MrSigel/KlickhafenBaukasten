import { AdminHeader, StatusBadge, statusLabel } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { deleteInquiryAction, updateInquiryAction } from "../lib";

const inquiryStatuses = ["new", "in_review", "answered", "converted", "closed", "spam"];

export default async function AdminInquiriesPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const params = await searchParams;
  const supabase = getSupabaseAdmin();
  let query = supabase.from("inquiries").select("*").order("created_at", { ascending: false });
  if (params.status) query = query.eq("status", params.status);
  if (params.q) query = query.or(`email.ilike.%${params.q}%,first_name.ilike.%${params.q}%,last_name.ilike.%${params.q}%,company.ilike.%${params.q}%,website_url.ilike.%${params.q}%`);
  const { data, error } = await query;

  return (
    <AdminGuard>
      <AdminHeader title="Anfragen" text="Alle Website-Anfragen mit Status, Details und interner Notiz." />
      <Filter statusOptions={inquiryStatuses} />
      {error ? <p className="rounded-md bg-red-50 p-4 text-red-800">Anfragen konnten nicht geladen werden.</p> : null}
      <div className="mt-6 space-y-4">
        {(data || []).map((row) => (
          <div key={row.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-lg font-semibold text-slate-950">{row.first_name} {row.last_name}</h2>
                  <StatusBadge value={row.status} />
                </div>
                <p className="mt-2 text-sm text-slate-600">{row.email} · {row.company || "Keine Firma"} · {row.website_url || "Keine Website"}</p>
                <p className="mt-3 leading-7 text-slate-700">{row.message}</p>
              </div>
              <div className="grid min-w-64 gap-3">
                <form action={updateInquiryAction} className="grid gap-3">
                  <input type="hidden" name="id" value={row.id} />
                  <select name="status" defaultValue={row.status} className="rounded-md border border-slate-300 px-3 py-2 text-sm">
                    {inquiryStatuses.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}
                  </select>
                  <textarea name="admin_notes" defaultValue={row.admin_notes || ""} placeholder="Interne Notiz" className="min-h-24 rounded-md border border-slate-300 px-3 py-2 text-sm" />
                  <button className="rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white">Speichern</button>
                </form>
                <form action={deleteInquiryAction}>
                  <input type="hidden" name="id" value={row.id} />
                  <button className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100">Anfrage löschen</button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {!data?.length ? <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">Keine Anfragen gefunden.</p> : null}
      </div>
    </AdminGuard>
  );
}

function Filter({ statusOptions }: { statusOptions: string[] }) {
  return (
    <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[1fr_220px_auto]">
      <input name="q" placeholder="Suche nach Name, E-Mail, Unternehmen oder Website" className="rounded-md border border-slate-300 px-3 py-2" />
      <select name="status" className="rounded-md border border-slate-300 px-3 py-2">
        <option value="">Alle Status</option>
        {statusOptions.map((status) => <option key={status} value={status}>{statusLabel(status)}</option>)}
      </select>
      <button className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Filtern</button>
    </form>
  );
}
