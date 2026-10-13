import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { catalogSections, categories, products } from "../lib/demo-data";

const prismaSchemaMigration = readFileSync(
  "prisma/migrations/20261013090000_init/migration.sql",
  "utf8",
);
const netlifySchemaMigration = readFileSync(
  "netlify/database/migrations/20261013090000_init/migration.sql",
  "utf8",
);
const netlifySeedMigration = readFileSync(
  "netlify/database/migrations/20261013120000_seed-demo-catalog/migration.sql",
  "utf8",
);

test("Netlify and Prisma start from the same database schema", () => {
  assert.equal(netlifySchemaMigration.trimEnd(), prismaSchemaMigration.trimEnd());
  assert.match(netlifySchemaMigration, /CREATE TABLE "Product"/);
  assert.match(netlifySchemaMigration, /CREATE TABLE "CatalogSection"/);
});

test("Netlify seed includes every demo category, section, product, and option", () => {
  for (const category of categories.filter((item) => item.id !== "brands")) {
    assert.ok(netlifySeedMigration.includes(`('${category.id}',`), `missing category ${category.id}`);
  }

  for (const section of catalogSections) {
    assert.ok(netlifySeedMigration.includes(`('${section.id}',`), `missing section ${section.id}`);
  }

  for (const product of products) {
    assert.ok(netlifySeedMigration.includes(`('${product.id}',`), `missing product ${product.id}`);

    for (let index = 0; index < (product.options?.length ?? 0); index += 1) {
      assert.ok(
        netlifySeedMigration.includes(`('${product.id}-variant-${index + 1}',`),
        `missing variant ${index + 1} for ${product.id}`,
      );
    }
  }
});
