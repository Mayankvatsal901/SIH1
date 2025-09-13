// src/components/Talk.js
import React from 'react';
import { Link } from 'react-router-dom';
 // Use your existing styles

const Talk = () => {
  return (
    <div className="bg-slate-900 text-white min-h-screen flex flex-col items-center justify-center text-center py-24 px-4">
      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
        <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2H7m7 4v3m-4-3v3"></path>
        </svg>
      </div>
      <h2 className="text-5xl md:text-6xl font-bold mb-6">
        <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">Talk to Our AI is Coming Soon!</span>
      </h2>
      <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
        We're building a new conversational AI to help you explore ocean data. Stay tuned for updates!
      </p>
      <div className="mt-8">
        <Link to="/" className="accent-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Talk;