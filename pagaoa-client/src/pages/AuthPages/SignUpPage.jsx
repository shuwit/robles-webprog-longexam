import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useAuth } from "../../context/AuthContext";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to create account");
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
      <h1>Sign Up</h1>
      <p className="muted">
        Create a BulldogEx account for faster checkout and campus pickup details.
      </p>

      <form onSubmit={submitHandler} className="form">
        {error && <p className="error">{error}</p>}
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Jane Smith"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
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
          Create Account
        </Button>
      </form>

      <div className="auth-footer">
        Already have an account?{" "}
        <Link to="/auth/signin" className="link">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
