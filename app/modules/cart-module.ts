import type { Module, ModuleRegistry, Middleware, NextMiddleware, ContextProvider, HtxRequest, HtxResponse } from "@htx/engine";
import type { SQLiteAdapter } from "@htx/adapter-sqlite";
import { readCart, addToCart, removeFromCart, detailedCart, cartTotal, cartCount } from "../cart";

class CartMiddleware implements Middleware {
  private readonly adapter: SQLiteAdapter;

  constructor(adapter: SQLiteAdapter) {
    this.adapter = adapter;
  }

  async handle(request: HtxRequest, next: NextMiddleware): Promise<HtxResponse> {
    if (request.path === "/api/cart/add" && request.method === "POST") {
      return this.handleAdd(request);
    }

    if (request.path === "/api/cart/remove" && request.method === "POST") {
      return this.handleRemove(request);
    }

    return next(request);
  }

  private handleAdd(request: HtxRequest): HtxResponse {
    const slug = String(request.body.slug ?? "");
    if (!slug) {
      return { status: 400, body: "Missing slug", headers: { "Content-Type": "text/plain" } };
    }

    const cookieHeader = request.headers.cookie ?? request.headers.Cookie ?? "";
    const setCookie = addToCart(cookieHeader || null, slug);
    const count = cartCount(cookieHeader || null) + 1;
    const isHtmx = Boolean(request.headers["HX-Request"] || request.headers["hx-request"]);

    if (isHtmx) {
      return {
        status: 200,
        body: `<span class="cart-badge" id="cart-badge" hx-swap-oob="true">${count}</span><div class="add-to-cart-success">Added to cart!</div>`,
        headers: { "Content-Type": "text/html; charset=UTF-8" },
        cookies: [setCookie],
      };
    }

    return {
      status: 302,
      body: "",
      headers: { Location: "/store/cart" },
      cookies: [setCookie],
    };
  }

  private handleRemove(request: HtxRequest): HtxResponse {
    const slug = String(request.body.slug ?? "");
    const cookieHeader = request.headers.cookie ?? request.headers.Cookie ?? "";
    const setCookie = removeFromCart(cookieHeader || null, slug);

    return {
      status: 302,
      body: "",
      headers: { Location: "/store/cart" },
      cookies: [setCookie],
    };
  }
}

class CartContextProvider implements ContextProvider {
  private readonly adapter: SQLiteAdapter;

  constructor(adapter: SQLiteAdapter) {
    this.adapter = adapter;
  }

  resolve(request: HtxRequest): Record<string, unknown> {
    const cookieHeader = request.headers.cookie ?? request.headers.Cookie ?? "";
    const items = detailedCart(cookieHeader || null, this.adapter);
    const total = cartTotal(items);
    const count = items.reduce((s, i) => s + i.quantity, 0);

    return { count, total, items };
  }
}

export class CartModule implements Module {
  private readonly adapter: SQLiteAdapter;

  constructor(adapter: SQLiteAdapter) {
    this.adapter = adapter;
  }

  name(): string {
    return "cart";
  }

  boot(registry: ModuleRegistry): void {
    registry.registerMiddleware(new CartMiddleware(this.adapter));
    registry.registerContextProvider("cart", new CartContextProvider(this.adapter));
    registry.registerFunction("formatPrice", (value: unknown) => "$" + Number(value).toFixed(2));
  }
}
