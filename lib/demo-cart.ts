export type DemoCartLine = {
  key: string;
  productId: string;
  option: string;
  quantity: number;
};

export type DemoCartInput = {
  productId: string;
  option: string;
  quantity?: number;
};

export const getDemoCartLineKey = (productId: string, option: string) => `${productId}::${option}`;

export function addDemoCartLine(lines: DemoCartLine[], input: DemoCartInput): DemoCartLine[] {
  const quantity = Math.max(1, Math.min(99, Math.trunc(input.quantity ?? 1)));
  const key = getDemoCartLineKey(input.productId, input.option);
  const existing = lines.find((line) => line.key === key);

  if (!existing) return [...lines, { key, productId: input.productId, option: input.option, quantity }];

  return lines.map((line) => line.key === key ? { ...line, quantity: Math.min(99, line.quantity + quantity) } : line);
}

export function setDemoCartLineQuantity(lines: DemoCartLine[], key: string, quantity: number): DemoCartLine[] {
  const normalized = Math.trunc(quantity);
  if (normalized <= 0) return lines.filter((line) => line.key !== key);
  return lines.map((line) => line.key === key ? { ...line, quantity: Math.min(99, normalized) } : line);
}

export function removeDemoCartLine(lines: DemoCartLine[], key: string): DemoCartLine[] {
  return lines.filter((line) => line.key !== key);
}
