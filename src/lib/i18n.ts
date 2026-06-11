import {
  Blocks,
  BookOpen,
  CreditCard,
  FileText,
  Globe,
  HelpCircle,
  LayoutTemplate,
  Link2,
  MailWarning,
  MonitorSmartphone,
  PackagePlus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { guidePages } from "./guide-pages";
import { site } from "./site";

export type Locale = "de" | "en";

export const localeCookie = "klickhafen_locale";

export const routePairs = [
  ["/", "/en"],
  ["/leistungen", "/en/services"],
  ["/leistungen/webdesign-webentwicklung", "/en/services/web-design-development"],
  ["/leistungen/website-shop-hilfe", "/en/services/website-shop-help"],
  ["/leistungen/seo-sichtbarkeit", "/en/services/seo-visibility"],
  ["/leistungen/wordpress-hilfe", "/en/services/wordpress-help"],
  ["/leistungen/shopify-hilfe", "/en/services/shopify-help"],
  ["/leistungen/wix-hilfe", "/en/services/wix-help"],
  ["/leistungen/woocommerce-hilfe", "/en/services/woocommerce-help"],
  ["/leistungen/baukasten-hilfe", "/en/services/website-builder-help"],
  ["/leistungen/website-pflege", "/en/services/website-maintenance"],
  ["/preise", "/en/pricing"],
  ["/warum-klickhafen", "/en/why-klickhafen"],
  ["/referenzen", "/en/references"],
  ["/ratgeber", "/en/guides"],
  ["/kontakt", "/en/contact"],
  ["/impressum", "/en/legal-notice"],
  ["/datenschutz", "/en/privacy-policy"],
  ["/agb", "/en/terms"],
  ["/widerruf", "/en/withdrawal"],
  ["/cookies", "/en/cookies"],
] as const;

export const guideSlugPairs = [
  ["wordpress-kontaktformular-funktioniert-nicht", "wordpress-contact-form-not-working"],
  ["wordpress-website-mobil-optimieren", "optimize-wordpress-website-for-mobile"],
  ["elementor-seite-bearbeiten-lassen", "elementor-page-editing-help"],
  ["shopify-produkte-einpflegen", "add-products-to-shopify"],
  ["shopify-zahlungsarten-versand-pruefen", "check-shopify-payments-and-shipping"],
  ["woocommerce-checkout-funktioniert-nicht", "woocommerce-checkout-not-working"],
  ["wix-website-bearbeiten-lassen", "wix-website-editing-help"],
  ["ionos-website-baukasten-ueberarbeiten", "ionos-website-builder-redesign"],
  ["strato-website-baukasten-hilfe", "strato-website-builder-help"],
  ["domain-mit-website-verbinden", "connect-domain-to-website"],
  ["website-mit-google-search-console-verbinden", "connect-website-to-google-search-console"],
  ["landingpage-erstellen-lassen", "landing-page-creation"],
] as const;

const deToEn: Map<string, string> = new Map(routePairs);
const enToDe: Map<string, string> = new Map(routePairs.map(([de, en]) => [en, de]));

for (const [deSlug, enSlug] of guideSlugPairs) {
  deToEn.set(`/ratgeber/${deSlug}`, `/en/guides/${enSlug}`);
  enToDe.set(`/en/guides/${enSlug}`, `/ratgeber/${deSlug}`);
}

export function normalizePath(pathname: string) {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "") || "/";
}

export function isEnglishPath(pathname: string) {
  const path = normalizePath(pathname);
  return path === "/en" || path.startsWith("/en/");
}

export function alternateFor(pathname: string, locale: Locale) {
  const path = normalizePath(pathname);
  if (locale === "en") return deToEn.get(path) ?? "/en";
  return enToDe.get(path) ?? "/";
}

export function localizedHref(pathname: string, target: Locale) {
  return target === "en" ? alternateFor(pathname, "en") : alternateFor(pathname, "de");
}

export function languageAlternates(path: string) {
  const normalized = normalizePath(path);
  const dePath = isEnglishPath(normalized) ? alternateFor(normalized, "de") : normalized;
  const enPath = isEnglishPath(normalized) ? normalized : alternateFor(normalized, "en");

  return {
    canonical: `${site.url}${normalized}`,
    languages: {
      de: `${site.url}${dePath}`,
      en: `${site.url}${enPath}`,
      "x-default": `${site.url}/`,
    },
  };
}

export const enNavItems = [
  { href: "/en/services", label: "Services" },
  { href: "/en/pricing", label: "Pricing" },
  { href: "/en/why-klickhafen", label: "Why Klickhafen" },
  { href: "/en/references", label: "References" },
  { href: "/en/guides", label: "Guides" },
  { href: "/en/contact", label: "Contact" },
];

export type EnCard = {
  title: string;
  text: string;
  href: string;
  icon: LucideIcon;
  cta?: string;
};

export const enServices: EnCard[] = [
  {
    title: "Web Design & Development",
    text: "Complete websites, landing pages, one-pagers, redesigns and custom solutions with or without a website builder.",
    href: "/en/services/web-design-development",
    icon: LayoutTemplate,
  },
  {
    title: "Website & Shop Help",
    text: "Support for existing websites and shops, adjustments, mobile layout, technical issues and further development.",
    href: "/en/services/website-shop-help",
    icon: Wrench,
  },
  {
    title: "SEO & Visibility",
    text: "Realistic SEO basics, local visibility, clean indexing and technical foundations for new or existing websites.",
    href: "/en/services/seo-visibility",
    icon: Search,
  },
  {
    title: "Website Maintenance",
    text: "Ongoing website care for updates, small changes, content maintenance, forms and mobile checks.",
    href: "/en/services/website-maintenance",
    icon: MonitorSmartphone,
  },
];

export const enSystemServices: EnCard[] = [
  {
    title: "WordPress website creation, redesign or improvement",
    text: "New WordPress websites, redesigns, Elementor adjustments, forms, mobile layout, structure, maintenance and SEO basics.",
    href: "/en/services/wordpress-help",
    icon: Wrench,
  },
  {
    title: "Shopify shop creation, redesign or improvement",
    text: "New Shopify shops, product pages, start pages, collections, variants, payments, shipping, mobile layout and SEO basics.",
    href: "/en/services/shopify-help",
    icon: ShoppingBag,
  },
  {
    title: "Wix website creation, redesign or editing",
    text: "New Wix websites, redesigns, better structure, texts, images, contact forms, mobile layout, domain setup and SEO basics.",
    href: "/en/services/wix-help",
    icon: Blocks,
  },
  {
    title: "WooCommerce shop creation, redesign or improvement",
    text: "New WooCommerce shops and improvements for product pages, checkout, payment methods, shipping, mobile layout and shop structure.",
    href: "/en/services/woocommerce-help",
    icon: ShoppingCart,
  },
  {
    title: "Website builder websites",
    text: "Creation and redesign of builder-based websites in Strato, IONOS, Jimdo, Squarespace, Webflow, GoDaddy, One.com, Weebly and more.",
    href: "/en/services/website-builder-help",
    icon: HelpCircle,
  },
];

export const enGuidePages = [
  {
    slug: "wordpress-contact-form-not-working",
    deSlug: "wordpress-kontaktformular-funktioniert-nicht",
    title: "WordPress contact form not working - what to check",
    metaTitle: "WordPress contact form not working | Klickhafen",
    metaDescription: "Common causes, first checks and support when a WordPress contact form does not send emails or shows errors.",
    category: "WordPress",
    description: "Causes and first checks when a form does not send emails.",
    icon: MailWarning,
    intro: "When a WordPress contact form does not send messages, the visible form is often only one part of the issue. Plugin settings, email delivery, spam filters and hosting can all be involved.",
  },
  {
    slug: "optimize-wordpress-website-for-mobile",
    deSlug: "wordpress-website-mobil-optimieren",
    title: "Optimize a WordPress website for mobile",
    metaTitle: "Optimize WordPress website for mobile | Klickhafen",
    metaDescription: "Typical mobile layout issues in WordPress and when professional support is useful.",
    category: "WordPress",
    description: "Mobile layout, spacing, menus and forms in WordPress.",
    icon: MonitorSmartphone,
    intro: "A WordPress website can look fine on desktop and still be difficult to use on a phone. Typical issues include wide elements, overflowing text, shifted buttons and unclear menus.",
  },
  {
    slug: "elementor-page-editing-help",
    deSlug: "elementor-seite-bearbeiten-lassen",
    title: "Elementor page editing help",
    metaTitle: "Elementor page editing help | Klickhafen",
    metaDescription: "When Elementor support is useful and which adjustments are common for WordPress websites.",
    category: "WordPress",
    description: "For Elementor pages that need cleaner structure, content changes or mobile improvements.",
    icon: Wrench,
    intro: "Elementor makes many edits possible, but grown pages can become hard to maintain. Small changes may behave differently on desktop, tablet and mobile.",
  },
  {
    slug: "add-products-to-shopify",
    deSlug: "shopify-produkte-einpflegen",
    title: "Add products to Shopify",
    metaTitle: "Add products to Shopify | Klickhafen",
    metaDescription: "Support for Shopify products, variants, images, texts, categories and product data.",
    category: "Shopify",
    description: "Prepare product data, variants, images and texts in Shopify.",
    icon: PackagePlus,
    intro: "Products in Shopify need more than a title and price. Clear product pages depend on texts, images, variants, collections and shipping information.",
  },
  {
    slug: "check-shopify-payments-and-shipping",
    deSlug: "shopify-zahlungsarten-versand-pruefen",
    title: "Check Shopify payments and shipping",
    metaTitle: "Check Shopify payments and shipping | Klickhafen",
    metaDescription: "What to check in Shopify payment methods, shipping zones and basic settings before customers order.",
    category: "Shopify",
    description: "Payment, shipping and checkout basics in Shopify.",
    icon: CreditCard,
    intro: "If customers cannot pay smoothly or do not see shipping options, the cause is often payment providers, shipping zones or product data.",
  },
  {
    slug: "woocommerce-checkout-not-working",
    deSlug: "woocommerce-checkout-funktioniert-nicht",
    title: "WooCommerce checkout not working",
    metaTitle: "WooCommerce checkout not working | Klickhafen",
    metaDescription: "Common causes when WooCommerce checkout fails, payment methods are missing or orders break off.",
    category: "WooCommerce",
    description: "Narrow down WooCommerce checkout issues and understand common causes.",
    icon: ShoppingCart,
    intro: "A broken WooCommerce checkout can have many causes: payment providers, shipping zones, required fields, plugins or theme conflicts.",
  },
  {
    slug: "wix-website-editing-help",
    deSlug: "wix-website-bearbeiten-lassen",
    title: "Wix website editing help",
    metaTitle: "Wix website editing help | Klickhafen",
    metaDescription: "Support for Wix websites: content, mobile layout, forms and better structure.",
    category: "Wix",
    description: "Edit existing Wix websites and check mobile layout.",
    icon: Blocks,
    intro: "Wix websites can be edited directly in the editor, but mobile layout, spacing, forms and page structure often need careful review.",
  },
  {
    slug: "ionos-website-builder-redesign",
    deSlug: "ionos-website-baukasten-ueberarbeiten",
    title: "Redesign an IONOS website builder site",
    metaTitle: "IONOS website builder redesign | Klickhafen",
    metaDescription: "Support for IONOS website builder sites: content, structure, mobile layout, forms and domain basics.",
    category: "Website builders",
    description: "Improve IONOS builder websites with clearer structure and updated content.",
    icon: LayoutTemplate,
    intro: "An IONOS website builder site can work well for small businesses when content, structure, mobile layout and contact paths are maintained properly.",
  },
  {
    slug: "strato-website-builder-help",
    deSlug: "strato-website-baukasten-hilfe",
    title: "Strato website builder help",
    metaTitle: "Strato website builder help | Klickhafen",
    metaDescription: "Support for Strato website builder sites: content, mobile layout, forms, domain and structure.",
    category: "Website builders",
    description: "Help with Strato builder websites and typical adjustments.",
    icon: Blocks,
    intro: "Strato website builder sites can be maintained without classic development, but structure, mobile layout and forms may still need support.",
  },
  {
    slug: "connect-domain-to-website",
    deSlug: "domain-mit-website-verbinden",
    title: "Connect a domain to a website",
    metaTitle: "Connect domain to website | Klickhafen",
    metaDescription: "What matters when connecting domains, DNS, redirects, SSL and email to a website.",
    category: "Domains & Tech",
    description: "Basics around domains, DNS, SSL and website publishing.",
    icon: Link2,
    intro: "Connecting a domain to a website can affect several settings depending on provider, hosting and website builder.",
  },
  {
    slug: "connect-website-to-google-search-console",
    deSlug: "website-mit-google-search-console-verbinden",
    title: "Connect a website to Google Search Console",
    metaTitle: "Connect website to Google Search Console | Klickhafen",
    metaDescription: "Why Google Search Console matters, how websites are connected and when SEO support is useful.",
    category: "SEO basics",
    description: "Google Search Console as a foundation for indexing, sitemap and search queries.",
    icon: Search,
    intro: "Google Search Console helps you understand whether Google can find a website, which pages are indexed and which searches bring visitors.",
  },
  {
    slug: "landing-page-creation",
    deSlug: "landingpage-erstellen-lassen",
    title: "Landing page creation - what a good page needs",
    metaTitle: "Landing page creation | Klickhafen",
    metaDescription: "What a good landing page should include and how Klickhafen can support structure, design, forms and implementation.",
    category: "Landing pages",
    description: "Structure, content and request paths for focused landing pages.",
    icon: FileText,
    intro: "A landing page focuses on one offer, service or campaign. It should quickly explain the value and make it easy to send a request.",
  },
];

export function getEnglishGuide(slug: string) {
  return enGuidePages.find((page) => page.slug === slug);
}

export function allPublicDePaths() {
  return [...routePairs.map(([de]) => de), ...guidePages.map((page) => `/ratgeber/${page.slug}`)] as string[];
}

export function allPublicEnPaths() {
  return [...routePairs.map(([, en]) => en), ...enGuidePages.map((page) => `/en/guides/${page.slug}`)] as string[];
}

export function englishPathSegments() {
  return allPublicEnPaths()
    .filter((path) => path !== "/en")
    .map((path) => ({ slug: path.replace(/^\/en\/?/, "").split("/").filter(Boolean) }));
}

export function getEnglishPageKind(path: string) {
  const normalized = normalizePath(path);
  if (normalized === "/en") return { type: "home" as const };
  if (normalized === "/en/services") return { type: "services" as const };
  if (normalized.startsWith("/en/services/")) return { type: "service" as const, slug: normalized.split("/").pop() ?? "" };
  if (normalized === "/en/guides") return { type: "guides" as const };
  if (normalized.startsWith("/en/guides/")) return { type: "guide" as const, slug: normalized.split("/").pop() ?? "" };
  const simple = normalized.replace("/en/", "");
  return { type: "simple" as const, slug: simple };
}
