import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { pageMetadata } from "@/lib/metadata";
import { getServicePage } from "@/lib/service-pages";

const page = getServicePage("website-pflege");

export const metadata: Metadata = page
  ? pageMetadata({ title: page.metaTitle, description: page.metaDescription, path: "/leistungen/website-pflege" })
  : {};

export default function WebsitePflegePage() {
  if (!page) notFound();
  return <ServiceDetailPage page={page} />;
}
