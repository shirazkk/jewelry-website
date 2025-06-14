import type { Product } from "@/types/products";
import { Star, Crown } from "lucide-react";
import Link from "next/link";
import ProductCard from "../productcard";

interface BestSellerSectionProps {
  products: Product[];
}

export default function BestSellerSection({ products }: BestSellerSectionProps) {
  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-6 h-6 text-amber-600 mr-2" />
            <span className="text-amber-600 text-sm uppercase tracking-[0.2em] font-medium">
              Customer Favorites
            </span>
            <Crown className="w-6 h-6 text-amber-600 ml-2" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">
            Best Sellers
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the pieces our customers love most - timeless designs that
            have captured hearts worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.slug.current} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300 transform hover:scale-105"
          >
            View All Products
            <Star className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
