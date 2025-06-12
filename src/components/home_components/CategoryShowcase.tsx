"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { ArrowRight, Loader2 } from "lucide-react"
import { client } from "@/sanity/lib/client"

interface Category {
  _id: string;
  title: string;
  image?: string;
  products?: number;
}

const categoryQuery = `
  *[_type == "categories"] {
    _id,
    title,
    "image": image.asset->url,
    products
  }
`

export default function CategoryShowcase() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await client.fetch(categoryQuery)
        setCategories(data)
        setLoading(false)
      } catch (err) {
        setError(err as Error)
        setLoading(false)
        console.error("Error fetching categories:", err)
      }
    }

    fetchCategories()
  }, [])

  if (loading) {
    return (
      <div className="py-20 flex justify-center items-center">
        <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <p className="text-red-600">Error loading categories: {error.message}</p>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-600">No categories found.</p>
      </div>
    )
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-gray-900">Explore Our Collections</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated categories, each featuring unique pieces designed to complement your style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category: Category) => (
            <Link
              key={category._id}
              href={`/shop/${category.title.toLowerCase()}`}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-[400px] md:h-[450px]">
                {category.image && (
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-serif text-3xl md:text-4xl mb-2 tracking-wide">{category.title}</h3>
                    <p className="text-amber-200 mb-4 opacity-90">{category.products} exquisite pieces</p>
                    <div className="flex items-center text-sm font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Explore Collection</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
