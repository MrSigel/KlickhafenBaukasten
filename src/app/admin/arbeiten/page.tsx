import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Search, Share2 } from "lucide-react";
import { AdminHeader, AdminLink } from "@/components/admin/ui";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { AdminGuard } from "../guard";
import { WorkWizard } from "./work-wizard";
import { LocalEmailWizard, type LocalEmailCustomer } from "./local-email-wizard";
import { type AdminPost } from "@/lib/posts";
import {
  type FacebookGroup,
  facebookGroupCategories,
  facebookGroupOwners,
} from "@/lib/facebook-groups";

export const metadata: Metadata = {
  title: "Arbeiten | Klickhafen Admin",
  robots: { index: false, follow: false },
};

type SearchParams = {
  q?: string;
  category?: string;
  owner?: string;
  tab?: string;
};

type WorkLog = {
  group_id: string | null;
  post_id: string | null;
  action: string;
  worked_at: string;
  created_at: string;
};

const lockHours = 24;
const localLockHours = 48;
const localExcludedStatuses = new Set(["not_interested", "customer", "archived"]);

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
  const activeTab = params.tab === "lokal" ? "lokal" : "digital";
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
  groupsQuery = groupsQuery.eq("status", "active");

  const [{ data: groupsData, error: groupsError }, { data: postsData, error: postsError }, { data: logsData }, localCustomer] = await Promise.all([
    groupsQuery,
    supabase.from("posts").select("*").eq("status", "active").eq("platform", "facebook").order("created_at", { ascending: false }),
    supabase.from("work_logs").select("group_id, post_id, action, worked_at, created_at").eq("action", "posted"),
    getNextLocalCustomer(),
  ]);

  const posts = (postsData || []) as AdminPost[];
  const logs = (logsData || []) as WorkLog[];
  const latestPostedByGroup = createLatestPostedMap(logs);
  const availableGroups = ((groupsData || []) as FacebookGroup[])
    .filter((group) => !isLocked(latestPostedByGroup.get(group.id) || null, cutoff))
    .sort((a, b) => groupSortValue(a, latestPostedByGroup) - groupSortValue(b, latestPostedByGroup) || new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  const doneToday = logs.filter((log) => Boolean(log.group_id) && new Date(log.worked_at || log.created_at).getTime() >= new Date(cutoff).getTime()).length;
  const wizardItems = availableGroups.map((group) => ({ group, post: findMatchingPost(group, posts) }));

  return (
    <AdminGuard>
      <AdminHeader
        title="Arbeiten"
        text="Arbeite digitale Facebook-Gruppen oder lokale E-Mail-Adressen Schritt für Schritt ab."
      />
      <Tabs activeTab={activeTab} />
      {activeTab === "digital" ? (
        <>
          {groupsError || postsError ? <p className="mb-4 rounded-md bg-red-50 p-4 text-red-800">Daten konnten nicht geladen werden.</p> : null}
          <Filters params={params} />
          {wizardItems.length ? <Progress doneToday={doneToday} available={wizardItems.length} category={params.category} /> : null}
          {!((groupsData || []) as FacebookGroup[]).length ? <EmptyGroups /> : null}
          {((groupsData || []) as FacebookGroup[]).length && !posts.length ? <EmptyPosts /> : null}
          {wizardItems.length ? <WorkWizard items={wizardItems} /> : ((groupsData || []) as FacebookGroup[]).length && posts.length ? <AllDone /> : null}
        </>
      ) : (
        <LocalEmailWizard initialCustomer={localCustomer} />
      )}
    </AdminGuard>
  );
}

function Tabs({ activeTab }: { activeTab: "digital" | "lokal" }) {
  const baseClass = "inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition";
  return (
    <div className="mb-6 flex flex-wrap gap-2 rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
      <Link href="/admin/arbeiten" className={`${baseClass} ${activeTab === "digital" ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
        <Share2 className="mr-2 size-4" /> Digital
      </Link>
      <Link href="/admin/arbeiten?tab=lokal" className={`${baseClass} ${activeTab === "lokal" ? "bg-slate-950 text-white" : "text-slate-700 hover:bg-slate-100"}`}>
        <Mail className="mr-2 size-4" /> Lokal
      </Link>
    </div>
  );
}

function Filters({ params }: { params: SearchParams }) {
  return (
    <form className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm xl:grid-cols-[1fr_220px_190px_auto_auto]">
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
      <button className="inline-flex min-h-10 items-center justify-center rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white">
        <Search className="mr-2 size-4" /> Filtern
      </button>
      <Link href="/admin/arbeiten" className="inline-flex min-h-10 items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
        Zurücksetzen
      </Link>
    </form>
  );
}

function Progress({ doneToday, available, category }: { doneToday: number; available: number; category?: string }) {
  return (
    <div className="mt-6 grid gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-3">
      <Stat label="Heute erledigt" value={doneToday} />
      <Stat label="Noch verfügbar" value={available} />
      <Stat label="Aktuelle Kategorie" value={category || "Alle"} />
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-950">{value}</p>
    </div>
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

function createLatestPostedMap(logs: WorkLog[]) {
  const map = new Map<string, string>();
  for (const log of logs) {
    if (!log.group_id) continue;
    const current = map.get(log.group_id);
    const currentTime = current ? new Date(current).getTime() : 0;
    const logTime = new Date(log.worked_at || log.created_at).getTime();
    if (logTime > currentTime) map.set(log.group_id, log.worked_at || log.created_at);
  }
  return map;
}

function isLocked(lastPostedAt: string | null, cutoff: string) {
  return Boolean(lastPostedAt && new Date(lastPostedAt).getTime() >= new Date(cutoff).getTime());
}

function groupSortValue(group: FacebookGroup, latestPostedByGroup: Map<string, string>) {
  const posted = latestPostedByGroup.get(group.id);
  if (posted) return new Date(posted).getTime();
  return -1;
}

type LocalCustomerRow = LocalEmailCustomer & {
  created_at: string;
  status?: string | null;
  last_local_email_at?: string | null;
  local_outreach_status?: string | null;
};

async function getNextLocalCustomer(): Promise<LocalEmailCustomer | null> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("customers")
    .select("id, company, email, created_at, status, last_local_email_at, local_outreach_status")
    .eq("status", "active")
    .not("email", "is", null)
    .order("last_local_email_at", { ascending: true, nullsFirst: true })
    .order("created_at", { ascending: true })
    .limit(100);

  if (error) return null;

  const cutoff = new Date(Date.now() - localLockHours * 60 * 60 * 1000);
  const customer = ((data || []) as LocalCustomerRow[])
    .filter((row) => isLocalCustomerAvailable(row, cutoff))
    .sort(sortLocalCustomers)[0];

  return customer ? { id: customer.id, company: customer.company, email: customer.email } : null;
}

function isLocalCustomerAvailable(customer: LocalCustomerRow, cutoff: Date) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email || "")) return false;
  if (customer.status && customer.status !== "active") return false;
  if (localExcludedStatuses.has(customer.local_outreach_status || "")) return false;
  if (!customer.last_local_email_at) return true;
  return new Date(customer.last_local_email_at).getTime() < cutoff.getTime();
}

function sortLocalCustomers(a: LocalCustomerRow, b: LocalCustomerRow) {
  const aLast = a.last_local_email_at ? new Date(a.last_local_email_at).getTime() : 0;
  const bLast = b.last_local_email_at ? new Date(b.last_local_email_at).getTime() : 0;
  if (!aLast && bLast) return -1;
  if (aLast && !bLast) return 1;
  if (aLast !== bLast) return aLast - bLast;
  return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
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

function AllDone() {
  return (
    <div className="mt-6 rounded-lg border border-slate-200 bg-white p-8 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-slate-950">Für heute ist alles erledigt</h2>
      <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-650">
        Es sind aktuell keine verfügbaren Gruppen vorhanden. Gruppen werden automatisch nach 24 Stunden wieder freigegeben.
      </p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/admin/beitraege?tab=gruppen" className="inline-flex min-h-11 items-center justify-center rounded-md bg-cyan-700 px-5 py-3 text-sm font-semibold text-white hover:bg-cyan-800">
          Alle Gruppen ansehen
        </Link>
        <Link href="/admin/arbeiten" className="inline-flex min-h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:border-cyan-700 hover:text-cyan-800">
          Filter zurücksetzen
        </Link>
      </div>
    </div>
  );
}
