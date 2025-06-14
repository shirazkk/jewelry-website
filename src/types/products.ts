export interface Product {
  slug: {
    current: string;
  };
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  tag?: string;
  isNew?: boolean;
  discount?: number | undefined;
  stockQuantity: number;
}
  