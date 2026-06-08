import nodemailer from "nodemailer";

type InquiryMail = {
  first_name: string;
  last_name: string;
  company?: string;
  email: string;
  phone?: string;
  website_url?: string;
  requested_service: string;
  platform?: string;
  message: string;
};

export async function sendInquiryMail(inquiry: InquiryMail) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM || user;
  const to = process.env.CONTACT_RECEIVER_EMAIL;

  if (!host || !user || !pass || !from || !to) {
    throw new Error("SMTP ENV Variablen fehlen.");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });

  const submittedAt = new Date().toLocaleString("de-DE");
  const adminText = [
    "Neue Website-Anfrage über Klickhafen",
    "",
    `Name: ${inquiry.first_name} ${inquiry.last_name}`.trim(),
    `Firma: ${inquiry.company || "-"}`,
    `E-Mail: ${inquiry.email}`,
    `Telefon: ${inquiry.phone || "-"}`,
    `Website: ${inquiry.website_url || "-"}`,
    `Gewünschte Leistung: ${inquiry.requested_service}`,
    `System / Plattform: ${inquiry.platform || "-"}`,
    `Zeitpunkt: ${submittedAt}`,
    "",
    "Nachricht:",
    inquiry.message,
  ].join("\n");

  await transporter.sendMail({
    from,
    to,
    subject: "Neue Website-Anfrage über Klickhafen",
    text: adminText,
  });

  await transporter.sendMail({
    from,
    to: inquiry.email,
    subject: "Ihre Anfrage bei Klickhafen ist eingegangen",
    text: "Vielen Dank für Ihre Anfrage. Ich habe Ihre Nachricht erhalten und melde mich zeitnah zurück.",
  });
}
