export type FacebookGroupStatus = "active" | "archived";

export type FacebookGroup = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  url: string;
  category: string | null;
  account_owner: string | null;
  status: FacebookGroupStatus;
  notes: string | null;
  last_opened_at: string | null;
  open_count: number;
};

export const facebookGroupCategories = [
  "Allgemein",
  "Webdesign",
  "Webentwicklung",
  "Freelancer",
  "Fullstack",
  "WordPress",
  "Elementor",
  "Shopify",
  "Wix",
  "Strato",
  "Baukasten",
  "WooCommerce",
  "SEO",
  "Lokale Gruppen",
];

export const facebookGroupOwners = ["Enrico", "Frau", "Bruder", "Schwester", "Allgemein"];
export const facebookGroupStatuses: FacebookGroupStatus[] = ["active", "archived"];

export function facebookGroupStatusLabel(status?: string) {
  const labels: Record<string, string> = {
    active: "Aktiv",
    archived: "Archiviert",
  };
  return status ? labels[status] || status : "Unbekannt";
}

export function normalizeFacebookGroupUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("Bitte geben Sie einen Facebook-Gruppen-Link ein.");
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Bitte geben Sie eine gültige URL ein.");
  if (!url.hostname.toLowerCase().includes("facebook.com") && !url.hostname.toLowerCase().includes("fb.com")) {
    throw new Error("Bitte geben Sie einen gültigen Facebook-Gruppen-Link ein.");
  }
  return url.toString();
}

export function shortUrl(value: string) {
  try {
    const url = new URL(value);
    return `${url.hostname}${url.pathname}`.replace(/\/$/, "");
  } catch {
    return value;
  }
}
