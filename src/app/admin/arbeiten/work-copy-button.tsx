"use client";

import { ClipboardCopy } from "lucide-react";
import { useRef, useState } from "react";

export function WorkCopyButton({ postId, text, label, copiedLabel, trackCopy = false, onCopied }: { postId?: string; text: string; label: string; copiedLabel: string; trackCopy?: boolean; onCopied?: () => void }) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
  const fallbackRef = useRef<HTMLTextAreaElement>(null);

  async function copy() {
    try {
      if (!navigator.clipboard) throw new Error("Clipboard API nicht verfügbar.");
      await navigator.clipboard.writeText(text);
      if (trackCopy && postId) {
        await fetch("/api/admin/posts/copied", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: postId }),
        });
      }
      setState("copied");
      onCopied?.();
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
        className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 transition hover:border-cyan-700 hover:text-cyan-800"
      >
        <ClipboardCopy className="mr-2 size-4" aria-hidden="true" />
        {state === "copied" ? copiedLabel : label}
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
