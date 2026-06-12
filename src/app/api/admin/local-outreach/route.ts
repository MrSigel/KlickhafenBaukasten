import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";

type LocalCustomer = {
  id: string;
  company: string | null;
  email: string;
  created_at: string;
  last_local_email_at?: string | null;
  local_email_count?: number | null;
  local_outreach_status?: string | null;
};

const lockHours = 48;
const excludedStatuses = new Set(["not_interested", "customer", "archived"]);

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cutoffDate() {
  return new Date(Date.now() - lockHours * 60 * 60 * 1000);
}

function isAvailable(customer: LocalCustomer, cutoff: Date) {
  if (!isValidEmail(customer.email || "")) return false;
  if (excludedStatuses.has(customer.local_outreach_status || "")) return false;
  if (!customer.last_local_email_at) return true;
  return new Date(customer.last_local_email_at).getTime() < cutoff.getTime();
}

function sortCustomers(a: LocalCustomer, b: LocalCustomer) {
  const aLast = a.last_local_email_at ? new Date(a.last_local_email_at).getTime() : 0;
  const bLast = b.last_local_email_at ? new Date(b.last_local_email_at).getTime() : 0;
  if (!aLast && bLast) return -1;
  if (aLast && !bLast) return 1;
  if (aLast !== bLast) return aLast - bLast;
  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
}

async function getNextCustomer() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("customers")
    .select("id, company, email, created_at, last_local_email_at, local_email_count, local_outreach_status")
    .eq("status", "active")
    .not("email", "is", null)
    .order("last_local_email_at", { ascending: true, nullsFirst: true })
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) return null;
  const cutoff = cutoffDate();
  return ((data || []) as LocalCustomer[]).filter((customer) => isAvailable(customer, cutoff)).sort(sortCustomers)[0] || null;
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  return NextResponse.json({ customer: await getNextCustomer() });
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const customerId = typeof body?.customerId === "string" ? body.customerId : "";
  if (!customerId) return NextResponse.json({ error: "Kunden-ID fehlt." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data: customer, error: customerError } = await supabase
    .from("customers")
    .select("id, email, local_email_count, local_outreach_status")
    .eq("id", customerId)
    .single();

  if (customerError || !customer?.email || !isValidEmail(customer.email)) {
    return NextResponse.json({ error: "Kunde konnte nicht geladen werden." }, { status: 404 });
  }

  const now = new Date().toISOString();
  const { error: logError } = await supabase.from("local_outreach_logs").insert({
    customer_id: customer.id,
    email: customer.email,
    action: "email_address_used",
    worked_at: now,
  });

  if (logError) return NextResponse.json({ error: "Lokale Arbeit konnte nicht protokolliert werden." }, { status: 500 });

  const nextStatus = customer.local_outreach_status === "open" || !customer.local_outreach_status ? "contacted" : customer.local_outreach_status;
  const { error: updateError } = await supabase
    .from("customers")
    .update({
      last_local_email_at: now,
      local_email_count: Number(customer.local_email_count || 0) + 1,
      local_outreach_status: nextStatus,
    })
    .eq("id", customer.id);

  if (updateError) return NextResponse.json({ error: "Kunde konnte nicht aktualisiert werden." }, { status: 500 });

  return NextResponse.json({ ok: true, customer: await getNextCustomer() });
}
