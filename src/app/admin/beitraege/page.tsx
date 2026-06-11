import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminHeader, AdminLink } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { archivePostAction, deletePostAction } from "./actions";
import { ConfirmActionButton } from "./confirm-action-button";
import { CopyDescriptionButton } from "./copy-button";
import { type AdminPost, platformLabel, postCategories, postPlatforms, postStatusLabel, postStatuses } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Beiträge verwalten | Klickhafen Admin",
  robots: { index: false, follow: false },
};

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string; platform?: string; status?: string; success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const supabase = getSupabaseAdmin();
  let query = supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (params.q) query = query.or(`title.ilike.%${params.q}%,description.ilike.%${params.q}%`);
  if (params.category) query = query.eq("category", params.category);
  if (params.platform) query = query.eq("platform", params.platform);
  if (params.status) query = query.eq("status", params.status);
  const { data, error } = await query;
  const posts = (data || []) as AdminPost[];

  return (
    <AdminGuard>
      <AdminHeader
        title="Beiträge"
        text="Verwalte vorbereitete Beitragstexte für Facebook-Gruppen und andere Plattformen."
        action={<AdminLink href="/admin/beitraege/neu"><Plus className="mr-2 size-4" /> Neu</AdminLink>}
      />
      {params.success ? <p className="mb-4 rounded-md bg-emerald-50 p-4 text-emerald-800">{params.success}</p> : null}
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">{params.error}</p> : null}
      {error ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">Beiträge konnten nicht geladen werden.</p> : null}

      <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_180px_180px_160px_auto]">
        <input name="q" placeholder="Suche nach Titel oder Beschreibung" defaultValue={params.q || ""} className="rounded-md border border-slate-300 px-3 py-2" />
        <select name="category" defaultValue={params.category || ""} className="rounded-md border border-slate-300 px-3 py-2">
          <option value="">Alle Kategorien</option>
          {postCategories.map((category) => <option key={category} value={category}>{category}</option>)}
        </select>
        <select name="platform" defaultValue={params.platform || ""} className="rounded-md border border-slate-300 px-3 py-2">
          <option value="">Alle Plattformen</option>
          {postPlatforms.map((platform) => <option key={platform.value} value={platform.value}>{platform.label}</option>)}
        </select>
        <select name="status" defaultValue={params.status || ""} className="rounded-md border border-slate-300 px-3 py-2">
          <option value="">Alle Status</option>
          {postStatuses.map((status) => <option key={status} value={status}>{postStatusLabel(status)}</option>)}
        </select>
        <button className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Filtern</button>
      </form>

      <div className="mt-6 space-y-4">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
        {!posts.length ? (
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Noch keine Beiträge gespeichert</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-650">
              Erstelle deinen ersten Beitrag, um ihn später mit einem Klick für Facebook oder andere Plattformen zu kopieren.
            </p>
            <div className="mt-6">
              <AdminLink href="/admin/beitraege/neu">+ Beitrag erstellen</AdminLink>
            </div>
          </div>
        ) : null}
      </div>
    </AdminGuard>
  );
}

function PostCard({ post }: { post: AdminPost }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">{postStatusLabel(post.status)}</span>
            {post.category ? <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{post.category}</span> : null}
            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">{platformLabel(post.platform)}</span>
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-950">{post.title}</h2>
          <p className="mt-3 line-clamp-3 whitespace-pre-line leading-7 text-slate-650">{post.description}</p>
          <p className="mt-3 text-sm text-slate-500">
            {post.copy_count || 0}x kopiert
            {post.last_copied_at ? ` · zuletzt ${new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(post.last_copied_at))}` : ""}
          </p>
        </div>
        <div className="grid shrink-0 gap-3 sm:grid-cols-2 xl:w-80 xl:grid-cols-1">
          <CopyDescriptionButton id={post.id} text={post.description} />
          <Link href={`/admin/beitraege/${post.id}`} className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">Bearbeiten</Link>
          <form action={archivePostAction}>
            <input type="hidden" name="id" value={post.id} />
            <ConfirmActionButton className="w-full rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-60" pendingText="Archivieren ..." message="Diesen Beitrag wirklich archivieren?">Archivieren</ConfirmActionButton>
          </form>
          <form action={deletePostAction}>
            <input type="hidden" name="id" value={post.id} />
            <ConfirmActionButton className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60" pendingText="Löschen ..." message="Diesen Beitrag endgültig löschen?">Endgültig löschen</ConfirmActionButton>
          </form>
        </div>
      </div>
    </article>
  );
}
