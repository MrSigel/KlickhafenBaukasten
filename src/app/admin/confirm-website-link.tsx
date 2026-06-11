"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

export function ConfirmWebsiteLink() {
  return (
    <Link
      href="/"
      onClick={(event) => {
        if (!window.confirm("Möchtest du wirklich auf die Website?")) {
          event.preventDefault();
        }
      }}
      className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
    >
      <ExternalLink className="size-4" /> Website
    </Link>
  );
}
