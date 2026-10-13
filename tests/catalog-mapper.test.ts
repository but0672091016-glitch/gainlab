import assert from "node:assert/strict";
import test from "node:test";
import { mapDatabaseCatalog } from "../lib/catalog-mapper";

test("database catalog is mapped to the existing storefront contract", () => {
  const catalog = mapDatabaseCatalog({
    categories: [{ slug: "nutrition", name: "Спортивне харчування", eyebrow: "Протеїни" }],
    sections: [{ slug: "protein", name: "Протеїни", description: "Сироваткові", category: { slug: "nutrition" } }],
    products: [{
      id: "database-whey",
      slug: "database-whey",
      name: "Database Whey",
      description: "Товар, завантажений із тестової бази даних.",
      packageLabel: "900 г",
      optionLabel: "Смак",
      price: "1290.00",
      oldPrice: "1490.00",
      stock: 3,
      isDemo: true,
      isFeatured: true,
      isRecommended: true,
      isNew: false,
      artLabel: "DB WHEY",
      artTone: "lime",
      category: { slug: "nutrition" },
      section: { slug: "protein" },
      brand: { name: "GainLab Demo" },
      variants: [{ value: "Ваніль", position: 1 }, { value: "Шоколад", position: 0 }],
    }],
  });

  assert.equal(catalog.source, "database");
  assert.equal(catalog.categories.at(-1)?.id, "brands");
  assert.equal(catalog.products[0].stock, "low");
  assert.deepEqual(catalog.products[0].tags, ["hits", "sale", "recommended"]);
  assert.deepEqual(catalog.products[0].options, ["Шоколад", "Ваніль"]);
  assert.equal(catalog.products[0].price, 1290);
});

test("unknown hierarchy records are excluded instead of breaking the storefront", () => {
  const catalog = mapDatabaseCatalog({
    categories: [{ slug: "unknown", name: "Unknown", eyebrow: null }],
    sections: [{ slug: "unknown", name: "Unknown", description: null, category: { slug: "unknown" } }],
    products: [],
  });

  assert.deepEqual(catalog.categories.map((category) => category.id), ["brands"]);
  assert.deepEqual(catalog.sections, []);
  assert.deepEqual(catalog.products, []);
});
