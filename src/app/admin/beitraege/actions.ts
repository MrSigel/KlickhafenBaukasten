"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { logActivity } from "@/lib/server/activity";
import { postCategories, postPlatforms, postStatuses } from "@/lib/posts";

function adminRedirect(path: string, message: string, type: "success" | "error" = "success") {
  redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}

function readPostForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  const description = String(formData.get("description") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const platform = String(formData.get("platform") || "facebook").trim();
  const status = String(formData.get("status") || "active").trim();

  if (!title) throw new Error("Bitte geben Sie einen Titel ein.");
  if (!description) throw new Error("Bitte geben Sie eine Beschreibung ein.");
  if (description.length > 5000) throw new Error("Die Beschreibung darf maximal 5000 Zeichen lang sein.");

  return {
    title,
    description,
    category: postCategories.includes(category) ? category : null,
    platform: postPlatforms.some((item) => item.value === platform) ? platform : "facebook",
    status: postStatuses.includes(status as (typeof postStatuses)[number]) ? status : "active",
    notes: String(formData.get("notes") || "").trim() || null,
  };
}

export async function createPostAction(formData: FormData) {
  await requireAdmin();
  try {
    const payload = readPostForm(formData);
    const { data, error } = await getSupabaseAdmin().from("posts").insert(payload).select("id, title").single();
    if (error || !data) throw new Error("Der Beitrag konnte nicht gespeichert werden.");

    await logActivity({ action: "created", entityType: "post", entityId: data.id, title: "Beitrag erstellt", description: data.title });
    revalidatePath("/admin/beitraege");
    adminRedirect(`/admin/beitraege/${data.id}`, "Beitrag wurde gespeichert.");
  } catch (error) {
    adminRedirect("/admin/beitraege/neu", error instanceof Error ? error.message : "Der Beitrag konnte nicht gespeichert werden.", "error");
  }
}

export async function updatePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) adminRedirect("/admin/beitraege", "Beitrag-ID fehlt.", "error");

  try {
    const payload = readPostForm(formData);
    const { error } = await getSupabaseAdmin().from("posts").update(payload).eq("id", id);
    if (error) throw new Error("Der Beitrag konnte nicht aktualisiert werden.");

    await logActivity({ action: "updated", entityType: "post", entityId: id, title: "Beitrag aktualisiert", description: payload.title });
    revalidatePath("/admin/beitraege");
    revalidatePath(`/admin/beitraege/${id}`);
    adminRedirect(`/admin/beitraege/${id}`, "Beitrag wurde aktualisiert.");
  } catch (error) {
    adminRedirect(`/admin/beitraege/${id}`, error instanceof Error ? error.message : "Der Beitrag konnte nicht aktualisiert werden.", "error");
  }
}

export async function archivePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) adminRedirect("/admin/beitraege", "Beitrag-ID fehlt.", "error");

  await getSupabaseAdmin().from("posts").update({ status: "archived" }).eq("id", id);
  await logActivity({ action: "updated", entityType: "post", entityId: id, title: "Beitrag archiviert" });
  revalidatePath("/admin/beitraege");
  revalidatePath(`/admin/beitraege/${id}`);
  adminRedirect("/admin/beitraege", "Beitrag wurde archiviert.");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) adminRedirect("/admin/beitraege", "Beitrag-ID fehlt.", "error");

  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("posts").select("title").eq("id", id).single();
  await supabase.from("posts").delete().eq("id", id);
  await logActivity({ action: "deleted", entityType: "post", entityId: id, title: "Beitrag gelöscht", description: data?.title || null });
  revalidatePath("/admin/beitraege");
  adminRedirect("/admin/beitraege", "Beitrag wurde endgültig gelöscht.");
}
