import ShopHeader from "@/components/shop_components/ShopHeader"
import ProductGrid from "@/components/shop_components/ProductGrid"
import { client } from "@/sanity/lib/client"

export default async function ShopPage() {
  const productQuery = `
    *[_type == "product"]{
     slug,
     name,
     price,
     oldPrice,
     "image": image.asset->url,
     "category": category->title,
     tag,
     isNew,
     stockQuantity
   }
  `
  const products = await client.fetch(productQuery)

  const categoryQuery = `
    *[_type == "categories"]{
      title
    }
  `
  const categories = await client.fetch(categoryQuery)

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <ProductGrid products={products} categories={categories.map((cat: { title: string }) => cat.title)} />
      </div>
    </div>
  )
}
