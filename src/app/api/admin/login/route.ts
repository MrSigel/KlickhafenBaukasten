import { NextResponse } from "next/server";
import { setAdminSessionCookie, verifyAdminCredentials } from "@/lib/server/admin-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json({ ok: false, message: "E-Mail oder Passwort ist falsch." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  setAdminSessionCookie(response);
  return response;
}
