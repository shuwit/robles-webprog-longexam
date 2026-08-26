import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";

const formatPrice = (price) =>
  `₱${Number(price).toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

function CartPage() {
  const { userInfo } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userInfo) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`/api/cart/${userInfo._id}`, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || "Failed to load cart");
        }
        setCartItems(data.cartItems || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="empty-state">
        <h1>Your Cart</h1>
        <p className="muted">Please log in to view your cart.</p>
        <Button to="/auth/signin">Log In</Button>
      </div>
    );
  }

  if (loading) {
    return <div className="status-block">Loading cart...</div>;
  }

  if (error) {
    return <div className="status-block error">{error}</div>;
  }

  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.qty;
  }, 0);

  return (
    <div className="page section">
      <div className="container">
        <p className="kicker">Checkout</p>
        <h1 className="section-title">Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="empty-state">
            <p>Your cart is completely empty.</p>
            <Link to="/products" className="link">
              Go Shopping
            </Link>
          </div>
        ) : (
          <div>
            {cartItems.map((item) => (
              <article key={item._id || item.product?._id} className="cart-item">
                <div className="cart-item-main">
                  <img
                    src={item.product?.image}
                    alt={item.product?.name || "Product"}
                  />
                  <div>
                    <h3>{item.product?.name || "Product"}</h3>
                    <p className="muted">Quantity: {item.qty}</p>
                  </div>
                </div>
                <strong>
                  {formatPrice((item.product?.price || 0) * item.qty)}
                </strong>
              </article>
            ))}

            <div className="cart-total">
              <h3>Total {formatPrice(total)}</h3>
              <Button>Proceed to Checkout</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
