"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { navItems, site } from "@/lib/site";
import { ButtonLink } from "./button-link";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex min-w-0 items-center" onClick={() => setOpen(false)}>
          <span className="text-2xl font-semibold tracking-tight text-slate-950 transition duration-300 group-hover:-translate-y-0.5 group-hover:text-cyan-800 sm:text-3xl">
            {site.name}
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          {navItems.map((item) => (
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
        <div className="hidden lg:block">
          <ButtonLink href="/kontakt">Jetzt Anfragen</ButtonLink>
        </div>
        <button
          type="button"
          className="inline-flex size-11 items-center justify-center rounded-md border border-slate-300 text-slate-800 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Menü öffnen"
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
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6" aria-label="Mobile Navigation">
              {navItems.map((item) => (
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
              <ButtonLink href="/kontakt" className="mt-3 w-full" onClick={() => setOpen(false)}>
                Jetzt Anfragen
              </ButtonLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
