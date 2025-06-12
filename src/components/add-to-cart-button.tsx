"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/products";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
}

export default function AddToCartButton({ product, quantity }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      className="w-full py-3 text-lg font-semibold"
      onClick={() => addToCart(product, quantity)}
    >
      Add to Cart
    </Button>
  );
} 