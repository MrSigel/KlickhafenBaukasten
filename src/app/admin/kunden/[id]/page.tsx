import { AdminHeader, AdminLink, Money, StatusBadge } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../../guard";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const [{ data: customer }, { data: offers }, { data: invoices }] = await Promise.all([
    supabase.from("customers").select("*").eq("id", id).single(),
    supabase.from("offers").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
    supabase.from("invoices").select("*").eq("customer_id", id).order("created_at", { ascending: false }),
  ]);

  return (
    <AdminGuard>
      <AdminHeader title={customer?.company || `${customer?.first_name || ""} ${customer?.last_name || ""}`.trim() || "Kunde"} text={customer?.email} action={<div className="flex gap-3"><AdminLink href={`/admin/angebote/neu?customer=${id}`}>Neues Angebot</AdminLink><AdminLink href={`/admin/rechnungen/neu?customer=${id}`}>Neue Rechnung</AdminLink></div>} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-950">Stammdaten</h2>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <p>Firma: {customer?.company || "-"}</p>
            <p>Name: {customer?.first_name || "-"} {customer?.last_name || ""}</p>
            <p>E-Mail: {customer?.email || "-"}</p>
            <p>Website: {customer?.website_url || "-"}</p>
            <p>Adresse: {[customer?.street, customer?.postal_code, customer?.city].filter(Boolean).join(", ") || "-"}</p>
          </div>
          <p className="mt-4 whitespace-pre-wrap text-sm text-slate-600">{customer?.notes}</p>
        </div>
        <List title="Angebote" rows={offers || []} href="/admin/angebote" numberKey="offer_number" />
        <List title="Rechnungen" rows={invoices || []} href="/admin/rechnungen" numberKey="invoice_number" />
      </div>
    </AdminGuard>
  );
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
