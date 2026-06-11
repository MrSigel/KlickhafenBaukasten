import { AdminHeader } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { updateSettingsAction } from "../lib";

export default async function SettingsPage() {
  const { data } = await getSupabaseAdmin().from("settings").select("*").eq("key", "admin_settings").single();
  const value = data?.value || {};
  return (
    <AdminGuard>
      <AdminHeader title="Einstellungen" text="Standardwerte für Preise, MwSt., Zahlungsziel, Unternehmensdaten und Bankverbindung." />
      <form action={updateSettingsAction} className="grid gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <SectionTitle title="Abrechnung" />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Standard-Stundensatz"><input name="hourly_rate" type="number" step="0.01" defaultValue={(value.hourly_rate_cents || 2900) / 100} className="input" /></Field>
          <Field label="Standard-MwSt."><input name="vat_rate" type="number" step="0.01" defaultValue={value.vat_rate || 19} className="input" /></Field>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-800"><input name="vat_enabled" type="checkbox" defaultChecked={value.vat_enabled || false} className="size-5 accent-cyan-700" /> MwSt. aktiv</label>
          <label className="flex items-center gap-3 text-sm font-semibold text-slate-800"><input name="small_business_enabled" type="checkbox" defaultChecked={value.small_business_enabled ?? !value.vat_enabled} className="size-5 accent-cyan-700" /> Kleinunternehmermodus</label>
          <Field label="Standard-Zahlungsziel"><input name="default_due_days" type="number" defaultValue={value.default_due_days || 14} className="input" /></Field>
          <Field label="Standard-Angebotsgültigkeit"><input name="default_offer_valid_days" type="number" defaultValue={value.default_offer_valid_days || 7} className="input" /></Field>
        </div>

        <SectionTitle title="Unternehmensdaten" />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Unternehmensname / Marke"><input name="company_name" defaultValue={value.company_name || "Klickhafen"} className="input" /></Field>
          <Field label="Inhaber"><input name="owner_name" defaultValue={value.owner_name || "Enrico Gross"} className="input" /></Field>
          <Field label="Straße"><input name="street" defaultValue={value.street || "Gerther Straße 76"} className="input" /></Field>
          <Field label="PLZ"><input name="postal_code" defaultValue={value.postal_code || "44577"} className="input" /></Field>
          <Field label="Ort"><input name="city" defaultValue={value.city || "Castrop-Rauxel"} className="input" /></Field>
          <Field label="Land"><input name="country" defaultValue={value.country || "Deutschland"} className="input" /></Field>
          <Field label="E-Mail"><input name="email" defaultValue={value.email || "hallo@klickhafen.net"} className="input" /></Field>
          <Field label="Telefon optional"><input name="phone" defaultValue={value.phone || ""} className="input" /></Field>
          <Field label="Website"><input name="website" defaultValue={value.website || "klickhafen.net"} className="input" /></Field>
          <Field label="Steuernummer optional"><input name="tax_number" defaultValue={value.tax_number || ""} className="input" /></Field>
          <Field label="USt-ID optional"><input name="vat_id" defaultValue={value.vat_id || ""} className="input" /></Field>
          <Field label="Zahlungsarten"><input name="payment_methods" defaultValue={value.payment_methods || "PayPal, Überweisung, Crypto nach Absprache"} className="input" /></Field>
          <input type="hidden" name="address" value={value.address || "Gerther Straße 76, 44577 Castrop-Rauxel"} />
        </div>

        <SectionTitle title="Bankverbindung" />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Kontoinhaber"><input name="bank_account_holder" defaultValue={value.bank_account_holder || ""} className="input" /></Field>
          <Field label="IBAN"><input name="bank_iban" defaultValue={value.bank_iban || ""} className="input" /></Field>
          <Field label="BIC"><input name="bank_bic" defaultValue={value.bank_bic || ""} className="input" /></Field>
          <Field label="Bank"><input name="bank_name" defaultValue={value.bank_name || ""} className="input" /></Field>
        </div>

        <div><button className="rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800">Einstellungen speichern</button></div>
      </form>
    </AdminGuard>
  );
}

function SectionTitle({ title }: { title: string }) {
  return <h2 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-950">{title}</h2>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-800">{label}<div className="mt-2">{children}</div></label>;
}
