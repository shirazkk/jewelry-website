// "use client"

// import { useState } from "react"
// import { Heart, Minus, Plus, Share2, ShoppingBag } from "lucide-react"
// import { Button } from "@/components/ui/button"



// export default function ProductInteractions() {

//   const [quantity, setQuantity] = useState(1)
//   const [isWishlisted, setIsWishlisted] = useState(false)

//   const incrementQuantity = () => setQuantity((prev) => prev + 1)
//   const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1))

//   return (
//     <div className="space-y-6">
//       {/* Quantity */}
//       <div className="space-y-3">
//         <h3 className="text-sm font-semibold text-gray-900">Quantity</h3>
//         <div className="flex items-center space-x-3">
//           <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
//             <button
//               onClick={decrementQuantity}
//               className="p-3 hover:bg-gray-50 transition-colors disabled:opacity-50"
//               disabled={quantity <= 1}
//             >
//               <Minus className="w-4 h-4" />
//             </button>
//             <span className="px-4 py-3 text-sm font-semibold min-w-[3rem] text-center bg-gray-50">{quantity}</span>
//             <button onClick={incrementQuantity} className="p-3 hover:bg-gray-50 transition-colors">
//               <Plus className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Action Buttons */}
//       <div className="space-y-4 pt-4">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <Button  size="lg" className="flex-1 h-12 font-semibold">
//             <ShoppingBag className="w-5 h-5 mr-2" />
//             Add to Cart
//           </Button>
//           <Button
//             size="lg"
//             variant="outline"
//             onClick={() => setIsWishlisted(!isWishlisted)}
//             className={`h-12 font-semibold ${isWishlisted ? "text-red-600 border-red-600 bg-red-50" : ""}`}
//           >
//             <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
//             {isWishlisted ? "Wishlisted" : "Wishlist"}
//           </Button>
//         </div>

//         <Button variant="outline" size="lg" className="w-full h-12 font-semibold">
//           <Share2 className="w-5 h-5 mr-2" />
//           Share Product
//         </Button>
//       </div>
//     </div>
//   )
// }
