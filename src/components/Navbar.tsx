"use client"

import Link from "next/link"
import { Search, ShoppingBag, Menu, X, User, Heart } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/lib/cart-context"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"
import { useState } from "react"
import Image from "next/image"

const navigationItems = [
  { name: "HOME", href: "/" },
  { name: "SHOP",href: "/shop",},
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT", href: "/contact" },
]

export default function Navbar() {
  const { cart, itemCount, cartTotal, removeFromCart, updateQuantity } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-bold text-lg lg:text-xl">GE</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-xl lg:text-2xl text-gray-900 font-bold tracking-wide">
                  Golden Elegance
                </span>
                <p className="text-xs text-amber-600 tracking-widest">LUXURY JEWELRY</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
              >
                <Link
                  href={item.href}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 py-2"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-gray-600 hover:text-amber-600 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* User Account */}
            <Link href="/account" className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
              <User className="w-5 h-5" />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
              <Heart className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <Sheet>
              <SheetTrigger className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors">
                <ShoppingBag className="w-5 h-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                    {itemCount}
                  </span>
                )}
              </SheetTrigger>
              <SheetContent className="flex flex-col w-full sm:max-w-lg">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Shopping Cart ({itemCount})
                  </SheetTitle>
                  <SheetDescription>Review and manage your selected items</SheetDescription>
                </SheetHeader>

                <Separator className="my-4" />

                {itemCount === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500 mb-6">Add some beautiful jewelry to get started</p>
                    <Link href="/shop">
                      <Button className="bg-amber-600 hover:bg-amber-700">Continue Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    <div className="flex-1 overflow-y-auto space-y-4">
                      {cart.map((item) => (
                        <div key={item.slug.current} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                          <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover p-2"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 truncate">{item.name}</h4>
                            <p className="text-sm text-gray-600">Rs.{item.price.toLocaleString()}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.slug.current, Math.max(0, item.quantity - 1))}
                              className="h-8 w-8 p-0"
                            >
                              -
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.slug.current, item.quantity + 1)}
                              className="h-8 w-8 p-0"
                            >
                              +
                            </Button>
                            <Button
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

                    <div className="border-t pt-4 space-y-4">
                      <div className="flex justify-between items-center text-lg font-semibold">
                        <span>Total:</span>
                        <span>Rs.{cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="space-y-2">
                        <Button className="w-full bg-amber-600 hover:bg-amber-700">Proceed to Checkout</Button>
                        <Link href="/cart" className="block">
                          <Button variant="outline" className="w-full">
                            View Full Cart
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </SheetContent>
            </Sheet>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger className="p-2 text-gray-600">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <div className="space-y-6 pl-4">
                  {/* Navigation Links */}
                  <div className="space-y-4">
                    {navigationItems.map((item) => (
                      <div key={item.name}>
                        <Link
                          href={item.href}
                          className="block text-lg font-medium text-gray-900 hover:text-amber-600 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Mobile Actions */}
                  <div className="space-y-4">
                    <Link href="/account" className="flex items-center text-gray-700 hover:text-amber-600">
                      <User className="w-5 h-5 mr-3" />
                      My Account
                    </Link>
                    <Link href="/wishlist" className="flex items-center text-gray-700 hover:text-amber-600">
                      <Heart className="w-5 h-5 mr-3" />
                      Wishlist
                    </Link>
                    <div className="flex items-center text-gray-700">
                      <ShoppingBag className="w-5 h-5 mr-3" />
                      Cart ({itemCount})
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-gray-100 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for jewelry..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                autoFocus
              />
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
