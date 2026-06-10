import Link from "next/link";
import { Archive, FileText, Home, Images, Inbox, LogOut, Receipt, Settings, Users } from "lucide-react";
import { logoutAction } from "./actions";

const items = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/anfragen", label: "Anfragen", icon: Inbox },
  { href: "/admin/kunden", label: "Kunden", icon: Users },
  { href: "/admin/angebote", label: "Angebote", icon: FileText },
  { href: "/admin/rechnungen", label: "Rechnungen", icon: Receipt },
  { href: "/admin/referenzen", label: "Referenzen", icon: Images },
  { href: "/admin/archiv", label: "Archiv", icon: Archive },
  { href: "/admin/einstellungen", label: "Einstellungen", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100 lg:grid lg:grid-cols-[260px_1fr]">
      <aside className="border-b border-slate-200 bg-slate-950 p-4 text-white lg:min-h-screen lg:border-b-0">
        <div className="text-xl font-semibold">Klickhafen</div>
        <nav className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
                <Icon className="size-4" /> {item.label}
              </Link>
            );
          })}
          <Link href="/" className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
            Zur Website
          </Link>
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
              <LogOut className="size-4" /> Logout
            </button>
          </form>
        </nav>
      </aside>
      <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
