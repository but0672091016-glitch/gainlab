import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { catalogSections, categories, products } from "@/lib/demo-data";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return { title: "Товар не знайдено | GainLab" };

  return {
    title: `${product.name} — тестовий товар | GainLab`,
    description: product.summary,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) notFound();

  const category = categories.find((item) => item.id === product.categoryId);
  const section = catalogSections.find((item) => item.id === product.sectionId);

  if (!category || !section) notFound();

  const sameSection = products.filter((item) => item.id !== product.id && item.sectionId === product.sectionId);
  const sameCategory = products.filter((item) => item.id !== product.id && item.categoryId === product.categoryId && item.sectionId !== product.sectionId);
  const similarProducts = [...sameSection, ...sameCategory].slice(0, 3);

  return <ProductDetail product={product} categoryName={category.name} sectionName={section.name} similarProducts={similarProducts} />;
}
