"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h2>
            <p className="mt-1 text-sm text-gray-500">
              Start adding some items to your cart.
            </p>
            <div className="mt-6">
              <Link
                href="/shop"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-serif text-gray-900 mb-8">Shopping Cart</h1>
        
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200">
              {cart.map((item) => (
                <div key={item.slug.current} className="p-6 flex">
                  <div className="flex-shrink-0 w-24 h-24 relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="ml-6 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-medium text-gray-900">
                        <Link href={`/product/${item.slug.current}`}>
                          {item.name}
                        </Link>
                      </h3>
                      <p className="ml-4 text-base font-medium text-gray-900">
                        Rs.{item.price * item.quantity}
                      </p>
                    </div>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center">
                        <button
                          onClick={() => updateQuantity(item.slug.current, item.quantity - 1)}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="mx-2 text-gray-500">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.slug.current, item.quantity + 1)}
                          className="p-1 text-gray-400 hover:text-gray-500"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.slug.current)}
                        className="text-red-600 hover:text-red-500"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 lg:mt-0 lg:col-span-5">
            <div className="bg-white shadow-sm rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Order Summary</h2>
              <div className="flow-root">
                <dl className="text-sm">
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">Rs.{cartTotal}</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between border-t border-gray-200">
                    <dt className="text-base font-medium text-gray-900">Order total</dt>
                    <dd className="text-base font-medium text-gray-900">Rs.{cartTotal}</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6">
                <Link
                  href="/checkout"
                  className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 