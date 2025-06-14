"use client";

import { ShoppingBag, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CartProps {
  isMobile?: boolean;
}

export default function Cart({ isMobile = false }: CartProps) {
  const { cart, itemCount, cartTotal, removeFromCart, updateQuantity } =
    useCart();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNavigation = (path: string) => {
    setOpen(false); // Close the sheet
    router.push(path);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={`relative ${isMobile ? "flex items-center" : "p-2 text-gray-600 hover:text-amber-600 transition-colors"}`}
      >
        {isMobile ? (
          <>
            <ShoppingBag className="w-5 h-5 mr-3" />
            <span>Cart ({itemCount})</span>
          </>
        ) : (
          <>
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                {itemCount}
              </span>
            )}
          </>
        )}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Shopping Cart ({itemCount})
          </SheetTitle>
          <SheetDescription>
            Review and manage your selected items
          </SheetDescription>
        </SheetHeader>
        <Separator className="my-4" />
        {itemCount === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-6">
              Add some beautiful jewelry to get started
            </p>
            <Button
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => handleNavigation("/shop")}
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto space-y-4">
              {cart.map((item) => (
                <div
                  key={item.slug.current}
                  className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover p-2"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 truncate">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Rs.{item.price.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      key={`decrease-${item.slug.current}`}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(
                          item.slug.current,
                          Math.max(0, item.quantity - 1)
                        )
                      }
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      key={`increase-${item.slug.current}`}
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.slug.current, item.quantity + 1)
                      }
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                    <Button
                      key={`remove-${item.slug.current}`}
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.slug.current)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 ml-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>Rs.{cartTotal.toLocaleString()}</span>
              </div>
              <div className="space-y-2">
                <Button
                  className="w-full bg-amber-600 hover:bg-amber-700"
                  onClick={() => handleNavigation("/checkout")}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleNavigation("/cart")}
                >
                  View Full Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
