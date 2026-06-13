import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { pageMetadata } from "@/lib/metadata";
import { getSeoLandingPage } from "@/lib/seo-landing-pages";

const page = getSeoLandingPage("online-marketing-castrop-rauxel")!;

export const metadata: Metadata = pageMetadata({
  title: page.metaTitle,
  description: page.metaDescription,
  path: `/${page.slug}`,
});

export default function OnlineMarketingCastropRauxelPage() {
  return <SeoLandingPage page={page} />;
}
