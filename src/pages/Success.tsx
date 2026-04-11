import { useEffect } from "react";
import { Link } from "react-router-dom";
import { clearCart } from "../services/cart";

function Success() {
  // clear cart when this page loads
  useEffect(() => {
    clearCart();
    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  return (
    <div className="page success-page">
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed.</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
}

export default Success;
