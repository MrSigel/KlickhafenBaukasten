import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { FadeIn } from "./motion";

export function ServiceCard({
  title,
  text,
  price,
  href,
  icon: Icon,
  featured,
}: {
  title: string;
  text: string;
  price: string;
  href: string;
  icon: LucideIcon;
  featured?: boolean;
}) {
  return (
    <FadeIn
      className={`h-full rounded-lg border p-6 shadow-sm ${
        featured
          ? "border-cyan-700 bg-cyan-950 text-white"
          : "border-slate-200 bg-white text-slate-950"
      }`}
    >
      <Icon className={featured ? "size-8 text-cyan-200" : "size-8 text-cyan-700"} aria-hidden="true" />
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className={featured ? "mt-3 text-sm font-semibold text-cyan-100" : "mt-3 text-sm font-semibold text-cyan-800"}>
        {price}
      </p>
      <p className={featured ? "mt-4 leading-7 text-cyan-50" : "mt-4 leading-7 text-slate-650"}>{text}</p>
      <Link
        href={href}
        className={featured ? "mt-6 inline-flex items-center gap-2 font-semibold text-white" : "mt-6 inline-flex items-center gap-2 font-semibold text-cyan-800"}
      >
        Mehr erfahren <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </FadeIn>
  );
}
