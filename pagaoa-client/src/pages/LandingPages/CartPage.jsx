import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";
import { apiRequest, formatPrice } from "../../utils/api";

function CartPage() {
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState("NU Manila Campus");
  const [city, setCity] = useState("Manila");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Pickup");

  const loadCart = async () => {
    try {
      const data = await apiRequest(`/api/cart/${userInfo._id}`, {
        token: userInfo.token,
      });
      setCartItems(data.cartItems || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      setLoading(false);
      return;
    }
    loadCart();
  }, [userInfo]);

  const productIdOf = (item) => item.product?._id || item.product;

  const changeQty = async (item, nextQty) => {
    setError("");
    setMessage("");
    try {
      const data = await apiRequest(`/api/cart/${userInfo._id}`, {
        method: "PUT",
        token: userInfo.token,
        body: { productId: productIdOf(item), qty: nextQty },
      });
      setCartItems(data.cartItems || []);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeItem = async (item) => {
    setError("");
    setMessage("");
    try {
      const data = await apiRequest(
        `/api/cart/${userInfo._id}/items/${productIdOf(item)}`,
        {
          method: "DELETE",
          token: userInfo.token,
        }
      );
      setCartItems(data.cartItems || []);
      setMessage("Item removed from cart");
    } catch (err) {
      setError(err.message);
    }
  };

  const checkout = async () => {
    setError("");
    try {
      await apiRequest("/api/orders", {
        method: "POST",
        token: userInfo.token,
        body: {
          paymentMethod,
          shippingAddress: {
            address,
            city,
            postalCode: "1008",
            country: "Philippines",
          },
        },
      });
      setMessage("Order placed. Track it under Ongoing Orders.");
      setCartItems([]);
      navigate("/orders");
    } catch (err) {
      setError(err.message);
    }
  };

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

  const total = cartItems.reduce((sum, item) => {
    const price = item.product?.price || 0;
    return sum + price * item.qty;
  }, 0);

  return (
    <div className="page section">
      <div className="container">
        <p className="kicker">Checkout</p>
        <h1 className="section-title">Shopping Cart</h1>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}

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
                    <div className="qty-controls">
                      <button
                        type="button"
                        onClick={() => changeQty(item, item.qty - 1)}
                        aria-label={`Decrease ${item.product?.name || "item"} quantity`}
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        type="button"
                        onClick={() => changeQty(item, item.qty + 1)}
                        aria-label={`Increase ${item.product?.name || "item"} quantity`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="cart-item-side">
                  <strong>{formatPrice((item.product?.price || 0) * item.qty)}</strong>
                  <button
                    type="button"
                    className="cart-remove"
                    onClick={() => removeItem(item)}
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))}

            <form className="form" style={{ maxWidth: 480, marginTop: 24 }}>
              <label htmlFor="address">Pickup / shipping address</label>
              <input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <label htmlFor="city">City</label>
              <input
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <label htmlFor="payment">Payment method</label>
              <select
                id="payment"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option>Cash on Pickup</option>
                <option>GCash</option>
                <option>PayPal</option>
              </select>
            </form>

            <div className="cart-total">
              <h3>Total {formatPrice(total)}</h3>
              <Button onClick={checkout}>Place Order</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
