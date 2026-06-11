import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminHeader } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import type { AdminPost } from "@/lib/posts";
import { AdminGuard } from "../../guard";
import { archivePostAction, deletePostAction, updatePostAction } from "../actions";
import { ConfirmActionButton } from "../confirm-action-button";
import { CopyDescriptionButton } from "../copy-button";
import { PostForm } from "../post-form";

export const metadata: Metadata = {
  title: "Beitrag bearbeiten | Klickhafen Admin",
  robots: { index: false, follow: false },
};

export default async function EditPostPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const { id } = await params;
  const messages = await searchParams;
  const { data } = await getSupabaseAdmin().from("posts").select("*").eq("id", id).single();
  if (!data) notFound();
  const post = data as AdminPost;

  return (
    <AdminGuard>
      <AdminHeader title="Beitrag bearbeiten" text="Passe Beitragstext, Kategorie, Plattform, Status und Notizen an." />
      {messages.success ? <p className="mb-4 rounded-md bg-emerald-50 p-4 text-emerald-800">{messages.success}</p> : null}
      {messages.error ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">{messages.error}</p> : null}
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        <PostForm post={post} action={updatePostAction} />
        <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Aktionen</h2>
          <div className="mt-4 grid gap-3">
            <CopyDescriptionButton id={post.id} text={post.description} />
            <form action={archivePostAction}>
              <input type="hidden" name="id" value={post.id} />
              <ConfirmActionButton className="w-full rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-60" pendingText="Archivieren ..." message="Diesen Beitrag wirklich archivieren?">
                Archivieren
              </ConfirmActionButton>
            </form>
            <form action={deletePostAction}>
              <input type="hidden" name="id" value={post.id} />
              <ConfirmActionButton className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60" pendingText="Löschen ..." message="Diesen Beitrag endgültig löschen?">
                Endgültig löschen
              </ConfirmActionButton>
            </form>
          </div>
          <dl className="mt-6 space-y-3 text-sm text-slate-600">
            <div>
              <dt className="font-semibold text-slate-800">Kopiert</dt>
              <dd>{post.copy_count || 0}x</dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-800">Zuletzt kopiert</dt>
              <dd>{post.last_copied_at ? new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(post.last_copied_at)) : "Noch nicht kopiert"}</dd>
            </div>
          </dl>
        </aside>
      </div>
    </AdminGuard>
  );
}
