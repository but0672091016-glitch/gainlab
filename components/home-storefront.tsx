"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Backpack,
  BadgePercent,
  Boxes,
  CheckCircle2,
  ChevronRight,
  CircleUserRound,
  Dumbbell,
  ExternalLink,
  FlaskConical,
  Headphones,
  Heart,
  Menu,
  Newspaper,
  PackageCheck,
  Search,
  ShieldCheck,
  Shirt,
  ShoppingCart,
  Tags,
  Truck,
  X,
} from "lucide-react";
import { catalogSections } from "@/lib/demo-data";
import type { DemoCategory, DemoProduct, ProductTag } from "@/lib/demo-data";
import type { SportNewsItem } from "@/lib/sports-news";
import { useDemoCart } from "@/components/demo-cart";

type HomeStorefrontProps = {
  categories: DemoCategory[];
  products: DemoProduct[];
  sportsNews: SportNewsItem[];
};

const tabs: Array<{ id: ProductTag; label: string }> = [
  { id: "hits", label: "Хіти продажу" },
  { id: "new", label: "Новинки" },
  { id: "sale", label: "Акції" },
  { id: "recommended", label: "Рекомендуємо" },
];

const categoryIcons: Record<DemoCategory["kind"], LucideIcon> = {
  nutrition: FlaskConical,
  equipment: Dumbbell,
  clothing: Shirt,
  accessories: Backpack,
  brands: Tags,
};

const formatMoney = (value: number) => `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")} ₴`;

const newsDateFormatter = new Intl.DateTimeFormat("uk-UA", {
  day: "2-digit",
  month: "short",
  timeZone: "Europe/Kyiv",
});

const newsSourceLinks = [
  { label: "Суспільне Спорт", url: "https://suspilne.media/sport/boxing/" },
  { label: "Федерація пауерліфтингу", url: "https://ukrpowerlifting.com/" },
  { label: "Федерація бодібілдингу", url: "https://fbbu.com.ua/" },
  { label: "Федерація ММА", url: "https://mma.org.ua/" },
];

const tones = {
  lime: { main: "#b6ff00", shade: "#5f8800", ink: "#0b0d0e" },
  blue: { main: "#38bdf8", shade: "#075985", ink: "#ffffff" },
  orange: { main: "#fb923c", shade: "#9a3412", ink: "#ffffff" },
  silver: { main: "#e5e7eb", shade: "#6b7280", ink: "#0b0d0e" },
  violet: { main: "#c084fc", shade: "#6b21a8", ink: "#ffffff" },
  red: { main: "#fb7185", shade: "#9f1239", ink: "#ffffff" },
};

function ProductArt({ product, compact = false }: { product: DemoProduct; compact?: boolean }) {
  const tone = tones[product.artTone];
  return (
    <svg
      viewBox="0 0 260 230"
      role="img"
      aria-label={`Тестове зображення ${product.name}`}
      className={compact ? "h-36 w-full" : "h-48 w-full"}
    >
      <defs>
        <linearGradient id={`jar-${product.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2f31" />
          <stop offset="0.55" stopColor="#0b0d0e" />
          <stop offset="1" stopColor="#262b2d" />
        </linearGradient>
        <linearGradient id={`label-${product.id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={tone.main} />
          <stop offset="1" stopColor={tone.shade} />
        </linearGradient>
        <filter id={`shadow-${product.id}`} x="-30%" y="-30%" width="160%" height="180%">
          <feDropShadow dx="0" dy="13" stdDeviation="10" floodColor="#0b0d0e" floodOpacity=".24" />
        </filter>
      </defs>
      <ellipse cx="130" cy="207" rx="76" ry="12" fill="#0b0d0e" opacity=".13" />
      <g filter={`url(#shadow-${product.id})`}>
        <rect x="73" y="35" width="114" height="28" rx="9" fill="#090b0c" />
        <rect x="67" y="53" width="126" height="145" rx="24" fill={`url(#jar-${product.id})`} />
        <path d="M77 80h106v82H77z" fill={`url(#label-${product.id})`} />
        <path d="M77 80h106v10H77z" fill="#ffffff" opacity=".17" />
        <text x="130" y="106" textAnchor="middle" fontSize="10" fontFamily="Arial" fontWeight="700" fill={tone.ink}>GAINLAB / DEMO</text>
        <text x="130" y="132" textAnchor="middle" fontSize={product.artLabel.length > 7 ? "15" : "22"} fontFamily="Arial Black, Arial" fontWeight="900" fill={tone.ink}>{product.artLabel}</text>
        <text x="130" y="151" textAnchor="middle" fontSize="8" fontFamily="Arial" fontWeight="700" fill={tone.ink}>TEST PRODUCT</text>
        <path d="M82 174h96" stroke={tone.main} strokeWidth="4" />
      </g>
    </svg>
  );
}

function ProductCard({
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
  const stockLabel = {
    "in-stock": "Є в наявності",
    low: "Залишилось мало",
    out: "Немає в наявності",
  }[product.stock];

  return (
    <article className="card-lift group relative flex min-h-[500px] flex-col overflow-hidden rounded-3xl border border-black/8 bg-white p-4">
      <span className="absolute left-4 top-4 z-10 rounded-full bg-neon px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-ink">
        Тестовий товар
      </span>
      <button
        type="button"
        aria-label={favorite ? `Прибрати ${product.name} з обраного` : `Додати ${product.name} в обране`}
        onClick={onFavorite}
        className={`absolute right-4 top-4 z-10 grid size-10 cursor-pointer place-items-center rounded-full border transition ${
          favorite ? "border-neon bg-neon text-ink" : "border-black/10 bg-white text-ink hover:border-neon"
        }`}
      >
        <Heart size={18} fill={favorite ? "currentColor" : "none"} />
      </button>
      <Link href={`/product/${product.slug}`} aria-label={`Відкрити тестову сторінку ${product.name}`} className="rounded-2xl bg-[radial-gradient(circle_at_50%_35%,#ffffff_0%,#eef0f1_58%,#dfe3e5_100%)] pt-7">
        <ProductArt product={product} />
      </Link>
      <div className="flex flex-1 flex-col pt-4">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-muted">{product.brand}</p>
        <h3 className="mt-1 text-lg font-black tracking-tight text-ink"><Link href={`/product/${product.slug}`} className="transition hover:text-[#5f8500]">{product.name}</Link></h3>
        <p className="mt-1 text-sm text-muted">{product.packageLabel}</p>
        <p className="mt-3 min-h-[3.75rem] overflow-hidden text-sm leading-5 text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">{product.summary}</p>
        <p className={`mt-2 text-xs font-bold ${product.stock === "out" ? "text-red-600" : "text-[#4f7600]"}`}>
          {stockLabel}
        </p>
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
            aria-label={`Додати ${product.name} у кошик`}
            className="grid size-12 cursor-pointer place-items-center rounded-2xl bg-neon text-ink transition hover:bg-[#9ee000] disabled:cursor-not-allowed disabled:bg-black/10 disabled:text-black/35"
          >
            <ShoppingCart size={21} />
          </button>
        </div>
      </div>
    </article>
  );
}

export function HomeStorefront({ categories, products, sportsNews }: HomeStorefrontProps) {
  const { addItem, itemCount, openCart } = useDemoCart();
  const [activeTab, setActiveTab] = useState<ProductTag>("hits");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catalogOpen, setCatalogOpen] = useState(false);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("uk-UA");
    return products.filter((product) => {
      const matchesTab = product.tags.includes(activeTab);
      const matchesQuery = !normalized || `${product.brand} ${product.name} ${product.packageLabel}`.toLocaleLowerCase("uk-UA").includes(normalized);
      return matchesTab && matchesQuery;
    });
  }, [activeTab, products, query]);

  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  };

  const toggleFavorite = (product: DemoProduct) => {
    setFavorites((current) => {
      const next = new Set(current);
      if (next.has(product.id)) {
        next.delete(product.id);
        notify(`${product.name} прибрано з обраного`);
      } else {
        next.add(product.id);
        notify(`${product.name} додано в обране`);
      }
      return next;
    });
  };

  const addToCart = (product: DemoProduct) => {
    addItem({ productId: product.id, option: product.packageLabel });
    notify(`${product.name} додано в демонстраційний кошик`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-mist">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/95 text-white backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1460px] items-center gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <Link href="/" className="relative z-10 h-[94px] w-[166px] shrink-0 overflow-hidden sm:h-[112px] sm:w-[194px]" aria-label="GainLab — на головну">
            <Image src="/brand/gainlab-logo.jpg" alt="GainLab — лабораторія твого прогресу" width={230} height={230} priority className="absolute -left-1.5 -top-[42px] h-[178px] w-[178px] max-w-none mix-blend-screen sm:-left-4 sm:-top-[44px] sm:h-[210px] sm:w-[210px]" />
            <span className="absolute inset-x-0 bottom-0 bg-black py-1 text-center text-[7px] font-black uppercase leading-none tracking-[0.1em] text-white sm:hidden">Лабораторія твого прогресу</span>
          </Link>
          <label className="hidden h-12 flex-1 items-center overflow-hidden rounded-xl bg-white lg:flex">
            <Search className="ml-4 text-black/45" size={19} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Пошук тестових товарів і брендів" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-black/40" />
            <a href="#popular" className="grid h-full w-14 place-items-center bg-neon text-ink" aria-label="Перейти до результатів пошуку"><ArrowRight size={19} /></a>
          </label>
          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <button type="button" onClick={() => notify("Особистий кабінет буде реалізовано на наступному етапі")} className="hidden cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold hover:bg-white/8 md:flex"><CircleUserRound size={20} /> Увійти</button>
            <button type="button" onClick={() => notify(`В обраному: ${favorites.size}`)} className="relative grid size-11 cursor-pointer place-items-center rounded-xl hover:bg-white/8" aria-label="Обране"><Heart size={22} />{favorites.size > 0 ? <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-neon text-[10px] font-black text-ink">{favorites.size}</span> : null}</button>
            <button type="button" onClick={openCart} className="relative grid size-11 cursor-pointer place-items-center rounded-xl hover:bg-white/8" aria-label={`Відкрити тестовий кошик, товарів: ${itemCount}`}><ShoppingCart size={22} />{itemCount > 0 ? <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-neon text-[10px] font-black text-ink">{itemCount}</span> : null}</button>
            <button type="button" onClick={() => setMobileOpen((value) => !value)} className="grid size-11 cursor-pointer place-items-center rounded-xl hover:bg-white/8 lg:hidden" aria-label="Відкрити меню">{mobileOpen ? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>

        <nav className="relative border-t border-white/8">
          <div className="mx-auto hidden max-w-[1460px] grid-cols-[210px_minmax(0,1fr)] px-4 sm:px-6 lg:grid lg:px-8">
            <div aria-hidden="true" />
            <div className="flex min-w-0 items-center gap-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button type="button" onClick={() => setCatalogOpen((value) => !value)} aria-expanded={catalogOpen} aria-controls="desktop-catalog-menu" className="mr-2 flex shrink-0 cursor-pointer items-center gap-2 bg-neon px-4 py-3 text-xs font-black text-ink xl:mr-3 xl:gap-3 xl:px-5 xl:text-sm"><Menu size={18} /> Каталог товарів <ChevronRight className={`transition-transform ${catalogOpen ? "rotate-90" : ""}`} size={17} /></button>
              {categories.map((category) => <Link key={category.id} href={category.href} className="shrink-0 px-2 py-3 text-xs font-bold text-white/78 transition hover:text-neon xl:px-3 xl:text-sm">{category.name}</Link>)}
              {["Акції", "Новинки"].map((item) => <a key={item} href="#popular" className="shrink-0 px-2 py-3 text-xs font-bold text-white/78 transition hover:text-neon xl:px-3 xl:text-sm">{item}</a>)}
            </div>
          </div>
          {catalogOpen ? (
            <div id="desktop-catalog-menu" className="absolute left-0 right-0 top-full hidden border-y border-white/10 bg-[#101314]/98 shadow-[0_28px_70px_rgba(0,0,0,.48)] lg:block">
              <div className="mx-auto grid max-w-[1460px] gap-7 px-8 py-7 lg:grid-cols-4">
                {categories.filter((category) => category.id !== "brands").map((category) => (
                  <section key={category.id} aria-labelledby={`menu-${category.id}`}>
                    <Link id={`menu-${category.id}`} href={category.href} onClick={() => setCatalogOpen(false)} className="flex items-center justify-between border-b border-white/10 pb-3 text-sm font-black text-neon hover:text-white">
                      {category.name}<ChevronRight size={16} />
                    </Link>
                    <div className="mt-3 grid gap-1">
                      {catalogSections.filter((section) => section.categoryId === category.id).map((section) => (
                        <Link key={section.id} href={section.href} onClick={() => setCatalogOpen(false)} className="group rounded-xl px-3 py-2 transition hover:bg-white/6">
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
              <label className="flex h-12 items-center rounded-xl bg-white"><Search className="ml-4 text-black/45" size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Пошук товарів" className="h-full min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none" /></label>
              <button type="button" onClick={() => setCatalogOpen((value) => !value)} aria-expanded={catalogOpen} aria-controls="mobile-catalog-menu" className="mt-3 flex w-full cursor-pointer items-center justify-between rounded-xl bg-neon px-4 py-3 text-sm font-black text-ink">Каталог товарів <ChevronRight className={`transition-transform ${catalogOpen ? "rotate-90" : ""}`} size={17} /></button>
              {catalogOpen ? (
                <div id="mobile-catalog-menu" className="mt-2 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
                  {catalogSections.filter((section) => section.categoryId === "nutrition").map((section) => <Link key={section.id} href={section.href} onClick={() => { setCatalogOpen(false); setMobileOpen(false); }} className="rounded-xl px-3 py-2 text-xs font-bold text-white/82 hover:bg-white/8 hover:text-neon">{section.name}</Link>)}
                </div>
              ) : null}
              <div className="mt-3 grid gap-1">{categories.map((category) => <Link key={category.id} href={category.href} onClick={() => { setCatalogOpen(false); setMobileOpen(false); }} className="rounded-xl px-3 py-3 text-sm font-bold text-white/85 hover:bg-white/8 hover:text-neon">{category.name}</Link>)}</div>
            </div>
          ) : null}
        </nav>
      </header>

      {notice ? <div className="fixed bottom-5 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-neon px-5 py-3 text-center text-xs font-black uppercase tracking-[0.08em] text-ink shadow-2xl" aria-live="polite">{notice}</div> : null}

      <main>
        <section className="relative isolate overflow-hidden bg-ink text-white">
          <div className="absolute -right-28 top-6 -z-10 size-[460px] rounded-full bg-neon/12 blur-[100px]" />
          <div className="mx-auto grid min-h-[610px] max-w-[1460px] items-start gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-14">
            <div className="max-w-3xl">
              <h1 className="display-face text-[clamp(3.5rem,9vw,8.6rem)] leading-[.78] text-white">GAIN<span className="text-neon">LAB</span></h1>
              <p className="display-face mt-6 max-w-[760px] text-[clamp(2rem,4.7vw,4.6rem)] leading-[.9]">Твій прогрес.<br />Твоя формула.</p>
              <p className="mt-7 max-w-2xl text-base leading-7 text-white/68 sm:text-lg">Якісне спортивне харчування, екіпірування та аксесуари для досягнення твоїх цілей. Зараз — демонстраційна локальна версія.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#popular" className="pulse-glow inline-flex h-14 items-center justify-center gap-3 rounded-2xl bg-neon px-7 text-sm font-black uppercase tracking-[0.08em] text-ink transition hover:bg-[#9ee000]">Перейти до каталогу <ArrowRight size={20} /></a><a href="#about-stage" className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/18 px-7 text-sm font-bold text-white transition hover:border-neon hover:text-neon">Що вже готово</a></div>
            </div>
            <aside className="relative mx-auto w-full max-w-[500px] lg:justify-self-end" aria-labelledby="sports-news-title">
              <div className="absolute left-[7%] top-[5%] size-32 rounded-full border border-neon/25" />
              <div className="absolute right-[2%] top-[16%] size-4 rounded-full bg-neon shadow-[0_0_32px_#b6ff00]" />
              <div className="neon-shadow relative flex aspect-square flex-col overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(145deg,#202628_0%,#0b0d0e_58%,#182000_100%)] p-5 sm:p-6">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(182,255,0,.2),transparent_34%)]" />
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neon">Сила / News</p>
                    <h2 id="sports-news-title" className="display-face mt-2 text-2xl leading-none sm:text-3xl">Спортивний дайджест</h2>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-neon text-ink"><Newspaper size={22} /></span>
                </div>

                <div
                  className="relative mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-2 [scrollbar-color:#b6ff00_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-neon/70 [&::-webkit-scrollbar-track]:bg-transparent"
                  role="region"
                  aria-label="Стрічка спортивних новин"
                  tabIndex={0}
                >
                  {sportsNews.length > 0 ? (
                    <div className="divide-y divide-white/10">
                      {sportsNews.map((item) => (
                        <a key={item.id} href={item.url} target="_blank" rel="noreferrer" className="group grid gap-1 py-2.5 first:pt-0 last:pb-0">
                          <span className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[0.12em]">
                            <span className="truncate text-neon">{item.category}</span>
                            <span className="shrink-0 text-white/35">{newsDateFormatter.format(new Date(item.publishedAt))}</span>
                          </span>
                          <span className="line-clamp-2 text-sm font-bold leading-5 text-white/90 transition group-hover:text-neon sm:text-[15px]">{item.title}</span>
                          <span className="flex items-center gap-1.5 text-[11px] text-white/42">{item.source}<ExternalLink size={12} /></span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-3xl border border-white/10 bg-black/25 p-5">
                      <p className="text-sm font-bold text-white/82">Новини тимчасово не завантажились.</p>
                      <p className="mt-2 text-xs leading-5 text-white/48">Можна відкрити перевірені джерела безпосередньо:</p>
                      <div className="mt-4 grid gap-2">
                        {newsSourceLinks.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2 text-xs font-bold text-white/72 hover:text-neon">{source.label}<ExternalLink size={13} /></a>)}
                      </div>
                    </div>
                  )}
                </div>

                <p className="relative mt-4 shrink-0 border-t border-white/10 pt-3 text-[10px] leading-4 text-white/36">Показуємо лише заголовки та посилання. Матеріали відкриваються на сайтах першоджерел.</p>
              </div>
            </aside>
          </div>
          <div className="border-t border-white/10 bg-black/24"><div className="mx-auto grid max-w-[1460px] gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">{[[Truck, "Доставка по Україні"], [ShieldCheck, "Перевірка походження"], [BadgePercent, "Тестові акційні добірки"], [Headphones, "Допомога з вибором"]].map(([Icon, label]) => { const BenefitIcon = Icon as LucideIcon; return <div key={label as string} className="flex items-center gap-3 text-sm font-bold text-white/78"><BenefitIcon className="text-neon" size={24} />{label as string}</div>; })}</div></div>
        </section>

        <section id="categories" className="mx-auto max-w-[1460px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="mb-8 flex items-end justify-between gap-4"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#5f8500]">Навігація</p><h2 className="display-face mt-2 text-3xl sm:text-5xl">Знайди свою категорію</h2></div><Link href="/catalog" className="hidden items-center gap-2 text-sm font-black sm:flex">Увесь каталог <ArrowRight size={18} /></Link></div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{categories.map((category, index) => { const Icon = categoryIcons[category.kind]; return <Link key={category.id} href={category.href} className={`card-lift group relative min-h-[260px] overflow-hidden rounded-3xl border border-white/8 p-5 text-white ${index === 0 ? "bg-[linear-gradient(145deg,#263000,#0b0d0e_70%)]" : "bg-[linear-gradient(145deg,#262c2e,#0b0d0e_72%)]"}`}><div className="absolute -right-8 -top-8 size-40 rounded-full bg-neon/10 blur-2xl" /><Icon className="relative text-neon transition duration-300 group-hover:scale-110" size={74} strokeWidth={1.25} /><div className="absolute bottom-5 left-5 right-5"><p className="mb-2 text-[11px] uppercase tracking-[0.14em] text-white/45">{category.eyebrow}</p><div className="flex items-end justify-between gap-3"><h3 className="text-xl font-black leading-tight">{category.name}</h3><span className="grid size-10 shrink-0 place-items-center rounded-full bg-neon text-ink"><ArrowRight size={18} /></span></div></div></Link>; })}</div>
        </section>

        <section id="popular" className="bg-white py-16 lg:py-20">
          <div className="mx-auto max-w-[1460px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-[#5f8500]">Демо-вітрина</p><h2 className="display-face mt-2 text-3xl sm:text-5xl">Популярні товари</h2></div><div className="flex max-w-full gap-2 overflow-x-auto pb-1">{tabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)} className={`shrink-0 cursor-pointer rounded-full px-4 py-2.5 text-sm font-black transition ${activeTab === tab.id ? "bg-neon text-ink" : "bg-mist text-muted hover:text-ink"}`}>{tab.label}</button>)}</div></div>
            {query ? <p className="mt-5 text-sm text-muted">Результати для: <strong className="text-ink">{query}</strong></p> : null}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.has(product.id)} onFavorite={() => toggleFavorite(product)} onCart={() => addToCart(product)} />)}</div>
            {visibleProducts.length === 0 ? <div className="mt-8 rounded-3xl border border-dashed border-black/15 bg-mist p-10 text-center"><Search className="mx-auto text-muted" /><p className="mt-3 font-black">За цим запитом тестових товарів не знайдено</p><button type="button" onClick={() => setQuery("")} className="mt-4 cursor-pointer text-sm font-bold text-[#5f8500] underline">Очистити пошук</button></div> : null}
          </div>
        </section>

        <section className="mx-auto grid max-w-[1460px] gap-5 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.2rem] bg-ink p-7 text-white sm:p-10"><div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(182,255,0,.3),transparent_66%)]" /><PackageCheck className="relative text-neon" size={40} /><p className="relative mt-8 text-xs font-black uppercase tracking-[0.18em] text-neon">Тестова добірка</p><h3 className="display-face relative mt-3 max-w-md text-3xl leading-[.95] sm:text-5xl">Формула сильного старту</h3><p className="relative mt-5 max-w-md text-sm leading-6 text-white/60">Демонстраційні товари для перевірки компонування головної сторінки. Це не комерційна пропозиція.</p><a href="#popular" className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-neon px-5 py-3 text-sm font-black text-ink">Дивитися добірку <ArrowRight size={18} /></a></div>
          <div className="relative overflow-hidden rounded-[2.2rem] bg-[linear-gradient(135deg,#b6ff00,#78b700)] p-7 text-ink sm:p-10"><div className="absolute -right-20 -top-20 size-64 rounded-full border-[42px] border-black/10" /><Boxes className="relative" size={40} /><p className="relative mt-8 text-xs font-black uppercase tracking-[0.18em]">Архітектура етапу 1</p><h3 className="display-face relative mt-3 max-w-md text-3xl leading-[.95] sm:text-5xl">Готово до розвитку</h3><p className="relative mt-5 max-w-md text-sm font-bold leading-6 text-black/65">Next.js, TypeScript, Tailwind, Prisma та локальна PostgreSQL-конфігурація без придбання хостингу.</p><a href="#about-stage" className="relative mt-7 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-black text-white">Деталі етапу <ArrowRight size={18} /></a></div>
        </section>

        <section className="border-y border-black/8 bg-white"><div className="mx-auto grid max-w-[1460px] gap-6 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">{[[Truck, "Доставка по Україні", "Без непідтверджених обіцянок щодо строків"], [CheckCircle2, "Контроль походження", "Місце для перевірених даних постачальника"], [ShieldCheck, "Безпечна архітектура", "Секрети не зберігаються у вихідному коді"], [Headphones, "Допомога з вибором", "Консультаційний блок без вигаданих гарантій"]].map(([Icon, title, text]) => { const BenefitIcon = Icon as LucideIcon; return <div key={title as string} className="flex gap-4"><span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-neon"><BenefitIcon size={23} /></span><div><h3 className="font-black">{title as string}</h3><p className="mt-1 text-sm leading-5 text-muted">{text as string}</p></div></div>; })}</div></section>

        <section id="about-stage" className="mx-auto max-w-[1460px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20"><div className="grid gap-8 rounded-[2.5rem] bg-graphite p-7 text-white sm:p-10 lg:grid-cols-[.8fr_1.2fr] lg:p-14"><div><p className="text-xs font-black uppercase tracking-[0.18em] text-neon">Етап 1 / локально</p><h2 className="display-face mt-4 text-4xl leading-[.92] sm:text-6xl">Сайт уже можна переглядати без хостингу</h2></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-3xl bg-white/6 p-5"><p className="text-2xl font-black text-neon">01</p><h3 className="mt-3 font-black">Браузер</h3><p className="mt-2 text-sm leading-6 text-white/60">Запусти `pnpm dev` і відкрий localhost:3000 у Chrome або Edge.</p></div><div className="rounded-3xl bg-white/6 p-5"><p className="text-2xl font-black text-neon">02</p><h3 className="mt-3 font-black">Prisma Studio</h3><p className="mt-2 text-sm leading-6 text-white/60">Після запуску PostgreSQL переглядай тестові дані командою `pnpm db:studio`.</p></div><div className="rounded-3xl bg-white/6 p-5"><p className="text-2xl font-black text-neon">03</p><h3 className="mt-3 font-black">Телефон у Wi-Fi</h3><p className="mt-2 text-sm leading-6 text-white/60">`pnpm dev:network` дозволить перевірити адаптивність з телефона у тій самій мережі.</p></div><div className="rounded-3xl bg-white/6 p-5"><p className="text-2xl font-black text-neon">04</p><h3 className="mt-3 font-black">Без оплати</h3><p className="mt-2 text-sm leading-6 text-white/60">Для локальної розробки домен і хостинг не потрібні.</p></div></div></div></section>
      </main>

      <footer id="footer" className="bg-black text-white"><div className="mx-auto grid max-w-[1460px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_2fr] lg:px-8"><div><div className="relative h-[124px] w-[214px] overflow-hidden bg-black"><Image src="/brand/gainlab-logo.jpg" alt="GainLab" width={230} height={230} className="absolute -left-[18px] -top-[49px] h-[230px] w-[230px] max-w-none" /></div><p className="mt-4 max-w-sm text-sm leading-6 text-white/48">Локальна демонстраційна версія. Товари, ціни, знижки та залишки є тестовими.</p></div><div className="grid gap-8 sm:grid-cols-3"><div><h3 className="font-black text-neon">GainLab</h3><div className="mt-4 grid gap-3 text-sm text-white/62"><Link href="/info/about">Про нас</Link><Link href="/info/contacts">Контакти</Link><Link href="/catalog">Каталог</Link></div></div><div><h3 className="font-black text-neon">Покупцям</h3><div className="mt-4 grid gap-3 text-sm text-white/62"><Link href="/info/delivery">Доставка та оплата</Link><Link href="/info/returns">Обмін та повернення</Link></div></div><div><h3 className="font-black text-neon">Документи</h3><div className="mt-4 grid gap-3 text-sm text-white/62"><Link href="/info/privacy">Політика конфіденційності</Link><Link href="/info/offer">Публічна оферта</Link></div></div></div></div><div className="border-t border-white/8 px-4 py-5 text-center text-xs text-white/36">© 2026 GainLab. Демонстраційний інтерфейс етапу 1.</div></footer>
    </div>
  );
}
