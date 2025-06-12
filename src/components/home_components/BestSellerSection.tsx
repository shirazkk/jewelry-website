import type { Product } from "@/lib/products"
import { client } from "@/sanity/lib/client"
import { Star, Crown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default async function BestSellerSection() {
  const query = `
    *[_type == "product" && tag == "Best_selling"]{
     name,
     price,
     oldPrice,
     rating,
     reviews,
     "image": image.asset->url,
     category,
     tag,
     isNew,
     discount,
     slug,
   }
 `
  const products = await client.fetch(query)

  return (
    <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Crown className="w-6 h-6 text-amber-600 mr-2" />
            <span className="text-amber-600 text-sm uppercase tracking-[0.2em] font-medium">Customer Favorites</span>
            <Crown className="w-6 h-6 text-amber-600 ml-2" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-6">Best Sellers</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the pieces our customers love most - timeless designs that have captured hearts worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product: Product) => (
            <Link
              key={product.slug.current}
              href={`/product/${product.slug.current}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover p-6 group-hover:scale-105 transition-transform duration-500"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-full font-medium">NEW</span>
                  )}
                  {product.discount != null && product.discount > 0 && (
                    <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </span>
                  )}
                </div>

                {/* Hover Actions */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex justify-center space-x-4 text-white">
                    <button className="text-sm hover:text-amber-300 transition-colors font-medium">Quick View</button>
                    <span className="text-gray-400">•</span>
                    <button className="text-sm hover:text-amber-300 transition-colors font-medium">Add to Cart</button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-lg mb-3 text-gray-900 group-hover:text-amber-600 transition-colors">
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                      ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">Rs.{product.oldPrice.toLocaleString()}</span>
                    )}
                    <span className="font-semibold text-lg text-gray-900">Rs.{product.price.toLocaleString()}</span>
                  </div>
                  {product.discount && product.discount > 0 && (
                    <span className="text-sm text-green-600 font-medium">Save {product.discount}%</span>
                  )}
                </div>
              </div>
            </Link>
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
  )
}
