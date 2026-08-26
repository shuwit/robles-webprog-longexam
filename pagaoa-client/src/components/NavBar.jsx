import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/img/nubdexchange_logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
];

const TopBar = () => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY < 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`promo-bar ${show ? "" : "is-hidden"}`}>
      15% off on orders over 10 items | Sign up and save
    </div>
  );
};

const NavBar = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/auth/signin");
  };

  return (
    <>
      <TopBar />
      <header className="navbar">
        <div className="navbar-inner">
          <NavLink to="/" className="brand">
            <img src={logo} alt="BulldogEx logo" />
            <span>BulldogEx</span>
          </NavLink>

          <nav className="nav-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                {link.label}
              </NavLink>
            ))}

            {userInfo ? (
              <div className="nav-user">
                <span className="nav-name">Hi, {userInfo.name}</span>
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    isActive ? "nav-link active" : "nav-link"
                  }
                >
                  Cart
                </NavLink>
                <button type="button" className="btn btn-ghost" onClick={logoutHandler}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/auth/signin" className="btn btn-gold">
                Login
              </NavLink>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default NavBar;
