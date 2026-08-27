import { useEffect, useState } from "react";
import Button from "../../components/Button";
import AdminTabs from "../../components/AdminTabs";
import { useAuth } from "../../context/AuthContext";
import { apiRequest, formatPrice } from "../../utils/api";

const AdminOrdersPage = () => {
  const { userInfo } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const load = () =>
    apiRequest("/api/orders", { token: userInfo.token })
      .then(setOrders)
      .catch((err) => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const act = async (id, action) => {
    setError("");
    try {
      await apiRequest(`/api/orders/${id}/${action}`, {
        method: "PUT",
        token: userInfo.token,
      });
      setMessage(action === "confirm" ? "Order confirmed" : "Order ready for claiming");
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page section">
      <div className="container">
        <AdminTabs />
        <p className="kicker">Admin</p>
        <h1 className="section-title">Orders</h1>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
        <table className="data-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name}</td>
                <td>{order.orderItems?.map((item) => `${item.name} × ${item.qty}`).join(", ")}</td>
                <td>{formatPrice(order.totalPrice)}</td>
                <td>
                  <span className="badge">{order.status}</span>
                </td>
                <td>
                  <div className="card-actions">
                    {order.status === "pending" && (
                      <Button variant="outline" onClick={() => act(order._id, "confirm")}>
                        Confirm Order
                      </Button>
                    )}
                    {order.status === "confirmed" && (
                      <Button onClick={() => act(order._id, "ready")}>
                        Ready for claiming
                      </Button>
                    )}
                    {order.status === "ready_for_claiming" && (
                      <span className="muted">Waiting for pickup</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrdersPage;
