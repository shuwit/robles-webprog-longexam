import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./layouts/Layout";
import ProductPage from "./pages/LandingPages/ProductPage";
import HomePage from "./pages/LandingPages/HomePage";
import AboutPage from "./pages/LandingPages/AboutPage";
import ProductListPage from "./pages/LandingPages/ProductListPage";
import CartPage from "./pages/LandingPages/CartPage";
import AuthLayout from "./layouts/AuthLayout";
import SignInPage from "./pages/AuthPages/SignInPage";
import SignUpPage from "./pages/AuthPages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";

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
      { path: "cart", element: <CartPage /> },
    ],
  },
  {
    path: "auth/",
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "signin", element: <SignInPage /> },
      { path: "signup", element: <SignUpPage /> },
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
