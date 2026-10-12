import assert from "node:assert/strict";
import test from "node:test";
import { catalogSections, categories, products } from "../lib/demo-data";

test("all storefront products are explicitly marked as demo", () => {
  assert.ok(products.length > 0);
  assert.ok(products.every((product) => product.isDemo));
});

test("product and category identifiers are unique", () => {
  assert.equal(new Set(products.map((product) => product.id)).size, products.length);
  assert.equal(new Set(products.map((product) => product.slug)).size, products.length);
  assert.equal(new Set(categories.map((category) => category.id)).size, categories.length);
});

test("discounted demo prices decrease rather than increase", () => {
  for (const product of products) {
    if (product.oldPrice) assert.ok(product.oldPrice > product.price);
  }
});

test("catalog contains test cards for every sellable category", () => {
  assert.ok(products.length >= 30);
  const expectedCategories = ["nutrition", "equipment", "clothing", "accessories"];
  assert.deepEqual([...new Set(products.map((product) => product.categoryId))].sort(), expectedCategories.sort());
});

test("every catalog section contains correctly assigned test products", () => {
  const sectionsById = new Map(catalogSections.map((section) => [section.id, section]));

  for (const product of products) {
    const section = sectionsById.get(product.sectionId);
    assert.ok(section, `missing section ${product.sectionId}`);
    assert.equal(section.categoryId, product.categoryId);
  }

  assert.deepEqual(
    [...new Set(products.map((product) => product.sectionId))].sort(),
    catalogSections.map((section) => section.id).sort(),
  );
});

test("every demo product has meaningful card content and valid options", () => {
  for (const product of products) {
    assert.ok(product.summary.trim().length >= 40, `${product.id} needs a useful summary`);

    if (product.options) {
      assert.ok(product.optionLabel, `${product.id} needs an option label`);
      assert.ok(product.options.length >= 2, `${product.id} needs multiple options`);
      assert.equal(new Set(product.options).size, product.options.length, `${product.id} options must be unique`);
    }
  }
});
