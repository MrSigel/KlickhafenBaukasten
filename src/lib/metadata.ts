import type { Metadata } from "next";
import { site } from "./site";

type MetaInput = {
  title: string;
  description: string;
  path?: string;
};

export function pageMetadata({ title, description, path = "/" }: MetaInput): Metadata {
  const url = new URL(path, site.url).toString();

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      locale: "de_DE",
      type: "website",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name} Website-Hilfe` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}
