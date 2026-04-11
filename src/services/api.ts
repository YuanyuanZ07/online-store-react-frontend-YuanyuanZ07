import type { Product, CartItem } from "../types/Product";

// Spring Boot backend URL
const API_URL = "http://localhost:8080/api";

// Get all products
export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// Get one product by id
export async function getProductById(id: number): Promise<Product> {
  const res = await fetch(`${API_URL}/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

// Send cart to backend, get Stripe clientSecret back
export async function createPaymentIntent(items: CartItem[]): Promise<string> {
  const res = await fetch(`${API_URL}/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
      }))
    ),
  });
  if (!res.ok) throw new Error("Failed to create payment intent");
  const data = await res.json();
  return data.clientSecret;
}