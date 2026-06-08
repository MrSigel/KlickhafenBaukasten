import { revalidatePath } from "next/cache";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function updateInquiryAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const admin_notes = String(formData.get("admin_notes") || "");
  await getSupabaseAdmin().from("inquiries").update({ status, admin_notes }).eq("id", id);
  revalidatePath("/admin/anfragen");
}

export async function createCustomerAction(formData: FormData) {
  "use server";
  await getSupabaseAdmin().from("customers").insert({
    type: String(formData.get("type") || "business"),
    first_name: String(formData.get("first_name") || ""),
    last_name: String(formData.get("last_name") || ""),
    company: String(formData.get("company") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    website_url: String(formData.get("website_url") || ""),
    street: String(formData.get("street") || ""),
    postal_code: String(formData.get("postal_code") || ""),
    city: String(formData.get("city") || ""),
    country: String(formData.get("country") || "Deutschland"),
    notes: String(formData.get("notes") || ""),
    status: "active",
  });
  revalidatePath("/admin/kunden");
}

export async function updateSettingsAction(formData: FormData) {
  "use server";
  const value = {
    hourly_rate_cents: Math.round(Number(formData.get("hourly_rate") || 29) * 100),
    vat_rate: Number(formData.get("vat_rate") || 19),
    vat_enabled: formData.get("vat_enabled") === "on",
    default_due_days: Number(formData.get("default_due_days") || 14),
    default_offer_valid_days: Number(formData.get("default_offer_valid_days") || 7),
    company_name: String(formData.get("company_name") || "Klickhafen"),
    email: String(formData.get("email") || "hallo@klickhafen.net"),
    website: String(formData.get("website") || "klickhafen.net"),
    address: String(formData.get("address") || ""),
    payment_methods: String(formData.get("payment_methods") || "PayPal, Überweisung, Crypto nach Absprache"),
  };

  await getSupabaseAdmin()
    .from("settings")
    .upsert({ key: "admin_settings", value, description: "Admin Dashboard Einstellungen", is_secret: false }, { onConflict: "key" });
  revalidatePath("/admin/einstellungen");
}
