import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../context/AuthContext";
import { addToCartRequest } from "../../utils/api";

const formatPrice = (price) =>
  `₱${Number(price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

function ProductPage() {
  const { id } = useParams();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Product not found");
        }
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate("/auth/signin");
      return;
    }

    try {
      await addToCartRequest(userInfo, product._id, 1);
      setMessage(`${product.name} added to cart`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="status-block">Loading product...</div>;
  }

  if (error || !product) {
    return (
      <div className="status-block">
        <h1>Product not found</h1>
        <p className="muted">{error || "This item is no longer available."}</p>
        <Button to="/products">Back to Products</Button>
      </div>
    );
  }

  return (
    <div className="page section">
      <div className="container product-detail">
        <img src={product.image} alt={product.name} />
        <div>
          <p className="kicker">{product.category?.name || "Campus"}</p>
          <h1 className="section-title">{product.name}</h1>
          <p className="price">{formatPrice(product.price)}</p>
          <span className="stock-chip">{product.stock} in stock</span>
          <p className="muted">{product.description}</p>
          {message && <p className="success">{message}</p>}
          <div className="card-actions">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button to="/products" variant="outline">
              Back to Products
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
