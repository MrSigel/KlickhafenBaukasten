import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const isVercelCron = request.headers.get("x-vercel-cron") === "1";

  if (!isVercelCron && (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
    const { error: insertError } = await supabase.from("keepalive_logs").insert({ source: isVercelCron ? "vercel-cron" : "manual" });
    if (insertError) throw insertError;
    const { error: deleteError } = await supabase.from("keepalive_logs").delete().lt("created_at", cutoff);
    if (deleteError) throw deleteError;
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Keepalive failed" }, { status: 500 });
  }
}
