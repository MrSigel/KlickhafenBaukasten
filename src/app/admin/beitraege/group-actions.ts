"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { logActivity } from "@/lib/server/activity";
import {
  facebookGroupCategories,
  facebookGroupOwners,
  facebookGroupStatuses,
  normalizeFacebookGroupUrl,
} from "@/lib/facebook-groups";

function adminRedirect(path: string, message: string, type: "success" | "error" = "success") {
  redirect(`${path}?tab=gruppen&${type}=${encodeURIComponent(message)}`);
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}

function readGroupForm(formData: FormData) {
  const name = String(formData.get("name") || "").trim();
  if (!name) throw new Error("Bitte geben Sie einen Gruppennamen ein.");
  const url = normalizeFacebookGroupUrl(String(formData.get("url") || ""));
  const category = String(formData.get("category") || "").trim();
  const accountOwner = String(formData.get("account_owner") || "").trim();
  const status = String(formData.get("status") || "active").trim();

  return {
    name,
    url,
    category: facebookGroupCategories.includes(category) ? category : null,
    account_owner: facebookGroupOwners.includes(accountOwner) ? accountOwner : null,
    status: facebookGroupStatuses.includes(status as (typeof facebookGroupStatuses)[number]) ? status : "active",
    notes: String(formData.get("notes") || "").trim() || null,
  };
}

export async function createFacebookGroupAction(formData: FormData) {
  await requireAdmin();
  try {
    const payload = readGroupForm(formData);
    const { data, error } = await getSupabaseAdmin().from("facebook_groups").insert(payload).select("id, name").single();
    if (error || !data) throw new Error("Die Facebook-Gruppe konnte nicht gespeichert werden.");
    await logActivity({ action: "created", entityType: "facebook_group", entityId: data.id, title: "Facebook-Gruppe erstellt", description: data.name });
    revalidatePath("/admin/beitraege");
    adminRedirect("/admin/beitraege", "Facebook-Gruppe wurde gespeichert.");
  } catch (error) {
    adminRedirect("/admin/beitraege", error instanceof Error ? error.message : "Die Facebook-Gruppe konnte nicht gespeichert werden.", "error");
  }
}

export async function updateFacebookGroupAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) adminRedirect("/admin/beitraege", "Gruppen-ID fehlt.", "error");
  try {
    const payload = readGroupForm(formData);
    const { error } = await getSupabaseAdmin().from("facebook_groups").update(payload).eq("id", id);
    if (error) throw new Error("Die Facebook-Gruppe konnte nicht aktualisiert werden.");
    await logActivity({ action: "updated", entityType: "facebook_group", entityId: id, title: "Facebook-Gruppe aktualisiert", description: payload.name });
    revalidatePath("/admin/beitraege");
    adminRedirect("/admin/beitraege", "Facebook-Gruppe wurde aktualisiert.");
  } catch (error) {
    adminRedirect("/admin/beitraege", error instanceof Error ? error.message : "Die Facebook-Gruppe konnte nicht aktualisiert werden.", "error");
  }
}

export async function archiveFacebookGroupAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) adminRedirect("/admin/beitraege", "Gruppen-ID fehlt.", "error");
  await getSupabaseAdmin().from("facebook_groups").update({ status: "archived" }).eq("id", id);
  await logActivity({ action: "updated", entityType: "facebook_group", entityId: id, title: "Facebook-Gruppe archiviert" });
  revalidatePath("/admin/beitraege");
  adminRedirect("/admin/beitraege", "Facebook-Gruppe wurde archiviert.");
}

export async function deleteFacebookGroupAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) adminRedirect("/admin/beitraege", "Gruppen-ID fehlt.", "error");
  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("facebook_groups").select("name").eq("id", id).single();
  await supabase.from("facebook_groups").delete().eq("id", id);
  await logActivity({ action: "deleted", entityType: "facebook_group", entityId: id, title: "Facebook-Gruppe gelöscht", description: data?.name || null });
  revalidatePath("/admin/beitraege");
  adminRedirect("/admin/beitraege", "Facebook-Gruppe wurde endgültig gelöscht.");
}
