// src/components/HomePage.js
// src/components/HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
// --- REMOVED: import HomePageMap from './HomePageMap'; ---
import './Home.css';

const Home = () => {
    const [theme, setTheme] = useState(localStorage.getItem('argo-theme') || 'dark');
    const [currentSlide, setCurrentSlide] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalInfo, setModalInfo] = useState({ title: '', content: '' });
    const slideIntervalRef = useRef(null);
    const countersRef = useRef([]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light');
        } else {
            document.body.classList.remove('light');
        }
        localStorage.setItem('argo-theme', theme);
    }, [theme]);

    const facts = [
        { title: "Why Don't the Atlantic & Pacific Oceans Mix?", text: "It's a viral myth! They do mix. However, a visible line often appears due to differences in water density, temperature, and salinity. Fresher meltwater takes time to blend with saltier ocean water, creating a temporary, stunning visual boundary.", color: 'text-cyan-300' },
        { title: "The World's Largest Waterfall is Underwater", text: "The Denmark Strait Cataract, between Greenland and Iceland, is the mightiest waterfall on Earth, plunging over 11,500 feet (3,500 meters) and carrying 175 million cubic feet of water per second—dwarfing any land-based waterfall.", color: 'text-emerald-300' },
        { title: "Earth's Longest Mountain Range is in the Ocean", text: "The Mid-Ocean Ridge wraps around the globe for 40,389 miles (65,000 km). This massive feature is where new oceanic crust is formed through volcanic activity, playing a crucial role in plate tectonics.", color: 'text-amber-300' },
        { title: "The Argo Program: A 21st Century Revolution", text: "The global Argo array was launched in 2000, deploying its first robotic floats. This marked a new era in oceanography, providing continuous, real-time data on a scale never before possible and revolutionizing our understanding of ocean climate.", color: 'text-violet-300' },
        { title: "Indian Ocean's Record-Breaking Heat", text: "Argo floats have been crucial in detecting alarming warming trends. In recent years, the Indian Ocean has experienced unprecedented marine heatwaves, with surface temperatures soaring to record highs, impacting ecosystems and weather patterns.", color: 'text-rose-300' }
    ];

    const nextSlide = () => setCurrentSlide(prev => (prev + 1) % facts.length);
    const prevSlide = () => setCurrentSlide(prev => (prev - 1 + facts.length) % facts.length);
    const goToSlide = (index) => setCurrentSlide(index);

    useEffect(() => {
        const startCarousel = () => {
            slideIntervalRef.current = setInterval(nextSlide, 1200);
        };
        startCarousel();
        return () => clearInterval(slideIntervalRef.current);
    }, []);

    const faqs = [
        { q: 'What is an Argo float?', a: 'An Argo float is a small, autonomous robotic probe that drifts with ocean currents and moves up and down between the surface and a mid-water depth. It collects data on temperature, salinity, and pressure, which it then transmits to satellites.' },
        { q: 'Is this data only for scientists?', a: "Not at all! While scientists are a primary audience, our goal is to make ocean data accessible to everyone, including students, fishermen, and the curious public. You can get simple answers from our chatbot, view trends on dashboards, or download the raw data." },
        { q: 'Is the data free to use?', a: 'Yes, all Argo data is publicly available and free of charge. The data policy is committed to open and unrestricted access for all users, typically within 24 hours of collection, to support research and operational applications globally.' }
    ];

    const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

    const showModal = (title, content) => {
        setModalInfo({ title, content });
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    
    const showNetworkStatusModal = () => {
        const statusContent = (
            <ul className="space-y-4 text-left">
                <li className="flex items-center"><span className="text-2xl mr-3">✅</span> 3,847 active floats worldwide</li>
                <li className="flex items-center"><span className="text-2xl mr-3">🌊</span> All major ocean basins covered</li>
                <li className="flex items-center"><span className="text-2xl mr-3">📡</span> Real-time data transmission</li>
                <li className="flex items-center"><span className="text-2xl mr-3">🔄</span> ~150 new profiles daily</li>
                <li className="pt-4 text-slate-400">Data is freely available through Global Data Assembly Centers (GDACs).</li>
            </ul>
        );
        showModal('Network Status', statusContent);
    };

    const submitSuggestion = (e) => {
        const suggestionBox = e.target.previousElementSibling;
        if (suggestionBox.value.trim() === "") {
            showModal("Empty Feedback", "<p>Please write your suggestion or review before submitting.</p>");
            return;
        }
        showModal("Feedback Submitted", "<p>Thank you! Your feedback has been received.</p>");
        suggestionBox.value = "";
    };

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animating) {
                    const counter = entry.target;
                    counter.dataset.animating = "true";
                    const targetText = counter.textContent;
                    const targetNum = parseInt(targetText.replace(/[^\d]/g, ''));
                    const suffix = targetText.replace(/[\d,.]+/g, '');
                    let current = 0;
                    const increment = () => {
                        const step = Math.max(1, targetNum / 100);
                        if (current < targetNum) {
                            current += step;
                            if (current > targetNum) current = targetNum;
                            counter.textContent = Math.ceil(current).toLocaleString() + suffix;
                            requestAnimationFrame(increment);
                        } else {
                            counter.textContent = targetNum.toLocaleString() + suffix;
                        }
                    };
                    increment();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        countersRef.current.forEach(counter => {
            if (counter) observer.observe(counter);
        });
        
        return () => observer.disconnect();
    }, []);

    const MAP_IMAGE_URL = "https://wallpaperaccess.com/full/5099398.jpg";

    return (
        <>
            <main>
                <section id="home" className="professional-gradient text-white py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"></div>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                <span className="advanced-ocean-heading">Advanced Ocean</span>
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Climate Monitoring</span>
                            </h1>
                            <p className="text-xl text-slate-300 mb-6 leading-relaxed font-light max-w-4xl mx-auto">
                                The Argo Global Ocean Observing System operates a network of autonomous profiling floats, delivering critical oceanographic data for climate research and operational forecasting.
                            </p>
                            <p className="text-lg text-slate-300 mb-8 leading-relaxed font-light max-w-3xl mx-auto">
                                We empower everyone from scientists to fishermen to access data through easy summaries, graphs, profiles, or raw data.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <a href="chatbot.html" className="accent-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                                    Ask Chatbot
                                </a>
                                <button onClick={() => scrollToSection('impact')} className="border-2 border-slate-400 text-slate-300 px-8 py-4 rounded-lg font-semibold hover:bg-slate-700 hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300">
                                    View Features
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="bg-slate-800/50 py-20 border-y border-slate-700/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            <div className="text-center group">
                                <div className="text-5xl font-bold text-cyan-400 counter mb-2" ref={el => countersRef.current[0] = el}>3,800</div>
                                <div className="text-slate-300 font-medium">Active Floats</div>
                                <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 mx-auto mt-3 rounded-full"></div>
                            </div>
                            <div className="text-center group">
                                <div className="text-5xl font-bold text-emerald-400 counter mb-2" ref={el => countersRef.current[1] = el}>2.5M</div>
                                <div className="text-slate-300 font-medium">Ocean Profiles</div>
                                <div className="w-12 h-1 bg-gradient-to-r from-emerald-400 to-green-400 mx-auto mt-3 rounded-full"></div>
                            </div>
                            <div className="text-center group">
                                <div className="text-5xl font-bold text-purple-400 counter mb-2" ref={el => countersRef.current[2] = el}>30+</div>
                                <div className="text-slate-300 font-medium">Countries</div>
                                <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-violet-400 mx-auto mt-3 rounded-full"></div>
                            </div>
                            <div className="text-center group">
                                <div className="text-5xl font-bold text-amber-400 counter mb-2" ref={el => countersRef.current[3] = el}>20+</div>
                                <div className="text-slate-300 font-medium">Years Operating</div>
                                <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto mt-3 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="global-coverage" className="py-24 bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-slate-100 mb-6">Global Ocean Coverage</h2>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                                The Argo network provides unprecedented global coverage of the upper ocean. The map below visualizes the distribution of floats across all major basins, each one a vital data point in our global monitoring system.
                            </p>
                        </div>
                        <div className="bg-slate-800/50 rounded-2xl p-8 lg:p-12 grid lg:grid-cols-2 gap-12 items-center">
                            <div className="text-slate-300 flex flex-col justify-center">
                                <h3 className="text-3xl font-semibold text-slate-100 mb-8">Operational Monitoring Capabilities</h3>
                                <ul className="space-y-6">
                                    <li className="flex items-center">
                                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-emerald-400 mr-4"></span>
                                        <span>Precision salinity measurements for circulation analysis</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-violet-400 mr-4"></span>
                                        <span>Calibrated pressure sensors for geopotential calculations</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="flex-shrink-0 w-4 h-4 rounded-full bg-amber-400 mr-4"></span>
                                        <span>Advanced biogeochemical sensor integration</span>
                                    </li>
                                </ul>
                                <button onClick={showNetworkStatusModal} className="mt-10 accent-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                                    View Network Status
                                </button>
                            </div>
                            
                            {/* --- REPLACED: HomePageMap with a static image --- */}
                            <div className="relative h-96 w-full rounded-lg overflow-hidden border border-slate-700">
                                <img 
                                    src={MAP_IMAGE_URL} 
                                    alt="Global Ocean Map" 
                                    className="absolute inset-0 w-full h-full object-cover" 
                                />
                                {/* Overlay for text on the image */}
                                <div className="absolute top-2 left-3 right-3 z-10 flex justify-between items-center pointer-events-none">
                                    <span className="text-sm text-slate-400">World Map</span>
                                    <div className="flex items-center text-sm">
                                        <span className="w-3 h-3 rounded-full bg-emerald-400 mr-2"></span>
                                        <span className="text-slate-300">Active Floats</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                
                <section id="impact" className="py-24 bg-slate-800/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl font-bold text-slate-100 mb-6">Explore Our Data Features</h2>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                                Dive into our powerful data tools. Each feature below provides a gateway to deeper insights about our oceans.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            <a href="dashboard.html" className="text-center bg-slate-800 p-8 rounded-2xl card-hover flex flex-col">
                                <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl flex-shrink-0">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-slate-100 mb-6">Climate Monitoring</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Track global warming, sea level rise, and ocean heat content changes with interactive dashboards.
                                    </p>
                                </div>
                            </a>
                            <a href="dashboard.html" className="text-center bg-slate-800 p-8 rounded-2xl card-hover flex flex-col">
                                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl flex-shrink-0">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-slate-100 mb-6">Weather Forecasting</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Access data that improves seasonal predictions and hurricane intensity forecasts.
                                    </p>
                                </div>
                            </a>
                            <a href="dashboard.html" className="text-center bg-slate-800 p-8 rounded-2xl card-hover flex flex-col">
                                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl flex-shrink-0">
                                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h3m-3 3h3m-3 3h3m-3 3h3"></path></svg>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-slate-100 mb-6">Ocean Research</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Explore data for studies of ocean circulation, marine ecosystems, and more.
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </section>

                <section id="about" className="py-24 bg-slate-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl font-bold text-slate-100 mb-6">How an Argo Float Works</h2>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                                A 10-day journey of an autonomous profiling float, from deployment to data transmission.
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-10">
                            <div className="text-center bg-slate-800 p-8 rounded-2xl card-hover flex flex-col">
                                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl flex-shrink-0">
                                    <span className="text-3xl font-bold text-white">1</span>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-slate-100 mb-6">Deployment & Drift</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Floats are strategically deployed from research vessels and maintain operational positioning at designated parking depths of 1000-1500 meters during 10-day drift cycles, ensuring broad ocean coverage.
                                    </p>
                                </div>
                            </div>
                            <div className="text-center bg-slate-800 p-8 rounded-2xl card-hover flex flex-col">
                                <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-green-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl flex-shrink-0">
                                    <span className="text-3xl font-bold text-white">2</span>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-slate-100 mb-6">Data Collection</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Following programmed cycles, floats execute controlled descents to 2000-meter depths. They then perform precision ascent profiles, creating detailed temperature and salinity profiles while continuously measuring pressure.
                                    </p>
                                </div>
                            </div>
                            <div className="text-center bg-slate-800 p-8 rounded-2xl card-hover flex flex-col">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-violet-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl flex-shrink-0">
                                    <span className="text-3xl font-bold text-white">3</span>
                                </div>
                                <div className="flex-grow">
                                    <h3 className="text-2xl font-semibold text-slate-100 mb-6">Data Transmission & Control</h3>
                                    <p className="text-slate-400 leading-relaxed">
                                        Upon surfacing, floats transmit complex data profiles, often packaged in scientific formats like NetCDF, via satellite. They also receive new mission parameters before starting the next 10-day cycle.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="facts" className="py-24 bg-slate-800/30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-20">
                            <h2 className="text-5xl font-bold text-slate-100 mb-6">Fascinating Ocean Facts</h2>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                                Dive into the mysteries of the deep with these incredible facts about our planet's oceans.
                            </p>
                        </div>
                        <div id="facts-carousel" className="relative max-w-4xl mx-auto">
                            <div className="relative h-80 overflow-hidden rounded-2xl glass-effect">
                                {facts.map((fact, index) => (
                                    <div key={index} className={`carousel-slide p-8 md:p-12 flex flex-col justify-center items-center text-center ${index === currentSlide ? 'active' : ''}`}>
                                        <h3 className={`text-3xl font-bold ${fact.color} mb-4`}>{fact.title}</h3>
                                        <p className="text-slate-300 text-lg leading-relaxed">{fact.text}</p>
                                    </div>
                                ))}
                            </div>
                            <button id="prev-slide" onClick={prevSlide} className="absolute top-1/2 left-0 md:-left-16 transform -translate-y-1/2 bg-slate-700/50 hover:bg-slate-600/50 text-white p-3 rounded-full transition z-20">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <button id="next-slide" onClick={nextSlide} className="absolute top-1/2 right-0 md:-right-16 transform -translate-y-1/2 bg-slate-700/50 hover:bg-slate-600/50 text-white p-3 rounded-full transition z-20">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                            </button>
                            <div id="carousel-dots" className="flex justify-center space-x-3 mt-8">
                                {facts.map((_, index) => (
                                    <button key={index} onClick={() => goToSlide(index)} className={`carousel-dot w-3 h-3 rounded-full ${index === currentSlide ? 'bg-cyan-400' : 'bg-slate-600'}`}></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                
                <section id="faq" className="py-24 bg-slate-900">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-slate-100 mb-6">Frequently Asked Questions</h2>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                                Find answers to common questions about the Argo program, its data, and technology.
                            </p>
                        </div>
                        <div id="faq-container" className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className={`faq-item glass-effect rounded-xl overflow-hidden ${openFaq === index ? 'open' : ''}`}>
                                    <button onClick={() => toggleFaq(index)} className="faq-question w-full flex justify-between items-center text-left text-lg font-semibold p-6 text-slate-100">
                                        <span>{faq.q}</span>
                                        <svg className="faq-arrow w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </button>
                                    <div className="faq-answer px-6 text-slate-300">
                                        <p>{faq.a}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section id="suggestions" className="py-24 bg-slate-800/30">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold text-slate-100 mb-6">Suggestions & Reviews</h2>
                            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
                                Have an idea for a new feature or want to leave a review? We'd love to hear from you! Your feedback helps us improve.
                            </p>
                        </div>
                        <div className="glass-effect p-6 rounded-2xl max-w-3xl mx-auto">
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <input type="text" id="suggestion-box" className="w-full bg-slate-800/50 border-2 border-slate-700 rounded-lg p-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition" placeholder="Enter your suggestion or review..."/>
                                <button onClick={submitSuggestion} className="accent-gradient text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex-shrink-0">
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-slate-950/70 text-slate-400 py-8 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="flex justify-center items-center space-x-3 mb-4">
                        <div className="w-8 h-8 accent-gradient rounded-full flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-md">A</span>
                        </div>
                        <span className="text-lg font-semibold text-slate-200">Argo Floats</span>
                    </div>
                    <p className="text-sm">&copy; 2025 Argo Program. Data freely available for research and operational use.</p>
                    <p className="text-xs mt-2">A global ocean observing system providing real-time data for climate and weather research.</p>
                </div>
            </footer>
            
            {isModalOpen && (
                <div id="modal" className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-50">
                    <div className="glass-effect text-white p-8 rounded-2xl max-w-lg w-full mx-4 shadow-2xl border border-slate-700 relative">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>

                        <h3 id="modal-title" className="text-2xl font-bold mb-4 text-slate-100">{modalInfo.title}</h3>
                        <div id="modal-content" className="text-slate-300 space-y-2 max-h-[60vh] overflow-y-auto">
                           {modalInfo.content}
                        </div>
                        
                        <Link to="/map" onClick={closeModal} className="mt-6 w-full block text-center accent-gradient text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                            Explore Map
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;