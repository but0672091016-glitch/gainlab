import type { Metadata } from "next";
import { DemoCartProvider } from "@/components/demo-cart";
import { StoreHeader } from "@/components/store-header";
import { getStoreCatalog } from "@/lib/catalog-data";
import "./globals.css";

export const metadata: Metadata = {
  title: "GainLab — лабораторія твого прогресу",
  description:
    "Демонстраційна версія українського магазину спортивного харчування, екіпірування та аксесуарів.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const catalog = await getStoreCatalog();

  return (
    <html lang="uk" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full bg-[#f5f6f7] text-[#0b0d0e] antialiased">
        <DemoCartProvider products={catalog.products}>
          <StoreHeader categories={catalog.categories} sections={catalog.sections} />
          {children}
        </DemoCartProvider>
      </body>
    </html>
  );
}
