import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { apiRequest, formatPrice } from "../../utils/api";

const statusLabel = {
  pending: "Ongoing",
  confirmed: "Confirmed",
  ready_for_claiming: "Ready for claiming",
  claimed: "Claimed",
};

const OrdersPage = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/api/orders/mine", { token: userInfo.token })
      .then(setOrders)
      .catch((err) => setError(err.message));
  }, [userInfo]);

  return (
    <div className="page section">
      <div className="container">
        <p className="kicker">Customer</p>
        <h1 className="section-title">Ongoing Orders</h1>
        {error && <p className="error">{error}</p>}
        {orders.length === 0 && <p className="muted">No orders yet.</p>}
        {orders.map((order) => (
          <article key={order._id} className="review-card" style={{ marginBottom: 16 }}>
            <span className="badge">{statusLabel[order.status] || order.status}</span>
            <p className="schema-meta">
              Placed {new Date(order.createdAt).toLocaleString("en-PH")}
            </p>
            <p className="muted">Payment: {order.paymentMethod}</p>
            {order.shippingAddress && (
              <p className="muted">
                Pickup: {order.shippingAddress.address}, {order.shippingAddress.city}
              </p>
            )}
            <p>Total {formatPrice(order.totalPrice)}</p>
            <ul>
              {order.orderItems.map((item) => (
                <li key={item._id}>
                  {item.name} × {item.qty} — {formatPrice(item.price)}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
