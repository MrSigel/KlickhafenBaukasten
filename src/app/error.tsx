"use client";

import { ProblemFallback } from "@/components/problem-fallback";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProblemFallback />
        <div className="mt-6 text-center">
          <button className="inline-flex min-h-12 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white" onClick={reset}>
            Erneut versuchen
          </button>
        </div>
      </div>
    </section>
  );
}
