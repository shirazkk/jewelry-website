import { Gem, Award, Heart } from "lucide-react"

export default function RefinementSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-4">
          <span className="inline-flex items-center text-amber-600 text-sm uppercase tracking-[0.2em] font-medium">
            <Gem className="w-4 h-4 mr-2" />
            Be Remarkable
            <Gem className="w-4 h-4 ml-2" />
          </span>
        </div>

        <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 text-gray-900 leading-tight">
          The Art of Radiant
          <span className="block text-amber-600">Refinement</span>
        </h2>

        <p className="max-w-4xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed mb-12">
          At Golden Elegance, our mission is to provide a memorable shopping experience that combines top-quality
          products with excellent customer service. Every piece is crafted with passion and precision.
        </p>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="group p-8 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
              <Gem className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl mb-4 text-gray-900">Premium Quality</h3>
            <p className="text-gray-600 leading-relaxed">
              Each piece is meticulously crafted using the finest materials and traditional techniques.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
              <Award className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl mb-4 text-gray-900">Expert Craftsmanship</h3>
            <p className="text-gray-600 leading-relaxed">
              Our master artisans bring decades of experience to create timeless pieces.
            </p>
          </div>

          <div className="group p-8 bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 border border-amber-100">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-amber-200 transition-colors">
              <Heart className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="font-serif text-xl mb-4 text-gray-900">Lifetime Value</h3>
            <p className="text-gray-600 leading-relaxed">
              Investment pieces designed to be treasured and passed down through generations.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
