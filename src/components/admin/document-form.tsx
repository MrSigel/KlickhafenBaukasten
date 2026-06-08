import type { ReactNode } from "react";
import { statusLabel } from "@/components/admin/ui";

const offerStatuses = ["draft", "sent", "accepted", "rejected", "expired"];
const invoiceStatuses = ["sent", "paid", "overdue", "cancelled"];

export function DocumentForm({ customers, action, type }: { customers: any[]; action: (formData: FormData) => Promise<void>; type: "offer" | "invoice" }) {
  return (
    <form action={action} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Kunde"><select name="customer_id" required className="input">{customers.map((c) => <option key={c.id} value={c.id}>{c.company || c.email}</option>)}</select></Field>
        <Field label="Status"><select name="status" className="input">{(type === "offer" ? offerStatuses : invoiceStatuses).map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}</select></Field>
        <Field label="Titel"><input name="title" defaultValue={type === "offer" ? "Angebot" : "Rechnung"} className="input" /></Field>
        {type === "invoice" ? <Field label="Fälligkeitsdatum"><input name="due_date" type="date" className="input" /></Field> : null}
        <Field label="Beschreibung"><textarea name="description" className="input min-h-24" /></Field>
        <Field label="Notizen"><textarea name="notes" className="input min-h-24" /></Field>
      </div>
      <div className="mt-6 rounded-lg bg-slate-50 p-4">
        <h2 className="font-semibold text-slate-950">Erste Position</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <Field label="Positionstitel"><input name="item_title" required defaultValue="Website-Hilfe" className="input" /></Field>
          <Field label="Beschreibung"><input name="item_description" className="input" /></Field>
          <Field label="Menge"><input name="quantity" type="number" min="0" step="0.25" defaultValue="1" className="input" /></Field>
          <Field label="Einzelpreis in Euro"><input name="unit_price" type="number" min="0" step="0.01" defaultValue="29" className="input" /></Field>
          <Field label="Rabatt in %"><input name="discount_percent" type="number" min="0" step="0.01" defaultValue="0" className="input" /></Field>
          <label className="flex items-center gap-3 pt-8 text-sm font-semibold text-slate-800"><input name="vat_enabled" type="checkbox" className="size-5 accent-cyan-700" /> MwSt. 19 % aktiv</label>
        </div>
      </div>
      <p className="mt-4 rounded-md bg-cyan-50 p-3 text-sm text-cyan-950">Ohne aktive MwSt. wird intern der Kleinunternehmermodus nach § 19 UStG berücksichtigt.</p>
      <button className="mt-6 rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800">Speichern</button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block text-sm font-semibold text-slate-800">{label}<div className="mt-2">{children}</div></label>;
}
