document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENT REFERENCES ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mainHeader = document.getElementById('main-header');
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const apiKeyInput = document.getElementById('api-key-input');
    const submitQueryBtn = document.getElementById('submit-query-btn');
    const refineQueryBtn = document.getElementById('refine-query-btn');
    const promptArea = document.getElementById('prompt-area');
    const aiResponseContainer = document.getElementById('ai-response-container');
    const aiResponseContent = document.getElementById('ai-response-content');
    const loader = document.getElementById('loader');
    const generateIdeasBtn = document.getElementById('generate-ideas-btn');
    const discoverCardsContainer = document.getElementById('discover-cards-container');
    const visualizationBtnContainer = document.getElementById('visualization-btn-container');
    const codeContainer = document.getElementById('code-container');
    const codeBlock = document.getElementById('code-block');
    const copyCodeBtn = document.getElementById('copy-code-btn');

    let geminiApiKey = localStorage.getItem('geminiApiKey');

    // --- THEME MANAGEMENT ---
    const applyTheme = (theme) => {
        const isDark = theme === 'dark';
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem('theme', theme);
    };

    // Initialize theme based on saved preference or system settings
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(savedTheme);

    // --- EVENT LISTENERS ---
    themeToggleBtn.addEventListener('click', () => {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    settingsBtn.addEventListener('click', () => openSettingsModal());
    closeModalBtn.addEventListener('click', () => toggleModal(false));
    saveKeyBtn.addEventListener('click', () => saveApiKey());
    submitQueryBtn.addEventListener('click', () => handleQuerySubmission());
    refineQueryBtn.addEventListener('click', () => handleRefineQuery());
    generateIdeasBtn.addEventListener('click', () => handleGenerateIdeas());
    copyCodeBtn.addEventListener('click', () => copyGeneratedCode());
    
    // Close modal if user clicks outside of it
    settingsModal.addEventListener('click', (event) => {
        if (event.target === settingsModal) {
            toggleModal(false);
        }
    });

    // --- MODAL & API KEY MANAGEMENT ---
    const toggleModal = (show) => {
        settingsModal.classList.toggle('hidden', !show);
    };

    function openSettingsModal() {
        apiKeyInput.value = geminiApiKey || '';
        toggleModal(true);
    }

    function saveApiKey() {
        const key = apiKeyInput.value.trim();
        if (key) {
            geminiApiKey = key;
            localStorage.setItem('geminiApiKey', geminiApiKey);
            alert('API Key saved successfully!');
            toggleModal(false);
        } else {
            alert('Please enter a valid API Key.');
        }
    }

    // --- CORE GEMINI API FUNCTION ---
    async function callGeminiAPI(prompt, systemInstruction) {
        if (!geminiApiKey) {
            alert('Please set your Gemini API Key in the Settings first.');
            openSettingsModal();
            return null;
        }
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${geminiApiKey}`;
        const payload = {
            contents: [{ parts: [{ text: prompt }] }],
            ...(systemInstruction && { systemInstruction: { parts: [{ text: systemInstruction }] } })
        };
        
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`API Error (${response.status}): ${errorBody.error?.message || response.statusText}`);
            }
            const data = await response.json();
            return data.candidates?.[0]?.content?.parts?.[0]?.text;
        } catch (error) {
            console.error("Gemini API call failed:", error);
            return `**Error:** Could not get a response from the AI. Please check your API key and network connection. Details: ${error.message}`;
        }
    }

    // --- UI UPDATE & AI FEATURE HANDLERS ---
    async function handleQuerySubmission() {
        const userQuery = promptArea.value.trim();
        if (!userQuery) return;

        aiResponseContainer.classList.remove('hidden');
        loader.style.display = 'flex';
        aiResponseContent.innerHTML = '';
        visualizationBtnContainer.innerHTML = '';
        codeContainer.classList.add('hidden');

        const systemInstruction = `You are an expert oceanographic data analyst. Your task is to respond to the user's query by generating a realistic but simulated data report. Format the response in clear Markdown, including headings, lists, and at least one data table.`;
        
        const responseText = await callGeminiAPI(userQuery, systemInstruction);
        
        loader.style.display = 'none';
        if (responseText) {
            aiResponseContent.innerHTML = marked.parse(responseText);
            // Check for a markdown table and add the visualization button if found
            if (responseText.includes('|') && responseText.includes('---')) {
                createVisualizationButton(responseText);
            }
        }
    }

    async function handleRefineQuery() {
        const userQuery = promptArea.value.trim();
        if (!userQuery) return;
        
        refineQueryBtn.disabled = true;
        refineQueryBtn.innerHTML = '✨ Refining...';

        const prompt = `Refine this user query about ocean data into a more detailed, specific question for a data analyst. Return only the refined query. Query: "${userQuery}"`;
        const refinedQuery = await callGeminiAPI(prompt);

        if (refinedQuery && !refinedQuery.startsWith('**Error:**')) {
            promptArea.value = refinedQuery.replace(/"/g, '');
        } else if (refinedQuery) {
            alert(refinedQuery); // Show error if API call failed
        }
        
        refineQueryBtn.disabled = false;
        refineQueryBtn.innerHTML = '✨ Refine Query';
    }

    async function handleGenerateIdeas() {
        generateIdeasBtn.disabled = true;
        generateIdeasBtn.innerHTML = '✨ Generating...';

        const prompt = "Generate exactly 4 creative, short ideas for exploring ocean data with Argo floats. Return as a JSON array of strings, like [\"Idea 1\", \"Idea 2\", \"Idea 3\", \"Idea 4\"].";
        const responseText = await callGeminiAPI(prompt);

        try {
            if (!responseText || responseText.startsWith('**Error:**')) {
                throw new Error(responseText || "No response from AI.");
            }
            const ideas = JSON.parse(responseText);
            if (Array.isArray(ideas) && ideas.length >= 4) {
                const discoverTexts = discoverCardsContainer.querySelectorAll('.discover-text');
                discoverTexts.forEach((span, index) => {
                    span.textContent = ideas[index] || 'New Idea';
                });
            } else {
                throw new Error("Invalid format received from AI.");
            }
        } catch (error) {
            console.error("Failed to parse ideas from AI:", error);
            alert("Could not generate new ideas at the moment.");
        } finally {
            generateIdeasBtn.disabled = false;
            generateIdeasBtn.innerHTML = '✨ Generate Ideas';
        }
    }

    function createVisualizationButton(markdownText) {
        const vizButton = document.createElement('button');
        vizButton.innerHTML = '✨ Generate Python Code';
        vizButton.className = 'promo-button'; // Reusing a suitable style
        vizButton.style.backgroundColor = 'var(--accent-color)';
        vizButton.style.marginTop = '1rem';
        vizButton.onclick = () => generateVisualizationCode(markdownText);
        visualizationBtnContainer.appendChild(vizButton);
    }

    async function generateVisualizationCode(markdownText) {
        codeContainer.classList.remove('hidden');
        codeBlock.textContent = 'Generating code...';
        
        const prompt = `Based on the following Markdown text, write a complete Python script to visualize the data from the table. Use pandas and matplotlib or seaborn. Provide only the Python code inside a \`\`\`python ... \`\`\` block.\n\n${markdownText}`;
        const codeResponse = await callGeminiAPI(prompt);
        
        if (codeResponse) {
            const pythonCode = codeResponse.replace(/```python\n|```/g, '').trim();
            codeBlock.textContent = pythonCode;
            if (window.Prism) {
                Prism.highlightElement(codeBlock);
            }
        }
    }

    function copyGeneratedCode() {
        navigator.clipboard.writeText(codeBlock.textContent).then(() => {
            const originalText = copyCodeBtn.innerHTML;
            copyCodeBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyCodeBtn.innerHTML = originalText;
            }, 2000);
        }, (err) => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy code.');
        });
    }
});
