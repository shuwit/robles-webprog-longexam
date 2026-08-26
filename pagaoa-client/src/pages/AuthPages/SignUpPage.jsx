import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

const inputClasses =
  "mt-2 w-full rounded-xl border border-[#d4af37]/20 bg-[#0b0a2f] px-4 py-3 text-sm text-[#f5d98b] outline-none transition placeholder:text-[#f5d98b]/40 focus:border-[#d4af37]";

const actionButtonClassName =
  "w-full rounded-xl py-3 text-[11px] tracking-[0.2em]";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${firstName} ${lastName}`,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Account created successfully!");
        navigate("/auth/signin");
      } else {
        setError(data.message || "Failed to create account");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#070546] text-[#d4af37] px-6 py-10 sm:px-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Sign Up</h1>

      <p className="mt-3 text-sm leading-6 text-[#f5d98b]/80 max-w-xl">
        Create a BulldogEx Shop account for faster checkout, order updates, and
        campus pickup details.
      </p>
      <form onSubmit={submitHandler} className="mt-10 space-y-5 max-w-2xl">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="text-sm text-[#f5d98b]">First Name</label>
            <input
              type="text"
              placeholder="First name"
              className={inputClasses}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm text-[#f5d98b]">Last Name</label>
            <input
              type="text"
              placeholder="Last name"
              className={inputClasses}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-[#f5d98b]">Email</label>
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
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button
          type="submit"
          className={`${actionButtonClassName} bg-[#d4af37] text-[#070546] hover:bg-[#f5d98b]`}
        >
          Create Account
        </Button>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            type="button"
            className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#070546]"
          >
            Sign Up with Google
          </Button>

          <Button
            type="button"
            className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-[#070546]"
          >
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-10 border-t border-[#d4af37]/20 pt-6 text-sm text-[#f5d98b]/70">
        Already have an account?{" "}
        <Link
          to="/auth/signin"
          className="font-semibold text-[#d4af37] hover:text-[#f5d98b]"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default SignUpPage;
