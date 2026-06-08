import { AdminHeader, Money, StatusBadge } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../../guard";

export default async function OfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const [{ data: offer }, { data: items }] = await Promise.all([
    supabase.from("offers").select("*, customers(*)").eq("id", id).single(),
    supabase.from("offer_items").select("*").eq("offer_id", id).order("position"),
  ]);
  return <AdminGuard><AdminHeader title={offer?.offer_number || "Angebot"} text={offer?.title} /><Detail doc={offer} items={items || []} /></AdminGuard>;
}

function Detail({ doc, items }: { doc: any; items: any[] }) {
  return <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"><div className="flex justify-between gap-3"><StatusBadge value={doc?.status} /><Money cents={doc?.total_cents} /></div><p className="mt-4 text-slate-700">{doc?.description}</p><div className="mt-6 space-y-3">{items.map((item) => <div key={item.id} className="rounded-md bg-slate-50 p-3 text-sm"><strong>{item.title}</strong><p>{item.description}</p><p className="mt-2"><Money cents={item.line_total_cents} /></p></div>)}</div><p className="mt-6 text-sm text-slate-600">Dieses Angebot ist 7 Tage ab Angebotsdatum gültig.</p></div>;
}
