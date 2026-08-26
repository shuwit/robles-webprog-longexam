import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Invalid email or password");
        return;
      }

      login(data);
      navigate("/");
    } catch {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Log In</h1>
      <p className="muted">
        Access your BulldogEx account to manage orders and your cart.
      </p>

      <form onSubmit={submitHandler} className="form">
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            type="email"
            placeholder="student@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="btn-block">
          Log In
        </Button>
      </form>

      <div className="auth-footer">
        No account yet?{" "}
        <Link to="/auth/signup" className="link">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
