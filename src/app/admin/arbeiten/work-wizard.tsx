"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, RotateCcw, SkipForward } from "lucide-react";
import { useMemo, useState } from "react";
import { WorkCopyButton } from "./work-copy-button";
import { type AdminPost, postStatusLabel } from "@/lib/posts";
import { type FacebookGroup, facebookGroupStatusLabel, shortUrl } from "@/lib/facebook-groups";

type WizardItem = {
  group: FacebookGroup;
  post: AdminPost | null;
};

export function WorkWizard({ items }: { items: WizardItem[] }) {
  const [queue, setQueue] = useState(items);
  const [step, setStep] = useState<1 | 2>(1);
  const [opened, setOpened] = useState(false);
  const [titleCopied, setTitleCopied] = useState(false);
  const [descriptionCopied, setDescriptionCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const current = queue[0];

  const progress = useMemo(() => ({ current: items.length - queue.length + 1, total: items.length }), [items.length, queue.length]);

  function nextItem() {
    setQueue((value) => value.slice(1));
    setStep(1);
    setOpened(false);
    setTitleCopied(false);
    setDescriptionCopied(false);
    setSaving(false);
    setError("");
  }

  async function openGroup() {
    if (!current) return;
    window.open(current.group.url, "_blank", "noopener,noreferrer");
    await fetch("/api/admin/facebook-groups/opened", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: current.group.id }),
    }).catch(() => undefined);
    setOpened(true);
  }

  async function finish() {
    if (!current || !current.post || !descriptionCopied || saving) return;
    setSaving(true);
    setError("");
    const response = await fetch("/api/admin/work-logs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ groupId: current.group.id, postId: current.post.id, alreadyOpened: opened }),
    }).catch(() => null);

    if (!response?.ok) {
      setSaving(false);
      setError("Fertig konnte nicht gespeichert werden.");
      return;
    }
    nextItem();
  }

  if (!current) {
    return (
      <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h2 className="text-2xl font-semibold text-slate-950">Für heute ist alles erledigt</h2>
        <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-650">
          Es sind aktuell keine verfügbaren Gruppen vorhanden. Gruppen werden automatisch nach 24 Stunden wieder freigegeben.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/admin/arbeiten?view=all" className="inline-flex min-h-11 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800">
          Alle Gruppen ansehen
          </Link>
          <Link href="/admin/arbeiten" className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
            <RotateCcw className="mr-2 size-4" /> Filter zurücksetzen
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="mt-6">
      <div className="mb-4 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
        <Stat label="Heute erledigt" value={Math.max(0, items.length - queue.length)} />
        <Stat label="Noch verfügbar" value={queue.length} />
        <Stat label="Aktuelle Position" value={`${Math.min(progress.current, progress.total)} / ${progress.total}`} />
      </div>

      <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-800">
              Schritt {step} von 2: {step === 1 ? "Gruppe öffnen" : "Beitrag kopieren"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">{current.group.name}</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{facebookGroupStatusLabel(current.group.status)}</Badge>
            {current.group.category ? <Badge>{current.group.category}</Badge> : null}
            {current.group.account_owner ? <Badge>{current.group.account_owner}</Badge> : null}
          </div>
        </div>

        {step === 1 ? (
          <div className="pt-6">
            <p className="text-lg font-semibold text-slate-950">Öffne zuerst die Facebook-Gruppe in einem neuen Tab.</p>
            <a href={current.group.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-cyan-800 hover:text-cyan-950">
              <ExternalLink className="size-4 shrink-0" /> {shortUrl(current.group.url)}
            </a>
            <p className="mt-4 text-sm text-slate-500">
              {current.group.open_count || 0} Öffnungen{current.group.last_opened_at ? ` · zuletzt geöffnet ${formatDateTime(current.group.last_opened_at)}` : ""}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <button type="button" onClick={openGroup} className="inline-flex min-h-12 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800">
                <ExternalLink className="mr-2 size-4" /> Facebook-Gruppe öffnen
              </button>
              <button type="button" onClick={() => setStep(2)} disabled={!opened} className="inline-flex min-h-12 items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600">
                Weiter <ArrowRight className="ml-2 size-4" />
              </button>
              <button type="button" onClick={nextItem} className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
                <SkipForward className="mr-2 size-4" /> Überspringen
              </button>
            </div>
          </div>
        ) : (
          <div className="pt-6">
            {current.post ? (
              <>
                <div className="flex flex-wrap gap-2">
                  {current.post.category ? <Badge>{current.post.category}</Badge> : null}
                  <Badge>{postStatusLabel(current.post.status)}</Badge>
                </div>
                <h3 className="mt-4 text-2xl font-semibold text-slate-950">{current.post.title}</h3>
                <div className="mt-4 max-h-72 overflow-y-auto rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="whitespace-pre-line text-sm leading-7 text-slate-700">{current.post.description}</p>
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <WorkCopyButton text={current.post.title} label="Titel kopieren" copiedLabel="Titel kopiert" onCopied={() => setTitleCopied(true)} />
                  <WorkCopyButton text={current.post.description} label="Beschreibung kopieren" copiedLabel="Beschreibung kopiert" onCopied={() => setDescriptionCopied(true)} />
                </div>
                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  <button type="button" onClick={() => setStep(1)} className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
                    <ArrowLeft className="mr-2 size-4" /> Zurück
                  </button>
                  <button type="button" onClick={nextItem} className="inline-flex min-h-12 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
                    <SkipForward className="mr-2 size-4" /> Überspringen
                  </button>
                  <button type="button" onClick={finish} disabled={!descriptionCopied || saving} className="inline-flex min-h-12 items-center justify-center rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600">
                    <CheckCircle2 className="mr-2 size-4" /> {saving ? "Speichern ..." : "Fertig"}
                  </button>
                </div>
                {!titleCopied ? <p className="mt-4 text-sm text-slate-500">Hinweis: Der Titel wurde noch nicht kopiert.</p> : null}
                {!descriptionCopied ? <p className="mt-2 text-sm font-semibold text-amber-800">„Fertig“ wird aktiv, sobald die Beschreibung kopiert wurde.</p> : null}
                {error ? <p className="mt-3 rounded-md bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p> : null}
              </>
            ) : (
              <div className="rounded-md border border-amber-200 bg-amber-50 p-5 text-sm font-semibold text-amber-900">
                Kein passender Beitrag gefunden.
                <div className="mt-4">
                  <Link href="/admin/beitraege/neu" className="inline-flex min-h-11 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800">
                    Beitrag erstellen
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "cyan" }) {
  return <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${tone === "cyan" ? "bg-cyan-50 text-cyan-800" : "bg-slate-100 text-slate-700"}`}>{children}</span>;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
