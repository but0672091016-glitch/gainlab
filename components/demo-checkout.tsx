"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  CreditCard,
  LockKeyhole,
  MapPin,
  PackageCheck,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useDemoCart } from "@/components/demo-cart";

const formatMoney = (value: number) => `${String(value).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0")} ₴`;

type Confirmation = {
  itemCount: number;
  subtotal: number;
};

export function DemoCheckout() {
  const { lines, itemCount, subtotal, clearCart, openCart } = useDemoCart();
  const [deliveryMethod, setDeliveryMethod] = useState<"branch" | "address">("branch");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  const submitDemoOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!itemCount) return;
    setConfirmation({ itemCount, subtotal });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (confirmation) {
    return (
      <main className="min-h-[calc(100vh-120px)] bg-mist px-4 py-10 text-ink sm:px-6 sm:py-16 lg:px-8">
        <section className="mx-auto max-w-3xl overflow-hidden rounded-[2.5rem] border border-black/7 bg-white shadow-[0_28px_100px_rgba(11,13,14,.1)]">
          <div className="bg-ink px-6 py-10 text-center text-white sm:px-10 sm:py-14">
            <span className="mx-auto grid size-20 place-items-center rounded-full bg-neon text-ink"><CheckCircle2 size={38} /></span>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.2em] text-neon">Демонстрацію завершено</p>
            <h1 className="display-face mt-3 text-4xl leading-[.9] sm:text-6xl">Тестове оформлення готове</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/65 sm:text-base">Реальне замовлення не створено, введені дані нікуди не передавалися, оплата не проводилася.</p>
          </div>
          <div className="grid gap-6 px-6 py-8 sm:grid-cols-2 sm:px-10 sm:py-10">
            <div className="rounded-2xl bg-mist p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-muted">Товарів у перевірці</p><p className="mt-2 text-3xl font-black">{confirmation.itemCount} шт.</p></div>
            <div className="rounded-2xl bg-mist p-5"><p className="text-xs font-black uppercase tracking-[0.14em] text-muted">Тестова сума</p><p className="mt-2 text-3xl font-black">{formatMoney(confirmation.subtotal)}</p></div>
          </div>
          <div className="flex flex-col gap-3 px-6 pb-10 sm:flex-row sm:px-10">
            <Link href="/catalog" className="inline-flex h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-neon px-6 text-sm font-black transition hover:bg-[#9ee000]">Повернутися до каталогу <ArrowRight size={18} /></Link>
            <Link href="/" className="inline-flex h-14 flex-1 items-center justify-center rounded-2xl border border-black/10 px-6 text-sm font-black transition hover:border-neon">На головну</Link>
          </div>
        </section>
      </main>
    );
  }

  if (!itemCount) {
    return (
      <main className="grid min-h-[calc(100vh-120px)] place-items-center bg-mist px-4 py-12 text-center text-ink">
        <section className="w-full max-w-xl rounded-[2.5rem] border border-black/7 bg-white px-6 py-12 shadow-[0_28px_100px_rgba(11,13,14,.08)] sm:px-10">
          <span className="mx-auto grid size-20 place-items-center rounded-full bg-mist text-muted"><ShoppingCart size={34} /></span>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.18em] text-[#5f8500]">Тестове оформлення</p>
          <h1 className="display-face mt-3 text-4xl sm:text-5xl">Кошик порожній</h1>
          <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted">Спочатку додайте хоча б один тестовий товар. Після цього тут з’являться форма та підсумок.</p>
          <Link href="/catalog" className="mt-7 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-neon px-7 text-sm font-black transition hover:bg-[#9ee000]">Перейти до каталогу <ArrowRight size={18} /></Link>
        </section>
      </main>
    );
  }

  const inputClass = "mt-2 h-12 w-full rounded-xl border border-black/10 bg-mist px-4 text-sm font-bold outline-none transition placeholder:font-normal placeholder:text-black/35 focus:border-[#79aa00] focus:bg-white focus:ring-4 focus:ring-neon/15";

  return (
    <main className="min-h-screen bg-mist text-ink">
      <section className="bg-ink text-white">
        <div className="mx-auto max-w-[1320px] px-4 py-9 sm:px-6 sm:py-12 lg:px-8">
          <Link href="/catalog" className="inline-flex items-center gap-2 text-sm font-bold text-white/58 transition hover:text-neon"><ArrowLeft size={18} /> Продовжити покупки</Link>
          <div className="mt-7 max-w-3xl">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-neon">Без передачі даних і оплати</p>
            <h1 className="display-face mt-3 text-5xl leading-[.88] sm:text-7xl">Тестове оформлення</h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/62 sm:text-base">Перевіряємо структуру майбутнього замовлення. Ця форма працює тільки в браузері й не надсилає введені відомості.</p>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1320px] gap-7 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:px-8">
        <form id="demo-checkout-form" onSubmit={submitDemoOrder} className="space-y-6">
          <section className="rounded-[2rem] border border-black/7 bg-white p-5 shadow-[0_18px_70px_rgba(11,13,14,.05)] sm:p-7" aria-labelledby="contact-title">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-neon font-black">01</span>
              <div><h2 id="contact-title" className="text-xl font-black">Контактні дані</h2><p className="mt-1 text-sm text-muted">Потрібні лише для перевірки форми; вони не зберігаються.</p></div>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-black">Ім’я та прізвище<input name="customerName" type="text" minLength={2} maxLength={80} autoComplete="name" required placeholder="Тестовий покупець" className={inputClass} /></label>
              <label className="text-sm font-black">Телефон<input name="phone" type="tel" inputMode="tel" minLength={7} maxLength={20} autoComplete="tel" required placeholder="+380…" className={inputClass} /></label>
              <label className="text-sm font-black sm:col-span-2">Email — необов’язково<input name="email" type="email" maxLength={120} autoComplete="email" placeholder="demo@example.com" className={inputClass} /></label>
            </div>
          </section>

          <section className="rounded-[2rem] border border-black/7 bg-white p-5 shadow-[0_18px_70px_rgba(11,13,14,.05)] sm:p-7" aria-labelledby="delivery-title">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-neon font-black">02</span>
              <div><h2 id="delivery-title" className="text-xl font-black">Тестовий спосіб доставки</h2><p className="mt-1 text-sm text-muted">Тарифи, строки та інтеграція з перевізником ще не підключені.</p></div>
            </div>
            <label className="mt-6 block text-sm font-black">Населений пункт<input name="city" type="text" minLength={2} maxLength={80} autoComplete="address-level2" required placeholder="Наприклад, Київ" className={inputClass} /></label>
            <fieldset className="mt-5 grid gap-3 sm:grid-cols-2">
              <legend className="sr-only">Спосіб доставки</legend>
              <label className={`cursor-pointer rounded-2xl border p-4 transition ${deliveryMethod === "branch" ? "border-[#79aa00] bg-neon/10" : "border-black/10 hover:border-neon"}`}>
                <input type="radio" name="delivery" value="branch" checked={deliveryMethod === "branch"} onChange={() => setDeliveryMethod("branch")} className="sr-only" />
                <Truck size={24} /><span className="mt-3 block font-black">До відділення</span><span className="mt-1 block text-xs leading-5 text-muted">Вибір перевізника й відділення з’явиться після інтеграції.</span>
              </label>
              <label className={`cursor-pointer rounded-2xl border p-4 transition ${deliveryMethod === "address" ? "border-[#79aa00] bg-neon/10" : "border-black/10 hover:border-neon"}`}>
                <input type="radio" name="delivery" value="address" checked={deliveryMethod === "address"} onChange={() => setDeliveryMethod("address")} className="sr-only" />
                <MapPin size={24} /><span className="mt-3 block font-black">Адресна доставка</span><span className="mt-1 block text-xs leading-5 text-muted">Адресне поле навмисно не збирається в цій демоверсії.</span>
              </label>
            </fieldset>
            <label className="mt-5 block text-sm font-black">Коментар — необов’язково<textarea name="comment" rows={3} maxLength={300} placeholder="Демонстраційний коментар" className="mt-2 w-full resize-y rounded-xl border border-black/10 bg-mist px-4 py-3 text-sm outline-none transition placeholder:text-black/35 focus:border-[#79aa00] focus:bg-white focus:ring-4 focus:ring-neon/15" /></label>
          </section>

          <section className="rounded-[2rem] border border-black/7 bg-white p-5 shadow-[0_18px_70px_rgba(11,13,14,.05)] sm:p-7" aria-labelledby="payment-title">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-neon font-black">03</span>
              <div><h2 id="payment-title" className="text-xl font-black">Оплата не підключена</h2><p className="mt-1 text-sm text-muted">Сайт не запитує карткові реквізити й не проводить платежі.</p></div>
            </div>
            <div className="mt-6 flex items-center gap-4 rounded-2xl border border-dashed border-black/15 bg-mist p-5"><CreditCard className="shrink-0 text-muted" size={30} /><div><p className="font-black">Тільки перевірка інтерфейсу</p><p className="mt-1 text-xs leading-5 text-muted">Реальні способи оплати додамо після погодження платіжного провайдера та юридичних умов.</p></div></div>
          </section>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-black/8 bg-white p-5 text-sm leading-6 shadow-[0_12px_40px_rgba(11,13,14,.04)]">
            <input type="checkbox" name="demoConsent" required className="mt-1 size-5 shrink-0 accent-[#79aa00]" />
            <span><strong>Розумію, що це демонстрація.</strong> Замовлення не буде створено, а введені дані не будуть надіслані або збережені.</span>
          </label>
        </form>

        <aside className="self-start rounded-[2rem] border border-black/7 bg-white p-5 shadow-[0_22px_80px_rgba(11,13,14,.08)] sm:p-6 lg:sticky lg:top-[190px]" aria-labelledby="summary-title">
          <div className="flex items-center justify-between gap-4"><div><p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#5f8500]">Локальний кошик</p><h2 id="summary-title" className="mt-1 text-2xl font-black">Ваші тестові товари</h2></div><span className="rounded-full bg-neon px-3 py-1.5 text-xs font-black">{itemCount} шт.</span></div>
          <div className="mt-5 divide-y divide-black/8 border-y border-black/8">
            {lines.map((line) => (
              <article key={line.key} className="grid grid-cols-[58px_1fr_auto] gap-3 py-4">
                <span className="grid size-[58px] place-items-center rounded-xl bg-mist text-xs font-black text-black/45">{line.product.artLabel.slice(0, 5)}</span>
                <div className="min-w-0"><Link href={`/product/${line.product.slug}`} className="line-clamp-2 text-sm font-black hover:text-[#5f8500]">{line.product.name}</Link><p className="mt-1 text-xs text-muted">{line.option} · {line.quantity} шт.</p></div>
                <p className="whitespace-nowrap text-sm font-black">{formatMoney(line.product.price * line.quantity)}</p>
              </article>
            ))}
          </div>
          <button type="button" onClick={openCart} className="mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-black text-[#5f8500] hover:text-ink"><ShoppingCart size={17} /> Змінити кошик</button>
          <div className="mt-5 flex items-end justify-between gap-4 border-t border-black/8 pt-5"><div><p className="text-xs font-black uppercase tracking-[0.14em] text-muted">Разом, тестова сума</p><p className="mt-1 text-xs text-muted">Без доставки та оплати</p></div><p className="text-3xl font-black">{formatMoney(subtotal)}</p></div>
          <button form="demo-checkout-form" type="submit" className="mt-6 inline-flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-neon px-5 text-sm font-black transition hover:bg-[#9ee000]">Підтвердити тестове оформлення <Check size={18} /></button>
          <div className="mt-5 grid gap-3 text-xs leading-5 text-muted">
            <p className="flex gap-2"><ShieldCheck className="mt-0.5 shrink-0 text-[#5f8500]" size={16} /> Дані залишаються тільки у відкритій сторінці до завершення демонстрації.</p>
            <p className="flex gap-2"><LockKeyhole className="mt-0.5 shrink-0 text-[#5f8500]" size={16} /> Карткові реквізити не запитуються.</p>
            <p className="flex gap-2"><PackageCheck className="mt-0.5 shrink-0 text-[#5f8500]" size={16} /> Натискання очистить локальний кошик, але не створить замовлення.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
