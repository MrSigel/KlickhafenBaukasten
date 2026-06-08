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
  return <AdminGuard><AdminHeader title={invoice?.invoice_number || "Rechnung"} text={invoice?.title} /><div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><div className="flex justify-between gap-3"><StatusBadge value={invoice?.status} /><Money cents={invoice?.total_cents} /></div><div className="mt-6 space-y-3">{(items || []).map((item) => <div key={item.id} className="rounded-md bg-slate-50 p-3 text-sm"><strong>{item.title}</strong><p>{item.description}</p><p className="mt-2"><Money cents={item.line_total_cents} /></p></div>)}</div></div></AdminGuard>;
}
