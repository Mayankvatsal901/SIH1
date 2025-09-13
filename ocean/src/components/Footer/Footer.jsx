import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About Section */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-white">About FloatChat</h4>
          <p className="text-sm leading-relaxed">
            FloatChat is an AI-powered conversational interface for ocean data discovery and visualization, democratizing access to ARGO float data.
          </p>
        </div>

        {/* Resources Section */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-white">Resources</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:underline hover:text-white">Home</a></li>
            <li><a href="/data-discovery" className="hover:underline hover:text-white">Data Discovery</a></li>
            <li><a href="/visualizations" className="hover:underline hover:text-white">Visualizations</a></li>
            <li><a href="/chatbot" className="hover:underline hover:text-white">Chatbot</a></li>
          </ul>
        </div>

        {/* Help Section */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-white">Help</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/contact" className="hover:underline hover:text-white">Contact Us</a></li>
            <li><a href="/faq" className="hover:underline hover:text-white">FAQ</a></li>
            <li><a href="/support" className="hover:underline hover:text-white">Support</a></li>
            <li><a href="/terms" className="hover:underline hover:text-white">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Social and Legal Section */}
        <div>
          <h4 className="text-xl font-semibold mb-4 text-white">Connect with Us</h4>
          <div className="flex space-x-4 text-gray-400">
            <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.9 9.4.5.1.7-.2.7-.5v-2.1c-2.8.6-3.3-1.3-3.3-1.3-.5-1.1-1.2-1.4-1.2-1.4-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.7 1.7 3 1.7 2.7 0 4.5-2.1 4.5-4.5 0-1.8-1-3.3-2.4-3.9.1-.6.4-1 1-1.4-1.8-.2-3.7-.9-3.7-4 0-.9.3-1.7.9-2.3 0 0-.1-.2-.4-.6 0 0-.3-.1-.8-.2 0 0 0-.1 0-.3s-.3-.9 0-2c0 0 0-.4.2-.8 0 0-.1 0-.2-.1-1.2.4-2 1.7-2 3.4 0 3 1.8 4 3.5 4.1-.4.3-.7.9-.7 1.5v2.3c0 .3.2.7.8.5C17.1 20.1 20 16.4 20 12c0-5.5-4.5-10-10-10z"/>
              </svg>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.1.8 4.6 4.6 0 002-2.5 9.27 9.27 0 01-2.9 1 4.5 4.5 0 00-7.4 4.1 12.8 12.8 0 01-9-4.7 4.5 4.5 0 001.4 6 4.5 4.5 0 01-2-.5v.1a4.5 4.5 0 003.6 4.4 4.5 4.5 0 01-2 .1 4.5 4.5 0 004.2 3.1 9 9 0 01-6 2c-.4 0-.8 0-1.2-.1a13 13 0 007 2c8.4 0 13-7 13-13v-.5A9.4 9.4 0 0023 3z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M4.98 3.5a2.5 2.5 0 11-.002 5 2.5 2.5 0 01.002-5zm.02 7H2V21h3v-10zm7 0h-2.9v10h3v-5.5c0-3 4-3.2 4 0v5.5h3v-6c0-5.5-6.3-5.3-7.1-2.6v-1.9z"/>
              </svg>
            </a>
          </div>
          <p className="text-xs mt-6 text-gray-500">&copy; 2025 FloatChat, All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

