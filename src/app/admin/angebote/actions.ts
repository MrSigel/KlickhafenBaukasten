"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { calculateTotals, euroToCents } from "@/lib/server/money";
import { nextNumber } from "@/lib/server/numbering";
import { logActivity } from "@/lib/server/activity";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function createOfferAction(formData: FormData) {
  const supabase = getSupabaseAdmin();
  const quantity = Number(formData.get("quantity") || 1);
  const unitPrice = Number(formData.get("unit_price") || 29);
  const title = String(formData.get("item_title") || "").trim();
  if (!title || quantity < 0 || unitPrice < 0) return;
  const items = [{ title, description: String(formData.get("item_description") || ""), quantity, unit_price: unitPrice }];
  const discount = Number(formData.get("discount_percent") || 0);
  const vatEnabled = formData.get("vat_enabled") === "on";
  const totals = calculateTotals(items, discount, vatEnabled);
  const offer_number = await nextNumber("offers", "offer_number", "ANG");
  const valid = new Date();
  valid.setDate(valid.getDate() + 7);

  const { data } = await supabase.from("offers").insert({
    customer_id: String(formData.get("customer_id")),
    offer_number,
    status: String(formData.get("status") || "draft"),
    title: String(formData.get("title") || "Angebot"),
    description: String(formData.get("description") || ""),
    valid_until: valid.toISOString().slice(0, 10),
    discount_type: discount > 0 ? "percent" : "none",
    discount_value: discount,
    vat_enabled: vatEnabled,
    ...totals,
    notes: String(formData.get("notes") || ""),
  }).select("id").single();

  if (data) {
    await supabase.from("offer_items").insert({
      offer_id: data.id,
      title,
      description: items[0].description,
      quantity,
      unit_price_cents: euroToCents(unitPrice),
      line_total_cents: euroToCents(quantity * unitPrice),
    });
    await logActivity({
      action: "created",
      entityType: "offer",
      entityId: data.id,
      title: "Angebot erstellt",
      description: offer_number,
      metadata: { offer_number, status: String(formData.get("status") || "draft") },
    });
    redirect(`/admin/angebote/${data.id}`);
  }
}

export async function deleteOfferAction(formData: FormData) {
  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/angebote");

  const supabase = getSupabaseAdmin();
  const { data: offer } = await supabase.from("offers").select("id, offer_number, title").eq("id", id).single();
  await supabase.from("offer_items").delete().eq("offer_id", id);
  await supabase.from("offers").delete().eq("id", id);
  await logActivity({
    action: "deleted",
    entityType: "offer",
    entityId: id,
    title: "Angebot gelöscht",
    description: offer?.offer_number || offer?.title || "Angebot wurde gelöscht.",
    metadata: offer || {},
  });
  revalidatePath("/admin/angebote");
  revalidatePath("/admin/archiv");
  redirect("/admin/angebote?success=Angebot wurde gelöscht.");
}
