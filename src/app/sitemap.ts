import type { MetadataRoute } from "next";
import { allPublicDePaths, allPublicEnPaths, alternateFor, isEnglishPath } from "@/lib/i18n";
import { seoLandingPages } from "@/lib/seo-landing-pages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const seoRoutes = seoLandingPages.map((page) => `/${page.slug}`);
  const routes: string[] = [...new Set([...allPublicDePaths(), ...seoRoutes, ...allPublicEnPaths()])];
  return routes.map((route) => {
    const dePath = isEnglishPath(route) ? alternateFor(route, "de") : route;
    const enPath = isEnglishPath(route) ? route : alternateFor(route, "en");

    return {
      url: `${site.url}${route}`,
      lastModified: new Date("2026-06-12"),
      changeFrequency: route === "/" || route === "/en" || route.includes("ratgeber") || route.includes("guides") || seoRoutes.includes(route) ? "weekly" : "monthly",
      priority: route === "/" || route === "/en" ? 1 : route === "/ratgeber" || route === "/en/guides" ? 0.85 : route.includes("ratgeber/") || route.includes("guides/") || seoRoutes.includes(route) ? 0.75 : 0.7,
      alternates: {
        languages: {
          de: `${site.url}${dePath}`,
          en: `${site.url}${enPath}`,
          "x-default": `${site.url}/`,
        },
      },
    };
  });
}
