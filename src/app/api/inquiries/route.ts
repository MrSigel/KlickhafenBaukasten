import { NextResponse } from "next/server";
import { sendInquiryMail } from "@/lib/server/mailer";
import { getSupabaseAdmin } from "@/lib/server/supabase";

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const first_name = String(data.get("vorname") || "").trim();
    const last_name = String(data.get("nachname") || "").trim();
    const company = String(data.get("unternehmen") || "").trim();
    const email = String(data.get("email") || "").trim();
    const website_url = String(data.get("website") || "").trim();
    const requested_service = String(data.get("leistung") || "Website- & Shop-Hilfe").trim();
    const platform = String(data.get("system") || "").trim();
    const message = String(data.get("nachricht") || "").trim();
    const salutation = String(data.get("anrede") || "").trim();

    if (!first_name && !last_name) {
      return NextResponse.json({ ok: false, message: "Bitte geben Sie Ihren Namen ein." }, { status: 400 });
    }

    if (!email || !isEmail(email)) {
      return NextResponse.json({ ok: false, message: "Bitte geben Sie eine gültige E-Mail-Adresse ein." }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ ok: false, message: "Bitte beschreiben Sie kurz Ihr Anliegen." }, { status: 400 });
    }

    const inquiry = {
      salutation,
      first_name: first_name || "-",
      last_name: last_name || "-",
      company,
      email,
      website_url,
      requested_service,
      platform,
      message,
      source: "website",
      status: "new",
    };

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from("inquiries").insert(inquiry);

    if (error) {
      return NextResponse.json({ ok: false, message: "Die Anfrage konnte gerade nicht gesendet werden. Bitte kontaktieren Sie mich direkt per E-Mail oder WhatsApp." }, { status: 500 });
    }

    await sendInquiryMail(inquiry).catch((error) => {
      console.error("Inquiry mail failed after database insert", error);
    });

    return NextResponse.json({
      ok: true,
      message: "Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.",
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Ihre Nachricht konnte gerade nicht gespeichert werden. Bitte versuchen Sie es erneut." }, { status: 500 });
  }
}
