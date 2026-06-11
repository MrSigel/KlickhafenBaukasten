import type { MetadataRoute } from "next";
import { guidePages } from "@/lib/guide-pages";
import { site } from "@/lib/site";

const routes = [
  "/",
  "/leistungen",
  "/leistungen/webdesign-webentwicklung",
  "/leistungen/website-shop-hilfe",
  "/leistungen/seo-sichtbarkeit",
  "/leistungen/wordpress-hilfe",
  "/leistungen/shopify-hilfe",
  "/leistungen/wix-hilfe",
  "/leistungen/woocommerce-hilfe",
  "/leistungen/baukasten-hilfe",
  "/leistungen/website-pflege",
  "/preise",
  "/referenzen",
  "/warum-klickhafen",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/cookies",
  "/agb",
  "/widerruf",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const guideRoutes = ["/ratgeber", ...guidePages.map((page) => `/ratgeber/${page.slug}`)];
  return routes.concat(guideRoutes).map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-06-11"),
    changeFrequency: route === "/" || route.startsWith("/ratgeber") ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route === "/ratgeber" ? 0.85 : route.startsWith("/ratgeber/") ? 0.75 : 0.7,
  }));
}
