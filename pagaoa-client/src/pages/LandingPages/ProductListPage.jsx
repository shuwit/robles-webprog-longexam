import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import Button from "../../components/Button";
import { unwrapProducts } from "../../utils/api";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load products");
        }
        setProducts(unwrapProducts(data));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <img
          src="https://images.candymag.com/candy/images/2022/01/24/national-university-ph.jpg"
          alt="Products hero"
        />
        <div className="hero-overlay" />
        <div className="hero-copy left">
          <div className="hero-copy-inner">
            <p className="kicker">Products</p>
            <h1>Explore Campus Essentials</h1>
            <p>
              Browse uniforms, merchandise, and student essentials in one
              convenient place.
            </p>
            <div className="hero-actions">
              <Button to="/">Back Home</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="kicker">Featured Collection</p>
          <h2 className="section-title">Product Selection</h2>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          {loading ? (
            <p className="muted">Loading products...</p>
          ) : (
            <div style={{ marginTop: 28 }}>
              <ProductList
                products={products}
                onAdded={(text, isError) => {
                  setError(isError ? text : "");
                  setMessage(isError ? "" : text);
                }}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductListPage;
