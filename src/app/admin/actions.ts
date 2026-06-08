"use server";

import { redirect } from "next/navigation";
import { createAdminSession, destroyAdminSession, verifyAdminCredentials } from "@/lib/server/admin-auth";

export async function loginAction(_prevState: { error: string }, formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");

  if (!verifyAdminCredentials(email, password)) {
    return { error: "E-Mail oder Passwort ist falsch." };
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
