import type { ReactNode } from "react";
import { FadeIn } from "./motion";

type SectionProps = {
  eyebrow?: string;
  title: string;
  text?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ eyebrow, title, text, children, className = "" }: SectionProps) {
  return (
    <section className={`py-16 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="max-w-3xl">
          {eyebrow ? <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">{eyebrow}</p> : null}
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
          {text ? <p className="mt-4 text-lg leading-8 text-slate-650">{text}</p> : null}
        </FadeIn>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
