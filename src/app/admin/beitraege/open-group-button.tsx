"use client";

import { ExternalLink } from "lucide-react";

export function OpenGroupButton({ id, url }: { id: string; url: string }) {
  async function open() {
    window.open(url, "_blank", "noopener,noreferrer");
    await fetch("/api/admin/facebook-groups/opened", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).catch(() => undefined);
  }

  return (
    <button
      type="button"
      onClick={open}
      className="inline-flex min-h-10 items-center justify-center rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
    >
      <ExternalLink className="mr-2 size-4" aria-hidden="true" />
      Öffnen
    </button>
  );
}
