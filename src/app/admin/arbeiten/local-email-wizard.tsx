"use client";

import Link from "next/link";
import { Copy, RotateCcw, StepForward } from "lucide-react";
import { useState } from "react";

export type LocalEmailCustomer = {
  id: string;
  company: string | null;
  email: string;
};

export function LocalEmailWizard({ initialCustomer }: { initialCustomer: LocalEmailCustomer | null }) {
  const [customer, setCustomer] = useState(initialCustomer);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function copyEmail() {
    if (!customer) return;
    await navigator.clipboard.writeText(customer.email);
    setCopied(true);
    setError("");
  }

  async function next() {
    if (!customer || !copied || saving) return;
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/local-outreach", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ customerId: customer.id }),
    }).catch(() => null);

    if (!response?.ok) {
      setSaving(false);
      setError("Weiter konnte nicht gespeichert werden.");
      return;
    }

    const result = (await response.json()) as { customer: LocalEmailCustomer | null };
    setCustomer(result.customer);
    setCopied(false);
    setSaving(false);
  }

  async function reload() {
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/local-outreach").catch(() => null);
    if (!response?.ok) {
      setSaving(false);
      setError("Es konnte gerade nicht erneut geprüft werden.");
      return;
    }
    const result = (await response.json()) as { customer: LocalEmailCustomer | null };
    setCustomer(result.customer);
    setCopied(false);
    setSaving(false);
  }

  if (!customer) {
    return (
      <section className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">Keine lokalen E-Mails verfügbar</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-650">
          Aktuell sind keine E-Mail-Adressen verfügbar oder alle wurden innerhalb der letzten 48 Stunden bearbeitet.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reload}
            disabled={saving}
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <RotateCcw className="mr-2 size-4" /> Später erneut prüfen
          </button>
          <Link href="/admin/kunden" className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
            Zu Kunden
          </Link>
        </div>
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
      </section>
    );
  }

  return (
    <section className="mt-6">
      <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-800">Lokale E-Mail</p>
        {customer.company ? <p className="mt-4 text-sm font-semibold text-slate-500">{customer.company}</p> : null}
        <p className="mt-4 break-all text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{customer.email}</p>
        {copied ? <p className="mt-4 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-800">E-Mail kopiert</p> : null}
        {error ? <p className="mt-4 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800"
          >
            <Copy className="mr-2 size-4" /> E-Mail kopieren
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!copied || saving}
            className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
          >
            <StepForward className="mr-2 size-4" /> {saving ? "Speichern ..." : "Weiter"}
          </button>
        </div>
      </div>
    </section>
  );
}
