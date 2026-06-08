import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ ok: false, message: "Nicht autorisiert" }, { status: 401 });
  }

  try {
    await getSupabaseAdmin().from("inquiries").select("id", { count: "exact", head: true });
    return NextResponse.json({
      ok: true,
      message: "Supabase keep-alive erfolgreich",
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Supabase keep-alive fehlgeschlagen" }, { status: 500 });
  }
}
