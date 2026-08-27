import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layouts/Layout";
import ProductPage from "./pages/LandingPages/ProductPage";
import HomePage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import ProductListPage from "./pages/LandingPages/ProductListPage";
import CartPage from "./pages/LandingPages/CartPage";
import OrdersPage from "./pages/LandingPages/OrdersPage";
import ProfilePage from "./pages/LandingPages/ProfilePage";
import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";
import { AdminRoute, GuestRoute, ProtectedRoute } from "./components/ProtectedRoute";
import AdminProductsPage from "./pages/AdminPages/AdminProductsPage";
import AdminOrdersPage from "./pages/AdminPages/AdminOrdersPage";
import AdminReviewsPage from "./pages/AdminPages/AdminReviewsPage";
import AdminUsersPage from "./pages/AdminPages/AdminUsersPage";

const routes = [
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "products", element: <ProductListPage /> },
      { path: "products/:id", element: <ProductPage /> },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/products",
        element: (
          <AdminRoute>
            <AdminProductsPage />
          </AdminRoute>
        ),
      },
      {
        path: "admin/orders",
        element: (
          <AdminRoute>
            <AdminOrdersPage />
          </AdminRoute>
        ),
      },
      {
        path: "admin/reviews",
        element: (
          <AdminRoute>
            <AdminReviewsPage />
          </AdminRoute>
        ),
      },
      {
        path: "admin/users",
        element: (
          <AdminRoute>
            <AdminUsersPage />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "signin",
        element: (
          <GuestRoute>
            <SignInPage />
          </GuestRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <GuestRoute>
            <SignUpPage />
          </GuestRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
