import { useState } from "react";
import { Link } from "react-router-dom";
import { getCart, removeFromCart, updateQuantity, getCartTotal } from "../services/cart";
import type { CartItem } from "../types/Product";

function Cart() {
  const [cart, setCart] = useState<CartItem[]>(getCart());

  // re-read cart from localStorage
  function refresh() {
    setCart(getCart());
  }

  function handleRemove(productId: number) {
    removeFromCart(productId);
    window.dispatchEvent(new Event("cart-updated"));
    refresh();
  }

  function handleQtyChange(productId: number, qty: number) {
    updateQuantity(productId, qty);
    window.dispatchEvent(new Event("cart-updated"));
    refresh();
  }

  if (cart.length === 0) {
    return (
      <div className="page">
        <h1>Shopping Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Shopping Cart</h1>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.product.id} className="cart-item">
            <img src={item.product.imageFile} alt={item.product.name} />
            <div className="cart-item-info">
              <h3>{item.product.name}</h3>
              <p>${item.product.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
              <label>
                Qty:
                <select
                  value={item.quantity}
                  onChange={(e) => handleQtyChange(item.product.id, Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </label>
              <button className="btn-danger" onClick={() => handleRemove(item.product.id)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: ${getCartTotal().toFixed(2)}</h2>
        <Link to="/checkout" className="btn-primary">Proceed to Checkout</Link>
      </div>
    </div>
  );
}

export default Cart;
