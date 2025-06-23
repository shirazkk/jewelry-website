"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ProductCard from "@/components/productcard";
import client from "@/sanity/lib/client";
import { Product } from "@/types/products";

function SearchResults() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const results = await client.fetch<Product[]>(
          `*[_type == "product" && name match $searchQuery] {
            _id,
            name,
            description,
            price,
            "slug": { "current": slug.current },
            "image": image.asset->url
          }`,
          { searchQuery: `${searchQuery}*` }
        );
        setProducts(results);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (!searchQuery) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Please enter a search term</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Search Results for &quot;{searchQuery}&quot;
      </h1>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching &quot;{searchQuery}&quot;</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product._id || product.slug.current} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

// Loading component for the Suspense fallback
function LoadingState() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <SearchResults />
    </Suspense>
  );
} 