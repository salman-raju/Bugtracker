import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // Keep your styles here

function Navbar() {
  const location = useLocation();
  const [user, setUser] = useState(null);

  // Check user login status on route change
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, [location.pathname]);

  return (
    <nav className="navbar">
      <div className="logo-container">
        <div className="logo-icon">🐞</div>
        <span className="logo-text">BugTracker</span>
      </div>

      <div className="nav-links">
        <CustomLink to="/" label="Home" current={location.pathname === "/"} />

        {/* Show only if NOT logged in */}
        {!user && (
          <>
            <CustomLink
              to="/register"
              label="Register"
              current={location.pathname === "/register"}
            />
            <CustomLink
              to="/login"
              label="Login"
              current={location.pathname === "/login"}
            />
          </>
        )}

        {/* Show always */}
        <CustomLink
          to="/report-bug"
          label="Report Bug"
          current={location.pathname === "/report-bug"}
        />
        <CustomLink
          to="/kanban"
          label="Kanban Board"
          current={location.pathname === "/kanban"}
        />
        <CustomLink
          to="/bugs"
          label="View Bugs"
          current={location.pathname === "/bugs"}
        />

        {/* Show only if logged in */}
        {user && (
          <div className="user-info">
            <span className="user-name">Hi, {user.username}</span>
            <button
              className="logout-btn"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

function CustomLink({ to, label, current }) {
  return (
    <Link to={to} className={`nav-link ${current ? "active-link" : ""}`}>
      {label}
    </Link>
  );
}

export default Navbar;
