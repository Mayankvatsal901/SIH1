import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin } from 'react-icons/fa'; // Example using react-icons

const Footer = () => {
  const resourceLinks = [
    { to: "/", label: "Home" },
    { to: "/data-discovery", label: "Data Discovery" },
    { to: "/visualizations", label: "Visualizations" },
    { to: "/chatbot", label: "Chatbot" },
  ];

  const helpLinks = [
    { to: "/contact", label: "Contact Us" },
    { to: "/faq", label: "FAQ" },
    { to: "/support", label: "Support" },
    { to: "/terms", label: "Terms & Conditions" },
  ];
  
  // Reusable function for NavLink classes
  const getNavLinkClass = ({ isActive }) => 
    `transition-colors duration-300 hover:text-cyan-300 ${isActive ? 'text-cyan-400' : 'text-gray-400'}`;

  return (
    <footer className="bg-gray-900 border-t border-gray-700/50 text-gray-400">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-semibold text-gray-200 mb-4">About FloatChat</h4>
            <p className="text-sm">
              An AI-powered conversational interface for ocean data discovery, democratizing access to ARGO float data.
            </p>
          </div>
          
          {/* Resources Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map(link => (
                <li key={link.to}>
                  <NavLink to={link.to} end={link.to === "/"} className={getNavLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Help Section */}
          <div>
            <h4 className="text-lg font-semibold text-gray-200 mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              {helpLinks.map(link => (
                <li key={link.to}>
                  <NavLink to={link.to} className={getNavLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="col-span-2 md:col-span-1">
             <h4 className="text-lg font-semibold text-gray-200 mb-4">Connect with Us</h4>
             <div className="flex space-x-4">
                <a href="#" className="hover:text-cyan-300"><FaTwitter size={20} /></a>
                <a href="#" className="hover:text-cyan-300"><FaLinkedin size={20} /></a>
             </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-700/50 pt-8 text-center text-sm">
          <p>&copy; 2025 FloatChat, All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;