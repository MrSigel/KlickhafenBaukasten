"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { lookup } from "dns/promises";
import net from "net";
import { logActivity } from "@/lib/server/activity";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";

const maxPages = 8;
const maxSearchResults = 5;
const fetchTimeoutMs = 6000;
const interestingPathPattern = /(kontakt|contact|impressum|imprint|datenschutz|privacy|legal|ueber-uns|über-uns|about)/i;
const ignoredEmailPattern = /@(example\.|sentry\.|w3\.|schema\.|domain\.|test\.|localhost)|noreply|no-reply|donotreply|do-not-reply/i;
const ignoredSearchHostPattern = /(google|bing|duckduckgo|facebook|instagram|linkedin|youtube|x\.com|twitter|gelbeseiten|11880|werkenntdenbesten|golocal|yelp|cylex|meinestadt|dasoertliche|telefonbuch)\./i;

type ScrapeResult = {
  email: string | null;
  phone?: string | null;
  businessName?: string | null;
  website?: string | null;
  source: string;
  status: "new" | "failed";
  notes?: string;
};

type SearchCandidate = {
  title: string;
  url: URL;
};

export async function runScraperAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const query = String(formData.get("query") || "").trim();
  if (!query || query.length < 3) redirect(`/admin/scraper?error=${encodeURIComponent("Bitte Suchbegriff eingeben.")}`);

  const supabase = getSupabaseAdmin();
  let results: ScrapeResult[] = [];

  try {
    const candidates = await findWebsiteCandidates(query);
    if (!candidates.length) throw new Error("Keine passenden Websites gefunden.");

    for (const candidate of candidates) {
      try {
        await assertPublicHttpUrl(candidate.url);
        const websiteResults = await findEmailsOnWebsite(candidate.url);
        const firstPhone = websiteResults.find((item) => item.phone)?.phone || null;

        if (websiteResults.length) {
          results.push(...websiteResults.map((item) => ({
            ...item,
            businessName: candidate.title,
            website: candidate.url.toString(),
            phone: item.phone || firstPhone,
          })));
        } else {
          results.push({
            email: null,
            phone: firstPhone,
            businessName: candidate.title,
            website: candidate.url.toString(),
            source: candidate.url.toString(),
            status: "new",
            notes: "Keine E-Mail gefunden.",
          });
        }
      } catch {
        results.push({
          email: null,
          businessName: candidate.title,
          website: candidate.url.toString(),
          source: candidate.url.toString(),
          status: "failed",
          notes: "Website konnte nicht abgerufen werden.",
        });
      }
    }
  } catch (error) {
    results = [{
      email: null,
      source: query,
      status: "failed",
      notes: error instanceof Error ? error.message : "Suche konnte nicht ausgeführt werden.",
    }];
  }

  const rows = results.length ? results : [{ email: null, source: query, status: "new" as const, notes: "Keine E-Mail gefunden." }];
  const { error } = await supabase.from("scraper_results").insert(rows.map((result) => ({
    query,
    business_name: result.businessName || "",
    industry: inferIndustry(query),
    city: inferCity(query),
    website: result.website || "",
    email: result.email,
    phone: result.phone || "",
    source: result.source,
    status: result.status,
    notes: result.notes || (result.email ? "" : "Keine E-Mail gefunden."),
  })));

  if (error) redirect(`/admin/scraper?error=${encodeURIComponent("Scraper-Ergebnis konnte nicht gespeichert werden.")}`);

  await logActivity({
    action: "created",
    entityType: "scraper_result",
    title: "Scraper ausgeführt",
    description: query,
    metadata: { query, results: rows.length },
  });

  revalidatePath("/admin/scraper");
  redirect(`/admin/scraper?success=${encodeURIComponent(rows.some((row) => row.email) ? "Suche abgeschlossen." : "Keine E-Mail gefunden.")}`);
}

export async function importScraperResultAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/scraper?error=Ergebnis-ID fehlt.");

  const supabase = getSupabaseAdmin();
  const { data: result } = await supabase.from("scraper_results").select("*").eq("id", id).single();
  if (!result) redirect("/admin/scraper?error=Ergebnis konnte nicht geladen werden.");
  if (!result.email) redirect("/admin/scraper?error=Keine E-Mail gefunden.");
  const includeCompany = formData.get("include_company") === "on";
  const includeWebsite = formData.get("include_website") === "on";
  const includeEmail = formData.get("include_email") === "on";
  const includePhone = formData.get("include_phone") === "on";
  const includeIndustry = formData.get("include_industry") === "on";
  const includeCity = formData.get("include_city") === "on";
  const includeNotes = formData.get("include_notes") === "on";
  if (!includeEmail) redirect("/admin/scraper?error=E-Mail muss für Kunden übernommen werden.");

  const normalizedWebsite = includeWebsite ? normalizeWebsiteForCompare(result.website || "") : "";
  let duplicateQuery = supabase.from("customers").select("id, email, website_url").limit(1);
  if (normalizedWebsite) {
    duplicateQuery = duplicateQuery.or(`email.eq.${result.email},website_url.eq.${normalizedWebsite},website_url.eq.${result.website}`);
  } else {
    duplicateQuery = duplicateQuery.eq("email", result.email);
  }
  const { data: duplicates } = await duplicateQuery;
  const duplicate = duplicates?.[0];

  if (duplicate) {
    await supabase.from("scraper_results").update({ status: "ignored", notes: "Dieser Kunde existiert bereits.", imported_customer_id: duplicate.id }).eq("id", id);
    redirect("/admin/scraper?error=Dieser Kunde existiert bereits.");
  }

  const { data: customer, error } = await supabase.from("customers").insert({
    type: "business",
    company: includeCompany ? result.business_name || "" : "",
    email: result.email,
    website_url: includeWebsite ? normalizedWebsite || result.website || "" : "",
    city: includeCity ? result.city || "" : "",
    phone: includePhone ? result.phone || "" : "",
    country: "Deutschland",
    industry: includeIndustry ? result.industry || "" : "",
    lead_source: "scraper",
    local_outreach_status: "open",
    status: "active",
    notes: includeNotes ? result.notes || "" : "",
  }).select("id, email, company").single();

  if (error || !customer) redirect("/admin/scraper?error=Kunde konnte nicht erstellt werden.");

  await supabase.from("scraper_results").update({ status: "imported", imported_customer_id: customer.id }).eq("id", id);
  await logActivity({
    action: "created",
    entityType: "customer",
    entityId: customer.id,
    title: "Scraper-Ergebnis übernommen",
    description: customer.company || customer.email,
    metadata: { scraper_result_id: id, email: customer.email },
  });

  revalidatePath("/admin/scraper");
  revalidatePath("/admin/kunden");
  revalidatePath("/admin/arbeiten");
  redirect("/admin/scraper?success=Kunde wurde übernommen.");
}

async function findWebsiteCandidates(query: string) {
  const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const html = await fetchSearchHtml(searchUrl);
  const candidates: SearchCandidate[] = [];
  const resultPattern = /<a[^>]+class="result__a"[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi;

  for (const match of html.matchAll(resultPattern)) {
    if (candidates.length >= maxSearchResults) break;
    const href = decodeHtmlEntities(stripTags(match[1] || ""));
    const title = cleanText(match[2] || "");
    const url = normalizeSearchResultUrl(href);
    if (!url) continue;
    if (ignoredSearchHostPattern.test(url.hostname)) continue;
    if (candidates.some((candidate) => candidate.url.hostname === url.hostname)) continue;
    candidates.push({ title: title || url.hostname.replace(/^www\./, ""), url });
  }

  return candidates;
}

async function fetchSearchHtml(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), fetchTimeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Mozilla/5.0 (compatible; KlickhafenAdminEmailFinder/1.0)" },
      redirect: "follow",
    });
    const finalUrl = new URL(response.url);
    if (finalUrl.hostname !== "html.duckduckgo.com") throw new Error("Suche konnte nicht ausgeführt werden.");
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("text/html")) throw new Error("Suche konnte nicht ausgeführt werden.");
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function normalizeSearchResultUrl(value: string) {
  try {
    const raw = new URL(value, "https://duckduckgo.com");
    const redirected = raw.searchParams.get("uddg");
    const target = redirected ? new URL(decodeURIComponent(redirected)) : raw;
    if (!["http:", "https:"].includes(target.protocol)) return null;
    target.hash = "";
    target.search = "";
    return target;
  } catch {
    return null;
  }
}

function inferIndustry(query: string) {
  return query.trim().split(/\s+/)[0] || "";
}

function inferCity(query: string) {
  const parts = query.trim().split(/\s+/);
  return parts.length > 1 ? parts.slice(1).join(" ") : "";
}

export async function ignoreScraperResultAction(formData: FormData) {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const id = String(formData.get("id") || "");
  if (!id) redirect("/admin/scraper?error=Ergebnis-ID fehlt.");
  await getSupabaseAdmin().from("scraper_results").update({ status: "ignored" }).eq("id", id);
  revalidatePath("/admin/scraper");
  redirect("/admin/scraper?success=Ergebnis wurde ignoriert.");
}

function normalizeWebsiteUrl(value: string) {
  if (!value) throw new Error("Ungültige URL.");
  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  let url: URL;
  try {
    url = new URL(withProtocol);
  } catch {
    throw new Error("Ungültige URL.");
  }
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Ungültige URL.");
  url.hash = "";
  return url;
}

function normalizeWebsiteForCompare(value: string) {
  if (!value) return "";
  try {
    const url = normalizeWebsiteUrl(value);
    url.pathname = url.pathname === "/" ? "" : url.pathname.replace(/\/+$/, "");
    return url.toString().replace(/\/$/, "");
  } catch {
    return value;
  }
}

async function assertPublicHttpUrl(url: URL) {
  const hostname = url.hostname.toLowerCase();
  if (hostname === "localhost" || hostname.endsWith(".local")) throw new Error("Ungültige URL.");
  const addresses = await lookup(hostname, { all: true }).catch(() => []);
  if (!addresses.length) throw new Error("Website konnte nicht abgerufen werden.");
  if (addresses.some((entry) => isPrivateIp(entry.address))) throw new Error("Ungültige URL.");
}

function isPrivateIp(address: string) {
  if (net.isIP(address) === 6) {
    return address === "::1" || address.startsWith("fc") || address.startsWith("fd") || address.startsWith("fe80:");
  }
  const parts = address.split(".").map(Number);
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) return true;
  const [a, b] = parts;
  return a === 10 || a === 127 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 169 && b === 254) || a === 0;
}

async function findEmailsOnWebsite(startUrl: URL) {
  const visited = new Set<string>();
  const queue = [startUrl.toString()];
  const found = new Map<string, string>();
  let phone: string | null = null;

  while (queue.length && visited.size < maxPages) {
    const current = queue.shift();
    if (!current || visited.has(current)) continue;
    visited.add(current);
    const html = await fetchHtml(current);
    phone ||= extractPhone(html);
    for (const email of extractEmails(html)) {
      if (!ignoredEmailPattern.test(email)) found.set(email.toLowerCase(), current);
    }
    for (const link of extractInterestingLinks(html, new URL(current), startUrl.origin)) {
      if (!visited.has(link) && !queue.includes(link) && visited.size + queue.length < maxPages) queue.push(link);
    }
  }

  return Array.from(found.entries()).map(([email, source]) => ({ email, phone, source, status: "new" as const }));
}

async function fetchHtml(url: string) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), fetchTimeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "KlickhafenAdminEmailFinder/1.0" },
      redirect: "manual",
    });
    const contentType = response.headers.get("content-type") || "";
    if (!response.ok || !contentType.includes("text/html")) throw new Error("Website konnte nicht abgerufen werden.");
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function extractEmails(html: string) {
  const decoded = decodeHtmlEntities(html);
  const mailtoMatches = Array.from(decoded.matchAll(/mailto:([^"'?\s<>]+)/gi)).map((match) => decodeURIComponent(match[1] || ""));
  const textMatches = decoded.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  return Array.from(new Set(mailtoMatches.concat(textMatches).map((email) => email.trim().replace(/[.,;:)]+$/, "").toLowerCase())));
}

function extractPhone(html: string) {
  const decoded = cleanText(html);
  const matches = decoded.match(/(?:\+49|0)[\d\s()./-]{7,}/g) || [];
  const cleaned = matches
    .map((value) => value.replace(/\s+/g, " ").trim())
    .filter((value) => value.replace(/\D/g, "").length >= 8 && value.replace(/\D/g, "").length <= 16);
  return cleaned[0] || null;
}

function extractInterestingLinks(html: string, baseUrl: URL, origin: string) {
  const links = Array.from(html.matchAll(/href=["']([^"']+)["']/gi)).map((match) => match[1]).filter(Boolean);
  const normalized: string[] = [];
  for (const href of links) {
    if (href.startsWith("mailto:") || href.startsWith("#")) continue;
    let url: URL;
    try {
      url = new URL(href, baseUrl);
    } catch {
      continue;
    }
    if (url.origin !== origin) continue;
    if (!["http:", "https:"].includes(url.protocol)) continue;
    if (/\.(pdf|jpg|jpeg|png|gif|webp|svg|zip)$/i.test(url.pathname)) continue;
    if (!interestingPathPattern.test(url.pathname)) continue;
    url.hash = "";
    normalized.push(url.toString());
  }
  return Array.from(new Set(normalized)).slice(0, maxPages - 1);
}

function decodeHtmlEntities(value: string) {
  return value
    .replace(/&#64;|&commat;/gi, "@")
    .replace(/\s*\[at\]\s*|\s*\(at\)\s*/gi, "@")
    .replace(/\s*\[dot\]\s*|\s*\(dot\)\s*/gi, ".")
    .replace(/&amp;/gi, "&");
}

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, " ");
}

function cleanText(value: string) {
  return decodeHtmlEntities(stripTags(value)).replace(/\s+/g, " ").trim();
}
