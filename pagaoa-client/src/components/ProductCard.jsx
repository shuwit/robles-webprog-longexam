import { useNavigate } from "react-router-dom";
import Button from "./Button";
import { useAuth } from "../context/AuthContext";
import { addToCartRequest } from "../utils/api";

const formatPrice = (price) =>
  `₱${Number(price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

const ProductCard = ({ product, onAdded }) => {
  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!userInfo) {
      navigate("/auth/signin");
      return;
    }

    try {
      await addToCartRequest(userInfo, product._id, 1);
      onAdded?.(`${product.name} added to cart`);
    } catch (error) {
      onAdded?.(error.message, true);
    }
  };

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="card-body">
        <p className="kicker">{product.category?.name || "Campus"}</p>
        <h3>{product.name}</h3>
        <p className="muted">{product.description}</p>
        <p className="price">{formatPrice(product.price)}</p>
        <span className="stock-chip">{product.stock} in stock</span>
        <div className="card-actions">
          <Button className="btn-block" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </div>
        <div className="card-actions">
          <Button to={`/products/${product._id}`} variant="outline" className="btn-block">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
