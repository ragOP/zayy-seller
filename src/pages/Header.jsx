import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header style={headerStyle}>
      <h2 style={{ marginLeft: "10px" }}>Seller Dashboard</h2>
      <nav>
        <ul style={navStyle}>
          <li style={navItemStyle}>
            <Link to="/dashboard" style={linkStyle}>
              Home
            </Link>
          </li>
          <li style={navItemStyle}>
            <Link to="/dashboard/profile" style={linkStyle}>
              Profile
            </Link>
          </li>

          <li style={navItemStyle}>
            <Link to="/dashboard/settings" style={linkStyle}>
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const headerStyle = {
  backgroundColor: "#333",
  color: "#fff",
  padding: "10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

const navStyle = {
  listStyle: "none",
  display: "flex",
  margin: "0",
  padding: "0",
};

const navItemStyle = {
  marginLeft: "10px",
};

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
};

export default Header;
