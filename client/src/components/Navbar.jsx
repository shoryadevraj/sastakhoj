
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    logout();
    nav("/");
  };

  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link className="brand" to="/" onClick={closeMenu}>
          <img src="/logo.png" alt="SastaKhoj logo" />
          <span>
            Sasta<span>Khoj</span>
          </span>
        </Link>

        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="main-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "✕" : "☰"}</span>
        </button>

        <nav
          id="main-navigation"
          className={`nav-links${menuOpen ? " is-open" : ""}`}
        >
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>

          <Link to="/shops" onClick={closeMenu}>
            Shops
          </Link>

          {user?.role === "shopkeeper" && (
            <Link to="/shopkeeper" onClick={closeMenu}>
              Dashboard
            </Link>
          )}

          {user?.role === "admin" && (
            <Link to="/admin" onClick={closeMenu}>
              Admin
            </Link>
          )}

          {user ? (
            <button className="link-btn" type="button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu}>
                Login
              </Link>

              <Link
                className="nav-cta"
                to="/register"
                onClick={closeMenu}
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
