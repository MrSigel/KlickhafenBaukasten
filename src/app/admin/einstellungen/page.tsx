import { AdminHeader } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { updateSettingsAction } from "../lib";

export default async function SettingsPage() {
  const { data } = await getSupabaseAdmin().from("settings").select("*").eq("key", "admin_settings").single();
  const value = data?.value || {};
  return (
    <AdminGuard>
      <AdminHeader title="Einstellungen" text="Standardwerte für Preise, MwSt., Zahlungsziel und Unternehmensdaten." />
      <form action={updateSettingsAction} className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-2">
        <Field label="Standard-Stundensatz"><input name="hourly_rate" type="number" step="0.01" defaultValue={(value.hourly_rate_cents || 2900) / 100} className="input" /></Field>
        <Field label="Standard-MwSt."><input name="vat_rate" type="number" step="0.01" defaultValue={value.vat_rate || 19} className="input" /></Field>
        <label className="flex items-center gap-3 text-sm font-semibold text-slate-800"><input name="vat_enabled" type="checkbox" defaultChecked={value.vat_enabled || false} className="size-5 accent-cyan-700" /> MwSt. aktiv</label>
        <Field label="Standard-Zahlungsziel"><input name="default_due_days" type="number" defaultValue={value.default_due_days || 14} className="input" /></Field>
        <Field label="Standard-Angebotsgültigkeit"><input name="default_offer_valid_days" type="number" defaultValue={value.default_offer_valid_days || 7} className="input" /></Field>
        <Field label="Name"><input name="company_name" defaultValue={value.company_name || "Klickhafen"} className="input" /></Field>
        <Field label="E-Mail"><input name="email" defaultValue={value.email || "hallo@klickhafen.net"} className="input" /></Field>
        <Field label="Website"><input name="website" defaultValue={value.website || "klickhafen.net"} className="input" /></Field>
        <Field label="Adresse"><input name="address" defaultValue={value.address || "Gerther Straße 76, 44577 Castrop-Rauxel"} className="input" /></Field>
        <Field label="Zahlungsarten"><input name="payment_methods" defaultValue={value.payment_methods || "PayPal, Überweisung, Crypto nach Absprache"} className="input" /></Field>
        <div className="md:col-span-2"><button className="rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800">Einstellungen speichern</button></div>
      </form>
    </AdminGuard>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-800">{label}<div className="mt-2">{children}</div></label>;
}
