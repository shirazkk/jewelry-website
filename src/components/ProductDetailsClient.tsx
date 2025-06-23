"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Truck,
  Shield,
  RotateCcw,
  Award,
  Gem,
  Heart,
  Minus,
  Plus,
  Share2,
} from "lucide-react";
import type { Product } from "@/types/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import AddToCartButton from "@/components/add-to-cart-button";

interface ProductDetailsClientProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailsClient({
  product,
  relatedProducts,
}: ProductDetailsClientProps) {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product.images && product.images.length > 0 ? product.images[0] : product.image || "/placeholder.svg"
  );

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  const handleShareProduct = async () => {
    try {
      const shareUrl = window.location.href;
      const title = product.name;

      // For mobile devices, use the Web Share API
      if (navigator.share) {
        await navigator.share({
          title,
          text: `Check out this product: ${product.name}`,
          url: shareUrl,
        });
      } else {
        // Fallback for desktop: Open the share link in a new tab (social media or email)
        const encodedUrl = encodeURIComponent(shareUrl);
        const encodedTitle = encodeURIComponent(title);

        const shareOptions = [
          {
            name: "WhatsApp",
            url: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
          },
          {
            name: "Facebook",
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
          },
          {
            name: "Twitter",
            url: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
          },
          {
            name: "Email",
            url: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
          },
        ];

        const shareWindow = window.open(shareOptions[0].url, "_blank"); // Opening WhatsApp by default
        shareWindow?.focus();
      }
    } catch (error) {
      console.error("Share failed:", error);
      alert("Failed to share the product.");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Enhanced Breadcrumb */}
      <div className="bg-amber-50 py-4 px-4 md:px-6 border-b border-amber-100">
        <div className="max-w-7xl mx-auto flex items-center text-sm text-amber-700">
          <Link
            href="/"
            className="hover:text-amber-900 transition-colors font-medium"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-amber-400" />
          <Link href="/shop" className="hover:text-amber-900 transition-colors">
            Shop
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-amber-400" />
          <Link
            href={`/shop/${product.category?.toLowerCase()}`}
            className="hover:text-amber-900 transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-amber-400" />
          <span className="text-amber-900 truncate max-w-[200px] font-medium">
            {product.name}
          </span>
        </div>
      </div>

      {/* Enhanced Product Details */}
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Enhanced Images Section */}
          <div className="space-y-6">
            <div className="relative aspect-square overflow-hidden rounded-3xl border-2 border-gray-100 bg-gradient-to-br from-amber-50 to-white shadow-xl">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover p-8 hover:scale-105 transition-transform duration-700"
                priority
              />
              {product.isNew && (
                <Badge className="absolute top-6 left-6 bg-green-600 text-white font-medium px-4 py-2 text-sm">
                  New Arrival
                </Badge>
              )}
              {product.discount && (
                <Badge className="absolute top-6 right-6 bg-red-600 text-white font-medium px-4 py-2 text-sm">
                  {product.discount}% Off
                </Badge>
              )}
            </div>

            {/* Enhanced Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
              {(product.images && product.images.length > 0 ? product.images : [product.image || "/placeholder.svg"]).map((img, i) => (
                <div
                  key={i}
                  className={`relative aspect-square overflow-hidden rounded-xl border-2 cursor-pointer transition-all duration-300 bg-gradient-to-br from-amber-50 to-white shadow-sm hover:shadow-md ${selectedImage === img ? "border-amber-600 ring-2 ring-amber-400" : "border-gray-200 hover:border-amber-600"}`}
                  onClick={() => setSelectedImage(img)}
                  aria-label={`Show image ${i + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover p-3 hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Product Info */}
          <div className="space-y-8">
            {/* Enhanced Tag */}
            {product.tag && (
              <Badge
                variant="secondary"
                className="text-xs font-semibold tracking-wider px-4 py-2 bg-amber-100 text-amber-800"
              >
                {product.tag.replace("_", " ").toUpperCase()}
              </Badge>
            )}

            {/* Enhanced Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-900 leading-tight">
                {product.name}
              </h1>
            </div>

            {/* Enhanced Pricing */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-4xl md:text-5xl font-bold text-gray-900">
                  Rs.{product.price.toLocaleString()}
                </span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-2xl text-gray-500 line-through">
                    Rs.{product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>
              {product.oldPrice && product.oldPrice > product.price && (
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-100 text-green-800 font-semibold px-3 py-1">
                    Save Rs.
                    {(product.oldPrice - product.price).toLocaleString()} (
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off)
                  </Badge>
                  <span className="text-sm text-gray-500">
                    Limited time offer
                  </span>
                </div>
              )}
              {/* Stock Status */}
              <div className="mt-4">
                {product.stockQuantity > 0 ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-green-700 font-medium">
                      In Stock ({product.stockQuantity} available)
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-red-700 font-medium">Out of Stock</span>
                  </div>
                )}
              </div>
            </div>

            <Separator className="my-8" />

            {/* Product Interactions Component */}
            <div className="space-y-6">
              {/* Quantity */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900">
                  Quantity
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={decrementQuantity}
                      className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-3 text-sm font-semibold min-w-[3rem] text-center bg-gray-50">
                      {quantity}
                    </span>
                    <button
                      onClick={incrementQuantity}
                      className="p-3 hover:bg-gray-50 transition-colors"
                      disabled={quantity >= product.stockQuantity}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex flex-col gap-3">
                  <AddToCartButton 
                    product={product} 
                    quantity={quantity}
                    disabled={product.stockQuantity === 0}
                  />
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`h-12 font-semibold ${isWishlisted ? "text-red-600 border-red-600 bg-red-50" : ""}`}
                  >
                    <Heart
                      className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`}
                    />
                    {isWishlisted ? "Wishlisted" : "Wishlist"}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleShareProduct}
                  className="w-full h-12 font-semibold"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Product
                </Button>
              </div>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl border border-green-100">
                <Truck className="w-8 h-8 text-green-600 mb-2" />
                <div className="font-semibold text-gray-900 text-sm">
                  Free Shipping
                </div>
                <div className="text-xs text-gray-600">
                  On orders over Rs.999
                </div>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl border border-blue-100">
                <RotateCcw className="w-8 h-8 text-blue-600 mb-2" />
                <div className="font-semibold text-gray-900 text-sm">
                  Easy Returns
                </div>
                <div className="text-xs text-gray-600">
                  30-day return policy
                </div>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-xl border border-purple-100">
                <Shield className="w-8 h-8 text-purple-600 mb-2" />
                <div className="font-semibold text-gray-900 text-sm">
                  Lifetime Warranty
                </div>
                <div className="text-xs text-gray-600">Full coverage</div>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
                <Award className="w-8 h-8 text-amber-600 mb-2" />
                <div className="font-semibold text-gray-900 text-sm">
                  Certified
                </div>
                <div className="text-xs text-gray-600">100% authentic</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Product Details Tabs */}
      <section className="py-16 px-4 md:px-6 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3 lg:w-[500px] h-14 bg-white border border-gray-200 rounded-xl">
              <TabsTrigger value="description" className="font-medium text-sm">
                Description
              </TabsTrigger>
              <TabsTrigger
                value="specifications"
                className="font-medium text-sm"
              >
                Specifications
              </TabsTrigger>
              <TabsTrigger value="shipping" className="font-medium text-sm">
                Shipping
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-8">
              <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
                <div className="flex items-center mb-8">
                  <Gem className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-2xl font-serif text-gray-900">
                    Product Description
                  </h3>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                    Experience the epitome of luxury with our exquisite{" "}
                    {product.name.toLowerCase()}. Meticulously crafted by our
                    master artisans, this piece represents the perfect harmony
                    of traditional craftsmanship and contemporary design,
                    created to celebrate life&apos;s most precious moments.
                  </p>
                  <h4 className="font-semibold mb-6 text-gray-900 text-xl">
                    Key Features:
                  </h4>
                  <ul className="space-y-4">
                    {[
                      "Premium quality materials sourced ethically",
                      "Handcrafted by master jewelers with decades of experience",
                      "Lifetime warranty and professional maintenance included",
                      "Comes with certificate of authenticity",
                      "Complimentary gift packaging and personalized message",
                      "Available for custom sizing and engraving",
                    ].map((feature, index) => (
                      <li
                        key={index}
                        className="text-gray-700 flex items-start"
                      >
                        <Award className="w-5 h-5 text-amber-400 mr-3 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
                <div className="flex items-center mb-8">
                  <Award className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-2xl font-serif text-gray-900">
                    Technical Specifications
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Material:
                      </span>
                      <span className="text-gray-700">18K Gold</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Weight:</span>
                      <span className="text-gray-700">3.2g</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Dimensions:
                      </span>
                      <span className="text-gray-700">15mm x 12mm</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Stone Type:
                      </span>
                      <span className="text-gray-700">Natural Diamond</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Stone Weight:
                      </span>
                      <span className="text-gray-700">0.5 Carat</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Clarity:
                      </span>
                      <span className="text-gray-700">VS1</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Color Grade:
                      </span>
                      <span className="text-gray-700">F</span>
                    </div>
                    <div className="flex justify-between py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-900">Cut:</span>
                      <span className="text-gray-700">Excellent</span>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="shipping" className="mt-8">
              <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-100">
                <div className="flex items-center mb-8">
                  <Truck className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-2xl font-serif text-gray-900">
                    Shipping & Returns
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      Shipping Options
                    </h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <h5 className="font-semibold text-green-900 mb-2">
                          Free Standard Shipping
                        </h5>
                        <p className="text-green-700 text-sm">
                          5-7 business days • Orders over Rs.999
                        </p>
                      </div>
                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <h5 className="font-semibold text-blue-900 mb-2">
                          Express Shipping - Rs.199
                        </h5>
                        <p className="text-blue-700 text-sm">
                          2-3 business days • Signature required
                        </p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                        <h5 className="font-semibold text-purple-900 mb-2">
                          Same Day Delivery - Rs.299
                        </h5>
                        <p className="text-purple-700 text-sm">
                          Available in select cities
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      Return Policy
                    </h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                        30-day return window from delivery
                      </li>
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                        Free return shipping included
                      </li>
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                        Items must be in original condition
                      </li>
                      <li className="flex items-start">
                        <Shield className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                        Refund processed within 5-7 business days
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Enhanced Related Products */}
      <section className="py-20 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
              You May Also Like
            </h2>
            <p className="text-gray-600 text-lg">
              Discover more pieces from our curated collection
            </p>
          </div>

          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {relatedProducts.map((rp) => (
                <Link
                  key={rp.slug.current}
                  href={`/product/${rp.slug.current}`}
                  className="group"
                >
                  <div className="relative aspect-square overflow-hidden rounded-2xl mb-6 bg-gradient-to-br from-amber-50 to-white border border-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
                    <Image
                      src={rp.image || "/placeholder.svg"}
                      alt={rp.name}
                      fill
                      className="object-cover p-6 group-hover:scale-105 transition-transform duration-500"
                    />
                    {rp.isNew && (
                      <Badge className="absolute top-4 left-4 bg-green-600 text-white text-xs font-medium px-3 py-1">
                        New
                      </Badge>
                    )}
                    {rp.oldPrice && rp.oldPrice > rp.price && (
                      <Badge className="absolute top-4 right-4 bg-red-600 text-white text-xs font-medium px-3 py-1">
                        {Math.round(((rp.oldPrice - rp.price) / rp.oldPrice) * 100)}% Off
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-serif text-lg text-gray-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                    {rp.name}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-900 font-bold text-lg">
                      Rs.{rp.price.toLocaleString()}
                    </span>
                    {rp.oldPrice && rp.oldPrice > rp.price && (
                      <span className="text-gray-500 text-sm line-through">
                        Rs.{rp.oldPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Gem className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">
                No related products found.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
