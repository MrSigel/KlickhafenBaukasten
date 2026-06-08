import { AdminHeader, AdminLink, Money, StatCard, StatusBadge } from "@/components/admin/ui";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { redirect } from "next/navigation";
import { AdminShell } from "./admin-shell";

export default async function AdminDashboardPage() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  let dashboardData;

  try {
    const supabase = getSupabaseAdmin();
    const results = await Promise.all([
      supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("inquiries").select("id", { count: "exact", head: true }).in("status", ["new", "in_review", "answered"]),
      supabase.from("customers").select("id", { count: "exact", head: true }),
      supabase.from("offers").select("id", { count: "exact", head: true }),
      supabase.from("offers").select("id", { count: "exact", head: true }).eq("status", "accepted"),
      supabase.from("invoices").select("id", { count: "exact", head: true }).in("status", ["sent", "overdue", "partially_paid"]),
      supabase.from("invoices").select("id", { count: "exact", head: true }).eq("status", "paid"),
      supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("customers").select("*").order("created_at", { ascending: false }).limit(5),
      supabase.from("invoices").select("*").in("status", ["sent", "overdue", "partially_paid"]).order("created_at", { ascending: false }).limit(5),
      supabase.from("invoices").select("total_cents").eq("status", "paid"),
      supabase.from("invoices").select("total_cents").in("status", ["sent", "overdue", "partially_paid"]),
    ]);
    dashboardData = results;
  } catch {
    return (
      <AdminShell>
        <AdminHeader title="Dashboard" text="Der Admin-Login war erfolgreich." />
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-900 shadow-sm">
          <h2 className="text-lg font-semibold">Admin-Daten konnten nicht geladen werden.</h2>
          <p className="mt-3 leading-7">
            Bitte prüfen Sie in Vercel die Environment Variablen `NEXT_PUBLIC_SUPABASE_URL` und `SUPABASE_SERVICE_ROLE_KEY`.
            Der Login funktioniert, aber die Verbindung zu Supabase ist aktuell nicht verfügbar.
          </p>
        </div>
      </AdminShell>
    );
  }

  const [{ count: newInquiries }, { count: openInquiries }, { count: customers }, { count: offers }, { count: acceptedOffers }, { count: openInvoices }, { count: paidInvoices }, inquiries, customerRows, invoiceRows, paidTotals, openTotals] = dashboardData;

  const paid = paidTotals.data?.reduce((sum, row) => sum + (row.total_cents || 0), 0) || 0;
  const open = openTotals.data?.reduce((sum, row) => sum + (row.total_cents || 0), 0) || 0;

  return (
    <AdminShell>
      <AdminHeader title="Dashboard" text="Überblick über Anfragen, Kunden, Angebote und Rechnungen." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Neue Anfragen" value={newInquiries || 0} />
        <StatCard label="Offene Anfragen" value={openInquiries || 0} />
        <StatCard label="Kunden gesamt" value={customers || 0} />
        <StatCard label="Angebote gesamt" value={offers || 0} />
        <StatCard label="Angenommene Angebote" value={acceptedOffers || 0} />
        <StatCard label="Offene Rechnungen" value={openInvoices || 0} />
        <StatCard label="Bezahlte Rechnungen" value={paidInvoices || 0} />
        <StatCard label="Umsatz bezahlt" value={<Money cents={paid} />} />
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <StatCard label="Umsatz offen" value={<Money cents={open} />} />
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <p className="font-semibold text-slate-950">Schnelle Aktionen</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <AdminLink href="/admin/anfragen">Anfrage ansehen</AdminLink>
            <AdminLink href="/admin/kunden">Kunde erstellen</AdminLink>
            <AdminLink href="/admin/angebote/neu">Angebot erstellen</AdminLink>
            <AdminLink href="/admin/rechnungen/neu">Rechnung erstellen</AdminLink>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        <Panel title="Neueste Anfragen" rows={inquiries.data || []} primary="email" secondary="message" />
        <Panel title="Neueste Kunden" rows={customerRows.data || []} primary="email" secondary="company" />
        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="font-semibold text-slate-950">Offene Rechnungen</h2>
          <div className="mt-4 space-y-3">
            {(invoiceRows.data || []).map((row) => (
              <div key={row.id} className="rounded-md bg-slate-50 p-3 text-sm">
                <div className="flex justify-between gap-3"><span className="font-semibold">{row.invoice_number}</span><StatusBadge value={row.status} /></div>
                <p className="mt-2"><Money cents={row.total_cents} /></p>
              </div>
            ))}
            {!invoiceRows.data?.length ? <p className="text-sm text-slate-500">Keine offenen Rechnungen.</p> : null}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function Panel({ title, rows, primary, secondary }: { title: string; rows: any[]; primary: string; secondary: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-950">{title}</h2>
      <div className="mt-4 space-y-3">
        {rows.map((row) => (
          <div key={row.id} className="rounded-md bg-slate-50 p-3 text-sm">
            <p className="font-semibold text-slate-950">{row[primary] || "-"}</p>
            <p className="mt-1 line-clamp-2 text-slate-600">{row[secondary] || "-"}</p>
          </div>
        ))}
        {!rows.length ? <p className="text-sm text-slate-500">Keine Einträge vorhanden.</p> : null}
      </div>
    </div>
  );
}
