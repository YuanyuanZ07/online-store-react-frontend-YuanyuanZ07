import type { Product, CartItem } from "../types/Product";

// Cart is stored in localStorage and expires after 24 hours
const CART_KEY = "cart";
const TIMESTAMP_KEY = "cart_timestamp";
const ONE_DAY = 24 * 60 * 60 * 1000;

function isExpired() {
  const saved = localStorage.getItem(TIMESTAMP_KEY);
  if (!saved) return true;
  return Date.now() - Number(saved) > ONE_DAY;
}

function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  localStorage.setItem(TIMESTAMP_KEY, String(Date.now()));
}

export function getCart(): CartItem[] {
  if (isExpired()) {
    clearCart();
    return [];
  }
  return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
}

export function addToCart(product: Product) {
  const cart = getCart();
  const existing = cart.find((item) => item.product.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(productId: number) {
  const cart = getCart().filter((item) => item.product.id !== productId);
  saveCart(cart);
}

export function updateQuantity(productId: number, quantity: number) {
  const cart = getCart();
  const item = cart.find((i) => i.product.id === productId);
  if (item) {
    item.quantity = Math.max(1, quantity);
  }
  saveCart(cart);
}

export function clearCart() {
  localStorage.removeItem(CART_KEY);
  localStorage.removeItem(TIMESTAMP_KEY);
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}