import site from '@/data/site.json';
import businesses from '@/data/businesses.json';

export { site, businesses };

/** Every product across all verticals, tagged with its parent business name. */
export const allProducts = businesses.flatMap((biz) =>
  biz.products.map((p) => ({ ...p, business: biz.name })),
);

/* ── Contact deep links ───────────────────────────────────────────────── */

/** wa.me deep link. Works on the mobile app and WhatsApp Web alike. */
export function waLink(message) {
  const base = `https://wa.me/${site.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telLink = `tel:${site.phoneRaw}`;
export const mailLink = `mailto:${site.email}`;

export const generalEnquiry = `Hello ${site.name}, I would like to know more about your business verticals and products.`;

/** Pre-filled enquiry text so the desk receives context, not a bare "hi". */
export function productEnquiry(product) {
  if (!product) return generalEnquiry;
  const subject = product.name;
  return `Hello ${site.name}, I would like a quotation for ${subject}. Please share price, MOQ and delivery timeline.`;
}

/* ── Formatting ───────────────────────────────────────────────────────── */

export function formatNumber(value) {
  if (value == null || Number.isNaN(value)) return '--';
  return Number(value).toLocaleString('en-IN');
}
