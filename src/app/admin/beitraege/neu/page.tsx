import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/ui";
import { AdminGuard } from "../../guard";
import { createPostAction } from "../actions";
import { PostForm } from "../post-form";

export const metadata: Metadata = {
  title: "Beitrag erstellen | Klickhafen Admin",
  robots: { index: false, follow: false },
};

export default async function NewPostPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <AdminGuard>
      <AdminHeader title="Beitrag erstellen" text="Bereite einen neuen Beitragstext vor und speichere ihn für später." />
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">{params.error}</p> : null}
      <PostForm action={createPostAction} />
    </AdminGuard>
  );
}
