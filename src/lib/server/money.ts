export type LineItemInput = {
  title: string;
  description?: string;
  quantity: number;
  unit_price: number;
};

export function euroToCents(value: number) {
  return Math.round(value * 100);
}

export function centsToEuro(cents: number) {
  return new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format((cents || 0) / 100);
}

export function calculateTotals(items: LineItemInput[], discountPercent = 0, vatEnabled = false, vatRate = 19) {
  const subtotal = items.reduce((sum, item) => sum + euroToCents(item.quantity * item.unit_price), 0);
  const discount = Math.max(0, Math.round(subtotal * (Math.max(0, discountPercent) / 100)));
  const afterDiscount = Math.max(0, subtotal - discount);
  const vat = vatEnabled ? Math.round(afterDiscount * (vatRate / 100)) : 0;
  const total = afterDiscount + vat;

  return {
    subtotal_cents: subtotal,
    discount_cents: discount,
    vat_cents: vat,
    total_cents: total,
  };
}
