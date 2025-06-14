import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Search from "./layout/search";
import Cart from "./layout/cart";

const navigationItems = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/shop" },
  { name: "ABOUT US", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <span className="text-white font-bold text-lg lg:text-xl">
                    GE
                  </span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-300 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block">
                <span className="font-serif text-xl lg:text-2xl text-gray-900 font-bold tracking-wide">
                  Golden Elegance
                </span>
                <p className="text-xs text-amber-600 tracking-widest">
                  LUXURY JEWELRY
                </p>
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

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <Search />
            <Cart />
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
                  <div className="space-y-4">
                    <Search isMobile={true} />
                    <Cart isMobile={true} />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}