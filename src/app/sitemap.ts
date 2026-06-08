import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "/",
  "/leistungen",
  "/leistungen/website-shop-hilfe",
  "/leistungen/seo-sichtbarkeit",
  "/leistungen/wordpress-hilfe",
  "/leistungen/shopify-hilfe",
  "/leistungen/wix-hilfe",
  "/leistungen/woocommerce-hilfe",
  "/leistungen/baukasten-hilfe",
  "/leistungen/website-pflege",
  "/preise",
  "/warum-klickhafen",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/cookies",
  "/agb",
  "/widerruf",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date("2026-06-07"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
