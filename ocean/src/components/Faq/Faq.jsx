import React, { useState } from 'react';

// --- FAQ Data (Unchanged) ---
const faqData = [
  {
    category: 'General Questions',
    icon: 'fas fa-question-circle',
    description: 'Common questions about our mission and platform.',
    items: [
      { question: 'What exactly is FloatChat?', answer: 'FloatChat is an advanced AI-powered platform that provides access to a vast network of oceanographic data from sources like Argo floats. We empower everyone from scientists to fishermen to access and understand this data through easy summaries, graphs, and raw data.' },
      { question: 'Who is FloatChat for?', answer: 'FloatChat is designed for a wide range of users, including climate researchers, oceanographers, marine biologists, students, policymakers, and even commercial fishermen who need up-to-date ocean conditions.' },
      { question: 'How is this different from a standard search engine?', answer: 'While search engines provide general information, FloatChat connects you directly to specialized, near real-time scientific datasets. Our AI doesn\'t just find information; it synthesizes raw data into actionable insights, generates visualizations, and understands complex, domain-specific queries.' },
      { question: 'Is FloatChat free to use?', answer: 'We offer a generous free tier with access to essential data and features, perfect for students and enthusiasts. For advanced analytics, higher data limits, and commercial use, we have premium subscription plans available.' },
    ],
  },
  {
    category: 'Technical & Data',
    icon: 'fas fa-cogs',
    description: 'The technology, data sources, and accuracy of our platform.',
    items: [
      { question: 'How does the AI work its magic?', answer: "Our AI uses advanced Natural Language Processing (NLP) models to understand your questions. It then queries our organized databases of ocean data, analyzes the results, and synthesizes the information into a clear, human-readable answer, graph, or summary." },
      { question: 'What kind of data can I access?', answer: 'You can access a wide range of data including ocean temperature, salinity, pressure, currents, and biogeochemical data (like oxygen and chlorophyll levels) from various depths and locations, collected by thousands of autonomous profiling floats.' },
      { question: 'How accurate and up-to-date is the data?', answer: 'Extremely. We source our data from globally recognized programs like the Argo Ocean Observing System. The data is quality-controlled at the source and updated on our platform in near real-time as it becomes available from the floats, typically within hours of collection.' },
      { question: 'Do you have an API?', answer: 'Yes, our powerful REST API is available to all Premium subscribers. It allows you to integrate FloatChat\'s data and analysis capabilities directly into your own applications, workflows, and research models. You can find the full documentation in the Developers section.' },
    ],
  },
  {
    category: 'Account & Subscription',
    icon: 'fas fa-user-shield',
    description: 'Manage your account, understand plans, and find billing info.',
    items: [
      { question: 'What are the main differences between the plans?', answer: 'Our Free plan offers basic data access and a limited number of queries per month. Premium plans unlock higher query limits, API access for developers, advanced data visualization tools, and priority support.' },
      { question: 'How can I manage or cancel my subscription?', answer: 'You can easily manage your subscription, upgrade, downgrade, or cancel at any time from your Account Settings page. All changes are prorated and take effect immediately.' },
      { question: 'Do you offer discounts for students or non-profits?', answer: 'Yes! We are passionate about supporting education and research. We offer significant discounts for verified students, educators, and non-profit organizations. Please contact our support team from your institutional email address for more details.' },
    ],
  },
];

// --- Accordion Item Sub-Component (Unchanged) ---
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border border-gray-200/10 dark:border-gray-700/50 rounded-lg bg-white/5 dark:bg-gray-800/10 backdrop-blur-sm">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left p-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-lg"
      >
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{question}</h3>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <i className="fas fa-chevron-down text-gray-500 dark:text-gray-400"></i>
        </span>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="px-4 pb-4 text-gray-600 dark:text-gray-300 leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};


// --- Main FAQ Component ---
export default function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  
  // --- NEW STATE for the suggestion box ---
  const [suggestion, setSuggestion] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  // --- NEW HANDLER for the suggestion box submission ---
  const handleSuggestionSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate an API call
    setTimeout(() => {
      console.log({ email, suggestion });
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };
  
  // --- NEW HANDLER to reset the form ---
  const resetForm = () => {
    setSuggestion('');
    setEmail('');
    setIsSubmitted(false);
  }

  return (
    <div className="bg-white dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section (Unchanged) */}
        <div className="text-center mb-20">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Your guide to FloatChat. Find answers about our mission, technology, and how you can harness the power of AI to explore our oceans.
          </p>
        </div>

        {/* FAQ Grid (Unchanged) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
          {faqData.map((category, catIndex) => (
            <div key={catIndex} className="flex flex-col gap-y-6">
              <div className="flex items-start gap-4">
                <i className={`${category.icon} text-2xl text-cyan-400 pt-1`}></i>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{category.category}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                </div>
              </div>
              {category.items.map((item, itemIndex) => {
                const globalIndex = `${catIndex}-${itemIndex}`;
                return (
                  <AccordionItem
                    key={globalIndex}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openIndex === globalIndex}
                    onClick={() => handleToggle(globalIndex)}
                  />
                );
              })}
            </div>
          ))}
        </div>
        
        {/* --- REDESIGNED Suggestion Box Section --- */}
        <section className="mt-24">
          <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gray-800/50 p-8 lg:p-12 shadow-2xl shadow-cyan-500/10">
            {/* Background Gradient Glow */}
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.1)_0%,_rgba(0,255,255,0)_50%)] -z-10"></div>
            
            <div className="grid lg:grid-cols-2 lg:gap-12 items-center">
              {/* Left Column: Text Content */}
              <div className="text-center lg:text-left mb-8 lg:mb-0">
                <div className="flex justify-center lg:justify-start text-5xl text-cyan-400 mb-4">
                  <i className="fa-solid fa-lightbulb-on"></i>
                </div>
                <h2 className="text-3xl font-bold text-white">Have a Suggestion?</h2>
                <p className="mt-2 text-gray-400 max-w-xl mx-auto lg:mx-0">
                  Can't find an answer? Your feedback is vital. Let us know what's on your mind and help us improve the platform for everyone.
                </p>
              </div>

              {/* Right Column: Form or Success Message */}
              <div className="w-full">
                {isSubmitted ? (
                  // Success State
                  <div className="text-center p-8 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex justify-center text-5xl text-green-400 mb-4">
                        <i className="fa-solid fa-check-circle"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white">Thank You!</h3>
                    <p className="text-gray-300 mt-2">Your suggestion has been received. We appreciate your feedback.</p>
                    <button onClick={resetForm} className="mt-6 px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
                      Submit Another
                    </button>
                  </div>
                ) : (
                  // Form State
                  <form onSubmit={handleSuggestionSubmit} className="flex flex-col gap-4">
                    <div>
                      <label htmlFor="email" className="sr-only">Your Email</label>
                      <input
                        id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your Email (Optional)"
                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      />
                    </div>
                    <div>
                      <label htmlFor="suggestion" className="sr-only">Your Suggestion</label>
                      <textarea
                        id="suggestion" value={suggestion} onChange={(e) => setSuggestion(e.target.value)}
                        rows="4" placeholder="Type your question or suggestion..." required
                        className="w-full px-4 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
                      ></textarea>
                    </div>
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="flex items-center justify-center w-full px-8 py-3 rounded-lg bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-cyan-500 disabled:bg-cyan-800 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <i className="fas fa-spinner fa-spin mr-2"></i>
                          Submitting...
                        </>
                      ) : (
                         <>
                          <i className="fa-solid fa-paper-plane mr-2"></i>
                          Submit Suggestion
                         </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}