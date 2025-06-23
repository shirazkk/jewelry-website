export interface Product {
  _id?: string;
  slug: {
    current: string;
  };
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  images?: string[];
  category: string;
  tag?: string;
  isNew?: boolean;
  discount?: number | undefined;
  stockQuantity: number;
}
  