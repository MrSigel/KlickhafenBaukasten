import { AdminHeader } from "@/components/admin/ui";
import { DocumentForm } from "@/components/admin/document-form";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../../guard";
import { createOfferAction } from "../actions";

export default async function NewOfferPage() {
  const { data: customers } = await getSupabaseAdmin().from("customers").select("*").order("created_at", { ascending: false });
  return <AdminGuard><AdminHeader title="Angebot erstellen" text="Kunde auswählen, Position erfassen und Summen automatisch berechnen." /><DocumentForm customers={customers || []} action={createOfferAction} type="offer" /></AdminGuard>;
}
