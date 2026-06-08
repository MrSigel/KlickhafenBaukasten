import Link from "next/link";
import { ProblemFallback } from "@/components/problem-fallback";

export default function NotFound() {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">404</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950">Diese Seite wurde nicht gefunden.</h1>
          <p className="mt-4 text-slate-650">Zurück zur Startseite oder direkt Kontakt aufnehmen.</p>
          <Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white" href="/">
            Zur Startseite
          </Link>
        </div>
        <ProblemFallback />
      </div>
    </section>
  );
}
