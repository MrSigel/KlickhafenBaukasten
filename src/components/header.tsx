"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { enNavItems, isEnglishPath, localeCookie, localizedHref } from "@/lib/i18n";
import { navItems, site } from "@/lib/site";
import { ButtonLink } from "./button-link";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isEnglish = isEnglishPath(pathname);
  const items = isEnglish ? enNavItems : navItems;
  const contactHref = isEnglish ? "/en/contact" : "/kontakt";
  const ctaLabel = isEnglish ? "Request now" : "Jetzt Anfragen";
  const navLabel = isEnglish ? "Main navigation" : "Hauptnavigation";

  function rememberLocale(locale: "de" | "en") {
    document.cookie = `${localeCookie}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
    setOpen(false);
  }

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={isEnglish ? "/en" : "/"} className="group flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <span className="text-2xl font-semibold tracking-tight text-slate-950 transition duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-800 sm:text-3xl">
            {site.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label={navLabel}>
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-semibold transition ${
                pathname === item.href ? "bg-cyan-50 text-cyan-800" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-1 text-xs font-semibold" aria-label="Language switcher">
            <Link href={localizedHref(pathname, "de")} onClick={() => rememberLocale("de")} className={`rounded px-2 py-1 ${!isEnglish ? "bg-white text-cyan-800 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}>DE</Link>
            <Link href={localizedHref(pathname, "en")} onClick={() => rememberLocale("en")} className={`rounded px-2 py-1 ${isEnglish ? "bg-white text-cyan-800 shadow-sm" : "text-slate-600 hover:text-slate-950"}`}>EN</Link>
          </div>
          <ButtonLink href={contactHref}>{ctaLabel}</ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md border border-slate-300 text-slate-800 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={isEnglish ? "Open menu" : "Menü öffnen"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-slate-200 bg-white lg:hidden"
          >
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label={isEnglish ? "Mobile navigation" : "Mobile Navigation"}>
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-md px-3 py-3 text-base font-semibold ${
                    pathname === item.href ? "bg-cyan-50 text-cyan-800" : "text-slate-800"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-md bg-slate-50 p-1 text-center text-sm font-semibold">
                <Link href={localizedHref(pathname, "de")} onClick={() => rememberLocale("de")} className={`rounded-md px-3 py-2 ${!isEnglish ? "bg-white text-cyan-800 shadow-sm" : "text-slate-700"}`}>DE</Link>
                <Link href={localizedHref(pathname, "en")} onClick={() => rememberLocale("en")} className={`rounded-md px-3 py-2 ${isEnglish ? "bg-white text-cyan-800 shadow-sm" : "text-slate-700"}`}>EN</Link>
              </div>
              <ButtonLink href={contactHref} className="mt-3 w-full" onClick={() => setOpen(false)}>
                {ctaLabel}
              </ButtonLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
