import { catalogSections, categories, products } from "../lib/demo-data";

const quote = (value: string | null | undefined) => value == null ? "NULL" : `'${value.replaceAll("'", "''")}'`;
const boolean = (value: boolean) => value ? "TRUE" : "FALSE";
const skuPart = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "");
const stockAmount = { "in-stock": 12, low: 3, out: 0 } as const;

const statements: string[] = [
  "-- Generated from lib/demo-data.ts. All records are explicitly demonstrational.",
];

const sellableCategories = categories.filter((category) => category.id !== "brands");
statements.push(`INSERT INTO "Category" ("id", "slug", "name", "eyebrow", "position", "isActive", "updatedAt") VALUES\n${sellableCategories.map((category, position) => `  (${quote(category.id)}, ${quote(category.id)}, ${quote(category.name)}, ${quote(category.eyebrow)}, ${position}, TRUE, CURRENT_TIMESTAMP)`).join(",\n")};`);

statements.push(`INSERT INTO "CatalogSection" ("id", "slug", "name", "description", "position", "isActive", "categoryId", "updatedAt") VALUES\n${catalogSections.map((section, position) => `  (${quote(section.id)}, ${quote(section.id)}, ${quote(section.name)}, ${quote(section.description)}, ${position}, TRUE, ${quote(section.categoryId)}, CURRENT_TIMESTAMP)`).join(",\n")};`);

statements.push(`INSERT INTO "Brand" ("id", "slug", "name", "isActive", "updatedAt") VALUES\n  ('gainlab-demo', 'gainlab-demo', 'GainLab Demo', TRUE, CURRENT_TIMESTAMP);`);

statements.push(`INSERT INTO "Product" ("id", "sku", "slug", "name", "description", "packageLabel", "optionLabel", "price", "oldPrice", "stock", "status", "isDemo", "isFeatured", "isRecommended", "isNew", "artLabel", "artTone", "categoryId", "sectionId", "brandId", "updatedAt") VALUES\n${products.map((product) => `  (${quote(product.id)}, ${quote(`${skuPart(product.id)}-BASE`)}, ${quote(product.slug)}, ${quote(product.name)}, ${quote(product.summary)}, ${quote(product.packageLabel)}, ${quote(product.optionLabel)}, ${product.price.toFixed(2)}, ${product.oldPrice?.toFixed(2) ?? "NULL"}, ${stockAmount[product.stock]}, 'ACTIVE', ${boolean(product.isDemo)}, ${boolean(product.tags.includes("hits"))}, ${boolean(product.tags.includes("recommended"))}, ${boolean(product.tags.includes("new"))}, ${quote(product.artLabel)}, ${quote(product.artTone)}, ${quote(product.categoryId)}, ${quote(product.sectionId)}, 'gainlab-demo', CURRENT_TIMESTAMP)`).join(",\n")};`);

const variants = products.flatMap((product) => (product.options ?? []).map((value, position) => ({ product, value, position })));
if (variants.length > 0) {
  statements.push(`INSERT INTO "ProductVariant" ("id", "sku", "name", "value", "priceDelta", "stock", "position", "productId") VALUES\n${variants.map(({ product, value, position }) => `  (${quote(`${product.id}-variant-${position + 1}`)}, ${quote(`${skuPart(product.id)}-${skuPart(value)}`)}, ${quote(product.optionLabel ?? "Варіант")}, ${quote(value)}, 0.00, ${stockAmount[product.stock]}, ${position}, ${quote(product.id)})`).join(",\n")};`);
}

statements.push("INSERT INTO \"Banner\" (\"id\", \"title\", \"subtitle\", \"linkUrl\", \"position\", \"isDemo\", \"updatedAt\") VALUES ('demo-stage-one-banner', 'Формула сильного старту', 'Тестовий банер етапу 1.', '/#popular', 1, TRUE, CURRENT_TIMESTAMP);");
statements.push("INSERT INTO \"Supplier\" (\"id\", \"name\", \"code\", \"isActive\", \"updatedAt\") VALUES ('demo-supplier', 'Тестовий постачальник', 'demo-supplier', FALSE, CURRENT_TIMESTAMP);");

process.stdout.write(`${statements.join("\n\n")}\n`);
