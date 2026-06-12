import type { Metadata } from "next";
import { languageAlternates } from "./i18n";
import { site } from "./site";

type MetaInput = {
  title: string;
  description: string;
  path?: string;
};

export function pageMetadata({ title, description, path = "/" }: MetaInput): Metadata {
  const url = new URL(path, site.url).toString();
  const alternates = languageAlternates(path);
  const isEnglish = path === "/en" || path.startsWith("/en/");

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: isEnglish ? "en_US" : "de_DE",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: isEnglish ? `${site.name} website services` : `${site.name} Website-Leistungen` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
