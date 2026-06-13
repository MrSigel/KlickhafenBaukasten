"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Globe, Mail } from "lucide-react";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { enNavItems, isEnglishPath } from "@/lib/i18n";
import { navItems, site } from "@/lib/site";
import logoKlickhafen from "../../logo_klickhafen_transparent.png";

const legalDe = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/cookies", label: "Cookies" },
  { href: "/agb", label: "AGB" },
  { href: "/widerruf", label: "Widerruf" },
];

const legalEn = [
  { href: "/en/legal-notice", label: "Legal notice" },
  { href: "/en/privacy-policy", label: "Privacy policy" },
  { href: "/en/cookies", label: "Cookies" },
  { href: "/en/terms", label: "Terms" },
  { href: "/en/withdrawal", label: "Withdrawal" },
];

export function Footer() {
  const pathname = usePathname();
  const isEnglish = isEnglishPath(pathname);
  const navigation = isEnglish ? enNavItems : navItems;
  const legal = isEnglish ? legalEn : legalDe;
  const services = isEnglish
    ? [
        { href: "/en/services/web-design-development", label: "Web Design & Development" },
        { href: "/en/services/website-creation", label: "Website creation" },
        { href: "/en/services/landing-page-creation", label: "Landing page creation" },
        { href: "/en/services/wordpress-help", label: "WordPress" },
        { href: "/en/services/shopify-help", label: "Shopify" },
        { href: "/en/services/wix-help", label: "Wix" },
        { href: "/en/services/woocommerce-help", label: "WooCommerce" },
        { href: "/en/services/website-builder-help", label: "Website builders" },
        { href: "/en/services/website-shop-help", label: "Website & Shop Help" },
        { href: "/en/services/seo-visibility", label: "SEO & Visibility" },
        { href: "/en/services/website-maintenance", label: "Website Maintenance" },
        { href: "/en/guides", label: "Guides" },
        { href: "/en/references", label: "References" },
        { href: "/en/contact", label: "Contact" },
      ]
    : [
        { href: "/leistungen/webdesign-webentwicklung", label: "Webdesign & Webentwicklung" },
        { href: "/leistungen/website-erstellen-lassen", label: "Website erstellen lassen" },
        { href: "/leistungen/landingpage-erstellen-lassen", label: "Landingpage erstellen lassen" },
        { href: "/leistungen/wordpress-hilfe", label: "WordPress" },
        { href: "/leistungen/shopify-hilfe", label: "Shopify" },
        { href: "/leistungen/wix-hilfe", label: "Wix" },
        { href: "/leistungen/woocommerce-hilfe", label: "WooCommerce" },
        { href: "/woocommerce-beratung", label: "WooCommerce Beratung" },
        { href: "/leistungen/baukasten-hilfe", label: "Baukasten-Websites" },
        { href: "/shopsystem-pflege", label: "Shopsystem-Pflege" },
        { href: "/leistungen/website-shop-hilfe", label: "Website- & Shop-Hilfe" },
        { href: "/leistungen/seo-sichtbarkeit", label: "SEO & Sichtbarkeit" },
        { href: "/online-marketing-castrop-rauxel", label: "Online Marketing Castrop-Rauxel" },
        { href: "/leistungen/website-pflege", label: "Website-Pflege" },
        { href: "/website-betreuung-ennepetal", label: "Website Betreuung Ennepetal" },
        { href: "/wordpress-kontaktformular-kommt-nicht-an", label: "WordPress Kontaktformular" },
        { href: "/ratgeber", label: "Ratgeber" },
        { href: "/referenzen", label: "Referenzen" },
        { href: "/kontakt", label: "Kontakt" },
      ];

  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Link href={isEnglish ? "/en" : "/"} className="group inline-flex w-full max-w-96">
            <Image
              src={logoKlickhafen}
              alt="Klickhafen Logo"
              width={520}
              height={190}
              className="h-auto max-h-36 w-full object-contain object-left transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
            />
          </Link>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            {isEnglish
              ? "Klickhafen creates websites, landing pages and online shops from scratch and supports redesigns, relaunches, website maintenance and systems such as WordPress, Shopify, Wix, WooCommerce and website builders."
              : "Klickhafen erstellt Websites, Landingpages und Online-Shops von Grund auf und unterstützt bei Relaunch, Redesign, Website-Pflege und bestehenden Systemen wie WordPress, Shopify, Wix, WooCommerce und Baukasten-Websites."}
          </p>
          <p className="mt-4 text-xs leading-5 text-slate-400">
            {isEnglish
              ? "Optional analytics and performance services are loaded only after consent. More information is available in the privacy policy."
              : "Optionale Analyse- und Performance-Dienste werden nur nach Zustimmung geladen. Weitere Informationen finden Sie in der Datenschutzerklärung."}
          </p>
        </div>
        <div>
          <p className="font-semibold">{isEnglish ? "Navigation" : "Navigation"}</p>
          <div className="mt-4 flex flex-col gap-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">{isEnglish ? "Services" : "Leistungen"}</p>
          <div className="mt-4 flex flex-col gap-3">
            {services.map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} className="text-sm text-slate-300 transition hover:text-white">{item.label}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold">{isEnglish ? "Contact" : "Kontakt"}</p>
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
            <CookieSettingsButton label={isEnglish ? "Cookie settings" : "Cookie-Einstellungen"} />
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Klickhafen. {isEnglish ? "All rights reserved." : "Alle Rechte vorbehalten."}
      </div>
    </footer>
  );
}
