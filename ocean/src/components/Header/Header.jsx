import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 shadow-lg border-b border-cyan-500/30">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="relative flex items-center">
              <div className="absolute -inset-3 bg-cyan-500/20 rounded-full blur-md group-hover:bg-cyan-500/30 transition-all duration-300"></div>
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.6LWl1tGcf8dZdvgyIAKUVwHaHk?r=0&cb=thfvnext&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="FloatChat Logo"
                className="h-10 w-auto relative z-10 transform group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              FloatChat
            </span>
          </Link>
          
          {/* Desktop Navigation Items */}
          <ul className="hidden md:flex space-x-6 text-gray-200 font-medium">
            {[
              { to: "/", label: "Home" },
              { to: "/data-discovery", label: "Data Discovery" },
              { to: "/visualizations", label: "Visualizations" },
              { to: "/chatbot", label: "Chatbot" },
              { to: "/about", label: "About" },
              { to: "/map", label: "Map" },
            ].map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => 
                    `py-2 px-3 rounded-lg transition-all duration-300 relative group ${
                      isActive 
                        ? "text-white bg-cyan-600/30 shadow-lg" 
                        : "hover:text-cyan-300 hover:bg-slate-800/50"
                    }`
                  }
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Auth Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-cyan-300 hover:text-white font-medium px-4 py-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg px-5 py-2.5 hover:from-cyan-500 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Signup
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-cyan-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 p-2 rounded-lg"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-2 pb-4 bg-slate-800/95 backdrop-blur-lg rounded-lg border border-cyan-500/20 shadow-xl">
            <ul className="px-4 py-3 space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/data-discovery", label: "Data Discovery" },
                { to: "/visualizations", label: "Visualizations" },
                { to: "/chatbot", label: "Chatbot" },
                { to: "/about", label: "About" },
                { to: "/map", label: "Map" },
              ].map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) => 
                      `block py-2.5 px-4 rounded-lg transition-all duration-300 ${
                        isActive 
                          ? "text-white bg-cyan-600/30" 
                          : "text-cyan-200 hover:text-white hover:bg-slate-700/50"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <div className="pt-4 border-t border-cyan-500/20 mt-3">
                <li>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 px-4 rounded-lg text-cyan-200 hover:text-white hover:bg-slate-700/50 transition-all duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li className="mt-2">
                  <Link
                    to="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block py-2.5 px-4 rounded-lg text-white text-center bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
                  >
                    Signup
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;