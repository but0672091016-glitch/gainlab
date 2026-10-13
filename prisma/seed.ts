import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductStatus } from "../app/generated/prisma/client";
import { catalogSections, categories, products } from "../lib/demo-data";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL не задан. Скопируйте .env.example в .env.");
}

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

const stockAmount = { "in-stock": 12, low: 3, out: 0 } as const;
const skuPart = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]+/g, "-").replace(/^-|-$/g, "");

async function main() {
  const categoryIds = new Map<string, string>();
  for (const [position, category] of categories.filter((item) => item.id !== "brands").entries()) {
    const record = await prisma.category.upsert({
      where: { slug: category.id },
      update: { name: category.name, eyebrow: category.eyebrow, position, isActive: true },
      create: { id: category.id, slug: category.id, name: category.name, eyebrow: category.eyebrow, position, isActive: true },
    });
    categoryIds.set(category.id, record.id);
  }

  const sectionIds = new Map<string, string>();
  for (const [position, section] of catalogSections.entries()) {
    const categoryId = categoryIds.get(section.categoryId);
    if (!categoryId) throw new Error(`Категорію ${section.categoryId} для розділу ${section.id} не знайдено.`);

    const record = await prisma.catalogSection.upsert({
      where: { slug: section.id },
      update: { name: section.name, description: section.description, position, isActive: true, categoryId },
      create: { id: section.id, slug: section.id, name: section.name, description: section.description, position, isActive: true, categoryId },
    });
    sectionIds.set(section.id, record.id);
  }

  const demoBrand = await prisma.brand.upsert({
    where: { slug: "gainlab-demo" },
    update: { name: "GainLab Demo", isActive: true },
    create: { id: "gainlab-demo", slug: "gainlab-demo", name: "GainLab Demo", isActive: true },
  });

  for (const product of products) {
    const categoryId = categoryIds.get(product.categoryId);
    const sectionId = sectionIds.get(product.sectionId);
    if (!categoryId || !sectionId) throw new Error(`Ієрархію товару ${product.slug} не знайдено.`);

    const variants = (product.options ?? []).map((value, position) => ({
      sku: `${skuPart(product.id)}-${skuPart(value)}`,
      name: product.optionLabel ?? "Варіант",
      value,
      position,
      stock: stockAmount[product.stock],
      priceDelta: "0.00",
    }));
    const data = {
      sku: `${skuPart(product.id)}-BASE`,
      name: product.name,
      description: product.summary,
      packageLabel: product.packageLabel,
      optionLabel: product.optionLabel ?? null,
      price: product.price.toFixed(2),
      oldPrice: product.oldPrice?.toFixed(2) ?? null,
      stock: stockAmount[product.stock],
      status: ProductStatus.ACTIVE,
      isDemo: product.isDemo,
      isFeatured: product.tags.includes("hits"),
      isRecommended: product.tags.includes("recommended"),
      isNew: product.tags.includes("new"),
      artLabel: product.artLabel,
      artTone: product.artTone,
      categoryId,
      sectionId,
      brandId: demoBrand.id,
    };

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: { ...data, variants: { deleteMany: {}, create: variants } },
      create: { id: product.id, slug: product.slug, ...data, variants: { create: variants } },
    });
  }

  await prisma.banner.upsert({
    where: { id: "demo-stage-one-banner" },
    update: {},
    create: { id: "demo-stage-one-banner", title: "Формула сильного старту", subtitle: "Тестовий банер етапу 1.", linkUrl: "/#popular", position: 1, isDemo: true },
  });

  await prisma.supplier.upsert({
    where: { code: "demo-supplier" },
    update: {},
    create: { name: "Тестовий постачальник", code: "demo-supplier", isActive: false },
  });
}

main()
  .then(() => console.log(`Тестовий каталог GainLab створено: ${products.length} товарів.`))
  .finally(async () => prisma.$disconnect());
