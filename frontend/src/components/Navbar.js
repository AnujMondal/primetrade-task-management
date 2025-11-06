import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { MdDashboard } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">PT</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">
                PrimeTrade
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/dashboard")
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <MdDashboard className="text-xl" />
              <span>Dashboard</span>
            </Link>

            <Link
              to="/profile"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive("/profile")
                  ? "bg-primary-50 text-primary-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FiUser className="text-xl" />
              <span>Profile</span>
            </Link>

            {/* User Info */}
            <div className="flex items-center space-x-3 pl-4 ml-4 border-l border-gray-200">
              <img
                src={
                  user?.avatar ||
                  "https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff"
                }
                alt={user?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <FiLogOut className="text-xl" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <FiX className="text-2xl" />
              ) : (
                <FiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-fade-in">
            <div className="space-y-2">
              <Link
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg ${
                  isActive("/dashboard")
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-gray-600"
                }`}
              >
                <MdDashboard className="text-xl" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg ${
                  isActive("/profile")
                    ? "bg-primary-50 text-primary-700 font-medium"
                    : "text-gray-600"
                }`}
              >
                <FiUser className="text-xl" />
                <span>Profile</span>
              </Link>

              <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50 rounded-lg">
                <img
                  src={
                    user?.avatar ||
                    "https://ui-avatars.com/api/?name=User&background=4F46E5&color=fff"
                  }
                  alt={user?.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center space-x-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg"
              >
                <FiLogOut className="text-xl" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
