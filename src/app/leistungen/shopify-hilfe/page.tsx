import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { pageMetadata } from "@/lib/metadata";
import { getServicePage } from "@/lib/service-pages";

const page = getServicePage("shopify-hilfe");

export const metadata: Metadata = page
  ? pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: "/leistungen/shopify-hilfe" })
  : {};

export default function ShopifyHilfePage() {
  if (!page) notFound();
  return <ServiceDetailPage page={page} />;
}
