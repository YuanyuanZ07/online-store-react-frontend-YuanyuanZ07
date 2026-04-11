import { Link } from "react-router-dom";
import type { Product } from "../types/Product";

function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-card">
      <img src={product.imageFile} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <span className="btn-view">View Details</span>
    </Link>
  );
}

export default ProductCard;
