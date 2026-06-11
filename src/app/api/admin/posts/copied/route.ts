import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Nicht angemeldet." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "Beitrag-ID fehlt." }, { status: 400 });

  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("posts").select("copy_count").eq("id", id).single();
  const nextCount = Number(data?.copy_count || 0) + 1;
  const { error } = await supabase
    .from("posts")
    .update({ copy_count: nextCount, last_copied_at: new Date().toISOString() })
    .eq("id", id);

  if (error) return NextResponse.json({ error: "Kopiervorgang konnte nicht gespeichert werden." }, { status: 500 });
  return NextResponse.json({ ok: true, copy_count: nextCount });
}
