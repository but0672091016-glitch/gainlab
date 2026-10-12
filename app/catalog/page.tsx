import { CatalogStorefront } from "@/components/catalog-storefront";
import { catalogSections, categories, products } from "@/lib/demo-data";
import { Suspense } from "react";

async function CatalogContent({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; section?: string; query?: string }>;
}) {
  const { category, section, query } = await searchParams;

  return <CatalogStorefront key={`${category ?? "all"}:${section ?? "all"}:${query ?? ""}`} categories={categories} sections={catalogSections} products={products} initialCategory={category} initialSection={section} initialQuery={query} />;
}

function CatalogFallback() {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 text-center text-white">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-neon">GainLab</p>
        <p className="display-face mt-3 text-4xl">Завантажуємо каталог</p>
      </div>
    </main>
  );
}

export default function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; section?: string; query?: string }>;
}) {
  return (
    <Suspense fallback={<CatalogFallback />}>
      <CatalogContent searchParams={searchParams} />
    </Suspense>
  );
}
