import ProductCard from "@/components/productcard";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

interface Props {
  searchParams: { q: string };
}

export default async function SearchPage({ searchParams }: Props) {
  const query = searchParams.q;

  if (!query) {
    notFound();
  }

  const products = await client.fetch(`
    *[_type == "product" && name match $query + "*"] {
      _id,
      name,
      description,
      price,
      "slug": slug.current,
      "image": image.asset->url
    }
  `, { query });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">
        Search Results for "{query}"
      </h1>
      
      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching "{query}"</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
} 