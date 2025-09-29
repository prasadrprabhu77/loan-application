import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Navbar = () => {
  const { user, profile, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-3 flex items-center justify-between shadow-md fixed top-0 left-0 right-0 z-50">
      {/* Left - Logo */}
      <h1 className="text-4xl ml-5 font-bold">Quick Loan</h1>

      {/* Center - Links */}
      <div className="hidden md:flex space-x-12">
        <Link to="/" className="hover:underline text-xl">
          Home
        </Link>
        <Link to="/about" className="hover:underline text-xl">
          About
        </Link>
        <Link to="/contact" className="hover:underline text-xl">
          Contact Us
        </Link>
        <Link to="/myloans" className="hover:underline text-xl">
          My Loans
        </Link>
      </div>

      {/* Right - Profile */}
      {user && (
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="bg-white text-blue-600 px-3 py-1 rounded-full font-medium hover:bg-gray-100"
          >
            {"Profile"}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-lg shadow-lg p-4">
              <p className="font-semibold">{profile?.name || "User"}</p>
              <p className="text-sm text-gray-600 mb-3">
                {profile?.email || user.email}
              </p>
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 text-white py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
