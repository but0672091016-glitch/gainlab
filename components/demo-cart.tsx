"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import { products, type DemoProduct } from "@/lib/demo-data";
import {
  addDemoCartLine,
  removeDemoCartLine,
  setDemoCartLineQuantity,
  type DemoCartInput,
  type DemoCartLine,
} from "@/lib/demo-cart";

const STORAGE_KEY = "gainlab-demo-cart-v1";
const EMPTY_CART: DemoCartLine[] = [];
let cartSnapshot: DemoCartLine[] = EMPTY_CART;
let cartInitialized = false;
let storageListenerAttached = false;
const cartListeners = new Set<() => void>();

const formatMoney = (value: number) => `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")} ₴`;

function readStoredCart(): DemoCartLine[] {
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((line): line is DemoCartLine => {
      if (!line || typeof line !== "object") return false;
      const candidate = line as Partial<DemoCartLine>;
      return typeof candidate.key === "string"
        && typeof candidate.productId === "string"
        && typeof candidate.option === "string"
        && typeof candidate.quantity === "number"
        && Number.isInteger(candidate.quantity)
        && candidate.quantity > 0
        && candidate.quantity <= 99
        && products.some((product) => product.id === candidate.productId);
    });
  } catch {
    return [];
  }
}

function emitCartChange() {
  cartListeners.forEach((listener) => listener());
}

function initializeCartStore() {
  if (cartInitialized || typeof window === "undefined") return;
  cartInitialized = true;
  cartSnapshot = readStoredCart();

  if (!storageListenerAttached) {
    storageListenerAttached = true;
    window.addEventListener("storage", (event) => {
      if (event.key !== STORAGE_KEY) return;
      cartSnapshot = readStoredCart();
      emitCartChange();
    });
  }
}

function subscribeToCart(listener: () => void) {
  cartListeners.add(listener);
  const previousSnapshot = cartSnapshot;
  initializeCartStore();
  if (previousSnapshot !== cartSnapshot) queueMicrotask(listener);
  return () => cartListeners.delete(listener);
}

function getCartSnapshot() {
  return cartSnapshot;
}

function getServerCartSnapshot() {
  return EMPTY_CART;
}

function replaceCart(next: DemoCartLine[]) {
  cartSnapshot = next;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  emitCartChange();
}

export type DemoCartDetailedLine = DemoCartLine & { product: DemoProduct };

type DemoCartContextValue = {
  lines: DemoCartDetailedLine[];
  itemCount: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (input: DemoCartInput) => void;
  setLineQuantity: (key: string, quantity: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const DemoCartContext = createContext<DemoCartContextValue | null>(null);

export function DemoCartProvider({ children }: { children: ReactNode }) {
  const lines = useSyncExternalStore(subscribeToCart, getCartSnapshot, getServerCartSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const detailedLines = useMemo(() => lines.flatMap((line) => {
    const product = products.find((item) => item.id === line.productId);
    return product ? [{ ...line, product }] : [];
  }), [lines]);
  const itemCount = lines.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = detailedLines.reduce((sum, line) => sum + line.product.price * line.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const value = useMemo<DemoCartContextValue>(() => ({
    lines: detailedLines,
    itemCount,
    subtotal,
    isOpen,
    addItem: (input) => {
      const product = products.find((item) => item.id === input.productId);
      if (!product || product.stock === "out") return;
      replaceCart(addDemoCartLine(cartSnapshot, input));
    },
    setLineQuantity: (key, quantity) => replaceCart(setDemoCartLineQuantity(cartSnapshot, key, quantity)),
    removeLine: (key) => replaceCart(removeDemoCartLine(cartSnapshot, key)),
    clearCart: () => replaceCart([]),
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
  }), [detailedLines, isOpen, itemCount, subtotal]);

  return (
    <DemoCartContext.Provider value={value}>
      {children}
      {isOpen ? (
        <div className="fixed inset-0 z-[100]">
          <button type="button" className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm" onClick={() => setIsOpen(false)} aria-label="Закрити тестовий кошик" />
          <aside role="dialog" aria-modal="true" aria-labelledby="demo-cart-title" className="absolute right-0 top-0 flex h-full w-full max-w-[480px] flex-col bg-white shadow-[-28px_0_80px_rgba(0,0,0,.28)]">
            <div className="flex items-center justify-between border-b border-black/8 px-5 py-5 sm:px-6">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#5f8500]">Демонстраційний режим</p>
                <h2 id="demo-cart-title" className="display-face mt-1 text-3xl">Тестовий кошик</h2>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="grid size-11 cursor-pointer place-items-center rounded-full border border-black/10 hover:border-neon" aria-label="Закрити кошик"><X size={21} /></button>
            </div>

            {detailedLines.length ? (
              <>
                <div className="min-h-0 flex-1 overflow-y-auto px-5 py-2 sm:px-6">
                  {detailedLines.map((line) => (
                    <article key={line.key} className="grid grid-cols-[76px_1fr] gap-4 border-b border-black/8 py-5">
                      <Link href={`/product/${line.product.slug}`} onClick={() => setIsOpen(false)} className="grid size-[76px] place-items-center rounded-2xl bg-mist">
                        <span className="display-face max-w-[68px] truncate text-lg text-black/45">{line.product.artLabel}</span>
                      </Link>
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <Link href={`/product/${line.product.slug}`} onClick={() => setIsOpen(false)} className="font-black hover:text-[#5f8500]">{line.product.name}</Link>
                            <p className="mt-1 text-xs text-muted">{line.option}</p>
                          </div>
                          <button type="button" onClick={() => replaceCart(removeDemoCartLine(cartSnapshot, line.key))} className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-muted hover:bg-red-50 hover:text-red-600" aria-label={`Видалити ${line.product.name} з кошика`}><Trash2 size={17} /></button>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3">
                          <div className="inline-flex items-center rounded-xl border border-black/10 bg-mist p-0.5">
                            <button type="button" onClick={() => replaceCart(setDemoCartLineQuantity(cartSnapshot, line.key, line.quantity - 1))} className="grid size-8 cursor-pointer place-items-center rounded-lg hover:bg-white" aria-label={`Зменшити кількість ${line.product.name}`}><Minus size={15} /></button>
                            <span className="w-8 text-center text-xs font-black">{line.quantity}</span>
                            <button type="button" onClick={() => replaceCart(setDemoCartLineQuantity(cartSnapshot, line.key, line.quantity + 1))} className="grid size-8 cursor-pointer place-items-center rounded-lg hover:bg-white" aria-label={`Збільшити кількість ${line.product.name}`}><Plus size={15} /></button>
                          </div>
                          <p className="font-black">{formatMoney(line.product.price * line.quantity)}</p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
                <div className="border-t border-black/8 bg-mist px-5 py-5 sm:px-6">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">Разом, тестова сума</p>
                      <p className="mt-1 text-3xl font-black">{formatMoney(subtotal)}</p>
                    </div>
                    <span className="rounded-full bg-neon px-3 py-1.5 text-xs font-black">{itemCount} шт.</span>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-muted">Тестове оформлення не створює реального замовлення і не проводить оплату. Кошик зберігається лише у браузері цього пристрою.</p>
                  <Link href="/checkout" onClick={() => setIsOpen(false)} className="mt-4 inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-neon text-sm font-black text-ink transition hover:bg-[#9ee000]">Перейти до тестового оформлення <ArrowRight size={18} /></Link>
                </div>
              </>
            ) : (
              <div className="grid flex-1 place-items-center px-6 text-center">
                <div>
                  <span className="mx-auto grid size-20 place-items-center rounded-full bg-mist text-muted"><ShoppingCart size={32} /></span>
                  <h3 className="display-face mt-5 text-3xl">Кошик порожній</h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-muted">Додайте тестовий товар — він з’явиться тут і залишиться після переходу на іншу сторінку.</p>
                  <Link href="/catalog" onClick={() => setIsOpen(false)} className="mt-6 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-neon px-6 text-sm font-black">Перейти до каталогу <ArrowRight size={17} /></Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      ) : null}
    </DemoCartContext.Provider>
  );
}

export function useDemoCart() {
  const context = useContext(DemoCartContext);
  if (!context) throw new Error("useDemoCart must be used inside DemoCartProvider");
  return context;
}
