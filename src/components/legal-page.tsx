import type { ReactNode } from "react";
import { FileText, type LucideIcon } from "lucide-react";

export function LegalPage({
  eyebrow,
  title,
  intro,
  icon: Icon = FileText,
  links,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  icon?: LucideIcon;
  links: string[];
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-slate-50 py-14 sm:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Icon className="size-9 text-cyan-700" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">{eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
            <p className="mt-5 text-lg leading-8 text-slate-650">{intro}</p>
          </div>
        </div>
      </section>
      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
          <aside className="lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <p className="font-semibold text-slate-950">Inhalt</p>
              <nav className="mt-4 flex flex-col gap-2">
                {links.map((link) => (
                  <a key={link} href={`#${slug(link)}`} className="rounded-md px-3 py-2 text-sm font-medium text-slate-650 transition hover:bg-cyan-50 hover:text-cyan-800">
                    {link}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
            <div className="space-y-8 text-slate-700">{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section id={slug(title)} className="scroll-mt-28">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-4 space-y-4 text-base leading-7">{children}</div>
    </section>
  );
}

export function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
