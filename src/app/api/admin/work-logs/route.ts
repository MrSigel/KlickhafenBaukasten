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
  if (!groupId) return NextResponse.json({ error: "Gruppen-ID fehlt." }, { status: 400 });

  const { error } = await getSupabaseAdmin().from("work_logs").insert({
    group_id: groupId,
    post_id: postId,
    action: "posted",
    worked_at: new Date().toISOString(),
  });

  if (error) return NextResponse.json({ error: "Erledigt-Markierung konnte nicht gespeichert werden." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
