"use client"
import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/lib/products"
import { useCart } from "@/lib/cart-context"
import { Star, Heart, Eye, ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
  viewMode?: "grid" | "list"
}

export default function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const { addToCart } = useCart()

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-80 h-64 md:h-48">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover p-4" />
            {product.isNew && (
              <div className="absolute top-4 left-4 bg-green-600 rounded-full text-white text-xs px-3 py-1 font-medium">
                NEW
              </div>
            )}
            {(product.discount ?? 0) > 0 && (
              <div className="absolute top-4 right-4 bg-red-600 rounded-full text-white text-xs px-3 py-1 font-medium">
                -{product.discount}%
              </div>
            )}
          </div>

          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link href={`/product/${product.slug.current}`}>
                  <h3 className="font-serif text-xl mb-2 text-gray-900 hover:text-amber-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-3">{product.category}</p>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                  ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">({product.reviews})</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {product.oldPrice && (
                  <span className="text-sm text-gray-400 line-through">Rs.{product.oldPrice.toLocaleString()}</span>
                )}
                <span className="font-semibold text-xl text-gray-900">Rs.{product.price.toLocaleString()}</span>
              </div>

              <div className="flex items-center space-x-2">
                <Link
                  href={`/product/${product.slug.current}`}
                  className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <Eye className="w-5 h-5" />
                </Link>
                <button
                  onClick={() => addToCart(product,1)}
                  className="flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
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
          {(product.discount ?? 0) > 0 && (
            <span className="bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:text-red-500 hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100">
          <Heart className="w-4 h-4" />
        </button>

        {/* Quick Actions */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex justify-center space-x-4">
            <Link
              href={`/product/${product.slug.current}`}
              className="flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-lg hover:bg-white/30 transition-colors"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Link>
            <button
              onClick={() => addToCart(product, 1)}
              className="flex items-center px-4 py-2 bg-amber-600 text-white text-sm font-medium rounded-lg hover:bg-amber-700 transition-colors"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Link href={`/product/${product.slug.current}`}>
          <h3 className="font-serif text-lg mb-3 text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

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
    </div>
  )
}
