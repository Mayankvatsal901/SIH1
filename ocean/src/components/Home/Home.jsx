import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState([]);
  const containerRef = useRef(null);
  
  // Floating particles animation
  const floatingParticles = Array.from({ length: 30 }, (_, i) => {
    const size = Math.random() * 4 + 2;
    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      duration: Math.random() * 10 + 8,
      delay: Math.random() * 3,
      color: `rgba(${139 + Math.random() * 50}, ${92 + Math.random() * 50}, ${230 + Math.random() * 25}, ${0.3 + Math.random() * 0.2})`
    };
  });

  // Handle mouse movement to create wave effect
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setHoverPosition({ x, y });
    
    // Create a new ripple effect
    if (ripples.length < 5) { // Limit number of ripples
      const newRipple = {
        id: Date.now(),
        x,
        y,
        size: 0,
        opacity: 0.7
      };
      
      setRipples([...ripples, newRipple]);
    }
  };

  // Animate ripples
  useEffect(() => {
    if (ripples.length === 0) return;
    
    const interval = setInterval(() => {
      setRipples(prevRipples => {
        const updatedRipples = prevRipples.map(ripple => ({
          ...ripple,
          size: ripple.size + 2,
          opacity: ripple.opacity - 0.02
        })).filter(ripple => ripple.opacity > 0);
        
        return updatedRipples;
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [ripples]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen bg-gray-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Base dark background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-950" />
      
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        initial={{
          background: 'radial-gradient(circle at 20% 30%, #3730a3 0%, transparent 50%), radial-gradient(circle at 80% 70%, #5b21b6 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 30%, #3730a3 0%, transparent 50%), radial-gradient(circle at 80% 70%, #5b21b6 0%, transparent 50%)',
            'radial-gradient(circle at 40% 10%, #4338ca 0%, transparent 50%), radial-gradient(circle at 60% 90%, #6d28d9 0%, transparent 50%)',
            'radial-gradient(circle at 80% 30%, #3730a3 0%, transparent 50%), radial-gradient(circle at 20% 70%, #5b21b6 0%, transparent 50%)',
            'radial-gradient(circle at 20% 30%, #3730a3 0%, transparent 50%), radial-gradient(circle at 80% 70%, #5b21b6 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Animated grid lines */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.1 }}
        animate={{ 
          opacity: [0.1, 0.15, 0.1],
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />
      
      {/* Floating particles */}
      {floatingParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          initial={{
            x: `${particle.x}%`,
            y: `${particle.y}%`,
          }}
          animate={{
            x: [`${particle.x}%`, `${(particle.x + 30) % 100}%`, `${particle.x}%`],
            y: [`${particle.y}%`, `${(particle.y + 20) % 100}%`, `${particle.y}%`],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Ripple wave effect */}
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute rounded-full bg-indigo-500 pointer-events-none"
          style={{
            left: `${ripple.x}%`,
            top: `${ripple.y}%`,
            width: `${ripple.size}px`,
            height: `${ripple.size}px`,
            opacity: ripple.opacity,
            transform: 'translate(-50%, -50%)',
            transition: 'all 0.1s linear'
          }}
        />
      ))}
      
      {/* Subtle animated elements */}
      <motion.div
        className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-indigo-800 mix-blend-soft-light filter blur-3xl"
        initial={{ scale: 0.8, opacity: 0.3 }}
        animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-violet-800 mix-blend-soft-light filter blur-3xl"
        initial={{ scale: 1.2, opacity: 0.3 }}
        animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Subtle shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-700/20 to-transparent"
        animate={{ x: [-1000, 1000] }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Content layer - Adjusted to be lower on the page */}
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-32 p-8 text-white">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ 
            textShadow: '0 0 15px rgba(59, 130, 246, 0.8), 0 0 30px rgba(59, 130, 246, 0.6), 0 0 45px rgba(59, 130, 246, 0.4)',
            filter: 'brightness(1.2)'
          }}
        >
          Ocean Data Intelligence
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-blue-200 text-center max-w-3xl mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          style={{ 
            textShadow: '0 0 10px rgba(147, 197, 253, 0.7), 0 0 20px rgba(147, 197, 253, 0.5)',
          }}
        >
          Explore real-time ocean metrics with AI-powered insights from global ARGO float network
        </motion.p>
        
        <motion.div
          className="flex gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors text-lg glow-button">
            Explore Data
          </button>
          <button className="px-8 py-4 bg-transparent border-2 border-indigo-400 hover:bg-indigo-950 rounded-lg font-medium transition-colors text-lg glow-button">
            Learn More
          </button>
        </motion.div>

        {/* Ocean Data Metrics Boxes */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 w-full max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9 }}
        >
          {/* Temperature Box */}
          <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30 text-center glow-box">
            <div className="text-3xl font-bold text-blue-300 mb-2">TEMPERATURE (°C)</div>
            <div className="text-5xl font-bold text-white mb-2">18.7°</div>
            <div className="text-blue-200 text-sm">Current surface temperature</div>
          </div>

          {/* Salinity Box */}
          <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30 text-center glow-box">
            <div className="text-3xl font-bold text-blue-300 mb-2">SALINITY (PSU)</div>
            <div className="text-5xl font-bold text-white mb-2">34.9</div>
            <div className="text-blue-200 text-sm">Practical Salinity Units</div>
          </div>

          {/* AI Assistant Box */}
          <div className="bg-indigo-900/40 backdrop-blur-sm rounded-xl p-6 border border-indigo-500/30 text-center glow-box">
            <div className="text-3xl font-bold text-blue-300 mb-2">FloatChat AI</div>
            <div className="text-2xl font-bold text-green-400 mb-2">Online</div>
            <div className="text-blue-200">AI Assistant Ready</div>
            <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white transition-colors">
              Get Started
            </button>
          </div>
        </motion.div>
        
        {/* ARGO Program Section */}
        <motion.div 
          className="p-6 bg-indigo-900/30 backdrop-blur-sm rounded-xl border border-indigo-500/30 max-w-3xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-indigo-200 text-center glow-text">
            What is the ARGO Program?
          </h2>
          <p className="text-indigo-100 text-center">
            The Argo Program is a global array of autonomous floating instruments that collect high-quality 
            temperature and salinity profiles from the upper 2000m of the ice-free global ocean.
          </p>
        </motion.div>

        {/* Project Description Section */}
        <motion.div 
          className="p-6 bg-violet-900/30 backdrop-blur-sm rounded-xl border border-violet-500/30 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-violet-200 text-center glow-text">
            AI-Powered Ocean Data Exploration
          </h2>
          <p className="text-violet-100 text-center">
            Our platform transforms complex oceanographic data from ARGO floats into accessible insights 
            using advanced AI and natural language processing. Query ocean parameters, visualize data trends, 
            and discover patterns through intuitive conversational interfaces.
          </p>
        </motion.div>
      </div>

      {/* Custom styles for glowing effects */}
      <style jsx>{`
        .glow-button {
          text-shadow: 0 0 8px rgba(99, 102, 241, 0.8);
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
        }
        .glow-button:hover {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.8);
        }
        .glow-text {
          text-shadow: 0 0 10px rgba(165, 180, 252, 0.7);
        }
        .glow-box {
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.3);
        }
        .glow-box:hover {
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Home;