"use client";

import { useRef, useState } from "react";
import { ClipboardCopy } from "lucide-react";

export function CopyDescriptionButton({ id, text }: { id: string; text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API nicht verfügbar.");
      await navigator.clipboard.writeText(text);
      await fetch("/api/admin/posts/copied", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setState("copied");
      window.setTimeout(() => setState("idle"), 1800);
    } catch {
      fallbackRef.current?.focus();
      fallbackRef.current?.select();
      setState("error");
    }
  }

  return (
    <div className="grid gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-10 items-center justify-center rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-800"
      >
        <ClipboardCopy className="mr-2 size-4" aria-hidden="true" />
        {state === "copied" ? "Kopiert" : "Beschreibung kopieren"}
      </button>
      {state === "error" ? (
        <>
          <p className="text-xs font-semibold text-red-700">Kopieren nicht möglich. Bitte Text manuell markieren.</p>
          <textarea ref={fallbackRef} readOnly value={text} className="sr-only" />
        </>
      ) : null}
    </div>
  );
}
