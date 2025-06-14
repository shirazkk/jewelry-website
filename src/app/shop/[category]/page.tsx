import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProductGrid from "@/components/shop_components/ProductGrid";
import ShopHeader from "@/components/shop_components/ShopHeader";

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category;

  // Fetch products for this category
  const productQuery = `
    *[_type == "product" && category->title match $category]{
      name,
      price,
      oldPrice,
      rating,
      reviews,
      "image": image.asset->url,
      "category": category->title,
      tag,
      isNew,
      discount,
      "slug": {
        "current": slug.current
      }
    }
  `;

  const products = await client.fetch(productQuery, { category });

  // Fetch all categories for the filter
  const categoryQuery = `
    *[_type == "categories"]{
      title
    }
  `;
  const categories = await client.fetch(categoryQuery);

  if (!products || products.length === 0) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-serif text-4xl md:text-5xl text-gray-900 capitalize">
            {category} Collection
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Discover our exquisite collection of {category.toLowerCase()} pieces, each crafted with precision and passion.
          </p>
        </div>
        <ProductGrid 
          products={products} 
          categories={categories.map((cat: { title: string }) => cat.title)} 
        />
      </div>
    </div>
  );
} 