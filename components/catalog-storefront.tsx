"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Backpack,
  Dumbbell,
  FlaskConical,
  Heart,
  RotateCcw,
  Search,
  Shirt,
  ShoppingCart,
  SlidersHorizontal,
} from "lucide-react";
import type { DemoCatalogSection, DemoCategory, DemoProduct, DemoProductCategory, DemoProductSectionId } from "@/lib/demo-data";
import { useDemoCart } from "@/components/demo-cart";

type CatalogStorefrontProps = {
  categories: DemoCategory[];
  sections: DemoCatalogSection[];
  products: DemoProduct[];
  initialCategory?: string;
  initialSection?: string;
  initialQuery?: string;
};

type CatalogCategory = "all" | DemoProductCategory;
type CatalogSection = "all" | DemoProductSectionId;
type SortMode = "featured" | "price-asc" | "price-desc" | "name";

const categoryIcons: Record<DemoProductCategory, LucideIcon> = {
  nutrition: FlaskConical,
  equipment: Dumbbell,
  clothing: Shirt,
  accessories: Backpack,
};

const toneStyles: Record<DemoProduct["artTone"], { panel: string; accent: string }> = {
  lime: { panel: "from-[#eaffb8] via-[#f6ffe4] to-white", accent: "text-[#5f8500]" },
  blue: { panel: "from-[#c8efff] via-[#edfaff] to-white", accent: "text-[#0877a7]" },
  orange: { panel: "from-[#ffe0c7] via-[#fff3e9] to-white", accent: "text-[#ad4d0a]" },
  silver: { panel: "from-[#dfe3e5] via-[#f3f5f6] to-white", accent: "text-[#596164]" },
  violet: { panel: "from-[#ead4ff] via-[#f8efff] to-white", accent: "text-[#7c2fb0]" },
  red: { panel: "from-[#ffd2da] via-[#fff0f3] to-white", accent: "text-[#b42342]" },
};

const formatMoney = (value: number) => `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")} ₴`;

function CatalogProductCard({
  product,
  favorite,
  onFavorite,
  onCart,
}: {
  product: DemoProduct;
  favorite: boolean;
  onFavorite: () => void;
  onCart: () => void;
}) {
  const ProductIcon = categoryIcons[product.categoryId];
  const tone = toneStyles[product.artTone];
  const stockLabel = {
    "in-stock": "Є в наявності",
    low: "Залишилось мало",
    out: "Немає в наявності",
  }[product.stock];

  return (
    <article className="card-lift group relative flex min-h-[500px] flex-col overflow-hidden rounded-3xl border border-black/8 bg-white p-4 shadow-[0_18px_60px_rgba(11,13,14,.06)]">
      <span className="absolute left-4 top-4 z-10 rounded-full bg-neon px-3 py-1 text-[10px] font-black uppercase tracking-[0.13em] text-ink">
        Тестовий товар
      </span>
      <button
        type="button"
        onClick={onFavorite}
        aria-label={favorite ? `Прибрати ${product.name} з обраного` : `Додати ${product.name} в обране`}
        className={`absolute right-4 top-4 z-10 grid size-10 cursor-pointer place-items-center rounded-full border transition ${favorite ? "border-neon bg-neon text-ink" : "border-black/10 bg-white/90 text-ink hover:border-neon"}`}
      >
        <Heart size={18} fill={favorite ? "currentColor" : "none"} />
      </button>

      <Link href={`/product/${product.slug}`} aria-label={`Відкрити тестову сторінку ${product.name}`} className={`relative grid h-52 place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${tone.panel}`}>
        <p className="display-face absolute bottom-2 left-3 max-w-[88%] truncate text-5xl text-black/[.055]">{product.artLabel}</p>
        <div className="grid size-24 place-items-center rounded-[2rem] border border-black/8 bg-white/72 shadow-[0_18px_44px_rgba(11,13,14,.13)] backdrop-blur">
          <ProductIcon className={tone.accent} size={54} strokeWidth={1.7} />
        </div>
      </Link>

      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[10px] font-black uppercase tracking-[0.16em] text-muted">{product.brand}</p>
        <h2 className="mt-1 text-lg font-black tracking-tight text-ink"><Link href={`/product/${product.slug}`} className="transition hover:text-[#5f8500]">{product.name}</Link></h2>
        <p className="mt-1 text-sm text-muted">{product.packageLabel}</p>
        <p className="mt-3 text-sm leading-5 text-muted">{product.summary}</p>
        <p className={`mt-2 text-xs font-bold ${product.stock === "out" ? "text-red-600" : "text-[#4f7600]"}`}>{stockLabel}</p>
        <Link href={`/product/${product.slug}`} className="mt-3 inline-flex items-center gap-1.5 text-xs font-black text-[#5f8500] hover:text-ink">Докладніше <ArrowRight size={15} /></Link>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-2xl font-black tracking-tight text-ink">{formatMoney(product.price)}</p>
            {product.oldPrice ? <p className="text-sm text-muted line-through">{formatMoney(product.oldPrice)}</p> : null}
          </div>
          <button
            type="button"
            onClick={onCart}
            disabled={product.stock === "out"}
            aria-label={`Додати ${product.name} у тестовий кошик`}
            className="grid size-12 cursor-pointer place-items-center rounded-2xl bg-neon text-ink transition hover:bg-[#9ee000] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/35"
          >
            <ShoppingCart size={21} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function CatalogStorefront({ categories, sections, products, initialCategory, initialSection, initialQuery }: CatalogStorefrontProps) {
  const { addItem } = useDemoCart();
  const catalogCategories = categories.filter((category) => category.id !== "brands");
  const requestedSection = sections.find((section) => section.id === initialSection);
  const normalizedCategory = requestedSection?.categoryId ?? (catalogCategories.some((category) => category.id === initialCategory) ? (initialCategory as DemoProductCategory) : "all");
  const normalizedSection = requestedSection?.id ?? "all";
  const [activeCategory, setActiveCategory] = useState<CatalogCategory>(normalizedCategory);
  const [activeSection, setActiveSection] = useState<CatalogSection>(normalizedSection);
  const [query, setQuery] = useState(initialQuery ?? "");
  const [sortMode, setSortMode] = useState<SortMode>("featured");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("uk-UA");
    const filtered = products.filter((product) => {
      const matchesCategory = activeCategory === "all" || product.categoryId === activeCategory;
      const matchesSection = activeSection === "all" || product.sectionId === activeSection;
      const haystack = `${product.brand} ${product.name} ${product.packageLabel} ${product.summary}`.toLocaleLowerCase("uk-UA");
      return matchesCategory && matchesSection && (!normalizedQuery || haystack.includes(normalizedQuery));
    });

    return [...filtered].sort((left, right) => {
      if (sortMode === "price-asc") return left.price - right.price;
      if (sortMode === "price-desc") return right.price - left.price;
      if (sortMode === "name") return left.name.localeCompare(right.name, "uk-UA");

      const score = (product: DemoProduct) =>
        (product.tags.includes("hits") ? 4 : 0) +
        (product.tags.includes("recommended") ? 3 : 0) +
        (product.tags.includes("sale") ? 2 : 0) +
        (product.tags.includes("new") ? 1 : 0);
      return score(right) - score(left);
    });
  }, [activeCategory, activeSection, products, query, sortMode]);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  };

  const toggleFavorite = (product: DemoProduct) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(product.id)) {
        next.delete(product.id);
        notify(`${product.name} прибрано з тестового обраного`);
      } else {
        next.add(product.id);
        notify(`${product.name} додано в тестове обране`);
      }
      return next;
    });
  };

  const addToCart = (product: DemoProduct) => {
    if (product.stock === "out") return;
    addItem({ productId: product.id, option: product.packageLabel });
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setActiveSection("all");
    setQuery("");
    setSortMode("featured");
  };

  const selectCategory = (category: CatalogCategory) => {
    setActiveCategory(category);
    setActiveSection("all");
  };

  const visibleSections = activeCategory === "all" ? [] : sections.filter((section) => section.categoryId === activeCategory);

  return (
    <main className="min-h-screen bg-mist text-ink">

      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1460px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-white/58 transition hover:text-neon">
            <ArrowLeft size={18} /> На головну
          </Link>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-neon">Демонстраційна вітрина</p>
              <h1 className="display-face mt-3 text-5xl leading-[.88] sm:text-7xl">Каталог товарів</h1>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-white/60 sm:text-base">32 тестові позиції, розподілені за категоріями та розділами. Це не комерційна пропозиція.</p>
            </div>
            <div className="rounded-2xl border border-neon/35 bg-neon/8 px-5 py-4 text-sm font-bold text-neon">
              Усі ціни та залишки тестові
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1460px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-black/7 bg-white p-4 shadow-[0_18px_70px_rgba(11,13,14,.06)] sm:p-6">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
            <label className="relative block">
              <span className="sr-only">Пошук у тестовому каталозі</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={20} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Пошук за назвою або форматом"
                className="h-13 w-full rounded-2xl border border-black/9 bg-mist pl-12 pr-4 text-sm font-medium outline-none transition placeholder:text-muted/70 focus:border-neon"
              />
            </label>
            <label className="relative flex min-w-64 items-center gap-3 rounded-2xl border border-black/9 bg-mist px-4">
              <SlidersHorizontal className="text-muted" size={19} />
              <span className="sr-only">Сортування</span>
              <select value={sortMode} onChange={(event) => setSortMode(event.target.value as SortMode)} className="h-13 w-full cursor-pointer bg-transparent text-sm font-bold outline-none">
                <option value="featured">Спочатку популярні</option>
                <option value="price-asc">Від дешевих</option>
                <option value="price-desc">Від дорогих</option>
                <option value="name">За назвою</option>
              </select>
            </label>
          </div>

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
            <button type="button" onClick={() => selectCategory("all")} className={`shrink-0 cursor-pointer rounded-full px-4 py-2.5 text-sm font-black transition ${activeCategory === "all" ? "bg-ink text-white" : "bg-mist text-muted hover:text-ink"}`}>Усі товари</button>
            {catalogCategories.map((category) => (
              <button key={category.id} type="button" onClick={() => selectCategory(category.id as DemoProductCategory)} className={`shrink-0 cursor-pointer rounded-full px-4 py-2.5 text-sm font-black transition ${activeCategory === category.id ? "bg-neon text-ink" : "bg-mist text-muted hover:text-ink"}`}>
                {category.name}
              </button>
            ))}
          </div>

          {visibleSections.length > 0 ? (
            <div className="mt-4 border-t border-black/7 pt-4">
              <p className="mb-3 text-[10px] font-black uppercase tracking-[0.16em] text-muted">Оберіть розділ</p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                <button type="button" onClick={() => setActiveSection("all")} className={`shrink-0 cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-black transition ${activeSection === "all" ? "border-ink bg-ink text-white" : "border-black/9 bg-white text-muted hover:border-neon hover:text-ink"}`}>Усі в категорії</button>
                {visibleSections.map((section) => (
                  <button key={section.id} type="button" onClick={() => setActiveSection(section.id)} className={`shrink-0 cursor-pointer rounded-xl border px-3.5 py-2 text-xs font-black transition ${activeSection === section.id ? "border-neon bg-neon text-ink" : "border-black/9 bg-white text-muted hover:border-neon hover:text-ink"}`}>
                    {section.name}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">Знайдено: <strong className="text-ink">{visibleProducts.length}</strong></p>
          {(activeCategory !== "all" || activeSection !== "all" || query || sortMode !== "featured") ? (
            <button type="button" onClick={resetFilters} className="inline-flex cursor-pointer items-center gap-2 text-sm font-black text-[#5f8500] hover:text-ink"><RotateCcw size={16} /> Скинути фільтри</button>
          ) : null}
        </div>

        {visibleProducts.length > 0 ? (
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleProducts.map((product) => (
              <CatalogProductCard key={product.id} product={product} favorite={favorites.has(product.id)} onFavorite={() => toggleFavorite(product)} onCart={() => addToCart(product)} />
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[2rem] border border-dashed border-black/15 bg-white px-6 py-16 text-center">
            <Search className="mx-auto text-muted" size={34} />
            <h2 className="mt-4 text-xl font-black">Тестових товарів не знайдено</h2>
            <p className="mt-2 text-sm text-muted">Спробуйте інший запит або скиньте фільтри.</p>
            <button type="button" onClick={resetFilters} className="mt-6 cursor-pointer rounded-xl bg-neon px-5 py-3 text-sm font-black">Показати всі товари</button>
          </div>
        )}
      </section>

      <footer className="mt-12 border-t border-white/10 bg-ink text-white">
        <div className="mx-auto flex max-w-[1460px] flex-col gap-3 px-4 py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 GainLab. Демонстраційний каталог етапу 2.</p>
          <Link href="/" className="font-bold text-white/70 hover:text-neon">Повернутися на головну</Link>
        </div>
      </footer>

      <div aria-live="polite" className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-2xl bg-ink px-5 py-3 text-sm font-bold text-white shadow-2xl transition ${notice ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
        {notice}
      </div>
    </main>
  );
}
