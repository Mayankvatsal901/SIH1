import React, { useState } from 'react';

// Main App component to render the entire page
const App = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const chatHistory = [
        { id: "new_chat", label: "New chat", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        )},
        { id: "search", label: "Search chats", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        )},
        { id: "library", label: "Library", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v12a2.25 2.25 0 002.25 2.25h10.5A2.25 2.25 0 0018.75 18V9.75m-7.5-3l.977-1.168a1.5 1.5 0 012.016-.25l2.226 2.057M12 11.25H9M15 11.25h-3M12 14.25h-3M15 14.25h-3m3 3h-3" />
            </svg>
        )},
        { id: "sora", label: "Sora", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 010-3.108l.813-2.846L9 5.25l.813 2.846a4.5 4.5 0 000 3.108zm0 0l-1.319-2.31a.75.75 0 00-.946 0L5.755 12.553a1.5 1.5 0 01-1.319-2.31l.946-1.656a.75.75 0 00.946 0l1.319 2.31a.75.75 0 00.946 0z" />
            </svg>
        )},
        { id: "gpts", label: "GPTs", icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 010-3.108l.813-2.846L9 5.25l.813 2.846a4.5 4.5 0 000 3.108zm0 0l-1.319-2.31a.75.75 0 00-.946 0L5.755 12.553a1.5 1.5 0 01-1.319-2.31l.946-1.656a.75.75 0 00.946 0l1.319 2.31a.75.75 0 00.946 0z" />
            </svg>
        )},
    ];

    const projectChats = [
        { id: "otp", label: "Send OTP via Gmail" },
        { id: "wave_animation", label: "Wave animation in React" },
        { id: "pca", label: "Explain PCA analysis" },
        { id: "internship", label: "Internship assignment steps" },
        { id: "jupyter", label: "Install Jupyter Notebook" },
        { id: "argovis", label: "Argovis demo notebooks setup" },
    ];

    return (
        <div className="flex h-screen bg-[#000000] text-gray-300 font-sans">
            {/* Sidebar */}
            <aside className={`relative z-40 inset-y-0 left-0 flex flex-col transition-all duration-300 ease-in-out bg-[#000000] border-r-0 ${isSidebarOpen ? 'w-64' : 'w-16'}`}>
                <div className="flex-grow overflow-y-auto pt-2">
                    <div className={`p-2 flex items-center h-16 border-b border-gray-900/50 ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                        <div className={`flex items-center space-x-2 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`}>
                            <span className="text-xl font-semibold whitespace-nowrap">Chatbot</span>
                            <span className="text-xs text-gray-400">v3.5</span>
                        </div>
                        {isSidebarOpen && (
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 rounded-full hover:bg-gray-800 text-gray-400 transition-transform duration-300 transform"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 rotate-180">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                </svg>
                            </button>
                        )}
                    </div>
                    <ul className="py-2 px-2">
                        {chatHistory.map(item => (
                            <li key={item.id} className="mb-1">
                                <a
                                    href="#"
                                    className={`flex items-center p-2 rounded-md transition-colors duration-200 ${item.id === "new_chat" ? 'bg-gray-800 text-white' : 'hover:bg-gray-800'}`}
                                >
                                    {item.icon}
                                    <span className={`ml-3 text-sm transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                    <div className={`p-2 mt-4 text-xs text-gray-400 uppercase tracking-wider transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>
                        Projects
                        <span className="ml-1 text-cyan-400 text-xs font-bold">(NEW)</span>
                    </div>
                    <ul className="py-2 px-2">
                        {projectChats.map(item => (
                            <li key={item.id} className="mb-1">
                                <a
                                    href="#"
                                    className={`flex items-center p-2 rounded-md transition-colors duration-200 hover:bg-gray-800`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 10.5h7.5m-7.5 3h7.5m-7.5 3h7.5M12 12v-6m-3 3l6 6m-6-6l6 6m-3-3l6 6m-6-6l6 6m-3-3l6 6m-6-6l6 6" />
                                    </svg>
                                    <span className={`ml-3 text-sm transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>{item.label}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* User section at the bottom */}
                <div className="flex items-center p-4 border-t border-gray-900/50 transition-opacity duration-300">
                    <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg font-bold">M</div>
                    <div className={`ml-4 flex-grow transition-opacity duration-300 ${!isSidebarOpen && 'opacity-0'}`}>
                        <div className="text-sm font-semibold whitespace-nowrap">Mayank Vatsal</div>
                        <div className="text-xs text-gray-500">Free</div>
                    </div>
                    <button className={`text-xs font-semibold px-2 py-1 rounded-full bg-cyan-600 text-white hover:bg-cyan-500 transition-all duration-300 ${!isSidebarOpen && 'opacity-0'}`}>Upgrade</button>
                </div>
            </aside>

            {/* Main Chat Content */}
            <main className="flex-1 flex flex-col bg-[#000000] transition-all duration-300 ease-in-out">
                {/* Main Content Area */}
                <div className="flex-1 flex flex-col items-center justify-center p-4 mb-24">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-200">What can I help with?</h1>
                </div>

                {/* Input Bar */}
                <div className="sticky bottom-0 w-full p-4 flex justify-center bg-[#000000]">
                    <div className="flex items-center w-full max-w-2xl bg-[#171717] rounded-full shadow-lg border border-gray-600">
                        <button className="p-3 text-gray-400 hover:text-gray-200 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                        </button>
                        <input
                            type="text"
                            placeholder="Ask anything"
                            className="flex-1 p-3 bg-transparent text-gray-200 placeholder-gray-400 focus:outline-none"
                        />
                        <button className="p-3 text-gray-400 hover:text-gray-200 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 110-12 6 6 0 010 12z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V2.25A.75.75 0 0112 1.5zm0 21a.75.75 0 01-.75-.75v-1.5a.75.75 0 011.5 0v1.5a.75.75 0 01-.75.75zm1.5-10.5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.667 19.828a.75.75 0 01-.75.75h-2.167a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h2.167a.75.75 0 01.75.75v1.5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.333 19.828a.75.75 0 01-.75.75h-2.167a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h2.167a.75.75 0 01.75.75v1.5z" />
                            </svg>
                        </button>
                        <button className="p-3 text-gray-400 hover:text-gray-200 transition-colors duration-200">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M8.25 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75z" />
                                <path d="M12 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75z" />
                                <path d="M15.75 4.5a.75.75 0 01.75.75v13.5a.75.75 0 01-1.5 0V5.25a.75.75 0 01.75-.75z" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* The new thin line for separation */}
                <div className={`fixed z-50 top-0 bottom-0 left-[64px] w-0.5 bg-gray-700 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-0' : 'opacity-100'}`}></div>

                {/* The toggle button for the main content area */}
                {!isSidebarOpen && (
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="fixed z-50 top-1/2 left-[64px] transform -translate-y-1/2 -translate-x-1/2 p-2 rounded-full bg-[#000000] text-gray-400 hover:bg-gray-800 transition-all duration-300"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                )}
            </main>
        </div>
    );
};

export default App;
