"use server";

import { redirect } from "next/navigation";
import { calculateTotals, euroToCents } from "@/lib/server/money";
import { nextNumber } from "@/lib/server/numbering";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function createInvoiceAction(formData: FormData) {
  const supabase = getSupabaseAdmin();
  const quantity = Number(formData.get("quantity") || 1);
  const unitPrice = Number(formData.get("unit_price") || 29);
  const title = String(formData.get("item_title") || "").trim();
  if (!title || quantity < 0 || unitPrice < 0) return;
  const items = [{ title, description: String(formData.get("item_description") || ""), quantity, unit_price: unitPrice }];
  const discount = Number(formData.get("discount_percent") || 0);
  const vatEnabled = formData.get("vat_enabled") === "on";
  const totals = calculateTotals(items, discount, vatEnabled);
  const invoice_number = await nextNumber("invoices", "invoice_number", "RE");

  const { data } = await supabase.from("invoices").insert({
    customer_id: String(formData.get("customer_id")),
    invoice_number,
    status: String(formData.get("status") || "sent"),
    title: String(formData.get("title") || "Rechnung"),
    due_date: String(formData.get("due_date") || "") || null,
    discount_type: discount > 0 ? "percent" : "none",
    discount_value: discount,
    vat_enabled: vatEnabled,
    ...totals,
    notes: String(formData.get("notes") || ""),
  }).select("id").single();

  if (data) {
    await supabase.from("invoice_items").insert({
      invoice_id: data.id,
      title,
      description: items[0].description,
      quantity,
      unit_price_cents: euroToCents(unitPrice),
      line_total_cents: euroToCents(quantity * unitPrice),
    });
    redirect(`/admin/rechnungen/${data.id}`);
  }
}
