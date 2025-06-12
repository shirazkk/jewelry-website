import Link from "next/link"
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-12">
      <XCircle className="w-20 h-20 text-red-500 mb-6" />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Product Not Found</h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        We&apos;re sorry, the product you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/shop" passHref>
        <Button className="bg-amber-600 hover:bg-amber-700 text-white font-medium text-lg px-8 py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
          Continue Shopping
        </Button>
      </Link>
    </div>
  )
}
