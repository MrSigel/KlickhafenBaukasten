import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { documentPdfFilename, generateDocumentPdf } from "@/lib/server/document-pdf";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  const { id } = await params;
  const supabase = getSupabaseAdmin();
  const [{ data: invoice }, { data: items }, { data: settingsRow }] = await Promise.all([
    supabase.from("invoices").select("*, customers(*)").eq("id", id).single(),
    supabase.from("invoice_items").select("*").eq("invoice_id", id).order("position"),
    supabase.from("settings").select("value").eq("key", "admin_settings").single(),
  ]);

  try {
    const customer = (invoice as any)?.customers;
    const pdf = await generateDocumentPdf({ type: "invoice", document: invoice, items: items || [], customer, settings: (settingsRow?.value || {}) as any });
    const filename = documentPdfFilename("invoice", invoice, customer);
    return new Response(Buffer.from(pdf), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "PDF konnte nicht erstellt werden." }, { status: 400 });
  }
}
