import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { AdminShell } from "./admin-shell";

export async function AdminGuard({ children }: { children: React.ReactNode }) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
  return <AdminShell>{children}</AdminShell>;
}
