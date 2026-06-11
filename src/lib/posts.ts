export type PostStatus = "active" | "archived";

export type AdminPost = {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  description: string;
  category: string | null;
  platform: string;
  status: PostStatus;
  notes: string | null;
  last_copied_at: string | null;
  copy_count: number;
};

export const postCategories = [
  "Allgemein",
  "Webdesign",
  "Webentwicklung",
  "WordPress",
  "Elementor",
  "Shopify",
  "Wix",
  "Strato",
  "Baukasten",
  "Landingpage",
  "SEO",
  "Website-Pflege",
  "WooCommerce",
];

export const postStatuses: PostStatus[] = ["active", "archived"];

export function postStatusLabel(status?: string) {
  const labels: Record<string, string> = {
    active: "Aktiv",
    archived: "Archiviert",
  };
  return status ? labels[status] || status : "Unbekannt";
}

export function platformLabel(platform?: string) {
  const labels: Record<string, string> = {
    facebook: "Facebook",
    instagram: "Instagram",
    linkedin: "LinkedIn",
    other: "Andere Plattform",
  };
  return platform ? labels[platform] || platform : "Facebook";
}

export const postPlatforms = [
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "other", label: "Andere Plattform" },
];
