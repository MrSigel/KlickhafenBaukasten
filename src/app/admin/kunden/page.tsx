import { AdminHeader } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { createCustomerAction } from "../lib";
import Link from "next/link";

export default async function AdminCustomersPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = await searchParams;
  const supabase = getSupabaseAdmin();
  let query = supabase.from("customers").select("*").order("created_at", { ascending: false });
  if (params.q) query = query.or(`email.ilike.%${params.q}%,first_name.ilike.%${params.q}%,last_name.ilike.%${params.q}%,company.ilike.%${params.q}%,website_url.ilike.%${params.q}%`);
  const { data } = await query;

  return (
    <AdminGuard>
      <AdminHeader title="Kunden" text="Kunden erstellen, suchen und Stammdaten öffnen." />
      <form className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <input name="q" placeholder="Suche nach Name, Firma, E-Mail oder Website" className="w-full rounded-md border border-slate-300 px-3 py-2" />
      </form>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="space-y-3">
          {(data || []).map((row) => (
            <Link key={row.id} href={`/admin/kunden/${row.id}`} className="block rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-700">
              <p className="font-semibold text-slate-950">{row.company || `${row.first_name || ""} ${row.last_name || ""}`.trim() || row.email}</p>
              <p className="mt-2 text-sm text-slate-600">{row.email} · {row.website_url || "Keine Website"}</p>
            </Link>
          ))}
          {!data?.length ? <p className="rounded-lg bg-white p-6 text-slate-600 shadow-sm">Keine Kunden gefunden.</p> : null}
        </div>
        <form action={createCustomerAction} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Kunde erstellen</h2>
          <div className="mt-4 grid gap-3">
            {["company", "first_name", "last_name", "email", "phone", "website_url", "street", "postal_code", "city"].map((name) => (
              <input key={name} name={name} placeholder={label(name)} className="rounded-md border border-slate-300 px-3 py-2" required={name === "email"} />
            ))}
            <input name="country" defaultValue="Deutschland" className="rounded-md border border-slate-300 px-3 py-2" />
            <select name="type" className="rounded-md border border-slate-300 px-3 py-2"><option value="business">Geschäftskunde</option><option value="private">Privatkunde</option></select>
            <textarea name="notes" placeholder="Notizen" className="min-h-24 rounded-md border border-slate-300 px-3 py-2" />
            <button className="rounded-md bg-cyan-700 px-4 py-3 text-sm font-semibold text-white">Kunde speichern</button>
          </div>
        </form>
      </div>
    </AdminGuard>
  );
}

function label(name: string) {
  const labels: Record<string, string> = {
    company: "Firma",
    first_name: "Vorname",
    last_name: "Nachname",
    email: "E-Mail",
    phone: "Telefon",
    website_url: "Website",
    street: "Straße",
    postal_code: "PLZ",
    city: "Ort",
  };
  return labels[name] || name;
}
