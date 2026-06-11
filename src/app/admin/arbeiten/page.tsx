import type { Metadata } from "next";
import { ExternalLink, Search } from "lucide-react";
import { AdminHeader, AdminLink } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { OpenGroupButton } from "../beitraege/open-group-button";
import { WorkCopyButton } from "./work-copy-button";
import { type AdminPost, postCategories, postStatusLabel } from "@/lib/posts";
import {
  type FacebookGroup,
  facebookGroupCategories,
  facebookGroupOwners,
  facebookGroupStatusLabel,
  facebookGroupStatuses,
  shortUrl,
} from "@/lib/facebook-groups";

export const metadata: Metadata = {
  title: "Arbeiten | Klickhafen Admin",
  robots: { index: false, follow: false },
};

type SearchParams = {
  q?: string;
  category?: string;
  owner?: string;
  status?: string;
  today?: string;
};

const categoryFallbacks: Record<string, string[]> = {
  Webdesign: ["Webdesign", "Webentwicklung", "Allgemein"],
  Webentwicklung: ["Webentwicklung", "Webdesign", "Allgemein"],
  Freelancer: ["Allgemein", "Webdesign"],
  Fullstack: ["Webentwicklung", "Webdesign", "Allgemein"],
  WordPress: ["WordPress", "Elementor", "Allgemein"],
  Elementor: ["Elementor", "WordPress", "Allgemein"],
  Shopify: ["Shopify", "Allgemein"],
  Wix: ["Wix", "Baukasten", "Allgemein"],
  Strato: ["Strato", "Baukasten", "Allgemein"],
  Baukasten: ["Baukasten", "Wix", "Strato", "Allgemein"],
  WooCommerce: ["WooCommerce", "WordPress", "Allgemein"],
  SEO: ["SEO", "Allgemein"],
  "Lokale Gruppen": ["Allgemein", "Webdesign", "SEO"],
  Allgemein: ["Allgemein"],
};

export default async function AdminWorkPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const params = await searchParams;
  const supabase = getSupabaseAdmin();

  let groupsQuery = supabase
    .from("facebook_groups")
    .select("*")
    .order("status", { ascending: true })
    .order("category", { ascending: true })
    .order("last_opened_at", { ascending: true, nullsFirst: true })
    .order("created_at", { ascending: false });

  if (params.q) groupsQuery = groupsQuery.or(`name.ilike.%${params.q}%,url.ilike.%${params.q}%,notes.ilike.%${params.q}%`);
  if (params.category) groupsQuery = groupsQuery.eq("category", params.category);
  if (params.owner) groupsQuery = groupsQuery.eq("account_owner", params.owner);
  if (params.status) groupsQuery = groupsQuery.eq("status", params.status);

  const [{ data: groupsData, error: groupsError }, { data: postsData, error: postsError }] = await Promise.all([
    groupsQuery,
    supabase.from("posts").select("*").eq("status", "active").eq("platform", "facebook").order("created_at", { ascending: false }),
  ]);

  const posts = (postsData || []) as AdminPost[];
  const groups = ((groupsData || []) as FacebookGroup[]).filter((group) => {
    if (params.today !== "open") return true;
    return !isToday(group.last_opened_at);
  });

  return (
    <AdminGuard>
      <AdminHeader
        title="Arbeiten"
        text="Hier findest du passende Facebook-Gruppen mit dem passenden Beitragstext zum schnellen Kopieren und Posten."
      />
      {groupsError || postsError ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">Daten konnten nicht geladen werden.</p> : null}
      <Filters params={params} />
      {!groups.length ? <EmptyGroups /> : null}
      {groups.length && !posts.length ? <EmptyPosts /> : null}
      <div className="mt-6 grid gap-4">
        {groups.map((group) => (
          <WorkCard key={group.id} group={group} post={findMatchingPost(group, posts)} />
        ))}
      </div>
    </AdminGuard>
  );
}

function Filters({ params }: { params: SearchParams }) {
  return (
    <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:grid-cols-[1fr_180px_170px_150px_190px_auto]">
      <label className="sr-only" htmlFor="q">Suche nach Gruppenname</label>
      <input id="q" name="q" placeholder="Suche nach Gruppenname" defaultValue={params.q || ""} className="rounded-md border border-slate-300 px-3 py-2" />
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
      <select name="today" defaultValue={params.today || ""} className="rounded-md border border-slate-300 px-3 py-2">
        <option value="">Alle Gruppen</option>
        <option value="open">Heute noch nicht geöffnet</option>
      </select>
      <button className="inline-flex min-h-10 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
        <Search className="mr-2 size-4" /> Filtern
      </button>
    </form>
  );
}

function WorkCard({ group, post }: { group: FacebookGroup; post: AdminPost | null }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(280px,420px)]">
        <div className="min-w-0">
          <div className="flex flex-wrap gap-2">
            <Badge tone="cyan">{facebookGroupStatusLabel(group.status)}</Badge>
            {group.category ? <Badge>{group.category}</Badge> : null}
            {group.account_owner ? <Badge>{group.account_owner}</Badge> : null}
          </div>
          <h2 className="mt-3 text-xl font-semibold text-slate-950">{group.name}</h2>
          <a href={group.url} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex max-w-full items-center gap-2 break-all text-sm font-semibold text-cyan-800 hover:text-cyan-950">
            <ExternalLink className="size-4 shrink-0" /> {shortUrl(group.url)}
          </a>
          <p className="mt-3 text-sm text-slate-500">
            {group.open_count || 0} Öffnungen{group.last_opened_at ? ` · zuletzt ${formatDateTime(group.last_opened_at)}` : ""}
          </p>
        </div>
        <div className="min-w-0 rounded-lg bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-cyan-800">Passender Beitrag</p>
          {post ? (
            <>
              <div className="mt-3 flex flex-wrap gap-2">
                {post.category ? <Badge>{post.category}</Badge> : null}
                <Badge>{postStatusLabel(post.status)}</Badge>
              </div>
              <h3 className="mt-3 text-lg font-semibold text-slate-950">{post.title}</h3>
              <p className="mt-2 line-clamp-4 whitespace-pre-line text-sm leading-6 text-slate-650">{post.description}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <WorkCopyButton text={post.title} label="Titel kopieren" copiedLabel="Titel kopiert" />
                <WorkCopyButton postId={post.id} text={post.description} label="Beschreibung kopieren" copiedLabel="Beschreibung kopiert" trackCopy />
                <OpenGroupButton id={group.id} url={group.url} />
              </div>
            </>
          ) : (
            <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900">
              Kein passender Beitrag gefunden.
              <div className="mt-3">
                <AdminLink href="/admin/beitraege/neu">Beitrag erstellen</AdminLink>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function findMatchingPost(group: FacebookGroup, posts: AdminPost[]) {
  if (!posts.length) return null;
  const candidates = categoryFallbacks[group.category || "Allgemein"] || [group.category || "", "Allgemein"];
  for (const category of candidates) {
    const match = posts.find((post) => normalize(post.category) === normalize(category));
    if (match) return match;
  }
  return posts.find((post) => normalize(post.category) === "allgemein") || posts[0] || null;
}

function normalize(value?: string | null) {
  return String(value || "").trim().toLowerCase();
}

function isToday(value: string | null) {
  if (!value) return false;
  const date = new Date(value);
  const now = new Date();
  return date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
}

function EmptyGroups() {
  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Keine Facebook-Gruppen vorhanden</h2>
      <p className="mt-3 max-w-2xl leading-7 text-slate-650">Lege zuerst Facebook-Gruppen im Bereich Beiträge → Facebook-Gruppen an.</p>
      <div className="mt-6"><AdminLink href="/admin/beitraege?tab=gruppen">Zu Facebook-Gruppen</AdminLink></div>
    </div>
  );
}

function EmptyPosts() {
  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-950">Keine Beiträge vorhanden</h2>
      <p className="mt-3 max-w-2xl leading-7 text-slate-650">Lege zuerst Beiträge an, damit sie hier passenden Gruppen zugeordnet werden können.</p>
      <div className="mt-6"><AdminLink href="/admin/beitraege/neu">Zu Beiträge</AdminLink></div>
    </div>
  );
}

function Badge({ children, tone = "slate" }: { children: React.ReactNode; tone?: "slate" | "cyan" }) {
  return <span className={`rounded-md px-2.5 py-1 text-xs font-semibold ${tone === "cyan" ? "bg-cyan-50 text-cyan-800" : "bg-slate-100 text-slate-700"}`}>{children}</span>;
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}
