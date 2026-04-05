import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ darkMode, setDarkMode, role, setRole }) => {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Transactions', path: '/transactions' },
     { name: 'Insights', path: '/Insights' },
  ];

  // Toggle role function
  const toggleRole = () => {
    setRole(role === "admin" ? "user" : "admin");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg transition">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">

          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary-700 dark:text-white">
              Finance Dashboard
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center space-x-4">

            {/* Common Links */}
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  location.pathname === item.path
                    ? 'text-primary-700 bg-primary-100 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Admin Only */}
            {role === "admin" && (
              <Link
                to="/add-transaction"
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                  location.pathname === '/add-transaction'
                    ? 'text-primary-700 bg-primary-100 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                Add Transaction
              </Link>
            )}

            {/* Role Toggle */}
            <button
              onClick={toggleRole}
              className="ml-4 px-3 py-2 rounded-md bg-red-500 text-white text-sm hover:bg-blue-600 transition"
            >
              {role === "admin" ? "Admin" : "User"}
              
            </button>
             
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-sm"
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;