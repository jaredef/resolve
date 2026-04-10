/**
 * Generates JSONL seed data for the HTX Faster store.
 * 1000 collections → 10000 categories → 100000 products
 * All properly linked via slug references + parentSlug for indexing.
 *
 * Usage: bun scripts/seed-convex-store.ts
 * Output: scripts/fp-seed.jsonl
 * Import: bunx convex import --table content scripts/fp-seed.jsonl
 */

const COLLECTIONS = 1000;
const CATEGORIES_PER_COLLECTION = 10;
const PRODUCTS_PER_CATEGORY = 10;

const now = "2026-03-31 12:00:00";

// ── Word lists for combinatorial name generation ──

const adjectives = [
  "Premium", "Classic", "Modern", "Vintage", "Essential", "Deluxe", "Elite",
  "Artisan", "Custom", "Signature", "Organic", "Professional", "Everyday",
  "Luxury", "Compact", "Urban", "Rustic", "Sleek", "Bold", "Refined",
  "Handcrafted", "Eco", "Smart", "Advanced", "Portable", "Heavy-Duty",
  "Lightweight", "Ultra", "Mini", "Grand", "Natural", "Industrial",
  "Heritage", "Contemporary", "Tactical", "Nordic", "Coastal", "Alpine",
  "Tropical", "Metro", "Solar", "Flex", "Prime", "Nova", "Apex",
  "Zen", "Vivid", "Core", "Edge", "Pure",
];

const domains = [
  "Electronics", "Clothing", "Home", "Garden", "Sports", "Kitchen",
  "Office", "Outdoors", "Fitness", "Audio", "Photography", "Art",
  "Music", "Travel", "Automotive", "Pet", "Baby", "Health", "Beauty",
  "Toys", "Gaming", "Craft", "Tools", "Lighting", "Furniture",
  "Bedding", "Bath", "Storage", "Decor", "Jewelry", "Watches",
  "Bags", "Shoes", "Eyewear", "Tech", "Robotics", "Cycling",
  "Camping", "Fishing", "Hiking", "Running", "Yoga", "Swim",
  "Dance", "Studio", "Workshop", "Garage", "Patio", "Balcony", "Rooftop",
];

const categoryNouns = [
  "Accessories", "Essentials", "Gear", "Supplies", "Equipment", "Kits",
  "Sets", "Components", "Parts", "Bundles", "Basics", "Staples",
  "Tools", "Gadgets", "Devices", "Instruments", "Fixtures", "Fittings",
  "Materials", "Fabrics", "Hardware", "Software", "Apparel", "Footwear",
  "Headwear", "Outerwear", "Activewear", "Loungewear", "Sportswear",
  "Workwear",
];

const productPrefixes = [
  "Pro", "Max", "Air", "Lite", "Plus", "X", "S", "V", "Z", "One",
  "Neo", "Duo", "Tri", "Ion", "Arc", "Flux", "Bolt", "Wave", "Peak",
  "Pulse", "Drift", "Spark", "Blaze", "Storm", "Frost", "Echo",
  "Vibe", "Rush", "Glow", "Zen",
];

const productTypes = [
  "Hub", "Pad", "Band", "Ring", "Case", "Cover", "Mount", "Stand",
  "Dock", "Clip", "Grip", "Strap", "Holder", "Wrap", "Shield",
  "Guard", "Frame", "Panel", "Module", "Unit", "Sensor", "Charger",
  "Adapter", "Cable", "Link", "Connector", "Sleeve", "Pouch", "Box",
  "Rack",
];

const colors = [
  "#e74c3c", "#e67e22", "#f1c40f", "#2ecc71", "#1abc9c", "#3498db",
  "#9b59b6", "#34495e", "#e91e63", "#00bcd4", "#8bc34a", "#ff9800",
  "#795548", "#607d8b", "#673ab7", "#009688", "#ff5722", "#4caf50",
  "#2196f3", "#9c27b0",
];

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function pick<T>(arr: T[], index: number): T {
  return arr[index % arr.length];
}

// Deterministic but varied price generation
function price(seed: number): string {
  const base = ((seed * 7919 + 104729) % 49900) + 99; // 0.99 to 499.99
  return (base / 100).toFixed(2);
}

// ── Generate ──

const output = Bun.file("scripts/fp-seed.jsonl");
const writer = output.writer();

let totalCollections = 0;
let totalCategories = 0;
let totalProducts = 0;

for (let c = 0; c < COLLECTIONS; c++) {
  const adj = pick(adjectives, c);
  const dom = pick(domains, Math.floor(c / adjectives.length) + c);
  const collTitle = `${adj} ${dom}`;
  const collSlug = slugify(collTitle) + `-${c}`;
  const color = pick(colors, c);
  const collSummary = `${adj} ${dom.toLowerCase()} for every occasion.`;

  writer.write(JSON.stringify({
    type: "fp-collection",
    slug: collSlug,
    title: collTitle,
    body: "",
    status: "published",
    meta: { color, summary: collSummary },
    parentSlug: "",
    createdAt: now,
    updatedAt: now,
  }) + "\n");
  totalCollections++;

  for (let cat = 0; cat < CATEGORIES_PER_COLLECTION; cat++) {
    const catNoun = pick(categoryNouns, cat + c);
    const catAdj = pick(adjectives, cat * 3 + c * 7);
    const catTitle = `${catAdj} ${dom} ${catNoun}`;
    const catSlug = slugify(catTitle) + `-${c * CATEGORIES_PER_COLLECTION + cat}`;
    const catSummary = `${catAdj} ${catNoun.toLowerCase()} for ${dom.toLowerCase()}.`;

    writer.write(JSON.stringify({
      type: "fp-category",
      slug: catSlug,
      title: catTitle,
      body: "",
      status: "published",
      meta: { collection_slug: collSlug, summary: catSummary },
      parentSlug: collSlug,
      createdAt: now,
      updatedAt: now,
    }) + "\n");
    totalCategories++;

    for (let p = 0; p < PRODUCTS_PER_CATEGORY; p++) {
      const globalIdx = c * CATEGORIES_PER_COLLECTION * PRODUCTS_PER_CATEGORY + cat * PRODUCTS_PER_CATEGORY + p;
      const prefix = pick(productPrefixes, p + cat * 3 + c);
      const pType = pick(productTypes, p * 7 + cat + c * 3);
      const prodTitle = `${prefix} ${pType} ${globalIdx}`;
      const prodSlug = slugify(prodTitle);
      const prodPrice = price(globalIdx);
      const prodBody = `High-quality ${prefix.toLowerCase()} ${pType.toLowerCase()} from the ${catTitle} line. Built for performance and durability.`;

      writer.write(JSON.stringify({
        type: "fp-product",
        slug: prodSlug,
        title: prodTitle,
        body: prodBody,
        status: "published",
        meta: { category_slug: catSlug, price: prodPrice },
        parentSlug: catSlug,
        createdAt: now,
        updatedAt: now,
      }) + "\n");
      totalProducts++;
    }
  }
}

await writer.flush();
writer.end();

console.log(`Generated fp-seed.jsonl`);
console.log(`  Collections: ${totalCollections}`);
console.log(`  Categories:  ${totalCategories}`);
console.log(`  Products:    ${totalProducts}`);
console.log(`  Total:       ${totalCollections + totalCategories + totalProducts}`);

const stat = await Bun.file("scripts/fp-seed.jsonl").stat();
if (stat) console.log(`  File size:   ${(stat.size / 1024 / 1024).toFixed(1)} MB`);
