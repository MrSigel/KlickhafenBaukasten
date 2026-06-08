import { CheckList } from "./check-list";
import { FadeIn } from "./motion";

export function PricingCard({ name, price, hours, items }: { name: string; price: string; hours: string; items: string[] }) {
  return (
    <FadeIn className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-950">{name}</h3>
      <p className="mt-4 text-3xl font-semibold text-slate-950">{price}</p>
      <p className="mt-1 text-sm font-medium text-cyan-800">pro Monat</p>
      <p className="mt-4 rounded-md bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">{hours}</p>
      <div className="mt-6">
        <CheckList items={items} />
      </div>
    </FadeIn>
  );
}
