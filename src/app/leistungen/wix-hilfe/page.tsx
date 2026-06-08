import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { pageMetadata } from "@/lib/metadata";
import { getServicePage } from "@/lib/service-pages";

const page = getServicePage("wix-hilfe");

export const metadata: Metadata = page
  ? pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: "/leistungen/wix-hilfe" })
  : {};

export default function WixHilfePage() {
  if (!page) notFound();
  return <ServiceDetailPage page={page} />;
}
