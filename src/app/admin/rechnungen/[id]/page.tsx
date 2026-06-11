import Link from "next/link";
import { Download, FileDown } from "lucide-react";
import { AdminHeader, Money, StatusBadge } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../../guard";

export default async function InvoiceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const [{ data: invoice }, { data: items }] = await Promise.all([
    supabase.from("invoices").select("*, customers(*)").eq("id", id).single(),
    supabase.from("invoice_items").select("*").eq("invoice_id", id).order("position"),
  ]);
  return (
    <AdminGuard>
      <AdminHeader
        title={invoice?.invoice_number || "Rechnung"}
        text={invoice?.title}
        action={<DocumentActions href={`/api/admin/invoices/${id}/pdf`} backHref="/admin/rechnungen" />}
      />
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex justify-between gap-3"><StatusBadge value={invoice?.status} /><Money cents={invoice?.total_cents} /></div>
        <div className="mt-6 space-y-3">{(items || []).map((item) => <div key={item.id} className="rounded-md bg-slate-50 p-3 text-sm"><strong>{item.title}</strong><p>{item.description}</p><p className="mt-2"><Money cents={item.line_total_cents} /></p></div>)}</div>
      </div>
    </AdminGuard>
  );
}

function DocumentActions({ href, backHref }: { href: string; backHref: string }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <a href={href} className="inline-flex min-h-10 items-center justify-center rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800">
        <FileDown className="mr-2 size-4" /> PDF generieren
      </a>
      <a href={href} download className="inline-flex min-h-10 items-center justify-center rounded-md border border-cyan-700 bg-white px-4 py-2 text-sm font-semibold text-cyan-800 hover:bg-cyan-50">
        <Download className="mr-2 size-4" /> PDF herunterladen
      </a>
      <Link href={backHref} className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
        Zurück zur Übersicht
      </Link>
    </div>
  );
}
