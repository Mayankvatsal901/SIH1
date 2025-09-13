import React, { useState } from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Define color schemes
  const themes = {
    dark: {
      bg: 'bg-slate-900',
      text: 'text-gray-300',
      heading: 'text-white',
      accent: 'bg-cyan-400',
      cardBg: 'bg-slate-800/80',
      cardBorder: 'border-slate-700',
      cardText: 'text-gray-400',
      cardHandleBg: (color) => color,
      lineStroke: '#475569',
      lineFill: '#64748B',
    },
    light: {
      bg: 'bg-slate-100',
      text: 'text-gray-700',
      heading: 'text-slate-900',
      accent: 'bg-blue-600',
      cardBg: 'bg-white',
      cardBorder: 'border-slate-200',
      cardText: 'text-gray-500',
      cardHandleBg: (color) => color,
      lineStroke: '#CBD5E1',
      lineFill: '#94A3B8',
    },
  };

  const currentTheme = themes[theme];

  // Team members data (remains the same)
  const teamMembers = [
    { id: 1, name: "Gaurav Poosarla", role: "Lead Developer", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" },
    { id: 2, name: "Prajwal Shah", role: "Data Scientist", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face" },
    { id: 3, name: "K Sanketh Kumar", role: "Oceanographer", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face" },
    { id: 4, name: "Sankalp Jair", role: "AI Specialist", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=150&fit=crop&crop=face" },
    { id: 5, name: "Sarah Chen", role: "Frontend Developer", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face" },
    { id: 6, name: "Michael Rodriguez", role: "Project Manager", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" }
  ];

  // Testimonials data
  const testimonials = [
    { name: 'Rahul Joshi', handle: 'RJ', color: 'bg-indigo-500', text: "Mastering data felt like breaking problems down and putting them back together efficiently. A rewarding challenge!" },
    { name: 'Raghu Nandan Sharma', handle: 'RS', color: 'bg-teal-500', text: "TUF's customer support is amazing. The speed at which they assisted in solving the problem is insane. Kudos to @striver_79 and TUF team for this" },
    { name: 'Kartik Kathuria', handle: 'KK', color: 'bg-pink-500', text: "This platform contains all problems and important interview questions for oceanography data science." },
    { name: 'Vishnu Dixit', handle: 'VD', color: 'bg-sky-500', text: "The creators give me so much motivation that I can also achieve what I want. It just requires hard work and dedication." },
    { name: 'Anonymous', handle: 'A', color: 'bg-amber-500', text: "University taught me the basics, but this platform taught me how to apply them. It bridges the gap perfectly!" }
  ];

  // Create three separate lists for each column's continuous scroll
  const column1Testimonials = [...testimonials, ...testimonials, ...testimonials];
  const column2Testimonials = [...testimonials, ...testimonials, ...testimonials];
  const column3Testimonials = [...testimonials, ...testimonials, ...testimonials];

  const duplicatedTeamMembers = [...teamMembers, ...teamMembers];

  return (
    <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} py-12 font-sans overflow-x-hidden transition-colors duration-500`}>
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <nav className="text-sm">
            <span>Home / About us</span>
          </nav>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-200'}`}
          >
            {theme === 'dark' ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.332 1.668a.5.5 0 00-.816.578L13.88 5.75l-.26.26a.5.5 0 00.578.816l.26-.26.26-.26a.5.5 0 00-.578-.816zM17 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-3.668-4.332a.5.5 0 00-.816.578l-.26.26-.26-.26a.5.5 0 00.578.816l.26.26.26.26a.5.5 0 00-.578-.816zM10 17a1 1 0 01-1-1v-1a1 1 0 112 0v1a1 1 0 01-1 1zm4.332-1.668a.5.5 0 00-.578.816l.26.26.26.26a.5.5 0 00.816-.578l-.26-.26-.26-.26zM6.55 13.45a.5.5 0 00-.816-.578L5.75 13.88l-.26-.26a.5.5 0 00-.578.816l.26.26.26.26a.5.5 0 00.578-.816zM3 10a1 1 0 011-1h1a1 1 0 110 2H4a1 1 0 01-1-1zm3.668-4.332a.5.5 0 00-.816.578l-.26.26-.26-.26a.5.5 0 00-.578.816l.26.26.26.26a.5.5 0 00.578-.816z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>

        <div className="text-center mb-20">
          <h1 className={`text-5xl font-bold ${currentTheme.heading} mb-4`}>About FloatChat</h1>
          <div className={`w-24 h-1 ${currentTheme.accent} mx-auto mb-8`}></div>
          <p className={`text-lg ${currentTheme.cardText} max-w-3xl mx-auto leading-relaxed`}>
            An AI-powered platform transforming how researchers, scientists, and enthusiasts explore and understand oceanographic data through natural language conversations.
          </p>
        </div>

        {/* Project Overview Section (Expanded) */}
        <section className="mb-20">
          <div className={`${currentTheme.cardBg} p-8 rounded-xl ${currentTheme.cardBorder} border shadow-lg transition-colors duration-500`}>
            <h2 className={`text-3xl font-semibold ${currentTheme.heading} mb-6`}>Project Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">The Challenge: Data Accessibility in Oceanography</h3>
                <p className={`${currentTheme.cardText} leading-relaxed`}>
                  Oceanographic data is vast, complex, and heterogeneous—ranging from satellite observations to in-situ measurements like CTD casts, Argo floats, and BGC sensors. The Argo program, in particular, generates extensive datasets in NetCDF format, which requires specialized technical skills and domain knowledge to access, query, and visualize. This complexity creates a significant barrier for many researchers and enthusiasts, limiting the full potential of these valuable datasets. Traditional methods often involve cumbersome data wrangling and reliance on specialized software, slowing down scientific discovery.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-cyan-400 mb-2">Our Solution: The FloatChat Advantage</h3>
                <p className={`${currentTheme.cardText} leading-relaxed mb-4`}>
                  FloatChat offers a paradigm shift in how marine data is accessed. By leveraging advanced **Large Language Models (LLMs)**, we provide a **natural language interface** that eliminates the need for complex programming. Users can simply ask questions in plain English, and our system retrieves, analyzes, and presents the relevant data.
                </p>
                <ul className={`list-disc list-inside ${currentTheme.cardText} space-y-2`}>
                  <li>**Natural language interface** for intuitive data querying and exploration.</li>
                  <li>**AI-powered insights** that generate visualizations and summaries from raw data.</li>
                  <li>**Instant access** to a massive, continually updated repository of oceanographic data.</li>
                  <li>**Bridging the gap** between domain experts and data analysis tools.</li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-bold text-cyan-400 mt-8 mb-4">The Technical Pipeline: From Data Ingestion to User Insights</h3>
            <p className={`${currentTheme.cardText} leading-relaxed mb-6`}>
              Our system is built on a robust, end-to-end pipeline. The first stage involves **ingesting ARGO NetCDF files** and processing this raw, binary data into a structured format. We then store the metadata and key variables in a hybrid database system, utilizing **PostgreSQL for structured data** and a **vector database like FAISS or Chroma** for semantic search capabilities. This dual-database approach ensures both efficient querying and flexible data retrieval.
            </p>

            <h3 className="text-xl font-bold text-cyan-400 mb-4">Core Components & Workflow</h3>
            <ul className={`list-disc list-inside ${currentTheme.cardText} space-y-2`}>
              <li>**Data Processing & Storage:** An automated pipeline for ARGO NetCDF files, populating a relational database (PostgreSQL) and a vector database (FAISS/Chroma). This ensures quick data lookup and semantic search capabilities.</li>
              <li>**Retrieval-Augmented Generation (RAG):** The core of our backend. When a user submits a natural language query, the system uses RAG to retrieve relevant data snippets from the vector database and feeds them to a multimodal LLM. This process enhances the LLM's knowledge base and generates highly accurate and context-aware responses.</li>
              <li>**Frontend Dashboard:** A responsive, user-friendly interface that translates the AI's response into interactive and customizable visualizations. We use libraries like **Plotly.js for dynamic charts** and **Leaflet for geospatial maps**, allowing users to explore data visually.</li>
              <li>**Chatbot Interface:** The user-facing conversational tool that seamlessly guides the user through the data discovery process, providing clarifications, suggestions, and instant results.</li>
            </ul>
          </div>
        </section>

        {/* What users say about us section (Unchanged) */}
        <section className="mb-24 py-16">
          <div className="relative h-[150px] w-full text-center mb-8">
            <motion.div
              className="absolute top-0 left-1/2 w-[600px] -translate-x-1/2"
              style={{ originY: 0, originX: 0.5 }}
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <svg className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[100px] h-[100px] w-[200px]" viewBox="0 0 200 150">
                <line x1="100" y1="0" x2="30" y2="150" stroke={currentTheme.lineStroke} strokeWidth="2" />
                <line x1="100" y1="0" x2="170" y2="150" stroke={currentTheme.lineStroke} strokeWidth="2" />
                <circle cx="100" cy="0" r="4" fill={currentTheme.lineFill} />
              </svg>
              <div className={`relative z-10 mx-auto w-fit text-center ${currentTheme.cardBg} backdrop-blur-sm p-8 rounded-xl ${currentTheme.cardBorder} border shadow-2xl`}>
                <h2 className={`text-4xl font-bold ${currentTheme.heading}`}>What users say about us</h2>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 h-[600px] overflow-hidden relative">
            
            <motion.div
              className="flex flex-col gap-8"
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            >
              {column1Testimonials.map((testimonial, index) => (
                <div key={index} className={`w-full p-6 ${currentTheme.cardBg} rounded-lg shadow-lg ${currentTheme.cardBorder} border`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-white mr-3`}>{testimonial.handle}</div>
                    <span className={`font-semibold ${currentTheme.heading}`}>{testimonial.name}</span>
                  </div>
                  <p className={`text-sm ${currentTheme.cardText}`}>{testimonial.text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col gap-8"
              animate={{ y: ['-50%', '0%'] }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            >
              {column2Testimonials.map((testimonial, index) => (
                <div key={index} className={`w-full p-6 ${currentTheme.cardBg} rounded-lg shadow-lg ${currentTheme.cardBorder} border`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-white mr-3`}>{testimonial.handle}</div>
                    <span className={`font-semibold ${currentTheme.heading}`}>{testimonial.name}</span>
                  </div>
                  <p className={`text-sm ${currentTheme.cardText}`}>{testimonial.text}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              className="flex flex-col gap-8"
              animate={{ y: ['0%', '-50%'] }}
              transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
            >
              {column3Testimonials.map((testimonial, index) => (
                <div key={index} className={`w-full p-6 ${currentTheme.cardBg} rounded-lg shadow-lg ${currentTheme.cardBorder} border`}>
                  <div className="flex items-center mb-4">
                    <div className={`w-10 h-10 rounded-full ${testimonial.color} flex items-center justify-center font-bold text-white mr-3`}>{testimonial.handle}</div>
                    <span className={`font-semibold ${currentTheme.heading}`}>{testimonial.name}</span>
                  </div>
                  <p className={`text-sm ${currentTheme.cardText}`}>{testimonial.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Other sections remain the same */}
        <section className="mb-20">
          <h2 className={`text-3xl font-semibold ${currentTheme.heading} mb-8 text-center`}>Our Expert Team</h2>
          <div className={`relative overflow-hidden group py-8`}>
            <div className="flex animate-scroll-faster group-hover:animation-paused">
              {duplicatedTeamMembers.map((member, index) => (
                <div key={`${member.id}-${index}`} className={`flex-shrink-0 w-72 mx-4 ${currentTheme.cardBg} rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:!scale-105 hover:shadow-cyan-400/20 ${currentTheme.cardBorder} border`}>
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-700 shadow-md"><img src={member.image} alt={member.name} className="w-full h-full object-cover" /></div>
                  <h3 className={`text-xl font-semibold ${currentTheme.heading} mb-2`}>{member.name}</h3>
                  <p className="text-cyan-400 font-medium mb-3">{member.role}</p>
                  <p className={`text-sm ${currentTheme.cardText}`}>Specialized in ocean data processing and AI integration</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-10 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Explore Ocean Data?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">Join researchers and enthusiasts worldwide who are using FloatChat to unlock insights from the world's oceans.</p>
          <div className="flex justify-center flex-wrap gap-4">
            <button className="px-8 py-3 bg-white text-blue-700 font-semibold rounded-lg shadow-md hover:bg-slate-100 transition-transform hover:scale-105">Start Exploring</button>
            <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-700 transition-all">Request Demo</button>
          </div>
        </section>
        
        <style jsx>{`
          /* We only need the team scroller animation here now */
          @keyframes scrollFaster {
            0% { transform: translateX(0); }
            100% { transform: translateX(-${teamMembers.length * 20}rem); }
          }
          .animate-scroll-faster {
            display: flex;
            width: max-content;
            animation: scrollFaster 30s linear infinite;
          }
          .animation-paused { animation-play-state: paused; }
        `}</style>
      </div>
    </div>
  );
};

export default About;