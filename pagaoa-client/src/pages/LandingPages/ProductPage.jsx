import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button.jsx";
import { useAuth } from "../../context/AuthContext";
import { addToCartRequest, apiRequest, formatPrice } from "../../utils/api";

function ProductPage() {
  const { id } = useParams();
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const load = async () => {
    try {
      const [item, reviewList] = await Promise.all([
        apiRequest(`/api/products/${id}`),
        apiRequest(`/api/reviews/product/${id}`),
      ]);
      setProduct(item);
      setReviews(reviewList);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate("/auth/signin");
      return;
    }

    try {
      await addToCartRequest(userInfo, product._id, 1);
      setMessage(`${product.name} added to cart`);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleReview = async (e) => {
    e.preventDefault();
    if (!userInfo) {
      navigate("/auth/signin");
      return;
    }

    try {
      await apiRequest("/api/reviews", {
        method: "POST",
        token: userInfo.token,
        body: { product: id, rating: Number(rating), comment },
      });
      setComment("");
      setMessage("Review posted");
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="status-block">Loading product...</div>;
  }

  if (!product) {
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
          <div className="schema-list">
            <span className="stock-chip">{product.stock} in stock</span>
            <span className="badge">Category: {product.category?.name || "N/A"}</span>
            <span className="badge">Supplier: {product.supplier?.name || "N/A"}</span>
          </div>
          <p className="muted">{product.description}</p>
          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
          <div className="card-actions">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
            <Button to="/products" variant="outline">
              Back to Products
            </Button>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 48 }}>
        <h2 className="section-title">View Reviews</h2>
        <div className="review-list">
          {reviews.length === 0 && <p className="muted">No reviews yet.</p>}
          {reviews.map((review) => (
            <article key={review._id} className="review-card">
              <strong>{review.name}</strong>
              <span className="badge"> {review.rating}/5</span>
              <p className="muted">{review.comment}</p>
            </article>
          ))}
        </div>

        {userInfo ? (
          <form className="form" onSubmit={handleReview} style={{ marginTop: 28, maxWidth: 520 }}>
            <h3>Create a review</h3>
            <label htmlFor="rating">Rating</label>
            <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              {[5, 4, 3, 2, 1].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <label htmlFor="comment">Comment</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
            <Button type="submit">Submit Review</Button>
          </form>
        ) : (
          <p className="muted" style={{ marginTop: 24 }}>
            <Button to="/auth/signin">Log in</Button> to write a review.
          </p>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
