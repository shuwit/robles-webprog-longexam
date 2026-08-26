import { NavLink } from "react-router-dom";
import logo from "../assets/img/nubdexchange_logo.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <img src={logo} alt="BulldogEx logo" />
            <span>BulldogEx</span>
          </div>
          <p>
            Your campus marketplace for uniforms, essentials, and student gear.
          </p>
        </div>

        <div>
          <h4>Quick Links</h4>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <p>Sampaloc, Manila, Philippines</p>
          <p>+63 912 345 6789</p>
          <p>support@nubdexchange.com</p>
        </div>
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} BulldogEx. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
