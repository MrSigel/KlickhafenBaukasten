"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/server/admin-auth";
import { getSupabaseAdmin } from "@/lib/server/supabase";
import { logActivity } from "@/lib/server/activity";
import { normalizeUrl, referenceStatuses } from "@/lib/references";

type ScreenshotResult = { ok: true; screenshotUrl: string } | { ok: false; error: string };

function adminRedirect(message: string, type: "success" | "error" = "success") {
  redirect(`/admin/referenzen?${type}=${encodeURIComponent(message)}`);
}

async function requireAdmin() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
}

function cleanStatus(value: string) {
  return referenceStatuses.includes(value as (typeof referenceStatuses)[number]) ? value : "draft";
}

function readReferenceForm(formData: FormData) {
  const title = String(formData.get("title") || "").trim();
  if (!title) throw new Error("Bitte geben Sie einen Titel ein.");

  const url = normalizeUrl(String(formData.get("url") || ""));
  const sortOrder = Number.parseInt(String(formData.get("sort_order") || "0"), 10);

  return {
    title,
    url,
    description: String(formData.get("description") || "").trim() || null,
    status: cleanStatus(String(formData.get("status") || "draft")),
    sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    featured: formData.get("featured") === "on",
  };
}

export async function createReferenceAction(formData: FormData) {
  await requireAdmin();

  try {
    const payload = readReferenceForm(formData);
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase.from("references").insert(payload).select("id, title, url").single();
    if (error || !data) throw new Error("Die Referenz konnte nicht gespeichert werden.");

    await logActivity({
      action: "created",
      entityType: "reference",
      entityId: data.id,
      title: "Referenz erstellt",
      description: data.title,
      metadata: { url: data.url },
    });

    const screenshot = await createAndStoreScreenshot(data.id, data.url);
    revalidateReferences();

    if (!screenshot.ok) {
      adminRedirect(`Referenz gespeichert. Screenshot konnte nicht erstellt werden: ${screenshot.error}`, "error");
    }
    adminRedirect("Referenz wurde gespeichert und der Screenshot wurde erstellt.");
  } catch (error) {
    adminRedirect(error instanceof Error ? error.message : "Die Referenz konnte nicht gespeichert werden.", "error");
  }
}

export async function updateReferenceAction(formData: FormData) {
  await requireAdmin();

  try {
    const id = String(formData.get("id") || "");
    if (!id) throw new Error("Referenz-ID fehlt.");

    const payload = readReferenceForm(formData);
    const supabase = getSupabaseAdmin();
    const { data: current } = await supabase.from("references").select("url, screenshot_url").eq("id", id).single();
    const { error } = await supabase.from("references").update(payload).eq("id", id);
    if (error) throw new Error("Die Referenz konnte nicht aktualisiert werden.");

    if (!current?.screenshot_url || current.url !== payload.url) {
      await createAndStoreScreenshot(id, payload.url);
    }

    await logActivity({
      action: "updated",
      entityType: "reference",
      entityId: id,
      title: "Referenz aktualisiert",
      description: payload.title,
      metadata: { status: payload.status, url: payload.url },
    });

    revalidateReferences();
    adminRedirect("Referenz wurde aktualisiert.");
  } catch (error) {
    adminRedirect(error instanceof Error ? error.message : "Die Referenz konnte nicht aktualisiert werden.", "error");
  }
}

export async function archiveReferenceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) adminRedirect("Referenz-ID fehlt.", "error");

  await getSupabaseAdmin().from("references").update({ status: "archived" }).eq("id", id);
  await logActivity({ action: "updated", entityType: "reference", entityId: id, title: "Referenz archiviert" });
  revalidateReferences();
  adminRedirect("Referenz wurde archiviert.");
}

export async function deleteReferenceAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  if (!id) adminRedirect("Referenz-ID fehlt.", "error");

  const supabase = getSupabaseAdmin();
  const { data } = await supabase.from("references").select("title").eq("id", id).single();
  await supabase.from("references").delete().eq("id", id);
  await logActivity({ action: "deleted", entityType: "reference", entityId: id, title: "Referenz gelöscht", description: data?.title || null });
  revalidateReferences();
  adminRedirect("Referenz wurde gelöscht.");
}

export async function generateReferenceScreenshotAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const url = String(formData.get("url") || "");
  if (!id) adminRedirect("Referenz-ID fehlt.", "error");

  const result = await createAndStoreScreenshot(id, url);
  revalidateReferences();

  if (!result.ok) adminRedirect(result.error, "error");
  adminRedirect("Screenshot wurde neu erstellt.");
}

async function createAndStoreScreenshot(id: string, rawUrl: string): Promise<ScreenshotResult> {
  let browser: any = null;

  try {
    const url = normalizeUrl(rawUrl);
    const dynamicImport = new Function("specifier", "return import(specifier)") as (specifier: string) => Promise<any>;
    const playwright = await dynamicImport("playwright").catch(() => null);
    if (!playwright?.chromium) {
      return {
        ok: false,
        error:
          "Playwright ist in dieser Umgebung nicht installiert. Installieren Sie Playwright oder binden Sie später einen externen Screenshot-Dienst an.",
      };
    }

    browser = await playwright.chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: { width: 1200, height: 800 }, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
    const buffer = await page.screenshot({ type: "png", fullPage: false });
    await browser.close();
    browser = null;

    const supabase = getSupabaseAdmin();
    const path = `reference-${id}.png`;
    const { error: uploadError } = await supabase.storage
      .from("reference-screenshots")
      .upload(path, buffer, { contentType: "image/png", upsert: true });

    if (uploadError) {
      return { ok: false, error: "Screenshot wurde erstellt, konnte aber nicht in Supabase Storage gespeichert werden." };
    }

    const { data } = supabase.storage.from("reference-screenshots").getPublicUrl(path);
    await supabase.from("references").update({ screenshot_url: data.publicUrl }).eq("id", id);
    return { ok: true, screenshotUrl: data.publicUrl };
  } catch {
    return { ok: false, error: "Die Website war nicht erreichbar oder der Screenshot konnte nicht erstellt werden." };
  } finally {
    if (browser) await browser.close().catch(() => undefined);
  }
}

function revalidateReferences() {
  revalidatePath("/admin/referenzen");
  revalidatePath("/referenzen");
  revalidatePath("/");
}
