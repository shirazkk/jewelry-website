"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/types/products";

interface AddToCartButtonProps {
  product: Product;
  quantity: number;
  disabled?: boolean;
}

export default function AddToCartButton({ product, quantity, disabled = false }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <Button
      className="w-full py-3 text-lg font-semibold"
      onClick={() => addToCart(product, quantity)}
      disabled={disabled}
    >
      {disabled ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
} 