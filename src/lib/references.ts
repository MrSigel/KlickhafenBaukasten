import { getSupabaseAdmin } from "@/lib/server/supabase";

export type ReferenceItem = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  screenshot_url: string | null;
  media_url: string | null;
  media_type: "image" | "video" | null;
  status: "draft" | "active" | "inactive" | "archived";
  sort_order: number;
  featured: boolean;
  created_at: string;
  updated_at: string;
};

export const referenceStatuses = ["draft", "active", "inactive", "archived"] as const;

export function referenceStatusLabel(status?: string) {
  const labels: Record<string, string> = {
    draft: "Entwurf",
    active: "Aktiv",
    inactive: "Inaktiv",
    archived: "Archiviert",
  };
  return status ? labels[status] || status : "Unbekannt";
}

export function normalizeUrl(value: string) {
  const trimmed = value.trim();
  if (!trimmed) throw new Error("Bitte geben Sie eine URL ein.");
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  const url = new URL(withProtocol);
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("Bitte geben Sie eine gültige Website-URL ein.");
  }
  return url.toString();
}

export async function getActiveReferences(limit?: number) {
  let query = getSupabaseAdmin()
    .from("references")
    .select("*")
    .eq("status", "active")
    .order("featured", { ascending: false })
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) return [];
  return (data || []) as ReferenceItem[];
}
