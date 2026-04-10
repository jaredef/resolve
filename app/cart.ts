import type { SQLiteAdapter } from "@htx/adapter-sqlite";

interface CartItem {
  slug: string;
  quantity: number;
}

interface DetailedCartItem {
  slug: string;
  title: string;
  price: string;
  quantity: number;
  lineTotal: string;
  summary: string;
}

const COOKIE_NAME = "htx_cart";
const COOKIE_MAX_AGE = 604800; // 1 week

export function readCart(cookieHeader: string | null): CartItem[] {
  if (!cookieHeader) return [];

  const match = cookieHeader.split(";").find((c) => c.trim().startsWith(`${COOKIE_NAME}=`));
  if (!match) return [];

  try {
    const value = decodeURIComponent(match.split("=").slice(1).join("=").trim());
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item: unknown) =>
        item &&
        typeof item === "object" &&
        typeof (item as CartItem).slug === "string" &&
        typeof (item as CartItem).quantity === "number",
    );
  } catch {
    return [];
  }
}

function serializeCookie(cart: CartItem[]): string {
  const value = encodeURIComponent(JSON.stringify(cart));
  return `${COOKIE_NAME}=${value}; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Strict; HttpOnly`;
}

export function cartCount(cookieHeader: string | null): number {
  return readCart(cookieHeader).reduce((sum, item) => sum + item.quantity, 0);
}

export function addToCart(cookieHeader: string | null, slug: string): string {
  const cart = readCart(cookieHeader);
  const existing = cart.find((item) => item.slug === slug);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ slug, quantity: 1 });
  }

  return serializeCookie(cart);
}

export function removeFromCart(cookieHeader: string | null, slug: string): string {
  const cart = readCart(cookieHeader).filter((item) => item.slug !== slug);
  return serializeCookie(cart);
}

export function detailedCart(cookieHeader: string | null, adapter: SQLiteAdapter): DetailedCartItem[] {
  const cart = readCart(cookieHeader);
  if (cart.length === 0) return [];

  const items: DetailedCartItem[] = [];
  for (const cartItem of cart) {
    const row = adapter.findBySlug("store-product", cartItem.slug);
    if (!row) continue;

    const price = String(row.price ?? "0");
    const lineTotal = (parseFloat(price) * cartItem.quantity).toFixed(2);

    items.push({
      slug: cartItem.slug,
      title: String(row.title ?? ""),
      price,
      quantity: cartItem.quantity,
      lineTotal,
      summary: String(row.summary ?? ""),
    });
  }

  return items;
}

export function cartTotal(items: DetailedCartItem[]): string {
  return items.reduce((sum, item) => sum + parseFloat(item.lineTotal), 0).toFixed(2);
}
