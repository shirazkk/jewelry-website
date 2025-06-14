import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import type { Product } from "@/types/products";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const dynamicProductPage = `
      *[_type == "product" && slug.current == $slug][0]{
        name,
        price,
        oldPrice,
        "image": image.asset->url,
        "category": category->title, 
        tag,
        isNew,
        stockQuantity,
        slug
      }
    `;
    const product: Product = await client.fetch(dynamicProductPage, { slug: params.slug });

    if (!product) {
      notFound();
    }

    const relatedProducts: Product[] = product.category
      ? await client.fetch<Product[]>(
          `
          *[_type == "product" && category->title == $catTitle && slug.current != $slug][0...4]{
            "slug": slug,
            name,
            price,
            oldPrice,
            "image": image.asset->url,
            isNew
          }
        `,
          { catTitle: product.category, slug: params.slug }
        )
      : [];

    return (
      <ProductDetailsClient product={product} relatedProducts={relatedProducts} />
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-10">
            <h2 className="text-2xl font-serif text-red-900 mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-red-700 mb-6">
              We couldn&apos;t load the product details. Please try again later.
            </p>
            <Link href="/" className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-red-600 hover:bg-red-700 text-primary-foreground h-10 px-4 py-2">
              Go back home
            </Link>
          </div>
        </div>
      </div>
    );
  }
}