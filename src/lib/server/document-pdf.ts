import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";

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

const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 46;
const cyan = rgb(0.055, 0.455, 0.565);
const slate = rgb(0.02, 0.024, 0.035);
const muted = rgb(0.39, 0.45, 0.55);
const line = rgb(0.82, 0.86, 0.9);

export async function generateDocumentPdf(input: PdfInput) {
  validateInput(input);
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  let page = pdf.addPage([pageWidth, pageHeight]);
  let y = pageHeight - margin;

  const ctx = { pdf, font, bold, page, y };
  drawHeader(ctx, input);
  y = ctx.y - 28;

  y = drawAddressBlock(page, font, bold, input, y);
  y -= 22;
  y = drawDocumentInfo(page, font, bold, input, y);
  y -= 24;
  y = drawTextSection(page, font, bold, input.document.title || (input.type === "offer" ? "Angebot" : "Rechnung"), input.document.description || "", y);
  y -= 16;

  const tableResult = drawItemsTable(pdf, page, font, bold, input.items, y);
  page = tableResult.page;
  y = tableResult.y - 20;

  const totalsResult = drawTotals(pdf, page, font, bold, input, y);
  page = totalsResult.page;
  y = totalsResult.y - 20;

  const notesResult = drawNotes(pdf, page, font, bold, input, y);
  page = notesResult.page;

  for (const p of pdf.getPages()) drawFooter(p, font, input.settings);
  return pdf.save();
}

export function documentPdfFilename(type: "offer" | "invoice", document: any, customer: any) {
  const number = type === "offer" ? document.offer_number : document.invoice_number;
  const base = type === "offer" ? "Angebot" : "Rechnung";
  const customerPart = (customer?.company || customer?.last_name || customer?.email || "")
    .toString()
    .replace(/[^a-zA-Z0-9äöüÄÖÜß-]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return `${base}_${number || "Dokument"}_Klickhafen${customerPart ? `_${customerPart}` : ""}.pdf`;
}

function validateInput({ type, document, items, customer, settings }: PdfInput) {
  if (!document) throw new Error("Dokument wurde nicht gefunden.");
  if (!customer) throw new Error("Bitte zuerst einen Kunden auswählen oder Kundendaten ergänzen.");
  if (!items.length) throw new Error("Bitte mindestens eine Position ergänzen.");
  if (items.some((item) => !item.title || Number(item.quantity) < 0 || Number(item.unit_price_cents) < 0)) {
    throw new Error("Bitte Positionstitel, Menge und Preise prüfen.");
  }
  if (!settings.company_name || !settings.email || !settings.website) {
    throw new Error("Bitte Unternehmensdaten in den Einstellungen ergänzen.");
  }
  if (type === "invoice" && !document.invoice_number) throw new Error("Bitte zuerst eine Rechnungsnummer speichern.");
  if (type === "offer" && !document.offer_number) throw new Error("Bitte zuerst eine Angebotsnummer speichern.");
}

function drawHeader(ctx: { page: PDFPage; font: PDFFont; bold: PDFFont; y: number }, input: PdfInput) {
  const label = input.type === "offer" ? "Angebot" : "Rechnung";
  const number = input.type === "offer" ? input.document.offer_number : input.document.invoice_number;
  ctx.page.drawText("Klickhafen", { x: margin, y: ctx.y, size: 22, font: ctx.bold, color: cyan });
  ctx.page.drawText(settingsLine(input.settings), { x: margin, y: ctx.y - 18, size: 8.5, font: ctx.font, color: muted });
  ctx.page.drawText(label, { x: 420, y: ctx.y, size: 24, font: ctx.bold, color: slate });
  ctx.page.drawText(number || "", { x: 420, y: ctx.y - 18, size: 10, font: ctx.font, color: muted });
  ctx.page.drawLine({ start: { x: margin, y: ctx.y - 34 }, end: { x: pageWidth - margin, y: ctx.y - 34 }, thickness: 1, color: line });
  ctx.y -= 54;
}

function drawAddressBlock(page: PDFPage, font: PDFFont, bold: PDFFont, input: PdfInput, y: number) {
  page.drawText("Kunde", { x: margin, y, size: 10, font: bold, color: cyan });
  const customerLines = [
    input.customer.company,
    [input.customer.first_name, input.customer.last_name].filter(Boolean).join(" "),
    input.customer.street,
    [input.customer.postal_code, input.customer.city].filter(Boolean).join(" "),
    input.customer.country,
    input.customer.email,
  ].filter(Boolean);
  return drawLines(page, font, customerLines, margin, y - 16, 10, 14);
}

function drawDocumentInfo(page: PDFPage, font: PDFFont, bold: PDFFont, input: PdfInput, y: number) {
  const dateLabel = input.type === "offer" ? "Angebotsdatum" : "Rechnungsdatum";
  const dateValue = input.type === "offer" ? input.document.created_at : input.document.issue_date || input.document.created_at;
  const rows = [
    [dateLabel, formatDate(dateValue)],
    input.type === "offer" ? ["Gültig bis", formatDate(input.document.valid_until)] : null,
    input.type === "invoice" && input.document.due_date ? ["Fällig am", formatDate(input.document.due_date)] : null,
    ["Status", input.document.status || ""],
  ].filter(Boolean) as string[][];
  page.drawText("Dokument", { x: margin, y, size: 10, font: bold, color: cyan });
  let nextY = y - 16;
  for (const [label, value] of rows) {
    page.drawText(label, { x: margin, y: nextY, size: 9, font: bold, color: slate });
    page.drawText(value || "-", { x: 150, y: nextY, size: 9, font, color: slate });
    nextY -= 14;
  }
  return nextY;
}

function drawTextSection(page: PDFPage, font: PDFFont, bold: PDFFont, title: string, text: string, y: number) {
  page.drawText(title, { x: margin, y, size: 15, font: bold, color: slate });
  if (!text) return y - 18;
  return drawWrapped(page, font, text, margin, y - 18, pageWidth - margin * 2, 10, 14);
}

function drawItemsTable(pdf: PDFDocument, page: PDFPage, font: PDFFont, bold: PDFFont, items: any[], y: number) {
  const headers = ["Leistung", "Menge", "Einzelpreis", "Gesamt"];
  const cols = [margin, 315, 380, 475];
  let current = ensureSpace(pdf, page, y, 90);
  page = current.page;
  y = current.y;
  page.drawText("Positionen", { x: margin, y, size: 12, font: bold, color: cyan });
  y -= 22;
  page.drawRectangle({ x: margin, y: y - 7, width: pageWidth - margin * 2, height: 22, color: rgb(0.94, 0.97, 0.98) });
  headers.forEach((header, index) => page.drawText(header, { x: cols[index], y, size: 9, font: bold, color: slate }));
  y -= 22;
  for (const item of items) {
    current = ensureSpace(pdf, page, y, 58);
    page = current.page;
    y = current.y;
    const titleY = drawWrapped(page, bold, item.title || "", cols[0], y, 250, 9, 12);
    const descY = item.description ? drawWrapped(page, font, item.description, cols[0], titleY - 2, 250, 8, 11) : titleY;
    page.drawText(formatQuantity(item.quantity, item.unit), { x: cols[1], y, size: 9, font, color: slate });
    page.drawText(formatMoney(item.unit_price_cents || 0), { x: cols[2], y, size: 9, font, color: slate });
    page.drawText(formatMoney(item.line_total_cents || 0), { x: cols[3], y, size: 9, font: bold, color: slate });
    y = Math.min(descY, y - 28);
    page.drawLine({ start: { x: margin, y: y + 8 }, end: { x: pageWidth - margin, y: y + 8 }, thickness: 0.5, color: line });
    y -= 8;
  }
  return { page, y };
}

function drawTotals(pdf: PDFDocument, page: PDFPage, font: PDFFont, bold: PDFFont, input: PdfInput, y: number) {
  let current = ensureSpace(pdf, page, y, 130);
  page = current.page;
  y = current.y;
  const x = 345;
  const rows = [
    ["Zwischensumme", input.document.subtotal_cents],
    input.document.discount_cents > 0 ? ["Rabatt", -input.document.discount_cents] : null,
    input.document.vat_enabled ? [`MwSt. ${input.document.vat_rate || input.settings.vat_rate || 19} %`, input.document.vat_cents] : null,
    ["Gesamtbetrag", input.document.total_cents],
  ].filter(Boolean) as [string, number][];
  for (const [label, cents] of rows) {
    const isTotal = label === "Gesamtbetrag";
    page.drawText(label, { x, y, size: isTotal ? 11 : 9, font: isTotal ? bold : font, color: slate });
    page.drawText(formatMoney(cents), { x: 470, y, size: isTotal ? 11 : 9, font: isTotal ? bold : font, color: slate });
    y -= isTotal ? 18 : 14;
  }
  return { page, y };
}

function drawNotes(pdf: PDFDocument, page: PDFPage, font: PDFFont, bold: PDFFont, input: PdfInput, y: number) {
  let current = ensureSpace(pdf, page, y, 150);
  page = current.page;
  y = current.y;
  const notes = [];
  if (input.type === "offer") {
    const days = input.settings.default_offer_valid_days || 7;
    notes.push(`Dieses Angebot ist ${days} Tage ab Angebotsdatum gültig, sofern nichts anderes vereinbart wurde.`);
    notes.push("Bei Verbrauchern beginnt die Ausführung vor Ablauf der Widerrufsfrist nur nach ausdrücklicher Zustimmung.");
  }
  if (!input.document.vat_enabled) notes.push("Gemäß § 19 Abs. 1 UStG wird keine Umsatzsteuer ausgewiesen.");
  if (input.document.notes) notes.push(input.document.notes);
  if (input.type === "invoice") {
    const bank = [
      input.settings.bank_account_holder ? `Kontoinhaber: ${input.settings.bank_account_holder}` : null,
      input.settings.bank_iban ? `IBAN: ${input.settings.bank_iban}` : null,
      input.settings.bank_bic ? `BIC: ${input.settings.bank_bic}` : null,
      input.settings.bank_name ? `Bank: ${input.settings.bank_name}` : null,
    ].filter(Boolean);
    if (bank.length) notes.push(`Bankverbindung\n${bank.join("\n")}`);
  }
  page.drawText("Hinweise", { x: margin, y, size: 11, font: bold, color: cyan });
  y -= 16;
  for (const note of notes) y = drawWrapped(page, font, note, margin, y, pageWidth - margin * 2, 9, 13) - 6;
  return { page, y };
}

function drawFooter(page: PDFPage, font: PDFFont, settings: PdfSettings) {
  const y = 34;
  page.drawLine({ start: { x: margin, y: y + 18 }, end: { x: pageWidth - margin, y: y + 18 }, thickness: 0.5, color: line });
  const text = [
    settings.company_name || "Klickhafen",
    settings.owner_name,
    settings.email,
    settings.website,
    settings.phone,
  ].filter(Boolean).join(" · ");
  drawWrapped(page, font, text, margin, y, pageWidth - margin * 2, 7.5, 10);
}

function settingsLine(settings: PdfSettings) {
  return [settings.owner_name, settings.street, [settings.postal_code, settings.city].filter(Boolean).join(" "), settings.country].filter(Boolean).join(" · ");
}

function drawLines(page: PDFPage, font: PDFFont, lines: string[], x: number, y: number, size: number, lineHeight: number) {
  for (const value of lines) {
    page.drawText(String(value), { x, y, size, font, color: slate });
    y -= lineHeight;
  }
  return y;
}

function drawWrapped(page: PDFPage, font: PDFFont, text: string, x: number, y: number, width: number, size: number, lineHeight: number) {
  for (const paragraph of String(text).split("\n")) {
    const words = paragraph.split(/\s+/);
    let lineText = "";
    for (const word of words) {
      const candidate = lineText ? `${lineText} ${word}` : word;
      if (font.widthOfTextAtSize(candidate, size) > width && lineText) {
        page.drawText(lineText, { x, y, size, font, color: slate });
        y -= lineHeight;
        lineText = word;
      } else {
        lineText = candidate;
      }
    }
    if (lineText) {
      page.drawText(lineText, { x, y, size, font, color: slate });
      y -= lineHeight;
    } else {
      y -= lineHeight;
    }
  }
  return y;
}

function ensureSpace(pdf: PDFDocument, page: PDFPage, y: number, needed: number) {
  if (y > margin + needed) return { page, y };
  const next = pdf.addPage([pageWidth, pageHeight]);
  return { page: next, y: pageHeight - margin };
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
  return `${new Intl.NumberFormat("de-DE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format((cents || 0) / 100)} EUR`;
}
