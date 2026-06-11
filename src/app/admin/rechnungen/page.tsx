import Link from "next/link";
import { FileDown } from "lucide-react";
import { AdminHeader, AdminLink, Money, StatusBadge } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";

export default async function InvoicesPage() {
  const { data } = await getSupabaseAdmin().from("invoices").select("*, customers(company,email)").order("created_at", { ascending: false });
  return (
    <AdminGuard>
      <AdminHeader title="Rechnungen" text="Rechnungen verwalten und Zahlungsstatus prüfen." action={<AdminLink href="/admin/rechnungen/neu">Rechnung erstellen</AdminLink>} />
      <div className="space-y-3">
        {(data || []).map((row) => (
          <div key={row.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-cyan-700">
            <Link href={`/admin/rechnungen/${row.id}`} className="block">
              <div className="flex flex-wrap justify-between gap-3">
                <strong>{row.invoice_number}</strong>
                <StatusBadge value={row.status} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{row.customers?.company || row.customers?.email} · <Money cents={row.total_cents} /></p>
            </Link>
            <a href={`/api/admin/invoices/${row.id}/pdf`} className="mt-4 inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
              <FileDown className="mr-2 size-4" /> PDF herunterladen
            </a>
          </div>
        ))}
        {!data?.length ? <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">Keine Rechnungen vorhanden.</p> : null}
      </div>
    </AdminGuard>
  );
}
