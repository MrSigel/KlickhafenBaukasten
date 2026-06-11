import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  const postId = typeof body?.postId === "string" ? body.postId : null;
  if (!id) return NextResponse.json({ error: "Gruppen-ID fehlt." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("facebook_groups").select("open_count").eq("id", id).single();
  const nextCount = Number(data?.open_count || 0) + 1;
  const { error } = await supabase
    .from("facebook_groups")
    .update({ open_count: nextCount, last_opened_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Öffnung konnte nicht gespeichert werden." }, { status: 500 });
  await supabase.from("work_logs").insert({
    group_id: id,
    post_id: postId,
    action: "opened",
    worked_at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true, open_count: nextCount });
}
