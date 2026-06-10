import Link from "next/link";
import Image from "next/image";
import { Globe, Mail } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { navItems, site } from "@/lib/site";
import logoKlickhafen from "../../logo_klickhafen_transparent.png";

const legal = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/cookies", label: "Cookies" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href="/" className="group inline-flex w-full max-w-96">
            <Image
              src={logoKlickhafen}
              alt="Klickhafen Logo"
              width={520}
              height={190}
              className="h-auto max-h-36 w-full object-contain object-left transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
            />
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Webdesign, Landingpages und verständliche Website-Hilfe für WordPress, Shopify, Wix, WooCommerce und Baukasten-Systeme.
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-400">
            Diese Website nutzt Vercel Analytics und Speed Insights zur technischen Analyse und Performance-Messung. Weitere Informationen finden Sie in der Datenschutzerklärung.
          </p>
        </div>
        <div>
          <p className="font-semibold">Navigation</p>
          <div className="mt-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">Leistungen</p>
          <div className="mt-4 flex flex-col gap-3">
            <Link href="/leistungen/webdesign-webentwicklung" className="text-sm text-slate-300 transition hover:text-white">Webdesign & Webentwicklung</Link>
            <Link href="/leistungen/webdesign-webentwicklung" className="text-sm text-slate-300 transition hover:text-white">Landingpage erstellen lassen</Link>
            <Link href="/leistungen/webdesign-webentwicklung" className="text-sm text-slate-300 transition hover:text-white">WordPress-Website erstellen</Link>
            <Link href="/leistungen/website-shop-hilfe" className="text-sm text-slate-300 transition hover:text-white">Website- & Shop-Hilfe</Link>
            <Link href="/leistungen/seo-sichtbarkeit" className="text-sm text-slate-300 transition hover:text-white">SEO & Sichtbarkeit</Link>
            <Link href="/leistungen/website-pflege" className="text-sm text-slate-300 transition hover:text-white">Website-Pflege</Link>
            <Link href="/referenzen" className="text-sm text-slate-300 transition hover:text-white">Referenzen</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold">Kontakt</p>
          <div className="mt-4 flex flex-col gap-3 text-sm text-slate-300">
            <a className="inline-flex items-center gap-2 transition hover:text-white" href={`mailto:${site.email}`}>
              <Mail className="size-4" /> {site.email}
            </a>
            <a className="inline-flex items-center gap-2 transition hover:text-white" href={site.url}>
              <Globe className="size-4" /> {site.domain}
            </a>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {legal.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
            <CookieSettingsButton />
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Klickhafen. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
}
