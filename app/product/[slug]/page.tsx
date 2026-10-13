import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductDetail } from "@/components/product-detail";
import { getStoreCatalog } from "@/lib/catalog-data";
import { products as demoProducts } from "@/lib/demo-data";

export function generateStaticParams() {
  return demoProducts.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const catalog = await getStoreCatalog();
  const product = catalog.products.find((item) => item.slug === slug);

  if (!product) return { title: "Товар не знайдено | GainLab" };

  return {
    title: `${product.name} — тестовий товар | GainLab`,
    description: product.summary,
  };
}

async function ProductContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const catalog = await getStoreCatalog();
  const product = catalog.products.find((item) => item.slug === slug);

  if (!product) notFound();

  const category = catalog.categories.find((item) => item.id === product.categoryId);
  const section = catalog.sections.find((item) => item.id === product.sectionId);

  if (!category || !section) notFound();

  const sameSection = catalog.products.filter((item) => item.id !== product.id && item.sectionId === product.sectionId);
  const sameCategory = catalog.products.filter((item) => item.id !== product.id && item.categoryId === product.categoryId && item.sectionId !== product.sectionId);
  const similarProducts = [...sameSection, ...sameCategory].slice(0, 3);

  return <ProductDetail product={product} categoryName={category.name} sectionName={section.name} similarProducts={similarProducts} />;
}

function ProductFallback() {
  return (
    <main className="grid min-h-[70vh] place-items-center bg-mist px-4 text-center text-ink">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5f8500]">GainLab / Demo</p>
        <p className="display-face mt-3 text-4xl">Завантажуємо тестовий товар</p>
      </div>
    </main>
  );
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductContent params={params} />
    </Suspense>
  );
}
