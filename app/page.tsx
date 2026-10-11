import { HomeStorefront } from "@/components/home-storefront";
import { categories, products } from "@/lib/demo-data";
import { getSportsNews } from "@/lib/sports-news";

export default async function Home() {
  const sportsNews = await getSportsNews();
  const featuredProducts = products.filter((product) => product.categoryId === "nutrition");

  return <HomeStorefront categories={categories} products={featuredProducts} sportsNews={sportsNews} />;
}
