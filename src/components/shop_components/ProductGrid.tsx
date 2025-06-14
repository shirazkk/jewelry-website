"use client"
import { useState } from "react"
import type { Product } from "@/types/products"
import ProductCard from "./ProductCard"
import { Filter, SortAsc, X, Grid, List } from "lucide-react"

const sortOptions = [
  { value: "Featured", label: "Featured" },
  { value: "Price: Low to High", label: "Price: Low to High" },
  { value: "Price: High to Low", label: "Price: High to Low" },
  { value: "Newest", label: "Newest First" },
]

interface ProductGridProps {
  products: Product[]
  categories: string[]
}

export default function ProductGrid({ products, categories }: ProductGridProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("All")
  const [sortOption, setSortOption] = useState<string>("Featured")
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const filtered = products.filter((product) => categoryFilter == "All" || product.category == categoryFilter)

  const sorted = [...filtered].sort((a, b) => {
    switch (sortOption) {
      case "Price: Low to High":
        return a.price - b.price
      case "Price: High to Low":
        return b.price - a.price
      case "Newest":
        return a.isNew ? -1 : 1
      default:
        return 0
    }
  })

  const handleCategoryChange = (cat: string) => {
    setCategoryFilter(cat)
  }

  const clearFilters = () => {
    setCategoryFilter("All")
    setSortOption("Featured")
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden flex items-center justify-between mb-6">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </button>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${viewMode === "grid" ? "bg-amber-100 text-amber-600" : "text-gray-400"}`}
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${viewMode === "list" ? "bg-amber-100 text-amber-600" : "text-gray-400"}`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Sidebar */}
      <aside className={`w-full lg:w-80 space-y-8 ${showFilters ? "block" : "hidden lg:block"}`}>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 sticky top-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl text-gray-900">Filters</h2>
            {showFilters && (
              <button onClick={() => setShowFilters(false)} className="lg:hidden p-1 hover:bg-gray-100 rounded">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
            <div className="space-y-3">
              {["All", ...categories].map((cat) => (
                <label key={cat} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="category"
                    checked={categoryFilter === cat}
                    onChange={() => handleCategoryChange(cat)}
                    className="w-4 h-4 text-amber-600 border-gray-300 focus:ring-amber-500"
                  />
                  <span className="ml-3 text-sm text-gray-700 group-hover:text-amber-600 transition-colors">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Sort */}
          <div className="mb-8">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center">
              <SortAsc className="w-4 h-4 mr-2" />
              Sort By
            </h3>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm bg-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="w-full py-3 px-4 border border-amber-600 text-amber-600 text-sm font-medium hover:bg-amber-600 hover:text-white transition-all duration-300 rounded-lg"
          >
            Clear All Filters
          </button>
        </div>
      </aside>

      {/* Products Section */}
      <section className="flex-1">
        {/* Results Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              Showing {sorted.length} of {products.length} products
            </h2>
            {categoryFilter !== "All" && (
              <p className="text-sm text-gray-500 mt-1">
                Filtered by: <span className="font-medium">{categoryFilter}</span>
              </p>
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-2">
            <span className="text-sm text-gray-500">View:</span>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-amber-100 text-amber-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-amber-100 text-amber-600" : "text-gray-400 hover:text-gray-600"}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {sorted.length > 0 ? (
          <div
            className={`grid gap-8 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1"
            }`}
          >
            {sorted.map((product) => (
              <ProductCard key={product.slug.current} product={product} viewMode={viewMode} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your filters to see more results.</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {sorted.length > 0 && (
          <div className="mt-16 flex justify-center">
            <div className="inline-flex border border-gray-200 rounded-lg overflow-hidden">
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-6 py-3 bg-amber-600 text-white text-sm font-medium">1</button>
              <button className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                2
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                3
              </button>
              <button className="px-6 py-3 text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
