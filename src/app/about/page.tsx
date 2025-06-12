import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Clock, Heart, MapPin, Star, Award, Users, Gem, Shield } from 'lucide-react'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Enhanced Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <Image
          src="/hero_section_images/hero_image1.jpg"
          alt="Elegant jewelry craftsmanship"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 max-w-5xl">
            <div className="flex items-center justify-center mb-6">
              <div className="h-px w-16 bg-amber-400 mr-4" />
              <span className="text-amber-300 text-sm uppercase tracking-[0.3em] font-medium">Since 1995</span>
              <div className="h-px w-16 bg-amber-400 ml-4" />
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-serif text-white mb-8 leading-tight">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Three decades of crafting timeless elegance, one precious moment at a time
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="bg-amber-50 py-4 px-4 md:px-6 border-b border-amber-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center text-sm text-amber-700">
            <Link href="/" className="hover:text-amber-900 transition-colors font-medium">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-amber-400" />
            <span className="text-amber-900 font-medium">About Us</span>
          </div>
        </div>
      </div>

      {/* Enhanced Our Story */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Gem className="w-8 h-8 text-amber-600 mr-4" />
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900">A Legacy of Craftsmanship</h2>
              </div>

              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Founded in 1995 by master jeweler Alessandro Moretti, Golden Elegance began as a small atelier in the
                heart of New York&apos;s Diamond District. What started with a simple passion for creating beautiful,
                meaningful jewelry has evolved into a globally recognized brand synonymous with luxury and excellence.
              </p>

              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Each piece in our collection tells a story—a story of skilled artisans who dedicate countless hours to
                perfecting every detail, of responsibly sourced materials that respect our planet, and of the special
                moments our jewelry helps commemorate in your life.
              </p>

              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Today, we continue to honor traditional craftsmanship while embracing innovative techniques, ensuring
                that every piece we create meets the highest standards of quality and beauty.
              </p>

              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">30+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">Years of Excellence</div>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">50K+</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">Happy Customers</div>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 mb-1">100%</div>
                  <div className="text-sm text-gray-600 uppercase tracking-wide">Handcrafted</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=1200&width=800"
                  alt="Jewelry artisan at work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-600 rounded-full flex items-center justify-center shadow-xl">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold">Est.</div>
                  <div className="text-lg font-medium">1995</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Values */}
      <section className="py-24 px-4 md:px-6 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              The principles that guide every piece we create and every relationship we build with our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                We pursue perfection in every detail, from initial design to final polish, ensuring each piece exceeds
                expectations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-4">Authenticity</h3>
              <p className="text-gray-600 leading-relaxed">
                We create jewelry that reflects genuine emotion and personal significance, pieces that become part of
                your story.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-4">Timelessness</h3>
              <p className="text-gray-600 leading-relaxed">
                We design pieces that transcend trends, creating enduring beauty that can be cherished for generations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 mb-4">Integrity</h3>
              <p className="text-gray-600 leading-relaxed">
                We source our materials ethically and conduct business with transparency, honesty, and respect for all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Our Team */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-amber-600 mr-4" />
              <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Meet Our Master Artisans</h2>
            </div>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">
              The talented individuals who bring our designs to life with unparalleled skill, passion, and dedication to
              their craft.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Elena Moretti",
                role: "Lead Designer & Creative Director",
                image: "/placeholder.svg?height=600&width=600",
                bio: "With over 20 years of experience, Elena leads our design team with a vision for contemporary elegance.",
              },
              {
                name: "James Chen",
                role: "Master Goldsmith",
                image: "/placeholder.svg?height=600&width=600",
                bio: "A third-generation goldsmith, James brings traditional techniques and modern innovation to every piece.",
              },
              {
                name: "Sofia Rodriguez",
                role: "Chief Gemologist",
                image: "/placeholder.svg?height=600&width=600",
                bio: "Certified by GIA, Sofia ensures every gemstone meets our exacting standards for quality and beauty.",
              },
            ].map((member, index) => (
              <div key={index} className="group">
                <div className="relative h-96 mb-6 rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">{member.name}</h3>
                  <p className="text-amber-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Atelier */}
      <section className="py-24 px-4 md:px-6 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Award className="w-8 h-8 text-amber-400 mr-4" />
                <h2 className="text-4xl md:text-5xl font-serif">Our Atelier</h2>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                Located in the prestigious Diamond District of Manhattan, our 5,000 square foot atelier is where
                imagination meets craftsmanship. This is where our master artisans work meticulously to transform
                precious metals and gemstones into wearable art.
              </p>

              <p className="text-gray-300 mb-8 leading-relaxed text-lg">
                Our state-of-the-art facility combines traditional hand tools with cutting-edge technology, allowing us
                to create pieces that honor time-tested techniques while embracing modern precision and innovation.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-5 w-5 text-amber-400 mr-3" />
                  <span>123 Elegance Avenue, Diamond District, NYC</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Clock className="h-5 w-5 text-amber-400 mr-3" />
                  <span>Private studio tours available by appointment</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Users className="h-5 w-5 text-amber-400 mr-3" />
                  <span>15+ master craftsmen and designers</span>
                </div>
              </div>

              <Link
                href="/contact"
                className="inline-flex items-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                Schedule a Visit
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>

            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/placeholder.svg?height=1200&width=800"
                  alt="Our jewelry atelier"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center shadow-xl">
                <Gem className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-24 px-4 md:px-6 bg-gradient-to-r from-amber-50 to-amber-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8">Experience Our Craftsmanship</h2>
          <p className="text-gray-700 mb-12 leading-relaxed text-xl">
            We invite you to explore our collections and discover pieces that speak to your personal style and story.
            Every piece is crafted with love, precision, and the promise of lasting beauty.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Gem className="w-5 h-5 mr-2" />
              View Collections
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white px-8 py-4 text-lg font-medium transition-all duration-300 shadow-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
