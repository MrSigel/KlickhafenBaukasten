import { AdminHeader, AdminLink, Money, StatusBadge } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../../guard";
import { ConfirmActionButton } from "../../beitraege/confirm-action-button";
import { deleteCustomerAction, updateCustomerReceivedAmountAction } from "../../lib";

export default async function CustomerDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string }> }) {
  const { id } = await params;
  const query = await searchParams;
  const supabase = getSupabaseAdmin();
  const [{ data: customer }, { data: offers }, { data: invoices }] = await Promise.all([
    supabase.from("customers").select("*").eq("id", id).single(),
    supabase.from("offers").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
    supabase.from("invoices").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
  ]);

  return (
    <AdminGuard>
      <AdminHeader title={customer?.company || `${customer?.first_name || ""} ${customer?.last_name || ""}`.trim() || "Kunde"} text={customer?.email} action={<div className="flex gap-3"><AdminLink href={`/admin/angebote/neu?customer=${id}`}>Neues Angebot</AdminLink><AdminLink href={`/admin/rechnungen/neu?customer=${id}`}>Neue Rechnung</AdminLink></div>} />
      {query.error ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">{query.error}</p> : null}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-950">Stammdaten</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p>Firma: {customer?.company || "-"}</p>
            <p>Name: {customer?.first_name || "-"} {customer?.last_name || ""}</p>
            <p>E-Mail: {customer?.email || "-"}</p>
            <p>Website: {customer?.website_url || "-"}</p>
            <p>Adresse: {[customer?.street, customer?.postal_code, customer?.city].filter(Boolean).join(", ") || "-"}</p>
            <p className="font-semibold text-emerald-700">Bereits erhalten: <Money cents={customer?.received_amount_cents || 0} /></p>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm text-slate-600">{customer?.notes}</p>
          <form action={updateCustomerReceivedAmountAction} className="mt-6 rounded-md bg-slate-50 p-4">
            <input type="hidden" name="id" value={id} />
            <label className="block text-sm font-semibold text-slate-800">
              Bereits erhaltenen Betrag speichern
              <input name="received_amount" inputMode="decimal" defaultValue={formatEuroInput(customer?.received_amount_cents || 0)} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" />
            </label>
            <button className="mt-3 w-full rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800">Betrag speichern</button>
          </form>
          <form action={deleteCustomerAction} className="mt-4">
            <input type="hidden" name="id" value={id} />
            <ConfirmActionButton className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60" pendingText="Löschen ..." message="Diesen Kunden wirklich endgültig löschen?">
              Kunde löschen
            </ConfirmActionButton>
          </form>
        </div>
        <List title="Angebote" rows={offers || []} href="/admin/angebote" numberKey="offer_number" />
        <List title="Rechnungen" rows={invoices || []} href="/admin/rechnungen" numberKey="invoice_number" />
      </div>
    </AdminGuard>
  );
}

function formatEuroInput(cents: number) {
  return new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(cents || 0) / 100);
}

function List({ title, rows, href, numberKey }: { title: string; rows: any[]; href: string; numberKey: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <a key={row.id} href={`${href}/${row.id}`} className="block rounded-md bg-slate-50 p-3 text-sm">
            <div className="flex items-center justify-between gap-3"><span className="font-semibold">{row[numberKey]}</span><StatusBadge value={row.status} /></div>
            <p className="mt-2"><Money cents={row.total_cents} /></p>
          </a>
        ))}
        {!rows.length ? <p className="text-sm text-slate-500">Keine Einträge vorhanden.</p> : null}
      </div>
    </div>
  );
}
