import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { LoginForm } from "./login-form";

export default async function AdminLoginPage() {
  if (await isAdminAuthenticated()) redirect("/admin");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-16">
      <div className="mx-auto max-w-md rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Klickhafen Admin</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">Admin Login</h1>
        <p className="mt-3 leading-7 text-slate-650">Melden Sie sich mit den hinterlegten Admin-Zugangsdaten an.</p>
        <LoginForm />
      </div>
    </main>
  );
}
