// "use client";

// import Link from "next/link";
// import { Heart } from "lucide-react";

// interface WishlistProps {
//   isMobile?: boolean;
// }

// export default function Wishlist({ isMobile = false }: WishlistProps) {
//   if (isMobile) {
//     return (
//       <Link
//         href="/wishlist"
//         className="flex items-center text-gray-700 hover:text-amber-600"
//       >
//         <Heart className="w-5 h-5 mr-3" />
//         Wishlist
//       </Link>
//     );
//   }

//   return (
//     <Link
//       href="/wishlist"
//       className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
//     >
//       <Heart className="w-5 h-5" />
//     </Link>
//   );
// }