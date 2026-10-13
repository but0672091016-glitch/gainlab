import { HomeStorefront } from "@/components/home-storefront";
import { getStoreCatalog } from "@/lib/catalog-data";
import { getSportsNews } from "@/lib/sports-news";

export default async function Home() {
  const [sportsNews, catalog] = await Promise.all([getSportsNews(), getStoreCatalog()]);
  const featuredProducts = catalog.products.filter((product) => product.categoryId === "nutrition");

  return <HomeStorefront categories={catalog.categories} products={featuredProducts} sportsNews={sportsNews} />;
}
