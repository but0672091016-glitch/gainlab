"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  Backpack,
  Boxes,
  Check,
  Dumbbell,
  FlaskConical,
  Heart,
  Info,
  Minus,
  Plus,
  Shirt,
  ShoppingCart,
} from "lucide-react";
import type { DemoProduct, DemoProductCategory } from "@/lib/demo-data";

type ProductDetailProps = {
  product: DemoProduct;
  categoryName: string;
  sectionName: string;
  similarProducts: DemoProduct[];
};

const categoryIcons: Record<DemoProductCategory, LucideIcon> = {
  nutrition: FlaskConical,
  equipment: Dumbbell,
  clothing: Shirt,
  accessories: Backpack,
};

const toneStyles: Record<DemoProduct["artTone"], { panel: string; accent: string; glow: string }> = {
  lime: { panel: "from-[#dfff91] via-[#f2ffd2] to-white", accent: "text-[#5f8500]", glow: "bg-neon/30" },
  blue: { panel: "from-[#b9e9ff] via-[#ecfaff] to-white", accent: "text-[#0877a7]", glow: "bg-sky-400/25" },
  orange: { panel: "from-[#ffd7b6] via-[#fff1e5] to-white", accent: "text-[#ad4d0a]", glow: "bg-orange-400/25" },
  silver: { panel: "from-[#d8dde0] via-[#f1f4f5] to-white", accent: "text-[#596164]", glow: "bg-slate-400/25" },
  violet: { panel: "from-[#e5c8ff] via-[#f7edff] to-white", accent: "text-[#7c2fb0]", glow: "bg-violet-400/25" },
  red: { panel: "from-[#ffc4cf] via-[#ffedf1] to-white", accent: "text-[#b42342]", glow: "bg-rose-400/25" },
};

const stockLabels = {
  "in-stock": "Є в тестовій наявності",
  low: "Тестовий залишок: мало",
  out: "Тимчасово немає",
} as const;

const formatMoney = (value: number) => `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")} ₴`;

export function ProductDetail({ product, categoryName, sectionName, similarProducts }: ProductDetailProps) {
  const ProductIcon = categoryIcons[product.categoryId];
  const tone = toneStyles[product.artTone];
  const [selectedOption, setSelectedOption] = useState(product.options?.[0] ?? product.packageLabel);
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [notice, setNotice] = useState("");

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2400);
  };

  const addToCart = () => {
    if (product.stock === "out") return;
    notify(`${quantity} × ${product.name} (${selectedOption}) додано в тестовий кошик`);
  };

  return (
    <main className="min-h-screen bg-mist text-ink">
      <header className="border-b border-white/10 bg-ink text-white">
        <div className="mx-auto flex max-w-[1460px] items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="GainLab — на головну" className="relative block h-[92px] w-40 shrink-0 overflow-hidden bg-ink sm:h-[124px] sm:w-[214px]">
            <Image src="/brand/gainlab-logo.jpg" alt="GainLab" width={720} height={720} className="absolute -left-3 -top-9 h-[172px] w-[172px] max-w-none mix-blend-screen sm:-left-[18px] sm:-top-[49px] sm:h-[230px] sm:w-[230px]" priority />
          </Link>
          <Link href="/catalog" className="ml-auto inline-flex items-center gap-2 rounded-2xl border border-white/12 bg-white/5 px-4 py-3 text-sm font-black transition hover:border-neon hover:text-neon">
            <Boxes size={19} /> <span className="hidden sm:inline">До каталогу</span>
          </Link>
        </div>
      </header>

      <section className="border-b border-black/7 bg-white">
        <div className="mx-auto flex max-w-[1460px] items-center gap-2 overflow-x-auto px-4 py-4 text-xs font-bold text-muted sm:px-6 lg:px-8">
          <Link href="/catalog" className="inline-flex shrink-0 items-center gap-1.5 hover:text-ink"><ArrowLeft size={15} /> Каталог</Link>
          <span>/</span>
          <Link href={`/catalog?category=${product.categoryId}`} className="shrink-0 hover:text-ink">{categoryName}</Link>
          <span>/</span>
          <Link href={`/catalog?category=${product.categoryId}&section=${product.sectionId}`} className="shrink-0 hover:text-ink">{sectionName}</Link>
          <span>/</span>
          <span className="truncate text-ink">{product.name}</span>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1460px] gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,.95fr)] lg:px-8">
        <div className={`relative grid min-h-[420px] place-items-center overflow-hidden rounded-[2.25rem] border border-black/7 bg-gradient-to-br ${tone.panel} p-8 sm:min-h-[560px]`}>
          <div className={`absolute -right-16 -top-16 size-60 rounded-full blur-3xl ${tone.glow}`} />
          <span className="absolute left-5 top-5 rounded-full bg-neon px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]">Тестовий товар</span>
          <p className="display-face absolute bottom-2 left-5 max-w-[90%] truncate text-[clamp(4rem,15vw,9rem)] leading-none text-black/[.055]">{product.artLabel}</p>
          <div className="relative grid size-52 place-items-center rounded-[3rem] border border-black/8 bg-white/75 shadow-[0_30px_80px_rgba(11,13,14,.16)] backdrop-blur sm:size-72">
            <ProductIcon className={tone.accent} size={132} strokeWidth={1.45} />
            <span className="absolute bottom-6 rounded-full bg-ink px-4 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white">GainLab / Demo</span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-muted">{product.brand}</p>
            <button type="button" onClick={() => { setFavorite((value) => !value); notify(favorite ? "Прибрано з тестового обраного" : "Додано в тестове обране"); }} aria-label={favorite ? "Прибрати з обраного" : "Додати в обране"} className={`grid size-11 cursor-pointer place-items-center rounded-full border transition ${favorite ? "border-neon bg-neon" : "border-black/10 bg-white hover:border-neon"}`}>
              <Heart size={20} fill={favorite ? "currentColor" : "none"} />
            </button>
          </div>
          <h1 className="display-face mt-3 text-5xl leading-[.9] sm:text-7xl">{product.name}</h1>
          <p className="mt-5 text-base leading-7 text-muted sm:text-lg">{product.summary}</p>
          <p className={`mt-4 inline-flex items-center gap-2 text-sm font-black ${product.stock === "out" ? "text-red-600" : "text-[#4f7600]"}`}>
            <Check size={18} /> {stockLabels[product.stock]}
          </p>

          <div className="mt-7 rounded-3xl border border-black/8 bg-white p-5">
            {product.options?.length ? (
              <fieldset>
                <legend className="text-xs font-black uppercase tracking-[0.14em] text-muted">{product.optionLabel}</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.options.map((option) => (
                    <button key={option} type="button" onClick={() => setSelectedOption(option)} className={`min-w-12 cursor-pointer rounded-xl border px-4 py-2.5 text-sm font-black transition ${selectedOption === option ? "border-neon bg-neon" : "border-black/10 bg-mist hover:border-neon"}`}>{option}</button>
                  ))}
                </div>
              </fieldset>
            ) : (
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">Формат</p>
                <p className="mt-2 text-lg font-black">{product.packageLabel}</p>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-5 border-t border-black/7 pt-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">Тестова ціна</p>
                <div className="mt-1 flex items-baseline gap-3">
                  <p className="text-4xl font-black tracking-tight">{formatMoney(product.price)}</p>
                  {product.oldPrice ? <p className="text-base text-muted line-through">{formatMoney(product.oldPrice)}</p> : null}
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">Кількість</p>
                <div className="mt-2 inline-flex items-center rounded-xl border border-black/10 bg-mist p-1">
                  <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Зменшити кількість" className="grid size-10 cursor-pointer place-items-center rounded-lg hover:bg-white"><Minus size={17} /></button>
                  <span className="w-10 text-center text-sm font-black" aria-live="polite">{quantity}</span>
                  <button type="button" onClick={() => setQuantity((value) => Math.min(9, value + 1))} aria-label="Збільшити кількість" className="grid size-10 cursor-pointer place-items-center rounded-lg hover:bg-white"><Plus size={17} /></button>
                </div>
              </div>
            </div>
          </div>

          <button type="button" onClick={addToCart} disabled={product.stock === "out"} className="mt-4 inline-flex h-16 cursor-pointer items-center justify-center gap-3 rounded-2xl bg-neon px-6 text-sm font-black uppercase tracking-[0.08em] transition hover:bg-[#9ee000] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/35">
            <ShoppingCart size={21} /> {product.stock === "out" ? "Немає в наявності" : "Додати в тестовий кошик"}
          </button>

          <div className="mt-4 flex gap-3 rounded-2xl border border-amber-400/35 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            <Info className="mt-0.5 shrink-0" size={19} />
            <p>Це демонстраційна картка. Точний склад, матеріали, виробник, спосіб застосування та комерційні умови будуть додані лише після отримання офіційних даних.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1460px] px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid overflow-hidden rounded-[2rem] border border-black/7 bg-white lg:grid-cols-2">
          <div className="p-6 sm:p-8">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5f8500]">Про тестову позицію</p>
            <h2 className="display-face mt-3 text-3xl">Картка вже має сенс</h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-muted">Вона показує призначення позиції, її місце в каталозі, формат, тестову наявність і доступні варіанти. Непідтверджені маркетингові твердження навмисно не додаються.</p>
          </div>
          <dl className="grid border-t border-black/7 sm:grid-cols-2 lg:border-l lg:border-t-0">
            {[
              ["Бренд", product.brand],
              ["Категорія", categoryName],
              ["Розділ", sectionName],
              ["Формат", product.packageLabel],
              ["Тестовий артикул", product.id.toUpperCase()],
              ["Статус", stockLabels[product.stock]],
            ].map(([term, value]) => (
              <div key={term} className="border-b border-black/7 p-5 last:border-b-0 sm:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 sm:[&:nth-child(2n)]:border-r-0">
                <dt className="text-[10px] font-black uppercase tracking-[0.15em] text-muted">{term}</dt>
                <dd className="mt-2 text-sm font-black">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {similarProducts.length ? (
        <section className="border-t border-black/7 bg-white">
          <div className="mx-auto max-w-[1460px] px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5f8500]">Той самий розділ</p>
                <h2 className="display-face mt-2 text-3xl sm:text-4xl">Схожі тестові товари</h2>
              </div>
              <Link href={`/catalog?category=${product.categoryId}&section=${product.sectionId}`} className="hidden items-center gap-2 text-sm font-black hover:text-[#5f8500] sm:inline-flex">Усі в розділі <ArrowRight size={17} /></Link>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {similarProducts.map((item) => {
                const SimilarIcon = categoryIcons[item.categoryId];
                const similarTone = toneStyles[item.artTone];
                return (
                  <Link key={item.id} href={`/product/${item.slug}`} className="group grid grid-cols-[88px_1fr] gap-4 rounded-2xl border border-black/8 bg-mist p-4 transition hover:-translate-y-1 hover:border-neon">
                    <div className={`grid size-[88px] place-items-center rounded-2xl bg-gradient-to-br ${similarTone.panel}`}><SimilarIcon className={similarTone.accent} size={38} /></div>
                    <div className="min-w-0">
                      <p className="text-[9px] font-black uppercase tracking-[0.13em] text-muted">Тестовий товар</p>
                      <h3 className="mt-1 truncate font-black">{item.name}</h3>
                      <p className="mt-1 text-xs text-muted">{item.packageLabel}</p>
                      <p className="mt-2 text-sm font-black">{formatMoney(item.price)}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      <footer className="border-t border-white/10 bg-ink text-white">
        <div className="mx-auto flex max-w-[1460px] flex-col gap-3 px-4 py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 GainLab. Демонстраційна сторінка товару.</p>
          <Link href="/catalog" className="font-bold text-white/70 hover:text-neon">Повернутися до каталогу</Link>
        </div>
      </footer>

      <div aria-live="polite" className={`fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl bg-ink px-5 py-3 text-center text-sm font-bold text-white shadow-2xl transition ${notice ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}>
        {notice}
      </div>
    </main>
  );
}
