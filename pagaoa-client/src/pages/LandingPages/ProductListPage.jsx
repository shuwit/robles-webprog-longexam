import { useEffect, useState } from "react";
import ProductList from "../../components/ProductList";
import Button from "../../components/Button";
import { apiRequest, unwrapProducts } from "../../utils/api";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [applied, setApplied] = useState({ search: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    apiRequest("/api/categories")
      .then(setCategories)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ limit: "50" });
        if (applied.search) params.set("search", applied.search);
        if (applied.category) params.set("category", applied.category);
        const data = await apiRequest(`/api/products?${params.toString()}`);
        setProducts(unwrapProducts(data));
        setError("");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [applied]);

  const applyFilters = (e) => {
    e.preventDefault();
    setApplied({ search: search.trim(), category });
  };

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
            <p>Search the catalog or filter by category from the live product API.</p>
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
          <form className="filter-bar" onSubmit={applyFilters}>
            <div>
              <label htmlFor="product-search">Search</label>
              <input
                id="product-search"
                type="text"
                placeholder="Name or description"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="product-category">Search by category</label>
              <select
                id="product-category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  setApplied((prev) => ({ ...prev, category: e.target.value }));
                }}
              >
                <option value="">All categories</option>
                {categories.map((item) => (
                  <option key={item._id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
            <Button type="submit">Search</Button>
          </form>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          {loading ? (
            <p className="muted">Loading products...</p>
          ) : (
            <ProductList
              products={products}
              onAdded={(text, isError) => {
                setError(isError ? text : "");
                setMessage(isError ? "" : text);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductListPage;
