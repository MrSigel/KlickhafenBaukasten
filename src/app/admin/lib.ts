import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logActivity } from "@/lib/server/activity";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function updateInquiryAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const admin_notes = String(formData.get("admin_notes") || "");
  await getSupabaseAdmin().from("inquiries").update({ status, admin_notes }).eq("id", id);
  await logActivity({
    action: "updated",
    entityType: "inquiry",
    entityId: id,
    title: "Anfrage aktualisiert",
    description: `Status wurde auf ${status} gesetzt.`,
    metadata: { status, has_admin_notes: Boolean(admin_notes) },
  });
  revalidatePath("/admin/anfragen");
  revalidatePath("/admin/archiv");
}

export async function deleteInquiryAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id"));
  const supabase = getSupabaseAdmin();
  const { data: inquiry } = await supabase
    .from("inquiries")
    .select("id, first_name, last_name, email, company, website_url, status")
    .eq("id", id)
    .single();

  await supabase.from("inquiries").delete().eq("id", id);
  await logActivity({
    action: "deleted",
    entityType: "inquiry",
    entityId: id,
    title: "Anfrage gelöscht",
    description: inquiry ? `${inquiry.first_name || ""} ${inquiry.last_name || ""} (${inquiry.email || "ohne E-Mail"})` : "Eine Anfrage wurde gelöscht.",
    metadata: inquiry || {},
  });
  revalidatePath("/admin/anfragen");
  revalidatePath("/admin/archiv");
}

export async function createCustomerAction(formData: FormData) {
  "use server";
  const supabase = getSupabaseAdmin();
  const receivedAmountCents = parseEuroToCents(formData.get("received_amount"));
  const { data } = await supabase.from("customers").insert({
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
    received_amount_cents: receivedAmountCents,
    status: "active",
  }).select("id, email, company").single();
  if (data) {
    await logActivity({
      action: "created",
      entityType: "customer",
      entityId: data.id,
      title: "Kunde erstellt",
      description: data.company || data.email || "Neuer Kunde",
      metadata: { email: data.email, company: data.company },
    });
  }
  revalidatePath("/admin/kunden");
  revalidatePath("/admin/archiv");
}

export async function updateCustomerReceivedAmountAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  const receivedAmountCents = parseEuroToCents(formData.get("received_amount"));
  if (!id) return;

  const supabase = getSupabaseAdmin();
  const { data: customer } = await supabase
    .from("customers")
    .select("id, email, company, first_name, last_name")
    .eq("id", id)
    .single();

  await supabase.from("customers").update({ received_amount_cents: receivedAmountCents }).eq("id", id);
  await logActivity({
    action: "updated",
    entityType: "customer",
    entityId: id,
    title: "Erhaltenen Betrag aktualisiert",
    description: customer?.company || customer?.email || "Kunde",
    metadata: { received_amount_cents: receivedAmountCents },
  });
  revalidatePath("/admin/kunden");
  revalidatePath(`/admin/kunden/${id}`);
  revalidatePath("/admin/archiv");
}

export async function deleteCustomerAction(formData: FormData) {
  "use server";
  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/kunden?error=Kunden-ID fehlt.");

  const supabase = getSupabaseAdmin();
  const [{ count: offersCount }, { count: invoicesCount }, { data: customer }] = await Promise.all([
    supabase.from("offers").select("id", { count: "exact", head: true }).eq("customer_id", id),
    supabase.from("invoices").select("id", { count: "exact", head: true }).eq("customer_id", id),
    supabase.from("customers").select("id, email, company, first_name, last_name").eq("id", id).single(),
  ]);

  if ((offersCount || 0) > 0 || (invoicesCount || 0) > 0) {
    redirect(`/admin/kunden/${id}?error=${encodeURIComponent("Kunde kann nicht gelöscht werden, solange Angebote oder Rechnungen vorhanden sind.")}`);
  }

  await supabase.from("customers").delete().eq("id", id);
  await logActivity({
    action: "deleted",
    entityType: "customer",
    entityId: id,
    title: "Kunde gelöscht",
    description: customer?.company || customer?.email || "Kunde wurde gelöscht.",
    metadata: customer || {},
  });
  revalidatePath("/admin/kunden");
  revalidatePath("/admin/archiv");
  redirect("/admin/kunden?success=Kunde wurde gelöscht.");
}

function parseEuroToCents(value: FormDataEntryValue | null) {
  const normalized = String(value || "0")
    .replace(/\./g, "")
    .replace(",", ".")
    .replace(/[^\d.]/g, "");
  return Math.max(0, Math.round(Number(normalized || 0) * 100));
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
    owner_name: String(formData.get("owner_name") || "Enrico Gross"),
    street: String(formData.get("street") || ""),
    postal_code: String(formData.get("postal_code") || ""),
    city: String(formData.get("city") || ""),
    country: String(formData.get("country") || "Deutschland"),
    email: String(formData.get("email") || "hallo@klickhafen.net"),
    phone: String(formData.get("phone") || ""),
    website: String(formData.get("website") || "klickhafen.net"),
    tax_number: String(formData.get("tax_number") || ""),
    vat_id: String(formData.get("vat_id") || ""),
    small_business_enabled: formData.get("small_business_enabled") === "on",
    bank_account_holder: String(formData.get("bank_account_holder") || ""),
    bank_iban: String(formData.get("bank_iban") || ""),
    bank_bic: String(formData.get("bank_bic") || ""),
    bank_name: String(formData.get("bank_name") || ""),
    address: String(formData.get("address") || ""),
    payment_methods: String(formData.get("payment_methods") || "PayPal, Überweisung, Crypto nach Absprache"),
  };

  await getSupabaseAdmin()
    .from("settings")
    .upsert({ key: "admin_settings", value, description: "Admin Dashboard Einstellungen", is_secret: false }, { onConflict: "key" });
  await logActivity({
    action: "updated",
    entityType: "settings",
    title: "Einstellungen aktualisiert",
    description: "Admin-Einstellungen wurden gespeichert.",
    metadata: { hourly_rate_cents: value.hourly_rate_cents, vat_enabled: value.vat_enabled },
  });
  revalidatePath("/admin/einstellungen");
  revalidatePath("/admin/archiv");
}
