import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById } from "../services/api";
import { addToCart } from "../services/cart";
import type { Product } from "../types/Product";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  // load product when page opens
  useEffect(() => {
    if (!id) return;
    getProductById(Number(id))
      .then((data) => setProduct(data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [id]);

  function handleAddToCart() {
    if (!product) return;
    addToCart(product);
    window.dispatchEvent(new Event("cart-updated"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (!product) return <div className="page"><p>Product not found.</p></div>;

  return (
    <div className="page product-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-layout">
        <img src={product.imageFile} alt={product.name} className="detail-image" />
        <div className="detail-info">
          <h1>{product.name}</h1>
          <p className="detail-meta">Category: {product.category}</p>
          <p className="detail-meta">Brand: {product.brand}</p>
          <p className="detail-price">${product.price.toFixed(2)}</p>
          <p className="detail-description">{product.description}</p>
          <p className="detail-stock">
            {product.stock > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>
          <button
            className="btn-primary"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
          >
            {added ? "Added to Cart!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
