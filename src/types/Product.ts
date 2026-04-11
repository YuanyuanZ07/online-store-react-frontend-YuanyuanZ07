export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  imageFile: string;
  brand: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
