import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <Navigate to="/auth/signin" replace />;
  }

  return children;
};

export const AdminRoute = ({ children }) => {
  const { userInfo } = useAuth();

  if (!userInfo) {
    return <Navigate to="/auth/signin" replace />;
  }

  if (!userInfo.isAdmin) {
    return (
      <div className="status-block">
        <h1>Not authorized</h1>
        <p className="error">Admin access is required for this page.</p>
      </div>
    );
  }

  return children;
};

export const GuestRoute = ({ children }) => {
  const { userInfo } = useAuth();

  if (userInfo) {
    return <Navigate to={userInfo.isAdmin ? "/admin/products" : "/"} replace />;
  }

  return children;
};
