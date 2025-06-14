import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProductDetailsClient from "@/components/ProductDetailsClient";
import type { Product } from "@/types/products";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  const dynamicProductPage = `
    *[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      description,
      price,
      oldPrice,
      "slug": slug.current,
      "category": category->name,
      "image": image.asset->url,
      "images": images[].asset->url,
      stockQuantity,
      tag,
      isNew
    }
  `;

  const product: Product = await client.fetch(dynamicProductPage, { slug });

  if (!product) {
    notFound();
  }

  // Fetch related products
  const relatedProducts = product.category
    ? await client.fetch(
        `
        *[_type == "product" && category->name == $catTitle && slug.current != $slug][0...4] {
          _id,
          name,
          price,
          oldPrice,
          "slug": slug.current,
          "image": image.asset->url,
          stockQuantity,
          tag,
          isNew
        }
      `,
        { catTitle: product.category, slug }
      )
    : [];

  return (
    <ProductDetailsClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}