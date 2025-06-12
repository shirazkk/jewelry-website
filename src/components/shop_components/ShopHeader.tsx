import { Gem, Sparkles } from "lucide-react"

export default function ShopHeader() {
  return (
    <div className="relative bg-gradient-to-r from-amber-50 via-white to-amber-50 py-20">
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
      <div className="relative max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-6 h-6 text-amber-600 mr-3" />
          <span className="text-amber-600 text-sm uppercase tracking-[0.2em] font-medium">Curated Collection</span>
          <Sparkles className="w-6 h-6 text-amber-600 ml-3" />
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl mb-8 text-gray-900 leading-tight">
          Shop Our
          <span className="block text-amber-600">Collection</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
          Discover our curated collection of exquisite jewelry pieces crafted with precision and elegance. Each item
          represents the perfect blend of traditional craftsmanship and contemporary design, created to celebrate life&apos;s
          most precious moments.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center text-sm text-gray-500">
            <Gem className="w-4 h-4 mr-2 text-amber-600" />
            <span>Premium Quality Guaranteed</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300" />
          <div className="flex items-center text-sm text-gray-500">
            <Gem className="w-4 h-4 mr-2 text-amber-600" />
            <span>Lifetime Craftsmanship Warranty</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-300" />
          <div className="flex items-center text-sm text-gray-500">
            <Gem className="w-4 h-4 mr-2 text-amber-600" />
            <span>Free Worldwide Shipping</span>
          </div>
        </div>
      </div>
    </div>
  )
}
