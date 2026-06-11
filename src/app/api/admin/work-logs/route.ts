import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const groupId = typeof body?.groupId === "string" ? body.groupId : "";
  const postId = typeof body?.postId === "string" ? body.postId : null;
  const alreadyOpened = Boolean(body?.alreadyOpened);
  if (!groupId) return NextResponse.json({ error: "Gruppen-ID fehlt." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const now = new Date().toISOString();
  const { error } = await supabase.from("work_logs").insert({
    group_id: groupId,
    post_id: postId,
    action: "posted",
    worked_at: now,
  });

  if (error) return NextResponse.json({ error: "Erledigt-Markierung konnte nicht gespeichert werden." }, { status: 500 });
  if (!alreadyOpened) {
    const { data: group } = await supabase.from("facebook_groups").select("open_count").eq("id", groupId).single();
    await supabase
      .from("facebook_groups")
      .update({ open_count: Number(group?.open_count || 0) + 1, last_opened_at: now })
      .eq("id", groupId);
  }
  if (postId) {
    const { data: post } = await supabase.from("posts").select("copy_count").eq("id", postId).single();
    await supabase
      .from("posts")
      .update({ copy_count: Number(post?.copy_count || 0) + 1, last_copied_at: now })
      .eq("id", postId);
  }
  return NextResponse.json({ ok: true });
}
