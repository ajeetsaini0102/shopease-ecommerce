import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState(
    localStorage.getItem("username")
  );

  const [token, setToken] = useState(
    localStorage.getItem("access_token")
  );

  // Login / Logout detect karega
  useEffect(() => {
    const checkLogin = () => {
      setUsername(localStorage.getItem("username"));
      setToken(localStorage.getItem("access_token"));
    };

    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  // Cart me total quantity
  const cartCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");

    // CartContext ko batayenge ki user logout ho gaya
    window.dispatchEvent(new Event("storage"));

    setToken(null);
    setUsername(null);

    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">
        <Link to="/">ShopEase</Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">

        <Link to="/">Home</Link>

        <Link to="/products">Products</Link>

        <Link to="/my-orders">My Orders</Link>

        <Link to="/cart" className="cart-link">
          Cart
          <span className="cart-badge">
            {cartCount}
          </span>
        </Link>

        {token ? (
          <>
            <span className="welcome-user">
              Welcome, {username}
            </span>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}

      </div>
    </nav>
  );
}

export default Navbar;