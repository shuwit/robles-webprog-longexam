import { NavLink } from "react-router-dom";

const AdminTabs = () => (
  <div className="admin-tabs">
    <NavLink to="/admin/products" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
      Products
    </NavLink>
    <NavLink to="/admin/orders" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
      Orders
    </NavLink>
    <NavLink to="/admin/reviews" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
      Reviews
    </NavLink>
    <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
      Users
    </NavLink>
  </div>
);

export default AdminTabs;
