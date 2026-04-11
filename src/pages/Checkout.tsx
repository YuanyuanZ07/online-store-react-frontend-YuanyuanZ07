import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getCart, getCartTotal } from "../services/cart";
import { createPaymentIntent } from "../services/api";
import PaymentForm from "../components/PaymentForm";
import type { CartItem } from "../types/Product";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

function Checkout() {
  const [cart] = useState<CartItem[]>(getCart());
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");

  // ask backend to create a payment intent when page loads
  useEffect(() => {
    if (cart.length === 0) return;
    createPaymentIntent(cart)
      .then((secret) => setClientSecret(secret))
      .catch(() => setError("Failed to initialize payment. Please try again."));
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="page">
        <h1>Checkout</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Checkout</h1>
      <div className="checkout-summary">
        <h2>Order Summary</h2>
        {cart.map((item) => (
          <div key={item.product.id} className="checkout-item">
            <span>{item.product.name} x {item.quantity}</span>
            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="checkout-total">
          <strong>Total:</strong>
          <strong>${getCartTotal().toFixed(2)}</strong>
        </div>
      </div>

      {error && <p className="error">{error}</p>}

      {clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      ) : (
        !error && <p>Loading payment form...</p>
      )}
    </div>
  );
}

export default Checkout;
