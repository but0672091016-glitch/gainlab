import {
  catalogSections as demoSections,
  categories as demoCategories,
  type DemoCatalogSection,
  type DemoCategory,
  type DemoProduct,
  type DemoProductCategory,
  type DemoProductSectionId,
  type ProductTag,
} from "@/lib/demo-data";

const productCategoryIds = new Set<string>(demoCategories.filter((category) => category.id !== "brands").map((category) => category.id));
const sectionIds = new Set<string>(demoSections.map((section) => section.id));
const artTones = new Set<DemoProduct["artTone"]>(["lime", "blue", "orange", "silver", "violet", "red"]);

type DatabaseCategory = {
  slug: string;
  name: string;
  eyebrow: string | null;
};

type DatabaseSection = {
  slug: string;
  name: string;
  description: string | null;
  category: { slug: string };
};

type DatabaseProduct = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  packageLabel: string | null;
  optionLabel: string | null;
  price: { toString(): string } | string | number;
  oldPrice: { toString(): string } | string | number | null;
  stock: number;
  isDemo: boolean;
  isFeatured: boolean;
  isRecommended: boolean;
  isNew: boolean;
  artLabel: string | null;
  artTone: string;
  category: { slug: string };
  section: { slug: string };
  brand: { name: string };
  variants: Array<{ value: string; position: number }>;
};

export type DatabaseCatalog = {
  categories: DatabaseCategory[];
  sections: DatabaseSection[];
  products: DatabaseProduct[];
};

export type StoreCatalog = {
  categories: DemoCategory[];
  sections: DemoCatalogSection[];
  products: DemoProduct[];
  source: "database" | "demo";
};

function isProductCategory(value: string): value is DemoProductCategory {
  return productCategoryIds.has(value);
}

function isProductSection(value: string): value is DemoProductSectionId {
  return sectionIds.has(value);
}

function normalizeArtTone(value: string): DemoProduct["artTone"] {
  return artTones.has(value as DemoProduct["artTone"]) ? value as DemoProduct["artTone"] : "silver";
}

function toPrice(value: DatabaseProduct["price"]): number {
  const price = Number(value.toString());
  return Number.isFinite(price) ? price : 0;
}

export function mapDatabaseCatalog(data: DatabaseCatalog): StoreCatalog {
  const categories = data.categories.flatMap<DemoCategory>((category) => {
    if (!isProductCategory(category.slug)) return [];
    return [{
      id: category.slug,
      name: category.name,
      eyebrow: category.eyebrow ?? "",
      href: `/catalog?category=${category.slug}`,
      kind: category.slug,
    }];
  });

  const brandsCategory = demoCategories.find((category) => category.id === "brands");
  if (brandsCategory) categories.push(brandsCategory);

  const sections = data.sections.flatMap<DemoCatalogSection>((section) => {
    if (!isProductCategory(section.category.slug) || !isProductSection(section.slug)) return [];
    return [{
      id: section.slug,
      categoryId: section.category.slug,
      name: section.name,
      description: section.description ?? "",
      href: `/catalog?category=${section.category.slug}&section=${section.slug}`,
    }];
  });

  const products = data.products.flatMap<DemoProduct>((product) => {
    if (!isProductCategory(product.category.slug) || !isProductSection(product.section.slug)) return [];

    const tags: ProductTag[] = [];
    if (product.isFeatured) tags.push("hits");
    if (product.isNew) tags.push("new");
    if (product.oldPrice !== null) tags.push("sale");
    if (product.isRecommended) tags.push("recommended");
    const options = product.variants
      .slice()
      .sort((left, right) => left.position - right.position)
      .map((variant) => variant.value);

    return [{
      id: product.id,
      slug: product.slug,
      categoryId: product.category.slug,
      sectionId: product.section.slug,
      brand: product.brand.name,
      name: product.name,
      packageLabel: product.packageLabel ?? "",
      summary: product.description ?? "",
      optionLabel: product.optionLabel ?? undefined,
      options: options.length > 0 ? options : undefined,
      price: toPrice(product.price),
      oldPrice: product.oldPrice === null ? undefined : toPrice(product.oldPrice),
      stock: product.stock <= 0 ? "out" : product.stock <= 3 ? "low" : "in-stock",
      tags,
      artLabel: product.artLabel ?? product.name.toUpperCase(),
      artTone: normalizeArtTone(product.artTone),
      isDemo: product.isDemo,
    }];
  });

  return { categories, sections, products, source: "database" };
}
