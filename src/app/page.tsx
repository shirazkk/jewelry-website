import BestSellerSection from "@/components/home_components/BestSellerSection";
import CategoryShowcase from "@/components/home_components/CategoryShowcase";
import HeroSection from "@/components/home_components/HeroSection";
import RefinementSection from "@/components/home_components/RefinementSection";
import client from "@/sanity/lib/client";
import type { Product } from "@/types/products";

export default async function Home() {
  const query = `
  *[_type == "product" && tag == "Best_selling"]{
    name,
    price,
    oldPrice,
    "image": image.asset->url,
    "category": category->title,
    tag,
    isNew,
    stockQuantity,
    "slug": {
      "current": slug.current
    }
  }
`;
  const products = (await client.fetch(query)) as Product[];

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RefinementSection />
        <CategoryShowcase />
        <BestSellerSection products={products} />
      </div>
    </div>
  );
}
