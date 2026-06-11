import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { AdminHeader, AdminLink } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { archivePostAction, deletePostAction } from "./actions";
import { archiveFacebookGroupAction, createFacebookGroupAction, deleteFacebookGroupAction, updateFacebookGroupAction } from "./group-actions";
import { ConfirmActionButton } from "./confirm-action-button";
import { CopyDescriptionButton } from "./copy-button";
import { OpenGroupButton } from "./open-group-button";
import { type AdminPost, platformLabel, postCategories, postPlatforms, postStatusLabel, postStatuses } from "@/lib/posts";
import {
  type FacebookGroup,
  facebookGroupCategories,
  facebookGroupOwners,
  facebookGroupStatusLabel,
  facebookGroupStatuses,
  shortUrl,
} from "@/lib/facebook-groups";

export const metadata: Metadata = {
  title: "Beiträge verwalten | Klickhafen Admin",
  robots: { index: false, follow: false },
};

type Search = {
  tab?: string;
  q?: string;
  category?: string;
  platform?: string;
  status?: string;
  owner?: string;
  success?: string;
  error?: string;
};

export default async function AdminPostsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const params = await searchParams;
  const activeTab = params.tab === "gruppen" ? "gruppen" : "beitraege";
  const supabase = getSupabaseAdmin();

  let postsQuery = supabase.from("posts").select("*").order("created_at", { ascending: false });
  if (activeTab === "beitraege") {
    if (params.q) postsQuery = postsQuery.or(`title.ilike.%${params.q}%,description.ilike.%${params.q}%`);
    if (params.category) postsQuery = postsQuery.eq("category", params.category);
    if (params.platform) postsQuery = postsQuery.eq("platform", params.platform);
    if (params.status) postsQuery = postsQuery.eq("status", params.status);
  }

  let groupsQuery = supabase
    .from("facebook_groups")
    .select("*")
    .order("status", { ascending: true })
    .order("category", { ascending: true })
    .order("last_opened_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  if (activeTab === "gruppen") {
    if (params.q) groupsQuery = groupsQuery.or(`name.ilike.%${params.q}%,url.ilike.%${params.q}%,notes.ilike.%${params.q}%`);
    if (params.category) groupsQuery = groupsQuery.eq("category", params.category);
    if (params.owner) groupsQuery = groupsQuery.eq("account_owner", params.owner);
    if (params.status) groupsQuery = groupsQuery.eq("status", params.status);
  }

  const [{ data: postsData, error: postsError }, { data: groupsData, error: groupsError }] = await Promise.all([postsQuery, groupsQuery]);
  const posts = (postsData || []) as AdminPost[];
  const groups = (groupsData || []) as FacebookGroup[];

  return (
    <AdminGuard>
      <AdminHeader
        title="Beiträge"
        text="Verwalte vorbereitete Beitragstexte und Facebook-Gruppen für deine Postings."
        action={activeTab === "beitraege" ? <AdminLink href="/admin/beitraege/neu"><Plus className="mr-2 size-4" /> Neu</AdminLink> : null}
      />
      {params.success ? <p className="mb-4 rounded-md bg-emerald-50 p-4 text-emerald-800">{params.success}</p> : null}
      {params.error ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">{params.error}</p> : null}
      {postsError || groupsError ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">Daten konnten nicht geladen werden.</p> : null}

      <div className="mb-6 flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm sm:flex-row">
        <TabLink href="/admin/beitraege" active={activeTab === "beitraege"}>Beiträge</TabLink>
        <TabLink href="/admin/beitraege?tab=gruppen" active={activeTab === "gruppen"}>Facebook-Gruppen</TabLink>
      </div>

      {activeTab === "gruppen" ? <GroupsTab params={params} groups={groups} /> : <PostsTab params={params} posts={posts} />}
    </AdminGuard>
  );
}

function TabLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} className={`inline-flex min-h-11 flex-1 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition ${active ? "bg-cyan-700 text-white" : "text-slate-700 hover:bg-slate-100 hover:text-slate-950"}`}>
      {children}
    </Link>
  );
}

function PostsTab({ params, posts }: { params: Search; posts: AdminPost[] }) {
  return (
    <>
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
        {!posts.length ? <EmptyPosts /> : null}
      </div>
    </>
  );
}

function GroupsTab({ params, groups }: { params: Search; groups: FacebookGroup[] }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-slate-950">Facebook-Gruppen</h2>
          <p className="mt-2 text-slate-650">Speichere Facebook-Gruppen, damit du sie später mit einem Klick öffnen und dort Beiträge posten kannst.</p>
        </div>
        <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_180px_170px_150px_auto]">
          <input type="hidden" name="tab" value="gruppen" />
          <input name="q" placeholder="Suche nach Name, URL oder Notizen" defaultValue={params.q || ""} className="rounded-md border border-slate-300 px-3 py-2" />
          <select name="category" defaultValue={params.category || ""} className="rounded-md border border-slate-300 px-3 py-2">
            <option value="">Alle Kategorien</option>
            {facebookGroupCategories.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
          <select name="owner" defaultValue={params.owner || ""} className="rounded-md border border-slate-300 px-3 py-2">
            <option value="">Alle Accounts</option>
            {facebookGroupOwners.map((owner) => <option key={owner} value={owner}>{owner}</option>)}
          </select>
          <select name="status" defaultValue={params.status || ""} className="rounded-md border border-slate-300 px-3 py-2">
            <option value="">Alle Status</option>
            {facebookGroupStatuses.map((status) => <option key={status} value={status}>{facebookGroupStatusLabel(status)}</option>)}
          </select>
          <button className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white">Filtern</button>
        </form>
        <div className="mt-6 space-y-4">
          {groups.map((group) => <GroupCard key={group.id} group={group} />)}
          {!groups.length ? <EmptyGroups /> : null}
        </div>
      </div>
      <form action={createFacebookGroupAction} className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-950">+ Neu</h2>
        <GroupFields />
        <button className="mt-5 w-full rounded-md bg-cyan-700 px-4 py-3 text-sm font-semibold text-white hover:bg-cyan-800">Speichern</button>
      </form>
    </div>
  );
}

function PostCard({ post }: { post: AdminPost }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{postStatusLabel(post.status)}</Badge>
            {post.category ? <Badge>{post.category}</Badge> : null}
            <Badge>{platformLabel(post.platform)}</Badge>
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-950">{post.title}</h2>
          <p className="mt-3 line-clamp-3 whitespace-pre-line leading-7 text-slate-650">{post.description}</p>
          <p className="mt-3 text-sm text-slate-500">{post.copy_count || 0}x kopiert{post.last_copied_at ? ` · zuletzt ${formatDateTime(post.last_copied_at)}` : ""}</p>
        </div>
        <div className="grid shrink-0 gap-3 sm:grid-cols-2 xl:w-80 xl:grid-cols-1">
          <CopyDescriptionButton id={post.id} text={post.description} />
          <Link href={`/admin/beitraege/${post.id}`} className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">Bearbeiten</Link>
          <form action={archivePostAction}><input type="hidden" name="id" value={post.id} /><ConfirmActionButton className="w-full rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-60" pendingText="Archivieren ..." message="Diesen Beitrag wirklich archivieren?">Archivieren</ConfirmActionButton></form>
          <form action={deletePostAction}><input type="hidden" name="id" value={post.id} /><ConfirmActionButton className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60" pendingText="Löschen ..." message="Diesen Beitrag endgültig löschen?">Endgültig löschen</ConfirmActionButton></form>
        </div>
      </div>
    </article>
  );
}

function GroupCard({ group }: { group: FacebookGroup }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{facebookGroupStatusLabel(group.status)}</Badge>
            {group.category ? <Badge>{group.category}</Badge> : null}
            {group.account_owner ? <Badge>{group.account_owner}</Badge> : null}
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-950">{group.name}</h2>
          <p className="mt-2 break-all text-sm font-semibold text-cyan-800">{shortUrl(group.url)}</p>
          {group.notes ? <p className="mt-3 line-clamp-2 whitespace-pre-line leading-7 text-slate-650">{group.notes}</p> : null}
          <p className="mt-3 text-sm text-slate-500">{group.open_count || 0} Öffnungen{group.last_opened_at ? ` · zuletzt ${formatDateTime(group.last_opened_at)}` : ""}</p>
        </div>
        <div className="grid shrink-0 gap-3 sm:grid-cols-2 xl:w-80 xl:grid-cols-1">
          <OpenGroupButton id={group.id} url={group.url} />
          <details className="rounded-md bg-slate-50 p-3 sm:col-span-2 xl:col-span-1">
            <summary className="cursor-pointer text-center text-sm font-semibold text-slate-800">Bearbeiten</summary>
            <form action={updateFacebookGroupAction} className="mt-4">
              <input type="hidden" name="id" value={group.id} />
              <GroupFields group={group} />
              <button className="mt-4 w-full rounded-md bg-cyan-700 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-800">Speichern</button>
            </form>
          </details>
          <form action={archiveFacebookGroupAction}><input type="hidden" name="id" value={group.id} /><ConfirmActionButton className="w-full rounded-md border border-amber-200 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-60" pendingText="Archivieren ..." message="Diese Facebook-Gruppe wirklich archivieren?">Archivieren</ConfirmActionButton></form>
          <form action={deleteFacebookGroupAction}><input type="hidden" name="id" value={group.id} /><ConfirmActionButton className="w-full rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60" pendingText="Löschen ..." message="Diese Facebook-Gruppe endgültig löschen?">Endgültig löschen</ConfirmActionButton></form>
        </div>
      </div>
    </article>
  );
}

function GroupFields({ group }: { group?: FacebookGroup }) {
  return (
    <div className="mt-4 grid gap-3">
      <label className="text-sm font-semibold text-slate-800">Gruppenname<input name="name" required defaultValue={group?.name || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
      <label className="text-sm font-semibold text-slate-800">Facebook-Gruppen-Link<input name="url" required type="url" defaultValue={group?.url || ""} placeholder="https://facebook.com/groups/..." className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">Kategorie<select name="category" defaultValue={group?.category || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Keine Kategorie</option>{facebookGroupCategories.map((category) => <option key={category} value={category}>{category}</option>)}</select></label>
        <label className="text-sm font-semibold text-slate-800">Account / Person<select name="account_owner" defaultValue={group?.account_owner || ""} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2"><option value="">Nicht festgelegt</option>{facebookGroupOwners.map((owner) => <option key={owner} value={owner}>{owner}</option>)}</select></label>
      </div>
      <label className="text-sm font-semibold text-slate-800">Status<select name="status" defaultValue={group?.status || "active"} className="mt-2 w-full rounded-md border border-slate-300 px-3 py-2">{facebookGroupStatuses.map((status) => <option key={status} value={status}>{facebookGroupStatusLabel(status)}</option>)}</select></label>
      <label className="text-sm font-semibold text-slate-800">Notizen<textarea name="notes" defaultValue={group?.notes || ""} className="mt-2 min-h-24 w-full rounded-md border border-slate-300 px-3 py-2" /></label>
    </div>
  );
}

function EmptyPosts() {
  return <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-xl font-semibold text-slate-950">Noch keine Beiträge gespeichert</h2><p className="mt-3 max-w-2xl leading-7 text-slate-650">Erstelle deinen ersten Beitrag, um ihn später mit einem Klick für Facebook oder andere Plattformen zu kopieren.</p><div className="mt-6"><AdminLink href="/admin/beitraege/neu">+ Beitrag erstellen</AdminLink></div></div>;
}

function EmptyGroups() {
  return <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm"><h2 className="text-xl font-semibold text-slate-950">Noch keine Facebook-Gruppen gespeichert</h2><p className="mt-3 max-w-2xl leading-7 text-slate-650">Speichere deine wichtigsten Facebook-Gruppen, um sie später mit einem Klick zu öffnen.</p></div>;
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "cyan" }) {
  return <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${tone === "cyan" ? "bg-cyan-50 text-cyan-800" : "bg-slate-100 text-slate-700"}`}>{children}</span>;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
