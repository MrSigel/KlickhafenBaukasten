import Link from "next/link";
import { centsToEuro } from "@/lib/server/money";

export function AdminHeader({ title, text, action }: { title: string; text?: string; action?: React.ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-950">{title}</h1>
        {text ? <p className="mt-2 text-slate-650">{text}</p> : null}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

export function StatusBadge({ value }: { value?: string }) {
  const label = value || "unbekannt";
  return <span className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">{label}</span>;
}

export function AdminLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="inline-flex min-h-10 items-center justify-center rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800">{children}</Link>;
}

export function Money({ cents }: { cents?: number }) {
  return <>{centsToEuro(cents || 0)}</>;
}
