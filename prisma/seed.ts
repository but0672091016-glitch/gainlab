import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductStatus } from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL не задан. Скопируйте .env.example в .env.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  const nutrition = await prisma.category.upsert({
    where: { slug: "sportyvne-kharchuvannia" },
    update: {},
    create: {
      slug: "sportyvne-kharchuvannia",
      name: "Спортивне харчування",
      description: "Тестова категорія для перевірки інтерфейсу.",
    },
  });

  const demoBrand = await prisma.brand.upsert({
    where: { slug: "gainlab-demo" },
    update: {},
    create: { slug: "gainlab-demo", name: "GainLab Demo" },
  });

  await prisma.product.upsert({
    where: { sku: "DEMO-WHEY-900" },
    update: {},
    create: {
      sku: "DEMO-WHEY-900",
      slug: "demo-whey-lab-900",
      name: "Whey Lab Protein",
      description: "Тестовий товар. Не є реальною комерційною пропозицією.",
      packageLabel: "900 г",
      price: "1290.00",
      oldPrice: "1490.00",
      stock: 12,
      status: ProductStatus.ACTIVE,
      isDemo: true,
      isFeatured: true,
      isRecommended: true,
      categoryId: nutrition.id,
      brandId: demoBrand.id,
    },
  });

  await prisma.banner.upsert({
    where: { id: "demo-stage-one-banner" },
    update: {},
    create: {
      id: "demo-stage-one-banner",
      title: "Формула сильного старту",
      subtitle: "Тестовий банер етапу 1.",
      linkUrl: "/#popular",
      position: 1,
      isDemo: true,
    },
  });

  await prisma.supplier.upsert({
    where: { code: "demo-supplier" },
    update: {},
    create: {
      name: "Тестовий постачальник",
      code: "demo-supplier",
      isActive: false,
    },
  });
}

main()
  .then(() => console.log("Тестові дані GainLab створено."))
  .finally(async () => prisma.$disconnect());
