import { AdminHeader } from "@/components/admin/ui";
import { DocumentForm } from "@/components/admin/document-form";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../../guard";
import { createInvoiceAction } from "../actions";

export default async function NewInvoicePage() {
  const { data: customers } = await getSupabaseAdmin().from("customers").select("*").order("created_at", { ascending: false });
  return <AdminGuard><AdminHeader title="Rechnung erstellen" text="Kunde auswählen, Position erfassen und Zahlungsziel setzen." /><DocumentForm customers={customers || []} action={createInvoiceAction} type="invoice" /></AdminGuard>;
}
