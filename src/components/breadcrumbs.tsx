import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
      <Link href="/" className="font-medium text-slate-700 hover:text-cyan-800">Startseite</Link>
      <ChevronRight className="size-4 text-slate-400" aria-hidden="true" />
      <Link href="/leistungen" className="font-medium text-slate-700 hover:text-cyan-800">Leistungen</Link>
      <ChevronRight className="size-4 text-slate-400" aria-hidden="true" />
      <span className="font-semibold text-slate-950">{current}</span>
    </nav>
  );
}
