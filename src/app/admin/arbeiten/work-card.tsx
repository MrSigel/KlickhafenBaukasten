"use client";

import { ExternalLink, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { AdminLink } from "@/components/admin/ui";
import { OpenGroupButton } from "../beitraege/open-group-button";
import { WorkCopyButton } from "./work-copy-button";
import { type AdminPost, postStatusLabel } from "@/lib/posts";
import { type FacebookGroup, facebookGroupStatusLabel, shortUrl } from "@/lib/facebook-groups";

type LockInfo = {
  locked: boolean;
  lastWorkedAt: string | null;
  availableAt: string | null;
  remainingLabel: string | null;
};

export function WorkCard({ group, post, lock, mode }: { group: FacebookGroup; post: AdminPost | null; lock: LockInfo; mode: string }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  const lockedInAllView = mode === "all" && lock.locked;

  function hideIfOpenList() {
    if (mode === "open") setHidden(true);
  }

  return (
    <article className={`rounded-lg border p-5 shadow-sm ${lockedInAllView ? "border-amber-200 bg-amber-50/60" : "border-slate-200 bg-white"}`}>
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{facebookGroupStatusLabel(group.status)}</Badge>
            {group.category ? <Badge>{group.category}</Badge> : null}
            {group.account_owner ? <Badge>{group.account_owner}</Badge> : null}
            {lock.locked ? <Badge tone="amber">24h gesperrt</Badge> : null}
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-950">{group.name}</h2>
          <a href={group.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-cyan-800 hover:text-cyan-950">
            <ExternalLink className="size-4 shrink-0" /> {shortUrl(group.url)}
          </a>
          <p className="mt-3 text-sm text-slate-500">
            {group.open_count || 0} Öffnungen{group.last_opened_at ? ` · zuletzt geöffnet ${formatDateTime(group.last_opened_at)}` : ""}
          </p>
          {lock.locked ? (
            <div className="mt-4 rounded-md border border-amber-200 bg-white/80 p-3 text-sm text-amber-900">
              <p className="font-semibold">Wieder verfügbar in: {lock.remainingLabel}</p>
              {lock.lastWorkedAt ? <p className="mt-1">Zuletzt bearbeitet am: {formatDateTime(lock.lastWorkedAt)}</p> : null}
              {lock.availableAt ? <p className="mt-1">Wieder verfügbar ab: {formatDateTime(lock.availableAt)}</p> : null}
            </div>
          ) : null}
        </div>
        <div className="min-w-0 rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">Passender Beitrag</p>
          {post ? (
            <>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.category ? <Badge>{post.category}</Badge> : null}
                <Badge>{postStatusLabel(post.status)}</Badge>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-950">{post.title}</h3>
              <p className="mt-2 line-clamp-4 whitespace-pre-line text-sm leading-6 text-slate-650">{post.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
                <WorkCopyButton text={post.title} label="Titel kopieren" copiedLabel="Titel kopiert" />
                <WorkCopyButton postId={post.id} text={post.description} label="Beschreibung kopieren" copiedLabel="Beschreibung kopiert" trackCopy />
                <OpenGroupButton id={group.id} url={group.url} postId={post.id} onOpened={hideIfOpenList} disabled={lockedInAllView} />
                <DoneButton groupId={group.id} postId={post.id} onDone={hideIfOpenList} disabled={lockedInAllView} />
              </div>
            </>
          ) : (
            <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
              Kein passender Beitrag gefunden.
              <div className="mt-3">
                <AdminLink href="/admin/beitraege/neu">Beitrag erstellen</AdminLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function DoneButton({ groupId, postId, onDone, disabled }: { groupId: string; postId?: string; onDone: () => void; disabled?: boolean }) {
  const [state, setState] = useState<"idle" | "done" | "error">("idle");

  async function done() {
    if (disabled) return;
    const response = await fetch("/api/admin/work-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId, postId }),
    }).catch(() => null);

    if (!response?.ok) {
      setState("error");
      return;
    }
    setState("done");
    window.setTimeout(onDone, 250);
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={done}
        disabled={disabled || state === "done"}
        className="inline-flex min-h-10 items-center justify-center rounded-md bg-emerald-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
      >
        <CheckCircle2 className="mr-2 size-4" aria-hidden="true" />
        {state === "done" ? "Erledigt" : "Als erledigt markieren"}
      </button>
      {state === "error" ? <p className="text-xs font-semibold text-red-700">Erledigt-Markierung konnte nicht gespeichert werden.</p> : null}
    </div>
  );
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "cyan" | "amber" }) {
  const styles = {
    cyan: "bg-cyan-50 text-cyan-800",
    amber: "bg-amber-100 text-amber-900",
    slate: "bg-slate-100 text-slate-700",
  };
  return <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}>{children}</span>;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
