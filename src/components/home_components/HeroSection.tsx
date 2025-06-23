import Image from "next/image"
import Link from "next/link"
import { Sparkles, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative">
      {/* Main Hero */}
      <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <Image
          src="/hero_section_images/hero_image_2.jpg"
          alt="Elegant hands wearing luxurious rings"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
          <div className="text-center max-w-4xl">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5 mr-2 text-amber-300" />
              <p className="uppercase text-sm tracking-[0.2em] text-amber-100 font-light">Glamour Worthy of Royalty</p>
              <Sparkles className="w-5 h-5 ml-2 text-amber-300" />
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-8 tracking-wide">
              EXQUISITE
              <span className="block text-amber-300">RINGS</span>
            </h1>

            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
              Discover our handcrafted collection of timeless rings, where each piece tells a story of elegance and
              sophistication.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="border-2 border-white text-white hover:bg-white hover:text-black px-8 py-4 text-sm font-medium tracking-wider uppercase transition-all duration-300"
              >
                View All Jewelry
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Promise Banner */}
      <div className="bg-gradient-to-r from-amber-50 to-amber-100 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-6 text-center lg:text-left">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-amber-600 mr-2" />
              <span className="font-serif text-lg md:text-xl text-amber-900 tracking-wide">Elegance & Grace</span>
            </div>
            <div className="hidden lg:block w-px h-8 bg-amber-300" />
            <div className="flex items-center">
              <Star className="w-5 h-5 text-amber-600 mr-2" />
              <span className="font-serif text-lg md:text-xl text-amber-900 tracking-wide">
                Luxury, Crafted for Success
              </span>
            </div>
            <div className="hidden lg:block w-px h-8 bg-amber-300" />
            <div className="flex items-center">
              <Star className="w-5 h-5 text-amber-600 mr-2" />
              <span className="font-serif text-lg md:text-xl text-amber-900 tracking-wide">Timeless Beauty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
