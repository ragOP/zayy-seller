import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <h2 className="ml-4">Seller Dashboard</h2>
      <nav>
        <ul className="flex">
          <li className="ml-4">
            <Link to="/dashboard" className="text-white no-underline">
              Home
            </Link>
          </li>
          <li className="ml-4">
            <Link to="/dashboard/profile" className="text-white no-underline">
              Profile
            </Link>
          </li>
          <li className="ml-4">
            <Link to="/dashboard/settings" className="text-white no-underline">
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
