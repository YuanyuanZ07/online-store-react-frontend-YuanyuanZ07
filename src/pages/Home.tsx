import { useEffect, useState } from "react";
import { getProducts } from "../services/api";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import Chatbot from "../components/Chatbot";

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // load products when page opens
  useEffect(() => {
    getProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="page"><p>Loading products...</p></div>;
  if (error) return <div className="page"><p className="error">{error}</p></div>;

  return (
    <div className="page">
      <h1>Our Products</h1>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <Chatbot />
    </div>
  );
}

export default Home;