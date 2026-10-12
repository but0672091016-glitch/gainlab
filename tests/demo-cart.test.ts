import assert from "node:assert/strict";
import test from "node:test";
import { addDemoCartLine, getDemoCartLineKey, removeDemoCartLine, setDemoCartLineQuantity } from "../lib/demo-cart";

test("demo cart combines identical product variants", () => {
  const first = addDemoCartLine([], { productId: "demo-tee", option: "M", quantity: 2 });
  const second = addDemoCartLine(first, { productId: "demo-tee", option: "M", quantity: 1 });

  assert.equal(second.length, 1);
  assert.equal(second[0].quantity, 3);
});

test("demo cart keeps different variants as separate lines", () => {
  const medium = addDemoCartLine([], { productId: "demo-tee", option: "M" });
  const withLarge = addDemoCartLine(medium, { productId: "demo-tee", option: "L" });

  assert.equal(withLarge.length, 2);
  assert.notEqual(withLarge[0].key, withLarge[1].key);
});

test("demo cart updates and removes lines safely", () => {
  const key = getDemoCartLineKey("demo-whey", "900 г");
  const initial = addDemoCartLine([], { productId: "demo-whey", option: "900 г" });
  const increased = setDemoCartLineQuantity(initial, key, 4);

  assert.equal(increased[0].quantity, 4);
  assert.deepEqual(setDemoCartLineQuantity(increased, key, 0), []);
  assert.deepEqual(removeDemoCartLine(increased, key), []);
});
