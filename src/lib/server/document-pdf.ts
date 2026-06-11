import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, type PDFImage, type PDFFont, type PDFPage } from "pdf-lib";

type PdfSettings = {
  company_name?: string;
  owner_name?: string;
  street?: string;
  postal_code?: string;
  city?: string;
  country?: string;
  email?: string;
  phone?: string;
  website?: string;
  tax_number?: string;
  vat_id?: string;
  vat_enabled?: boolean;
  vat_rate?: number;
  small_business_enabled?: boolean;
  bank_account_holder?: string;
  bank_iban?: string;
  bank_bic?: string;
  bank_name?: string;
  default_offer_valid_days?: number;
};

type PdfInput = {
  type: "offer" | "invoice";
  document: any;
  items: any[];
  customer: any;
  settings: PdfSettings;
};

type PdfContext = {
  pdf: PDFDocument;
  page: PDFPage;
  font: PDFFont;
  bold: PDFFont;
  logo?: PDFImage;
  settings: PdfSettings;
  pageNumber: number;
  y: number;
};

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 42;
const contentWidth = pageWidth - margin * 2;
const footerTop = 74;
const accent = rgb(0.035, 0.47, 0.58);
const accentSoft = rgb(0.91, 0.965, 0.975);
const slate = rgb(0.055, 0.07, 0.095);
const muted = rgb(0.36, 0.42, 0.5);
const lightText = rgb(0.56, 0.61, 0.68);
const line = rgb(0.82, 0.86, 0.9);
const tableLine = rgb(0.88, 0.91, 0.94);

export async function generateDocumentPdf(input: PdfInput) {
  validateInput(input);

  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const logo = await loadLogo(pdf);
  const ctx: PdfContext = {
    pdf,
    font,
    bold,
    logo,
    settings: input.settings,
    page: pdf.addPage([pageWidth, pageHeight]),
    pageNumber: 1,
    y: pageHeight - margin,
  };

  drawHeader(ctx, input);
  drawAddressBlock(ctx, input);
  drawDocumentIntro(ctx, input);
  drawItemsTable(ctx, input.items);
  drawTotals(ctx, input);
  drawNotes(ctx, input);
  drawFooters(pdf, font, bold, logo, input);

  return pdf.save();
}

export function documentPdfFilename(type: "offer" | "invoice", document: any, customer: any) {
  const number = type === "offer" ? document.offer_number : document.invoice_number;
  const base = type === "offer" ? "Angebot" : "Rechnung";
  const customerPart = sanitizeFilename([customer?.company, customer?.first_name, customer?.last_name, customer?.email].filter(Boolean).join("_"));
  return `${base}_${sanitizeFilename(number || "Dokument")}_Klickhafen${customerPart ? `_${customerPart}` : ""}.pdf`;
}

function validateInput({ type, document, items, customer, settings }: PdfInput) {
  if (!document) throw new Error("Dokument wurde nicht gefunden.");
  if (!customer) throw new Error("Bitte Kundendaten vollständig ergänzen.");
  if (!hasCompleteCustomerAddress(customer)) throw new Error("Bitte Kundendaten vollständig ergänzen.");
  if (!items.length) throw new Error("Bitte mindestens eine Position ergänzen.");
  if (items.some((item) => !String(item.title || "").trim() || Number(item.quantity) <= 0 || Number(item.unit_price_cents) < 0)) {
    throw new Error("Bitte Positionstitel, Menge und Preise prüfen.");
  }
  if (!settings.company_name || !settings.owner_name || !settings.street || !settings.postal_code || !settings.city || !settings.email || !settings.website) {
    throw new Error("Bitte Unternehmensdaten in den Einstellungen vollständig ergänzen.");
  }
  if (typeof document.vat_enabled !== "boolean") throw new Error("Bitte MwSt.-Einstellung im Dokument prüfen.");
  if (type === "invoice" && !document.invoice_number) throw new Error("Bitte zuerst eine Rechnungsnummer speichern.");
  if (type === "invoice" && !document.issue_date) throw new Error("Bitte Rechnungsdatum ergänzen.");
  if (type === "invoice" && bankLines(settings).length < 4) throw new Error("Bitte Bankverbindung in den Einstellungen vollständig ergänzen.");
  if (type === "offer" && !document.offer_number) throw new Error("Bitte zuerst eine Angebotsnummer speichern.");
}

async function loadLogo(pdf: PDFDocument) {
  const candidates = [
    path.join(process.cwd(), "logo_klickhafen_transparent.png"),
    path.join(process.cwd(), "public", "logo_klickhafen_transparent.png"),
  ];
  const logoPath = candidates.find((candidate) => existsSync(candidate));
  if (!logoPath) return undefined;
  try {
    return pdf.embedPng(await readFile(logoPath));
  } catch {
    return undefined;
  }
}

function drawHeader(ctx: PdfContext, input: PdfInput) {
  const label = input.type === "offer" ? "Angebot" : "Rechnung";
  const number = input.type === "offer" ? input.document.offer_number : input.document.invoice_number;
  const date = input.type === "offer" ? input.document.created_at : input.document.issue_date;

  if (ctx.logo) {
    const logoWidth = 142;
    ctx.page.drawImage(ctx.logo, { x: margin, y: ctx.y - 45, width: logoWidth, height: logoWidth / ctx.logo.width * ctx.logo.height });
  } else {
    ctx.page.drawText("Klickhafen", { x: margin, y: ctx.y - 23, size: 24, font: ctx.bold, color: accent });
  }

  drawRightText(ctx.page, ctx.bold, label, pageWidth - margin, ctx.y - 8, 24, slate);
  drawRightText(ctx.page, ctx.bold, safeText(number || ""), pageWidth - margin, ctx.y - 28, 10.5, accent);
  drawRightText(ctx.page, ctx.font, `Datum: ${formatDate(date)}`, pageWidth - margin, ctx.y - 44, 9, muted);
  ctx.page.drawLine({ start: { x: margin, y: ctx.y - 66 }, end: { x: pageWidth - margin, y: ctx.y - 66 }, thickness: 1, color: line });
  ctx.y -= 92;
}

function drawAddressBlock(ctx: PdfContext, input: PdfInput) {
  const sender = senderLine(input.settings);
  ctx.page.drawText(safeText(sender), { x: margin, y: ctx.y, size: 7.5, font: ctx.font, color: lightText });
  ctx.page.drawLine({ start: { x: margin, y: ctx.y - 4 }, end: { x: margin + Math.min(260, ctx.font.widthOfTextAtSize(sender, 7.5)), y: ctx.y - 4 }, thickness: 0.35, color: line });

  const recipient = customerLines(input.customer);
  ctx.y -= 20;
  for (const row of recipient) {
    ctx.page.drawText(safeText(row), { x: margin, y: ctx.y, size: 10.5, font: row === recipient[0] ? ctx.bold : ctx.font, color: slate });
    ctx.y -= 14;
  }

  const infoX = 355;
  const infoRows = documentMetaRows(input);
  ctx.page.drawRectangle({ x: infoX - 12, y: ctx.y + 8, width: pageWidth - margin - infoX + 12, height: 104, color: accentSoft, borderColor: rgb(0.78, 0.9, 0.93), borderWidth: 0.7 });
  let infoY = ctx.y + 86;
  for (const [label, value] of infoRows) {
    ctx.page.drawText(safeText(label), { x: infoX, y: infoY, size: 7.7, font: ctx.bold, color: accent });
    drawRightText(ctx.page, ctx.font, safeText(value || "-"), pageWidth - margin - 10, infoY, 8.3, slate);
    infoY -= 18;
  }
  ctx.y -= 24;
}

function drawDocumentIntro(ctx: PdfContext, input: PdfInput) {
  const title = input.document.title || (input.type === "offer" ? "Angebot" : "Rechnung");
  ctx.y = ensureSpace(ctx, 86);
  ctx.page.drawText(input.type === "offer" ? "Angebot" : "Rechnung", { x: margin, y: ctx.y, size: 24, font: ctx.bold, color: slate });
  ctx.y -= 28;
  ctx.page.drawText(safeText(title), { x: margin, y: ctx.y, size: 12.5, font: ctx.bold, color: accent });
  ctx.y -= 18;
  if (input.document.description) {
    ctx.y = drawWrapped(ctx.page, ctx.font, input.document.description, margin, ctx.y, contentWidth, 9.2, 13, muted) - 8;
  }
}

function drawItemsTable(ctx: PdfContext, items: any[]) {
  ctx.y = ensureSpace(ctx, 96);
  ctx.page.drawText("Leistungspositionen", { x: margin, y: ctx.y, size: 12, font: ctx.bold, color: accent });
  ctx.y -= 24;
  drawTableHeader(ctx);
  items.forEach((item, index) => {
    const rowHeight = estimateItemHeight(ctx, item);
    ctx.y = ensureSpace(ctx, rowHeight + 18);
    if (ctx.y > pageHeight - margin - 12) drawTableHeader(ctx);
    drawItemRow(ctx, item, index + 1, rowHeight);
  });
}

function drawTableHeader(ctx: PdfContext) {
  ctx.page.drawRectangle({ x: margin, y: ctx.y - 8, width: contentWidth, height: 24, color: accentSoft });
  const headers: [string, number, number?][] = [
    ["Pos.", margin + 8],
    ["Leistung", margin + 44],
    ["Menge", margin + 326],
    ["Einzelpreis", margin + 398, 64],
    ["Gesamt", margin + 496, 55],
  ];
  for (const [label, x, width] of headers) {
    if (width) drawRightText(ctx.page, ctx.bold, label, x + width, ctx.y, 8.2, accent);
    else ctx.page.drawText(label, { x, y: ctx.y, size: 8.2, font: ctx.bold, color: accent });
  }
  ctx.y -= 28;
}

function drawItemRow(ctx: PdfContext, item: any, position: number, rowHeight: number) {
  const top = ctx.y;
  ctx.page.drawText(String(position), { x: margin + 8, y: top, size: 8.5, font: ctx.font, color: muted });
  let textY = top;
  textY = drawWrapped(ctx.page, ctx.bold, item.title || "", margin + 44, textY, 258, 9.2, 12, slate);
  if (item.description) textY = drawWrapped(ctx.page, ctx.font, item.description, margin + 44, textY - 2, 258, 8.1, 11, muted);

  ctx.page.drawText(formatQuantity(item.quantity, item.unit), { x: margin + 326, y: top, size: 8.5, font: ctx.font, color: slate });
  drawRightText(ctx.page, ctx.font, formatMoney(item.unit_price_cents || 0), margin + 462, top, 8.5, slate);
  drawRightText(ctx.page, ctx.bold, formatMoney(item.line_total_cents || calculatedLineTotal(item)), pageWidth - margin - 8, top, 8.5, slate);
  ctx.page.drawLine({ start: { x: margin, y: top - rowHeight + 10 }, end: { x: pageWidth - margin, y: top - rowHeight + 10 }, thickness: 0.5, color: tableLine });
  ctx.y = top - rowHeight;
}

function drawTotals(ctx: PdfContext, input: PdfInput) {
  ctx.y = ensureSpace(ctx, 150);
  const rows: [string, number, boolean?][] = [
    ["Zwischensumme", input.document.subtotal_cents || sumItems(input.items)],
  ];
  if (Number(input.document.discount_cents || 0) > 0) rows.push(["Rabatt", -Number(input.document.discount_cents), false]);
  if (input.document.vat_enabled) {
    rows.push(["Netto", netAfterDiscount(input.document, input.items), false]);
    rows.push([`MwSt. ${input.document.vat_rate || input.settings.vat_rate || 19} %`, Number(input.document.vat_cents || 0), false]);
  }
  rows.push([input.type === "invoice" ? "Rechnungsbetrag" : "Gesamtbetrag", input.document.total_cents || netAfterDiscount(input.document, input.items), true]);

  const boxX = 328;
  const boxW = pageWidth - margin - boxX;
  const boxH = 28 + rows.length * 20;
  ctx.page.drawRectangle({ x: boxX, y: ctx.y - boxH + 12, width: boxW, height: boxH, borderColor: line, borderWidth: 0.7 });
  let rowY = ctx.y - 10;
  for (const [label, value, isTotal] of rows) {
    if (isTotal) ctx.page.drawRectangle({ x: boxX, y: rowY - 8, width: boxW, height: 24, color: accentSoft });
    ctx.page.drawText(safeText(label), { x: boxX + 14, y: rowY, size: isTotal ? 10.5 : 8.7, font: isTotal ? ctx.bold : ctx.font, color: isTotal ? accent : slate });
    drawRightText(ctx.page, isTotal ? ctx.bold : ctx.font, formatMoney(value), pageWidth - margin - 14, rowY, isTotal ? 10.5 : 8.7, isTotal ? accent : slate);
    rowY -= 20;
  }
  ctx.y -= boxH + 12;
}

function drawNotes(ctx: PdfContext, input: PdfInput) {
  const notes: { title: string; lines: string[] }[] = [];
  if (!input.document.vat_enabled) {
    notes.push({ title: "Steuerhinweis", lines: ["Gemäß § 19 Abs. 1 UStG wird keine Umsatzsteuer ausgewiesen."] });
  }
  if (input.type === "offer") {
    const days = input.settings.default_offer_valid_days || 7;
    notes.push({
      title: "Hinweise zum Angebot",
      lines: [
        `Dieses Angebot ist ${days} Tage ab Angebotsdatum gültig, sofern nichts anderes vereinbart wurde.`,
        "Bei Verbrauchern beginnt die Ausführung vor Ablauf der Widerrufsfrist nur nach ausdrücklicher Zustimmung.",
      ],
    });
    if (input.document.payment_model) notes.push({ title: "Zahlungsmodell", lines: [safeText(String(input.document.payment_model))] });
  }
  if (input.type === "invoice" && input.document.due_date) {
    notes.push({ title: "Zahlungsziel", lines: [`Bitte überweisen Sie den Rechnungsbetrag bis zum ${formatDate(input.document.due_date)}.`] });
  }
  if (input.type === "invoice") {
    const bank = bankLines(input.settings);
    if (bank.length) notes.push({ title: "Bankverbindung", lines: bank });
  }
  if (input.document.notes) notes.push({ title: "Weitere Hinweise", lines: [String(input.document.notes)] });

  for (const note of notes) {
    ctx.y = ensureSpace(ctx, 58 + note.lines.length * 14);
    ctx.page.drawText(note.title, { x: margin, y: ctx.y, size: 10.5, font: ctx.bold, color: accent });
    ctx.y -= 16;
    for (const lineText of note.lines) ctx.y = drawWrapped(ctx.page, ctx.font, lineText, margin, ctx.y, contentWidth, 8.8, 12.5, muted);
    ctx.y -= 8;
  }
}

function drawFooters(pdf: PDFDocument, font: PDFFont, bold: PDFFont, logo: PDFImage | undefined, input: PdfInput) {
  const pages = pdf.getPages();
  pages.forEach((page, index) => {
    page.drawLine({ start: { x: margin, y: footerTop }, end: { x: pageWidth - margin, y: footerTop }, thickness: 0.5, color: line });
    if (logo) {
      const w = 62;
      page.drawImage(logo, { x: margin, y: 32, width: w, height: w / logo.width * logo.height, opacity: 0.88 });
    } else {
      page.drawText("Klickhafen", { x: margin, y: 42, size: 10, font: bold, color: accent });
    }
    const address = [input.settings.street, [input.settings.postal_code, input.settings.city].filter(Boolean).join(" "), input.settings.country].filter(Boolean).join(", ");
    const contact = [input.settings.email, input.settings.website, input.settings.phone].filter(Boolean).join("  |  ");
    const legal = [
      [input.settings.company_name || "Klickhafen", input.settings.owner_name].filter(Boolean).join(" / "),
      address,
      contact,
      input.settings.tax_number ? `Steuernummer: ${input.settings.tax_number}` : "",
      input.settings.vat_id ? `USt-ID: ${input.settings.vat_id}` : "",
      input.settings.small_business_enabled ? "Kleinunternehmerregelung gemäß § 19 UStG" : "",
    ].filter(Boolean);
    let y = 56;
    for (const row of legal.slice(0, 4)) {
      page.drawText(safeText(row), { x: margin + 78, y, size: 7.2, font, color: muted });
      y -= 9.5;
    }
    drawRightText(page, font, `Seite ${index + 1} von ${pages.length}`, pageWidth - margin, 32, 7.5, muted);
  });
}

function ensureSpace(ctx: PdfContext, needed: number) {
  if (ctx.y > footerTop + needed) return ctx.y;
  ctx.page = ctx.pdf.addPage([pageWidth, pageHeight]);
  ctx.pageNumber += 1;
  ctx.y = pageHeight - margin;
  ctx.page.drawText("Klickhafen", { x: margin, y: ctx.y - 8, size: 13, font: ctx.bold, color: accent });
  ctx.page.drawLine({ start: { x: margin, y: ctx.y - 22 }, end: { x: pageWidth - margin, y: ctx.y - 22 }, thickness: 0.6, color: line });
  ctx.y -= 50;
  return ctx.y;
}

function estimateItemHeight(ctx: PdfContext, item: any) {
  const titleLines = wrapLines(ctx.bold, item.title || "", 258, 9.2).length;
  const descLines = item.description ? wrapLines(ctx.font, item.description, 258, 8.1).length : 0;
  return Math.max(34, titleLines * 12 + descLines * 11 + 18);
}

function drawWrapped(page: PDFPage, font: PDFFont, text: string, x: number, y: number, width: number, size: number, lineHeight: number, color = slate) {
  for (const lineText of wrapLines(font, text, width, size)) {
    page.drawText(safeText(lineText), { x, y, size, font, color });
    y -= lineHeight;
  }
  return y;
}

function wrapLines(font: PDFFont, text: string, width: number, size: number) {
  const lines: string[] = [];
  for (const paragraph of String(text || "").split("\n")) {
    const words = paragraph.trim().split(/\s+/).filter(Boolean);
    if (!words.length) {
      lines.push("");
      continue;
    }
    let current = "";
    for (const word of words) {
      const next = current ? `${current} ${word}` : word;
      if (font.widthOfTextAtSize(safeText(next), size) <= width) {
        current = next;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    }
    if (current) lines.push(current);
  }
  return lines;
}

function drawRightText(page: PDFPage, font: PDFFont, text: string, rightX: number, y: number, size: number, color = slate) {
  const value = safeText(text);
  page.drawText(value, { x: rightX - font.widthOfTextAtSize(value, size), y, size, font, color });
}

function hasCompleteCustomerAddress(customer: any) {
  return Boolean((customer.company || customer.last_name || customer.first_name) && customer.street && customer.postal_code && customer.city);
}

function customerLines(customer: any) {
  return [
    customer.company,
    [customer.first_name, customer.last_name].filter(Boolean).join(" "),
    customer.street,
    [customer.postal_code, customer.city].filter(Boolean).join(" "),
    customer.country,
    customer.email,
  ].filter(Boolean).map(String);
}

function documentMetaRows(input: PdfInput) {
  const doc = input.document;
  if (input.type === "offer") {
    return [
      ["Angebotsnummer", doc.offer_number],
      ["Angebotsdatum", formatDate(doc.created_at)],
      ["Gültig bis", formatDate(doc.valid_until)],
    ];
  }
  return [
    ["Rechnungsnummer", doc.invoice_number],
    ["Rechnungsdatum", formatDate(doc.issue_date)],
    doc.service_date ? ["Leistungsdatum", formatDate(doc.service_date)] : null,
    doc.due_date ? ["Fällig am", formatDate(doc.due_date)] : null,
  ].filter(Boolean) as string[][];
}

function senderLine(settings: PdfSettings) {
  return [settings.company_name, settings.owner_name, settings.street, [settings.postal_code, settings.city].filter(Boolean).join(" ")].filter(Boolean).join(" | ");
}

function bankLines(settings: PdfSettings) {
  return [
    settings.bank_account_holder ? `Empfänger: ${settings.bank_account_holder}` : null,
    settings.bank_iban ? `IBAN: ${settings.bank_iban}` : null,
    settings.bank_bic ? `BIC: ${settings.bank_bic}` : null,
    settings.bank_name ? `Bank: ${settings.bank_name}` : null,
  ].filter(Boolean) as string[];
}

function sumItems(items: any[]) {
  return items.reduce((sum, item) => sum + calculatedLineTotal(item), 0);
}

function calculatedLineTotal(item: any) {
  return Math.round(Number(item.quantity || 0) * Number(item.unit_price_cents || 0));
}

function netAfterDiscount(document: any, items: any[]) {
  return Number(document.subtotal_cents || sumItems(items)) - Number(document.discount_cents || 0);
}

function formatDate(value?: string) {
  if (!value) return "";
  return new Intl.DateTimeFormat("de-DE", { dateStyle: "medium" }).format(new Date(value));
}

function formatQuantity(quantity: number, unit?: string) {
  const formatted = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 2 }).format(Number(quantity || 0));
  return `${formatted}${unit ? ` ${unit}` : ""}`;
}

function formatMoney(cents: number) {
  return `${new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Number(cents || 0) / 100)} €`;
}

function sanitizeFilename(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\wäöüÄÖÜß-]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .slice(0, 80);
}

function safeText(value: string) {
  return String(value || "")
    .replace(/[“”„]/g, '"')
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/\u00a0/g, " ");
}
