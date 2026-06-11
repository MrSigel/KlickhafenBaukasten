"use client";

import { ExternalLink } from "lucide-react";

export function OpenGroupButton({ id, url, postId, onOpened, disabled = false }: { id: string; url: string; postId?: string; onOpened?: () => void; disabled?: boolean }) {
  async function open() {
    if (disabled) return;
    window.open(url, "_blank", "noopener,noreferrer");
    await fetch("/api/admin/facebook-groups/opened", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, postId }),
    }).catch(() => undefined);
    onOpened?.();
  }

  return (
    <button
      type="button"
      onClick={open}
      disabled={disabled}
      className="inline-flex min-h-10 items-center justify-center rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
    >
      <ExternalLink className="mr-2 size-4" aria-hidden="true" />
      Facebook-Gruppe öffnen
    </button>
  );
}
