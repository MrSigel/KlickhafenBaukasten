import { CheckCircle } from "lucide-react";

export function CheckList({ items, columns = false }: { items: string[]; columns?: boolean }) {
  return (
    <ul className={columns ? "grid gap-3 sm:grid-cols-2 lg:grid-cols-3" : "space-y-3"}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700">
          <CheckCircle className="mt-1 size-4 shrink-0 text-cyan-700" aria-hidden="true" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}
