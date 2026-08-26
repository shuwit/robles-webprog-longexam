import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-xl border border-[#d4af37]/20 bg-[#0b0a2f] px-4 py-3 text-sm text-[#f5d98b] outline-none transition placeholder:text-[#f5d98b]/40 focus:border-[#d4af37]";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user info and token to localStorage
        localStorage.setItem("userInfo", JSON.stringify(data));
        alert("Logged in successfully!");
        navigate("/"); // Redirect to home
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight text-[#d4af37] sm:text-4xl">
        Log In
      </h1>

      <p className="mt-3 text-sm leading-6 text-[#f5d98b]/80">
        Access your BulldogEx account to manage orders, saved items, and pickup
        details.
      </p>

      <form onSubmit={submitHandler} className="mt-8 space-y-5">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <label className="text-sm text-[#f5d98b]">Email Address</label>
          <input
            type="email"
            placeholder="student@email.com"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-[#f5d98b]">Password</label>
          <input
            type="password"
            placeholder="Password"
            className={inputClasses}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="mt-2 text-xs text-[#f5d98b]/60">
            Use your registered BulldogEx account password.
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-[#f5d98b]/70">
            <input type="checkbox" className="h-4 w-4 accent-[#d4af37]" />
            Remember me
          </label>

          <button type="button" className="text-[#d4af37] hover:text-[#f5d98b]">
            Forgot Password?
          </button>
        </div>

        <Button
          type="submit"
          className={`${actionButtonClassName} bg-[#d4af37] text-[#070546] hover:bg-[#f5d98b]`}
        >
          Log In
        </Button>

        <Button
          type="button"
          className="w-full border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#070546]"
        >
          Log In with Google
        </Button>
      </form>

      <div className="mt-8 border-t border-[#d4af37]/20 pt-6 text-sm text-[#f5d98b]/70">
        No account yet?{" "}
        <Link to="/auth/signup" className="text-[#d4af37] hover:text-[#f5d98b]">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
