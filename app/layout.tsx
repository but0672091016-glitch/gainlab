import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GainLab — лабораторія твого прогресу",
  description:
    "Демонстраційна версія українського магазину спортивного харчування, екіпірування та аксесуарів.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full bg-[#f5f6f7] text-[#0b0d0e] antialiased">
        {children}
      </body>
    </html>
  );
}
