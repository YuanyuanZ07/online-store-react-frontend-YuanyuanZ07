import type { Product, CartItem } from "../types/Product";

// Spring Boot backend URL
const API_URL = "http://localhost:8080/api";

// Fallback products when backend is not available (e.g. GitHub Pages)
const fallbackProducts: Product[] = [
  { id: 1, name: "Premium Dog Food", description: "High-quality dry dog food with real chicken as the first ingredient. Suitable for all breeds.", category: "Dog Food", price: 49.99, imageFile: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600", brand: "PetBest", stock: 100 },
  { id: 2, name: "Cat Scratching Post", description: "Multi-level cat tree with scratching posts and cozy hideaway spots.", category: "Cat Furniture", price: 79.99, imageFile: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=600", brand: "PetBest", stock: 50 },
  { id: 3, name: "Aquarium Starter Kit", description: "10-gallon glass aquarium with LED lighting, filter, and heater included.", category: "Fish Supplies", price: 89.99, imageFile: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?w=600", brand: "AquaLife", stock: 30 },
  { id: 4, name: "Bird Cage Deluxe", description: "Spacious bird cage with multiple perches, feeding cups, and swing.", category: "Bird Supplies", price: 65.99, imageFile: "https://images.unsplash.com/photo-1520808663317-647b476a81b9?w=600", brand: "FeatherHome", stock: 25 },
  { id: 5, name: "Hamster Exercise Wheel", description: "Silent spinner exercise wheel perfect for hamsters and small pets.", category: "Small Pet Supplies", price: 15.99, imageFile: "https://images.unsplash.com/photo-1425082661507-d6d2f5ec5f5a?w=600", brand: "SmallPals", stock: 80 },
  { id: 6, name: "Dog Leash & Collar Set", description: "Durable nylon leash and adjustable collar set with reflective stitching.", category: "Dog Accessories", price: 24.99, imageFile: "https://images.unsplash.com/photo-1567612529009-afe25413e9b0?w=600", brand: "PetBest", stock: 120 },
  { id: 7, name: "Cat Wet Food Variety Pack", description: "12-pack assorted flavors of premium wet cat food in gravy.", category: "Cat Food", price: 29.99, imageFile: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600", brand: "WhiskerDelight", stock: 200 },
  { id: 8, name: "Pet Grooming Kit", description: "Complete grooming set including brush, nail clipper, comb, and scissors.", category: "Grooming", price: 34.99, imageFile: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600", brand: "PetBest", stock: 60 },
  { id: 9, name: "Interactive Dog Toy", description: "Durable chew toy with treat-dispensing feature to keep dogs entertained.", category: "Dog Toys", price: 19.99, imageFile: "https://images.unsplash.com/photo-1535930749574-1399327ce78f?w=600", brand: "PlayPaws", stock: 150 },
  { id: 10, name: "Cat Litter - Clumping", description: "Ultra-clumping cat litter with odor control. 20lb bag.", category: "Cat Supplies", price: 22.99, imageFile: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600", brand: "CleanPaws", stock: 90 },
  { id: 11, name: "Pet Carrier Bag", description: "Airline-approved soft-sided pet carrier with ventilation and shoulder strap.", category: "Travel", price: 45.99, imageFile: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600", brand: "PetBest", stock: 40 },
  { id: 12, name: "Automatic Pet Feeder", description: "Programmable automatic feeder with portion control for cats and dogs.", category: "Feeding", price: 59.99, imageFile: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600", brand: "SmartPet", stock: 35 },
];

// Get all products
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  } catch {
    return fallbackProducts;
  }
}

// Get one product by id
export async function getProductById(id: number): Promise<Product> {
  try {
    const res = await fetch(`${API_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  } catch {
    const product = fallbackProducts.find(p => p.id === id);
    if (product) return product;
    throw new Error("Product not found");
  }
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