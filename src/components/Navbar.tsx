import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartCount } from "../services/cart";
import cartIcon from "../assets/cart-icon.svg";

function Navbar() {
  const [cartCount, setCartCount] = useState(getCartCount());

  // update badge when cart changes
  useEffect(() => {
    const update = () => setCartCount(getCartCount());
    window.addEventListener("cart-updated", update);
    return () => window.removeEventListener("cart-updated", update);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/">Home</Link>
      </div>
      <Link to="/" className="nav-brand">Pet Best Store</Link>
      <div className="nav-links">
        <Link to="/cart" className="cart-link">
          <img src={cartIcon} alt="Cart" className="cart-icon" />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
