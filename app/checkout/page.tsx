import type { Metadata } from "next";
import { DemoCheckout } from "@/components/demo-checkout";

export const metadata: Metadata = {
  title: "Тестове оформлення | GainLab",
  description: "Тестова форма замовлення GainLab без онлайн-оплати.",
};

export default function CheckoutPage() {
  return (
    <>
      <form
        name="gainlab-order"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        aria-hidden="true"
        className="absolute h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip-path:inset(50%)] [clip:rect(0,0,0,0)]"
      >
        <input type="hidden" name="form-name" value="gainlab-order" />
        <input type="hidden" name="subject" />
        <input name="bot-field" />
        <input name="customerName" />
        <input name="phone" />
        <input name="email" />
        <input name="city" />
        <input name="delivery" />
        <input name="comment" />
        <input name="itemCount" />
        <textarea name="orderItems" />
        <input name="orderTotal" />
        <input name="dataConsent" />
      </form>
      <DemoCheckout />
    </>
  );
}
