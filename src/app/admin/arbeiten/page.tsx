import type { Metadata } from "next";
import { Search } from "lucide-react";
import { AdminHeader, AdminLink } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { WorkCard } from "./work-card";
import { type AdminPost } from "@/lib/posts";
import {
  type FacebookGroup,
  facebookGroupCategories,
  facebookGroupOwners,
  facebookGroupStatusLabel,
  facebookGroupStatuses,
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
  view?: string;
};

type WorkLog = {
  group_id: string | null;
  post_id: string | null;
  action: string;
  worked_at: string;
  created_at: string;
};

const lockHours = 24;

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
  const mode = params.view === "done" ? "done" : params.view === "all" ? "all" : "open";
  const cutoff = new Date(Date.now() - lockHours * 60 * 60 * 1000).toISOString();
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
  else groupsQuery = groupsQuery.eq("status", "active");

  const [{ data: groupsData, error: groupsError }, { data: postsData, error: postsError }, { data: logsData }] = await Promise.all([
    groupsQuery,
    supabase.from("posts").select("*").eq("status", "active").eq("platform", "facebook").order("created_at", { ascending: false }),
    supabase.from("work_logs").select("group_id, post_id, action, worked_at, created_at").gte("worked_at", cutoff),
  ]);

  const posts = (postsData || []) as AdminPost[];
  const logs = (logsData || []) as WorkLog[];
  const lockByGroup = createLockMap((groupsData || []) as FacebookGroup[], logs);
  const groups = ((groupsData || []) as FacebookGroup[]).filter((group) => {
    const lock = lockByGroup.get(group.id) || createLockInfo(null);
    if (mode === "open") return !lock.locked;
    if (mode === "done") return lock.locked;
    return true;
  });

  return (
    <AdminGuard>
      <AdminHeader
        title="Arbeiten"
        text="Hier findest du passende Facebook-Gruppen mit dem passenden Beitragstext zum schnellen Kopieren und Posten."
      />
      {groupsError || postsError ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">Daten konnten nicht geladen werden.</p> : null}
      <Filters params={params} mode={mode} />
      {!groups.length ? <EmptyGroups /> : null}
      {groups.length && !posts.length ? <EmptyPosts /> : null}
      <div className="mt-6 grid gap-4">
        {groups.map((group) => (
          <WorkCard key={group.id} group={group} post={findMatchingPost(group, posts)} lock={lockByGroup.get(group.id) || createLockInfo(null)} mode={mode} />
        ))}
      </div>
    </AdminGuard>
  );
}

function Filters({ params, mode }: { params: SearchParams; mode: string }) {
  return (
    <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:grid-cols-[1fr_180px_170px_150px_210px_auto]">
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
        <option value="">Aktive Gruppen</option>
        {facebookGroupStatuses.map((status) => <option key={status} value={status}>{facebookGroupStatusLabel(status)}</option>)}
      </select>
      <select name="view" defaultValue={mode} className="rounded-md border border-slate-300 px-3 py-2">
        <option value="open">Jetzt offen</option>
        <option value="done">In den letzten 24 Std. erledigt</option>
        <option value="all">Alle Gruppen</option>
      </select>
      <button className="inline-flex min-h-10 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
        <Search className="mr-2 size-4" /> Filtern
      </button>
    </form>
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

function createLockMap(groups: FacebookGroup[], logs: WorkLog[]) {
  const map = new Map<string, ReturnType<typeof createLockInfo>>();
  for (const group of groups) map.set(group.id, createLockInfo(group.last_opened_at));
  for (const log of logs) {
    if (!log.group_id) continue;
    const current = map.get(log.group_id);
    const currentTime = current?.lastWorkedAt ? new Date(current.lastWorkedAt).getTime() : 0;
    const logTime = new Date(log.worked_at || log.created_at).getTime();
    if (logTime > currentTime) map.set(log.group_id, createLockInfo(log.worked_at || log.created_at));
  }
  return map;
}

function createLockInfo(lastWorkedAt: string | null) {
  if (!lastWorkedAt) return { locked: false, lastWorkedAt: null, availableAt: null, remainingLabel: null };
  const workedTime = new Date(lastWorkedAt).getTime();
  const availableTime = workedTime + lockHours * 60 * 60 * 1000;
  const remainingMs = availableTime - Date.now();
  return {
    locked: remainingMs > 0,
    lastWorkedAt,
    availableAt: new Date(availableTime).toISOString(),
    remainingLabel: remainingMs > 0 ? formatRemaining(remainingMs) : null,
  };
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

function formatRemaining(ms: number) {
  const totalMinutes = Math.max(1, Math.ceil(ms / 60000));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours && minutes) return `${hours} Std. ${minutes} Min.`;
  if (hours) return `${hours} Std.`;
  return `${minutes} Min.`;
}
