"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import type { Product } from "@/types/products";

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.slug.current === product.slug.current
      );

      if (existingItem) {
        // Check if adding the new quantity would exceed stock
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stockQuantity) {
          // If it would exceed stock, set to max available
          return prevCart.map((item) =>
            item.slug.current === product.slug.current
              ? { ...item, quantity: product.stockQuantity }
              : item
          );
        }
        // If within stock limits, add normally
        return prevCart.map((item) =>
          item.slug.current === product.slug.current
            ? { ...item, quantity: newQuantity }
            : item
        );
      }

      // For new items, check if quantity exceeds stock
      if (quantity > product.stockQuantity) {
        quantity = product.stockQuantity;
      }

      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (slug: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.slug.current !== slug)
    );
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(slug);
      return;
    }

    setCart((prevCart) => {
      const item = prevCart.find((item) => item.slug.current === slug);
      if (!item) return prevCart;

      // Check if new quantity exceeds stock
      if (quantity > item.stockQuantity) {
        quantity = item.stockQuantity;
      }

      return prevCart.map((item) =>
        item.slug.current === slug ? { ...item, quantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
