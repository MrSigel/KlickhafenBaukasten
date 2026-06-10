import chromium from "@sparticuz/chromium";
import { chromium as playwrightChromium } from "playwright";
import { normalizeUrl } from "@/lib/references";
import { getSupabaseAdmin } from "@/lib/server/supabase";

export type ScreenshotResult = { ok: true; screenshotUrl: string } | { ok: false; error: string };

export async function createAndStoreReferenceScreenshot(id: string, rawUrl: string): Promise<ScreenshotResult> {
  let browser: Awaited<ReturnType<typeof playwrightChromium.launch>> | null = null;

  try {
    const url = normalizeUrl(rawUrl);
    const isServerless = Boolean(process.env.VERCEL || process.env.AWS_REGION);

    if (isServerless) {
      browser = await playwrightChromium.launch({
        args: chromium.args,
        executablePath: await chromium.executablePath(),
        headless: true,
      });
    } else {
      browser = await playwrightChromium.launch({ headless: true });
    }

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
