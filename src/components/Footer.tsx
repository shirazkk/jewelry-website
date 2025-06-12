import Link from "next/link"
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  Truck,
  Award,
  Heart,
} from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-700 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-serif mb-4">Stay Connected</h3>
            <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and jewelry
              care tips.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-amber-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">GE</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold">Golden Elegance</h3>
                  <p className="text-xs text-amber-400 tracking-widest">LUXURY JEWELRY</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Crafting timeless pieces that celebrate life&apos;s most precious moments. Each piece is a testament to our
                commitment to excellence and beauty.
              </p>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-amber-400">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "About Us", href: "/about" },
                  { name: "Our Story", href: "/story" },
                  { name: "Careers", href: "/careers" },
                  { name: "Press", href: "/press" },
                  { name: "Blog", href: "/blog" },
                  { name: "Reviews", href: "/reviews" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-amber-400">Customer Service</h4>
              <ul className="space-y-3">
                {[
                  { name: "Contact Us", href: "/contact" },
                  { name: "Size Guide", href: "/size-guide" },
                  { name: "Jewelry Care", href: "/care" },
                  { name: "Shipping Info", href: "/shipping" },
                  { name: "Returns & Exchanges", href: "/returns" },
                  { name: "Track Your Order", href: "/track" },
                  { name: "FAQ", href: "/faq" },
                ].map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-gray-300 hover:text-amber-400 transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-lg mb-6 text-amber-400">Get in Touch</h4>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">123 Jewelry District</p>
                    <p className="text-gray-300">New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                  <p className="text-gray-300">hello@goldenelegance.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="mt-6">
                <h5 className="font-medium text-amber-400 mb-3">Business Hours</h5>
                <div className="text-sm text-gray-300 space-y-1">
                  <p>Monday - Friday: 9:00 AM - 8:00 PM</p>
                  <p>Saturday: 10:00 AM - 6:00 PM</p>
                  <p>Sunday: 12:00 PM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="w-8 h-8 text-amber-400 mb-2" />
              <h5 className="font-medium text-sm mb-1">Free Shipping</h5>
              <p className="text-xs text-gray-400">On orders over $500</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="w-8 h-8 text-amber-400 mb-2" />
              <h5 className="font-medium text-sm mb-1">Lifetime Warranty</h5>
              <p className="text-xs text-gray-400">On all jewelry</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="w-8 h-8 text-amber-400 mb-2" />
              <h5 className="font-medium text-sm mb-1">Certified Authentic</h5>
              <p className="text-xs text-gray-400">100% genuine</p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="w-8 h-8 text-amber-400 mb-2" />
              <h5 className="font-medium text-sm mb-1">30-Day Returns</h5>
              <p className="text-xs text-gray-400">Hassle-free returns</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-gray-400">Secure payments:</span>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-6 h-6 text-gray-400" />
                <span className="text-xs text-gray-400">Visa, MasterCard, PayPal, Apple Pay</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-xs text-gray-400">
              <Link href="/privacy" className="hover:text-amber-400 transition-colors">
                Privacy Policy
              </Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-amber-400 transition-colors">
                Terms of Service
              </Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-amber-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400">
              © 2025 Golden Elegance. All rights reserved. Crafted with love for jewelry enthusiasts worldwide.
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <span className="text-xs text-gray-500 mr-2">Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-xs text-gray-500 ml-2">in New York</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
