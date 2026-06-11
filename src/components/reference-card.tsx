import { ExternalLink, ImageIcon } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import type { ReferenceItem } from "@/lib/references";

export function ReferenceCard({ reference }: { reference: ReferenceItem }) {
  return (
    <article className="flex min-h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="aspect-[3/2] bg-slate-100">
        {reference.media_url && reference.media_type === "video" ? (
          <video src={reference.media_url} className="h-full w-full object-cover" controls preload="metadata" />
        ) : reference.media_url ? (
          <img src={reference.media_url} alt={`Projektbild ${reference.title}`} className="h-full w-full object-cover" loading="lazy" />
        ) : reference.screenshot_url ? (
          <img src={reference.screenshot_url} alt={`Vorschau der Website ${reference.title}`} className="h-full w-full object-cover" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            <ImageIcon className="size-10" aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h2 className="text-xl font-semibold text-slate-950">{reference.title}</h2>
        {reference.description ? <p className="mt-3 flex-1 leading-7 text-slate-650">{reference.description}</p> : <div className="flex-1" />}
        <ButtonLink href={reference.url} variant="secondary" className="mt-6 w-full sm:w-fit">
          Projekt ansehen <ExternalLink className="ml-2 size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </article>
  );
}
