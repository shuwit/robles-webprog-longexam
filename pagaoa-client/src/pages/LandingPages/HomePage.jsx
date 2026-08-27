import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ProductList from "../../components/ProductList";
import NUstorebg from "../../assets/img/NUstorebg.png";
import { unwrapProducts, apiRequest } from "../../utils/api";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await apiRequest("/api/products?limit=50");
        setProducts(unwrapProducts(data));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <img src={NUstorebg} alt="Campus store" />
        <div className="hero-overlay" />
        <div className="hero-copy">
          <div className="hero-copy-inner">
            <p className="kicker">Campus Marketplace</p>
            <h1>Welcome to BulldogEx Shop</h1>
            <p>
              Explore campus uniforms, student essentials, and school merch in
              one store.
            </p>
            <div className="hero-actions">
              <Button to="/products">Shop Now</Button>
              <Button to="/about" variant="outline">
                About Store
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <p className="kicker">Featured</p>
          <h2 className="section-title">Campus Essentials</h2>
          <p className="muted">
            Live products pulled from the BulldogEx catalog.
          </p>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <div style={{ marginTop: 28 }}>
            <ProductList
              products={products}
              onAdded={(text, isError) => {
                setError(isError ? text : "");
                setMessage(isError ? "" : text);
              }}
            />
          </div>
        </div>
      </section>

      <section className="section section-cream">
        <div className="container">
          <p className="kicker">Information</p>
          <h2 className="section-title">BD Exchange Details</h2>
          <div className="grid-4" style={{ marginTop: 28 }}>
            {[
              {
                title: "What is BD Exchange?",
                text: "A school-based marketplace for uniforms, essentials, and student merchandise.",
              },
              {
                title: "Where is it located?",
                text: "Inside the school campus for easy student access.",
              },
              {
                title: "Operating hours",
                text: "Open from 8:00 AM to 4:00 PM on school days.",
              },
              {
                title: "How to order",
                text: "Place an order in-store or through official BulldogEx channels.",
              },
            ].map((item) => (
              <article key={item.title} className="info-card">
                <h3 className="info-title">{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
