import type { Metadata } from "next";
import { DemoCheckout } from "@/components/demo-checkout";

export const metadata: Metadata = {
  title: "Тестове оформлення | GainLab",
  description: "Демонстраційна форма оформлення без передачі даних, створення замовлення або оплати.",
};

export default function CheckoutPage() {
  return <DemoCheckout />;
}
