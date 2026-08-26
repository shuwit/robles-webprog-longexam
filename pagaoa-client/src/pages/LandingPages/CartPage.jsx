import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo) {
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`/api/cart/${userInfo._id}`);
        const data = await res.json();
        if (res.ok && data.cartItems) {
          setCartItems(data.cartItems);
        } else {
          setCartItems([]);
        }
      } catch (err) {
        setError("Failed to load cart");
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userInfo]);

  if (!userInfo) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[#070546] text-[#d4af37]">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <p className="mb-6 text-[#f5d98b]/80">Please log in to view your cart.</p>
        <Button to="/auth/signin" className="bg-[#d4af37] text-[#070546] px-6 py-2 rounded-lg">
          Log In
        </Button>
      </div>
    );
  }

  if (loading) {
    return <div className="min-h-screen bg-[#070546] text-[#d4af37] p-10">Loading cart...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-[#070546] text-red-500 p-10">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#070546] text-[#d4af37] px-6 py-10 sm:px-12 pt-24">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div>
          <p className="text-[#f5d98b]/80 mb-4">Your cart is completely empty.</p>
          <Link to="/products" className="text-[#d4af37] hover:underline font-bold">
            Go Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between items-center bg-[#0b0a2f] p-4 rounded-xl border border-[#d4af37]/20">
              <div>
                <h3 className="font-bold">{item.product?.name || "Product Name"}</h3>
                <p className="text-sm text-[#f5d98b]/70">Quantity: {item.qty}</p>
              </div>
              <div className="font-bold text-[#d4af37]">
                ${(item.product?.price * item.qty).toFixed(2) || "0.00"}
              </div>
            </div>
          ))}

          <div className="flex justify-end mt-8">
            <Button className="bg-[#d4af37] text-[#070546] px-8 py-3 rounded-xl font-bold hover:bg-[#f5d98b]">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
