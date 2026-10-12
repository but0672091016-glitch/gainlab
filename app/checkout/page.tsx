import type { Metadata } from "next";
import { DemoCheckout } from "@/components/demo-checkout";

export const metadata: Metadata = {
  title: "Тестове оформлення | GainLab",
  description: "Тестова форма замовлення GainLab без онлайн-оплати.",
};

export default function CheckoutPage() {
  return <DemoCheckout />;
}
