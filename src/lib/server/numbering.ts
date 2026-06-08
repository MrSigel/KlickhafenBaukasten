import { getSupabaseAdmin } from "./supabase";

export async function nextNumber(table: "offers" | "invoices", column: "offer_number" | "invoice_number", prefix: "ANG" | "RE") {
  const year = new Date().getFullYear();
  const supabase = getSupabaseAdmin();
  const { count } = await supabase
    .from(table)
    .select("id", { count: "exact", head: true })
    .like(column, `${prefix}-${year}-%`);

  return `${prefix}-${year}-${String((count || 0) + 1).padStart(4, "0")}`;
}
