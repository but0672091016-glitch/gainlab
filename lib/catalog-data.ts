import { cache } from "react";
import { connection } from "next/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, ProductStatus } from "@/app/generated/prisma/client";
import { catalogSections, categories, products } from "@/lib/demo-data";
import { mapDatabaseCatalog, type StoreCatalog } from "@/lib/catalog-mapper";

const demoCatalog: StoreCatalog = {
  categories,
  sections: catalogSections,
  products,
  source: "demo",
};

async function readDatabaseCatalog(connectionString: string): Promise<StoreCatalog> {
  await connection();
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });

  try {
    const [databaseCategories, databaseSections, databaseProducts] = await Promise.all([
      prisma.category.findMany({ where: { isActive: true }, orderBy: [{ position: "asc" }, { name: "asc" }] }),
      prisma.catalogSection.findMany({
        where: { isActive: true, category: { isActive: true } },
        include: { category: { select: { slug: true } } },
        orderBy: [{ position: "asc" }, { name: "asc" }],
      }),
      prisma.product.findMany({
        where: {
          status: ProductStatus.ACTIVE,
          category: { isActive: true },
          section: { isActive: true },
          brand: { isActive: true },
        },
        include: {
          category: { select: { slug: true } },
          section: { select: { slug: true } },
          brand: { select: { name: true } },
          variants: { select: { value: true, position: true } },
        },
        orderBy: [{ isFeatured: "desc" }, { name: "asc" }],
      }),
    ]);

    const catalog = mapDatabaseCatalog({
      categories: databaseCategories,
      sections: databaseSections,
      products: databaseProducts,
    });

    if (catalog.categories.length <= 1 || catalog.sections.length === 0 || catalog.products.length === 0) {
      throw new Error("PostgreSQL catalog is empty or incomplete");
    }

    return catalog;
  } finally {
    await prisma.$disconnect();
  }
}

export const getStoreCatalog = cache(async (): Promise<StoreCatalog> => {
  const connectionString = process.env.DATABASE_URL?.trim() || process.env.NETLIFY_DB_URL?.trim();
  if (!connectionString) return demoCatalog;

  try {
    return await readDatabaseCatalog(connectionString);
  } catch (error) {
    console.error("GainLab catalog database is unavailable; demo data is used.", error);
    return demoCatalog;
  }
});
