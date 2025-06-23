"use client";
import type { Product } from "@/types/products";
import {
  Eye,
  Heart,
  Sparkles,
  Award,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100 hover:border-amber-200">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-amber-50 to-gray-50">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className={`object-cover p-4 transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Loading shimmer effect */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
          {product.isNew && (
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center">
              <Sparkles className="w-3 h-3 mr-1" />
              NEW
            </div>
          )}
          {product.discount != null && product.discount > 0 && (
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
              -{product.discount}% OFF
            </div>
          )}
          {product.stockQuantity === 0 && (
            <div className="bg-gray-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
              Out of Stock
            </div>
          )}
          {product.tag === "Best_selling" && (
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center">
              <Award className="w-3 h-3 mr-1" />
              Best Seller
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white z-10"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          />
        </button>

        {/* Stock Status Indicator */}
        {product.stockQuantity &&
          product.stockQuantity <= 5 &&
          product.stockQuantity > 0 && (
            <div className="absolute bottom-3 left-3 bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Only {product.stockQuantity} left
            </div>
          )}

        {/* Quick Actions Overlay */}
        <div className="lg:block hidden absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-3">
            <Link
              href={`/product/${product.slug.current}`}
              className="flex items-center px-4 py-2.5 bg-white/20 backdrop-blur-md text-white text-sm font-medium rounded-lg hover:bg-white/30 transition-colors duration-200 border border-white/20"
            >
              <Eye className="w-4 h-4 mr-2" />
              Quick View
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Category & Status */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider bg-amber-50 px-2 py-1 rounded-full">
            {product.category}
          </span>
          {product.tag === "Best_selling" && (
            <div className="flex items-center text-xs text-purple-600 font-medium bg-purple-50 px-2 py-1 rounded-full">
              <Award className="w-3 h-3 mr-1" />
              Best Seller
            </div>
          )}
        </div>

        {/* Product Name */}
        <Link href={`/product/${product.slug.current}`}>
          <h3 className="font-serif text-lg font-semibold text-gray-900 hover:text-amber-600 transition-colors duration-200 line-clamp-2 leading-tight min-h-[3.5rem]">
            {product.name}
          </h3>
        </Link>

        {/* Price Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.oldPrice && (
                <span className="text-sm text-gray-400 line-through font-medium">
                  Rs.{product.oldPrice.toLocaleString()}
                </span>
              )}
              <span className="font-bold text-xl text-gray-900">
                Rs.{product.price.toLocaleString()}
              </span>
            </div>
            {product.discount && product.discount > 0 && (
              <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">
                Save {product.discount}%
              </div>
            )}
          </div>

          {/* Savings Amount */}
          {product.oldPrice && product.oldPrice > product.price && (
            <p className="text-sm text-green-600 font-medium">
              You save Rs.{(product.oldPrice - product.price).toLocaleString()}
            </p>
          )}
        </div>

        {/* Action Buttons - Mobile */}
        <div className="flex items-center space-x-3 pt-2 lg:hidden">
          <Link
            href={`/product/${product.slug.current}`}
            className="flex-1 flex items-center justify-center px-4 py-3 border-2 border-amber-600 text-amber-600 text-sm font-semibold rounded-xl hover:bg-amber-50 transition-colors duration-200"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
