import Link from "next/link";
import { FileDown } from "lucide-react";
import { AdminHeader, AdminLink, Money, StatusBadge } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { ConfirmActionButton } from "../beitraege/confirm-action-button";
import { deleteOfferAction } from "./actions";

export default async function OffersPage({ searchParams }: { searchParams: Promise<{ success?: string }> }) {
  const params = await searchParams;
  const { data } = await getSupabaseAdmin().from("offers").select("*, customers(company,email)").order("created_at", { ascending: false });
  return (
    <AdminGuard>
      <AdminHeader title="Angebote" text="Angebote verwalten und Status prüfen." action={<AdminLink href="/admin/angebote/neu">Angebot erstellen</AdminLink>} />
      {params.success ? <p className="mb-4 rounded-md bg-emerald-50 p-4 text-emerald-800">{params.success}</p> : null}
      <div className="space-y-3">
        {(data || []).map((row) => (
          <div key={row.id} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:border-cyan-700">
            <Link href={`/admin/angebote/${row.id}`} className="block">
              <div className="flex flex-wrap justify-between gap-3">
                <strong>{row.offer_number}</strong>
                <StatusBadge value={row.status} />
              </div>
              <p className="mt-2 text-sm text-slate-600">{row.customers?.company || row.customers?.email} · <Money cents={row.total_cents} /></p>
            </Link>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <a href={`/api/admin/offers/${row.id}/pdf`} className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
                <FileDown className="mr-2 size-4" /> PDF herunterladen
              </a>
              <form action={deleteOfferAction}>
                <input type="hidden" name="id" value={row.id} />
                <ConfirmActionButton className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60" pendingText="Löschen ..." message="Dieses Angebot wirklich endgültig löschen?">
                  Angebot löschen
                </ConfirmActionButton>
              </form>
            </div>
          </div>
        ))}
        {!data?.length ? <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">Keine Angebote vorhanden.</p> : null}
      </div>
    </AdminGuard>
  );
}
