import { Mail } from "lucide-react";
import { site } from "@/lib/site";

export function ProblemFallback() {
  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-950">Leider gibt es aktuell technische Schwierigkeiten.</h1>
      <p className="mt-3 leading-7 text-slate-650">Bitte kontaktieren Sie uns direkt per E-Mail.</p>
      <div className="mt-6 flex justify-center">
        <a className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white" href={`mailto:${site.email}`}>
          <Mail className="size-4" /> E-Mail schreiben
        </a>
      </div>
    </div>
  );
}
