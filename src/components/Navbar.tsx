'use client'
import Link from "next/link"
import { Menu, User, Home, Store, Info, Phone } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import Search from "./layout/search"
import Cart from "./layout/cart"
import { SignInButton, SignedOut, UserButton, SignedIn } from "@clerk/nextjs"
import { useUser } from '@clerk/nextjs'


const navigationItems = [
  { name: "HOME", href: "/", icon: Home },
  { name: "SHOP", href: "/shop", icon: Store },
  { name: "ABOUT US", href: "/about", icon: Info },
  { name: "CONTACT", href: "/contact", icon: Phone },
]

export default function Navbar() {
  const { isLoaded, isSignedIn, user } = useUser()
  
  if (!isLoaded || !isSignedIn) {
    return null
  }
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
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors duration-200 py-2"
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          {/* Desktop Actions - Fixed alignment and spacing */}
          <div className="hidden lg:flex items-center space-x-2">
            <div className="flex items-center">
              <Search />
            </div>
            <div className="flex items-center">
              <Cart />
            </div>
            <div className="flex items-center ml-2">
              <SignedOut>
                <Button variant="ghost" size="icon" className="hover:bg-amber-50">
                  <SignInButton mode="modal">
                    <User className="w-5 h-5 text-gray-600 hover:text-amber-600" />
                  </SignInButton>
                </Button>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Actions - Show search, cart, and account on mobile */}
          <div className="flex lg:hidden items-center space-x-2">
            <div className="flex items-center">
              <Search />
            </div>
            <div className="flex items-center">
              <Cart />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-amber-50">
                  <Menu className="w-6 h-6 text-gray-600" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-sm bg-white">
                <SheetHeader className="text-left mb-8 pb-4 border-b border-gray-100">
                  <SheetTitle className="text-xl font-serif text-gray-900">Golden Elegance</SheetTitle>
                  <p className="text-sm text-amber-600 tracking-wide">LUXURY JEWELRY</p>
                </SheetHeader>

                {/* Navigation Links */}
                <div className="space-y-6 ">
                  <div className="space-y-1">
                    <h3 className="ml-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Navigation</h3>
                    {navigationItems.map((item) => {
                      const IconComponent = item.icon
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center space-x-3 px-3 py-3 rounded-lg text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors group"
                        >
                          <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-amber-500" />
                          <span className="font-medium">{item.name}</span>
                        </Link>
                      )
                    })}
                  </div>

                  <Separator className="my-6" />

                  {/* Account Section */}
                  <div className="space-y-1">
                    <h3 className="ml-2 text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Account</h3>
                    <div className="px-3 py-3 rounded-lg hover:bg-amber-50 transition-colors">
                      <SignedOut>
                        <SignInButton mode="modal">
                          <div className="flex items-center space-x-3 cursor-pointer">
                            <User className="w-5 h-5 text-gray-400" />
                            <span className="font-medium text-gray-700">Sign In</span>
                          </div>
                        </SignInButton>
                      </SignedOut>
                      <SignedIn>
                        <div className="flex items-center space-x-3">
                          <UserButton />
                          <span className="font-medium text-gray-700">{user.username}</span>
                        </div>
                      </SignedIn>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-center py-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">© 2024 Golden Elegance. All rights reserved.</p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  )
}
