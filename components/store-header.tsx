"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowRight,
  ChevronRight,
  CircleUserRound,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { useDemoCart } from "@/components/demo-cart";
import { catalogSections, categories } from "@/lib/demo-data";

export function StoreHeader() {
  const router = useRouter();
  const { itemCount, openCart } = useDemoCart();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedQuery = query.trim();
    router.push(normalizedQuery ? `/catalog?query=${encodeURIComponent(normalizedQuery)}` : "/catalog");
    setCatalogOpen(false);
    setMobileOpen(false);
  };

  const closeMenus = () => {
    setCatalogOpen(false);
    setMobileOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1460px] items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <Link href="/" onClick={closeMenus} className="relative z-10 h-[94px] w-[166px] shrink-0 overflow-hidden sm:h-[112px] sm:w-[194px]" aria-label="GainLab — на головну">
            <Image src="/brand/gainlab-logo.jpg" alt="GainLab — лабораторія твого прогресу" width={230} height={230} priority className="absolute -left-1.5 -top-[42px] h-[178px] w-[178px] max-w-none mix-blend-screen sm:-left-4 sm:-top-[44px] sm:h-[210px] sm:w-[210px]" />
            <span className="absolute inset-x-0 bottom-0 bg-black py-1 text-center text-[7px] font-black uppercase leading-none tracking-[0.1em] text-white sm:hidden">Лабораторія твого прогресу</span>
          </Link>

          <form onSubmit={submitSearch} className="hidden h-12 flex-1 items-center overflow-hidden rounded-xl bg-white lg:flex" role="search">
            <Search className="ml-4 text-black/45" size={19} />
            <label className="sr-only" htmlFor="store-header-search">Пошук тестових товарів і брендів</label>
            <input id="store-header-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Пошук тестових товарів і брендів" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-black/40" />
            <button type="submit" className="grid h-full w-14 cursor-pointer place-items-center bg-neon text-ink transition hover:bg-[#9ee000]" aria-label="Шукати в каталозі"><ArrowRight size={19} /></button>
          </form>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button type="button" onClick={() => notify("Особистий кабінет буде реалізовано на наступному етапі")} className="hidden cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold hover:bg-white/8 md:flex"><CircleUserRound size={20} /> Увійти</button>
            <button type="button" onClick={() => notify("Збереження обраного буде реалізовано на наступному етапі")} className="grid size-11 cursor-pointer place-items-center rounded-xl hover:bg-white/8" aria-label="Обране"><Heart size={22} /></button>
            <button type="button" onClick={openCart} className="relative grid size-11 cursor-pointer place-items-center rounded-xl hover:bg-white/8" aria-label={`Відкрити тестовий кошик, товарів: ${itemCount}`}>
              <ShoppingCart size={22} />
              {itemCount > 0 ? <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-neon text-[10px] font-black text-ink">{itemCount}</span> : null}
            </button>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} className="grid size-11 cursor-pointer place-items-center rounded-xl hover:bg-white/8 lg:hidden" aria-label={mobileOpen ? "Закрити меню" : "Відкрити меню"}>{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>

        <nav className="relative border-t border-white/8" aria-label="Основна навігація">
          <div className="mx-auto hidden max-w-[1460px] grid-cols-[210px_minmax(0,1fr)] px-4 sm:px-6 lg:grid lg:px-8">
            <div aria-hidden="true" />
            <div className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button type="button" onClick={() => setCatalogOpen((value) => !value)} aria-expanded={catalogOpen} aria-controls="desktop-catalog-menu" className="mr-2 flex shrink-0 cursor-pointer items-center gap-2 bg-neon px-4 py-3 text-xs font-black text-ink xl:mr-3 xl:gap-3 xl:px-5 xl:text-sm"><Menu size={18} /> Каталог товарів <ChevronRight className={`transition-transform ${catalogOpen ? "rotate-90" : ""}`} size={17} /></button>
              {categories.map((category) => <Link key={category.id} href={category.href} onClick={closeMenus} className="shrink-0 px-2 py-3 text-xs font-bold text-white/78 transition hover:text-neon xl:px-3 xl:text-sm">{category.name}</Link>)}
              <Link href="/#popular" onClick={closeMenus} className="shrink-0 px-2 py-3 text-xs font-bold text-white/78 transition hover:text-neon xl:px-3 xl:text-sm">Акції</Link>
              <Link href="/#popular" onClick={closeMenus} className="shrink-0 px-2 py-3 text-xs font-bold text-white/78 transition hover:text-neon xl:px-3 xl:text-sm">Новинки</Link>
            </div>
          </div>

          {catalogOpen ? (
            <div id="desktop-catalog-menu" className="absolute left-0 right-0 top-full hidden border-y border-white/10 bg-[#101314]/98 shadow-[0_28px_70px_rgba(0,0,0,.48)] lg:block">
              <div className="mx-auto grid max-w-[1460px] gap-7 px-8 py-7 lg:grid-cols-4">
                {categories.filter((category) => category.id !== "brands").map((category) => (
                  <section key={category.id} aria-labelledby={`menu-${category.id}`}>
                    <Link id={`menu-${category.id}`} href={category.href} onClick={closeMenus} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm font-black text-neon hover:text-white">{category.name}<ChevronRight size={16} /></Link>
                    <div className="mt-3 grid gap-1">
                      {catalogSections.filter((section) => section.categoryId === category.id).map((section) => (
                        <Link key={section.id} href={section.href} onClick={closeMenus} className="group rounded-xl px-3 py-2 transition hover:bg-white/6">
                          <span className="block text-sm font-bold text-white/82 group-hover:text-neon">{section.name}</span>
                          <span className="mt-0.5 block text-[11px] leading-4 text-white/38">{section.description}</span>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          ) : null}

          {mobileOpen ? (
            <div className="border-t border-white/8 px-4 py-4 lg:hidden">
              <form onSubmit={submitSearch} className="flex h-12 items-center rounded-xl bg-white" role="search">
                <Search className="ml-4 text-black/45" size={19} />
                <label className="sr-only" htmlFor="store-header-mobile-search">Пошук товарів</label>
                <input id="store-header-mobile-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Пошук товарів" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none" />
                <button type="submit" className="grid h-full w-12 cursor-pointer place-items-center rounded-r-xl bg-neon text-ink" aria-label="Шукати в каталозі"><ArrowRight size={18} /></button>
              </form>
              <button type="button" onClick={() => setCatalogOpen((value) => !value)} aria-expanded={catalogOpen} aria-controls="mobile-catalog-menu" className="mt-3 flex w-full cursor-pointer items-center justify-between rounded-xl bg-neon px-4 py-3 text-sm font-black text-ink">Каталог товарів <ChevronRight className={`transition-transform ${catalogOpen ? "rotate-90" : ""}`} size={17} /></button>
              {catalogOpen ? (
                <div id="mobile-catalog-menu" className="mt-2 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                  {catalogSections.filter((section) => section.categoryId === "nutrition").map((section) => <Link key={section.id} href={section.href} onClick={closeMenus} className="rounded-xl px-3 py-2 text-xs font-bold text-white/82 hover:bg-white/8 hover:text-neon">{section.name}</Link>)}
                </div>
              ) : null}
              <div className="mt-3 grid gap-1">{categories.map((category) => <Link key={category.id} href={category.href} onClick={closeMenus} className="rounded-xl px-3 py-3 text-sm font-bold text-white/85 hover:bg-white/8 hover:text-neon">{category.name}</Link>)}</div>
            </div>
          ) : null}
        </nav>
      </header>

      {notice ? <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-neon px-5 py-3 text-center text-xs font-black uppercase tracking-[0.08em] text-ink shadow-2xl" aria-live="polite">{notice}</div> : null}
    </>
  );
}
