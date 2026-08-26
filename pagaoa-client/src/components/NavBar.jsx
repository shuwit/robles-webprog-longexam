import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/img/nubdexchange_logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Cart", to: "/cart" },
];

const navLinkClassName = ({ isActive }) =>
  [
    "px-4 py-2 rounded-full text-sm font-semibold transition",
    isActive ? "bg-black text-white" : "text-gray-600 hover:bg-gray-200",
  ].join(" ");

const loginClassName = ({ isActive }) =>
  [
    "px-4 py-2 rounded-full text-sm font-semibold transition",
    isActive
      ? "bg-white text-black"
      : "text-[#fef6e9] border border-[#fef6e9] hover:bg-[#fef6e9] hover:text-black",
  ].join(" ");

const TopBar = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 w-full bg-[#fef6e9] text-[#070546] text-sm py-2 text-center font-medium z-50 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      🎉 15% Off on Orders Over 10 items! | SignUp & Save 15%
    </div>
  );
};

const NavBar = () => {
  const location = useLocation(); // trigger re-render on route change
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    window.location.href = "/auth/signin"; // Force full page reload to clear state
  };

  return (
    <>
      <TopBar />

      <header className="fixed top-0 w-full bg-[#04022d] shadow-md z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logo} alt="nubdexchange logo" className="w-20 h-13 " />
            <span className="font-serif text-xl text-[#fef6e9]">
              BulldogEx{" "}
            </span>
          </NavLink>

          <nav className="flex items-center gap-4">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={navLinkClassName}>
                {link.label}
              </NavLink>
            ))}

            {userInfo ? (
              <div className="flex items-center gap-4">
                <span className="text-[#fef6e9] text-sm font-semibold">
                  Hi, {userInfo.name}
                </span>
                <button onClick={logoutHandler} className={loginClassName({ isActive: false })}>
                  Logout
                </button>
              </div>
            ) : (
              <NavLink to="/auth/signin" className={loginClassName}>
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
