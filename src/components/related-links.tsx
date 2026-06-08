import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "./motion";

export function RelatedLinks({ links }: { links: Array<{ label: string; href: string }> }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {links.map((link) => (
        <FadeIn key={link.href}>
          <Link
            href={link.href}
            className="flex min-h-16 items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white p-4 text-sm font-semibold text-slate-950 shadow-sm transition hover:border-cyan-700 hover:text-cyan-800"
          >
            <span>{link.label}</span>
            <ArrowRight className="size-4 shrink-0" aria-hidden="true" />
          </Link>
        </FadeIn>
      ))}
    </div>
  );
}
